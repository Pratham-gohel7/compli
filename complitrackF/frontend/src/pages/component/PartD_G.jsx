import React from "react";

const PartD_G = ({ handleChange, formData }) => {
//   useEffect(() => {
//     const manDaysTotal =
//       Number(formData.maleManDays || 0) + Number(formData.femaleManDays || 0);
//     if (formData.totalManDays !== manDaysTotal) {
//       handleChange({ target: { name: "totalManDays", value: manDaysTotal } });
//     }
//   }, [formData.maleManDays, formData.femaleManDays]);

  return (
    <div className="p-4">
      <div className="form-header mb-4">
        <p className="text-lg font-semibold">
          (G) Compliance Status for Annual Leave with Wages
        </p>
      </div>

      <div className="form-group mb-3">
        <label className="font-medium">
          (a) Whether leave with wages are allowed to the eligible employees
          (Sec.79)
        </label>
        <select
          name="leaveWithWagesAllowed"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md w-40"
          value={formData?.leaveWithWagesAllowed || "Yes"}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Null">Null</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="font-medium">
          (b) Total number of workers discharged/dismissed from service, quit
          employment, superannuated, or died while in service during the
          previous year
        </label>
        <input
          type="text"
          name="workersDischarged"
          className="border border-gray-300 p-2 rounded-md w-40"
          placeholder="NIL"
          onChange={handleChange}
          value={formData?.workersDischarged || ""}
        />
      </div>

      <div className="form-group mb-3">
        <label className="font-medium">
          (c) Number of workers in respect of whom wages in lieu of leave were
          paid
        </label>
        <input
          type="text"
          name="wagesInLieu"
          className="border border-gray-300 p-2 rounded-md w-40"
          placeholder="Enter number"
          onChange={handleChange}
          value={formData?.wagesInLieu || ""}
        />
      </div>

      {/* Workers Employed Tables */}
      {[
        {
          title: "Total number of workers employed during the year",
          male: "directMale",
          female: "directFemale",
          total: "directTotal",
        },
        {
          title:
            "Number of workers who were entitled to annual leave with wages during the year",
          male: "entitledMale",
          female: "entitledFemale",
          total: "entitledTotal",
        },
        {
          title:
            "Number of workers who were granted annual leave with wages during the year",
          male: "grantedMale",
          female: "grantedFemale",
          total: "grantedTotal",
        },
      ].map((table, idx) => (
        <div key={idx} className="mt-6">
          <p className="font-semibold mb-2">{table.title}</p>
          <table className="w-full border-collapse border border-gray-400 text-sm text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2"></th>
                <th className="border border-gray-400 px-4 py-2">Men</th>
                <th className="border border-gray-400 px-4 py-2">Women</th>
                <th className="border border-gray-400 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Adults Row */}
              <tr>
                <td className="border border-gray-400 px-4 py-2">Adults</td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={table.male}
                    value={formData?.[table.male] || ""}
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={table.female}
                    value={formData?.[table.female] || ""}
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={table.total}
                    value={formData?.[table.total] || ""}
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
              </tr>

              {/* Young Persons Row */}
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Young Persons
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={`young${
                      table.male.charAt(0).toUpperCase() + table.male.slice(1)
                    }`}
                    value={
                      formData?.[
                        `young${
                          table.male.charAt(0).toUpperCase() +
                          table.male.slice(1)
                        }`
                      ] || ""
                    }
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={`young${
                      table.female.charAt(0).toUpperCase() +
                      table.female.slice(1)
                    }`}
                    value={
                      formData?.[
                        `young${
                          table.female.charAt(0).toUpperCase() +
                          table.female.slice(1)
                        }`
                      ] || ""
                    }
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    name={`young${
                      table.total.charAt(0).toUpperCase() + table.total.slice(1)
                    }`}
                    value={
                      formData?.[
                        `young${
                          table.total.charAt(0).toUpperCase() +
                          table.total.slice(1)
                        }`
                      ] || ""
                    }
                    onChange={handleChange}
                    className="w-full border-none text-center"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <br />
      <br />
    </div>
  );
};

export default PartD_G;
