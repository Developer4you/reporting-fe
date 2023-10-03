import React, {FC, useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import loader from "../../assets/loader.gif";
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Link, Paper, Typography} from "@mui/material";
import {ReportType} from "../UserPage/UserPage";
import {AddUserModalWindow} from "./AddUserModalWindow";

const MainUserPage: FC = () => {
    const {store} = useContext(Context)
    const [reportToShow, setReportToShow] = useState<ReportType | null>(null)
    const [reportDate, setReportDate] = useState('')
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const isFriday = currentDayOfWeek === 4;
    let reportsDates;


    if (store.allReportsData) {
        reportsDates = Object.keys(store.allReportsData);
        console.log('reportsDates', reportsDates)
    }


    useEffect(() => {
        store.getAllReports()
    }, [])

    if (store.isLoading) return (
        <img src={loader} alt="loader" style={{margin: "40vh 40vw"}}/>
    )


    return (<>
            <Container maxWidth="md" sx={{
                padding: 2,
                minHeight: "100vh"
            }}>
                <header>
                    <Paper sx={{
                        marginBottom: 2,
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "end"
                    }}>
                        <Typography sx={{
                            marginRight: 5
                        }}>
                            {store.isAuth ? `Вы зашли как главный пользователь ${store.user.email}` :
                                <Navigate replace to="/"/>}
                        </Typography>
                        <div>{store.user.isActivated ? '' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</div>
                        <Button variant="contained" onClick={() => store.logout()}>Выйти</Button>
                    </Paper>
                </header>
                <Paper sx={{
                    padding: "20px",
                    minHeight: 600
                }}>
                    <>
                        В настоящий момент имеются отчеты по следующим датам
                        <Box>
                            {reportsDates && reportsDates.map(e => {
                                return (
                                    <Button variant="outlined" key={e} sx={{margin: 1}}>
                                        {
                                            e.split('T')[0]
                                        }
                                    </Button>

                                )
                            })}
                        </Box>
                    </>
                </Paper>
                <Box sx={{display: "flex"}}>
                    <Button variant="contained" href="/main-user-table">Перейти к сводной таблице</Button>
                    <AddUserModalWindow/>
                </Box>

            </Container>
        </>
    );
}

export default observer(MainUserPage);