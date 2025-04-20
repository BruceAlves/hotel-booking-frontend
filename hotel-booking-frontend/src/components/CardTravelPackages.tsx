import React from 'react';
import {
    CalendarDays,
    MapPin,
    Hotel,
    Tag,
} from 'lucide-react';
import '../assets/CardTravelPackages.css';

interface CardPacoteProps {
    imagem: string;
    nomePacote: string;
    origem: string;
    destino: string;
    dataSaida: string;
    dataRetorno: string;
    duracao: string;
    inclui: string;
    transporte: string;
    preco: number;
    onClick?: () => void;
}

const CardPacoteViagem: React.FC<CardPacoteProps> = ({
    imagem,
    nomePacote,
    destino,
    dataSaida,
    dataRetorno,
    inclui,
    preco,
    onClick
}) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={imagem} alt={nomePacote} className="img" />
            <div className="info">
                <h3 className="title"><MapPin size={18} className="icon" /> {nomePacote}</h3>

                <p className="row"><MapPin size={16} className="icon" /> <strong>Destino:</strong> {destino}</p>

                <p className="row"><CalendarDays size={16} className="icon" /> <strong>Saída:</strong> {dataSaida}</p>
                <p className="row"><CalendarDays size={16} className="icon" /> <strong>Retorno:</strong> {dataRetorno}</p>

                <p className="row incluso"><Hotel size={16} className="icon" /> <strong>Incluso:</strong> {inclui}</p>

                <p className="row preco"><Tag size={16} className="icon" /> R$ {preco.toFixed(2)}</p>

                <button className="Reservar">Reservar</button>
            </div>
        </div>
    );
};

export default CardPacoteViagem;
