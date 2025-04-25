import Login from "./screens/login";
import Register from "./screens/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestAuth from "./screens/testAuth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<TestAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
