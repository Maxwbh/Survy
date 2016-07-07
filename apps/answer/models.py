# -*- coding: utf-8 -*-
import sys
import traceback

import django
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Count, Q
from django.utils.translation import ugettext as _

from apps.configuration.models import Language, Country
from apps.questionnaire.models import Questionnaire, Question
from apps.response.models import Response, Respondent
from django.apps import apps


FLAG_SEX = {
    'F': _('Female'),
    'M': _('Male'),
}
FLAG_LANG = {}
for lang in Country.objects.all().values('iso', 'printable_name'):
    FLAG_LANG[lang.get('iso')] = lang.get('printable_name')

ANS_TYPE = (
    ('checkBoxRow', 'checkBoxRow'),
    ('radioButtonRow', 'radioButtonRow'),
    ('textAnsRow', 'textAnsRow'),
    ('dateRow', 'dateRow'),
    ('ageRow', 'ageRow'),
    ('nationalityRow', 'nationalityRow'),
    ('sexRow', 'sexRow'),
    ('yesNoRow', 'yesNoRow'),
    ('numberRow', 'numberRow'),
    ('textAreaRow', 'textAreaRow'),
    ('dateRow^^Y/m/d', 'dateRow^^Y/m/d'),
    ('dateRow^^d/m/Y', 'dateRow^^d/m/Y'),
    ('dateRow^^m/d/Y', 'dateRow^^m/d/Y'),
    ('textNoteRow', 'textNoteRow'),
    ('dateRow^^Y', 'dateRow^^Y')
)

MAP_ANS_TYPE = {
    'checkBoxRow': 'checkboxes',
    'textAnsRow': 'text',
    'dateRow': 'date',
    'ageRow': 'dropdown',
    'nationalityRow': 'dropdown',
    'sexRow': 'radio',
    'yesNoRow': 'yesno',
    'radioButtonRow': 'radio',
    'numberRow': 'number',
    'textAreaRow': 'text',
    'dateRow^^Y/m/d': 'date',
    'dateRow^^d/m/Y': 'date',
    'dateRow^^m/d/Y': 'date',
    'textNoteRow': 'paragraph',
    'dateRow^^Y': 'date'
}

MAP_TYPE_ANS = {
    'checkboxes': 'checkBoxRow',
    'dropdown': 'radioButtonRow',
    'radio': 'radioButtonRow',
    'text': 'textAreaRow',
    'date': 'dateRow',
    'number': 'numberRow',
    'paragraph': 'textNoteRow',
    'yesno': 'yesNoRow'
}


