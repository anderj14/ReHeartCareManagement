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
    const params = getAxiosParams(
      thunkAPI.getState().holterStudy.holterStudyParams
    );
    try {
      const response = await agent.HolterStudy.listByPatientId(
        params,
        patientId
      );

      if (response.metadata) {
        thunkAPI.dispatch(setMetadata(response.metadata));
      }
      
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
    setHolterStudy: (state, action) => {
      holterStudiesAdapter.upsertOne(state, action.payload);
      state.holterStudyByPatientLoaded = false;
    },
    ///////////////////////////// Additional Test Result /////////////////////////////
    setAdditionalTestResult: (state, action) => {
      const { holterStudyId, id } = action.payload;
      const holterStudy = state.entities[holterStudyId];
      if (holterStudy) {
        const index = holterStudy.additionalTestResults.findIndex(
          (testResult) => testResult.id === id
        );
        if (index !== -1) {
          holterStudy.additionalTestResults[index] = {
            ...holterStudy.additionalTestResults[index],
            ...action.payload,
          };
        } else {
          holterStudy.additionalTestResults.push(action.payload);
        }
      }
    },
    removeAdditionalTestResult: (state, action) => {
      const { holterStudyId, testId } = action.payload;
      const holterStudy = state.entities[holterStudyId];
      if (holterStudy && holterStudy.additionalTestResults) {
        state.entities[holterStudyId] = {
          ...holterStudy,
          additionalTestResults: holterStudy.additionalTestResults.filter(
            (testResult) => testResult.id !== testId
          )
        };
      }
      state.holterStudyByPatientLoaded = false;
    },
    ///////////////////////////// Clinical Evaluation /////////////////////////////
    setClinicalEvaluation: (state, action) => {
      const {holterStudyId, id} = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy) {
        const index = holterStudy.clinicalEvaluations.findIndex(
          (evaluation) => evaluation.id === id
        );

        if (index !== -1) {
          holterStudy.clinicalEvaluations[index] = {
            ...holterStudy.clinicalEvaluations[index],
            ...action.payload,
          };
        } else {
          holterStudy.clinicalEvaluations.push(action.payload);
        }
      }
    },
    removeClinicalEvaluation: (state, action) => {
      const {holterStudyId, evaluationId} = action.payload;
      const holterStudy = state.entities[holterStudyId];
      console.log(action.payload);
      if (holterStudy && holterStudy.clinicalEvaluations) {
        state.entities[holterStudyId] = {
          ...holterStudy,
          clinicalEvaluations: holterStudy.clinicalEvaluations.filter(
            (evaluation) => evaluation.id !== evaluationId
          ),
        };
      }
      state.holterStudyByPatientLoaded = false;
    },  
    ///////////////////////////// Patient Symptom /////////////////////////////
    setPatientSymptom: (state, action) => {
      const {holterStudyId, id} = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy) {
        const index = holterStudy.patientSymptoms.findIndex(
          (symptom) => symptom.id === id
        );

        if (index !== -1) {
          holterStudy.patientSymptoms[index] = {
            ...holterStudy.patientSymptoms[index],
            ...action.payload,
          };
        } else {
          holterStudy.patientSymptoms.push(action.payload);
        }
      }
    },
    removePatientSymptom: (state, action) => {
      const { holterStudyId, symptomId } = action.payload;
      const holterStudy = state.entities[holterStudyId];
    
      if (holterStudy && holterStudy.patientSymptoms) {
        state.entities[holterStudyId] = {
          ...holterStudy,
          patientSymptoms: holterStudy.patientSymptoms.filter(
            (symptom) => symptom.id !== symptomId
          ),
        };
      }
      state.holterStudyByPatientLoaded = false;
    },

    ///////////////////////////// Medication Administration /////////////////////////////

    setMedicationAdministration: (state, action) => {
      const { holterStudyId, id } = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy) {
        const index = holterStudy.medicationAdministrations.findIndex(
          (medication) => medication.id === id
        );

        if (index !== -1) {
          holterStudy.medicationAdministrations[index] = {
            ...holterStudy.medicationAdministrations[index],
            ...action.payload,
          };
        } else {
          holterStudy.medicationAdministrations.push(action.payload);
        }
      }
    },
    removeMedicationAdministration: (state, action) => {
      const { holterStudyId, medicationId } = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy && holterStudy.medicationAdministrations) {
        state.entities[holterStudyId] = {
          ...holterStudy,
          medicationAdministrations: holterStudy.medicationAdministrations.filter(
            (medication) => medication.id !== medicationId
          ),
        };
      }
      state.holterStudyByPatientLoaded = false;
    },  

    ///////////////////////////// Arrhythmia Event /////////////////////////////

    setArrhythmiaEvent: (state, action) => {
      const { holterStudyId, id } = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy) {
        const index = holterStudy.arrhythmiaEvents.findIndex(
          (event) => event.id === id
        );

        if (index !== -1) {
          holterStudy.arrhythmiaEvents[index] = {
            ...holterStudy.arrhythmiaEvents[index],
            ...action.payload,
          };
        } else {
          holterStudy.arrhythmiaEvents.push(action.payload);
        }
      }
    },
    removeArrhythmiaEvent: (state, action) => {
      const { holterStudyId, eventId } = action.payload;
      const holterStudy = state.entities[holterStudyId];

      if (holterStudy && holterStudy.arrhythmiaEvents) {
        state.entities[holterStudyId] = {
          ...holterStudy,
          arrhythmiaEvents: holterStudy.arrhythmiaEvents.filter(
            (event) => event.id !== eventId
          ),
        };
      }
      state.holterStudyByPatientLoaded = false;
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
    removeHolterStudy: (state, action) => {
      holterStudiesAdapter.removeOne(state, action.payload);
      state.holterStudyByPatientLoaded = false;
    }
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
  setHolterStudy,
  setAdditionalTestResult,
  removeAdditionalTestResult,
  setClinicalEvaluation,
  removeClinicalEvaluation,
  setMedicationAdministration,
  removeMedicationAdministration,
  setPatientSymptom,
  removePatientSymptom,
  setArrhythmiaEvent,
  removeArrhythmiaEvent,
  resetHolterStudyParams,
  removeHolterStudy,
  setMetadata,
  setPageIndex,
} = holterStudySlice.actions;

export const holterStudySelectors = holterStudiesAdapter.getSelectors(
  (state: RootState) => state.holterStudy
);
