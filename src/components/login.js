import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore"; // Import Zustand store
import "../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const setUser = useAppStore((state) => state.setUser);
    const navigate = useNavigate(); // Use navigate to route to ChallengeListPage

    const isFormValid = email.trim() && password.trim();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email,
                password,
            });

            // Save the user to Zustand store
            setUser({ email }); // Optionally, store more user details
            alert("Login successful!");
            navigate("/challenges"); // Redirect to Challenge List Page
        } catch (error) {
            setErrorMessage("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container"> {/* Wrapper with centering styles */}
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={!isFormValid || loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default Login;
