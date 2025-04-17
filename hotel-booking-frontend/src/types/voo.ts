export interface Hotel {
    id: number;
    companhia: string;
    numero_voo: string;
    origem: string;
    destino: string;
    data_partida: string;
    data_chegada: string;
    duracao: string;
    classe: string;
    preco: number;
    bagagem_incluida: boolean;
    escalas: number;
    assento_incluso: boolean;
    tipo_aviao?: string;
    pasta_imagem: string;
}