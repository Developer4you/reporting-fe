import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {IUserReport} from "../../models/IUserReport";
import {Button, Typography} from "@mui/material";
import { Link } from 'react-router-dom';
import {ReportsType} from "./UserPage";

type propsType = {
    reports: ReportsType[]
    callback: (id:string)=>void
}
const Reports: FC<propsType> = ({reports, callback}) => {

    return (
        <>
            <Typography>
                Ваши отчеты
            </Typography>
            {reports.map(e => {
                return (
                    <Button variant="outlined" key={e._id} onClick={()=>callback(e._id)} sx={{margin:1}}>
                        {
                            e.date.split('T')[0]
                        }
                    </Button>

                )
            })}

        </>
    )
}

export default Reports;