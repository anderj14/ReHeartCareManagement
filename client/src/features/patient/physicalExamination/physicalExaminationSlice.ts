import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PhysicalExamination } from "../../../app/Models/physicalExamination";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";

interface PhysicalExaminationState {
    physicalExaminationByPatientLoaded: boolean;
    status: string;
}

const physicalExaminationsAdapter = createEntityAdapter<PhysicalExamination>();

type ThunkArg = {
    patientId: number;
    physicalExaminationId?: number;
};

export const fetchPhysicalExaminationsByPatientAsync = createAsyncThunk<PhysicalExamination[], number>(
    'physicalExaminationByPatient/fetchPhysicalExaminationsByPatient',
    async (patientId, thunkAPI) => {
        try {
            const physicalExaminationsByPatient = await agent.PhysicalExamination.listByPatientId(patientId);
            return physicalExaminationsByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPhysicalExaminationByPatientAsync = createAsyncThunk<PhysicalExamination, ThunkArg>(
    'physicalExaminationByPatient/fetchPhysicalExaminationByPatient',
    async ({ patientId, physicalExaminationId }, thunkAPI) => {
        try {
            const physicalExaminationByPatient = await agent.PhysicalExamination.detailsByPatientId(patientId, physicalExaminationId!);
            return physicalExaminationByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const physicalExaminationSlice = createSlice({
    name: 'physicalExamination',
    initialState: physicalExaminationsAdapter.getInitialState<PhysicalExaminationState>({
        physicalExaminationByPatientLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPhysicalExaminationsByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchPhysicalExaminationsByPatient';
        });
        builder.addCase(fetchPhysicalExaminationsByPatientAsync.fulfilled, (state, action) => {
            physicalExaminationsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.physicalExaminationByPatientLoaded = true;
        });
        builder.addCase(fetchPhysicalExaminationsByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPhysicalExaminationByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchPhysicalExaminationByPatient';
        });
        builder.addCase(fetchPhysicalExaminationByPatientAsync.fulfilled, (state, action) => {
            physicalExaminationsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.physicalExaminationByPatientLoaded = true;
        });
        builder.addCase(fetchPhysicalExaminationByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const physicalExaminationSelectors = physicalExaminationsAdapter.getSelectors((state: RootState) => state.physicalExamination);
