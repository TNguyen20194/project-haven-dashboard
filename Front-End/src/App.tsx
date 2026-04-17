import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './routes/AuthPage';
import DashboardPage from './routes/DashboardPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth?mode=login" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
    
  )
}

export default App;