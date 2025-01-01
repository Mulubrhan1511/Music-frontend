// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null, // Add refreshToken to the initial state
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        setRefreshToken(state, action) { // Add a reducer for setting the refresh token
            state.refreshToken = action.payload;
        },
        clearAccessToken(state) {
            state.accessToken = null;
            state.refreshToken = null; // Clear refresh token as well
        },
    },
});

export const { setAccessToken, setRefreshToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
