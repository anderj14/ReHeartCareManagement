import { Box, Button, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput";
import { Patient } from "../../../app/Models/patient";
import { useEffect } from "react";

interface Props {
  patient?: Patient;
  cancelEdit: () => void;
}

export default function PatientForm({ patient, cancelEdit }: Props) {
  const { control, reset, handleSubmit } = useForm();

  useEffect(() => {
    if (patient) reset(patient);
  }, [patient, reset]);

  function handleSubmitData(data: FieldValues) {
    console.log(data);
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Patient Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="patientName" label="Patient Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="carnetIdentification" label="ID" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="dob" label="DOB" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="gender" label="Gender" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="socialSecurity" label="Social Security" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput multiline={true} rows={3} control={control} name="address" label="Address" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="phone" label="Phone" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="email" label="Email" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
          <Button type='submit' variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </form >
    </Box>
  );
}
