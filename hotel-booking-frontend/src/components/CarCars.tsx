import React from 'react';
import {
    Car,
    MapPin,
    Tag,
    GaugeCircle,
    Settings,
    DoorOpen,
    Snowflake,
    Users
} from 'lucide-react';
import '../assets/CardCars.css';

interface CardCarroProps {
    imagem: string;
    modelo: string;
    marca: string;
    ano: number;
    tipo: string;
    cor: string;
    cambio: string;
    passageiros: number;
    portas: number;
    ar_condicionado: boolean;
    preco_diaria: number;
    local_retirada: string;
    onClick?: () => void;
}

const CardCarro: React.FC<CardCarroProps> = ({
    imagem,
    modelo,
    marca,
    ano,
    tipo,
    cor,
    cambio,
    passageiros,
    portas,
    ar_condicionado,
    preco_diaria,
    local_retirada,
    onClick
}) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={imagem} alt={`${marca} ${modelo}`} className="img" />
            <div className="info">
                <h3 className="title"><Car size={18} className="icon" /> {marca} {modelo} ({ano})</h3>

                <p className="row"><MapPin size={16} className="icon" /> <strong>Retirada:</strong> {local_retirada}</p>
                <p className="row"><GaugeCircle size={16} className="icon" /> <strong>Tipo:</strong> {tipo} • <strong>Cor:</strong> {cor}</p>
                <p className="row"><Settings size={16} className="icon" /> <strong>Câmbio:</strong> {cambio}</p>
                <p className="row"><Users size={16} className="icon" /> <strong>Passageiros:</strong> {passageiros}</p>
                <p className="row"><DoorOpen size={16} className="icon" /> <strong>Portas:</strong> {portas}</p>
                <p className="row"><Snowflake size={16} className="icon" /> <strong>Ar Condicionado:</strong> {ar_condicionado ? 'Sim' : 'Não'}</p>

                <p className="row preco"><Tag size={16} className="icon" /> R$ {preco_diaria.toFixed(2)} / dia</p>

                <button className="Reservar">Reservar</button>
            </div>
        </div>
    );
};

export default CardCarro;
