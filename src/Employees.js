// Employees.js
import { useNavigate } from "react-router-dom";
import { useEmployees } from "./hooks/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";

export default function Employees() {
    const navigate = useNavigate();
    const {
        employees,
        totalPages,
        currentPage,
        search,
        setSearch,
        goToPage,
        handleDelete,
    } = useEmployees();

    const handleEdit = (emp) => {
        navigate(`${emp.id}`, { state: { employee: emp } });
    };

    return (
        <div className="p-6">
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

            <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />

            <Pagination totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />
        </div>
    );
}
