import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function FinancialSummary(props) {
    const { data, openYear, groupedData, toggleYear } = props;
    return (
        <div className="w-full max-w-4xl mx-auto my-6">
      {Object.keys(groupedData)
        .sort((a, b) => b - a) 
        .map((year) => (
          <div key={year} className="mb-4 border rounded shadow">
            <div
              className="flex justify-between items-center px-4 py-2 bg-[#f7f7f7] text-[#0670bd] cursor-pointer"
              onClick={() => toggleYear(year)}
            >
              <h3 className="text-lg font-bold">{year}</h3>
              <span> <i className={`fa-solid fa-chevron-up  ${openYear === year ? 'rotate-0':'rotate-180'} duration-300`}></i></span>
            </div>
            {openYear === year && (
              <div className="p-4 bg-gray-50">
                <table className="w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-[#0670bd] text-white text-left">
                      <th className="border px-4 py-2">Event</th>
                      <th className="border px-4 py-2">Expenses</th>
                      <th className="border px-4 py-2">Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[year].map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100 text-sm font-semibold text-gray-500">
                        <td className="border px-4 py-2">{item.EventName}</td>
                        <td className="border px-4 py-2">{item.Expenses}</td>
                        <td className="border px-4 py-2">{item.Income}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default FinancialSummary;
