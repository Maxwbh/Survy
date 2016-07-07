# -*- coding: utf-8 -*-
# Autor: christian
from django.db import models
from django.utils import timezone
from django.db.models import Q
from django.utils.translation import ugettext as _
from libs.signals import create_slug


class Configuration(models.Model):
    class Meta:
        verbose_name = u'Configuration'
        unique_together = ('active',)

    active = models.BooleanField(
        verbose_name=_('Active'), default=False, help_text=_(
            'Only one configuration is active. It is mandatory that there is a live setting for the proper '
            'functioning of the site'
        )
    )
    title = models.CharField(
        verbose_name=_('Site Title'), max_length=30
    )
    contact_email = models.EmailField(
        verbose_name=_('Contact Email'), blank=True, null=True
    )
    logo = models.ImageField(
        verbose_name=_('Site Logo'), blank=True, null=True, upload_to='website'
    )
    banner_background = models.ImageField(
        verbose_name=_('Banner Background'), blank=True, null=True, upload_to='website',
        help_text=_('Banner background image of the home page')
    )
    favicon = models.ImageField(
        verbose_name=_('Site Icon'), blank=True, null=True, upload_to='website',
        help_text=_('Icon displayed in the browser')
    )
    # SEO
    meta_description = models.CharField(
        verbose_name=u'Meta Description', blank=True, null=True, max_length=160
    )
    meta_keywords = models.CharField(
        verbose_name=u'Meta Keywords', blank=True, null=True, max_length=100
    )
    meta_geo_position = models.CharField(
        verbose_name=u'Meta Geo Position', blank=True, null=True, max_length=20
    )
    meta_geo_place = models.CharField(
        verbose_name=u'Meta Geo Placename', blank=True, null=True, max_length=40
    )
    meta_geo_region = models.CharField(
        verbose_name=u'Meta Geo Region', blank=True, null=True, max_length=5
    )

    def __unicode__(self):
        return u'%s' % self.title or u'%s' % self.pk

    @property
    def meta_comment(self):
        return ', '.join(self.meta_keywords.split(',')[0:3])

    @property
    def get_contents(self):
        return self.content_set.filter(active=True, show_in_menu=True)

    @property
    def get_banner(self):
        now = timezone.now()
        banners = self.banner_set.filter(
            Q(ativo_inicio__lte=now),
            Q(ativo_fim__gte=now) | Q(ativo_fim=None)
        )
        return banners


class Content(models.Model):
    class Meta:
        verbose_name = _('Content')
        ordering = ['order']

    configuration = models.ForeignKey(
        verbose_name=_('Configuration'), to=Configuration
    )
    title = models.CharField(
        verbose_name=_('Title'), max_length=50
    )
    content = models.TextField(
        verbose_name=_('Content')
    )
    active = models.BooleanField(
        verbose_name=_('Active'), default=True
    )
    show_in_menu = models.BooleanField(
        verbose_name=_('Show in Menu'), default=False, help_text=_('Displays the contents on the menu.')
    )
    slug = models.SlugField(
        max_length=150, editable=False
    )
    # Sortable property
    order = models.PositiveIntegerField(
        verbose_name=_('Order')
    )
    # SEO
    meta_description = models.CharField(
        verbose_name=u'Meta Description', blank=True, null=True, max_length=160
    )
    meta_keywords = models.CharField(
        verbose_name=u'Meta Keywords', blank=True, null=True, max_length=100
    )

    def __unicode__(self):
        return self.title

    @models.permalink
    def get_absolute_url(self):
        return 'website:content', ([self.slug])

    @property
    def meta_comment(self):
        return ', '.join(self.meta_keywords.split(',')[0:3])


models.signals.post_save.connect(create_slug, sender=Content)