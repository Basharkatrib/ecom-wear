import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { login, logout, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
