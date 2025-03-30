// src/components/Hospedagem.tsx
import React, { useState, useEffect } from 'react';
import '../assets/Hospedagem.css';

const Hospedagem: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [selectedHotel, setSelectedHotel] = useState<any>(null); // Armazenar o hotel selecionado
    const [totalCost, setTotalCost] = useState(0); // Custo total
    const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro

    const hospedagens = [
        {
            nome: 'Hotel Luxo',
            descricao: 'Um hotel de luxo com vista para o mar.',
            imagem: 'https://media.staticontent.com/media/pictures/084fd283-6047-4a40-a119-0f64381377d2/300x200',
            preco: 400, // Preço por noite
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
        setCheckInDate(''); // Limpa o campo de Check-in
        setCheckOutDate(''); // Limpa o campo de Check-out
        setTotalCost(0); // Limpa o custo total
        setSelectedHotel(null); // Limpa o hotel selecionado
        setErrorMessage(''); // Limpa a mensagem de erro
    };

    // Calcula o total sempre que as datas forem alteradas
    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)); // Calcular noites

            if (nights > 0) {
                const cost = nights * selectedHotel?.preco; // Calcular o custo total
                setTotalCost(cost); // Atualiza o custo total
                setErrorMessage(''); // Limpa a mensagem de erro
            } else {
                setTotalCost(0); // Reseta o custo se a data de check-out for anterior à data de check-in
            }
        } else {
            setTotalCost(0); // Reseta o custo se as datas não estiverem definidas
        }
    }, [checkInDate, checkOutDate, selectedHotel]); // Executa sempre que as datas ou hotel mudarem

    const handleSelectHotel = (hospedagem: any) => {
        setSelectedHotel(hospedagem); // Armazena o hotel selecionado
        setModalOpen(true); // Abre o modal
        setTotalCost(hospedagem.preco); // Define o custo total inicial como o preço de uma noite
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
                            <p style={{ color: 'red' }}>{errorMessage}</p> // Mensagem de erro se a data de check-in não for preenchida
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
