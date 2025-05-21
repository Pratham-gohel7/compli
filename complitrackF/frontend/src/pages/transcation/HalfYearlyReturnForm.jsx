import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HalfYearlyReturnForm = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const [formData, setFormData] = useState({
    company_id: "",
    reporting_period: '',
    factory_name: '',
    occupier_name: '',
    manager_name: '',
    district: '',
    postal_address: '',
    registration_number: '',
    license_number: '',
    nic_code: '',
    industry_nature: '',
    industry_sector: '',
    applicable_clauses: [],
    factory_work_days: '',
    
    // Section 8: Mandays worked
    mandays_adults_male: "",  
    mandays_adults_female: "", 
    mandays_adolescents_male: "",
    mandays_adolescents_female: "",
    mandays_children_male: "",
    mandays_children_female: "",
    
    // Section 9: Average workers
    avg_workers_adults_male: "",
    avg_workers_adults_female: "",
    avg_workers_adolescents_male: "",
    avg_workers_adolescents_female: "",
    avg_workers_children_male: "",
    avg_workers_children_female: "",
    
    // Section 10: Medical info
    hazardous_process_workers: "",
    hazardous_agents: "",
    medical_officers_fulltime: "",
    medical_officers_parttime: "",
    workers_examined_hazardous: "",
    workers_examined_others: "",
  });

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoadingCompanies(true);
        const response = await axios.get(`${API_BASE_URL}/companies`);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
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
      setFormData(prev => ({
        ...prev,
        company_id: companyId,
        factory_name: selectedCompany.company_name || "",
        occupier_name: selectedCompany.employer_name || "",
        manager_name: selectedCompany.manager_name || "",
        district: selectedCompany.district || "",
        postal_address: selectedCompany.address || "",
        registration_number: selectedCompany.establishment_reg_no || "",
        license_number: selectedCompany.license_number || "",
        nic_code: selectedCompany.nic_code || "",
        industry_nature: selectedCompany.nature_of_work || "",
        industry_sector: selectedCompany.sector || "Select Sector"
      }));
    } else {
      // Clear company-related fields if no company selected
      setFormData(prev => ({
        ...prev,
        company_id: "",
        factory_name: "",
        occupier_name: "",
        manager_name: "",
        district: "",
        postal_address: "",
        registration_number: "",
        license_number: "",
        nic_code: "",
        industry_nature: "",
        industry_sector: "Select Sector"
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updated = formData.applicable_clauses.includes(value)
        ? formData.applicable_clauses.filter((c) => c !== value)
        : [...formData.applicable_clauses, value];
      setFormData({ ...formData, applicable_clauses: updated });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: value ? parseInt(value) : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateTotals = (prefix) => {
    const male = formData[`${prefix}_male`] || 0;
    const female = formData[`${prefix}_female`] || 0;
    return male + female;
  };

  const renderWorkerInputs = (section, category, label) => {
    const prefix = `${section}_${category}`;
    const total = calculateTotals(prefix);
    
    return (
      <tr key={prefix}>
        <td className="border px-4 py-2">{label}</td>
        <td className="border px-4 py-2">
          <input
            type="number"
            name={`${prefix}_male`}
            className="w-full px-3 py-1 border rounded"
            value={formData[`${prefix}_male`]}
            onChange={handleChange}
            min="0"
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="number"
            name={`${prefix}_female`}
            className="w-full px-3 py-1 border rounded"
            value={formData[`${prefix}_female`]}
            onChange={handleChange}
            min="0"
          />
        </td>
        <td className="border px-4 py-2 bg-gray-50">{total}</td>
      </tr>
    );
  };

  const renderSectionTable = (sectionNumber, title, sectionPrefix) => {
    const categories = [
      { key: 'adults', label: 'Adults' },
      { key: 'adolescents', label: 'Adolescents' },
      { key: 'children', label: 'Children' }
    ];
    
    const grandTotalMale = categories.reduce((sum, cat) => sum + (formData[`${sectionPrefix}_${cat.key}_male`] || 0), 0);
    const grandTotalFemale = categories.reduce((sum, cat) => sum + (formData[`${sectionPrefix}_${cat.key}_female`] || 0), 0);
    
    return (
      <div className="mx-4 mb-8">
        <label className="text-xl font-semibold block mb-2">
          {sectionNumber}. {title}
        </label>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Male/Boys</th>
              <th className="border px-4 py-2 text-left">Female/Girls</th>
              <th className="border px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => 
              renderWorkerInputs(sectionPrefix, cat.key, cat.label)
            )}
            <tr className="font-semibold bg-gray-100">
              <td className="border px-4 py-2">Grand Total</td>
              <td className="border px-4 py-2">{grandTotalMale}</td>
              <td className="border px-4 py-2">{grandTotalFemale}</td>
              <td className="border px-4 py-2">{grandTotalMale + grandTotalFemale}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API_BASE_URL}/half-yearly-return/save`, {
        ...formData,
        company_id: formData.company_id || null
      });
      
      if (response.data?.success || response.status === 200) {
        alert('Form submitted successfully!');
        // Reset form if needed
      } else {
        throw new Error(response.data?.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.response?.data?.message || error.message || 'Submission failed'}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto bg-white border rounded-xl shadow-md space-y-6">
        <h2 className="text-xl font-bold text-center mt-2">
          Form No. 25
        </h2>
        <p className="text-center font-medium">
          Half Yearly Return <br />
          For the half year ending June 20
        </p>

        {/* Company Selection Dropdown */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Select Company *</label>
          <select
            name="company_id"
            value={formData.company_id}
            onChange={handleCompanyChange}
            className="w-full border rounded px-3 py-2"
            required
            disabled={isLoadingCompanies}
          >
            <option value="">{isLoadingCompanies ? 'Loading companies...' : '-- Select Company --'}</option>
            {companies.map(company => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </select>
        </div>

        {/* Reporting Period */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">
            Reporting Period <span className="text-sm text-gray-500">(End of June or December – Year)</span>
          </label>
          <input
            type="month"
            name="reporting_period"
            className="border rounded px-3 py-2 w-auto"
            value={formData.reporting_period}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-4">
            <div className='px-4 my-2'>
              <label className="block font-medium">1. Name of factory</label>
              <input
                type="text"
                name="factory_name"
                className="w-full border rounded px-3 py-2"
                value={formData.factory_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">2. Name of Occupier</label>
              <input
                type="text"
                name="occupier_name"
                className="w-full border rounded px-3 py-2"
                value={formData.occupier_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">3. Name of Manager</label>
              <input
                type="text"
                name="manager_name"
                className="w-full border rounded px-3 py-2"
                value={formData.manager_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">4. District</label>
              <input
                type="text"
                name="district"
                className="w-full border rounded px-3 py-2"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">
                5. Full postal address of the factory (including PIN Code)
              </label>
              <textarea
                name="postal_address"
                className="w-full border rounded px-3 py-2 resize-none h-24"
                value={formData.postal_address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <div className='px-4 my-2'>
              <label className="block font-medium">Registration number</label>
              <input
                type="text"
                name="registration_number"
                className="w-full border rounded px-3 py-2"
                value={formData.registration_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">Licence number</label>
              <input
                type="text"
                name="license_number"
                className="w-full border rounded px-3 py-2"
                value={formData.license_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className='px-4 my-2'>
              <label className="block font-medium">
                *NIC Code number <span className="text-sm text-gray-500">(As given in the licence)</span>
              </label>
              <input
                type="text"
                name="nic_code"
                className="w-full border rounded px-3 py-2"
                value={formData.nic_code}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Industry Section */}
        <div className='px-4 my-2'>
          <label className="text-xl font-semibold">6. Industry</label>
          <div className="grid gap-4 mt-2">
            <div>
              <label className="block font-medium mb-1">(a) Nature of Industry</label>
              <input
                type="text"
                name="industry_nature"
                className="w-full border rounded px-3 py-2"
                value={formData.industry_nature}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">(b) Sector Industry</label>
              <select
                name="industry_sector"
                className="w-full border rounded px-3 py-2"
                value={formData.industry_sector}
                onChange={handleChange}
                required
              >
                <option value="Select Sector">Select Sector</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">(c) Applicable Clauses</label>
              <div className="flex flex-wrap gap-4">
                {['2(m)(i)', '2(m)(ii)', 'Section 85'].map((clause) => (
                  <label key={clause} className="inline-flex items-center">
                    {clause}
                    <input
                      type="checkbox"
                      className="mr-2"
                      value={clause}
                      checked={formData.applicable_clauses.includes(clause)}
                      onChange={handleChange}
                    />
                    {/* {clause} */}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Factory Work Days */}
        <div className='px-4 my-2'>
          <label className="text-xl font-semibold block mb-2">
            7. Number of days factory worked during the half year ending 30th June 20..
          </label>
          <input
            type="number"
            name="factory_work_days"
            className="w-full border rounded px-3 py-2"
            value={formData.factory_work_days}
            onChange={handleChange}
            min="0"
            max="186"
            required
          />
        </div>

        {/* Section 8: Mandays worked */}
        {renderSectionTable(
          '8',
          'Number of mandays worked during the half year ending 30th June, 20..',
          'mandays'
        )}

        {/* Section 9: Average workers */}
        {renderSectionTable(
          '9',
          'Average number of workers employed daily',
          'avg_workers'
        )}

        {/* Section 10: Medical Information */}
        <div className='px-4 my-2'>
          <label className="text-xl font-semibold block mb-2">10. Medical Information</label>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  (a) Total number of workers employed in hazardous processes
                </label>
                <input
                  type="number"
                  name="hazardous_process_workers"
                  className="w-full border rounded px-3 py-2"
                  value={formData.hazardous_process_workers || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">(b) Name of the hazardous agents</label>
                <input
                  type="text"
                  name="hazardous_agents"
                  className="w-full border rounded px-3 py-2"
                  value={formData.hazardous_agents || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">(c) Number of medical officers employed</label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <label className="w-1/3">Full time</label>
                    <input
                      type="number"
                      name="medical_officers_fulltime"
                      className="w-full border rounded px-3 py-2"
                      value={formData.medical_officers_fulltime || ""}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-1/3">Part time</label>
                    <input
                      type="number"
                      name="medical_officers_parttime"
                      className="w-full border rounded px-3 py-2"
                      value={formData.medical_officers_parttime || ""}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">
                  (d) Number of workers examined by Factory Medical Officer
                </label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <label className="w-1/2">Workers in hazardous process</label>
                    <input
                      type="number"
                      name="workers_examined_hazardous"
                      className="w-full border rounded px-3 py-2"
                      value={formData.workers_examined_hazardous || ""}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-1/2">Others</label>
                    <input
                      type="number"
                      name="workers_examined_others"
                      className="w-full border rounded px-3 py-2"
                      value={formData.workers_examined_others || ""}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default HalfYearlyReturnForm;