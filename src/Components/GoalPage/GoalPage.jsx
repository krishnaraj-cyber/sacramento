import React from 'react'
import Goals from '../../Shared/Components/Goals/Goals'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper'
import AboutUs from '../../Shared/Components/About/AboutUs'
import VideoSwiper from '../../Shared/Components/VideoSwiper/VideoSwiper'
function GoalPage() {
    return (
        <>
            <AboutUs title="GOALS" />
            <VideoSwiper  />
            <SponsorSwiper />
        </>
    )
}
export default GoalPage
