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
import { HolterStudy, mapFormDataToApiData, FormData } from '../../../app/Models/holterStudy';
import { validationSchema } from '../../validation-schema/holterStudyValidation';
import { setHolterStudy } from './holterStudySlice';
import Subtitle from '../../../app/components/Subtitle';

interface HolterStudyFormProps {
    study?: HolterStudy;
    cancelEdit: () => void;
    title: React.ReactNode;
    patientId?: number;
}

export default function HolterStudyForm({ study, cancelEdit, title, patientId }: HolterStudyFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            patientId: patientId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (study && !isDirty) {
            reset(study);
        }
    }, [study, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: HolterStudy;
            const mappedData = mapFormDataToApiData({ ...data, patientId } as FormData);

            if (study) {
                response = await agent.HolterStudy.updateHolterStudy(study.id, mappedData);
            } else {
                response = await agent.HolterStudy.createHolterStudy(mappedData);
            }

            dispatch(setHolterStudy({ ...response, id: study?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Holter Study record saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the study. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle={title} />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Date</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='date' label="Date"/>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Study Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="studyDuration" label="Study Duration" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="averageHeartRate" label="Average Heart Rate" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="maximumHeartRate" label="Maximum Heart Rate" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="physicalActivity" label="Physical Activity" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="typeHeartRhythm" label="Type of Heart Rhythm" />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 400, fontSize: '17px' }}>Conclusion</Typography>
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
                    type='submit'
                >
                    Save
                </CustomButton>
            </Box>
        </form>
    );
}