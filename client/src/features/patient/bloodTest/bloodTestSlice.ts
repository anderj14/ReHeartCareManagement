import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { BloodTest, BloodTestParams } from "../../../app/Models/bloodTest";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";

interface BloodTestState {
  bloodTestByPatientLoaded: boolean;
  status: string;
  bloodTestParams: BloodTestParams;
  metaData: Metadata | null;
}

const bloodTestsAdapter = createEntityAdapter<BloodTest>();

type ThunkArg = {
  patientId: number;
  bloodTestId?: number;
};

function getAxiosParams(bloodTestParams: BloodTestParams) {
  const params = new URLSearchParams();
  params.append("pageIndex", bloodTestParams.pageIndex.toString());
  params.append("pageSize", bloodTestParams.pageSize.toString());
  params.append("sort", bloodTestParams.sort.toString());
  return params;
}

export const fetchBloodTestsByPatientAsync = createAsyncThunk<
  BloodTest[],
  number,
  { state: RootState }
>(
  "bloodTestByPatient/fetchBloodTestsByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().bloodTest.bloodTestParams
    );
    try {
      const response = await agent.BloodTest.listByPatientId(params, patientId);
      thunkAPI.dispatch(setMetaData(response.metadata));
      return response.items;
    } catch (error: any) {
      console.error("Failed to fetch blood tests:", error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const fetchBloodTestByPatientAsync = createAsyncThunk<BloodTest, ThunkArg>(
  "bloodTestByPatient/fetchBloodTestByPatient",
  async ({ patientId, bloodTestId }, thunkAPI) => {
    try {
      const bloodTestByPatient = await agent.BloodTest.detailsByPatientId(
        patientId,
        bloodTestId!
      );
      return bloodTestByPatient;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export default fetchBloodTestByPatientAsync;

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 8,
    sort: "patientName",
  };
}

const initialState: BloodTestState = {
  bloodTestByPatientLoaded: false,
  status: "idle",
  bloodTestParams: initParams(),
  metaData: null,
};

export const bloodTestSlice = createSlice({
  name: "bloodTestByPatient",
  initialState: bloodTestsAdapter.getInitialState<BloodTestState>(initialState),
  reducers: {
    setBloodTestParams: (state, action) => {
      state.bloodTestByPatientLoaded = false;
      state.bloodTestParams = { ...state.bloodTestParams, ...action.payload };
    },
    setPageIndex: (state, action) => {
      state.bloodTestByPatientLoaded = false;
      state.bloodTestParams = { ...state.bloodTestParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetBloodTestParams: (state) => {
      state.bloodTestParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBloodTestsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchBloodTestsByPatient";
    });
    builder.addCase(
      fetchBloodTestsByPatientAsync.fulfilled,
      (state, action) => {
        bloodTestsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.bloodTestByPatientLoaded = true;
        // state.metaData = action.payload.metadata; // Asegúrate de que los metaData se asignen
      }
    );
    builder.addCase(fetchBloodTestsByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
      console.error("Fetch blood tests by patient failed", action.payload);
    });
    builder.addCase(fetchBloodTestByPatientAsync.pending, (state) => {
      state.status = "pendingFetchBloodTestsByPatient";
    });
    builder.addCase(fetchBloodTestByPatientAsync.fulfilled, (state, action) => {
      bloodTestsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
      state.bloodTestByPatientLoaded = true;
    });
    builder.addCase(fetchBloodTestByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
      console.error("Fetch blood test by patient failed", action.payload);
    });
  },
});

export const {
  setBloodTestParams,
  resetBloodTestParams,
  setMetaData,
  setPageIndex,
} = bloodTestSlice.actions;

export const bloodTestSelectors = bloodTestsAdapter.getSelectors(
  (state: RootState) => state.bloodTest
);
