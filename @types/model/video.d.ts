import {FileModelInterface} from "@/@types/model/file";

export interface VideoModelInterface {
    id: number,
    title: string,
    course_content_id: number,
    description: string | null,
    video_file: FileModelInterface
}
