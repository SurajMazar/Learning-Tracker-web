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

const useAuth = () => {

    /**
     * HOOKS
     */
    const {auth} = useStore()
    const dispatch = useDispatch()
    const [loginErrors, setLoginError] = useState()

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
            /** REDIRECT TO DASHBOARD */
            await router.push('/')
        },
        onError(error) {
            setLoginError(error as any)
            dispatch(authSlice.actions.authFailure())
        }
    })

    /**
     * HANDLE LOGIN
     */
    const logout = async () => {
        dispatch(authSlice.actions.reset())
        await router.push('/login')
    }

    return {
        auth,
        handleLogin: loginMutation.mutate,
        handleLogout: logout,
        loginErrors
    }
}

export default useAuth
