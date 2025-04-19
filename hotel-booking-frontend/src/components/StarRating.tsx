import React from 'react';
import {
    Star,
    Wifi,
    Thermometer,
    Tv,
    Car,
    Home,
    Coffee,
    ShoppingCart,
    Box,
    Lock
} from 'lucide-react';

// Componente de Avaliação com Descrição
const StarRatingWithDescription: React.FC<{ stars: number }> = ({ stars }) => {
    const starIcons = [...Array(5)].map((_, index) => (
        <Star
            key={index}
            style={{
                color: index < stars ? '#FFD700' : '#d3d3d3',
                fontSize: '24px',
            }}
        />
    ));

    // Componente para o Layout das Descrições
    const DescriptionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                gap: '-10px 30px',
                marginTop: '20px',
            }}
        >
            {children}
        </div>
    );

    // Função que retorna as descrições com base na avaliação
    const description = (stars: number) => {
        switch (stars) {
            case 1:
                return (
                    <DescriptionWrapper>
                        <p className="description-item"><Wifi size={28} /> <span className="description-text">Wi-Fi gratuito</span></p>
                        <p className="description-item"><Home size={28} /> <span className="description-text">Apartamentos simples</span></p>
                        <p className="description-item"><Car size={28} /> <span className="description-text">Estacionamento</span></p>
                        <p className="description-item"><Thermometer size={28} /> <span className="description-text">Ventilador</span></p>
                    </DescriptionWrapper>
                );
            case 2:
                return (
                    <DescriptionWrapper>
                        <p className="description-item"><Wifi size={28} /> <span className="description-text">Wi-Fi gratuito</span></p>
                        <p className="description-item"><Home size={28} /> <span className="description-text">Quartos simples, mas mais confortáveis</span></p>
                        <p className="description-item"><Tv size={28} /> <span className="description-text">TV a cabo ou satélite (opcional)</span></p>
                        <p className="description-item"><Car size={28} /> <span className="description-text">Estacionamento privativo</span></p>
                        <p className="description-item"><Thermometer size={28} /> <span className="description-text">Ar-condicionado</span></p>
                    </DescriptionWrapper>
                );
            case 3:
                return (
                    <DescriptionWrapper>
                        <p className="description-item"><Wifi size={28} /> <span className="description-text">Wi-Fi gratuito</span></p>
                        <p className="description-item"><Home size={28} /> <span className="description-text">Apartamentos confortáveis</span></p>
                        <p className="description-item"><Car size={28} /> <span className="description-text">Estacionamento privativo</span></p>
                        <p className="description-item"><ShoppingCart size={28} /> <span className="description-text">Loja no local (opcional)</span></p>
                        <p className="description-item"><Coffee size={28} /> <span className="description-text">Café da manhã</span></p>
                        <p className="description-item"><Thermometer size={28} /> <span className="description-text">Ar-condicionado</span></p>
                    </DescriptionWrapper>
                );
            case 4:
                return (
                    <DescriptionWrapper>
                        <p className="description-item"><Wifi size={28} /> <span className="description-text">Wi-Fi gratuito</span></p>
                        <p className="description-item"><Home size={28} /> <span className="description-text">Apartamentos confortáveis</span></p>
                        <p className="description-item"><ShoppingCart size={28} /> <span className="description-text">Loja no local</span></p>
                        <p className="description-item"><Coffee size={28} /> <span className="description-text">Máquinas de café</span></p>
                        <p className="description-item"><Car size={28} /> <span className="description-text">Estacionamento privativo</span></p>
                        <p className="description-item"><Lock size={28} /> <span className="description-text">Cofre no quarto</span></p>
                        <p className="description-item"><Thermometer size={28} /> <span className="description-text">Ar-condicionado</span></p>
                    </DescriptionWrapper>
                );
            case 5:
                return (
                    <DescriptionWrapper>
                        <p className="description-item"><Wifi size={28} /> <span className="description-text">Wi-Fi gratuito</span></p>
                        <p className="description-item"><Home size={28} /> <span className="description-text">Apartamentos de luxo e suítes</span></p>
                        <p className="description-item"><Coffee size={28} /> <span className="description-text">Máquinas de café no quarto</span></p>
                        <p className="description-item"><Car size={28} /> <span className="description-text">Estacionamento privativo</span></p>
                        <p className="description-item"><Lock size={28} /> <span className="description-text">Cofre no quarto</span></p>
                        <p className="description-item"><Tv size={28} /> <span className="description-text">TV a cabo de última geração</span></p>
                        <p className="description-item"><ShoppingCart size={28} /> <span className="description-text">Lojas ou boutiques no local</span></p>
                        <p className="description-item"><Box size={28} /> <span className="description-text">Atendimento ao cliente 24h</span></p>
                        <p className="description-item"><Thermometer size={28} /> <span className="description-text">Ar-condicionado</span></p>
                        <p className="description-item"><Star size={28} /> <span className="description-text">Decoração de alto padrão</span></p>
                    </DescriptionWrapper>
                );
            default:
                return null;
        }
    };

    return (
        <div className="star-rating-with-description">
            <div className="stars" style={{ display: 'flex', gap: '15px' }}>
                {starIcons}
            </div>
            <div className="description" style={{ marginTop: '10px' }}>
                {description(stars)}
            </div>

            {/* Estilos CSS embutidos */}
            <style>{`
        .star-rating-with-description {
          font-family: Arial, sans-serif;
        }

        .stars {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .stars svg {
          transition: color 0.3s ease;
        }

        .description {
          margin-top: 20px;
        }

        .description-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }

        .description-item .description-text {
          margin-left: 10px;
          font-size: 14px;
        }

        .description-item svg {
          color: #2b7c2c;
        }

        .description-item:hover {
          background-color: #f5f5f5;
          border-radius: 5px;
          padding: 5px;
        }

        @media (max-width: 768px) {
          .description-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default StarRatingWithDescription;
