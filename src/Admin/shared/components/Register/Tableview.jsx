/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import moment from "moment-timezone";
import { getFilterOptions } from "../../services/apiregister/apiregister";
import apiurl from "../../../../Shared/services/apiendpoint/apiendpoint";
import { Dialog } from "primereact/dialog";

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, onPage, first, rows, page, filtervalues, loading, handleview, view, setView, uniquedata,   } = props;

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        {/* <button onClick={()=>editfrom(rowData)} className="inline-flex items-center text-md font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fa-regular fa-pen-to-square"></i>
          </button> */}
        <button onClick={() => handleview(rowData)} className="inline-flex items-center text-md font-medium text-blue-800 gap-x-1 decoration-2 " >
          <i class="fa-solid fa-eye"></i>
        </button>
        <button onClick={() => handledelete(rowData?.id)} className="inline-flex items-center text-md font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  };

  const image = (rowData) => {
    return (
      <div className="flex gap-4 ">
        <img src={`${apiurl()}/${rowData["Images"][0]}`} className="rounded-xl h-[100px] w-[150px] object-cover" />
      </div>
    );
  };

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues((prev) => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key) => {
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map((val) => ({
      label: val,
      value: key.format == "Date" ? moment(val).format("YYYY-MM-DD") : val,
    }));
    setFilterOptions(formatoption);
  };

  const Filter = (key) => (
    <div onClick={() => getOption(key)}>
      <MultiSelect
        value={tempFilterValues[key.field]}
        options={filterOptions}
        optionLabel="value"
        className="p-column-filter"
        virtualScrollerOptions={{ itemSize: 43 }}
        maxSelectedLabels={1}
        filter
        onChange={(e) => setTempFilterValues((prev) => ({ ...prev, [key.field]: e.value })) }
        placeholder={`Select ${ key.field.charAt(0).toUpperCase() + key.field.slice(1) }`}
        panelFooterTemplate={
          <div className="flex justify-between mt-2 p-2">
            <Button label="Clear" onClick={() => handleClearFilters(key.field)}  className="p-1 text-white bg-blue-500 w-[45%]" />
            <Button label="Apply" onClick={() => handleApplyFilters(key.field)}  className="p-1 mx-1 text-white bg-blue-500 w-[45%]" />
          </div>
        }
      />
    </div>
  );

  const gametitles = (rowData) => {
    if (rowData?.Game_Title && rowData?.Game_Title.length > 0) 
    { 
      return <div>{rowData.Game_Title}</div>;
    }
    return (
      rowData.Participants &&
      rowData.Participants.map((item, i) => (
        <span className="" key={i}>
          {item.Selected_Event},{" "}
        </span>
      ))
    );
  };

  const columns = [
    { field: "Eventname", header: "Title", filter: true, width: "200px" },
    { field: "Reg_ID", header: "Reg_ID", filter: true, width: "180px" },
    { field: "Registration_Date", header: "Reg Date", width: "120px", format: "Date", },
    { field: "First_Name", header: "First Name", filter: true, width: "150px" },
    { field: "Last_Name", header: "Last Name", filter: true, width: "150px" },
    { field: "Email", header: "Email ID", filter: true, width: "150px" },
    { field: "Phone_Number", header: "Phone Number", filter: true, width: "120px", },
    { field: "Payment_id", header: "Payment ID", width: "120px" },
    { field: "Payment_Status", header: "Payment Status", filter: true, width: "120px", },
    { field: "Entry_Fees", header: "Entry Fees", filter: true, width: "120px" },
    // { field: "Team_Name", header: "Team Name", filter: true, width: "200px" },
    // {field: gametitles, header: 'Game Title',filter:true,width : "200px"},
    // {field: 'Team_Members_Count', header: 'Team Members Count',filter:true,width : "150px"},
    // {field: 'Total_Amount', header: 'Entry Fees',width : "120px"}
    // {field: 'Willingness', header: 'Willingness',filter:true, width : "120px"},
    // {field: 'Number_Guests', header: 'Number of Guests',width : "150px"},
    // {field: 'Adults', header: 'Number of Adults',width : "150px"},
    // {field: 'Kids', header: 'Number of Kids',width : "150px"},
    // {field: 'Babes', header: 'Number of under5',width : "150px"},
  ];

  return (
    <>
      <section>
        <div>
          <DataTable
            value={tabledata}
            loading={loading}
            scrollable
            scrollHeight="575px"
            className="!text-sm"
            stateStorage="session"
            stateKey="dt-state-demo-local"
          >
            <Column header="Action" body={actionbotton}  style={{ minWidth: "80px" }} />
            <Column header="Events" body={gametitles} style={{ minWidth: "150px" }} />
            {columns.map((col, i) => (
              <Column
                key={i}
                field={col.field}
                header={col.header}
                style={{ minWidth: col.width }}
                filter={col.filter}
                filterElement={Filter(col)}
                showFilterMenuOptions={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                body={(rowData, meta) => {
                  if (col.format == "Date") {
                    return moment(rowData[meta.field]).format("YYYY-MM-DD");
                  } else if (col.format == "HTML") {
                    return (
                      <div dangerouslySetInnerHTML={{  __html: rowData[meta.field], }} />
                    );
                  } else {
                    return rowData[meta.field];
                  }
                }}
              />
            ))}
            <Column header="Number of Participants / Team" body={(rowData) => rowData.Participants?.length || 0} style={{ minWidth: "150px" }} />
          </DataTable>
        </div>
        <>
          <Dialog header={"User Detail"} visible={view} onHide={() => setView(false)} className="!w-full lg:!w-[40rem]" >
            <div className="w-full">
              <div>
                Number of Participants : {uniquedata?.Participants?.length}
              </div>
              <div className=" w-full">
                <table border="1" className="border divide-y mx-auto m-5">
                  <thead>
                    <tr className="divide-x *:px-4 *:p-2 bg-gray-100">
                      <th>S.No</th>
                      <th>Participant / Team</th>
                      <th>Sub-Event</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniquedata?.Participants &&
                      uniquedata?.Participants.map((data, i) => (
                        <tr key={i} className={`${ i % 2 == 1 ? "bg-gray-100/70" : "" } divide-x  *:px-4 *:p-2`} >
                          <td className="text-center">{i + 1}</td>
                          <td>{data.Participant_Name}</td>
                          <td>{data.Selected_Event}</td> 
                          
                          <td className="text-center">{data?.Age?.length > 0 ? `${data.Age}`:`Team` }</td> 
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Dialog>
        </>
      </section>
    </>
  );
};

export default Tableview;
