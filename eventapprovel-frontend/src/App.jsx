import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import HodDashboard from "./pages/HodDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
