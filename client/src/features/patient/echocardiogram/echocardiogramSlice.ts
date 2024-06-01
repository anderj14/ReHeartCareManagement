import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Echocardiogram } from "../../../app/Models/echocardiogram";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";


interface EchocardiogramLoaded {
    echocardiogramByPatientLoaded: boolean;
    status: string;
}

const echocardiogramsAdapter = createEntityAdapter<Echocardiogram>();

type ThunkArg = {
    patientId: number;
    echocardiogramId: number;
}


export const fetchEchocardiogramsByPatientAsync = createAsyncThunk<Echocardiogram[], number>(
    'echocardiogramsByPatient/fetchEchocardiogramsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const echocardiogramsByPatient = await agent.Echocardiogram.listByPatientId(patientId);
            return echocardiogramsByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchEchocardiogramByPatientAsync = createAsyncThunk<Echocardiogram, ThunkArg>(
    'echocardiogramByPatient/fetchEchocardiogramByPatient',
    async ({ patientId, echocardiogramId }, thunkAPI) => {
        try {
            const echocardiogramByPatient = await agent.Echocardiogram.detailsByPatientId(patientId, echocardiogramId!);
            return echocardiogramByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const echocardiogramSlice = createSlice({
    name: 'patient',
    initialState: echocardiogramsAdapter.getInitialState<EchocardiogramLoaded>({
        echocardiogramByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEchocardiogramsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchEchocardiogramsByPatientAsync';
        });
        builder.addCase(fetchEchocardiogramsByPatientAsync.fulfilled, (state, action) => {
            echocardiogramsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.echocardiogramByPatientLoaded = true;
        });
        builder.addCase(fetchEchocardiogramsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchEchocardiogramByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchEchocardiogramByPatientAsync';
        });
        builder.addCase(fetchEchocardiogramByPatientAsync.fulfilled, (state, action) => {
            echocardiogramsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.echocardiogramByPatientLoaded = true;
        });
        builder.addCase(fetchEchocardiogramByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const echocardiogramSelectors = echocardiogramsAdapter.getSelectors((state: RootState) => state.echocardiogram);
