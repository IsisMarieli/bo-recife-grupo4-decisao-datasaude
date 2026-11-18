export interface RegiaoSaude {
  id: number;
  nome: string;
}

export interface ClassificacaoPrioridade {
  periodo: string;
  nivel: 'baixa' | 'media' | 'alta';
  pontuacao: number;
}

export interface Municipio {
  id: number;
  codigo_ibge: string;
  nome: string;
  populacao: number | null;
  regiao_saude: RegiaoSaude | null;
  prioridade: ClassificacaoPrioridade | null;
}
