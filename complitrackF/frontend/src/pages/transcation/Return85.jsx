import React, { useState } from "react";

const Return85 = () => {
    const [formData, setFormData] = useState({
        reporting_period: "",
        employer_name: "",
        employer_address: "",
        contact_person_name: "",
        contact_telephone: "",
        contact_mobile: "",
        sector: "Select Sector",
        total_supervisors: "",
        total_workers: "",
        total_employments: "",
        local_supervisor_percentage: "",
        local_workers_percentage: "",
        total_percentage: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-calculate totals if supervisor or worker counts change
        if (name === 'total_supervisors' || name === 'total_workers') {
            const supervisors = name === 'total_supervisors' ? value : formData.total_supervisors;
            const workers = name === 'total_workers' ? value : formData.total_workers;
            
            if (supervisors && workers) {
                setFormData(prev => ({
                    ...prev,
                    total_employments: String(Number(supervisors) + Number(workers))
                }));
            }
        }

        // Auto-calculate total percentage if either percentage changes
        if (name === 'local_supervisor_percentage' || name === 'local_workers_percentage') {
            const supervisorPct = name === 'local_supervisor_percentage' ? value : formData?.local_supervisor_percentage;
            const workerPct = name === 'local_workers_percentage' ? value : formData?.local_workers_percentage;
            
            if (supervisorPct && workerPct) {
                setFormData(prev => ({
                    ...prev,
                    total_percentage: (Number(supervisorPct) + Number(workerPct))
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            'reporting_period', 'employer_name', 'employer_address',
            'contact_person_name', 'contact_mobile', 'sector',
            'total_supervisors', 'total_workers',
            'local_supervisor_percentage', 'local_workers_percentage'
          ];
        
          const missingFields = requiredFields.filter(field => !formData[field]);
          
          if (missingFields.length > 0) {
            alert(`Missing required fields: ${missingFields.join(', ')}`);
            return;
          }
        console.log("here i am reachedS")
        
        // Prepare the data for submission
        const submissionData = {
            ...formData,    
            total_supervisors: Number(formData.total_supervisors),
            total_workers: Number(formData.total_workers),
            local_supervisor_percentage: Number(formData.local_supervisor_percentage),
            local_workers_percentage: Number(formData.local_workers_percentage),
            total_employments: Number(formData.total_employments),
            total_percentage: Number(formData.total_percentage)
        };

        try {
            const response = await fetch('http://localhost:5001/api/returns/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            alert('Form submitted successfully!');
            // Reset form after successful submission
            setFormData({
                reporting_period: "",
                employer_name: "",
                employer_address: "",
                contact_person_name: "",
                contact_telephone: "",
                contact_mobile: "",
                sector: "Select Sector",
                total_supervisors: "",
                total_workers: "",
                total_employments: "",
                local_supervisor_percentage: "",
                local_workers_percentage: "",
                total_percentage: ""
            });
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white border rounded-xl shadow-md space-y-6">
                <h2 className="text-xl font-bold text-center mt-2">
                    Information Regarding Local and Total Employment as per the 85% Return Requirement
                </h2>
                
                {/* Reporting Period */}
                <div className='px-4 my-2'>
                    <label className="block font-medium mb-1">
                        End of June/December – Year
                    </label>
                    <input
                        type="month"
                        name="reporting_period"
                        value={formData.reporting_period}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-auto"
                        required
                    />
                </div>

                {/* Employer Name & Address */}
                <div className='px-4 my-2'>
                    <label className="block font-medium mb-1">1. Name & Address of Employer</label>
                    <input 
                        type="text" 
                        name="employer_name"
                        value={formData.employer_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mb-2" 
                        placeholder="Enter name" 
                        required
                    />
                    <textarea 
                        name="employer_address"
                        value={formData.employer_address}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2" 
                        placeholder="Enter address" 
                        rows={2}
                        required
                    ></textarea>
                </div>

                {/* Contact Person Info */}
                <div className='px-4 my-2'>
                    <label className="block font-medium mb-1">
                        2. Name of Contact Person with Telephone Number & Mobile Number
                    </label>
                    <input 
                        type="text" 
                        name="contact_person_name"
                        value={formData.contact_person_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mb-2" 
                        placeholder="Enter name" 
                        required
                    />
                    <input 
                        type="tel" 
                        name="contact_telephone"
                        value={formData.contact_telephone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 mb-2" 
                        placeholder="Telephone Number"
                    />
                    <input 
                        type="tel" 
                        name="contact_mobile"
                        value={formData.contact_mobile}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2" 
                        placeholder="Mobile Number" 
                        required
                    />
                </div>

                {/* Sector Selection */}
                <div className='px-4 my-2'>
                    <label className="block font-medium mb-1">3. Sector</label>
                    <select 
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="Select Sector">Select Sector</option>
                        <option value="Private-Act Establishment">Private-Act Establishment</option>
                        <option value="Central Govt. Under Taking">Central Govt. Under Taking</option>
                        <option value="State Govt. Under Taking">State Govt. Under Taking</option>
                    </select>
                </div>

                {/* Employment Info Table */}
                <div className='px-4 my-2'>
                    <label className="block font-medium mb-2">4. Employment Distribution</label>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-center">
                                    <th className="border px-2 py-1" colSpan="3">Total Employment</th>
                                    <th className="border px-2 py-1" colSpan="3">Local Employment out of Total Employment</th>
                                </tr>
                                <tr className="bg-gray-50 text-center">
                                    <th className="border px-2 py-1">Supervisor/Manager Cader</th>
                                    <th className="border px-2 py-1">Non Supervisor/Worker Cader</th>
                                    <th className="border px-2 py-1">Total</th>
                                    <th className="border px-2 py-1">Supervisor/Manager Cader (%)</th>
                                    <th className="border px-2 py-1">Non Supervisor/Worker Cader (%)</th>
                                    <th className="border px-2 py-1">Total (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="total_supervisors"
                                            value={formData.total_supervisors}
                                            onChange={handleChange}
                                            className="w-full px-1 py-1 border rounded" 
                                            min="0"
                                            required
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="total_workers"
                                            value={formData.total_workers}
                                            onChange={handleChange}
                                            className="w-full px-1 py-1 border rounded" 
                                            min="0"
                                            required
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="total_employments"
                                            value={formData.total_employments}
                                            readOnly
                                            className="w-full px-1 py-1 border rounded bg-gray-100" 
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="local_supervisor_percentage"
                                            value={formData.local_supervisor_percentage}
                                            onChange={handleChange}
                                            className="w-full px-1 py-1 border rounded" 
                                            placeholder="%" 
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            required
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="local_workers_percentage"
                                            value={formData.local_workers_percentage}
                                            onChange={handleChange}
                                            className="w-full px-1 py-1 border rounded" 
                                            placeholder="%" 
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            required
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input 
                                            type="number" 
                                            name="total_percentage"
                                            value={formData.total_percentage}
                                            readOnly
                                            className="w-full px-1 py-1 border rounded bg-gray-100" 
                                            placeholder="%" 
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

export default Return85;