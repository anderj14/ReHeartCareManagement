import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CardiacCathStudy,
  CardiacCathStudyParams,
} from "../../../app/Models/cardiacCathStudy";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/store/configureStore";
import { Metadata } from "../../../app/Models/pagination";
import { getAxiosParams } from "../utils/axiosParamsUtils";

interface CardiacCathStudyState {
  cardiacCathStudyByPatientLoaded: boolean;
  status: string;
  cardiacCathStudyParams: CardiacCathStudyParams;
  metaData: Metadata | null;
}

const cardiacCathStudiesAdapter = createEntityAdapter<CardiacCathStudy>();

type ThunkArg = {
  patientId: number;
  cardiacCathStudyId?: number;
};

export const fetchCardiacCathStudiesByPatientAsync = createAsyncThunk<
  CardiacCathStudy[],
  number,
  { state: RootState }
>(
  "cardiacCathStudiesByPatient/fetchCardiacCathStudiesByPatient",
  async (patientId, thunkAPI) => {
    const params = getAxiosParams(
      thunkAPI.getState().cardiacCathStudy.cardiacCathStudyParams
    );
    try {
      const response = await agent.CardiacCathStudy.listByPatientId(
        params,
        patientId
      );
      thunkAPI.dispatch(setMetaData(response.metadata));
      if (response.length === 0) {
        return response;
      }
      return response.items;
    } catch (error: any) {
      console.error("Failed to fetch cardiac cath studies:", error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCardiacCathStudyByPatientAsync = createAsyncThunk<
  CardiacCathStudy,
  ThunkArg
>(
  "cardiacCathStudyByPatient/fetchCardiacCathStudyByPatient",
  async ({ patientId, cardiacCathStudyId }, thunkAPI) => {
    try {
      const cardiacCathStudyByPatient =
        await agent.CardiacCathStudy.detailsByPatientId(
          patientId,
          cardiacCathStudyId!
        );
      return cardiacCathStudyByPatient;
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

const initialState: CardiacCathStudyState = {
  cardiacCathStudyByPatientLoaded: false,
  status: "idle",
  cardiacCathStudyParams: initParams(),
  metaData: null,
};

export const cardiaccathstudySlice = createSlice({
  name: "cardiacCathStudyByPatient",
  initialState:
    cardiacCathStudiesAdapter.getInitialState<CardiacCathStudyState>(
      initialState
    ),
  reducers: {
    setCardiacCathStudyParams: (state, action) => {
      state.cardiacCathStudyByPatientLoaded = false;
      state.cardiacCathStudyParams = {
        ...state.cardiacCathStudyParams,
        ...action.payload,
      };
    },
    setCardiacCathStudy: (state, action) => {
      cardiacCathStudiesAdapter.upsertOne(state, action.payload);
      state.cardiacCathStudyByPatientLoaded = false;
    },
    setPageIndex: (state, action) => {
      state.cardiacCathStudyByPatientLoaded = false;
      state.cardiacCathStudyParams = {
        ...state.cardiacCathStudyParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetCardiacCathStudyParams: (state) => {
      state.cardiacCathStudyParams = initParams();
    },
    removeCardiacCathStudy: (state, action) => {
      cardiacCathStudiesAdapter.removeOne(state, action.payload);
      state.cardiacCathStudyByPatientLoaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardiacCathStudiesByPatientAsync.pending, (state) => {
      state.status = "pendingFetchCardiacCathStudiesByPatient";
    });
    builder.addCase(
      fetchCardiacCathStudiesByPatientAsync.fulfilled,
      (state, action) => {
        cardiacCathStudiesAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.cardiacCathStudyByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchCardiacCathStudiesByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
    builder.addCase(fetchCardiacCathStudyByPatientAsync.pending, (state) => {
      state.status = "pendingFetchCardiacCathStudyByPatient";
    });
    builder.addCase(
      fetchCardiacCathStudyByPatientAsync.fulfilled,
      (state, action) => {
        cardiacCathStudiesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
        state.cardiacCathStudyByPatientLoaded = true;
      }
    );
    builder.addCase(
      fetchCardiacCathStudyByPatientAsync.rejected,
      (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      }
    );
  },
});

export const {
  setCardiacCathStudyParams,
  setCardiacCathStudy,
  resetCardiacCathStudyParams,
  setMetaData,
  setPageIndex,
  removeCardiacCathStudy,
} = cardiaccathstudySlice.actions;

export const cardiacCathStudySelectors = cardiacCathStudiesAdapter.getSelectors(
  (state: RootState) => state.cardiacCathStudy
);
