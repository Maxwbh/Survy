# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url
import views

urlpatterns = patterns(
    'apps.customer.views',
    url(r'^edit/$', views.edit, name='edit'),
    url(r'^update-info/$', views.update_info, name='update-info'),
)
