import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import ReportTable from './ReportTable'; // Путь к вашему компоненту ReportTable

interface ExportToExcelProps {
    reportDate: string;
    data: number[][];
}

const ReportTableToExcel: React.FC<ExportToExcelProps> = ({ reportDate, data }) => {
    const tableRef = useRef<HTMLDivElement | null>(null);

    const exportToExcel = () => {
        if (tableRef.current) {
            const ws = XLSX.utils.table_to_sheet(tableRef.current);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, `Отчет_${reportDate}.xlsx`);
        }
    };

    return (
        <>
            <div ref={tableRef}>
                <ReportTable reportDate={reportDate} data={data} />
            </div>
            <button onClick={exportToExcel}>Экспортировать в Excel</button>
        </>
    );
};

export default ReportTableToExcel;
