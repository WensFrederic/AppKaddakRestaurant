import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
from django.conf import settings

def initialize_firebase():
    """Initializes Firebase Admin SDK."""
    if not firebase_admin._apps:
        cred_path = getattr(settings, 'FIREBASE_CREDENTIALS_PATH', None)
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            # Fallback for local testing without exact credentials (if using gcloud auth application-default login)
            print("WARNING: FIREBASE_CREDENTIALS_PATH no configurado o archivo no encontrado. Intentando inicialización por defecto.")
            try:
                firebase_admin.initialize_app()
            except ValueError:
                pass

def get_firestore_client():
    """Returns a Firestore client instance."""
    initialize_firebase()
    return firestore.client()
