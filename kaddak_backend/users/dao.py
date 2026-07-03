from core.dao import FirestoreDAO

class ClienteDAO(FirestoreDAO):
    collection_name = 'clientes'

class UsuarioDAO(FirestoreDAO):
    collection_name = 'usuarios'

class EmpleadoDAO(FirestoreDAO):
    collection_name = 'empleados'
