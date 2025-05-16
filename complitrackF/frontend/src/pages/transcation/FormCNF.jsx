// import React from 'react';

// const FormCNF = () => {
//   return (
//     <div className='form-container'>

//     <form className="p-6 max-w-3xl mx-auto border rounded-lg shadow-sm bg-white space-y-5">
//       <h2 className="text-xl font-bold text-center">Form of Notification of Vacancies</h2>

//       {/* 1. Employer Name and Address */}
//       <div className='px-4'>
//         <label className="block font-medium mb-2">Name and Address of Employer</label>
//         <input type="text" className="w-full border px-3 py-2 rounded mb-2" placeholder="Enter name" />
//         <textarea className="w-full border px-3 py-2 rounded" rows="2" placeholder="Enter address" />
//       </div>

//       {/* 2. Telephone Number */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Telephone Number of the Employer (if any)</label>
//         <input type="tel" className="w-auto border px-3 py-2 rounded" placeholder="Enter telephone number" />
//       </div>

//       {/* 3. Nature of Vacancy */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Nature of Vacancy</label>
//         <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Enter nature of vacancy" />
//       </div>

//       {/* 3a. Type of Workers */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Type of Workers Required (Designation)</label>
//         <input type="text" className="w-full border px-3 py-2 rounded" />
//       </div>

//       {/* 3b. Description of Duties */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Description of Duties</label>
//         <textarea className="w-full border px-3 py-2 rounded" rows="3" />
//       </div>

//       {/* 3c. Qualifications */}
//       <div className="flex flex-col px-4 my-2 md:flex-row md:space-x-4">
//         <div className="flex-1">
//           <label className="block font-medium mb-1">Essential Qualification</label>
//           <input type="text" className="w-full border px-3 py-2 rounded mb-2" placeholder="Essential" />
//         </div>
//         <div className="flex-1">
//           <label className="block font-medium mb-1">Desirable Qualification</label>
//           <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Desirable" />
//         </div>
//       </div>

//       {/* 3d. Age Limit */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Age Limit (if any)</label>
//         <input type="number" className="w-auto border px-3 py-2 rounded" placeholder='Age limit'/>
//       </div>

//       {/* 3e. Women Eligibility */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Whether Women are Eligible?</label>
//         <select className="w-full border px-3 py-2 rounded">
//           <option value="">Select</option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </div>

//       {/* 4. Number of Vacancies */}
//       <div className="flex flex-col md:flex-row md:space-x-4 px-4 my-2">
//         <div className="flex-1">
//           <label className="block font-medium mb-1">Regular Vacancies</label>
//           <input type="number" className="w-full border px-3 py-2 rounded mb-2" placeholder="Regular" />
//         </div>
//         <div className="flex-1">
//           <label className="block font-medium mb-1">Temporary Vacancies</label>
//           <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Temporary" />
//         </div>
//       </div>

//       {/* 5. Pay and Allowance */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Pay and Allowance</label>
//         {/* <input type="text" className="w-full border px-3 py-2 rounded" />
//          */}
//          <textarea className="w-full border px-3 py-2 rounded" rows="2" placeholder='Pay and Allowance'/>
//       </div>

//       {/* 6. Place of Work */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Place of Work</label>
//         <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Town / Village and District" />
//       </div>

//       {/* 7. Probable Date of Filling */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Probable Date of Vacancy Filling</label>
//         <input type="date" className="w-full border px-3 py-2 rounded" />
//       </div>

//       {/* 8. Interview/Test Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 my-2">
//         <div>
//           <label className="block font-medium mb-1">Date of Interview / Test</label>
//           <input type="date" className="w-full border px-3 py-2 rounded" />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Time of Interview / Test</label>
//           <input type="time" className="w-full border px-3 py-2 rounded" />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block font-medium mb-1">Place of Interview / Test</label>
//           <input type="text" className="w-full border px-3 py-2 rounded" />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block font-medium mb-1">To Whom Applicants Should Report</label>
//           {/* <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Designation and Address" /> */}
//           <textarea className="w-full border px-3 py-2 rounded" rows="2" placeholder='Designation and Address'/>
//         </div>
//       </div>

