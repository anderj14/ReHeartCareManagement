import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Diagnostics } from "../../../app/Models/diagnostic";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface DiagnosticState {
    diagnosticByPatientLoaded: boolean;
    status: string;
}

const diagnosticsAdapter = createEntityAdapter<Diagnostics>();

type ThunkArg = {
    patientId: number;
    diagnosticId?: number;
};

export const fetchDiagnosticsByPatientAsync = createAsyncThunk<Diagnostics[], number>(
    'diagnostics/fetchDiagnosticsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const diagnostics = await agent.Diagnostic.listByPatientId(patientId);
            return diagnostics;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchDiagnosticByPatientAsync = createAsyncThunk<Diagnostics, ThunkArg>(
    'diagnostics/fetchDiagnostic',
    async ({ patientId, diagnosticId }, thunkAPI) => {
        try {
            const diagnostic = await agent.Diagnostic.detailsByPatientId(patientId, diagnosticId!);
            return diagnostic;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const diagnosticSlice = createSlice({
    name: 'diagnostics',
    initialState: diagnosticsAdapter.getInitialState<DiagnosticState>({
        diagnosticByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDiagnosticsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchDiagnosticsByPatient';
        });
        builder.addCase(fetchDiagnosticsByPatientAsync.fulfilled, (state, action) => {
            diagnosticsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.diagnosticByPatientLoaded = true;
        });
        builder.addCase(fetchDiagnosticsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchDiagnosticByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchDiagnostic';
        });
        builder.addCase(fetchDiagnosticByPatientAsync.fulfilled, (state, action) => {
            diagnosticsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.diagnosticByPatientLoaded = true;
        });
        builder.addCase(fetchDiagnosticByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const diagnosticSelectors = diagnosticsAdapter.getSelectors((state: RootState) => state.diagnostic);
