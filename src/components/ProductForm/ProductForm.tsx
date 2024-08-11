import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {ProductType} from "../../store/store";
import shortid from 'shortid';
import {Context} from "../../index";
import s from "./ProductForm.module.css"
import {Button} from "@mui/material";

const ProductForm: React.FC = observer(() => {
    const {store} = useContext(Context)
    // Локальные состояния для управления вводом пользователя
    const [productName, setProductName] = useState("");
    const [productInfo, setProductInfo] = useState("");
    const [nameOKRB, setNameOKRB] = useState("");
    const [codeOKRB, setCodeOKRB] = useState("");
    const [count, setCount] = useState("");
    const [unitName, setUnitName] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Обработчик добавления продукта
    const handleAddProduct = () => {
        const normalizedValue = count.replace(',', '.');
        if (isNaN(parseFloat(normalizedValue))) {
            alert('Пожалуйста, введите правильное количество товаров!')
        } else {
            if (productName && unitName) {
                const id = shortid.generate();
                const newProduct = {
                    productId: id,
                    productName,
                    count: parseFloat(normalizedValue),
                    unitName,
                    productInfo,
                    nameOKRB,
                    codeOKRB,
                };
                store.setProductList([...store.productList, newProduct]); // Добавляем продукт в список
                setProductName(""); // Очищаем поля после добавления
                setProductInfo("");
                setCount("");
                setUnitName("");
                setNameOKRB("");
                setCodeOKRB("");
            } else {
                alert("Пожалуйста, заполните все поля."); // Простая валидация
            }
        }
    };

    return (
        <div className={s.formWrapper}>
            <h4>Добавить новый продукт</h4>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                }}
            >
                <div className={s.inputBox}>
                    <label>Наименование продукта:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className={s.inputBox}>
                    <label>Количество:</label>
                    <input
                        type="text"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        placeholder="Введите количество"
                        required
                    />
                </div>
                <div className={s.inputBox}>
                    <label>Единицы измерения:</label>
                    <input
                        type="string"
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        required
                    />
                </div>
                <div className={s.inputBox}>
                    <label>Информация о продукте:</label>
                    <textarea
                        value={productInfo}
                        onChange={(e) => setProductInfo(e.target.value)}

                    />
                </div>
                <div className={s.inputBox}>
                    <label>Код ОКРБ:</label>
                    <input
                        type="text"
                        value={codeOKRB}
                        onChange={(e) => setCodeOKRB(e.target.value)}
                    />
                </div>
                <Button variant="contained" type="submit">Добавить продукт</Button>
            </form>
        </div>
    );
});

export default ProductForm;