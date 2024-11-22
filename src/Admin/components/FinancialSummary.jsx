import React, { useCallback, useEffect, useState } from "react"
import Tablepagination from "../shared/others/Tablepagination";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Tableheadpanel from "../shared/components/FinancialSummary/Tableheadpanel";
import Tableview from "../shared/components/FinancialSummary/Tableview";
import Addandeditform from "../shared/components/FinancialSummary/Addandeditform";
import { deleteFinancialsum, getallFinancialsum, saveFinancialsum, updateFinancialsum } from "../shared/services/apifinancialsummary/apifinancialsummary";

export default function FinancialSummary() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visible, setVisible] = useState(false);
  const [formdata,setFormdata]=useState({Games :[{}]});
  const [loading, setLoading] = useState(false);
  const [tabledata, setTabledata]=useState([]);
  const [colfilter, setcolFilter] = useState({});
  const [globalfilter,setglobalfilter]=useState('');
  const [filtervalues,setfiltervalues]=useState([]);
  const [dataUrl, setDataUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  let isMounted = true;

  const getallGallery = useCallback(async ()=>{
    setLoading(true);
    const res= await getallFinancialsum({first,rows,globalfilter,colfilter});
    setLoading(false)
    setTabledata(res);
    setTotalRecords(res.length);
  },[first,rows,globalfilter,colfilter]);

  useEffect(()=>{
    if(isMounted){
      getallGallery();
    }
    return(()=>isMounted = false);
  },[first,rows,globalfilter,colfilter])

  const onPage = (page) => {
    setPage(page)
    setFirst(rows *(page -1));
    setRows(rows);
  };

  const handlechange = (e,name) => {
    if (e.target && e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormdata({...formdata, [e.target.name]: filesArray});

      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setDataUrl({src:reader.result,length : e.target.files.length});
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } 
    else if (e.target && !e.target.files){
      setFormdata({...formdata, [e.target.name]: e.target.value});
    } 
    else {
      const filesArray = e;
      setFormdata({...formdata, [name]: filesArray});
        
    }
  }

  const handlechangeGames = (value,index)=>{
    const updatedProducts = [...formdata.Games];
    updatedProducts[index][value.target.name] = value.target.value;
    setFormdata({ ...formdata, Games: updatedProducts });
  }

  const cusfilter = (field, value) => {
    setcolFilter(prev => ({ ...prev, [field]: {$in:value} }));
    setFirst(0)
  };

  const handlesave = async (e) => {
    e.preventDefault();
    setLoading(true);

    await saveFinancialsum(formdata,(progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    });

    toast.success("Successfully saved");
    getallGallery();
    setVisible(false);
    setLoading(false);
    setDataUrl(null)
    setProgress(0)
  };
  
  const newform=()=>{
    setFormdata({});
    setVisible(true)
  }
  
  const editfrom=(data)=>{
    setFormdata(data);
    setVisible(true)
  }

  const handleupdate=async (e)=>{
    e.preventDefault();
    setLoading(true)
    await updateFinancialsum(formdata)
    toast.success("Sucessfully updated")
    getallGallery()
    setVisible(false);
    setLoading(false);
    setDataUrl(null)
  }

  


  

  const handledelete = (id) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'bg-red-500 ml-2 text-white p-2',
      rejectClassName: 'p-2 outline-none border-0',
      accept:async ()=>{
        try {
          await deleteFinancialsum(id);
          toast.success("Successfully deleted");
          getallGallery();
        } catch (error) {
          toast.error("Failed to delete. Please try again.");
        }
      }
    });
  };

  const AddGame = ()=> {
    setFormdata(prevData => ({ ...prevData, Games: [...prevData.Games, {}] }));
  }

  const removeGame = (e,Index)=>{
    const filtterData = formdata.Games.filter((_, index) => index !== Index);
    setFormdata(prevData => ({ ...prevData, Games: filtterData }));
  }

  return(
    <div>
      <div className="bg-white border rounded-xl">
        <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />

        <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete} onPage={onPage} rows={rows} page={page}
          cusfilter={cusfilter} filtervalues={filtervalues} loading={loading} />

        <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} /> 
        <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} AddGame={AddGame} removeGame={removeGame}
          handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} handlechangeGames={handlechangeGames} dataUrl={dataUrl} setDataUrl={setDataUrl} progress={progress}/>
        <ConfirmDialog />


      </div>

    </div>
  )
}
