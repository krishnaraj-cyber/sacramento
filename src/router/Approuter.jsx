import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../core/Main/Main";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import ScrollToTop from "./ScroolToTop";
import GoalPage from "../Components/GoalPage/GoalPage";
import FinancialPage from "../Components/FinancialSummaryPage/FinancialPage";
import YouthPage from "../Components/YouthForumPage.jsx/YouthPage";
import GalleryPage from "../Components/GalleryPage/GalleryPage";
import EventsPage from "../Components/EventsPage/EventsPage";
import TamilSchoolPage from "../Components/TamilSchoolPage/TamilSchoolPage";
import ByLawsPage from "../Components/ByLawsPage/ByLawsPage";
function Approuter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes >
                <Route element={<Main />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/board-members" element={<About />} />
                    <Route path="/goals" element={<GoalPage />} />
                    <Route path="/financial-summary" element={<FinancialPage />} />
                    <Route path="/youth-forum" element={<YouthPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/tamil-schools" element={<TamilSchoolPage />} />
                    <Route path="/laws" element={<ByLawsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Approuter;