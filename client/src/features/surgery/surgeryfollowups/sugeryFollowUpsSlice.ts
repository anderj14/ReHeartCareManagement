import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  SurgeryFollowUp,
  SurgeryFolowUpParams,
} from "../../../app/Models/SurgeryFollowUp";
import { RootState } from "../../../app/store/configureStore";
import agent from "../../../app/api/agent";
import { getAxiosParams } from "../../patient/utils/axiosParamsUtils";
import { Metadata } from "../../../app/Models/pagination";

interface SurgeryFollowUpState {
  surgeryFollowUpByCardiologySurgeryLodaded: boolean;
  surgeryFollowUpParams: SurgeryFolowUpParams;
  status: string;
  metaData: Metadata | null;
}

const surgeryFollowUpAdapter = createEntityAdapter<SurgeryFollowUp>();

export const fetchSugeryFollowUpsBySurgeryAsync = createAsyncThunk<
  SurgeryFollowUp[],
  number,
  { state: RootState }
>(
  "surgeryFollowUpBySurgery/fetchSurgeryFollowUpBySurgery",
  async (surgeryId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().surgeryFollowUp.surgeryFollowUpParams
    );
    try {
      const response = await agent.SurgeryFollowUp.listBySurgeryId(
        params,
        surgeryId
      );
      thunkAPI.dispatch(setMetaData(response.metadata));
      if (!response || response.length === 0) {
        return [];
      }
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 10,
    sort: "SurgeryName",
  };
}

const initialState: SurgeryFollowUpState = {
  surgeryFollowUpByCardiologySurgeryLodaded: false,
  surgeryFollowUpParams: initParams(),
  status: "idle",
  metaData: null,
};

export const surgeryFollowUpSlice = createSlice({
  name: "surgeryFollowUp",
  initialState:
    surgeryFollowUpAdapter.getInitialState<SurgeryFollowUpState>(initialState),
  reducers: {
    setSurgeryFollowUpParams: (state, action) => {
      state.surgeryFollowUpByCardiologySurgeryLodaded = false;
      state.surgeryFollowUpParams = {
        ...state.surgeryFollowUpParams,
        ...action.payload,
      };
    },
    setSurgeryFollowUp: (state, action) => {
      surgeryFollowUpAdapter.upsertOne(state, action.payload);
      state.surgeryFollowUpByCardiologySurgeryLodaded = false;
    },
    removeSurgeryFollowUp: (state, action) => {
      surgeryFollowUpAdapter.removeOne(state, action.payload);
      state.surgeryFollowUpByCardiologySurgeryLodaded = false;
    },
    setPageIndex: (state, action) => {
      state.surgeryFollowUpByCardiologySurgeryLodaded = false;
      state.surgeryFollowUpParams = {
        ...state.surgeryFollowUpParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetSurgeryFollowUpParams: (state) => {
      state.surgeryFollowUpParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSugeryFollowUpsBySurgeryAsync.pending, (state) => {
      state.status = "pendingSugeryFollowUpsBySurgery";
    });
    builder.addCase(
      fetchSugeryFollowUpsBySurgeryAsync.fulfilled,
      (state, action) => {
        surgeryFollowUpAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.surgeryFollowUpByCardiologySurgeryLodaded = true;
      }
    );
    builder.addCase(
      fetchSugeryFollowUpsBySurgeryAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setSurgeryFollowUpParams,
  setSurgeryFollowUp,
  removeSurgeryFollowUp,
  setMetaData,
  resetSurgeryFollowUpParams,
  setPageIndex,
} = surgeryFollowUpSlice.actions;

export const surgeryFollowUpSelector = surgeryFollowUpAdapter.getSelectors(
  (state: RootState) => state.surgeryFollowUp
);
