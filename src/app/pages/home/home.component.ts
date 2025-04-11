import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interface/iproduct';
import { CategotiesService } from '../../core/services/categories/categoties.service';
import { Icategories } from '../../shared/interface/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Iproduct[] = [];
  categories: Icategories[] = [];
  private readonly productsService = inject(ProductsService);
  private readonly categotiesService = inject(CategotiesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

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
  getCategoriesData(): void {
    this.categotiesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProductData();
    this.getCategoriesData();
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log();

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
