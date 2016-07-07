# -*- coding: utf-8 -*-
from django import forms
from .models import Survey
# import floppyforms.__future__ as forms
from floppyforms import ClearableFileInput


class ImageThumbnailFileInput(ClearableFileInput):
    template_name = 'floppyforms/image_thumbnail.html'


class SurveyForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = [
            'id', 'image', 'title', 'description', 'custommsg', 'lang'
        ]

        widgets = {
            'image': ImageThumbnailFileInput
        }