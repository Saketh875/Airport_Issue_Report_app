import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return (
        <div className="sticky top-0 z-40 bg-slate-800/95 backdrop-blur border-b border-slate-700 p-6 mb-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex items-center gap-4">
                    {/* SOS Button - Top Right */}
                    <button
                        onClick={() => navigate('/sos')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 animate-pulse"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" clipRule="evenodd" />
                        </svg>
                        SOS
                    </button>
                    <button onClick={logout} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
