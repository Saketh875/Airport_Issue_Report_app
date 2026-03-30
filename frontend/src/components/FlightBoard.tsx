import { useMemo, useState, useEffect } from 'react';
import { fetchMultipleAirports } from '../services/airportService';

type FlightType = 'ARRIVAL' | 'DEPARTURE';
type FlightStatus = 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'LANDED' | 'DEPARTED';

interface Flight {
    id: string;
    code: string;
    iata: string;
    city: string;
    country: string;
    terminal: string;
    gate: string;
    scheduledTime: string;
    status: FlightStatus;
    type: FlightType;
}

const MOCK_FLIGHTS: Omit<Flight, 'country'>[] = [
    { id: 'a1', code: 'AI 274', iata: 'DEL', city: 'Delhi', terminal: 'T2', gate: 'A14', scheduledTime: '10:20', status: 'ON_TIME', type: 'ARRIVAL' },
    { id: 'a2', code: '6E 998', iata: 'BLR', city: 'Bengaluru', terminal: 'T1', gate: 'B06', scheduledTime: '10:35', status: 'DELAYED', type: 'ARRIVAL' },
    { id: 'a3', code: 'UK 561', iata: 'BOM', city: 'Mumbai', terminal: 'T1', gate: 'A03', scheduledTime: '10:50', status: 'LANDED', type: 'ARRIVAL' },
    { id: 'a4', code: 'SG 204', iata: 'HYD', city: 'Hyderabad', terminal: 'T2', gate: 'C11', scheduledTime: '11:05', status: 'ON_TIME', type: 'ARRIVAL' },
    { id: 'd1', code: 'AI 871', iata: 'CCU', city: 'Kolkata', terminal: 'T2', gate: 'D03', scheduledTime: '10:25', status: 'BOARDING', type: 'DEPARTURE' },
    { id: 'd2', code: '6E 312', iata: 'MAA', city: 'Chennai', terminal: 'T1', gate: 'B09', scheduledTime: '10:40', status: 'ON_TIME', type: 'DEPARTURE' },
    { id: 'd3', code: 'QP 145', iata: 'GOI', city: 'Goa', terminal: 'T1', gate: 'C02', scheduledTime: '10:55', status: 'DELAYED', type: 'DEPARTURE' },
    { id: 'd4', code: 'IX 443', iata: 'PNQ', city: 'Pune', terminal: 'T2', gate: 'A22', scheduledTime: '11:15', status: 'DEPARTED', type: 'DEPARTURE' }
];

const statusClass = (status: FlightStatus) => {
    if (status === 'DELAYED') return 'bg-red-600/20 text-red-300 border border-red-500/40';
    if (status === 'BOARDING') return 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/40';
    if (status === 'LANDED' || status === 'DEPARTED') return 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40';
    return 'bg-blue-600/20 text-blue-300 border border-blue-500/40';
};

const FlightBoard = () => {
    const [search, setSearch] = useState('');
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);

    // Load airport data on component mount
    useEffect(() => {
        const loadAirportData = async () => {
            try {
                setLoading(true);
                // Extract unique IATA codes from mock flights
                const iataCodes = [...new Set(MOCK_FLIGHTS.map(f => f.iata))];
                
                // Fetch airport data for all codes
                const airportMap = await fetchMultipleAirports(iataCodes);
                
                // Merge mock flight data with real airport data
                const enrichedFlights = MOCK_FLIGHTS.map(flight => {
                    const airport = airportMap.get(flight.iata);
                    return {
                        ...flight,
                        country: airport?.country || 'Unknown',
                    };
                });
                
                setFlights(enrichedFlights);
            } catch (error) {
                console.error('Error loading airport data:', error);
                // Fallback to mock data if API fails
                setFlights(MOCK_FLIGHTS.map(f => ({ ...f, country: 'India' })));
            } finally {
                setLoading(false);
            }
        };

        loadAirportData();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return flights;
        return flights.filter((f) =>
            f.code.toLowerCase().includes(q) ||
            f.city.toLowerCase().includes(q) ||
            f.country.toLowerCase().includes(q) ||
            f.gate.toLowerCase().includes(q)
        );
    }, [search, flights]);

    const arrivals = filtered.filter((f) => f.type === 'ARRIVAL');
    const departures = filtered.filter((f) => f.type === 'DEPARTURE');

    const renderTable = (rows: Flight[]) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-700 text-slate-300">
                        <th className="p-2">Flight</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Country</th>
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
                            <td className="p-2 text-xs text-slate-400">{f.country}</td>
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
                    <p className="text-slate-400 text-sm">
                        {loading ? 'Loading live airport data...' : 'Live board for current terminal operations'}
                    </p>
                </div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search flight, city, country, or gate"
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    disabled={loading}
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin">
                        <div className="h-8 w-8 border-4 border-slate-700 border-t-blue-500 rounded-full"></div>
                    </div>
                    <span className="ml-3 text-slate-400">Loading airport data from API...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    <div className="bg-slate-900 rounded border border-slate-800 p-3">
                        <h3 className="font-bold text-lg mb-2">Arrivals ({arrivals.length})</h3>
                        {arrivals.length > 0 ? renderTable(arrivals) : <p className="text-slate-400 text-sm p-2">No arrivals found</p>}
                    </div>
                    <div className="bg-slate-900 rounded border border-slate-800 p-3">
                        <h3 className="font-bold text-lg mb-2">Departures ({departures.length})</h3>
                        {departures.length > 0 ? renderTable(departures) : <p className="text-slate-400 text-sm p-2">No departures found</p>}
                    </div>
                </div>
            )}
        </section>
    );
};

export default FlightBoard;
