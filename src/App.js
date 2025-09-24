import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
