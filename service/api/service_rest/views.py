from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointments


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["technician_name", "employee_number"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointments
    properties = [
        "owner_name",
        "date_time",
        "reason",
        "bought_here",
        "technician",
        "automobile"
    ]
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response




@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_vin=None):
    if request.method == "GET":
        if automobile_vo_vin is not None:
            appointments = Appointments.objects.filter(automobile=automobile_vo_vin)
        else:
            appointments = Appointments.objects.all()
        return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile

            technician_name = content["technician"]
            technician = Technician.objects.get(technician=technician_name)
            content["technician"] = technician

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin or technician"},
                status=400,
            )

        appointment = Appointments.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
