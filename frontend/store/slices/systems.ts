import { createSlice } from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";
import { System } from "@/backend/model/system.model";


export interface SystemsState {
    systems: System[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: SystemsState = {
    systems: null,
    loading: false,
    error: null,
};

export const systemsSlice = createSlice({
    name: "systems",
    initialState,
    reducers: {
        setSystems(state, action: PayloadAction<System[]>) {
            state.systems = action.payload;
        }   
    },
});

export const { setSystems } = systemsSlice.actions;
export default systemsSlice.reducer;