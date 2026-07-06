from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch

class MenuAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('menu.views.CategoriaDAO')
    def test_get_categorias(self, MockCategoriaDAO):
        mock_instance = MockCategoriaDAO.return_value
        mock_instance.get_all.return_value = [
            {"id": "cat1", "nombre_categoria": "Bebidas", "descripcion": "Bebidas frías"}
        ]
        
        response = self.client.get('/api/menu/categorias/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nombre_categoria'], "Bebidas")

    @patch('menu.views.CategoriaDAO')
    def test_create_categoria(self, MockCategoriaDAO):
        mock_instance = MockCategoriaDAO.return_value
        mock_instance.create.return_value = {"id": "new_cat", "nombre_categoria": "Postres", "descripcion": "Dulces"}
        
        data = {
            "nombre_categoria": "Postres",
            "descripcion": "Dulces"
        }
        response = self.client.post('/api/menu/categorias/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['id'], "new_cat")

    @patch('menu.views.CategoriaDAO')
    @patch('menu.views.ComidaDAO')
    def test_create_comida(self, MockComidaDAO, MockCategoriaDAO):
        cat_mock_instance = MockCategoriaDAO.return_value
        cat_mock_instance.get_by_id.return_value = {"id": "cat1", "nombre_categoria": "Bebidas"}
        
        comida_mock_instance = MockComidaDAO.return_value
        comida_mock_instance.create.return_value = {
            "id": "com1",
            "id_categoria": "cat1",
            "nombre_comida": "Coca Cola",
            "precio": 2.50,
            "disponible": True
        }
        
        data = {
            "id_categoria": "cat1",
            "nombre_comida": "Coca Cola",
            "precio": "2.50",
            "disponible": True
        }
        response = self.client.post('/api/menu/comidas/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nombre_comida'], "Coca Cola")

    @patch('menu.views.CategoriaDAO')
    @patch('menu.views.ComidaDAO')
    def test_create_comida_invalid_categoria(self, MockComidaDAO, MockCategoriaDAO):
        cat_mock_instance = MockCategoriaDAO.return_value
        cat_mock_instance.get_by_id.return_value = None
        
        data = {
            "id_categoria": "invalid_cat",
            "nombre_comida": "Pepsi",
            "precio": "2.50",
        }
        response = self.client.post('/api/menu/comidas/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

