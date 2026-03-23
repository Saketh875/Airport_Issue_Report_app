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

const StaffDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        fetchIssues();
        const interval = setInterval(fetchIssues, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const fetchIssues = async () => {
        try {
            const res = await axios.get('/api/issues');
            // Filter locally for simplicity, in real app backend would filter
            setIssues(res.data.filter((i: Issue) => i.status !== 'CLOSED'));
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await axios.put(`/api/issues/${id}/status`, newStatus, { headers: { 'Content-Type': 'application/json' } });
            fetchIssues();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Staff Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="bg-yellow-600 px-3 py-1 rounded text-sm">On Duty: {user?.email}</span>
                    <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['CREATED', 'IN_PROGRESS', 'RESOLVED'].map(status => (
                    <div key={status} className="bg-slate-800 p-4 rounded-lg min-h-[50vh]">
                        <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">{status}</h2>
                        <div className="flex flex-col gap-4">
                            {issues.filter(i => i.status === status).map(issue => (
                                <div key={issue.id} className={`bg-slate-700 p-4 rounded border-l-4 ${issue.priority === 'CRITICAL' ? 'border-red-600' : 'border-blue-500'}`}>
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold text-lg">{issue.category}</span>
                                        {issue.priority === 'CRITICAL' && <span className="animate-pulse bg-red-600 text-xs px-2 py-1 rounded">CRITICAL</span>}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-300">{issue.description}</p>
                                    <div className="mt-4 flex gap-2">
                                        {status === 'CREATED' && <button onClick={() => updateStatus(issue.id, 'IN_PROGRESS')} className="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-500">Ack & Start</button>}
                                        {status === 'IN_PROGRESS' && <button onClick={() => updateStatus(issue.id, 'RESOLVED')} className="bg-green-600 px-2 py-1 rounded text-xs hover:bg-green-500">Resolve</button>}
                                        {status === 'RESOLVED' && <button onClick={() => updateStatus(issue.id, 'CLOSED')} className="bg-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-500">Close</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffDashboard;
