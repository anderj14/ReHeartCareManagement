import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Electrocardiogram,
  ElectrocardiogramParams,
} from "../../../app/Models/electrocardiogram";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface ElectrocardiogramState {
  electrocardiogramByPatientLoaded: boolean;
  status: string;
  electrocardiogramParams: ElectrocardiogramParams;
  metaData: Metadata | null;
}

const electrocardiogramsAdapter = createEntityAdapter<Electrocardiogram>();

type ThunkArg = {
  patientId: number;
  electrocardiogramId: number;
};

export const fetchElectrocardiogramsByPatientAsync = createAsyncThunk<
  Electrocardiogram[],
  number,
  { state: RootState }
>(
  "electrocardiogramsByPatient/fetchElectrocardiogramsByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().electrocardiogram.electrocardiogramParams
    );
    try {
      const response = await agent.Electrocardiogram.listByPatientId(
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

export const fetchElectrocardiogramByPatientAsync = createAsyncThunk<
  Electrocardiogram,
  ThunkArg
>(
  "electrocardiogramByPatient/fetchElectrocardiogramsByPatient",
  async ({ patientId, electrocardiogramId }, thunkAPI) => {
    try {
      const electricardiogramByPatient =
        await agent.Electrocardiogram.detailsByPatientId(
          patientId,
          electrocardiogramId!
        );
      return electricardiogramByPatient;
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

const initialState: ElectrocardiogramState = {
  electrocardiogramByPatientLoaded: false,
  status: "idle",
  electrocardiogramParams: initParams(),
  metaData: null,
};

export const electrocardiogramSlice = createSlice({
  name: "patient",
  initialState:
    electrocardiogramsAdapter.getInitialState<ElectrocardiogramState>(
      initialState
    ),
  reducers: {
    setElectrocardiogramParams: (state, action) => {
      state.electrocardiogramByPatientLoaded = false;
      state.electrocardiogramParams = {
        ...state.electrocardiogramParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.electrocardiogramByPatientLoaded = false;
      state.electrocardiogramParams = {
        ...state.electrocardiogramParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetElectrocardiogramParams: (state) => {
      state.electrocardiogramParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchElectrocardiogramsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchElectrocardiogramsByPatient";
    });
    builder.addCase(
      fetchElectrocardiogramsByPatientAsync.fulfilled,
      (state, action) => {
        electrocardiogramsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.electrocardiogramByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchElectrocardiogramsByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchElectrocardiogramByPatientAsync.pending, (state) => {
      state.status = "pendingFetchElectrocardiogramByPatient";
    });
    builder.addCase(
      fetchElectrocardiogramByPatientAsync.fulfilled,
      (state, action) => {
        electrocardiogramsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.electrocardiogramByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchElectrocardiogramByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setElectrocardiogramParams,
  resetElectrocardiogramParams,
  setMetaData,
  setPageIndex,
} = electrocardiogramSlice.actions;

export const electrocardiogramSelectors =
  electrocardiogramsAdapter.getSelectors(
    (state: RootState) => state.electrocardiogram
  );
