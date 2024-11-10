import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];


  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }


  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Update the local cartItems array after removal
  }

  // Method to calculate the total price of items in the cart
  calculateItemsTotal() {
    return this.cartItems.reduce((total, item) => {
      const subTotal = total + item.price * item.quantity;
      return Math.round(subTotal *100)/100;

    }, 0);
  }

  // Method to calculate the grand total including shipping and tax
  calculateTotal() {
    console.log(this.cartItems);
    console.log(this.calculateItemsTotal());
    const itemsTotal = this.calculateItemsTotal();
    const shipping = this.getShipping();
    const tax = this.getTax();
    const grandTotal = itemsTotal + shipping + tax;

    // Round to two decimal places without using toFixed
    return Math.round(grandTotal * 100) / 100;
  }

  // Method to calculate shipping cost (example)
  getShipping() {
    return 5; // Customize based on your logic
  }

  // Method to calculate tax (example)
  getTax() {
    return 2; // Customize based on your logic
  }
}
