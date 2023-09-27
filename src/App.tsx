import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import loader from "./assets/loader.gif";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import {Button} from "@mui/material";
import s from "./App.module.css"
import LoginPage from "./pages/LoginPage/LoginPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (store.isLoading) return (
        <img src={loader} alt="loader"/>
    )

    if (!store.isAuth) return (
        <LoginPage/>
    )

    return (
        <div className={s.app}>
            <header className={s.mainHeader}>
                <div className={s.headerWrap}>
                    <div>
                        {store.isAuth ? `Вы авторизованы ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}
                    </div>
                    <div>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</div>
                    <Button variant="contained" onClick={() => store.logout()}>Выйти</Button>
                </div>
            </header>

            <ReportsPage/>
            {/*<div>*/}
            {/*    <Button variant="contained" onClick={getUsers}>*/}
            {/*        Ge Users*/}
            {/*    </Button>*/}
            {/*    {users.map(user=><div key={user.email}>{user.email}</div>)}*/}
            {/*</div>*/}
        </div>
    );
}

export default observer(App);
