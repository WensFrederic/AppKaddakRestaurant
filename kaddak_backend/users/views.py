from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .dao import ClienteDAO, EmpleadoDAO
from .serializers import ClienteSerializer, EmpleadoSerializer
import datetime

class ClienteListCreate(APIView):
    def get(self, request):
        dao = ClienteDAO()
        clientes = dao.get_all()
        return Response(clientes, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data['fecha_registro'] = datetime.datetime.now().isoformat()
            
            dao = ClienteDAO()
            doc_id = request.data.get('id') 
            created = dao.create(data, doc_id=doc_id)
            return Response(created, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmpleadoListCreate(APIView):
    def get(self, request):
        dao = EmpleadoDAO()
        empleados = dao.get_all()
        return Response(empleados, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmpleadoSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data['salario'] = float(data['salario'])
            if 'fecha_contratacion' in data:
                data['fecha_contratacion'] = data['fecha_contratacion'].isoformat()
            
            dao = EmpleadoDAO()
            created = dao.create(data)
            return Response(created, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

