import React, {FC, useContext, useState} from "react";
import s from "./LoginPage.module.css"
import LoginForm from "../../components/LoginForm";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import topLogo from "../../assets/logo.png";

const LoginPage: FC = () => {
    // debugger
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    console.log('Render LoginPage')
    if (store.isAuth) if (store.user.email === "221674@mail.ru") {
        return <Navigate replace to="/main-user"/>
    } else {
        return <Navigate replace to="/user"/>
    }
    // store.registration("bragin@maill.ru", "bragin", "Брагинский отдел");

    return (
        <section className={s.loginPageWrapper}>
            <div className={s.backgroundWrapper}>
                <div className={s.content}>
                    <div className={s.textContainer}>
                        <p className={s.textLarge}>Авто-отчетность</p>
                        <p className={s.largeSmall}>система автоматизированной отчетности</p>
                    </div>
                    <div className={s.loginFormWrapper}>
                        <img src={topLogo} alt="logo"
                             className={s.topLogo}/>

                        <LoginForm/>
                        <div className={s.version}>
                            version 1.0
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(LoginPage)