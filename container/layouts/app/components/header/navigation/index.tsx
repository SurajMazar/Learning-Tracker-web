
import React, {PropsWithChildren, useMemo} from 'react'
import {Button, Dropdown} from "antd";
import Link from "next/link";
import {UserOutlined} from "@ant-design/icons";

const Navigation: React.FC  = () => {

    return (
        <>
            <ul className={'flex gap-4 items-center w-full'}>
                <li>
                    <Dropdown menu={{
                        items:[
                            {
                                label: <Link href={'/browse-courses'}>
                                    Browse Courses
                                </Link>,
                                key: 'browse-courses'
                            },
                            {
                                key:'add_course',
                                label:(<Link href={'/course/create'}>
                                    Add Course
                                </Link>)
                            }
                        ]
                    }}>
                        <Button type={'link'}>
                            Courses
                        </Button>
                    </Dropdown>
                </li>
            </ul>
        </>
    )
}

export default Navigation
