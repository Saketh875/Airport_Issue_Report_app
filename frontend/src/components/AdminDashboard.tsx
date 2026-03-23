import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface Issue {
    id: string;
    category: string;
    status: string;
    priority: string;
    description: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        fetchIssues();
        const interval = setInterval(fetchIssues, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchIssues = async () => {
        try {
            const res = await axios.get('/api/issues');
            setIssues(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const stats = {
        total: issues.length,
        critical: issues.filter(i => i.priority === 'CRITICAL' && i.status !== 'CLOSED').length,
        resolved: issues.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Details</h1>
                <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-lg text-center">
                    <h3 className="text-gray-400">Total Issues</h3>
                    <p className="text-4xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg text-center border-b-4 border-red-600">
                    <h3 className="text-gray-400">Active Critical</h3>
                    <p className="text-4xl font-bold text-red-500">{stats.critical}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg text-center border-b-4 border-green-600">
                    <h3 className="text-gray-400">Resolved</h3>
                    <p className="text-4xl font-bold text-green-500">{stats.resolved}</p>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">All Issues</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-2">Category</th>
                                <th className="p-2">Priority</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map(issue => (
                                <tr key={issue.id} className="border-b border-slate-700 hover:bg-slate-700">
                                    <td className="p-2">{issue.category}</td>
                                    <td className={`p-2 ${issue.priority === 'CRITICAL' ? 'text-red-500 font-bold' : ''}`}>{issue.priority}</td>
                                    <td className="p-2"><span className="bg-slate-900 px-2 py-1 rounded text-xs">{issue.status}</span></td>
                                    <td className="p-2 text-gray-300 truncate max-w-xs">{issue.description}</td>
                                    <td className="p-2 text-xs text-gray-400">{new Date(issue.createdAt).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
