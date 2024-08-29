import React, {useState} from 'react'
import {CourseModelInterface} from "@/@types/model/course";
import {Button, Card, Divider} from "antd";
import Link from "next/link";
import {EditOutlined, EyeOutlined, FolderOpenOutlined, SketchOutlined} from "@ant-design/icons";
import PreviewCourse from "@/components/pages/browse-courses/preview-course";

const CourseCard: React.FC<{
    course: CourseModelInterface
}> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {course} = props

    /**
     * COMPONENT STATE
     */
    const [showPreview, setShowPreview] = useState(false)

    return (
        <>
            <Card
                className={'drop-shadow-sm'}
                cover={
                    <figure className={'overflow-hidden h-[250px]'}>
                        <img
                            className={'h-full w-full object-cover hover:scale-105 transition duration-300 ease-in'}
                            alt={course?.title}
                            src={course?.thumbnail?.file_url}
                        />
                    </figure>
                }
                actions={[
                    <Button type={'link'} key='edit-course' icon={<EditOutlined/>}>Edit</Button>,
                    <Button type={'dashed'} key='preview-course' icon={<EyeOutlined/>}
                            onClick={() => setShowPreview(true)}>Preview</Button>,
                    <Button type={'primary'} key='enroll-course' icon={<SketchOutlined/>}>Enroll</Button>
                ]}
            >
                <Card.Meta
                    title={<Link href={`/course/${course?.id}/details`}
                                 className={'!text-black text-center block'}
                                 title={course?.title}>{course?.title}</Link>}
                    description={
                        <>
                            <Divider dashed className={'mb-4 mt-2'}/>
                            <ul className={'flex gap-4 text-black select-none justify-center'}>
                                <li className={'flex gap-2 items-center w-1/2 '}>
                                    <FolderOpenOutlined/>
                                    <p className="m-0">Course contents</p>
                                    <p className={'bg-primary text-white text-[12px] font-extrabold h-[20px] min-w-[20px] flex justify-center items-center rounded-[8px]'}>{course?.total_course_contents ?? 0}</p>
                                </li>
                            </ul>
                        </>
                    }
                />
            </Card>

            <PreviewCourse open={showPreview} course={course} handleClose={() => setShowPreview(false)}/>
        </>
    )
}

export default CourseCard
