import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {IUserReport} from "../../models/IUserReport";
import {Link, Typography} from "@mui/material";
import {ReportType} from "./UserPage";

type propsType = {
    reportToShow: ReportType | null
    reportDate: string
}
const Report: FC<propsType> = ({reportToShow, reportDate}) => {

    return (
        <>
            <Typography>
                {`Ваш отчет за ${reportDate}`}
            </Typography>
            <Typography>
                {`Дизель: ${reportToShow?.diesel} литров`}
            </Typography><Typography>
                {`Дизель в баках: ${reportToShow?.dieselInTank} литров`}
            </Typography><Typography>
                {`Бензин АИ-80: ${reportToShow?.petrol80} литров`}
            </Typography><Typography>
                {`Бензин АИ-80 в баках: ${reportToShow?.petrol80InTank} литров`}
            </Typography><Typography>
                {`Бензин АИ-95: ${reportToShow?.petrol95} литров`}
            </Typography><Typography>
                {`Бензин АИ-95 в баках: ${reportToShow?.petrol95InTank} литров`}
            </Typography>

        </>
    )
}

export default Report;