import { useState } from 'react';
import './App.css';
import { Grid } from '@mui/material';

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {
    // App guarda la ciudad seleccionada
    const [cityInput, setCityInput] = useState('');

    return (
        <Grid
            container
            spacing={5}
            sx={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {/* Encabezado */}
            <Grid size={{ xs: 12 }}>
                <HeaderUI />
            </Grid>

            {/* Alertas */}
            <Grid
                size={{ xs: 12 }}
                container
                sx={{
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <AlertUI description="No se prevén lluvias" />
            </Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }}>
                <SelectorUI
                    city={cityInput}
                    onCityChange={setCityInput}
                />

                {cityInput && (
                    <p>
                        Información del clima en{' '}
                        <strong
                            style={{ textTransform: 'capitalize' }}
                        >
                            {cityInput}
                        </strong>
                    </p>
                )}
            </Grid>

            {/* Indicadores */}
            <Grid size={{ xs: 12, md: 9 }}>
                Elemento: Indicadores de {cityInput || 'ninguna ciudad'}
            </Grid>

            {/* Gráfico */}
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: { xs: 'none', md: 'block' }
                }}
            >
                Elemento: Gráfico de {cityInput || 'ninguna ciudad'}
            </Grid>

            {/* Tabla */}
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: { xs: 'none', md: 'block' }
                }}
            >
                Elemento: Tabla de {cityInput || 'ninguna ciudad'}
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12 }}>
                Información adicional de{' '}
                {cityInput || 'ninguna ciudad'}
            </Grid>
        </Grid>
    );
}

export default App;