import React, { useContext, } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, TextField, Typography, Box, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../util/validationschema';

interface LoginFormValues {
  username: string;
  password: string;
  roleType: 'admin' | 'user';
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, setError: setFormError } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      username: '',
      password: '',
      roleType: 'user',
    }
  });

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure the component is wrapped with AuthProvider.');
  }

  const { loading, error, isAuthenticated, user, authenticate } = authContext;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await authenticate(data.username, data.password, data.roleType);

      
      if (isAuthenticated && user) {
        if (user.roleType === 'admin') {
          navigate('/users-list');
        } else {
          navigate(`/profile/${user.id}`);
        }
      } else {
        setFormError('username', {
          type: 'manual',
          message: 'User information is missing.',
        });
      }
    } catch (err) {
      setFormError('username', {
        type: 'manual',
        message: (err as Error).message || 'An unknown error occurred.',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="roleType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Role Type</InputLabel>
                <Select
                  {...field}
                  label="Role Type"
                  error={!!errors.roleType}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                {errors.roleType && <Typography color="error" variant="caption">{errors.roleType.message}</Typography>}
              </FormControl>
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
