# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Respondent, Response, ResponsePlan


class ResponseInline(admin.StackedInline):
    model = Response
    max_num = 0


class RespondentAdmin(admin.ModelAdmin):
    # inlines = [ResponseInline]
    list_display = (
        u'id',
        'response_code',
        'email',
        'survey',
        'date',
        'respondent_status',
        'list',
        'after_hour',
        'mail_send_status',
        'sender_email_id',
        'timestamp',
    )
    list_filter = ('date', 'timestamp', 'survey')
admin.site.register(Respondent, RespondentAdmin)


class ResponseAdmin(admin.ModelAdmin):
    list_display = (
        'ans_text',
        'respondent',
        'other_text',
        'other_option',
        'date',
        'response_status',
        'timestamp',
    )
    list_filter = ('date', 'timestamp', 'respondent')
admin.site.register(Response, ResponseAdmin)


class ResponsePlanAdmin(admin.ModelAdmin):
    list_display = (
        u'id',
        'num_of_responses',
        'plan_cost',
        'res_plan_status',
        'timestamp',
    )
    list_filter = ('timestamp',)
admin.site.register(ResponsePlan, ResponsePlanAdmin)

