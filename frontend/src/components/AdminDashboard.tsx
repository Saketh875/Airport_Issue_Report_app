import { useState, useEffect } from 'react';
import axios from 'axios';
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

const AdminDashboard = () => {
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
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_55%)] text-white">
            <Header title="Admin Dashboard" />

            <div className="p-6 pb-32">
                <FlightBoard />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-6 text-center">
                        <h3 className="text-gray-400">Total Issues</h3>
                        <p className="text-4xl font-black text-cyan-300">{stats.total}</p>
                    </div>
                    <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-center">
                        <h3 className="text-gray-400">Active Critical</h3>
                        <p className="text-4xl font-black text-rose-300">{stats.critical}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
                        <h3 className="text-gray-400">Resolved</h3>
                        <p className="text-4xl font-black text-emerald-300">{stats.resolved}</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
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
                                {issues.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-slate-400">No issues found</td>
                                    </tr>
                                ) : (
                                    issues.map(issue => (
                                        <tr key={issue.id} className="border-b border-slate-700 hover:bg-slate-700">
                                            <td className="p-2">{issue.category}</td>
                                            <td className={`p-2 ${issue.priority === 'CRITICAL' ? 'text-red-500 font-bold' : ''}`}>{issue.priority}</td>
                                            <td className="p-2"><span className="bg-slate-900 px-2 py-1 rounded text-xs">{issue.status}</span></td>
                                            <td className="p-2 text-gray-300 truncate max-w-xs">{issue.description}</td>
                                            <td className="p-2 text-xs text-gray-400">{new Date(issue.createdAt).toLocaleTimeString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ReportButton />
        </div>
    );
};

export default AdminDashboard;
