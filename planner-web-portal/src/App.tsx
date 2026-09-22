import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout as PlannerLayout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { useAuth } from './context/AuthContext';

// Auth
import { Login } from './pages/Login';

// Planner Pages
import { Dashboard as PlannerDashboard } from './pages/Dashboard';
import { Requests } from './pages/Requests';
import { AIPlanner } from './pages/AIPlanner';
import { TrainSchedulePage } from './pages/TrainSchedule';
import { BlockAvailabilityPage } from './pages/BlockAvailability';
import { AnalyticsPage as PlannerAnalytics } from './pages/Analytics';
import { WeeklyPlan } from './pages/WeeklyPlan';
import { MonthlyPlan } from './pages/MonthlyPlan';
import { UsersPage as PlannerUsers, SimplePlaceholderPage } from './pages/OtherPages';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { 
  AdminMasterData,
  AdminMonitoring,
  AdminAlerts,
  AdminAnalytics,
  AdminAudit,
  AdminSettings
} from './pages/admin/AdminPages';

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole: 'Planner' | 'Admin' }) {
  const { role } = useAuth();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (role !== requiredRole) {
    // If logged in but wrong role, redirect to their proper dashboard
    return <Navigate to={role === 'Planner' ? '/planner' : '/admin'} replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={
          role === 'Planner' ? <Navigate to="/planner" replace /> :
          role === 'Admin' ? <Navigate to="/admin" replace /> :
          <Navigate to="/login" replace />
        } />
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Planner Routes */}
        <Route path="/planner" element={<ProtectedRoute requiredRole="Planner"><PlannerLayout /></ProtectedRoute>}>
          <Route index element={<PlannerDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="trains" element={<TrainSchedulePage />} />
          <Route path="availability" element={<BlockAvailabilityPage />} />
          <Route path="planner" element={<AIPlanner />} />
          <Route path="weekly" element={<WeeklyPlan />} />
          <Route path="monthly" element={<MonthlyPlan />} />
          <Route path="analytics" element={<PlannerAnalytics />} />
          <Route path="users" element={<PlannerUsers />} />
          <Route path="settings" element={<SimplePlaceholderPage title="Settings" desc="System settings and configuration." />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="master-data" element={<AdminMasterData />} />
          <Route path="monitoring" element={<AdminMonitoring />} />
          <Route path="alerts" element={<AdminAlerts />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit" element={<AdminAudit />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
