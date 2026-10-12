# 06 — Arquitetura e Tecnologias

> **Objetivo deste documento:** descrever como a solução será organizada tecnicamente e justificar as tecnologias escolhidas.
>
> **Avaliação:** AV1 (atualizar na AV2)
>
> **Não existe uma stack obrigatória.** Cada grupo pode escolher as tecnologias adequadas ao seu projeto. O importante é **justificar** a escolha e garantir que a equipe consegue entregar o MVP com ela.

---

## Arquitetura

O Saúde Estratégica adota uma arquitetura em **três camadas** (cliente-servidor), com uma etapa de **ingestão de dados** executada separadamente da aplicação. Na versão atual (MVP/AV1), o acesso é **direto e público, sem login**, pois as bases do DATASUS são majoritariamente abertas.

1. **Frontend (Angular):** interface web com mapa interativo, painéis de indicadores, alertas e filtros.
2. **Backend (Python + FastAPI):** API REST que recebe as consultas do frontend, aplica as regras de negócio (cálculo de indicadores, tendências e classificação de prioridade) e devolve os dados em JSON.
3. **Banco de dados (PostgreSQL):** armazena os dados tratados e agregados por município e período.
4. **Pipeline de ingestão (Python + Pandas):** rotina que coleta os dados públicos do DATASUS e do IBGE, limpa, padroniza e grava no banco. Executa periodicamente, e não a cada acesso do usuário, o que mantém o sistema rápido e independente da disponibilidade das fontes externas.

```text
┌──────────────────────────────────────────────┐
│               FONTES PÚBLICAS                │
│ CNES · SIH/SUS · SIA/SUS · SINAN · SIM       │
│ e-SUS APS · IBGE                             │
└───────────────────────┬──────────────────────┘
                        │ coleta periódica
                        ▼
┌──────────────────────────────────────────────┐
│     PIPELINE DE INGESTÃO (Python/Pandas)     │
│   extrai → limpa → padroniza → agrega        │
└───────────────────────┬──────────────────────┘
                        │ grava
                        ▼
┌──────────────────────────────────────────────┐
│          BANCO DE DADOS (PostgreSQL)         │
└───────────────────────┬──────────────────────┘
                        │ consulta
                        ▼
┌──────────────────────────────────────────────┐
│        BACKEND / API REST (FastAPI)          │
│ indicadores · alertas · tendências ·         │
│ classificação de prioridade                  │
│ (login/perfis: versão futura)                │
└───────────────────────┬──────────────────────┘
                        │ JSON (HTTP)
                        ▼
┌──────────────────────────────────────────────┐
│               FRONTEND (Angular)             │
│ mapa interativo · painel · comparação ·      │
│ região padrão (sessão demonstrativa)         │
└──────────────────────────────────────────────┘
```

## Frontend

**PROTÓTIPO NO FIGMA:** https://www.figma.com/design/mvCQcRJgrMgIa3rI7rUfR0/PROT%C3%93TIPO---SA%C3%9ADE-ESTATEGICA?node-id=0-1&t=LMnjZTyC8bJVbxMC-1

Aplicação web desenvolvida em **Angular** (TypeScript). Principais telas e funções:

- **Mapa cartográfico interativo** dos 185 municípios de Pernambuco, com seleção de município e destaque visual por nível de prioridade.
- **Painel de indicadores** do município selecionado, atualizado ao clicar no mapa.
- **Gráficos de tendência** ao longo do tempo.
- **Alertas** de municípios que precisam de atenção.
- **Comparação** entre municípios e regiões.
- **Região padrão (demonstrativa):** no MVP, o sistema abre na visão geral de Pernambuco e simula uma sessão já autenticada, com uma região padrão pré-definida. O usuário navega por outros municípios e retorna à região padrão quando quiser. Na versão futura, essa região virá do perfil real do usuário ou da UBS.

Bibliotecas utilizadas:

- **Leaflet:** mapa interativo.
- **Chart.js:** gráficos de indicadores e tendências.
- **Angular Material:** componentes de interface.

## Backend

Desenvolvido em **Python com FastAPI**. Responsabilidades:

- Expor os endpoints de consulta de municípios, indicadores, séries históricas e alertas.
- Calcular a **classificação territorial de prioridade** a partir dos indicadores.
- Identificar **tendências** (alta, queda, estabilidade) e gerar **alertas**.
- Executar a rotina de ingestão dos dados, em módulo separado, com agendamento mensal.

**Versão atual (MVP):** sem autenticação. A região padrão é uma configuração de demonstração.
**Versão futura:** controle de acesso com login, perfis e região padrão por usuário.

O tratamento dos dados é feito com **Pandas**, e a coleta das bases do DATASUS utiliza a biblioteca **PySUS**.

## Banco de dados

**PostgreSQL**, armazenando os dados já tratados e agregados por município e por período (mês/ano). As geometrias dos municípios ficam em um arquivo **GeoJSON** do IBGE, servido pelo frontend e usado pelo mapa.

## APIs

**APIs que o sistema oferece** (REST, formato JSON):

| Endpoint | Função |
|---|---|
| `GET /municipios` | Lista os 185 municípios com sua classificação de prioridade |
| `GET /municipios/{id}` | Dados e indicadores de um município |
| `GET /municipios/{id}/indicadores` | Indicadores filtrados por período e fonte |
| `GET /municipios/{id}/tendencias` | Série histórica e tendência |
| `GET /alertas` | Alertas ativos por região ou município |
| `GET /comparar?ids=...` | Comparação entre municípios |
| `GET /regiao-padrao-demo` | Região padrão da sessão demonstrativa (MVP) |

