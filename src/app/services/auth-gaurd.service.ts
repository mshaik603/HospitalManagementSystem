import { Injectable } from '@angular/core';
import { Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {
  constructor(private router:Router){}

  valid:boolean =false;
  
  canActivate(){
    if(sessionStorage.getItem('login') === 'true'){
      this.valid = sessionStorage.getItem('login') === 'true' ? true : false;
    }
     else{
      alert('You have to Login First');
      this.router.navigate(['/login']);
    }
    return this.valid;
  }
}
