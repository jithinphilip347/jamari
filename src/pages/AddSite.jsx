import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import toast, { Toaster } from "react-hot-toast";

const AddSite = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    siteLocation: "",
    clientName: "",
    contact: "",
    contactDetails: "",
    fireEquipment: [
      { itemName: "", serialNumber: "", installationDate: "", warranty: "", expiryDate: "" },
    ],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.projectName.trim()) newErrors.projectName = "Project Name is required";
    if (!formData.siteName.trim()) newErrors.siteName = "Site Name is required";
    if (!formData.siteLocation.trim()) newErrors.siteLocation = "Site Location is required";
    if (!formData.clientName.trim()) newErrors.clientName = "Client Name is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    if (!formData.contactDetails.trim()) newErrors.contactDetails = "Contact Details are required";

    formData.fireEquipment.forEach((item, index) => {
      if (!item.itemName.trim()) newErrors[`itemName${index}`] = "Item Name required";
      if (!item.serialNumber.trim()) newErrors[`serialNumber${index}`] = "Serial Number required";
      if (!item.installationDate.trim()) newErrors[`installationDate${index}`] = "Installation Date required";
      if (!item.warranty.trim()) newErrors[`warranty${index}`] = "Warranty required";
      if (!item.expiryDate.trim()) newErrors[`expiryDate${index}`] = "Expiry Date required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFireEquipmentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEquipment = [...formData.fireEquipment];
    updatedEquipment[index][name] = value;
    setFormData({ ...formData, fireEquipment: updatedEquipment });
  };

  const addFireEquipmentRow = () => {
    setFormData({
      ...formData,
      fireEquipment: [
        ...formData.fireEquipment,
        { itemName: "", serialNumber: "", installationDate: "", warranty: "", expiryDate: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const existingData = JSON.parse(localStorage.getItem("siteList")) || [];
      const updatedList = [...existingData, { ...formData, id: Date.now() }];
      localStorage.setItem("siteList", JSON.stringify(updatedList));

      toast.success("Site added successfully!");
      setTimeout(() => navigate("/site-management"), 1500);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Site Management", link: "/site-management" },
    { label: "Add Site" },
  ];

  return (
    <div id="AddSite">
      <Toaster position="top-right" reverseOrder={false} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="AddStaffMain">
        <form onSubmit={handleSubmit}>
          {/* Project Info */}
          <div className="FormGroupBox">
            <div className="FormGroup">
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                placeholder="Enter Project Name"
                value={formData.projectName}
                onChange={handleChange}
                className={errors.projectName ? "error" : ""}
              />
              {errors.projectName && <p className="error-msg">{errors.projectName}</p>}
            </div>
              <div className="FormGroup">
              <label>Site Name</label>
              <input
                type="text"
                name="siteName"
                placeholder="Enter Site Name"
                value={formData.siteName}
                onChange={handleChange}
                className={errors.siteName ? "error" : ""}
              />
              {errors.clientName && <p className="error-msg">{errors.siteName}</p>}
            </div>

            <div className="FormGroup">
              <label>Site Location</label>
              <input
                type="text"
                name="siteLocation"
                placeholder="Enter Site Location"
                value={formData.siteLocation}
                onChange={handleChange}
                className={errors.siteLocation ? "error" : ""}
              />
              {errors.siteLocation && <p className="error-msg">{errors.siteLocation}</p>}
            </div>

            <div className="FormGroup">
              <label>Client Name</label>
              <input
                type="text"
                name="clientName"
                placeholder="Enter Client Name"
                value={formData.clientName}
                onChange={handleChange}
                className={errors.clientName ? "error" : ""}
              />
              {errors.clientName && <p className="error-msg">{errors.clientName}</p>}
            </div>

            <div className="FormGroup">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                placeholder="Enter Contact"
                value={formData.contact}
                onChange={handleChange}
                className={errors.contact ? "error" : ""}
              />
              {errors.contact && <p className="error-msg">{errors.contact}</p>}
            </div>

            <div className="FormGroup">
              <label>Contract Details</label>
              <input
                type="text"
                name="contactDetails"
                placeholder="Enter Contract Details"
                value={formData.contactDetails}
                onChange={handleChange}
                className={errors.contactDetails ? "error" : ""}
              />
              {errors.contactDetails && <p className="error-msg">{errors.contactDetails}</p>}
            </div>
          </div>

          <h3>Fire Equipment Inventory</h3>
          {formData.fireEquipment.map((item, index) => (
            <div key={index} className="FormGroupMainBox">
             <div className="FormSubGroupBox">
              <div className="FormGroup">
                <label>Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  placeholder="Enter Item Name"
                  value={item.itemName}
                  onChange={(e) => handleFireEquipmentChange(index, e)}
                  className={errors[`itemName${index}`] ? "error" : ""}
                />
                {errors[`itemName${index}`] && <p className="error-msg">{errors[`itemName${index}`]}</p>}
              </div>
              <div className="FormGroup">
                <label>Serial Number</label>
                <input
                  type="text"
                  name="serialNumber"
                  placeholder="Enter Serial Number"
                  value={item.serialNumber}
                  onChange={(e) => handleFireEquipmentChange(index, e)}
                  className={errors[`serialNumber${index}`] ? "error" : ""}
                />
                {errors[`serialNumber${index}`] && <p className="error-msg">{errors[`serialNumber${index}`]}</p>}
              </div>
              <div className="FormGroup">
                <label>Installation Date</label>
                <input
                  type="date"
                  name="installationDate"
                  value={item.installationDate}
                  onChange={(e) => handleFireEquipmentChange(index, e)}
                  className={errors[`installationDate${index}`] ? "error" : ""}
                />
                {errors[`installationDate${index}`] && <p className="error-msg">{errors[`installationDate${index}`]}</p>}
              </div>
             </div>

              <div className="WarentySpanBox">
                 <div className="WarentyTitle">
                   <p>Warranty Span</p>
                 </div>
                 <div className="WarrentySpan">
                 <div className="FormGroup">
                <label>Start Date</label>
                <input
                  type="text"
                  name="warranty"
                  placeholder="Enter Warranty"
                  value={item.warranty}
                  onChange={(e) => handleFireEquipmentChange(index, e)}
                  className={errors[`warranty${index}`] ? "error" : ""}
                />
                {errors[`warranty${index}`] && <p className="error-msg">{errors[`warranty${index}`]}</p>}
              </div>
              <div className="FormGroup">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={item.expiryDate}
                  onChange={(e) => handleFireEquipmentChange(index, e)}
                  className={errors[`expiryDate${index}`] ? "error" : ""}
                />
                {errors[`expiryDate${index}`] && <p className="error-msg">{errors[`expiryDate${index}`]}</p>}
              </div>
                 </div>
              </div>
            </div>
          ))}

          <button type="button" className="add-row-btn" onClick={addFireEquipmentRow}>
           Add Equipment
          </button>

          <div className="FormBtnBox">
            <button type="submit" className="primary-btn">
              Add Site
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate("/site-management")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSite;
