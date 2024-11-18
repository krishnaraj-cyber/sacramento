import React, { useState } from 'react'
import FinancialSummary from '../../Shared/Components/FinancialSummary/FinancialSummary'
import AboutUs from '../../Shared/Components/About/AboutUs';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
function FinancialPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const accordionItems = [
        { id: 2023, content: 'Financial data for 2023' },
        { id: 2022, content: 'Financial data for 2022' },
        { id: 2021, content: 'Financial data for 2021' },
    ];
    const [openAccordions, setOpenAccordions] = useState(() => {
        const initialState = {};
        if (accordionItems.length > 0) {
            initialState[accordionItems[0].id] = true;
        }
        return initialState;
    });
    const toggleAccordion = (id) => {
        setOpenAccordions((prevState) => ({
            ...prevState, [id]: !prevState[id],
        }));
    };
    return (
        <>
            <AboutUs title="FINANCIAL SUMMARY" />
            <FinancialSummary openAccordions={openAccordions} selectedId={selectedId} setSelectedId={setSelectedId} isOpen={isOpen} setIsOpen={setIsOpen} accordionItems={accordionItems} toggleAccordion={toggleAccordion} setOpenAccordions={setOpenAccordions} />
            <SponsorSwiper />
        </>
    )
}
export default FinancialPage
