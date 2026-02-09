import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {


  decodedToken: any;

  constructor(private httpClient: HttpClient) { }

  RegisterApi(userData: object): Observable<any> {

    return this.httpClient.post("http://localhost:3000/users", userData);
  }

  FindUserByEmail(email: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`);
  }

  LoginApi(data: object): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
    // https://government-services.runasp.net/Auth/Login
    // https://ecommerce.routemisr.com/api/v1/auth/signin
  }

  DecodeToken() {

    this.decodedToken = jwtDecode(localStorage.getItem("usertoken")!);
    console.log(this.decodedToken);

  }

}
