from django.urls import path

from .views import api_list_appointments, api_delete_appointment, api_technicians

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_delete_appointment, name="api_change_appointment"),
    path("technicians/", api_technicians, name="api_list_technicians"),

]
