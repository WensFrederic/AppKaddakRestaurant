from rest_framework import serializers

class DetalleOrdenSerializer(serializers.Serializer):
    id_comida = serializers.CharField(max_length=100)
    cantidad = serializers.IntegerField(min_value=1)
    precio_unitario = serializers.DecimalField(max_digits=10, decimal_places=2)
    observacion = serializers.CharField(required=False, allow_blank=True)

class PagoSerializer(serializers.Serializer):
    metodo_pago = serializers.ChoiceField(choices=['efectivo', 'tarjeta'])
    estado_pago = serializers.ChoiceField(choices=['pendiente', 'pagado', 'rechazado'], default='pendiente')
    monto = serializers.DecimalField(max_digits=10, decimal_places=2)
    fecha_pago = serializers.DateTimeField(required=False)

class DeliverySerializer(serializers.Serializer):
    direccion_entrega = serializers.CharField()
    repartidor = serializers.CharField(required=False, allow_blank=True)
    estado_delivery = serializers.ChoiceField(choices=['pendiente', 'en_camino', 'Entregado'], default='pendiente')

class OrdenSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    id_cliente = serializers.CharField(max_length=100)
    tipo_orden = serializers.ChoiceField(choices=['mesa', 'pickup', 'delivery'])
    estado_orden = serializers.ChoiceField(choices=['recibida', 'en_preparacion', 'entregado', 'cancelado'], default='recibida')
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    fecha_orden = serializers.DateTimeField(required=False)
    
    detalles = DetalleOrdenSerializer(many=True)
    pago = PagoSerializer(required=False)
    delivery = DeliverySerializer(required=False)
