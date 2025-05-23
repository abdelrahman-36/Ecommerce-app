import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
isLogin=input<boolean>(true);
private readonly _AuthService=inject(AuthService);
private readonly cartService=inject(CartService)
cartNumber:number=0;
ngOnInit(): void {
  this.cartService.GetLoggedUserCart().subscribe({
    next:(res)=>{
  

   
    this.cartService.cartnumber.next(res.numOfCartItems);

   

    }
  })
  this.cartService.cartnumber.subscribe({
    next:(data)=>{
this.cartNumber=data
    }
  })
}
logout():void{
  this._AuthService.logout();
}
}
