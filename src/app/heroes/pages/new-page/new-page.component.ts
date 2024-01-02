import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({
    slug: new FormControl<string>('', {nonNullable:true}),
    superhero: new FormControl<string>('', {nonNullable:true}),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    { id:'DC Comics' , desc:'DC - Comics'},
    { id:'Marvel Comics' , desc:'Marvel - Comics'},
  ]

  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    if( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({slug}) => this.heroesService.getHeroById( slug ))
    )
    .subscribe( hero =>{
      if( !hero ) return this.router.navigateByUrl('/')

      return this.heroForm.reset(hero);
    })
  }

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;// hacer que la respuesta sea de tipo Hero
    return hero
  }

  onSubmit():void{
    if( !this.heroForm.valid) return;

    if( this.currentHero.slug ) {
      this.heroesService.updateHero( this.currentHero )
          .subscribe(  hero => {
            // Todo: mostrar snackbar
          });
    }else{
      this.heroesService.addHero( this.currentHero )
          .subscribe( hero => {
            // todo: mostrar snackbar, y navegar a /heroes/edit/hero.slug
          });
    }
  }
}
