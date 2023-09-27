import React, {FC, useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import s from "./LoginForm.module.css";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Visibility, VisibilityOff} from "@mui/icons-material";

const signInSchema = yup.object().shape({
    userEmail: yup
        .string()
        .trim()
        .email('Пожалуйста проверьте адресс эл. почты')
        .required("Это поле обязательно к заполнению"),
    password: yup.string().trim().required("Это поле обязательно к заполнению"),
});

type FormData = {
    userEmail: string;
    password: string;
};

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(signInSchema),
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        store.login(data.userEmail, data.password);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.formWrapper}
            >
                <span className={s.label}>Введите электронную почту пользователя</span>
                <FormControl className={s.inputEmail} error={errors.userEmail ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput id="outlined-adornment-email"
                                   type='text'
                                   {...register('userEmail', {
                                       required: 'Электронная почта ввдена неверно',
                                   })}
                                   label="Email"
                    />
                    {errors?.userEmail &&
                        <FormHelperText id="component-error-text">{errors.userEmail?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите пароль</span>
                <FormControl error={errors.password ? true : false} sx={{m: 1, width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Вы ввели недопустимый пароль',
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {errors?.password &&
                        <FormHelperText id="component-error-password">{errors.password?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label} style={{marginTop:'30px'}}>Если вы не зарегистрированы обратитесь к администратору</span>
                {/*<Button variant="contained" onClick={()=>store.login(email, password)}>Login</Button>*/}
                {/*<Button variant="contained" onClick={()=>store.registration(email, password)}>Registration</Button>*/}
                <Button className={s.signInButton} sx={{marginTop: '30px', width: '100%', height:'60px'}} variant="contained"
                        type="submit">Войти</Button>
                {/*<Button variant="contained" onClick={()
                +=> store.registration(email, password)}>Registration</Button>*/}
            </form>
        </>
    )
}

export default observer(LoginForm)