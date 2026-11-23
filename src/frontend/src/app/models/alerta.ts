export interface Alerta {
  id: number;
  municipio_id: number;
  tipo: string;
  gravidade: 'baixa' | 'media' | 'alta' | string;
  data: string;
  descricao: string;
}
