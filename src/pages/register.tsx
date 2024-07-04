import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Button, Container, FormControl, InputLabel, Select, MenuItem, Typography, Box, CircularProgress, Alert } from '@mui/material';
import useRegisterForm from '../hooks/useRegisterForm';
import { useNavigate, Link } from 'react-router-dom'; 

const RegisterPage: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, loading, error, success } = useRegisterForm();
  const navigate = useNavigate();
 
  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    if (success) {
      navigate('/'); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.roleType}>
            <InputLabel>Role Type</InputLabel>
            <Controller
              name="roleType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Role Type"
                  fullWidth
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              )}
            />
            <Box sx={{ color: 'red', fontSize: 12 }}>{errors.roleType?.message}</Box>
          </FormControl>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Box sx={{ position: 'relative', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} sx={{ color: 'primary.main' }} /> : 'Register'}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'primary.main',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="primary">
                  Login
                </Button>
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
