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
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 400 }}>Creating New Patient</Typography>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Patient Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="patientName" label="Patient Name" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <AppTextInput control={control} name="dob" label="" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="gender" label="Gender" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="socialSecurity" label="Social Security" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="address" label="Address" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Patient Contact</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="email" label="Email" type="email" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <AppTextInput control={control} name="phone" label="Mobile Phone" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="fax" label="FAX" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Patient Referrer Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="referringDoctor" label="Referring Doctor" />
          </Grid>
          <Grid item xs={6} sm={12}>
            <AppTextInput control={control} name="assignedDoctor" label="Assigned Doctor" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="familyDoctor" label="Family Doctor" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Active</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="status" label="Status" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Emergency Contact</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="emergencyContactName" label="Contact Name" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="emergencyContactNumber" label="Number Phone" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="emergencyContactRelation" label="Contact Relation" />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
        <Button type='submit' variant="contained" color="success">
          Submit
        </Button>
        <Button variant="contained" color="inherit">
          Cancel
        </Button>
      </Box>
    </form>
  );
}
