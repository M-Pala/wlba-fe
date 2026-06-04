import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
    </>
  );
}

export default App;
