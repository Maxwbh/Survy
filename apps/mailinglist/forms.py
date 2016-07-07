# -*- coding: utf-8 -*-
from django import forms
from .models import List


class EmailListForm(forms.ModelForm):
    class Meta:
        model = List
        fields = [
            'id', 'name', 'body'
        ]

        widgets = {
            'body': forms.Textarea(attrs={'class': 'summernote'}),
        }
