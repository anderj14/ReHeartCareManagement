import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { DiagnosticParams, Diagnostics } from "../../../app/Models/diagnostic";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface DiagnosticState {
  diagnosticByPatientLoaded: boolean;
  status: string;
  diagnosticParams: DiagnosticParams;
  metaData: Metadata | null;
}

const diagnosticsAdapter = createEntityAdapter<Diagnostics>();

type ThunkArg = {
  patientId: number;
  diagnosticId?: number;
};

export const fetchDiagnosticsByPatientAsync = createAsyncThunk<
  Diagnostics[],
  number,
  { state: RootState }
>("diagnostics/fetchDiagnosticsByPatient", async (patientId, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().diagnostic.diagnosticParams
  );
  try {
    const response = await agent.Diagnostic.listByPatientId(params, patientId);
    thunkAPI.dispatch(setMetaData(response.metadata));
    if (response.length === 0) {
      return response;
    }
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchDiagnosticByPatientAsync = createAsyncThunk<
  Diagnostics,
  ThunkArg
>(
  "diagnostics/pendingFetchDiagnosticByPatient",
  async ({ patientId, diagnosticId }, thunkAPI) => {
    try {
      const diagnostic = await agent.Diagnostic.detailsByPatientId(
        patientId,
        diagnosticId!
      );
      return diagnostic;
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

const initialState: DiagnosticState = {
  diagnosticByPatientLoaded: false,
  status: "idle",
  diagnosticParams: initParams(),
  metaData: null,
};

export const diagnosticSlice = createSlice({
  name: "diagnosticsByPatient",
  initialState:
    diagnosticsAdapter.getInitialState<DiagnosticState>(initialState),
  reducers: {
    setDiagnosticParams: (state, action) => {
      state.diagnosticByPatientLoaded = false;
      state.diagnosticParams = { ...state.diagnosticParams, ...action.payload };
    },
    setPageIndex: (state, action) => {
      state.diagnosticByPatientLoaded = false;
      state.diagnosticParams = { ...state.diagnosticParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetDiagnosticParams: (state) => {
      state.diagnosticParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDiagnosticsByPatientAsync.pending, (state) => {
      state.status = "pendingFetchDiagnosticsByPatient";
    });
    builder.addCase(
      fetchDiagnosticsByPatientAsync.fulfilled,
      (state, action) => {
        diagnosticsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.diagnosticByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchDiagnosticsByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchDiagnosticByPatientAsync.pending, (state) => {
      state.status = "pendingFetchDiagnosticByPatient";
    });
    builder.addCase(
      fetchDiagnosticByPatientAsync.fulfilled,
      (state, action) => {
        diagnosticsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.diagnosticByPatientLoaded = true;
      }
    );
    builder.addCase(fetchDiagnosticByPatientAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const {
  setDiagnosticParams,
  resetDiagnosticParams,
  setMetaData,
  setPageIndex,
} = diagnosticSlice.actions;

export const diagnosticSelectors = diagnosticsAdapter.getSelectors(
  (state: RootState) => state.diagnostic
);
