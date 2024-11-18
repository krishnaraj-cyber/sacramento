import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function FinancialSummary(props) {
    const { toggleAccordion, accordionItems, openAccordions, setIsOpen, isOpen, setSelectedId, selectedId } = props;


    return (
        <>
            <section className="max-w-[50rem] mx-auto px-5 my-10  ">
                <p className="text-center text-[#E52E3D] md:text-3xl text-2xl concert-one-regular my-5">YEARS</p>
                {accordionItems.map((item) => (
                    <div key={item.id} className="">
                        <button className="flex items-center w-full justify-between bg-gray-100 border-b-2 p-2 text-[#0571BC] font-bold" onClick={() => toggleAccordion(item.id)}   >
                            {item.id}
                            <span className="ml-2">
                                {openAccordions[item.id] ? (
                                    <FaChevronUp className="transition-transform duration-300" />
                                ) : (
                                    <FaChevronDown className="transition-transform duration-300" />
                                )}
                            </span>
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordions[item.id] ? 'max-h-96' : 'max-h-0'}`}   >
                            {openAccordions[item.id] && (
                                <div className="p-4 bg-gray-50 cursor-pointer" onClick={() => { setSelectedId(item.id); setIsOpen(true); }}  >   {item.content}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
                        <div className="p-4 bg-gray-50">   {accordionItems.find((item) => item.id === selectedId)?.content}
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => { setIsOpen(false); setSelectedId(null); }}  >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FinancialSummary;
