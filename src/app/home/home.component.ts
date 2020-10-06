import { Component, OnInit } from '@angular/core';
import { PatientServicesService } from '../services/patient-services.service';
import { IPatient1 } from './patientData';//Patient Interface
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['patientId', 'patientName', 'phoneNumber', 'action'];
  tempData:IPatient1[];
  dataSource:any;
  dialogRef: MatDialogRef <any> ;
  userName: string;

  constructor(private patientService : PatientServicesService,private router:Router, private toastr:ToastrService, private dialog:MatDialog) { 
  }

  ngOnInit(): void {
    this.getGridData();
    this.userName = sessionStorage.getItem('userName');
  }
  logOut(){
    this.router.navigateByUrl('/login');
    sessionStorage.setItem('login','false');
  }
  //refresh GridData
  refreshGridData(){
    this.dataSource = new MatTableDataSource<IPatient1>(this.tempData);
  }

  //populate the Material Data Table with json patient data
  getGridData(){
    this.patientService.getGridData().subscribe(
      (result:any)=>{this.tempData = result;
        this.refreshGridData();
        
  },
      (error:any)=>{this.handelError(error);
      });
  }

  //Add new patient dummy data
  // pushData(){     
  //   var temp1:IPatient1 = {patientId: "9999", gender: "male", patientName:{
  //     firstName:"New Patient",
  //     "surName":"Shaik"
  //     },
  //  age:24,maritalStatus:"UnMarried",dob:"09/05/1978",
  //  religion:"Hindu",phoneNumber:"9945862962",emailAddress:"Adbul69362@gmail.com",
  //  nationality:"Indian",state:"karnataka",address:"Ballari",occupation:"BusinessMan"
  //   }
  //   this.tempData.push(temp1);
  //   this.refreshGridData(); 
  //   this.toastr.success('Success', 'New Patient Successfull Added', {
  //     timeOut: 5000
  //   });
  // }

  //Method to add new Patient
  addNewPatient(){
   this.dialogRef = this.dialog.open(PatientFormComponent, {width: '1280px',disableClose: true,autoFocus: false});
  //If data is receievd after Dailog close array will be added with new patient
   this.dialogRef.afterClosed().subscribe(
     (result:IPatient1)=> {
       if(result){
        this.tempData.push(result);
        this.refreshGridData();
        this.toastrSuccess('Success','New Patient was added Successfull');
       }      
    });
  }
  
  editPatientData(rowData:IPatient1){
    //open mat-dailog with patient data
    this.dialogRef =  this.dialog.open(PatientFormComponent,{width: '1280px',data: {patient:rowData},disableClose: true,autoFocus: false});
    //If data is receievd after Dailog close array will be updated
    this.dialogRef.afterClosed().subscribe(result => {
      this.tempData.forEach((element,index) => {
        if(element.patientId===result.patientId){
          this.tempData[index]=result;
          this.toastrSuccess('Success','Patient was updated Successfull');
          this.refreshGridData();
        }
      });
    });

  }

  showPatientData(rowData:any){
    this.dialogRef =  this.dialog.open(PatientFormComponent,{width: '1280px',data: {patient:rowData,detail:true},disableClose: true,autoFocus: false});
  }
  //Toastr Messages
  toastrSuccess(title,message){
      if(title="success"){
        this.toastr.success(title,message, {
          timeOut: 3000
        });
      }
      else if(title="error"){
        this.toastr.error(title,message, {
          timeOut: 5000
      });
      }
  }

  handelError(error:any){
    return error;
  }

}
