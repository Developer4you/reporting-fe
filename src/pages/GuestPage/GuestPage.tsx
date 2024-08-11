import React, {FC, useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Navigate} from "react-router-dom";
import loader from "../../assets/loader.gif";
import {observer} from "mobx-react-lite";
import {Box, Button, Container, Link, Paper, Typography} from "@mui/material";
import PurchasesComponent from "../../components/PurchasesComponent";
import ProductForm from "../../components/ProductForm/ProductForm";
import {ProductType} from "../../store/store";
import s from "./GuestPage.module.css"

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
    const [showForm, setShowForm] = useState<boolean>(true);

    useEffect(() => {
        store.getUnits()
        }, [])

    return (<>
            <div style={{
                padding: 0,
                minHeight: "100vh",
            }}>
                <span>
                {/*<header>*/}
                {/*    <Paper sx={{*/}
                {/*        marginBottom: 2,*/}
                {/*        textAlign: "right",*/}
                {/*        display: "flex",*/}
                {/*        justifyContent: "end"*/}
                {/*    }}>*/}
                {/*        <Button></Button>*/}
                {/*        <Typography sx={{*/}
                {/*            marginRight: 5*/}
                {/*        }}>*/}
                {/*            {store.isAuth ? `Вы зашли как гость` :*/}
                {/*                <Navigate replace to="/"/>}*/}
                {/*        </Typography>*/}
                {/*        <div>{store.user.isActivated ? '' : 'ПОДТВЕРДИТЕ АККАУНТ!!!'}</div>*/}
                {/*        <Button variant="contained" onClick={() => store.logout()}>Выйти</Button>*/}
                {/*    </Paper>*/}
                {/*</header>*/}
                </span>
                <button className={s.showFormButton}
                    onClick={()=>setShowForm((prev)=>!prev)}>
                    {showForm?'Скрыть форму добавление продукта':'Показать форму добавление продукта'}
                </button>
                <Paper sx={{
                    padding: "10px",
                    margin: "0",
                }}>
                    <div className={s.flexWrap}>
                        <div className={showForm?s.flexItem1:s.flexItem0}>
                            <ProductForm />
                            <h3>Список продуктов</h3>
                            <ol>
                                {store.productList.map((product:ProductType, index:number) => (
                                    <li key={index}>
                                        {product.productName} - {product.productInfo} - {product.count}
                                        - {product.unitName} - {product.codeOKRB}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className={s.flexItem2}>
                            <PurchasesComponent />
                        </div>
                    </div>


                    {/*<PurchasesComponent />*/}
                </Paper>
            </div>

        </>
    );
}

export default observer(GuestPage);