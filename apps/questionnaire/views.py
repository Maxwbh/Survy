# -*- coding: utf-8 -*-
# Autor: christian
import json

from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils.translation import ugettext as _
from django.views.decorators.csrf import csrf_exempt

from apps.answer.models import MAP_TYPE_ANS, Type, Values, Set, SetValues
from apps.configuration.models import Language
from apps.survey.models import Survey
from .models import Questionnaire, Question
from .forms import QuestionnaireForm


@login_required
@csrf_exempt
def section_save(request):
    pk = request.POST.get('pk')
    value = request.POST.get('value')
    q = Questionnaire.objects.get(id=pk)
    q.name = value
    q.save()
    return JsonResponse({})


@login_required
@csrf_exempt
def question_save(request, qid):
    try:
        print '*' * 100
        data = json.loads(request.body)
        jquestion = data.get('question')
        jform = data.get('form')
        jvalues = json.loads(data.get('values'))
        answer_type = jform.get('type')
        print 'Q', jquestion
        print 'F', jform
        print '=', data
        # VALUES ************************
        values = {}
        safe_values = False
        for v in jvalues:
            n, i = v.get('name').split('-')
            if n == 'value':
                if values.get(i):
                    values.get(i).update({'value': v.get('value')})
                else:
                    values.update({i: {'value': v.get('value')}})
            else:
                if values.get(i):
                    values.get(i).update({'answer': v.get('value')})
                else:
                    values.update({i: {'answer': v.get('value')}})

        if data.get('action') == 'edit':
            ans_type = Type.objects.get(id=int(data.get('type_id')))
            ans_type.type = answer_type
            question = ans_type.question
            # ALTERAR O QUESTION
            question.required = jquestion.get('required')
            question.text = jquestion.get('text')
            free_field = 1
            if not jquestion.get('free_field'):
                free_field = 2

            question.free_field = free_field
            # ALTERAR O TYPES
            if answer_type == 'checkBoxRow':
                ans_type.position = jform.get('ansPosC')
                question.ans_position = int(jform.get('ansPosC'))
                question.question_type = int(jform.get('ansTypeC'))
                if jform.get('ansTypeC') == '3':
                    if jform.get('selAnsTypeCC'):
                        question.anstype_value = jform.get('selAnsTypeCC')
                safe_values = True
                v = ans_type.values_set.all()
                v.delete()
            elif answer_type == 'radioButtonRow':
                question.ans_position = jform.get('ansTypeR')
                if jform.get('ansTypeR') in ['1', '2', '4']:
                    safe_values = True
                    v = ans_type.values_set.all()
                    v.delete()
            elif answer_type in ['textAnsRow', 'textAreaRow']:
                ans_type.type = jform.get('ansTypeT')
            elif answer_type == 'ageRow':
                question.question_type = jform.get('ansTypeA')
            elif answer_type == 'dateRow':
                ans_type.type = 'dateRow^^{0}'.format(jform.get('ansTypeD'))
            question.save()
            ans_type.save()
            print 'anstype', answer_type
        else:
            question = Question(
                questionnaire_id=qid,
                required=jquestion.get('required'),
                text=jquestion.get('text')
            )
            ans_type = Type(type=answer_type)
            if answer_type == 'checkBoxRow':
                ans_type.position = jform.get('ansPosC')
                question.ans_position = jform.get('ansPosC')
                question.question_type = jform.get('ansTypeC')
                if jform.get('ansTypeC') == '3':
                    question.anstype_value = jform.get('selAnsTypeCC')
                safe_values = True
            elif answer_type == 'radioButtonRow':
                question.ans_position = jform.get('ansTypeR')
                if jform.get('ansTypeR') in ['1', '2', '4']:
                    safe_values = True
            elif answer_type in ['textAnsRow', 'textAreaRow']:
                ans_type.type = jform.get('ansTypeT')
            elif answer_type == 'ageRow':
                question.question_type = jform.get('ansTypeA')
            elif answer_type == 'dateRow':
                ans_type.type = 'dateRow^^{0}'.format(jform.get('ansTypeD'))
            elif answer_type == 'nationalityRow':
                pass
            elif answer_type == 'sexRow':
                pass
            elif answer_type == 'numberRow':
                pass
            question.save()
            ans_type.question = question
            ans_type.save()
            if answer_type == 'yesNoRow':
                yes_value = Values(
                    ans=ans_type, ans_text=_('Yes'), ans_val='Y'
                )
                yes_value.save()
                no_value = Values(
                    ans=ans_type, ans_text=_('No'), ans_val='N'
                )
                no_value.save()

        if safe_values and values:
            for k, v in values.iteritems():
                ovalue = Values(
                    ans=ans_type
                )
                answer = v.get('answer', v.get('value'))
                value = v.get('value', answer)
                if answer:
                    ovalue.ans_text = answer
                    ovalue.ans_val = value
                    ovalue.save()
        messages.info(request, 'Question {0} successfully saved'.format(question))
    except Exception as e:
        print 'err', e
        traceback.print_exc(file=sys.stdout)
    return JsonResponse({'success': True, 'question_id': question.id})


