from django.urls import path
from .views import ClienteListCreate, EmpleadoListCreate

urlpatterns = [
    path('clientes/', ClienteListCreate.as_view(), name='cliente-list-create'),
    path('empleados/', EmpleadoListCreate.as_view(), name='empleado-list-create'),
]
