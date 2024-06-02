import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Treatment } from "../../../app/Models/treatment";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface TreatmentState {
    treatmentsByPatientLoaded: boolean;
    status: string;
}

const treatmentsAdapter = createEntityAdapter<Treatment>();

type ThunkArg = {
    patientId: number;
    treatmentId?: number;
};

export const fetchTreatmentsByPatientAsync = createAsyncThunk<Treatment[], number>(
    'treatment/fetchTreatmentsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const treatments = await agent.Treatment.listByPatientId(patientId);
            return treatments;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchTreatmentByPatientAsync = createAsyncThunk<Treatment, ThunkArg>(
    'treatment/fetchTreatmentByPatient',
    async ({ patientId, treatmentId }, thunkAPI) => {
        try {
            const treatment = await agent.Treatment.detailsByPatientId(patientId, treatmentId!);
            return treatment;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const treatmentSlice = createSlice({
    name: 'treatment',
    initialState: treatmentsAdapter.getInitialState<TreatmentState>({
        treatmentsByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTreatmentsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchTreatmentsByPatient';
        });
        builder.addCase(fetchTreatmentsByPatientAsync.fulfilled, (state, action) => {
            treatmentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.treatmentsByPatientLoaded = true;
        });
        builder.addCase(fetchTreatmentsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchTreatmentByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchTreatmentByPatient';
        });
        builder.addCase(fetchTreatmentByPatientAsync.fulfilled, (state, action) => {
            treatmentsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.treatmentsByPatientLoaded = true;
        });
        builder.addCase(fetchTreatmentByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const treatmentSelectors = treatmentsAdapter.getSelectors((state: RootState) => state.treatment);
