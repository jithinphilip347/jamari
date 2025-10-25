import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SuccessPopup from "../components/ui/SuccessPopup";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
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

      setFormData({ name: "", phone: "", email: "", address: "" });
      setShowSuccess(true); 
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/category-management");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category Management", link: "/category-management" },
    { label: "Add Category" },
  ];

  return (
    <div id="AddCategory">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="AddStaffMain">
        <form onSubmit={handleSubmit}>
          <div className="FormGroupBox">
            <div className="FormGroup">
              <label>Category Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>

            {/* <div className="FormGroup">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div> */}

            {/* <div className="FormGroup">
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
            </div> */}
          </div>

          {/* <div className="FormGroup">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <p className="error-msg">{errors.address}</p>}
          </div> */}

          <div className="FormBtnBox">
            <button type="submit" className="primary-btn">
              Add Category
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

      {showSuccess && (
        <SuccessPopup
          message="Staff added successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default AddCategory;


