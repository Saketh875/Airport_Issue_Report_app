/**
 * Flight Data Service
 * Fetches real flight data from OpenSky Network API
 * https://opensky-network.org/apidoc/
 */

export interface FlightData {
    icao24: string;
    callsign: string;
    origin_country: string;
    time_position: number;
    last_contact: number;
    longitude: number | null;
    latitude: number | null;
    baro_altitude: number | null;
    on_ground: boolean;
    velocity: number | null;
    true_track: number | null;
    vertical_rate: number | null;
    sensors: number[] | null;
    geo_altitude: number | null;
    squawk: string | null;
    spi: boolean;
    position_source: number;
    category: number;
}

export interface TransformedFlight {
    id: string;
    code: string;
    iata: string;
    city: string;
    country: string;
    terminal: string;
    gate: string;
    scheduledTime: string;
    status: string;
    type: 'ARRIVAL' | 'DEPARTURE';
}

const OPENSKY_API = 'https://opensky-api.herokuapp.com/api';

/**
 * Fetch real flight data from OpenSky Network API
 * Returns all aircraft currently in the air
 */
export const fetchRealFlights = async (): Promise<TransformedFlight[]> => {
    try {
        const response = await fetch(`${OPENSKY_API}/states/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn(`OpenSky API returned status ${response.status}`);
            return [];
        }

        const data = await response.json();
        
        if (!data.states || data.states.length === 0) {
            console.warn('No flight data available from OpenSky API');
            return [];
        }

        // Transform OpenSky data to our Flight format
        // Each state is an array with format:
        // [icao24, callsign, origin_country, time_position, last_contact, 
        //  longitude, latitude, baro_altitude, on_ground, velocity, 
        //  true_track, vertical_rate, sensors, geo_altitude, squawk, 
        //  spi, position_source, category]
        
        const transformedFlights: TransformedFlight[] = data.states
            .slice(0, 16) // Limit to 16 flights (8 arrivals + 8 departures) for demo
            .map((state: any[], index: number) => {
                const callsign = (state[1] || 'N/A').trim();
                const country = state[2] || 'Unknown';
                const altitude = state[7];
                const velocity = state[9];
                
                // Determine if arrival or departure based on index
                const isArrival = index < 8;
                
                // Extract airline code from callsign (first 3 chars usually)
                const airlineCode = callsign.substring(0, 3).toUpperCase();
                
                // Simulate flight number from callsign
                const flightNumber = callsign.substring(3, 7) || String(index).padStart(3, '0');
                
                return {
                    id: `flight-${index}`,
                    code: `${airlineCode} ${flightNumber}`,
                    iata: country.substring(0, 3).toUpperCase(),
                    city: country,
                    country: country,
                    terminal: `T${(index % 3) + 1}`,
                    gate: `${String.fromCharCode(65 + (index % 5))}${String((index % 30) + 1).padStart(2, '0')}`,
                    scheduledTime: formatTime(new Date(Date.now() + Math.random() * 3600000)),
                    status: getFlightStatus(velocity, altitude),
                    type: isArrival ? 'ARRIVAL' : 'DEPARTURE',
                };
            });

        return transformedFlights;
    } catch (error) {
        console.error('Error fetching flights from OpenSky API:', error);
        return [];
    }
};

/**
 * Determine flight status based on altitude and velocity
 */
function getFlightStatus(velocity: number | null, altitude: number | null): string {
    if (!velocity || !altitude) return 'ON_TIME';
    
    if (altitude < 300) return 'LANDED';
    if (altitude < 1000) return 'LANDING';
    if (velocity === 0 || altitude === 0) return 'BOARDING';
    if (velocity && velocity < 100) return 'DELAYED';
    
    return 'ON_TIME';
}

/**
 * Format time as HH:MM
 */
function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
