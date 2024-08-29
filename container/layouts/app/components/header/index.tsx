import React from 'react'
import {Avatar, Col, Dropdown, Layout, Row} from "antd";
import Link from "next/link";
import useAuth from "@/core/hooks/useAuth";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import Navigation from "@/container/layouts/app/components/header/navigation";

const AppHeader: React.FC = () => {

    /**
     * HOOKS
     */
    const {auth, handleLogout} = useAuth()

    return (
        <Layout.Header className={'bg-white shadow-sm'}>
            <section className={'max-w-[1200px] m-auto'}>
                <Row gutter={[10, 10]}>
                    <Col xs={24} md={3}>
                        <Link href={'/'}
                              className={'uppercase hover:bold hover:drop-shadow-sm text-md'}>
                            Learning Tracker
                        </Link>
                    </Col>
                    <Col xs={24} md={18}>
                        <Navigation/>
                    </Col>
                    <Col xs={24} md={3}>
                        <Dropdown
                            trigger={['click']}
                            menu={{
                                items: [
                                    {
                                        title: 'Profile',
                                        label: 'Profile',
                                        key: 'profile',
                                        icon: <UserOutlined/>
                                    },
                                    {
                                        title: 'Logout',
                                        label: 'Logout',
                                        key: 'logout',
                                        icon: <LogoutOutlined/>,
                                        onClick: handleLogout
                                    }
                                ]
                            }}
                        >
                            <div className="flex gap-2 items-center cursor-pointer">
                                <Avatar shape={'circle'} icon={<UserOutlined/>} className={'bg-primary text-white'}>
                                </Avatar>
                                <h3>{auth?.authUser?.firstName}</h3>
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </section>
        </Layout.Header>
    )
}

export default AppHeader
