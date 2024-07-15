import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DEPARTMENTS = ['Гомельский ГОЧС', 'Брагинский РОЧС', 'Буда-Кошелевский РОЧС']

interface ReportTableProps {
    reportDate: string;
    data: number[][];
}

const ReportTable: React.FC<ReportTableProps> = ({ reportDate, data }) => {
    const columns = [
        'Район',
        'Дизель',
        'Дизель в баках',
        'АИ-92',
        'АИ-92 в баках',
        'АИ-95',
        'АИ-95 в баках',
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{backgroundColor:"#556cd6"}}>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell sx={{color:"white"}} key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell>{DEPARTMENTS[rowIndex]}</TableCell>
                            {row.map(e=>(<TableCell>{e}</TableCell>))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportTable;