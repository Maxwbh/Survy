# -*- coding: utf-8 -*-
# Autor: christian
# coding=utf-8
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from apps.customer.models import PersonalizeMsg
from apps.survey.models import Survey
from traceback import print_exc
import sys
from .models import Email

x = Dajax()


@dajaxice_register
def get_custom_message(request, msg_id):
    try:
        msg = ""
        if msg_id:
            msg = PersonalizeMsg.objects.get(id=msg_id).message
        x.script(u"editor.summernote('code', '')")
        x.script(u"editor.summernote('code', '{0}')".format(msg))
    except Exception as e:
        x.script('swal("{0}")'.format(e))
    return x.json()


@dajaxice_register
def subscribe(request, lid):
    try:
        email = Email.objects.get(id=lid)
        new_value = False if email.subscribe else True
        email.subscribe = new_value
        email.save()
    except Exception as e:
        x.script('swal("{0}")'.format(e))
    return x.json()


@dajaxice_register
def active(request, lid):
    try:
        email = Email.objects.get(id=lid)
        new_value = 0 if email.status else 1
        email.status = new_value
        email.save()
    except Exception as e:
        x.script('swal("{0}")'.format(e))
    return x.json()


@dajaxice_register
def delete(request, lid):
    try:
        email = Email.objects.get(id=lid)
        email.delete()
        x.script('window.location.reload()')
    except Exception as e:
        x.script('swal("{0}")'.format(e))
    return x.json()


@dajaxice_register
def get_language(request, survey_id):
    try:
        if survey_id:
            survey = Survey.objects.get(id=survey_id)
            languages = survey.get_languages
            x.script('''$("[name='language_id'").prop("disabled", false);''')
            x.script('''$("[name='language_id'").empty()''')
            for lang in languages:
                x.script('''$("[name='language_id'").append('<option value="{0}">{1}</option>')'''.format(
                    lang.id, lang))
        else:
            x.script('''$("[name='language_id'").prop("disabled", true);''')
    except Exception as e:
        x.script('swal("{0}")'.format(e))
        print_exc(file=sys.stdout)
    return x.json()
