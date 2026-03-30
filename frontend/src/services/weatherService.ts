/**
 * Weather Service
 * Fetches weather data from WeatherAPI
 * API Key: e5f62712f8472fcd365778b86caa61ee
 */

export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        temp_f: number;
        condition: {
            text: string;
            icon: string;
        };
        humidity: number;
        wind_kph: number;
        feelslike_c: number;
    };
}

const WEATHER_API_KEY = 'e5f62712f8472fcd365778b86caa61ee';
const WEATHER_API = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (latitude?: number, longitude?: number): Promise<WeatherData | null> => {
    try {
        const query = latitude && longitude ? `${latitude},${longitude}` : 'London';
        
        const response = await fetch(
            `${WEATHER_API}/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=no`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.warn(`Weather API returned status ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data as WeatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherData | null> => {
    try {
        const response = await fetch(
            `${WEATHER_API}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.warn(`Weather API returned status ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data as WeatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
