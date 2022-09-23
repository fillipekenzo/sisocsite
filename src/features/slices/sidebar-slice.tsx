import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '../store';

interface Sidebar {
    sidebarShow: boolean,
    sidebarUnfoldable: boolean
}
const initialState: Sidebar = {
    sidebarShow: true,
    sidebarUnfoldable: false
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        show: (state, action) => {
            state.sidebarShow = action.payload;
        },
        unfoldable: (state, action) => {
            state.sidebarUnfoldable = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase('show', (state, action) => {
            state.sidebarShow = true;
        })

    }

});

export const { show, unfoldable } = sidebarSlice.actions;

export const sidebarState = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;