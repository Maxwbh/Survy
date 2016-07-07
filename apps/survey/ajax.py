# -*- coding: utf-8 -*-
# Autor: christian
# coding=utf-8
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from apps.questionnaire.models import Question, Questionnaire
import time
x = Dajax()


@dajaxice_register
def delete_question(request, qid):
    try:
        question = Question.objects.get(id=qid)
        questionnaire_id = question.questionnaire_id

        question.delete()
        div_id = '$("[data-id={0}]").hide("slow")'.format(qid)
        x.script(div_id)

        if not Question.objects.filter(questionnaire_id=questionnaire_id):
            questionnaire = Questionnaire.objects.get(id=questionnaire_id)
            questionnaire.delete()
            div_id = '$("#div-questionaire-{0}").hide("slow")'.format(questionnaire_id)
            x.script(div_id)

    except Exception as e:
        div_id = '$("#div-question-{0}").show("slow")'.format(qid)
        x.script(div_id)
        div_id = '$("#div-questionaire-{0}").show("slow")'.format(questionnaire_id)
        x.script(div_id)
        x.script('swal("{0}")'.format(e))
    return x.json()


@dajaxice_register
def change_question_order(request, qid, data):
    i = 0
    for d in data:
        question = Question.objects.get(id=d.get('id'))
        order = question.order
        if order != i:
            question.order = i
            question.save()
        i += 1
    x.script("$('#nestable-{0}').unblock()".format(qid))
    return x.json()
