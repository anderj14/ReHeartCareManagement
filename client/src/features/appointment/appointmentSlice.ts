import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Appointment, AppointmentParams } from "../../app/Models/appointment";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Metadata } from "../../app/Models/pagination";

interface AppointmentState {
    appointmentsLoaded: boolean;
    status: string;
    appointmentParams: AppointmentParams;
    metaData: Metadata | null;
}

const appointmentsAdapter = createEntityAdapter<Appointment>();

function getAxiosParams(appointmentParams: AppointmentParams) {
    const params = new URLSearchParams();
    params.append('pageIndex', appointmentParams.pageIndex.toString());
    params.append('pageSize', appointmentParams.pageSize.toString());
    params.append('sort', appointmentParams.sort.toString());

    if (appointmentParams.search) params.append('search', appointmentParams.search);

    return params;
}

export const fetchAppointmentsAsync = createAsyncThunk<Appointment[], void, { state: RootState }>(
    'appointments/fetchAppointments',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().appointment.appointmentParams);
        try {
            const response = await agent.Appointment.list(params);
            thunkAPI.dispatch(setMetadata(response.metadata));
            if (response.length == 0) {
                return response;
            }
            console.log('appointments: ', response);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchAppointmentsCalendarAsync = createAsyncThunk<Appointment[], void, { state: RootState }>(
    'appointments/fetchAppointmentsCalendar',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Appointment.listCalendar();
            console.log('Appointments Calendar: ', response);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);



export const fetchAppointmentAsync = createAsyncThunk<Appointment, number>(
    'appointments/fetchAppointment',
    async (id, thunkAPI) => {
        try {
            const appointment = await agent.Appointment.details(id);
            return appointment;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

function initParams() {
    return {
        pageIndex: 1,
        pageSize: 15,
        sort: 'patientName'
    }
}

export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: appointmentsAdapter.getInitialState<AppointmentState>({
        appointmentsLoaded: false,
        status: 'idle',
        appointmentParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setAppointmentParams: (state, action) => {
            state.appointmentsLoaded = false;
            state.appointmentParams = { ...state.appointmentParams, ...action.payload };
        },
        setPageIndex: (state, action) => {
            state.appointmentsLoaded = false;
            state.appointmentParams = { ...state.appointmentParams, ...action.payload };
        },
        setMetadata: (state, action) => {
            state.metaData = action.payload;
        },
        resetAppointment: (state) => {
            state.appointmentParams = initParams();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAppointmentsAsync.pending, (state) => {
            state.status = 'pendingFetchAppointments';
        });
        builder.addCase(fetchAppointmentsAsync.fulfilled, (state, action) => {
            appointmentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.appointmentsLoaded = true;
        });
        builder.addCase(fetchAppointmentsCalendarAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAppointmentsCalendarAsync.pending, (state) => {
            state.status = 'pendingFetchAppointments';
        });
        builder.addCase(fetchAppointmentsCalendarAsync.fulfilled, (state, action) => {
            appointmentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.appointmentsLoaded = true;
        });
        builder.addCase(fetchAppointmentsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAppointmentAsync.pending, (state) => {
            state.status = 'pendingFetchAppointment';
        });
        builder.addCase(fetchAppointmentAsync.fulfilled, (state, action) => {
            appointmentsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.appointmentsLoaded = true;
        });
        builder.addCase(fetchAppointmentAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});

export const { setAppointmentParams, setPageIndex, setMetadata, resetAppointment } = appointmentSlice.actions;
export const appointmentSelectors = appointmentsAdapter.getSelectors((state: RootState) => state.appointment);