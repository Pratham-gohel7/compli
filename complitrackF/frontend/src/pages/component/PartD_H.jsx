import React from 'react';

const PartD_H = ({ handleChange }) => {
  return (
    <div className="container my-4">
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

      <h5>(2) Number of Accidents and Dangerous Occurrences during Previous Year</h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th rowSpan="3">Category</th>
              <th colSpan="3">Accidents involving<br />Only non-fatal injuries</th>
              <th colSpan="5">Accidents involving<br />Fatal injuries as well as non-fatal injuries</th>
            </tr>
            <tr>
              <th rowSpan="2">Accidents/Occurrences</th>
              <th colSpan="2">Number of persons injured</th>
              <th rowSpan="2">Accidents/Occurrences</th>
              <th colSpan="4">Number of persons</th>
            </tr>
            <tr>
              <th>The factory</th>
              <th>Outside</th>
              <th>Injured Inside</th>
              <th>Injured Outside</th>
              <th>Killed Inside</th>
              <th>Killed Outside</th>
            </tr>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Accidents including dangerous occurrences and major accidents involving injuries/deaths.",
              "Dangerous occurrences not involving injuries/deaths.",
              "Dangerous occurrences involving injuries/deaths.",
              "Major accidents involving injuries/deaths.",
              "Major accidents not involving injuries/deaths.",
            ].map((label, index) => (
              <tr key={index}>
                <td className="text-start">{label}</td>
                {index <= 8
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <td key={i}>
                        <input type="text" className="form-control" />
                      </td>
                    ))
                  : (
                      <>
                        <td colSpan="8">
                          <input type="text" className="form-control" />
                        </td>
                      </>
                    )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section (3) - Injuries Table */}
      <h5>(3) Injuries occurring inside the factory during the previous year.</h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th colSpan="3">Hazardous Process under Section 2(cb)</th>
              <th colSpan="3">Dangerous operations under Section 87</th>
              <th colSpan="3">Others</th>
            </tr>
            <tr>
              <th rowSpan="2">Number of<br />Accidents</th>
              <th colSpan="2">Persons injured</th>
              <th rowSpan="2">Number of<br />Accidents</th>
              <th colSpan="2">Persons injured</th>
              <th rowSpan="2">Number of<br />Accidents</th>
              <th colSpan="2">Persons injured</th>
            </tr>
            <tr>
              <th>Fatal</th>
              <th>Nonfatal</th>
              <th>Fatal</th>
              <th>Nonfatal</th>
              <th>Fatal</th>
              <th>Nonfatal</th>
            </tr>
            <tr>
              {Array.from({ length: 9 }).map((_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render 5 empty input rows */}
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 9 }).map((_, colIndex) => (
                  <td key={colIndex}>
                    <input type="text" className="form-control" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section (4) - Nonfatal Injury Details */}
      <h5>(4)</h5>

      <p>
        <strong>(i)</strong> Nonfatal injuries (workers injured during the year in which injured workers returned to work during the same year).
      </p>
      <div className="mb-3">
        <label className="form-label">(a) Number of injuries:</label>
        <input type="number" className="form-control" />
      </div>
      <div className="mb-4">
        <label className="form-label">(b) Mandays lost due to injuries:</label>
        <input type="number" className="form-control" />
      </div>

      <p>
        <strong>(ii)</strong> Nonfatal injuries (workers injuries) occurring in the previous year in which injured workers returned to work during the year to which this information relates
      </p>
      <div className="mb-3">
        <label className="form-label">(a) Number of injuries:</label>
        <input type="number" className="form-control" />
      </div>
      <div className="mb-4">
        <label className="form-label">
          (b) Mandays lost due to injuries (this should be the total mandays lost during the previous year as well as in the current year):
        </label>
        <input type="number" className="form-control" />
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <p><strong>Place:</strong></p>
          <p><strong>Date:</strong></p>
        </div>
        <div className="col-md-6 text-end">
          <p><strong>Manager/Owner/Partner:</strong></p>

          <p><strong>Name of The Applicant Establishment:</strong></p>
          
        </div>
      </div>
    </div>
  );
};

