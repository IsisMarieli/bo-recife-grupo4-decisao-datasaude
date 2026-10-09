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

_Listar dados, notícias, entrevistas, documentos ou observações que comprovam o problema. Detalhar em `docs/`._

## Solução proposta

_Descrever a solução tecnológica._

## Escopo do MVP

_Listar as funcionalidades essenciais que serão entregues na AV2._

- [ ] Funcionalidade 1
- [ ] Funcionalidade 2
- [ ] Funcionalidade 3

## Tecnologias

_Definir depois da AV1._

| Camada | Tecnologia |
|---|---|
| Front-end | _a definir_ |
| Back-end | _a definir_ |
| Banco de dados | _a definir_ |

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
