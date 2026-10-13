# 02 — Investigação e Evidências

> **Objetivo deste documento:** mostrar, com base em fontes verificáveis, por que o problema existe, como ele é tratado hoje e quem é afetado.
>
> **Avaliação:** AV1

> ⚠️ **Opinião sem evidência não é suficiente.**
> Toda afirmação importante deve estar apoiada em uma fonte: dado, notícia, artigo, base pública, entrevista ou observação registrada. Sempre informe de onde veio a informação.

---

## Contexto atual

O problema identificado pela equipe está relacionado à fragmentação dos dados de saúde 
utilizados para apoiar a tomada de decisão no Recife. Embora a Secretaria de Saúde e 
outros órgãos públicos produzam e disponibilizam diferentes conjuntos de dados sobre o 
território e os serviços de saúde, essas informações podem estar distribuídas em fontes, 
formatos e níveis de detalhamento distintos.

## Como o problema é tratado hoje

Atualmente, existem diferentes mecanismos de consulta e disponibilização de informações em saúde.
No âmbito federal, o DATASUS disponibiliza o TABNET, ferramenta que permite consultar e tabular informações de saúde, incluindo dados epidemiológicos, mortalidade, produção hospitalar, produção ambulatorial e rede assistencial.

No âmbito municipal, o Portal de Dados Abertos da Prefeitura do Recife disponibiliza conjuntos de dados relacionados à saúde, incluindo consultas e procedimentos, estoque de medicamentos, rede de atenção à saúde e distritos sanitários.

Além dessas iniciativas, Recife já possui a plataforma Saúde Conectada, voltada à interoperabilidade de informações clínicas entre sistemas de saúde. Um estudo publicado em 2025 descreve essa experiência de integração de dados clínicos no município.

Embora essas iniciativas contribuam para a disponibilização e integração de informações, ainda é necessário investigar como os gestores municipais combinam os dados epidemiológicos, assistenciais e estruturais para analisar o território, identificar prioridades e acompanhar as ações decorrentes dessas análises.

## Soluções existentes

