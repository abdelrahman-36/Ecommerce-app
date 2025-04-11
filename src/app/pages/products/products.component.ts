import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';

import { Iproduct } from '../../shared/interface/iproduct';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Iproduct[] = [];
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.cartService.cartnumber.next(res.numOfCartItems);

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishList(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
