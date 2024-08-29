import {FileModelInterface} from "@/@types/model/file";
import {UserModelInterface} from "@/@types/model/user";

export interface CourseModelInterface {
    id: 1,
    title: string,
    slug: string,
    description: string,
    owner: UserModelInterface,
    thumbnail: FileModelInterface,
    total_course_contents: number
}
