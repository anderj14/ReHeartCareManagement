import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { CardiacCathStudy } from "../../../app/Models/cardiacCathStudy";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";


interface cardiacCathStudyLoaded {
    cardiacCathStudyByPatientLoaded: boolean;
    status: string;
}

const cardiacCathStudiesAdapter = createEntityAdapter<CardiacCathStudy>();

type ThunkArg = {
    patientId: number;
    cardiacCathStudyId?: number;
};

export const fetchCardiacCathStudiesByPatientAsync = createAsyncThunk<CardiacCathStudy[], number>(
    'cardiacCathStudiesByPatient/fetchCardiacCathStudiesByPatient',
    async (patientId, thunkAPI) => {
        try {
            const cardiacCathStudiesByPatient = await agent.CardiacCathStudy.listByPatientId(patientId);
            return cardiacCathStudiesByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCardiacCathStudyByPatientAsync = createAsyncThunk<CardiacCathStudy, ThunkArg>(
    'cardiacCathStudyByPatient/fetchCardiacCathStudyByPatient',
    async ({ patientId, cardiacCathStudyId }, thunkAPI) => {
        try {
            const cardiacCathStudyByPatient = await agent.CardiacCathStudy.detailsByPatientId(patientId, cardiacCathStudyId!);
            return cardiacCathStudyByPatient;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const cardiaccathstudySlice = createSlice({
    name: 'patient',
    initialState: cardiacCathStudiesAdapter.getInitialState({
        cardiacCathStudyByPatientLoaded: false,
        status: 'idle',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCardiacCathStudiesByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchCardiacCathStudiesByPatient';
        });
        builder.addCase(fetchCardiacCathStudiesByPatientAsync.fulfilled, (state, action) => {
            cardiacCathStudiesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.cardiacCathStudyByPatientLoaded = true;
        });
        builder.addCase(fetchCardiacCathStudiesByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCardiacCathStudyByPatientAsync.pending, (state) => {
            state.status = 'pendingFetchCardiacCathStudyByPatient';
        });
        builder.addCase(fetchCardiacCathStudyByPatientAsync.fulfilled, (state, action) => {
            cardiacCathStudiesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.cardiacCathStudyByPatientLoaded = true;
        });
        builder.addCase(fetchCardiacCathStudyByPatientAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
})

export const cardiacCathStudySelectors = cardiacCathStudiesAdapter.getSelectors((state: RootState) => state.cardiacCathStudy);






