# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '__first__'),
        ('survey', '__first__'),
        ('response', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plan', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('company_name', models.CharField(max_length=45, null=True, verbose_name='Company name', blank=True)),
                ('address', models.CharField(max_length=200, null=True, verbose_name='Address', blank=True)),
                ('phone', models.CharField(max_length=15, null=True, verbose_name='Phone', blank=True)),
                ('user_status', models.IntegerField(default=1, verbose_name='User status')),
                ('company_address', models.CharField(max_length=200, null=True, verbose_name='Company address', blank=True)),
                ('company_tax_id', models.CharField(max_length=45, null=True, verbose_name='Company Tax ID', blank=True)),
                ('company_tax_ofc', models.CharField(max_length=100, null=True, verbose_name='Company Tax Ofc.', blank=True)),
                ('city', models.CharField(max_length=45, null=True, verbose_name='City', blank=True)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created date')),
                ('added_by', models.ForeignKey(verbose_name='Added by', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('country', models.ForeignKey(verbose_name='Country', to='configuration.Country')),
                ('cur_plan', models.ForeignKey(verbose_name='Plano', blank=True, to='plan.Plan', null=True)),
                ('language', models.ForeignKey(verbose_name='Language code', to='configuration.Language')),
                ('user', models.OneToOneField(related_name='get_customer', verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Customer',
            },
        ),
        migrations.CreateModel(
            name='CustomerPlan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('plan_add_date', models.DateTimeField(null=True, verbose_name='Plan added date', blank=True)),
                ('plan_start_date', models.DateTimeField(null=True, verbose_name='Plan start date', blank=True)),
                ('plan_end_date', models.DateTimeField(null=True, verbose_name='Plan end date', blank=True)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created date')),
                ('status', models.IntegerField(default=3, verbose_name='Status', choices=[(1, b'Plan active'), (2, b'Plan inactive'), (3, b'Incomplete')])),
                ('added_by', models.ForeignKey(verbose_name='Added by', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('customer', models.ForeignKey(related_name='customer_plans', verbose_name='Customer', to='customer.Customer')),
                ('plan', models.ForeignKey(related_name='get_customer_plans', verbose_name='Plan', to='plan.Plan')),
            ],
            options={
                'verbose_name': 'Customer Plan',
            },
        ),
        migrations.CreateModel(
            name='PersonalizeMsg',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=45, verbose_name='Name')),
                ('message', models.TextField(verbose_name='Message')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created date')),
                ('customer', models.ForeignKey(verbose_name='Customer', to='customer.Customer')),
            ],
            options={
                'verbose_name': 'Personalize Message',
            },
        ),
        migrations.CreateModel(
            name='ResponsePlan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Date')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created date')),
                ('cus_res_plan_status', models.PositiveSmallIntegerField(default=2, verbose_name='Plan Status', choices=[(1, 'Active'), (2, 'Inactive')])),
                ('added_by', models.ForeignKey(verbose_name='Added by', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('customer', models.ForeignKey(related_name='response_plans', verbose_name='Customer', to='customer.Customer')),
                ('plan', models.ForeignKey(verbose_name='Plan', blank=True, to='response.ResponsePlan', null=True)),
                ('survey', models.ForeignKey(verbose_name='Survey', blank=True, to='survey.Survey', null=True)),
            ],
            options={
                'verbose_name': 'Response Plan',
            },
        ),
    ]
