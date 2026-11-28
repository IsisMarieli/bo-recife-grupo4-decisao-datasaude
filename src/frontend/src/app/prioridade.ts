export type NivelPrioridade = 'alta' | 'media' | 'baixa' | string;

export const CORES_PRIORIDADE: Record<string, string> = {
  alta: '#B00020',
  media: '#9A6400',
  baixa: '#1A7A38',
};

export const COR_SEM_DADOS = '#CBD5E1';

const ROTULOS_PRIORIDADE: Record<string, string> = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

export function corPrioridade(nivel: NivelPrioridade | null | undefined): string {
  return (nivel && CORES_PRIORIDADE[nivel]) || COR_SEM_DADOS;
}

export function rotuloPrioridade(nivel: NivelPrioridade | null | undefined): string {
  return (nivel && ROTULOS_PRIORIDADE[nivel]) || 'Sem dados';
}
