from django.urls import path
from .views import OrdenListCreate

urlpatterns = [
    path('ordenes/', OrdenListCreate.as_view(), name='orden-list-create'),
]
