import { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data.token, res.data);
            if (res.data.roles.includes('ADMIN')) navigate('/admin');
            else if (res.data.roles.includes('STAFF')) navigate('/staff');
            else navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="pointer-events-none absolute -left-40 top-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

            <button
                onClick={() => navigate('/sos')}
                className="fixed right-6 top-6 z-50 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-700"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" clipRule="evenodd" />
                </svg>
                SOS
            </button>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center p-6">
                <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 shadow-2xl shadow-slate-950/70 backdrop-blur-xl lg:grid-cols-2">
                    <section className="hidden flex-col justify-between bg-gradient-to-br from-cyan-500/20 via-slate-900 to-emerald-500/20 p-10 lg:flex">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Airport Ops Suite</p>
                            <h1 className="mt-3 text-4xl font-black leading-tight">Manage Airport Issues Faster, Smarter, Better.</h1>
                        </div>
                        <div className="space-y-3 text-sm text-slate-200">
                            <p className="rounded-xl border border-white/10 bg-white/5 p-3">Real-time flight board and operational visibility.</p>
                            <p className="rounded-xl border border-white/10 bg-white/5 p-3">Separate dashboard and dedicated issue reporting workflow.</p>
                            <p className="rounded-xl border border-white/10 bg-white/5 p-3">SOS emergency access available from any screen.</p>
                        </div>
                    </section>

                    <section className="p-8 sm:p-10">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Welcome Back</p>
                        <h2 className="mb-6 mt-2 text-3xl font-black">Sign In</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">Email</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2.5 outline-none transition focus:border-cyan-400"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-300">Password</label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2.5 outline-none transition focus:border-cyan-400"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2.5 font-bold text-slate-900 transition hover:opacity-90"
                            >
                                Login
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Login;
