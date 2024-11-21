import { Indicado } from "./indicado.interface";

export interface Categoria{
    nome: string,
    indicados: Indicado[],
    tipo: string
}