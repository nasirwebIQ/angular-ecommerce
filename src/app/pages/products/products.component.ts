import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data; // Store the fetched products
      console.log(data); // Log the data to check
    });
  }
}
