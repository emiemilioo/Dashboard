import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface FetchState {
    data: OpenMeteoResponse | null;
    error: string | null;
    loading: boolean;
}

export default function useFetchData(latitude: number, longitude: number): FetchState {
    const [state, setState] = useState<FetchState>({ data: null, error: null, loading: true });

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams({
            latitude: String(latitude), longitude: String(longitude),
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m',
            timezone: 'America/Guayaquil'
        });

        async function fetchWeather() {
            setState({ data: null, error: null, loading: true });
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal });
                if (!response.ok) throw new Error(`La API respondió con el estado ${response.status}`);
                const data: OpenMeteoResponse = await response.json();
                setState({ data, error: null, loading: false });
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                setState({ data: null, error: 'No se pudieron cargar los datos meteorológicos.', loading: false });
            }
        }

        void fetchWeather();
        return () => controller.abort();
    }, [latitude, longitude]);

    return state;
}
