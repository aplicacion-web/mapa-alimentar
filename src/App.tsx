import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';

import { LandingPage } from './features/landing/LandingPage';
import { AuthPage } from './features/auth/AuthPage';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';
import { ProfilePage } from './features/profile/ProfilePage';
import { FoodMapPage } from './features/map/FoodMapPage';
import { AlternativesPage } from './features/alternativas/AlternativesPage';
import { WeeklyPlannerPage } from './features/planner/WeeklyPlannerPage';
import { HistoryPage } from './features/history/HistoryPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { PaywallBlockPage } from './features/subscription/PaywallBlockPage';

// Route Guard for authenticated & active subscription screens
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, subscription } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If 30-day access has expired or is blocked, redirect to the paywall renewal screen
  if (subscription.isBlocked) {
    return <Navigate to="/bloqueado" replace />;
  }

  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/cadastro" element={<AuthPage />} />
          <Route path="/bloqueado" element={<PaywallBlockPage />} />

          {/* Onboarding */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <OnboardingFlow />
              </ProtectedRoute>
            } 
          />

          {/* Authenticated Routes with 5 Main Tabs */}
          <Route 
            path="/app/perfil" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/mapa" 
            element={
              <ProtectedRoute>
                <FoodMapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/alternativas" 
            element={
              <ProtectedRoute>
                <AlternativesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/rotina" 
            element={
              <ProtectedRoute>
                <WeeklyPlannerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/historico" 
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/configuracoes" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <MobileNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
