import React from 'react';
import { register, loginUser } from '../service/authapi.js';

function LoginForm({ onLoginSuccess }) {
    const [isRegister, setIsRegister] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        
        // Validation
        if (!username.trim()) {
            setError("Username is required.");
            setLoading(false);
            return;
        }
        
        if (!password.trim()) {
            setError("Password is required.");
            setLoading(false);
            return;
        }
        
        try {
            const { data } = await loginUser(username, password);
            setMessage(data.message || "Login successful!");
            setUsername("");
            setPassword("");
            
            // Extract user data from the correct location: data.data
            const userData = data.data;
            
            // Check if onLoginSuccess prop exists and call it
            if (onLoginSuccess && userData && typeof userData === 'object') {
                onLoginSuccess(userData);
            }
            
        } catch (error) {
            console.error("Error login:", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
            setUsername("");
            setPassword("");
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        
        // Validation
        if (!username.trim()) {
            setError("Username is required.");
            setLoading(false);
            return;
        }
        
        if (username.length < 3) {
            setError("Username must be at least 3 characters long.");
            setLoading(false);
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await register(username, password);
            setIsRegister(false);
            setMessage(data.message || "Registration successful! You can now login.");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error during registration:", error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } finally {
            setLoading(false);
        }
    }

    const handleRegisterToggle = () => {
        setIsRegister(!isRegister);
        setError("");
        setMessage("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg px-7 py-8 w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold mb-2">
                    {isRegister ? "Create Account" : "Login"}
                </h2>
                <p className="text-gray-500 mb-6 text-[1.05rem]">
                    {isRegister 
                        ? "Please fill in the details to create an account." 
                        : "We are glad to see you again!"
                    }
                </p>
                
                <form 
                    onSubmit={isRegister ? handleRegister : handleLogin} 
                    className="space-y-4"
                >
                    <div className="text-left mb-4">
                        <label htmlFor="username" className="block mb-1 text-[1rem] text-gray-800">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            placeholder="Enter Your Username"
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none focus:border-blue-500 transition disabled:opacity-50"
                        />
                    </div>
                    
                    <div className="text-left mb-2">
                        <label htmlFor="password" className="block mb-1 text-[1rem] text-gray-800">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none focus:border-blue-500 transition disabled:opacity-50"
                        />
                    </div>
                    
                    {isRegister && (
                        <div className="text-left mb-2">
                            <label htmlFor="confirmPassword" className="block mb-1 text-[1rem] text-gray-800">
                                Confirm Password
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Your Password"
                                required
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none focus:border-blue-500 transition disabled:opacity-50"
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-2 text-white font-semibold py-2.5 rounded-lg transition ${
                            loading 
                                ? "bg-blue-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading 
                            ? (isRegister ? "Creating Account..." : "Logging in...") 
                            : (isRegister ? "Create Account" : "Login")
                        }
                    </button>
                </form>
                
                <div className="mt-5 text-gray-500 text-[.96rem]">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <button
                        onClick={handleRegisterToggle}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-700 font-semibold ml-1 disabled:opacity-50"
                    >
                        {isRegister ? "Login" : "Create Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
