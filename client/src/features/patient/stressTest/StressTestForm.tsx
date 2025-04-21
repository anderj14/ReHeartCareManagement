import { FieldValues, useForm } from "react-hook-form";
import { mapFormDataToApiData, StressTest, FormData } from "../../../app/Models/stressTest";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validation-schema/stressTestValidation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import agent from "../../../app/api/agent";
import { setStressTest } from "./stressTestSlice";
import { toast } from "react-toastify";
import Subtitle from "../../../app/components/Subtitle";
import { Box, Grid, Typography } from "@mui/material";
import DatePickerInput from "../../../app/components/DatePickerInput";
import AppTextInput from "../../../app/components/AppTextInput";
import CustomButton from "../../../app/components/CustomButton";

interface StressTestFormProps {
  stressTest?: StressTest;
  cancelEdit: () => void;
  title: React.ReactNode;
  patientId?: number;
}

export default function StressTestForm({
  stressTest,
  cancelEdit,
  title,
  patientId,
}: StressTestFormProps) {
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
    if (stressTest && !isDirty) {
        reset(stressTest)
    }
  }, [stressTest, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: StressTest;
            const mappedData = mapFormDataToApiData({ ...data, patientId } as FormData);

            if (stressTest) {
                response = await agent.StressTest.updateStressTest(stressTest.id, mappedData);
            } else {
                response = await agent.StressTest.createStressTest(mappedData);
            }
            console.log(response);

            dispatch(setStressTest({ ...response, id: stressTest?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Stress Test record saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the test. Please try again.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle={title} />
            <Box sx={{ marginTop: '30px' }}>
                {/* Sección de Fecha y Hora */}
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Date and Time</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name="date" label="Date" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="time" label="Time" />
                        </Grid>
                    </Grid>
                </Box>

                {/* Sección de Detalles del Estudio */}
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Study Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="duration" label="Test Duration" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="maxHeartRate" label="Max Heart Rate" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="peakPressure" label="Peak Pressure" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="exerciseInducedSymptoms" label="Exercise-Induced Symptoms" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="restingHeartRate" label="Resting Heart Rate" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="maxBloodPressureSystolic" label="Max Blood Pressure (Systolic)" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="maxBloodPressureDiastolic" label="Max Blood Pressure (Diastolic)" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="exerciseProtocol" label="Exercise Protocol" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="indications" label="Indications" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="abnormalEcgFindings" label="Abnormal ECG Findings" />
                        </Grid>
                    </Grid>
                </Box>

                {/* Sección de Conclusión */}
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Conclusion</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="conclusion" label="Conclusion" />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Botones de Cancelar y Guardar */}
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
    )
}
