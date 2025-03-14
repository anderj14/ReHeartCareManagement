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
import { ClinicalEvaluation, FormData, mapFormDataToApiData } from '../../../../app/Models/clinicalEvaluation';
import Subtitle from '../../../../app/components/Subtitle';
import { setClinicalEvaluation } from '../holterStudySlice';
import { validationSchema } from '../../../validation-schema/clinicalEvaluationValidation';

interface ClinicalEvaluationFormProps {
    cancelEdit: () => void;
    evaluation?: ClinicalEvaluation;
    holterStudyId?: number;
    onSuccess?: () => void; 
}

export default function ClinicalEvaluationForm({ cancelEdit, evaluation, holterStudyId, onSuccess }: ClinicalEvaluationFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            holterStudyId: holterStudyId || 0,
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (evaluation && !isDirty) {
            reset(evaluation);
        }
    }, [evaluation, reset, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: ClinicalEvaluation;
            const mappedData = mapFormDataToApiData({ ...data, holterStudyId } as FormData);

            console.log(data);

            if (evaluation) {
                response = await agent.ClinicalEvaluation.updateClinicalEvaluation(evaluation.id, mappedData);
            } else {
                response = await agent.ClinicalEvaluation.createClinicalEvaluation(mappedData);
            }

            dispatch(setClinicalEvaluation({ ...response, id: evaluation?.id || response.id }));
                  // Call onSuccess if it exists
            onSuccess?.();
            cancelEdit();
            reset();
            toast.success("Clinical Evaluation saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the evaluation. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle="Clinical Evaluation Details" />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='evaluationDateTime' label="Evaluation Date and Time" />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="findings" label="Findings" multiline rows={4} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="recommendations" label="Recommendations" multiline rows={4} />
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
