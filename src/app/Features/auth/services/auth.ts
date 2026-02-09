import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {



  constructor(private httpClient: HttpClient) { }

  RegisterApi(userData: object): Observable<any> {

    return this.httpClient.post("http://localhost:3000/users", userData);
  }

  FindUserByEmail(email:string):Observable<any>{
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`);
  }

}
