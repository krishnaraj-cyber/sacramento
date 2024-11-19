import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LoginPage from "../components/LoginPage";
import AdminRouter from "../Admin/Router/AdminRouter";
import ProtectedRoute from "../shared/services/Token/ProtectedRoute";


const Routers = () => {
    return (
        <BrowserRouter>
           <ScrollToTop/>
            <Routes>
                
                <Route path='/login' element={<LoginPage/>}/>
                <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['Admin']}><AdminRouter/></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};   
export default Routers;