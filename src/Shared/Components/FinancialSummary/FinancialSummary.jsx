import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function FinancialSummary(props) {
    const { toggleAccordion, openAccordions, setIsOpen, isOpen, setSelectedId, accordionItems, selectedItem } = props;
    return (
        <>
            <section className="max-w-[60rem] mx-auto px-5 my-10  ">
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
                                <div>
                                    <div className="overflow-x-auto cursor-pointer" onClick={() => { setSelectedId(item.id); setIsOpen(true); }}>
                                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                                            <thead>
                                                <tr className="bg-[#0571BC] text-white">
                                                    <th className="px-4 py-2 border">Event</th>
                                                    <th className="px-4 py-2 border">Expenses</th>
                                                    <th className="px-4 py-2 border">Income</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-[#898989] font-semibold'>
                                                    <td className="px-4 py-2 border">{item.event}</td>
                                                    <td className="px-4 py-2 border">{item.expenses}</td>
                                                    <td className="px-4 py-2 border">{item.income}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>
            {isOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-center">Details for {selectedItem.id}</h2>
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-[#0571BC] text-white">
                                    <th className="px-4 py-2 border">Event</th>
                                    <th className="px-4 py-2 border">Expenses</th>
                                    <th className="px-4 py-2 border">Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-[#898989]'>
                                    <td className="px-4 py-2 border">{selectedItem.event}</td>
                                    <td className="px-4 py-2 border">{selectedItem.expenses}</td>
                                    <td className="px-4 py-2 border">{selectedItem.income}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            className="mt-4 px-4 py-2 bg-[#E52E3D] hover:bg-[#882a32] text-white rounded"
                            onClick={() => {
                                setIsOpen(false);
                                setSelectedId(null);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FinancialSummary;
