import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardTravelPackages from '../components/CardTravelPackages';
import { listarTravelPackages } from '../services/api';
import '../assets/Cars.css';
import { TravelPackage } from '../types/TravelPackages';
import { listarImagens } from '../services/uploadToS3';
import Loading from '../components/Loading';

const TravelPackages: React.FC = () => {
    const user = useUser();
    const [travelPackages, setTravelPackages] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        const fetchTravelPackages = async () => {
            try {
                const travelPackages: TravelPackage[] = await listarTravelPackages();

                const ofertas = await Promise.all(travelPackages.map(async (travelPackage: TravelPackage) => {
                    const imagens = await listarImagens(travelPackage.pasta_imagem);
                    return {
                        nomePacote: travelPackage.nomePacote,
                        destino: travelPackage.destino,
                        imagens,
                        descricao: travelPackage.descricao,
                        dias: travelPackage.dias,
                        preco: travelPackage.preco,
                        inclui: travelPackage.inclui,
                        dataSaida: travelPackage.dataSaida,
                        dataRetorno: travelPackage.dataRetorno,
                    };
                }));

                setTravelPackages(ofertas);
            } catch (error) {
                console.error('Erro ao buscar TravelPackages:', error);
            } finally {
                setCarregando(false);
            }
        };

        fetchTravelPackages();
    }, []);

    return carregando ? (
        <Loading />
    ) : (
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
