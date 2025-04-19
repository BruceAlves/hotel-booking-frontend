import React from 'react';
import '../assets/Card.css';
import { Tag } from 'lucide-react';

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
            <img
                src={imagem}
                alt={titulo}
                onError={(e) => {
                    e.currentTarget.src = '/image.jpg';
                }}
            />

            <h3>{titulo}</h3>

            {categoria && <p className="categoria">{categoria}</p>}

            <p>{descricao}</p>

            <p className="estrelas" style={{ textAlign: 'left' }}>
                {Number.isFinite(estrelas) && estrelas > 0 ? (
                    [...Array(Math.floor(estrelas))].map((_, i) => (
                        <span key={i} style={{ color: '#FFD700', fontSize: '15px' }}>★</span>
                    ))
                ) : (
                    <span>Sem classificação</span>
                )}
            </p>

            {preco !== undefined && (
                <p className="row preco">
                    <Tag size={16} className="icon" /> R$ {preco.toFixed(2)}
                </p>
            )}

            <button onClick={onClick}>Reservar</button>
        </div>
    );
};

export default Card;
