# Código-fonte (`src/`)

Todo o **código-fonte do MVP** deverá ficar dentro desta pasta.

> **Avaliação:** AV2. Na AV1 esta pasta pode permanecer apenas com este arquivo.

## Organização

**Não existe uma estrutura tecnológica obrigatória.** A organização depende das tecnologias escolhidas em [06-arquitetura-e-tecnologias.md](../docs/06-arquitetura-e-tecnologias.md).

Os exemplos abaixo são **apenas ilustrativos**:

**Exemplo 1** — frontend e backend separados:

```text
src/
├── frontend/
├── backend/
└── database/
```

**Exemplo 2** — aplicação web simples:

```text
src/
├── app.py
├── templates/
└── static/
```

**Exemplo 3** — aplicação organizada por componentes:

```text
src/
├── components/
├── pages/
├── services/
└── api/
```

## Boas práticas

- documente no [README principal](../README.md#como-executar-o-projeto) como instalar e executar o projeto;
- registre as dependências em um arquivo apropriado (por exemplo, `requirements.txt`, `package.json` ou equivalente);
- use variáveis de ambiente para configurações sensíveis e forneça um `.env.example` **sem valores reais**;
- **nunca** versione senhas, tokens, chaves de API ou arquivos `.env`;
- não versione pastas geradas automaticamente (`node_modules/`, `venv/`, `build/` etc.) — elas já estão no `.gitignore`.

## Descrição do código

Estrutura adotada (ver [05-arquitetura-e-tecnologias.md](../docs/05-arquitetura-e-tecnologias.md)):

```text
src/
├── backend/        # API REST (FastAPI + SQLAlchemy)
│   └── app/
│       ├── main.py       # endpoints
│       ├── models.py     # entidades do banco (município, indicador, alerta...)
│       ├── schemas.py     # schemas de resposta (Pydantic)
│       ├── priority.py    # cálculo do índice de prioridade (funções puras)
│       └── seed.py        # popula o banco com dados de referência/demonstrativos
└── frontend/       # Aplicação Angular (standalone components) com roteamento
    └── src/app/
        ├── app.component.*                  # casca: cabeçalho, menu das 4 telas e <router-outlet>
        ├── app.routes.ts                    # rotas: visao-geral, mapa-de-necessidades, indicadores(/:id), priorizacao
        ├── visao-geral.component.*          # tela 1 — cartões de macroindicadores + alertas da semana
        ├── mapa-de-necessidades.component.* # tela 2 — lista de municípios e prioridade (mapa Leaflet: pendente)
        ├── indicadores-page.component.*     # tela 3 — seletor de município + painel de indicadores
        ├── indicadores.component.*          # painel de indicadores (gráficos Chart.js), usado pela tela 3
        ├── priorizacao.component.*          # tela 4 — placeholder (ainda não implementada)
        ├── municipio.service.ts             # chamadas HTTP à API (municípios)
        ├── indicador.service.ts             # chamadas HTTP à API (indicadores)
        ├── alerta.service.ts                # chamadas HTTP à API (alertas)
        └── models/                          # tipos TypeScript equivalentes aos schemas da API
```

**Status atual (escopo inicial da AV2):** a API expõe os endpoints de
`/municipios`, `/municipios/{id}/indicadores`, `/alertas`, `/comparar` e
`/regiao-padrao-demo` descritos em `docs/05`, com dados de 7 municípios de
Pernambuco inseridos pelo script de seed — ver
[data/README.md](../data/README.md) para a origem e o caráter demonstrativo
desses dados.

O frontend já está organizado nas quatro áreas planejadas (RF19), com
navegação entre elas pelo menu superior:

1. **Visão Geral** (tela inicial) — cartões de macroindicadores (municípios
   monitorados, prioridade alta/média, alertas ativos) e a lista de
   alertas da semana (`GET /alertas`).
2. **Mapa de Necessidades** — lista de municípios com a classificação de
   prioridade; o mapa cartográfico interativo (Leaflet) ainda não foi
   implementado, a tela já avisa isso ao usuário.
3. **Indicadores de Saúde** — seletor de município (ou acesso direto vindo
   do Mapa de Necessidades) e o painel com gráfico de tendência (Chart.js)
   por indicador, fonte, data de atualização e aviso de dado demonstrativo.
4. **Priorização** — tela de navegação já existe, mas o conteúdo (fluxo
   Pendentes/Em Análise/Concluídas) ainda não foi implementado.

A ingestão real das bases do DATASUS (PySUS), que hoje é substituída pelo
script de seed com dados demonstrativos, também ainda não foi implementada.

Instruções de instalação e execução estão no
[README principal](../README.md#como-executar-o-projeto).
