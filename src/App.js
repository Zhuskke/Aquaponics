import Login from "./screens/login";
import Register from "./screens/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestAuth from "./screens/testAuth";
import ChangePassword from "./screens/changePassword";
import ForgetPassword from "./screens/forgetPassword";
import Dashboard from "./screens/dashboard";
import Profile from "./screens/profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<TestAuth />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
