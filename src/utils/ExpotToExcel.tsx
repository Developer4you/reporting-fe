import React from 'react';
import * as XLSX from 'xlsx';
import {Button} from "@mui/material";

interface ExportToExcelProps {
    data: any[];
    fileName: string;
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data, fileName }) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <Button onClick={exportToExcel}>
            Экспортировать в Excel
        </Button>
);
};

export default ExportToExcel;

