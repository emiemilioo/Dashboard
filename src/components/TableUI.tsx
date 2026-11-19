import { Box, Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
    labels: string[];
    values1: number[];
    values2: number[];
    header1: string;
    header2: string;
}

export default function TableUI({ labels, values1, values2, header1, header2 }: TableUIProps) {
    const rows = labels.map((label, index) => ({
        id: index,
        label,
        value1: values1[index],
        value2: values2[index]
    }));

    const columns: GridColDef[] = [
        { field: 'label', headerName: 'Hora', flex: 1, minWidth: 90 },
        { field: 'value1', headerName: header1, type: 'number', flex: 1, minWidth: 150 },
        { field: 'value2', headerName: header2, type: 'number', flex: 1, minWidth: 130 }
    ];

    return (
        <Paper variant="outlined" sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>Datos por hora</Typography>
            <Box sx={{ height: 320, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
                    pageSizeOptions={[6, 12, 24]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Paper>
    );
}
