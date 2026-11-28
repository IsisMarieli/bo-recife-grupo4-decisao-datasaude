export interface VariacaoIndicador {
  indicador_id: number;
  nome: string;
  nome_curto: string | null;
  unidade: string | null;
  periodo_atual: string;
  valor_medio_atual: number;
  variacao_percentual: number;
}
