// components/UsernameField.tsx
import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import FormValues from '../util/FormValues';

interface UsernameFieldProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ control, errors }) => {
  return (
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
          disabled
        />
      )}
    />
  );
};

export default UsernameField;
