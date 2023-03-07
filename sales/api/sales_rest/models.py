from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)

class SalesPerson(models.Model):
    name = models.CharField(max_length=25)
    employee_number = models.CharField(max_length=10, unique=True)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})

class Customer(models.Model):
    name = models.CharField(max_length=25)
    address = models.CharField(max_length=25)
    phone_number = models.CharField(max_length=12, unique=True)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})

class Sale(models.Model):
    price=models.CharField(max_length=20)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.PROTECT,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.PROTECT,
    )
    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.id})
