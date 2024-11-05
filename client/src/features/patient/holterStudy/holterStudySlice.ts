import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  HolterStudy,
  HolterStudyParams,
} from "../../../app/Models/holterStudy";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface HolterStudyState {
  holterStudyByPatientLoaded: boolean;
  status: string;
  holterStudyParams: HolterStudyParams;
  metaData: Metadata | null;
}

const holterStudiesAdapter = createEntityAdapter<HolterStudy>();

type ThunkArg = {
  patientId: number;
  holterStudyId: number;
};

export const fetchHolterStudiesByPatientAsync = createAsyncThunk<
  HolterStudy[],
  number,
  { state: RootState }
>(
  "holterStudyByPatient/fetchHolterStudiesByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().holterStudy.holterStudyParams);
    try {
      const response = await agent.HolterStudy.listByPatientId(params, patientId);
      thunkAPI.dispatch(setMetadata(response.metadata));
      if (response.length === 0) {
        return response;
      }
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchHolterStudyByPatientAsync = createAsyncThunk<
  HolterStudy,
  ThunkArg
>(
  "holterStudyByPatient/fetchHolterStudyByPatient",
  async ({ patientId, holterStudyId }, thunkAPI) => {
    try {
      const holterStudyByPatient = await agent.HolterStudy.detailsByPatientId(
        patientId,
        holterStudyId!
      );
      return holterStudyByPatient;
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

const initalState: HolterStudyState = {
  holterStudyByPatientLoaded: false,
  status: "idle",
  holterStudyParams: initParams(),
  metaData: null,
};

export const holterStudySlice = createSlice({
  name: "holterStudy",
  initialState:
    holterStudiesAdapter.getInitialState<HolterStudyState>(initalState),
  reducers: {
    setHolterStudyParams: (state, action) => {
      state.holterStudyByPatientLoaded = false;
      state.holterStudyParams = {
        ...state.holterStudyParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.holterStudyByPatientLoaded = false;
      state.holterStudyParams = {
        ...state.holterStudyParams,
        ...action.payload,
      };
    },
    setMetadata: (state, action) => {
      state.metaData = action.payload;
    },
    resetHolterStudyParams: (state) => {
      state.holterStudyParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHolterStudiesByPatientAsync.pending, (state) => {
      state.status = "pendingFetchHolterStudiesByPatient";
    });
    builder.addCase(
      fetchHolterStudiesByPatientAsync.fulfilled,
      (state, action) => {
        holterStudiesAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.holterStudyByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchHolterStudiesByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchHolterStudyByPatientAsync.pending, (state) => {
      state.status = "pendingFetchHolterStudyByPatient";
    });
    builder.addCase(
      fetchHolterStudyByPatientAsync.fulfilled,
      (state, action) => {
        holterStudiesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.holterStudyByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchHolterStudyByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setHolterStudyParams,
  resetHolterStudyParams,
  setMetadata,
  setPageIndex,
} = holterStudySlice.actions;

export const holterStudySelectors = holterStudiesAdapter.getSelectors(
  (state: RootState) => state.holterStudy
);
