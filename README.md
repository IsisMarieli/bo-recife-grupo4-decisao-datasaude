# Saúde Estratégica

**Projeto Integrador — Banco de Oportunidades do Recife**

Projeto voltado ao acesso a dados estratégicos do território para tomada de decisão em saúde.

Este repositório foi criado a partir do modelo do Projeto Integrador da disciplina de Análise e Desenvolvimento de Sistemas. O grupo seleciona um problema real publicado no Banco de Oportunidades (BO) da Prefeitura do Recife, investiga o problema, propõe uma solução tecnológica (1ª Avaliação) e desenvolve um MVP funcional (2ª Avaliação).

🔗 Banco de Oportunidades: https://bancodeoportunidades.recife.pe.gov.br/

---

## Identificação da equipe

| Campo | Informação |
|---|---|
| **Turma** | 5NA — Embarque Digital / Noite |
| **Grupo** | 4 |
| **Nome do projeto** | Saúde Estratégica |
| **BO escolhido** | Limitação de acesso a dados estratégicos do território para tomadas de decisão em saúde |
| **Link do BO** | https://coreto.app.emprel.gov.br/banco-de-bo/limitacao-de-acesso-a-dados-estrategicos-do-territorio-para-tomadores- |

### Integrantes

| Nome | GitHub |
|---|---|
| Isis Marieli Da Silva Moura | [@IsisMarieli](https://github.com/IsisMarieli) |
| Maria Clara Trevizane Buonafina | [@mariactbuonafina](https://github.com/mariactbuonafina) |
| Emilly Dantas da Silva Bento | [@Emilly-stargirl](https://github.com/Emilly-stargirl) |
| Luis Fernando Andrade da Silva | [@fernandoferard](https://github.com/fernandoferard) |
| Eychila Meirelle da Silva | [@EychilaSilva](https://github.com/EychilaSilva) | 
| Maria Eduarda T. Buonafina | [@MariaEduardaTBuonafina](https://github.com/MariaEduardaTBuonafina) | 

---

## Critério central do projeto

Não buscamos o projeto tecnicamente mais complexo, e sim uma solução em que seja possível demonstrar claramente a relação:

```text
PROBLEMA ➔ EVIDÊNCIA ➔ SOLUÇÃO ➔ IMPLEMENTAÇÃO ➔ TESTE ➔ RESULTADO
```
## Problema

- **Qual é o problema?**  
  O principal desafio identificado no Recife não é a falta de dados de saúde, mas sim a sua fragmentação em diferentes fontes, formatos e níveis de detalhamento, o que impede a obtenção de uma visão integrada e territorialmente contextualizada. Como consequência dessa dispersão, a capacidade dos gestores de cruzar informações, identificar padrões, acompanhar indicadores e utilizar evidências para otimizar o planejamento, a priorização de ações e a alocação de recursos públicos fica comprometida.

- **Quem é afetado?**  
  Gestores públicos e tomadores de decisão, profissionais de saúde da ponta (médicos, enfermeiros, agentes comunitários), a população (usuários do SUS no Recife) e pesquisadores (acadêmicos e analistas de dados).

- **Por que o problema acontece?**  
  Devido à fragmentação e despadronização dos dados gerados por diferentes órgãos, secretarias ou departamentos.

- **Como é tratado atualmente?**  
  Por meio de iniciativas fragmentadas e processos manuais demorados em planilhas isoladas. Os dados de saúde alimentam sistemas federais de maneira rígida (como DATASUS, e-SUS APS, SIM e SINAN), o que dificulta análises hiperlocalizadas ou cruzamentos flexíveis com dados municipais.

- **Qual parte do problema será atacada?**  
  - **Heterogeneidade (Despadronização):** Criação de regras e nomenclaturas comuns para que bases de dados de diferentes fontes "conversem" entre si.
  - **Esforço operacional manual (Automação):** Substituição de planilhas isoladas por fluxos automatizados de integração de dados.
  - **Isolamento territorial (Contextualização geográfica):** Consolidação de um padrão georreferenciado único em Pernambuco e no Recife, permitindo cruzar saúde, habitação e assistência social de forma visual e espacial.

---

## Solução proposta

O **Saúde Estratégica** é um painel digital integrado de inteligência e apoio à decisão para a gestão do SUS. A plataforma transforma dados dispersos de múltiplas fontes públicas em informação territorialmente contextualizada e acionável, permitindo uma gestão baseada em evidências através de quatro eixos principais:

1. **Visão Geral (Painel Estadual):** Indicadores macro e alertas semanais para a vigilância.
2. **Mapa de Necessidades:** Experiência cartográfica interativa dos municípios para identificar pressões na rede.
3. **Indicadores de Saúde:** Centro analítico estruturado com blocos temáticos do DATASUS.
4. **Priorização (Ciclo de Planejamento):** Painel de governança em formato de fluxo de trabalho (Pendentes, Em Análise, Concluídas).

---

## Escopo do MVP

- [x] Integração e Estruturação de dados
- [x] Dashboard de visão geral
- [x] Mapa interativo de necessidades
- [x] Painel de indicadores de saúde
- [x] Módulo de priorização

---

## Tecnologias

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Front-end | Angular + TypeScript / React | Organização de painéis complexos e componentes reutilizáveis. |
| Back-end | FastAPI (Python) | Desenvolvimento ágil, documentação automática e integração direta com Pandas. |
| Banco de dados | PostgreSQL | Adequado para dados tabulares agregados e consultas relacionais por território. |
| Tratamento de dados | Python, Pandas, NumPy | Eficiência na limpeza e agregação das bases públicas. |

---

## Fluxo do projeto

| Etapa | Pergunta central | Resultado |
| --- | --- | --- |
| **Escolha do BO** | Qual problema real queremos resolver? | BO selecionado: *Limitação de acesso a dados estratégicos do território para tomadas de decisão em saúde*. |
| **Investigação** | Por que esse problema existe e quem é afetado? | Diagnóstico detalhado da fragmentação de bases do DATASUS e impactos diretos sobre gestores e equipes de saúde em Recife. |
| **1ª Avaliação** | O que propomos e por que funcionaria? | Projeto da solução estruturado (Arquitetura em três camadas, protótipo no Figma e documentação completa na pasta `docs/`). |
| **Desenvolvimento** | Como transformar a proposta em software? | MVP em construção utilizando Angular no frontend, FastAPI no backend e PostgreSQL. |
| **Testes** | A solução realmente atende ao problema? | Simulações de cenários reais de gestão pública e validação da precisão dos indicadores e mapas. |
| **2ª Avaliação** | A solução funciona na prática? | MVP funcional entregue com o fluxo de ponta a ponta implementado e validado. |

---

## Clonar projeto

```bash
git clone https://github.com/IsisMarieli/bo-recife-grupo4-decisao-datasaude.git

cd bo-recife-grupo4-decisao-datasaude

code .
```

---

## Como executar o projeto

> Escopo inicial da AV2: backend (API + banco) e um fluxo mínimo do frontend
> (lista de municípios com a classificação de prioridade), com dados
> demonstrativos. Mapa interativo, demais painéis e a integração real com o
> DATASUS ainda estão em desenvolvimento — ver [src/README.md](src/README.md).

### Opção 1 — Docker Compose (recomendado: sobe tudo de uma vez)

Requer Docker instalado. Em algumas instalações o comando é `docker compose`
(com espaço); em outras, `docker-compose` (com hífen, plugin legado).

```bash
docker compose up --build
```

Um único comando sobe os três serviços juntos:

- **PostgreSQL**, já populado com dados de referência/demonstrativos (`src/backend/app/seed.py`);
- **API** em `http://localhost:8000` (documentação interativa em `http://localhost:8000/docs`);
- **Frontend Angular** em `http://localhost:4200`, com hot reload (o código de `src/frontend` é montado dentro do container).

Para derrubar tudo: `docker compose down` (ou `docker-compose down`).

### Opção 2 — Rodar cada parte manualmente (sem Docker)

Só o banco de dados exige Docker (ou um PostgreSQL local já instalado); backend e frontend rodam direto na máquina. Use dois terminais, um para cada parte.

**Terminal 1 — banco + backend:**

```bash
docker run --name saude-estrategica-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=saude_estrategica -p 5432:5432 -d postgres:16

cd src/backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # ajuste a DATABASE_URL se necessário
python -m app.seed     # cria as tabelas e popula os dados demonstrativos
uvicorn app.main:app --reload
```

**Terminal 2 — frontend** (requer Node.js 20+ e a API já rodando em `http://localhost:8000`):

```bash
cd src/frontend
npm install
npm start   # ng serve — abre em http://localhost:4200
```