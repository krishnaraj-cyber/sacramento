import React, { useState } from 'react'
import FinancialSummary from '../../Shared/Components/FinancialSummary/FinancialSummary'
import AboutUs from '../../Shared/Components/About/AboutUs';
import { accordionItems } from '../../assets/Json/FinancialSummary';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
function FinancialPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = accordionItems.find((item) => item.id === selectedId);
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
            <FinancialSummary openAccordions={openAccordions} selectedId={selectedId} selectedItem={selectedItem} setSelectedId={setSelectedId} isOpen={isOpen} accordionItems={accordionItems} setIsOpen={setIsOpen}   toggleAccordion={toggleAccordion} setOpenAccordions={setOpenAccordions} />
            <SponsorSwiper />
        </>
    )
}
export default FinancialPage
