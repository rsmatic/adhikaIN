import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EmployeeEdit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const emp = state?.employee;
    const formAccess = state?.formAccess;

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
        addresses: emp?.address ? JSON.parse(emp.address) : [
            { type: "", street: "", city: "", province: "", zipcode: "" },
        ],
        contacts: emp?.contact ? JSON.parse(emp.contact) : [{ type: "", number: "", person: "" }],
        emails: emp?.email ? JSON.parse(emp.email) : [{ type: "", email: "", primary: false }],
        identifications: emp?.identification ? JSON.parse(emp.identification) : [
            { type: "", number: "", expiry: "" },
        ],
        banks: emp?.bank ? JSON.parse(emp.bank) : [
            { bankname: "", banktype: "", accountnumber: "", branch: "" },
        ],
        families: emp?.family ? JSON.parse(emp.family) : [
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
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
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
                        <div className="col-span-2">
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
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-span-2">
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
                    </div>
                </section>

                {/* Dynamic Sections Example - addresses */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Address Information
                    </h3>
                    {formData.addresses.map((addr, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-x-2 gap-y-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={addr.type}
                                onChange={(e) =>
                                    handleArrayChange('addresses', i, 'type', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-1"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Type of Address</option>
                                <option>Work</option>
                                <option>Business</option>
                                <option>Billing</option>
                                <option>Current</option>
                                <option>Permanent</option>
                            </select>
                            <input
                                value={addr.street}
                                onChange={(e) =>
                                    handleArrayChange('addresses', i, 'street', e.target.value)
                                }
                                placeholder="Street"
                                className="border rounded px-2 py-1 col-span-2"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={addr.city}
                                onChange={(e) =>
                                    handleArrayChange('addresses', i, 'city', e.target.value)
                                }
                                placeholder="City/Municipality"
                                className="border rounded px-2 py-1 col-span-3"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={addr.province}
                                onChange={(e) =>
                                    handleArrayChange('addresses', i, 'state', e.target.value)
                                }
                                placeholder="State/Province"
                                className="border rounded px-2 py-1 col-span-3"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={addr.zipcode}
                                onChange={(e) =>
                                    handleArrayChange('addresses', i, 'zipcode', e.target.value)
                                }
                                placeholder="Zip Code"
                                className="border rounded px-2 py-1 col-span-2"
                                style={{ minWidth: 0 }}
                            />
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('addresses', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('addresses', {
                                    type: '',
                                    street: '',
                                    city: '',
                                    state: '',
                                    zipcode: '',
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add Address
                        </button>
                    ) : ''}
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Contact Information
                    </h3>
                    {formData.contacts.map((contact, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={contact.type}
                                onChange={(e) =>
                                    handleArrayChange('contacts', i, 'type', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-2"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Type of Contact</option>
                                <option>Personal</option>
                                <option>Work</option>
                                <option>Business</option>
                                <option>In Case of Emergency</option>
                            </select>
                            <input
                                value={contact.number}
                                onChange={(e) =>
                                    handleArrayChange('contacts', i, 'number', e.target.value)
                                }
                                placeholder="Contact Number"
                                className="border rounded px-2 py-1 col-span-5"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={contact.person}
                                onChange={(e) =>
                                    handleArrayChange('contacts', i, 'person', e.target.value)
                                }
                                placeholder="Contact Person"
                                className="border rounded px-2 py-1 col-span-4"
                                style={{ minWidth: 0 }}
                            />
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('contacts', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('contacts', {
                                    type: '',
                                    number: '',
                                    person: '',
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add Contact
                        </button>
                    ) : ''}
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Email Information
                    </h3>
                    {formData.emails.map((email, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={email.type}
                                onChange={(e) =>
                                    handleArrayChange('emails', i, 'type', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-3"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Type of Email</option>
                                <option>Personal</option>
                                <option>Work</option>
                                <option>Business</option>
                                <option>In Case of Emergency</option>
                            </select>
                            <input
                                value={email.email}
                                onChange={(e) =>
                                    handleArrayChange('emails', i, 'email', e.target.value)
                                }
                                placeholder="Email Address"
                                className="border rounded px-2 py-1 col-span-7"
                                style={{ minWidth: 0 }}
                            />
                            <label title="Primary" className="col-span-0 p-0 m-0 flex items-center justify-center" style={{margin:0,padding:0}}>
                                <input
                                    type="checkbox"
                                    checked={!!email.primary}
                                    onChange={e =>
                                        handleArrayChange('emails', i, 'primary', e.target.checked)
                                    }
                                    className="border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none block p-0 m-0"
                                    style={{ width: '1.5rem', height: '1.5rem', minWidth: '30px', minHeight: '30px', margin: 0, padding: 0 }}
                                    disabled={!formAccess?.canEdit}
                                />
                            </label>
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('emails', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('emails', {
                                    type: '',
                                    email: '',
                                    primary: false,
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add Email
                        </button>
                    ) : ''}
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Identification Card Information
                    </h3>
                    {formData.identifications.map((idc, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={idc.type}
                                onChange={(e) =>
                                    handleArrayChange('identifications', i, 'type', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-4"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Type of ID</option>
                                <option>Driver's License</option>
                                <option>Pagibig-HDMF</option>
                                <option>SSS-UMID</option>
                                <option>Philhealth</option>
                                <option>Postal</option>
                                <option>TIN</option>
                                <option>Voters</option>
                            </select>
                            <input
                                value={idc.number}
                                onChange={(e) =>
                                    handleArrayChange('identifications', i, 'number', e.target.value)
                                }
                                placeholder="Number"
                                className="border rounded px-2 py-1 col-span-5"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={idc.expiry}
                                onChange={(e) =>
                                    handleArrayChange('identifications', i, 'expiry', e.target.value)
                                }
                                placeholder="Expiration"
                                className="border rounded px-2 py-1 col-span-2"
                                style={{ minWidth: 0 }}
                            />
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('identifications', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('identifications', {
                                    type: '',
                                    number: '',
                                    expiry: '',
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add ID
                        </button>
                    ) : ''}
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Bank Information
                    </h3>
                    {formData.banks.map((bank, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={bank.type}
                                onChange={(e) =>
                                    handleArrayChange('banks', i, 'type', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-4"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Bank name</option>
                                <option>BDO</option>
                                <option>SB</option>
                                <option>UCPB</option>
                                <option>UB</option>
                                <option>BPI</option>
                                <option>AUB</option>
                                <option>Chinabank</option>
                                <option>Chinatrust</option>
                                <option>Land Bank</option>
                                <option>Maybank</option>
                                <option>Metrobank</option>
                                <option>GXI</option>
                            </select>
                            <input
                                value={bank.number}
                                onChange={(e) =>
                                    handleArrayChange('banks', i, 'number', e.target.value)
                                }
                                placeholder="Number"
                                className="border rounded px-2 py-1 col-span-5"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={bank.expiry}
                                onChange={(e) =>
                                    handleArrayChange('banks', i, 'expiry', e.target.value)
                                }
                                placeholder="Expiration"
                                className="border rounded px-2 py-1 col-span-2"
                                style={{ minWidth: 0 }}
                            />
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('banks', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('banks', {
                                    type: '',
                                    number: '',
                                    expiry: '',
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add ID
                        </button>
                    ) : ''}
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Family Information
                    </h3>
                    {formData.families.map((family, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-2 mb-3 border p-3 rounded items-center"
                        >
                            <select
                                value={family.relation}
                                onChange={(e) =>
                                    handleArrayChange('families', i, 'relation', e.target.value)
                                }
                                className="border rounded px-2 py-1 col-span-3"
                                style={{ minWidth: 0 }}
                            >
                                <option value="">-Relation</option>
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Sibling</option>
                                <option>Guardian</option>
                                <option>Spouse</option>
                                <option>Children</option>
                            </select>
                            <input
                                value={family.name}
                                onChange={(e) =>
                                    handleArrayChange('families', i, 'name', e.target.value)
                                }
                                placeholder="Name"
                                className="border rounded px-2 py-1 col-span-4"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={family.birthdate}
                                onChange={(e) =>
                                    handleArrayChange('families', i, 'birthdate', e.target.value)
                                }
                                placeholder="Birthdate"
                                className="border rounded px-2 py-1 col-span-3"
                                style={{ minWidth: 0 }}
                            />
                            <input
                                value={family.occupation}
                                onChange={(e) =>
                                    handleArrayChange('families', i, 'occupation', e.target.value)
                                }
                                placeholder="Occupation"
                                className="border rounded px-2 py-1 col-span-1"
                                style={{ minWidth: 0 }}
                            />
                            {formAccess?.canEdit ? (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('families', i)}
                                    className="border rounded text-red-500 text-xs px-2 py-1 min-w-[60px] col-span-1 justify-self-end"
                                    style={{ minWidth: 0 }}
                                >
                                    Remove
                                </button>
                            ) : ''}
                        </div>
                    ))}
                    {formAccess?.canEdit ? (
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('families', {
                                    relation: '',
                                    name: '',
                                    birthdate: '',
                                    occupation: '',
                                })
                            }
                            className="text-blue-600 text-sm"
                        >
                            + Add Family
                        </button>
                    ) : ''}
                </section>

                {formAccess?.canEdit ?
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
