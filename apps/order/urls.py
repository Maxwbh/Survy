# -*- coding: utf-8 -*-
# Autor: christian
from django.conf.urls import patterns, url
import views

urlpatterns = patterns(
    'apps.order.views',
    url(r'^checkout/(?P<pid>[-\w]+)/$', views.checkout, name='checkout'),
    url(r'^pay/(?P<aid>[-\w]+)/$', views.pay, name='pay'),
    url(r'^pay-details/$', views.pay_details, name='pay-details'),
    url(r'^transfer/(?P<aid>[-\w]+)/$', views.transfer, name='transfer'),
    url(r'^buy/(?P<aid>[-\w]+)/$', views.buy, name='buy'),
)
