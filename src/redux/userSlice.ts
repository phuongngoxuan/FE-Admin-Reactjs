import { createSlice } from '@reduxjs/toolkit';
const defaultState = {
    userInfo: {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        iat: null,
        exp: null,
    },
    pending: false,
    error: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        update: (state, action) => {
            state.userInfo.email = action.payload.email;
            state.userInfo.name = action.payload.name;
            state.userInfo.accessToken = action.payload.accessToken;
            state.userInfo.refreshToken = action.payload.refreshToken;
            state.userInfo.iat = action.payload.iat;
            state.userInfo.exp = action.payload.exp;
        },
        remove: (state) => {
            state.userInfo = defaultState.userInfo;
            state.pending = defaultState.pending;
        },
        callApiStart: (state) => {
            state.pending = true;
        },
        callApiSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.pending = false;
        },
        callApiError: (state) => {
            console.log('error');
            state.error = true;
            state.pending = false;
        },
    },
});

export const { update, remove, callApiStart, callApiSuccess, callApiError } = userSlice.actions;
export default userSlice.reducer;
