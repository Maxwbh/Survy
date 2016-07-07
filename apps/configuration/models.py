from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User


class Language(models.Model):
    class Meta:
        verbose_name = _('Language')

    name = models.CharField(
        verbose_name=_('Name'), max_length=100
    )
    code = models.CharField(
        verbose_name=_('Code'), max_length=10
    )
    status = models.BooleanField(
        verbose_name=_('Status'), default=True
    )

    def __unicode__(self):
        return self.name


class Country(models.Model):
    class Meta:
        verbose_name = _('Country')

    iso = models.CharField(
        verbose_name=_('ISO'), primary_key=True, max_length=2
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=80
    )
    printable_name = models.CharField(
        verbose_name=_('Printable name'), max_length=80
    )
    iso3 = models.CharField(
        verbose_name=_('ISO3'), max_length=3, blank=True, null=True
    )
    numcode = models.SmallIntegerField(
        verbose_name=_('Number code'), blank=True, null=True
    )

    def __unicode__(self):
        return self.printable_name