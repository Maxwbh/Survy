# -*- coding: utf-8 -*-
from django.db import models
from django.db.models import Count, Q
from django.utils import timezone
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
from apps.configuration.models import Language
from apps.questionnaire.models import Questionnaire, Question
from apps.response.models import Respondent, ResponsePlan
from apps.questionnaire.models import Question
from apps.answer.models import Values, Type
from apps.response.models import Response
import django
from sorl.thumbnail import ImageField
from datetime import timedelta
from django.core.exceptions import MultipleObjectsReturned


class Survey(models.Model):
    class Meta:
        verbose_name = _('Survey')
        ordering = ['-timestamp']

    filtro = {}
    respondent_id = False
    tr_language_id = False
    translate = True

    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, blank=True, null=True
    )
    title = models.CharField(
        verbose_name=_('Title'), max_length=50
    )
    description = models.TextField(
        verbose_name=_('Description')
    )
    custommsg = models.TextField(
        verbose_name=_('Custom message'), blank=True, null=True
    )
    other_title = models.CharField(
        verbose_name=_('Other title'), max_length=50, blank=True, null=True
    )
    other_description = models.TextField(
        verbose_name=_('Other description'), blank=True, null=True
    )
    other_custommsg = models.TextField(
        verbose_name=_('Other custom message'), blank=True, null=True
    )
    lang = models.ForeignKey(
        verbose_name=_('Language'), to=Language
    )
    image = ImageField(
        verbose_name=_('Image'), upload_to='survey', blank=True, null=True
    )
    status = models.BooleanField(
        verbose_name=_('Status'), default=1
    )
    ref_survey_id = models.CharField(
        verbose_name=_('Ref. Survei ID'), max_length=45, blank=True, null=True
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        return self.title

    @property
    def get_title(self):
        title = self.title
        if self.tr_language_id and self.translate:
            tr = self.get_language_text
            if tr:
                title = tr.survey_name or title
        return title

    @property
    def get_description(self):
        title = self.description
        if self.tr_language_id and self.translate:
            tr = self.get_language_text
            if tr:
                title = tr.survey_descp or title
        return title

    @property
    def get_custommsg(self):
        title = self.custommsg
        if self.tr_language_id and self.translate:
            tr = self.get_language_text
            if tr:
                title = tr.question_custommsg or title
        return title

    @property
    def get_languages(self):
        languages = [self.lang]
        lngs = self.languagetext_set.values('survey_lang').annotate(lang_id=Count('survey_lang'))
        for lng in lngs:
            try:
                languages.append(Language.objects.get(id=lng.get('survey_lang')))
            except:
                pass
        return languages


    @property
    def get_header(self):
        header = Values.objects.filter(
            ans__type='radioButtonRow', ans__question__questionnaire__survey_id=self.id,
            ans__question__ans_position__in=[1, 2, 4],
        ).values('ans_text').annotate(s=Count('ans_text'))
        titulos = map(lambda x: x.get('ans_text'), header)
        return titulos

    def unused_password(self):
        return self.password_set.filter(use_status=2)

    def expired_password(self):
        return self.password_set.filter(expiry_date__lte=timezone.now())

    @property
    def get_language_text(self):
        language_text = None
        try:
            language_text = LanguageText.objects.get(type_status=1, survey=self, survey_lang_id=self.tr_language_id)
        except MultipleObjectsReturned:
            language_text = LanguageText.objects.filter(
                type_status=1, survey=self, survey_lang_id=self.tr_language_id
            ).first()
        except Exception as e:
            pass
        return language_text

    @property
    def get_questions_rate(self):
        titulos = self.get_header
        ret = []
        survey = self
        date_range = survey.filtro.get('date_range')
        args = []
        filter_gender = survey.filtro.get('gender')
        filter_age = survey.filtro.get('age')
        filter_nationality = survey.filtro.get('nationality')
        filter_sections = survey.filtro.get('sections')
        filter_questions = survey.filtro.get('questions')
        filter_values = survey.filtro.get('values')
        filter_groups = survey.filtro.get('groups')
        filter_numbers = survey.filtro.get('numbers')
        respondent_ids = []
        # FILTRO AGE
        if filter_age:
            question_ids = map(lambda x: x.question_id, Type.objects.filter(type='ageRow',
                                                                            question__questionnaire__survey=survey))
            question = Question.objects.filter(id__in=question_ids).first()
            if question:
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    ans_text__in=filter_age, question=question)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO GENDER
        if filter_gender:
            question_ids = map(lambda x: x.question_id, Type.objects.filter(type='sexRow',
                                                                            question__questionnaire__survey=survey))
            question = Question.objects.filter(id__in=question_ids).first()
            if question:
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    ans_text__in=filter_gender, question=question)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO NATIONALITY
        if filter_nationality:
            responses = Response.objects.filter(survey=survey,
                                                ans_text__in=filter_nationality, respondent__isnull=False)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO DATE RANGE
        if date_range:
            dini = date_range.split(' - ')[0] + ' 00:00:00'
            dfim = date_range.split(' - ')[1] + ' 23:59:59'
            args.append(Q(date__range=[dini, dfim]))
        # FILTRO SECTIONS
        if filter_sections:
            responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                question__questionnaire_id__in=filter_sections)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO QUESTIONS
        if filter_questions:
            responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                question_id__in=filter_questions)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO GROUPS
        if filter_groups:
            responses = Respondent.objects.filter(survey=survey, list__in=filter_groups)
            respondent_ids.append(map(lambda x: x.id, responses))
        # FILTRO NUMBERS
        if filter_numbers:
            t = Type.objects.filter(type='numberRow', question__questionnaire=survey.questionnaire_set.all())
            responses = Response.objects.filter(survey=survey, question__in=map(lambda x: x.question, t),
                                                ans_text__in=filter_numbers, respondent__isnull=False)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO VALUES
        if filter_values:
            # values_ids = Values.objects.filter(id__in=filter_values)
            # questions_ids = map(lambda x: x.ans.question.id, values_ids)
            for v in filter_values:
                values_id = Values.objects.get(id=v)
                question_id = values_id.ans.question.id
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    question_id=question_id, ans_text=values_id.ans_val)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))

        if respondent_ids:
            new = reduce(set.intersection, map(set, respondent_ids))
            # for i in respondent_ids:
            #     if i and i not in new:
            #         new.append(i)
            args.append(Q(respondent_id__in=list(new)))
        for questionnaire in self.questionnaire_set.all():
            dct_quest = {questionnaire.name: []}
            for question in questionnaire.question_set.all():
                type_id = 0
                score = 0
                otype = question.get_type
                if otype:
                    type_id = otype.id
                    if otype.type != 'radioButtonRow' or question.ans_position in [5, 7, None]:
                        continue
                    score = otype.get_response().get('score')
                else:
                    continue
                question_values = []
                inc = len(titulos)
                max_val = [0]
                for titulo in titulos:
                    values = Values.objects.filter(ans_text=titulo, ans_id=type_id)
                    if values:
                        for value in values:
                            if value.ans_val.isdigit():
                                max_val.append(int(value.ans_val))
                            count = Response.objects.filter(question_id=question.id, ans_text=value.ans_val,
                                                            *args).count() or 0
                            question_values.append(count)
                    else:
                        question_values.append(0)
                    inc -= 1
                    if inc == 0 and score:
                        question_values.append('%.2f' % score)
                    dct = {question.text: question_values}
                dct_quest[questionnaire.name].append(dct)
            ret.append(dct_quest)
        new = []
        for x in ret:
            for k, v in x.iteritems():
                if v:
                    new.append({k: v})
        return new

    @property
    def get_totals(self):
        questionnaire_set = self.questionnaire_set.all()
        questionnaires_total = questionnaire_set.count()
        questions_total = 0
        types_total = 0
        responses_total = self.get_respondent.filter(respondent_status=2).count()
        graph = []
        for questionnaire in questionnaire_set:
            question_set = questionnaire.question_set.all()
            questions_total += question_set.count()
            for question in question_set:
                type_set = question.type_set.all()
                types_total = type_set.all()
                for type in type_set:
                    values_set = type.values_set.all()
                    graph.append(values_set)
                    # for value in values_set:
                    #     responses_total += value.get_response_total[0]
        ret = {
            'questionnaires_total': questionnaires_total,
            'questions_total': questions_total,
            'types_total': types_total,
            'responses_total': responses_total,
            'graph': graph
        }
        return ret

    @property
    def get_respondent_ids(self):
        survey = self
        date_range = survey.filtro.get('date_range')
        args = []
        filter_gender = survey.filtro.get('gender')
        filter_age = survey.filtro.get('age')
        filter_nationality = survey.filtro.get('nationality')
        filter_sections = survey.filtro.get('sections')
        filter_questions = survey.filtro.get('questions')
        filter_values = survey.filtro.get('values')
        filter_groups = survey.filtro.get('groups')
        filter_numbers = survey.filtro.get('numbers')
        respondent_ids = []
        # FILTRO AGE
        if filter_age:
            question_ids = map(lambda x: x.question_id, Type.objects.filter(type='ageRow',
                                                                            question__questionnaire__survey=survey))
            question = Question.objects.filter(id__in=question_ids).first()
            if question:
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    ans_text__in=filter_age, question=question)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO GENDER
        if filter_gender:
            question_ids = map(lambda x: x.question_id, Type.objects.filter(type='sexRow',
                                                                            question__questionnaire__survey=survey))
            question = Question.objects.filter(id__in=question_ids).first()
            if question:
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    ans_text__in=filter_gender, question=question)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO NATIONALITY
        if filter_nationality:
            responses = Response.objects.filter(survey=survey,
                                                ans_text__in=filter_nationality, respondent__isnull=False)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO DATE RANGE
        if date_range:
            dini = date_range.split(' - ')[0] + ' 00:00:00'
            dfim = date_range.split(' - ')[1] + ' 23:59:59'
            args.append(Q(date__range=[dini, dfim]))
        # FILTRO SECTIONS
        if filter_sections:
            responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                question__questionnaire_id__in=filter_sections)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO QUESTIONS
        if filter_questions:
            responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                question_id__in=filter_questions)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO GROUPS
        if filter_groups:
            responses = Respondent.objects.filter(survey=survey, list__in=filter_groups)
            respondent_ids.append(map(lambda x: x.id, responses))
        # FILTRO NUMBERS
        if filter_numbers:
            t = Type.objects.filter(type='numberRow', question__questionnaire=survey.questionnaire_set.all())
            responses = Response.objects.filter(survey=survey, question__in=map(lambda x: x.question, t),
                                                ans_text__in=filter_numbers, respondent__isnull=False)
            respondent_ids.append(map(lambda x: x.respondent.id, responses))
        # FILTRO VALUES
        if filter_values:
            # values_ids = Values.objects.filter(id__in=filter_values)
            # questions_ids = map(lambda x: x.ans.question.id, values_ids)
            for v in filter_values:
                values_id = Values.objects.get(id=v)
                question_id = values_id.ans.question.id
                responses = Response.objects.filter(survey=survey, respondent__isnull=False,
                                                    question_id=question_id, ans_text=values_id.ans_val)
                respondent_ids.append(map(lambda x: x.respondent.id, responses))

        if respondent_ids:
            new = reduce(set.intersection, map(set, respondent_ids))
            # for i in respondent_ids:
            #     if i and i not in new:
            #         new.append(i)
            Q(respondent_id__in=list(new))
            respondent_ids = self.get_respondent.filter(Q(id__in=list(new)), respondent_status=2)
        else:
            respondent_ids = self.get_respondent.filter(respondent_status=2)
        return respondent_ids


