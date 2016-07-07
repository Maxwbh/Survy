# -*- coding: utf-8 -*-
# Autor: christian
from .models import Content
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect, HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required
from django.utils.translation import ugettext as _
from apps.survey.models import Survey
from apps.configuration.models import Country
from apps.mailinglist.models import List as Contact
from apps.questionnaire.models import Questionnaire
from django.contrib import messages
from gooreports.settings import TPL_NAME
from django.utils.http import is_safe_url
from django.utils import translation
from django import http
from django.conf import settings


def index(request):
    context = {
        'home': True,
        'title': 'Home',
        'active_menu': 0
    }
    return render(request, TPL_NAME + 'index.html', context)


def setlang(request, code):
    user_language = code
    translation.activate(user_language)
    request.session[translation.LANGUAGE_SESSION_KEY] = user_language
    return index(request)


def content(request, slug):
    obj_content = get_object_or_404(Content, slug=slug)
    context = {
        'title': obj_content.title,
        'content': obj_content,
        'active_menu': obj_content.id
    }
    return render(request, 'smarty/content.html', context)


@login_required
def report(request):
    context = {
        'title': _('Report'),
        'active_menu': 'action',
        'active_submenu': 'report'
    }
    user_id = request.user.id
    surveys = Survey.objects.filter(added_by_id=user_id)
    contacts = Contact.objects.filter(added_by_id=user_id, type=1)
    questionnaires = Questionnaire.objects.filter(added_by_id=user_id)
    countrys = Country.objects.filter().all()
    context.update({
        'surveys': surveys,
        'contacts': contacts,
        'questionnaires': questionnaires,
        'countrys': countrys
    })
    if request.method == 'POST':
        post = request.POST
        print post
        psurvey = post.get('survey')
        ctx = {}
        values = []
        if psurvey:
            print '*' * 150
            s = Survey.objects.get(id=psurvey)
            print '*', s
            for q in s.questionnaire_set.all():
                print '  >', q.id, q
                for qq in q.question_set.all():
                    print '    -', qq.id, qq
                    for t in qq.type_set.all():
                        print '      .', t.get_type_display()
                        values_set = t.values_set.all()
                        values.append(values_set)
                        for v in values_set:
                            print '        v', v.ans.question_id, v.get_response_total
            ctx.update({'survey': s, 'values': values})
            return render(request, 'report-view.html', ctx)
        else:
            messages.error(request, 'Select one Survey')
    print '*' * 150

    return render(request, 'report.html', context)


@login_required
def report_view(request):
    context = {
        'title': _('Report'),
        'active_menu': 'action',
        'active_submenu': 'report'
    }

    return render(request, 'report-view.html', context)


def log_in(request):
    print request.GET
    if request.method == "POST":
        username = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                messages.success(request, _('Welcome, {0}'.format(user.first_name or user)))
            else:
                messages.error(request, _('Disabled account'))
        else:
            messages.error(request, _('Invalid login'))
    return render(request, "index.html", {})


@login_required
def log_out(request):
    logout(request)
    messages.success(request, _('Closed Session.'))
    return redirect('/')


def helpdesk(request):
    return render(request, "smarty/help.html", {})
