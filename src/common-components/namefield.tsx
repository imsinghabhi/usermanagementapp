// components/NameField.tsx
import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import FormValues from '../util/FormValues';

interface NameFieldProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const NameField: React.FC<NameFieldProps> = ({ control, errors }) => {
  return (
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
  );
};

export default NameField;
