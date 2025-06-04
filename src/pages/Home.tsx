// Home Component: Displays a landing page with a gradient background and a card containing action buttons.
// It uses react-router's useNavigate hook to programmatically navigate to the "/transfertoken" route when the button is clicked.

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-100 to-violet-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg border border-violet-200 p-6">
          <h2 className="text-violet-900 font-semibold text-2xl mb-6">
            Intents
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/transfertoken")}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium cursor-pointer"
            >
              Transfer Token
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
