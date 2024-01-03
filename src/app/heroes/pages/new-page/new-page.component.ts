import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
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
    private router:Router,
    private _snackbar:MatSnackBar,
    private dialog: MatDialog
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
            this.showSnackBar(`${ hero.superhero } actualizado!`, "updateClass")
          });
    }else{
      this.heroesService.addHero( this.currentHero )
          .subscribe( hero => {
            this.router.navigate(['/heroes/edit', hero.slug])
            this.showSnackBar(`${ hero.superhero } creado!`, "createClass")
          });
    }
  }

  showSnackBar( message: string, snackBarClass:string="doneClass"):void{
    this._snackbar.open( message, 'Cerrar', {
      duration:2500,
      panelClass:snackBarClass,
      horizontalPosition:'end'
    })
  }

  onDeleteHero(comienzoDialog:string, finDialog:string ):void{
    this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
      width:'450px',
      enterAnimationDuration:comienzoDialog,
      exitAnimationDuration:finDialog
    }).afterClosed()
      .pipe(
        filter( (result:boolean) => result),// si es true passa al switchMap
        switchMap( () => this.heroesService.deleteHero( this.currentHero.slug ))
      )
      .subscribe( hero => {
        this.router.navigate(['/heroes/list'])
        this.showSnackBar(`${ hero.superhero } eliminado exitosamente`, 'deleteClass')
    })
  }
}
