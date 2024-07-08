import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StressTest } from "../../../app/Models/stressTest";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface StressTestState {
    stressTestByPatientLoaded: boolean;
    status: string;
}

const StressTestAdapter = createEntityAdapter<StressTest>();

type ThunkArg = {
    patientId: number
    stressTestId: number
}

export const fetchStressTestsByPatientAsync = createAsyncThunk<StressTest[], number>(
    'stressTest/fetchStressTestsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const stressTests = await agent.StressTest.listByPatientId(patientId);
            return stressTests;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchStressTestByPatientAsync = createAsyncThunk<StressTest, ThunkArg>(
    'stressTest/fetchStressTestByPatient',
    async ({ patientId, stressTestId }, thunkAPI) => {
        try {
            const stressTest = await agent.StressTest.detailsByPatientId(patientId, stressTestId);
            return stressTest;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const stressTestSlice = createSlice({
    name: 'stressTest',
    initialState: StressTestAdapter.getInitialState<StressTestState>({
        stressTestByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStressTestsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchStressTestsByPatient';
        });
        builder.addCase(fetchStressTestsByPatientAsync.fulfilled, (state, action) => {
            StressTestAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.stressTestByPatientLoaded = true;
        });
        builder.addCase(fetchStressTestsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchStressTestByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchStressTestByPatient';
        });
        builder.addCase(fetchStressTestByPatientAsync.fulfilled, (state, action) => {
            StressTestAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.stressTestByPatientLoaded = true;
        });
        builder.addCase(fetchStressTestByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const stressTestSelectors = StressTestAdapter.getSelectors((state: RootState) => state.stressTest);
