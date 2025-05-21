import React, { useState, useEffect } from "react";
import axios from "axios";

const FormCNV = () => {
  // Initialize form state with all fields
  const [formData, setFormData] = useState({
    company_id: "",
    employer_name: "",
    employer_address: "",
    telephone: "",
    vacancy_nature: "",
    worker_type: "",
    duties_description: "",
    essential_qualification: "",
    desirable_qualification: "",
    age_limit: "",
    women_eligible: "",
    regular_vacancies: "",
    temporary_vacancies: "",
    total_vacancies: "",
    pay_allowance: "",
    work_place: "",
    probable_filling_date: "",
    interview_date: "",
    interview_start_time: "",
    interview_end_time: "",
    interview_place: "",
    report_to: "",
    sc_vacancies: "",
    st_vacancies: "",
    exservicemen_vacancies: "",
    ph_vacancies: "",
    other_vacancies: "",
    other_information: "",
  });

  const [companies, setCompanies] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoadingCompanies(true);
        axios
          .get(`${API_BASE_URL}/companies`)
          .then((response) => setCompanies(response.data))
          .catch((error) => console.error("Error fetching companies:", error));
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Optional: Add error state for UI feedback
        // setErrorFetchingCompanies(true);
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    const companyId = e.target.value;

    const selectedCompany = companies.find(
      (c) => c.company_id.toString() === companyId
    );

    if (selectedCompany) {
      setFormData((prev) => ({
        ...prev,
        company_id: selectedCompany.company_id || "",
        employer_name: selectedCompany.company_name || "",
        employer_address: selectedCompany.address || "",
        telephone: selectedCompany.employer_phoneno || "",
      }));
    } else {
      // If no company selected (e.g., "Select a company" option chosen)
      setFormData((prev) => ({
        ...prev,
        company_id: "",
        employer_name: "",
        employer_address: "",
        telephone: "",
      }));
    }

    // Clear any existing errors for these fields
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.employer_name;
      delete newErrors.employer_address;
      return newErrors;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "regular_vacancies" || name === "temporary_vacancies") {
      const regular =
        name === "regular_vacancies"
          ? parseInt(value) || 0
          : parseInt(formData.regular_vacancies) || 0;
      const temp =
        name === "temporary_vacancies"
          ? parseInt(value) || 0
          : parseInt(formData.temporary_vacancies) || 0;

      setFormData((prev) => ({
        ...prev,
        total_vacancies: (regular + temp).toString(),
      }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const requiredFields = {
      company_id: "Company selection is required",
      employer_name: "Company name is required",
      employer_address: "Company address is required",
      vacancy_nature: "Nature of vacancy is required",
      worker_type: "Type of workers required",
      duties_description: "Description of duties is required",
      essential_qualification: "Essential qualification is required",
      women_eligible: "Please specify if women are eligible",
      regular_vacancies: "Regular vacancies count is required",
      temporary_vacancies: "Temporary vacancies count is required",
      pay_allowance: "Pay and allowance details are required",
      work_place: "Place of work is required",
      probable_filling_date: "Probable filling date is required",
    };

    const errors = {};

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) {
        errors[field] = message;
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert("Please fill in all required fields");
      return;
    }

    // Prepare clean data
    const submissionData = {
      ...formData,
      regular_vacancies: parseInt(formData.regular_vacancies) || 0,
      temporary_vacancies: parseInt(formData.temporary_vacancies) || 0,
      total_vacancies: parseInt(formData.total_vacancies) || 0,
      sc_vacancies: parseInt(formData.sc_vacancies) || 0,
      st_vacancies: parseInt(formData.st_vacancies) || 0,
      exservicemen_vacancies: parseInt(formData.exservicemen_vacancies) || 0,
      ph_vacancies: parseInt(formData.ph_vacancies) || 0,
      other_vacancies: parseInt(formData.other_vacancies) || 0,
    };

    try {
      console.log("Submitting data:", formData); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/form-cnv/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Submission result:", result); // Debug log
      
      if (result.success) {
        alert("Form submitted successfully!");
        // Optionally reset form here if needed
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const renderError = (fieldName) =>
    errors[fieldName] && (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        {errors[fieldName]}
      </div>
    );

  return (
    <div className="form-container">
      {submissionResult && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>
            Form submitted successfully! Your reference number is:{" "}
            <strong>{submissionResult.referenceNumber}</strong>
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-3xl mx-auto border rounded-lg shadow-sm bg-white space-y-5"
      >
        <h2 className="text-xl font-bold text-center">
          Form of Notification of Vacancies
        </h2>

        {/* Company Selection Dropdown */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">Select Company *</label>
          <select
            name="company_id"
            value={formData.company_id}
            onChange={handleCompanyChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.company_id ? "border-red-500" : ""
            }`}
            disabled={isLoadingCompanies}
          >
            <option value="">
              {isLoadingCompanies
                ? "Loading companies..."
                : "-- Select a company --"}
            </option>
            {companies.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </select>
          {renderError("company_id")}
        </div>

        {/* 1. Company Name and Address (auto-filled but editable) */}
        <div className="px-4">
          <label className="block font-medium mb-2">
            Company Name and Address *
          </label>
          <input
            type="text"
            name="employer_name"
            value={formData.employer_name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded mb-2 ${
              errors.employer_name ? "border-red-500" : ""
            }`}
            placeholder="Company name"
          />
          {renderError("employer_name")}
          <textarea
            name="employer_address"
            value={formData.employer_address}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.employer_address ? "border-red-500" : ""
            }`}
            rows="2"
            placeholder="Company address"
          />
          {renderError("employer_address")}
        </div>

        {/* 2. Telephone Number (auto-filled but editable) */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Telephone Number of the Company
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Company telephone"
          />
        </div>

        {/* 3. Nature of Vacancy */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">Nature of Vacancy *</label>
          <input
            type="text"
            name="vacancy_nature"
            value={formData.vacancy_nature}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.vacancy_nature ? "border-red-500" : ""
            }`}
            placeholder="Enter nature of vacancy"
          />
          {renderError("vacancy_nature")}
        </div>

        {/* 3a. Type of Workers */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Type of Workers Required (Designation) *
          </label>
          <input
            type="text"
            name="worker_type"
            value={formData.worker_type}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.worker_type ? "border-red-500" : ""
            }`}
            placeholder="Enter worker type/designation"
          />
          {renderError("worker_type")}
        </div>

        {/* 3b. Description of Duties */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Description of Duties *
          </label>
          <textarea
            name="duties_description"
            value={formData.duties_description}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.duties_description ? "border-red-500" : ""
            }`}
            rows="3"
            placeholder="Describe the duties of the position"
          />
          {renderError("duties_description")}
        </div>

        {/* 3c. Qualifications */}
        <div className="flex flex-col px-4 my-2 md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">
              Essential Qualification *
            </label>
            <input
              type="text"
              name="essential_qualification"
              value={formData.essential_qualification}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mb-2 ${
                errors.essential_qualification ? "border-red-500" : ""
              }`}
              placeholder="Required qualifications"
            />
            {renderError("essential_qualification")}
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">
              Desirable Qualification
            </label>
            <input
              type="text"
              name="desirable_qualification"
              value={formData.desirable_qualification}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Preferred qualifications"
            />
          </div>
        </div>

        {/* 3d. Age Limit */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">Age Limit (if any)</label>
          <input
            type="text"
            name="age_limit"
            value={formData.age_limit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter age limit"
          />
        </div>

        {/* 3e. Women Eligibility */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Whether Women are Eligible? *
          </label>
          <select
            name="women_eligible"
            value={formData.women_eligible}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.women_eligible ? "border-red-500" : ""
            }`}
          >
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {renderError("women_eligible")}
        </div>

        {/* 4. Number of Vacancies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 my-2">
          <div>
            <label className="block font-medium mb-1">
              Regular Vacancies *
            </label>
            <input
              type="number"
              name="regular_vacancies"
              value={formData.regular_vacancies}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.regular_vacancies ? "border-red-500" : ""
              }`}
              placeholder="0"
              min="0"
            />
            {renderError("regular_vacancies")}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Temporary Vacancies *
            </label>
            <input
              type="number"
              name="temporary_vacancies"
              value={formData.temporary_vacancies}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.temporary_vacancies ? "border-red-500" : ""
              }`}
              placeholder="0"
              min="0"
            />
            {renderError("temporary_vacancies")}
          </div>
          <div>
            <label className="block font-medium mb-1">Total Vacancies</label>
            <input
              type="number"
              name="total_vacancies"
              value={formData.total_vacancies}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Auto-calculated"
              min="0"
              readOnly
            />
          </div>
        </div>

        {/* 5. Pay and Allowance */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">Pay and Allowance *</label>
          <textarea
            name="pay_allowance"
            value={formData.pay_allowance}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.pay_allowance ? "border-red-500" : ""
            }`}
            rows="2"
            placeholder="Details of salary and benefits"
          />
          {renderError("pay_allowance")}
        </div>

        {/* 6. Place of Work */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">Place of Work *</label>
          <input
            type="text"
            name="work_place"
            value={formData.work_place}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.work_place ? "border-red-500" : ""
            }`}
            placeholder="Town/Village and District"
          />
          {renderError("work_place")}
        </div>

        {/* 7. Probable Date of Filling */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Probable Date of Vacancy Filling *
          </label>
          <input
            type="date"
            name="probable_filling_date"
            value={formData.probable_filling_date}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.probable_filling_date ? "border-red-500" : ""
            }`}
          />
          {renderError("probable_filling_date")}
        </div>

        {/* 8. Interview/Test Details */}
        <div className="space-y-4 px-4 my-2">
          {/* Interview Date (single) and Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single Date Field */}
            <div>
              <label className="block font-medium mb-1">
                Date of Interview
              </label>
              <input
                type="date"
                name="interview_date"
                value={formData.interview_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="block font-medium">Interview Time Range</label>

              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="interview_start_time"
                  value={formData.interview_start_time}
                  onChange={handleChange}
                  className="flex-1 w-auto border px-3 py-2 rounded"
                />
                <span className="text-gray-500 px-2">to</span>
                <input
                  type="time"
                  name="interview_end_time"
                  value={formData.interview_end_time}
                  onChange={handleChange}
                  className="flex-1 w-auto border px-3 py-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* Location and Reporting */}
          <div className="space-y-1">
            <label className="block font-medium">Place of Interview/Test</label>
            <input
              type="text"
              name="interview_place"
              value={formData.interview_place}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Venue address"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium">Reporting Contact</label>
            <textarea
              name="report_to"
              value={formData.report_to}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="2"
              placeholder="Person name, designation, and contact details"
            />
          </div>
        </div>

        {/* 9. Reservation Categories */}
        <div className="border p-4 my-4 rounded">
          <label className="block font-medium mb-2">
            Reservation Categories (If applicable)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1">SC:</label>
              <input
                type="number"
                name="sc_vacancies"
                value={formData.sc_vacancies}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">ST:</label>
              <input
                type="number"
                name="st_vacancies"
                value={formData.st_vacancies}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Ex-Servicemen:</label>
              <input
                type="number"
                name="exservicemen_vacancies"
                value={formData.exservicemen_vacancies}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">PH:</label>
              <input
                type="number"
                name="ph_vacancies"
                value={formData.ph_vacancies}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Others:</label>
              <input
                type="number"
                name="other_vacancies"
                value={formData.other_vacancies}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* 10. Additional Info */}
        <div className="px-4 my-2">
          <label className="block font-medium mb-1">
            Any Other Relevant Information
          </label>
          <textarea
            name="other_information"
            value={formData.other_information}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Additional information about the vacancy"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormCNV;
