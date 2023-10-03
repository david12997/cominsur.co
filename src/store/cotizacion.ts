import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface cotizacionTypes{
    referencias:any[],
    sistema:string,
    cliente:any[],
    state:string,
}

const initialState:cotizacionTypes ={
    referencias:[],
    sistema:"empty",
    cliente:[],
    state:'empty',
}


const CotizacionSlice = createSlice({

    name: 'cotizacion',
    initialState: initialState,
    reducers: {

        setState: (state, action: PayloadAction<string>) => {
            state.state = action.payload;
        },

        setSistema: (state, action: PayloadAction<string>) => {
            state.sistema = action.payload;
        },
        setReferencias: (state, action: PayloadAction<any[]>) => {

            state.referencias = action.payload;
        },
        setCliente: (state, action: PayloadAction<any[]>) => {

            state.cliente = action.payload;
        }
    }

});

export const {setState,setCliente,setReferencias,setSistema} = CotizacionSlice.actions;
export default CotizacionSlice.reducer;