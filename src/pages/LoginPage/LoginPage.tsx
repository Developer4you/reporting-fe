import React, {FC, useContext, useState} from "react";
import s from "./LoginPage.module.css"
import LoginForm from "../../components/LoginForm";
// import topLogo from "../../assets/logo.png";

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const {store} = useContext(Context)

    return (
        <section className={s.loginPageWrapper}>
            <div className={s.backgroundWrapper}>
                <div className={s.content}>
                    <div className={s.textContainer}>
                        <p className={s.textLarge}>Авто-отчетность</p>
                        <p className={s.largeSmall}>система автоматизированной отчетности</p>
                    </div>
                    <div className={s.loginFormWrapper}>
                        {/*<img src={topLogo} alt="logo"*/}
                        {/*     className={s.topLogo}/>*/}
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

export default LoginPage