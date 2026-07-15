/*==================================================
=            IMPORTACIONES
==================================================*/

import { Injectable } from '@angular/core';

import { Carrito } from '../models/carrito.model';

import { Producto } from '../models/producto.model';



//SERVICIO DEL CARRITO


@Injectable({

  providedIn: 'root'

})

export class CarritoService {




//LISTA DEL CARRITO


  private carrito: Carrito[] = [];



  constructor() { }
// este metodo devuelve la lista completa de producto 
// seleccionados por el cliente durante su compra  
  obtenerCarrito(): Carrito[] {

  // Devuelve el contenido actual del carrito
  return this.carrito;

}

 //Si el producto ya existe, aumenta su cantidad.
// Si no existe, crea un nuevo elemento en el carrito.
 
agregarProducto(producto: Producto): void {

  // Buscar si el producto ya está en el carrito
  const item = this.carrito.find(

    elemento => elemento.producto.id === producto.id

  );

  // Si ya existe...
  if (item) {

    // Aumentar la cantidad
    item.cantidad++;

    // Recalcular el subtotal
    item.subtotal = item.cantidad * item.producto.precio;

  }

  // Si no existe...
  else {

    this.carrito.push({

      producto: producto,

      cantidad: 1,

      subtotal: producto.precio

    });

  }

}

/*
  Elimina completamente un producto del carrito.
  Este método busca el producto por su identificador
  y lo elimina de la lista del carrito.*/


eliminarProducto(id: string): boolean {

  // Buscar la posición del producto
  const indice = this.carrito.findIndex(

    item => item.producto.id === id

  );

  // Si existe, eliminarlo
  if (indice !== -1) {

    this.carrito.splice(indice, 1);

    return true;

  }

  // No se encontró el producto
  return false;

}

/*==================================================
=            VACIAR CARRITO
==================================================*/


 /* Elimina todos los productos del carrito.
  Este método reinicia completamente el carrito,
 dejando la lista vacía.*/

vaciarCarrito(): void {

  // Vaciar completamente el carrito
  this.carrito = [];

}

/*
  Aumenta la cantidad de un producto en el carrito.
  Busca el producto por su identificador y aumenta
  su cantidad en una unidad. Luego actualiza
  automáticamente el subtotal.
 */

aumentarCantidad(id: string): void {

  // Buscar el producto dentro del carrito
  const item = this.carrito.find(

    elemento => elemento.producto.id === id

  );

  // Si el producto existe
  if (item) {

    // Aumentar la cantidad
    item.cantidad++;

    // Recalcular el subtotal
    item.subtotal = item.cantidad * item.producto.precio;

  }

}


/*==================================================
=            DISMINUIR CANTIDAD
==================================================*/

/*
  Disminuye la cantidad de un producto del carrito.
  Si la cantidad llega a uno y el usuario vuelve a
  disminuirla, el producto se elimina del carrito.
  @param id Identificador del producto.
 */

disminuirCantidad(id: string): void {

  // Buscar el producto dentro del carrito
  const item = this.carrito.find(

    elemento => elemento.producto.id === id

  );

  // Verificar si el producto existe
  if (item) {

    // Si la cantidad es mayor que 1
    if (item.cantidad > 1) {

      // Disminuir la cantidad
      item.cantidad--;

      // Actualizar el subtotal
      item.subtotal = item.cantidad * item.producto.precio;

    }

    // Si la cantidad es 1, eliminar el producto
    else {

      this.eliminarProducto(item.producto.id);

    }

  }

}
/*
 Calcula el subtotal de todos los productos
 que existen actualmente en el carrito.
 @returns Subtotal de la compra. */

calcularSubtotal(): number {

  // Variable donde se acumulará el subtotal
  let subtotal = 0;

  // Recorrer todos los productos del carrito
  this.carrito.forEach(item => {

    subtotal += item.subtotal;

  });

  // Devolver el subtotal total
  return subtotal;

}

/*
  Calcula el ITBIS (18%) del subtotal de la compra.
  @returns Valor del ITBIS.
 */

calcularITBIS(): number {

  // Obtener el subtotal actual
  const subtotal = this.calcularSubtotal();

  // Porcentaje del ITBIS (18%)
  const porcentajeITBIS = 0.18;

  // Calcular el impuesto
  const itbis = subtotal * porcentajeITBIS;

  // Devolver el valor calculado
  return itbis;

}

/*
  Calcula el total general de la compra.
  El total corresponde a:
 Subtotal + ITBIS
  @returns Total de la compra. */

calcularTotal(): number {

  // Obtener el subtotal
  const subtotal = this.calcularSubtotal();

  // Obtener el ITBIS
  const itbis = this.calcularITBIS();

  // Calcular el total
  const total = subtotal + itbis;

  // Devolver el resultado
  return total;

}
/*
 Calcula la cantidad total de productos
 existentes en el carrito.
  @returns Cantidad total de productos.
 */

cantidadProductos(): number {

  // Variable acumuladora
  let cantidad = 0;

  // Recorrer el carrito
  this.carrito.forEach(item => {

    cantidad += item.cantidad;

  });

  // Devolver la cantidad total
  return cantidad;

}





































}

