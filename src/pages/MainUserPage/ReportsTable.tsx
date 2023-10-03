import React, {FC, useContext, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {string} from "yup";
import {Box, Button} from "@mui/material";
import {RowType} from "../../models/IUserReport";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DEPARTMENTS = ['Гомельский ГОЧС', 'Брагинский РОЧС', 'Буда-Кошелевский РОЧС']

const ReportsTable: FC = () => {
    const {store} = useContext(Context)
    const rows: RowType[] = []
    const dates: string[] = Object.keys(store.allReportsData);
    console.log('store', store.allReportsData)

    useEffect(() => {
        store.getAllReports()
    }, [])
    function createData(date: string) {
        const result: RowType = {'Дата': date};
        DEPARTMENTS.forEach((dep, i) => {
            console.log(store.allReportsData[date]);
            const [d1, d2, d3, d4, d5, d6] = store.allReportsData[date] ? store.allReportsData[date][i] : [];
            result[dep] = `ДТ: ${d1?d1:'--'}, в баках: ${d2?d2:'--'}, АИ80: ${d3?d3:'--'}, в баках: ${d4?d4:'--'}, АИ95: ${d5?d5:'--'}, в баках: ${d6?d6:'--'}`;
        });
        return result;
    }
    dates.sort().forEach(e => {
        console.log('sortDates:', e)
        rows.push(createData(e))
    })
    return (
        <TableContainer component={Paper} sx={{margin: "10px auto", maxWidth: "95vh"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Дата</TableCell>
                        {DEPARTMENTS.map(e => {
                            return <TableCell align="left" key={'Head' + e}>{e}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >

                            <TableCell component="th" scope="row" key={row.Дата}>
                                {row.Дата}
                            </TableCell>

                            {DEPARTMENTS.map(e => {
                                const values = row[e].split(',')
                                return <TableCell align="left" key={'tab' + e}>

                                    <Box>{`${values[0]}, ${values[1]}`}</Box>
                                    <Box>{`${values[2]}, ${values[3]}`}</Box>
                                    <Box>{`${values[4]}, ${values[5]}`}</Box>

                                </TableCell>
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" href="#/main-user" sx={{margin:"0 auto"}}>Вернутся</Button>
        </TableContainer>
    );
}

export default observer(ReportsTable);