import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Grade, GradeApi, GradeSearchRequest} from "../../client";

type GradeState = {
    total: number,
    items: Grade[],
    offset: number,
    loading: boolean
}

const initState: GradeState = {
    items: [],
    offset: 0,
    total: 0,
    loading: false
}

export const fetchGrades = createAsyncThunk("fetchGrade",
    async (request: GradeSearchRequest) => {
        const res = await gradeApi.gradeSearch(request)
        return res.data
    }
);

export const deleteGrade = createAsyncThunk("deleteGrade",
    async (id: number) => {
        const res = await gradeApi.gradeDelete(id)
        return res.data
    }
);

const gradeSlice = createSlice(
    {
        name: "router",
        initialState: initState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchGrades.fulfilled, (state, {payload}) => {
                    state.items = payload.items!
                    state.loading = false
                    state.offset = 0
                    state.total = payload.total!
                })
                .addCase(fetchGrades.pending, (state) => {
                    state.loading = true
                })
        }
    }
)


export const gradeApi = new GradeApi();

export default gradeSlice.reducer
