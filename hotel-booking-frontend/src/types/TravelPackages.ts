export interface TravelPackage {
    id: number;
    nomePacote?: string;
    destino?: string;
    pasta_imagem: string;
    descricao?: string;
    dias: number;
    preco: number;
    inclui?: string;
    dataSaida: string;
    dataRetorno: string;
    offer: boolean;
}
