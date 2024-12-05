
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import { getFilterOptions } from '../../services/apigallery/apigallery';
import apiurl from '../../../../Shared/services/apiendpoint/apiendpoint';

const Tableview = (props) =>{
  const {tabledata,editfrom,handledelete,cusfilter,onPage,first,rows, page, filtervalues, loading}=props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions,setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button onClick={()=>editfrom(rowData)} className="inline-flex items-center text-md font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button onClick={()=>handledelete(rowData?.id)} className="inline-flex items-center text-md font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    )
  }

  const image = (rowData,meta) => {
    const image = rowData.Image.split(',');
    const firstimage = image[0]
    return (
      <>
        {rowData.Image?
          (<div className="flex gap-4 ">
            <img src={`${apiurl()}/${firstimage}`}  className='rounded-lg h-[100px] w-[150px] object-cover' />
          </div> ):( <div className="flex gap-4 "><img src="/assets/images/Gallery/noimg.png" alt="No image available" className="rounded-lg h-[100px] w-[150px] object-contain" /></div> )
        }
      </>
    )
  }

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key)=>{
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map( val =>({ label:val,value: key.format == "Date"? moment(val).format('YYYY-MM-DD') :val}));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div onClick={()=>getOption(key)}>
      <MultiSelect value={tempFilterValues[key.field]} options={filterOptions} optionLabel="value" className="p-column-filter" virtualScrollerOptions={{ itemSize: 43 }} maxSelectedLabels={1}
        filter onChange={(e) => setTempFilterValues(prev => ({ ...prev, [key.field]: e.value }))} placeholder={`Select ${key.field.charAt(0).toUpperCase() + key.field.slice(1)}`}
          panelFooterTemplate={
          <div className="flex justify-between mt-2 p-2">
            <Button label="Clear" onClick={() => handleClearFilters(key.field)} className="p-1 text-white bg-blue-500 w-[45%]" />
            <Button label="Apply" onClick={() => handleApplyFilters(key.field)} className="p-1 mx-1 text-white bg-blue-500 w-[45%]" />
          </div>
        } 
      />
    </div>
  );

  const columns = [
    {field: 'EventName', header: 'Event Name',filter:true, width : "120px"},
    {field: 'Year', header: 'Date',filter:true,width : "100px", sortable: true,},
    {field: 'Status', header: 'Status',filter:true,width : "120px"},
  ];

  return(
    <div >
      <div >
        <DataTable value={tabledata} scrollable scrollHeight="575px" loading={loading} className='!text-sm' stateStorage="session" stateKey="dt-state-demo-local" > 
          <Column header="Action" body={actionbotton} style={{ minWidth: "80px" }} />
          <Column header="Image" body={image} style={{ minWidth: "150px" }} />
          {columns.map((col, i) => (
            <Column key={i} field={col.field} header={col.header} style={{ minWidth: col.width }}
            filter={col.filter} sortable={col.sortable} filterElement={Filter(col)} showFilterMenuOptions={false} showApplyButton={false} showClearButton={false} showFilterMatchModes={false} 
            body={(rowData,meta) => { if(col.format =="Date"){ return moment(rowData[meta.field]).format("YYYY-MM-DD")} else if(col.format == "HTML"){return <div dangerouslySetInnerHTML={{ __html: rowData[meta.field] }} />} else {return rowData[meta.field]}} }  />
          ))}
        </DataTable>
      </div>
    </div>
  )
}

export default Tableview;