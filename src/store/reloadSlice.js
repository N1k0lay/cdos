import {createSlice} from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: 'reload',
    initialState: {
        reload: false,
        interval: 0,
    },
    reducers: {
        reload(state, action) {
            state.reload = !state.reload
            // state.data = state;
        },
        interval(state, action) {
            console.log(state)
            console.log(action)
            state.interval = action.payload
        }
    }
})

export const {reload, interval} = reloadSlice.actions;
export default reloadSlice.reducer;