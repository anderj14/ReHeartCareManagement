import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Patient } from "../../app/Models/patient";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const patientsAdapter = createEntityAdapter<Patient>();

export const fetchPatientsAsync = createAsyncThunk<Patient[]>(
    'patient/fetchPatientsAsync',
    async (_, thunkAPI) => {
        try {
            const patients = await agent.Patient.list();
            return patients.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPatientAsync = createAsyncThunk<Patient, number>(
    'patient/fetchPatientAsync',
    async (patientId, thunkAPI) => {
        try {
            const patients = await agent.Patient.details(patientId);
            return patients;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const patientSlice = createSlice({
    name: 'patient',
    initialState: patientsAdapter.getInitialState({
        patientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPatientsAsync.pending, (state) => {
            state.status = 'pendingFetchPatients';
        });
        builder.addCase(fetchPatientsAsync.fulfilled, (state, action) => {
            patientsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.patientLoaded = true;
        });
        builder.addCase(fetchPatientsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPatientAsync.pending, (state) => {
            state.status = 'pendingFetchPatient';
        });
        builder.addCase(fetchPatientAsync.fulfilled, (state, action) => {
            patientsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPatientAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        })
    }
});

export const patientSelectors = patientsAdapter.getSelectors((state: RootState) => state.patient);