# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Set, SetValues, Type, Values


class SetAdmin(admin.ModelAdmin):
    list_display = (
        u'id',
        'name',
        'type',
        'status',
        'added_by',
        'timestamp',
    )
    list_filter = ('timestamp',)
    search_fields = ('name',)
admin.site.register(Set, SetAdmin)


class SetValuesAdmin(admin.ModelAdmin):
    list_display = (
        u'id',
        'answer_text',
        'answer_value',
        'answer_value_status',
        'timestamp',
    )
    list_filter = ('timestamp',)
admin.site.register(SetValues, SetValuesAdmin)


class ValuesAdminInLine(admin.StackedInline):
    model = Values
    max_num = 0


class TypeAdmin(admin.ModelAdmin):
    inlines = [ValuesAdminInLine]
    list_display = (
        u'id',
        'type',
        'position',
        'status',
        'free_field',
        'timestamp',
    )
    list_filter = ('type',)
admin.site.register(Type, TypeAdmin)


class ValuesAdmin(admin.ModelAdmin):
    list_display = (
        u'id',
        'ans_id',
        'ans_text',
        'other_ans_text',
        'ans_val',
        'sub_question',
        'ans_val_status',
        'timestamp',
    )
    list_filter = ('timestamp',)
admin.site.register(Values, ValuesAdmin)

