interface FormValues {
    id?: number;  
    username: string;
    password: string;
    roleType: 'admin' | 'user';
    name: string;
    address: string;
    phoneNumber: string;
  }


  export default FormValues;