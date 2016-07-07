# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.survey.views',
    url(r'^dashboard/$', 'dashboard', name='dashboard'),
    url(r'^list/$', 'survey_list', name='list'),
    url(r'^edit/(?P<sid>[-\w]+)/$', 'survey_edit', name='edit'),
    url(r'^view/(?P<sid>[-\w]+)/$', 'survey_view', name='view'),
    url(r'^get-filter/$', 'get_filter', name='get-filter'),
    url(r'^create/$', 'survey_create', name='create'),
    url(r'^translate/(?P<sid>[-\w]+)/$', 'translate', name='translate'),
    url(r'^create-link/$', 'survey_create_link', name='create-link'),
    url(r'^report/(?P<sid>[-\w]+)/$', 'survey_report', name='report'),
    url(r'^report_pdf/(?P<sid>[-\w]+)/$', 'survey_report_pdf', name='report-pdf'),
    url(r'^report-print/(?P<sid>[-\w]+)/$', 'survey_report_print', name='report-print'),
    url(r'^respondent-list/(?P<sid>[-\w]+)/$', 'respondent_list', name='respondent-list'),
    url(r'^view-answer/(?P<rid>[-\w]+)/$', 'view_answer', name='view-answer'),
    url(r'^respondent-remove/$', 'respondent_remove', name='respondent-remove'),
    url(r'^translate-field/$', 'translate_field', name='translate-field'),

    url(r'^builder', 'builder', name='builder'),
    # url(r'^report/$', 'report', name='report'),
    url(r'^response/(?P<code>[0-9a-fA-F]+)/$', 'survey_response', name='response'),
    url(r'^preview/(?P<sid>[-\w]+)/$', 'survey_response', name='preview'),
    url(r'^checkout/(?P<sid>[-\w]+)/(?P<rtype>MQ|Mg|Mw|NA)/$', 'checkout', name='checkout'),
)
