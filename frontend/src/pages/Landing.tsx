import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold mb-8">Airport Issue Manager</h1>
            <div className="flex flex-col gap-4 w-full max-w-md">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                    Staff / Admin Login
                </Link>
                <Link to="/sos" className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-6 rounded-lg text-center text-2xl animate-pulse transition">
                    🚨 SOS / EMERGENCY
                </Link>
                <Link to="/report" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                    Report an Issue (Passenger)
                </Link>
            </div>
        </div>
    );
};

export default Landing;
