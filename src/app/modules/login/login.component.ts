import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-user',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.scss'],
})
export class LoginComponent {
 
  constructor(private router : Router){}

  goHome(){
  	this.router.navigate(['home']);
  }
}
