import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../../features/account/accountSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { patientSlice } from "../../features/patient/patientSlice";
import { surgerySlice } from "../../features/surgery/surgerySlice";
import { noteSlice } from "../../features/notes/noteSlice";
import { bloodTestSlice } from "../../features/patient/bloodTest/bloodTestSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        patient: patientSlice.reducer,
        cardiologySurgery: surgerySlice.reducer,
        note: noteSlice.reducer,
        bloodTest: bloodTestSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;