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

* _População dos territórios do Recife, em especial a das áreas com maior necessidade de saúde, que é beneficiada indiretamente por ações mais bem direcionadas._
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
| F01 | Integração automática de fontes públicas (DATASUS, CNES, IBGE, dados abertos do Recife) com atualização periódica | Integração de diferentes fontes públicas de dados.  | Alta |
| F02 | Organização dos dados por território (bairro, Distrito Sanitário, RPA), com padronização de nomes e malhas | Organização dos dados por território.  | Alta |
| F03 | Mapa coroplético com filtro por indicador e período | Visualização em mapas e dashboards. | Alta |
| F04 | Ranking e comparação entre territórios | Identificação de regiões com maior concentração de problemas. | Alta |
| F05 | Série temporal por território, com alerta ao ultrapassar limiar (ex.: arboviroses) | Atraso na identificação de surtos. | Alta |
| F06 | Índice de prioridade composto, com pesos visíveis e ajustáveis | Apoio à priorização de ações e recursos, sem decidir pelo gestor. | Alta |
| F07 | Cruzamento de indicadores de saúde com características do território (renda, densidade, saneamento) | Cruzamento de indicadores com características territoriais.  | Média |
| F08 | Controle de acesso por perfil (gestor, vigilância, consulta) | Acesso restrito a gestores e profissionais autorizados. | Média |
| F09 | Exportação de relatórios (PDF/CSV) | Uso em reuniões de planejamento, no lugar de planilhas isoladas. | Média |
| F10 | Metadados e avisos de qualidade (fonte, data de atualização, alerta de números pequenos) | Decisões com informação pouco contextualizada. | Média |

## Funcionalidades futuras

* _Expansão para os 185 municípios de Pernambuco._
* _Alertas automáticos por e-mail ou mensagem._
* _Comparação entre períodos e análise de tendência._
* _Novos indicadores (saúde da mulher e da criança, doenças crônicas, saúde mental)._
* _Integração com dados agregados do e-SUS APS e do sistema de regulação._
* _Simulador de cenários de alocação de equipes e recursos._
* _Painel público simplificado para controle social e conselhos de saúde._
* _API aberta para outros sistemas e pesquisadores._
* _Versão otimizada para celular._


## Diferencial

_Ferramentas como o TabNet/DATASUS, os painéis do Ministério da Saúde e as planilhas locais mostram dados isolados, em tabelas por município, sem integração entre fontes e sem foco no território urbano. O diferencial desta proposta é:_

* _Integração de fontes distintas em uma única base territorial, com nível de detalhe de bairro e Distrito Sanitário._
* _Mapa de decisão, não só de consulta: índice de prioridade transparente e ajustável._
* _Alertas territoriais sobre surtos, em vez de relatórios estáticos._
* _Privacidade desde o desenho: só dados agregados, sem dados pessoais._
* _Desenhada para o gestor, com exportação pronta para o planejamento._