class Set(models.Model):
    class Meta:
        verbose_name = _('Set')

    name = models.CharField(
            verbose_name=_('Name'), max_length=50
    )
    type = models.IntegerField(
            verbose_name=_('Type'), default=1, choices=[(1, 'Radio Buton'), (2, 'Checkbox')]
    )
    status = models.IntegerField(
            verbose_name=_('Status'), default=1
    )
    added_by = models.ForeignKey(
            verbose_name=_('Added by'), to=User, related_name='user+', blank=True, null=True
    )
    timestamp = models.DateTimeField(
            verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        return self.name


class SetValues(models.Model):
    class Meta:
        verbose_name = _('Set value')
        ordering = ['answer_value']

    set = models.ForeignKey(
            verbose_name=_('Answer set'), to=Set, related_name='answer_set_values+'
    )
    answer_text = models.CharField(
            verbose_name=_('Answer text'), max_length=250
    )
    answer_value = models.CharField(
            verbose_name=_('Answer value'), max_length=20, blank=True, null=True
    )
    answer_value_status = models.IntegerField(
            verbose_name=_('Answer value status'), default=1
    )
    timestamp = models.DateTimeField(
            verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        return self.answer_text


class Type(models.Model):
    class Meta:
        verbose_name = _('Type')
        ordering = ['id']

    question = models.ForeignKey(
        verbose_name=_('Question'), to=Question
    )
    type = models.CharField(
        verbose_name=_('Type'), max_length=15, choices=ANS_TYPE
    )
    position = models.PositiveIntegerField(
        verbose_name=_('Position'), blank=True, null=True,
        choices=[(1, 'Horizontal'), (2, 'Vertical'), (3, 'Others'), (4, 'Dropdown')]
    )
    status = models.IntegerField(
        verbose_name=_('Status'), default=0
    )
    free_field = models.IntegerField(
        verbose_name=_('Free field'), blank=True, null=True, choices=[(1, _('Yes')), (2, _('No'))]
    )
    timestamp = models.DateTimeField(
        verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        return self.get_type_display()

    @property
    def is_score(self):
        ret = self.question.ans_position in [1, 2, 4]
        return ret

    @property
    def render_field(self):
        """
        (1, _('Horizontal')),
        (2, _('Vertical')),
        (4, _('Dropdown')),
        (5, _('5 Star Rating')),
        (6, _('10 Star Rating'))
        :return:
        """
        LanguageText = apps.get_model(app_label='survey', model_name='LanguageText')
        survey = self.question.questionnaire.survey
        tpl_select = u"""
        <div class="fancy-form fancy-form-select">
            <select class="form-control"  data-parsley-group="block{group}" name="{name}" {required}>
                <option value=""></option>
                {options}
            </select>
            <i class="fancy-arrow"></i>
        </div>"""
        required = u''
        if self.question.required:
            required = u' required="true"'

        try:
            html = u''
            name = u'{0}'.format(self.question_id)
            # CHECKBOX
            if self.type == 'checkBoxRow':
                if self.question.ans_position == 4:  # DROPDOWN
                    options = ''
                    for value in self.values_set.all():
                        options += u'<option value="{value}">{label}</option>'.format(
                                value=value.ans_val, label=value
                        )
                    html = tpl_select.format(group=self.question.questionnaire.order, options=options, name=name,
                                             required=required)
                else:
                    css = ' block' if self.question.ans_position == 2 else ''

                    input_type = 'checkbox' if self.question.question_type != 1 else 'radio'

                    if required:
                        required += u' data-parsley-group="block{0}" data-parsley-multiple="multi-{1}"'.format(
                                self.question.questionnaire.order, self.question_id)

                    if self.question.question_type == 3:
                        required += u' data-parsley-maxcheck="{0}" data-parsley-mincheck="{0}" data-parsley-multiple="multi-{1}"'.format(
                                self.question.anstype_value or 1, self.question_id
                        )
                    else:
                        required += u' data-parsley-maxcheck="1"'
                    count = 1
                    count_vals = self.values_set.all().count()
                    placeholder = ''
                    vid = ''
                    for value in self.values_set.all():
                        if self.question.question_type != 1:
                            name = u'{0}:{1}'.format(value.id, self.question_id)
                        if count > 1:
                            required = u' data-parsley-multiple="multi-{0}"'.format(self.question_id)
                        if count == count_vals:
                            onclick = u'onchange="free_field_change($(this), {0})"'.format(self.question_id)
                            placeholder = value
                        else:
                            onclick = ''
                        html += u"""<span class="radio-button">
                            <input id="vid-{vid}" {onclick} type="{type}" value="{value}" name="check[{name}]"{required}
                            data-parsley-errors-container="#checkbox-errors-{id}">
                            <label for="vid-{vid}" class="checkbox{css}">{label}</label></span>
                        """.format(onclick=onclick, css=css, type=input_type, value=value.ans_val, name=name,
                                   label=value,
                                   required=required, id=self.question.id, vid=value.id)
                        count += 1
                    if self.question.free_field == 1:
                        html += u"""
                            <input type="text" class="form-control" id="free-field-{qid}" disabled
                                   placeholder="{placeholder}">
                        """.format(qid=self.question.id, placeholder=placeholder)

                    html += u"""<div id="checkbox-errors-{id}"></div>""".format(id=self.question.id)
            elif self.type == 'radioButtonRow':
                ans_position = self.question.ans_position
                if ans_position in [1, 2]:  # HORIZONTAL, VERTICAL
                    css = ' block' if ans_position == 2 else ''
                    #required += ' data-parsley-maxcheck="1"'
                    for value in self.values_set.all():
                        html += u"""<span class="radio-button">
                            <input id="{id}" type="radio" value="{value}" name="check[{name}]"{required}>
                            <label for="{id}" class="radio{css}">{label}</label></span>
                        """.format(css=css, value=value.ans_val, name=name, label=value, required=required, id=value.id)
                elif ans_position == 4:  # DROPDOWN
                    options = ''
                    for value in self.values_set.all():
                        options += u'<option value="{value}">{label}</option>'.format(
                                value=value.ans_val, label=value
                        )
                    html = tpl_select.format(group=self.question.questionnaire.order, options=options, name=name,
                                             required=required)
                elif ans_position in [5, 6]:  # STAR
                    options = ''
                    count = 5 if ans_position == 5 else 10
                    for value in range(1, count + 1):
                        options += u'<option value="{value}">{value}</option>'.format(value=value)
                    html = u"""
                        <div class="stars stars-example-fontawesome">
                            <select data-name="star-rating" name="{name}">
                                {options}
                            </select>
                        </div>""".format(options=options, name=name)
                else:
                    required += u' data-parsley-maxcheck="1"'
                    for value in self.values_set.all():
                        html += u"""<span class="radio-button">
                            <input id="{id}" type="radio" value="{value}" name="check[{name}]"{required}>
                            <label for="{id}" class="radio">{label}</label></span>
                        """.format(value=value.ans_val, name=name, label=value, required=required, id=value.id)

            elif self.type in ['textAnsRow', 'textAreaRow']:
                if self.type == 'textAreaRow':
                    html = u"""
                    <div class="fancy-form">
                      <textarea name="{name}" rows="5" class="form-control" placeholder="Fancy Textarea..."
                      {required}></textarea>
                      <i class="fa fa-text-height"></i>
                    </div>""".format(name=name, required=required)
                else:
                    html = u"""
                    <div class="fancy-form">
                        <i class="fa fa-text-width"></i>
                        <input name="{name}" type="text" class="form-control" placeholder="Tooltip" {required}>
                        <span class="fancy-tooltip top-left">
                            <em>I am a tooltip!</em>
                        </span>
                    </div>
                    """.format(name=name, required=required)
            elif self.type == 'ageRow':
                values = range(14, 81) if self.question.question_type == 1 else ('14-19', '20-29', '30-39', '40-49',
                                                                                 '50-59', '60-69', '70-79')
                options = ''
                for value in values:
                    options += u'<option value="{value}">{value}</option>'.format(
                            value=value
                    )
                if self.question.question_type == 2:
                    options += u'<option value="{value}">{value}</option>'.format(
                            value='+80'
                    )
                html = tpl_select.format(group=self.question.questionnaire.order, options=options, name=name,
                                         required=required)

            elif self.ftype.startswith('date'):
                formato = 'yyyy/mm/dd'
                if self.type == 'dateRow^^d/m/Y':
                    formato = 'dd/mm/yyyy'
                elif self.type == 'dateRow^^m/d/Y':
                    formato = 'mm/dd/yyyy'

                html = u"""
                <div class="fancy-form">
                    <i class="fa fa-calendar"></i>
                    <input name="{name}"type="text" class="form-control datepicker" data-format="{format}"
                        data-lang="en" {required}>
                </div>
                """.format(name=name, format=formato, required=required)
            elif self.type == 'nationalityRow':
                values = map(
                        lambda x: (x.get('iso'), x.get('printable_name')),
                        Country.objects.filter().values('iso', 'printable_name')
                )
                options = ''
                for value in values:
                    options += '<option value="{value}">{label}</option>'.format(
                            value=value[0], label=value[1]
                    )
                html = tpl_select.format(group=self.question.questionnaire.order, options=options, name=name,
                                         required=required)

            elif self.type == 'sexRow':
                int = 0
                for value in [('M', 'Male'), ('F', 'Female')]:
                    if int == 0 and self.question.required:
                        required = ' required="true"'
                    else:
                        required = ''
                    # TRADUCAO
                    texto = value[1]
                    if survey.tr_language_id and survey.translate:
                        type_status = 5 if value[0] == 'M' else 6
                        try:
                            trans = LanguageText.objects.get(
                                type_status=type_status, survey_lang_id=survey.tr_language_id, question=self.question
                            )
                            texto = trans.ans_text
                        except Exception as e:
                            print 'ERRRROOOO', e


                    html += u"""<span class="radio-button">
                        <input type="radio" value="{value}" name="check[{name}]"{required} data-parsley-group="group{group}"
                        data-parsley-errors-container="#checkbox-errors-{id}" id="{id1}_{value}">
                        <label class="radio" for="{id1}_{value}">{label}</label></span>
                    """.format(name=name, value=value[0], label=texto, required=required, id=self.question_id,
                               group=self.question.questionnaire.order, id1=self.id)
                    int += 1
                html += u"""<div id="checkbox-errors-{id}"></div>""".format(id=self.question.id)
            elif self.type == 'numberRow':
                html = u"""
                <input name="{name}" type="text" value="0" min="0" max="1000000" class="form-control stepper"
                {required}>
                """.format(name=name, required=required)

            elif self.ftype == 'yesno':
                for value in [('Y', 'Yes'), ('N', 'No')]:
                    texto = value[1]
                    if survey.tr_language_id and survey.translate:
                        type_status = 7 if value[0] == 'Y' else 8
                        try:
                            trans = LanguageText.objects.get(
                                type_status=type_status, survey_lang_id=survey.tr_language_id, question=self.question
                            )
                            texto = trans.ans_text
                        except Exception as e:
                            print 'ERRRROOOO', e
                        html += u"""<span class="radio-button">
                                        <input type="radio" value="{value}" name="check[{name}]"{required} id="{id}_{value}">
                                        <label for="{id}_{value}" class="radio">{label}</label></span>
                                    """.format(name=name, value=value[0], label=texto, required=required, id=self.id)
        except:
            traceback.print_exc(file=sys.stdout)
        return html

    @property
    def ftype(self):
        # if self.position == 4:
        #     return 'dropdown'
        return MAP_ANS_TYPE.get(self.type)

    @property
    def get_lang(self):
        return Language.objects.filter(status=True)

    def get_response(self):
        survey = self.question.questionnaire.survey
        date_range = self.question.questionnaire.survey.filtro.get('date_range')
        date_compare = self.question.questionnaire.survey.filtro.get('date_compare')

        filter_gender = survey.filtro.get('gender')
        filter_age = survey.filtro.get('age')
        filter_nationality = survey.filtro.get('nationality')
        filter_sections = survey.filtro.get('sections')
        filter_questions = survey.filtro.get('questions')
        filter_values = survey.filtro.get('values')
        filter_groups = survey.filtro.get('groups')
        filter_numbers = survey.filtro.get('numbers')
        args = [Q(question=self.question), Q(respondent__isnull=False)]
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
            f_date_range = Q(date__range=[dini, dfim])
            args.append(f_date_range)
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
        # print '--' * 80
        # print '***', self.question, '***'
        # print 'FILTRO...:', survey.filtro
        # print 'RESP. IDS:', respondent_ids
        # print 'RESPONDEN:', map(lambda x: x.id, Respondent.objects.filter(survey=survey))
        # print '==' * 80
        score = 0
        score2 = 0
        ret = []
        ret_dict = {}
        if self.type in ['nationalityRow', 'sexRow', 'ageRow', 'textAreaRow', 'textAnsRow', 'dateRow^^Y/m/d',
                         'dateRow^^d/m/Y', 'dateRow^^m/d/Y', 'numberRow', 'yesNoRow']:

            response_total = Response.objects.filter(*args).count()
            response = Response.objects.exclude(
                    ans_text='').filter(*args).values('ans_text').annotate(total=Count('ans_text'))
            for x in response:
                texto = x.get('ans_text')
                if self.type == 'yesNoRow':
                    texto = {'Y': _('Yes'), 'N': _('No')}.get(texto, texto)

                total = x.get('total')
                porcento = 0.0

                if self.type == 'nationalityRow':
                    texto = FLAG_LANG.get(texto, texto)
                elif self.type == 'sexRow':
                    texto = FLAG_SEX.get(texto)

                if total > 0:
                    porcento = (total * 100.0) / response_total

                ret.append(dict(
                        total=total,
                        porcento=porcento,
                        texto=texto,
                ))
            # FILTRO DATE COMPARE
            # -------------------------------------------------------------------------------
            if date_compare:
                compare1 = ret
                dini = date_compare.split(' - ')[0] + ' 00:00:00'
                dfim = date_compare.split(' - ')[1] + ' 23:59:59'
                # args.append(f_date_range)
                inc = 0
                for arg in args:
                    if arg.__dict__.get('children') == f_date_range.__dict__.get('children'):
                        args.pop(inc)
                        args.append(Q(date__range=[dini, dfim]))
                    inc += 1
                response_total = Response.objects.filter(*args).count()
                response = Response.objects.exclude(
                        ans_text='').filter(*args).values('ans_text').annotate(total=Count('ans_text'))
                compare2 = []
                for x in response:
                    texto = x.get('ans_text')
                    if self.type == 'yesNoRow':
                        texto = {'Y': _('Yes'), 'N': _('No')}.get(texto, texto)

                    total = x.get('total')
                    porcento = 0.0

                    if self.type == 'nationalityRow':
                        texto = FLAG_LANG.get(texto, texto)
                    elif self.type == 'sexRow':
                        texto = FLAG_SEX.get(texto)

                    if total > 0:
                        porcento = (total * 100.0) / response_total

                    compare2.append(dict(
                            total=total,
                            porcento=porcento,
                            texto=texto,
                    ))
                ret = []
                ret_n = {}

                for v in compare1:
                    ret_n[v.get('texto')] = {
                        'total': v.get('total'),
                        'total2': 0,
                        'porcento': v.get('porcento'),
                        'porcento2': 0
                    }

                for v in compare2:
                    if ret_n.get(v.get('texto')):
                        ret_n.get(v.get('texto')).update({
                            'total2': v.get('total'),
                            'porcento2': v.get('porcento')
                        })
                    else:
                        ret_n[v.get('texto')] = {
                            'total': 0,
                            'total2': v.get('total'),
                            'porcento': 0,
                            'porcento2': v.get('porcento')
                        }
                ret.append(ret_n)
        else:
            if self.question.ans_position in [5, 7]:
                values = 5 if self.question.ans_position == 5 else 10
                for value in range(1, values + 1):
                    porcento = soma = 0
                    total = Response.objects.filter(ans_text=value, *args).count()
                    rall = Response.objects.exclude(ans_text='').filter(*args).count()
                    if total > 0:
                        porcento = (total * 100.0) / rall
                    ret.append(dict(
                            total=total,
                            porcento=porcento,
                            texto=value,
                            soma=soma,
                    ))
                # FILTRO DATE COMPARE
                # -------------------------------------------------------------------------------
                if date_compare:
                    compare1 = ret
                    dini = date_compare.split(' - ')[0] + ' 00:00:00'
                    dfim = date_compare.split(' - ')[1] + ' 23:59:59'
                    inc = 0
                    ret = []
                    for arg in args:
                        if arg.__dict__.get('children') == f_date_range.__dict__.get('children'):
                            args.pop(inc)
                            args.append(Q(date__range=[dini, dfim]))
                        inc += 1
                    compare2 = []
                    for value in range(1, values + 1):
                        porcento = soma = 0
                        total = Response.objects.filter(ans_text=value, *args).count()
                        rall = Response.objects.exclude(ans_text='').filter(*args).count()
                        if total > 0:
                            porcento = (total * 100.0) / rall
                        compare2.append(dict(
                                total=total,
                                porcento=porcento,
                                texto=value,
                                soma=soma,
                        ))
                    ret = []
                    ret_n = {}

                    for v in compare1:
                        ret_n[v.get('texto')] = {
                            'total': v.get('total'),
                            'total2': 0,
                            'porcento': v.get('porcento'),
                            'porcento2': 0
                        }

                    for v in compare2:
                        if ret_n.get(v.get('texto')):
                            ret_n.get(v.get('texto')).update({
                                'total2': v.get('total'),
                                'porcento2': v.get('porcento')
                            })
                        else:
                            ret_n[v.get('texto')] = {
                                'total': 0,
                                'total2': v.get('total'),
                                'porcento': 0,
                                'porcento2': v.get('porcento')
                            }
                    ret.append(ret_n)
            else:
                values = self.values_set.all()
                soma_val = 0
                soma_resp = 0
                max_val = [0]
                for value in values:
                    porcento = soma = 0
                    total = Response.objects.filter(ans_text=value.ans_val, *args).count()
                    total *= 1.
                    rall = Response.objects.filter(*args).exclude(ans_text='').count()

                    if total > 0:
                        porcento = (total * 100.0) / rall
                    if value.ans_val.isdigit():
                        soma_resp += total
                        soma_val += total * int(value.ans_val)
                        max_val.append(int(value.ans_val))
                    ret.append(dict(
                        total=total,
                        porcento=porcento,
                        texto=value,
                        soma=soma,
                        score=score
                    ))
                if soma_resp and soma_val and self.type == 'radioButtonRow':
                    score = (soma_val * 1.) / soma_resp
                    ret_dict.update({
                        'score': score,
                        'max': max(max_val),
                        'css': (score * 100) / max(max_val)
                    })

                # FILTRO DATE COMPARE
                # -------------------------------------------------------------------------------
                if date_compare:
                    compare1 = ret
                    dini = date_compare.split(' - ')[0] + ' 00:00:00'
                    dfim = date_compare.split(' - ')[1] + ' 23:59:59'
                    inc = 0
                    ret = []
                    for arg in args:
                        if arg.__dict__.get('children') == f_date_range.__dict__.get('children'):
                            args.pop(inc)
                            args.append(Q(date__range=[dini, dfim]))
                        inc += 1
                    compare2 = []
                    soma_val2 = 0
                    soma_resp2 = 0
                    max_val2 = [0]
                    for value in values:
                        porcento = soma = 0
                        total = Response.objects.filter(ans_text=value.ans_val, *args).count()
                        total *= 1.
                        rall = Response.objects.filter(*args).exclude(ans_text='').count()

                        if total > 0:
                            porcento = (total * 100.0) / rall
                        if value.ans_val.isdigit():
                            soma_resp2 += total
                            soma_val2 += total * int(value.ans_val)
                            max_val2.append(int(value.ans_val))
                        compare2.append(dict(
                            total=total,
                            porcento=porcento,
                            texto=value,
                            soma=soma,
                            score=score
                        ))

                    ret = []
                    ret_n = {}

                    for v in compare1:
                        ret_n[v.get('texto')] = {
                            'total': v.get('total'),
                            'total2': 0,
                            'porcento': v.get('porcento'),
                            'porcento2': 0
                        }

                    for v in compare2:
                        if ret_n.get(v.get('texto')):
                            ret_n.get(v.get('texto')).update({
                                'total2': v.get('total'),
                                'porcento2': v.get('porcento')
                            })
                        else:
                            ret_n[v.get('texto')] = {
                                'total': 0,
                                'total2': v.get('total'),
                                'porcento': 0,
                                'porcento2': v.get('porcento')
                            }
                    ret.append(ret_n)

                    if soma_resp2 and soma_val2 and self.type == 'radioButtonRow':
                        score2 = (soma_val2 * 1.) / soma_resp2
                        ret_dict.update({
                            'score2': score2,
                            'max2': max(max_val2),
                            'css2': (score2 * 100) / max(max_val2)
                        })
        ret_dict.update({
            'values': ret
        })
        # print 'RET --', self.question, ret_dict
        return ret_dict

    @property
    def get_languages_text(self):
        ret = []
        survey = self.question.questionnaire.survey
        LanguageText = apps.get_model(app_label='survey', model_name='LanguageText')

        if self.type in ['checkBoxRow', 'radioButtonRow']:
            for value in self.values_set.all():
                type_status = 4
                vdict = {'texto': value.ans_text, 'id': value.id, 'trans': None, 'trans_id': None,
                         'type_status': type_status, 'is_trans': True, 'col': 'ans_text', 'field_id': 'ans_val_id'}
                try:
                    trans = value.lang_set.get(
                        type_status=type_status, survey_lang_id=survey.tr_language_id
                    )
                    vdict.update({'trans': trans.ans_text, 'trans_id': trans.id})
                except:
                    pass
                ret.append(vdict)
        elif self.type == 'sexRow':
            for value in ['Male', 'Female']:
                type_status = 5 if value == 'Male' else 6
                vdict = {'texto': value, 'id': self.question_id, 'trans': None, 'trans_id': None,
                         'type_status': type_status, 'is_trans': True, 'col': 'ans_text', 'field_id': 'question_id'}
                try:
                    trans = LanguageText.objects.get(
                        type_status=type_status, survey_lang_id=survey.tr_language_id, question=self.question
                    )
                    vdict.update({'trans': trans.ans_text, 'trans_id': trans.id})
                except:
                    pass
                ret.append(vdict)
        elif self.type == 'yesNoRow':
            for value in ['Yes', 'No']:
                type_status = 7 if value == 'Yes' else 8
                vdict = {'texto': value, 'id': self.question_id, 'trans': None, 'trans_id': None,
                         'type_status': type_status, 'is_trans': True, 'col': 'ans_text', 'field_id': 'question_id'}
                try:
                    trans = LanguageText.objects.get(
                        type_status=type_status, survey_lang_id=survey.tr_language_id, question=self.question
                    )
                    vdict.update({'trans': trans.ans_text, 'trans_id': trans.id})
                except:
                    pass
                ret.append(vdict)
        else:
            vdict = {
                'texto': _('the values of this field is not translatable'),
                'is_trans': False
            }
            ret.append(vdict)
        return ret

    @property
    def get_media(self):
        val = {
            'total': 0,
            'soma_val': 0,
            'soma_answers': 0,
            'values': [],
            'score': 0
        }

        if self.type == 'radioButtonRow':
            date_range = self.question.questionnaire.survey.filtro.get('date_range')
            filter_gender = self.question.questionnaire.survey.filtro.get('gender')
            args = [Q(respondent__isnull=False)]
            # FILTRO GENDER
            if filter_gender:
                responses = Response.objects.filter(question__questionnaire__survey=self.question.questionnaire.survey,
                                                    ans_text=filter_gender)
                respondents = map(lambda x: x.respondent, responses)
                args.append(Q(respondent__in=respondents))
            # FILTRO DATE RANGE
            if date_range:
                dini = date_range.split(' - ')[0] + ' 00:00:00'
                dfim = date_range.split(' - ')[0] + ' 23:59:59'
                args.append(Q(date__range=[dini, dfim]))

            stotal = []
            sval = []
            sanswers = []
            ret = []
            max_val = [0]
            sall = self.values_set.all()
            for value in sall:
                total = Response.objects.filter(question=self.question, *args).count()
                # rall = Response.objects.exclude(ans_text='').filter(
                #        question=self.question, *args).values('ans_text').annotate(total=Count('ans_text'))
                sanswers.append(total)
                soma = 0
                if value.ans_val.isdigit():
                    max_val.append(int(value.ans_val))
                    soma = int(value.ans_val) * total
                    stotal.append(soma)
                    sval.append(int(value.ans_val))
                ret.append(dict(
                        value=value.ans_val,
                        qtd_respostas=total,
                        soma=soma,
                        texto=value
                ))
            val['values'] = ret
            val['soma_answers'] = sum(sanswers)
            val['soma_val'] = sum(sval)
            val['max'] = max(max_val)
            if sum(sval):
                score = sum(sval) / (sall.count() * 1.)

                val['total'] = sum(stotal)
                val['score'] = score
                val['css'] = (score * 100) / max(max_val)
        return val


class Values(models.Model):
    class Meta:
        verbose_name = _('Value')
        ordering = ['ans_val']

    ans = models.ForeignKey(
            verbose_name=_('Answer ID'), to=Type, blank=True, null=True
    )
    ans_text = models.TextField(
            verbose_name=_('Answer text'), blank=True, null=True
    )
    other_ans_text = models.TextField(
            verbose_name=_('Other Answer text'), blank=True, null=True
    )
    ans_val = models.CharField(
            verbose_name=_('Answer value'), max_length=20, blank=True, null=True
    )
    sub_question = models.CharField(
            verbose_name=_('Sub question'), max_length=45, blank=True, null=True
    )
    ans_val_status = models.IntegerField(
            verbose_name=_('Answer value status'), default=1
    )
    timestamp = models.DateTimeField(
            verbose_name=_('Created date'), default=django.utils.timezone.now,
    )

    def __unicode__(self):
        title = self.ans_text
        survey = self.ans.question.questionnaire.survey
        if survey.tr_language_id and survey.translate:
            tr = self.get_language_text
            if tr:
                title = tr.ans_text or title
        return title

    @property
    def get_language_text(self):
        language_text = None
        try:
            language_text = self.lang_set.get(type_status=4, ans_val=self,
                                              survey_lang_id=self.ans.question.questionnaire.survey.tr_language_id)
        except Exception as e:
            print 'UNICODE', e, self.ans.question.questionnaire.survey.tr_language_id
        return language_text

    @property
    def get_response_total(self):
        total = Response.objects.filter(question_id=self.ans.question_id, ans_text=self.ans_val).count()
        rall = Response.objects.filter(question_id=self.ans.question_id).exclude(ans_text='',
                                                                                 respondent__isnull=False).count()
        try:
            tall = round(total / float(rall) * 100, 2)
        except ZeroDivisionError:
            tall = 0
        return total, str(tall).replace(',', '.')

    def set_response_value(self):
        total = Response.objects.filter(question_id=self.ans.question_id, ans_text=self.ans_val)
        for r in total:
            r.value = self
            r.save()
