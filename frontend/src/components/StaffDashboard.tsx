import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import FlightBoard from './FlightBoard';
import Header from './Header';
import ReportButton from './ReportButton';

interface Issue {
    id: string;
    category: string;
    status: string;
    priority: string;
    description: string;
    createdAt: string;
}

const StaffDashboard = () => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        fetchIssues();
        const interval = setInterval(fetchIssues, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchIssues = async () => {
        try {
            const res = await axios.get('/api/issues');
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
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_55%)] text-white">
            <Header title={`Staff Dashboard - ${user?.email}`} />

            <div className="p-6 pb-32">
                <FlightBoard />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['CREATED', 'IN_PROGRESS', 'RESOLVED'].map(status => (
                        <div key={status} className="min-h-[50vh] rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/40 backdrop-blur">
                            <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">{status}</h2>
                            <div className="flex flex-col gap-4">
                                {issues.filter(i => i.status === status).length === 0 ? (
                                    <p className="text-slate-400 text-sm py-4">No issues</p>
                                ) : (
                                    issues.filter(i => i.status === status).map(issue => (
                                        <div key={issue.id} className={`rounded-xl border border-white/10 bg-slate-800/70 p-4 ${issue.priority === 'CRITICAL' ? 'ring-1 ring-rose-500/60' : ''}`}>
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
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ReportButton />
        </div>
    );
};

export default StaffDashboard;
