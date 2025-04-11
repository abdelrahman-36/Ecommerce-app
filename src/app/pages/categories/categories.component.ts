import { Component, inject, OnInit } from '@angular/core';
import { CategotiesService } from '../../core/services/categories/categoties.service';
import { Icategories } from '../../shared/interface/icategories';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly categotiesService =inject(CategotiesService)
ngOnInit(): void {
  this.getCategoriesData();
  
}
categoriesData:Icategories[] = []
categoriesName:Icategories[] = []
getCategoriesData():void{
this.categotiesService.getAllCategories().subscribe({
  next:(res)=>{

this.categoriesData=res.data;

  },
  error:(err)=>{
console.log(err);

  }
})
}
getSpecificCategories(id:string):void{
  this.categotiesService.getSpecificCategories(id).subscribe({
    next:(res)=>{
    
     this.categoriesName=res.data;
      
        },
        error:(err)=>{
      console.log(err);
      
        }
  })
}
}
