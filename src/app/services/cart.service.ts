import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() { }

  addToCart(item: any) {
    const existing = this.cartItems.find(i => i.id === item.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      this.cartItems.push({ ...item, cantidad: 1 });
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}
