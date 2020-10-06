import { AbstractControl } from '@angular/forms';


export function datevalidator(control: AbstractControl):{[key:string]:any} | null{
    let rDate = new Date(control.value);
    let tDate = new Date();
    if(rDate>tDate)
    return rDate &&  rDate>tDate ? {'misMatch' : true} : null;
}


export function ageValidator(control: AbstractControl):{[key:string]:any} | null{
    let age = control.get('age').value;
    let dob = control.get('dob').value;
    let calAge;
    if (age && dob){
        //convert date again to type Date
        const bdate = new Date(dob);
        const timeDiff = Math.abs(Date.now() - bdate.getTime() );
        calAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      }      
    return age &&  dob && calAge != age ? {'ageMismatch' : true, 'age' : calAge} : null;

    
}