import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl:string = environments.baseUrl;
  private user?:User;

  constructor(private httpClient: HttpClient) { }

  get currentUser():User|undefined{
    if ( !this.user ) return undefined;
    return structuredClone(this.user);// clon de un objeto
  }

  login( email:string, password:string ):Observable<User>{
    return this.httpClient.post<User>(`${ this.baseUrl }/api/auth/login`,{ email, password })
          .pipe(
            tap( user => this.user = user ),
            tap( user => localStorage.setItem('token', JSON.stringify( user._id ) ))
          )
  }
  addUser( user:User ):Observable<User>{
    return this.httpClient.post<User>(`${ this.baseUrl }/api/auth`, user)
        .pipe(
          tap( user => this.user = user ),
          tap( user => localStorage.setItem('token', JSON.stringify( user._id ) ))
        )
  }


  updateHero( user:User ):Observable<User>{
    return this.httpClient.patch<User>(`${ this.baseUrl }/api/users/${ user._id }`, user);
  }

  deleteHero( id:string ):Observable<User>{
    return this.httpClient.delete<User>(`${ this.baseUrl }/api/users/${ id }`);
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticationStatus():Observable<boolean> {
    if( !localStorage.getItem('token') ) return of(false);

    const token = JSON.parse(localStorage.getItem('token')!);

    return this.httpClient.get<User>(`${ this.baseUrl }/api/auth/${ token }`)
    .pipe(
      tap( user => this.user = user ),
      map( user => !!user ),
      catchError( err => of(false))
    )
  }

}
