from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .dao import CategoriaDAO, ComidaDAO
from .serializers import CategoriaSerializer, ComidaSerializer

class CategoriaList(APIView):
    def get(self, request):
        dao = CategoriaDAO()
        categorias = dao.get_all()
        return Response(categorias, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategoriaSerializer(data=request.data)
        if serializer.is_valid():
            dao = CategoriaDAO()
            created = dao.create(serializer.validated_data)
            return Response(created, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ComidaList(APIView):
    def get(self, request):
        dao = ComidaDAO()
        comidas = dao.get_all()
        return Response(comidas, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ComidaSerializer(data=request.data)
        if serializer.is_valid():
            cat_dao = CategoriaDAO()
            cat = cat_dao.get_by_id(serializer.validated_data['id_categoria'])
            if not cat:
                return Response({"error": "Categoría no encontrada."}, status=status.HTTP_400_BAD_REQUEST)
            
            data = dict(serializer.validated_data)
            data['precio'] = float(data['precio']) # Firestore support float
            
            comida_dao = ComidaDAO()
            created = comida_dao.create(data)
            return Response(created, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ComidaDetail(APIView):
    def put(self, request, pk):
        serializer = ComidaSerializer(data=request.data)
        if serializer.is_valid():
            cat_dao = CategoriaDAO()
            cat = cat_dao.get_by_id(serializer.validated_data['id_categoria'])
            if not cat:
                return Response({"error": "Categoría no encontrada."}, status=status.HTTP_400_BAD_REQUEST)
            
            data = dict(serializer.validated_data)
            data['precio'] = float(data['precio'])
            
            comida_dao = ComidaDAO()
            updated = comida_dao.update(pk, data)
            return Response(updated, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        comida_dao = ComidaDAO()
        comida_dao.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
