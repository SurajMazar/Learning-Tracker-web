import {FetchQueryOptions} from "react-query";
import httpUtils from "@/core/utils/http.utils";
import {PageMetaModel} from "@/@types/model/page-meta";
import {CourseContentModelInterface} from "@/@types/model/course-content";

class CourseContentService {
    static async fetch(
        params: FetchQueryOptions,
        course_id: number,
        additional: Record<string, any> | undefined = undefined
    ) {
        const response: any = await httpUtils.get(
            `course-contents/${course_id}`,
            params,
            additional
        )
        return {
            data: (response.data || []) as Array<CourseContentModelInterface>,
            meta: response.meta as PageMetaModel
        }

    }
}

export default CourseContentService
