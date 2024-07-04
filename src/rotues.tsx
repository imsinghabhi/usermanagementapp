// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import { AuthProvider } from './context/AuthContext';
import UsersListPage from './pages/userlistpage';

const Routing: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:unique_id" element={<ProfilePage />} /> 
          <Route path="/users-list" element={<UsersListPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Routing;
