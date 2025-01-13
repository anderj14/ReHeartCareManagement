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
import { CardiacCathStudy, mapFormDataToApiData, FormData } from '../../../app/Models/cardiacCathStudy';
import { validationSchema } from '../../validation-schema/cardiacCathStudyValidation';
import { setCardiacCathStudy } from './cardiacCathStudySlice';
import Subtitle from '../../../app/components/Subtitle';

interface CardiacCathStudyFormProps {
    study?: CardiacCathStudy;
    cancelEdit: () => void;
    title: React.ReactNode;
    patientId?: number;
}

export default function CardiacCathStudyForm({ study, cancelEdit, title, patientId }: CardiacCathStudyFormProps) {
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
            let response: CardiacCathStudy;
            const mappedData = mapFormDataToApiData({ ...data, patientId } as FormData);

            if (study) {
                response = await agent.CardiacCathStudy.updateCardiacCathStudy(study.id, mappedData);
            } else {
                response = await agent.CardiacCathStudy.createCardiacCathStudy(mappedData);
            }

            dispatch(setCardiacCathStudy({ ...response, id: study?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Cardiac Cath Study record saved successfully!");
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
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Date</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='date' label="Date"/>
                        </Grid>
                    </Grid>
                </Box>
                {/* <Grid container spacing={2}> */}
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Details of Coronary Arteries</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="locationMainCoronaryArteries" label="Location of Main Coronary Arteries" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="descriptionAbnormalities" label="Description of Abnormalities" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="blockageEachCoronaryArtery" label="Blockage in Each Coronary Artery - %" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="bloodFlowCoronaryArteries" label="Blood Flow in Coronary Arteries - mL/min" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="velocityBloodFlow" label="Velocity of Blood Flow cm/s" />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Blood Pressure</Typography>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name="systolicPressureAorta" label="Systolic Pressure in Aorta - mmHg" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name="diastolicPressureAorta" label="Diastolic Pressure in Aorta - mmHg" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name="systolicPressurePulmonaryArteries" label="Systolic Pressure in Pulmonary Arteries - mmHg" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name="diastolicPressurePulmonaryArteries" label="Diastolic Pressure in Pulmonary Arteries - mmHg" />
                    </Grid>
                </Box>

                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Cardiac Chambers</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="chambersLeftAtrium" label="Chambers Left Atrium" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="chambersLeftVentricle" label="Chambers Left Ventricle" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="chambersRightAtrium" label="Chambers Right Atrium" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="chambersRightVentricle" label="Chambers Right Ventricle" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="cardiacChamberFunctions" label="Cardiac Chamber Functions" />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Cardiac Function and Abnormalities</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="leftVentricularEjectionFraction" label="Left Ventricular Ejection Fraction - %" />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="structuralAbnormalities" label="Structural Abnormalities" />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Heart Valves</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="valvularInsufficiencyAortic" label="Valvular Insufficiency Aortic" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="valvularInsufficiencyMitral" label="Valvular Insufficiency Mitral" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="valvularInsufficiencyPulmonary" label="Valvular Insufficiency Pulmonary" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="valvularInsufficiencyTricuspid" label="Valvular Insufficiency Tricuspid" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="pressureGradientValves" label="Pressure Gradient in Valves - " />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Summary and Conclusion</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput multiline control={control} name="descriptionComplications" label="Description of Complications" />
                        </Grid>
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