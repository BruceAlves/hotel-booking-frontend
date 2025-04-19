export interface Car {
    id: number;
    modelo?: string;
    marca?: string;
    ano: number;
    tipo?: string;
    cor?: string;
    cambio?: string;
    passageiros: number;
    portas: number;
    ar_condicionado: boolean;
    preco_diaria?: number;
    local_retirada?: string;
    pasta_imagem: string;
}
