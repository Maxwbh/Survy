# -*- coding: utf-8 -*-
# Autor: christian
from tempfile import NamedTemporaryFile

import xlwt
import StringIO
import unicodecsv as csv
import xlrd
from django.db.models import Count, Max, Min, Q
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader, Context
from django.utils.translation import ugettext as _
from django.utils.text import slugify
from xhtml2pdf import pisa

from apps.answer.models import Type, Values
from apps.configuration.models import Language
from apps.questionnaire.models import Questionnaire, Question
from apps.response.models import Response, Respondent, ResponsePlan
from .forms import SurveyForm
from .models import Survey, Password, LanguageText
from apps.configuration.models import Country
from django.utils import timezone
from libs.util.paginar import listing as paginar


@login_required
def dashboard(request):
    customer = request.user.get_customer
    total_survey = customer.total_survey
    if total_survey:
        num_of_surveys = total_survey - customer.num_of_surveys
        percent = (num_of_surveys * 100.0) / total_survey
    else:
        num_of_surveys = percent = 0
    context = {
        'title': _('Dashboard'),
        'active_menu': 'Dashboard',
        'total_survey': total_survey,
        'num_of_surveys': num_of_surveys,
        'percent': percent,
        'surveys': request.user.survey_set.all(),
        'plans': ResponsePlan.objects.filter(res_plan_status=1)
    }
    return render(request, 'dashboard.html', context)


@login_required
def survey_list(request):
    surveys = Survey.objects.filter(added_by_id=request.user.pk).order_by('-timestamp')
    context = {
        'title': _("List Survey's"),
        'surveys': surveys,
        'active_menu': 'Survey',
        'languages': Language.objects.filter(status=True)
    }
    return render(request, 'survey-list.html', context)


