# Dados (`data/`)

Esta pasta reúne os **dados utilizados pelo projeto** e, principalmente, a **documentação** desses dados.

> Toda base utilizada deve ser documentada aqui, mesmo que o arquivo não esteja versionado no repositório.

---

## ⚠️ Alerta de segurança

**Não colocar no GitHub:**

- senhas;
- tokens;
- chaves de API;
- dados pessoais;
- dados sigilosos;
- arquivos excessivamente grandes.

**Arquivos grandes devem ser referenciados, e não necessariamente versionados.** Informe a origem e as instruções de download para que qualquer pessoa consiga obter os dados. O GitHub bloqueia arquivos acima de 100 MB e não é adequado para bases volumosas.

---

## Bases utilizadas

> Copie o bloco abaixo para cada base de dados utilizada pela equipe.

### Base 1 — Catálogo de municípios (referência)

- **Nome da base:** Nome, código IBGE e população aproximada de 7 municípios de Pernambuco, usados no escopo inicial do MVP.
- **Origem:** Valores de referência aproximados, digitados manualmente a partir de conhecimento geral sobre os municípios — **ainda não vêm de uma consulta real à API do IBGE**. A quantidade de Unidades Básicas de Saúde (`quantidade_ubs`) é **totalmente fictícia** (estimada por proporção à população), sem nenhuma integração com o CNES.
- **URL:** <https://cidades.ibge.gov.br/brasil/pe/recife/panorama> (API de Localidades do IBGE, a integrar em versão futura); CNES (<https://cnes.datasus.gov.br/>) para a quantidade real de UBS, ainda não integrado.
- **Responsável (órgão/instituição):** IBGE (município/população); CNES/Ministério da Saúde (UBS) — nenhuma das duas integrações está implementada ainda.
- **Data de acesso:** não se aplica (dados ainda não coletados via API)
- **Descrição:** usada para popular as tabelas `municipios` e `regioes_saude` via `src/backend/app/seed.py`.
- **Instrução de download:** não se aplica nesta etapa — ver `MUNICIPIOS` em `src/backend/app/seed.py`.
- **Licença, se conhecida:** dados públicos do IBGE/CNES.
- **Arquivo(s) nesta pasta (se versionado):** nenhum; os valores estão no código do seed, não em arquivo de dados.
- **⚠️ Pendência:** validar/substituir população e código IBGE pela consulta real à API do IBGE, e `quantidade_ubs` por uma integração real com o CNES, antes da entrega final da AV2.

### Base 2 — Malha geográfica dos municípios de PE (real)

- **Nome da base:** Geometrias (polígonos) dos 185 municípios de Pernambuco, em formato GeoJSON.
- **Origem:** API de Malhas Territoriais do IBGE — dado **real**, não demonstrativo.
- **URL:** `https://servicodados.ibge.gov.br/api/v3/malhas/estados/PE?formato=application/vnd.geo+json&intrarregiao=municipio&qualidade=minima`
- **Responsável (órgão/instituição):** IBGE.
- **Data de acesso:** 2026-11-28.
- **Descrição:** usada pelo Mapa de Necessidades (Leaflet) para desenhar os municípios; cada feature tem `properties.codarea` (código IBGE de 7 dígitos), usado para cruzar com `municipios.codigo_ibge` da nossa API. Qualidade "mínima" (menos detalhe nas bordas) foi escolhida de propósito para manter o arquivo leve (~85 KB) — adequada para um mapa temático, não para análises de precisão geográfica.
- **Instrução de download:** baixar a URL acima e salvar como `src/frontend/public/pe-municipios.geojson`.
- **Licença, se conhecida:** dados públicos do IBGE.
- **Arquivo(s) nesta pasta (se versionado):** nenhum; o arquivo fica em `src/frontend/public/pe-municipios.geojson` (servido como asset estático do frontend), não em `data/`.

### Base 3 — Indicadores de saúde (dados demonstrativos)

- **Nome da base:** Séries mensais fictícias para três indicadores: "Taxa de incidência de arboviroses" (SINAN), "Taxa de ocupação de leitos" (SIH/SUS) e "Cobertura de Atenção Básica" (e-SUS APS).
- **Origem:** **Dados gerados artificialmente** por `src/backend/app/seed.py` (gerador aleatório com semente fixa `random.Random(42)`, dentro de faixas plausíveis por indicador), e não extraídos do DATASUS.
- **URL:** não se aplica (dados sintéticos).
- **Responsável (órgão/instituição):** não se aplica.
- **Data de acesso:** não se aplica.
- **Descrição:** cada valor é gravado com a flag `demonstrativo = true` no banco e devolvido assim pela API (campo `demonstrativo` em `ValorIndicadorOut`), conforme RF18/CA11 em [04-requisitos.md](../docs/04-requisitos.md) — a identificação de dados simulados é obrigatória.
- **Instrução de download:** não se aplica — gerado ao rodar `python -m app.seed`.
- **Licença, se conhecida:** não se aplica.
- **Arquivo(s) nesta pasta (se versionado):** nenhum.
- **⚠️ Pendência:** substituir pela ingestão real das bases do DATASUS (pipeline com PySUS, planejado em [05-arquitetura-e-tecnologias.md](../docs/05-arquitetura-e-tecnologias.md)) antes da entrega final da AV2.

---

## Fontes de dados abertos que podem ajudar

- Portal de Dados Abertos do Recife: <http://dados.recife.pe.gov.br/>
- Portal Brasileiro de Dados Abertos: <https://dados.gov.br/>
- IBGE: <https://www.ibge.gov.br/>
- DATASUS: <https://datasus.saude.gov.br/informacoes-de-saude-tabnet/>
- IBGE RECIFE: <https://cidades.ibge.gov.br/brasil/pe/recife/panorama>
- Diatritos Sanitários do Recife: <https://dados.recife.pe.gov.br/dataset/distritos-sanitarios>

## Dados fictícios

Se a equipe criar dados fictícios para testes ou demonstração, **identifique-os claramente como fictícios** (por exemplo, em um arquivo `exemplo-ficticio.csv`) e descreva aqui como foram gerados.
