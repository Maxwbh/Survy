# -*- coding: utf-8 -*-
from django.contrib import admin
from suit.admin import SortableModelAdmin
from .models import Questionnaire, Question
from apps.answer.models import Type


class TypeAdminInLine(admin.StackedInline):
    model = Type
    extra = 0


class QuestionAdminInLine(admin.StackedInline):
    model = Question
    extra = 0


class QuestionnaireAdmin(admin.ModelAdmin):
    inlines = [QuestionAdminInLine]

    list_display = (
        'name',
        'other_name',
        'timestamp',
        'status',
        'order',
    )
    list_filter = ('timestamp',)
    search_fields = ('name',)
admin.site.register(Questionnaire, QuestionnaireAdmin)


class QuestionAdmin(admin.ModelAdmin):
    inlines = [TypeAdminInLine]
    list_display = (
        'text',
        'required',
        'status',
        'question_type',
        'note',
        'ans_position',
        'free_field',
        'order',
    )
    search_fields = ('text',)
admin.site.register(Question, QuestionAdmin)

