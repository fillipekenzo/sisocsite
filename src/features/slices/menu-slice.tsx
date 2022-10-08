import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MenuService from "../../services/menu-service/menu-service";
import { MenuModel } from "../models/menu-model";
import { RootState } from '../store';

interface Menu {
    menus: Array<MenuModel>,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';

}
const initialState: Menu = {
    menus: [
        {
            menuID: 0,
            nome: "string",
            navegarURL: "string",
            ativo: true,
            possuiMenu: true,
            submenus:[]
        }

    ],
    loading: 'idle'
};

export const getMenusPorPerfil = createAsyncThunk('menus/getMenusPorPerfil', async (perfilID: number) => {
    return MenuService.getByID(perfilID);
})

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder.addCase(getMenusPorPerfil.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(getMenusPorPerfil.fulfilled, (state, { payload }) => {
            state.menus = payload.data;
            state.loading = 'succeeded';
        })
        builder.addCase(getMenusPorPerfil.rejected, (state, action) => {
            state.loading = 'failed';
        })
    }

});


export const menuState = (state: RootState) => state.menu;

export default menuSlice.reducer;