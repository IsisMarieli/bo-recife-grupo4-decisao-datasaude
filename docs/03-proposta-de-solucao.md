# 03 — Proposta de Solução

> **Objetivo deste documento:** apresentar a solução tecnológica proposta pela equipe e mostrar como ela se relaciona com o problema e as evidências levantadas.
>
> **Avaliação:** AV1
>
> Cada funcionalidade deve estar ligada a uma parte do problema descrito em [01-problema.md](01-problema.md) e às evidências de [02-investigacao-e-evidencias.md](02-investigacao-e-evidencias.md).

---

## Nome da solução

## Resumo

_O SaúdeTerritório Recife é uma plataforma web que integra dados públicos de saúde, sempre agregados e sem dados pessoais, e os organiza por território (bairro, Distrito Sanitário e RPA). Os dados são exibidos em mapas, rankings e séries temporais. Destina-se a gestores e profissionais de saúde da rede municipal do Recife. Resolve a dificuldade de acessar, cruzar e interpretar informações fragmentadas, apoiando a priorização de ações e recursos com base em evidências territoriais._

## Público-alvo

* _População dos territórios do Pernambuco, em especial a das áreas com maior necessidade de saúde, que é beneficiada indiretamente por ações mais bem direcionadas._
* _Secretaria de Saúde do Recife, que ganha eficiência no planejamento e na alocação de recursos._
* _Conselhos de saúde e instâncias de controle social, que passam a ter dados para acompanhar e cobrar ações._

## Usuários

_Quem vai utilizar o sistema diretamente? (Pode ser diferente do público-alvo.)_

| Tipo de usuário | O que faz no sistema? |
| :--- | :--- |
| Gestor municipal de saúde | Consulta mapas e rankings, compara territórios, ajusta o índice de prioridade e exporta relatórios para o planejamento. |
| Coordenador de Distrito Sanitário | Acompanha os indicadores do seu distrito e dos bairros, identifica áreas críticas e embasa decisões locais. |
| Vigilância epidemiológica | Monitora séries temporais de agravos (ex.: arboviroses) e recebe alertas quando um território passa do limiar. |
| Equipe de atenção primária (consulta) | Visualiza o perfil de necessidades do território em que atua. |
| Administrador técnico | Gerencia perfis de acesso, fontes de dados e rotinas de atualização. |

## Proposta de valor

_Situação atual: os dados estão espalhados em fontes, formatos e níveis de detalhe diferentes (DATASUS, CNES, IBGE, planilhas locais). Montar uma visão do território exige trabalho manual e demorado, e as decisões acabam baseadas em informação fragmentada ou em percepção._

_O que a solução melhora:_

* _Visão integrada: um único lugar reúne os indicadores de saúde e as características do território._
* _Agilidade: a atualização é automatizada, e o gestor encontra áreas prioritárias em minutos, sem cruzar planilhas._
* _Equidade: o índice de prioridade é transparente e ajustável, e ajuda a enxergar territórios que costumam ficar invisíveis._
* _Antecipação: alertas em séries temporais permitem identificar surtos mais cedo, respeitando a defasagem de cada fonte._
* _Segurança e conformidade: só trabalha com dados agregados, o que reduz o risco de LGPD._
* _Apoio, não substituição: a decisão continua com o gestor._

## Fluxo principal

```text
Fontes públicas (DATASUS, CNES, IBGE, Prefeitura do Recife)
   ↓
Coleta e padronização automática (ETL)
   ↓
Banco territorial (indicadores por território e período)
   ↓
Cálculo de taxas e do índice de prioridade
   ↓
Gestor acessa o painel (login com perfil)
   ↓
Escolhe indicador, período e território
   ↓
Mapa, ranking e série temporal
   ↓
Identifica áreas prioritárias e exporta relatório para o planejamento
```
Passo a passo do usuário:

1- Faz login com seu perfil.

2- Seleciona o indicador (ex.: arboviroses) e o período.

3- Visualiza o mapa de calor por território.

4- Compara territórios no ranking e consulta a série temporal.

5- Cruza o indicador com características do território (renda, densidade, saneamento).

6- Consulta o índice de prioridade e ajusta os pesos, se necessário.

7- Exporta o relatório (PDF/CSV) para a reunião de planejamento.

## Funcionalidades essenciais

_Funcionalidades sem as quais a solução não resolve o problema. Prioridade: Alta, Média ou Baixa._

| ID | Funcionalidade | Problema que ajuda a resolver | Prioridade |
| :--- | :--- | :--- | :--- |
| F01 | Pipeline de ingestão e consolidação de dados do DATASUS no PostgreSQL | Integração de fontes públicas fragmentadas | Alta |
| F02 | Painel de Visão Geral: cartões de macroindicadores e alertas da semana | Atraso na identificação de surtos; visão rápida do estado | Alta |
| F03 | Mapa de Necessidades interativo (municípios de PE, GeoJSON do IBGE, filtros regionais) | Visualização territorial e identificação de regiões críticas | Alta |
| F04 | Bloco de Indicadores de Saúde organizados por fonte do DATASUS | Cruzamento e organização de indicadores | Alta |
| F05 | Painel de Priorização em fluxo (Pendentes, Em Análise, Concluídas) | Apoio à priorização de ações e encaminhamentos | Média |

## Funcionalidades futuras

* _Login com autenticação e perfis personalizados por UBS_
* _Exportação automatizada de relatórios em PDF pelo backend_
* _Notificações em tempo real por e-mail e WhatsApp_
* _Índice de prioridade composto com pesos ajustáveis_
* _Série temporal com alertas por limiar_
* _Cruzamento com dados socioeconômicos (renda, saneamento)_
* _Aprofundamento para bairros e Distritos Sanitários do Recife_


## Diferencial

_Ferramentas como o TabNet/DATASUS, os painéis do Ministério da Saúde e as planilhas locais mostram dados isolados, em tabelas por município, sem integração entre fontes e sem foco no território urbano. O diferencial desta proposta é:_

* _Integração de fontes distintas em uma única base territorial, com nível de detalhe de bairro e Distrito Sanitário._
* _Mapa de decisão, não só de consulta: índice de prioridade transparente e ajustável._
* _Alertas territoriais sobre surtos, em vez de relatórios estáticos._
* _Privacidade desde o desenho: só dados agregados, sem dados pessoais._
* _Desenhada para o gestor, com exportação pronta para o planejamento._
