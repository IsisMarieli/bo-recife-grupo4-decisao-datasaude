# 04 — Requisitos

> **Objetivo deste documento:** transformar a proposta de solução em requisitos claros e verificáveis.
>
> **Avaliação:** AV1 (revisar na AV2, se necessário)

---

## Requisitos funcionais

> Requisitos funcionais descrevem o que o sistema deverá fazer. Os requisitos abaixo consideram as funcionalidades planejadas para o Saúde Estratégica e deverão ser validados durante o desenvolvimento.

| ID | Requisito |
|---|---|
| RF01 | O sistema deve apresentar uma visão geral dos indicadores de saúde disponíveis para o território selecionado. |
| RF02 | O sistema deve permitir que o usuário selecione o território de interesse para consultar as informações disponíveis. |
| RF03 | O sistema deve apresentar informações territoriais em um mapa interativo, conforme a disponibilidade dos dados geográficos. |
| RF04 | O sistema deve permitir a visualização das necessidades de saúde identificadas para os territórios com dados disponíveis. |
| RF05 | O sistema deve apresentar indicadores de saúde organizados por categoria, período e território, conforme os dados disponíveis. |
| RF06 | O sistema deve permitir a consulta de indicadores relacionados à vigilância em saúde, mortalidade, internações, atendimentos e estabelecimentos de saúde, conforme a disponibilidade das fontes integradas. |
| RF07 | O sistema deve apresentar gráficos para facilitar a interpretação dos indicadores de saúde. |
| RF08 | O sistema deve permitir a comparação de indicadores entre territórios ou períodos quando existirem dados compatíveis. |
| RF09 | O sistema deve informar o período de referência dos dados apresentados, quando essa informação estiver disponível. |
| RF10 | O sistema deve identificar as fontes dos dados utilizados em cada indicador ou visualização, sempre que essa informação estiver disponível. |
| RF11 | O sistema deve apresentar a data da última atualização dos dados utilizados, quando essa informação estiver disponível. |
| RF12 | O sistema deve organizar as informações para permitir a consulta dos indicadores sem exigir conhecimento prévio da estrutura técnica das bases de dados. |
| RF13 | O sistema deve apresentar informações que apoiem a identificação de territórios que demandem maior atenção da gestão pública em saúde. |
| RF14 | O sistema deve disponibilizar uma área de priorização territorial com critérios de análise documentados. |
| RF15 | O sistema deve apresentar os indicadores ou critérios utilizados para fundamentar a priorização de um território. |
| RF16 | O sistema deve permitir a consulta dos dados utilizados na análise de priorização, conforme as informações disponíveis. |
| RF17 | O sistema deve informar quando os dados necessários para uma consulta ou análise estiverem ausentes ou indisponíveis. |
| RF18 | O sistema deve identificar claramente os dados simulados ou demonstrativos utilizados durante o desenvolvimento e a validação do MVP. |
| RF19 | O sistema deve organizar as funcionalidades nas quatro áreas planejadas: Visão Geral, Mapa de Necessidades, Indicadores de Saúde e Priorização. |
| RF20 | O sistema deve apresentar mensagens compreensíveis quando ocorrer uma falha na consulta ou na apresentação dos dados, sem expor informações técnicas sensíveis. |

## Requisitos não funcionais

> Requisitos não funcionais descrevem **como o sistema deve se comportar**, incluindo qualidade, segurança, desempenho, acessibilidade e condições de operação. Os requisitos abaixo representam metas planejadas e deverão ser verificados durante o desenvolvimento e os testes do MVP.

| ID | Categoria | Requisito |
|---|---|---|
| RNF01 | Segurança | O sistema deve evitar a exposição de credenciais, tokens, senhas e outras informações sensíveis no código-fonte e nas respostas apresentadas ao usuário. |
| RNF02 | Usabilidade | A interface deve organizar as funcionalidades em seções identificáveis e utilizar textos compreensíveis para os usuários. |
| RNF03 | Desempenho | Como meta de validação do MVP, as consultas principais devem apresentar tempo de resposta de até 3 segundos no percentil 95, em condições de teste documentadas. Essa meta ainda deverá ser verificada. |
| RNF04 | Acessibilidade | A interface deve considerar boas práticas de acessibilidade, incluindo contraste adequado, identificação dos elementos de interação e navegação compreensível. |
| RNF05 | Responsividade | A interface deve se adaptar a diferentes tamanhos de tela, incluindo computadores, tablets e dispositivos móveis. |
| RNF06 | Integridade dos dados | O sistema deve preservar a consistência dos dados utilizados nos indicadores e documentar os processamentos aplicados. |
| RNF07 | Rastreabilidade | Sempre que disponíveis, a origem, o período de referência e a data de atualização dos dados devem poder ser identificados. |
| RNF08 | Confiabilidade | O sistema deve tratar dados ausentes, incompletos ou indisponíveis sem apresentá-los como valores válidos ou conclusões confirmadas. |
| RNF09 | Manutenibilidade | O código deve ser organizado por responsabilidades, facilitando a correção de erros e a evolução das funcionalidades. |
| RNF10 | Compatibilidade | A interface deve ser validada nos navegadores modernos definidos para os testes do projeto. |
| RNF11 | Interoperabilidade | A solução deve prever mecanismos para tratar e integrar dados de fontes distintas, respeitando os formatos e a disponibilidade de cada fonte. |
| RNF12 | Privacidade | O sistema deve priorizar dados agregados para análises territoriais e evitar a exposição desnecessária de informações pessoais ou sensíveis. |
| RNF13 | Transparência | Os critérios utilizados para interpretar indicadores e priorizar territórios devem ser documentados e compreensíveis. |
| RNF14 | Disponibilidade dos dados | O sistema deve comunicar limitações de cobertura, atualização ou disponibilidade das fontes, sem pressupor que os dados estejam disponíveis em tempo real. |
| RNF15 | Implantação e configuração | A aplicação deve permitir a configuração dos ambientes de execução sem incluir credenciais ou segredos diretamente no repositório. |

## Critérios de aceite do MVP

> Critérios de aceite definem **quando o MVP pode ser considerado pronto**. Eles serão usados nos testes da AV2 ([08-testes-e-validacao.md](08-testes-e-validacao.md)).
>
> **Exemplo de formato (não é resposta):** "Dado que _[situação]_, quando _[ação do usuário]_, então _[resultado esperado]_."

- [ ]
- [ ]
- [ ]
