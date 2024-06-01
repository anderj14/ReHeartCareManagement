import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { MedicalHistory } from "../../../app/Models/MedicalHistory";

interface MedicalHistoryState {
    medicalHistoryByPatientLoaded: boolean;
    status: string;
}

const medicalHistoriesAdapter = createEntityAdapter<MedicalHistory>();

type ThunkArg = {
    patientId: number;
    medicalHistoryId?: number;
};

export const fetchMedicalHistoriesByPatientAsync = createAsyncThunk<MedicalHistory[], number>(
    'medicalHistory/fetchMedicalHistoriesByPatient',
    async (patientId, thunkAPI) => {
        try {
            const medicalHistories = await agent.MedicalHistory.listByPatientId(patientId);
            return medicalHistories;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchMedicalHistoryByPatientAsync = createAsyncThunk<MedicalHistory, ThunkArg>(
    'medicalHistory/fetchMedicalHistoryByPatient',
    async ({ patientId, medicalHistoryId }, thunkAPI) => {
        try {
            const medicalHistory = await agent.MedicalHistory.detailsByPatientId(patientId, medicalHistoryId!);
            return medicalHistory;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const medicalHistorySlice = createSlice({
    name: 'medicalHistory',
    initialState: medicalHistoriesAdapter.getInitialState<MedicalHistoryState>({
        medicalHistoryByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMedicalHistoriesByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchMedicalHistoriesByPatient';
        });
        builder.addCase(fetchMedicalHistoriesByPatientAsync.fulfilled, (state, action) => {
            medicalHistoriesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.medicalHistoryByPatientLoaded = true;
        });
        builder.addCase(fetchMedicalHistoriesByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchMedicalHistoryByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchMedicalHistoryByPatient';
        });
        builder.addCase(fetchMedicalHistoryByPatientAsync.fulfilled, (state, action) => {
            medicalHistoriesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.medicalHistoryByPatientLoaded = true;
        });
        builder.addCase(fetchMedicalHistoryByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const medicalHistorySelectors = medicalHistoriesAdapter.getSelectors((state: RootState) => state.medicalHistory);
