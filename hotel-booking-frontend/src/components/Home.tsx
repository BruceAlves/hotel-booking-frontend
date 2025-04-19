import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { listarImagens } from '../services/uploadToS3';
import '../assets/Home.css';
import { listarTravelPackagesOffer } from '../services/api';
import {
    Plane,
    MapPin,
    Clock,
    Armchair,
} from 'lucide-react';


const Home: React.FC = () => {
    const user = useUser();
    const [destinos, setDestinos] = useState<{ nome: string; imagem: string }[]>([]);
    const [ofertas, setOfertas] = useState<any[]>([]);
    const [textoVisivel, setTextoVisivel] = useState<number | null>(null); // controla o card que mostra o texto
    // Ordena as ofertas pelo menor preço e pega só as 3 primeiras
    const ofertasMenorPreco = [...ofertas]
        .filter(o => o.preco !== undefined && !isNaN(o.preco)) // garante que o preço existe e é número
        .sort((a, b) => a.preco - b.preco)
        .slice(0, 3);

    useEffect(() => {
        async function carregarImagens() {
            let imagensDestinos = await listarImagens('destinos/');
            let imagensOfertas = await listarImagens('hospedagens/');

            imagensDestinos = imagensDestinos.filter(img => img.match(/\.(jpeg|jpg|png|webp)$/i));
            imagensOfertas = imagensOfertas.filter(img => img.match(/\.(jpeg|jpg|png|webp|avif)$/i));

            const destinosData = [
                { nome: 'New York', imagem: imagensDestinos.find(img => img.toLowerCase().includes('new_york')) || '/img/default.jpg' },
                { nome: 'Las Vegas', imagem: imagensDestinos.find(img => img.toLowerCase().includes('lasvegas')) || '/img/default.jpg' },
                { nome: 'Tóquio', imagem: imagensDestinos.find(img => img.toLowerCase().includes('toquio')) || '/img/default.jpg' },
                { nome: 'Paris', imagem: imagensDestinos.find(img => img.toLowerCase().includes('paris')) || '/img/default.jpg' },
                { nome: 'Londres', imagem: imagensDestinos.find(img => img.toLowerCase().includes('londres')) || '/img/default.jpg' }
            ];

            try {
                const data = await listarTravelPackagesOffer();
                setOfertas(data);
            } catch (error) {
                console.error("Erro ao buscar ofertas da API:", error);
            }
            setDestinos(destinosData);
        }

        carregarImagens();
    }, []);

    const toggleTexto = (index: number) => {
        setTextoVisivel(textoVisivel === index ? null : index);
    };

    return (
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
                <h2>Ofertas imperdíveis !</h2><br></br>
                <h2 className='sub-Voos' ><Plane size={20} className="icon" /> Voos</h2>
                <div className="cards-container">
                    {ofertasMenorPreco.map((voo, index) => (
                        <div key={index} className="card">
                            <img src={voo.imagem} alt={voo.companhia} />
                            <h3><Plane size={16} className="icon" /> {voo.companhia}</h3>
                            <p><MapPin size={16} className="icon" /> <strong>Origem:</strong> {voo.origem}</p>
                            <p><MapPin size={16} className="icon" /> <strong>Destino:</strong> {voo.destino}</p>
                            <p><Clock size={16} className="icon" /> <strong>Partida:</strong> {voo.data_partida} às {voo.hora_partida}</p>
                            <p><Clock size={16} className="icon" /> <strong>Chegada:</strong> {voo.data_chegada} às {voo.hora_chegada}</p>
                            <p><Armchair size={16} className="icon" /> <strong>Classe:</strong> {voo.classe}</p>

                            <button className="btn-ver-detalhes" onClick={() => toggleTexto(index)}>
                                Ver detalhes
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Home;