export default PartD_H;


// import React from 'react';

// const PartD_H = ({ formData, handleChange }) => {
//   // const { partD_H } = formData;
//   // Safely access partD_H with default empty object if undefined
//   const partD_H = formData.partD_H || {};
  
//   // Ensure all nested objects exist
//   const accidentsTable = partD_H.accidentsTable || Array(5).fill({});
//   const injuriesTable = partD_H.injuriesTable || Array(5).fill({});
//   const nonfatalInjuriesCurrentYear = partD_H.nonfatalInjuriesCurrentYear || {};
//   const nonfatalInjuriesPreviousYear = partD_H.nonfatalInjuriesPreviousYear || {};

//   // Handler for nested objects in the injuries sections
//   const handleNestedChange = (section, field, value) => {
//     handleChange({
//       target: {
//         name: `partD_H.${section}.${field}`,
//         value: value
//       }
//     });
//   };

//   // Handler for table rows
//   const handleTableChange = (tableName, rowIndex, field, value) => {
//     handleChange({
//       target: {
//         name: `partD_H.${tableName}[${rowIndex}].${field}`,
//         value: value
//       }
//     });
//   };

//   // Define table column mappings for the accidents table
//   const accidentsTableColumns = [
//     'accidentsOccurrences',
//     'injuredInside',
//     'injuredOutside',
//     'fatalAccidents',
//     'fatalInjuredInside',
//     'fatalInjuredOutside',
//     'fatalKilledInside',
//     'fatalKilledOutside'
//   ];

//   // Define table column mappings for the injuries table
//   const injuriesTableColumns = [
//     'hazardousProcessAccidents',
//     'hazardousProcessFatal',
//     'hazardousProcessNonfatal',
//     'dangerousOperationsAccidents',
//     'dangerousOperationsFatal',
//     'dangerousOperationsNonfatal',
//     'otherAccidents',
//     'otherFatal',
//     'otherNonfatal'
//   ];

//   return (
//     <div className="container my-4">
//       <div className="form-header mb-4">
//         <p className="text-lg font-semibold">(H) Reporting of Accidents to Factory Inspectorate</p>
//       </div>

//       {/* Compliance Question */}
//       <div className="form-group mb-3">
//         <label className="font-medium">
//           (1) Whether arrangements are made to report the accidents involving more than 48 hours absence including serious and fatal to Factory Inspectorate in Form No. 21? (Sec. 88, GFR 103)
//         </label>
//         <select 
//           name="partD_H.accidentReporting"
//           onChange={handleChange}
//           className="border border-gray-300 p-2 rounded-md w-40" 
//           value={partD_H.accidentReporting || "Yes"}
//         >
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//           <option value="Null">Null</option>
//         </select>
//       </div>

//       <h5>(2) Number of Accidents and Dangerous Occurrences during Previous Year</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center align-middle">
//           <thead>
//             {/* ... (keep your existing table header structure) ... */}
//           </thead>
//           <tbody>
//             {partD_H.accidentsTable?.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td className="text-start">{row.category}</td>
//                 {accidentsTableColumns.map((field, colIndex) => (
//                   <td key={colIndex}>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={row[field] || 0}
//                       onChange={(e) => handleTableChange('accidentsTable', rowIndex, field, e.target.value)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Section (3) - Injuries Table */}
//       <h5>(3) Injuries occurring inside the factory during the previous year.</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center align-middle">
//           <thead>
//             {/* ... (keep your existing table header structure) ... */}
//           </thead>
//           <tbody>
//             {partD_H.injuriesTable?.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {injuriesTableColumns.map((field, colIndex) => (
//                   <td key={colIndex}>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={row[field] || 0}
//                       onChange={(e) => handleTableChange('injuriesTable', rowIndex, field, e.target.value)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Section (4) - Nonfatal Injury Details */}
//       <h5>(4)</h5>

