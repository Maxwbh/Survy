# -*- coding: utf-8 -*-
# Autor: christian
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.http.response import HttpResponseRedirect
from .forms import FormCustomer, FormPartnerDetails, FormPlan
from .models import AmountReceived, PartnerDetails, BankDetail
from apps.customer.models import Customer
from apps.plan.models import Plan
from apps.response.models import ResponsePlan
from django.contrib.auth.decorators import user_passes_test
from django.db.models import Q

def index(request):
    context = {
        'title': 'Home',
        'active_menu': 'Dashboard',
        'amounts': AmountReceived.objects.all()
    }
    return render(request, 'manager/index.html', context)


#
# PARTNER
#
def partner(request):
    context = {
        'title': 'Partner List Management',
        'active_menu': 'Partner',
        'partners': PartnerDetails.objects.all()
    }
    return render(request, 'manager/partner-list.html', context)


def partner_create(request):
    context = {
        'title': 'Partner Create',
        'active_menu': 'Partner',
    }
    if request.method == 'GET':
        form = FormPartnerDetails()
    else:
        form = FormPartnerDetails(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('manager:partner'))
    context.update(dict(
        form=form
    ))

    return render(request, 'manager/partner-create.html', context)


def partner_edit(request, pk):
    context = {
        'title': 'Partner Edit',
        'active_menu': 'Partner',
    }
    opartner = get_object_or_404(PartnerDetails, id=pk)
    if request.method == 'GET':
        form = FormPartnerDetails(instance=opartner)
    else:
        form = FormPartnerDetails(request.POST, instance=opartner)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('manager:partner'))
    context.update(dict(
        form=form
    ))

    return render(request, 'manager/partner-create.html', context)


# -----------------------------------------
# CUSTOMER
# -----------------------------------------
@user_passes_test(lambda u: u.is_superuser)
def customer(request):
    context = {
        'title': 'Customer List Management',
        'active_menu': 'Customer',
        'customers': Customer.objects.filter(added_by=request.user)
    }
    return render(request, 'manager/customer-list.html', context)


@user_passes_test(lambda u: u.is_superuser)
def customer_create(request):
    context = {
        'title': 'Customer Create',
        'active_menu': 'Customer',
        'action': _('Create')
    }
    if request.method == 'GET':
        form = FormCustomer()
    else:
        form = FormCustomer(request.POST)
        if form.is_valid():
            cust = form.save()
            cust.added_by = request.user
            cust.save()
            return HttpResponseRedirect(reverse('manager:customer'))
    context.update(dict(
        form=form
    ))
    return render(request, 'manager/customer-create.html', context)


@user_passes_test(lambda u: u.is_superuser)
def customer_edit(request, pk):
    ocustomer = get_object_or_404(User, id=pk)
    context = {
        'title': 'Customer Edit',
        'active_menu': 'Customer',
        'action': _('Edit')
    }
    if request.method == 'GET':
        form = FormCustomer(initial={'company_name': 'teste'}, instance=ocustomer)
    else:
        form = FormCustomer(request.POST, instance=ocustomer)
        if form.is_valid():
            cust = form.save()
            cust.added_by = request.user
            cust.save()
            return HttpResponseRedirect(reverse('manager:customer'))
    context.update(dict(
        form=form
    ))
    return render(request, 'manager/customer-create.html', context)


#
# PLAN
#
def plan(request):
    context = {
        'title': 'PLans List Management',
        'active_menu': 'Plan',
        'plans': Plan.objects.filter(plan_status=1)
    }
    return render(request, 'manager/plan-list.html', context)


def plan_create(request):
    context = {
        'title': 'Plan Create',
        'active_menu': 'Plan',
        'action': _('Create')
    }
    if request.method == 'GET':
        form = FormPlan()
    else:
        form = FormPlan(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('manager:plan'))
    context.update(dict(
        form=form
    ))
    return render(request, 'manager/plan-create.html', context)


def plan_edit(request, pk):
    oplan = get_object_or_404(Plan, id=pk)
    context = {
        'title': 'Plan Edit',
        'active_menu': 'Plan',
        'action': _('Edit')
    }
    if request.method == 'GET':
        form = FormPlan(instance=oplan)
    else:
        form = FormPlan(request.POST, instance=oplan)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('manager:plan'))
    context.update(dict(
        form=form
    ))
    return render(request, 'manager/plan-create.html', context)


def response_plan(request):
    context = {
        'title': 'Response PLans List Management',
        'active_menu': 'Response Plan',
        'plans': ResponsePlan.objects.filter(res_plan_status=1)
    }
    return render(request, 'manager/response-plan-list.html', context)


@user_passes_test(lambda u: u.is_superuser)
def bank_details(request):
    pay = request.GET.get('pay')
    if pay:
        bank = get_object_or_404(BankDetail, id=pay)
        bank.status = 1
        bank.save()
        amt = bank.amnt_rec
        amt.amt_rec_status = 1
        amt.save()
    context = {
        'title': 'Bank Details List Management',
        'active_menu': 'Bank Details',
        'banks': BankDetail.objects.filter(amount__isnull=False)
    }
    return render(request, 'manager/bank-list.html', context)


@user_passes_test(lambda u: u.is_superuser)
def payment_request(request):
    context = {
        'title': 'Payment Request',
        'active_menu': 'Customer Payment Request',
        'amounts': AmountReceived.objects.all()
    }
    return render(request, 'manager/payments-request.html', context)


@user_passes_test(lambda u: u.is_superuser)
def payment_details(request):
    context = {
        'title': 'Payment Details',
        'active_menu': 'Payment Details',
        'result': False
    }
    if request.method == 'POST':
        data = request.POST
        report_type = data['report_type']
        filter_date_ini = data['filter_date_ini']
        filter_date_fim = data['filter_date_fim']
        args = []
        if filter_date_ini:
            args.append(Q(date_received__gte=filter_date_ini + ' 00:00:00'))
        if filter_date_fim:
            args.append(Q(date_received__lte=filter_date_fim + ' 23:59:59'))
        result = AmountReceived.objects.filter(transaction_type=report_type, amt_rec_status=1, *args)
        context.update(dict(
            form=data,
            result=result,
            total=sum(map(lambda x: x.amount, result))
        ))
    return render(request, 'manager/payments-details.html', context)
