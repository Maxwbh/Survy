# -*- coding: utf-8 -*-
# Autor: christian
from apps.response.models import Respondent
from .models import List, Email, Campaign
from django.contrib import admin


class EmailAdminInLine(admin.StackedInline):
    model = Email


@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    inlines = [EmailAdminInLine]
    list_display = (
        'name',
        'added_by',
        'timestamp',
        'status',
        'type',
        'emails',
    )
    list_filter = ('added_by_id', 'status', 'type')
    search_fields = ['name']


class RespondentAdminInLine(admin.StackedInline):
    model = Respondent
    max_num = 1


@admin.register(Campaign)
class CapaignAdmin(admin.ModelAdmin):
    inlines = [RespondentAdminInLine]
    list_display = (
        'name',
        'added_by',
        'timestamp',
    )
    list_filter = ['added_by_id']
    search_fields = ['name']
