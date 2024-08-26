import {createSlice} from "@reduxjs/toolkit";
import {UserModelInterface} from "@/@types/model/user";

/**
 * INTERFACE FOR THE AUTH STORE
 */
export interface AuthStore {
    authUser?: UserModelInterface,
    authenticated: boolean,
    token: string | false,
    loadingAuthUser: boolean,
    authenticating: boolean
}

/**
 * INITIAL AUTH STORE STATE
 */
const initialState: AuthStore = {
    authenticated: false,
    loadingAuthUser: false,
    authenticating: false,
    token: false
}

/**
 * AUTH SLICE
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart(state) {
            state.authenticating = true
        },
        authSuccess(state, action) {
            state.authUser = action?.payload?.user
            state.token = action?.payload?.token
            state.authenticated = true
            state.authenticating = false
        },
        authFailure(state) {
            state.authUser = undefined
            state.authenticated = false
            state.authenticating = false
        },
        authUserFetchStart(state) {
            state.loadingAuthUser = true
        },
        authUserFetchSuccess(state, action) {
            state.authUser = action?.payload
            state.loadingAuthUser = false
        },
        authUserFetchFail(state) {
            state.authUser = undefined
            state.authenticated = false
            state.loadingAuthUser = false
        },
        reset(state) {
            state = {...initialState}
        },
        setToken(state, action) {
            state.token = action?.payload
            state.authenticated = true
        }
    }
})


export default authSlice
