import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import GiasService from "../services/GiasService";
import {useQuery} from "@tanstack/react-query";
import loader from "../assets/loader.gif";
import {Box, Button, Checkbox} from "@mui/material";
import s from "./PurchasesComponent.module.css"
import clsx from "clsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {ReactToPrint} from "react-to-print";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ContractPositionType} from "../store/store";

const PurchasesComponent: React.FC = () => {
    const {store} = useContext(Context)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPositions, setSelectedPositions] = useState<ContractPositionType[]>([]);
    const [limitPrice, setLimitPrice] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(1);
    const [codeOKRB, setCodeOKRB] = useState<string>('');
    const componentRef = useRef(null); //для печати

    const generatePDF = () => {
        const element = document.getElementById("pdf-content");
        if (element) {
            const elementWidthPx = element.getBoundingClientRect().width;
            const elementHeightPx = element.getBoundingClientRect().height;

            // Преобразуем в миллиметры
            const dpi = 96; // стандартное разрешение экрана
            const elementWidthMm = (elementWidthPx / dpi) * 25.4;
            const elementHeightMm = (elementHeightPx / dpi) * 25.4;

            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");

                // Создаем PDF с шириной компонента
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: [elementWidthMm, elementHeightMm],
                });

                pdf.addImage(imgData, "PNG", 0, 0, elementWidthMm, elementHeightMm);
                pdf.save("download.pdf");
            });}
    };
    const handleChange = (val: boolean) => {
        store.setExactMatchMode(val);
    };

    const handleChangeItemCount = (count: number) => {
        setItemCount(count);
    };

    const getEmailsHandler = (okrb:string) => {
        store.setEmails('')
        store.getEmails(okrb)
        setCodeOKRB(okrb)
    }

    const limitPriceCounter = (prices: number[]) => {
        if (prices.length === 0) return 0
        const total = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        return Math.floor(total * itemCount * 100) / 100;
    }

    const selectPositionHandler = (el: ContractPositionType) => {
        if (selectedPositions.some((pos: ContractPositionType) => pos.id === el.id)) {
            const arr = selectedPositions.filter(pos => pos.id !== el.id)
            setSelectedPositions(arr)
        } else {
            setSelectedPositions((prev) => [...prev, el])
        }
    }

    const fetchData = async () => {
        const response = await GiasService.getSuppliers(searchTerm);
        const resp = response.data.filter((e: any) => (e !== null && e.contractsInfo[0]?.contractPositions[0]?.unitPrice)).flatMap((item: any) => item.contractsInfo);
        return resp;
    };

    const {data, error, isError, isSuccess, isLoading, refetch} = useQuery({
        queryKey: ['suppliers', searchTerm],
        queryFn: fetchData
    });

    useEffect(() => {
        refetch();
    }, [searchTerm, refetch]);

    useEffect(() => {
        store.setEmails('')
        store.getAllContractPosition(data, searchTerm)
        store.countAndSortOKRB(searchTerm, data)
    }, [data])

    useEffect(() => {
        const prices = selectedPositions.map(e => e.unitPrice)
        setLimitPrice(limitPriceCounter(prices))
    }, [selectedPositions.length, itemCount]);
    console.log('data:', data);

    return (
        <div className={s.purchasesContainer}>
            <div>Введите предмет закупки</div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Введите искомое слово"
                        style={{minWidth: "500px", marginBottom: 5}}
                    />
                    <Checkbox
                        checked={store.exactMatchMode}
                        onChange={(event, checked) => handleChange(checked)}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <span>Точные совпадения</span>
                </div>
                {/*{(data?.length) && !isLoading && <Button variant="contained"*/}
                {/*                                         onClick={() => store.countAndSortOKRB(searchTerm, data)}>Подобрать*/}
                {/*    код ОКРБ</Button>}*/}
                <Button variant="contained" onClick={generatePDF}
                sx={{height:'30px'}}>Создать PDF</Button>
                {/*<ReactToPrint*/}
                {/*    trigger={() => <Button variant="contained">Печать результата</Button>}*/}
                {/*    content={() => componentRef.current}*/}
                {/*/>*/}
            </div>
            {isLoading ? (
                <div style={{display: "flex"}}>
                    <img src={loader} alt="loader" style={{margin: "0px 5px", width: "25px"}}/>
                    Ищу совпадения на ГИАС
                </div>
            ) : isError ?
                <div>
                    {searchTerm === '' ? <span></span> : <span>Извините, поиск не дал результата</span>}
                </div>
                : (<div className={s.searchPurchasesBox}>
                        <ul className={s.contractInfo}><>
                            {store.contractsPositions.map((el: ContractPositionType) => <li key={el.id}
                                                                                            className={clsx(`${s.label} ${selectedPositions.some((pos: ContractPositionType) => pos.id === el.id) ? s.labelSelected : ''}`)}
                                                                                            onClick={() => selectPositionHandler(el)}>
                                    <div className={s.contractLabel}>
                                        {`Договор ${el.contractNum} c ${el.sellerName}`}
                                    </div>
                                    {el.titlePosition}
                                    {` цена за ${store.units[el.codeUnit]}: ${el.unitPrice} рублей, код ОКРБ ${el.codeOKPB}, страна: ${el.countryProducts[0]}`}

                                </li>
                            )
                            }
                        </>
                        </ul>

                        <Box id="pdf-content" className={s.selectedItemsBox} ref={componentRef}>
                            <div>Выбранные позиции:</div>
                            <div className={s.tableGrid}>
                                <div className={s.headerItem}>Необходимое количество единиц товара</div>
                                <div className={s.headerItem}>Выбрано позиций</div>
                                <div className={s.headerItem}>Предельная цена</div>
                                <div className={s.headerItem}>Валюта</div>
                                <div className={s.tableItem}>
                                    <input
                                        type="number"
                                        value={itemCount}
                                        onChange={(e) => handleChangeItemCount(Number(e.target.value))}
                                    />
                                </div>
                                <div className={s.tableItem}>{selectedPositions.length}</div>
                                <div className={s.tableItem}>{limitPrice}</div>
                                <div className={s.tableItem}>{'бел.рублей'}</div>
                            </div>
                            <div>
                                <div className={s.tableGrid}>
                                    <div className={s.headerItem}>Наименование</div>
                                    <div className={s.headerItem}>Поставщик</div>
                                    <div className={s.headerItem}>Единица измерения</div>
                                    <div className={s.headerItem}>Цена за единицу</div>

                                    {selectedPositions.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className={s.tableItem}
                                                 onClick={() => selectPositionHandler(item)}>{`${item.titlePosition}, страна: ${item.countryProducts[0]}`}</div>
                                            <div className={s.tableItem}
                                                 onClick={() => selectPositionHandler(item)}>
                                                <div className={s.contractLabel}>
                                                    {`Договор ${item.contractNum} c ${item.sellerName}`}
                                                </div>
                                            </div>
                                            <div className={s.tableItem}
                                                 onClick={() => selectPositionHandler(item)}>{store.units[item.codeUnit]}</div>
                                            <div className={s.tableItem}
                                                 onClick={() => selectPositionHandler(item)}>{item.unitPrice}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </Box>
                    </div>
                )}
            <div className={s.searchPurchasesBox}>
                <div className={s.contractInfo}>
                    {store.okrbCodes.map(e => <div key={e.codeOKRB} onClick={()=>getEmailsHandler(e.codeOKRB)}
                    style={{backgroundColor:(e.codeOKRB===codeOKRB)?"pink":"unset"}} className={s.okrb}>
                        <div className={s.contractLabel}>{` (встретилось ${e.count})`}</div>
                        <span>Код ОКРБ:</span>
                        <span>{`${e.codeOKRB}     `}</span>
                        <span>{e.nameOKRB}</span>
                    </div>)}
                </div>
                <div className={s.selectedItemsBox}>

                    {codeOKRB&&store.isPending?<img src={loader} alt="loader" style={{margin: "0px 5px", width: "100px"}}/>:<div dangerouslySetInnerHTML={{ __html: store.emails }} />}
                </div>
            </div>

        </div>
    );
};

export default observer(PurchasesComponent);
