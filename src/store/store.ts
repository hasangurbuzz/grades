import {configureStore} from "@reduxjs/toolkit";
import routerReducer from "./router/routerReducer";
import modalReducer from "./modal/modalReducer";
import gradeReducer from "./api/gradeReducer";


const store = configureStore({
    reducer: {
        router: routerReducer,
        modal: modalReducer,
        grade: gradeReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store