import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CardiologySurgery,
  CardiologySurgeryParams,
} from "../../app/Models/cardiologySurgery";
import { Metadata } from "../../app/Models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Patient } from "../../app/Models/patient";

interface CardiologySurgeryState {
  surgeriesLoaded: boolean;
  surgeryByPatientLoaded: boolean;
  status: string;
  cardiologySurgeryParams: CardiologySurgeryParams;
  metaData: Metadata | null;
  metaDataByPatient: Metadata | null;
  patientList: { id: number; patientName: string }[];
  patientLoaded: boolean;
}

const cardiologysurgeryAdapter = createEntityAdapter<CardiologySurgery>();

type ThunkAPI = {
  patientId: number;
  cardiologySurgeryId?: number;
};

function getAxiosParams(cardiologySurgeryParams: CardiologySurgeryParams) {
  const params = new URLSearchParams();
  params.append("pageIndex", cardiologySurgeryParams.pageIndex.toString());
  params.append("pageSize", cardiologySurgeryParams.pageSize.toString());
  params.append("sort", cardiologySurgeryParams.sort.toString());

  if (cardiologySurgeryParams.search)
    params.append("search", cardiologySurgeryParams.search);

  return params;
}

export const fetchCardiologySurgeriesAsync = createAsyncThunk<
  CardiologySurgery[],
  void,
  { state: RootState }
>("cardiologysurgeries/fetchCardiologySurgeriesAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().cardiologySurgery.cardiologySurgeryParams
  );
  try {
    const response = await agent.CardiologySurgery.list(params);
    thunkAPI.dispatch(setMetaData(response.metadata));
    if (response.length === 0) {
      return response;
    }
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCardiologySurgeryAsync = createAsyncThunk<
  CardiologySurgery,
  number
>(
  "cardiologysurgery/fetchCardiologySurgeryAsync",
  async (patientId, thunkAPI) => {
    try {
      const surgery = await agent.CardiologySurgery.details(patientId);
      console.log(surgery);
      return surgery;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCardiologySurgeriesByPatientAsync = createAsyncThunk<
  CardiologySurgery[],
  number,
  {state: RootState}
>(
  "cardiologySurgeriesByPatient/fetchCardiologySurgeriesByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().cardiologySurgery.cardiologySurgeryParams)
    try {
      const response = await agent.CardiologySurgery.listByPatientId(
        params, patientId
      );
      thunkAPI.dispatch(setMetaDataByPatient(response.metadata));
      if (response.length === 0) {
        return response;
      }
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPatientListAsync = createAsyncThunk<
  { id: number; patientName: string }[],
  void,
  { state: RootState }
>("patient/fetchPatientAsync", async (_, thunkAPI) => {
  try {
    const response = await agent.CardiologySurgery.listall();

    const transformedResponse = response.map((patient: any) => ({
      id: patient.id,
      patientName: patient.patientName,
    }));

    return transformedResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 8,
    sort: "patientName",
  };
}

export const surgerySlice = createSlice({
  name: "cardiologysurgery",
  initialState:
    cardiologysurgeryAdapter.getInitialState<CardiologySurgeryState>({
      surgeriesLoaded: false,
      surgeryByPatientLoaded: false,
      status: "idle",
      cardiologySurgeryParams: initParams(),
      metaData: null,
      metaDataByPatient: null,
      patientList: [],
      patientLoaded: false,
    }),
  reducers: {
    setCardiologySurgeryParams: (state, action) => {
      state.surgeriesLoaded = false;
      state.cardiologySurgeryParams = {
        ...state.cardiologySurgeryParams,
        ...action.payload,
      };
    },
    setCardiologySurgeryByPatientParams: (state, action) => {
      state.surgeryByPatientLoaded = false;
      state.cardiologySurgeryParams = {
        ...state.cardiologySurgeryParams,
        ...action.payload,
      };
    },
    setPageIndex: (state, action) => {
      state.surgeriesLoaded = false;
      state.cardiologySurgeryParams = {
        ...state.cardiologySurgeryParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setMetaDataByPatient: (state, action) => {
      state.metaDataByPatient = action.payload;
    },
    resetSurgeryParams: (state) => {
      state.cardiologySurgeryParams = initParams();
    },
    setSurgery: (state, action) => {
      cardiologysurgeryAdapter.upsertOne(state, action.payload);
      state.surgeriesLoaded = false;
    },
    removeSurgery: (state, action) => {
      cardiologysurgeryAdapter.removeOne(state, action.payload);
      state.surgeriesLoaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardiologySurgeriesAsync.pending, (state) => {
      state.status = "pendingFetchCardiologySurgeriesAsync";
    });
    builder.addCase(
      fetchCardiologySurgeriesAsync.fulfilled,
      (state, action) => {
        cardiologysurgeryAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.surgeriesLoaded = true;
      }
    );
    builder.addCase(fetchCardiologySurgeriesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    ///////
    builder.addCase(fetchCardiologySurgeryAsync.pending, (state) => {
      state.status = "pendingFetchCardiologySurgeryAsync";
    });
    builder.addCase(fetchCardiologySurgeryAsync.fulfilled, (state, action) => {
      cardiologysurgeryAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchCardiologySurgeryAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    ///////
    builder.addCase(fetchCardiologySurgeriesByPatientAsync.pending, (state) => {
      state.status = "pendingFetchCardiologySurgeriesByPatientAsync";
    });
    builder.addCase(
      fetchCardiologySurgeriesByPatientAsync.fulfilled,
      (state, action) => {
        cardiologysurgeryAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.surgeryByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchCardiologySurgeriesByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchPatientListAsync.pending, (state) => {
      state.status = "pendingFetchPatient";
    });
    builder.addCase(fetchPatientListAsync.fulfilled, (state, action) => {
      state.patientList = action.payload;
      state.status = "idle";
      state.patientLoaded = true;
    });
    builder.addCase(fetchPatientListAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  setCardiologySurgeryParams,
  setCardiologySurgeryByPatientParams,
  setPageIndex,
  setMetaData,
  setMetaDataByPatient,
  resetSurgeryParams,
  setSurgery,
  removeSurgery
} = surgerySlice.actions;
export const surgerySelectors = cardiologysurgeryAdapter.getSelectors(
  (state: RootState) => state.cardiologySurgery
);
