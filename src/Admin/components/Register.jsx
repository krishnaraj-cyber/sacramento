import { useCallback, useEffect, useState } from "react";
import Tableview from "../shared/components/Register/Tableview";
import Tableheadpanel from "../shared/components/Register/Tableheadpanel";
import Tablepagination from "../shared/others/Tablepagination";
import Addandeditform from "../shared/components/Register/Addandeditform";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  deleteregister,
  getallregister,
  getfilterregister,
  getuniquevaluebyfield,
  saveRegisterForm,
  updateregisters,
} from "../shared/services/apiregister/apiregister";

export default function Register() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(false);
  const [uniquedata, setUniqueData] = useState([]);
  const [formdata, setFormdata] = useState({ Games: [{}] });
  const [loading, setLoading] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [colfilter, setcolFilter] = useState({});
  const [globalfilter, setglobalfilter] = useState("");
  const [filtervalues, setfiltervalues] = useState([]);

  let isMounted = true;

  const getallevent = useCallback(async () => {
    setLoading(true);
    const res = await getfilterregister({first, rows, globalfilter,  colfilter });
    setLoading(false);
    setTabledata(res.resdata.sort((a, b) => b.id - a.id));
    setTotalRecords(res?.totallength);
  }, [first, rows, globalfilter, colfilter]);

  useEffect(() => {
    if (isMounted) {
      getallevent();
    }
    return () => (isMounted = false);
  }, [first, rows, globalfilter, colfilter]);

  // const handleDownload = async () => {
  //   setLoading(true); 
  //   const allData = await getfilterregister({ first: 0, rows: 100000, globalfilter, colfilter, });  
  //   setLoading(false);
  
  //   if (allData?.resdata) { 
  //     const columns = [
  //       { key: "Reg_ID", header: "Reg_ID" },
  //       { key: "Eventname", header: "Event Name" },
  //       { key: "Date", header: "Event Date" },
  //       { key: "First_Name", header: "First Name" },
  //       { key: "Last_Name", header: "Last Name" },
  //       { key: "Email", header: "Email" },
  //       { key: "Phone_Number", header: "Phone_Number" },
  //       { key: "Entry_Fees", header: "Entry Fees" },
  //       { key: "created_at", header: "Registered Date" },
  //     ];
   
  //     const transformedData = allData.resdata.map(item => {
  //       const row = {};
  //       columns.forEach(col => {
  //         row[col.header] = item[col.key];
  //       });
  //       return row;
  //     }); 

  //     const worksheet = XLSX.utils.json_to_sheet(transformedData);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
   
  //     XLSX.writeFile(workbook, "EventData.xlsx");
  //   } else {
  //     console.error("No data available for download.");
  //   }
  // };


  const handleDownload = async () => {
    try {
      setLoading(true);
      const allData = await getfilterregister({ first: 0, rows: 100000, globalfilter, colfilter });
      
      if (!allData?.resdata?.length) {
        console.error("No data available for download.");
        return;
      }
  
      const columns = [
        { key: "S_No", header: "S.No" },
        { key: "Reg_ID", header: "Reg_ID" },
        { key: "Eventname", header: "Event Name" },
        { key: "Date", header: "Event Date" },
        { key: "First_Name", header: "First Name" },
        { key: "Last_Name", header: "Last Name" },
        { key: "Email", header: "Email" },
        { key: "Phone_Number", header: "Phone Number" },
        { key: "Entry_Fees", header: "Entry Fees" },
        { key: "created_at", header: "Registered Date" },
        { key: "Participant_Name", header: "Participant Name" },
        { key: "Selected_Event", header: "Selected Event" },
        { key: "Age", header: "Age" }
      ];
  
      const transformedData = allData.resdata.reduce((acc, item, index) => {
        const baseRow = columns.reduce((row, col) => {
          if (!col.key.startsWith("Participant_")) {
            row[col.header] = item[col.key] || "";
          }
          return row;
        }, {});
        
        if (Array.isArray(item.Participants) && item.Participants.length > 0) {
          const getAgeCategory = (age) => {
            const numAge = Number(age);
            if (isNaN(numAge)) return "";
            if (numAge <= 5 && numAge >= 1) return "Child (under 5)";
            if (numAge > 5 && numAge <= 17 ) return "Kid (between 5 and 17)";
            if (numAge > 17)return "Adult (18 and above)";
            return "Team"
          };
        
          return acc.concat(
            item.Participants.map((participant, pIndex) => ({
              ...baseRow,
              "S.No": acc.length + pIndex + 1,
              "Participant Name": participant.Participant_Name || "",
              "Selected Event": participant.Selected_Event || "",
              "Age": getAgeCategory(participant.Age)
            }))
          );
        }
        
        return acc.concat({
          ...baseRow,
          "S.No": acc.length + 1
        });
      }, []);
   
      const worksheet = XLSX.utils.json_to_sheet(transformedData);
       
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[address]) continue;
        
        worksheet[address].s = {
          font: { bold: true },
          alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
          border: { 
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          },
          fill: {
            fgColor: { rgb: "EEEEEE" }
          }
        };
      }
   
      const columnWidths = columns.map((col) => {
        const maxLength = Math.max(...transformedData.map((row) => (row[col.header] ? row[col.header].toString().length : 0)));
        return { wch: Math.min(maxLength + 2, 30) }; 
      });
      worksheet["!cols"] = columnWidths;
   
      worksheet['!rows'] = [{ hpt: 25 }]; 
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
      
      XLSX.writeFile(workbook, "EventData.xlsx");
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const onPage = (page) => {
    setPage(page);
    setFirst(rows * (page - 1));
    setRows(rows);
  };

  const cusfilter = (field, value) => {
    setcolFilter((prev) => ({ ...prev, [field]: { $in: value } }));
    setFirst(0);
  };

  const handlechange = (e, name) => {
    if (e.target && e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormdata({ ...formdata, [e.target.name]: filesArray });
    } else if (e.target && !e.target.files) {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    } else {
      const filesArray = e;
      setFormdata({ ...formdata, [name]: filesArray });
    }
  };

  const handlechangeGames = (value, index) => {
    const updatedProducts = [...formdata.Games];
    updatedProducts[index][value.target.name] = value.target.value;
    setFormdata({ ...formdata, Games: updatedProducts });
  };

  const handlesave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedFormData = {
      ...formdata,
      Category: selectedCategory, 
    };

    await saveRegisterForm(updatedFormData);
    toast.success("Successfully saved");
    getallevent();
    setVisible(false);
    setLoading(false);
  };

  const newform = () => {
    setFormdata({ Games: [{}] });
    setVisible(true);
  };

  const editfrom = (data) => {
    setFormdata(data);
    setVisible(true);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateregisters(formdata);
    toast.success("Sucessfully updated");
    getallevent();
    setVisible(false);
    setLoading(false);
  };

  const handleview = async (id) => { 
    setView(true);
    const res = await getuniquevaluebyfield(id); 
    setUniqueData(res) ;
  };
  
  const handledelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "bg-red-500 ml-2 text-white p-2",
      rejectClassName: "p-2 outline-none border-0",
      accept: async () => {
        await deleteregister(id);
        toast.success("Sucessfully deleted");
        getallevent();
      },
    });
  };

  const handleBulkMail = () => {
    setFormdata(data);
    setVisible(true);
  };

  const AddGame = () => {
    setFormdata((prevData) => ({
      ...prevData,
      Games: [...prevData.Games, {}],
    }));
  };

  const removeGame = (e, Index) => {
    const filtterData = formdata.Games.filter((_, index) => index !== Index);
    setFormdata((prevData) => ({ ...prevData, Games: filtterData }));
  };

  return (
    <div>
      <div className="bg-white border rounded-xl">
        <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} filtervalues={filtervalues} cusfilter={cusfilter} formdata={formdata} handleDownload={handleDownload} />

        <Tableview
          tabledata={tabledata}
          totalRecords={totalRecords}
          first={first}
          editfrom={editfrom}
          handledelete={handledelete}
          onPage={onPage}
          rows={rows}
          page={page}
          cusfilter={cusfilter}
          filtervalues={filtervalues}
          loading={loading}
          handleBulkMail={handleBulkMail}
          handleview={handleview}
          view={view}
          setView={setView}
          uniquedata={uniquedata}
        />

        <Tablepagination
          page={page}
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPage={onPage}
        />
        <Addandeditform
          visible={visible}
          setVisible={setVisible}
          loading={loading}
          formdata={formdata}
          setFormdata={setFormdata}
          AddGame={AddGame}
          removeGame={removeGame}
          handlechange={handlechange}
          handlesave={handlesave}
          handleupdate={handleupdate}
          handlechangeGames={handlechangeGames}
        />
        <ConfirmDialog />
      </div>
    </div>
  );
}
