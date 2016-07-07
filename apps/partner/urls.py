# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url
import views


urlpatterns = patterns(
    'apps.partner.views',
    url(r'^$', views.index, name='index'),
    url(r'^salesman/$', views.salesman, name='salesman'),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^salesman/create/$', views.salesman_create, name='salesman-create'),
    url(r'^salesman/edit/(?P<pk>\d+)/$', views.salesman_edit, name='salesman-edit'),
    url(r'^customer/$', views.customer, name='customer'),
    url(r'^customer/create/$', views.customer_create, name='customer-create'),
    url(r'^customer/edit/(?P<pk>\d+)/$', views.customer_edit, name='customer-edit'),
)
