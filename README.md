# Saúde Estratégica

**Projeto Integrador — Banco de Oportunidades do Recife**

Projeto voltado ao acesso a dados estratégicos do território para tomada de decisão em saúde.

Este repositório foi criado a partir do modelo do Projeto Integrador da disciplina de Tópicos integradores. O grupo seleciona um problema real publicado no Banco de Oportunidades (BO) da Prefeitura do Recife, investiga o problema, propõe uma solução tecnológica (1ª Avaliação) e desenvolve um MVP funcional (2ª Avaliação).

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
| Isis Marieli Da Silva Moura | [@IsisMarieli](https://github.com/IsisMarieli) |
| Maria Clara Trevizane Buonafina | [@mariactbuonafina](https://github.com/mariactbuonafina) |
| Emilly Dantas da Silva Bento | [@Emilly-stargirl](https://github.com/Emilly-stargirl)|
| Luis Fernando Andrade da Silva |[@fernandoferard](https://github.com/fernandoferard) |
| _nome_ | _@usuario_ |
| _nome_ | _@usuario_ |

---

## Critério central do projeto

Não buscamos o projeto tecnicamente mais complexo, e sim uma solução em que seja possível demonstrar claramente a relação:

```
PROBLEMA → EVIDÊNCIA → SOLUÇÃO → IMPLEMENTAÇÃO → TESTE → RESULTADO
```

---

## Problema



- **Qual é o problema?**  
O principal desafio identificado no Recife não é a falta de dados de saúde, mas sim a sua fragmentação em diferentes fontes, formatos e níveis de detalhamento, o que impede a obtenção de uma visão integrada e territorialmente contextualizada. Como consequência dessa dispersão, a capacidade dos gestores de cruzar informações, identificar padrões, acompanhar indicadores e utilizar evidências para otimizar o planejamento, a priorização de ações e a alocação de recursos públicos fica comprometida.

- **Quem é afetado?**  
Com base na fragmentação dos dados de saúde no Recife, o problema gera impactos diretos e indiretos em diferentes atores da sociedade. Sendo os principais grupos afetados: Gestores públicos e tomadores de decisão, profissionais de saúde da ponta (médicos, enfermeiros, agentes comunitários), população (usuários do SUS no Recife), pesquisadores (acadêmicos e analistas de dados).
  
- **Por que o problema acontece?**  
Este tipo de problema acontece devido a fragmentação e despadronização dos dados por diferentes órgãos, secretarias ou departamentos.

- **Como é tratado atualmente?**  
Atualmente, a gestão e o tratamento desse problema costumam ocorrer por meio de iniciativas fragmentadas e processos que, muitas vezes, dependem de esforços manuais. Grande parte dos dados de sáude alimenta sistemas federais obrigatórios (como DATASUS, e-SUS APS, SIM para mortalidade e SINAN para agravos de notificação). Esses dados são estruturados de maneira rígida, o que dificulta análises hiperlocalizadas ou cruzamenos flexíveis com dados municipais de outras áreas (urbanismo e assistência social).
  
- **Qual parte do problema será atacada?**  
Ataca barreiras como: heterogeneidade (despadronização) - Criação de regras, nomenclaturas e chaves de cruzamento comuns para que bases de dados de diferentes fontes "conversem" entre si.  
O esforço operacional manual (Automação do cruzamento): Substituição de planilhas isoladas e processos manuais demorados por fluxos automatizados ou centralizados de integração de dados.  
O isolamento territorial (Contextualização geográfica): A consolidação de um padrão georreferenciado único (como geocodificação por bairros, regiões político-administrativas ou setores censitários do Recife), permitindo cruzar saúde com saneamento, habitação e assistência social de forma visual e espacial.

## Evidências  

A principal documentação sobre este desafio no Recife foi publicada recentemente na Revista Saúde em Debate (SciELO, final de 2025), no artigo intitulado "Superando a histórica fragmentação de dados no SUS: interoperabilidade em Recife e na Ebserh" disponível em: https://saudeemdebate.org.br/sed/article/view/10011#:~:text=Superando%20a%20hist%C3%B3rica%20fragmenta%C3%A7%C3%A3o%20de%20dados%20no%20SUS%3A%20interoperabilidade%20em%20Recife%20e%20na%20Ebserh.

## Solução proposta  

A solução desenvolvida consiste no Saúde Estratégica, um painel digital integrado de
inteligência e apoio à decisão para a gestão do SUS. A plataforma transforma dados
dispersos de múltiplas fontes públicas em informação territorialmente contextualizada e
acionável, permitindo uma gestão baseada em evidências.

## Escopo do MVP

_Listar as funcionalidades essenciais que serão entregues na AV2._

- [ ] Integração e Estruturação de dados
- [ ] Dashboard de visão geral
- [ ] Mapa interativo de necessidades
- [ ] Painel de indicadores de saúde
- [ ] Módulo de priorização

## Tecnologias

_Definir depois da AV1._  

| Camada | Tecnologia |
|---|---|
| Front-end | React |
| Back-end | FastAPI |
| Banco de dados | PostegreSQL |
| Análise e tratamento de dados | Python, Pandas, Numpy e bibliotecas de visualização de dados |

## Testes e resultados

_Registrar como a solução será testada e quais resultados foram obtidos (AV2)._

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
