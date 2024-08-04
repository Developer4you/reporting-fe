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
            console.log('localStorage getItem token')
            store.checkAuth()
        } else {
            console.log('setIsCheckAuth true')
            store.setIsCheckAuth(true)}
    }, [])

    console.log('store.user.email', store.user.email)
    console.log('store.isCheckAuth', store.isCheckAuth)
    if (store.isCheckAuth) {
        console.log('store.isAuth',store.isAuth)
        if (!store.isAuth) {
            console.log('Navigate replace to login')
        return <Navigate replace to="/login"/>
    } else {
        if (store.user.email==='221674@mail.ru') {
            return <Navigate replace to="/main-user"/>
        } else if (store.user.email === "cmdrgou@mail.ru")
        {return <Navigate replace to="/guest"/>}
        else {
            return <Navigate replace to="/user"/>
        }
    }}

    return (
        <Container>
            <img src={loader} alt="loader" style={{margin: "35vh 30vw"}}/>
        </Container>
    );
}

export default observer(App);
