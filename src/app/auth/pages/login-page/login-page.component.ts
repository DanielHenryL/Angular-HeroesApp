import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  public userForm = new FormGroup({
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

  onLogin(){
    if( !this.userForm.valid ) return;

    this.authService.login( this.currentUser.email, this.currentUser.password )
        .subscribe( user => {
          this.router.navigate(['/heroes/list'])
        })
  }
}
