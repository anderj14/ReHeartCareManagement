import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { DiseaseHistory } from "../../../app/Models/DiseaseHistory";

interface DiseaseHistoryState {
    diseaseHistoryByPatientLoaded: boolean;
    status: string;
}

const diseaseHistoriesAdapter = createEntityAdapter<DiseaseHistory>();

type ThunkArg = {
    patientId: number;
    diseaseHistoryId?: number;
};

export const fetchDiseaseHistoriesByPatientAsync = createAsyncThunk<DiseaseHistory[], number>(
    'diseaseHistoryByPatient/fetchDiseaseHistoriesByPatient',
    async (patientId, thunkAPI) => {
        try {
            const diseaseHistoriesByPatient = await agent.DiseaseHistory.listByPatientId(patientId);
            return diseaseHistoriesByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchDiseaseHistoryByPatientAsync = createAsyncThunk<DiseaseHistory, ThunkArg>(
    'diseaseHistoryByPatient/fetchDiseaseHistoryByPatient',
    async ({ patientId, diseaseHistoryId }, thunkAPI) => {
        try {
            const diseaseHistoryByPatient = await agent.DiseaseHistory.detailsByPatientId(patientId, diseaseHistoryId!);
            return diseaseHistoryByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const diseaseHistorySlice = createSlice({
    name: 'diseaseHistory',
    initialState: diseaseHistoriesAdapter.getInitialState<DiseaseHistoryState>({
        diseaseHistoryByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDiseaseHistoriesByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchDiseaseHistoriesByPatient';
        });
        builder.addCase(fetchDiseaseHistoriesByPatientAsync.fulfilled, (state, action) => {
            diseaseHistoriesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.diseaseHistoryByPatientLoaded = true;
        });
        builder.addCase(fetchDiseaseHistoriesByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchDiseaseHistoryByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchDiseaseHistoriesByPatient';
        });
        builder.addCase(fetchDiseaseHistoryByPatientAsync.fulfilled, (state, action) => {
            diseaseHistoriesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.diseaseHistoryByPatientLoaded = true;
        });
        builder.addCase(fetchDiseaseHistoryByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const diseaseHistorySelectors = diseaseHistoriesAdapter.getSelectors((state: RootState) => state.diseaseHistory);
