import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Note, NoteParams } from "../../app/Models/note";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface NoteState {
    notesLoaded: boolean;
    status: string;
    noteParams: NoteParams;
}

const notesAdapter = createEntityAdapter<Note>();

function getAxiosParams(noteParams: NoteParams) {
    const params = new URLSearchParams();
    params.append('pageIndex', noteParams.pageIndex.toString());
    params.append('pageSize', noteParams.pageSize.toString());
    params.append('sort', noteParams.sort.toString());

    if (noteParams.search) params.append('search', noteParams.search);
    return params;
}

export const fetchNotesAsync = createAsyncThunk<Note[], void, { state: RootState }>(
    'notes/getchNotesAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().note.noteParams);
        try {
            const notes = await agent.Note.list(params!);
            return notes.data;
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

export const noteSlice = createSlice({
    name: 'note',
    initialState: notesAdapter.getInitialState<NoteState>({
        notesLoaded: false,
        status: 'idle',
        noteParams: initParams()
    }),
    reducers: {
        setNoteParams: (state, action) => {
            state.notesLoaded = false;
            state.noteParams = { ...state.noteParams, ...action.payload };
        },
        resetNoteParams: (state) => {
            state.noteParams = initParams();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotesAsync.pending, (state) => {
            state.status = 'pendingFetchNotes';
        });
        builder.addCase(fetchNotesAsync.fulfilled, (state, action) => {
            notesAdapter.setAll(state, action.payload);
            console.log(action.payload);
            
            state.status = 'idle';
            state.notesLoaded = true;
        });
        builder.addCase(fetchNotesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
})

export const { setNoteParams, resetNoteParams } = noteSlice.actions;
export const noteSelectors = notesAdapter.getSelectors((state: RootState) => state.note);