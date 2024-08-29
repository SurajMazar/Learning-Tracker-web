import React from 'react'
import {CourseModelInterface} from "@/@types/model/course";
import {useQuery} from "react-query";
import CourseContentService from "@/core/services/course/course-content.service";
import useComputed from "@/core/hooks/useComputed";
import {Button, Collapse, Divider, Modal, Spin} from "antd";
import {ItemType} from "rc-collapse/es/interface";
import {EyeInvisibleOutlined, LoadingOutlined, SketchOutlined} from "@ant-design/icons";

const PreviewCourse: React.FC<{
    open: boolean,
    course: CourseModelInterface,
    handleClose: () => void
}> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {open, course, handleClose} = props

    /**
     * FETCH COURSE CONTENT
     */
    const {data, isLoading} = useQuery(
        [{}, `${course?.slug}-contents-${open ? 'open' : ''}`],
        (query) => {
            if (open) {
                return CourseContentService.fetch(query, course?.id)
            }
        })

    /**
     * COMPUTED PROPERTIES
     */
    const CollapseData = useComputed(() => {
        let formatted: ItemType[] = []
        if (data) {
            formatted = data?.data?.map(item => {
                return {
                    label: item?.title,
                    key: item?.id,
                    children: <>
                        <ul className={'flex flex-col justify-center gap-4 ml-8'}>
                            {item?.videos && item?.videos?.length ? item?.videos.map(video => (
                                    <li className={'text-primary underline'} key={video?.id}>
                                        {video?.title}
                                    </li>
                                ))
                                : <li>Content doesnt have any videos.</li>

                            }
                        </ul>
                    </>
                }
            })
        }
        return formatted;
    }, [data])

    return (
        <Modal open={open} onCancel={handleClose} title={course?.title} width={700}
               footer={[
                   <div key={'footer'} className={'flex gap-4 justify-end'}>
                       <Button type={'dashed'} icon={<EyeInvisibleOutlined/>} onClick={handleClose}>Close</Button>
                       <Button type={'primary'} icon={<SketchOutlined/>}>Enroll</Button>
                   </div>
               ]}
        >
            <h3 className={'mt-4 text-md font-bold text-black'}>Course Contents</h3>
            <Divider className={'mt-3 mb-6'} dashed/>
            {
                isLoading ?
                    <div className={'flex justify-center items-center h-[500px]'}>
                        <Spin indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/>
                    </div> : CollapseData && CollapseData?.length ? <Collapse  className={'mb-8'} items={CollapseData}/> :
                        <>No Course Content added.</>
            }
        </Modal>
    )
}

export default PreviewCourse
