from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import SalesPerson, Sale, Customer, AutomobileVO
# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalesPersonEncoder(ModelEncoder):
    model=SalesPerson
    properties = [
        "name",
        "employee_number",
    ]


class CustomerEncoder(ModelEncoder):
    model=Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]
    encoders = {
        "automobile" : AutomobileVOEncoder(),
        "sales_person" : SalesPersonEncoder(),
        "customer" : CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
            sales_person = SalesPerson.objects.get(employee_number=content["sales_person"])
            content["sales_person"] = sales_person
            customer = Customer.objects.get(phone_number=content["customer"])
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
             return JsonResponse(
                 {"message": "invalid automobile vin"},
                 status=400,
             )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
