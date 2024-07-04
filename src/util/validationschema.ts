
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  roleType: Yup.string().oneOf(['admin', 'user'], 'Invalid role type').required('Role type is required'),
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must not exceed 10 digits')
    .required('Phone number is required'),
});

export default validationSchema;


export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  roleType: Yup.string().oneOf(['admin', 'user'], 'Invalid role type').required('Role type is required'),
});