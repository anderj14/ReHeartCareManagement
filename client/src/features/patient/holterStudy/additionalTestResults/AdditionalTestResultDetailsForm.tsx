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
import { AdditionalTestResult, FormData, mapFormDataToApiData } from '../../../../app/Models/additionalTestResult';
import Subtitle from '../../../../app/components/Subtitle';
import { setAdditionalTestResult } from '../holterStudySlice';
import { validationSchema } from '../../../validation-schema/additionalTestResultValidation';

interface AdditionalTestResultFormProps {
    cancelEdit: () => void;
    test?: AdditionalTestResult;
    holterStudyId?: number;
}

export default function AdditionalTestResultDetailsForm({cancelEdit, test, holterStudyId }: AdditionalTestResultFormProps) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver<any>(validationSchema),
        defaultValues: {
            holterStudyId: holterStudyId,
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
            let response: AdditionalTestResult;
            const mappedData = mapFormDataToApiData({ ...data, holterStudyId } as FormData);

            console.log(data);

            if (test) {
                response = await agent.AdditionalTestResult.updateAdditionalTestResult(test.id, mappedData);
            } else {
                response = await agent.AdditionalTestResult.createAdditionalTestResult(mappedData);
            }

            dispatch(setAdditionalTestResult({ ...response, id: test?.id || response.id }));
            cancelEdit();
            reset();
            toast.success("Additional Test Result saved successfully!");
        } catch (error: any) {
            console.error("Complete error object:", error);
            toast.error("Failed to save the test. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <Subtitle subtitle="Additional Test Result Details" />
            <Box sx={{ marginTop: '30px' }}>
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 400, fontSize: '17px' }}>Test Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="testName" label="Test Name" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
                            <DatePickerInput control={control} name='testDateTime' label="Test Date and Time" />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                            <AppTextInput control={control} name="results" label="Results" multiline rows={4} />
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