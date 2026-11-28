export interface IndicadorResumo {
  nome: string;
  nome_curto: string | null;
  unidade: string | null;
  fonte: { nome: string; data_ultima_atualizacao: string | null } | null;
}

export interface Alerta {
  id: number;
  municipio_id: number;
  tipo: string;
  gravidade: 'baixa' | 'media' | 'alta' | string;
  valor: number | null;
  data: string;
  descricao: string;
  indicador: IndicadorResumo | null;
}
