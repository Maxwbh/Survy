# -*- coding: utf-8 -*-
# Autor: christian
from django.contrib import admin
from django.forms import ModelForm
from redactor.widgets import RedactorEditor
from suit.widgets import EnclosedInput, AutosizedTextarea
from suit.admin import SortableModelAdmin
from django.utils.translation import ugettext as _
from .models import Configuration, Content


class MetaFieldsForm(ModelForm):
    class Meta:
        widgets = {
            'content': RedactorEditor()
        }


@admin.register(Configuration)
class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ('title', 'contact_email', 'active')
    fieldsets = [
        (None, {
            'classes': ('suit-tab suit-tab-general',),
            'fields': ['active', 'title', 'contact_email', 'logo', 'banner_background', 'favicon']
        }),
        (None,
         {
             'classes': ('suit-tab suit-tab-seo ',),
             'fields': ['meta_description', 'meta_keywords', 'meta_geo_position', 'meta_geo_place',
                        'meta_geo_region']
         })
    ]

    suit_form_tabs = (
        ('general', _('General')),
        ('seo', 'SEO')
    )


@admin.register(Content)
class ContentAdmin(SortableModelAdmin):
    form = MetaFieldsForm

    list_display = ('title', 'active', 'show_in_menu', 'order')
    list_editable = ('order',)
    list_filter = ['active', 'show_in_menu', 'configuration__title']
    search_fields = ['title']
    # Specify 'name' of sortable property
    sortable = 'order'