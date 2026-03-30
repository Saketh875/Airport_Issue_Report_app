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
    const [category, setCategory] = useState('Sanitation');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('NORMAL');
    const [showReportModal, setShowReportModal] = useState(false);

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
            setShowReportModal(false);
            fetchIssues();
        } catch (err) {
            alert('Failed to report issue');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header title="Passenger Dashboard" />

            <div className="p-6 pb-32">
                <FlightBoard />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">My Reports</h2>
                        <div className="flex flex-col gap-4 h-96 overflow-y-auto">
                            {issues.length === 0 ? (
                                <p className="text-slate-400 text-center py-8">No reports yet</p>
                            ) : (
                                issues.map(issue => (
                                    <div key={issue.id} className="bg-slate-700 p-4 rounded border-l-4 border-blue-500">
                                        <div className="flex justify-between">
                                            <span className="font-bold">{issue.category}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs ${issue.priority === 'CRITICAL' ? 'bg-red-600' : 'bg-gray-600'}`}>{issue.priority}</span>
                                        </div>
                                        <p className="mt-2 text-sm">{issue.description}</p>
                                        <div className="mt-2 text-xs text-gray-400">Status: <span className="text-white">{issue.status}</span></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Dashboard Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700 p-4 rounded text-center">
                                <p className="text-2xl font-bold text-blue-400">{issues.length}</p>
                                <p className="text-sm text-slate-400">Total Reports</p>
                            </div>
                            <div className="bg-slate-700 p-4 rounded text-center">
                                <p className="text-2xl font-bold text-green-400">{issues.filter(i => i.status === 'RESOLVED').length}</p>
                                <p className="text-sm text-slate-400">Resolved</p>
                            </div>
                            <div className="bg-slate-700 p-4 rounded text-center">
                                <p className="text-2xl font-bold text-yellow-400">{issues.filter(i => i.status === 'CREATED').length}</p>
                                <p className="text-sm text-slate-400">Open</p>
                            </div>
                            <div className="bg-slate-700 p-4 rounded text-center">
                                <p className="text-2xl font-bold text-red-400">{issues.filter(i => i.priority === 'CRITICAL').length}</p>
                                <p className="text-sm text-slate-400">Critical</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Issue Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 rounded bg-slate-700 border border-slate-600">
                                <option>Sanitation</option>
                                <option>Security</option>
                                <option>Boarding</option>
                                <option>Facilities</option>
                            </select>
                            <select value={priority} onChange={e => setPriority(e.target.value)} className="p-2 rounded bg-slate-700 border border-slate-600">
                                <option value="NORMAL">Normal</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Describe the issue..."
                                className="p-2 rounded bg-slate-700 h-32 border border-slate-600"
                                required
                            />
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-bold">Submit</button>
                                <button type="button" onClick={() => setShowReportModal(false)} className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Report Issue Button */}
            <ReportButton onClick={() => setShowReportModal(!showReportModal)} isOpen={showReportModal} />
        </div>
    );
};

export default PassengerDashboard;
