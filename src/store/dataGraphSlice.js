import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchDataGraph = createAsyncThunk(
    'dataGraph/fetchDataGraph',
    async function (link, {rejectWithValue}) {
        try {
            const response = await fetch(`http://localhost:3003/${link}`);
            if(!response.ok) {
                throw new Error('Server Error!');
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

const dataGraphSlice = createSlice({
    name: 'dataGraph',
    initialState: {
        data: {},
        status: null,
        error: null,
    },
    extraReducers: {
        [fetchDataGraph.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchDataGraph.fulfilled]: (state, action) => {
            state.status = 'resolved';
            if(JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
                state.data = action.payload;
            }
        },
        [fetchDataGraph.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        },
    }
})

export default dataGraphSlice.reducer;