import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EmployeeEdit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const emp = state?.employee;
    const formAccess = state?.formAccess;
console.log(emp)
    // Main Employee Data
    const [formData, setFormData] = useState({
        refno: emp?.refno || "",
        service: emp?.classification || "",
        employmentstatus: emp?.employmentstatus || "",
        birthplace: emp?.birthplace || "",
        birthdate: emp?.birthdate || "",
        religion: emp?.religion || "",
        gender: emp?.gender || "",
        civilstatus: emp?.civilstatus || "",
        height: emp?.height || "",
        nickname: emp?.nickname || "",
        prefix: emp?.prefix || "",
        lastname: emp?.lastname || "",
        firstname: emp?.firstname || "",
        middlename: emp?.middlename || "",
        suffix: emp?.suffix || "",
        // Multiple Data Sections
        address: emp?.address ? JSON.parse(emp.address) : [
            { type: "", street: "", city: "", state: "", province: "", zipcode: "" },
        ],
        contacts: emp?.contacts || [{ type: "", number: "", person: "" }],
        emails: emp?.emails || [{ type: "", email: "", primary: false }],
        identifications: emp?.identifications || [
            { type: "", number: "", expiry: "" },
        ],
        banks: emp?.banks || [
            { bankname: "", banktype: "", accountnumber: "", branch: "" },
        ],
        family: emp?.family || [
            { relation: "", name: "", birthdate: "", occupation: "" },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const updated = [...formData[section]];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, [section]: updated }));
    };

    const addArrayItem = (section, emptyItem) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], emptyItem],
        }));
    };

    const removeArrayItem = (section, index) => {
        const updated = [...formData[section]];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, [section]: updated }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/employees/${emp.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            alert("✅ Employee updated successfully!");
            navigate("/dashboard/employees");
        } catch (err) {
            console.error("Update failed:", err);
            alert("❌ Failed to update employee.");
        }
    };

    if (!emp) return <div className="p-6 text-red-500">Employee not found.</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-lg p-6 space-y-8"
            >
                {/* Basic Info */}
                <section className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                        Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Employee Number
                            </label>
                            <input
                                name="refno"
                                value={formData.refno}
                                className="w-full border rounded px-3 py-2"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Service
                            </label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Service</option>
                                <option value="Occupational Therapist">Occupational Therapist</option>
                                <option value="Physical Therapist">Physical Therapist</option>
                                <option value="Speech Therapist">Speech Therapist</option>
                                <option value="Special Education Teacher">Special Education Teacher</option>
                                <option value="Psychologist">Psychologist</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Employment Status
                            </label>
                            <input
                                name="employmentstatus"
                                value={formData.employmentstatus}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Birth Place
                            </label>
                            <input
                                name="birthplace"
                                value={formData.birthplace}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Religion
                            </label>
                            <input
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Gender
                            </label>
                            <input
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Civil Status
                            </label>
                            <input
                                name="civilstatus"
                                value={formData.civilstatus}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Height (cm)
                            </label>
                            <input
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Nickname
                            </label>
                            <input
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Prefix
                            </label>
                            <input
                                name="prefix"
                                value={formData.prefix}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Last Name
                            </label>
                            <input
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                First Name
                            </label>
                            <input
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Middle Name
                            </label>
                            <input
                                name="middlename"
                                value={formData.middlename}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Suffix
                            </label>
                            <input
                                name="suffix"
                                value={formData.suffix}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                </section>

                {/* Dynamic Sections Example - address */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Address Information
                    </h3>
                    {formData.address.map((addr, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 border p-3 rounded"
                        >
                            <input
                                value={addr.type}
                                onChange={(e) =>
                                    handleArrayChange("address", i, "type", e.target.value)
                                }
                                placeholder="Type (Home/Work)"
                                className="border rounded px-2 py-1"
                            />
                            <input
                                value={addr.street}
                                onChange={(e) =>
                                    handleArrayChange("address", i, "street", e.target.value)
                                }
                                placeholder="Street"
                                className="border rounded px-2 py-1"
                            />
                            <input
                                value={addr.city}
                                onChange={(e) =>
                                    handleArrayChange("address", i, "city", e.target.value)
                                }
                                placeholder="City/Municipality"
                                className="border rounded px-2 py-1"
                            />
                            <input
                                value={addr.state}
                                onChange={(e) =>
                                    handleArrayChange("address", i, "state", e.target.value)
                                }
                                placeholder="State/Province"
                                className="border rounded px-2 py-1"
                            />
                            <input
                                value={addr.zipcode}
                                onChange={(e) =>
                                    handleArrayChange("address", i, "zipcode", e.target.value)
                                }
                                placeholder="Zip Code"
                                className="border rounded px-2 py-1"
                            />
                            { formAccess?.canEdit ?
                            (<button
                                type="button"
                                onClick={() => removeArrayItem("address", i)}
                                className="col-span-full text-red-500 text-sm"
                            >
                                Remove
                            </button>) : '' }
                        </div>
                    ))}
                    { formAccess?.canEdit ?
                    (<button
                        type="button"
                        onClick={() =>
                            addArrayItem("address", {
                                type: "",
                                street: "",
                                city: "",
                                state: "",
                                zipcode: "",
                            })
                        }
                        className="text-blue-600 text-sm"
                    >
                        + Add Address
                    </button>)
                    : '' }
                </section>

                {/* Repeat similar sections for Contacts, Emails, IDs, Banks, Family */}

                { formAccess?.canEdit ?
                (<div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/employees")}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>)
                : ''} 
            </form>
        </div>
    );
}
