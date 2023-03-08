from django.db import models


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField()

    def __str__(self):
        return self.technician_name


class Appointments(models.Model):
    vin = models.CharField(max_length=17, null=True)
    owner_name=models.CharField(max_length=200)
    date=models.DateField(null=True)
    time=models.TimeField(null=True)
    reason=models.CharField(max_length=200)
    technician= models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )
    vip=models.BooleanField(default=False)
    completed=models.BooleanField(default=False)