@login_required
def survey_edit(request, sid):
    survey = get_object_or_404(Survey, id=sid)

    if request.method == 'POST':
        form = SurveyForm(request.POST, request.FILES, instance=survey)
        if form.is_valid():
            form.save()
            messages.info(request, u"Survey: {0} success changed.".format(survey.title))
            if request.POST.get('continue') == '1':
                return HttpResponseRedirect(
                    reverse('survey:edit', args=(survey.id,))
                )
            return HttpResponseRedirect('/survey/list/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = SurveyForm(instance=survey)

    context = {
        'title': _("Edit Survey"),
        'survey': survey,
        'active_menu': 'Survey',
        'form': form
    }
    return render(request, 'survey-edit.html', context)


def get_filter(request):
    ret = []
    filtro = request.GET.get('filtro')
    ids = request.GET.getlist('ids[]')
    if filtro == 'sections':
        questions = Question.objects.filter(questionnaire_id__in=ids)
        for question in questions:
            t = question.get_type
            if t.type == 'radioButtonRow':
                ret.append({
                    'id': question.id, 'text': question.text
                })
    elif filtro == 'questions':
        values = Values.objects.filter(ans__question_id__in=ids).order_by('ans', 'ans_val')
        for value in values:
            ret.append({
                'id': value.id, 'text': '{0}:{1}'.format(value.ans_val, value.ans_text)
            })

    return JsonResponse(ret, safe=False)


def report_print(template, context, report_name='report'):
    t = loader.get_template(template)
    c = Context(context)
    rendered = t.render(c)
    pdf = StringIO.StringIO()
    pisa.CreatePDF(StringIO.StringIO(rendered.encode('utf-8')), pdf)

    # HTTP response headers
    response = HttpResponse(content_type="application/pdf")
    response["Cache-Control"] = "max-age=0"
    response["Accept-Ranges"] = "none"
    response["Content-Disposition"] = "attachment; filename={0}.pdf".format(report_name)
    # send the generated PDF
    response.write(pdf.getvalue())
    return response


def csv_from_excel(fname, response):
    wb = xlrd.open_workbook(fname)
    sh = wb.sheet_by_name('sheet1')
    # your_csv_file = NamedTemporaryFile(delete=False)

    wr = csv.writer(response, quoting=csv.QUOTE_ALL)

    for rownum in xrange(sh.nrows):
        wr.writerow(sh.row_values(rownum))
    return response


@login_required
def survey_view(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    contacts = survey.get_respondent.filter(list__isnull=False)
    t = Type.objects.filter(type='numberRow', question__questionnaire=survey.questionnaire_set.all())
    numbers = map(lambda x: x.get('ans_text'),
                  Response.objects.filter(survey=survey, question__in=map(lambda x: x.question, t)).values(
                      'ans_text').annotate(text=Count('ans_text')))

    r = survey.get_respondent.all()
    data_max = r.aggregate(data=Max('timestamp')).get('data')
    data_min = r.aggregate(data=Min('timestamp')).get('data')
    frm_data_mim = ''
    if data_min:
        frm_data_mim = data_min.strftime('%Y-%m-%d')
    frm_data_max = ''
    if frm_data_max:
        frm_data_max = data_max.strftime('%Y-%m-%d')
    context = {
        'title': _("View Survey"),
        'active_menu': 'Survey',
        'group_age': ('14-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79'),
        'individual_age': map(lambda x: str(x), range(14, 81)),
        'contacts': contacts,
        'numbers': numbers,
        'form': {
            'filter_date_ini': frm_data_mim,
            'filter_date_fim': frm_data_max
        }
    }
    template = 'survey-view.html'
    action = 'report'
    if request.method == 'POST':
        data = request.POST
        survey.filtro = {}
        report_type = data.get('report_type')
        filter_date_ini = data.get('filter_date_ini')
        filter_date_fim = data.get('filter_date_fim')
        filter_compare_ini = data.get('filter_compare_ini')
        filter_compare_fim = data.get('filter_compare_fim')
        filter_gender = data.getlist('filter_gender')[0]
        filter_age = data.getlist('filter_age')
        filter_nationality = data.getlist('filter_nationality')
        filter_sections = data.getlist('filter_sections')
        filter_questions = data.getlist('filter_questions')
        filter_values = data.getlist('filter_values')
        filter_groups = data.getlist('filter_groups')
        filter_numbers = data.getlist('filter_numbers')
        action = data.get('action')
        form = dict(
            report_type=report_type,
            filter_date_ini=filter_date_ini,
            filter_date_fim=filter_date_fim,
            filter_compare_ini=filter_compare_ini,
            filter_compare_fim=filter_compare_fim,
            filter_gender=filter_gender,
            filter_age=filter_age,
            filter_nationality=filter_nationality,
            filter_sections=filter_sections,
            filter_values=filter_values,
        )
        # FILTER DATE_RANGE
        if filter_date_ini and filter_date_fim:
            survey.filtro.update({'date_range': ' - '.join([filter_date_ini, filter_date_fim])})
        # FILTER DATE_COMPARE
        if filter_compare_ini and filter_compare_fim:
            survey.filtro.update({'date_compare': ' - '.join([filter_compare_ini, filter_compare_fim])})
        # FILTER GENDER
        if filter_gender in ['M', 'F']:
            survey.filtro.update({'gender': filter_gender[0]})
        # FILTER NATIONALITY
        if filter_nationality:
            survey.filtro.update({'nationality': filter_nationality})
        # FILTER AGE
        if filter_age:
            survey.filtro.update({'age': filter_age})
        # FILTER SECTIONS
        if filter_sections:
            survey.filtro.update({'sections': filter_sections})
            form.update({
                'filter_questions': map(lambda x: int(x), filter_sections)
            })
        # FILTER QUESTIONS
        if filter_questions:
            survey.filtro.update({'questions': filter_questions})
            form.update({
                'filter_questions': map(lambda x: int(x), filter_questions)
            })
        # FILTER QUESTIONS
        if filter_questions:
            survey.filtro.update({'questions': filter_questions})
            form.update({
                'filter_questions': map(lambda x: int(x), filter_questions)
            })
        # FILTER VALUES
        if filter_values:
            survey.filtro.update({'values': filter_values})
            form.update({
                'filter_values': map(lambda x: int(x), filter_values)
            })
        # FILTER GROUPS
        if filter_groups:
            survey.filtro.update({'groups': filter_groups})
            form.update({
                'filter_groups': map(lambda x: int(x), filter_groups)
            })
        # FILTER NUMBERS
        if filter_numbers:
            survey.filtro.update({'numbers': filter_numbers})
            form.update({
                'filter_numbers': map(lambda x: int(x), filter_numbers)
            })
        # REPORT TYPE
        graph = []
        run_graph = True
        if report_type == 'S':
            run_graph = False
            template = 'survey-summary.html'
            section_average = []
            for questionnaire in survey.questionnaire_set.all():
                total_response = 0
                scores = []
                max_score = []
                for question in questionnaire.question_set.all():
                    otype = question.get_type
                    if otype.type != 'radioButtonRow' or question.ans_position in [5, 7, None]:
                        continue
                    gresponse = otype.get_response()
                    score = gresponse.get('score')
                    if score:
                        scores.append(score)
                    max_score.append(gresponse.get('max'))

                if scores:
                    score = reduce(lambda x, y: x + y, scores) / len(scores)
                    section_average.append(
                        {'section': questionnaire, 'score': score, 'css': (score * 100) / max(max_score),
                         'max': max(max_score)}
                    )
            context.update({'summary_sections': survey.get_questions_rate, 'section_average': section_average})
        elif report_type == 'C':
            template = 'survey-compare.html'
            survey.filtro.update({'date_compare': ' - '.join([filter_compare_ini, filter_compare_fim])})
        elif report_type == 'T':
            run_graph = False
            template = 'survey-text.html'
        if run_graph:
            for questionnaire in survey.questionnaire_set.all():
                for question in questionnaire.question_set.all():
                    tp = question.get_type
                    if tp.type not in ['textAnsRow', 'textAreaRow']:
                        graph.append(tp)


        context.update({
            'graph': graph,
            'show': True,
            'report_type': report_type,
            'form': form,
        })
    context.update({
        'survey': survey,
        'lang': Country.objects.all()
    })
    if action in ['print', 'export']:
        if report_type == 'A':
            rname = 'report-analytical({0})'.format(slugify(survey))
            if action == 'export':
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="{0}.csv"'.format(rname)

                writer = csv.writer(response)
                respondents = survey.get_respondent_ids
                questions = Question.objects.filter(questionnaire__in=survey.questionnaire_set.all())
                writer.writerow(map(lambda x: x.text, questions))
                for resp in respondents:
                    row = ()
                    for question in questions:
                        try:
                            if question.question_type == 2 and question.get_type.type == 'checkBoxRow':
                                res = Response.objects.filter(question=question, respondent=resp, survey=survey)
                                v = ';'.join(map(lambda x: x.ans_text, res))
                            else:
                                res = Response.objects.get(question=question, respondent=resp, survey=survey)
                                v = res.ans_text
                        except Exception as e:
                            v = ''
                        row += (v,)
                    writer.writerow(row)
                return response
            else:
                return report_print(
                    'survey-analytical-print.html',
                    context,
                    rname
                )
        elif report_type == 'S':
            rname = 'report-summary({0})'.format(slugify(survey))
            if action == 'export':
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="{0}.csv"'.format(rname)

                writer = csv.writer(response)
                # SECTION AVERAGE WITH RATING
                writer.writerow(['*** Section Average with Rating ***'])
                writer.writerow([''])
                inc = 0
                for section in section_average:
                    inc += 1
                    writer.writerow(['Q.{0} - {1}'.format(inc, section.get('section')),
                                     '{0:.2f}'.format(section.get('score'))])
                # QUESTION WITH RATE
                writer.writerow([''])
                writer.writerow(['*** Question with Rate ***'])
                writer.writerow([''])
                row = ['']
                for title in survey.get_header:
                    row.append(title)
                row.append('score')
                writer.writerow(row)
                inc = 0
                for sections in survey.get_questions_rate:
                    inc += 1
                    writer.writerow(['Q{0} - {1}'.format(inc, sections.keys()[0])])
                    for section, values in sections.iteritems():
                        for question in values:
                            r = [question.keys()[0]]
                            for key, values2 in question.iteritems():
                                for x in values2:
                                    r.append(x)
                            writer.writerow(r)
                    writer.writerow([''])
                # SECTION AVERAGE WITH RATING
                writer.writerow(['*** Question ***'])
                writer.writerow([''])
                for questionnaire in survey.questionnaire_set.all():
                    writer.writerow(['Q.{0} - {1}'.format(questionnaire.order + 1, questionnaire)])
                    writer.writerow([''])
                    for question in questionnaire.question_set.all():
                        writer.writerow([question])
                        for type in question.type_set.all():
                            resp = type.get_response()
                            if type.type not in ['textAreaRow,textAnsRow']:
                                writer.writerow(['Activity', 'Answers', 'Relative Answer'])
                                for value in resp.get('values'):
                                    writer.writerow([
                                        value.get('texto'),
                                        int(value.get('total')),
                                        '{0:.2f}'.format(value.get('porcento'))]
                                    )
                                score = resp.get('score')
                                if score:
                                    writer.writerow(['score', '{0:.2f}'.format(score)])
                        writer.writerow([''])

                return response
            else:
                return report_print(
                    'survey-summary-print.html',
                    context,
                    rname
                )
        elif report_type == 'C':
            rname = 'report-compare({0})'.format(slugify(survey))
            if action == 'export':
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="{0}.csv"'.format(rname)

                writer = csv.writer(response)
                for questionnaire in survey.questionnaire_set.all():
                    writer.writerow(['', filter_date_ini, filter_date_fim, filter_compare_ini, filter_compare_fim])
                    writer.writerow([''])
                    writer.writerow(['Q.{0} - {1}'.format(questionnaire.order + 1, questionnaire)])
                    writer.writerow([''])
                    for question in questionnaire.question_set.all():
                        writer.writerow([question])
                        for type in question.type_set.all():
                            resp = type.get_response()
                            if type.type not in ['textAreaRow,textAnsRow']:
                                writer.writerow(['Activity', 'Answers', 'Relative Answer', 'Answers', 'Relative Answer'])

                                for r in resp.get('values'):
                                    for key, value in r.iteritems():
                                        print 'KEY VALUE >>>>', key, value
                                        writer.writerow([
                                            key,
                                            int(value.get('total') or '0'),
                                            '{0:.2f}'.format(value.get('porcento')),
                                            int(value.get('total2') or '0'),
                                            '{0:.2f}'.format(value.get('porcento2'))
                                        ])
                                score1 = resp.get('score')
                                score2 = resp.get('score2')
                                if score1 or score2:
                                    writer.writerow(['',
                                        'score', '{0:.2f}'.format(score1),
                                        'score', '{0:.2f}'.format(score2)
                                    ])
                        writer.writerow([''])
                return response
            else:
                return report_print(
                    'survey-compare-print.html',
                    context,
                    rname
                )
        elif report_type == 'T':
            rname = 'report-text({0})'.format(slugify(survey))
            if action == 'export':
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="{0}.csv"'.format(rname)

                writer = csv.writer(response)
                for questionnaire in survey.questionnaire_set.all():
                    if questionnaire.text_type == True:
                        writer.writerow(['Q.{0} - {1}'.format(questionnaire.order + 1, questionnaire)])
                        writer.writerow([''])
                        for question in questionnaire.question_set.all():
                            if question.get_type.type in ['textAreaRow','textAnsRow']:
                                writer.writerow(['* {0}'.format(question)])
                                for type in question.type_set.all():
                                    resp = type.get_response()
                                    for value in resp.get('values'):
                                        writer.writerow([
                                            value.get('texto')
                                        ])
                                writer.writerow([''])
                return response
            else:
                return report_print(
                    'survey-text-print.html',
                    context,
                    rname
                )

    return render(request=request, template_name=template, context=context)


@login_required
def translate(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    languages = Language.objects.filter(status=True)
    language_id = languages.first().id
    if request.method == 'POST':
        print '*****', request.POST
        lid = request.POST.get('language')
        if lid:
            language_id = int(lid)

    survey.tr_language_id = language_id
    ctx = {
        'survey': survey,
        'languages': languages,
        'language': Language.objects.get(id=language_id)
    }
    return render(request, 'survey-translation.html', ctx)


@login_required
def survey_create(request):
    personal_info = 0
    if request.method == 'POST':
        form = SurveyForm(request.POST, request.FILES)
        personal_info = request.POST.get('personal_info')
        if form.is_valid():
            survey = Survey(**form.cleaned_data)
            survey.added_by = request.user
            survey.save()
            messages.success(request, u"Survey: {0} success added.".format(survey.title))
            if personal_info:
                # criar questionario
                questionnaire = Questionnaire(
                    survey=survey,
                    name=_('Personal Information'),
                    added_by=request.user
                )
                questionnaire.save()
                # gender
                question = Question(
                    question_type=2,
                    questionnaire=questionnaire,
                    text=_('What is your gender?'),
                )
                question.save()
                # Type
                o_type = Type(
                    question=question,
                    type='sexRow'
                )
                o_type.save()
                # # values
                # value = Values(
                #     ans=o_type,
                #     ans_text=_('Male'),
                #     ans_val='M',
                # )
                # value.save()
                # value = Values(
                #     ans=o_type,
                #     ans_text=_('Female'),
                #     ans_val='F',
                # )
                # value.save()
                # age
                question = Question(
                    questionnaire=questionnaire,
                    text=_('What is your age range?'),
                    question_type=2
                )
                question.save()
                # Type
                o_type = Type(
                    question=question,
                    type='ageRow'
                )
                o_type.save()
                # Nationality
                question = Question(
                    questionnaire=questionnaire,
                    text=_('What is your Nationality?'),
                )
                question.save()
                # Type
                o_type = Type(
                    question=question,
                    type='nationalityRow'
                )
                o_type.save()
            return HttpResponseRedirect('/questionnaire/create/{0}/'.format(survey.id))

    else:
        form = SurveyForm()

    context = {
        'title': _("Create Survey"),
        'active_menu': 'Survey',
        'form': form,
        'personal_info': personal_info
    }
    return render(request, 'survey-create.html', context)


@login_required
def survey_report(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    context = {
        'survey': survey
    }
    return render(request, 'survey-report.html', context)


@login_required
def survey_report_print(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    context = {
        'survey': survey
    }
    return render(request, 'survey-report-print.html', context)


@login_required
def respondent_remove(request):
    try:
        r = Respondent.objects.get(id=request.GET.get('id'))
        msg = 'Respondent: {0}, deleted'.format(r.id)
        r.delete()
        status = 200
    except Exception as e:
        msg = 'ERRO: {0:s}'.format(e)
        status = 0
    return JsonResponse({'status': status, 'msg': msg})


@login_required
@csrf_exempt
def translate_field(request):
    msg = 'Error msg'
    status = 0
    data = request.GET
    sid = data.get('sid')
    lid = data.get('lid')
    pk = data.get('pk')
    value = data.get('value')
    col, field_id, type_status, rel_id = data.get('name').split(';')
    kwargs = {
        'survey_lang_id': lid,
        'survey_id': sid,
        'type_status': type_status,
        col: value,
    }

    if pk == '0':
        if type_status != '1':
            kwargs.update({
                field_id: rel_id
            })
        try:
            language_text = LanguageText(**kwargs)
            language_text.save()
            status = 200
            pk = language_text.id
        except Exception as e:
            msg = '{0}'.format(e)
            print 'EXCE', e
    else:
        try:
            language_text = LanguageText.objects.filter(id=pk)
            language_text.update(**{col: value})
            status = 200
        except Exception as e:
            msg = '{0}'.format(e)
            print 'EXCE', e

    return JsonResponse({'status': status, 'msg': msg, 'pk': pk})


@login_required
def view_answer(request, rid):
    respondent = get_object_or_404(Respondent, id=rid)
    survey = respondent.survey
    survey.respondent_id = respondent.id

    context = {
        'survey': respondent.survey
    }
    template = 'view-answer.html'
    if request.GET.get('action') == 'print':
        template = 'print-answer.html'
    return render(request, template, context)


@login_required
def respondent_list(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    context = {
        'survey': survey
    }
    # if request.method == 'POST':
    data = request.GET
    # FILTRO
    args = []
    data_ini_str = data.get('filter_date_ini')
    data_fim_str = data.get('filter_date_fim')
    q = data.get('q', '')
    list_per_page = data.get('filter_list', '25')
    get_url = ''
    if data_ini_str and data_fim_str:
        args.append(Q(date__range=[data_ini_str + ' 00:00:00', data_fim_str + ' 23:59:59']))
        get_url += '&filter_date_ini={0}&filter_date_fim={1}'.format(data_ini_str, data_fim_str)
    if q:
        args.append(Q(email=q))
        get_url += '&q={0}'.format(q)
    if list_per_page:
        get_url += '&filter_list={0}'.format(list_per_page)
    if args:
        respondents = survey.get_respondent.filter(*args, respondent_status=2)
        result = paginar(request, respondents, int(list_per_page))
        context.update({
            'show_paginator': True,
            'result': result,
            'get_url': get_url
        })

    if not args:
        r = survey.get_respondent.all()
        data_min = r.aggregate(data=Min('timestamp')).get('data')
        data_max = r.aggregate(data=Max('timestamp')).get('data')
        data_ini_str = ''
        if data_min:
            data_ini_str = data_min.strftime('%Y-%m-%d')
        data_fim_str = ''
        if data_max:
            data_fim_str = data_max.strftime('%Y-%m-%d')

    context.update({
        'data_ini': data_ini_str,
        'data_fim': data_fim_str,
        'filter_list': list_per_page,
        'q': q
    })
    return render(request, 'respondent-list.html', context)


@login_required
def survey_report_pdf(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    context = {
        'survey': survey
    }
    t = loader.get_template('report-rate.html')
    c = Context(context)
    rendered = t.render(c)
    pdf = StringIO.StringIO()
    pisa.CreatePDF(StringIO.StringIO(rendered.encode('utf-8')), pdf)

    # HTTP response headers
    response = HttpResponse(content_type="application/pdf")
    response["Cache-Control"] = "max-age=0"
    response["Accept-Ranges"] = "none"
    response["Content-Disposition"] = "filename=report-{0}-section-average.pdf".format(slugify(survey.title))
    # send the generated PDF
    response.write(pdf.getvalue())
    return response


def builder(request):
    context = {
        'title': _('Survey Management'),
        'active_menu': 'action',
        'active_submenu': 'survey',
    }
    return render(request, 'form-builder.html', context)


def survey_preview(request, sid):
    survey = get_object_or_404(Survey, id=sid)
    if request.method == 'POST':
        return render(request, 'congratulations.html', {'message': survey.custommsg, 'title_header': _('Thanks')})
    context = {
        'title': _("View Survey"),
        'survey': survey,
        'active_menu': 'Survey'
    }
    return render(request, 'survey-response.html', context)


def survey_response(request, code=False, sid=False):
    if sid:
        survey = get_object_or_404(Survey, id=sid)
        qs_respodent = False
    else:
        qs_respodent = get_object_or_404(Respondent, response_code=code)
        if qs_respodent.respondent_status == 2:
            return render(request, 'congratulations.html',
                          {'message': _('Thank you, Survey response already submitted'),
                           'title_header': _('Opss')}
                          )
        survey = qs_respodent.survey
    show_box = False
    if request.method == 'POST':
        email_id = request.POST.get('email_id')
        password_id = request.POST.get('password_id')
        language_id = request.POST.get('language_id')
        tr = request.POST.get('translate')
        if language_id and tr:
            survey.translate = tr
            survey.tr_language_id = language_id

        if qs_respodent:
            qs_respodent.respondent_status = 2
            qs_respodent.save()
        else:
            qs_respodent = Respondent(
                survey=survey, respondent_status=2
            )
            qs_respodent.save()
        if email_id:
            qs_respodent.email = email_id
            qs_respodent.save()
        elif password_id:
            pwd = Password.objects.get(password=password_id, survey=survey)
            pwd.use_status = 1
            pwd.save()

        for key, value in request.POST.iteritems():
            if key in ['csrfmiddlewaretoken', 'email_id', 'password_id', 'language_id', 'translate'] or not value:
                continue
            if key.startswith('check'):
                key = key.replace('check[', '').replace(']', '')
            if ':' in key:
                key = key.split(':')[1]
            response = Response(
                survey=survey,
                question_id=key,
                ans_text=value,
                respondent=qs_respodent
            )
            response.save()
        return render(request, 'congratulations.html', {'message': survey.get_custommsg})
    data = request.GET
    rvalue = data.get('value')
    rtype = data.get('rtype')
    if data.get('showbox'):
        show_box = True
    language = survey.lang
    lang_id = data.get('lang')
    t = True
    if code and qs_respodent and not lang_id:
        if qs_respodent.campaign:
            language = qs_respodent.campaign.language
            survey.translate = True
            survey.tr_language_id = language.id
            t = False
    if lang_id and lang_id != str(language.id) and t:
        survey.translate = True
        survey.tr_language_id = lang_id
        language = Language.objects.get(id=lang_id)
    context = {
        'title': _("View Survey"),
        'survey': survey,
        'active_menu': 'Survey',
        'show_box': show_box,
        'language': language
    }
    if rvalue and rtype == 'Mw':
        context.update({'password_id': rvalue})
    elif rvalue:
        context.update({'email_id': rvalue})
    return render(request, 'survey-response.html', context)


@login_required
def survey_create_link(request):
    surveys = Survey.objects.filter(added_by_id=request.user.pk).order_by('-timestamp')
    context = {
        'active_menu': 'Tools - Create Link',
        'surveys': surveys
    }
    if request.method == 'POST':
        data = request.POST
        sid = data.get('survey')
        rtype = data.get('type')
        qr_ecc = data.get('qr-ecc')
        qr_size = data.get('qr-size')
        url = 'http://{0}/survey/checkout/{1}/{2}/'.format(request.META.get('HTTP_HOST'), sid, rtype)
        context.update({
            'sid': sid,
            'rtype': rtype,
            'url': url,
            'qr_ecc': qr_ecc,
            'qr_size': qr_size
        })
        print '>>', request.POST
    return render(request, 'survey-create-link.html', context)


def checkout(request, sid, rtype):
    context = {
        'sid': sid,
        'rtype': rtype
    }
    error_msg = ''
    if rtype == 'MQ':  # EMAIL
        icon = 'fa-envelope-o'
        caption = 'Please enter your email to complete your survey'
        label = 'Please add Your Email'
        tooltip = 'Add your registration e-mail'
        stype = 'email'
    elif rtype == 'NA':  # FREE
        icon = 'fa-users'
        caption = 'Answer by ID free choice'
        label = 'Answer by ID free choice'
        tooltip = 'Qual caption coloco aqui?'
        stype = 'text'
    elif rtype == 'Mw':  # PASSWORD
        icon = 'fa-lock'
        caption = 'Please enter survey password to complete your survey'
        label = 'Password'
        tooltip = 'Qual captio coloco aqui?'
        stype = 'password'
    else:
        return HttpResponseRedirect(reverse('survey:preview', args=(sid,)))

    if request.method == 'POST':
        value = request.POST.get('value')
        if rtype == 'Mw':
            try:
                pwd = Password.objects.get(survey_id=sid, password=value)
                if pwd.use_status == 1:
                    error_msg = 'Password already used'
                else:
                    now = timezone.now()
                    if pwd.expiry_date < now:
                        error_msg = 'Expired password'
            except:
                error_msg = u'Password not found'
        if not error_msg:
            resp = HttpResponseRedirect(reverse('survey:preview', args=(sid,)))
            resp['Location'] += '?rtype={0}&value={1}'.format(rtype, value)
            return resp

    context.update({
        'icon': icon,
        'caption': caption,
        'label': label,
        'tooltip': tooltip,
        'type': stype,
        'err_msg': error_msg,
    })
    return render(request, 'survey-checkout.html', context)
