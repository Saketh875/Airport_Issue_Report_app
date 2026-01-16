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
            login(res.data.token, res.data); // Corrected: backend returns 'token'
            if (res.data.roles.includes('ADMIN')) navigate('/admin');
            else if (res.data.roles.includes('STAFF')) navigate('/staff');
            else navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-slate-800 flex items-center justify-center">
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