| Solução | Onde é usada | Como funciona | Link |
|---|---|---|---|
| Portal de Dados Abertos do Recife |Recife, PE |Disponibiliza conjuntos de dados municipais, incluindo informações sobre saúde, consultas, medicamentos e rede de atendimento. | [Acessar portal](https://dados.recife.pe.gov.br/group/saude)|
|DATASUS — TABNET| Brasil|Permite consultar e tabular diferentes informações de saúde pública, conforme as bases disponíveis.| [Acessar portal](https://datasus.saude.gov.br/informacoes-de-saude-tabnet/) |
|Saúde Conectada|Recife, PE|Integra informações clínicas provenientes de diferentes sistemas para favorecer o compartilhamento de informações entre os serviços de saúde.|[Acessar artigo](https://doi.org/10.1590/2358-28982025E110011P)|

## Limitações das soluções atuais

- Portal de Dados Abertos do Recife: Disponibiliza conjuntos de dados municipais, mas as informações estão organizadas em
bases distintas. Para produzir uma análise conjunta, pode ser necessário localizar, compreender e combinar conjuntos diferentes.
Essa necessidade deve ser verificada na prática; a existência de bases separadas, por si só, não comprova retrabalho dos gestores.
- DATASUS/TABNET: Permite consultar e tabular indicadores de saúde, porém sua finalidade principal é a consulta a bases e
tabulações. A equipe deve verificar se os recortes, filtros e formatos disponíveis atendem às análises territoriais específicas dos
gestores do Recife.
- Saúde Conectada: A iniciativa está relacionada à interoperabilidade e ao compartilhamento de informações clínicas. O Saúde
Estratégica deve explicitar sua diferença: apoiar a leitura integrada de indicadores epidemiológicos, assistenciais e territoriais e a
priorização de ações, sem presumir que a plataforma existente não faça isso.
- Planilhas, relatórios e processos internos: O questionário do Coreto prevê investigar se existem registros paralelos, etapas
manuais, demora, duplicidade ou dependência de pessoas específicas. Como ainda não há respostas de entrevistas anexadas,
essas limitações devem ser tratadas como pontos a verificar, não como fatos confirmados.


---

## Fontes consultadas

### Dados

- Consultas e procedimentos de saúde — Prefeitura do Recife
  [Acessar conjunto de dados](https://dados.recife.pe.gov.br/dataset/consultas-e-procedimentos-de-saude)
  
Disponibiliza informações sobre consultas e procedimentos por tipo, especialidade e localidade, além de recursos sobre produção ambulatorial e internamentos.

- Estoque de medicamentos — Prefeitura do Recife
[Acessar conjunto de dados](https://dados.recife.pe.gov.br/dataset/estoque-dos-medicamentos-nas-farmacias-da-rede-municipal-de-saude)

Disponibiliza informações sobre medicamentos nas farmácias da rede municipal, organizadas por distrito, com atualização diária informada no portal.


### Notícias

- [Ler notícia](https://www2.recife.pe.gov.br/node/300576)
Publicada em 25 de julho de 2026, a notícia trata de uma parceria entre a Prefeitura do Recife e o Real Hospital Português para compartilhamento de dados entre os sistemas das instituições. É relevante para mapear iniciativas locais já existentes de integração de informações em saúde.


### Artigos

- [Ler o artigo SciELO](https://doi.org/10.1590/2358-28982025E110011P)
O estudo apresenta experiências de interoperabilidade em Recife e na Ebserh. É importante para compreender soluções existentes, contextualizar a fragmentação dos sistemas de saúde e delimitar corretamente a contribuição do Saúde Estratégica. 


### Bases públicas

- [DATASUS - TABNET](https://datasus.saude.gov.br/informacoes-de-saude-tabnet/)
- [Portal de Dados Abertos do Recife](https://dados.recife.pe.gov.br/)
- [IBGE - Recife](https://cidades.ibge.gov.br/brasil/pe/recife/panorama)



### Entrevistas

**Primordialmente focadas na Alta Gestão e Estrutura Central**

- Gabinete da Secretaria de Saúde: Secretário e Secretários-Executivos.
- Secretaria Executiva de Vigilância em Saúde (SEVS): Atenção especial a este órgão! É aqui que ficam os dados estratégicos (epidemiologias, surtos, vigilância sanitária). Dentro dela funciona o CIEVS (Centro de Informações Estratégicas de Vigilância em Saúde), que é o núcleo de inteligência de dados da cidade.
- Secretaria Executiva de Atenção Básica (SEAB): Gerencia todos os postinhos e equipes de rua.


### Observações

- Alta Gestão e estrutura central: Hipótese a investigar: gestores podem precisar combinar indicadores de diferentes áreas para
decidir prioridades e acompanhar resultados. Perguntar quais indicadores são consultados, de quais sistemas vêm, com que
frequência são atualizados e como se transforma uma análise em decisão.
- Gestão territorial — Distritos Sanitários I a VIII: Hipótese a investigar: gerentes podem precisar comparar áreas e identificar
concentrações de riscos ou demandas. Perguntar como acessam dados por território, se conseguem comparar períodos e quais
informações faltam para justificar uma prioridade.
- Rede de Atenção — serviços operacionais: Hipótese a investigar: unidades podem necessitar de informações mais oportunas
sobre encaminhamentos, continuidade do cuidado, demandas reprimidas ou ocorrências de campo. Perguntar como as informações
são registradas e compartilhadas e em que etapa surgem dificuldades.



---

## Quadro de evidências

> Cada linha deve conectar uma evidência concreta ao que ela demonstra sobre o problema.

| Evidência | Fonte | O que demonstra? |
|---|---|---|
|Existem fontes municipais distintas |Portal de Dados Abertos do Recife (https://dados.recife.pe.gov.br/group/saude) |Demonstra que há conjuntos de dados municipais sobre diferentes temas de saúde. Não prova, isoladamente, que os gestores tenham dificuldade para combiná-los. |
|Há ferramentas de consulta de indicadores|DATASUS/TABNET (https://datasus.saude.gov.br/informacoes-de-saude-tabnet/)|Demonstra a disponibilidade de consultas e tabulações de informações de saúde. A adequação aos fluxos reais de decisão local precisa ser avaliada.|
|Há dados sobre consultas e procedimentos|Portal de Dados Abertos do Recife (https://dados.recife.pe.gov.br/dataset/consultas-e-procedimentos-de-saude)|Oferece uma fonte potencial para análises assistenciais. A equipe deve registrar quais campos, períodos e níveis territoriais estão disponíveis no momento da consulta.|
|Há dados de estoque de medicamentos|Portal de Dados Abertos do Recife (https://dados.recife.pe.gov.br/dataset/estoque-dos-medicamentos-nas-farmacias-darede-municipal-de-saude)|Aponta uma possível fonte para análises de disponibilidade de medicamentos. Antes de integrar, verificar cobertura, periodicidade, formato e possibilidade de uso|
|Necessidades e dificuldades dos usuários ainda precisam de validação|Entrevistas e observações de campo|Somente respostas reais, exemplos documentados ou observações registradas poderão comprovar demora, retrabalho, falhas de comunicação, dados desatualizados ou impacto nas decisões.|


---

## Análise

### Hipóteses

**Hipótese 1 — Dispersão das fontes:** a utilização de diferentes bases de dados pode dificultar a construção de uma visão integrada da situação de saúde de cada território.

**Hipótese 2 — Diferenças entre os dados:** formatos, períodos de referência, definições dos indicadores e frequências de atualização distintos podem aumentar a complexidade do cruzamento das informações.

**Hipótese 3 — Limitação da análise territorial integrada:** as ferramentas utilizadas atualmente podem não oferecer, em um único fluxo de trabalho, a combinação de indicadores epidemiológicos, assistenciais e estruturais necessária às análises realizadas pelos gestores.

**Hipótese 4 — Distância entre análise e ação:** a identificação de uma prioridade pode exigir etapas adicionais para registrar encaminhamentos, atribuir responsáveis e acompanhar a execução das ações.


### Principais causas

-  Distribuição dos dados entre diferentes bases, portais ou sistemas.
-  Diferenças entre formatos, conceitos, recortes territoriais e períodos de atualização.
-  Possível ausência de um fluxo simples para cruzar indicadores epidemiológicos, assistenciais e estruturais.
- Possível dificuldade de transformar análises em prioridades com responsáveis, prazos e acompanhamento.
- Possíveis barreiras de acesso, compartilhamento, qualidade ou atualização dos dados; investigar quais existem e em quais
setores.

### Principais consequências

- Maior esforço para localizar e reunir informações provenientes de fontes diferentes.
- Possível demora para comparar territórios, acompanhar indicadores e reconhecer mudanças relevantes.
- Possibilidade de decisões baseadas em informações com períodos, definições ou níveis de detalhamento diferentes.
- Dificuldade potencial para justificar a priorização de áreas e acompanhar as ações decorrentes da análise.
- Possível duplicação de trabalho ou dependência de procedimentos manuais, caso isso seja confirmado pelos profissionais.
- Não registrar essas consequências como fatos comprovados até que haja relatos, observações ou dados que mostrem sua
ocorrência e seu impacto

### Principais descobertas

- A pesquisa documental identificou que existem fontes públicas municipais e federais com informações de saúde; portanto, o problema não deve ser descrito simplesmente como ausência de dados.
- Os conjuntos de dados têm temas, formatos e possíveis periodicidades diferentes. Isso torna necessário avaliar a compatibilidade dos campos, a qualidade e o nível territorial antes de propor integração.
- Foi identificada uma iniciativa de interoperabilidade clínica em Recife. A equipe deve diferenciar essa finalidade da proposta de
inteligência territorial, indicadores e priorização de ações.
- O questionário realizado no perfil da gestão, inclui perguntas sobre como os dados são registrados, consultados, atualizados, compartilhados e analisados, bem como sobre pendências, alertas e necessidades de automação. 
