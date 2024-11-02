import { useEffect } from "react";
import { fetchPatientsAsync, fetchPatientStatusAsync, patientSelectors } from "../../features/patient/patientSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function usePatients() {
    const patients = useAppSelector(patientSelectors.selectAll);
    const { patientsLoaded, metaData, status, patientStatus, patientStatusLoaded } = useAppSelector(state => state.patient);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!patientsLoaded) dispatch(fetchPatientsAsync());
    }, [patientsLoaded, dispatch]);

    useEffect(() => {
        if (!patientStatusLoaded) dispatch(fetchPatientStatusAsync());
    }, [patientStatusLoaded, dispatch]);
    
    return {
        patients,
        patientsLoaded,
        status,
        patientStatus,
        patientStatusLoaded,
        metaData
    }
}