import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { BloodTest } from "../../../app/Models/bloodTest";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";


interface bloodTestLoaded {
    bloodTestByPatientLoaded: boolean;
    status: string;
}

const bloodTestsAdapter = createEntityAdapter<BloodTest>();


type ThunkArg = {
    patientId: number;
    bloodTestId?: number;
};

export const fetchBloodTestsByPatientAsync = createAsyncThunk<BloodTest[], number>(
    'bloodTestByPatient/fetchBloodTestsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const bloodTestsByPatient = await agent.BloodTest.listByPatientId(patientId);
            return bloodTestsByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchBloodTestByPatientAsync = createAsyncThunk<BloodTest, ThunkArg>(
    'bloodTestByPatient/fetchBloodTestByPatient',
    async ({ patientId, bloodTestId }, thunkAPI) => {
        try {
            const bloodTestByPatient = await agent.BloodTest.detailsByPatientId(patientId, bloodTestId!);
            return bloodTestByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const bloodTestSlice = createSlice({
    name: 'patient',
    initialState: bloodTestsAdapter.getInitialState({
        bloodTestByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBloodTestsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchBloodTestsByPstient';
        });
        builder.addCase(fetchBloodTestsByPatientAsync.fulfilled, (state, action) => {
            bloodTestsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.bloodTestByPatientLoaded = true;
        });
        builder.addCase(fetchBloodTestsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchBloodTestByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchBloodTestsByPstient';
        });
        builder.addCase(fetchBloodTestByPatientAsync.fulfilled, (state, action) => {
            bloodTestsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.bloodTestByPatientLoaded = true;
        });
        builder.addCase(fetchBloodTestByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const bloodTestSelectors = bloodTestsAdapter.getSelectors((state: RootState) => state.bloodTest);