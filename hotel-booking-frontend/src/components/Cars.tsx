import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import CardCarro from '../components/CarCars';
import { listarCars } from '../services/api'
import { listarImagens } from '../services/uploadToS3';;
import { Car } from '../types/Car';
import Loading from '../components/Loading';
import '../assets/Cars.css';

const Carros: React.FC = () => {
    const user = useUser();
    const [carros, setCarros] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    useEffect(() => {
        setCarregando(true);
        const fetchCarros = async () => {
            try {
                const cars: Car[] = await listarCars();
                const ofertas = await Promise.all(cars.map(async (car: Car) => {
                    const imagens = await listarImagens(car.pasta_imagem);

                    return {
                        modelo: car.modelo,
                        marca: car.marca,
                        ano: car.ano,
                        imagens,
                        tipo: car.tipo,
                        cor: car.cor,
                        cambio: car.cambio,
                        passageiros: car.passageiros,
                        portas: car.portas,
                        ar_condicionado: car.ar_condicionado,
                        preco_diaria: car.preco_diaria,
                        local_retirada: car.local_retirada,
                    };
                }));

                setCarros(ofertas);
            } catch (error) {
                console.error('Erro ao buscar carros:', error);
            }
            finally {
                setCarregando(false);
            }
        };

        fetchCarros();
    }, []);

    return carregando ? (
        <Loading />
    ) : (
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
