import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Electrocardiogram } from "../../../app/Models/electrocardiogram";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface ElectrocardiogramLoaded {
    electrocardiogramByPatientLoaded: boolean;
    status: string;
}

const electrocardiogramsAdapter = createEntityAdapter<Electrocardiogram>();

type ThunkArg = {
    patientId: number;
    electrocardiogramId: number;
}

export const fetchElectrocardiogramsByPatientAsync = createAsyncThunk<Electrocardiogram[], number>(
    'electrocardiogramsByPatient/fetchElectrocardiogramsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const electricardiogramsByPatient = await agent.Electrocardiogram.listByPatientId(patientId);
            return electricardiogramsByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchElectrocardiogramByPatientAsync = createAsyncThunk<Electrocardiogram, ThunkArg>(
    'electrocardiogramByPatient/fetchElectrocardiogramsByPatient',
    async ({ patientId, electrocardiogramId }, thunkAPI) => {
        try {
            const electricardiogramByPatient = await agent.Electrocardiogram.detailsByPatientId(patientId, electrocardiogramId!);
            return electricardiogramByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const electrocardiogramSlice = createSlice({
    name: 'patient',
    initialState: electrocardiogramsAdapter.getInitialState<ElectrocardiogramLoaded>({
        electrocardiogramByPatientLoaded: false,
        status: 'idle',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchElectrocardiogramsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchElectrocardiogramsByPatient';
        });
        builder.addCase(fetchElectrocardiogramsByPatientAsync.fulfilled, (state, action) => {
            electrocardiogramsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.electrocardiogramByPatientLoaded = true;
        });
        builder.addCase(fetchElectrocardiogramsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchElectrocardiogramByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchElectrocardiogramByPatient';
        });
        builder.addCase(fetchElectrocardiogramByPatientAsync.fulfilled, (state, action) => {
            electrocardiogramsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.electrocardiogramByPatientLoaded = true;
        });
        builder.addCase(fetchElectrocardiogramByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }

});

export const electrocardiogramSelectors = electrocardiogramsAdapter.getSelectors((state: RootState) => state.electrocardiogram);