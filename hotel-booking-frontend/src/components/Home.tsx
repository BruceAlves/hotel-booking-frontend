import React from 'react';
import useUser from '../hooks/useUser';
import '../assets/Home.css';

const Home: React.FC = () => {
    const user = useUser();

    const destinosPopulares = [
        { nome: 'New York', imagem: 'https://holtelbooking-images.s3.us-east-1.amazonaws.com/New_York_City-scaled.jpg' },
        { nome: 'Las Vegas', imagem: 'https://holtelbooking-images.s3.us-east-1.amazonaws.com/lasvegas.jpeg' },
        { nome: 'Tóquio', imagem: 'https://holtelbooking-images.s3.us-east-1.amazonaws.com/toquio.webp' },
        { nome: 'París', imagem: 'https://holtelbooking-images.s3.us-east-1.amazonaws.com/paris.jpg' },
        { nome: 'Londres', imagem: 'https://holtelbooking-images.s3.us-east-1.amazonaws.com/londres-vista.jpg' }
    ];

    const ofertas = [
        { categoria: 'Belo Horizonte para Miami', descricao: '9 de abr. - 16 de abr. · Ida e volta', imagem: 'https://q-xx.bstatic.com/xdata/images/city/526x420/977387.webp?k=ed82e6a69dc31e6f08cefc12ca1346b4104ec9ccb2cbd7c30c4d77014b3d68fe&o=' },
        { categoria: 'Hotéis', descricao: 'Hotéis e resorts com tarifas especiais!', imagem: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=' },
        { categoria: 'Volkswagen Golf', descricao: 'Rio de Janeiro/Galeao International Airport', imagem: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/golf_lrg.png' },
        { categoria: 'Hotéis Rio de Janeiro', descricao: 'Hotéis e resorts com tarifas especiais!', imagem: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=' },
        { categoria: 'Volkswagen Golf', descricao: 'Rio de Janeiro/Galeao International Airport', imagem: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/golf_lrg.png' },
        { categoria: 'Belo Horizonte para Miami', descricao: '9 de abr. - 16 de abr. · Ida e volta', imagem: 'https://q-xx.bstatic.com/xdata/images/city/526x420/977387.webp?k=ed82e6a69dc31e6f08cefc12ca1346b4104ec9ccb2cbd7c30c4d77014b3d68fe&o=' },

    ];

    return (
        <div className="home-container">
            <h1>Olá, {user.username ? user.username : 'Usuário'}!</h1>


            <div className="destinos-container">
                <h2>Destinos mais procurados</h2>
                <p>Opções mais procuradas por viajantes do Brasil</p>

                <div className="destinos-grid">
                    {/* Linha com duas imagens maiores */}
                    <div className="destinos-top">
                        {destinosPopulares.slice(0, 2).map((destino, index) => (
                            <div key={index} className="destino-card maior">
                                <img src={destino.imagem} alt={destino.nome} />
                                <div className="destino-info">{destino.nome}</div>
                            </div>
                        ))}
                    </div>

                    {/* Linha com três imagens menores */}
                    <div className="destinos-bottom">
                        {destinosPopulares.slice(2, 5).map((destino, index) => (
                            <div key={index} className="destino-card menor">
                                <img src={destino.imagem} alt={destino.nome} />
                                <div className="destino-info">{destino.nome}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seção de Ofertas */}
            <div className="ofertas-container">
                <h2>Ofertas imperdíveis</h2>
                <div className="cards-container">
                    {ofertas.map((oferta, index) => (
                        <div key={index} className="card">
                            <img src={oferta.imagem} alt={oferta.categoria} />
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
