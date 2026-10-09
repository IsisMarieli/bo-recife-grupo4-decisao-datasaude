# Saúde Estratégica

**Projeto Integrador — Banco de Oportunidades do Recife**

Plataforma web de apoio à tomada de decisão em saúde pública, desenvolvida para facilitar o acesso, a integração e a interpretação de dados do DATASUS em Pernambuco[cite: 18, 19].

Este repositório foi criado a partir do modelo do Projeto Integrador da disciplina de Tópicos Integradores. O grupo seleciona um problema real publicado no Banco de Oportunidades (BO) da Prefeitura do Recife, investiga o problema, propõe uma solução tecnológica (1ª Avaliação) e desenvolve um MVP funcional (2ª Avaliação).

🔗 Banco de Oportunidades: https://bancodeoportunidades.recife.pe.gov.br/

---

## Identificação da equipe

| Campo | Informação |
|---|---|
| **Turma** | 5NA - EMBARQUE DIGITAL/NOITE |
| **Grupo** | 4 |
| **Nome do projeto** | Saúde Estratégica |
| **BO escolhido** | Limitação de acesso a dados estratégicos do território para tomadas de decisão em saúde |
| **Link do BO** | https://coreto.app.emprel.gov.br/banco-de-bo/limitacao-de-acesso-a-dados-estrategicos-do-territorio-para-tomadores- |

### Integrantes

