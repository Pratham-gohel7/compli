import React, { useState } from 'react';

const HalfYearlyReturnForm = () => {
  const [formData, setFormData] = useState({
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
    mandays_adults_male: 0,  
    mandays_adults_female: 0, 
    mandays_adolescents_male: 0,
    mandays_adolescents_female: 0,
    mandays_children_male: 0,
    mandays_children_female: 0,
    
    // Section 9: Average workers
    avg_workers_adults_male: 0,
    avg_workers_adults_female: 0,
    avg_workers_adolescents_male: 0,
    avg_workers_adolescents_female: 0,
    avg_workers_children_male: 0,
    avg_workers_children_female: 0,
    
    // Section 10: Medical info
    hazardous_process_workers: 0,
    hazardous_agents: '',
    medical_officers_fulltime: 0,
    medical_officers_parttime: 0,
    workers_examined_hazardous: 0,
    workers_examined_others: 0,
    
  });

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
            className="input input-bordered w-full"
            value={formData[`${prefix}_male`]}
            onChange={handleChange}
            min="0"
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="number"
            name={`${prefix}_female`}
            className="input input-bordered w-full"
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
      <div className="mb-8">
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
      const response = await fetch('http://localhost:5001/api/half-yearly-return/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
        // Optionally reset form here
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="form-container">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
        <h2 className="text-center text-xl font-bold">Form No. 25</h2>
        <p className="text-center font-medium mt-1 mb-4">
          Half Yearly Return <br />
          For the half year ending June 20
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center my-4">
            <div className="text-center">
              <label className="block font-medium mb-1">
                Reporting Period <span className="text-sm text-gray-500">(End of June or December – Year)</span>
              </label>
              <input
                type="month"
                name="reporting_period"
                className="input-field w-auto text-center"
                value={formData.reporting_period}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium">1. Name of factory</label>
                <input
                  type="text"
                  name="factory_name"
                  className="input-field w-full"
                  value={formData.factory_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">2. Name of Occupier</label>
                <input
                  type="text"
                  name="occupier_name"
                  className="input-field w-full"
                  value={formData.occupier_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">3. Name of Manager</label>
                <input
                  type="text"
                  name="manager_name"
                  className="input-field w-full"
                  value={formData.manager_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">4. District</label>
                <input
                  type="text"
                  name="district"
                  className="input-field w-full"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  5. Full postal address of the factory (including PIN Code)
                </label>
                <textarea
                  name="postal_address"
                  className="input-field resize-none h-24 w-full"
                  value={formData.postal_address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Registration number</label>
                <input
                  type="text"
                  name="registration_number"
                  className="input-field w-full"
                  value={formData.registration_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Licence number</label>
                <input
                  type="text"
                  name="license_number"
                  className="input-field w-full"
                  value={formData.license_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  *NIC Code number <span className="text-sm text-gray-500">(As given in the licence)</span>
                </label>
                <input
                  type="text"
                  name="nic_code"
                  className="input-field w-full"
                  value={formData.nic_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xl font-semibold">6. Industry</label>
            <div className="flex items-center gap-4">
              <label className="w-1/4">(a) Nature of Industry</label>
              <input
                type="text"
                name="industry_nature"
                className="input input-bordered w-full"
                value={formData.industry_nature}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-1/4">(b) Sector Industry</label>
              <select
                name="industry_sector"
                className="input input-bordered w-full"
                value={formData.industry_sector}
                onChange={handleChange}
                required
              >
                <option value="">Select Sector</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-1/4">(c) Applicable Clauses</label>
              <div className="flex flex-col gap-2">
                {['2(m)(i)', '2(m)(ii)', 'Section 85'].map((clause) => (
                  <label key={clause} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value={clause}
                      checked={formData.applicable_clauses.includes(clause)}
                      onChange={handleChange}
                    />
                    {clause}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Factory Work Days */}
          <div>
            <label className="text-xl font-semibold">
              7. Number of days factory worked during the half year ending 30th June 20..
            </label>
            <input
              type="number"
              name="factory_work_days"
              className="input input-bordered w-full"
              value={formData.factory_work_days}
              onChange={handleChange}
              min="0"
              max="186" // Max days in half year
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
          <div>
            <label className="text-xl font-semibold">10. Medical Information</label>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-4">
                <label className="w-1/2">
                  (a) Total number of workers employed in hazardous processes
                </label>
                <input
                  type="number"
                  name="hazardous_process_workers"
                  className="input input-bordered w-full"
                  value={formData.hazardous_process_workers}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-1/2">(b) Name of the hazardous agents</label>
                <input
                  type="text"
                  name="hazardous_agents"
                  className="input input-bordered w-full"
                  value={formData.hazardous_agents}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="w-1/2">(c) Number of medical officers employed</label>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="w-1/3">Full time</label>
                    <input
                      type="number"
                      name="medical_officers_fulltime"
                      className="input input-bordered w-full"
                      value={formData.medical_officers_fulltime}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="w-1/3">Part time</label>
                    <input
                      type="number"
                      name="medical_officers_parttime"
                      className="input input-bordered w-full"
                      value={formData.medical_officers_parttime}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="w-1/2">
                    (d) Number of workers examined by Factory Medical Officer
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="w-1/2">Workers in hazardous process</label>
                    <input
                      type="number"
                      name="workers_examined_hazardous"
                      className="input input-bordered w-full"
                      value={formData.workers_examined_hazardous}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="w-1/2">Others</label>
                    <input
                      type="number"
                      name="workers_examined_others"
                      className="input input-bordered w-full"
                      value={formData.workers_examined_others}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
                    type="submit" 
                    className="submit-btn px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>
        </form>
      </div>
    </div>
  );
};

export default HalfYearlyReturnForm;

