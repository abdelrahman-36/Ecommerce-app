import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrand } from '../../shared/interface/Ibrand/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandsData: Ibrand[] = [];
  private readonly brandsService = inject(BrandsService);
  ngOnInit(): void {
    this.getBrandsData();
  }
  getBrandsData(): void {
    this.brandsService.getAllbrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
