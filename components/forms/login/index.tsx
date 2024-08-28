import React, {useEffect} from 'react'
import useAuth from "@/core/hooks/useAuth";
import {Button, Form, Input} from "antd";
import {LoginFormInterface} from "@/@types/form/login";

const LoginForm: React.FC = () => {

    /**
     * HOOKS
     */
    const [loginForm] = Form.useForm<LoginFormInterface>()
    const {handleLogin, auth, loginErrors} = useAuth(loginForm)


    return (
        <>
            <Form layout={'vertical'} form={loginForm} onFinish={handleLogin}>
                {/*EMAIL*/}
                <Form.Item
                    className={'mb-6'}
                    name={'email'}
                    label={'Email'}
                    rules={[
                        {
                            required: true,
                            message: "Email is required."
                        },
                        {
                            type: 'email',
                            message: 'Must be a valid email.',
                        },
                    ]}
                >
                    <Input size='large' type={'email'} placeholder={'Your email.'} className={'h-[50px]'}/>
                </Form.Item>

                {/*PASSWORD*/}
                <Form.Item
                    name={'password'}
                    label={'Password'}
                    rules={[
                        {
                            required: true,
                            message: "Password is required."
                        }
                    ]}
                >
                    <Input.Password size='large' placeholder={'Your password.'} className={'h-[50px]'}/>
                </Form.Item>

                <Button size={'large'} type={'primary'} htmlType={'submit'} loading={auth?.authenticating} className={'mt-4 min-w-[120px]'}>
                    Login
                </Button>
            </Form>
        </>
    )
}

export default LoginForm
