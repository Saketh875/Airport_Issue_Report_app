const API_KEY = 'XEcJ+cdCnqXqYYRrdXCDtQ==7M0vIJHeAn4gKQ8z';
const API_BASE_URL = 'https://api.api-ninjas.com/v1/airports';

export interface Airport {
    iata: string;
    icao: string;
    name: string;
    city: string;
    country: string;
    elevation_ft: number;
    timezone: string;
    gmt_offset_hours: number;
    iata_prefix: string;
}

export const fetchAirportData = async (iataCode: string): Promise<Airport | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}?iata=${iataCode.toUpperCase()}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
            },
        });

        if (!response.ok) {
            console.warn(`Failed to fetch airport data for ${iataCode}: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data && Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error(`Error fetching airport data for ${iataCode}:`, error);
        return null;
    }
};

export const fetchMultipleAirports = async (iataCodes: string[]): Promise<Map<string, Airport>> => {
    const results = new Map<string, Airport>();
    
    // Fetch airports sequentially with a small delay to avoid rate limiting
    for (const code of iataCodes) {
        const airport = await fetchAirportData(code);
        if (airport) {
            results.set(code, airport);
        }
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
};
