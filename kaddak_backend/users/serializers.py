from rest_framework import serializers

class ClienteSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField(max_length=100)
    apellido = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    telefono = serializers.CharField(max_length=20)
    foto_perfil = serializers.CharField(required=False, allow_blank=True)
    fecha_registro = serializers.DateTimeField(required=False)

class EmpleadoSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    nombre = serializers.CharField(max_length=100)
    apellidos = serializers.CharField(max_length=100)
    cargo = serializers.CharField(max_length=100)
    telefono = serializers.CharField(max_length=20)
    salario = serializers.DecimalField(max_digits=10, decimal_places=2)
    fecha_contratacion = serializers.DateField(required=False)
