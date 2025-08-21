import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeePage from './pages/EmployeePage';
import LeavePage from './pages/LeavePage';

function App() {
  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Employees</Link>
          <Link to="/leave" style={{ marginRight: "1rem" }}>Leave</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/leave" element={<LeavePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
