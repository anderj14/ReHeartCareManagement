import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import agent from '../../../../app/api/agent';
import AppTextInput from '../../../../app/components/AppTextInput';
import CustomButton from '../../../../app/components/CustomButton';
import DatePickerInput from '../../../../app/components/DatePickerInput';
import Subtitle from '../../../../app/components/Subtitle';
import { setPatientSymptom } from '../holterStudySlice';
import { mapFormDataToApiData, FormData, PatientSymptom } from '../../../../app/Models/patientSymptom';
import { validationSchema } from '../../../validation-schema/patientSymptomValidation';

interface PatientSymptomFormProps {
    cancelEdit: () => void;
    symptom?: PatientSymptom;
    holterStudyId?: number;
}

export default function PatientSymptomForm({cancelEdit, symptom, holterStudyId }: PatientSymptomFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            holterStudyId: holterStudyId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (symptom && !isDirty) {
            reset(symptom);
        }
    }, [symptom, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: PatientSymptom;
            const mappedData = mapFormDataToApiData({ ...data, holterStudyId } as FormData);

            console.log(data);

            if (symptom) {
                response = await agent.PatientSymptom.updatePatientSymptom(symptom.id, mappedData);
            } else {
                response = await agent.PatientSymptom.createPatientSymptom(mappedData);
            }

            dispatch(setPatientSymptom({ ...response, id: symptom?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Patient symptom saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the symptom. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle="Patient Symptom Result Details" />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Symptom details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="symptomName" label="Symptom Name" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='symptomDateTime' label="Symptom Date and Time" />
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
                    type='submit'
                >
                    Save
                </CustomButton>
            </Box>
        </form>
    );
}