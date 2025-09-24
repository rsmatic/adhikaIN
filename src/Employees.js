import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "./utils/helpers";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const perPage = 15;
    const navigate = useNavigate();

    const handleFilter = useCallback(
        (term) => {
            if (!term) {
                setFilteredEmployees(employees);
            } else {
                const lowerTerm = term.toLowerCase();
                const filtered = employees.filter(
                    (emp) =>
                        emp.firstname.toLowerCase().includes(lowerTerm) ||
                        emp.lastname.toLowerCase().includes(lowerTerm) ||
                        (emp.refno && emp.refno.toLowerCase().includes(lowerTerm)) ||
                        (emp.classification && emp.classification.toLowerCase().includes(lowerTerm))
                );
                setFilteredEmployees(filtered);
                setCurrentPage(1);
            }
        }, [employees]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        handleFilter(search);
    }, [employees, search, handleFilter]);

    const fetchEmployees = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
            let data = await res.json();
            if (typeof data === "string") data = JSON.parse(data);
            setEmployees(data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: "DELETE" });
            setEmployees(employees.filter((emp) => emp.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = (emp) => {
        navigate(`/employees/${emp.id}`, { state: { employee: emp } });
    };

    // Pagination
    const totalPages = Math.ceil(filteredEmployees.length / perPage);
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const goToPage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Employees</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by name, RefNo, or classification..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Table */}
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
                        {paginatedEmployees.length > 0 ? (
                            paginatedEmployees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-blue-600 hover:underline">{emp.refno}</td>
                                    <td className="px-4 py-2">{emp.employmentstatus || "Active"}</td>
                                    <td className="px-4 py-2">{emp.classification || "-"}</td>
                                    <td className="px-4 py-2" title={`${emp.firstname} ${emp.lastname}`}>{truncate(emp.firstname + " " + emp.lastname)}</td>
                                    <td className="px-4 py-2">{emp.birthplace || "-"}</td>
                                    <td className="px-4 py-2">{emp.birthdate || "-"}</td>
                                    <td className="px-4 py-2">{emp.civilstatus || "-"}</td>
                                    <td className="px-4 py-2">{emp.gender || "-"}</td>
                                    <td className="px-4 py-2">{emp.religion || "-"}</td>
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(emp)}
                                            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                        >
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