//       <p>
//         <strong>(i)</strong> Nonfatal injuries (workers injured during the year in which injured workers returned to work during the same year).
//       </p>
//       <div className="mb-3">
//         <label className="form-label">(a) Number of injuries:</label>
//         <input
//           type="number"
//           className="form-control"
//           value={partD_H.nonfatalInjuriesCurrentYear?.numberOfInjuries || 0}
//           onChange={(e) => handleNestedChange('nonfatalInjuriesCurrentYear', 'numberOfInjuries', e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="form-label">(b) Mandays lost due to injuries:</label>
//         <input
//           type="number"
//           className="form-control"
//           value={partD_H.nonfatalInjuriesCurrentYear?.mandaysLost || 0}
//           onChange={(e) => handleNestedChange('nonfatalInjuriesCurrentYear', 'mandaysLost', e.target.value)}
//         />
//       </div>

//       <p>
//         <strong>(ii)</strong> Nonfatal injuries (workers injuries) occurring in the previous year in which injured workers returned to work during the year to which this information relates
//       </p>
//       <div className="mb-3">
//         <label className="form-label">(a) Number of injuries:</label>
//         <input
//           type="number"
//           className="form-control"
//           value={partD_H.nonfatalInjuriesPreviousYear?.numberOfInjuries || 0}
//           onChange={(e) => handleNestedChange('nonfatalInjuriesPreviousYear', 'numberOfInjuries', e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="form-label">
//           (b) Mandays lost due to injuries (this should be the total mandays lost during the previous year as well as in the current year):
//         </label>
//         <input
//           type="number"
//           className="form-control"
//           value={partD_H.nonfatalInjuriesPreviousYear?.mandaysLost || 0}
//           onChange={(e) => handleNestedChange('nonfatalInjuriesPreviousYear', 'mandaysLost', e.target.value)}
//         />
//       </div>

//       <div className="row mt-5">
//         <div className="col-md-6">
//           <p><strong>Place:</strong></p>
//           <input
//             type="text"
//             className="form-control"
//             name="partD_H.place"
//             value={partD_H.place || ''}
//             onChange={handleChange}
//           />
//           <p><strong>Date:</strong></p>
//           <input
//             type="date"
//             className="form-control"
//             name="partD_H.date"
//             value={partD_H.date || ''}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="col-md-6 text-end">
//           <p><strong>Manager/Owner/Partner:</strong></p>
//           <input
//             type="text"
//             className="form-control"
//             name="partD_H.managerOwnerPartner"
//             value={partD_H.managerOwnerPartner || ''}
//             onChange={handleChange}
//           />
//           <p><strong>Name of The Applicant Establishment:</strong></p>
//           <input
//             type="text"
//             className="form-control"
//             name="partD_H.applicantEstablishmentName"
//             value={partD_H.applicantEstablishmentName || ''}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartD_H;


// import React from 'react';

// const PartD_H = ({ formData, handleChange }) => {
//   // Safely access partD_H with default empty object if undefined
//   const partD_H = formData.partD_H || {};
  
//   // Ensure all nested objects exist
//   const accidentsTable = partD_H.accidentsTable || Array(5).fill({});
//   const injuriesTable = partD_H.injuriesTable || Array(5).fill({});
//   const nonfatalInjuriesCurrentYear = partD_H.nonfatalInjuriesCurrentYear || {};
//   const nonfatalInjuriesPreviousYear = partD_H.nonfatalInjuriesPreviousYear || {};

//   const handleNestedChange = (section, field, value) => {
//     handleChange({
//       target: {
//         name: `partD_H.${section}.${field}`,
//         value: value
//       }
//     });
//   };

//   const handleTableChange = (tableName, rowIndex, field, value) => {
//     handleChange({
//       target: {
//         name: `partD_H.${tableName}[${rowIndex}].${field}`,
//         value: value
//       }
//     });
//   };

