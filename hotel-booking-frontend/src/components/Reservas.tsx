import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Smartphone, Users, Baby, Tag } from 'lucide-react';
import '../assets/Reservas.css';
import StarRating from '../components/StarRating';

const Reservas: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const [formaPagamento, setFormaPagamento] = useState<string>('');
    const navigate = useNavigate();

    const selectedOffer = {
        categoria: queryParams.get('componente') ?? '',
        descricao: queryParams.get('descricao') ?? '',
        preco: Number(queryParams.get('preco')) || 0,
        star: Number(queryParams.get('estrelas')) || 0,
        imagens: queryParams.get('imagens')?.split(',') || []
    };

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [quantityAdults, setQuantityAdults] = useState(1);
    const [quantityChildren, setQuantityChildren] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const [checkInError, setCheckInError] = useState('');
    const [checkOutError, setCheckOutError] = useState('');
    const [quantityAdultsError, setQuantityAdultsError] = useState('');
    const [formaPagamentoError, setFormaPagamentoError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [imagemSelecionada, setImagemSelecionada] = useState(selectedOffer.imagens[0]);

    const validarCampos = () => {
        let valid = true;

        if (!checkInDate) {
            setCheckInError('Preencha a data de check-in.');
            valid = false;
        } else {
            setCheckInError('');
        }

        if (!checkOutDate) {
            setCheckOutError('Preencha a data de check-out.');
            valid = false;
        } else {
            setCheckOutError('');
        }

        if (quantityAdults < 1) {
            setQuantityAdultsError('Quantidade de adultos inválida.');
            valid = false;
        } else {
            setQuantityAdultsError('');
        }

        if (!formaPagamento) {
            setFormaPagamentoError('Selecione a forma de pagamento.');
            valid = false;
        } else {
            setFormaPagamentoError('');
        }

        return valid;
    };

    const calculateTotalCost = () => {

        if (checkInDate && checkOutDate && selectedOffer) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);

            if (!isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime()) && checkOut > checkIn) {

                const nights = Math.ceil(
                    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                );

                const categoriaLower = selectedOffer.categoria?.toLowerCase();
                const adults = quantityAdults || 0;
                const children = quantityChildren || 0;

                let custo = 0;

                if (categoriaLower === 'hospedagem') {
                    const fator = adults + children * 0.5;

                    custo = nights * selectedOffer.preco * fator;
                } else {
                    custo = nights * selectedOffer.preco;
                }

                setTotalCost(custo);
                setErrorMessage('');
            } else {
                setTotalCost(0);
                setErrorMessage('Datas inválidas.');
            }
        } else {
            setTotalCost(0);
            setErrorMessage('');
        }
    };


    useEffect(() => {
        calculateTotalCost();
    }, [checkInDate, checkOutDate, quantityAdults, quantityChildren]);

    const handleConfirmarReserva = () => {
        if (validarCampos()) {
            navigate('/pagamento', {
                state: {
                    descricao: selectedOffer.descricao,
                    preco: selectedOffer.preco,
                    totalCost: totalCost,
                },
            });
        } else {
            setErrorMessage('Preencha todos os campos obrigatórios.');
        }
    };

    return (
        <div className="reservas-container">
            <h2 className="reservas-titulo">{selectedOffer.categoria}</h2>

            <div className="reserva-conteudo">
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

                <div className="reserva-form">
                    <label>
                        Check-in:
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                        {checkInError && <p className="erro-mensagem">{checkInError}</p>}
                    </label>
                    <label>
                        Check-out:
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                        {checkOutError && <p className="erro-mensagem">{checkOutError}</p>}
                    </label>

                    <div className="quantidade-pessoas-lado-a-lado">
                        <div className="campo-quantidade">
                            <label>
                                <Users size={24} style={{ marginRight: '8px' }} />
                                Adultos:
                                <input
                                    type="number"
                                    min="1"
                                    value={quantityAdults}
                                    onChange={(e) => setQuantityAdults(Number(e.target.value))}
                                    required
                                    className="quantidade-input"
                                />
                            </label>
                            {quantityAdultsError && <p className="erro-mensagem">{quantityAdultsError}</p>}
                        </div>
                        <div className="campo-quantidade">
                            <label>
                                <Baby size={24} style={{ marginRight: '8px' }} />
                                Crianças:
                                <input
                                    type="number"
                                    min="0"
                                    value={quantityChildren}
                                    onChange={(e) => setQuantityChildren(Number(e.target.value))}
                                    className="quantidade-input"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="formas-pagamento">
                        <div className="opcoes">
                            <span
                                className={`opcao-pagamento ${formaPagamento === 'Pix' ? 'selecionado' : ''}`}
                                onClick={() => setFormaPagamento('Pix')}
                            >
                                <QrCode size={24} />
                                Pix
                            </span>

                            <span
                                className={`opcao-pagamento ${formaPagamento === 'Cartão' ? 'selecionado' : ''}`}
                                onClick={() => setFormaPagamento('Cartão')}
                            >
                                <CreditCard size={24} />
                                Cartão
                            </span>

                            <span
                                className={`opcao-pagamento ${formaPagamento === 'Pagamentos Digitais' ? 'selecionado' : ''}`}
                                onClick={() => setFormaPagamento('Pagamentos Digitais')}
                            >
                                <Smartphone size={24} />
                                Aplicativo
                            </span>
                        </div>
                        {formaPagamentoError && <p className="erro-mensagem">{formaPagamentoError}</p>}
                    </div>

                    <p style={{ marginTop: '20px' }}>Custo total: R$ {totalCost.toFixed(2)}</p>
                    <button onClick={handleConfirmarReserva}>Confirmar Reserva</button>
                    {errorMessage && <p className="erro-mensagem">{errorMessage}</p>}
                </div>
            </div>

            <div className="descricao-container">
                <StarRating stars={selectedOffer.star} />
                <p><strong><Tag size={16} className="icon" /> Preço por noite: R$</strong>{selectedOffer.preco.toFixed(2)}</p>
                <p>{selectedOffer.descricao}</p>
            </div>
        </div>
    );
};

export default Reservas;
