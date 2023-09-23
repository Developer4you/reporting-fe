import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import loader from "./assets/loader.gif";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(()=>{
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
        <LoginForm/>
    )

  return (
    <div>
        <h1>
            {store.isAuth ? `Вы авторизованы ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}
        </h1>
        <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</h1>
        <button onClick={ () => store.logout()}>Выйти</button>
        <div>
            <button onClick={getUsers}>
                Ge Users
            </button>
            {users.map(user=><div key={user.email}>{user.email}</div>)}
        </div>
    </div>
  );
}

export default observer(App);
