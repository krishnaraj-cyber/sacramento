import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteregister, getallregister, getfilterregister, getuniquevaluebyfield, saveRegisterForm, updateregisters, } from "../shared/services/apiregister/apiregister";
import Tablepagination from "../shared/others/Tablepagination";
import Addandeditform from "../shared/components/Donation/Addandeditform";
import Tableheadpanel from "../shared/components/Donation/Tableheadpanel";
import Tableview from "../shared/components/Donation/Tableview";
import { deletedonation, getfilterdonation } from "../shared/services/apiregister/apidonation";

export default function Donation() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visible, setVisible] = useState(false);
  const [formdata, setFormdata] = useState({ Games: [{}] });
  const [loading, setLoading] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [colfilter, setcolFilter] = useState({});
  const [globalfilter, setglobalfilter] = useState("");
  const [filtervalues, setfiltervalues] = useState([]);

  let isMounted = true;

  const getallevent = useCallback(async () => {
    setLoading(true);
    const res = await getfilterdonation({first, rows, globalfilter,  colfilter });
    setTabledata(res.resdata.sort((a, b) => b.id - a.id));
    setTotalRecords(res?.totallength);
    setLoading(false);
  }, [first, rows, globalfilter, colfilter]);

  useEffect(() => {
    if (isMounted) {
      getallevent();
    }
    return () => (isMounted = false);
  }, [first, rows, globalfilter, colfilter]);

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

  const handledelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "bg-red-500 ml-2 text-white p-2",
      rejectClassName: "p-2 outline-none border-0",
      accept: async () => {
        await deletedonation(id);
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
        <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />

        <Tableview
          tabledata={tabledata}
        //   tabledata={filteredData}
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
