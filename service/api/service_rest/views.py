from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointments


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "technician_name",
        "employee_number",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "import_href",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointments
    properties = [
        "vin",
        "owner_name",
        "date",
        "time",
        "reason",
        "vip",
        "id",
        "completed"
    ]
    def get_extra_data(self,o):
        return {"technician": o.technician.technician_name}




@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_vin=None):
    if request.method == "GET":
        if automobile_vo_vin is not None:
            appointments = Appointments.objects.filter(vin=automobile_vo_vin)
        else:
            appointments = Appointments.objects.all()
        return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
                safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(technician_name=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status = 400,
            )
        try:
            automobile = AutomobileVO.objects.get(vin=content["vin"])
            if content["vin"] == automobile.vin:
                content["vip"] = True
                appointment = Appointments.objects.create(**content)
                return JsonResponse(
                    appointment,
                    encoder = AppointmentEncoder,
                    safe = False
                )
        except AutomobileVO.DoesNotExist:
            appointment = Appointments.objects.create(**content)
            return JsonResponse(
                    appointment,
                    encoder = AppointmentEncoder,
                    safe = False
                )


@require_http_methods(["DELETE", "PUT"])
def api_delete_appointment(request, id):
    if request.method == "DELETE":
        count, _ = Appointments.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})
    else:
        content=json.loads(request.body)
        Appointments.objects.filter(id=id).update(**content)
        appointment=Appointments.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
