import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../core/Main/Main";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import GoalPage from "../Components/GoalPage/GoalPage";
import FinancialPage from "../Components/FinancialSummaryPage/FinancialPage";
import YouthPage from "../Components/YouthForumPage.jsx/YouthPage";
import GalleryPage from "../Components/GalleryPage/GalleryPage";
import EventsPage from "../Components/EventsPage/EventsPage";
import TamilSchoolPage from "../Components/TamilSchoolPage/TamilSchoolPage";
import ByLawsPage from "../Components/ByLawsPage/ByLawsPage";
import LoginPage from "../components/LoginPage";
import AdminRouter from "../Admin/Router/AdminRouter";
import ProtectedRoute from "../shared/services/Token/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import FormPage from "../Components/FormPage/FormPage";
import Payment from "../Components/Payment/Payments";
import Payments from "../Components/Payment/Payments";

import ViewGalleryPage from "../Components/GalleryPage/ViewGalleryPage";
import RegistrationPage from "../Components/RegistrationPage";
import Registration from "../Shared/Components/Registration/Registration";
 

function Approuter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<Main />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/board-members" element={<About />} />
                    <Route path="/goals" element={<GoalPage />} />
                    <Route path="/financial-summary" element={<FinancialPage />} />
                    <Route path="/youth-forum" element={<YouthPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/tamil-schools" element={<TamilSchoolPage />} />
                    <Route path='/gallery-view/:Year' element={<ViewGalleryPage />} />
                    <Route path="/laws" element={<ByLawsPage />} />
                    <Route path="/forms" element={<FormPage />} />
                    <Route path="/register" element={<Registration />} />

                </Route>
                <Route path="/payment-page" element={<Payments />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['Admin']}><AdminRouter /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Approuter;