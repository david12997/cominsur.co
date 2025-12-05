import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {Reference} from "@/backend/model/reference.model";


export interface ReferencesState {
    references: Reference[] | null;
    offset: number;
    limit: number;
    loading: boolean;
    error: string | null;
    currentReference?: Reference | null;
    scrollDown: boolean;
}

const initialState: ReferencesState = {
    references: null,
    offset: 0,
    limit: 10,
    loading: false,
    error: null,
    currentReference: null,
    scrollDown: true, 
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
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
        ,setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setCurrentReference(state, action: PayloadAction<Reference | null>) {
            state.currentReference = action.payload;
        },
        setScrollDown(state, action: PayloadAction<boolean>) {
            state.scrollDown = action.payload;
        }
    },
});

export const { setReferences, setOffset, setLimit, setLoading, setError, setCurrentReference, setScrollDown } = referencesSlice.actions;
export default referencesSlice.reducer;