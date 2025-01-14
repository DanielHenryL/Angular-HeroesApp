import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  public heroes:Hero[] = [];
  public total:number = 0;
  public pageOffSet = 0;
  public pageLimit = 5;
  public mesg: string = '';
  constructor( private heroesService:HeroesService ){}

  public pageEvent!: PageEvent;

  ngOnInit(): void {
    this.getHeroesPagination( this.pageLimit, this.pageOffSet )
  }

  private getHeroesPagination( limit:number, offset:number ){
    return this.heroesService.getHeroes( limit, offset)
    .subscribe( response => {
      this.heroes = response.heroes
      this.total = response.total
      console.log( response );
    });
  }

  handlePageEvent(e: PageEvent){
    this.pageLimit = e.pageSize;
    this.pageOffSet = e.pageIndex;
    this.getHeroesPagination( this.pageLimit, this.pageOffSet )
  }

}
