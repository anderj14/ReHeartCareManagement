import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Note, NoteParams, NoteStatus } from "../../app/Models/note";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Metadata } from "../../app/Models/pagination";

interface NoteState {
  notesLoaded: boolean;
  status: string;
  noteParams: NoteParams;
  metaData: Metadata | null;
  noteStatus: NoteStatus[];
  noteStatusLoaded: boolean;
}

const notesAdapter = createEntityAdapter<Note>();

function getAxiosParams(noteParams: NoteParams) {
  const params = new URLSearchParams();
  params.append("pageIndex", noteParams.pageIndex.toString());
  params.append("pageSize", noteParams.pageSize.toString());
  params.append("sort", noteParams.sort.toString());

  if (noteParams.search) params.append("search", noteParams.search);
  if (noteParams.notestatusId && noteParams.notestatusId > 0) {
    params.append("notestatusid", noteParams.notestatusId.toString());
  }

  return params;
}

export const fetchNotesAsync = createAsyncThunk<
  Note[],
  void,
  { state: RootState }
>("notes/fetchNotesAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().note.noteParams);
  try {
    const response = await agent.Note.list(params);
    if (response.length === 0) {
      return response;
    }
    thunkAPI.dispatch(setMetaData(response.metadata));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchNoteStatusAsync = createAsyncThunk<
  NoteStatus[],
  void,
  { state: RootState }
>("notes/fetchNoteStatusAsync", async (_, thunkAPI) => {
  try {
    const response = await agent.Note.statuslist();

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageIndex: 1,
    pageSize: 10,
    sort: "Title",
    notestatusId: 0,
  };
}

const initialState: NoteState = {
  notesLoaded: false,
  status: "idle",
  noteParams: initParams(),
  metaData: null,
  noteStatus: [],
  noteStatusLoaded: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState: notesAdapter.getInitialState<NoteState>(initialState),
  reducers: {
    setNoteParams: (state, action) => {
      state.notesLoaded = false;
      state.noteParams = { ...state.noteParams, ...action.payload };
    },
    setPageIndex: (state, action) => {
      state.notesLoaded = false;
      state.noteParams = { ...state.noteParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetNoteParams: (state) => {
      state.noteParams = initParams();
    },
    setNote: (state, action) => {
      notesAdapter.upsertOne(state, action.payload);
      state.notesLoaded = false;
    },
    removeNote: (state, action) => {
      notesAdapter.removeOne(state, action.payload);
      state.notesLoaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotesAsync.pending, (state) => {
      state.status = "pendingFetchNotes";
    });
    builder.addCase(fetchNotesAsync.fulfilled, (state, action) => {
      notesAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.notesLoaded = true;
    });
    builder.addCase(fetchNotesAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log("Fetch patients failed:", action.payload);
    });

    builder.addCase(fetchNoteStatusAsync.pending, (state) => {
      state.status = "pendingFetchStatus";
    });
    builder.addCase(fetchNoteStatusAsync.fulfilled, (state, action) => {
      state.noteStatus = action.payload;
      state.status = "idle";
      state.noteStatusLoaded = true;
    });
    builder.addCase(fetchNoteStatusAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  setNoteParams,
  resetNoteParams,
  setPageIndex,
  setMetaData,
  setNote,
  removeNote
} = noteSlice.actions;

export const noteSelectors = notesAdapter.getSelectors(
  (state: RootState) => state.note
);
