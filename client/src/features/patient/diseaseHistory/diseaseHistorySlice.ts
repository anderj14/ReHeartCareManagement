import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import {
  DiseaseHistory,
  DiseaseHistoryParams,
} from "../../../app/Models/DiseaseHistory";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface DiseaseHistoryState {
  diseaseHistoryByPatientLoaded: boolean;
  status: string;
  diseaseHistoryParams: DiseaseHistoryParams;
  metaData: Metadata | null;
}

const diseaseHistoriesAdapter = createEntityAdapter<DiseaseHistory>();

type ThunkArg = {
  patientId: number;
  diseaseHistoryId?: number;
};

export const fetchDiseaseHistoriesByPatientAsync = createAsyncThunk<
  DiseaseHistory[],
  number,
  { state: RootState }
>(
  "diseaseHistoryByPatient/fetchDiseaseHistoriesByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().diseaseHistory.diseaseHistoryParams
    );
    try {
      const response = await agent.DiseaseHistory.listByPatientId(
        params,
        patientId
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

export const fetchDiseaseHistoryByPatientAsync = createAsyncThunk<
  DiseaseHistory,
  ThunkArg
>(
  "diseaseHistoryByPatient/fetchDiseaseHistoryByPatient",
  async ({ patientId, diseaseHistoryId }, thunkAPI) => {
    try {
      const diseaseHistoryByPatient =
        await agent.DiseaseHistory.detailsByPatientId(
          patientId,
          diseaseHistoryId!
        );
      return diseaseHistoryByPatient;
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

const initialState: DiseaseHistoryState = {
  diseaseHistoryByPatientLoaded: false,
  status: "idle",
  diseaseHistoryParams: initParams(),
  metaData: null,
};

export const diseaseHistorySlice = createSlice({
  name: "diseaseHistory",
  initialState:
    diseaseHistoriesAdapter.getInitialState<DiseaseHistoryState>(initialState),
  reducers: {
    setDiseaseHistoryParams: (state, action) => {
      state.diseaseHistoryByPatientLoaded = false;
      state.diseaseHistoryParams = {
        ...state.diseaseHistoryParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.diseaseHistoryByPatientLoaded = false;
      state.diseaseHistoryParams = {
        ...state.diseaseHistoryParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetDiseaseHistoryParams: (state) => {
      state.diseaseHistoryParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDiseaseHistoriesByPatientAsync.pending, (state) => {
      state.status = "pendingFetchDiseaseHistoriesByPatient";
    });
    builder.addCase(
      fetchDiseaseHistoriesByPatientAsync.fulfilled,
      (state, action) => {
        diseaseHistoriesAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.diseaseHistoryByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchDiseaseHistoriesByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchDiseaseHistoryByPatientAsync.pending, (state) => {
      state.status = "pendingFetchDiseaseHistoriesByPatient";
    });
    builder.addCase(
      fetchDiseaseHistoryByPatientAsync.fulfilled,
      (state, action) => {
        diseaseHistoriesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.diseaseHistoryByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchDiseaseHistoryByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setDiseaseHistoryParams,
  resetDiseaseHistoryParams,
  setMetaData,
  setPageIndex,
} = diseaseHistorySlice.actions;

export const diseaseHistorySelectors = diseaseHistoriesAdapter.getSelectors(
  (state: RootState) => state.diseaseHistory
);
