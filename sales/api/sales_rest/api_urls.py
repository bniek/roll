from django.urls import path
from .views import api_sales, api_customer, api_sales_people

urlpatterns =[
    path('', api_sales, name="sales"),
    path('customers/', api_customer, name="customers"),
    path('salespeople/', api_sales_people, name='sales_person')
]
