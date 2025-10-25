import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaTimes, FaCheck } from "react-icons/fa";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import toast, { Toaster } from "react-hot-toast";

const EditSiteAssign = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    staff: [],
    site: "",
    category: "",
    maintenanceType: "",
    date: "",
    remark: "",
  });

  const [errors, setErrors] = useState({});

  const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [maintenanceDropdownOpen, setMaintenanceDropdownOpen] = useState(false);

  const staffRef = useRef();
  const siteRef = useRef();
  const categoryRef = useRef();
  const maintenanceRef = useRef();

  const staffOptions = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
  const siteOptions = ["Site A", "Site B", "Site C"];
  const categoryOptions = ["Inspection", "Emergency", "Maintenance"];
  const maintenanceOptions = ["Quarterly", "Monthly"];

  const [staffSearch, setStaffSearch] = useState("");
  const [siteSearch, setSiteSearch] = useState("");

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (staffRef.current && !staffRef.current.contains(e.target))
        setStaffDropdownOpen(false);
      if (siteRef.current && !siteRef.current.contains(e.target))
        setSiteDropdownOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target))
        setCategoryDropdownOpen(false);
      if (maintenanceRef.current && !maintenanceRef.current.contains(e.target))
        setMaintenanceDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStaffOption = (option) => {
    const newStaff = formData.staff.includes(option)
      ? formData.staff.filter((item) => item !== option)
      : [...formData.staff, option];
    setFormData({ ...formData, staff: newStaff });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.staff.length)
      newErrors.staff = "Please choose at least one staff";
    if (!formData.site) newErrors.site = "Please choose a site";
    if (!formData.category) newErrors.category = "Please choose a category";
    if (formData.category === "Maintenance" && !formData.maintenanceType)
      newErrors.maintenanceType = "Please choose a maintenance type";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.remark) newErrors.remark = "Please enter a remark";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const existingData = JSON.parse(localStorage.getItem("siteAssignList")) || [];
    const updatedList = [
      ...existingData,
      {
        ...formData,
        id: Date.now(),
        dateCreated: new Date().toISOString().split("T")[0],
      },
    ];
    localStorage.setItem("siteAssignList", JSON.stringify(updatedList));

    setFormData({
      staff: [],
      site: "",
      category: "",
      maintenanceType: "",
      date: "",
      remark: "",
    });

    toast.success("schedule edited successfully!");
    setTimeout(() => navigate("/site-assign"), 1500);
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Inspection Schedule", link: "/site-assign" },
    { label: "Edit Inspection Schedule" },
  ];

  return (
    <div id="AddSiteAssign">
      <Toaster position="top-right" reverseOrder={false} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="AddStaffMain">
        <form onSubmit={handleSubmit}>
          <div className="FormGroupBox">
            {/* ---------- STAFF MULTI SELECT ---------- */}
            <div className="FormGroup" ref={staffRef}>
              <label>Choose Staff</label>
              <div
                className={`custom-dropdown ${staffDropdownOpen ? "open" : ""} ${
                  errors.staff ? "error" : ""
                }`}
                onClick={() => setStaffDropdownOpen((prev) => !prev)}
              >
                <div className="dropdown-selected">
                  {formData.staff.length
                    ? formData.staff.join(", ")
                    : "Select staff..."}
                  {staffDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {staffDropdownOpen && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="dropdown-search">
                      <input
                        type="text"
                        placeholder="Search staff..."
                        value={staffSearch}
                        onChange={(e) => setStaffSearch(e.target.value)}
                      />
                      {staffSearch && (
                        <FaTimes
                          className="close-icon"
                          onClick={() => setStaffSearch("")}
                        />
                      )}
                    </div>
                    <ul>
                      {staffOptions
                        .filter((s) =>
                          s.toLowerCase().includes(staffSearch.toLowerCase())
                        )
                        .map((option, idx) => (
                          <li
                            key={idx}
                            onClick={() => toggleStaffOption(option)}
                            className={
                              formData.staff.includes(option) ? "selected" : ""
                            }
                          >
                            <input
                              type="checkbox"
                              checked={formData.staff.includes(option)}
                              readOnly
                            />
                            {option}
                            {formData.staff.includes(option) && (
                              <FaCheck className="check-icon" />
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.staff && <p className="error-msg">{errors.staff}</p>}
            </div>

            {/* ---------- SITE SINGLE SELECT ---------- */}
            <div className="FormGroup" ref={siteRef}>
              <label>Choose Site</label>
              <div
                className={`custom-dropdown ${siteDropdownOpen ? "open" : ""} ${
                  errors.site ? "error" : ""
                }`}
                onClick={() => setSiteDropdownOpen((prev) => !prev)}
              >
                <div className="dropdown-selected">
                  {formData.site || "Select site..."}
                  {siteDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {siteDropdownOpen && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="dropdown-search">
                      <input
                        type="text"
                        placeholder="Search site..."
                        value={siteSearch}
                        onChange={(e) => setSiteSearch(e.target.value)}
                      />
                      {siteSearch && (
                        <FaTimes
                          className="close-icon"
                          onClick={() => setSiteSearch("")}
                        />
                      )}
                    </div>
                    <ul>
                      {siteOptions
                        .filter((s) =>
                          s.toLowerCase().includes(siteSearch.toLowerCase())
                        )
                        .map((option, idx) => (
                          <li
                            key={idx}
                            onClick={() => {
                              setFormData({ ...formData, site: option });
                              setSiteDropdownOpen(false);
                            }}
                            className={
                              formData.site === option ? "selected" : ""
                            }
                          >
                            {option}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.site && <p className="error-msg">{errors.site}</p>}
            </div>

            {/* ---------- CATEGORY SINGLE SELECT ---------- */}
            <div className="FormGroup" ref={categoryRef}>
              <label>Choose Category</label>
              <div
                className={`custom-dropdown ${
                  categoryDropdownOpen ? "open" : ""
                } ${errors.category ? "error" : ""}`}
                onClick={() => setCategoryDropdownOpen((prev) => !prev)}
              >
                <div className="dropdown-selected">
                  {formData.category || "Select category..."}
                  {categoryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {categoryDropdownOpen && (
                  <div
                    className="dropdown-menu no-search"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul>
                      {categoryOptions.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              category: option,
                              maintenanceType: "",
                            });
                            setCategoryDropdownOpen(false);
                          }}
                          className={
                            formData.category === option ? "selected" : ""
                          }
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.category && <p className="error-msg">{errors.category}</p>}
            </div>

            {/* ---------- CONDITIONAL FIELDS ---------- */}
            {formData.category === "Maintenance" && (
              <div className="FormGroup" ref={maintenanceRef}>
                <label>Maintenance Type</label>
                <div
                  className={`custom-dropdown ${
                    maintenanceDropdownOpen ? "open" : ""
                  } ${errors.maintenanceType ? "error" : ""}`}
                  onClick={() =>
                    setMaintenanceDropdownOpen((prev) => !prev)
                  }
                >
                  <div className="dropdown-selected">
                    {formData.maintenanceType || "Select type..."}
                    {maintenanceDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>

                  {maintenanceDropdownOpen && (
                    <div
                      className="dropdown-menu no-search"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul>
                        {maintenanceOptions.map((option, idx) => (
                          <li
                            key={idx}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                maintenanceType: option,
                              });
                              setMaintenanceDropdownOpen(false);
                            }}
                            className={
                              formData.maintenanceType === option
                                ? "selected"
                                : ""
                            }
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.maintenanceType && (
                  <p className="error-msg">{errors.maintenanceType}</p>
                )}
              </div>
            )}

            {(formData.category === "Maintenance" ||
              formData.category === "Inspection" ||
              formData.category === "Emergency") && (
              <>
                <div className="FormGroup">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className={errors.date ? "error" : ""}
                  />
                  {errors.date && <p className="error-msg">{errors.date}</p>}
                </div>

                <div className="FormGroup">
                  <label>Remark</label>
                  <textarea 
                    type="text"
                    placeholder="Enter remark"
                    value={formData.remark}
                    onChange={(e) =>
                      setFormData({ ...formData, remark: e.target.value })
                    }
                    className={errors.remark ? "error" : ""}
                  />
                  {errors.remark && (
                    <p className="error-msg">{errors.remark}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="FormBtnBox">
            <button type="submit" className="primary-btn">
              Edit Inspection Schedule
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/site-assign")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSiteAssign;
