// src/pages/Home.tsx
import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import Card from '../components/Card';
import '../assets/Voos.css';

const Home: React.FC = () => {
    const user = useUser();

    const [modalOpen, setModalOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [selectedOffer, setSelectedOffer] = useState<any>(null);

    const ofertas = [
        { categoria: 'Voos', descricao: 'Passagens aéreas com até 40% de desconto!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },
        { categoria: 'Hospedagem', descricao: 'Hotéis e resorts com tarifas especiais!', imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200' },
        { categoria: 'Aluguel de Carros', descricao: 'Diárias de aluguel com preços imbatíveis!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },
        { categoria: 'Cruzeiros', descricao: 'Viagens incríveis pelos melhores destinos!', imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200' },
        { categoria: 'Pacotes', descricao: 'Pacotes completos para suas férias!', imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200' },
    ];

    const handleCloseModal = () => {
        setModalOpen(false);
        setCheckInDate('');
        setCheckOutDate('');
        setSelectedOffer(null);
    };

    const handleSelectOffer = (oferta: any) => {
        setSelectedOffer(oferta);
        setModalOpen(true);
    };

    return (
        <div className="voos-container">
            <h1>Olá, {user.username ? user.username : 'Usuário'}!</h1>
            <p>Confira as melhores ofertas de passagens aerias para você:</p>

            <div className="cards-container">
                {ofertas.map((oferta, index) => (
                    <Card
                        key={index}
                        imagem={oferta.imagem}
                        titulo={oferta.categoria}
                        descricao={oferta.descricao}
                        onClick={() => handleSelectOffer(oferta)}
                    />
                ))}
            </div>

            {modalOpen && selectedOffer && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedOffer.categoria}</h2>
                        <label>
                            Check-in:
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Check-out:
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                        </label>
                        <p style={{ marginTop: '20px' }}>Oferta: {selectedOffer.descricao}</p>
                        <button onClick={handleCloseModal}>Confirmar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
