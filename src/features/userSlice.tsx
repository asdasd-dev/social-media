import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../app/store';
import { SignupData, UserState, USER_STATUS, UserGuestState, UserUserState, UserAdminState, User, UserUpdateRequest, UserUpdateResponse } from './types';

const getUserObjectFromLocalStorage: () => User | null = () => {
    let localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
        return JSON.parse(localStorageUser);
    }
    else {
        return null;
    }
}

export const signup = createAsyncThunk(
    'user/signup', 
    async (data: SignupData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', data);
            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    })

export const signin = createAsyncThunk(
    'user/signin',
    async (data: {username: string, password: string}, thunkApi) => {

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', data);

            localStorage.setItem('user', JSON.stringify(response.data));

            // send x-access-token with all requests
            axios.defaults.headers.common["x-access-token"] = response.data.accessToken;

            return response.data;
        }
        catch (err) {
            const response = err.response;

            if (response.status >= 400) {
                return thunkApi.rejectWithValue(response.data);
            }
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data: UserUpdateRequest, thunkApi) => {
        try {
            const response = await axios.put<UserUpdateResponse>("http://localhost:8080/api/user", data);
            console.log(response.data);
            const updatedUserObject = getUserObjectFromLocalStorage();
            if (updatedUserObject) {
                updatedUserObject.email = response.data.email;
                updatedUserObject.avatar = response.data.avatar;
                updatedUserObject.about = response.data.about;
            }
            localStorage.setItem('user', JSON.stringify(updatedUserObject));
            return updatedUserObject;
        }
        catch (err) {
            const response = err.response;

            if (response.status >= 400) {
                return thunkApi.rejectWithValue(response.data);
            }
        }
    }
)

let initialState: UserState = {
    status: USER_STATUS.GUEST
}



let localStorageUserObject = getUserObjectFromLocalStorage();
if (localStorageUserObject) {
    initialState = {
        status: localStorageUserObject.roles.includes('ROLE_ADMIN') ? USER_STATUS.ADMIN : USER_STATUS.USER,
        user: localStorageUserObject as User
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('user');
            delete axios.defaults.headers.common["x-access-token"];
            return {
                status: USER_STATUS.GUEST
            } as UserGuestState
        }
    },
    extraReducers: builder => {
        builder.addCase(signin.fulfilled, (state, action) => {
            return {
                status: action.payload.roles.includes('ROLE_ADMIN') ? USER_STATUS.ADMIN : USER_STATUS.USER,
                user: action.payload as User
            }
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            if (state.status !== USER_STATUS.GUEST && action.payload) {
                state.user = action.payload;
            }
        })
    }
})

export default userSlice.reducer;

export const { logout } = userSlice.actions; 

export const getUser = () => (state: RootState) => state.user