//   // Define table column mappings
//   const accidentsTableColumns = [
//     'accidentsOccurrences',
//     'injuredInside',
//     'injuredOutside',
//     'fatalAccidents',
//     'fatalInjuredInside',
//     'fatalInjuredOutside',
//     'fatalKilledInside',
//     'fatalKilledOutside'
//   ];

//   const injuriesTableColumns = [
//     'hazardousProcessAccidents',
//     'hazardousProcessFatal',
//     'hazardousProcessNonfatal',
//     'dangerousOperationsAccidents',
//     'dangerousOperationsFatal',
//     'dangerousOperationsNonfatal',
//     'otherAccidents',
//     'otherFatal',
//     'otherNonfatal'
//   ];

//   // Categories for accidents table
//   const accidentCategories = [
//     "Accidents including dangerous occurrences and major accidents involving injuries/deaths.",
//     "Dangerous occurrences not involving injuries/deaths.",
//     "Dangerous occurrences involving injuries/deaths.",
//     "Major accidents involving injuries/deaths.",
//     "Major accidents not involving injuries/deaths."
//   ];

//   return (
//     <div className="container my-4">
//       <div className="form-header mb-4">
//         <p className="text-lg font-semibold">(H) Reporting of Accidents to Factory Inspectorate</p>
//       </div>

//       {/* Compliance Question */}
//       <div className="form-group mb-3">
//         <label className="font-medium">
//           (1) Whether arrangements are made to report the accidents involving more than 48 hours absence including serious and fatal to Factory Inspectorate in Form No. 21? (Sec. 88, GFR 103)
//         </label>
//         <select 
//           name="partD_H.accidentReporting"
//           onChange={handleChange}
//           className="border border-gray-300 p-2 rounded-md w-40" 
//           value={partD_H?.accidentReporting || "Yes"}
//         >
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//           <option value="Null">Null</option>
//         </select>
//       </div>

