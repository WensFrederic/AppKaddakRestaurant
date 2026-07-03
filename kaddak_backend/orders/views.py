from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .dao import OrdenDAO
from .serializers import OrdenSerializer
import datetime

class OrdenListCreate(APIView):
    def get(self, request):
        dao = OrdenDAO()
        ordenes = dao.get_all()
        return Response(ordenes, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrdenSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            total = 0.0
            detalles_limpios = []
            for d in data['detalles']:
                precio = float(d['precio_unitario'])
                cantidad = int(d['cantidad'])
                total += precio * cantidad
                
                detalle = dict(d)
                detalle['precio_unitario'] = precio
                detalles_limpios.append(detalle)
                
            data['detalles'] = detalles_limpios
            data['total'] = total
            data['fecha_orden'] = datetime.datetime.now().isoformat()
            
            if 'pago' in data and data['pago']:
                data['pago'] = dict(data['pago'])
                data['pago']['monto'] = float(data['pago']['monto'])
            
            if 'delivery' in data and data['delivery']:
                data['delivery'] = dict(data['delivery'])

            dao = OrdenDAO()
            created = dao.create(data)
            return Response(created, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

