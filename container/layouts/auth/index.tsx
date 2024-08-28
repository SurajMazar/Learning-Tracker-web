import React, {PropsWithChildren} from 'react'
import {Col, Row} from "antd";
import Image from "next/image";
import AuthBg from '@/assets/icons/auth.svg'

const AuthLayout: React.FC<PropsWithChildren> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    return (
        <>
            <section className={'p-12 md:p-14 h-screen w-full bg-primary'}>
                <Row className={'justify-center h-full'}>
                    <Col xs={24} md={18}>
                        <Row gutter={[10,10]} className={'items-center h-full bg-white p-12 rounded-xl border-none '}>
                            <Col xs={24} lg={12} className={'hidden lg:block'}>
                                <Image src={AuthBg} height={300} width={300} className={'m-auto'} alt={'auth background image'} />
                            </Col>
                            <Col xs={24} lg={12}>
                                {children}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default AuthLayout
