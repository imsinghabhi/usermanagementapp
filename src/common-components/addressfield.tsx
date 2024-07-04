// components/AddressField.tsx
import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import  FormValues  from '../util/FormValues';

interface AddressFieldProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const AddressField: React.FC<AddressFieldProps> = ({ control, errors }) => {
  return (
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
  );
};

export default AddressField;
