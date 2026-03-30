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

const PassengerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState<Issue[]>([]);

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

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_55%)] text-white">
            <Header title="Passenger Dashboard" />

            <div className="p-6 pb-32">
                <FlightBoard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
                        <h2 className="mb-4 text-xl font-bold">My Reports</h2>
                        <div className="flex flex-col gap-4 h-96 overflow-y-auto">
                            {issues.length === 0 ? (
                                <p className="text-slate-400 text-center py-8">No reports yet</p>
                            ) : (
                                issues.map(issue => (
                                    <div key={issue.id} className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold">{issue.category}</span>
                                            <span className={`rounded-full px-3 py-1 text-xs ${issue.priority === 'CRITICAL' ? 'bg-rose-600' : 'bg-slate-600'}`}>{issue.priority}</span>
                                        </div>
                                        <p className="mt-2 text-sm">{issue.description}</p>
                                        <div className="mt-2 text-xs text-gray-400">Status: <span className="text-white">{issue.status}</span></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
                        <h2 className="mb-4 text-xl font-bold">Dashboard Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
                                <p className="text-2xl font-black text-cyan-300">{issues.length}</p>
                                <p className="text-sm text-slate-300">Total Reports</p>
                            </div>
                            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center">
                                <p className="text-2xl font-black text-emerald-300">{issues.filter(i => i.status === 'RESOLVED').length}</p>
                                <p className="text-sm text-slate-300">Resolved</p>
                            </div>
                            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-center">
                                <p className="text-2xl font-black text-amber-300">{issues.filter(i => i.status === 'CREATED').length}</p>
                                <p className="text-sm text-slate-300">Open</p>
                            </div>
                            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-center">
                                <p className="text-2xl font-black text-rose-300">{issues.filter(i => i.priority === 'CRITICAL').length}</p>
                                <p className="text-sm text-slate-300">Critical</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReportButton />
        </div>
    );
};

export default PassengerDashboard;
