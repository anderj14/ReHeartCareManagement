import React, { useEffect } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';
import { setSurgeryFollowUp } from './sugeryFollowUpsSlice';
import { validationSchema } from '../../validation-schema/surgeryFollowUpValidation';
import Title from '../../../app/components/Title';
import AppTextInput from '../../../app/components/AppTextInput';
import CustomButton from '../../../app/components/CustomButton';
import DatePickerInput from '../../../app/components/DatePickerInput';
import { SurgeryFollowUp } from '../../../app/Models/SurgeryFollowUp';

interface SurgeryFollowUpFormProps {
    followUp?: SurgeryFollowUp;
    cancelEdit: () => void;
    title: React.ReactNode;
    surgeryId?: any;
}

export default function SurgeryFollowUpForm({ followUp, cancelEdit, title, surgeryId }: SurgeryFollowUpFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            cardiologySurgeryId: surgeryId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (followUp && !isDirty) {
            reset(followUp);
        }

    }, [followUp, reset, isDirty]);
 
    async function handleSubmitData(data: FieldValues) {
        try {
            let response: SurgeryFollowUp;

            if (followUp) {
                response = await agent.SurgeryFollowUp.updateSurgeryFollowUp(followUp.id, data);
            } else {
                response = await agent.SurgeryFollowUp.createSurgeryFollowUp(data);
            }

            dispatch(setSurgeryFollowUp({ ...response, id: followUp?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Follow-up record saved successfully!");
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
                        <DatePickerInput control={control} name='followUpDate' label="Follow-Up Date"/>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                        <AppTextInput multiline control={control} name="complications" label="Conplications" />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                        <AppTextInput multiline control={control} name="recommendations" label="Recommendations" />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                        <AppTextInput multiline control={control} name="functionalAssessment" label="Functional Assessment" />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ marginTop: '10px' }}>
                        <AppTextInput multiline control={control} name="followUpNotes" label="Notes" />
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{marginTop: '10px'}}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Follow-Up Completed</FormLabel>
                        <Controller
                        name="isFollowUpComplete"
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