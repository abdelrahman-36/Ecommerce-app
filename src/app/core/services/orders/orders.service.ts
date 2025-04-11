import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken: any = localStorage.getItem('userToken');
  constructor(private httpClient:HttpClient) { }

  checkOutPayMent(id:string,data:object):Observable<any> {
   return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
    },
  
    )

  }
  checkOutCashOrder(id:string,data:object):Observable<any> {
   return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        "shippingAddress":data
    },
  
    )

  }
}
