
import { Routes,Route, Navigate } from "react-router-dom";
import Adminmain from "../core/Adminmain";
import Dashboard from "../components/Dashboard";
import Event from "../components/Events";
import Register from "../components/Register";
import Gallery from "../components/Gallery";
import Sponsors from "../components/Sponsor";
import Boardmembers from "../components/Boardmembers";
import FinancialSummary from "../components/FinancialSummary";
import YouthForum from "../components/YouthForum";


const AdminRouter = () => {
  return (
    <>
       <Routes>
          <Route element={<Adminmain/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<Event />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/boardmembers" element={<Boardmembers />} />
            <Route path="/financial" element={<FinancialSummary />} />
            <Route path="/youthforum" element={<YouthForum />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          </Route>
      </Routes>
    </>
  )
}
export default AdminRouter;