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
    inspectionFrequency: "",
    maintenanceFrequency: "",
    referenceNo: "",
    inspectionVisitNo: "",
    contactType: "",
    fireSystemType: "",
    date: new Date().toISOString().split("T")[0],
    prevDate: "",
    remark: "",
    emergencyCall: "",
  });

  const [errors, setErrors] = useState({});

  const [dropdowns, setDropdowns] = useState({
    staff: false,
    site: false,
    category: false,
    maintenance: false,
    inspectionFreq: false,
    maintenanceFreq: false,
    contactType: false,
    fireSystem: false,
  });

  const refs = {
    staff: useRef(),
    site: useRef(),
    category: useRef(),
    maintenance: useRef(),
    inspectionFreq: useRef(),
    maintenanceFreq: useRef(),
    contactType: useRef(),
    fireSystem: useRef(),
  };

  const staffOptions = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
  const siteOptions = ["Site A", "Site B", "Site C"];
  const categoryOptions = ["Inspection", "Emergency", "Maintenance"];

  const inspectionFrequencyOptions = [
    "Monthly Inspection",
    "Quarterly Inspection",
    "Bi-Annual Inspection",
    "Annual Inspection",
  ];

  const maintenanceFrequencyOptions = [
    "Monthly Maintenance",
    "Quarterly Maintenance",
    "Bi-Annual Maintenance",
    "Annual Maintenance",
    "On Call Inspection",
  ];

  const contractTypeOptions = ["Contractual", "Non Contractual"];
  const fireSystemOptions = [
    "Fire Fighting System",
    "Fire Alarm System",
    "Fire Suppression System",
    "Other",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      Object.keys(refs).forEach((key) => {
        if (refs[key].current && !refs[key].current.contains(e.target)) {
          setDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStaffOption = (option) => {
    const newStaff = formData.staff.includes(option)
      ? formData.staff.filter((s) => s !== option)
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
    if (!formData.date) newErrors.date = "Please select schedule service date";

    if (formData.category === "Maintenance" && !formData.maintenanceFrequency)
      newErrors.maintenanceFrequency = "Please choose a maintenance frequency";

    if (formData.category === "Inspection" && !formData.inspectionFrequency)
      newErrors.inspectionFrequency = "Please choose an inspection frequency";

    if (formData.category === "Emergency" && !formData.emergencyCall)
      newErrors.emergencyCall = "Please enter emergency call details";

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

    toast.success("Site assigned successfully!");
    setTimeout(() => navigate("/site-assign"), 1500);
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Inspection Schedule", link: "/site-assign" },
    { label: "Edit Inspection Schedule" },
  ];

  const renderDropdown = (label, name, options) => (
    <div className="FormGroup" ref={refs[name]}>
      <label>{label}</label>
      <div
        className={`custom-dropdown ${dropdowns[name] ? "open" : ""} ${
          errors[name] ? "error" : ""
        }`}
        onClick={() =>
          setDropdowns((prev) => ({ ...prev, [name]: !prev[name] }))
        }
      >
        <div className="dropdown-selected">
          {formData[name] || ` ${label.toLowerCase()}...`}
          {dropdowns[name] ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {dropdowns[name] && (
          <div
            className="dropdown-menu no-search"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setFormData({ ...formData, [name]: option });
                    setDropdowns((prev) => ({ ...prev, [name]: false }));
                  }}
                  className={formData[name] === option ? "selected" : ""}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {errors[name] && <p className="error-msg">{errors[name]}</p>}
    </div>
  );

  return (
    <div id="AddSiteAssign">
      <Toaster position="top-right" reverseOrder={false} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="AddStaffMain">
        <form onSubmit={handleSubmit}>
          <div className="FormGroupBox">
            {/* ---------- BASIC DETAILS ---------- */}
            <div className="FormGroup">
              <label>Reference No (Optional)</label>
              <input
                type="text"
                placeholder="Enter reference number"
                value={formData.referenceNo}
                onChange={(e) =>
                  setFormData({ ...formData, referenceNo: e.target.value })
                }
              />
            </div>

            <div className="FormGroup">
              <label>Inspection Visit No</label>
              <input
                type="text"
                placeholder="Enter inspection visit number"
                value={formData.inspectionVisitNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inspectionVisitNo: e.target.value,
                  })
                }
              />
            </div>

            {renderDropdown("Contract Type", "contractType", contractTypeOptions)}
            {renderDropdown("Fire Fighting System", "fireSystemType", fireSystemOptions)}

            {/* ---------- MULTI SELECT STAFF ---------- */}
            <div className="FormGroup" ref={refs.staff}>
              <label>Choose Staff</label>
              <div
                className={`custom-dropdown ${dropdowns.staff ? "open" : ""} ${
                  errors.staff ? "error" : ""
                }`}
                onClick={() =>
                  setDropdowns((prev) => ({ ...prev, staff: !prev.staff }))
                }
              >
                <div className="dropdown-selected">
                  {formData.staff.length > 0
                    ? formData.staff.join(", ")
                    : "Choose staff..."}
                  {dropdowns.staff ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {dropdowns.staff && (
                  <div
                    className="dropdown-menu no-search"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul>
                      {staffOptions.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => toggleStaffOption(option)}
                          className={
                            formData.staff.includes(option) ? "selected" : ""
                          }
                        >
                          <div className="option-with-check">
                            {formData.staff.includes(option) ? (
                              <FaCheck className="check-icon" />
                            ) : (
                              <span className="empty-icon" />
                            )}
                            <span>{option}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.staff && <p className="error-msg">{errors.staff}</p>}
            </div>

            {/* ---------- OTHER DROPDOWNS ---------- */}
            {renderDropdown("Choose Site", "site", siteOptions)}
            {renderDropdown("Choose Category", "category", categoryOptions)}

            {/* ---------- CONDITIONAL SECTIONS ---------- */}
            {formData.category === "Inspection" &&
              renderDropdown(
                "Inspection Frequency",
                "inspectionFrequency",
                inspectionFrequencyOptions
              )}

            {formData.category === "Maintenance" &&
              renderDropdown(
                "Maintenance Frequency",
                "maintenanceFrequency",
                maintenanceFrequencyOptions
              )}

            {formData.category === "Emergency" && (
              <div className="FormGroup">
                <label>Emergency Call</label>
                <input
                  type="text"
                  placeholder="Enter emergency call details"
                  value={formData.emergencyCall}
                  onChange={(e) =>
                    setFormData({ ...formData, emergencyCall: e.target.value })
                  }
                  className={errors.emergencyCall ? "error" : ""}
                />
                {errors.emergencyCall && (
                  <p className="error-msg">{errors.emergencyCall}</p>
                )}
              </div>
            )}

            {/* ---------- DATES & REMARK ---------- */}
            {(formData.category === "Inspection" ||
              formData.category === "Maintenance" ||
              formData.category === "Emergency") && (
              <>
                <div className="FormGroup">
                  <label>Schedule Service Date</label>
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
                  <label>Previous Inspection Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.prevDate}
                    onChange={(e) =>
                      setFormData({ ...formData, prevDate: e.target.value })
                    }
                  />
                </div>

                <div className="FormGroup">
                  <label>Remark</label>
                  <textarea
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


