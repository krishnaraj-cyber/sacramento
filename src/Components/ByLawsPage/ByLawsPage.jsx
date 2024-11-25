import React from 'react'
import ByLaws from '../../Shared/Components/ByLaws/ByLaws'
import AboutUs from '../../Shared/Components/About/AboutUs'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

function ByLawsPage() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <>
            <AboutUs title="By Laws" />
            <ByLaws  defaultLayoutPluginInstance={defaultLayoutPluginInstance}/>
            <SponsorSwiper />
        </>
    )
}

export default ByLawsPage
