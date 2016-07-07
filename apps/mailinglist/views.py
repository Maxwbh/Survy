# -*- coding: utf-8 -*-
# Autor: christian
from django.contrib.auth.models import User
import json
import unicodecsv as csv
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.core.validators import validate_email
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils.text import slugify
from django.utils.translation import ugettext as _
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils import timezone
from apps.customer.models import PersonalizeMsg, Customer
from apps.response.models import Respondent
from apps.survey.models import Survey, Password
from .forms import EmailListForm
from .models import List, Email, Campaign


def export_csv(request, pid):
    # Create the HttpResponse object with the appropriate CSV header.
    get_list = get_object_or_404(List, id=pid)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{0}.csv"'.format(slugify(get_list.name))

    writer = csv.writer(response)
    for mail_list in get_list.email_set.all():
        writer.writerow([mail_list.email, mail_list.name, mail_list.title])

    return response


@login_required
@csrf_exempt
def send_file(request):
    data_set = []
    if request.method == 'POST':
        f = request.FILES.get('contact[attachment]')
        list_id = request.POST.get('list_id')
        save = request.POST.get('save')

        if f:
            with f as csvfile:
                spamreader = csv.reader(csvfile, delimiter=',')
                for row in spamreader:
                    title, name, email = row[2], row[1], row[0]
                    msg_erro = ''
                    try:
                        validate_email(email)
                    except Exception as e:
                        msg_erro = ''.join(list(e))
                    if save and not msg_erro:
                        e = Email(
                            list_id=list_id,
                            title=title,
                            name=name,
                            email=email
                        )
                        e.save()
                    elif not save:
                        data_set.append([title, name, email, msg_erro])

        if save:
            return HttpResponseRedirect(reverse('mail-list:edit', args=(list_id,)))
    response_data = {
        'success': 'Mensagem',
        'dataSet': data_set
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json")


@login_required
def mylist(request):
    qry_list = List.objects.filter(added_by_id=request.user.pk).order_by('-timestamp')
    context = {
        'title': _("My Email List"),
        'mylist': qry_list,
        'active_menu': 'email',
    }
    return render(request, 'list.html', context)


@login_required
def campaign(request):
    qs_campaign = Campaign.objects.filter(added_by=request.user)
    context = {
        'title': _("Campaign"),
        'campaigns': qs_campaign,
        'active_menu': 'campaign',
    }
    return render(request, 'campaign.html', context)


@login_required()
def campaign_view(request, cid):
    action = request.GET.get('action')
    qs_campaign = get_object_or_404(Campaign, id=cid)
    if action == 'resend':
        respondents = qs_campaign.respondent_set.filter(respondent_status=1)
        total = respondents.count()
        for respondent in respondents:
            respondent.send_email()
        messages.info(request, "{0} E-mail's Re-send".format(total))
    context = {
        'title': _("Campaign"),
        'campaigns': qs_campaign,
        'active_menu': 'campaign',
        'form': qs_campaign,
        'surveys': Survey.objects.filter(added_by=request.user),
        'lists': List.objects.filter(added_by=request.user),
        'custom_messages': PersonalizeMsg.objects.filter(customer__added_by=request.user)
    }
    return render(request, 'campaign-view.html', context)


@login_required
def mail_list_edit(request, pid):
    qry_email_list = get_object_or_404(List, id=pid)
    form = EmailListForm(instance=qry_email_list)
    show = 'All'
    if request.method == 'POST':
        data = request.POST
        action = data.get('action')
        if action == 'add-email':
            email = Email(list=qry_email_list, email=data.get('email'), title=data.get('title'), name=data.get('name'))
            email.save()
            list = Email.objects.filter(list=qry_email_list)
        elif action == 'email-edit':
            email = Email.objects.get(id=data.get('email-id'))
            email.email = data.get('email')
            email.title = data.get('title')
            email.name = data.get('name')
            email.save()
            list = Email.objects.filter(list=qry_email_list)
        else:
            form = EmailListForm(request.POST, instance=qry_email_list)
            if form.is_valid():
                form.save()
                messages.info(request, u"Survey: {0} success changed.".format(qry_email_list.name))
                if request.POST.get('continue'):
                    return HttpResponseRedirect(reverse('mail-list:edit', args=(pid,)))
                return HttpResponseRedirect('/mail-list/list/')
    else:
        if request.GET.get('filter'):
            list = qry_email_list.email_set.filter(subscribe=True)
            show = 'Subscribes only'
        else:
            list = qry_email_list.email_set.all()

    context = {
        'title': _("Edit Mail List"),
        'mail_list': qry_email_list,
        'active_menu': 'E-Mail List',
        'form': form,
        'list': list,
        'show': show
    }
    return render(request, 'mail-list-view.html', context)


@csrf_exempt
@login_required
def mail_list_send(request):
    context = {
        'title': _("Send Survey link"),
        'active_menu': 'send',
        'surveys': Survey.objects.filter(added_by=request.user),
        'lists': List.objects.filter(added_by=request.user),
        'custom_messages': PersonalizeMsg.objects.filter(customer__user=request.user)
    }
    if request.method == 'POST':
        data = {'added_by': request.user}
        for key, value in request.POST.iteritems():
            if key in ['files', 'emails_list']:
                continue
            data.update(
                {key: value}
            )
        context.update({'form': request.POST})
        c = Campaign(**data)
        c.save()
        list_id = data.get('list_id')
        if list_id:
            lst = Email.objects.filter(list_id=list_id)
            for email in lst:
                r = Respondent(
                    campaign=c,
                    survey=c.survey,
                    language=c.language,
                    email=email.email,
                    date=timezone.now().date(),
                    list_id=data.get('list_id')
                )
                r.save()
                r.send_email()
        emails_list = request.POST.get('emails_list')
        if emails_list:
            for email in emails_list.split(','):
                r = Respondent(
                    campaign=c,
                    survey=c.survey,
                    email=email,
                    date=timezone.now().date(),
                    list_id=data.get('list_id')
                )
                r.save()
                r.send_email()
        custom_message_name = request.POST.get('custom_message_name')
        content = request.POST.get('content')
        if custom_message_name and content:
            try:
                customer = Customer.objects.get(user=request.user)
                pmsg = PersonalizeMsg(
                    customer=customer,
                    name=custom_message_name,
                    message=content
                )
                pmsg.save()
            except Exception as e:
                messages.error(request, u'Personalize message not created<br>User {0} not customer'.format(e))

        return HttpResponseRedirect(reverse('mail-list:campaign-view', args=(c.id,)))
    return render(request, 'mail-list-send.html', context)


@login_required
def mail_list_create(request):
    if request.method == 'POST':
        form = EmailListForm(request.POST)
        if form.is_valid():
            mail_list = List(**form.cleaned_data)
            mail_list.added_by = request.user
            mail_list.save()
            messages.success(request, u"List: {0} success added.".format(mail_list.name))
            return HttpResponseRedirect('/mail-list/edit/{0}'.format(mail_list.id))
    else:
        form = EmailListForm()

    context = {
        'title': _("Create Mail List"),
        'active_menu': 'E-Mail List',
        'form': form
    }
    return render(request, 'mail-list-create.html', context)


@login_required
def passwords(request):
    surveys = Survey.objects.filter(added_by=request.user)
    context = {
        'title': _("Paswords to protect your Surveys"),
        'active_menu': 'Protect your Surveys',
        'surveys': surveys,
    }
    return render(request, 'passwords.html', context)


@login_required
@require_POST
def password_generate(request):
    data = request.POST
    gen_type = data.get('radio-pwd')
    survey_id = data.get('survey')
    num_of_pwd = int(data.get('num-of-passwords' or 1))
    size_pwd = int(data.get('passw-size' or 6))
    print '---------', data

    if gen_type == 'M':
        pwd = data.get('password')
        pwds = Password.objects.filter(survey_id=survey_id, password=pwd).first()
        if not pwds:
            pwd = Password(survey_id=survey_id, password=pwd)
            pwd.save()
        else:
            messages.error(request, 'Password: {0}, alredy used'.format(pwd))
            return HttpResponseRedirect(reverse('mail-list:passwords'))
    else:
        count = 0
        while count < num_of_pwd:
            pwd = User.objects.make_random_password(size_pwd)
            p = Password.objects.filter(password=pwd, survey_id=survey_id).count()
            if p:
                print 'exist'
            else:
                p = Password(password=pwd, survey_id=survey_id)
                p.save()
                count += 1
                print 'create', pwd

    return HttpResponseRedirect(reverse('mail-list:passwords-view', args=(survey_id,)))


@login_required
def passwords_view(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    context = {
        'title': _("View passwords"),
        'active_menu': 'Protect your Surveys',
        'passwords': survey.password_set.all(),
        'survey': survey
    }
    return render(request, 'passwords_view.html', context)
