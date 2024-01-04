import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public userForm = new FormGroup({
    user: new FormControl<string>('',{ nonNullable:true }),
    email: new FormControl<string>('', {nonNullable:true }),
    password: new FormControl<string>('',{ nonNullable:true })
  })

  constructor(
    private readonly authService:AuthService,
    private router:Router
  ){}

  get currentUser():User{
    const user = this.userForm.value as User;
    return user;
  }
  onSubmit(){
    if( !this.userForm.valid ) return;

    this.authService.addUser( this.currentUser )
        .subscribe( user => {
          this.router.navigate(['/heroes/list'])
        })
  }

}
