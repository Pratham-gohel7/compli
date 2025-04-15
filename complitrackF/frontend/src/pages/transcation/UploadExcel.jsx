import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const UploadExcel = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5001/api/excel/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setData(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                Upload
            </button>

            {data.length > 0 && (
                <div className="mt-6 border p-4 rounded bg-gray-100">
                    <h3 className="font-semibold">Extracted Data:</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border px-2 py-1">{cell || "N/A"}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UploadExcel;
