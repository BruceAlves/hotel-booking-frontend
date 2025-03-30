// src/components/Card.tsx
import React from 'react';

interface CardProps {
    imagem: string;
    titulo: string;
    descricao: string;
    preco?: number; // Preço é opcional, já que nem todos os cards podem ter um preço
    onClick?: () => void; // Função para tratar o clique no botão
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
