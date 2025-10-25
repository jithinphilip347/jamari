import React from "react";
import { MdOutlineKeyboardArrowDown, MdMenuOpen } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import User from "../../assets/images/user.jpg";

const Nav = ({ toggleSidebar, activeMenu }) => {
  return (
    <div id="Nav">
      <div className="NavMain">
        {/* Left Side: Menu Icon + Page Title */}
        <div className="ProfileSideNavBox">
          <div className="ToggleMenuBox" onClick={toggleSidebar}>
            <MdMenuOpen />
          </div>
          <div className="SideNavPageNameBox">
            <p>{activeMenu || "Dashboard"}</p>
          </div>
        </div>

        {/* Right Side: Notifications, Settings, Profile */}
        <div className="NavProfileBox">
          <div className="NotifiSettingBox">
            <div className="NotificationBox">
              <IoMdNotificationsOutline />
            </div>
            <div className="SettingsBox">
              <IoSettingsOutline />
            </div>
          </div>

          <div className="ProfileImgNameBox">
            <div className="ProfileImgBox">
              <img src={User} alt="User" />
            </div>
            <div className="NameBox">
              <p>Md Rasal</p>
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
