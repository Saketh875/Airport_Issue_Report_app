import { FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

interface Issue {
    id: string;
    category: string;
    status: string;
    priority: string;
    description: string;
    createdAt: string;
}

const IssueReport = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [category, setCategory] = useState('Sanitation');
    const [priority, setPriority] = useState('NORMAL');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [myIssues, setMyIssues] = useState<Issue[]>([]);

    useEffect(() => {
        if (!user?.id) return;
        const fetchMyIssues = async () => {
            try {
                const res = await axios.get(`/api/issues/my-issues?reporterId=${user.id}`);
                setMyIssues(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMyIssues();
    }, [user?.id]);

    if (!isAuthenticated) return <Navigate to="/login" />;

    const submitIssue = async (e: FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        setIsSubmitting(true);
        try {
            await axios.post('/api/issues', {
                category,
                description,
                priority,
                reporterId: user.id,
                status: 'CREATED'
            });
            setDescription('');

            const res = await axios.get(`/api/issues/my-issues?reporterId=${user.id}`);
            setMyIssues(res.data);
        } catch (err) {
            alert('Failed to submit issue. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_55%)] text-white">
            <Header title="Issue Reporting" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-5">
                <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">Create Ticket</p>
                    <h2 className="mb-4 text-2xl font-black">Report A New Issue</h2>

                    <form onSubmit={submitIssue} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm text-slate-300">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 outline-none transition focus:border-cyan-400"
                            >
                                <option>Sanitation</option>
                                <option>Security</option>
                                <option>Boarding</option>
                                <option>Facilities</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 outline-none transition focus:border-cyan-400"
                            >
                                <option value="NORMAL">Normal</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Explain what happened, where it happened, and urgency..."
                                className="h-36 w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 outline-none transition focus:border-cyan-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2.5 font-bold text-slate-900 transition hover:opacity-90 disabled:opacity-60"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                        </button>
                    </form>
                </section>

                <section className="lg:col-span-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">Tracking</p>
                    <h2 className="mb-4 text-2xl font-black">My Submitted Issues</h2>

                    <div className="max-h-[540px] space-y-3 overflow-y-auto pr-1">
                        {myIssues.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-white/15 bg-slate-800/40 p-8 text-center text-slate-400">
                                No issues submitted yet.
                            </div>
                        ) : (
                            myIssues.map((issue) => (
                                <article key={issue.id} className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
                                    <div className="mb-2 flex items-start justify-between gap-3">
                                        <h3 className="font-bold">{issue.category}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                issue.priority === 'CRITICAL'
                                                    ? 'bg-rose-600'
                                                    : issue.priority === 'HIGH'
                                                        ? 'bg-amber-600'
                                                        : 'bg-slate-600'
                                            }`}>
                                                {issue.priority}
                                            </span>
                                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                                                {issue.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-300">{issue.description}</p>
                                    <p className="mt-3 text-xs text-slate-400">Created: {new Date(issue.createdAt).toLocaleString()}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default IssueReport;
