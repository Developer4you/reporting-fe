import React, {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import loader from "../../assets/loader.gif";
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Link, Paper, TextField, Typography} from "@mui/material";
import {ReportType} from "../UserPage/UserPage";
import {AddUserModalWindow} from "./AddUserModalWindow";
import {blue} from "@mui/material/colors";
import sendMail from "../../mailer/mailer";
import PurchasesComponent from "../../components/PurchasesComponent";

const MainUserPage: FC = () => {
    const {store} = useContext(Context)
    const [reportToShow, setReportToShow] = useState<ReportType | null>(null)
    const [reportDate, setReportDate] = useState('')
    const [productName, setProductName] = useState('')
    const [okrb, setOkrb] = useState('')
    const [checkedPosition, setCheckedPosition] = useState<number | null>(null)
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const isFriday = currentDayOfWeek === 4;
    let reportsDates;


    if (store.allReportsData) {
        reportsDates = Object.keys(store.allReportsData);
        console.log('reportsDates', reportsDates)
    }

    const okrbOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOkrb(e.currentTarget.value)
    }

    const productNameOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setProductName(e.currentTarget.value)
    }

    const getEmailsHandler = () => {
        store.setEmails([])
        store.getEmails(okrb)
    }

    const getPositionsHandler = () => {
        store.getPlanPositions(productName)
    }
    const positionOnClickHandler = (i:number) => {
        setCheckedPosition(i)
        setOkrb(store.planPositions[i].okrb)
    }
    const sendMailhandler = (array: string[]) => {
        store.sendEmail(array)
    }


    useEffect(() => {
        store.getAllReports()
    }, [])

    if (store.isLoading||store.isPending) return (
        <img src={loader} alt="loader" style={{margin: "20vh 40vw", width:"200px"}}/>
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
                <PurchasesComponent />
                <Box sx={{}}>
                    {store.emails.map((e) => <Box key={e}>
                        {e}
                    </Box>)}
                    {store.emails.length&&<Button variant="contained" onClick={()=>sendMailhandler(store.emails)}>Сделать рассылку</Button>}

                    <Box sx={{display: "flex", margin: "10px", marginLeft: "0"}}>
                        <TextField sx={{marginRight: "10px"}} onChange={okrbOnChangeHandler} value={okrb}
                                   id="outlined-basic" label="" variant="outlined"/>
                        <Button variant="contained" onClick={getEmailsHandler}>Получить список адресов</Button>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <Box sx={{display: "flex", margin: "10px", marginLeft: "0"}}>
                        <TextField sx={{marginRight: "10px"}} onChange={productNameOnChangeHandler} value={productName}
                                   id="outlined-basic" label="" variant="outlined"/>
                        <Button variant="contained" onClick={getPositionsHandler}>Получить список пунктов прошлогоднего
                            плана закупок</Button>
                    </Box>
                    {store.planPositions.map((e, i) =>
                        <Box key={i} onClick={()=>positionOnClickHandler(i)}
                             sx={{
                                 backgroundColor: (checkedPosition===i)? "pink": "unset",
                                 display: "flex",
                                 justifyContent: "space-between",
                                 ":hover": {
                                     cursor:"pointer",
                                     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Добавляем легкую тень при наведении
                                 border:"1px solid grey"
                                 },
                             }}>
                            <Typography>{e.position}</Typography>
                            <Typography>{e.position_name}</Typography>
                            <Typography>{e.okrb}</Typography>
                        </Box>)}
                </Box>
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
                    <Button variant="contained" href="#/main-user-table">Перейти к сводной таблице</Button>
                    <AddUserModalWindow/>
                </Box>

            </Container>
        </>
    )
        ;
}

export default observer(MainUserPage);