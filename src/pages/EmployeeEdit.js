// pages/EmployeeEdit.js
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EmployeeEdit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const emp = state?.employee;

    const [formData, setFormData] = useState({
        firstname: emp?.firstname || "",
        lastname: emp?.lastname || "",
        refno: emp?.refno || "",
        classification: emp?.classification || "",
        employmentstatus: emp?.employmentstatus || "",
        birthplace: emp?.birthplace || "",
        birthdate: emp?.birthdate || "",
        civilstatus: emp?.civilstatus || "",
        gender: emp?.gender || "",
        religion: emp?.religion || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/employees/${emp.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            alert("Employee updated successfully!");
            navigate("/employees");
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (!emp) return <div>Employee not found.</div>;

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="refno"
                    value={formData.refno}
                    onChange={handleChange}
                    placeholder="RefNo"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="classification"
                    value={formData.classification}
                    onChange={handleChange}
                    placeholder="Classification"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="employmentstatus"
                    value={formData.employmentstatus}
                    onChange={handleChange}
                    placeholder="Employment Status"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="birthplace"
                    value={formData.birthplace}
                    onChange={handleChange}
                    placeholder="Birth Place"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    placeholder="Birth Date"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="civilstatus"
                    value={formData.civilstatus}
                    onChange={handleChange}
                    placeholder="Civil Status"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    placeholder="Religion"
                    className="w-full px-3 py-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
