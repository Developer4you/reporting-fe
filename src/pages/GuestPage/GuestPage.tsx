import React, {FC, useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import loader from "../../assets/loader.gif";
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Link, Paper, Typography} from "@mui/material";
import PurchasesComponent from "../../components/PurchasesComponent";

export type ReportType = {
    diesel: number
    dieselInTank: number
    petrol80: number
    petrol80InTank: number
    petrol95: number
    petrol95InTank: number
}

export type ReportsType = {
    date: string
    _id: string
    _user: string
    report: ReportType
}

const GuestPage: FC = () => {
    const {store} = useContext(Context)



    useEffect(() => {

        }, [])

    if (store.isLoading) return (
        <img src={loader} alt="loader" style={{margin: "40vh 40vw"}}/>
    )

    return (<>
            <Container maxWidth="xl" sx={{
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
                        <Button></Button>
                        <Typography sx={{
                            marginRight: 5
                        }}>
                            {store.isAuth ? `Вы зашли как гость` :
                                <Navigate replace to="/"/>}
                        </Typography>
                        <div>{store.user.isActivated ? '' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</div>
                        <Button variant="contained" onClick={() => store.logout()}>Выйти</Button>
                    </Paper>
                </header>
                <Paper sx={{
                    padding: "20px",
                }}>
                    <PurchasesComponent />
                </Paper>
            </Container>

        </>
    );
}

export default observer(GuestPage);