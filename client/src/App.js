

import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EditEmployee from './components/EditEmployee';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
