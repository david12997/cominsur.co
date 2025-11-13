import { createSlice } from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";
import { System } from "@/backend/model/system.model";

export type SystemforntendProps = {

    id: number;
    id_catalogue: number;
    owner: number;
    name: string;
    description: string;
    status: string;
    state: string;
    media: {
        ventana: string;
    };
    data: {
        desc: {
            text2: string;
        };
    };
}

export interface SystemsState {
    systems: SystemforntendProps[] | null;
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
        setSystems(state, action: PayloadAction<SystemforntendProps[]>) {
            state.systems = action.payload;
        }   
    },
});

export const { setSystems } = systemsSlice.actions;
export default systemsSlice.reducer;