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
import { setMedicationAdministration } from '../holterStudySlice';
import { mapFormDataToApiData, FormData, MedicationAdministration } from '../../../../app/Models/medicationAdministration';
import { validationSchema } from '../../../validation-schema/medicationAdministrationValidation';


interface MedicationAdministrationFormProps {
    cancelEdit: () => void;
    medicationAdministration?: MedicationAdministration;
    holterStudyId?: number;
}

export default function MedicationAdministrationForm({ cancelEdit, medicationAdministration, holterStudyId }: MedicationAdministrationFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            holterStudyId: holterStudyId,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (medicationAdministration && !isDirty) {
            reset(medicationAdministration);
        }
    }, [medicationAdministration, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: MedicationAdministration;
            const mappedData = mapFormDataToApiData({ ...data, holterStudyId } as FormData);

            if (medicationAdministration) {
                response = await agent.MedicationAdministration.updateMedicationAdministration(medicationAdministration.id, mappedData);
            } else {
                response = await agent.MedicationAdministration.createMedicationAdministration(mappedData);
            }

            dispatch(setMedicationAdministration({ ...response, id: medicationAdministration?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Medication administration saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save medication administration. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle="Medication Administration Details" />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>
                        Administration details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="medicationName" label="Medication Name" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name="administrationDateTime" label="Date and Time" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="dosage" label="Dosage" />
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