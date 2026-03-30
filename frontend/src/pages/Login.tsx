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
        <div className="min-h-screen bg-slate-900 flex items-center justify-center relative">
            {/* SOS Button - Top Right */}
            <button
                onClick={() => navigate('/sos')}
                className="fixed top-6 right-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" clipRule="evenodd" />
                </svg>
                SOS
            </button>

            <form onSubmit={handleSubmit} className="bg-slate-700 p-8 rounded-lg shadow-xl w-full max-w-sm text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input type="text" className="w-full p-2 rounded bg-slate-600 border border-slate-500" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input type="password" className="w-full p-2 rounded bg-slate-600 border border-slate-500" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-600 py-2 rounded font-bold hover:bg-blue-500">Login</button>
            </form>
        </div>
    );
};

export default Login;
