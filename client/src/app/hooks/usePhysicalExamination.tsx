import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchPhysicalExaminationByPatientAsync, physicalExaminationSelectors } from "../../features/patient/physicalExamination/physicalExaminationSlice";
import { useEffect } from "react";
import { fetchPatientAsync, patientSelectors } from "../../features/patient/patientSlice";


export function usePhysicalExamination() {
    const dispatch = useAppDispatch();
    const {id, patientId, physicalExaminationId} = useParams<{id?: string, patientId?: string, physicalExaminationId?: string}>();
    
    const resolvedPatientId = patientId ?? id;
    
    const patientIdNumber = resolvedPatientId ? Number(resolvedPatientId) : undefined;
    const physicalExaminationIdNumber = physicalExaminationId ? Number(physicalExaminationId) : undefined;

    const physicalExaminationByPatient = useAppSelector((state) => 
        physicalExaminationIdNumber ? physicalExaminationSelectors.selectById(state, physicalExaminationIdNumber) : undefined
    );

    const patient = useAppSelector((state) =>
        id ? patientSelectors.selectById(state, Number(id)) : undefined
    );

    const {status} = useAppSelector(state => state.physicalExamination);

    useEffect(() => {
        if (patientIdNumber && !patient) {
            dispatch(fetchPatientAsync(patientIdNumber));
        }
    
        if (patientIdNumber && physicalExaminationIdNumber) {
            dispatch(fetchPhysicalExaminationByPatientAsync({
                patientId: patientIdNumber,
                physicalExaminationId: physicalExaminationIdNumber
            }));
        }
    }, [dispatch, patientIdNumber, physicalExaminationIdNumber, patient]);
    
    return {
        dispatch,
        patientIdNumber,
        physicalExaminationByPatient,
        status,
    }
}