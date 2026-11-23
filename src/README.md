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
└── frontend/       # Aplicação Angular (standalone components)
    └── src/app/
        ├── app.component.*            # tela inicial: tabela de municípios e prioridade
        ├── indicadores.component.*    # painel de indicadores do município selecionado (gráficos Chart.js)
        ├── municipio.service.ts       # chamadas HTTP à API (municípios)
        ├── indicador.service.ts       # chamadas HTTP à API (indicadores)
        └── models/                    # tipos TypeScript equivalentes aos schemas da API
```

**Status atual (escopo inicial da AV2):** a API expõe os endpoints de
`/municipios`, `/municipios/{id}/indicadores`, `/alertas`, `/comparar` e
`/regiao-padrao-demo` descritos em `docs/05`, com dados de 7 municípios de
Pernambuco inseridos pelo script de seed — ver
[data/README.md](../data/README.md) para a origem e o caráter demonstrativo
desses dados. O frontend cobre dois fluxos funcionando ponta a ponta com a
API: a lista de municípios com a classificação de prioridade, e — ao
clicar em "Ver indicadores" num município — o painel de Indicadores de
Saúde, com um gráfico de tendência (Chart.js) por indicador, fonte, data
de atualização e aviso de dado demonstrativo. O mapa interativo (Leaflet),
o painel de priorização em fluxo de trabalho e a ingestão real das bases
do DATASUS (PySUS) ainda não foram implementados.

Instruções de instalação e execução estão no
[README principal](../README.md#como-executar-o-projeto).
