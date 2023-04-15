import {configureStore} from "@reduxjs/toolkit";
import reloadReducer from './reloadSlice'
import dataGraphReducer from './dataGraphSlice'
export const store = configureStore({
    reducer: {
        reload: reloadReducer,
        dataGraph: dataGraphReducer
    }
})