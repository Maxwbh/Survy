# -*- coding: utf-8 -*-
# Autor: christian
import os
from tempfile import NamedTemporaryFile

from django import setup
from django.template import response

os.environ['DJANGO_SETTINGS_MODULE'] = 'gooreports.settings'
setup()

from django.db.models import Q, Count
from apps.answer.models import Values, Type
from apps.survey.models import Survey, Password, LanguageText
from apps.mailinglist.models import Campaign
from apps.response.models import Respondent
from apps.configuration.models import Language
from apps.questionnaire.models import Question, Questionnaire
from apps.customer.models import Customer
from apps.manager.models import PartnerDetails
from django.contrib.auth.models import User

def send_simple_message():
    import requests
    ret = requests.post(
        "https://api.mailgun.net/v3/sandboxb61917ecb6d142b5bf3f43da59971fd3.mailgun.org/messages",
        auth=(
            "api", "key-141607cd15fca7ba7b40de926a51dc97"
        ),
        data={
            "from": 'christian@gmail.br.com',
            "to": 'christian@gmail.br.com',
            "subject": 'subject',
            "html": u'<html>{0}<br><br><h3>{1}</h3></html>'.format('content', 'link')
        })
    rjson = ret.json()
    return rjson

u = User.objects.get(id=1)
u.set_password('123')
# u.is_staff = -1
u.save()
