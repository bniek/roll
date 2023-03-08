from django.urls import path

from .views import api_list_appointments, api_technicians

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    # path("appointments/<int:id>/", api_list_appointments, name="api_show_appointment"),
    path("technicians/", api_technicians, name="api_list_technicians"),



]
