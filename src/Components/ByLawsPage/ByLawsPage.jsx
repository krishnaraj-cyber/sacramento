import React from 'react'
import ByLaws from '../../Shared/Components/ByLaws/ByLaws'
import AboutUs from '../../Shared/Components/About/AboutUs'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper'

function ByLawsPage() {
    return (
        <>
            <AboutUs title="By Laws" />
            <ByLaws />
            <SponsorSwiper />
        </>
    )
}

export default ByLawsPage
