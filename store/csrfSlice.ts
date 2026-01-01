import { createSlice, type PayloadAction} from "@reduxjs/toolkit"

type CsrfState = {
    token: string | null;
}

const initialState: CsrfState = {
    token: null,
}

const csrfSlice = createSlice({
    name: "csrf",
    initialState,
    reducers: {
        setCsrfToken(state, action: PayloadAction<string | null>){
            state.token = action.payload ?? null;
        },
        clearCsrfToken(state){
            state.token = null;
        },
    },
})

export const csrfActions = csrfSlice.actions;
export default csrfSlice.reducer;