# MailSafe Academy — Simulador de Phishing

Projeto desenvolvido para a **Maratona Tech**, dentro do tema **Dilemas Digitais**, com foco em **conscientização sobre phishing por e-mail**.

O objetivo do projeto é ensinar, de forma prática e interativa, como identificar tentativas de phishing — um dos golpes digitais mais comuns e mais difíceis de perceber no dia a dia. Em vez de apenas explicar teoricamente o que é phishing, o jogo coloca o jogador em situações simuladas parecidas com as que ele encontraria na vida real: uma caixa de entrada de e-mail, links suspeitos, páginas de login falsas e decisões sob pressão.

---

## Sobre o tema: Phishing

Phishing é uma técnica de golpe digital em que criminosos se passam por empresas, bancos ou pessoas confiáveis para roubar dados sensíveis (senhas, cartões, informações pessoais). O golpe funciona principalmente pela **engenharia social**: criar urgência, medo ou confiança para que a vítima aja sem pensar.

Por isso, a melhor defesa não é apenas tecnológica — é **educação e atenção aos detalhes**. Esse foi o principal motivador do projeto: transformar o aprendizado sobre phishing em algo prático e memorável.

---

## Como o jogo funciona

O jogo é dividido em **5 fases**, cada uma trabalhando uma habilidade diferente de reconhecimento de golpes digitais. A pontuação é acumulada ao longo das fases, e ao final o jogador recebe um certificado de conclusão.

> *[Espaço para print da tela inicial / menu do jogo]*

---

### Fase 1 — Caixa de Entrada

**O que é:** uma simulação de caixa de e-mail real, no estilo Gmail/Outlook, com 20 e-mails no total — sendo 19 legítimos e apenas 1 de phishing. O jogador precisa abrir cada e-mail, analisar remetente, assunto e conteúdo, e decidir se é "Seguro" ou "Phishing".

**Por que é útil:** essa é a situação mais comum do dia a dia. A fase treina o olhar para os detalhes que costumam passar despercebidos, como domínios de e-mail levemente alterados, tom de urgência exagerado e pedidos de dados sensíveis.

> *[Espaço para print da lista de e-mails]*
> *[Espaço para print de um e-mail aberto sendo analisado]*
> *[Espaço para print do feedback final da fase, explicando os sinais do e-mail de phishing]*

---

### Fase 2 — Detetive de Links

**O que é:** o jogador vê vários links como apareceriam em e-mails reais (texto de âncora) e precisa avaliar se o destino real do link é seguro ou suspeito, comparando o texto exibido com a URL de destino.

**Por que é útil:** um dos truques mais usados em phishing é disfarçar um link malicioso atrás de um texto confiável. Essa fase ensina a nunca confiar apenas no texto do link, e sim checar para onde ele realmente aponta antes de clicar.

> *[Espaço para print de um link sendo analisado]*
> *[Espaço para print do feedback explicando por que o link era seguro ou suspeito]*

---

### Fase 3 — Página de Login: Real ou Falsa?

**O que é:** o jogador compara pares de telas de login (uma legítima e uma falsa) e precisa identificar qual é a verdadeira, observando detalhes como URL na barra de endereço, presença de HTTPS/cadeado, logotipo e erros de digitação.

**Por que é útil:** depois que a vítima clica no link de um e-mail de phishing, ela geralmente cai em uma página de login clonada. Essa fase treina o olhar crítico para identificar sites falsificados antes de digitar qualquer senha.

> *[Espaço para print do par de telas de login]*
> *[Espaço para print do feedback com as diferenças destacadas]*

---

### Fase 4 — Tomada de Decisão

**O que é:** um cenário narrativo, no estilo "escolha sua aventura", em que o jogador recebe uma mensagem urgente simulando phishing e precisa escolher entre diferentes ações (clicar no link, ligar para o número oficial, ignorar, encaminhar para a TI, etc.). Cada escolha leva a uma consequência diferente.

**Por que é útil:** phishing não é só sobre reconhecer um e-mail falso, mas também sobre **como agir** diante da pressão. Essa fase simula a tomada de decisão em tempo real, reforçando qual é o comportamento mais seguro.

> *[Espaço para print de uma tela de decisão]*
> *[Espaço para print de uma consequência de escolha errada]*

---

### Fase 5 — Quiz Final e Certificado

**O que é:** um quiz de múltipla escolha com perguntas sobre phishing, engenharia social e boas práticas de segurança digital. Ao final, o jogador recebe uma pontuação total (somando todas as fases) e um certificado de conclusão personalizado com o nome digitado.

**Por que é útil:** consolida todo o conteúdo aprendido nas fases anteriores de forma objetiva, e o certificado funciona como um incentivo simbólico de conclusão — reforçando a sensação de aprendizado completo.

> *[Espaço para print do quiz]*
> *[Espaço para print do certificado final]*

---

## Funcionalidades técnicas

| Função | Descrição | Utilidade |
|---|---|---|
| **Sistema de pontuação acumulada** | Soma os acertos de todas as 5 fases em uma pontuação única, exibida no topo da tela | Permite acompanhar o desempenho geral e cria senso de progressão |
| **Feedback imediato** | Após cada resposta, o jogo explica se estava certo ou errado e por quê | Transforma o erro em aprendizado, em vez de apenas penalizar |
| **Telas de transição entre fases** | Mostra a fase concluída e a pontuação parcial antes de avançar | Ajuda o jogador a entender seu progresso dentro do jogo |
| **Simulação de URLs reais vs. falsas** | Compara o texto exibido de um link com seu destino real | Ensina a prática de verificação de links, uma das defesas mais eficazes contra phishing |
| **Cenário de decisão ramificado** | Diferentes escolhas levam a diferentes consequências narradas | Simula situações de pressão psicológica usadas em golpes reais |
| **Geração de certificado personalizado** | Campo de texto para o nome do jogador, gerando um certificado com a nota final | Funciona como fechamento gamificado da experiência |
| **Checklist final de segurança** | Resumo com as principais dicas para identificar phishing, exibido ao final do jogo | Serve como material de consulta rápida, mesmo depois do jogo |

---

## Objetivo educacional

Mais do que um jogo, esse projeto busca simular, de forma segura e controlada, o tipo de decisão que qualquer pessoa pode enfrentar ao abrir sua caixa de e-mail. A ideia é que, ao errar dentro do jogo, o jogador aprenda a acertar na vida real — sem o risco de ter dados roubados por um golpe verdadeiro.

---

## Tecnologias utilizadas

- **HTML5** — estrutura das telas e conteúdo
- **CSS3** — estilização da interface, simulando um cliente de e-mail real
- **JavaScript (Vanilla)** — lógica do jogo, pontuação, navegação entre fases e feedback

Todo o projeto foi desenvolvido sem dependências externas, podendo ser executado diretamente no navegador, sem necessidade de servidor.

---
