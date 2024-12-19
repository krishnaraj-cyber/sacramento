import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import moment from "moment";
import { getFilterOptions } from "../../services/apiregister/apiregister";

export default function Tableheadpanel(props) {
  const { newform, setglobalfilter, filtervalues, cusfilter, formdata } = props;

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues || {});
  const [filterOptions, setFilterOptions] = useState({
    created_at: [],
    Eventname: [],
    Selected_Event: []
  });
 
  const extractSelectedEvents = () => { 
    const dataArray = Array.isArray(formdata) ? formdata : [formdata];
    const uniqueEvents = new Set();
    dataArray.forEach(item => {
      if (item && item.Participants && Array.isArray(item.Participants)) {
        item.Participants.forEach(participant => {
          if (participant && participant.Selected_Event) {
            uniqueEvents.add(participant.Selected_Event);
          }
        });
      }
    });
    return Array.from(uniqueEvents)
      .filter(event => event)
      .map(event => ({
        label: event,
        value: event
      }));
  };
    
    
    
 
const getOption = async (key) => {
  try {
    const filterOptionsResponse = await getFilterOptions(key.field);
    let formatOption = [];

    if (key.field === "created_at") {
      formatOption = filterOptionsResponse[key.field]
        .map((val) => moment(val).format("YYYY"))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((year) => ({
          label: year,
          value: year,
        }));
    } else if (key.field === "Selected_Event") { 
      formatOption = formdata
        ?.flatMap((item) =>
          item.Participants?.map((p) => p.Selected_Event).filter(Boolean)
        )
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((val) => ({
          label: val,
          value: val,
        }));
    } else {
      formatOption = filterOptionsResponse[key.field]?.map((val) => ({
        label: val,
        value: key.format === "Date" ? moment(val).format("YYYY-MM-DD") : val,
      }));
    }
 
    setFilterOptions((prev) => ({
      ...prev,
      [key.field]: formatOption,
    }));
  } catch (error) {
    console.error("Error fetching filter options:", error);
    setFilterOptions((prev) => ({
      ...prev,
      [key.field]: [],
    }));
  }
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
          value={tempFilterValues[fieldKey] || []}
          options={filterOptions[fieldKey] || []}
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
    <div className="block md:flex items-center justify-between px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Registrations
        </h2>
      </div>

      <div className="inline-flex gap-x-2">
        <div className="flex items-center gap-x-2 *:border *:rounded-lg">
          <div>{Filter({ field: "created_at" })}</div>
          <div>{Filter({ field: "Eventname" })}</div>
          {/* <div>{Filter({ field: "Selected_Event" })}</div> */}
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="px-4 py-2 border outline-none rounded-xl" 
          onChange={(e) => setglobalfilter(e.target.value)} 
        />
      </div>
    </div>
  );
}