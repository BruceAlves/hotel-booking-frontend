import React from 'react';
import {
    Plane,
    MapPin,
    Clock,
    Armchair,
    Tag,
    Repeat
} from 'lucide-react';
import '../assets/CardVoo.css';

interface CardVooProps {
    imagem: string;
    companhia: string;
    numero_voo: string;
    origem: string;
    destino: string;
    data_partida: string;
    hora_partida: string;
    data_chegada: string;
    hora_chegada: string;
    duracao: string;
    preco: number;
    tipo_passagem: string;
    classe: string;
    escalas: number;
    onClick?: () => void;
}

const CardVoo: React.FC<CardVooProps> = ({
    imagem,
    companhia,
    numero_voo,
    origem,
    destino,
    data_partida,
    hora_partida,
    data_chegada,
    hora_chegada,
    duracao,
    preco,
    tipo_passagem,
    classe,
    escalas,
    onClick
}) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={imagem} alt={`${companhia} ${numero_voo}`} className="img" />
            <div className="info">
                <h3 className="title"><Plane size={18} className="icon" /> {companhia}</h3>

                <p className="row"><MapPin size={16} className="icon" /> <strong>Origem:</strong> {origem}</p>
                <p className="row"><MapPin size={16} className="icon" /> <strong>Destino:</strong> {destino}</p>

                <p className="row"><Clock size={16} className="icon" /> <strong>Partida:</strong> {data_partida} às {hora_partida}</p>
                <p className="row"><Clock size={16} className="icon" /> <strong>Chegada:</strong> {data_chegada} às {hora_chegada}</p>

                <p className="row"><Clock size={16} className="icon" /> <strong>Duração:</strong> {duracao}</p>
                <p className="row"><Armchair size={16} className="icon" /> <strong>Classe:</strong> {classe} • {tipo_passagem}</p>

                <p className="row"><Repeat size={16} className="icon" /> <strong>Escalas:</strong> {escalas === 0 ? 'Direto' : `${escalas} escala(s)`}</p>

                <p className="row preco"><Tag size={16} className="icon" /> R$ {preco.toFixed(2)}</p>

                <button className="Reservar">Reservar</button>
            </div>
        </div>
    );
};

export default CardVoo;
