// components/PhoneNumberField.tsx
import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import FormValues from '../util/FormValues';

interface PhoneNumberFieldProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ control, errors }) => {
  return (
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
  );
};

export default PhoneNumberField;
