export interface FonteDados {
  nome: string;
  data_ultima_atualizacao: string | null;
}

export interface ValorIndicador {
  periodo: string;
  valor: number;
  demonstrativo: boolean;
}

export interface Indicador {
  id: number;
  nome: string;
  categoria: string | null;
  unidade: string | null;
  fonte: FonteDados | null;
  valores: ValorIndicador[];
}
