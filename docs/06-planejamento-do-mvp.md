# 06 — Planejamento do MVP

> **Objetivo deste documento:** definir o que será entregue no MVP, o que fica para versões futuras, como o trabalho será dividido entre as avaliações e quais riscos a equipe considera.
>
> **Avaliação:** AV1 (atualizar na AV2)

---

## O que obrigatoriamente estará no MVP?

- Painel de Visão Geral com cartões de macroindicadores e alertas do período.
- Mapa de Necessidades interativo com os municípios de Pernambuco (Recife como território de referência) e filtros regionais.
- Bloco de Indicadores de Saúde organizados por fontes do DATASUS, com gráficos de tendência.
- Painel de Priorização com a classificação dos territórios, os critérios utilizados e os encaminhamentos em formato de fluxo de trabalho (Pendentes, Em Análise, Concluídas).
- Pipeline de ingestão de dados do DATASUS e do IBGE no PostgreSQL.

## O que NÃO estará no MVP?

- Sistema de login com autenticação de usuários e perfis personalizados por UBS (previsto para versões futuras).
- Exportação de relatórios em PDF/CSV.
- Integração em tempo real com APIs de notificação via e-mail ou WhatsApp.
- Índice de prioridade com pesos ajustáveis pelo gestor.
- Atribuição de responsáveis e alteração de status dos encaminhamentos (no MVP, o fluxo exibe apenas o status).
- Recorte por bairros e Distritos Sanitários do Recife (o MVP trabalha no nível de município).

## Funcionalidades por avaliação

| Funcionalidade | AV1 | AV2 | Prioridade |
|---|---|---|---|
| Concepção, arquitetura e prototipagem no Figma | Planejada | — | Alta |
| Pipeline de ingestão de dados (DATASUS e IBGE) | Planejada | Implementar | Alta |
| Visão Geral (Dashboard Estadual) | Planejada | Implementar | Alta |
| Mapa de Necessidades Interativo | Planejada | Implementar | Alta |
| Indicadores de Saúde e Blocos DATASUS | Planejada | Implementar | Alta |
| Priorização e Encaminhamentos (exibição de status) | Planejada | Implementar | Média |

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
| Documentação da AV1 (docs 01 a 06) | Grupo 4 | Concluído |
| Desenvolvimento do Frontend e Backend (AV2) | Isis | Em andamento |
| Testes e Validação do MVP | Grupo 4 | Não iniciado |