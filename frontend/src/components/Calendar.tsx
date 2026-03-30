import { useState, useEffect } from 'react';
import { fetchWeather, WeatherData } from '../services/weatherService';

interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    category: 'Work' | 'Personal' | 'Health' | 'Airport';
    description?: string;
    attendees?: string[];
}

const CATEGORIES = [
    { name: 'Work', color: 'bg-blue-500', lightColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { name: 'Personal', color: 'bg-purple-500', lightColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { name: 'Health', color: 'bg-red-500', lightColor: 'bg-red-100', textColor: 'text-red-700' },
    { name: 'Airport', color: 'bg-green-500', lightColor: 'bg-green-100', textColor: 'text-green-700' },
];

const SAMPLE_EVENTS: CalendarEvent[] = [
    { id: '1', title: 'Booking test app', time: '06:00 - 07:30', category: 'Work', description: 'Test the booking functionality' },
    { id: '2', title: 'Design onboarding', time: '06:00 - 07:10', category: 'Work', description: 'Create onboarding screens' },
    { id: '3', title: 'Development meet', time: '06:00 - 08:00', category: 'Work', description: 'Team sync meeting' },
    { id: '4', title: 'Development meet', time: '08:40 - 10:00', category: 'Work', description: 'Continue team discussion' },
    { id: '5', title: 'Book offline', time: '07:30 - 10:00', category: 'Personal', description: 'Offline booking session' },
    { id: '6', title: 'Design session', time: '08:50 - 09:30', category: 'Work', description: 'Design review' },
    { id: '7', title: 'New project', time: '10:45 - 12:30', category: 'Work', description: 'Initialize new project' },
    { id: '8', title: 'Design Review', time: '09:40 - 10:30', category: 'Work', description: 'Review design assets' },
    { id: '9', title: 'Onboarding meet', time: '10:50 - 12:00', category: 'Personal', description: 'Onboarding session' },
    { id: '10', title: 'Planning tasks', time: '07:30 - 08:30', category: 'Personal', description: 'Plan daily tasks' },
    { id: '11', title: 'Design our website', time: '08:30 - 10:50', category: 'Work', description: 'Website design' },
    { id: '12', title: 'Meet with Jonson Rider', time: '10:00 - 11:00', category: 'Personal', description: 'One on one meeting' },
];

const Calendar = () => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(SAMPLE_EVENTS[0]);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchWeather();
                setWeather(data);
            } catch (error) {
                console.error('Failed to load weather:', error);
            }
        };
        loadWeather();
    }, []);

    const getCategoryColor = (category: string) => {
        return CATEGORIES.find(c => c.name === category);
    };

    const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 6am to 11pm

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">AL</div>
                    <div>
                        <p className="font-semibold">Antonio Lorentio</p>
                        <p className="text-xs text-gray-400">Product Designer</p>
                    </div>
                </div>

                {/* Mini Calendar */}
                <div className="mb-8">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">July 2022</h3>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="grid grid-cols-7 gap-1 text-xs mb-2 text-center">
                            <span className="text-gray-500">Mo</span>
                            <span className="text-gray-500">Tu</span>
                            <span className="text-gray-500">We</span>
                            <span className="text-gray-500">Th</span>
                            <span className="text-gray-500">Fr</span>
                            <span className="text-gray-500">Sa</span>
                            <span className="text-gray-500">Su</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-xs text-center">
                            {Array.from({ length: 28 }).map((_, i) => {
                                const day = i + 1;
                                return (
                                    <div
                                        key={i}
                                        className={`p-1 rounded ${
                                            day === 17
                                                ? 'bg-blue-500 font-bold'
                                                : 'text-gray-300 hover:bg-gray-700 cursor-pointer'
                                        }`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">Categories</h3>
                    <div className="space-y-3">
                        {CATEGORIES.map((cat) => (
                            <div key={cat.name} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                                <span className="text-sm">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold">December, 2023</h1>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100">Month</button>
                            <button className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100">Week</button>
                            <button className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-100">Day</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded">←</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">Today</button>
                        <button className="p-2 hover:bg-gray-100 rounded">→</button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Time Column */}
                    <div className="w-20 bg-gray-50 border-r border-gray-200">
                        <div className="h-12 border-b border-gray-200"></div>
                        {hours.map((hour) => (
                            <div key={hour} className="h-24 border-b border-gray-200 text-xs text-gray-500 p-2">
                                {hour % 12 || 12}:00 {hour < 12 ? 'am' : 'pm'}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="flex flex-1 gap-px bg-gray-200 p-px">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, dayIdx) => (
                            <div key={day} className="flex-1 bg-white flex flex-col">
                                <div className="h-12 border-b border-gray-200 flex flex-col items-center justify-center bg-gray-50">
                                    <p className="text-xs text-gray-500">{day}</p>
                                    <p className="text-lg font-bold">{16 + dayIdx}</p>
                                </div>
                                <div className="flex-1 relative">
                                    {hours.map((hour) => (
                                        <div key={hour} className="h-24 border-b border-gray-100 relative"></div>
                                    ))}
                                    {/* Events for this day */}
                                    {SAMPLE_EVENTS.slice(0, 5).map((event) => {
                                        const catColor = getCategoryColor(event.category);
                                        return (
                                            <div
                                                key={event.id}
                                                onClick={() => setSelectedEvent(event)}
                                                className={`absolute left-1 right-1 p-2 rounded cursor-pointer text-xs font-medium text-white ${catColor?.color} hover:opacity-80`}
                                                style={{ top: `${Math.random() * 300}px`, height: '60px' }}
                                            >
                                                <p className="truncate">{event.title}</p>
                                                <p className="text-xs opacity-80">{event.time}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Event Details */}
            <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
                {selectedEvent ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
                        
                        <div className="space-y-6">
                            {/* Date and Time */}
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Date & Time</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">📅</span>
                                    <span className="text-sm">Tuesday, 18 December</span>
                                </div>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="06:00" className="flex-1 border rounded px-2 py-1 text-sm" defaultValue="06:00" />
                                    <input type="text" placeholder="07:00" className="flex-1 border rounded px-2 py-1 text-sm" defaultValue="07:00" />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Location</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">📍</span>
                                    <span className="text-sm">Park Lane Office</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Tags</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Design</span>
                                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">Personal project</span>
                                </div>
                            </div>

                            {/* Attendees */}
                            {selectedEvent.attendees && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Attendees</p>
                                    <div className="flex items-center gap-2">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Weather Widget */}
                            {weather && (
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm opacity-80">{weather.location.name}</p>
                                            <p className="text-2xl font-bold">{weather.current.temp_c}°C</p>
                                        </div>
                                        <span className="text-4xl">☀️</span>
                                    </div>
                                    <p className="text-sm">{weather.current.condition.text}</p>
                                    <div className="mt-3 pt-3 border-t border-white border-opacity-30 text-xs space-y-1">
                                        <div className="flex justify-between">
                                            <span>Feels like:</span>
                                            <span>{weather.current.feelslike_c}°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Humidity:</span>
                                            <span>{weather.current.humidity}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Wind:</span>
                                            <span>{weather.current.wind_kph} km/h</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Add Event Button */}
                            <button className="w-full bg-black text-white px-4 py-3 rounded font-medium hover:bg-gray-800">
                                Add Event
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Select an event to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
