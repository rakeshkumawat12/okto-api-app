//TODOS: Token Transfer Functionality to be implemented
import { useNavigate } from "react-router-dom";

export default function TokenTransfer() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <div className="flex flex-col w-full max-w-2xl mx-auto p-6 space-y-6 bg-gray-900 rounded-lg shadow-xl justify-center items-center">
        {/* Navigate back to home page */}
        <button
          onClick={() => navigate("/home")}
          className="w-fit py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black mb-8"
        >
          Home
        </button>
        <h1 className="text-2xl font-bold text-white text-center">
          Token Transfer
        </h1>
        {/* Documentation link for developers */}
        <p className="text-white font-regular text-lg mb-6">
          For a detailed overview of Token Transfer intent, refer to our
          documentation on{" "}
          <a
            className="underline text-indigo-300"
            href="https://docs.okto.tech/docs/react-sdk/tokenTransfer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Token Transfer
          </a>
        </p>
      </div>
    </div>
  );
}
