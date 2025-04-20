import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { listarImagens } from '../services/uploadToS3';
import '../assets/Home.css';
import { listarTravelPackagesOffer, listarAccomodationOffer, listarCarsOffer, listarFlightOffer } from '../services/api';
import { Hotel } from '../types/hotel';
import { Voo } from '../types/voo';
import { Car } from '../types/Car';
import CardCarro from '../components/CarCars';
import Card from '../components/Card';
import CardVoo from '../components/CardVoo';
import CardTravelPackages from '../components/CardTravelPackages';
import { TravelPackage } from '../types/TravelPackages';

import {
    BedDouble, TicketsPlane, CarFront, PackageOpen
} from 'lucide-react';
import Loading from '../components/Loading';


const Home: React.FC = () => {
    const user = useUser();
    const [destinos, setDestinos] = useState<{ nome: string; imagem: string }[]>([]);
    const [ofertasHospedagens, setOfertasHospedagens] = useState<any[]>([]);
    const [voos, setVoosOferta] = useState<any[]>([]);
    const [cars, setCarsOferta] = useState<any[]>([]);
    const [travelPackages, setTravelPackagesOferta] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    const ofertasMenorPreco = [...voos]
        .filter(o => o.preco !== undefined && !isNaN(o.preco))
        .sort((a, b) => a.preco - b.preco)
        .slice(0, 3);

    const ofertasMenorPrecoHospedagem = [...ofertasHospedagens]
        .filter(o => o.preco !== undefined && !isNaN(o.preco))
        .sort((a, b) => a.preco - b.preco)
        .slice(0, 3);

    const ofertasMenorPrecoCars = [...cars]
        .filter(o => o.preco_diaria !== undefined && !isNaN(o.preco_diaria))
        .sort((a, b) => a.preco_diaria - b.preco_diaria)
        .slice(0, 3);


    const ofertasMenorPrecoTravelPackages = [...travelPackages]
        .filter(o => o.preco !== undefined && !isNaN(o.preco))
        .sort((a, b) => a.preco - b.preco)
        .slice(0, 3);


    useEffect(() => {
        setCarregando(true);
        async function carregarImagens() {
            let imagensDestinos = await listarImagens('destinos/');
            imagensDestinos = imagensDestinos.filter(img => img.match(/\.(jpeg|jpg|png|webp)$/i));
            const destinosData = [
                { nome: 'New York', imagem: imagensDestinos.find(img => img.toLowerCase().includes('new_york')) || '/img/default.jpg' },
                { nome: 'Las Vegas', imagem: imagensDestinos.find(img => img.toLowerCase().includes('lasvegas')) || '/img/default.jpg' },
                { nome: 'Tóquio', imagem: imagensDestinos.find(img => img.toLowerCase().includes('toquio')) || '/img/default.jpg' },
                { nome: 'Paris', imagem: imagensDestinos.find(img => img.toLowerCase().includes('paris')) || '/img/default.jpg' },
                { nome: 'Londres', imagem: imagensDestinos.find(img => img.toLowerCase().includes('londres')) || '/img/default.jpg' }
            ];

            try {
                const hoteis: Hotel[] = await listarAccomodationOffer();
                const voos: Voo[] = await listarFlightOffer();
                const cars: Car[] = await listarCarsOffer();
                const travelPackages: TravelPackage[] = await listarTravelPackagesOffer();

                const ofertas = await Promise.all(hoteis.map(async (hotel: Hotel) => {
                    const imagens = await listarImagens(hotel.pasta_imagem);
                    return {
                        name: hotel.nome,
                        categoria: hotel.categoria,
                        descricao: hotel.descricao,
                        imagens,
                        preco: hotel.preco,
                        star: hotel.star || 0,
                    };
                }));

                const ofertasVoos = await Promise.all(voos.map(async (voo: Voo) => {
                    const imagens = await listarImagens(voo.pasta_imagem);
                    return {
                        companhia: voo.companhia,
                        numero_voo: voo.numero_voo,
                        origem: voo.origem,
                        imagens,
                        destino: voo.destino,
                        data_partida: voo.data_partida,
                        data_chegada: voo.data_chegada,
                        duracao: voo.duracao,
                        classe: voo.classe,
                        preco: voo.preco,
                        bagagem_incluida: voo.bagagem_incluida,
                        escalas: voo.escalas,
                        assento_incluso: voo.assento_incluso,
                        tipo_aviao: voo.tipo_aviao,

                    };
                }));

                const ofertasCars = await Promise.all(cars.map(async (car: Car) => {
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

                const TravelPackages = await Promise.all(travelPackages.map(async (travelPackage: TravelPackage) => {
                    const imagens = await listarImagens(travelPackage.pasta_imagem);
                    return {
                        nomePacote: travelPackage.nomePacote,
                        destino: travelPackage.destino,
                        imagens,
                        descricao: travelPackage.descricao,
                        dias: travelPackage.dias,
                        preco: travelPackage.preco,
                        inclui: travelPackage.inclui,
                        dataSaida: travelPackage.dataSaida,
                        dataRetorno: travelPackage.dataRetorno,
                    };
                }));

                setOfertasHospedagens(ofertas);
                setVoosOferta(ofertasVoos);
                setCarsOferta(ofertasCars);
                setTravelPackagesOferta(TravelPackages);
            } catch (error) {
                console.error("Erro ao buscar ofertas da API:", error);
            } finally {
                setCarregando(false);
            }
            setDestinos(destinosData);
        }

        carregarImagens();
    }, []);

    return carregando ? (
        <Loading />
    ) : (
        <div className="home-container">
            {!user.username ? (
                <h2>Bem-vindo! Faça login para acessar suas informações.</h2>
            ) : (
                <h2>Olá, {user.username ? user.username : 'Usuário'}!</h2>
            )}

            <div className="destinos-container">
                <h2>Destinos mais procurados</h2>
                <div className="destinos-grid">
                    <div className="destinos-top">
                        {destinos.slice(0, 2).map((destino, index) => (
                            <div key={index} className="destino-card maior">
                                <img src={destino.imagem} alt={destino.nome} onError={(e) => e.currentTarget.src = "/img/default.jpg"} />
                                <div className="destino-info">{destino.nome}</div>
                            </div>
                        ))}
                    </div>

                    <div className="destinos-bottom">
                        {destinos.slice(2, 5).map((destino, index) => (
                            <div key={index} className="destino-card menor">
                                <img src={destino.imagem} alt={destino.nome} onError={(e) => e.currentTarget.src = "/img/default.jpg"} />
                                <div className="destino-info">{destino.nome}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ofertas-container">
                <h2>Ofertas imperdíveis !</h2><br />
                <h2 className='subs'><TicketsPlane size={20} className="icon" /> Voos</h2>
                <div className="cards-container">
                    {ofertasMenorPreco.map((voo, index) => (
                        <CardVoo
                            key={index}
                            imagem={voo.imagem}
                            companhia={voo.companhia}
                            numero_voo={voo.numero_voo}
                            origem={voo.origem}
                            destino={voo.destino}
                            data_partida={voo.data_partida}
                            hora_partida={voo.hora_partida}
                            data_chegada={voo.data_chegada}
                            hora_chegada={voo.hora_chegada}
                            duracao={voo.duracao}
                            preco={voo.preco}
                            tipo_passagem={voo.tipo_passagem}
                            classe={voo.classe}
                            escalas={voo.escalas}
                        />
                    ))}
                </div>

                <h2 className='subs'><BedDouble size={20} className="icon" /> Hospedagens</h2>
                <div className="cards-container">
                    {ofertasMenorPrecoHospedagem.map((hospedagem, index) => (
                        <Card
                            key={index}
                            imagem={hospedagem.imagens[0]}
                            titulo={hospedagem.name}
                            preco={hospedagem.preco}
                            estrelas={hospedagem.star}
                            descricao={`${hospedagem.descricao.slice(0, 200)}...`}

                        />
                    ))}

                </div>

                <h2 className='subs'><CarFront size={20} className="icon" /> Alguel de carros</h2>
                <div className="cards-container">
                    {ofertasMenorPrecoCars.map((car, index) => (
                        <CardCarro
                            key={index}
                            imagem={car.imagem}
                            modelo={car.modelo}
                            marca={car.marca}
                            ano={car.ano}
                            tipo={car.tipo}
                            cor={car.cor}
                            cambio={car.cambio}
                            passageiros={car.passageiros}
                            portas={car.portas}
                            ar_condicionado={car.ar_condicionado}
                            preco_diaria={car.preco_diaria}
                            local_retirada={car.local_retirada}
                        />
                    ))}

                </div>

                <h2 className='subs'><PackageOpen size={20} className="icon" /> Pacotes de viagens</h2>
                <div className="cards-container">
                    {ofertasMenorPrecoTravelPackages.map((travelPackages, index) => (
                        <CardTravelPackages
                            key={index}
                            imagem={travelPackages.imagem}
                            nomePacote={travelPackages.nomePacote}
                            origem={travelPackages.origem}
                            destino={travelPackages.destino}
                            dataSaida={travelPackages.dataSaida}
                            dataRetorno={travelPackages.dataRetorno}
                            duracao={travelPackages.duracao}
                            inclui={travelPackages.inclui}
                            transporte={travelPackages.transporte}
                            preco={travelPackages.preco}
                        />
                    ))}

                </div>
            </div>
        </div>
    );

};

export default Home;
