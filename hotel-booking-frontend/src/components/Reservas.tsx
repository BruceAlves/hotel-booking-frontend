import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Smartphone } from 'lucide-react';

import '../assets/Reservas.css';

const Reservas: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const [formaPagamento, setFormaPagamento] = useState<string>('');

    const navigate = useNavigate();

    const selectedOffer = {
        categoria: queryParams.get('categoria') ?? '',
        descricao: queryParams.get('descricao') ?? '',
        preco: Number(queryParams.get('preco')) || 0,
        imagens: queryParams.get('imagens')?.split(',') || []
    };

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagemSelecionada, setImagemSelecionada] = useState(selectedOffer.imagens[0]);
    // const [formasPagamento, setFormasPagamento] = useState<string[]>([]);

    useEffect(() => {
        if (checkInDate && checkOutDate) {
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
        navigate('/pagamento', {
            state: {
                descricao: selectedOffer.descricao,
                preco: selectedOffer.preco,
                totalCost: totalCost,
                // formasPagamento: formasPagamento,
            },
        });
    };

    return (
        <div className="reservas-container">
            <h2 className="reservas-titulo">{selectedOffer.categoria}</h2>

            <div className="reserva-conteudo">
                {/* Imagens à esquerda */}
                <div className="reserva-info">
                    <img
                        src={imagemSelecionada}
                        alt={selectedOffer.categoria}
                        className="reserva-imagem-principal"
                    />
                    <div className="miniaturas-container">
                        {selectedOffer.imagens.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Imagem ${index}`}
                                className={`reserva-imagem-miniatura ${imagemSelecionada === img ? 'selecionada' : ''}`}
                                onClick={() => setImagemSelecionada(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Formulário à direita */}
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

                    <div className="formas-pagamento">
                        <div className="opcoes">
                            <label>
                                <input
                                    type="radio"
                                    name="pagamento"
                                    value="Pix"
                                    checked={formaPagamento === 'Pix'}
                                    onChange={() => setFormaPagamento('Pix')}
                                />
                                <span>
                                    <QrCode size={18} />
                                    Pix
                                </span>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="pagamento"
                                    value="Cartão"
                                    checked={formaPagamento === 'Cartão'}
                                    onChange={() => setFormaPagamento('Cartão')}
                                />
                                <span>
                                    <CreditCard size={18} />
                                    Cartão
                                </span>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="pagamento"
                                    value="App"
                                    checked={formaPagamento === 'App'}
                                    onChange={() => setFormaPagamento('App')}
                                />
                                <span>
                                    <Smartphone size={18} />
                                    App
                                </span>
                            </label>
                        </div>
                    </div>


                    <p style={{ marginTop: '20px' }}>Custo total: R$ {totalCost.toFixed(2)}</p>
                    <button onClick={handleConfirmarReserva}>Confirmar Reserva</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </div>

            {/* Descrição abaixo da seção de imagens */}
            <div className="descricao-container">
                <p>{selectedOffer.descricao}</p>
                <p>Preço por noite: R$ {selectedOffer.preco.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Reservas;
