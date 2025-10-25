import React, { useState } from "react";
import { LuClipboardList, LuFolderTree } from "react-icons/lu";
import { RiUser3Line, RiSearchLine, RiFilterLine } from "react-icons/ri";
import { MdCategory, MdDeleteOutline } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";
import { FiEdit, FiEye } from "react-icons/fi";
import NoDataImage from "../assets/images/no-data.jpg"; 

const Dashboard = () => {
  const boxes = [
    { icon: <RiUser3Line />, title: "Staff Management" },
    { icon: <LuFolderTree />, title: "Site Management" },
    { icon: <LuClipboardList />, title: "Site Assign" },
    // { icon: <MdCategory />, title: "Category Management" },
  ];


  const data = [
    { id: 1, name: "Jithin Philip", email: "jithinphilip347@gmail.com", mobile: "9876543210", date: "2025-10-21" },
    { id: 2, name: "John Mathew", email: "johnmathew12@gmail.com", mobile: "9654321876", date: "2025-10-22" },
    { id: 3, name: "Sneha Nair", email: "sneha.nair24@gmail.com", mobile: "9987456321", date: "2025-10-23" },
    { id: 4, name: "Akhil Raj", email: "akhilraj.dev@gmail.com", mobile: "9876123450", date: "2025-10-22" },
    { id: 5, name: "Anjali Thomas", email: "anjali.t@gmail.com", mobile: "9032145678", date: "2025-10-21" },
    { id: 6, name: "Ramesh Kumar", email: "ramesh.kumar85@yahoo.com", mobile: "9945612387", date: "2025-10-19" },
    { id: 7, name: "Divya Menon", email: "divyamenon21@gmail.com", mobile: "9021785643", date: "2025-10-23" },
    { id: 8, name: "Vishnu Das", email: "vishnudas@outlook.com", mobile: "9765432189", date: "2025-10-20" },
    { id: 9, name: "Amrutha Krishnan", email: "amrutha.k@gmail.com", mobile: "9812354678", date: "2025-10-19" },
    { id: 10, name: "Arjun Joseph", email: "arjun.joseph10@gmail.com", mobile: "9798456123", date: "2025-10-20" },
    { id: 11, name: "Meera Rajan", email: "meerarajan@gmail.com", mobile: "9942138754", date: "2025-10-21" },
    { id: 12, name: "Rahul Dev", email: "rahul.dev94@gmail.com", mobile: "9812314578", date: "2025-10-23" },
    { id: 13, name: "Lekshmi B", email: "lekshmi.b@outlook.com", mobile: "9987456120", date: "2025-10-19" },
    { id: 14, name: "Sandeep Varma", email: "sandeepv@gmail.com", mobile: "9821346790", date: "2025-10-18" },
    { id: 15, name: "Priya Menon", email: "priyamenon@yahoo.com", mobile: "9998456321", date: "2025-10-17" },
  ];

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔹 Filter by search and date range
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile.includes(search);

    const itemDate = new Date(item.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDate =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    return matchesSearch && matchesDate;
  });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsChange = (num) => {
    setRowsPerPage(num);
    setShowDropdown(false);
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div id="Dashboard">
      <div className="DashboardMain">
        <div className="DashboardBox">
          {boxes.map((item, index) => (
            <div className="Box" key={index}>
              <div className="IconBox">{item.icon}</div>
              <div className="TitleBox"><p>{item.title}</p></div>
            </div>
          ))}
        </div>

        <div className="TableBox">
          <div className="SearchDateFilter">
            <div className="SearchBoxFilter">
              <div className="SearchBox">
                <RiSearchLine className="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="FilterIconBox"><RiFilterLine /></div>
            </div>

            <div className="DateFilterBox">
              <div className="DateRangeBox">
                <div className="DateFromBox">
                  <p>From</p>
                  <div className="DateBoxShow">
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  </div>
                </div>
                <div className="DateToBox">
                  <p>To</p>
                  <div className="DateBoxShow">
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="TableMainBox">
            <table>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.date}</td>
                      <td className="ActionIcons">
                        <FiEdit className="edit" />
                        <MdDeleteOutline className="delete" />
                        <FiEye className="view" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="NoDataRow">
                    <td colSpan="6">
                      <div className="NoDataBox">
                        <img src={NoDataImage} alt="No Data" />
                        <p>No Data Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="PaginationBox">
            <div className="ShowResultBox" onClick={() => setShowDropdown(!showDropdown)}>
              <p>Show Result</p>
              <div className="ShowResultCount">
                <p>{rowsPerPage}</p>
                <IoChevronDownSharp />
              </div>
              {showDropdown && (
                <div className="DropdownMenu">
                  {[10, 15, 20, 25, 30].map((num) => (
                    <p key={num} onClick={() => handleRowsChange(num)}>
                      {num}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="PaginationCount">
              <button className="prev" onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              <div className="PaginationNumber">
                {Array.from({ length: totalPages }, (_, i) => (
                  <span
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <button className="next" onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
