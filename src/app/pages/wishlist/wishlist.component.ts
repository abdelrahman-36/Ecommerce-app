import { ToastrService } from 'ngx-toastr';

import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interface/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  wishListData: Iwishlist[] = [];
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.getWishListData();
  }
  getWishListData(): void {
    this.wishlistService.GetLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteproduct(id: string): void {
    this.wishlistService.deleteWishListProduct(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.getWishListData();
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

          this.deleteproduct(id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
