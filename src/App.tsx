import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Students from "./pages/Students";
import Coaches from "./pages/Coaches";
import Statistics from "./pages/Statistics";
import EditActivity from "./pages/EditActivity";
import AddCoach from "./pages/AddCoach";
import EditCoach from "./pages/EditCoach";
import ViewCoach from "./pages/ViewCoach";
import ViewStudent from "./pages/ViewStudent";
import EditStudent from "./pages/EditStudent";
import ViewActivity from "./pages/ViewActivity";
import AddStudent from "./pages/AddStudent";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/add" element={<AddActivity />} />
            <Route path="/students" element={<Students />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
           
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path="/coaches/add" element={<AddCoach />} />
          <Route path="/coaches/:id" element={<ViewCoach />} />
          <Route path="/coaches/edit/:id" element={<EditCoach />} />
          <Route path="/students/:id" element={<ViewStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/activities/:id" element={<ViewActivity />} />
          <Route path="/students/add" element={<AddStudent />} />
        </Routes>
      </Router>
    </>
  );
}
