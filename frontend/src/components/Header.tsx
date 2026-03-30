import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);

    const navBase = 'rounded-full px-3 py-1.5 text-sm font-medium transition';
    const navActive = 'bg-white text-slate-900';
    const navInactive = 'text-slate-200 hover:bg-white/15';

    return (
        <div className="sticky top-0 z-40 mb-6 border-b border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Airport Operations</p>
                    <h1 className="text-2xl font-black text-white md:text-3xl">{title}</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `${navBase} ${isActive ? navActive : navInactive}`}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/issues/report"
                            className={({ isActive }) => `${navBase} ${isActive ? navActive : navInactive}`}
                        >
                            Report Issue
                        </NavLink>
                        <NavLink
                            to="/calendar"
                            className={({ isActive }) => `${navBase} ${isActive ? navActive : navInactive}`}
                        >
                            Calendar
                        </NavLink>
                    </div>

                    <button
                        onClick={() => navigate('/sos')}
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-700"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" clipRule="evenodd" />
                        </svg>
                        SOS
                    </button>

                    <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {user?.email}
                    </div>

                    <button
                        onClick={logout}
                        className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
