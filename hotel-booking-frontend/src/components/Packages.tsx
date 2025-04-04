
import React, { useState, useEffect } from 'react';
import '../assets/Hospedagem.css';

const Hospedagem: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [selectedHotel, setSelectedHotel] = useState<any>(null);
    const [totalCost, setTotalCost] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const hospedagens = [
        {
            nome: 'Hotel Luxo',
            descricao: 'Um hotel de luxo com vista para o mar.',
            imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200',
            preco: 400,
        },
        {
            nome: 'Pousada Tranquila',
            descricao: 'Uma pousada aconchegante no campo.',
            imagem: 'https://media.staticontent.com/media/pictures/668204fd-7f28-4e39-a244-b3c3d4ea32ff/300x200',
            preco: 250,
        },
        {
            nome: 'Flat Moderno',
            descricao: 'Flat moderno com todas as comodidades.',
            imagem: 'https://via.placeholder.com/300x200',
            preco: 350,
        },
        {
            nome: 'Hostel Aconchegante',
            descricao: 'Hostel econômico e amigável.',
            imagem: 'https://via.placeholder.com/300x200',
            preco: 100,
        },
        {
            nome: 'Resort Tropical',
            descricao: 'Resort com piscina e atividades para a família.',
            imagem: 'https://via.placeholder.com/300x200',
            preco: 600,
        }
    ];

    const handleCloseModal = () => {
        setModalOpen(false);
        setCheckInDate('');
        setCheckOutDate('');
        setTotalCost(0);
        setSelectedHotel(null);
        setErrorMessage('');
    };


    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)); // Calcular noites

            if (nights > 0) {
                const cost = nights * selectedHotel?.preco;
                setTotalCost(cost);
                setErrorMessage('');
            } else {
                setTotalCost(0);
            }
        } else {
            setTotalCost(0);
        }
    }, [checkInDate, checkOutDate, selectedHotel]);

    const handleSelectHotel = (hospedagem: any) => {
        setSelectedHotel(hospedagem);
        setModalOpen(true);
        setTotalCost(hospedagem.preco);
    };

    return (
        <div className="hospedagem-container">
            <h2>Ofertas de Hospedagem</h2>
            <div className="hospedagem-cards-container">
                {hospedagens.map((hospedagem, index) => (
                    <div key={index} className="hospedagem-card">
                        <img src={hospedagem.imagem} alt={hospedagem.nome} />
                        <h3>{hospedagem.nome}</h3>
                        <p>{hospedagem.descricao}</p>
                        <p>R$ {hospedagem.preco},00 por noite</p>
                        <button onClick={() => handleSelectHotel(hospedagem)}>
                            Selecionar Datas
                        </button>
                    </div>
                ))}
            </div>


            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedHotel?.nome}</h2>
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
                        {errorMessage && (
                            <p style={{ color: 'red' }}>{errorMessage}</p>
                        )}
                        <p style={{ marginTop: '20px' }}>Custo total: R$ {totalCost},00</p>
                        <button onClick={handleCloseModal}>Confirmar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hospedagem;
