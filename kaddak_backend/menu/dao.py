from core.dao import FirestoreDAO

class CategoriaDAO(FirestoreDAO):
    collection_name = 'categorias'

class ComidaDAO(FirestoreDAO):
    collection_name = 'comidas'
