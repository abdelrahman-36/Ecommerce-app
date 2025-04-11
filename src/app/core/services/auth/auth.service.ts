import { jwtDecode } from './../../../../../node_modules/jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient) { }
  private readonly _Router=inject(Router);
  userData:any=null;
  sendRegisterForm(data:object):Observable<any>
  {
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  sendLoginForm(data:object):Observable<any>
  {
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }
  saveUserData():void{
    if (localStorage.getItem('userToken') !== null) {
   this.userData=   jwtDecode<any>(localStorage.getItem('userToken') !)
   console.log(this.userData);
   
    }
  }
  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('cartId');

    this.userData=null;
    this._Router.navigate(['/login']);
  }
  setEmailVerify(data:object):Observable<any>
  {
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  setCodeVerify(data:object):Observable<any>
  {
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetPassword(data:object):Observable<any>
  {
   return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}


