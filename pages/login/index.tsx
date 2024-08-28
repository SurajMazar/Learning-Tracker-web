import React from 'react'
import {CustomNextPage} from "@/@types/next";
import {ApplicationLayoutsMapping} from "@/settings/config/layout.config";
import LoginForm from "@/components/forms/login";

const Login: CustomNextPage = () => {
    return (
        <>
            <h1 className={'mb-8 text-3xl'}>Sign in</h1>
            <LoginForm/>
        </>
    )
}

Login.layout = ApplicationLayoutsMapping.auth
export default Login
