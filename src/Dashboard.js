import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Employees from "./Employees";
import EmployeeEdit from "./pages/EmployeeEdit";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = ["Dashboard", "Employees", "Students", "Evaluation"];

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">MyApp</div>
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`w-full text-left px-6 py-3 hover:bg-blue-100 transition-colors ${
                activeMenu === item ? "bg-blue-200 font-semibold" : ""
              }`}
              onClick={() => {
                setActiveMenu(item);
                // Navigate to route
                switch (item) {
                  case "Dashboard":
                    navigate("/dashboard");
                    break;
                  case "Employees":
                    navigate("/dashboard/employees");
                    break;
                  case "Students":
                    navigate("/dashboard/students");
                    break;
                  case "Evaluation":
                    navigate("/dashboard/evaluation");
                    break;
                  default:
                    navigate("/dashboard");
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="w-full text-left px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
          <h1 className="text-xl font-semibold">{activeMenu}</h1>
          <span className="text-gray-600">Hello, {localStorage.getItem("userName")}</span>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={
              <div>
                <h2 className="text-lg font-medium mb-4">Welcome to the Dashboard</h2>
                <p>Here is a summary of your application data.</p>
              </div>
            } />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:id" element={<EmployeeEdit />} />
            <Route path="students" element={
              <div>
                <h2 className="text-lg font-medium mb-4">Students</h2>
                <p>View and update student information.</p>
              </div>
            } />
            <Route path="evaluation" element={
              <div>
                <h2 className="text-lg font-medium mb-4">Evaluation</h2>
                <p>Check evaluations and reports.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
