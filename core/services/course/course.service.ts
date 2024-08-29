import {FetchQueryOptions} from "react-query";
import httpUtils from "@/core/utils/http.utils";
import {PageMetaModel} from "@/@types/model/page-meta";
import {CourseModelInterface} from "@/@types/model/course";

class CourseService {
    static async fetch(
        params: FetchQueryOptions,
        additional: Record<string, any> | undefined = undefined
    ) {
        const response: any = await httpUtils.get(
            'courses',
            params,
            additional
        )
        return {
            data: (response.data || []) as Array<CourseModelInterface>,
            meta: response.meta as PageMetaModel
        }

    }
}

export default CourseService
