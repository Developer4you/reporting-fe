import React, {FC, useContext, useEffect} from 'react';
import {Context} from "./index";
import loader from "./assets/loader.gif"
import {Navigate, redirect} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Container} from "@mui/material";

const App: FC = () => {

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        } else store.setIsCheckAuth(true)
    }, [])

    console.log('Render App')
    if (store.isCheckAuth) if (!store.isAuth) {
        return <Navigate replace to="/login"/>
    } else {
        return <Navigate replace to="/user"/>
    }

    return (
        <Container>
            <img src={loader} alt="loader" style={{margin: "35vh 30vw"}}/>
        </Container>
    );
}

export default observer(App);
