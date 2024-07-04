
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../util/validationschema';
import localforage from 'localforage';
import FormValues from '../util/FormValues';



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); 

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
      roleType: 'user',
      name: '',
      address: '',
      phoneNumber: '',
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null); 

    try {
      await delay(2000); 

      const users: FormValues[] = await localforage.getItem('users') || [];

      const existingUser = users.find(user => user.username === data.username);
      if (existingUser) {
        throw new Error('Username already registered.');
      }

      const admins = users.filter(user => user.roleType === 'admin');
      const regularUsers = users.filter(user => user.roleType === 'user');

      if (data.roleType === 'admin' && admins.length >= 1) {
        throw new Error('Cannot register more than 1 admin.');
      }

      if (data.roleType === 'user' && regularUsers.length >= 5) {
        throw new Error('Cannot register more than 5 users.');
      }

      const newUser = {
        ...data,
        id: users.length + 1 ,
      };

      users.push(newUser);
      await localforage.setItem('users', users);
      setSuccess('User registered successfully!'); 
    } catch (error: any) {
      setError(error.message);
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { control, handleSubmit, errors, onSubmit, loading, error, success };
};

export default useRegisterForm;