// <div className="border p-4 my-4 rounded">
//   <label className="block font-medium mb-2">
//     Reservation Categories (If applicable)
//   </label>
//   <div className="flex flex-wrap items-center gap-6">
//     <div className="flex items-center gap-2">
//       <label className="text-sm">SC:</label>
//       <input type="number" className="w-20 border px-2 py-1 rounded" />
//     </div>
//     <div className="flex items-center gap-2">
//       <label className="text-sm">ST:</label>
//       <input type="number" className="w-20 border px-2 py-1 rounded" />
//     </div>
//     <div className="flex items-center gap-2">
//       <label className="text-sm">Ex-Servicemen:</label>
//       <input type="number" className="w-24 border px-2 py-1 rounded" />
//     </div>
//     <div className="flex items-center gap-2">
//       <label className="text-sm">PH:</label>
//       <input type="number" className="w-20 border px-2 py-1 rounded" />
//     </div>
//     <div className="flex items-center gap-2">
//       <label className="text-sm">Others:</label>
//       <input type="number" className="w-20 border px-2 py-1 rounded" />
//     </div>
//   </div>
// </div>


//       {/* 9.2 Declaration */}
//       <div className="bg-gray-50 p-4 px-4 my-2 border rounded">
//         <p className="text-sm">
//           <strong>Note:</strong> The vacancies shall be re-notified in writing to the appropriate Employment Exchange,
//           if there is any change in the particulars already furnished.
//         </p>
//       </div>

//       {/* 10. Additional Info */}
//       <div className='px-4 my-2'>
//         <label className="block font-medium mb-1">Any Other Relevant Information</label>
//         <textarea className="w-full border px-3 py-2 rounded" rows="3" />
//       </div>
//     </form>

//     {/* Submit Button */}
//     <button className="submit-btn px-4 my-2">Submit</button>
//     </div>
//   );
// };

// export default FormCNF;


import React, { useState } from 'react';

