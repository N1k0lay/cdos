import {createSlice} from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: 'reload',
    initialState: {
        reload: false,
        interval: 15, //Интервал в секундах
        mode: 'stop', //manual - ручная установка; auto - авто обновление; stop - отключить обновление
    },
    reducers: {
        reload(state) {
            state.reload = !state.reload
        },
        setInterval(state, action) {
            state.interval = action.payload
        },
        setMode(state, action) {
            state.mode = action.payload
            if(action.payload === 'auto') {
                state.interval = 15
            }
        },
        upIntervalSec(state, action) {
            state.interval += Number(action.payload);
        }
    }
})

export const {reload, setInterval, setMode, upIntervalSec} = reloadSlice.actions;
export default reloadSlice.reducer;