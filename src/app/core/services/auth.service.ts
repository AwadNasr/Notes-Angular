import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser=new BehaviorSubject(null)


  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken') !=null){
  this.decode()
    }

   }
  register(data:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'signup', data)
  }
  login(data:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'signin', data)
  }

  decode(){
    let token=JSON.stringify(localStorage.getItem('userToken'))
    let decoded:any=jwtDecode(token)
    this.currentUser.next(decoded)
  }

}
