import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root',
})
export class ProductoService {

private productos: Producto[] = [

  {
    id: '1',

    nombre: 'Hamburguesa Kaddak',

    descripcion: 'Carne Angus, queso cheddar y salsa especial.',

    precio: 12.50,

    categoria: 'Hamburguesas',

    imagen: 'assets/comida.jpg',

    disponible: true,

    tiempoPreparacion: 15
  },

  {
    id: '2',

    nombre: 'Pizza Pepperoni',

    descripcion: 'Pizza con queso mozzarella y pepperoni.',

    precio: 14.90,

    categoria: 'Pizzas',

    imagen: 'assets/comida.jpg',

    disponible: true,

    tiempoPreparacion: 20
  },

  {
    id: '3',

    nombre: 'Pasta Alfredo',

    descripcion: 'Pasta cremosa con queso parmesano.',

    precio: 11.90,

    categoria: 'Pastas',

    imagen: 'assets/comida.jpg',

    disponible: true,

    tiempoPreparacion: 18
  }

];



constructor (){}
obtenerProductos():Producto[]{
  return this.productos
}

obtenerProducto(id: string): Producto | undefined {

  return this.productos.find(producto => producto.id === id);

}

agregarProducto(producto: Producto): void {

  // Agrega el producto al final del arreglo
  this.productos.push(producto);
}
  actualizarProducto(producto: Producto): boolean {

  // Buscar la posición del producto dentro del arreglo
  const indice = this.productos.findIndex(

    item => item.id === producto.id

  );

  // Verificar si el producto existe
  if (indice !== -1) {

    // Reemplazar el producto por la nueva información
    this.productos[indice] = producto;

    return true;

  }

  // El producto no fue encontrado
  return false;

}

eliminarProducto(id: string): boolean {

  // Buscar la posición del producto dentro del arreglo
  const indice = this.productos.findIndex(

    producto => producto.id === id

  );

  // Verificar si el producto existe
  if (indice !== -1) {

    // Eliminar el producto del arreglo
    this.productos.splice(indice, 1);

    return true;

  }

  // No se encontró el producto
  return false;

}

buscarProducto(texto: string): Producto[] {

  // Eliminar espacios al inicio y al final
  texto = texto.trim();

  // Si el usuario no escribe nada,
  // devolver todos los productos.
  if (texto === '') {

    return this.productos;

  }

  // Convertir el texto a minúsculas
  texto = texto.toLowerCase();

  // Filtrar los productos encontrados
  return this.productos.filter(producto =>

    producto.nombre.toLowerCase().includes(texto)

  );

}

}


















































































