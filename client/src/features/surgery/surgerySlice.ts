import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { CardiologySurgery, CardiologySurgeryParams } from "../../app/Models/cardiologySurgery";
import { Metadata } from "../../app/Models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";


interface CardiologySurgeryState {
    surgieriesLoaded: boolean;
    status: string;
    cardiologySurgeryParams: CardiologySurgeryParams;
    metaData: Metadata | null;
}

const cardiologysurgeryAdapter = createEntityAdapter<CardiologySurgery>();

function getAxiosParams(cardiologySurgeryParams: CardiologySurgeryParams) {
    const params = new URLSearchParams();
    params.append('pageIndex', cardiologySurgeryParams.pageIndex.toString());
    params.append('pageSize', cardiologySurgeryParams.pageSize.toString());
    params.append('sort', cardiologySurgeryParams.sort.toString());

    if (cardiologySurgeryParams.search) params.append('search', cardiologySurgeryParams.search);

    return params;
}

export const fetchCardiologySurgeriesAsync = createAsyncThunk<CardiologySurgery[], void, { state: RootState }>(
    'cardiologysurgeries/fetchCardiologySurgeriesAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().cardiologySurgery.cardiologySurgeryParams);
        try {
            const response = await agent.CardiologySurgery.list(params);
            thunkAPI.dispatch(setMetaData(response.metadata));
            if (response.length == 0) {
                return response;
            }
            console.log(response);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchCardiologySurgeryAsync = createAsyncThunk<CardiologySurgery, number>(
    'cardiologysurgery/fetchCardiologySurgeryAsync',
    async (patientId, thunkAPI) => {
        try {
            const surgery = await agent.CardiologySurgery.details(patientId);
            return surgery;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageIndex: 1,
        pageSize: 8,
        sort: 'patientName'
    }
}

export const surgerySlice = createSlice({
    name: 'cardiologysurgery',
    initialState: cardiologysurgeryAdapter.getInitialState<CardiologySurgeryState>({
        surgieriesLoaded: false,
        status: 'idle',
        cardiologySurgeryParams: initParams(),
        metaData: null
    }),
    reducers: {
        setCardiologySurgeryParams: (state, action) => {
            state.surgieriesLoaded = false;
            state.cardiologySurgeryParams = { ...state.cardiologySurgeryParams, ...action.payload };
        },
        setPageIndex: (state, action) => {
            state.surgieriesLoaded = false;
            state.cardiologySurgeryParams = { ...state.cardiologySurgeryParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetSurgeryParams: (state) => {
            state.cardiologySurgeryParams = initParams();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCardiologySurgeriesAsync.pending, (state) => {
            state.status = 'pendingFetchCardiologySurgeriesAsync'
        });
        builder.addCase(fetchCardiologySurgeriesAsync.fulfilled, (state, action) => {
            cardiologysurgeryAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.surgieriesLoaded = true;
        });
        builder.addCase(fetchCardiologySurgeriesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCardiologySurgeryAsync.pending, (state) => {
            state.status = 'pendingFetchCardiologySurgeryAsync';
        });
        builder.addCase(fetchCardiologySurgeryAsync.fulfilled, (state, action) => {
            cardiologysurgeryAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCardiologySurgeryAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    }
});

export const { setCardiologySurgeryParams, setPageIndex, setMetaData, resetSurgeryParams } = surgerySlice.actions;
export const surgerySelectors = cardiologysurgeryAdapter.getSelectors((state: RootState) => state.cardiologySurgery);