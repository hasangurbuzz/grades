import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const routerSlice = createSlice(
    {
        name: "router",
        initialState: {
            value: "/"
        },
        reducers: {
            set: (state, payload: PayloadAction<string>) => {
                state.value = payload.payload
            }
        }
    }
)

export const {set} = routerSlice.actions

export default routerSlice.reducer
