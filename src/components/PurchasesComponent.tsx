import React, { useState } from 'react';
import axios from 'axios';

const PurchasesComponent: React.FC = () => {
    const [purchases, setPurchases] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const fetchData = async () => {
        try {
            const response = await axios.get<any[]>('https://developer4you-forgias-srv-4ed8.twc1.net', {
                params: {
                    contextTextSearch: searchTerm, // Передаем параметр поиска
                },
            }); // Используем GET запрос
            setPurchases(response.data.filter(e=>(e!==null&&e.contractsInfo[0]?.contractPositions[0]?.unitPrice)));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(purchases)
    return (
        <div>
            <h1>Purchases Component</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введите искомое слово"
            />
            <button onClick={fetchData}>Fetch Purchases</button>
            <ul>
                {purchases.map((e, index) => (
                        <>
                        <li key={index}>{e.contractsInfo[0]?.contractPositions[0]?.titlePosition}</li>
                        <li key={index}>{e.contractsInfo[0]?.contractPositions[0]?.unitPrice}</li>
                        <li key={index}>{e.contractsInfo[0]?.sellerInfo.name}</li>
                        <li>--------------------------------------------</li>
                    </>
                ))}
            </ul>
        </div>
    );
};

export default PurchasesComponent;
