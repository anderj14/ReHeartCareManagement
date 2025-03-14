import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import agent from '../../../../app/api/agent';
import AppTextInput from '../../../../app/components/AppTextInput';
import CustomButton from '../../../../app/components/CustomButton';
import Subtitle from '../../../../app/components/Subtitle';
import { mapFormDataToApiData, FormData, ArrhythmiaEvent } from '../../../../app/Models/arrhythmiaEvent';
import { validationSchema } from '../../../validation-schema/arrhythmiaEventValidation';
import { setArrhythmiaEvent } from '../holterStudySlice';

interface ArrhythmiaEventFormProps {
    cancelEdit: () => void;
    event?: ArrhythmiaEvent;
    holterStudyId?: number;
}

export default function ArrhythmiaEventForm({ cancelEdit, event, holterStudyId }: ArrhythmiaEventFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            holterStudyId: holterStudyId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (event && !isDirty) {
            reset(event);
        }
    }, [event, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: ArrhythmiaEvent;
            const mappedData = mapFormDataToApiData({ ...data, holterStudyId } as FormData);

            if (event) {
                response = await agent.ArrhythmiaEvent.updateArrhythmiaEvent(event.id, mappedData);
            } else {
                response = await agent.ArrhythmiaEvent.createArrhythmiaEvent(mappedData);
            }

            dispatch(setArrhythmiaEvent({ ...response, id: event?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Arrhythmia event saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the arrhythmia event. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle="Arrhythmia Event Details" />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>
                        Event Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="type" label="Arrhythmia Event Type" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="duration" label="Duration" rows={4} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="heartRateDuringEvent" label="Heart Rate During Event" type='number' rows={4} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="description" label="Description" multiline rows={4} />
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