from django.contrib import admin
from .models import (AmountReceived, BankDetail, BankTransferDoc, CommissionPayment, PartnerDetails,
                     SalesmanDetails, UserPermission)


@admin.register(PartnerDetails)
class PartnerDetailsAdmin(admin.ModelAdmin):
    pass


# @admin.register(PersonalizeMsg)
class PersonalizeMsgAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesmanDetails)
class SalesmanDetailsAdmin(admin.ModelAdmin):
    pass


@admin.register(AmountReceived)
class AmountReceivedAdmin(admin.ModelAdmin):
    pass


@admin.register(BankDetail)
class BankDetailAdmin(admin.ModelAdmin):
    pass


@admin.register(BankTransferDoc)
class BankTransferDocAdmin(admin.ModelAdmin):
    pass


@admin.register(CommissionPayment)
class CommissionPaymentAdmin(admin.ModelAdmin):
    pass


@admin.register(UserPermission)
class UserPermissionAdmin(admin.ModelAdmin):
    pass
