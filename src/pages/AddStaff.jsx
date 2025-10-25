import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import toast, { Toaster } from "react-hot-toast";

const AddStaff = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employerId: "",
    employerTitle: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.employerId.trim())
      newErrors.employerId = "Employer ID is required";

    if (!formData.employerTitle.trim())
      newErrors.employerTitle = "Employer Title is required";

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const existingData = JSON.parse(localStorage.getItem("staffList")) || [];
      const updatedList = [
        ...existingData,
        {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
        },
      ];
      localStorage.setItem("staffList", JSON.stringify(updatedList));

      setFormData({
        employerId: "",
        employerTitle: "",
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      toast.success("Staff added successfully!");
      setTimeout(() => navigate("/staff-management"), 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Staff Management", link: "/staff-management" },
    { label: "Add Staff" },
  ];

  return (
    <div id="AddStaff">
      <Toaster position="top-right" reverseOrder={false} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="AddStaffMain">
        <form onSubmit={handleSubmit}>
          <div className="FormGroupBox">
            <div className="FormGroup">
              <label>Employer ID</label>
              <input
                type="text"
                name="employerId"
                placeholder="Enter employer ID"
                value={formData.employerId}
                onChange={handleChange}
                className={errors.employerId ? "error" : ""}
              />
              {errors.employerId && (
                <p className="error-msg">{errors.employerId}</p>
              )}
            </div>

            <div className="FormGroup">
              <label>Employer Title</label>
              <input
                type="text"
                name="employerTitle"
                placeholder="Enter employer title"
                value={formData.employerTitle}
                onChange={handleChange}
                className={errors.employerTitle ? "error" : ""}
              />
              {errors.employerTitle && (
                <p className="error-msg">{errors.employerTitle}</p>
              )}
            </div>

            <div className="FormGroup">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>
          </div>
           <div className="FormGroupContactBox">
              <div className="FormGroup">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter mobile number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div>

            <div className="FormGroup">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>
               <div className="FormGroup">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <p className="error-msg">{errors.address}</p>}
          </div>
           </div>
        

          <div className="FormBtnBox">
            <button type="submit" className="primary-btn">
              Add Staff
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/staff-management")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
