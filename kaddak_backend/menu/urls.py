from django.urls import path
from .views import CategoriaList, ComidaList, ComidaDetail

urlpatterns = [
    path('categorias/', CategoriaList.as_view(), name='categoria-list'),
    path('comidas/', ComidaList.as_view(), name='comida-list'),
    path('comidas/<str:pk>/', ComidaDetail.as_view(), name='comida-detail'),
]
