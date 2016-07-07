# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.questionnaire.views',
    url(r'^edit/(?P<qid>[-\w]+)/$', 'questionnaire_edit', name='edit'),
    url(r'^create/(?P<sid>[-\w]+)/$', 'questionnaire_create', name='create'),
    url(r'^save/$', 'questionnaire_save', name='save'),

    url(r'^question-add/(?P<qid>[-\w]+)/$', 'question_add', name='question-add'),
    url(r'^question-edit/(?P<qid>[-\w]+)/$', 'question_edit', name='question-edit'),

    url(r'^question-save/(?P<qid>[-\w]+)/$', 'question_save', name='question-save'),

    url(r'^section-save/$', 'section_save', name='section-save'),
    url(r'^get-set/$', 'get_set', name='get-set'),

    url(r'^question-remove/(?P<qid>[-\w]+)/$', 'question_remove', name='question-remove'),

    url(r'^move/(?P<pdir>up|down)/(?P<qid>[-\w]+)/$', 'move', name='move'),
    url(r'^move/(?P<pdir>up|down)/(?P<qid>[-\w]+)/(?P<qsid>[-\w]+)/$', 'move', name='qmove'),


    url(r'^add-value/$', 'add_value', name='question-add-value'),
)
