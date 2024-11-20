import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Patient, PatientParams } from "../../app/Models/patient";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Metadata } from "../../app/Models/pagination";
import { PatientStatus } from "../../app/Models/patientStatus";

interface PatientState {
  patientsLoaded: boolean;
  status: string;
  patientParams: PatientParams;
  metaData: Metadata | null;
  patientStatus: PatientStatus[];
  patientStatusLoaded: boolean;
}

const patientsAdapter = createEntityAdapter<Patient>();

function getAxiosParams(patientParams: PatientParams) {
  const params = new URLSearchParams();
  params.append("pageIndex", patientParams.pageIndex.toString());
  params.append("pageSize", patientParams.pageSize.toString());
  params.append("sort", patientParams.sort.toString());

  if (patientParams.search) params.append("search", patientParams.search);
  if (patientParams.statusId && patientParams.statusId > 0) {
    params.append("statusId", patientParams.statusId.toString());
  }

  return params;
}

export const fetchPatientsAsync = createAsyncThunk<
  Patient[],
  void,
  { state: RootState }
>("patient/fetchPatientsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().patient.patientParams);
  try {
    const response = await agent.Patient.list(params);
    if (response.length === 0) {
      return response;
    }
    thunkAPI.dispatch(setMetaData(response.metadata));
    return response.items;
  } catch (error: any) {
    console.error("Failed to fetch patients:", error);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchPatientAsync = createAsyncThunk<Patient, number>(
  "patient/fetchPatientAsync",
  async (patientId, thunkAPI) => {
    try {
      const patients = await agent.Patient.details(patientId);
      return patients;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPatientStatusAsync = createAsyncThunk<
  PatientStatus[],
  void,
  { state: RootState }
>("patient/fetchPatientStatusAsync", async (_, thunkAPI) => {
  try {
    const response = await agent.Patient.Statuslist();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 8,
    sort: "patientName",
    statusId: 0,
  };
}

const initialState: PatientState = {
  patientsLoaded: false,
  status: "idle",
  patientParams: initParams(),
  metaData: null,
  patientStatus: [],
  patientStatusLoaded: false,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState: patientsAdapter.getInitialState<PatientState>(initialState),
  reducers: {
    setPatientParams: (state, action) => {
      state.patientsLoaded = false;
      state.patientParams = { ...state.patientParams, ...action.payload };
    },
    setPageIndex: (state, action) => {
      state.patientsLoaded = false;
      state.patientParams = { ...state.patientParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetPatientParams: (state) => {
      state.patientParams = initParams();
    },
    setPatient: (state, action) => {
      patientsAdapter.upsertOne(state, action.payload);
      state.patientsLoaded = false;
    },
    removePatient: (state, action) => {
      patientsAdapter.removeOne(state, action.payload);
      state.patientsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatientsAsync.pending, (state) => {
      state.status = "pendingFetchPatients";
    });
    builder.addCase(fetchPatientsAsync.fulfilled, (state, action) => {
      patientsAdapter.setAll(state, action.payload);
      state.status = "idle",
      state.patientsLoaded = true;
    });
    builder.addCase(fetchPatientsAsync.rejected, (state, action) => {
      state.status = "idle";
      console.error("Fetch patients failed:", action.payload);
    });
    builder.addCase(fetchPatientAsync.pending, (state) => {
      state.status = "pendingFetchPatient";
    });
    builder.addCase(fetchPatientAsync.fulfilled, (state, action) => {
      patientsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchPatientAsync.rejected, (state, action) => {
      state.status = "idle";
      console.error("Fetch patient failed:", action.payload);
    });
    builder.addCase(fetchPatientStatusAsync.pending, (state) => {
      state.status = "pendingFetchStatus";
    });
    builder.addCase(fetchPatientStatusAsync.fulfilled, (state, action) => {
      state.patientStatus = action.payload;
      state.status = "idle";
      state.patientStatusLoaded = true;
    });
    builder.addCase(fetchPatientStatusAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  setPatientParams,
  resetPatientParams,
  setMetaData,
  setPageIndex,
  setPatient,
  removePatient,
} = patientSlice.actions;

export const patientSelectors = patientsAdapter.getSelectors(
  (state: RootState) => state.patient
);
