import { useState, useEffect, useCallback } from "react";

export function useEmployees(perPage = 15) {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

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
        },
        [employees]
    );

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

    const totalPages = Math.ceil(filteredEmployees.length / perPage);
    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * perPage, currentPage * perPage);

    const goToPage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    return {
        employees: paginatedEmployees,
        totalPages,
        currentPage,
        search,
        setSearch,
        goToPage,
        handleDelete,
        handleFilter,
        setCurrentPage,
    };
}
