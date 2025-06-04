import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TokenTransfer from "./pages/TokenTransfer";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transfertoken" element={<TokenTransfer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
