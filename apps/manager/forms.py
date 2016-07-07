# -*- coding: utf-8 -*-
# Autor: christian
from django import forms
from .models import PartnerDetails, SalesmanDetails
from apps.customer.models import Customer
from apps.plan.models import Plan
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class FormPartnerDetails(forms.ModelForm):
    class Meta:
        model = PartnerDetails
        exclude = ['partner_status', 'timestamp']

    #birth_date = forms.DateField(required=False)


class FormCustomer(forms.ModelForm):
    error_messages = {
        'password_mismatch': _("The two password fields didn't match."),
    }
    password1 = forms.CharField(label=_("Password"),
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Password confirmation"),
                                widget=forms.PasswordInput,
                                help_text=_("Enter the same password as above, for verification."))
    company_name = forms.CharField(label=_('Company Name'), required=False)
    company_address = forms.CharField(label=_('Company Address'), required=False)
    company_tax_id = forms.CharField(label=_('Tax ID'), required=False)
    company_tax_ofc = forms.CharField(label=_('Tax Office'), required=False)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email",)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit=True):
        data = self.cleaned_data
        user = super(FormCustomer, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.is_superuser = True
        if commit:
            user.save()
            try:
                customer = user.get_customer
            except:
                customer = False
            if customer:
                customer.name = user.get_full_name()
                customer.company_name = data['company_name']
                customer.company_address = data['company_address']
                customer.company_tax_id = data['company_tax_id']
                customer.company_tax_ofc = data['company_tax_ofc']
            else:
                customer = Customer(
                    user=user,
                    name=user.get_full_name(),
                    company_name=data['company_name'],
                    company_address=data['company_address'],
                    company_tax_id=data['company_tax_id'],
                    company_tax_ofc=data['company_tax_ofc'],
                )
            customer.save()
        return customer


class FormSalesman(forms.ModelForm):
    error_messages = {
        'password_mismatch': _("The two password fields didn't match."),
    }
    password1 = forms.CharField(label=_("Password"),
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Password confirmation"),
                                widget=forms.PasswordInput,
                                help_text=_("Enter the same password as above, for verification."))
    city = forms.CharField(label=_('Company Name'), required=False)
    address = forms.CharField(label=_('Company Address'), required=False)
    telephone = forms.CharField(label=_('Telephone'), required=False)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email",)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit=True):
        data = self.cleaned_data
        user = super(FormSalesman, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.is_staff = True
        if commit:
            user.save()
            try:
                salesman = user.get_salesman
            except:
                salesman = False
            if salesman:
                salesman.f_name = user.first_name
                salesman.l_name = user.last_name
                salesman.city = data["city"]
                salesman.address = data["address"]
                salesman.telephone = data["telephone"]
            else:
                salesman = SalesmanDetails(
                    user=user,
                    f_name=user.first_name,
                    l_name=user.last_name,
                    city=data["city"],
                    address=data["address"],
                    telephone=data["telephone"]
                )
            salesman.save()
        return salesman


class FormProfile(forms.ModelForm):
    error_messages = {
        'password_mismatch': _("The two password fields didn't match."),
    }
    password1 = forms.CharField(label=_("Password"),
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Password confirmation"),
                                widget=forms.PasswordInput,
                                help_text=_("Enter the same password as above, for verification."))
    company_name = forms.CharField(label=_('Company Name'), required=False)
    city = forms.CharField(label=_('City'), required=False)
    address = forms.CharField(label=_('Company Address'), required=False)
    telephone = forms.CharField(label=_('Telephone'), required=False)
    id_tax_num = forms.IntegerField(label=_('Tax ID'), required=False)
    tax_office = forms.IntegerField(label=_('Tax Office'), required=False)
    website = forms.CharField(label=_('Website'), required=False)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email",)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit=True):
        data = self.cleaned_data
        password1 = data.get("password1")
        password2 = data.get("password2")
        user = super(FormProfile, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        #user.is_superuser = False
        user.is_staff = True
        if commit:
            user.save()
            try:
                partner = PartnerDetails(login=user)
            except:
                partner = False
            if partner:
                partner.f_name = user.first_name
                partner.l_name = user.last_name
                partner.company_name = data['company_name']
                partner.city = data['city']
                partner.address = data['address']
                partner.telephone = data['telephone']
                partner.id_tax_num = data['id_tax_num']
                partner.tax_office = data['tax_office']
                partner.website = data['website']
            else:
                partner = PartnerDetails(
                    user=user,
                    f_name=user.first_name,
                    l_name=user.last_name,
                    company_name=data['company_name'],
                    city=data['city'],
                    address=data['address'],
                    telephone=data['telephone'],
                    id_tax_num=data['id_tax_num'],
                    tax_office=data['tax_office'],
                    website=data['website'],
                )
            print 'PARTNER', partner
            partner.save()
        return user


class FormPlan(forms.ModelForm):
    class Meta:
        model = Plan
        exclude = ['plan_status', 'timestamp']