| Nome | GitHub |
|---|---|
| Isis Marieli Da Silva Moura | [@IsisMarieli](https://github.com/IsisMarieli)[cite: 27] |
| Maria Clara Trevizane Buonafina | [@mariactbuonafina](https://github.com/mariactbuonafina)[cite: 27] |
| Emilly Dantas da Silva Bento | [@Emilly-stargirl](https://github.com/Emilly-stargirl)[cite: 27] |
| Luis Fernando Andrade da Silva | [@fernandoferard](https://github.com/fernandoferard)[cite: 27] |
| Eychila Meirelle da Silva | [@EychilaSilva](https://github.com/EychilaSilva)[cite: 27] | 
| Maria Eduarda Trevizane Buonafina | [@MariaEduardaTBuonafina](https://github.com/MariaEduardaTBuonafina)[cite: 27] | 

---

## Critério central do projeto

Não buscamos o projeto tecnicamente mais complexo, e sim uma solução em que seja possível demonstrar claramente a relação:

```
PROBLEMA → EVIDÊNCIA → SOLUÇÃO → IMPLEMENTAÇÃO → TESTE → RESULTADO
```

Aqui está o seu ficheiro **`README.md`** completo e atualizado, integrando todas as informações da equipa, do problema, da arquitetura técnica e do projeto apresentado:

```markdown
# Saúde Estratégica

**Projeto Integrador — Banco de Oportunidades do Recife**

Plataforma web de apoio à tomada de decisão em saúde pública, desenvolvida para facilitar o acesso, a integração e a interpretação de dados do DATASUS em Pernambuco[cite: 18, 19].

Este repositório foi criado a partir do modelo do Projeto Integrador da disciplina de Tópicos Integradores. O grupo seleciona um problema real publicado no Banco de Oportunidades (BO) da Prefeitura do Recife, investiga o problema, propõe uma solução tecnológica (1ª Avaliação) e desenvolve um MVP funcional (2ª Avaliação).

🔗 Banco de Oportunidades: https://bancodeoportunidades.recife.pe.gov.br/

---

## Identificação da equipe

| Campo | Informação |
|---|---|
| **Turma** | 5NA - EMBARQUE DIGITAL/NOITE |
| **Grupo** | 4 |
| **Nome do projeto** | Saúde Estratégica |
| **BO escolhido** | Limitação de acesso a dados estratégicos do território para tomadas de decisão em saúde |
| **Link do BO** | https://coreto.app.emprel.gov.br/banco-de-bo/limitacao-de-acesso-a-dados-estrategicos-do-territorio-para-tomadores- |

### Integrantes

| Nome | GitHub |
|---|---|
| Isis Marieli Da Silva Moura | [@IsisMarieli](https://github.com/IsisMarieli)[cite: 27] |
| Maria Clara Trevizane Buonafina | [@mariactbuonafina](https://github.com/mariactbuonafina)[cite: 27] |
| Emilly Dantas da Silva Bento | [@Emilly-stargirl](https://github.com/Emilly-stargirl)[cite: 27] |
| Luis Fernando Andrade da Silva | [@fernandoferard](https://github.com/fernandoferard)[cite: 27] |
| Eychila Meirelle da Silva | [@EychilaSilva](https://github.com/EychilaSilva)[cite: 27] | 
| Maria Eduarda Trevizane Buonafina | [@MariaEduardaTBuonafina](https://github.com/MariaEduardaTBuonafina)[cite: 27] | 

---

## Critério central do projeto

Não buscamos o projeto tecnicamente mais complexo, e sim uma solução em que seja possível demonstrar claramente a relação:


```

PROBLEMA → EVIDÊNCIA → SOLUÇÃO → IMPLEMENTAÇÃO → TESTE → RESULTADO

```

---

## Problema

- **Qual é o problema?**  
  O principal desafio identificado na gestão de saúde pública não é a falta de dados, mas sim a sua fragmentação em diferentes fontes, formatos incompatíveis e sistemas isolados (como SINAN, SIM, SIH/SUS, SIA/SUS, CNES, e-SUS APS e IBGE)[cite: 19, 20]. Como consequência dessa dispersão, a capacidade dos gestores de cruzar informações, identificar padrões, acompanhar indicadores e utilizar evidências para otimizar o planejamento, a priorização de ações e a alocação de recursos públicos fica comprometida[cite: 20].

- **Quem é afetado?**  
  Gestores públicos e tomadores de decisão, profissionais de saúde da ponta (médicos, enfermeiros, agentes comunitários), a população (usuários do SUS) e pesquisadores (acadêmicos e analistas de dados).
  
- **Por que o problema acontece?**  
  Devido à fragmentação, despadronização e descentralização de bases de dados geradas por diferentes órgãos, secretarias ou departamentos[cite: 20].

- **Como é tratado atualmente?**  
  Atualmente, a gestão e o tratamento desse problema ocorrem por meio de iniciativas fragmentadas e processos manuais demorados em planilhas isoladas. Os dados de saúde alimentam sistemas federais de maneira rígida, o que dificulta análises hiperlocalizadas ou cruzamentos flexíveis com dados municipais.
  
- **Qual parte do problema será atacada?**  
  * **Heterogeneidade (Despadronização):** Criação de regras, nomenclaturas e chaves de cruzamento comuns para que bases de dados de diferentes fontes "conversem" entre si.  
  * **Esforço operacional manual (Automação):** Substituição de planilhas isoladas por fluxos automatizados ou centralizados de integração de dados.  
  * **Isolamento territorial (Contextualização geográfica):** Consolidação de um padrão georreferenciado único por município/região de saúde, permitindo cruzar saúde com saneamento, habitação e assistência social de forma visual e espacial.

---

## Evidências

* Dificuldade de cruzamento nativo e unificado entre as bases de dados oficiais de saúde pública do SUS (DATASUS, SINAN, SIM, SIH, SIA, CNES)[cite: 19, 20].
* Dispersão de dados que limita a capacidade dos gestores de acompanhar indicadores e planejar ações baseadas em evidências[cite: 20].
* Documentação complementar e detalhes da pesquisa detalhados na pasta `docs/` do repositório.

---

## Solução proposta

O **Saúde Estratégica** é uma plataforma web e painel digital integrado de inteligência territorial e apoio à decisão para a gestão do SUS[cite: 19, 21]. A solução transforma dados dispersos de múltiplas fontes públicas em informações acionáveis através de quatro eixos principais[cite: 21]:
1. **Visão Geral (Painel Estadual):** Painel executivo unificado com indicadores macro e alertas semanais para a vigilância[cite: 13, 22].
2. **Mapa de Necessidades:** Experiência cartográfica interativa focada nos 185 municípios pernambucanos para identificar pressões e criticidade na rede[cite: 5, 16, 23].
3. **Indicadores de Saúde:** Centro analítico estruturado com 24 indicadores organizados por blocos temáticos (*Epidemiológicos, Assistenciais e Estruturais*)[cite: 15, 24].
4. **Priorização (Ciclo de Planejamento):** Painel de governança em formato de fluxo de trabalho (*Pendentes*, *Em Análise*, *Concluídas*) para registrar encaminhamentos e monitorar prioridades[cite: 14, 25].

---

## Arquitetura e Tecnologias

A arquitetura do sistema adota um modelo em **três camadas** (cliente-servidor), separando a ingestão de dados da aplicação principal:
- **Frontend:** Angular + TypeScript, Leaflet (mapas), Chart.js (gráficos) e Angular Material.
- **Backend:** Python + FastAPI para exposição de endpoints REST e regras de negócio.
- **Pipeline de Ingestão:** Python + Pandas + PySUS para coleta periódica, limpeza e padronização dos dados do DATASUS e IBGE.
- **Banco de Dados:** PostgreSQL para armazenamento dos dados agregados.

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | Angular + TypeScript, Leaflet, Chart.js, Angular Material | Organiza painéis complexos e componentes reutilizáveis; Leaflet é leve para mapas interativos. |
| Backend | Python + FastAPI | Desenvolvimento ágil, documentação automática (Swagger) e integração direta com Pandas. |
| Banco de dados | PostgreSQL | Adequado para dados tabulares agregados e consultas relacionais por período e território. |
| Hospedagem | Vercel (frontend); Render (backend e banco) | Planos gratuitos e deploy contínuo integrado ao GitHub. |

---

## Escopo do MVP

- [x] **Visão Geral:** Dashboard executivo com cartões de indicadores (CNES, SIH, SIA, IBGE) e alertas de prioridade semanal[cite: 13, 22].
- [x] **Mapa de Necessidades:** Mapa interativo de Pernambuco com filtros de Região de Saúde, Nível de Atenção e camadas temáticas[cite: 5, 16, 23].
- [x] **Indicadores de Saúde:** Organização de blocos temáticos baseados nas bases do DATASUS com opções de comparação[cite: 15, 24].
- [x] **Priorização:** Gestão de itens pendentes e em análise regional com foco no ciclo de planejamento estadual[cite: 14, 25].

---

## Testes e resultados

A solução foi validada através de simulações de cenários reais de gestão pública em saúde para o estado de Pernambuco, avaliando a fluidez da navegação cartográfica, a precisão na leitura dos indicadores consolidados e a eficiência no fluxo de registro de prioridades e encaminhamentos estratégicos.

---

## Fluxo do projeto

| Etapa | Pergunta central | Resultado |
|---|---|---|
| Escolha do BO | Qual problema real queremos resolver? | BO selecionado |
| Investigação | Por que esse problema existe e quem é afetado? | Diagnóstico |
| 1ª Avaliação | O que propomos e por que funcionaria? | Projeto da solução |
| Desenvolvimento | Como transformar a proposta em software? | MVP |
| Testes | A solução realmente atende ao problema? | Evidências |
| 2ª Avaliação | A solução funciona na prática? | MVP funcional + demonstração |
---


### Clonar projeto

```bash
git clone https://github.com/IsisMarieli/bo-recife-grupo4-decisao-datasaude.git

cd bo-recife-grupo4-decisao-datasaude

code .
```
