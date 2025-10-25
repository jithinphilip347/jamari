import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuFolderTree,
} from "react-icons/lu";
import {
  RiLogoutCircleLine,
  RiUser3Line,
  RiBarChart2Line,
} from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import CompanyLogo from "../../assets/images/logo.png";

const LeftSideNav = ({ isCollapsed }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LuLayoutDashboard />, path: "/" },
    { name: "Staff Management", icon: <RiUser3Line />, path: "/staff-management" },
    { name: "Site Management", icon: <LuFolderTree />, path: "/site-management" },
    { name: "Inspection Schedule", icon: <LuClipboardList />, path: "/site-assign" },
    // { name: "Category Management", icon: <MdCategory />, path: "/category-management" },
    { name: "Report", icon: <RiBarChart2Line />, path: "/report" },
  ];

  return (
    <div id="LeftSideNav" className={isCollapsed ? "collapsed" : ""}>
      <div className="LeftSideNavMenuBox">
        <div className="LeftSideNavTopCenterBox">
          <div className="LeftSideNavTop">
            <div className="Logo">
              <img src={CompanyLogo} alt="Logo" />
            </div>
          </div>

          <div className="leftSideNavCenter">
            <div className="LeftSideNavMenu">
              {!isCollapsed && <p>Main Menu</p>}
            </div>

            <ul>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.icon}
                    {!isCollapsed && <p>{item.name}</p>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="LeftSideNavBottomBox">
          <ul>
            <li>
              <RiLogoutCircleLine />
              {!isCollapsed && <p>Logout</p>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideNav;

