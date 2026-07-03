from core.firebase import get_firestore_client
from google.cloud.firestore_v1.base_query import FieldFilter

class FirestoreDAO:
    """
    Data Access Object base para interactuar con Firestore de manera uniforme.
    """
    collection_name = None

    def __init__(self):
        if not self.collection_name:
            raise ValueError("collection_name no definido en la clase hija.")
        self.db = get_firestore_client()
        self.collection = self.db.collection(self.collection_name)

    def get_all(self):
        docs = self.collection.stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def get_by_id(self, doc_id):
        doc_ref = self.collection.document(doc_id)
        doc = doc_ref.get()
        if doc.exists:
            return {**doc.to_dict(), "id": doc.id}
        return None

    def create(self, data, doc_id=None):
        if doc_id:
            doc_ref = self.collection.document(doc_id)
            doc_ref.set(data)
            return {**data, "id": doc_id}
        else:
            _, doc_ref = self.collection.add(data)
            return {**data, "id": doc_ref.id}

    def update(self, doc_id, data):
        doc_ref = self.collection.document(doc_id)
        doc_ref.update(data)
        return {**data, "id": doc_id}

    def delete(self, doc_id):
        doc_ref = self.collection.document(doc_id)
        doc_ref.delete()
        return True

    def query(self, field, operator, value):
        """
        Ejecuta un query simple en Firestore.
        Operadores comunes: '==', '<', '>', '<=', '>=', 'in', 'array_contains'
        """
        docs = self.collection.where(filter=FieldFilter(field, operator, value)).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]
