import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }
  getAllbrands():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  getSpecificBrands(id:string|null):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
}
