# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Customer, CustomerPlan, ResponsePlan, PersonalizeMsg


class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'address',
        'phone',
        'company_name',
        'language_code',
        'user_status',
        'company_address',
        'company_tax_id',
        'company_tax_ofc',
        'country',
        'city',
        'timestamp',
    )
    list_filter = ('timestamp',)
    search_fields = ('name',)
admin.site.register(Customer, CustomerAdmin)


class CustomerPlanAdmin(admin.ModelAdmin):
    list_display = (
        'plan_add_date',
        'plan_start_date',
        'plan_end_date',
        'timestamp',
        'status',
    )
    list_filter = (
        'plan_add_date',
        'plan_start_date',
        'plan_end_date',
        'timestamp',
    )
admin.site.register(CustomerPlan, CustomerPlanAdmin)


class ResponsePlanAdmin(admin.ModelAdmin):
    list_display = ('date', 'timestamp', 'cus_res_plan_status')
    list_filter = ('date', 'timestamp')
admin.site.register(ResponsePlan, ResponsePlanAdmin)


class PersonalizeMsgAdmin(admin.ModelAdmin):
    list_display = ('name', 'customer', 'timestamp')
    list_filter = ['customer']
admin.site.register(PersonalizeMsg, PersonalizeMsgAdmin)

