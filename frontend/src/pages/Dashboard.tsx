import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import StaffDashboard from '../components/StaffDashboard';
import PassengerDashboard from '../components/PassengerDashboard';

const Dashboard = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (user?.roles.includes('ADMIN')) return <AdminDashboard />;
    if (user?.roles.includes('STAFF')) return <StaffDashboard />;

    return <PassengerDashboard />;
};

export default Dashboard;
