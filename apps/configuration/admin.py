# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Language, Country


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('iso', 'name', 'printable_name', 'iso3', 'numcode')
    search_fields = ('name',)


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'status')
    search_fields = ('name', 'code')



