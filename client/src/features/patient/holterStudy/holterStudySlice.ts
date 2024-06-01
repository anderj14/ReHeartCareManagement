import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HolterStudy } from "../../../app/Models/holterStudy";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface HolterStudyLoaded {
    holterStudyByPatientLoaded: boolean;
    status: string;
}

const holterStudiesAdapter = createEntityAdapter<HolterStudy>();

type ThunkArg = {
    patientId: number;
    holterStudyId: number;
}


export const fetchHolterStudiesByPatientAsync = createAsyncThunk<HolterStudy[], number>(
    'holterStudyByPatient/fetchHolterStudiesByPatient',
    async (patientId, thunkAPI) => {
        try {
            const holterStudiesByPatient = await agent.HolterStudy.listByPatientId(patientId);
            return holterStudiesByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchHolterStudyByPatientAsync = createAsyncThunk<HolterStudy, ThunkArg>(
    'holterStudyByPatient/fetchHolterStudyByPatient',
    async ({ patientId, holterStudyId }, thunkAPI) => {
        try {
            const holterStudyByPatient = await agent.HolterStudy.detailsByPatientId(patientId, holterStudyId!);
            return holterStudyByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const holterStudySlice = createSlice({
    name: 'holterStudy',
    initialState: holterStudiesAdapter.getInitialState<HolterStudyLoaded>({
        holterStudyByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHolterStudiesByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchHolterStudiesByPatient';
        });
        builder.addCase(fetchHolterStudiesByPatientAsync.fulfilled, (state, action) => {
            holterStudiesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.holterStudyByPatientLoaded = true;
        });
        builder.addCase(fetchHolterStudiesByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchHolterStudyByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchHolterStudyByPatient';
        });
        builder.addCase(fetchHolterStudyByPatientAsync.fulfilled, (state, action) => {
            holterStudiesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.holterStudyByPatientLoaded = true;
        });
        builder.addCase(fetchHolterStudyByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const holterStudySelectors = holterStudiesAdapter.getSelectors((state: RootState) => state.holterStudy);