//       <h5>(2) Number of Accidents and Dangerous Occurrences during Previous Year</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center align-middle">
//           <thead>
//             <tr>
//               <th rowSpan="3">Category</th>
//               <th colSpan="3">Accidents involving<br />Only non-fatal injuries</th>
//               <th colSpan="5">Accidents involving<br />Fatal injuries as well as non-fatal injuries</th>
//             </tr>
//             <tr>
//               <th rowSpan="2">Accidents/Occurrences</th>
//               <th colSpan="2">Number of persons injured</th>
//               <th rowSpan="2">Accidents/Occurrences</th>
//               <th colSpan="4">Number of persons</th>
//             </tr>
//             <tr>
//               <th>The factory</th>
//               <th>Outside</th>
//               <th>Injured Inside</th>
//               <th>Injured Outside</th>
//               <th>Killed Inside</th>
//               <th>Killed Outside</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accidentCategories.map((category, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td className="text-start">{category}</td>
//                 {accidentsTableColumns.map((field, colIndex) => (
//                   <td key={colIndex}>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={accidentsTable[rowIndex]?.[field] || 0}
//                       onChange={(e) => handleTableChange('accidentsTable', rowIndex, field, e.target.value)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Section (3) - Injuries Table */}
//       <h5>(3) Injuries occurring inside the factory during the previous year.</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center align-middle">
//           <thead>
//             <tr>
//               <th colSpan="3">Hazardous Process under Section 2(cb)</th>
//               <th colSpan="3">Dangerous operations under Section 87</th>
//               <th colSpan="3">Others</th>
//             </tr>
//             <tr>
//               <th rowSpan="2">Number of<br />Accidents</th>
//               <th colSpan="2">Persons injured</th>
//               <th rowSpan="2">Number of<br />Accidents</th>
//               <th colSpan="2">Persons injured</th>
//               <th rowSpan="2">Number of<br />Accidents</th>
//               <th colSpan="2">Persons injured</th>
//             </tr>
//             <tr>
//               <th>Fatal</th>
//               <th>Nonfatal</th>
//               <th>Fatal</th>
//               <th>Nonfatal</th>
//               <th>Fatal</th>
//               <th>Nonfatal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({ length: 5 }).map((_, rowIndex) => (
//               <tr key={rowIndex}>
//                 {injuriesTableColumns.map((field, colIndex) => (
//                   <td key={colIndex}>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={injuriesTable[rowIndex]?.[field] || 0}
//                       onChange={(e) => handleTableChange('injuriesTable', rowIndex, field, e.target.value)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Section (4) - Nonfatal Injury Details */}
      // <h5>(4)</h5>

      // <p>
      //   <strong>(i)</strong> Nonfatal injuries (workers injured during the year in which injured workers returned to work during the same year).
      // </p>
      // <div className="mb-3">
      //   <label className="form-label">(a) Number of injuries:</label>
      //   <input
      //     type="number"
      //     className="form-control"
      //     value={nonfatalInjuriesCurrentYear?.numberOfInjuries || 0}
      //     onChange={(e) => handleNestedChange('nonfatalInjuriesCurrentYear', 'numberOfInjuries', e.target.value)}
      //   />
      // </div>
      // <div className="mb-4">
      //   <label className="form-label">(b) Mandays lost due to injuries:</label>
      //   <input
      //     type="number"
      //     className="form-control"
      //     value={nonfatalInjuriesCurrentYear.mandaysLost || 0}
      //     onChange={(e) => handleNestedChange('nonfatalInjuriesCurrentYear', 'mandaysLost', e.target.value)}
      //   />
      // </div>

      // <p>
      //   <strong>(ii)</strong> Nonfatal injuries (workers injuries) occurring in the previous year in which injured workers returned to work during the year to which this information relates
      // </p>
      // <div className="mb-3">
      //   <label className="form-label">(a) Number of injuries:</label>
      //   <input
      //     type="number"
      //     className="form-control"
      //     value={nonfatalInjuriesPreviousYear.numberOfInjuries || 0}
      //     onChange={(e) => handleNestedChange('nonfatalInjuriesPreviousYear', 'numberOfInjuries', e.target.value)}
      //   />
      // </div>
      // <div className="mb-4">
      //   <label className="form-label">
      //     (b) Mandays lost due to injuries (this should be the total mandays lost during the previous year as well as in the current year):
      //   </label>
      //   <input
      //     type="number"
      //     className="form-control"
      //     value={nonfatalInjuriesPreviousYear.mandaysLost || 0}
      //     onChange={(e) => handleNestedChange('nonfatalInjuriesPreviousYear', 'mandaysLost', e.target.value)}
      //   />
      // </div>

      // <div className="row mt-5">
      //   <div className="col-md-6">
      //     <p><strong>Place:</strong></p>
      //     <input
      //       type="text"
      //       className="form-control"
      //       name="partD_H.place"
      //       value={partD_H.place || ''}
      //       onChange={handleChange}
      //     />
      //     <p><strong>Date:</strong></p>
      //     <input
      //       type="date"
      //       className="form-control"
      //       name="partD_H.date"
      //       value={partD_H.date || ''}
      //       onChange={handleChange}
      //     />
      //   </div>
      //   <div className="col-md-6 text-end">
      //     <p><strong>Manager/Owner/Partner:</strong></p>
      //     <input
      //       type="text"
      //       className="form-control"
      //       name="partD_H.managerOwnerPartner"
      //       value={partD_H.managerOwnerPartner || ''}
      //       onChange={handleChange}
      //     />
      //     <p><strong>Name of The Applicant Establishment:</strong></p>
      //     <input
      //       type="text"
      //       className="form-control"
      //       name="partD_H.applicantEstablishmentName"
      //       value={partD_H.applicantEstablishmentName || ''}
      //       onChange={handleChange}
      //     />
      //   </div>
      // </div>
//     </div>
//   );
// };

// export default PartD_H;

