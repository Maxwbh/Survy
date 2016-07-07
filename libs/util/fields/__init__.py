# coding=utf-8

from django.core.exceptions import ValidationError
from django.core.validators import email_re
from django.utils.translation import ugettext as _
from calendar import monthrange
from datetime import date
from django import forms
import re

VERIFICATION_VALUE_RE = r'^([0-9]{3,4})$'

class CreditCardField(forms.IntegerField):
    def __init__(self, *args, **kwargs):
        super(CreditCardField, self).__init__(*args, **kwargs)
    @staticmethod
    def get_cc_type(number):
        """
        Gets credit card type given number. Based on values from Wikipedia page
        "Credit card number".
        http://en.wikipedia.org/w/index.php?title=Credit_card_number
        """
        number = str(number)
        #group checking by ascending length of number
        if len(number) == 13:
            if number[0] == "4":
                return "Visa"
        elif len(number) == 14:
            if number[:2] == "36":
                return "MasterCard"
        elif len(number) == 15:
            if number[:2] in ("34", "37"):
                return "American Express"
        elif len(number) == 16:
            if number[:4] == "6011":
                return "Discover"
            if number[:2] in ("51", "52", "53", "54", "55"):
                return "MasterCard"
            if number[0] == "4":
                return "Visa"
        return "Unknown"

    def clean(self, value):
        """Check if given CC number is valid and one of the
           card types we accept"""
        cd = super(CreditCardField, self).clean(value)
        if value:
            if value and (len(value) < 13 or len(value) > 16):
                raise forms.ValidationError(u"Por favor, digite um número de cartão de crédito válido.")
            elif self.get_cc_type(value) not in ('Visa', 'MasterCard', 'American Express', 'Discover'):
                raise forms.ValidationError(u'Por favor, utilize apenas cartão com as seguintes Bandeiras: Visa, Master Card, Discover ou American Express.')
        return cd


class CCExpWidget(forms.MultiWidget):
    """ Widget containing two select boxes for selecting the month and year"""
    def decompress(self, value):
        return [value.month, value.year] if value else [None, None]

    def format_output(self, rendered_widgets):
        html = u' / '.join(rendered_widgets)
        return u'<span style="white-space: nowrap">%s</span>' % html


class CCExpField(forms.MultiValueField):
    EXP_MONTH = [('',' ----- ')] + [(x, x) for x in xrange(1, 13)]
    EXP_YEAR = [('',' ----- ')] + [(x, x) for x in xrange(date.today().year,date.today().year + 15)]
    default_error_messages = {
        'invalid_month': u'O mês digitado não é válido',
        'invalid_year': u'O ano digitado não é válido',
    }

    def __init__(self, *args, **kwargs):
        errors = self.default_error_messages.copy()
        if 'error_messages' in kwargs: errors.update(kwargs['error_messages'])
        fields = (
            forms.ChoiceField(choices=self.EXP_MONTH,error_messages={'invalid': errors['invalid_month']}),
            forms.ChoiceField(choices=self.EXP_YEAR,error_messages={'invalid': errors['invalid_year']}),
        )
        super(CCExpField, self).__init__(fields, *args, **kwargs)
        self.widget = CCExpWidget(widgets =
        [fields[0].widget, fields[1].widget])

    def clean(self, value):
        exp = super(CCExpField, self).clean(value)
        if exp:
            if date.today() > exp:
                raise forms.ValidationError(u'Data de expiração informada está expirada.')
        return exp

    def compress(self, data_list):
        if data_list:
            if data_list[1] in forms.fields.EMPTY_VALUES:
                error = self.error_messages['invalid_year']
                raise forms.ValidationError(error)
            if data_list[0] in forms.fields.EMPTY_VALUES:
                error = self.error_messages['invalid_month']
                raise forms.ValidationError(error)
            year = int(data_list[1])
            month = int(data_list[0])
            # find last day of the month
            day = monthrange(year, month)[1]
            return date(year, month, day)
        return None

class VerificationValueField(forms.CharField):
    """
    Form field that validates credit card verification values (e.g. CVV2).
    See http://en.wikipedia.org/wiki/Card_Security_Code
    """

    widget = forms.TextInput(attrs={'maxlength': 4})
    default_error_messages = {
        'required': u'Por favore, informe o código de segurança do cartão.',
        'invalid': u'O código de segurança que você informou não é válido.',
        }

    def clean(self, value):
        if value: value = value.replace(' ', '')
        if not value and self.required:
            raise forms.ValidationError(self.error_messages['required'])
        if value and not re.match(VERIFICATION_VALUE_RE, value):
            raise forms.ValidationError(self.error_messages['invalid'])
        return value

email_separator_re = re.compile(r'[^\w\.\-\+@_]+')


def _is_valid_email(email):
    return email_re.match(email)


class EmailsListField(forms.CharField):
    widget = forms.Textarea

    def clean(self, value):
        super(EmailsListField, self).clean(value)

        emails = email_separator_re.split(value)

        if not emails:
            raise ValidationError(_(u'Digite pelo menos um endereço de email.'))

        for email in emails:
            if not _is_valid_email(email):
                raise ValidationError(_(u'%s não é um e-mail válido.') % email)

        return emails