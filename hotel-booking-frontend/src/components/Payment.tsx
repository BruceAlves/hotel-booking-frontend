import React, { useState } from 'react';
import '../assets/Payment.css';

const Payment: React.FC = () => {
    const [metodoPagamento, setMetodoPagamento] = useState<string>('pix');
    const [cartaoInfo, setCartaoInfo] = useState<{ numero: string; nome: string; validade: string }>({
        numero: '',
        nome: '',
        validade: ''
    });
    const [cartaoPreenchido, setCartaoPreenchido] = useState<boolean>(false);
    const [numeroCartaoValido, setNumeroCartaoValido] = useState<boolean>(true);

    const handleMetodoPagamentoChange = (metodo: string) => {
        setMetodoPagamento(metodo);
        setCartaoInfo({ numero: '', nome: '', validade: '' });
        setCartaoPreenchido(false);
    };

    const handleCartaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '')
            .replace(/(\d{4})(?=\d)/g, '$1 ')
            .trim();
        setCartaoInfo({ ...cartaoInfo, [name]: formattedValue });

        if (name === 'numero') {
            const cleanValue = formattedValue.replace(/\D/g, '');
            setNumeroCartaoValido(cleanValue.length <= 16);
        }

        setCartaoPreenchido(true);
    };

    const handleFinalizarPagamento = () => {
        console.log('Pagamento finalizado com sucesso!');
        console.log('Detalhes do pagamento:', cartaoInfo);
    };

    const getCartaoClass = () => {
        const numero = cartaoInfo.numero;

        if (numero.startsWith('4')) {
            return 'cartao-visa';
        } else if (/^5[1-5]/.test(numero)) {
            return 'cartao-mastercard';
        } else if (/^3[47]/.test(numero)) {
            return 'cartao-american-express';
        } else if (/^6(?:011|4[4-9]|5)/.test(numero)) {
            return 'cartao-discover';
        } else {
            return 'cartao-default';
        }
    };

    const getBandeiraCartao = () => {
        const numero = cartaoInfo.numero;
        if (numero.startsWith('4')) {
            return 'https://logospng.org/wp-content/uploads/visa.png';
        } else if (/^5[1-5]/.test(numero)) {
            return 'https://logospng.org/wp-content/uploads/mastercard.jpg';
        } else if (/^3[47]/.test(numero)) {
            return 'https://logospng.org/wp-content/uploads/amex.png';
        } else if (/^6(?:011|4[4-9]|5)/.test(numero)) {
            return 'https://logospng.org/wp-content/uploads/discover.png';
        } else {
            return '';
        }
    };

    return (
        <div className="payment-container">
            <h2>Escolha o Método de Pagamento</h2>
            <div>
                <button onClick={() => handleMetodoPagamentoChange('pix')}>Pix</button>
                <button onClick={() => handleMetodoPagamentoChange('cartao')}>Cartão</button>
            </div>

            {metodoPagamento === 'cartao' && (
                <div className="cartao-form">
                    <h3>Dados do Cartão</h3>
                    <input
                        type="text"
                        name="numero"
                        placeholder="Número do Cartão"
                        onChange={handleCartaoChange}
                        value={cartaoInfo.numero}
                    />
                    {!numeroCartaoValido && <p style={{ color: 'red' }}>Número do cartão deve ter no máximo 16 dígitos.</p>}
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome no Cartão"
                        onChange={handleCartaoChange}
                        value={cartaoInfo.nome}
                    />
                    <input
                        type="text"
                        name="validade"
                        placeholder="Validade (MM/AA)"
                        onChange={handleCartaoChange}
                        value={cartaoInfo.validade}
                    />
                </div>
            )}

            <button onClick={handleFinalizarPagamento} disabled={!numeroCartaoValido}>Finalizar Pagamento</button>

            {metodoPagamento === 'cartao' && cartaoPreenchido && (
                <div className={`cartao-personalizado ${getCartaoClass()}`}>
                    <div className="cartao">
                        <div className="cartao-frente">
                            <h3>Cartão de Crédito</h3>
                            {getBandeiraCartao() && (
                                <img
                                    src={getBandeiraCartao() || undefined}
                                    alt="Bandeira do Cartão"
                                    className="bandeira-cartao"
                                />
                            )}
                            <p className="numero">{cartaoInfo.numero || '•••• •••• •••• ••••'}</p>
                            <p className="nome">{cartaoInfo.nome || 'NOME DO TITULAR'}</p>
                            <p className="validade">{cartaoInfo.validade || 'MM/AA'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
