import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GiasService from "../services/GiasService";
import {useQuery} from "@tanstack/react-query";
import loader from "../assets/loader.gif";
import {Box, Checkbox} from "@mui/material";
import s from "./PurchasesComponent.module.css"
const UNIT: { [key: string]: string } = { 876: "единица", 796: "штука", 778: "упаковка", GX2: "пачка", 736: "рулон", 166: "киллограмм", 112: "литр" };

type ContractPositionType = {
    codeOKPB:string
    codeUnit:string
    countryProducts:string[]
    id:string
    idSmp?:string
    lotId: string
    positionPrice: number
    publicNumer:string
    titlePosition:string
    type:string
    unitPrice: number
    volume:number
}

const PurchasesComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(true);
    const [selectedPositions, setSelectedPositions] = useState<ContractPositionType[]>([]);
    const [limitPrice, setLimitPrice] = useState<number>(0);

    const handleChange = () => {
        setChecked((prev:boolean) => !prev);
    };

    const limitPriceCounter = (prices:number[]) => {
        if (prices.length === 0) return 0
        const total = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        return Math.floor(total * 100) / 100 ;
    }

    const selectPositionHandler = (el:ContractPositionType) => {
        if (selectedPositions.some((pos:ContractPositionType) => pos.id === el.id)) {
            const arr = selectedPositions.filter(pos => pos.id !== el.id)
            setSelectedPositions(arr)
        } else {
        setSelectedPositions((prev) => [...prev, el])
        }
    }

    const fetchData = async () => {
        const response = await GiasService.getSuppliers(searchTerm);
        return response.data.filter((e: any) => (e !== null && e.contractsInfo[0]?.contractPositions[0]?.unitPrice));
    };

    const { data, error, isError, isSuccess, isLoading, refetch } = useQuery({
        queryKey: ['suppliers', searchTerm],
        queryFn: fetchData
    });

    const flattenedContractsInfo = data?.flatMap((item: any) => item.contractsInfo)
    console.log('flattenedContractsInfo: ', flattenedContractsInfo);

    useEffect(() => {
        refetch();

    }, [searchTerm, refetch, checked]);

    useEffect(() => {
        const prices = selectedPositions.map(e=>e.unitPrice)
        setLimitPrice(limitPriceCounter(prices))
    }, [selectedPositions.length]);
    console.log('data:',data);

    return (
        <div>
            <h3>Введите предмет закупки</h3>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введите искомое слово"
                style={{minWidth:"500px", marginBottom:5}}
            />
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>Показывать все позиции договора</span>
            {/*<button onClick={() => refetch()}>Fetch Purchases</button>*/}
            {isLoading ? (
                <div style={{display:"flex"}}>
                    <img src={loader} alt="loader" style={{margin: "0px 5px", width:"25px"}}/>
                    Ищу совпадения на ГИАС
                </div>
            ) : isError ?
                <div>
                    {searchTerm===''?<span></span>:<span>Извините, поиск не дал результата</span> }
                </div>
                :(
                <ul style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    padding: "10px",
                    boxSizing: "border-box",
                    border:"1px solid lightgrey",
                }}>
                    {flattenedContractsInfo.map((e:any, index:number) => {

                        const unitCode = e.contractPositions[0]?.codeUnit as string

                        return (
                             checked ? <Box key={index}
                                 sx={{
                                     marginBottom: 2,
                                 }}>
                                {e.sellerInfo.name}
                                {e.contractPositions.map((el: any) => {
                                    return <>
                                        <li key={el.id} style={{backgroundColor:
                                                selectedPositions.some((pos:ContractPositionType) => pos.id === el.id)?"red":"unset"
                                        }} className={s.label} onClick={()=>selectPositionHandler(el)}>
                                            {el.titlePosition}
                                            {` цена за ${UNIT[unitCode]}: ${el.unitPrice} рублей, код ОКРБ ${el.codeOKPB}`}
                                        </li>
                                    </>
                                })}
                            </Box> :
                            <Box key={index}
                                 sx={{
                                     marginBottom: 2,
                                 }}>
                                {e.contractPositions.filter((el:any)=>el.titlePosition.toLowerCase()
                                    .includes(searchTerm.toLowerCase()))
                                    .map((el: ContractPositionType) => {
                                    return <>
                                        {e.sellerInfo.name}
                                        <li key={el.id} style={{backgroundColor:
                                                selectedPositions.some((pos:ContractPositionType) => pos.id === el.id)?"red":"unset"
                                        }} className={s.label} onClick={()=>selectPositionHandler(el)}>
                                            {el.titlePosition}
                                            {` цена за ${UNIT[unitCode]}: ${el.unitPrice} рублей, код ОКРБ ${el.codeOKPB}`}
                                        </li>
                                    </>
                                })}
                            </Box>
                        )
                    })}
                </ul>
            )}
            <Box>
                <h3>Выбранные позиции:</h3>
                <div className={s.tableGrid}>
                    <div className={s.headerItem}>Выбрано позиций</div>
                    <div className={s.headerItem}>Предельная цена</div>
                    <div className={s.headerItem}>Валюта</div>
                    <div className={s.tableItem}>{selectedPositions.length}</div>
                    <div className={s.tableItem}>{limitPrice}</div>
                    <div className={s.tableItem}>{'бел.рублей'}</div>
                </div>
                {/*{selectedPositions.map((e)=>*/}
                    <div>
                        {/*<div>{`Наименование: ${e.titlePosition}, цена за ${UNIT[e.codeUnit]}: ${e.unitPrice} бел.рублей`}</div>*/}
                        <div className={s.tableGrid}>
                            <div className={s.headerItem}>Наименование</div>
                            <div className={s.headerItem}>Единица измерения</div>
                            <div className={s.headerItem}>Цена за единицу</div>

                            {selectedPositions.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className={s.tableItem} onClick={()=>selectPositionHandler(item)}>{item.titlePosition}</div>
                                    <div className={s.tableItem} onClick={()=>selectPositionHandler(item)}>{UNIT[item.codeUnit]}</div>
                                    <div className={s.tableItem} onClick={()=>selectPositionHandler(item)}>{item.unitPrice}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
            </Box>
        </div>
    );
};

export default PurchasesComponent;
