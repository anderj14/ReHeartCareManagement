import React, { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';
import AppTextInput from '../../../app/components/AppTextInput';
import CustomButton from '../../../app/components/CustomButton';
import DatePickerInput from '../../../app/components/DatePickerInput';
import { BloodTest, FormData, mapFormDataToApiData } from '../../../app/Models/bloodTest';
import { validationSchema } from '../../validation-schema/bloodTestValidation';
import { setBloodTest } from './bloodTestSlice';
import Subtitle from '../../../app/components/Subtitle';

interface BloodTestFormProps {
    test?: BloodTest;
    cancelEdit: () => void;
    title: React.ReactNode;
    patientId?: number;
}

export default function BloodTestForm({ test, cancelEdit, title, patientId }: BloodTestFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            patientId: patientId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (test && !isDirty) {
            reset(test);
        }
    }, [test, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: BloodTest;
            const mappedData = mapFormDataToApiData({ ...data, patientId } as FormData);

            if (test) {
                response = await agent.BloodTest.updateBloodTest(test.id, mappedData);
            } else {
                response = await agent.BloodTest.createBloodTest(mappedData);
            }

            dispatch(setBloodTest({ ...response, id: test?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Blood Test record saved successfully!");
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
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Date</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='date' label="Date"/>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Blood Test Details</Typography>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="hemoglobin" label="Hemoglobin" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="hematocrit" label="Hematocrit" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="whiteBloodCell" label="White Blood Cell"type='number' />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="platelets" label="Platelets" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="glucose" label="Glucose" type='number' />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="cholesterolHDL" label="Cholesterol HDL" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="cholesterolLDL" label="Cholesterol LDL" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="triglycerides" label="Triglycerides" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="redBloodCell" label="Red Blood Cell" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="meanCorpuscularVolume" label="Mean Corpuscular Volume" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="meanCorpuscularHemoglobin" label="Mean Corpuscular Hemoglobin" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="meanCorpuscularHemoglobinConcentration" label="Mean Corpuscular Hemoglobin Concentration" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="redCellDistributionWidth" label="Red Cell Distribution Width" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="bloodUreaNitrogen" label="Blood Urea Nitrogen" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="creatinine" label="Creatinine" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="sodium" label="Sodium" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="potassium" label="Potassium" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="chloride" label="Chloride" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="bicarbonate" label="Bicarbonate" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="calcium" label="Calcium" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="magnesium" label="Magnesium" type='number'/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Diferential</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="neutrophils" label="Neutrophils" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="lymphocytes" label="Lymphocytes" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="monocytes" label="Monocytes" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="eosinophils" label="Eosinophils" type='number'/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                                <AppTextInput control={control} name="basophils" label="Basophils" type='number'/>
                            </Grid>
                        </Grid>
                        
                    </Box>
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
                    type='submit'
                >
                    Save
                </CustomButton>
            </Box>
        </form>
    );
}