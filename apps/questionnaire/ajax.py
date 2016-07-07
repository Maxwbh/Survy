# -*- coding: utf-8 -*-
# Autor: christian
# coding=utf-8
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
import json
from apps.answer.models import Set, SetValues, Values

x = Dajax()


# @dajaxice_register
# def delete_value(request, value_id, show_msg=False):
#     try:
#         v = Values.objects.get(id=value_id)
#         v.delete()
#         if show_msg:
#             x.script('swal("Value: [{0}], deleted")'.format(v))
#     except Exception as e:
#         x.script('swal("Erro: [{0}]")'.format(e))
#     return x.json()


@dajaxice_register
def save_set(request, set_name, values):
    try:
        new_values = {}
        for v in json.loads(values):
            n, i = v.get('name').split('-')
            if n == 'value':
                if new_values.get(i):
                    new_values.get(i).update({'value': v.get('value')})
                else:
                    new_values.update({i: {'value': v.get('value')}})
            else:
                if new_values.get(i):
                    new_values.get(i).update({'answer': v.get('value')})
                else:
                    new_values.update({i: {'answer': v.get('value')}})
        if new_values:
            answer_set = Set(
                name=set_name,
                added_by=request.user
            )
            answer_set.save()
            for k, v in new_values.iteritems():
                set_values = SetValues(
                    set=answer_set,
                    answer_text=v.get('answer'),
                    answer_value=v.get('value')
                )
                set_values.save()

        x.script('swal("Answer Set ** {0} **, success saved")'.format(set_name))
    except Exception as e:
        x.script('swal("Erro: {0}")'.format(e))
    return x.json()
