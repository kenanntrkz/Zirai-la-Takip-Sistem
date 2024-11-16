import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainDashboard } from './components/MainDashboard';
import { LoginForm } from './components/LoginForm';
import { LicenseActivation } from './components/LicenseActivation';
import { SplashScreen } from './components/SplashScreen';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" replace />} 
      />
      <Route path="/activate" element={<LicenseActivation />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout>
              <Toaster position="top-right" />
              <MainDashboard />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;