@login_required
@csrf_exempt
def add_value(request):
    if request.method == 'POST':
        data = dict(request.POST)
        data.update({'id': 10})
        print 'data', data

    response = JsonResponse(data)
    return response


@login_required
def question_remove(request, qid):
    question = get_object_or_404(Question, id=qid)
    survey_id = question.questionnaire.survey_id
    question.delete()
    return HttpResponseRedirect(reverse('survey:edit', args=(survey_id,)))


@login_required
def get_set(request):
    sid = request.GET.get('sid')
    sets = SetValues.objects.filter(set_id=sid).values('answer_text', 'answer_value')
    return JsonResponse(list(sets), safe=False)


@login_required
def question_add(request, qid):
    questionnaire = get_object_or_404(Questionnaire, id=qid)
    sets = Set.objects.filter(added_by=request.user)
    context = {
        'title': _("Question Add"),
        'active_menu': 'questionnaire',
        'questionnaire': questionnaire,
        'lang': Language.objects.all(),
        'sets': sets,
        'action': 'add',
    }
    return render(request, 'question-add.html', context)


@login_required
def question_edit(request, qid):
    question = get_object_or_404(Question, id=qid)
    sets = Set.objects.filter(added_by=request.user)
    context = {
        'title': _("Question Add"),
        'active_menu': 'questionnaire',
        'questionnaire': question.questionnaire,
        'lang': Language.objects.all(),
        'question': question,
        'type': question.type_set.all().first(),
        'sets': sets,
        'action': 'edit'
    }
    return render(request, 'question-add.html', context)


# --------------------------------------------------------
# CREATE QUESTIONNAIRE/SECTION
# --------------------------------------------------------
@login_required
def questionnaire_create(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    if request.method == 'POST':
        form = QuestionnaireForm(request.POST)
        if form.is_valid():
            questionnaire = Questionnaire(**form.cleaned_data)
            questionnaire.added_by = request.user
            questionnaire.survey = survey
            questionnaire.save()
            return HttpResponseRedirect(reverse('questionnaire:question-add', args=(questionnaire.id,)))
    else:
        form = QuestionnaireForm()
    context = {
        'title': _("Add Section"),
        'active_menu': 'questionnaire',
        'survey': survey,
        'form': form
    }
    return render(request, 'questionnaire-create.html', context)


@login_required
def questionnaire_edit(request, qid):
    questionnaire = get_object_or_404(Questionnaire, id=qid)
    context = {
        'title': _("Edit Section"),
        'active_menu': 'questionnaire',
        'questionnaire': questionnaire
    }
    return render(request, 'questionnaire-edit.html', context)


import sys, traceback

@csrf_exempt
def questionnaire_save(request):
    try:
        data = request.POST
        payload = data.get('payload')
        fields = json.loads(payload).get('fields')
        print '*' * 100
        print data
        print '*' * 100

        if data.get('sid'):  # survey id
            # criar questionario
            questionnaire = Questionnaire(
                survey_id=data.get('sid'),
                name=data.get('qname'),
                added_by=request.user
            )
            questionnaire.save()
            print 'QQQ', questionnaire.id

            print '*' * 100
            print '>', fields
            for field in fields:
                cid = field.get('cid')
                field_type = field.get('field_type')
                question = Question(
                    questionnaire=questionnaire,
                    text=field.get('label'),
                )
                question.save()
                o_type = Type(
                    question=question,
                    type=MAP_TYPE_ANS.get(field_type)
                )
                if field_type == 'dropdown':
                    o_type.position = 4
                o_type.save()

                if field_type in ['checkboxes', 'dropdown', 'radio']:
                    options = field['field_options']['options']
                    for opt in options:
                        value = Values(
                            ans=o_type,
                            ans_text=opt.get('label'),
                            ans_val=opt.get('value'),
                        )
                        value.save()
                if isinstance(cid, unicode):
                    field_options = field.get('field_options')
                    print 'f', field_options
                for k in field:
                    print k
                print '-' * 100
            print '*' * 100
    except Exception as e:
        traceback.print_exc(file=sys.stdout)
    return JsonResponse({})


def move(request, pdir, qid, qsid=False):
    """
    Change Questionnaire Order
    :param request: Django Request
    :param pdir: up/down
    :param qid: Questionnaire id
    :param qsid: Question id
    :return: Page survey edit
    """
    questionnaire = get_object_or_404(Questionnaire, id=qid)
    if qsid:
        question = get_object_or_404(Question, id=qsid)
        if pdir == 'up':
            question.up()
        else:
            question.down()
    else:
        if pdir == 'up':
            questionnaire.up()
        else:
            questionnaire.down()
    return HttpResponseRedirect(reverse('survey:edit', args=(questionnaire.survey_id,)))
