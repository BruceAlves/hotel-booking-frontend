import React from 'react';
import useUser from '../hooks/useUser';

import '../assets/Home.css';

const Home: React.FC = () => {
    const user = useUser();

    const ofertas = [
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },
        { categoria: 'Hospedagem', descricao: 'Hotéis e resorts com tarifas especiais!', imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200' },
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Aluguel de Carros', descricao: 'Diárias de aluguel com preços imbatíveis!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Cruzeiros', descricao: 'Viagens incríveis pelos melhores destinos!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Pacotes', descricao: 'Pacotes completos para suas férias!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Seguro Viagem', descricao: 'Viaje seguro com planos acessíveis!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Passeios', descricao: 'Passeios exclusivos nos destinos mais procurados!', imagem: 'https://via.placeholder.com/300x200' },
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },

    ];

    return (
        <div>
            <div className="home-container">
                <h1>Olá, {user.username ? user.username : 'Usuário'}!</h1>
                <p>Confira as melhores ofertas para você:</p>

                <div className="cards-container">
                    {ofertas.map((oferta, index) => (
                        <div key={index} className="card">
                            <img src={oferta.imagem} alt={oferta.categoria} />
                            <h3>{oferta.categoria}</h3>
                            <p>{oferta.descricao}</p>
                            <button>Ver Ofertas</button>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Home;
