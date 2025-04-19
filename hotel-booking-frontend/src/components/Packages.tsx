import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardTravelPackages from '../components/CardTravelPackages';
import { listarTravelPackages } from '../services/api';
import '../assets/Cars.css';

const TravelPackages: React.FC = () => {
    const user = useUser();
    const [travelPackages, setTravelPackages] = useState<any[]>([]);

    useEffect(() => {
        const fetchTravelPackages = async () => {
            try {
                const data = await listarTravelPackages();
                setTravelPackages(data);
            } catch (error) {
                console.error('Erro ao buscar TravelPackages:', error);
            }
        };

        fetchTravelPackages();
    }, []);

    return (
        <div className="cars-container">
            <h1>Olá, {user.username || 'Viajante'}!</h1>
            <p className='sub'>Confira os pacotes de viagens disponíveis:</p>

            <div className="cards-container">
                {travelPackages.map((pacote, index) => (
                    <CardTravelPackages
                        key={index}
                        imagem={pacote.imagem}
                        nomePacote={pacote.nomePacote}
                        origem={pacote.origem}
                        destino={pacote.destino}
                        dataSaida={pacote.dataSaida}
                        dataRetorno={pacote.dataRetorno}
                        duracao={pacote.duracao}
                        inclui={pacote.inclui}
                        transporte={pacote.transporte}
                        preco={pacote.preco}
                    />
                ))}
            </div>
        </div>
    );
};

export default TravelPackages;
