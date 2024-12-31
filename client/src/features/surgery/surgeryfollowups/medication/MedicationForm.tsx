import React, { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Medication } from '../../../../app/Models/medication';
import { validationSchema } from '../../../validation-schema/medicationValidation';
import agent from '../../../../app/api/agent';
import { setMedication } from './medicationSlice';
import Title from '../../../../app/components/Title';
import AppTextInput from '../../../../app/components/AppTextInput';
import CustomButton from '../../../../app/components/CustomButton';

interface MedicationFormProps {
    medication?: Medication;
    cancelEdit: () => void;
    title: React.ReactNode;
    surgeryFollowUpId?: any;
    reloadSurgeryFollowUp: () => void;
}

export default function MedicationForm({ medication, cancelEdit, title, surgeryFollowUpId, reloadSurgeryFollowUp }: MedicationFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            surgeryFollowUpId: surgeryFollowUpId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (medication && !isDirty) {
            reset(medication);
        }
    }, [medication, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Medication;
            
            if (medication) {
                response = await agent.Medication.updateMedication(medication.id, data);
            } else {
                response = await agent.Medication.createMedication(data);
            }

            dispatch(setMedication({ ...response, id: medication?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Medication record saved successfully!");
            reloadSurgeryFollowUp();
        } catch (error: any) {
            console.error("Complete error object:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Title title={title} />
            <Box sx={{ marginTop: '30px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name='name' label="Medication Name" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name='dosage' label="Dosage" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name='frequency' label="Frequency" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                        <AppTextInput control={control} name='route' label="Route" />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                        <AppTextInput multiline control={control} name="notes" label="Notes" />
                    </Grid>
                </Grid>
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