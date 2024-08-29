import useStore from "@/core/hooks/useStore";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {LoginFormInterface} from "@/@types/form/login";
import AuthService from "@/core/services/auth.service";
import {setLocalStorage} from "@/core/utils/localstorage.utils";
import appConfig from "@/settings/config/app.config";
import authSlice from "@/core/store/slice/auth.slice";
import {useState} from "react";
import router from "next/router";
import useNotification from "@/core/hooks/useNotification";
import {FormInstance} from "antd";

const useAuth = (loginForm?: FormInstance<LoginFormInterface>) => {

    /**
     * HOOKS
     */
    const {auth} = useStore()
    const dispatch = useDispatch()
    const [loginErrors, setLoginError] = useState()
    const {notify} = useNotification()
    /**
     * Methods
     */
    const loginMutation = useMutation((data: LoginFormInterface) => {
        return AuthService.login(data)
    }, {
        onMutate() {
            dispatch(authSlice.actions.authStart())
        },
        async onSuccess(data) {
            /** SETTING THE LOCAL STORAGE */
            setLocalStorage(appConfig.auth_token, data?.token)
            /** STORING IN THE REDUX */
            dispatch(authSlice.actions.authSuccess(data))
            notify('Welcome', 'success', `Welcome to Learning Tracker ${data?.user?.firstName}`, 'top')
            /** REDIRECT TO DASHBOARD */
            await router.push('/')
        },
        onError(error: any) {
            setLoginError(error as any)
            if (error?.message) {
                if (loginForm) {
                    loginForm.setFields([
                        {
                            name: 'email',
                            errors: [error?.message]
                        }
                    ])
                }
                notify(error?.message, 'error')
            }
            dispatch(authSlice.actions.authFailure())
        }
    })

    /**
     * HANDLE LOGIN
     */
    const logout = async () => {
        dispatch(authSlice.actions.reset())
        localStorage.removeItem(appConfig.auth_token)
        notify('Success', 'success', 'You have been logged out.')
        await router.push('/login')
    }

    /**
     * FETCH AUTH USER
     */
    const {mutate: fetchAuthUser} = useMutation(['auth-user'], () => {
        dispatch(authSlice.actions.authUserFetchStart())
        return AuthService.fetchAuthUser()
    }, {
        onSuccess(data) {
            dispatch(authSlice.actions.authUserFetchSuccess(data?.user))
        },
        onError() {
            dispatch(authSlice.actions.authFailure())
        },
        retry: 0
    })

    return {
        auth,
        handleLogin: loginMutation.mutate,
        handleLogout: logout,
        loginErrors,
        fetchAuthUser
    }
}

export default useAuth
