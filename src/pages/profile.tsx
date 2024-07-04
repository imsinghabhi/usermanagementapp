// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import FormValues from '../util/FormValues';
import UsernameField from '../common-components/username';
import NameField from '../common-components/namefield';
import AddressField from '../common-components/addressfield';
import PhoneNumberField from '../common-components/phonenumber';

const ProfilePage: React.FC = () => {
  const { unique_id } = useParams<{ unique_id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const users: FormValues[] = await localforage.getItem('users') || [];
        const loggedInUser = users.find(user => user.id?.toString() === unique_id);
        if (loggedInUser) {
          setValue('username', loggedInUser.username);
          setValue('name', loggedInUser.name);
          setValue('address', loggedInUser.address);
          setValue('phoneNumber', loggedInUser.phoneNumber);
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [unique_id, setValue]);

  const onUpdate = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const users: FormValues[] = await localforage.getItem('users') || [];
      const updatedUsers = users.map(user => {
        if (user.id?.toString() === unique_id) {
          return {
            ...user,
            username: data.username,
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
          };
        }
        return user;
      });

      await localforage.setItem('users', updatedUsers);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localforage.removeItem('currentUser');
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {loading ? (
          <CircularProgress sx={{ mb: 2 }} />
        ) : (
          <form onSubmit={handleSubmit(onUpdate)}>
            <UsernameField control={control} errors={errors} />
            <NameField control={control} errors={errors} />
            <AddressField control={control} errors={errors} />
            <PhoneNumberField control={control} errors={errors} />
            <Box sx={{ position: 'relative', marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: 'primary.main' }} /> : 'Update'}
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
