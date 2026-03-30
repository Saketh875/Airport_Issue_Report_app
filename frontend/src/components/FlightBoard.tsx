import { useMemo, useState } from 'react';

type FlightType = 'ARRIVAL' | 'DEPARTURE';
type FlightStatus = 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'LANDED' | 'DEPARTED';

interface Flight {
    id: string;
    code: string;
    city: string;
    terminal: string;
    gate: string;
    scheduledTime: string;
    status: FlightStatus;
    type: FlightType;
}

const FLIGHTS: Flight[] = [
    { id: 'a1', code: 'AI 274', city: 'Delhi', terminal: 'T2', gate: 'A14', scheduledTime: '10:20', status: 'ON_TIME', type: 'ARRIVAL' },
    { id: 'a2', code: '6E 998', city: 'Bengaluru', terminal: 'T1', gate: 'B06', scheduledTime: '10:35', status: 'DELAYED', type: 'ARRIVAL' },
    { id: 'a3', code: 'UK 561', city: 'Mumbai', terminal: 'T1', gate: 'A03', scheduledTime: '10:50', status: 'LANDED', type: 'ARRIVAL' },
    { id: 'a4', code: 'SG 204', city: 'Hyderabad', terminal: 'T2', gate: 'C11', scheduledTime: '11:05', status: 'ON_TIME', type: 'ARRIVAL' },
    { id: 'd1', code: 'AI 871', city: 'Kolkata', terminal: 'T2', gate: 'D03', scheduledTime: '10:25', status: 'BOARDING', type: 'DEPARTURE' },
    { id: 'd2', code: '6E 312', city: 'Chennai', terminal: 'T1', gate: 'B09', scheduledTime: '10:40', status: 'ON_TIME', type: 'DEPARTURE' },
    { id: 'd3', code: 'QP 145', city: 'Goa', terminal: 'T1', gate: 'C02', scheduledTime: '10:55', status: 'DELAYED', type: 'DEPARTURE' },
    { id: 'd4', code: 'IX 443', city: 'Pune', terminal: 'T2', gate: 'A22', scheduledTime: '11:15', status: 'DEPARTED', type: 'DEPARTURE' }
];

const statusClass = (status: FlightStatus) => {
    if (status === 'DELAYED') return 'bg-red-600/20 text-red-300 border border-red-500/40';
    if (status === 'BOARDING') return 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/40';
    if (status === 'LANDED' || status === 'DEPARTED') return 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40';
    return 'bg-blue-600/20 text-blue-300 border border-blue-500/40';
};

const FlightBoard = () => {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return FLIGHTS;
        return FLIGHTS.filter((f) =>
            f.code.toLowerCase().includes(q) ||
            f.city.toLowerCase().includes(q) ||
            f.gate.toLowerCase().includes(q)
        );
    }, [search]);

    const arrivals = filtered.filter((f) => f.type === 'ARRIVAL');
    const departures = filtered.filter((f) => f.type === 'DEPARTURE');

    const renderTable = (rows: Flight[]) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-700 text-slate-300">
                        <th className="p-2">Flight</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Time</th>
                        <th className="p-2">Terminal</th>
                        <th className="p-2">Gate</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((f) => (
                        <tr key={f.id} className="border-b border-slate-800 hover:bg-slate-800/60">
                            <td className="p-2 font-semibold">{f.code}</td>
                            <td className="p-2">{f.city}</td>
                            <td className="p-2">{f.scheduledTime}</td>
                            <td className="p-2">{f.terminal}</td>
                            <td className="p-2">{f.gate}</td>
                            <td className="p-2">
                                <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${statusClass(f.status)}`}>
                                    {f.status.replace('_', ' ')}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <section className="bg-slate-900/80 rounded-lg p-6 mb-6 border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Arrivals & Departures</h2>
                    <p className="text-slate-400 text-sm">Live board for current terminal operations</p>
                </div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search flight, city, or gate"
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div className="bg-slate-900 rounded border border-slate-800 p-3">
                    <h3 className="font-bold text-lg mb-2">Arrivals</h3>
                    {renderTable(arrivals)}
                </div>
                <div className="bg-slate-900 rounded border border-slate-800 p-3">
                    <h3 className="font-bold text-lg mb-2">Departures</h3>
                    {renderTable(departures)}
                </div>
            </div>
        </section>
    );
};

export default FlightBoard;
