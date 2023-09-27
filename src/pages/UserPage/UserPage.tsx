import React, {FC, useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import loader from "../../assets/loader.gif";
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Link, Paper, Typography} from "@mui/material";

const UserPage: FC = () => {
// debugger
    const {store} = useContext(Context)

    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const isFriday = currentDayOfWeek === 4;

    if (store.isLoading) return (
        <img src={loader} alt="loader" style={{margin: "40vh 40vw"}}/>
    )



    return (
        <Container maxWidth="md" sx={{
            padding: 2,
            minHeight: "100vh"
        }}>
            <header>
                <Paper sx={{
                    marginBottom:2,
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "end"
                }}>
                    <Typography sx={{
                        marginRight: 5
                    }}>
                        {store.isAuth ? `Вы зашли под пользователем ${store.user.email}` :
                            <Navigate replace to="/"/>}
                    </Typography>
                    <div>{store.user.isActivated ? '' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</div>
                    <Button variant="contained" onClick={() => store.logout()}>Выйти</Button>
                </Paper>
            </header>
            <Paper sx={{
                padding: "20px",
                height: 500
            }}>
                {isFriday && (<Box>
                    <Typography>
                        <h1>Внимание!</h1>
                        Сегодня Вам необходимо направить отчет об остатках топлива!
                    </Typography>
                    <Button variant="contained" href="/reports">Подготовить и направить отчет</Button>
                </Box>)}

            </Paper>
        </Container>

    );
}

export default observer(UserPage);