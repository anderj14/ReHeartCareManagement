import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { User } from "../../app/Models/user";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: JSON.parse(localStorage.getItem('user')!) || null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/login',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { ...user } = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/currentUser',
    async (_, thunkAPI) => {
        try {
            const userDto = await agent.Account.currentUser();
            const { ...user } = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            console.log(action.payload);
            throw action.payload;
        });
    }
});

export const { signOut, setUser } = accountSlice.actions;
export default accountSlice.reducer;
