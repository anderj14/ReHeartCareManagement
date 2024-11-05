import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  PhysicalExamination,
  PhysicalExaminationParams,
} from "../../../app/Models/physicalExamination";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface PhysicalExaminationState {
  physicalExaminationByPatientLoaded: boolean;
  status: string;
  physicalExaminationParams: PhysicalExaminationParams;
  metaData: Metadata | null;
}

const physicalExaminationsAdapter = createEntityAdapter<PhysicalExamination>();

type ThunkArg = {
  patientId: number;
  physicalExaminationId?: number;
};

export const fetchPhysicalExaminationsByPatientAsync = createAsyncThunk<
  PhysicalExamination[],
  number,
  { state: RootState }
>(
  "physicalExaminationByPatient/fetchPhysicalExaminationsByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().physicalExamination.physicalExaminationParams
    );
    try {
      const response = await agent.PhysicalExamination.listByPatientId(
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

export const fetchPhysicalExaminationByPatientAsync = createAsyncThunk<
  PhysicalExamination,
  ThunkArg
>(
  "physicalExaminationByPatient/fetchPhysicalExaminationByPatient",
  async ({ patientId, physicalExaminationId }, thunkAPI) => {
    try {
      const physicalExaminationByPatient =
        await agent.PhysicalExamination.detailsByPatientId(
          patientId,
          physicalExaminationId!
        );
      return physicalExaminationByPatient;
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

const initialState: PhysicalExaminationState = {
  physicalExaminationByPatientLoaded: false,
  status: "idle",
  physicalExaminationParams: initParams(),
  metaData: null,
};

export const physicalExaminationSlice = createSlice({
  name: "physicalExamination",
  initialState:
    physicalExaminationsAdapter.getInitialState<PhysicalExaminationState>(
      initialState
    ),
  reducers: {
    setPhysicalExaminationParams: (state, action) => {
      state.physicalExaminationByPatientLoaded = false;
      state.physicalExaminationParams = {
        ...state.physicalExaminationParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.physicalExaminationByPatientLoaded = false;
      state.physicalExaminationParams = {
        ...state.physicalExaminationParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetPhysicalExaminationParams: (state) => {
      state.physicalExaminationParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPhysicalExaminationsByPatientAsync.pending,
      (state) => {
        state.status = "pendingFetchPhysicalExaminationsByPatient";
      }
    );
    builder.addCase(
      fetchPhysicalExaminationsByPatientAsync.fulfilled,
      (state, action) => {
        physicalExaminationsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.physicalExaminationByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchPhysicalExaminationsByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchPhysicalExaminationByPatientAsync.pending, (state) => {
      state.status = "pendingFetchPhysicalExaminationByPatient";
    });
    builder.addCase(
      fetchPhysicalExaminationByPatientAsync.fulfilled,
      (state, action) => {
        physicalExaminationsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.physicalExaminationByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchPhysicalExaminationByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setPhysicalExaminationParams,
  resetPhysicalExaminationParams,
  setMetaData,
  setPageIndex,
} = physicalExaminationSlice.actions;

export const physicalExaminationSelectors =
  physicalExaminationsAdapter.getSelectors(
    (state: RootState) => state.physicalExamination
  );
