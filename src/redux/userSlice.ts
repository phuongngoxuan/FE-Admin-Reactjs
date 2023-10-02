import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        iat: null,
        exp: null,
    },
    reducers: {
        update: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.iat = action.payload.iat;
            state.exp = action.payload.exp;
        },
        remove: (state) => {
            state.email = '';
            state.name = '';
            state.accessToken = '';
            state.refreshToken = '';
        },
    },
});

export const { update, remove } = userSlice.actions;
export default userSlice.reducer;
