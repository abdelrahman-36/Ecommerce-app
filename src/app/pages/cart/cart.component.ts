import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interface/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartDetails = res.data;
        this.cartService.cartnumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCount(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  claerCart(): void {
    this.cartService.clearcart().subscribe({
      next: (res) => {
       

        if (res.message === 'success') {
          this.cartDetails = {} as Icart;
          this.cartService.cartnumber.next(0);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
