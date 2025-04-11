import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../shared/interface/iproduct';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);

  detailsProduct: Iproduct | null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next: (res) => {
            this.detailsProduct = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
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
}
