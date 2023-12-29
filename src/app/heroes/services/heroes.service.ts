import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>( `${ this.baseUrl }/api/heroes?limit=30`)
  }

  getHeroById( slug:string ):Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${ this.baseUrl }/api/heroes/${ slug }`)
      .pipe(
        catchError( error => of( undefined )),
      )
  }

  getSuggestions( query:string ):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/api/heroes?query=${query}&limit=5`)
  }

}
