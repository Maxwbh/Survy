# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.mailinglist.views',
    url(r'^list/$', 'mylist', name='list'),
    url(r'^campaign/$', 'campaign', name='campaign'),
    url(r'^campaign/(?P<cid>[-\w]+)/$', 'campaign_view', name='campaign-view'),
    url(r'^create/$', 'mail_list_create', name='create'),
    url(r'^edit/(?P<pid>[-\w]+)/$', 'mail_list_edit', name='edit'),
    url(r'^send/$', 'mail_list_send', name='send'),
    url(r'^passwords/$', 'passwords', name='passwords'),
    url(r'^password-generate/$', 'password_generate', name='password-generate'),
    url(r'^passwords_view/(?P<sid>[-\w]+)/$', 'passwords_view', name='passwords-view'),
    # url(r'^view/(?P<pid>[-\w]+)/$', 'mail_list_view', name='view'),

    url(r'^export-csv/(?P<pid>[-\w]+)/$', 'export_csv', name='export-csv'),
    url(r'^send-file/$', 'send_file', name='send-file'),
)
