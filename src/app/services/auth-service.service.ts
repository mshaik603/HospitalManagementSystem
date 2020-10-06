import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Icreds } from '../login/cerds';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  getAuth():Observable<Icreds[]>{
    return this.http.get<Icreds[]>('assets/authCreds.json').pipe(
      catchError(this.handelError)
    )
  }
  
  encryptText(password:string){
    return CryptoJS.AES.encrypt(password.trim(), "test").toString(); 
  }
  decryptText(encryptText:any){
    return CryptoJS.AES.decrypt(encryptText.trim(), "test").toString(CryptoJS.enc.Utf8);
  }

  handelError(error:HttpErrorResponse){
    if(error.error instanceof Error){
      console.error('An error occured:',error.error.message);
    }
    else{
      console.error(`Backend returned ${error.status}`);
    }
    return throwError("Something Bad Happend");
  }
}
