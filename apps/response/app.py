# -*- coding: utf-8 -*-
# Autor: christian
from django.apps import AppConfig
from libs.util.sched import SchedManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class ResponseAppConfig(AppConfig):
    name = 'apps.response'
    verbose_name = "Response"

    def send_emails(self):
        from .models import Respondent
        respondents = Respondent.objects.filter(email__isnull=False, campaign__isnull=False, mail_send_status=2)
        for respondent in respondents:
            try:
                validate_email(respondent.email)
            except ValidationError as e:
                respondent.status_msg = '{0}'.format(e)
                respondent.save()
            else:
                respondent.send_email()

    def ready(self):
        pass
        t = SchedManager()
        t.add_operation(self.send_emails, 60*10)
