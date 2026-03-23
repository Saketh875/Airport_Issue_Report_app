import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SOSPage = () => {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT' | 'ERROR'>('IDLE');

    const handleSOS = async () => {
        setStatus('SENDING');
        try {
            await axios.post('/api/issues/sos', {
                description: 'EMERGENCY SOS TRIGGERED',
                // Optional: capture geolocation if possible, but keep it simple
            });
            setStatus('SENT');
        } catch (err) {
            setStatus('ERROR');
        }
    };

    return (
        <div className="min-h-screen bg-red-900 text-white flex flex-col items-center justify-center p-4">
            {status === 'IDLE' && (
                <>
                    <h1 className="text-5xl font-bold mb-8 text-center">EMERGENCY SOS</h1>
                    <p className="mb-8 text-xl text-center max-w-md">
                        Pressing the button below will immediately alert all airport staff and security.
                        Only use in case of genuine emergency.
                    </p>
                    <button
                        onClick={handleSOS}
                        className="w-64 h-64 rounded-full bg-red-600 border-8 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.5)] text-4xl font-bold animate-pulse hover:scale-105 transition transform"
                    >
                        TAP TO ALERT
                    </button>
                    <Link to="/" className="mt-12 text-gray-300 underline">Cancel / Go Back</Link>
                </>
            )}

            {status === 'SENDING' && <h1 className="text-4xl font-bold animate-bounce">Sending Alert...</h1>}

            {status === 'SENT' && (
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">ALERT SENT</h1>
                    <div className="text-6xl mb-8">✅</div>
                    <p className="text-xl">Help is on the way. Please stay where you are if safe.</p>
                    <Link to="/" className="mt-8 inline-block bg-slate-800 px-6 py-3 rounded">Return Home</Link>
                </div>
            )}

            {status === 'ERROR' && (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">CONNECTION FAILED</h1>
                    <p className="text-xl mb-8">Could not send digital alert. Please contact security personnel immediately.</p>
                    <button onClick={handleSOS} className="bg-white text-red-900 px-6 py-3 rounded font-bold">Retry</button>
                </div>
            )}
        </div>
    );
};

export default SOSPage;
