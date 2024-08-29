import React from 'react'
import InfinitePaginationWrapper from "@/components/utils/InfinitePaginationWrapper";
import CourseService from "@/core/services/course/course.service";
import {CourseModelInterface} from "@/@types/model/course";
import {Col, Divider, Row} from "antd";
import CourseCard from "@/components/UI/Cards/Course";

const BrowseCourses: React.FC = () => {

    return (
        <>
            <h1 className="text-lg uppercase">Browse Courses</h1>
            <Divider className={'mt-5 mb-10'}/>
            <InfinitePaginationWrapper
                paginatorKey={'browse-courses-paginatorKey'}
                per_page={10}
                no_wrapper
                fetchData={CourseService.fetch}
                key={'browse-courses'}
                title={"Browse Course"}
                iterator={(data: Array<CourseModelInterface>) => {
                    return <>
                        <Row gutter={[12, 12]}>
                            {
                                data && data?.length ?
                                    data.map((item) => (
                                        <Col xs={24} md={8} key={item?.id}>
                                            <CourseCard course={item}/>
                                        </Col>
                                    )) : ''
                            }
                        </Row>
                    </>
                }}
            />
        </>
    )
}

export default BrowseCourses
