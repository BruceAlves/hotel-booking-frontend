import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardVoo from '../components/CardVoo';
import { listarVoos } from '../services/api';
import '../assets/Voos.css';

const Home: React.FC = () => {
    const user = useUser();
    const [voos, setVoos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVoos = async () => {
            try {
                const data = await listarVoos();
                setVoos(data);
            } catch (error) {
                console.error('Erro ao buscar voos:', error);
            }
        };

        fetchVoos();
    }, []);

    return (
        <div className="voos-container">
            <h1>Olá, {user.username || 'Usuário'}!</h1>
            <p className='sub' >Confira os voos disponíveis:</p>

            <div className="cards-container">
                {voos.map((voo, index) => (
                    <CardVoo
                        key={index}
                        imagem={voo.imagem}
                        companhia={voo.companhia}
                        numero_voo={voo.numero_voo}
                        origem={voo.origem}
                        destino={voo.destino}
                        data_partida={voo.data_partida}
                        hora_partida={voo.hora_partida}
                        data_chegada={voo.data_chegada}
                        hora_chegada={voo.hora_chegada}
                        duracao={voo.duracao}
                        preco={voo.preco}
                        tipo_passagem={voo.tipo_passagem}
                        classe={voo.classe}
                        escalas={voo.escalas}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
