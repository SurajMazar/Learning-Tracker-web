import {VideoModelInterface} from "@/@types/model/video";

export interface CourseContentModelInterface {
    id: number,
    title: string,
    course_id: number,
    description: number | null,
    videos: Array<VideoModelInterface>
}
