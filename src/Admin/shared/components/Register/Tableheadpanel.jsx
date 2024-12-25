import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import moment from "moment";
import { getFilterOptions } from "../../services/apiregister/apiregister";

export default function Tableheadpanel(props) {
  const { newform, setglobalfilter, filtervalues, cusfilter, formdata, handleDownload } = props;

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues || {});
  const [filterOptions, setFilterOptions] = useState([]);

  const getOption = async (key) => {
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map((val) => ({
      label: val,
      value: key.format == "Date" ? moment(val).format("YYYY-MM-DD") : val,
    }));
    setFilterOptions(formatoption);
  };

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues((prev) => ({ ...prev, [key]: null }));
    cusfilter(key, null);
  };

  const Filter = (key) => { 
    const fieldKey = typeof key.field === 'string' 
      ? key.field 
      : key.field === extractSelectedEvents 
        ? "Selected_Event" 
        : key.field;

    return (
      <div onClick={() => getOption(key)}>
        <MultiSelect
          value={tempFilterValues[key.field]}
          options={filterOptions}
          optionLabel="label"
          className="p-column-filter text-sm w-full"
          // virtualScrollerOptions={{ itemSize: 50 }}
          maxSelectedLabels={1}
          filter
          onChange={(e) => 
            setTempFilterValues((prev) => ({ 
              ...prev, 
              [fieldKey]: e.value 
            }))
          }
          placeholder={`Select ${
            fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)
          }`}
          panelFooterTemplate={
            <div className="flex justify-between mt-2 p-2">
              <Button 
                label="Clear" 
                onClick={() => handleClearFilters(fieldKey)}  
                className="p-1 text-white bg-blue-500 w-[45%]" 
              />
              <Button 
                label="Apply" 
                onClick={() => handleApplyFilters(fieldKey)}  
                className="p-1 mx-1 text-white bg-blue-500 w-[45%]" 
              />
            </div>
          }
        />
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Registrations
        </h2>
      </div>
      
       <input 
          type="text" 
          placeholder="Search..." 
          className="px-4 py-2 border outline-none rounded-xl" 
          onChange={(e) => setglobalfilter(e.target.value)} 
        />

      {/* <div className="flex gap-x-2 gap-2 flex-wrap"> */}
        <div className="flex flex-wrap gap-2 items-center gap-x-2 *:border *:rounded-lg">
          <div>{Filter({ field: "Registered_Year" })}</div>
          <div>{Filter({ field: "Eventname" })}</div> 
          <div onClick={handleDownload} className= "group flex justify-center items-center gap-1 border rounded-lg p-2 px-5 cursor-pointer bg-green-700 text-white hover:text-green-700 hover:bg-white duration-150" ><div className="hidden lg:block">Export</div> <i class="fa-solid fa-download group-hover:animate-bounce text-xl"></i></div>
        </div>
      {/* </div> */}
      
    </div>
  );
}