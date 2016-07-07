from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext as _
import django
from django.contrib.auth.models import User
from apps.survey.models import Language, Survey

class List(models.Model):
    class Meta:
        verbose_name = _('List')

    added_by = models.ForeignKey(
        verbose_name=_('User'), to=User
    )
    name = models.CharField(
        verbose_name=_('List name'), max_length=50
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )
    status = models.NullBooleanField(
        verbose_name=_('Active'), default=1
    )
    type = models.PositiveSmallIntegerField(
        verbose_name=_('Type'), choices=((1, _('org')), (2, _('Random from the textarea'))), default=1
    )
    body = models.TextField(
        verbose_name=_('Body'), null=True, blank=True
    )

    def __unicode__(self):
        return '{0} ({1})'.format(self.name, self.emails)

    @property
    def emails(self):
        return self.email_set.all().count()


class Email(models.Model):
    class Meta:
        verbose_name = _('Email')

    list = models.ForeignKey(
        verbose_name=_('List'), to=List
    )
    email = models.EmailField(
        verbose_name=_('Email')
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=100, blank=True, null=True
    )
    title = models.CharField(
        verbose_name=_('Title'), max_length=100, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )
    status = models.PositiveSmallIntegerField(
        verbose_name=_('Email status'), default=1
    )
    subscribe = models.PositiveSmallIntegerField(
        verbose_name=_('Subscribe status'), choices=((1, _('Subscribe')), (2, _('Unsubscribe'))), default=1
    )

    def __unicode__(self):
        return self.email


class Campaign(models.Model):

    class Meta:
        ordering = ['-timestamp']

    name = models.CharField(
        verbose_name='Name', max_length=100
    )
    survey = models.ForeignKey(
        verbose_name=_('Survey'), to=Survey
    )
    language = models.ForeignKey(
        verbose_name=_('Language'), to=Language, blank=True, null=True
    )
    custom_message = models.ForeignKey(
        verbose_name=_('Custom Message'), to='customer.PersonalizeMsg', blank=True, null=True
    )
    custom_message_name = models.CharField(
        verbose_name=_('Custom Message Name'), max_length=150, blank=True, null=True
    )
    email_sender = models.EmailField(
        verbose_name=_('Email Sender')
    )
    list = models.ForeignKey(
        verbose_name=_('List'), to=List, blank=True, null=True
    )
    content = models.TextField(
        verbose_name=_('Content')
    )
    subject = models.CharField(
        verbose_name=_('Subject'), max_length=150
    )
    added_by = models.ForeignKey(
        verbose_name=_('User'), to=User
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )
    link = models.CharField(
        verbose_name=_('Link'), max_length=150, blank=True, null=True
    )

    def __unicode__(self):
        return self.name

    def send_emails(self):
        respondents = self.respondent_set.filter(mail_send_status=2)
        for respondent in respondents:
            respondent.send_email()

    @models.permalink
    def get_absolute_url(self):
        return 'mail-list:campaign-view', ([self.id])
