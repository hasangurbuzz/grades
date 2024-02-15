import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type InfoPayload = {
    title: string,
    content: string,
    redirect: string | null,
    refresh: boolean
};

type InfoModal = {
    visible: boolean,
    title: string,
    content: string,
    redirect: {
        status: boolean,
        path: string | null,
        refresh: boolean
    }
}

const initModal: InfoModal = {
    visible: false,
    title: "",
    content: "",
    redirect: {
        status: false,
        path: "",
        refresh: false
    }
}

const modalSlice = createSlice(
    {
        name: "modal",
        initialState: {
            infoModal: initModal
        },
        reducers: {
            showInfo: (state, payload: PayloadAction<InfoPayload>) => {
                state.infoModal = {
                    ...state.infoModal,
                    visible: true,
                    title: payload.payload.title,
                    content: payload.payload.content,
                    redirect: {
                        status: payload.payload.redirect !== null,
                        path: payload.payload.redirect || "",
                        refresh: payload.payload.refresh
                    }
                }
            },
            hideInfo: (state) => {
                state.infoModal = {
                    ...state.infoModal,
                    visible: false,
                    title: "",
                    content: "",
                    redirect: {
                        status: false,
                        path: "",
                        refresh: false
                    }
                }
            }

        }
    }
)

export const {
    showInfo,
    hideInfo
} = modalSlice.actions

export default modalSlice.reducer