const FormCNF = () => {
  // Initialize form state with all fields
  const [formData, setFormData] = useState({
    employer_name: '',
    employer_address: '',
    telephone: '',
    vacancy_nature: '',
    worker_type: '',
    duties_description: '',
    essential_qualification: '',
    desirable_qualification: '',
    age_limit: '',
    women_eligible: '',
    regular_vacancies: '',
    temporary_vacancies: '',
    total_vacancies: '',
    pay_allowance: '',
    work_place: '',
    probable_filling_date: '',
    interview_date: '',
    interview_time: '',
    interview_place: '',
    report_to: '',
    sc_vacancies: '',
    st_vacancies: '',
    exservicemen_vacancies: '',
    ph_vacancies: '',
    other_vacancies: '',
    other_information: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'regular_vacancies' || name === 'temporary_vacancies') {
      const regularVacancies = name === 'regular_vacancies' ? value : formData.regular_vacancies;
      const temporaryVacancies = name === 'temporary_vacancies' ? value : formData.temporary_vacancies;
      
      if (regularVacancies || temporaryVacancies) {
          setFormData(prev => ({
              ...prev,
              total_vacancies  : String(Number(regularVacancies) + Number(temporaryVacancies))
          }));
      }
  }
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  setIsSubmitting(true);
  setErrors({});

  // Client-side validation
  const requiredFields = {
    'employer_name': 'Employer name is required',
    'employer_address': 'Employer address is required',
    'vacancy_nature': 'Nature of vacancy is required',
    'worker_type': 'Type of workers required',
    'duties_description': 'Description of duties is required',
    'essential_qualification': 'Essential qualification is required',
    'women_eligible': 'Please specify if women are eligible',
    'regular_vacancies': 'Regular vacancies count is required',
    'temporary_vacancies': 'Temporary vacancies count is required',
    'pay_allowance': 'Pay and allowance details are required',
    'work_place': 'Place of work is required',
    'probable_filling_date': 'Probable filling date is required'
  };
  
  const errors = Object.entries(requiredFields)
    .filter(([field]) => !formData[field])
    .reduce((acc, [field, message]) => ({
      ...acc,
      [field]: message
    }), {});

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }

  // 2. Prepare clean data ONCE
  const submissionData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
      key,
      value === '' ? null : 
      ['regular_vacancies', 'temporary_vacancies'].includes(key) ? Number(value) || 0 :
      value
    ])
  );

    
    try {
      const response = await fetch('http://localhost:5001/api/form-cnf/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle validation errors
        if (result.errors) {
          const newErrors = {};
          result.errors.forEach(err => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
          throw new Error('Please correct the highlighted fields');
        }
        console.log("Reached here")
        throw new Error(result.error || 'Submission failed');
      }

      // Success case
      setSubmissionResult(result.data);
      alert(`Form submitted successfully! Reference #: ${result.data.referenceNumber}`);

    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render error messages
  const renderError = (fieldName) => (
    errors[fieldName] && (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[fieldName]}
      </div>
    )
  );

  return (
    <div className='form-container'>
      {submissionResult && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Form submitted successfully! Your reference number is: <strong>{submissionResult.referenceNumber}</strong></p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto border rounded-lg shadow-sm bg-white space-y-5">
        <h2 className="text-xl font-bold text-center">Form of Notification of Vacancies</h2>

        {/* 1. Employer Name and Address */}
        <div className='px-4'>
          <label className="block font-medium mb-2">
            Name and Address of Employer
          </label>
          <input 
            type="text" 
            name="employer_name"
            value={formData.employer_name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded mb-2 ${
              errors.employer_name ? 'border-red-500' : ''
            }`}
            placeholder="Enter name" 
          />
          {renderError('employer_name')}
          <textarea 
            name="employer_address"
            value={formData.employer_address}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.employer_address ? 'border-red-500' : ''
            }`}
            rows="2" 
            placeholder="Enter address" 
          />
          {renderError('employer_address')}
        </div>

        {/* 2. Telephone Number */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Telephone Number of the Employer (if any)</label>
          <input 
            type="tel" 
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-auto border px-3 py-2 rounded" 
            placeholder="Enter telephone number" 
          />
        </div>

        {/* 3. Nature of Vacancy */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Nature of Vacancy</label>
          <input 
            type="text" 
            name="vacancy_nature"
            value={formData.vacancy_nature}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.vacancy_nature ? 'border-red-500' : ''
            }`}
            placeholder="Enter nature of vacancy" 
          />
          {renderError('vacancy_nature')}
        </div>

        {/* 3a. Type of Workers */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Type of Workers Required (Designation)</label>
          <input 
            type="text" 
            name="worker_type"
            value={formData.worker_type}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.worker_type ? 'border-red-500' : ''
            }`}
          />
          {renderError('worker_type')}
        </div>

        {/* 3b. Description of Duties */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Description of Duties</label>
          <textarea 
            name="duties_description"
            value={formData.duties_description}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.duties_description ? 'border-red-500' : ''
            }`}
            rows="3" 
          />
          {renderError('duties_description')}
        </div>

        {/* 3c. Qualifications */}
        <div className="flex flex-col px-4 my-2 md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Essential Qualification</label>
            <input 
              type="text" 
              name="essential_qualification"
              value={formData.essential_qualification}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mb-2 ${
                errors.essential_qualification ? 'border-red-500' : ''
              }`}
              placeholder="Essential" 
            />
            {renderError('essential_qualification')}
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Desirable Qualification</label>
            <input 
              type="text" 
              name="desirable_qualification"
              value={formData.desirable_qualification}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded" 
              placeholder="Desirable" 
            />
          </div>
        </div>

        {/* 3d. Age Limit */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Age Limit (if any)</label>
          <input 
            type="number" 
            name="age_limit"
            value={formData.age_limit}
            onChange={handleChange}
            className="w-auto border px-3 py-2 rounded" 
            placeholder="Age limit"
          />
        </div>

        {/* 3e. Women Eligibility */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Whether Women are Eligible?</label>
          <select 
            name="women_eligible"
            value={formData.women_eligible}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.women_eligible ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {renderError('women_eligible')}
        </div>

        {/* 4. Number of Vacancies */}
        <div className="flex flex-col md:flex-row md:space-x-4 px-4 my-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Regular Vacancies</label>
            <input 
              type="number" 
              name="regular_vacancies"
              value={formData.regular_vacancies}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mb-2 ${
                errors.regular_vacancies ? 'border-red-500' : ''
              }`}
              placeholder="Regular" 
              min="0"
            />
            {renderError('regular_vacancies')}
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Temporary Vacancies</label>
            <input 
              type="number" 
              name="temporary_vacancies"
              value={formData.temporary_vacancies}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.temporary_vacancies ? 'border-red-500' : ''
              }`}
              placeholder="Temporary" 
              min="0"
            />
            {renderError('temporary_vacancies')}
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Total Vacancies</label>
            <input 
              type="number" 
              name="total_vacancies"
              value={formData.total_vacancies}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.total_vacancies ? 'border-red-500' : ''
              }`}
              placeholder="Total" 
              min="0"
            />
            {renderError('total_vacancies')}
          </div>
        </div>

        {/* 5. Pay and Allowance */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Pay and Allowance</label>
          <textarea 
            name="pay_allowance"
            value={formData.pay_allowance}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.pay_allowance ? 'border-red-500' : ''
            }`}
            rows="2" 
            placeholder="Pay and Allowance"
          />
          {renderError('pay_allowance')}
        </div>

        {/* 6. Place of Work */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Place of Work</label>
          <input 
            type="text" 
            name="work_place"
            value={formData.work_place}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.work_place ? 'border-red-500' : ''
            }`}
            placeholder="Town / Village and District" 
          />
          {renderError('work_place')}
        </div>

        {/* 7. Probable Date of Filling */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Probable Date of Vacancy Filling</label>
          <input 
            type="date" 
            name="probable_filling_date"
            value={formData.probable_filling_date}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.probable_filling_date ? 'border-red-500' : ''
            }`}
          />
          {renderError('probable_filling_date')}
        </div>

        {/* 8. Interview/Test Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 my-2">
          <div>
            <label className="block font-medium mb-1">Date of Interview / Test</label>
            <input 
              type="date" 
              name="interview_date"
              value={formData.interview_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded" 
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Time of Interview / Test</label>
            <input 
              type="time" 
              name="interview_time"
              value={formData.interview_time}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Place of Interview / Test</label>
            <input 
              type="text" 
              name="interview_place"
              value={formData.interview_place}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">To Whom Applicants Should Report</label>
            <textarea 
              name="report_to"
              value={formData.report_to}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded" 
              rows="2" 
              placeholder="Designation and Address"
            />
          </div>
        </div>

        {/* 9. Reservation Categories */}
        <div className="border p-4 my-4 rounded">
          <label className="block font-medium mb-2">
            Reservation Categories (If applicable)
          </label>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm">SC:</label>
              <input 
                type="number" 
                name="sc_vacancies"
                value={formData.sc_vacancies}
                onChange={handleChange}
                className="w-20 border px-2 py-1 rounded" 
                min="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">ST:</label>
              <input 
                type="number" 
                name="st_vacancies"
                value={formData.st_vacancies}
                onChange={handleChange}
                className="w-20 border px-2 py-1 rounded" 
                min="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Ex-Servicemen:</label>
              <input 
                type="number" 
                name="exservicemen_vacancies"
                value={formData.exservicemen_vacancies}
                onChange={handleChange}
                className="w-24 border px-2 py-1 rounded" 
                min="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">PH:</label>
              <input 
                type="number" 
                name="ph_vacancies"
                value={formData.ph_vacancies}
                onChange={handleChange}
                className="w-20 border px-2 py-1 rounded" 
                min="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Others:</label>
              <input 
                type="number" 
                name="other_vacancies"
                value={formData.other_vacancies}
                onChange={handleChange}
                className="w-20 border px-2 py-1 rounded" 
                min="0"
              />
            </div>
          </div>
        </div>

        {/* 10. Additional Info */}
        <div className='px-4 my-2'>
          <label className="block font-medium mb-1">Any Other Relevant Information</label>
          <textarea 
            name="other_information"
            value={formData.other_information}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded" 
            rows="3" 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`submit-btn px-4 my-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FormCNF;