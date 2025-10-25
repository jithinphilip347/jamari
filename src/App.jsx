import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSideNav from "./components/navbar/LeftSideNav";
import Nav from "./components/navbar/Nav";
import Dashboard from "./pages/Dashboard";
import StaffManagement from "./pages/StaffManagement";
import SiteManagement from "./pages/SiteManagement";
import SiteAsign from "./pages/SiteAsign";
// import Category from "./pages/Category";
import Report from "./pages/Report";
import AddStaff from "./pages/AddStaff";
import EditStaff from "./pages/EditStaff";
import EditSite from "./pages/EditSite";
import EditSiteAssign from "./pages/EditSiteAssign";
// import EditReport from "./pages/EditReport";



function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Router>
      <div className={`admin-dashboard ${isCollapsed ? "collapsed" : ""}`}>
        <LeftSideNav isCollapsed={isCollapsed} />
        <div className="main-content">
          <Nav toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/staff-management" element={<StaffManagement />} />
              <Route path="/add-staff" element={<AddStaff />} />
                <Route path="/edit-staff" element={<EditStaff />} />
                <Route path="/edit-site" element={<EditSite />} />
                <Route path="/edit-stie-assign" element={<EditSiteAssign />} />
                 {/*<Route path="/edit-report" element={<EditReport />} /> */}

              <Route path="/site-management" element={<SiteManagement />} />
              <Route path="/site-assign" element={<SiteAsign />} />
              {/* <Route path="/category-management" element={<Category />} /> */}
              <Route path="/report" element={<Report />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

