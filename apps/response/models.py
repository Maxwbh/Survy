# -*- coding: utf-8 -*-
import math
import random
import string
import time
import requests
import django
from django.db import models
from apps.configuration.models import Country, Language
from django.utils.translation import ugettext as _
import threading
from django.contrib.sites.models import Site
import uuid
FLAG_SEX = {
    'F': _('Female'),
    'M': _('Male'),
}
FLAG_LANG = {}
for lang in Country.objects.all().values('iso', 'printable_name'):
    FLAG_LANG[lang.get('iso')] = lang.get('printable_name')


def background(f):
    """
    a threading decorator
    use @background above the function you want to run in the background
    """
    def bg_f(*a, **kw):
        threading.Thread(target=f, args=a, kwargs=kw).start()
    return bg_f


def uniqid(prefix='', more_entropy=False):
    m = time.time()
    qid = '%8x%05x' %(math.floor(m), (m-math.floor(m))*1000000)
    if more_entropy:
        valid_chars = list(set(string.hexdigits.lower()))
        entropy_string = ''
        for i in range(0, 10, 1):
            entropy_string += random.choice(valid_chars)
        qid = qid + entropy_string
    qid = prefix + qid
    return qid


class Respondent(models.Model):
    class Meta:
        verbose_name = _('Respondent')

    email = models.CharField(
        verbose_name=_('Email'), max_length=255, blank=True, null=True
    )
    response_code = models.CharField(
        verbose_name=_('Response Code'), max_length=40,
        default=uuid.uuid3(uuid.NAMESPACE_DNS, uuid.uuid4().get_hex()).get_hex()
    )
    survey = models.ForeignKey(
        verbose_name=_('Survey'), blank=True, null=True, to='survey.Survey', related_name='get_respondent'
    )
    date = models.DateTimeField(
        verbose_name=_('Date'), blank=True, null=True, default=django.utils.timezone.now
    )
    respondent_status = models.IntegerField(
        verbose_name=_('Respondent Status'), choices=((1, _('Not Attempt')), (2, _('Survey Attempted'))), default=1
    )
    list = models.ForeignKey(
        verbose_name=_('List'), to='mailinglist.List', blank=True, null=True
    )
    after_hour = models.CharField(
        verbose_name=_('After Hour'), max_length=45, blank=True, null=True
    )
    mail_send_status = models.IntegerField(
        verbose_name=_('Mails Send Status'), choices=((1, _('Sent')), (2, _('Not sent'))), default=2
    )
    sender_email_id = models.CharField(
        verbose_name=_('Sender Email ID'), max_length=50, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created Date'), default=django.utils.timezone.now
    )
    campaign = models.ForeignKey(
        to='mailinglist.Campaign', blank=True, null=True
    )
    language = models.ForeignKey(
        to=Language, blank=True, null=True
    )
    status_ok = models.BooleanField(
        verbose_name=_('Status OK'), default=False
    )
    status_code = models.PositiveIntegerField(
        verbose_name=_('Status OK'), blank=True, null=True
    )
    status_msg = models.CharField(
        verbose_name=_('Status Message'), max_length=254, blank=True, null=True
    )

    def __str__(self):
        return self.response_code

    @models.permalink
    def get_response_url(self):
        return 'survey:response', ([self.response_code])

    @background
    def send_email(self):
        try:
            self.response_code = uuid.uuid3(uuid.NAMESPACE_DNS, str(self.pk)).get_hex()
            domain = Site.objects.get_current()
            content = self.campaign.content
            link = '<a href="{0}{1}">{2}</a>'.format(
                domain, self.get_response_url(), self.campaign.link or self.survey.title
            )
            name = title = ''
            if self.list:
                email = self.list.email_set.filter(email=self.email).first()
                if email:
                    name = email.name or ''
                    title = email.title or ''
            last_link = content.find('{{LINK}}')
            content = content.replace('{{LINK}}', link).replace('{{TITLE}}', title).replace('{{NAME}}', name).\
                replace('</code>', '').replace('<code>', '')
            if last_link > 0:
                link = ''

            response = requests.post(
                "https://api.mailgun.net/v3/sandboxb61917ecb6d142b5bf3f43da59971fd3.mailgun.org/messages",
                auth=(
                    "api", "key-141607cd15fca7ba7b40de926a51dc97"
                ),
                data={
                    "from": self.campaign.email_sender,
                    "to": self.email,
                    "subject": self.campaign.subject,
                    "html": u'<html>{0}<br><br><h3>{1}</h3></html>'.format(content, link)
                })

            rjson = response.json()
            self.status_ok = response.ok
            self.status_code = response.status_code
            self.status_msg = rjson.get('message')
            if response.ok:
                self.sender_email_id = rjson.get('id')
                self.mail_send_status = 1
            self.save()
            return response
        except Exception as e:
            print 'ERRR', e
            self.status_msg = '{0}'.format(e)
            self.save()
        return False


class Response(models.Model):
    class Meta:
        verbose_name = _('Response')

    respondent = models.ForeignKey(
        verbose_name=_('Respondent'), to=Respondent, blank=True, null=True
    )
    survey = models.ForeignKey(
        verbose_name=_('Survey'), to='survey.Survey', blank=True, null=True
    )
    question = models.ForeignKey(
        verbose_name=_('Question'), to='questionnaire.Question', blank=True, null=True
    )
    ans_text = models.TextField(
        verbose_name=_('Answer Test'), blank=True, null=True
    )
    other_text = models.CharField(
        verbose_name=_('Other Text'), max_length=255, blank=True, null=True
    )
    other_option = models.IntegerField(
        verbose_name=_('Other Options'), default=2
    )
    date = models.DateTimeField(
        verbose_name=_('Date'), blank=True, null=True, default=django.utils.timezone.now
    )
    response_status = models.IntegerField(
        verbose_name=_('Response Status'), default=1
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        ans_text = self.ans_text
        texto = ans_text
        tipo = self.question.get_type
        if tipo.type == 'nationalityRow':
            texto = FLAG_LANG.get(ans_text, ans_text)
        elif tipo.type == 'sexRow':
            texto = FLAG_SEX.get(ans_text, ans_text)
        elif tipo.values_set.count():
            v = tipo.values_set.filter(ans=tipo, ans_val=ans_text).first()
            if v:
                texto = v.ans_text
        return texto


class ResponsePlan(models.Model):
    class Meta:
        verbose_name = _('Response Plan')

    num_of_responses = models.IntegerField(
        verbose_name=_('Number os Responses')
    )
    plan_cost = models.DecimalField(
        verbose_name=_('Plan cost'), max_digits=10, decimal_places=2, blank=True, null=True
    )
    res_plan_status = models.IntegerField(
        verbose_name=_('Response Plan Status'), choices=[(1, _('Active')), (2, _('Inactive'))], default=1
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created Date'), default=django.utils.timezone.now
    )

    @property
    def amount_recv(self):
        return self.amountreceived_set.first()