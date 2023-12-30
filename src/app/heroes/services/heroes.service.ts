import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { CountAndHero, Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes(limit:number, offset:number):Observable<CountAndHero>{
    return this.httpClient.get<CountAndHero>( `${ this.baseUrl }/api/heroes?limit=${ limit }&offset=${ offset}`)
  }

  getHeroById( slug:string ):Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${ this.baseUrl }/api/heroes/${ slug }`)
      .pipe(
        catchError( error => of( undefined )),
      )
  }

  getSuggestions( query:string ):Observable<CountAndHero>{
    return this.httpClient.get<CountAndHero>(`${ this.baseUrl }/api/heroes?query=${query}&limit=20`)
  }

}
