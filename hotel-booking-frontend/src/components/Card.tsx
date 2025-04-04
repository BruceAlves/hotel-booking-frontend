// src/components/Card.tsx
import React from 'react';

interface CardProps {
    imagem: string;
    titulo: string;
    descricao: string;
    preco?: number;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imagem, titulo, descricao, preco, onClick }) => {
    return (
        <div className="card">
            <img src={imagem} alt={titulo} />
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            {preco !== undefined && <p>R$ {preco},00 por noite</p>}
            <button onClick={onClick}>Ver Ofertas</button>
        </div>
    );
};

export default Card;
