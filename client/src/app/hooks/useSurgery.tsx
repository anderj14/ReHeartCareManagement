import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  fetchCardiologySurgeriesAsync,
  fetchCardiologySurgeriesByPatientAsync,
  fetchPatientListAsync,
  surgerySelectors,
} from "../../features/surgery/surgerySlice";
import { useParams } from "react-router-dom";
import { fetchPatientAsync, patientSelectors } from "../../features/patient/patientSlice";

export function useSurgery() {
  const cardiologySurgeries = useAppSelector(surgerySelectors.selectAll);
  const dispatch = useAppDispatch();
  const { status, surgeriesLoaded, cardiologySurgeryParams, metaData, patientList, patientLoaded} =
    useAppSelector((state) => state.cardiologySurgery);

  useEffect(() => {
    if (!surgeriesLoaded) dispatch(fetchCardiologySurgeriesAsync());
  }, [surgeriesLoaded, dispatch]);

  useEffect(() => {
    if (!patientLoaded) dispatch(fetchPatientListAsync());
  }, [surgeriesLoaded, dispatch]);

  return {
    cardiologySurgeries,
    surgeriesLoaded,
    status,
    cardiologySurgeryParams,
    metaData,
    dispatch,
    patientList,
    patientLoaded
  };
}

export function useSurgeryByPatient() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();

  const cardiologySurgeryByPatient = useAppSelector(surgerySelectors.selectAll);
  const { surgeryByPatientLoaded, status, cardiologySurgeryParams, metaDataByPatient } = useAppSelector(
    (state) => state.cardiologySurgery
  );
  const patient = useAppSelector((state) => patientSelectors.selectById(state, id));

  useEffect(() => {
    if (!patient && id) {
      dispatch(fetchPatientAsync(id));
    }

    if (patient && !surgeryByPatientLoaded) {
      dispatch(fetchCardiologySurgeriesByPatientAsync(patient.id));
    }
  }, [dispatch, id, patient, surgeryByPatientLoaded]);

  return {
    patient,
    cardiologySurgeryByPatient,
    surgeryByPatientLoaded,
    status,
    dispatch,
    cardiologySurgeryParams,
    metaDataByPatient,
  };
}