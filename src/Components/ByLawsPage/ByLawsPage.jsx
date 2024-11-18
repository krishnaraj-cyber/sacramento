import React from 'react'
import ByLaws from '../../Shared/Components/ByLaws/ByLaws'
import AboutUs from '../../Shared/Components/About/AboutUs'

function ByLawsPage() {
    return (
        <>
            <section>
                <AboutUs title="By Laws" />
            </section>
            <section>
                <ByLaws />
            </section>
        </>
    )
}

export default ByLawsPage
