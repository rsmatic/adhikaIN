import { truncate } from "../utils/helpers";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">RefNo</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employment Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Birth Place</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Birth Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Civil Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Religion</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-blue-600 hover:underline">{emp.refno}</td>
                                <td className="px-4 py-2">{emp.employmentstatus || "Active"}</td>
                                <td className="px-4 py-2">{emp.classification || "-"}</td>
                                <td className="px-4 py-2" title={`${emp.firstname} ${emp.lastname}`}>
                                    {truncate(emp.firstname + " " + emp.lastname)}
                                </td>
                                <td className="px-4 py-2">{emp.birthplace || "-"}</td>
                                <td className="px-4 py-2">{emp.birthdate || "-"}</td>
                                <td className="px-4 py-2">{emp.civilstatus || "-"}</td>
                                <td className="px-4 py-2">{emp.gender || "-"}</td>
                                <td className="px-4 py-2">{emp.religion || "-"}</td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <button onClick={() => onEdit(emp)} className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(emp.id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
