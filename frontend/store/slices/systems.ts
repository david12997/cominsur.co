import { createSlice } from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";
import { System } from "@/backend/model/system.model";


export interface SystemsState {
    systems: System[] | null;
    loading: boolean;
    error: string | null;
    currentSystem: string |  number | null;
}

const initialState: SystemsState = {
    systems: null,
    loading: false,
    error: null,
    currentSystem: "todos",
};

export const systemsSlice = createSlice({
    name: "systems",
    initialState,
    reducers: {
        setSystems(state, action: PayloadAction<System[]>) {
            state.systems = action.payload;
        },
        setCurrentSystem(state, action: PayloadAction<string>) {
            state.currentSystem = action.payload;
        }
    },
});

export const { setSystems, setCurrentSystem } = systemsSlice.actions;
export default systemsSlice.reducer;