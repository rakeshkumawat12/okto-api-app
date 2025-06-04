import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TabType = "google" | "email";

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("google");

  // Load email and token from localStorage on component mount itself
  const [email, setEmail] = useState(localStorage.getItem("okto_email") || "");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(localStorage.getItem("okto_token") || "");
  // Controls whether to send or verify OTP
  const [status, setStatus] = useState(
    localStorage.getItem("okto_status") || "send_OTP"
  );

  useEffect(() => {
    // If already logged in, redirect to /home
    const session = localStorage.getItem("okto_session");
    if (session) navigate("/home");

    // If Google ID token exists in localStorage, authenticate
    const storedToken = localStorage.getItem("googleIdToken");
    if (storedToken) handleAuthenticate(storedToken);
  }, []);

  const apiBase = "https://sandbox-apigw.oktostage.com";

  // Handles Google token authentication with Okto API
  const handleAuthenticate = async (idToken: string) => {
    try {
      const res = await fetch(`${apiBase}/v1/oauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, provider: "google" }),
      });
      const data = await res.json();
      if (data.session) {
        localStorage.setItem("okto_session", JSON.stringify(data.session));
        navigate("/home");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      localStorage.removeItem("googleIdToken");
    }
  };

  // It'lll triggered when Google login is successful
  const handleGoogleLogin = (credentialResponse: any) => {
    const idToken = credentialResponse.credential || "";
    if (idToken) {
      localStorage.setItem("googleIdToken", idToken);
      handleAuthenticate(idToken);
    }
  };

  // Handles both OTP sending and verification based on "status".
  const handleEmailAction = async () => {
    try {
      if (!email) return alert("Enter a valid email");

      if (status === "send_OTP" || status === "resend_OTP") {
        const res = await fetch(`${apiBase}/api/oc/v1/authenticate/email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: email, channel: "email", token }),
        });
        const data = await res.json();
        setToken(data.token); // Save token for verification step
        setStatus("verify_OTP");
        // console.log("OTP sent/resend:", data);
      } else if (status === "verify_OTP") {
        const res = await fetch(`${apiBase}/api/oc/v1/verify-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, token }),
        });
        const data = await res.json();
        localStorage.setItem("okto_session", JSON.stringify(data.session));
        navigate("/home");
      }
    } catch (err) {
      console.error("Email login error:", err);
    }
  };

  return (
    <main className="min-h-[90vh] bg-gray-900 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md mb-6">
        <div className="flex border-b border-gray-700">
          {/* Tab Switch Buttons */}
          {["google", "email"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`flex-1 py-2 px-4 text-center cursor-pointer ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black border border-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome to Okto
        </h1>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Google Login */}
          {activeTab === "google" && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-400 text-center">
                Sign in with your Google account
              </p>
              {/* Commented due to error — uncomment after resolving issue */}
              {/* <GoogleLogin
                onSuccess={handleGoogleLogin}
                theme="filled_black"
                size="large"
                shape="rectangular"
              /> */}
            </div>
          )}

          {/* Email Login */}
          {activeTab === "email" && (
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === "verify_OTP"}
              />

              {status === "verify_OTP" && (
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}

              <button
                onClick={handleEmailAction}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                {status === "verify_OTP" ? "Verify OTP" : "Send OTP"}
              </button>

              {status === "verify_OTP" && (
                <button
                  type="button"
                  onClick={() => setStatus("resend_OTP")}
                  className="text-sm text-blue-400 hover:underline text-center w-full cursor-pointer"
                >
                  Resend OTP
                </button>
              )}

              <p className="text-gray-400 text-sm text-center">
                {status === "verify_OTP"
                  ? "Enter the OTP sent to your email"
                  : "We'll send you a login code"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
