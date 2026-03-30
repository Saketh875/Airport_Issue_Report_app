
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SOSPage from './pages/SOSPage';
import Calendar from './components/Calendar';
import IssueReport from './pages/IssueReport';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/staff" element={<Dashboard />} />
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/sos" element={<SOSPage />} />
                    <Route path="/report" element={<IssueReport />} />
                    <Route path="/issues/report" element={<IssueReport />} />
                    <Route path="/calendar" element={<Calendar />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
