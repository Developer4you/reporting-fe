import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GiasService from "../services/GiasService";
import {useQuery} from "@tanstack/react-query";
import loader from "../assets/loader.gif";

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

    useEffect(() => {
        refetch();
    }, [searchTerm, refetch]);

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
                    {data && data.map((e:any, index:number) => (
                        <React.Fragment key={index}>
                            <li>{e.contractsInfo[0]?.contractPositions[0]?.titlePosition}</li>
                            <li>{e.contractsInfo[0]?.contractPositions[0]?.unitPrice}</li>
                            <li>{e.contractsInfo[0]?.sellerInfo.name}</li>
                            <li>--------------------------------------------</li>
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PurchasesComponent;
