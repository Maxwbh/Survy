# -*- coding: utf-8 -*-
from django.db import models
import django
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
import json
from ordered_model.models import OrderedModel


class Questionnaire(OrderedModel):
    class Meta(OrderedModel.Meta):
        verbose_name = _('Questionnaire')

    survey = models.ForeignKey(
        verbose_name=_('Survey'), to='survey.Survey'
    )
    name = models.CharField(
        verbose_name=_('Name'), max_length=100
    )
    other_name = models.CharField(
        verbose_name=_('Other name'), max_length=100, blank=True, null=True
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )
    status = models.BooleanField(
        verbose_name=_('Status'), default=True
    )
    order_with_respect_to = 'survey'

    def __unicode__(self):
        title = self.name
        if self.survey.tr_language_id and self.survey.translate:
            tr = self.get_language_text
            if tr:
                title = tr.questionaire_text or title
        return title

    def parse_fields(self):
        ret = []
        for question in self.question_set.all():
            ret += map(lambda x: x.parse_field(), question.type_set.all())
        return json.dumps(ret)

    @property
    def text_type(self):
        ret = False
        for q in self.question_set.all():
            if q.get_type.type in ['textAnsRow', 'textAreaRow']:
                return True
        return ret

    @property
    def get_language_text(self):
        language_text = None
        try:
            language_text = self.questionnaire_set.get(type_status=2, questionaire=self,
                                                       survey_lang_id=self.survey.tr_language_id)
        except Exception as e:
            pass
        return language_text


class Question(OrderedModel):

    class Meta(OrderedModel.Meta):
        verbose_name = _('Question')

    questionnaire = models.ForeignKey(
        verbose_name=_('Question'), to=Questionnaire
    )
    text = models.TextField(
        verbose_name=_('Text')
    )
    required = models.BooleanField(
        verbose_name=_('Required'), default=True
    )
    status = models.IntegerField(
        verbose_name=_('Status'), choices=((1, _('Active')), (2, _('Inactive'))), default=1
    )
    other_text = models.TextField(
        verbose_name=_('Other text'), blank=True, null=True
    )
    question_type = models.IntegerField(
        verbose_name=_('Type'), choices=((1, _('Single')), (2, _('Multiple')), (3, _('Choose'))), default=1
    )
    note = models.TextField(
        verbose_name=_('Note'), blank=True, null=True
    )
    ans_position = models.IntegerField(
        verbose_name=_('Answer position'), blank=True, null=True, choices=(
            (1, _('Horizontal')),
            (2, _('Vertical')),
            (4, _('Dropdown')),
            (5, _('5 Star Rating')),
            (6, _('10 Star Rating'))
        ),
    )
    free_field = models.IntegerField(
        verbose_name=_('Free field'), choices=((1, _('Yes')), (2, _('No'))), default=2, blank=True, null=True
    )
    anstype_value = models.PositiveIntegerField(
        verbose_name=_('Answer type value'), default=0
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now
    )
    # order = models.PositiveIntegerField()
    order_with_respect_to = 'questionnaire'

    def __unicode__(self):
        title = self.text
        if self.questionnaire.survey.tr_language_id and self.questionnaire.survey.translate:
            tr = self.get_language_text
            if tr:
                title = tr.question_text or title
        return title

    @property
    def id_str(self):
        return u'{0}'.format(self.id)

    @property
    def get_type(self):
        otype = self.type_set.all().first()
        return otype

    @property
    def get_language_text(self):
        language_text = None
        try:
            language_text = self.lang_set.get(type_status=3, question=self,
                                              survey_lang_id=self.questionnaire.survey.tr_language_id)
        except:
            pass
        return language_text

    def get_response(self):
        respondent_id = self.questionnaire.survey.respondent_id
        if respondent_id:
            ret = self.response_set.filter(respondent_id=respondent_id).first()
        else:
            ret = self.response_set.all()
        return ret
