# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Plan, PlanFeature


class PlanAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'num_of_survey',
        'num_of_questions_per_survey',
        'num_of_responses_per_survey',
        'plan_cost',
        'plan_duration',
        'timestamp',
        'plan_status',
    )
    list_filter = ('timestamp',)
    search_fields = ('name',)
admin.site.register(Plan, PlanAdmin)


class PlanFeatureAdmin(admin.ModelAdmin):
    list_display = ('name', 'response', 'timestamp', 'status')
    list_filter = ('timestamp',)
    search_fields = ('name',)
admin.site.register(PlanFeature, PlanFeatureAdmin)

