import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { log } from 'console';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  private readonly ordersService = inject(OrdersService);
  private readonly cartService = inject(CartService);
  cartId:string=localStorage.getItem('cartId')!;
  checkOutForm!: FormGroup;
  ngOnInit(): void {
    this.inItForm();
  
  }
  inItForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    });
  }
 
  submitOnlinePayMent(): void {
    this.ordersService
      .checkOutPayMent(this.cartId, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

}
