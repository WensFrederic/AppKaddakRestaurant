from core.dao import FirestoreDAO

class OrdenDAO(FirestoreDAO):
    collection_name = 'ordenes'

class FacturacionDAO(FirestoreDAO):
    collection_name = 'facturas'
