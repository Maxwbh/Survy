# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url
import views


urlpatterns = patterns(
    'apps.manager.views',
    url(r'^$', views.index, name='index'),
    url(r'^partner/$', views.partner, name='partner'),
    url(r'^partner/create/$', views.partner_create, name='partner-create'),
    url(r'^partner/edit/(?P<pk>\d+)/$', views.partner_edit, name='partner-edit'),
    url(r'^customer/$', views.customer, name='customer'),
    url(r'^customer/create/$', views.customer_create, name='customer-create'),
    url(r'^customer/edit/(?P<pk>\d+)/$', views.customer_edit, name='customer-edit'),
    url(r'^plan/$', views.plan, name='plan'),
    url(r'^plan/edit/(?P<pk>\d+)/$', views.plan_edit, name='plan-edit'),
    url(r'^plan-create/$', views.plan_create, name='plan-create'),
    url(r'^response-plan/$', views.response_plan, name='response-plan'),
    url(r'^bank-details/$', views.bank_details, name='bank-details'),
    url(r'^payment-request/$', views.payment_request, name='payment-request'),
    url(r'^payment-details/$', views.payment_details, name='payment-details'),
)
