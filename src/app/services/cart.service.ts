import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, product];
    console.log('Updated Cart Items:', updatedItems);
    this.cartItemsSubject.next(updatedItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  getCartItems() {
    return this.cartItemsSubject.value;
  }
}
