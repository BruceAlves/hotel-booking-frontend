import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardVoo from '../components/CardVoo';
import { listarVoos } from '../services/api';
import { listarImagens } from '../services/uploadToS3';
import { Voo } from '../types/voo';
import '../assets/Voos.css';
import Loading from '../components/Loading';

const Home: React.FC = () => {
    const user = useUser();
    const [voos, setVoos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        const fetchVoos = async () => {
            try {
                const voos: Voo[] = await listarVoos();

                const ofertas = await Promise.all(voos.map(async (voo: Voo) => {
                    const imagens = await listarImagens(voo.pasta_imagem);
                    return {
                        companhia: voo.companhia,
                        numero_voo: voo.numero_voo,
                        origem: voo.origem,
                        imagens,
                        destino: voo.destino,
                        data_partida: voo.data_partida,
                        data_chegada: voo.data_chegada,
                        duracao: voo.duracao,
                        classe: voo.classe,
                        preco: voo.preco,
                        bagagem_incluida: voo.bagagem_incluida,
                        escalas: voo.escalas,
                        assento_incluso: voo.assento_incluso,
                        tipo_aviao: voo.tipo_aviao,

                    };
                }));

                setVoos(ofertas);
            } catch (error) {
                console.error('Erro ao buscar voos:', error);
            }
            finally {
                setCarregando(false);
            }
        };

        fetchVoos();
    }, []);

    return carregando ? (
        <Loading />
    ) : (
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
