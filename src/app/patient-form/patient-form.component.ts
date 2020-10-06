import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { FormBuilder, Validators } from '@angular/forms';
import { IPatient1, IPatient } from '../home/patientData';
import { datevalidator, ageValidator } from './date.validator';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  public get patientId () {
    return this.patientForm.get('patientId');
  }
  public get gender () {
    return this.patientForm.get('gender');
  }
  public get firstName () {
    return this.patientForm.get('patientName.firstName');
  }
  public get surName () {
    return this.patientForm.get('patientName.surName');
  }
  public get age () {
    return this.patientForm.get('age');
  }
  public get dob () {
    return this.patientForm.get('dob');
  }
  public get emailAddress () {
    return this.patientForm.get('emailAddress');
  }
  public get phoneNumber () {
    return this.patientForm.get('phoneNumber');
  }
  public get nationality () {
    return this.patientForm.get('nationality');
  }
  public get state () {
    return this.patientForm.get('state');
  }
  public get address () {
    return this.patientForm.get('address');
  }
  public get occupation () {
    return this.patientForm.get('occupation');
  }
  public get maritalStatus(){
    return this.patientForm.get('maritalStatus');
  }
  public get religion(){
    return this.patientForm.get('religion');
  }
  public get kinName(){
    return this.patientForm.get('kin.kinName');
  }
  public get kinRelationShip(){
    return this.patientForm.get('kin.kinRelationShip');
  }
  public get kinPhoneNumber(){
    return this.patientForm.get('kin.kinPhoneNumber');
  }
  public get kinEmailAddress(){
    return this.patientForm.get('kin.kinEmailAddress');
  }
  public get kinOccupation(){
    return this.patientForm.get('kin.kinOccupation');
  }
  public get kinAddress(){
    return this.patientForm.get('kin.kinAddress');
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder) {    
  }
  maxDate:any;
  patientForm:any;
  martialS:any[] = ["Married","UnMarried"];//Dropdown values array for Marital Status 
  religionS:any[] = ["Muslim","Sikhs","Hindu","Chirstianity"];//Dropdown values array for Religion

  ngOnInit(): void {    
    //initializa the Patient Form using FormBuilder
    this.patientForm =  this.fb.group({
      patientId :['',Validators.required],
      gender:['',Validators.required],
      patientName: this.fb.group({
        firstName: ['',Validators.required],
        surName: ['',Validators.required]
      }),
      age:['',[Validators.required,Validators.pattern("^[0-9]+$")]],
      maritalStatus:['',Validators.required],
      dob:['',[Validators.required,datevalidator]],
      religion:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      emailAddress:['',[Validators.required,Validators.pattern("^[A-Za-z0-9.]+@[a-zA-Z]+(.com|.in)$")]],
      nationality:['',Validators.required],
      state:['',Validators.required],
      address:['',Validators.required],
      occupation:['',Validators.required],
      kin: this.fb.group({
        kinName:['',Validators.required],
        kinRelationShip:['',Validators.required],
        kinPhoneNumber:['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
        kinEmailAddress:['',[Validators.required,Validators.pattern("^[A-Za-z0-9.]+@[a-zA-Z]+(.com|.in)$")]],
        kinOccupation:['',Validators.required],
        kinAddress:['',Validators.required]
      })
    });
    // , {validators:ageValidator});
    
    //if patientData is received then populate the PatientForm (**Note: works when edit button is clicked )
    if(this.data){
    if(this.data.patient){   
      this.patientForm.patchValue({
        patientId : this.data.patient.patientId,
        gender : this.data.patient.gender,
        patientName:{
          firstName: this.data.patient.patientName.firstName,
          surName: this.data.patient.patientName.surName
        },
        age:this.data.patient.age,
        maritalStatus:this.data.patient.maritalStatus,
        dob:this.data.patient.dob,
        religion:this.data.patient.religion,
        phoneNumber:this.data.patient.phoneNumber,
        emailAddress:this.data.patient.emailAddress,
        nationality:this.data.patient.nationality,
        state:this.data.patient.state,
        address:this.data.patient.address,
        occupation:this.data.patient.occupation,
        kin:{
          kinName:this.data.patient.kin.kinName,
          kinRelationShip:this.data.patient.kin.kinRelationShip,
          kinPhoneNumber:this.data.patient.kin.kinPhoneNumber,
          kinEmailAddress:this.data.patient.kin.kinEmailAddress,
          kinOccupation:this.data.patient.kin.kinOccupation,
          kinAddress:this.data.patient.kin.kinAddress
        }
      })
      this.patientForm.get('patientId').disable({ onlySelf: true });
    }
    //**Note works when user clicks ok detail button and the form gets disabled
    if(this.data.detail){
       this.patientForm.disable();
    }
  }
  else{
    this.patientForm.get('patientId').disable({ onlySelf: true });
    var genPatientId =  Math.floor(Math.random() * 10000) + 1;
    this.patientForm.patchValue({
      patientId : genPatientId
    })    
  }
  } 

    // Choose city using select dropdown
    changeMstatus(e) {
      this.maritalStatus.setValue(e.target.value, {
        onlySelf: true
      })
    }
    // Choose relationShipStatus using select dropdown
    changeRstatus(e) {
      this.religion.setValue(e.target.value, {
        onlySelf: true
      })
    }
 
}
