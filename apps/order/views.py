from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from apps.response.models import ResponsePlan
from apps.customer.models import CustomerPlan, ResponsePlan as CustomerResponsePlan
from apps.manager.models import AmountReceived, BankDetail
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib import messages


@login_required
def checkout(request, pid):
    plan = get_object_or_404(ResponsePlan, id=pid, res_plan_status=1)
    customer = request.user.get_customer
    cus_plan = CustomerResponsePlan(
        customer=customer,
        plan=plan,
        added_by=request.user
    )
    cus_plan.save()
    amt_rec = AmountReceived(
        customer=customer,
        ref_plan_id=cus_plan.id,
        amount=plan.plan_cost,
        transaction_type=2,
        added_by=request.user
    )
    amt_rec.save()
    return HttpResponseRedirect(reverse('order:buy', args=(amt_rec.id,)))


@login_required
def pay(request, aid):
    amt_rec = get_object_or_404(AmountReceived, id=aid)
    ctx = {
        'amt_rec': amt_rec
    }
    return render(request, 'pay.html', ctx)


@login_required
def pay_details(request):
    customer = request.user.get_customer
    ctx = {
        'customer': customer,
        'pendplans': customer.amountreceived_set.filter(amt_rec_status=2),
        'subplans': customer.amountreceived_set.filter(transaction_type=1),
        'resplans': customer.amountreceived_set.filter(transaction_type=2)
    }
    return render(request, 'pay-details.html', ctx)


@login_required
def transfer(request, aid):
    customer = request.user.get_customer
    amt_rec = get_object_or_404(AmountReceived, id=aid)
    message = 'Payment Request has been sent. Contact To Admin For the Confirmation.'
    ctx = {
        'amt_rec': amt_rec,
        'imprimir': True,
        'message': message
    }

    if amt_rec.amt_rec_status != 3:
        message = 'This payment has be processed. Status: {0}'.format(amt_rec.get_amt_rec_status_display())
        ctx.update(dict(message=message, imprimir=False))
    else:
        bank = BankDetail(
            amount=amt_rec.amount,
            amnt_rec=amt_rec,
            customer=customer,
            cus_plan_id=amt_rec.ref_plan_id
        )
        bank.save()
        amt_rec.amt_rec_status = 2
        amt_rec.gateway_type = 4
        amt_rec.transaction_num = bank.bankpay
        amt_rec.bank_transfer = bank
        amt_rec.save()
        ctx.update(dict(trans_id=bank.bankpay))
    messages.error(request, message)
    return render(request, 'transfer-print.html', ctx)


@login_required
def buy(request, aid):
    amt_rec = get_object_or_404(AmountReceived, id=aid)
    ctx = {
        'amt_rec': amt_rec
    }
    return render(request, 'buy.html', ctx)
