import { useState } from 'react';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import './App.css';
import AlertUI from './components/AlertUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import IndicatorUI from './components/IndicatorUI';
import SelectorUI from './components/SelectorUI';
import TableUI from './components/TableUI';
import useFetchData from './hooks/useFetchData';

const cities = {
    guayaquil: { name: 'Guayaquil', latitude: -2.1962, longitude: -79.8862 },
    quito: { name: 'Quito', latitude: -0.1807, longitude: -78.4678 },
    manta: { name: 'Manta', latitude: -0.9677, longitude: -80.7089 },
    cuenca: { name: 'Cuenca', latitude: -2.9001, longitude: -79.0059 }
} as const;

type CityKey = keyof typeof cities;

function App() {
    const [cityInput, setCityInput] = useState<CityKey>('guayaquil');
    const city = cities[cityInput];
    const { data, error, loading } = useFetchData(city.latitude, city.longitude);

    return (
        <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 }, alignItems: 'stretch' }}>
            <Grid size={{ xs: 12 }}><HeaderUI /></Grid>
            <Grid size={{ xs: 12 }} container sx={{ justifyContent: 'flex-end' }}>
                <AlertUI description={`Datos meteorológicos actuales de ${city.name}`} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <SelectorUI city={cityInput} onCityChange={(value) => setCityInput(value as CityKey)} />
                <Typography sx={{ mt: 2 }}>Información del clima en <strong>{city.name}</strong></Typography>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
                {loading && <Grid size={{ xs: 12 }}><Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress aria-label="Cargando datos meteorológicos" /></Box></Grid>}
                {error && <Grid size={{ xs: 12 }}><Alert severity="error">{error}</Alert></Grid>}
                {data && [
                    ['Temperatura (2 m)', `${data.current.temperature_2m} ${data.current_units.temperature_2m}`],
                    ['Temperatura aparente', `${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`],
                    ['Velocidad del viento', `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`],
                    ['Humedad relativa', `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`]
                ].map(([title, description]) => (
                    <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}><IndicatorUI title={title} description={description} /></Grid>
                ))}
            </Grid>

            {data && (
                <>
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <ChartUI
                            title="Temperatura y viento por hora"
                            labels={data.hourly.time.map((time) => time.slice(11))}
                            values1={data.hourly.temperature_2m}
                            values2={data.hourly.wind_speed_10m}
                            label1={`Temperatura (${data.hourly_units.temperature_2m})`}
                            label2={`Viento (${data.hourly_units.wind_speed_10m})`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <TableUI
                            labels={data.hourly.time.map((time) => time.slice(11))}
                            values1={data.hourly.temperature_2m}
                            values2={data.hourly.wind_speed_10m}
                            header1={`Temperatura (${data.hourly_units.temperature_2m})`}
                            header2={`Viento (${data.hourly_units.wind_speed_10m})`}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default App;
