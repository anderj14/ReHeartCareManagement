import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../../features/account/accountSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { patientSlice } from "../../features/patient/patientSlice";
import { surgerySlice } from "../../features/surgery/surgerySlice";
import { noteSlice } from "../../features/notes/noteSlice";
import { bloodTestSlice } from "../../features/patient/bloodTest/bloodTestSlice";
import { cardiaccathstudySlice } from "../../features/patient/cardiacTestsPatient/cardiacCathStudySlice";
import { electrocardiogramSlice } from "../../features/patient/electrocardiogram/electrocardiogramSlice";
import { echocardiogramSlice } from "../../features/patient/echocardiogram/echocardiogramSlice";
import { holterStudySlice } from "../../features/patient/holterStudy/holterStudySlice";
import { physicalExaminationSlice } from "../../features/patient/physicalExamination/physicalExaminationSlice";
import { diseaseHistorySlice } from "../../features/patient/diseaseHistory/diseaseHistorySlice";
import { medicalHistorySlice } from "../../features/patient/medicalHistory/medicalHistorySlice";
import { diagnosticSlice } from "../../features/patient/diagnostic/diagnosticSlice";
import { treatmentSlice } from "../../features/patient/treatment/treatmentSlice";
import { appointmentSlice } from "../../features/appointment/appointmentSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        patient: patientSlice.reducer,
        cardiologySurgery: surgerySlice.reducer,
        note: noteSlice.reducer,
        bloodTest: bloodTestSlice.reducer,
        cardiacCathStudy: cardiaccathstudySlice.reducer,
        electrocardiogram: electrocardiogramSlice.reducer,
        echocardiogram: echocardiogramSlice.reducer,
        holterStudy: holterStudySlice.reducer,
        physicalExamination: physicalExaminationSlice.reducer,
        diseaseHistory: diseaseHistorySlice.reducer,
        medicalHistory: medicalHistorySlice.reducer,
        diagnostic: diagnosticSlice.reducer,
        treatment: treatmentSlice.reducer,
        appointment: appointmentSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;