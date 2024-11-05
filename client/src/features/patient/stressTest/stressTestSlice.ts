import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { StressTest, StressTestParams } from "../../../app/Models/stressTest";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface StressTestState {
  stressTestByPatientLoaded: boolean;
  status: string;
  stressTestParams: StressTestParams;
  metaData: Metadata | null;
}

const StressTestAdapter = createEntityAdapter<StressTest>();

type ThunkArg = {
  patientId: number;
  stressTestId: number;
};

export const fetchStressTestsByPatientAsync = createAsyncThunk<
  StressTest[],
  number,
  { state: RootState }
>("stressTest/fetchStressTestsByPatient", async (patientId, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().stressTest.stressTestParams
  );
  try {
    const response = await agent.StressTest.listByPatientId(params, patientId);
    thunkAPI.dispatch(setMetaData(response.metadata));
    if (response.length === 0) {
      return response;
    }
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchStressTestByPatientAsync = createAsyncThunk<
  StressTest,
  ThunkArg
>(
  "stressTest/fetchStressTestByPatient",
  async ({ patientId, stressTestId }, thunkAPI) => {
    try {
      const stressTest = await agent.StressTest.detailsByPatientId(
        patientId,
        stressTestId
      );
      return stressTest;
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

const initialState: StressTestState = {
  stressTestByPatientLoaded: false,
  status: "idle",
  stressTestParams: initParams(),
  metaData: null,
};

export const stressTestSlice = createSlice({
  name: "stressTest",
  initialState:
    StressTestAdapter.getInitialState<StressTestState>(initialState),
  reducers: {
    setStressTestParams: (state, action) => {
      state.stressTestByPatientLoaded = false;
      state.stressTestParams = {
        ...state.stressTestParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.stressTestByPatientLoaded = false;
      state.stressTestParams = {
        ...state.stressTestParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetStressTestParams: (state) => {
      state.stressTestParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStressTestsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchStressTestsByPatient";
    });
    builder.addCase(
      fetchStressTestsByPatientAsync.fulfilled,
      (state, action) => {
        StressTestAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.stressTestByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchStressTestsByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchStressTestByPatientAsync.pending, (state) => {
      state.status = "pendingFetchStressTestByPatient";
    });
    builder.addCase(
      fetchStressTestByPatientAsync.fulfilled,
      (state, action) => {
        StressTestAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.stressTestByPatientLoaded = true;
      }
    );
    builder.addCase(fetchStressTestByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const {
  setStressTestParams,
  resetStressTestParams,
  setMetaData,
  setPageIndex,
} = stressTestSlice.actions;

export const stressTestSelectors = StressTestAdapter.getSelectors(
  (state: RootState) => state.stressTest
);
