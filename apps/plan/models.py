# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext as _
import django
from django.utils import timezone

class Plan(models.Model):
    class Meta:
        verbose_name = _('Plan')

    name = models.CharField(
        verbose_name=_('Name'), max_length=100
    )
    num_of_survey = models.IntegerField(
        verbose_name=_('Number of survey'), blank=True, null=True
    )
    num_of_questions_per_survey = models.IntegerField(
        verbose_name=_('Number of questions per survey'), blank=True, null=True
    )
    num_of_responses_per_survey = models.IntegerField(
        verbose_name=_('Number of renponses per survey'), blank=True, null=True
    )
    plan_cost = models.DecimalField(
        verbose_name=_('Plan cost'), max_digits=10, decimal_places=2, blank=True, null=True
    )
    plan_duration = models.IntegerField(
        verbose_name=_('Plan duration'), blank=True, null=True, help_text='in months'
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Create date'), default=timezone.now
    )
    plan_status = models.IntegerField(
        verbose_name=_('Plan status'), choices=[(1, 'Active'), (2, 'Inactive')], default=1
    )

    def __unicode__(self):
        return self.name


class PlanFeature(models.Model):
    class Meta:
        verbose_name = _('Plan Feature')

    plan = models.ForeignKey(
        verbose_name=_('Plan'), to=Plan, related_name='plan_features+'
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=60
    )
    response = models.IntegerField(
        verbose_name=_('Response'), choices=((1, _('Yes')), (2, _('No'))), default=1
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )
    status = models.IntegerField(
        verbose_name=_('Status'), choices=((1, _('Active')), (2, _('Inactive'))), default=1
    )

    def __unicode__(self):
        return self.name
