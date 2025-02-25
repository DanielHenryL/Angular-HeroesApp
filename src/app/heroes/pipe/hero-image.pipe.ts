import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform( hero: Hero ): string {
    if (!hero.slug && !hero.alt_img) {
      return 'assets/no-image.png'
    }
    if ( hero.alt_img && hero.slug !== hero.alt_img ) {
      return hero.alt_img;
    }
    return `assets/heroes/${ hero.slug }.jpg`;
  }

}
