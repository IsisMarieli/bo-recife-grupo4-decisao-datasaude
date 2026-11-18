"""Cálculo do índice de prioridade territorial a partir dos indicadores.

Versão inicial (AV2): a pontuação é a média ponderada dos indicadores
normalizados (0-100) entre os municípios de um mesmo período. Os pesos são
fixos nesta etapa; pesos ajustáveis pelo gestor ficam para uma versão futura
(ver "Funcionalidades futuras" em docs/03-proposta-de-solucao.md).

Funções puras (sem acesso a banco), para facilitar os testes da AV2.
"""
from typing import Dict, Tuple

NIVEL_ALTA = "alta"
NIVEL_MEDIA = "media"
NIVEL_BAIXA = "baixa"


def _normalizar(valor: float, minimo: float, maximo: float) -> float:
    if maximo == minimo:
        return 50.0
    return max(0.0, min(100.0, (valor - minimo) / (maximo - minimo) * 100))


def _classificar(pontuacao: float) -> str:
    if pontuacao >= 66:
        return NIVEL_ALTA
    if pontuacao >= 33:
        return NIVEL_MEDIA
    return NIVEL_BAIXA


def calcular_classificacoes(
    valores_por_municipio: Dict[int, Dict[str, float]],
    pesos: Dict[str, float],
) -> Dict[int, Tuple[str, float]]:
    """Recebe ``{municipio_id: {nome_indicador: valor}}`` e devolve
    ``{municipio_id: (nivel, pontuacao)}``.

    Municípios sem nenhum dos indicadores ponderados disponíveis são
    omitidos do resultado, em vez de receberem uma prioridade inventada
    (ver RNF08 em docs/04-requisitos.md).
    """
    limites = {
        nome: (
            min(v[nome] for v in valores_por_municipio.values() if nome in v),
            max(v[nome] for v in valores_por_municipio.values() if nome in v),
        )
        for nome in pesos
        if any(nome in v for v in valores_por_municipio.values())
    }

    resultado: Dict[int, Tuple[str, float]] = {}
    for municipio_id, valores in valores_por_municipio.items():
        peso_total = 0.0
        soma = 0.0
        for nome, peso in pesos.items():
            if nome not in valores or nome not in limites:
                continue
            minimo, maximo = limites[nome]
            soma += _normalizar(valores[nome], minimo, maximo) * peso
            peso_total += peso
        if peso_total == 0:
            continue
        pontuacao = round(soma / peso_total, 2)
        resultado[municipio_id] = (_classificar(pontuacao), pontuacao)
    return resultado
