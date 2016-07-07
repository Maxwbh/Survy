from django.db import models
from django.utils.translation import ugettext as _
from django.utils import timezone
from apps.customer.models import Customer, CustomerPlan, ResponsePlan as ResponseCustomerPlan
from apps.response.models import ResponsePlan
from django.contrib.auth.models import User
from random import randint


def trans_id():
    now = timezone.now()
    ret = 'TRANS{0}{1:03d}'.format(now.strftime('%H%M%S'), randint(1, 999))
    return ret


class BankDetail(models.Model):
    class Meta:
        unique_together = ['bankpay']

    bankpay = models.CharField(
        verbose_name=_('Bank Pay'), default=trans_id, editable=False, max_length=50
    )
    cus_plan_id = models.IntegerField(default=0)
    amnt_rec = models.ForeignKey(
        to='AmountReceived'
    )
    bank_name = models.CharField(
        max_length=250, default='National Bank of Greece (ETHNIKI TRAPEZA ELLADOS)'
    )
    bank_beneficiary = models.CharField(
        max_length=250, default='ED COMPANY OE'
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2
    )
    order_date = models.DateTimeField(
        default=timezone.now
    )
    status = models.IntegerField(
        choices=[
            (1, _('Payment done')),
            (2, _('Pending'))
        ], default=2
    )
    customer = models.ForeignKey(
        to=Customer
    )
    bank_account = models.CharField(
        max_length=50, default='258/447042-77'
    )
    bank_iban = models.TextField(
        max_length=50, default='GR16 0110 2580 0000 2584 4704 277'
    )
    bank_swift = models.TextField(
        max_length=50, default='ETHNGRAA'
    )


class AmountReceived(models.Model):
    """
    Transaction Type 1 = customer.CustomerPlan, 2 = customer.ResponsePlan
    """
    customer = models.ForeignKey(
        to=Customer
    )
    ref_plan_id = models.IntegerField(default=0)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2
    )
    date_received = models.DateTimeField(
        default=timezone.now
    )
    transaction_type = models.IntegerField(
        choices=[
            (1, _('Plan')),
            (2, _('Purchase answers'))], default=1
    )
    timestamp = models.DateTimeField(
        default=timezone.now
    )
    amt_rec_status = models.IntegerField(
        choices=[
            (1, _('Done')),
            (2, _('Pending')),
            (3, _('Requesting')),
            (4, _('Message send it to admin')),
            (5, _('Paid by admin'))
        ], default=3
    )
    gateway_type = models.IntegerField(
        choices=[
            (1, _('Viva')),
            (2, _('Paypal')),
            (3, _('Google Wallet')),
            (4, _('Bank Transfer'))
        ], blank=True, null=True
    )
    transaction_num = models.CharField(
        max_length=50, blank=True, null=True
    )
    bank_transfer = models.ForeignKey(
        to=BankDetail, default=0
    )
    added_by = models.ForeignKey(
        to=User, blank=True, null=True
    )

    @property
    def transfer(self):
        tr = False
        try:
            tr = BankDetail.objects.get(bankpay=self.transaction_num)
        except:
            pass
        return tr

    @property
    def get_resplan(self):
        ret = False
        if self.transaction_type == 2:
            try:
                ret = ResponseCustomerPlan.objects.get(id=self.ref_plan_id)
            except Exception as e:
                print 'EXCEPTION GET RESPLAN', self.ref_plan_id, e
        return ret

    @property
    def get_subplan(self):
        ret = False
        if self.transaction_type == 1:
            try:
                ret = CustomerPlan.objects.get(id=self.ref_plan_id)
            except Exception as e:
                print 'EXCEPTION GET SUBSLAN', self.ref_plan_id, e
        return ret


class BankTransferDoc(models.Model):
    amt_received = models.ForeignKey(
        to=AmountReceived
    )
    doc_name = models.FileField(
        upload_to='docs'
    )
    timestamp = models.DateTimeField(
        default=timezone.now
    )


class CommissionPayment(models.Model):
    partner = models.ForeignKey(
        to='PartnerDetails'
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=3
    )
    payment_done_by = models.IntegerField()
    payment_date = models.DateTimeField()
    status = models.IntegerField()
    timestamp = models.DateTimeField()


class PartnerDetails(models.Model):
    f_name = models.CharField(
        verbose_name=_('First Name'), max_length=50
    )
    l_name = models.CharField(
        verbose_name=_('Last Name'), max_length=50, blank=True, null=True
    )
    company_name = models.CharField(
        verbose_name=_('Company Name'), max_length=100, blank=True, null=True
    )
    city = models.CharField(
        verbose_name=_('City'), max_length=25, blank=True, null=True
    )
    address = models.TextField(
        verbose_name=_('Address'), blank=True, null=True
    )
    telephone = models.CharField(
        verbose_name=_('Telephone'), max_length=20, blank=True, null=True
    )
    id_tax_num = models.SmallIntegerField(
        verbose_name=_('ID Tax Number'), blank=True, null=True
    )
    tax_office = models.PositiveSmallIntegerField(
        verbose_name=_('Tax Office'), blank=True, null=True
    )
    website = models.CharField(
        verbose_name=_('Website'), max_length=70, blank=True, null=True
    )
    commission = models.CharField(
        verbose_name=_('Invalid Comission'), max_length=10, blank=True, null=True
    )
    payment_method = models.IntegerField(
        verbose_name=_('Payment Method'),
        choices=[
            (1, _('credit card')),
            (2, _('deposit')),
            (3, _('over draft')),
            (4, _('trust')),
            (5, _('open credit'))
        ], default=5
    )
    timestamp = models.DateTimeField(
        default=timezone.now
    )
    partner_status = models.IntegerField(
        default=1
    )
    login = models.ForeignKey(
        to=User, null=True, related_name='get_partner_user'
    )

    def __unicode__(self):
        full_name = self.f_name
        if self.l_name:
            full_name += u" {0}".format(self.l_name)
        return u"{0}".format(full_name)

# class PersonalizeMsg(models.Model):
#     personalize_msg = models.TextField()
#     name = models.CharField()
#     customer = models.ForeignKey(
#         to=Customer
#     )
#     timestamp = models.DateTimeField(
#         default=timezone.now
#     )


class SalesmanDetails(models.Model):
    partner = models.ForeignKey(
        to=User, related_name='get_partner', null=True
    )
    user = models.OneToOneField(
        to=User, null=True, related_name="get_salesman"
    )
    f_name = models.CharField(
        max_length=50,
    )
    l_name = models.CharField(
        max_length=50,
    )
    city = models.CharField(
        max_length=50, blank=True, null=True
    )
    address = models.TextField(
        blank=True, null=True
    )
    telephone = models.CharField(
        max_length=20, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        default=timezone.now
    )
    salesman_status = models.IntegerField(
        default=1
    )

    def __unicode__(self):
        full_name = self.f_name
        if self.l_name:
            full_name += u" {0}".format(self.l_name)
        return u"{0}".format(full_name)


class UserPermission(models.Model):
    user = models.ForeignKey(
        to=User
    )
    survey_list_per = models.BooleanField(
        default=False
    )
    survey_fill_per = models.BooleanField(
        default=False
    )
    translate_survey_per = models.BooleanField(
        default=False
    )
    mail_reports_per = models.BooleanField(
        default=False
    )
    ce_email_list_per = models.BooleanField(
        default=False
    )
    survey_reports_per = models.BooleanField(
        default=False
    )
    account_details_per = models.BooleanField(
        default=False
    )
    payment_details_per = models.BooleanField(
        default=False
    )
    ce_survey_new_per = models.BooleanField(
        default=False
    )