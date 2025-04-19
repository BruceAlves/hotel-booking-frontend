import React from 'react';
import '../assets/Card.css';

interface CardProps {
    imagem: string;
    titulo: string;
    descricao: string;
    preco?: number;
    estrelas: number;
    categoria?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imagem, titulo, descricao, preco, estrelas, categoria, onClick }) => {
    return (
        <div className="card">
            <img src={imagem} alt={titulo} />
            <h3>{titulo}</h3>
            {categoria && <p>{categoria}</p>} {/* Se existir, exibe a categoria */}
            <p>{descricao}</p>
            {preco !== undefined && <p>R$ {preco},00 por noite</p>}

            <p className="estrelas" style={{ textAlign: 'left' }}>
                {Number.isFinite(estrelas) && estrelas > 0 ? (
                    [...Array(Math.floor(estrelas))].map((_, i) => (
                        <span key={i} style={{ color: '#FFD700', fontSize: '15px' }}>★</span>
                    ))
                ) : (
                    <span>Sem classificação</span>
                )}
            </p>

            <button onClick={onClick}>Reservar</button>
        </div>
    );
};

export default Card;
