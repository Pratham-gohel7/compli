const PartD_H = ({ formData = {}, handleChange }) => {
  // Initialize with default values
  const {
    accidentReporting = "Yes",
    accidentsTable = [],
    injuriesTable = [],
    nonfatalInjuriesCurrentYear = {},
    nonfatalInjuriesPreviousYear = {}
  } = formData;

  // Default accidents table rows
  const defaultAccidentsRows = [
    {
      category: "Accidents including dangerous occurrences and major accidents involving injuries/deaths.",
      accidentsOccurrences: "",
      injuredInside: "",
      injuredOutside: "",
      fatalAccidents: "",
      fatalInjuredInside: "",
      fatalInjuredOutside: "",
      fatalKilledInside: "",
      fatalKilledOutside: ""
    },
    {
      category: "Dangerous occurrences not involving injuries/deaths.",
      accidentsOccurrences: "",
      injuredInside: "",
      injuredOutside: "",
      fatalAccidents: "",
      fatalInjuredInside: "",
      fatalInjuredOutside: "",
      fatalKilledInside: "",
      fatalKilledOutside: ""
    },
    {
      category: "Dangerous occurrences involving injuries/deaths.",
      accidentsOccurrences: "",
      injuredInside: "",
      injuredOutside: "",
      fatalAccidents: "",
      fatalInjuredInside: "",
      fatalInjuredOutside: "",
      fatalKilledInside: "",
      fatalKilledOutside: ""
    },
    {
      category: "Major accidents involving injuries/deaths.",
      accidentsOccurrences: "",
      injuredInside: "",
      injuredOutside: "",
      fatalAccidents: "",
      fatalInjuredInside: "",
      fatalInjuredOutside: "",
      fatalKilledInside: "",
      fatalKilledOutside: ""
    },
    {
      category: "Major accidents not involving injuries/deaths.",
      accidentsOccurrences: "",
      injuredInside: "",
      injuredOutside: "",
      fatalAccidents: "",
      fatalInjuredInside: "",
      fatalInjuredOutside: "",
      fatalKilledInside: "",
      fatalKilledOutside: "",
    }
  ];

  // Default injuries table row
  const defaultInjuriesRow = {
    hazardousProcessAccidents: "",
    hazardousProcessFatal: "",
    hazardousProcessNonfatal: "",
    dangerousOperationsAccidents: "",
    dangerousOperationsFatal: "",
    dangerousOperationsNonfatal: "",
    otherAccidents: "",
    otherFatal: "",
    otherNonfatal: ""
  };

  // Merge with existing data
  const mergedAccidentsTable = defaultAccidentsRows.map((defaultRow, index) => ({
    ...defaultRow,
    ...(accidentsTable[index] || {})
  }));

  const mergedInjuriesTable = Array(5).fill(0).map((_, index) => ({
    ...defaultInjuriesRow,
    ...(injuriesTable[index] || {})
  }));

  return (
    <div className="container my-4 p-4 bg-white rounded-lg shadow-sm">
      <h4 className="text-lg font-bold mb-4">(H) Reporting of Accidents to Factory Inspectorate</h4>

      {/* (1) Accident Reporting Select */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          (1) Whether arrangements are made to report the accidents? (Sec. 88, GFR 103)
        </label>
        <select
          name="accidentReporting"
          value={accidentReporting}
          onChange={(e) => handleChange(e, "partD.partD_H")}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Null">Null</option>
        </select>
      </div>

      {/* (2) Accidents Table */}
      <h5 className="text-md font-semibold mb-2">(2) Accidents and Dangerous Occurrences</h5>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" rowSpan="3">Category</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="3">Non-Fatal Injuries</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="5">Fatal + Non-Fatal</th>
            </tr>
            <tr>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" rowSpan="2">Accidents</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="2">Persons Injured</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" rowSpan="2">Fatal Accidents</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="4">Persons</th>
            </tr>
            <tr>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Inside</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Outside</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Injured Inside</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Injured Outside</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Killed Inside</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Killed Outside</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mergedAccidentsTable.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                  {row.category}
                </td>
                {[
                  "accidentsOccurrences", "injuredInside", "injuredOutside",
                  "fatalAccidents", "fatalInjuredInside", "fatalInjuredOutside",
                  "fatalKilledInside", "fatalKilledOutside"
                ].map((field) => (
                  <td key={field} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                    <input
                      type="number"
                      name={`accidentsTable[${index}].${field}`}
                      value={row[field]}
                      onChange={(e) => handleChange(e, "partD.partD_H")}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* (3) Injuries Table */}
      <h5 className="text-md font-semibold mb-2">(3) Injuries Inside Factory (Previous Year)</h5>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="3">Hazardous Process</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="3">Dangerous Operations</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200" colSpan="3">Others</th>
            </tr>
            <tr>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Accidents</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Fatal</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Non-Fatal</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Accidents</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Fatal</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Non-Fatal</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Accidents</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Fatal</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Non-Fatal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mergedInjuriesTable.map((row, index) => (
              <tr key={index}>
                {[
                  "hazardousProcessAccidents", "hazardousProcessFatal", "hazardousProcessNonfatal",
                  "dangerousOperationsAccidents", "dangerousOperationsFatal", "dangerousOperationsNonfatal",
                  "otherAccidents", "otherFatal", "otherNonfatal"
                ].map((field) => (
                  <td key={field} className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                    <input
                      type="number"
                      name={`injuriesTable[${index}].${field}`}
                      value={row[field]}
                      onChange={(e) => handleChange(e, "partD.partD_H")}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* (4) Non-Fatal Injuries */}
      <h5 className="text-md font-semibold mb-2">(4) Nonfatal Injuries</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-3"><strong>(i)</strong> Same year return:</p>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Injuries:</label>
            <input
              type="number"
              name="nonfatalInjuriesCurrentYear.numberOfInjuries"
              value={nonfatalInjuriesCurrentYear.numberOfInjuries || 0}
              onChange={(e) => handleChange(e, "partD.partD_H")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mandays Lost:</label>
            <input
              type="number"
              name="nonfatalInjuriesCurrentYear.mandaysLost"
              value={nonfatalInjuriesCurrentYear.mandaysLost || 0}
              onChange={(e) => handleChange(e, "partD.partD_H")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-3"><strong>(ii)</strong> Previous year return:</p>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Injuries:</label>
            <input
              type="number"
              name="nonfatalInjuriesPreviousYear.numberOfInjuries"
              value={nonfatalInjuriesPreviousYear.numberOfInjuries || 0}
              onChange={(e) => handleChange(e, "partD.partD_H")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mandays Lost:</label>
            <input
              type="number"
              name="nonfatalInjuriesPreviousYear.mandaysLost"
              value={nonfatalInjuriesPreviousYear.mandaysLost || 0}
              onChange={(e) => handleChange(e, "partD.partD_H")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartD_H;