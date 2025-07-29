import React, { useState } from "react";
import { verify2fa } from "../service/authapi";

export default function TwoVerify({ onVerifySuccess, onResetSuccess }) {
  const [totp, setTotp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sends the entered TOTP code to backend API for verification
  const verifyTOTP = async (code) => {
    try {
      setLoading(true);
      setError("");

      const response = await verify2fa(code);

      // Check success flag from backend response
      return response.data?.success === true;
    } catch (err) {
      // Parse backend error message if any
      const msg =
        err.response?.data?.message ||
        "Server error while verifying TOTP. Please try again.";
      setError(msg);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    // Validate format before submission
    if (!/^\d{6}$/.test(totp)) {
      setError("Please enter a valid 6-digit TOTP code.");
      return;
    }

    const success = await verifyTOTP(totp.trim());
    if (success) {
      onVerifySuccess && onVerifySuccess({ code: totp });
    } else if (!error) {
      setError("Invalid TOTP code, please try again.");
    }
  };

  const handleReset = () => {
    // Call parent's reset callback (e.g., to redirect to setup page)
    onResetSuccess && onResetSuccess();
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setTotp(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f8] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">Validate TOTP</h2>
        <div className="text-gray-600 mb-7 text-center text-[1.05rem]">
          Please enter the 6-digit code from your authenticator app
        </div>
        
        <form className="w-full" onSubmit={handleVerify}>
          <div className="mb-5 text-left">
            <label
              htmlFor="totp"
              className="block mb-1 text-[1rem] text-gray-800 font-medium"
            >
              TOTP Code
            </label>
            <input
              id="totp"
              type="text"
              maxLength={6}
              value={totp}
              onChange={handleInputChange}
              placeholder="000000"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-blue-300 rounded-lg bg-[#f8fafd] text-lg focus:outline-none focus:border-blue-600 transition text-center font-mono tracking-widest disabled:opacity-50"
              autoFocus
              inputMode="numeric"
              pattern="\d{6}"
              title="Please enter a 6-digit numeric code"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the code exactly as shown in your authenticator app
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center" role="alert">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || totp.length !== 6}
            className={`w-full mb-3 text-white font-semibold py-3 rounded-lg text-base transition ${
              loading || totp.length !== 6
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </span>
            ) : (
              "Verify TOTP"
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-lg text-base transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          Reset 2FA Setup
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          Having trouble? Click "Reset 2FA Setup" to configure a new authenticator.
        </p>
      </div>
    </div>
  );
}
