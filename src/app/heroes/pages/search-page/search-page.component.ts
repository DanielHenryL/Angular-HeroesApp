import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes:Hero[] = [];
  public selectedHero?:Hero;

  constructor( private heroesService:HeroesService ){}
  searchHero(){
    const value:string = this.searchInput.value || '';
    if( value.length === 0 ) return this.heroes = [];
    return this.heroesService.getSuggestions( value )
        .subscribe( ({heroes}) => this.heroes = heroes );

  }

  // cuando seleccionemos un valor del autocomplete
  onSelectedOption( { option }:MatAutocompleteSelectedEvent ):void {
    const hero:Hero = option.value;
    if ( !hero) {
      return this.selectedHero = undefined;
    }
    this.searchInput.setValue( hero.superhero );
    this.selectedHero = hero;

  }

}
