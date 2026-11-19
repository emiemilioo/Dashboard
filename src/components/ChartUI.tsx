import { Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface ChartUIProps {
    title: string;
    labels: string[];
    values1: number[];
    values2: number[];
    label1: string;
    label2: string;
}

export default function ChartUI({ title, labels, values1, values2, label1, label2 }: ChartUIProps) {
    return (
        <Paper variant="outlined" sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>{title}</Typography>
            <LineChart
                height={320}
                series={[
                    { data: values1, label: label1, showMark: false },
                    { data: values2, label: label2, showMark: false }
                ]}
                xAxis={[{ scaleType: 'point', data: labels, label: 'Hora' }]}
                margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
            />
        </Paper>
    );
}
