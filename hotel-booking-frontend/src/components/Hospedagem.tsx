// src/pages/Hospedagem.tsx
import React from 'react';
import useUser from '../hooks/useUser';
import Card from '../components/Card'; // Importa o novo componente Card
import '../assets/Hospedagem.css';

const Hospedagem: React.FC = () => {
    const user = useUser();

    const ofertas = [
        {
            categoria: 'Voos',
            descricao: 'Passagens aéreas com até 40% de desconto!',
            imagens: [
                'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200',
                'https://media.staticontent.com/media/pictures/extra-voos-1.jpg'
            ],
            preco: 100
        },
        {
            categoria: 'Grand Royal Palace – Luxo e Sofisticação',
            descricao: "Localizado no coração da cidade, o Grand Royal Palace é um ícone de elegância e exclusividade. Com arquitetura imponente e design refinado, o hotel combina luxo clássico com modernidade para proporcionar uma experiência inesquecível. Cada suíte é meticulosamente decorada com móveis artesanais, roupas de cama de algodão egípcio e uma vista panorâmica deslumbrante da cidade. A gastronomia é assinada por chefs renomados, oferecendo pratos sofisticados que harmonizam sabores locais e internacionais. Os hóspedes podem relaxar no spa de classe mundial, desfrutar da piscina de borda infinita ou se exercitar na academia equipada com tecnologia de ponta. O serviço de concierge 24h garante experiências personalizadas, desde reservas em restaurantes exclusivos até passeios privados. Seja para uma estadia romântica, uma viagem de negócios ou um retiro de puro relaxamento, o Grand Royal Palace redefine o conceito de hospitalidade com excelência e sofisticação incomparáveis.",
            imagens: [
                'https://cf.bstatic.com/xdata/images/hotel/max1024x768/561480508.jpg?k=e372d16a5399e21cdd0a62f5471611ec681b3914a94ca102cf60585c94d42b00&o=&hp=1',
                'https://cf.bstatic.com/xdata/images/hotel/max1024x768/561480501.jpg?k=41f71bd8918f03e2afd50dd6cd75c1def044ded082ce9cbe2663559e41e4ab6f&o=&hp=1',
                'https://cf.bstatic.com/xdata/images/hotel/max1024x768/343070331.jpg?k=bb3c6ea9c279497c4dfb5c4c6d8ec20e5e163a3ba17b33a8d9fca9d49af00972&o=&hp=1'
            ],
            preco: 250
        },
        {
            categoria: 'Aluguel de Carros',
            descricao: 'Diárias de aluguel com preços imbatíveis!',
            imagens: [
                'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200',
                'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200'
            ],
            preco: 50
        },
        {
            categoria: 'Cruzeiros',
            descricao: 'Viagens incríveis pelos melhores destinos!',
            imagens: [
                'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200',
                'https://media.staticontent.com/media/pictures/extra-cruzeiro-1.jpg'
            ],
            preco: 300
        },
        {
            categoria: 'Pacotes',
            descricao: 'Pacotes completos para suas férias!',
            imagens: [
                'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200',
                'https://media.staticontent.com/media/pictures/extra-pacote-1.jpg'
            ],
            preco: 400
        }
    ];

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
