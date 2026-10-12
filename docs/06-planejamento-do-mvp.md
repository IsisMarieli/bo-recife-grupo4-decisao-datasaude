## O que obrigatoriamente estará no MVP?
- Painel de Visão Geral com cartões de macroindicadores e alertas da semana.
- Mapa de Necessidades interativo com os municípios de Pernambuco e filtros regionais.
- Bloco de Indicadores de Saúde organizados por fontes do DATASUS.
- Painel de Priorização estruturado em formato de fluxo de trabalho (Pendentes, Em Análise, Concluídas).

## O que NÃO estará no MVP?
- Sistema de login com autenticação de utilizadores e perfis personalizados por UBS (previsto para versões futuras).
- Exportação automatizada de relatórios em PDF diretamente pelo backend.
- Integração em tempo real com APIs de notificação via e-mail ou WhatsApp.

## Funcionalidades por avaliação

| Funcionalidade | AV1 | AV2 | Prioridade |
|---|---|---|---|
| Concepção, arquitetura e prototipagem no Figma | Planejada | — | Alta |
| Visão Geral (Dashboard Estadual) | Planejada | Implementar | Alta |
| Mapa de Necessidades Interativo | Planejada | Implementar | Alta |
| Indicadores de Saúde e Blocos DATASUS | Planejada | Implementar | Alta |
| Gestão de Prioridades e Encaminhamentos | Planejada | Implementar | Média |

## Riscos

| Risco | Plano de ação |
|---|---|
| Complexidade na manipulação das malhas geográficas e do Leaflet | Utilizar GeoJSON padronizado do IBGE e componentes validados pela comunidade. |
| Indisponibilidade temporária de bases públicas externas | Utilizar dados consolidados e pré-agregados no PostgreSQL através do pipeline de ingestão em Python/Pandas. |

## Cronograma


| Etapa | Responsável | Situação |
|---|---|---|
| Pesquisa do BO e Definição do Problema | Grupo 4 | Concluído |
| Prototipagem e Arquitetura (AV1) | Isis | Concluído |
| Desenvolvimento do Frontend e Backend (AV2) | Isis | Em andamento |
| Testes e Validação do MVP | Grupo 4 | Não iniciado |