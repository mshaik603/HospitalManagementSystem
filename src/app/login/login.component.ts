import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Icreds } from './cerds';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  creds:Icreds[];
  access:boolean = false;
  
  constructor(private fb:FormBuilder, private authService:AuthServiceService, private router:Router, private toastr:ToastrService) {
   }

   //getter methods for formControl
  get userName(){
    return this.loginForm.get('userName');
  }
  get password(){
    return this.loginForm.get('password');
  }

  //To load the form and Get the auth data
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName:['',[Validators.required,Validators.pattern("^[a-zA-z ]+$")]],
      password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9@_]{8,12}$")]]
    });
    
   this.authService.getAuth()
   .subscribe( 
     (result:any)=>{this.creds=result;},
     (error:any)=>{this.handelError(error);}
     );     
     
  } 

  //Authentication(if success navigate to Home Page)
  submit(){
    let name = this.loginForm.value['userName'];
    let pass = this.loginForm.value['password'];
    
    this.access = this.creds.find(e=> this.decryptPass(e.userName)==name && this.decryptPass(e.password)==pass) ?true : false;
    if(this.access){
      sessionStorage.setItem('login','true');
      sessionStorage.setItem('userName',name);
      this.toastr.success('Success', 'redirecting to Home Page', {
        timeOut: 3000
      });
       this.router.navigate(['/home']);
    }else{
      sessionStorage.setItem('login','false');
      this.toastr.error('Please check you User-Name and Password','Your Credentials are incorrect', {
        timeOut: 3000
      });
    }
  }

  decryptPass(dPass:string){
    return this.authService.decryptText(dPass);
  }

//Handel Error
  handelError(error){
    console.log(error);
  }

}
