import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "./ReportsPage.module.css";
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import * as yup from "yup";
import {IUserReport} from "../../models/IUserReport";
import {Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const signInSchema = yup.object().shape({
    diesel: yup.number().required("Это поле обязательно к заполнению"),
    dieselInTank: yup.number().required("Это поле обязательно к заполнению"),
    petrol80: yup.number().required("Это поле обязательно к заполнению"),
    petrol80InTank: yup.number().required("Это поле обязательно к заполнению"),
    petrol95: yup.number().required("Это поле обязательно к заполнению"),
    petrol95InTank: yup.number().required("Это поле обязательно к заполнению"),
});

type FormData = {
    diesel: number;
    dieselInTank: number;
    petrol80: number;
    petrol80InTank: number;
    petrol95: number;
    petrol95InTank: number;
};

const ReportsPage: FC = () => {
    const [diesel, setDiesel] = useState<string>('')
    const [dieselInTank, setDieselInTank] = useState<string>('')
    const [petrol80, setPetrol80] = useState<string>('')
    const [petrol80InTank, setPetrol80InTank] = useState<string>('')
    const [petrol95, setPetrol95] = useState<string>('')
    const [petrol95InTank, setPetrol95InTank] = useState<string>('')
    const {store} = useContext(Context)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        store.sendReport(data.diesel, data.dieselInTank,
            data.petrol80, data.petrol80InTank,
            data.petrol95, data.petrol95InTank);
    };
    if (store.requestStatus==="success") {
        alert("Отчет успешно отправлен")
        store.setRequestStatus("empty")
        return <Navigate replace to="/user"/>
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.formWrapper}
            >
                <Typography className={s.handler}>Отчет по остаткам топлива</Typography>
                <span className={s.label}>Введите складские остатки дизельного топлива</span>
                <FormControl className={s.input} error={errors.diesel ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-diesel">Дизель</InputLabel>
                    <OutlinedInput id="outlined-adornment-diesel"
                                   type='number'
                                   {...register('diesel', {
                                       required: 'ошибка при вооде дизеля',
                                   })}
                                   label="diesel"
                    />
                    {errors?.diesel &&
                        <FormHelperText id="component-error-diesel">{errors.diesel?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите остатки дизельного топлива в баках</span>
                <FormControl className={s.input} error={errors.dieselInTank ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-dieselInTank">Дизель баки</InputLabel>
                    <OutlinedInput id="outlined-adornment-dieselInTank"
                                   type='number'
                                   {...register('dieselInTank', {
                                       required: 'ошибка при вводе дизеля в баках',
                                   })}
                                   label="dieselInTank"
                    />
                    {errors?.dieselInTank &&
                        <FormHelperText id="component-error-dieselInTank">{errors.dieselInTank?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите складские остатки бензина АИ-80</span>
                <FormControl className={s.input} error={errors.petrol80 ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-petrol80">АИ-80</InputLabel>
                    <OutlinedInput id="outlined-adornment-petrol80"
                                   type='number'
                                   {...register('petrol80', {
                                       required: 'ошибка при вводе бензина АИ-80',
                                   })}
                                   label="petrol80"
                    />
                    {errors?.petrol80 &&
                        <FormHelperText id="component-error-petrol80">{errors.petrol80?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите остатки бензина АИ-80 в баках</span>
                <FormControl className={s.input} error={errors.petrol80InTank ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-petrol80InTank">АИ-80 баки</InputLabel>
                    <OutlinedInput id="outlined-adornment-petrol80InTank"
                                   type='number'
                                   {...register('petrol80InTank', {
                                       required: 'ошибка при вводе бензина АИ-80 в баках',
                                   })}
                                   label="petrol80InTank"
                    />
                    {errors?.petrol80InTank &&
                        <FormHelperText id="component-error-petrol80InTank">{errors.petrol80InTank?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите складские остатки бензина АИ-95</span>
                <FormControl className={s.input} error={errors.petrol95 ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-petrol95">АИ-95</InputLabel>
                    <OutlinedInput id="outlined-adornment-petrol95"
                                   type='number'
                                   {...register('petrol95', {
                                       required: 'ошибка при вводе бензина АИ-95',
                                   })}
                                   label="petrol95"
                    />
                    {errors?.petrol95 &&
                        <FormHelperText id="component-error-petrol95">{errors.petrol95?.message}</FormHelperText>}
                </FormControl>
                <span className={s.label}>Введите остатки бензина АИ-95 в баках</span>
                <FormControl className={s.input} error={errors.petrol95InTank ? true : false} sx={{m: 1, width: '100%'}}
                             variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-petrol95InTank">АИ-95 баки</InputLabel>
                    <OutlinedInput id="outlined-adornment-petrol95InTank"
                                   type='number'
                                   {...register('petrol95InTank', {
                                       required: 'ошибка при вводе бензина АИ-95 в баках',
                                   })}
                                   label="petrol95InTank"
                    />
                    {errors?.petrol95InTank &&
                        <FormHelperText id="component-error-petrol95InTank">{errors.petrol95InTank?.message}</FormHelperText>}
                </FormControl>
                {/*<Button variant="contained" onClick={()=>store.login(email, password)}>Login</Button>*/}
                {/*<Button variant="contained" onClick={()=>store.registration(email, password)}>Registration</Button>*/}
                <Button className={s.signInButton} sx={{marginTop: '30px', width: '100%', height:'60px'}} variant="contained"
                        type="submit">Отправить отчет</Button>
                {/*<Button variant="contained" onClick={()
                +=> store.registration(email, password)}>Registration</Button>*/}
            </form>
        </>
    )
}

export default observer(ReportsPage)