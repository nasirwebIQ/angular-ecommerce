import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';

// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
  addToCart(product: Product) {
    console.log('Product clicked:', product);
    this.cartService.addToCart(product);
  }
  ngOnInit(): void {
    this.fetchProducts();
  }
}