class Allotment(models.Model):
    class Meta:
        verbose_name = _('Allotment')

    user = models.ForeignKey(
        verbose_name=_('User'), to=User, related_name='users+'
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, related_name='added_by+'
    )
    survey = models.ForeignKey(
        verbose_name=_('Survey'), to=Survey
    )
    add_date = models.DateTimeField(
        verbose_name=_('Added date')
    )
    status = models.IntegerField(
        verbose_name=_('Status'), choices=((1, _('Send')), (2, _('Accept')), (3, _('Reject'))), default=1
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )


class LanguageText(models.Model):
    class Meta:
        verbose_name = _('Language Text')

    survey = models.ForeignKey(
        verbose_name=_('Survey'), to=Survey
    )
    survey_lang = models.ForeignKey(
        verbose_name=_('Survey  language'), to=Language, blank=True, null=True
    )
    questionaire = models.ForeignKey(
        verbose_name=_('Questionnaire'), to=Questionnaire, related_name='questionnaire_set', blank=True, null=True
    )
    question = models.ForeignKey(
        verbose_name=_('Question'), to=Question, related_name='lang_set', blank=True, null=True
    )
    ans_val = models.ForeignKey(
        verbose_name=_('Answer value ID'), to=Values, related_name='lang_set', blank=True, null=True
    )
    survey_name = models.CharField(
        verbose_name=_('Survey name'), max_length=200, blank=True, null=True
    )
    survey_descp = models.TextField(
        verbose_name=_('Survey description'), max_length=200, blank=True, null=True
    )
    questionaire_text = models.TextField(
        verbose_name=_('Questionnaire text'), blank=True, null=True
    )
    question_text = models.TextField(
        verbose_name=_('Question text'), blank=True, null=True
    )
    ans_text = models.CharField(
        verbose_name=_('Answer text'), max_length=65, blank=True, null=True
    )
    type_status = models.IntegerField(
        verbose_name=_('type status'), blank=True, null=True,
        choices=[(1, 'Survey'), (2, 'Question'), (3, 'Section'), (4, 'Answer'), (5, 'Male'), (6, 'Female'), (7, 'Yes'),
                 (8, 'No'), (9, 'Note')]
    )
    question_custommsg = models.TextField(
        verbose_name=_('Question custom message'), blank=True, null=True
    )
    note_text = models.TextField(
        verbose_name=_('Note'), blank=True, null=True
    )


class Password(models.Model):
    class Meta:
        verbose_name = _('Password')

    survey = models.ForeignKey(
        verbose_name=_('Survey'), to=Survey
    )
    password = models.CharField(
        verbose_name=_('Password'), max_length=45
    )
    use_status = models.IntegerField(
        verbose_name=_('User Status'), default=2
    )
    added_by = models.ForeignKey(
        verbose_name=_('Added by'), to=User, related_name='added_by+', blank=True, null=True
    )
    creation_date = models.DateTimeField(
        verbose_name=_('Creation Date'), default=django.utils.timezone.now
    )
    expiry_date = models.DateTimeField(
        verbose_name=_('Expiry Date'), default=django.utils.timezone.now() + timedelta(days=365)
    )