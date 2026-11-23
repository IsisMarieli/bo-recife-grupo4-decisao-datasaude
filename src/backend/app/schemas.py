from datetime import date
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class RegiaoSaudeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str


class ClassificacaoPrioridadeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    periodo: str
    nivel: str
    pontuacao: float


class MunicipioOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    codigo_ibge: str
    nome: str
    populacao: Optional[int] = None
    quantidade_ubs: Optional[int] = None
    regiao_saude: Optional[RegiaoSaudeOut] = None
    prioridade: Optional[ClassificacaoPrioridadeOut] = None


class FonteDadosOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    nome: str
    data_ultima_atualizacao: Optional[date] = None


class ValorIndicadorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    periodo: str
    valor: float
    demonstrativo: bool


class IndicadorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    nome_curto: Optional[str] = None
    categoria: Optional[str] = None
    unidade: Optional[str] = None
    fonte: Optional[FonteDadosOut] = None
    valores: List[ValorIndicadorOut] = []


class IndicadorResumoOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    nome: str
    nome_curto: Optional[str] = None
    unidade: Optional[str] = None


class AlertaOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    municipio_id: int
    tipo: str
    gravidade: str
    valor: Optional[float] = None
    data: date
    descricao: str
    indicador: Optional[IndicadorResumoOut] = None
