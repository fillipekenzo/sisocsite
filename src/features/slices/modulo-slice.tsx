import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ModuloService from "../../services/modulo-service/modulo-service";
import { ModuloModel } from "../models/modulo-model";
import { RootState } from '../store';

interface Modulo {
    modulos: Array<ModuloModel>,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';

}
const initialState: Modulo = {
    modulos: [
        {
            moduloID: 0,
            nome: "string",
            navegarURL: "string",
            ativo: true,
            possuiMenu: true,
        }

    ],
    loading: 'idle'
};

export const getModulosPorPerfil = createAsyncThunk('modulos/getModulosPorPerfil', async (perfilID: number) => {
    return ModuloService.getByID(perfilID);
})

export const moduloSlice = createSlice({
    name: "modulo",
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder.addCase(getModulosPorPerfil.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(getModulosPorPerfil.fulfilled, (state, { payload }) => {
            state.modulos = payload.data;
            state.loading = 'succeeded';
        })
        builder.addCase(getModulosPorPerfil.rejected, (state, action) => {
            state.loading = 'failed';
        })
    }

});


export const moduloState = (state: RootState) => state.modulo;

export default moduloSlice.reducer;