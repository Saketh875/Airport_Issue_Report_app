import { useNavigate } from 'react-router-dom';

const ReportButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/issues/report')}
            className="fixed bottom-8 right-8 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-bold text-slate-900 shadow-2xl shadow-cyan-900/50 transition hover:scale-105"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" />
            </svg>
            Report Issue
        </button>
    );
};

export default ReportButton;
