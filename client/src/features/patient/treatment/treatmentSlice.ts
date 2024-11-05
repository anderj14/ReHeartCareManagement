import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Treatment, TreatmentParams } from "../../../app/Models/treatment";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface TreatmentState {
  treatmentsByPatientLoaded: boolean;
  status: string;
  treatmentParams: TreatmentParams;
  metaData: Metadata | null;
}

const treatmentsAdapter = createEntityAdapter<Treatment>();

type ThunkArg = {
  patientId: number;
  treatmentId?: number;
};

export const fetchTreatmentsByPatientAsync = createAsyncThunk<
  Treatment[],
  number,
  { state: RootState }
>("treatment/fetchTreatmentsByPatient", async (patientId, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().treatment.treatmentParams);
  try {
    const response = await agent.Treatment.listByPatientId(params, patientId);
    thunkAPI.dispatch(setMetaData(response.metadata));
    if (response.length === 0) {
      return response;
    }
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchTreatmentByPatientAsync = createAsyncThunk<
  Treatment,
  ThunkArg
>(
  "treatment/fetchTreatmentByPatient",
  async ({ patientId, treatmentId }, thunkAPI) => {
    try {
      const treatment = await agent.Treatment.detailsByPatientId(
        patientId,
        treatmentId!
      );
      return treatment;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 8,
    sort: "PatientName",
  };
}

const initialState: TreatmentState = {
  treatmentsByPatientLoaded: false,
  status: "idle",
  treatmentParams: initParams(),
  metaData: null,
};

export const treatmentSlice = createSlice({
  name: "treatmentByPatient",
  initialState: treatmentsAdapter.getInitialState<TreatmentState>(initialState),
  reducers: {
    setTreatmentParams: (state, action) => {
      state.treatmentsByPatientLoaded = false;
      state.treatmentParams = { ...state.treatmentParams, ...action.payload };
    },
    setPageIndex: (state, action) => {
      state.treatmentsByPatientLoaded = false;
      state.treatmentParams = { ...state.treatmentParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetTreatmentParams: (state) => {
      state.treatmentParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTreatmentsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchTreatmentsByPatient";
    });
    builder.addCase(
      fetchTreatmentsByPatientAsync.fulfilled,
      (state, action) => {
        treatmentsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.treatmentsByPatientLoaded = true;
      }
    );
    builder.addCase(fetchTreatmentsByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchTreatmentByPatientAsync.pending, (state) => {
      state.status = "pendingFetchTreatmentByPatient";
    });
    builder.addCase(fetchTreatmentByPatientAsync.fulfilled, (state, action) => {
      treatmentsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
      state.treatmentsByPatientLoaded = true;
    });
    builder.addCase(fetchTreatmentByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const {
  setTreatmentParams,
  setMetaData,
  setPageIndex,
  resetTreatmentParams,
} = treatmentSlice.actions;

export const treatmentSelectors = treatmentsAdapter.getSelectors(
  (state: RootState) => state.treatment
);
