import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchStressTestByPatientAsync, stressTestSelectors } from "../../features/patient/stressTest/stressTestSlice";
import { fetchPatientAsync, patientSelectors } from "../../features/patient/patientSlice";
import { useEffect } from "react";

export function useStressTest() {
    const dispatch = useAppDispatch();
    const { id, patientId, stressTestId } = useParams<{
        id?: string;
        patientId?: string;
        stressTestId?: string;
    }>();
    const resolvedPatientId = patientId ?? id;
    const patientIdNumber = resolvedPatientId ? Number(resolvedPatientId) : undefined;
    const stressTestIdNumber = stressTestId ? Number(stressTestId) : undefined;

    const stressTestByPatient = useAppSelector((state) => 
        stressTestIdNumber ? stressTestSelectors.selectById(state, stressTestIdNumber) : undefined
    );

    const patient = useAppSelector((state) => 
        id ? patientSelectors.selectById(state, Number(id)) : undefined
    );

    const {status} = useAppSelector(state => state.stressTest);

    useEffect(() => {
        if (patientIdNumber && !patient){
            dispatch(fetchPatientAsync(patientIdNumber));
        }

        if (patientIdNumber && stressTestIdNumber && !stressTestByPatient) {
            dispatch(fetchStressTestByPatientAsync({
                patientId: patientIdNumber,
                stressTestId: stressTestIdNumber,
            }));
        }
    }, [dispatch, patientIdNumber, stressTestIdNumber, stressTestByPatient, patient]);

    return {
        dispatch,
        patient,
        patientIdNumber,
        stressTestByPatient,
        status
    }
}
