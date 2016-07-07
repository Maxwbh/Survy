# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Survey, Allotment, LanguageText, Password
from apps.questionnaire.models import Questionnaire


class QuestionnaireInLinesAdmin(admin.StackedInline):
    model = Questionnaire
    extra = 0


class SurveyAdmin(admin.ModelAdmin):
    inlines = [QuestionnaireInLinesAdmin]
    list_display = (
        'title',
        'timestamp',
        'status',
    )
    list_filter = ('added_by_id', 'timestamp')
    search_fields = ['title']
admin.site.register(Survey, SurveyAdmin)


class AllotmentAdmin(admin.ModelAdmin):
    list_display = ('add_date', 'status', 'timestamp')
    list_filter = ('add_date', 'timestamp')
admin.site.register(Allotment, AllotmentAdmin)


class LanguageTextAdmin(admin.ModelAdmin):
    list_display = (
        'ans_val_id',
        'survey_name',
        'survey_descp',
        'questionaire_text',
        'question_text',
        'ans_text',
        'type_status',
        'question_custommsg',
        'note_text',
    )
admin.site.register(LanguageText, LanguageTextAdmin)


class PasswordAdmin(admin.ModelAdmin):
    list_display = (
        'password',
        'use_status',
        'creation_date',
        'expiry_date',
    )
    list_filter = ('creation_date', 'expiry_date')
admin.site.register(Password, PasswordAdmin)
