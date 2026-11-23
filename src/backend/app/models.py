"""Modelos do banco de dados, conforme as entidades descritas em
docs/05-arquitetura-e-tecnologias.md.

Usuário e UBS/Estabelecimento ficam fora desta etapa inicial: não há login
no MVP (ver docs/05) e o recorte territorial trabalhado é o município.
"""
from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class RegiaoSaude(Base):
    __tablename__ = "regioes_saude"

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False, unique=True)

    municipios = relationship("Municipio", back_populates="regiao_saude")


class Municipio(Base):
    __tablename__ = "municipios"

    id = Column(Integer, primary_key=True)
    codigo_ibge = Column(String, nullable=False, unique=True)
    nome = Column(String, nullable=False)
    populacao = Column(Integer)
    quantidade_ubs = Column(Integer)
    regiao_saude_id = Column(ForeignKey("regioes_saude.id"))

    regiao_saude = relationship("RegiaoSaude", back_populates="municipios")
    valores_indicadores = relationship("ValorIndicador", back_populates="municipio")
    alertas = relationship("Alerta", back_populates="municipio")
    classificacoes = relationship("ClassificacaoPrioridade", back_populates="municipio")


class FonteDados(Base):
    __tablename__ = "fontes_dados"

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False, unique=True)
    data_ultima_atualizacao = Column(Date)

    indicadores = relationship("Indicador", back_populates="fonte")


class Indicador(Base):
    __tablename__ = "indicadores"

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    nome_curto = Column(String)
    categoria = Column(String)
    unidade = Column(String)
    fonte_id = Column(ForeignKey("fontes_dados.id"))

    fonte = relationship("FonteDados", back_populates="indicadores")
    valores = relationship("ValorIndicador", back_populates="indicador")


class ValorIndicador(Base):
    __tablename__ = "valores_indicadores"

    id = Column(Integer, primary_key=True)
    municipio_id = Column(ForeignKey("municipios.id"), nullable=False)
    indicador_id = Column(ForeignKey("indicadores.id"), nullable=False)
    periodo = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    demonstrativo = Column(Boolean, nullable=False, default=True)

    municipio = relationship("Municipio", back_populates="valores_indicadores")
    indicador = relationship("Indicador", back_populates="valores")


class Alerta(Base):
    __tablename__ = "alertas"

    id = Column(Integer, primary_key=True)
    municipio_id = Column(ForeignKey("municipios.id"), nullable=False)
    indicador_id = Column(ForeignKey("indicadores.id"))
    tipo = Column(String, nullable=False)
    gravidade = Column(String, nullable=False)
    valor = Column(Float)
    data = Column(Date, nullable=False)
    descricao = Column(String, nullable=False)

    municipio = relationship("Municipio", back_populates="alertas")
    indicador = relationship("Indicador")


class ClassificacaoPrioridade(Base):
    __tablename__ = "classificacoes_prioridade"

    id = Column(Integer, primary_key=True)
    municipio_id = Column(ForeignKey("municipios.id"), nullable=False)
    periodo = Column(String, nullable=False)
    nivel = Column(String, nullable=False)
    pontuacao = Column(Float, nullable=False)

    municipio = relationship("Municipio", back_populates="classificacoes")
