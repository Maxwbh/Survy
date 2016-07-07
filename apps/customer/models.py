# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext as _
from django.utils import timezone
from django.contrib.auth.models import User
import django
from utils.flags import COUNTRIES
from apps.survey.models import Survey
from apps.plan.models import Plan


class Customer(models.Model):
    class Meta:
        verbose_name = _('Customer')

    user = models.OneToOneField(
        verbose_name=_('User'), to=User, related_name='get_customer'
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, blank=True, null=True
    )
    cur_plan = models.ForeignKey(
        verbose_name=_('Plano'), to=Plan, blank=True, null=True
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=50
    )
    company_name = models.CharField(
        verbose_name=_('Company name'), max_length=45, blank=True, null=True
    )
    address = models.CharField(
        verbose_name=_('Address'), max_length=200, blank=True, null=True
    )
    phone = models.CharField(
        verbose_name=_('Phone'), max_length=15, blank=True, null=True
    )
    language_code = models.CharField(
        verbose_name=_('Language code'), max_length=5, blank=True, null=True
    )
    user_status = models.IntegerField(
        verbose_name=_('User status'), default=1
    )
    company_address = models.CharField(
        verbose_name=_('Company address'), max_length=200, blank=True, null=True
    )
    company_tax_id = models.CharField(
        verbose_name=_('Company Tax ID'), max_length=45, blank=True, null=True
    )
    company_tax_ofc = models.CharField(
        verbose_name=_('Company Tax Ofc.'), max_length=100, blank=True, null=True
    )
    country = models.CharField(
        verbose_name=_('Country'), max_length=2, choices=COUNTRIES, blank=True, null=True
    )
    city = models.CharField(
        verbose_name=_('City'), max_length=45, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        return self.name

    @property
    def total_survey(self):
        now = timezone.now()
        # cplans = self.customer_plans.filter(plan_start_date__gte=now, plan_end_date__lte=now)
        cplans = self.get_response_plans
        plans = []
        for x in cplans:
            try:
                plans.append(x.plan.num_of_responses)
            except Exception as e:
                print 'EXCEPT TOTAL SURVEY', e
        return sum(plans)

    @property
    def get_response_plans(self):
        cplans = self.response_plans.filter(cus_res_plan_status=1)
        return cplans

    @property
    def num_of_surveys(self):
        return self.user.survey_set.count()


class CustomerPlan(models.Model):
    """
    sc_customer_plan_details_tbl
    """
    class Meta:
        verbose_name = _('Customer Plan')

    customer = models.ForeignKey(
        verbose_name=_('Customer'), to=Customer, related_name='customer_plans'
    )
    plan = models.ForeignKey(
        verbose_name=_('Plan'), to='plan.Plan', related_name='get_customer_plans'
    )
    plan_add_date = models.DateTimeField(
        verbose_name=_('Plan added date'), blank=True, null=True
    )
    plan_start_date = models.DateTimeField(
        verbose_name=_('Plan start date'), blank=True, null=True
    )
    plan_end_date = models.DateTimeField(
        verbose_name=_('Plan end date'), blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )
    status = models.IntegerField(
        verbose_name=_('Status'), default=3, choices=[(1, 'Plan active'), (2, 'Plan inactive'), (3, 'Incomplete')]
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, blank=True, null=True
    )

    def __unicode__(self):
        return u'Plano: {0} - {1}'.format(self.pk, self.customer.name)


class ResponsePlan(models.Model):
    """
    sc_customer_response_plan_tbl
    """
    class Meta:
        verbose_name = _('Response Plan')

    customer = models.ForeignKey(
        verbose_name=_('Customer'), to=Customer, related_name='response_plans'
    )
    survey = models.ForeignKey(
        verbose_name=_('Survey'), to=Survey, blank=True, null=True
    )
    plan = models.ForeignKey(
        verbose_name=_('Plan'), to='response.ResponsePlan', blank=True, null=True
    )
    date = models.DateTimeField(
        verbose_name=_('Date'), default=django.utils.timezone.now
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )
    cus_res_plan_status = models.PositiveSmallIntegerField(
        verbose_name=_('Plan Status'), choices=((1, _('Active')), (2, _('Inactive'))), default=2
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, blank=True, null=True
    )


class PersonalizeMsg(models.Model):
    class Meta:
        verbose_name = _('Personalize Message')

    customer = models.ForeignKey(
        verbose_name=_('Customer'), to=Customer
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=45
    )
    message = models.TextField(
        verbose_name=_('Message')
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )

    def __unicode__(self):
        return self.name
