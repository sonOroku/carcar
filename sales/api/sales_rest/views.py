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


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile doesn't exist"},
                status=400,
            )
        try:
            salesperson = SalesPerson.objects.get(employee_id=content["salesperson"])
            content["salesperson"] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status=400,
            )
        try:
            customer = Customer.objects.get(phone_number=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_show_sales(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        sale.delete()
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    except Sale.DoesNotExist:
        return JsonResponse({"message": "Sale doesnt exist"})


@require_http_methods(["GET"])
def unsold_vins(request):
    sold_vins = []
    for sale in Sale.objects.all():
        sold_vins.append(sale.automobile.vin)
    unsold_vins = AutomobileVO.objects.exclude(vin__in=sold_vins)
    return JsonResponse(
        {"automobiles": unsold_vins}, encoder=AutomobileVOEncoder, safe=False
    )
