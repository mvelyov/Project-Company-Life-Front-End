import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from './../../config/app.config';
import { RequesterService } from './../requester/requester.service';
import { HttpOptions } from './http';
import { User } from './user';

@Injectable()
export class LoginService {
  public user: User;
  constructor(private appConfig: AppConfig,
              private requester: RequesterService, private http: HttpClient,
              private jwtService: JwtHelperService) { }
 // tslint:disable-next-line:ban-types
  // tslint:disable-next-line:typedef

  public login(user: User, options?: HttpOptions): Observable<object> {
      return this.requester.post('http://localhost:3001/api/login', user);
 }
  public isAuthenticated(): boolean {
   const token = localStorage.getItem('access_token');
   const decoded = this.jwtService.decodeToken(token);

   return !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwt_issuer;
}

  public isUser(): boolean {
    let isLogged = false;
    const token = localStorage.getItem('access_token');
    if (token) {
      isLogged = true;
    }
    return isLogged;
  }

  public isAdmin(): boolean {
      const token = localStorage.getItem('access_token');
      let isAdmin = false;
      const decoded = this.jwtService.decodeToken(token);
      if (decoded && decoded.admin) {
        isAdmin = true;
      }
      return isAdmin;
  }
  public logout(): void {
   localStorage.removeItem('access_token');
   localStorage.removeItem('user_name');
 }
  public giveDecoded(): any {
    const token = localStorage.getItem('access_token');
    return this.jwtService.decodeToken(token);
 }
}
