from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import desc
from sqlalchemy.orm import Session, joinedload

from . import models, schemas
from .database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Saúde Estratégica API",
    description=(
        "API de indicadores territoriais de saúde (MVP em construção). "
        "Nesta etapa, os valores dos indicadores exibidos são demonstrativos "
        "(ver RF18 em docs/04-requisitos.md)."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _com_prioridade(municipio: models.Municipio) -> schemas.MunicipioOut:
    out = schemas.MunicipioOut.model_validate(municipio)
    if municipio.classificacoes:
        mais_recente = max(municipio.classificacoes, key=lambda c: c.periodo)
        out.prioridade = schemas.ClassificacaoPrioridadeOut.model_validate(mais_recente)
    return out


def _carregar_municipios(db: Session):
    return db.query(models.Municipio).options(
        joinedload(models.Municipio.regiao_saude),
        joinedload(models.Municipio.classificacoes),
    )


@app.get("/", tags=["status"])
def raiz():
    return {
        "projeto": "Saúde Estratégica",
        "status": "MVP em construção (AV2)",
        "aviso": "Os valores de indicadores exibidos nesta versão são demonstrativos.",
    }


@app.get("/municipios", response_model=List[schemas.MunicipioOut], tags=["municipios"])
def listar_municipios(db: Session = Depends(get_db)):
    municipios = _carregar_municipios(db).order_by(models.Municipio.nome).all()
    return [_com_prioridade(m) for m in municipios]


@app.get("/municipios/{municipio_id}", response_model=schemas.MunicipioOut, tags=["municipios"])
def obter_municipio(municipio_id: int, db: Session = Depends(get_db)):
    municipio = _carregar_municipios(db).filter(models.Municipio.id == municipio_id).first()
    if not municipio:
        raise HTTPException(status_code=404, detail="Município não encontrado.")
    return _com_prioridade(municipio)


@app.get(
    "/municipios/{municipio_id}/indicadores",
    response_model=List[schemas.IndicadorOut],
    tags=["indicadores"],
)
def listar_indicadores(
    municipio_id: int,
    periodo: Optional[str] = Query(None, description="Período no formato AAAA-MM"),
    fonte: Optional[str] = Query(None, description="Nome da fonte de dados (ex.: SINAN)"),
    db: Session = Depends(get_db),
):
    municipio = db.query(models.Municipio).filter(models.Municipio.id == municipio_id).first()
    if not municipio:
        raise HTTPException(status_code=404, detail="Município não encontrado.")

    query = db.query(models.Indicador).options(
        joinedload(models.Indicador.fonte), joinedload(models.Indicador.valores)
    )
    if fonte:
        query = query.join(models.FonteDados).filter(models.FonteDados.nome.ilike(fonte))

    resultado = []
    for indicador in query.all():
        valores = [v for v in indicador.valores if v.municipio_id == municipio_id]
        if periodo:
            valores = [v for v in valores if v.periodo == periodo]
        if not valores:
            continue
        out = schemas.IndicadorOut.model_validate(indicador)
        out.valores = [
            schemas.ValorIndicadorOut.model_validate(v)
            for v in sorted(valores, key=lambda v: v.periodo)
        ]
        resultado.append(out)
    return resultado


@app.get(
    "/municipios/{municipio_id}/tendencias",
    response_model=schemas.IndicadorOut,
    tags=["indicadores"],
)
def obter_tendencia(municipio_id: int, indicador_id: int, db: Session = Depends(get_db)):
    indicador = (
        db.query(models.Indicador)
        .options(joinedload(models.Indicador.fonte))
        .filter(models.Indicador.id == indicador_id)
        .first()
    )
    if not indicador:
        raise HTTPException(status_code=404, detail="Indicador não encontrado.")

    valores = (
        db.query(models.ValorIndicador)
        .filter(
            models.ValorIndicador.indicador_id == indicador_id,
            models.ValorIndicador.municipio_id == municipio_id,
        )
        .order_by(models.ValorIndicador.periodo)
        .all()
    )
    if not valores:
        raise HTTPException(
            status_code=404,
            detail="Não há série histórica disponível para esse indicador e município.",
        )

    out = schemas.IndicadorOut.model_validate(indicador)
    out.valores = [schemas.ValorIndicadorOut.model_validate(v) for v in valores]
    return out


@app.get("/fontes", response_model=List[schemas.FonteDadosOut], tags=["status"])
def listar_fontes(db: Session = Depends(get_db)):
    return db.query(models.FonteDados).order_by(desc(models.FonteDados.data_ultima_atualizacao)).all()


@app.get("/alertas", response_model=List[schemas.AlertaOut], tags=["alertas"])
def listar_alertas(municipio_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Alerta).options(joinedload(models.Alerta.indicador))
    if municipio_id:
        query = query.filter(models.Alerta.municipio_id == municipio_id)
    return query.order_by(desc(models.Alerta.data)).all()


@app.get("/comparar", response_model=List[schemas.MunicipioOut], tags=["municipios"])
def comparar_municipios(
    ids: str = Query(..., description="IDs separados por vírgula, ex.: 1,2,3"),
    db: Session = Depends(get_db),
):
    try:
        municipio_ids = [int(i) for i in ids.split(",") if i.strip()]
    except ValueError:
        raise HTTPException(
            status_code=400, detail="Parâmetro 'ids' inválido. Use números separados por vírgula."
        )
    municipios = _carregar_municipios(db).filter(models.Municipio.id.in_(municipio_ids)).all()
    return [_com_prioridade(m) for m in municipios]


@app.get("/regiao-padrao-demo", response_model=schemas.MunicipioOut, tags=["municipios"])
def regiao_padrao_demo(db: Session = Depends(get_db)):
    municipio = _carregar_municipios(db).filter(models.Municipio.nome == "Recife").first()
    if not municipio:
        raise HTTPException(status_code=404, detail="Região padrão de demonstração não configurada.")
    return _com_prioridade(municipio)
