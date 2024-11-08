import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userData : null,
    value :  0 //testing perpose only
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData = null;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;