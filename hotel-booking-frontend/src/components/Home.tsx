import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { listarImagens } from '../services/uploadToS3';
import '../assets/Home.css';

const Home: React.FC = () => {
    const user = useUser();
    const [destinos, setDestinos] = useState<{ nome: string; imagem: string }[]>([]);
    const [ofertas, setOfertas] = useState<{ categoria: string; descricao: string; imagem: string }[]>([]);

    useEffect(() => {
        async function carregarImagens() {
            console.log("🔄 Carregando imagens...");

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

            const ofertasData = imagensOfertas.map((img, index) => ({
                categoria: `Oferta ${index + 1}`,
                descricao: "Descontos imperdíveis para sua viagem!",
                imagem: img
            }));

            setDestinos(destinosData);
            setOfertas(ofertasData);
        }

        carregarImagens();
    }, []);

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

            {/* Ofertas */}
            <div className="ofertas-container">
                <h2>Ofertas imperdíveis</h2>
                <div className="cards-container">
                    {ofertas.map((oferta, index) => (
                        <div key={index} className="card">
                            <img src={oferta.imagem} alt={oferta.categoria} onError={(e) => e.currentTarget.src = "/img/default.jpg"} />
                            <h3>{oferta.categoria}</h3>
                            <p>{oferta.descricao}</p>
                            <button>Ver Ofertas</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
