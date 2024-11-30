import React from 'react';

function FinancialSummary(props) {
  const { openYear, groupedData, toggleYear, isLoading } = props;
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto my-6 px-5">
        <div className="animate-pulse">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#0670bd] text-white text-left">
                <th className="border px-4 py-2 h-10 bg-gray-300"></th>
                <th className="border px-4 py-2 h-10 bg-gray-300"></th>
                <th className="border px-4 py-2 h-10 bg-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-sm font-semibold text-gray-500">
                    <td className="border px-4 py-2 bg-gray-300 h-10"></td>
                    <td className="border px-4 py-2 bg-gray-300 h-10"></td>
                    <td className="border px-4 py-2 bg-gray-300 h-10"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-5 space-y-5">
      <p className="concert-one-regular text-center md:text-4xl text-2xl text-[#E52E3D] uppercase">Years</p>
      {Object.keys(groupedData)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="mb-4 border rounded shadow">
            <div className="flex justify-between items-center px-4 py-2 bg-[#f7f7f7] text-[#0670bd] cursor-pointer" onClick={() => toggleYear(year)}    >
              <h3 className="text-lg font-bold">{year}</h3>
              <span> <i className={`fa-solid fa-chevron-up  ${openYear === year ? 'rotate-0' : 'rotate-180'} duration-300`}></i></span>
            </div>
            {openYear === year && (
              <div className="p-4 bg-gray-50 overflow-hidden overflow-x-auto scrollbar-hide">
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