> **Nota:** todos os endpoints do MVP são públicos. Os endpoints de login e de perfil (`POST /auth/login`, `GET /usuario/regiao-padrao`) ficam previstos para versões futuras.

**APIs e bases que o sistema consome:**

- Dados abertos do **DATASUS** (CNES, SIH/SUS, SIA/SUS, SINAN, SIM, e-SUS APS)
- **API de Localidades e Malhas do IBGE** (população e limites territoriais)

## Acesso e autenticação

**Versão atual (AV1/MVP): acesso direto, sem login.**
A plataforma abre na visão geral de Pernambuco, com:

- Mapa interativo dos municípios;
- Indicadores públicos do DATASUS;
- Dados consolidados por município;
- Informações gerais e metodologia;
- Comparações entre municípios, sem dados sensíveis.

Como as bases são públicas, o acesso direto elimina barreiras e facilita testes e consultas rápidas. O usuário aparece como uma **sessão demonstrativa já autenticada**, apenas para mostrar como será a experiência personalizada.

**Versões futuras: login para funcionalidades personalizadas e administrativas**, como:

- Definir UBS, município ou Região de Saúde padrão;
- Salvar filtros e comparações;
- Criar planos de ação;
- Registrar encaminhamentos e responsáveis;
- Configurar alertas;
- Exportar relatórios internos;
- Acessar informações restritas;
- Acompanhar decisões da equipe.

## Serviços externos

- **DATASUS:** fonte dos dados de saúde (estabelecimentos, internações, produção ambulatorial, agravos e óbitos).
- **IBGE:** população residente e malha geográfica dos municípios.
- **OpenStreetMap (tiles):** camada base do mapa, via Leaflet.
- **Figma:** prototipação da interface.
- **GitHub:** versionamento do código e organização do trabalho em equipe.

## Infraestrutura

- **Desenvolvimento:** execução local com **Docker Compose** (frontend, backend e banco), garantindo o mesmo ambiente para toda a equipe.
- **Hospedagem do frontend:** **Vercel**, com deploy automático a partir do GitHub.
- **Hospedagem do backend e do banco:** **Render**, com deploy automático a partir do GitHub.
- **Atualização dos dados:** pipeline de ingestão executado mensalmente por rotina agendada.

## Tecnologias

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | Angular + TypeScript, Leaflet, Chart.js, Angular Material | Angular organiza painéis com várias telas e componentes reutilizáveis. Leaflet é leve e gratuito para mapas interativos. Angular Material fornece componentes de interface prontos. |
| Backend | Python + FastAPI | Desenvolvimento rápido, documentação automática da API (Swagger) e integração direta com Pandas para tratamento de dados. |
| Banco de dados | PostgreSQL | Banco relacional gratuito, adequado para dados tabulares agregados e consultas por período e território. |
| Hospedagem | Vercel (frontend); Render (backend e banco) | Planos gratuitos e deploy simples a partir do GitHub, suficientes para o MVP. |

## Justificativas técnicas

- **Problema:** o projeto trabalha com grande volume de dados públicos de fontes diferentes. Python atende à coleta, limpeza e cruzamento desses dados, e o Angular entrega um painel organizado para exibi-los.
- **Prazo:** FastAPI (documentação automática) e Angular Material (componentes prontos) aceleram o desenvolvimento e viabilizam a entrega do MVP no tempo da disciplina.
- **Escopo do MVP:** o acesso direto reduz o tempo de desenvolvimento e facilita os testes, mantendo a autenticação prevista na arquitetura para evoluções futuras.
- **Conhecimento da equipe:** as tecnologias têm ampla documentação e material de estudo, o que facilita o aprendizado durante o projeto.
- **Desempenho:** os dados ficam agregados no banco, evitando consultar o DATASUS a cada acesso e deixando o painel rápido e independente das fontes externas.
- **Custo:** todas as ferramentas possuem versão gratuita, adequada a um projeto acadêmico.
- **Separação de responsabilidades:** frontend, backend e ingestão são independentes, permitindo que cada integrante trabalhe em uma parte sem conflitos.

## Entidades principais

| Entidade | Atributos principais | Descrição |
|---|---|---|
| Município | id, código IBGE, nome, região de saúde, população | Cada um dos 185 municípios de Pernambuco. |
| Região de Saúde | id, nome, municípios | Agrupamento territorial usado como referência inicial do usuário. |
| Usuário *(versão futura)* | id, nome, e-mail, perfil, id da UBS, região padrão | Profissional ou gestor autenticado. Não implementado no MVP. |
| UBS / Estabelecimento | id, código CNES, nome, tipo, município, situação (ativo/inativo) | Estabelecimentos de saúde registrados no CNES. |
| Indicador | id, nome, categoria (epidemiológico, assistencial, populacional), fonte, unidade | Definição de cada indicador exibido. |
| Valor do Indicador | id, município, indicador, período, valor | Valor de um indicador em um município e período. |
| Alerta | id, município, indicador, tipo, gravidade, data, descrição | Aviso gerado quando um indicador foge do esperado. |
| Classificação de Prioridade | id, município, período, nível (baixa, média, alta), pontuação | Resultado do cálculo de prioridade territorial. |
| Fonte de Dados | id, nome (CNES, SIH, SIA, SINAN, SIM, e-SUS APS, IBGE), data da última atualização | Controle de origem e atualização dos dados. |