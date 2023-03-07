from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def get_api_url(self):
        return reverse("api_automobileVO", kwargs={"pk": self.id})



class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})



class Appointments(models.Model):
    owner_name = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    reason = models.TextField()
    bought_here = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="service_appointments",
        on_delete=models.CASCADE,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="service_appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_service_appointment", kwargs={"pk": self.id})
