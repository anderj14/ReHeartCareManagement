import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Echocardiogram,
  EchocardiogramParams,
} from "../../../app/Models/echocardiogram";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface EchocardiogramState {
  echocardiogramByPatientLoaded: boolean;
  status: string;
  EchocardiogramParams: EchocardiogramParams;
  metaData: Metadata | null;
}

const echocardiogramsAdapter = createEntityAdapter<Echocardiogram>();

type ThunkArg = {
  patientId: number;
  echocardiogramId: number;
};

export const fetchEchocardiogramsByPatientAsync = createAsyncThunk<
  Echocardiogram[],
  number,
  { state: RootState }
>(
  "echocardiogramsByPatient/fetchEchocardiogramsByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().echocardiogram.EchocardiogramParams
    );
    try {
      const response = await agent.Echocardiogram.listByPatientId(
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

export const fetchEchocardiogramByPatientAsync = createAsyncThunk<
  Echocardiogram,
  ThunkArg
>(
  "echocardiogramByPatient/fetchEchocardiogramByPatient",
  async ({ patientId, echocardiogramId }, thunkAPI) => {
    try {
      const echocardiogramByPatient =
        await agent.Echocardiogram.detailsByPatientId(
          patientId,
          echocardiogramId!
        );
      return echocardiogramByPatient;
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

const initialState: EchocardiogramState = {
  echocardiogramByPatientLoaded: false,
  status: "idle",
  EchocardiogramParams: initParams(),
  metaData: null,
};

export const echocardiogramSlice = createSlice({
  name: "patient",
  initialState:
    echocardiogramsAdapter.getInitialState<EchocardiogramState>(initialState),
  reducers: {
    setEchocardiogramParams: (state, action) => {
      state.echocardiogramByPatientLoaded = false;
      state.EchocardiogramParams = {
        ...state.EchocardiogramParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.echocardiogramByPatientLoaded = false;
      state.EchocardiogramParams = {
        ...state.EchocardiogramParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetEchocardiogramParams: (state) => {
      state.EchocardiogramParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEchocardiogramsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchEchocardiogramsByPatientAsync";
    });
    builder.addCase(
      fetchEchocardiogramsByPatientAsync.fulfilled,
      (state, action) => {
        echocardiogramsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.echocardiogramByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchEchocardiogramsByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchEchocardiogramByPatientAsync.pending, (state) => {
      state.status = "pendingFetchEchocardiogramByPatientAsync";
    });
    builder.addCase(
      fetchEchocardiogramByPatientAsync.fulfilled,
      (state, action) => {
        echocardiogramsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.echocardiogramByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchEchocardiogramByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setEchocardiogramParams,
  resetEchocardiogramParams,
  setMetaData,
  setPageIndex,
} = echocardiogramSlice.actions;

export const echocardiogramSelectors = echocardiogramsAdapter.getSelectors(
  (state: RootState) => state.echocardiogram
);
