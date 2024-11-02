import { Box, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput";
import { Patient } from "../../../app/Models/patient";
import { useEffect } from "react";
import usePatients from "../../../app/hooks/usePatient";
import AppSelectList from "../../../app/components/AppSelectList";

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchema } from "../../admin/patientValidation";
import CustomButton from "../../../app/components/CustomButton";
import agent from "../../../app/api/agent";
import { useDispatch } from "react-redux";
import { setPatient } from "../patientSlice";

interface Props {
  patient?: Patient;
  cancelEdit: () => void;
  title: React.ReactNode;
}

export default function PatientForm({ patient, cancelEdit, title }: Props) {
  const { control, reset, handleSubmit, formState: {isDirty, isSubmitting} } = useForm({resolver: yupResolver<any>(validationSchema)});
  const {patientStatus} = usePatients();
  const dispatch = useDispatch();

  useEffect(() => {
    if (patient && !isDirty) {
        const statusMatch = patientStatus.find(
            (item) => item.patientStatusName === patient.status
        );
        const patientDataWithStatusId = {
            ...patient,
            statusId: statusMatch ? statusMatch.id : null
        };
        
        reset(patientDataWithStatusId);
    }
}, [patient, reset, isDirty, patientStatus]);

async function handleSubmitData(data: FieldValues) {
    try {
        let response: Patient;
        
        if (patient) {
            response = await agent.Admin.updatePatient(patient.id, data);
        } else {
            // Si no existe `patient`, es una creación
            response = await agent.Admin.createPatient(data);
        }
        
        dispatch(setPatient(response));
        cancelEdit();
    } catch (error: any) {
        console.log("Error details:", error.response ? error.response.data : error.message);
    }
}

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 400 }}>{title}</Typography>
      <Box className="patienInformation">
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Patient Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="patientName" label="Patient Name" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="carnetIdentification" label="Carnet Identification" />
          </Grid>
          <Grid item xs={6} sm={6}>
            <AppTextInput control={control} name="dob" label="Birth of Day" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="gender" label="Gender" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="socialSecurity" label="Social Security" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="policyNumber" label="Policy Number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="maritalStatus" label="Marital Status" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="occupation" label="Occupation" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="address" label="Address" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }} className="patienContact">
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
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Patient Status</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AppSelectList 
              control={control} 
              items={patientStatus} 
              name="statusId" 
              label="Patient Status" 
            />
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
      <Box sx={{display: 'flex', gap: '10px', marginTop: '40px'}}>
        <CustomButton onClick={cancelEdit} width='120px' color="#EF4444" hoverColor="#f3f3f3" hoverTextColor="#c93b3b">Cancel</CustomButton>
        <CustomButton loading={isSubmitting} type='submit' width='120px' color="#0ba723" hoverColor="#f3f3f3" hoverTextColor="#098b1d">Submit</CustomButton>
        {/* <LoadingButton loading={isSubmitting} type='submit'>Submit</LoadingButton> */}
      </Box>
    </form>
  );
}
