# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('customer', '__first__'),
        ('plan', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='AmountReceived',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('date_received', models.DateTimeField()),
                ('transaction_type', models.IntegerField(default=1, choices=[(1, 'Plan'), (2, 'Purchase answers')])),
                ('timestamp', models.DateTimeField(verbose_name=django.utils.timezone.now)),
                ('amt_rec_status', models.IntegerField(default=3, choices=[(3, 'Requesting'), (2, 'Pending'), (1, 'Done'), (4, 'Message send it to admin'), (5, 'Paid by admin')])),
                ('gateway_type', models.IntegerField(blank=True, null=True, choices=[(1, 'Viva'), (2, 'Paypal'), (3, 'Google Wallet'), (4, 'Bank Transfer')])),
                ('transaction_num', models.CharField(max_length=50, null=True, blank=True)),
                ('added_by', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('customer', models.ForeignKey(to='customer.Customer')),
                ('ref_plan', models.ForeignKey(to='plan.Plan')),
            ],
        ),
        migrations.CreateModel(
            name='BankDetail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('bankpay', models.CharField(max_length=15, verbose_name='Bank Pay')),
                ('bank_name', models.CharField(max_length=250)),
                ('bank_beneficiary', models.CharField(max_length=250)),
                ('amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('order_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.IntegerField(default=2, choices=[(1, 'Payment done'), (2, 'Pending')])),
                ('bank_account', models.CharField(max_length=50)),
                ('bank_iban', models.TextField(max_length=50)),
                ('bank_swift', models.TextField(max_length=50)),
                ('amnt_rec', models.ForeignKey(to='manager.AmountReceived')),
                ('cus_plan', models.ForeignKey(to='customer.CustomerPlan')),
                ('customer', models.ForeignKey(to='customer.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='BankTransferDoc',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('doc_name', models.FileField(upload_to=b'docs')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('amt_received', models.ForeignKey(to='manager.AmountReceived')),
            ],
        ),
        migrations.CreateModel(
            name='CommissionPayment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(max_digits=10, decimal_places=3)),
                ('payment_done_by', models.IntegerField()),
                ('payment_date', models.DateTimeField()),
                ('status', models.IntegerField()),
                ('timestamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='PartnerDetails',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('f_name', models.CharField(max_length=50)),
                ('l_name', models.CharField(max_length=50, null=True, blank=True)),
                ('company_name', models.CharField(max_length=100, null=True, blank=True)),
                ('city', models.CharField(max_length=25, null=True, blank=True)),
                ('address', models.TextField(null=True, blank=True)),
                ('telephone', models.CharField(max_length=20, null=True, blank=True)),
                ('id_tax_num', models.CharField(max_length=20, null=True, blank=True)),
                ('tax_office', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('website', models.CharField(max_length=70, null=True, blank=True)),
                ('commission', models.CharField(max_length=10, null=True, blank=True)),
                ('payment_method', models.IntegerField(choices=[(1, 'credit card'), (2, 'deposit'), (3, 'over draft'), (4, 'trust'), (5, 'open credit')])),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('partner_status', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='SalesmanDetails',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('f_name', models.CharField(max_length=50)),
                ('l_name', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50, null=True, blank=True)),
                ('address', models.TextField(null=True, blank=True)),
                ('telephone', models.CharField(max_length=20, null=True, blank=True)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('salesman_status', models.IntegerField()),
                ('partner', models.ForeignKey(to='manager.PartnerDetails')),
            ],
        ),
        migrations.CreateModel(
            name='UserPermission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('survey_list_per', models.BooleanField(default=False)),
                ('survey_fill_per', models.BooleanField(default=False)),
                ('translate_survey_per', models.BooleanField(default=False)),
                ('mail_reports_per', models.BooleanField(default=False)),
                ('ce_email_list_per', models.BooleanField(default=False)),
                ('survey_reports_per', models.BooleanField(default=False)),
                ('account_details_per', models.BooleanField(default=False)),
                ('payment_details_per', models.BooleanField(default=False)),
                ('ce_survey_new_per', models.BooleanField(default=False)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='commissionpayment',
            name='partner',
            field=models.ForeignKey(to='manager.PartnerDetails'),
        ),
        migrations.AlterUniqueTogether(
            name='bankdetail',
            unique_together=set([('bankpay',)]),
        ),
    ]
