from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib import messages
from apps.configuration.models import Country, Language
from .models import Customer

@login_required
def edit(request):
    customer = request.user.get_customer
    ctx = {
        'customer': customer,
        'countrys': Country.objects.all(),
        'langs': Language.objects.filter(status=True)
    }
    if request.method == 'POST':
        data = request.POST
        message = False
        paswd = data.get('password')
        new_paswd = data.get('new_password')
        new_paswd2 = data.get('new_password2')
        user = request.user
        if not user.check_password(paswd):
            message = 'Invalid Password'
        else:
            if new_paswd:
                if new_paswd != new_paswd2:
                    message = 'Passwords do not match'
                else:
                    user.set_password(new_paswd)
                    user.save()

        kwargs = {}
        for k, v in data.iteritems():
            if k in ['csrfmiddlewaretoken', 'password', 'new_password', 'new_password2']:
                continue
            kwargs[k] = v

        if message:
            messages.error(request, message)
        else:
            Customer.objects.filter(id=customer.id).update(**kwargs)
            messages.success(request, 'Your Account has be update!')
        ctx.update(dict(customer=kwargs))
    return render(request, 'customer-edit.html', ctx)


@login_required
@csrf_exempt
def update_info(request):
    print request.POST
    return JsonResponse('ola', safe=False)