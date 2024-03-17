import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any = [
    {
      name: 'Samsung',
      model: 'T2 Pro',
      price: 18000,
      image: 'assets/1.jpeg',
      discount: '20%',
      quantity: 8,
    },
    {
      name: 'Nokia',
      model: 'V-series',
      price: 11000,
      image: 'assets/1.jpeg',
      discount: '20%',
      quantity: 7,
    },
    {
      name: 'Vivo',
      model: 'V29',
      price: 12000,
      image: 'assets/1.jpeg',
      discount: '20%',
      quantity: 3,
    },
    {
      name: 'Apple',
      model: 'V20e',
      price: 15000,
      image: 'assets/1.jpeg',
      discount: '20%',
      quantity: 5,
    },
  ];
}
