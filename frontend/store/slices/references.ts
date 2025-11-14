import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {Reference} from "@/backend/model/reference.model";


export interface ReferencesState {
    references: Reference[] | null;
    offset: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: ReferencesState = {
    references: null,
    offset: 0,
    limit: 10,
    loading: false,
    error: null,
};
export const referencesSlice = createSlice({
    name: "references",
    initialState,
    reducers: {
        setReferences(state, action: PayloadAction<Reference[]>) {
            state.references = action.payload;
        },
        setOffset(state, action: PayloadAction<number>) {
            state.offset = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        }
    },
});

export const { setReferences, setOffset, setLimit } = referencesSlice.actions;
export default referencesSlice.reducer;