// src/pages/Reservas.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import '../assets/Reservas.css'; // Importando os estilos

const Reservas: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search); // Para obter os parâmetros da URL
    const navigate = useNavigate(); // Hook para navegação

    // Obtém os dados da oferta da URL
    const selectedOffer = {
        categoria: queryParams.get('categoria') ?? '',
        descricao: queryParams.get('descricao') ?? '',
        preco: Number(queryParams.get('preco')) || 0,
        imagem: queryParams.get('imagem') ?? '',
    };

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Calcula o custo total quando as datas ou a quantidade mudam
    useEffect(() => {
        if (checkInDate && checkOutDate && selectedOffer) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));

            if (nights > 0) {
                const cost = nights * selectedOffer.preco * (selectedOffer.categoria === 'Hospedagem' ? quantity : 1);
                setTotalCost(cost);
                setErrorMessage('');
            } else {
                setTotalCost(0);
                setErrorMessage('As datas selecionadas são inválidas.');
            }
        } else {
            setTotalCost(0);
        }
    }, [checkInDate, checkOutDate, selectedOffer, quantity]);

    const handleConfirmarReserva = () => {
        // Redireciona para o componente Payment com as informações necessárias
        navigate('/pagamento', {
            state: {
                descricao: selectedOffer.descricao,
                preco: selectedOffer.preco,
                totalCost: totalCost,
            },
        });
    };

    return (
        <div className="reservas-container">
            <h2 className="reservas-titulo">{selectedOffer.categoria}</h2>
            <div className="reserva-content">
                <div className="reserva-info">
                    <img src={selectedOffer.imagem} alt={selectedOffer.categoria} />
                    <p>{selectedOffer.descricao}</p>
                    <p>Preço por noite: R$ {selectedOffer.preco.toFixed(2)}</p>
                </div>
                <div className="reserva-form">
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
                    {selectedOffer.categoria === 'Hospedagem' && (
                        <label>
                            Quantidade de Pessoas:
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </label>
                    )}
                    <p style={{ marginTop: '20px' }}>Custo total: R$ {totalCost.toFixed(2)}</p>
                    <button onClick={handleConfirmarReserva}>Confirmar Reserva</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Reservas;
