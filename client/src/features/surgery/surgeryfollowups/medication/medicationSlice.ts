import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Medication } from "../../../../app/Models/medication";
import { RootState } from "../../../../app/store/configureStore";
import agent from "../../../../app/api/agent";

interface MedicationState {
  medicationBySurgeryFollowUpLoaded: boolean;
  status: string;
}

const medicationAdapter = createEntityAdapter<Medication>();

export const fetchMedicationsByFollowUp = createAsyncThunk<Medication[], number>(
  "medication/fetchMedicationsByPatient",
  async (followUpId, thunkAPI) => {
    try {
      const response = await agent.Medication.listByFollowId(followUpId);
      console.log("response", response);

      // Asegúrate de que response.items sea un array
      // if (!response.items) {
      //   return [];
      // }

      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const medicationSlice = createSlice({
  name: "medication",
  initialState: medicationAdapter.getInitialState<MedicationState>({
    medicationBySurgeryFollowUpLoaded: false,
    status: "idle",
  }),
  reducers: {
    setMedication: (state, action) => {
      medicationAdapter.upsertOne(state, action.payload);
      state.medicationBySurgeryFollowUpLoaded = false;
    },
    removeMedication: (state, action) => {
      medicationAdapter.removeOne(state, action.payload);
      state.medicationBySurgeryFollowUpLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMedicationsByFollowUp.pending, (state) => {
      state.status = "pendingMedicationByFollowUp";
    });
    builder.addCase(fetchMedicationsByFollowUp.fulfilled, (state, action) => {
      medicationAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.medicationBySurgeryFollowUpLoaded = true;
    });
    builder.addCase(fetchMedicationsByFollowUp.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const { setMedication, removeMedication } = medicationSlice.actions;

export const medicationSelectors = medicationAdapter.getSelectors(
  (state: RootState) => state.medication
);
