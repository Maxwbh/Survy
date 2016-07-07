# -*- coding: utf-8 -*-
# Autor: christian
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.http.response import HttpResponseRedirect
from apps.manager.forms import FormCustomer, FormProfile, FormSalesman
from apps.customer.models import Customer
from django.contrib.auth.decorators import user_passes_test, login_required



@login_required
def index(request):
    context = {
        'title': 'Home',
        'active_menu': 'Dashboard',
    }
    return render(request, 'partner/index.html', context)


#
# PARTNER
#
@login_required
def salesman(request):
    context = {
        'title': 'List Management',
        'active_menu': 'Salesman',
        'salesmans': request.user.get_partner.all()
    }
    return render(request, 'partner/salesman-list.html', context)


def salesman_create(request):
    context = {
        'title': 'Salesman Create',
        'active_menu': 'Salesman',
        'action': 'Create'
    }
    if request.method == 'GET':
        form = FormSalesman()
    else:
        form = FormSalesman(request.POST)
        if form.is_valid():
            sales = form.save()
            sales.partner = request.user
            sales.save()
            return HttpResponseRedirect(reverse('partner:salesman'))
    context.update(dict(
        form=form
    ))

    return render(request, 'partner/form-edit-create.html', context)


def salesman_edit(request, pk):
    ouser = get_object_or_404(User, id=pk)
    osalesman = ouser.get_salesman
    context = {
        'title': 'Salesman Edit',
        'active_menu': 'Salesman',
        'action': _('Edit')
    }
    if request.method == 'GET':
        init_data = {
            'first_name': osalesman.f_name,
            'last_name': osalesman.l_name,
            'city': osalesman.city,
            'telephone': osalesman.telephone,
            'address': osalesman.address,
        }
        form = FormSalesman(initial=init_data, instance=ouser)
    else:
        form = FormSalesman(request.POST, instance=ouser)
        if form.is_valid():
            sales = form.save()
            sales.partner = request.user
            sales.save()
            return HttpResponseRedirect(reverse('partner:salesman'))
    context.update(dict(
        form=form
    ))
    return render(request, 'partner/form-edit-create.html', context)


# -----------------------------------------
# CUSTOMER
# -----------------------------------------
@user_passes_test(lambda u: u.is_staff)
def customer(request):
    context = {
        'title': 'List Management',
        'active_menu': 'Customer',
        'customers': Customer.objects.filter(added_by=request.user)
    }
    return render(request, 'partner/customer-list.html', context)


@user_passes_test(lambda u: u.is_staff)
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


@user_passes_test(lambda u: u.is_staff)
def customer_edit(request, pk):
    ouser = get_object_or_404(User, id=pk)
    ocustomer = ouser.get_customer
    context = {
        'title': 'Customer Edit',
        'active_menu': 'Customer',
        'action': _('Edit')
    }
    if request.method == 'GET':
        init_data = {
            'company_name': ocustomer.company_name,
            'company_address': ocustomer.company_address,
            'company_tax_id': ocustomer.company_tax_id,
            'company_tax_ofc': ocustomer.company_tax_ofc
        }
        form = FormCustomer(initial=init_data, instance=ouser)
    else:
        form = FormCustomer(request.POST, instance=ouser)
        if form.is_valid():
            cust = form.save()
            cust.added_by = request.user
            cust.save()
            return HttpResponseRedirect(reverse('manager:customer'))
    context.update(dict(
        form=form
    ))
    return render(request, 'partner/form-edit-create.html', context)


def profile(request):
    ouser = request.user
    context = {
        'title': 'Prifile Edit',
        'active_menu': 'Profile',
        'action': _('Edit')
    }
    if request.method == 'GET':
        try:
            opartner = ouser.get_partner_user
            init_data = {
                'company_name': opartner.company_name,
                'city': opartner.city,
                'address': opartner.address,
                'telephone': opartner.telephone,
                'id_tax_num': opartner.id_tax_num,
                'tax_office': opartner.tax_office,
                'website': opartner.website
            }
        except:
            init_data = {}

        form = FormProfile(initial=init_data, instance=ouser)
    else:
        form = FormProfile(request.POST, instance=ouser)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('partner:index'))
    context.update(dict(
        form=form
    ))
    return render(request, 'partner/form-edit-create.html', context)
