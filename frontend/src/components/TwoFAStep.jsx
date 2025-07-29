import React, { useEffect } from 'react'
import { setup2fa } from '../service/authapi';

export default function TwoFAStep({ onSetupComplete }) {
  const [message, setMessage] = React.useState("");
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchQrcode = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await setup2fa();
      
      // Check if the response has nested data structure like login API
      const qrData = response.data?.data || response.data;
      setResponse(qrData);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      
      if (error.response?.status === 401 || error.response?.data?.message === "Authentication required") {
        setMessage("Please log in first to access 2FA setup.");
      } else {
        setMessage("Failed to load QR code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Fetch QR code when component mounts
  useEffect(() => {
    fetchQrcode();
  }, []);

  const copyToClipboard = async () => {
    if (response?.secret) {
      try {
        await navigator.clipboard.writeText(response.secret);
        setMessage("Secret copied to clipboard!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        setMessage("Failed to copy secret. Please copy manually.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafd]">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-6 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-1">Turn on 2FA Verification</h2>
        <div className="text-gray-600 mb-7 text-center text-[1.06rem]">
          Scan the QR code below with your authenticator app
        </div>
        
        {loading ? (
          <div className="text-center my-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading QR code...</p>
          </div>
        ) : response?.qrCode ? (
          <>
            <div className="flex justify-center items-center my-0 mb-4">
              <img
                src={response.qrCode}
                alt="2FA QR Code"
                className="w-44 h-44 rounded-md border border-gray-200 shadow"
              />
            </div>

            <div className="text-gray-600 mt-3 mb-2 text-[.99rem] leading-tight text-center">
              Or enter the code manually in your authenticator app
            </div>

            <div className="w-full mb-4">
              <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <div className="flex">
                <input
                  id="secret"
                  readOnly
                  type="text"
                  value={response.secret || ""}
                  className="flex-1 px-4 py-2 border border-blue-300 bg-[#f8fafd] rounded-l-md focus:outline-none focus:border-blue-600 transition text-sm text-center font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition text-sm font-medium"
                  title="Copy secret to clipboard"
                >
                  Copy
                </button>
              </div>
            </div>

            {message && (
              <div className={`text-center font-medium text-[.97rem] my-2 ${
                message.includes("Failed") || message.includes("Please log in") 
                  ? "text-red-600" 
                  : "text-green-600"
              }`}>
                {message}
              </div>
            )}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-base transition"
              onClick={onSetupComplete}
            >
              Continue to Verification
            </button>
          </>
        ) : (
          <div className="text-center text-red-600 my-8">
            <p className="mb-4">
              {message || "Failed to load QR code. Please try again."}
            </p>
            <button
              onClick={fetchQrcode}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
