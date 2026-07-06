from rest_framework import serializers

class CategoriaSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre_categoria = serializers.CharField(max_length=100)
    descripcion = serializers.CharField(required=False, allow_blank=True)

class ComidaSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    id_categoria = serializers.CharField(max_length=100)
    nombre_comida = serializers.CharField(max_length=50)
    descripcion = serializers.CharField(required=False, allow_blank=True)
    precio = serializers.DecimalField(max_digits=10, decimal_places=2)
    imagen = serializers.CharField(required=False, allow_blank=True)
    disponible = serializers.BooleanField(default=True)
