import React from 'react'
import {CustomNextPage} from "@/@types/next";
import {ApplicationLayoutsMapping} from "@/settings/config/layout.config";
import BrowseCourses from "@/components/pages/browse-courses";

const BrowseCoursesPage: CustomNextPage  = () => {
    return (
        <>
            <BrowseCourses/>
        </>
    )
}

BrowseCoursesPage.layout = ApplicationLayoutsMapping.app
export default BrowseCoursesPage
