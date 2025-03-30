// src/pages/Hospedagem.tsx
import React from 'react';
import useUser from '../hooks/useUser';
import Card from '../components/Card'; // Importa o novo componente Card
import '../assets/Hospedagem.css';

const Hospedagem: React.FC = () => {
    const user = useUser();

    const ofertas = [
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200', preco: 100 },
        { categoria: 'Hospedagem', descricao: 'Hotéis e resorts com tarifas especiais!', imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200', preco: 250 },
        { categoria: 'Aluguel de Carros', descricao: 'Diárias de aluguel com preços imbatíveis!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200', preco: 50 },
        { categoria: 'Cruzeiros', descricao: 'Viagens incríveis pelos melhores destinos!', imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200', preco: 300 },
        { categoria: 'Pacotes', descricao: 'Pacotes completos para suas férias!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200', preco: 400 },
    ];

    const handleSelectOffer = (oferta: any) => {
        // Monta a URL com os dados da oferta
        const url = `/reservas?categoria=${encodeURIComponent(oferta.categoria)}&descricao=${encodeURIComponent(oferta.descricao)}&preco=${oferta.preco}&imagem=${encodeURIComponent(oferta.imagem)}`;

        // Abre a página de reservas em uma nova aba
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
                        imagem={oferta.imagem}
                        titulo={oferta.categoria}
                        descricao={oferta.descricao}
                        onClick={() => handleSelectOffer(oferta)} // Chama a função para abrir a nova aba
                    />
                ))}
            </div>
        </div>
    );
};

export default Hospedagem;
