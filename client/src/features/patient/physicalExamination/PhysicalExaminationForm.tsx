import { FieldValues, useForm } from "react-hook-form";
import {
  FormData,
  mapFormDataToApiData,
  PhysicalExamination,
} from "../../../app/Models/physicalExamination";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validation-schema/physicalExaminationValidation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import agent from "../../../app/api/agent";
import { setPhysicalExamination } from "./physicalExaminationSlice";
import Subtitle from "../../../app/components/Subtitle";
import { Box, Grid, Typography } from "@mui/material";
import DatePickerInput from "../../../app/components/DatePickerInput";
import AppTextInput from "../../../app/components/AppTextInput";
import CustomButton from "../../../app/components/CustomButton";

interface PhysicalExaminationFormProps {
  physicalExamination?: PhysicalExamination;
  cancelEdit: () => void;
  title: React.ReactNode;
  patientId?: number;
}

export default function PhysicalExaminationForm({
  physicalExamination,
  cancelEdit,
  title,
  patientId,
}: PhysicalExaminationFormProps) {

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: {
      patientId: patientId,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (physicalExamination && !isDirty) {
      reset(physicalExamination);
    }
  }, [physicalExamination, reset, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: PhysicalExamination;
      const mappedData = mapFormDataToApiData({ ...data, patientId } as FormData);
      console.log(data);

      if (physicalExamination) {
        response = await agent.PhysicalExamination.updatePhysicalExamination(physicalExamination.id, mappedData);
      } else {
        response = await agent.PhysicalExamination.createPhysicalExamination(mappedData);
      }

      console.log(response);

      dispatch(setPhysicalExamination({ ...response, id: physicalExamination?.id || response.id }));
      cancelEdit();
      reset();
      toast.success("Physical examination record saved successfully!");

    } catch (error: any) {
      console.error("Complete error object:", error);
      toast.error("Failed to save the test. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Subtitle subtitle={title} />

      <Box sx={{ marginTop: '30px' }}>
        <Box>
          <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>
            Date and Time
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <DatePickerInput control={control} name="date" label="Date" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <AppTextInput control={control} name="time" label="Time" />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>
            Physical Examination Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <AppTextInput control={control} name="duration" label="Duration" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <AppTextInput control={control} name="maxHeartRate" label="Max Heart Rate" type="number" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <AppTextInput control={control} name="peakPressure" label="Peak Pressure" />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
              <AppTextInput
                multiline
                control={control}
                name="exerciseInducedSymptoms"
                label="Exercise-Induced Symptoms"
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
              <AppTextInput
                multiline
                control={control}
                name="abnormalEcgFindings"
                label="Abnormal ECG Findings"
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>
            Conclusion
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
              <AppTextInput multiline control={control} name="conclusion" label="Conclusion" />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '40px' }}>
        <CustomButton
          color="#000"
          width="130px"
          bg="transparent"
          borderColor="#000"
          hoverColor="transparent"
          onClick={cancelEdit}
        >
          Cancel
        </CustomButton>
        <CustomButton
          color="#fff"
          width="130px"
          bg="#1aa52f"
          borderColor="transparent"
          hoverColor="#168928"
          type="submit"
        >
          Save
        </CustomButton>
      </Box>
    </form>
  );
}
