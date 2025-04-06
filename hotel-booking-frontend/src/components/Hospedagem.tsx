import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import Card from '../components/Card';
import '../assets/Hospedagem.css';
import { listarImagens } from '../services/uploadToS3';

const Hospedagem: React.FC = () => {
    const user = useUser();
    const [ofertas, setOfertas] = useState<any[]>([]);

    useEffect(() => {
        const destinos = [
            {
                categoria: 'Rio de Janeiro',
                prefixo: 'hospedagens/',
                descricao: 'Descubra o Emiliano Rio, um membro da Small Luxury Hotels...',
                preco: 100
            },
            {
                categoria: 'Hotel Fasano',
                prefixo: 'hospedagensSp/',
                descricao: 'Conheça o Hotel Fasano São Paulo, nos Jardins...',
                preco: 120
            }
        ];

        const carregarImagens = async () => {
            const ofertas = await Promise.all(destinos.map(async (destino) => {
                const imagens = await listarImagens(destino.prefixo);
                return {
                    categoria: destino.categoria,
                    descricao: destino.descricao,
                    imagens,
                    preco: destino.preco
                };
            }));

            setOfertas(ofertas);
        };

        carregarImagens();
    }, []);

    const handleSelectOffer = (oferta: any) => {
        const url = `/reservas?categoria=${encodeURIComponent(oferta.categoria)}&descricao=${encodeURIComponent(oferta.descricao)}&preco=${oferta.preco}&imagens=${encodeURIComponent(oferta.imagens.join(','))}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="hospedagem-container">
            <h1>Olá, {user.username ? user.username : 'Usuário'}!</h1>
            <p>Confira as melhores ofertas de hospedagem para você:</p>

            <div className="cards-container">
                {ofertas.map((oferta, index) => (
                    <Card
                        key={index}
                        imagem={oferta.imagens[0]}
                        titulo={oferta.categoria}
                        descricao={`${oferta.descricao.slice(0, 200)}...`}
                        onClick={() => handleSelectOffer(oferta)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hospedagem;
