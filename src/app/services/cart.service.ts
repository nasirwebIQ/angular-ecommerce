import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    // Constructor e localStorage theke data load korbo
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }
  private updateLocalStorage(cartItems: Product[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // addToCart(product: Product) {
  //   const currentItems = this.cartItemsSubject.value;
  //   const updatedItems = [...currentItems, product];
  //   console.log('Updated Cart Items:', updatedItems);
  //   this.cartItemsSubject.next(updatedItems);
  // }
  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.value;

    // Check if product already exists in cart
    const existingProductIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Product already exists in cart, increase quantity
      const updatedProduct = { ...currentItems[existingProductIndex] };
      updatedProduct.quantity = (updatedProduct.quantity || 1) + 1; // Increment quantity
      currentItems[existingProductIndex] = updatedProduct;
    } else {
      // Product not in cart, add with initial quantity of 1
      currentItems.push({ ...product, quantity: 1 });
    }

    // Update the cart items
    this.cartItemsSubject.next([...currentItems]);

    this.updateLocalStorage(currentItems);
  }


  removeFromCart(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.updateLocalStorage(updatedItems)
  }


  getCartItems() {
    return this.cartItemsSubject.value;
  }
}
