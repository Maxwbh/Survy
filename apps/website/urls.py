# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.website.views',
    url(r'^$', 'index', name='home'),
    url(r'^content/(?P<slug>[-\w]+)$', 'content', name='content'),
    url(r'^setlang/(?P<code>[-\w]+)', 'setlang', name='setlang'),
    url(r'^report/$', 'report', name='report'),
    url(r'^report-view/$', 'report_view', name='report-view'),
    url(r'^login/$', 'log_in', name='login'),
    url(r'^logout/$', 'log_out', name='logout'),
    url(r'^help/$', 'helpdesk', name='help')
)
