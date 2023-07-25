from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .encoders import (
    SaleEncoder,
    SalesPersonEncoder,
    AutomobileVOEncoder,
    CustomerEncoder,
)
from .models import Sale, SalesPerson, AutomobileVO, Customer


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalesPersonEncoder)
    else:
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_show_salesperson(request, pk):
    try:
        salesperson = SalesPerson.objects.get(id=pk)
        salesperson.delete()
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    except SalesPerson.DoesNotExist:
        return JsonResponse({"message": "Salesperson does not exist"})


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_show_customer(request, pk):
    try:
        customer = Customer.objects.get(id=pk)
        customer.delete()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    except Customer.DoesNotExist:
        return JsonResponse({"message": "customer doesnt exist"})
