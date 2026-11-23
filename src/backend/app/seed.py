"""Popula o banco com dados de referência e indicadores demonstrativos.

Município, código IBGE e população são valores de referência aproximados,
a validar/atualizar quando a integração real com a API do IBGE for
implementada. A quantidade de UBS é demonstrativa/fictícia (não vem do
CNES) — não há integração real com o cadastro de estabelecimentos nesta
etapa. Os VALORES dos indicadores (séries por período) são demonstrativos,
gerados por este script, e servem para exercitar o fluxo ponta a ponta
antes da integração real com o DATASUS (pipeline com PySUS, ainda não
implementado nesta etapa inicial) — ver RF18/CA11 em docs/04-requisitos.md
e a documentação em data/README.md.

Uso: python -m app.seed
"""
import random
from datetime import date

from sqlalchemy.orm import Session

from . import models
from .database import SessionLocal, engine
from .priority import calcular_classificacoes

RNG = random.Random(42)

# nome, codigo_ibge, populacao (referência aproximada, a validar com o IBGE),
# quantidade_ubs (demonstrativa/fictícia, sem integração real com o CNES)
MUNICIPIOS = [
    ("Recife", "2611606", 1488920, 136),
    ("Olinda", "2609600", 354451, 42),
    ("Jaboatão dos Guararapes", "2607901", 644620, 58),
    ("Paulista", "2610707", 325069, 37),
    ("Caruaru", "2604106", 365278, 46),
    ("Petrolina", "2611101", 354176, 51),
    ("Garanhuns", "2606002", 140577, 22),
]

REGIAO_METROPOLITANA = "Região Metropolitana do Recife"
REGIAO_AGRESTE = "Agreste"
REGIAO_SERTAO = "Sertão"

REGIAO_POR_MUNICIPIO = {
    "Recife": REGIAO_METROPOLITANA,
    "Olinda": REGIAO_METROPOLITANA,
    "Jaboatão dos Guararapes": REGIAO_METROPOLITANA,
    "Paulista": REGIAO_METROPOLITANA,
    "Caruaru": REGIAO_AGRESTE,
    "Garanhuns": REGIAO_AGRESTE,
    "Petrolina": REGIAO_SERTAO,
}

# nome, nome_curto, categoria, fonte, unidade, minimo, maximo (faixa usada para gerar os valores demo)
INDICADORES = [
    ("Taxa de incidência de arboviroses", "Arboviroses", "epidemiologico", "SINAN", "casos por 100 mil hab.", 50, 400),
    ("Taxa de ocupação de leitos", "Ocupação de leitos", "assistencial", "SIH/SUS", "%", 40, 95),
    ("Cobertura de Atenção Básica", "Atenção Básica", "populacional", "e-SUS APS", "%", 45, 90),
]

PERIODOS = ["2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"]

PESOS_PRIORIDADE = {
    "Taxa de incidência de arboviroses": 0.6,
    "Taxa de ocupação de leitos": 0.4,
}

LIMIAR_ALERTA = {
    "Taxa de incidência de arboviroses": 250,
    "Taxa de ocupação de leitos": 85,
}


def seed(db: Session) -> None:
    if db.query(models.Municipio).first():
        print("Banco já contém dados. Nenhuma alteração feita.")
        return

    regioes = {}
    for nome_regiao in {REGIAO_METROPOLITANA, REGIAO_AGRESTE, REGIAO_SERTAO}:
        regiao = models.RegiaoSaude(nome=nome_regiao)
        db.add(regiao)
        regioes[nome_regiao] = regiao
    db.flush()

    municipios = {}
    for nome, codigo_ibge, populacao, quantidade_ubs in MUNICIPIOS:
        municipio = models.Municipio(
            nome=nome,
            codigo_ibge=codigo_ibge,
            populacao=populacao,
            quantidade_ubs=quantidade_ubs,
            regiao_saude=regioes[REGIAO_POR_MUNICIPIO[nome]],
        )
        db.add(municipio)
        municipios[nome] = municipio
    db.flush()

    fontes = {}
    for _, _, _, fonte_nome, _, _, _ in INDICADORES:
        if fonte_nome not in fontes:
            fonte = models.FonteDados(nome=fonte_nome, data_ultima_atualizacao=date(2026, 10, 31))
            db.add(fonte)
            fontes[fonte_nome] = fonte
    db.flush()

    indicadores = {}
    for nome, nome_curto, categoria, fonte_nome, unidade, minimo, maximo in INDICADORES:
        indicador = models.Indicador(
            nome=nome,
            nome_curto=nome_curto,
            categoria=categoria,
            fonte=fontes[fonte_nome],
            unidade=unidade,
        )
        db.add(indicador)
        indicadores[nome] = (indicador, minimo, maximo)
    db.flush()

    valores_ultimo_periodo: dict[int, dict[str, float]] = {}
    for municipio in municipios.values():
        valores_ultimo_periodo[municipio.id] = {}
        for nome, (indicador, minimo, maximo) in indicadores.items():
            valor_atual = RNG.uniform(minimo, maximo)
            for periodo in PERIODOS:
                variacao = RNG.uniform(-0.08, 0.08) * (maximo - minimo)
                valor_atual = max(minimo, min(maximo, valor_atual + variacao))
                db.add(models.ValorIndicador(
                    municipio=municipio,
                    indicador=indicador,
                    periodo=periodo,
                    valor=round(valor_atual, 2),
                    demonstrativo=True,
                ))
            valores_ultimo_periodo[municipio.id][nome] = round(valor_atual, 2)
    db.flush()

    classificacoes = calcular_classificacoes(valores_ultimo_periodo, PESOS_PRIORIDADE)
    for municipio_id, (nivel, pontuacao) in classificacoes.items():
        db.add(models.ClassificacaoPrioridade(
            municipio_id=municipio_id,
            periodo=PERIODOS[-1],
            nivel=nivel,
            pontuacao=pontuacao,
        ))

    for municipio in municipios.values():
        for nome, limite in LIMIAR_ALERTA.items():
            valor = valores_ultimo_periodo[municipio.id].get(nome)
            if valor is None or valor < limite:
                continue
            indicador, _, _ = indicadores[nome]
            db.add(models.Alerta(
                municipio=municipio,
                indicador=indicador,
                tipo="limiar_excedido",
                gravidade="alta" if valor >= limite * 1.1 else "media",
                valor=valor,
                data=date(2026, 10, 31),
                descricao=(
                    f"{nome} em {municipio.nome} atingiu {valor} ({indicador.unidade}), "
                    f"acima do limiar de referência ({limite})."
                ),
            ))

    db.commit()
    print(
        f"Seed concluído: {len(municipios)} municípios, {len(indicadores)} indicadores, "
        f"{len(PERIODOS)} períodos por indicador."
    )


def main() -> None:
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
