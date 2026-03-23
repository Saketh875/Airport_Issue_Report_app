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

const PassengerDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [category, setCategory] = useState('Sanitation');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('NORMAL');

    useEffect(() => {
        if (user) fetchIssues();
    }, [user]);

    const fetchIssues = async () => {
        try {
            const res = await axios.get(`/api/issues/my-issues?reporterId=${user?.id}`);
            setIssues(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/issues', {
                category,
                description,
                priority,
                reporterId: user?.id,
                status: 'CREATED'
            });
            setDescription('');
            fetchIssues();
        } catch (err) {
            alert('Failed to report issue');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Passenger Dashboard</h1>
                <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 rounded bg-slate-700">
                            <option>Sanitation</option>
                            <option>Security</option>
                            <option>Boarding</option>
                            <option>Facilities</option>
                        </select>
                        <select value={priority} onChange={e => setPriority(e.target.value)} className="p-2 rounded bg-slate-700">
                            <option value="NORMAL">Normal</option>
                            <option value="HIGH">High</option>
                            <option value="CRITICAL">Critical</option>
                        </select>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe the issue..."
                            className="p-2 rounded bg-slate-700 h-32"
                            required
                        />
                        <button type="submit" className="bg-blue-600 py-2 rounded font-bold">Submit Report</button>
                    </form>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">My Reports</h2>
                    <div className="flex flex-col gap-4 h-96 overflow-y-auto">
                        {issues.map(issue => (
                            <div key={issue.id} className="bg-slate-700 p-4 rounded border-l-4 border-blue-500">
                                <div className="flex justify-between">
                                    <span className="font-bold">{issue.category}</span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${issue.priority === 'CRITICAL' ? 'bg-red-600' : 'bg-gray-600'}`}>{issue.priority}</span>
                                </div>
                                <p className="mt-2 text-sm">{issue.description}</p>
                                <div className="mt-2 text-xs text-gray-400">Status: <span className="text-white">{issue.status}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassengerDashboard;
