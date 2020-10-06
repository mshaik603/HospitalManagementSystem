import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError,observable, Observable } from 'rxjs';
import { IPatient1 } from '../home/patientData';

@Injectable({
  providedIn: 'root'
})
export class PatientServicesService {
url = 'assets/patientData.json';
  constructor(private http:HttpClient) { }


getGridData():Observable<IPatient1[]>{
  return this.http.get<IPatient1[]>(this.url).pipe(
    catchError(this.handelError)
  );
}

handelError(error:HttpErrorResponse){
  if(error.error instanceof Error){
    console.error(`An error occured:`,error.error.message);
  }
  else{
    console.error(`Backend returend, ${error.status}`)
  }
  return throwError('Something Bad Happend');
}
}
