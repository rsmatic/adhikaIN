import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [invalidPassword, setInvalidPassword] = useState(false);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setInvalidPassword(false);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("userName", data.name);
                setMessage("✅ Login successful!");
                navigate("/dashboard");
            } else {
                setMessage("❌ Invalid username or password");
                setInvalidPassword(true);
                if (passwordRef.current) {
                    passwordRef.current.focus();
                    passwordRef.current.select(); // selects the current value
                }
            }
        } catch (err) {
            console.error(err);
            setMessage("⚠️ Server error");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {message && <p className="mb-4">{message}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 mb-4 border rounded focus:outline-none transition-colors
    ${invalidPassword ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
