import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import {
  MedicalHistory,
  MedicalHistoryParams,
} from "../../../app/Models/MedicalHistory";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface MedicalHistoryState {
  medicalHistoryByPatientLoaded: boolean;
  status: string;
  medicalHistoryParams: MedicalHistoryParams;
  metaData: Metadata | null;
}

const medicalHistoriesAdapter = createEntityAdapter<MedicalHistory>();

type ThunkArg = {
  patientId: number;
  medicalHistoryId?: number;
};

export const fetchMedicalHistoriesByPatientAsync = createAsyncThunk<
  MedicalHistory[],
  number,
  { state: RootState }
>(
  "medicalHistory/fetchMedicalHistoriesByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
        thunkAPI.getState().medicalHistory.medicalHistoryParams
    );
    try {
      const response = await agent.MedicalHistory.listByPatientId(
        params, patientId
      );
      thunkAPI.dispatch(setMetaData(response.metadata));
      if (response.length === 0) {
        return response;
      }
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchMedicalHistoryByPatientAsync = createAsyncThunk<
  MedicalHistory,
  ThunkArg
>(
  "medicalHistory/fetchMedicalHistoryByPatient",
  async ({ patientId, medicalHistoryId }, thunkAPI) => {
    try {
      const medicalHistory = await agent.MedicalHistory.detailsByPatientId(
        patientId,
        medicalHistoryId!
      );
      return medicalHistory;
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

const initialState: MedicalHistoryState = {
  medicalHistoryByPatientLoaded: false,
  status: "idle",
  medicalHistoryParams: initParams(),
  metaData: null,
};

export const medicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState:
    medicalHistoriesAdapter.getInitialState<MedicalHistoryState>(initialState),
  reducers: {
    setMedicalHistoryParams: (state, action) => {
      state.medicalHistoryByPatientLoaded = false;
      state.medicalHistoryParams = {
        ...state.medicalHistoryParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.medicalHistoryByPatientLoaded = false;
      state.medicalHistoryParams = {
        ...state.medicalHistoryParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetMedicalHistoryParams: (state) => {
      state.medicalHistoryParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMedicalHistoriesByPatientAsync.pending, (state) => {
      state.status = "pendingFetchMedicalHistoriesByPatient";
    });
    builder.addCase(
      fetchMedicalHistoriesByPatientAsync.fulfilled,
      (state, action) => {
        medicalHistoriesAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.medicalHistoryByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchMedicalHistoriesByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchMedicalHistoryByPatientAsync.pending, (state) => {
      state.status = "pendingFetchMedicalHistoryByPatient";
    });
    builder.addCase(
      fetchMedicalHistoryByPatientAsync.fulfilled,
      (state, action) => {
        medicalHistoriesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.medicalHistoryByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchMedicalHistoryByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setMedicalHistoryParams,
  resetMedicalHistoryParams,
  setMetaData,
  setPageIndex,
} = medicalHistorySlice.actions;

export const medicalHistorySelectors = medicalHistoriesAdapter.getSelectors(
  (state: RootState) => state.medicalHistory
);
