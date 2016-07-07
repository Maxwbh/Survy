from dajaxice.core import dajaxice_autodiscover, dajaxice_config
from django.conf.urls import include, url, patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views

import settings

dajaxice_autodiscover()

urlpatterns = [
    url(r'', include('apps.website.urls', namespace='website')),
    url(r'^manager/', include('apps.manager.urls', namespace='manager')),
    url(r'^partner/', include('apps.partner.urls', namespace='partner')),
    url(r'^mail-list/', include('apps.mailinglist.urls', namespace='mail-list')),
    url(r'^survey/', include('apps.survey.urls', namespace='survey')),
    url(r'^order/', include('apps.order.urls', namespace='order')),
    url(r'^customer/', include('apps.customer.urls', namespace='customer')),
    url(r'^questionnaire/', include('apps.questionnaire.urls', namespace='questionnaire')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/login/$', auth_views.login, name='login'),
    url(r'^accounts/logout/$', auth_views.logout, name='logout'),
    url(r'^redactor/', include('redactor.urls')),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
]

if settings.DEBUG:
    urlpatterns + static(settings.STATIC_URL, document_root=settings._STATIC_ROOT)
    urlpatterns += patterns(
        '',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT,
                                                                   'show_indexes': True})
    )
