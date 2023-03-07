from django.urls import path

from .views import api_list_appointments, api_technicians

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_create_appointments"),
    path("appointments/<str:vin>/", api_list_appointments, name="api_list_appointments"),
    path("technicians/", api_technicians, name="api_create_technicians"),
    path("technicians/<int:employee_number>/", api_technicians, name="api_show_technician"),



]
