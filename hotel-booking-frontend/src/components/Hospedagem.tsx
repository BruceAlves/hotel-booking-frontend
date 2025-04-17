import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import Card from '../components/Card';
import '../assets/Hospedagem.css';
import { listarImagens } from '../services/uploadToS3';
import { listarHoteis } from '../services/api';
import { Hotel } from '../types/hotel';

const Hospedagem: React.FC = () => {
    const user = useUser();
    const [ofertas, setOfertas] = useState<{ name: string, categoria: string, descricao: string, imagens: string[], preco: number }[]>([]);

    useEffect(() => {

        const carregarHoteis = async () => {
            try {
                const hoteis: Hotel[] = await listarHoteis();

                const ofertas = await Promise.all(hoteis.map(async (hotel: Hotel) => {
                    const imagens = await listarImagens(hotel.pasta_imagem);

                    return {
                        name: hotel.nome,
                        categoria: hotel.categoria,
                        descricao: hotel.descricao,
                        imagens,
                        preco: hotel.preco
                    };
                }));

                setOfertas(ofertas);
            } catch (error) {
                console.error('Erro ao carregar hotéis:', error);
            }
        };

        carregarHoteis();
    }, []);

    const handleSelectOffer = (oferta: any) => {
        const url = `/reservas?categoria=${encodeURIComponent(oferta.name)}&descricao=${encodeURIComponent(oferta.descricao)}&preco=${oferta.preco}&imagens=${encodeURIComponent(oferta.imagens.join(','))}`;
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
                        titulo={oferta.name}
                        descricao={`${oferta.descricao.slice(0, 200)}...`}
                        onClick={() => handleSelectOffer(oferta)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hospedagem;
