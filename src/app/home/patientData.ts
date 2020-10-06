export interface IPatient {
    patientId: number;
    name: string;
    contact: number;
  }

  export interface IPatient1 {
        patientId: string;
        gender: string,
        patientName:{
            firstName: string,
            surName: string
        },
        age: number,
        maritalStatus: string,
        dob: string,
        religion: string,
        phoneNumber: string,
        emailAddress: string,
        nationality: string,
        state: string,
        address: string,
        occupation: string,
        kin:{
            kinName: string,
            kinRelationShip: string,
            kinPhoneNumber: string,
            kinEmailAddress: string,
            kinOccupation: string;
            kinAddress: string
        }
    }
  
  
  