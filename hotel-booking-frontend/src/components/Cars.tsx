import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardCarro from '../components/CarCars';
import { listarCars } from '../services/api';
import '../assets/Cars.css';

const Carros: React.FC = () => {
    const user = useUser();
    const [carros, setCarros] = useState<any[]>([]);

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const data = await listarCars();
                setCarros(data);
            } catch (error) {
                console.error('Erro ao buscar carros:', error);
            }
        };

        fetchCarros();
    }, []);

    return (
        <div className="cars-container">
            <h1>Olá, {user.username || 'Usuário'}!</h1>
            <p className='sub'>Confira os carros disponíveis para aluguel:</p>

            <div className="cards-container">
                {carros.map((carro, index) => (
                    <CardCarro
                        key={index}
                        imagem={carro.imagem}
                        modelo={carro.modelo}
                        marca={carro.marca}
                        ano={carro.ano}
                        tipo={carro.tipo}
                        cor={carro.cor}
                        cambio={carro.cambio}
                        passageiros={carro.passageiros}
                        portas={carro.portas}
                        ar_condicionado={carro.ar_condicionado}
                        preco_diaria={carro.preco_diaria}
                        local_retirada={carro.local_retirada}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carros;
