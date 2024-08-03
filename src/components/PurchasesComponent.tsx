import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GiasService from "../services/GiasService";
import {useQuery} from "@tanstack/react-query";
import loader from "../assets/loader.gif";
const UNIT: { [key: string]: string } = { 876: "единица", 796: "штука", 778: "упаковка", GX2: "пачка", 736: "рулон", 166: "киллограмм", 112: "литр" };

const PurchasesComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

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
    }, [searchTerm, refetch]);
    console.log('data:',data);
    return (
        <div>
            <h1>Purchases Component</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введите искомое слово"
            />
            {/*<button onClick={() => refetch()}>Fetch Purchases</button>*/}
            {isLoading ? (
                <div>
                    <img src={loader} alt="loader" style={{margin: "5px 5px", width:"50px"}}/>
                </div>
            ) : isError ?
                <div>
                    {searchTerm===''?<span>Введите поисковую строку</span>:<span>Извините, поиск не дал результата</span> }
                </div>
                :(
                <ul>
                    {flattenedContractsInfo.map((e:any, index:number) => {

                        const unitCode = e.contractPositions[0]?.codeUnit as string

                        return (
                            <React.Fragment key={index}>
                                {e.contractPositions.map((el:any)=>{
                                    return <>
                                        <li>{el.titlePosition}</li>
                                        <li>{UNIT[unitCode]}</li>
                                        <li>цена за единицу: {el.unitPrice} рублей</li>
                                        <li>----------------------</li>
                                    </>
                                })}
                                <li>{e.sellerInfo.name}</li>
                                <li>+++++++++++++++++++++++++++++++++++++++++++++++++++++</li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default PurchasesComponent;
