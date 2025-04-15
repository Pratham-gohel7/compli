import React from "react";

const PartD_H = ({ handleChange }) => {
    return (
        <div className="p-4">
            {/* Section H - Reporting of Accidents */}
            <div className="form-header mb-4">
                <p className="text-lg font-semibold">(H) Reporting of Accidents to Factory Inspectorate</p>
            </div>

            {/* Compliance Question */}
            <div className="form-group mb-3">
                <label className="font-medium">
                    (1) Whether arrangements are made to report the accidents involving more than 48 hours absence including serious and fatal to Factory Inspectorate in Form No. 21? (Sec. 88, GFR 103)
                </label>
                <select name="accidentReporting" onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-40" defaultValue="Yes">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Null">Null</option>
                </select>
            </div>

            {/* Table for Number of Accidents and Dangerous Occurrences */}
            <div className="p-4">
                {/* Table for Number of Accidents and Dangerous Occurrences */}
                <h3 className="text-lg font-semibold text-center mb-4">Number of Accidents and Dangerous Occurrences during Previous Year</h3>
                <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th rowSpan="3" className="border border-gray-400 px-4 py-2">Category</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-2">Only Non-Fatal Injuries</th>
                            <th colSpan="5" className="border border-gray-400 px-4 py-2">Fatal Injuries as well as Non-Fatal Injuries</th>
                        </tr>
                        <tr className="bg-gray-200">
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Accidents/ Occurrences</th>
                            <th colSpan="2" className="border border-gray-400 px-4 py-2">Number of Persons Injured</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Accidents/ Occurrences</th>
                            <th colSpan="4" className="border border-gray-400 px-4 py-2">Number of Persons</th>
                        </tr>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Inside Factory</th>
                            <th className="border border-gray-400 px-4 py-2">Outside Factory</th>
                            <th className="border border-gray-400 px-4 py-2">Injured Inside</th>
                            <th className="border border-gray-400 px-4 py-2">Injured Outside</th>
                            <th className="border border-gray-400 px-4 py-2">Killed Inside</th>
                            <th className="border border-gray-400 px-4 py-2">Killed Outside</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {[
                            "Accidents including dangerous occurrences and major accidents involving injuries/deaths",
                            "Dangerous occurrences not involving injuries/deaths",
                            "Dangerous occurrences involving injuries/deaths",
                            "Major accidents involving injuries/deaths",
                            "Major accidents not involving injuries/deaths"
                        ].map((category, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{category}</td>
                                {[...Array(8)].map((_, colIndex) => (
                                    <td key={colIndex} className="border border-gray-400 px-4 py-2">
                                        <input
                                            type="text"
                                            name={`accident_${rowIndex}_${colIndex}`}
                                            className="w-full text-center border border-gray-300 rounded-md p-1"
                                            onChange={handleChange}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table for Injuries Inside the Factory */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-center mb-4">
                    (3) Injuries Occurring Inside the Factory During the Previous Year
                </h3>

                <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th rowSpan="3" className="border border-gray-400 px-4 py-2">Category</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-2">Hazardous Process under Section 2(b)</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-2">Dangerous Operations under Section 87</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-2">Others</th>
                        </tr>
                        <tr className="bg-gray-200">
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Accidents</th>
                            <th colSpan="2" className="border border-gray-400 px-4 py-2">Persons Injured</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Accidents</th>
                            <th colSpan="2" className="border border-gray-400 px-4 py-2">Persons Injured</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Accidents</th>
                            <th colSpan="2" className="border border-gray-400 px-4 py-2">Persons Injured</th>
                        </tr>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Fatal</th>
                            <th className="border border-gray-400 px-4 py-2">Non-Fatal</th>
                            <th className="border border-gray-400 px-4 py-2">Fatal</th>
                            <th className="border border-gray-400 px-4 py-2">Non-Fatal</th>
                            <th className="border border-gray-400 px-4 py-2">Fatal</th>
                            <th className="border border-gray-400 px-4 py-2">Non-Fatal</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {[...Array(4)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{rowIndex + 1}</td>
                                {[...Array(9)].map((_, colIndex) => (
                                    <td key={colIndex} className="border border-gray-400 px-4 py-2">
                                        <input
                                            type="text"
                                            name={`injury_${rowIndex}_${colIndex}`}
                                            className="w-full text-center border border-gray-300 rounded-md p-1"
                                            onChange={handleChange}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





            {/* Section for Nonfatal Injuries */}
            <h3 className="text-lg font-semibold mt-6">Nonfatal Injuries</h3>
            <div className="form-group mb-3">
                <label className="font-medium">(i) Nonfatal injuries where injured workers returned to work during the same year:</label>
                <div className="flex items-center gap-2">
                    <span>Number of injuries:</span>
                    <input type="text" name="nonfatal_injuries_same_year" className="border border-gray-300 p-2 rounded-md w-40" onChange={handleChange} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span>Mandays lost due to injuries:</span>
                    <input type="text" name="mandays_lost" className="border border-gray-300 p-2 rounded-md w-40" onChange={handleChange} />
                </div>
            </div>

            <div className="form-group mb-3">
                <label className="font-medium">(ii) Nonfatal injuries occurring in the previous year where workers returned to work in the reporting year:</label>
                <div className="flex items-center gap-2">
                    <span>Number of injuries:</span>
                    <input type="text" name="nonfatal_injuries_prev_year" className="border border-gray-300 p-2 rounded-md w-40" onChange={handleChange} />
                </div>
                <div className="flex items-center gap-2">
                    <span>Mandays lost due to injuries (total for previous and current year):</span>
                    <input type="text" name="mandays_lost_prev_year" className="border border-gray-300 p-2 rounded-md w-40" onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default PartD_H;
