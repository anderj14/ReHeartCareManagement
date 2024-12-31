import { Controller, FieldValues, useForm } from "react-hook-form";
import { CardiologySurgery } from "../../../../app/Models/cardiologySurgery";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../validation-schema/cardiologySurgeryValidation";
import { useEffect } from "react";
import agent from "../../../../app/api/agent";
import { useDispatch } from "react-redux";
import { setSurgery } from "../../../surgery/surgerySlice";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AppTextInput from "../../../../app/components/AppTextInput";
import AppSelectList from "../../../../app/components/AppSelectList";
import CustomButton from "../../../../app/components/CustomButton";
import { toast } from "react-toastify";
import { useSurgery } from "../../../../app/hooks/useSurgery";
import Title from "../../../../app/components/Title";
import DatePickerInput from "../../../../app/components/DatePickerInput";

interface Props {
  surgery?: CardiologySurgery;
  cancelEdit: () => void;
  title: React.ReactNode;
  patientId?: number;
}

export default function CardiologySurgeryForm({
  surgery,
  cancelEdit,
  title,
  patientId,
}: Props) {
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
  const { patientList } = useSurgery();

  useEffect(() => {
    if (surgery && !isDirty) {
      const patientMatch = patientList.find(
        (item) => item.patientName === surgery?.patient
      );

      const surgeryDataWithPatientId = {
        ...surgery,
        patientId: patientMatch ? patientMatch.id : null,
      };
      reset(surgeryDataWithPatientId);
    }
  }, [surgery, reset, patientList, isDirty]);

  async function handleSubmitData(data: FieldValues) {

    try {
      let response: CardiologySurgery;

      if (surgery) {
          response = await agent.CardiologySurgery.updateCardiologySurgery(surgery.id, data);
      } else {
        response = await agent.CardiologySurgery.createCardiologySurgery(
          data
        );
      }

      dispatch(setSurgery({...response, id: surgery?.id || response.id}));
      cancelEdit();
      reset();
      toast.success("Surgery record saved successfully!");
    } catch (error: any) {
      console.error("Complete error object:", error);

    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Title title={title} />
      <Box className="patienInformation" sx={{ marginTop: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="surgeryName" label="Surgery Name" />
          </Grid>
          {/* <Grid item xs={12} sm={6} sx={{marginTop: '10px'}}>
            <AppTextInput control={control} name="date" label="Date" />
          </Grid> */}
          <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
            <DatePickerInput control={control} name='date' label="Date"/>
          </Grid>
          <Grid item xs={12} sm={6} sx={{marginTop: '10px'}}>
            <AppTextInput control={control} name="time" label="Time" />
          </Grid>
          <Grid item xs={12} sm={4} sx={{marginTop: '10px'}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Emergency</FormLabel>
            <Controller
              name="isEmergency"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  value={field.value} // Mantén el valor como un booleano
                  onChange={(event) => field.onChange(event.target.value === "true")}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{marginTop: '10px'}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Elective</FormLabel>
            <Controller
              name="isElective"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{marginTop: '10px'}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Minimally Invasive</FormLabel>
            <Controller
              name="isMinimallyInvasive"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="procedureDescription" label="Procedure Description" />
          </Grid>
          <Grid item xs={6} sm={4} sx={{marginTop: '10px'}}>
            <AppTextInput control={control} name="duration" label="Duration" />
          </Grid>
          <Grid item xs={12} sm={8} sx={{marginTop: '10px'}}>
            <AppTextInput control={control} name="operationRoom" label="Operation Room" />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="postOpDiagnosis" label="Pre-Op Diagnosis" />
          </Grid>
          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="preOpDiagnosis" label="Post-Op Diagnosis" />
          </Grid>
          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="cardiacCondition" label="Cardiac Condition" />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="anesthesiaType" label="Anesthesia Type" />
          </Grid>
          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="surgicalTeam" label="Surgical Team" />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="intraoperativeFindings" label="Intraoperative Findings" />
          </Grid>
          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="postOperativeInstructions" label="Post-Operative Instructions" />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="complications" label="Complications" />
          </Grid>
          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="postOperativeStatus" label="Post-Operative Status" />
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <AppTextInput multiline control={control} name="notes" label="Notes" />
          </Grid>
          <Grid item xs={12} sm={4}>
            {patientId || surgery ? (
              <div style={{ display: 'none' }}>
                <TextField
                  label="Patient List"
                  value={Array.isArray(patientList) 
                    ? patientList.find(item => item.id === patientId)?.patientName || 'Patient not found' 
                    : 'Patient list is empty'}
                  disabled
                />
              </div>
            ) : (
              <AppSelectList
                control={control}
                items={patientList}
                name="patientId"
                label="Patient List"
                displayField={(item) => item.patientName}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Successful</FormLabel>
            <Controller
              name="isSuccessful"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
          </Grid>

        </Grid>
      </Box>
      <Box sx={{display: 'flex', gap: '10px', marginTop: '40px'}}>
       
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
          type='submit'
        >
          Save
        </CustomButton>
      </Box>
    </form>
  );
}
