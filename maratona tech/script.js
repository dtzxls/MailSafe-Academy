/* ====================================================
   MAILSAFE ACADEMY — JavaScript Principal
   Organizado por: Estado global → Dados → Fases → UI
==================================================== */

// ============================================================
// ESTADO GLOBAL DO JOGO
// ============================================================
const GameState = {
  playerName: 'Jogador',
  totalScore: 0,
  currentScreen: 'start',
  nextPhase: 1,
  resultPhase: 0,
  phaseScores: { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 },
  p1CurrentEmail: null,
  p1Classified: {},
  p1EmailOrder: [],
  p2Answered: {},
  p3CurrentPair: 0,
  p3Score: 0,
  p3ResultShown: false,
  p4Step: 0,
  p4Score: 0,
  p4ResultShown: false,
  p5Current: 0,
  p5Score: 0,
  p5ResultShown: false,
};

// ============================================================
// DADOS — FASE 1: 20 E-MAILS (19 legítimos + 1 phishing)
// A cada partida são sorteados 5 legítimos + 1 phishing fixo.
// ============================================================
const P1_LEGIT_COUNT = 7;
const P1_PHISH_COUNT = 3;
const EMAILS = [
  { id: 1, isPhishing: false, from: 'NuPay <noreply@nupay.com.br>', subject: 'Seu extrato de julho chegou!', date: 'Seg, 28 Jul 2025, 09:14', preview: 'Olá! Seu extrato do mês de julho já está disponível.', body: `Olá, usuário!\n\nSeu extrato do mês de julho de 2025 já está disponível no app NuPay.\n\nResumo do mês:\n  • Total de entradas: R$ 4.200,00\n  • Total de saídas:  R$ 1.843,50\n  • Saldo atual:      R$ 2.356,50\n\nPara ver o extrato completo, acesse o aplicativo NuPay ou o site oficial em www.nupay.com.br.\n\nDúvidas? Nosso chat está disponível 24h dentro do app.\n\nAbraços,\nEquipe NuPay` },
  { id: 2, isPhishing: false, from: 'AmazoShop <pedidos@amazoshop.com.br>', subject: 'Seu pedido #AS-88271 foi enviado!', date: 'Seg, 28 Jul 2025, 10:02', preview: 'Boas notícias! Seu pedido acabou de sair para entrega.', body: `Olá!\n\nÓtima notícia! Seu pedido #AS-88271 foi enviado e está a caminho.\n\nProduto: Fone de Ouvido Bluetooth Pro X3\nTransportadora: Rápida Entregas\nPrevisão: até 30/07/2025\n\nPara rastrear, acesse sua conta em www.amazoshop.com.br/meus-pedidos.\n\nObrigado por comprar conosco!\nAmazoShop` },
  { id: 3, isPhishing: false, from: 'Recursos Humanos <rh@empresa.com.br>', subject: 'Comunicado: Ponto eletrônico — atualização de sistema', date: 'Seg, 28 Jul 2025, 08:30', preview: 'Informamos que o sistema de ponto eletrônico passará por manutenção.', body: `Equipe,\n\nInformamos que o sistema de ponto eletrônico passará por manutenção programada no próximo sábado, 02/08/2025, das 00h às 06h.\n\nDurante este período, o acesso ao portal de RH estará temporariamente indisponível.\n\nRecomendamos que todos registrem pendências antes do horário de manutenção.\n\nQualquer dúvida, entre em contato com o RH pelo ramal 1234 ou pelo e-mail rh@empresa.com.br.\n\nAtenciosamente,\nDepartamento de Recursos Humanos` },
  { id: 4, isPhishing: false, from: 'StreamFlix <cobranca@streamflix.com.br>', subject: 'Fatura de julho: R$ 39,90 gerada', date: 'Dom, 27 Jul 2025, 20:00', preview: 'Sua fatura mensal foi gerada automaticamente.', body: `Olá, assinante!\n\nSua fatura referente ao mês de julho de 2025 foi gerada:\n\nPlano: Premium (4 telas)\nValor: R$ 39,90\nVencimento: 05/08/2025\nPagamento: Débito automático no cartão cadastrado ****4412\n\nNão é necessária nenhuma ação da sua parte.\n\nAcesse streamflix.com.br para gerenciar sua assinatura.\n\nStreamFlix — entretenimento sem limites.` },
  { id: 5, isPhishing: false, from: 'Instagram <security@mail.instagram.com>', subject: 'Novo login na sua conta Instagram', date: 'Dom, 27 Jul 2025, 19:45', preview: 'Detectamos um novo login a partir de um dispositivo desconhecido.', body: `Olá!\n\nDetectamos um novo login na sua conta do Instagram.\n\nDispositivo: iPhone 14\nLocal aproximado: São Paulo, SP, Brasil\nData/hora: 27/07/2025 às 19:40\n\nSe foi você, pode ignorar este e-mail com segurança.\n\nSe não foi você, acesse www.instagram.com imediatamente, vá em Configurações > Segurança > Atividade de Login e encerre as sessões desconhecidas.\n\nInstagram — da Meta` },
  { id: 6, isPhishing: false, from: 'Carlos Mendes <carlos.mendes@colega.com>', subject: 'Re: Apresentação de sexta-feira', date: 'Dom, 27 Jul 2025, 17:22', preview: 'Oi! Consegui revisar os slides. Deixa eu te mandar o feedback.', body: `Oi!\n\nConsegui revisar os slides que você mandou. Ficaram ótimos! Só acho que o slide 7 poderia ter um gráfico um pouco maior pra facilitar a visualização durante a apresentação.\n\nAh, confirma pra mim: a reunião ainda é na sexta às 14h na sala 3, né? Preciso avisar o pessoal do meu time.\n\nAbraços,\nCarlos` },
  { id: 7, isPhishing: false, from: 'Banco Vitta <noreply@bancovitta.com.br>', subject: 'Comunicado sobre atualização de tarifas', date: 'Sáb, 26 Jul 2025, 14:10', preview: 'Informamos que as taxas de serviço serão atualizadas a partir de agosto.', body: `Prezado(a) cliente,\n\nInformamos que a partir de 01/08/2025, as tarifas dos nossos serviços serão atualizadas conforme regulamentação do Banco Central do Brasil.\n\nAs principais alterações:\n  • Transferência TED: isenta para clientes com conta ativa há mais de 12 meses\n  • Emissão de boleto: R$ 2,50 por boleto acima de 3 por mês\n\nPara mais informações, acesse: www.bancovitta.com.br/tarifas\n\nNão é necessária nenhuma ação da sua parte.\n\nAtenciosamente,\nBanco Vitta` },
  { id: 8, isPhishing: false, from: 'LinkedIn <messages-noreply@linkedin.com>', subject: 'Ana Luiza quer se conectar com você', date: 'Sáb, 26 Jul 2025, 11:30', preview: 'Ana Luiza Ferreira quer fazer parte da sua rede profissional.', body: `Olá!\n\nAna Luiza Ferreira quer se conectar com você no LinkedIn.\n\nAna Luiza Ferreira\nGerente de Projetos na TechCorp Brasil\nSão Paulo, SP\n\nPara aceitar o convite, acesse seu LinkedIn em www.linkedin.com/notifications/.\n\nLinkedIn` },
  { id: 9, isPhishing: false, from: 'FestaCon 2025 <eventos@festacon.com.br>', subject: 'Seu ingresso para FestaCon 2025 foi confirmado!', date: 'Sex, 25 Jul 2025, 16:55', preview: 'Ingresso confirmado! Veja os detalhes do evento.', body: `Parabéns!\n\nSeu ingresso para FestaCon 2025 foi confirmado com sucesso!\n\nDetalhes:\n  Evento: FestaCon 2025 — Edição de Aniversário\n  Data: 15 de agosto de 2025\n  Local: Parque de Exposições do Anhembi, São Paulo\n  Tipo: Pulseira VIP (1 dia)\n  Código: FC2025-VIP-004892\n\nGuarde este e-mail. Seu código será solicitado na entrada.\n\nNos vemos lá!\nEquipe FestaCon` },
  { id: 10, isPhishing: false, from: 'Shopee <no-reply@shopee.com.br>', subject: 'Avalie sua compra recente', date: 'Sex, 25 Jul 2025, 09:00', preview: 'Seu pedido foi entregue! Conte para outros compradores o que achou.', body: `Olá!\n\nSeu pedido #SPE-1920384 foi entregue. Que tal deixar uma avaliação?\n\nProduto: Suporte Articulado para Monitor 27"\nVendedor: TechGadgets Store\n\nSua opinião ajuda outros compradores a tomar a melhor decisão.\n\nPara avaliar, acesse shopee.com.br ou abra o aplicativo, vá em "Meus Pedidos" e clique em "Avaliar".\n\nObrigado!\nShopee` },
  { id: 11, isPhishing: false, from: 'Portal Gov <noreply@portalcidadao.gov.br>', subject: 'Confirme seu cadastro no Portal do Cidadão', date: 'Qui, 24 Jul 2025, 15:22', preview: 'Seu cadastro foi recebido! Confirme seu e-mail para ativá-lo.', body: `Olá!\n\nRecebemos seu pedido de cadastro no Portal do Cidadão.\n\nPara ativar seu acesso, confirme seu endereço de e-mail. O link expira em 48 horas.\n\nSe você não solicitou este cadastro, simplesmente ignore este e-mail.\n\nLink de confirmação:\nportalcidadao.gov.br/confirmar?token=eyJhbGci...\n\nGoverno Federal do Brasil` },
  { id: 12, isPhishing: false, from: 'Mariana Costa <mariana.costa@gmail.com>', subject: 'Fotos da confraternização', date: 'Qui, 24 Jul 2025, 21:05', preview: 'Oi! Consegui organizar todas as fotos da confraternização.', body: `Oi!\n\nConsegui organizar todas as fotos da confraternização de ontem. Ficaram umas 200, mas selecionei as melhores — umas 60 haha.\n\nSubi tudo no Google Fotos e compartilhei com o e-mail de vocês. Dá uma olhada!\n\nAvisa se não chegou o convite de acesso, que eu reenvio.\n\nBeijos,\nMari` },
  { id: 13, isPhishing: false, from: 'Correios <rastreamento@correios.com.br>', subject: 'Atualização de rastreamento: objeto encaminhado', date: 'Qua, 23 Jul 2025, 08:44', preview: 'Seu objeto foi encaminhado para a unidade de distribuição.', body: `Olá!\n\nInformações de rastreamento do seu objeto:\n\nCódigo: BR748291038BR\nStatus: Encaminhado para unidade de distribuição\nLocal: CTT São Paulo — Unidade de Tratamento Leste\nData: 23/07/2025 às 08:30\n\nPrevisão de entrega: 25/07/2025\n\nAcompanhe em: www.correios.com.br/rastreamento\n\nCorreios` },
  { id: 14, isPhishing: false, from: 'Duolingo <hello@duolingo.com>', subject: 'Você está em uma sequência de 30 dias!', date: 'Ter, 22 Jul 2025, 18:00', preview: 'Incrível! Você manteve sua sequência de estudos por 30 dias.', body: `Uau!\n\nVocê chegou a uma sequência de 30 dias de estudos consecutivos no Duolingo!\n\nEssa dedicação é incrível. Continue assim e você vai dominar o idioma antes do que imagina.\n\nContinue estudando hoje:\nduolingo.com/learn\n\nDuolingo` },
  { id: 15, isPhishing: false, from: 'GitHub <noreply@github.com>', subject: '[GitHub] Alerta de segurança: dependência vulnerável', date: 'Ter, 22 Jul 2025, 09:15', preview: 'Uma dependência do repositório apresenta vulnerabilidade crítica.', body: `Alerta de Segurança do GitHub\n\nRepositório: seu-usuario/meu-projeto\n\nDetectamos que o pacote lodash@4.17.15 possui uma vulnerabilidade conhecida (CVE-2021-23337, severidade: Alta).\n\nRecomendamos atualizar para a versão 4.17.21 ou superior.\n\nPara mais detalhes:\ngithub.com/seu-usuario/meu-projeto/security/dependabot\n\nGitHub Security` },
  { id: 16, isPhishing: false, from: 'Netflix <info@account.netflix.com>', subject: 'Seu plano foi renovado com sucesso', date: 'Seg, 21 Jul 2025, 00:01', preview: 'Sua assinatura Netflix foi renovada. Confira os detalhes.', body: `Olá!\n\nSua assinatura Netflix foi renovada com sucesso.\n\nPlano: Standard\nValor cobrado: R$ 34,90\nData da cobrança: 21/07/2025\nCartão: Terminado em ****7823\n\nPara gerenciar sua conta, acesse www.netflix.com/account.\n\nAproveite!\nNetflix` },
  { id: 17, isPhishing: false, from: 'TI Corporativo <ti@empresa.com.br>', subject: 'Atualização obrigatória do antivírus — prazo: 31/07', date: 'Seg, 21 Jul 2025, 10:00', preview: 'Por favor, atualize o antivírus corporativo até 31 de julho.', body: `Equipe,\n\nA equipe de TI solicita que todos os colaboradores atualizem o antivírus corporativo até o dia 31/07/2025.\n\nComo atualizar:\n1. Abra o Endpoint Protection no seu computador\n2. Clique em "Verificar Atualizações"\n3. Aguarde a instalação (cerca de 5 minutos)\n4. Reinicie o computador quando solicitado\n\nDúvidas? Portal de TI: ti.empresa.com.br/chamados\n\nGrato pela colaboração,\nEquipe de Tecnologia da Informação` },
  { id: 18, isPhishing: false, from: 'Mercado Pago <noreply@mercadopago.com>', subject: 'Você recebeu uma transferência de R$ 250,00', date: 'Dom, 20 Jul 2025, 13:22', preview: 'Paulo Henrique te enviou R$ 250,00 pelo Mercado Pago.', body: `Você recebeu uma transferência!\n\nPaulo Henrique Souza enviou R$ 250,00 para você.\n\nData: 20/07/2025 às 13:20\nMensagem: "Referente ao jantar de sábado"\n\nO dinheiro já está disponível na sua conta Mercado Pago.\n\nPara usar o saldo ou transferir para o banco, acesse o aplicativo Mercado Pago.\n\nMercado Pago` },
  { id: 19, isPhishing: false, from: 'Zoom <no-reply@zoom.us>', subject: 'Lembrete: Reunião começa em 30 minutos', date: 'Sex, 18 Jul 2025, 09:30', preview: 'Sua reunião "Alinhamento Semanal Q3" começa às 10h00.', body: `Lembrete de reunião\n\nTítulo: Alinhamento Semanal Q3\nHorário: 10:00 — 11:00 (Horário de Brasília)\nOrganizador: Juliana Ramos\n\nPara entrar na reunião:\nzoom.us/j/92847561028\nSenha: XkP4mN\n\nZoom` },
  {
    id: 20, isPhishing: true,
    from: 'Banco Vitta Segurança <seguranca@bancovitta-verificacao.xyz.ru>',
    subject: 'URGENTE: Sua conta será BLOQUEADA em 2 horas!!',
    date: 'Qui, 24 Jul 2025, 23:59',
    preview: 'Detectamos atividade suspeita. Confirme seus dados AGORA para evitar bloqueio.',
    body: `Prezado(a) Cliente,\n\nDetectamos atividade INCOMUM em sua conta Banco Vitta. Por questão de segurança, sua conta será BLOQUEADA em 2 horas caso não confirme seus dados cadastrais.\n\nPara EVITAR o bloqueio, clique no link abaixo AGORA:\n\nhttp://bancovitta-verificacao.xyz.ru/seguranca/confirmar-dados\n\nVocê precisará informar:\n  • CPF e data de nascimento\n  • Senha de 6 dígitos\n  • Token de segurança\n  • Número do cartão completo\n\nEste é um procedimento OBRIGATÓRIO determinado pelo Banco Central. A falha em cumprir resultará em suspensão permanente da conta.\n\nAtenciosamente,\nDepartamento de Segurança Bancária — Banco Vitta S.A.\nSAC: (11) 9 9999-8888 (não é o número oficial)`,
    phishingSigns: [
      'Domínio do remetente falso: "bancovitta-verificacao.xyz.ru" (TLD .ru é russo, não brasileiro)',
      'Link de destino com domínio diferente do oficial: xyz.ru em vez de bancovitta.com.br',
      'Urgência artificial: "bloqueada em 2 horas" para pressionar decisões impulsivas',
      'Pedido de dados sensíveis: senha, token e cartão — bancos NUNCA pedem isso por e-mail',
      'Uso excessivo de maiúsculas e pontuação repetida (!!!) — táticas de alarmismo',
      'Alegação falsa de autoridade: "determinado pelo Banco Central" sem comprovação',
      'Número de SAC diferente do número oficial do banco'
    ]
  },
  {
    id: 21, isPhishing: true,
    from: 'StreamFlix Suporte <conta@streamflix-conta-verificacao.top>',
    subject: 'IMPORTANTE: Sua conta StreamFlix será suspensa',
    date: 'Sex, 18 Jul 2025, 22:10',
    preview: 'Detectamos um problema no pagamento. Atualize seus dados AGORA.',
    body: `Olá, assinante,

Detectamos um problema com a forma de pagamento da sua conta. Para evitar a SUSPENSÃO IMEDIATA do seu acesso, atualize seus dados cadastrais clicando no link abaixo:

http://streamflix-conta-verificacao.top/atualizar-pagamento

Você precisará informar:
  • Número completo do cartão
  • Código de segurança (CVV)
  • Data de validade
  • Senha da conta

A não atualização em até 24 horas resultará no cancelamento definitivo da assinatura.

Atenciosamente,
Equipe de Cobrança — StreamFlix
Contato: (11) 4002-8922 (número não oficial)`,
    phishingSigns: [
      'Domínio do remetente falso: "streamflix-conta-verificacao.top" (TLD .top, não o oficial .com.br)',
      'Pedido de dados do cartão: número completo, CVV e validade — serviço legítimo NUNCA pede CVV por e-mail',
      'Urgência artificial: "suspensão em 24 horas" para pressionar ação imediata',
      'Link HTTP sem HTTPS e com domínio diferente do oficial streamflix.com.br',
      'Número de telefone de contato diferente do suporte oficial'
    ]
  },
  {
    id: 22, isPhishing: true,
    from: 'AmazoShop Rastreio <entrega@amazoshop-pedido-rastreio.net>',
    subject: 'Seu pacote está RETIDO na alfândega — taxa de R$ 4,99',
    date: 'Ter, 22 Jul 2025, 07:40',
    preview: 'Para liberar seu pacote, pague uma pequena taxa de liberação.',
    body: `Olá,

Informamos que o seu pedido foi retido na alfândega brasileira por falta de taxa de liberação.

Valor da taxa: R$ 4,99
Código do pedido: #AS-88192

Para liberar o pacote, efetue o pagamento da taxa AGORA pelo link abaixo:

https://amazoshop-pedido-rastreio.net/pagamento-taxa

Caso não pague em até 12 horas, o pacote será devolvido ao remetente e você perderá o produto.

Atenciosamente,
Central de Entregas — AmazoShop`,
    phishingSigns: [
      'Domínio do remetente falso: "amazoshop-pedido-rastreio.net" em vez do oficial amazoshop.com.br',
      'Taxa fictícia de "liberação alfandegária" — lojas não cobram taxas por e-mail com link',
      'Pressão de tempo: 12 horas para pagamento — tática clássica de urgência',
      'Link de pagamento para domínio desconhecido, sem relação com o site oficial',
      'Endereço do remetente com domínio .net genérico, nada a ver com o serviço'
    ]
  }
];

// ============================================================
// DADOS — FASE 2: 9 LINKS (4 seguros, 5 suspeitos)
// ============================================================
const LINKS_DATA = [
  { id: 1, isSafe: true, anchorText: 'Acessar minha conta NuPay', realUrl: 'https://nupay.com.br/minha-conta', sender: 'NuPay <no-reply@nupay.com.br>', subject: 'Sua conta está pronta para uso', body: 'Olá, bem-vindo ao NuPay!<br>Para concluir o cadastro e acessar sua conta, clique no link abaixo:<br><a>Acessar minha conta NuPay</a>', explanation: 'Seguro: O domínio é exatamente "nupay.com.br" com HTTPS. O caminho faz sentido contextualmente.' },
  { id: 2, isSafe: false, anchorText: 'Confirmar seus dados no Banco Vitta', realUrl: 'http://bancovitta-acesso.top/confirmar-dados-urgente', sender: 'Banco Vitta <seguranca@bancovitta-acesso.top>', subject: 'URGENTE: Confirme seus dados hoje', body: 'Detectamos dados desatualizados na sua conta.<br>Para evitar o bloqueio, confirme agora:<br><a>Confirmar seus dados no Banco Vitta</a>', explanation: 'Suspeito: A URL real aponta para "bancovitta-acesso.top" — um domínio completamente diferente com TLD incomum (.top). O texto do link mencionava o Banco Vitta, mas o destino é outro site.' },
  { id: 3, isSafe: false, anchorText: 'Rastrear meu pedido AmazoShop', realUrl: 'https://amazoshop.com.br.rastreio-entrega.xyz/pedido/88271', sender: 'Entregas AmazoShop <entregas@rastreio-entrega.xyz>', subject: 'Seu pedido #88271 não pôde ser entregue', body: 'Tentamos entregar seu pedido, mas não conseguimos.<br>Reagende a entrega informando seus dados:<br><a>Rastrear meu pedido AmazoShop</a>', explanation: 'Suspeito: O domínio real é "rastreio-entrega.xyz" — "amazoshop.com.br" é apenas um subdomínio falso. Técnica chamada de subdomínio enganoso (subdomain spoofing).' },
  { id: 4, isSafe: true, anchorText: 'Verificar meu extrato StreamFlix', realUrl: 'https://streamflix.com.br/conta/extrato', sender: 'StreamFlix <conta@streamflix.com.br>', subject: 'Seu extrato do mês já está disponível', body: 'Olá! O extrato da sua fatura mensal já está pronto.<br>Consulte acessando:<br><a>Verificar meu extrato StreamFlix</a>', explanation: 'Seguro: O domínio "streamflix.com.br" é idêntico no destino real, com HTTPS e caminho coerente.' },
  { id: 5, isSafe: false, anchorText: 'Clique para reativar seu cadastro', realUrl: 'https://bit.ly/3xKp2mG', sender: 'Central de Atendimento <aviso@bit.ly>', subject: 'Reativação de cadastro necessária', body: 'Seu cadastro está marcado para desativação.<br>Para mantê-lo ativo, reative agora:<br><a>Clique para reativar seu cadastro</a>', explanation: 'Suspeito: A URL real é um encurtador de link (bit.ly). Encurtadores ocultam o destino real e são frequentemente usados em phishing para disfarçar URLs maliciosas.' },
  { id: 6, isSafe: false, anchorText: 'Acesse sua conta do Mercado Pago agora', realUrl: 'http://mercad0pago.com.br/login', sender: 'Mercado Pago <suporte@mercad0pago.com.br>', subject: 'Confirme sua conta para continuar vendendo', body: 'Precisamos confirmar seus dados para manter suas vendas ativas.<br>Acesse e autentique:<br><a>Acesse sua conta do Mercado Pago agora</a>', explanation: 'Suspeito: Typosquatting! A URL usa "mercad0pago" com o número zero no lugar da letra "o". Além disso, usa HTTP sem criptografia. Domínio falsificado com troca de caractere visual.' },
  { id: 7, isSafe: true, anchorText: 'Acessar configurações de segurança do Instagram', realUrl: 'https://www.instagram.com/settings/security', sender: 'Instagram <security@mail.instagram.com>', subject: 'Nova opção de segurança disponível', body: 'Olá! Adicionamos novos recursos de proteção.<br>Revise suas configurações aqui:<br><a>Acessar configurações de segurança do Instagram</a>', explanation: 'Seguro: O domínio "instagram.com" é oficial e usa HTTPS. O "www." no início não altera o domínio principal.' },
  { id: 8, isSafe: false, anchorText: 'Receber meu prêmio — 2º sorteio NuPay', realUrl: 'https://nupay-premios-sorteio.ru/resgatar?id=921840', sender: 'Sorteio NuPay <premios@sorteionupay.ru>', subject: 'PARABÉNS! Você foi sorteado', body: 'Você ganhou R$ 5.000 no 2º sorteio!<br>Resgate seu prêmio antes que expire:<br><a>Receber meu prêmio — 2º sorteio NuPay</a>', explanation: 'Suspeito: TLD .ru (russo) sem relação com empresa brasileira. O subdomínio "nupay" está em um domínio estranho. NuPay nunca anunciaria prêmios por e-mail desta forma.' },
  { id: 9, isSafe: true, anchorText: 'Ver alerta de segurança no GitHub', realUrl: 'https://github.com/security', sender: 'GitHub <security@github.com>', subject: 'Alerta de segurança na sua conta', body: 'Registramos um alerta de segurança recente.<br>Confira os detalhes:<br><a>Ver alerta de segurança no GitHub</a>', explanation: 'Seguro: Domínio oficial "github.com" com HTTPS e caminho direto. Nenhum subdomínio ou TLD estranho.' }
];

// ============================================================
// DADOS — FASE 3: 4 PARES DE LOGIN
// ============================================================
const LOGIN_PAIRS = [
  {
    id: 1, context: 'Banco Vitta — qual é a página legítima?', realIndex: 0,
    options: [
      { label: 'Opção A', isReal: true, browserUrl: 'https://bancovitta.com.br/login', hasLock: true, logoText: 'Banco Vitta', logoColor: '#1d4ed8', subtitle: 'Internet Banking — Acesso Seguro', subtitleColor: '#6b7280', field1: 'CPF ou Agência/Conta', field2: 'Senha de 6 dígitos', btnColor: '#1d4ed8', btnText: 'Entrar', extraText: null, diffs: [] },
      { label: 'Opção B', isReal: false, browserUrl: 'http://bancovitta-login.xyz/acesso', hasLock: false, logoText: 'BancoVitta', logoColor: '#1e3a8a', subtitle: 'Acesso a sua conta | Segurança Total', subtitleColor: '#374151', field1: 'CPF / Conta', field2: 'Senha (6 digítos)', btnColor: '#1e40af', btnText: 'Acessar Conta', extraText: 'Confirme seu token após o login', diffs: [
        { bad: true, text: 'URL usa HTTP sem criptografia e domínio falso: "bancovitta-login.xyz"' },
        { bad: true, text: 'Sem cadeado de segurança (conexão não é criptografada)' },
        { bad: true, text: 'Logo sem espaço: "BancoVitta" (falta o espaço do original)' },
        { bad: true, text: 'Erro de digitação: "digítos" com acento incorreto' },
        { bad: true, text: 'Pedido de token já na tela inicial — comportamento suspeito' }
      ]}
    ]
  },
  {
    id: 2, context: 'NuPay — você clicou em um link do e-mail. Qual é o site verdadeiro?', realIndex: 1,
    options: [
      { label: 'Opção A', isReal: false, browserUrl: 'https://nupay.com.nupay-seguro.net/login', hasLock: true, logoText: 'NuPay', logoColor: '#7c3aed', subtitle: 'Área do cliente | Acesso Seguro', subtitleColor: '#6b7280', field1: 'E-mail ou CPF', field2: 'Sua senha', btnColor: '#7c3aed', btnText: 'Entrar', extraText: null, diffs: [
        { bad: true, text: 'Domínio real é "nupay-seguro.net" — NuPay aparece apenas como subdomínio falso' },
        { bad: true, text: 'Apesar do cadeado (HTTPS), o domínio registrado não pertence à NuPay' },
        { bad: true, text: 'Lição: cadeado não garante que o site é legítimo — fraudadores obtêm SSL facilmente' }
      ]},
      { label: 'Opção B', isReal: true, browserUrl: 'https://app.nupay.com.br/login', hasLock: true, logoText: 'NuPay', logoColor: '#7c3aed', subtitle: 'Acesso à sua conta', subtitleColor: '#6b7280', field1: 'E-mail ou CPF', field2: 'Senha', btnColor: '#7c3aed', btnText: 'Entrar', extraText: null, diffs: [] }
    ]
  },
  {
    id: 3, context: 'StreamFlix — qual tela de login é a original?', realIndex: 0,
    options: [
      { label: 'Opção A', isReal: true, browserUrl: 'https://www.streamflix.com.br/login', hasLock: true, logoText: 'StreamFlix', logoColor: '#e50914', subtitle: 'Entre para continuar assistindo', subtitleColor: '#6b7280', field1: 'E-mail', field2: 'Senha', btnColor: '#e50914', btnText: 'Entrar', extraText: null, diffs: [] },
      { label: 'Opção B', isReal: false, browserUrl: 'https://streamf1ix.com/login-conta', hasLock: true, logoText: 'StreamFl1x', logoColor: '#cc0812', subtitle: 'Entre para continuar | Atenção: sua conta expira hoje!', subtitleColor: '#dc2626', field1: 'E-mail cadastrado', field2: 'Senha', btnColor: '#cc0812', btnText: 'Entrar Agora', extraText: '⏰ Sua assinatura vence em 2 horas!', diffs: [
        { bad: true, text: 'Typosquatting: "streamf1ix" usa o número 1 no lugar de "l" (L minúsculo)' },
        { bad: true, text: 'Domínio .com em vez de .com.br — empresa brasileira usaria domínio nacional' },
        { bad: true, text: 'Logo usa "Fl1x" com número 1 no lugar da letra L' },
        { bad: true, text: 'Urgência artificial: "sua conta expira hoje!" — típico de phishing' }
      ]}
    ]
  },
  {
    id: 4, context: 'AmazoShop — qual página de login é a verdadeira?', realIndex: 1,
    options: [
      { label: 'Opção A', isReal: false, browserUrl: 'http://amazoshop-brasil.com/conta/login', hasLock: false, logoText: 'AmazoShop', logoColor: '#ff9900', subtitle: 'Acesse sua conta para continuar', subtitleColor: '#6b7280', field1: 'E-mail ou CPF', field2: 'Senha', btnColor: '#ff9900', btnText: 'Entrar', extraText: 'Digite seu cartão para verificar identidade', diffs: [
        { bad: true, text: 'HTTP sem HTTPS — conexão totalmente insegura, dados não criptografados' },
        { bad: true, text: 'Sem cadeado — dados transmitidos sem criptografia' },
        { bad: true, text: 'Domínio "amazoshop-brasil.com" não é o oficial "amazoshop.com.br"' },
        { bad: true, text: 'Pede número do cartão no login — completamente desnecessário e suspeito' }
      ]},
      { label: 'Opção B', isReal: true, browserUrl: 'https://www.amazoshop.com.br/ap/signin', hasLock: true, logoText: 'AmazoShop', logoColor: '#ff9900', subtitle: 'Faça login para continuar comprando', subtitleColor: '#6b7280', field1: 'E-mail ou número de celular', field2: 'Senha', btnColor: '#ff9900', btnText: 'Continuar', extraText: null, diffs: [] }
    ]
  }
];

// ============================================================
// DADOS — FASE 4: CENÁRIO NARRATIVO (4 etapas)
// ============================================================
const PHASE4_STEPS = [
  {
    id: 1, icon: '',
    message: `Você acabou de chegar ao trabalho e encontra este e-mail:\n\n<strong style="color:var(--warning)">Remetente:</strong> seguranca@banco-vitta-alertas.net\n<strong style="color:var(--warning)">Assunto:</strong>URGENTE: Acesso suspeito detectado — Bloqueio em 1 HORA\n\n"Detectamos um acesso não autorizado à sua conta Banco Vitta. Clique no link abaixo AGORA para confirmar sua identidade e evitar o bloqueio permanente da conta."\n\n<span class="fake-link">http://bancovitta-acesso.top/verificar-agora</span>\n\nO que você faz?`,
    choices: [
      { text: 'Clicar no link para resolver rápido — não quero perder acesso à conta', isCorrect: false, consequence: { type: 'bad', title: 'Você caiu no phishing!', text: 'Ao clicar no link, você foi redirecionado para uma página falsa que coletou suas credenciais. Em minutos, os atacantes acessaram sua conta. NUNCA clique em links urgentes de bancos por e-mail!' } },
      { text: 'Ligar para o número oficial do Banco Vitta (do site ou verso do cartão)', isCorrect: true, consequence: { type: 'good', title: 'Ação correta!', text: 'Ao ligar para o número oficial (buscado de forma independente), o banco confirmou que não enviou nenhum alerta. Era um phishing. Sua conta está segura!' } },
      { text: 'Ignorar e apagar o e-mail sem fazer nada', isCorrect: false, consequence: { type: 'neutral', title: 'Parcialmente correto', text: 'Apagar sem clicar foi certo, mas o ideal seria também reportar ao TI/segurança e ao banco, para que possam alertar outros clientes e investigar.' } },
      { text: 'Encaminhar para o departamento de TI/segurança', isCorrect: false, consequence: { type: 'neutral', title: 'Boa ideia, mas incompleta', text: 'Reportar ao TI é correto! Mas além disso, você deveria verificar com o banco (pelo número oficial) se há algum problema real na sua conta.' } }
    ]
  },
  {
    id: 2, icon: '',
    message: `Um colega te mandou esta mensagem no chat interno:\n\n<strong style="color:var(--warning)">[João_Colaborador]:</strong> "Ei! Precisa confirmar seu usuário de rede urgente — o sistema vai ser migrado e quem não confirmar perde o acesso ainda hoje:\n<span class="fake-link">bit.ly/acesso-rede-empresa</span>"\n\nVocê percebe que João raramente te manda mensagens assim. O que você faz?`,
    choices: [
      { text: 'Acessar o link, afinal é do meu colega de trabalho', isCorrect: false, consequence: { type: 'bad', title: 'Conta do colega comprometida!', text: 'A conta do João havia sido hackeada. O atacante usou o acesso dele para enviar phishing para os contatos internos. Você acabou de entregar suas credenciais corporativas aos criminosos.' } },
      { text: 'Ligar ou abordar o João pessoalmente para confirmar', isCorrect: true, consequence: { type: 'good', title: 'Perfeito!', text: 'Ao contatar o João diretamente, você descobriu que ele não enviou nenhuma mensagem. A conta estava comprometida. Você avisou o TI e impediu que outros colegas caíssem na armadilha!' } },
      { text: 'Ignorar a mensagem', isCorrect: false, consequence: { type: 'neutral', title: 'Seguro, mas incompleto', text: 'Você se protegeu ao não clicar. Porém, ao não reportar, o TI não ficou sabendo da conta comprometida do João, e outros colegas continuaram em risco.' } },
      { text: 'Reportar ao TI diretamente, sem clicar', isCorrect: false, consequence: { type: 'neutral', title: 'Muito bom!', text: 'Reportar ao TI é excelente! O único complemento: avisar o próprio João pessoalmente, pois ele pode não saber que a conta está comprometida.' } }
    ]
  },
  {
    id: 3, icon: '',
    message: `Você recebe um e-mail que parece ser do seu chefe:\n\n<strong style="color:var(--warning)">De:</strong> diretor.carvalho@empresa.com.br\n<strong style="color:var(--warning)">Assunto:</strong> Transferência urgente — CONFIDENCIAL\n\n"Preciso que você faça uma transferência de R$ 12.000 para o fornecedor abaixo HOJE. Estou em reunião e não posso ser interrompido. Confirme por e-mail quando fizer.\n\nBanco: 341, Ag: 0001, CC: 98271-3"\n\nO que você faz?`,
    choices: [
      { text: 'Realizar a transferência — é do meu chefe e parece urgente', isCorrect: false, consequence: { type: 'bad', title: 'Vítima de BEC (Business Email Compromise)!', text: 'Este é um ataque chamado BEC — o e-mail parecia legítimo mas era uma conta comprometida ou domínio levemente falsificado. R$ 12.000 foram transferidos para criminosos. SEMPRE confirme pedidos financeiros por voz!' } },
      { text: 'Ligar para o chefe no celular para confirmar', isCorrect: true, consequence: { type: 'good', title: 'Ação correta!', text: 'Ao ligar, seu chefe confirmou que não enviou nenhum e-mail. O endereço do atacante usava o domínio levemente diferente. Seu ceticismo evitou um prejuízo de R$ 12.000!' } },
      { text: 'Responder ao e-mail pedindo mais informações', isCorrect: false, consequence: { type: 'bad', title: 'Perigoso!', text: 'Ao responder ao e-mail, você confirmou ao atacante que o endereço é válido. O atacante pode aumentar a pressão. Nunca use o canal suspeito para verificação!' } },
      { text: 'Encaminhar para o TI e aguardar orientação', isCorrect: false, consequence: { type: 'neutral', title: 'Bom, mas poderia ser mais rápido', text: 'Reportar ao TI é correto! Mas ligar diretamente para seu chefe seria mais eficaz, pois confirma imediatamente se a solicitação é legítima.' } }
    ]
  },
  {
    id: 4, icon: '',
    message: `Você tentou entrar no sistema interno e uma mensagem apareceu:\n\n"Sua senha expirou! Crie uma nova senha agora para não perder o acesso.\n<span class="fake-link">intranet-empresa.resetsenha.top/nova-senha</span>"\n\nVocê não recebeu nenhum aviso anterior sobre expiração de senha. O que você faz?`,
    choices: [
      { text: 'Clicar no link e criar uma nova senha rapidamente', isCorrect: false, consequence: { type: 'bad', title: 'Suas credenciais foram roubadas!', text: 'A página era falsa. O domínio real era "resetsenha.top" — não pertence à empresa. Ao digitar a senha, você a entregou aos atacantes que agora têm acesso total ao sistema interno.' } },
      { text: 'Fechar a página e acessar o portal oficial de TI digitando o endereço manualmente', isCorrect: true, consequence: { type: 'good', title: 'Excelente!', text: 'Correto! Ao acessar o portal real da empresa diretamente, você verificou que sua senha NÃO havia expirado. Era uma página de phishing. Você reportou ao TI e o ataque foi neutralizado.' } },
      { text: 'Ligar para o suporte de TI para confirmar', isCorrect: true, consequence: { type: 'good', title: 'Também correto!', text: 'Ao contatar o TI, eles confirmaram que nenhum alerta de expiração foi enviado. A URL "resetsenha.top" não pertence à empresa. Seu ceticismo protegeu a rede corporativa!' } },
      { text: 'Ignorar e tentar logar normalmente mais tarde', isCorrect: false, consequence: { type: 'neutral', title: 'Parcialmente correto', text: 'Você se protegeu ao não clicar. Mas reportar imediatamente ao TI seria melhor, pois outros colegas podem estar recebendo a mesma tentativa de ataque.' } }
    ]
  }
];

// ============================================================
// DADOS — FASE 5: 10 PERGUNTAS DE QUIZ
// ============================================================
const QUIZ_QUESTIONS = [
  { q: 'Qual destes sinais é o mais característico de um e-mail de phishing?', options: ['A mensagem vem de um endereço de e-mail desconhecido', 'O e-mail cria urgência artificial e pede ação imediata com informações pessoais', 'O e-mail contém imagens e formatação rica', 'O e-mail foi enviado fora do horário comercial'], correct: 1, explanation: 'A combinação de urgência artificial com pedido de dados pessoais é o sinal mais clássico de phishing. Criminosos usam o medo de perder acesso ou de sofrer consequências para pressionar a vítima a agir sem pensar.' },
  { q: 'Você recebe um e-mail do "suporte@nubank.com.br-atendimento.net". O que isso indica?', options: ['O e-mail é legítimo, pois contém "nubank.com.br"', 'O domínio real é "br-atendimento.net" — "nubank.com.br" é apenas um subdomínio falso', 'O e-mail é do Nubank porque tem o nome correto', 'Impossível saber sem ver o conteúdo'], correct: 1, explanation: 'Em um endereço de e-mail, o domínio verdadeiro é o que aparece após o "@". Neste caso, é "nubank.com.br-atendimento.net". O fragmento "nubank.com.br" aparece como subdomínio para enganar.' },
  { q: 'Um site tem cadeado () e "https://". Isso significa que o site é confiável?', options: ['Sim, o cadeado garante que o site é legítimo e seguro', 'Sim, mas apenas para compras acima de R$ 100', 'Não necessariamente — HTTPS garante criptografia, mas não autenticidade do site', 'Não, HTTPS é raramente usado em sites reais'], correct: 2, explanation: 'HTTPS e o cadeado indicam que a comunicação é criptografada, mas NÃO garantem que o site seja legítimo. Criminosos também conseguem certificados SSL para sites falsos gratuitamente. Sempre verifique o domínio!' },
  { q: 'O que é "typosquatting"?', options: ['Um tipo de vírus que ataca digitadores', 'Registrar domínios parecidos com marcas famosas, substituindo letras (ex: "paypa1.com")', 'Um erro de digitação em documentos confidenciais', 'Spam enviado via aplicativos de mensagem'], correct: 1, explanation: 'Typosquatting é a prática de registrar domínios que imitam marcas conhecidas com pequenas alterações — trocando letras por números similares (l→1, o→0), adicionando hífens ou mudando o TLD — para enganar usuários desatentos.' },
  { q: 'Você recebe um e-mail do banco pedindo sua senha para "atualização cadastral". O que fazer?', options: ['Fornecer a senha, pois o banco pode precisar para verificação', 'Ligar para o banco no número do verso do cartão ou site oficial para confirmar', 'Responder ao e-mail pedindo mais informações antes de fornecer a senha', 'Fornecer apenas os 3 primeiros dígitos como precaução'], correct: 1, explanation: 'Bancos e instituições financeiras JAMAIS solicitam senhas por e-mail. Ao receber tal pedido, ligue para o número oficial da instituição (nunca o do e-mail) para confirmar. Responder ao e-mail suspeito também é perigoso.' },
  { q: 'O que caracteriza a engenharia social em ataques de phishing?', options: ['Uso de vírus para infectar computadores', 'Exploração de vulnerabilidades técnicas no servidor de e-mail', 'Manipulação psicológica da vítima para que ela mesma entregue informações ou acesso', 'Ataque físico a computadores e servidores'], correct: 2, explanation: 'Engenharia social é a manipulação psicológica de pessoas para que executem ações ou divulguem informações confidenciais. No phishing, isso se manifesta como urgência falsa, autoridade simulada, medo de punição ou recompensa atraente.' },
  { q: 'Qual TLD (extensão de domínio) deve gerar mais suspeita em e-mail de banco brasileiro?', options: ['.com.br', '.bank', '.xyz usada sem contexto óbvio', '.org'], correct: 2, explanation: 'TLDs incomuns como .xyz, .top, .ru, .cc fora de contexto são sinais de alerta. Um banco brasileiro legítimo normalmente usa .com.br. A extensão .xyz é frequentemente usada em campanhas de phishing por ser barata e fácil de registrar.' },
  { q: 'Qual é a melhor ação ao suspeitar de um e-mail corporativo suspeito no trabalho?', options: ['Abrir o anexo para confirmar se é real', 'Clicar no link para ver aonde leva, mas sem digitar dados', 'Reportar ao time de TI/segurança sem clicar em nenhum link ou abrir nenhum anexo', 'Apagar o e-mail imediatamente sem reportar'], correct: 2, explanation: 'O correto é reportar sem clicar em nada. Apagar sem reportar deixa o time de segurança no escuro. Clicar "apenas para ver" ainda pode explorar vulnerabilidades do navegador. A equipe de segurança precisa saber para proteger toda a organização.' },
  { q: 'O que é "spear phishing"?', options: ['Phishing enviado por SMS (também chamado de smishing)', 'Phishing altamente personalizado, direcionado a um indivíduo ou empresa específica', 'Um ataque de phishing que usa imagens em vez de texto', 'Phishing que acontece apenas em redes sociais'], correct: 1, explanation: 'Spear phishing é um ataque altamente direcionado, onde o criminoso pesquisa a vítima (nome, cargo, empresa, colegas) para criar mensagens muito convincentes. É mais eficaz que o phishing genérico e frequentemente usado contra executivos e empresas.' },
  { q: 'Qual prática ajuda MAIS a proteger suas contas caso caia em um phishing?', options: ['Usar senhas diferentes em cada site e ativar autenticação de dois fatores (2FA)', 'Usar apenas a rede Wi-Fi corporativa', 'Ler e-mails apenas no computador, nunca no celular', 'Ter um antivírus instalado'], correct: 0, explanation: 'Senhas únicas + autenticação de dois fatores (2FA) é a combinação mais eficaz. Mesmo que sua senha seja roubada via phishing, o 2FA impede o acesso não autorizado. O antivírus também ajuda, mas não substitui esse hábito fundamental.' }
];

// ============================================================
// FUNÇÕES DE NAVEGAÇÃO E UI GERAL
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + id);
  if (screen) screen.classList.add('active');
  const header = document.getElementById('header');
  if (header) header.classList.toggle('transparent', id === 'start');
  GameState.currentScreen = id;
  window.scrollTo(0, 0);
}

function updateHeaderScore() {
  document.getElementById('score-value').textContent = GameState.totalScore;
}

function updatePhaseIndicator(text) {
  document.getElementById('phase-indicator').textContent = text;
}

// ============================================================
// RESULTADO DE FASE (tela genérica de resultados, fases 2–5)
// ============================================================
const PHASE_RESULT_META = {
  2: {
    title: 'Resultado da Fase 2',
    subtitle: 'Análise de links concluída',
    detailTag: 'O que você aprendeu',
    detailTitle: 'Chaves para não cair em golpes de links',
    detailSub: 'Guarde estas lições',
    detailList: [
      'Passe o mouse no link antes de clicar e confira a URL real que aparece',
      'Desconfie de subdomínios enganosos (ex: nupay.com.br.rastreio.xyz) e typosquatting',
      'Cuidado com encurtadores de link e TLDs estranhos como .xyz, .top e .ru',
      'Cadeado HTTPS não é garantia — confira sempre o domínio completo'
    ]
  },
  3: {
    title: 'Resultado da Fase 3',
    subtitle: 'Comparação de páginas de login concluída',
    detailTag: 'Endereços oficiais',
    detailTitle: 'Domínios reais para usar de referência',
    detailSub: 'Digite sempre o endereço manualmente no navegador',
    detailList: [
      'https://bancovitta.com.br/login',
      'https://app.nupay.com.br/login',
      'https://www.streamflix.com.br/login',
      'https://www.amazoshop.com.br/ap/signin'
    ]
  },
  4: {
    title: 'Resultado da Fase 4',
    subtitle: 'Cenário de ataque concluído',
    detailTag: 'Ações mais seguras',
    detailTitle: 'Sequência ideal diante de um phishing',
    detailSub: '',
    detailList: [
      'Não clicar em links de e-mails urgentes — digite o endereço oficial diretamente no navegador',
      'Ligar para o número oficial da empresa (buscado de forma independente, nunca do e-mail)',
      'Reportar o e-mail suspeito ao departamento de TI ou segurança da empresa',
      'Deletar o e-mail e avisar colegas que possam ter recebido a mesma tentativa'
    ]
  },
  5: {
    title: 'Resultado da Fase 5',
    subtitle: 'Quiz final concluído',
    detailTag: 'Treinamento completo',
    detailTitle: 'Você terminou o treinamento!',
    detailSub: 'Clique em Concluir para emitir seu certificado',
    detailList: [
      'Você completou as 5 fases do MailSafe Academy',
      'Aplique no dia a dia: verifique remetentes, URLs e desconfie de urgência',
      'Compartilhe o que aprendeu com colegas e familiares'
    ]
  }
};

function resultChecksHtml(correct, wrong, phaseScore) {
  const total = correct + wrong;
  return `
    <li><span class="check-icon"></span><div class="check-text"><strong>Acertos</strong><span>${correct} de ${total}</span></div></li>
    <li><span class="check-icon"></span><div class="check-text"><strong>Erros</strong><span>${wrong} de ${total}</span></div></li>
    <li><span class="check-icon"></span><div class="check-text"><strong>Pontos</strong><span>+${phaseScore} nesta fase</span></div></li>
  `;
}

function showPhaseResult(phase, data) {
  GameState.resultPhase = phase;
  const meta = PHASE_RESULT_META[phase];
  document.getElementById('pr-title').textContent = meta.title;
  document.getElementById('pr-subtitle').textContent = meta.subtitle;
  document.getElementById('pr-score').textContent = data.score;
  document.getElementById('pr-nav-score').textContent = data.score;
  document.getElementById('pr-checks').innerHTML = data.checksHtml;
  document.getElementById('pr-detail-tag').textContent = meta.detailTag;
  document.getElementById('pr-detail-title').textContent = meta.detailTitle;
  document.getElementById('pr-detail-sub').textContent = meta.detailSub;
  document.getElementById('pr-detail-list').innerHTML = meta.detailList.map(s =>
    '<li><span class="check-icon"></span><span class="check-line">' + s + '</span></li>'
  ).join('');
  document.getElementById('pr-detail-finish').textContent = 'Concluir Fase ' + phase + ' →';
  showScreen('phase-result');
  animateCountUp('pr-score', data.score);
  animateCountUp('pr-nav-score', data.score);
  launchConfetti();
}

function finishCurrentPhase() {
  const p = GameState.resultPhase;
  if (p === 2) finishPhase2();
  else if (p === 3) finishPhase3();
  else if (p === 4) finishPhase4();
  else if (p === 5) finishPhase5();
}

function backToPhase() {
  const p = GameState.resultPhase;
  if (p === 2) showScreen('phase2');
  else if (p === 3) showScreen('phase3');
  else if (p === 4) showScreen('phase4');
  else if (p === 5) showScreen('phase5');
  window.scrollTo(0, 0);
}

function toggleDetails(checkbox) {
  const screen = checkbox.closest('.screen');
  if (!screen) return;
  screen.querySelectorAll('.result-checks').forEach(ul => {
    ul.style.display = checkbox.checked ? '' : 'none';
  });
}

function startGame() {
  GameState.playerName = 'Jogador';
  GameState.totalScore = 0;
  GameState.nextPhase = 1;
  updateHeaderScore();
  initPhase1();
  showScreen('phase1');
  updatePhaseIndicator('Fase 1 de 5');
}

function restartGame() {
  Object.assign(GameState, {
    playerName: 'Jogador', totalScore: 0, nextPhase: 1,
    phaseScores: { p1:0, p2:0, p3:0, p4:0, p5:0 },
    p1CurrentEmail: null, p1Classified: {}, p1EmailOrder: [],
    p2Answered: {},
    p3CurrentPair: 0, p3Score: 0, p3ResultShown: false,
    p4Step: 0, p4Score: 0, p4ResultShown: false,
    p5Current: 0, p5Score: 0, p5ResultShown: false
  });
  updateHeaderScore();
  showScreen('start');
  updatePhaseIndicator('Início');
}

function showTransition(fromPhase, toPhase, phaseScore) {
  const titles = {
    1: 'Fase 1: Caixa de Entrada', 2: 'Fase 2: Detetive de Links',
    3: 'Fase 3: Páginas de Login', 4: 'Fase 4: Tomada de Decisão', 5: 'Fase 5: Quiz Final'
  };
  document.getElementById('trans-phase-num').textContent = 'Fase ' + fromPhase + ' Concluída!';
  document.getElementById('trans-title').textContent = (titles[fromPhase] || 'Fase ' + fromPhase) + ' — Concluída!';
  document.getElementById('trans-phase-gain').textContent = phaseScore >= 0 ? '+' + phaseScore + ' pts nesta fase' : '';
  document.getElementById('trans-score').textContent = GameState.totalScore;

  const nextInfos = {
    2: 'A seguir: Fase 2 — examine URLs suspeitas e proteja seus cliques.',
    3: 'A seguir: Fase 3 — diferencie páginas de login reais de falsas.',
    4: 'A seguir: Fase 4 — tome decisões em um cenário de ataque real.',
    5: 'A seguir: Fase 5 — Quiz final e certificado de conclusão!',
    6: 'Parabéns! Você completou todas as fases.'
  };
  document.getElementById('trans-next-info').textContent = nextInfos[toPhase] || '';

  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById('pd' + i);
    if (i < toPhase) dot.className = 'progress-dot done';
    else if (i === toPhase && toPhase <= 5) dot.className = 'progress-dot current';
    else dot.className = 'progress-dot';
  }

  GameState.nextPhase = toPhase;
  document.getElementById('btn-next-phase').textContent = toPhase > 5 ? 'Ver Certificado' : 'Ir para a Fase ' + toPhase + ' →';
  showScreen('transition');
  updatePhaseIndicator('Fase ' + fromPhase + ' de 5');
}

function goToNextPhase() {
  const p = GameState.nextPhase;
  if (p === 2) { initPhase2(); showScreen('phase2'); updatePhaseIndicator('Fase 2 de 5'); }
  else if (p === 3) { initPhase3(); showScreen('phase3'); updatePhaseIndicator('Fase 3 de 5'); }
  else if (p === 4) { initPhase4(); showScreen('phase4'); updatePhaseIndicator('Fase 4 de 5'); }
  else if (p === 5) { initPhase5(); showScreen('phase5'); updatePhaseIndicator('Fase 5 de 5'); }
  else { showCertificate(); }
}

// ============================================================
// FASE 1 — CAIXA DE ENTRADA
// ============================================================
const STAR_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

function formatEmailTime(dateStr) {
  const parts = String(dateStr).split(',');
  if (parts.length < 2) return '';
  const rest = parts[1].trim();
  const day = rest.match(/^\d+/);
  const month = rest.match(/\b([A-Za-z]{3})\b/);
  if (day && month) return day[0] + ' ' + month[1].toLowerCase();
  return '';
}

function toggleRowStar(event, el) {
  event.stopPropagation();
  el.classList.toggle('starred');
}

function toggleRowCheck(event, el) {
  event.stopPropagation();
  el.classList.toggle('checked');
  const row = el.closest('.email-item');
  if (row) row.classList.toggle('row-selected');
}

function backToInbox() {
  document.getElementById('email-list-items').classList.remove('hidden');
  document.getElementById('mail-reading').classList.add('hidden');
  GameState.p1CurrentEmail = null;
}

function initPhase1() {
  GameState.p1Classified = {};
  GameState.p1CurrentEmail = null;
  const listEl = document.getElementById('email-list-items');
  listEl.innerHTML = '';
  const phishingEmails = EMAILS.filter(e => e.isPhishing).sort(() => Math.random() - 0.5).slice(0, P1_PHISH_COUNT);
  const legitEmails = EMAILS.filter(e => !e.isPhishing).sort(() => Math.random() - 0.5).slice(0, P1_LEGIT_COUNT);
  GameState.p1EmailOrder = [...phishingEmails, ...legitEmails].sort(() => Math.random() - 0.5);

  GameState.p1EmailOrder.forEach(email => {
    const item = document.createElement('div');
    item.className = 'email-item unread';
    item.id = 'email-item-' + email.id;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    const senderName = email.from.match(/^(.*?)\s*</);
    const displayName = senderName ? senderName[1] : email.from;
    item.innerHTML = `
      <span class="row-check" title="Selecionar" onclick="toggleRowCheck(event, this)"></span>
      <span class="row-star" title="Marcar com estrela" onclick="toggleRowStar(event, this)">${STAR_SVG}</span>
      <span class="email-from">${displayName}</span>
      <span class="row-snippet">
        <span class="email-subject">${email.subject}</span>
        <span class="email-preview">${email.preview}</span>
      </span>
      <span class="row-status" id="row-status-${email.id}"></span>
      <span class="email-time">${formatEmailTime(email.date)}</span>
    `;
    item.onclick = () => openEmail(email.id);
    item.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') openEmail(email.id); };
    listEl.appendChild(item);
  });

  document.getElementById('phase1-result').classList.add('hidden');
  document.getElementById('phase1-client').classList.remove('hidden');
  document.getElementById('email-list-items').classList.remove('hidden');
  document.getElementById('mail-reading').classList.add('hidden');
  updateP1Progress();
}

function openEmail(id) {
  const email = EMAILS.find(e => e.id === id);
  if (!email) return;
  GameState.p1CurrentEmail = id;

  document.querySelectorAll('.email-item').forEach(el => el.classList.remove('active'));
  const item = document.getElementById('email-item-' + id);
  if (item) { item.classList.remove('unread'); item.classList.add('active'); }

  document.getElementById('email-list-items').classList.add('hidden');
  document.getElementById('mail-reading').classList.remove('hidden');

  const senderName = email.from.match(/^(.*?)\s*</);
  const displayName = senderName ? senderName[1] : email.from;

  document.getElementById('em-subject-big').textContent = email.subject;
  document.getElementById('em-from').textContent = email.from;
  document.getElementById('em-avatar').textContent = displayName.trim().charAt(0).toUpperCase() || 'M';
  document.getElementById('em-date').textContent = email.date;
  document.getElementById('em-body').textContent = email.body;

  const classified = GameState.p1Classified[id];
  const btnSafe = document.getElementById('btn-safe');
  const btnPhish = document.getElementById('btn-phish');
  const actionLabel = document.getElementById('em-action-label');
  if (classified) {
    btnSafe.disabled = true;
    btnPhish.disabled = true;
    actionLabel.textContent = classified === 'safe' ? 'Classificado como Seguro' : 'Classificado como Phishing';
  } else {
    btnSafe.disabled = false;
    btnPhish.disabled = false;
    actionLabel.textContent = 'Como você classifica este e-mail?';
  }
}

function classifyEmail(classification) {
  const id = GameState.p1CurrentEmail;
  if (!id || GameState.p1Classified[id]) return;

  GameState.p1Classified[id] = classification;
  const item = document.getElementById('email-item-' + id);
  if (item) { item.classList.remove('unread'); item.classList.add('classified-' + classification); }
  const statusEl = document.getElementById('row-status-' + id);
  if (statusEl) statusEl.className = 'row-status ' + classification;

  document.getElementById('btn-safe').disabled = true;
  document.getElementById('btn-phish').disabled = true;
  document.getElementById('em-action-label').textContent = classification === 'safe' ? 'Classificado como Seguro' : 'Classificado como Phishing';

  updateP1Progress();
  if (Object.keys(GameState.p1Classified).length === GameState.p1EmailOrder.length) {
    showPhase1Result();
  } else {
    const next = GameState.p1EmailOrder.find(e => !GameState.p1Classified[e.id]);
    if (next) setTimeout(() => openEmail(next.id), 300);
  }
}

function updateP1Progress() {
  const done = Object.keys(GameState.p1Classified).length;
  const total = GameState.p1EmailOrder.length;
  document.getElementById('p1-unread-count').textContent = total - done;
}

function showPhase1Result() {
  const phishingEmails = EMAILS.filter(e => e.isPhishing).slice(0, P1_PHISH_COUNT);
  const total = GameState.p1EmailOrder.length;
  let correctCount = 0;
  let wrongCount = 0;
  let phishDetected = 0;
  phishingEmails.forEach(ph => {
    if (GameState.p1Classified[ph.id] === 'phishing') { correctCount++; phishDetected++; }
    else wrongCount++;
  });
  GameState.p1EmailOrder.forEach(e => {
    if (e.isPhishing) return;
    if (GameState.p1Classified[e.id] === 'safe') correctCount++; else wrongCount++;
  });

  const score = correctCount * 5;
  GameState.phaseScores.p1 = score;
  GameState.totalScore += score;
  updateHeaderScore();

  document.getElementById('p1-score-value').textContent = score;
  document.getElementById('p1-nav-score').textContent = score;
  document.getElementById('p1-score-checks').innerHTML = `
    <li>
      <span class="check-icon"></span>
      <div class="check-text">
        <strong>Acertos</strong>
        <span>${correctCount} de ${total} e-mails classificados corretamente</span>
      </div>
    </li>
    <li>
      <span class="check-icon"></span>
      <div class="check-text">
        <strong>Erros</strong>
        <span>${wrongCount} de ${total} classificações incorretas</span>
      </div>
    </li>
    <li>
      <span class="check-icon ${phishDetected === phishingEmails.length ? 'ok' : 'warn'}"></span>
      <div class="check-text">
        <strong>${phishDetected === phishingEmails.length ? 'Todos os phishings detectados!' : phishDetected + ' de ' + phishingEmails.length + ' phishings detectados'}</strong>
        <span>${phishDetected === phishingEmails.length ? 'Você identificou todos os e-mails fraudulentos' : 'Algum e-mail fraudulento passou despercebido'}</span>
      </div>
    </li>
  `;
  document.getElementById('p1-phishing-list').innerHTML = phishingEmails.map(ph => `
    <div class="p1-phish-block">
      <h3 class="result-card-title">${ph.subject}</h3>
      <p class="result-card-sub">${ph.from}</p>
      <ul class="result-checks">${ph.phishingSigns.map(s =>
        '<li><span class="check-icon"></span><span class="check-line">' + s + '</span></li>'
      ).join('')}</ul>
    </div>
  `).join('');
  document.getElementById('phase1-client').classList.add('hidden');
  document.getElementById('phase1-result').classList.remove('hidden');
  animateCountUp('p1-score-value', score);
  animateCountUp('p1-nav-score', score);
  launchConfetti();
  window.scrollTo(0, 0);
}

function launchConfetti() {
  const container = document.getElementById('phase1-confetti');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 10) + 'px';
    piece.style.left = (Math.random() * 100) + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    piece.style.animationDelay = (Math.random() * 0.9) + 's';
    piece.style.setProperty('--sway', (Math.random() * 60 - 30) + 'px');
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 4500);
}

function animateCountUp(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 900;
  const start = performance.now();
  function step(t) {
    const p = Math.min((t - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function backToResultsInbox() {
  document.getElementById('phase1-result').classList.add('hidden');
  document.getElementById('phase1-client').classList.remove('hidden');
  document.getElementById('email-list-items').classList.remove('hidden');
  document.getElementById('mail-reading').classList.add('hidden');
  GameState.p1CurrentEmail = null;
}

function finishPhase1() {
  showTransition(1, 2, GameState.phaseScores.p1);
}

// ============================================================
// FASE 2 — DETETIVE DE LINKS (lista de quizzes)
// ============================================================
function initPhase2() {
  GameState.p2Answered = {};
  const container = document.getElementById('phase2-links-container');
  container.innerHTML = '';
  const total = LINKS_DATA.length;

  LINKS_DATA.forEach((link, idx) => {
    const card = document.createElement('article');
    card.className = 'p2-qcard';
    card.id = 'link-card-' + link.id;
    card.innerHTML = `
      <div class="p2-qcard-head">
        <span class="p2-qcard-num">Link ${idx + 1} de ${total}</span>
        <span class="p2-qcard-status" id="status-${link.id}"></span>
      </div>
      <div class="p2-mockup">
        <div class="p2-mock-line"><span class="p2-mock-label">De:</span><span>${link.sender.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span></div>
        <div class="p2-mock-line"><span class="p2-mock-label">Assunto:</span><span>${link.subject}</span></div>
        <div class="p2-mock-body">${link.body}</div>
        <div class="p2-mock-preview">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
          <span>Endereço real ao passar o mouse: <b>${link.realUrl}</b></span>
        </div>
      </div>
      <div class="p2-qactions">
        <button class="p2-btn-safe" type="button" id="link-safe-${link.id}" onclick="answerLink(${link.id}, true)">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          Seguro
        </button>
        <button class="p2-btn-phish" type="button" id="link-sus-${link.id}" onclick="answerLink(${link.id}, false)">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          Phishing
        </button>
      </div>
      <div class="p2-qfeedback hidden" id="link-fb-${link.id}"></div>
    `;
    container.appendChild(card);
  });
}

function answerLink(id, markedSafe) {
  if (GameState.p2Answered[id] !== undefined) return;
  const link = LINKS_DATA.find(l => l.id === id);
  const isCorrect = (markedSafe === link.isSafe);
  GameState.p2Answered[id] = isCorrect;

  document.getElementById('link-safe-' + id).disabled = true;
  document.getElementById('link-sus-' + id).disabled = true;
  document.getElementById(markedSafe ? 'link-safe-' + id : 'link-sus-' + id).classList.add('picked');

  const card = document.getElementById('link-card-' + id);
  card.classList.add(isCorrect ? 'correct' : 'wrong');

  const status = document.getElementById('status-' + id);
  status.className = 'p2-qcard-status ' + (link.isSafe ? 'safe' : 'phish');
  status.textContent = link.isSafe ? '✓ Seguro' : '✕ Phishing';

  const fb = document.getElementById('link-fb-' + id);
  fb.className = 'p2-qfeedback show ' + (isCorrect ? 'good' : 'bad');
  const resultText = isCorrect ? 'Correto!' : (markedSafe ? 'Errado! Este link era suspeito.' : 'Errado! Este link era seguro.');
  fb.innerHTML = '<strong>' + resultText + '</strong>' + link.explanation;

  if (Object.keys(GameState.p2Answered).length === LINKS_DATA.length) showPhase2Result();
}

function showPhase2Result() {
  const correct = Object.values(GameState.p2Answered).filter(Boolean).length;
  const total = LINKS_DATA.length;
  const score = Math.round(correct * (100 / total));
  GameState.phaseScores.p2 = score;
  GameState.totalScore += score;
  updateHeaderScore();
  showPhaseResult(2, { score: score, checksHtml: resultChecksHtml(correct, total - correct, score) });
}

function finishPhase2() {
  showTransition(2, 3, GameState.phaseScores.p2);
}

// ============================================================
// FASE 3 — LOGIN REAL OU FALSO?
// ============================================================
function initPhase3() {
  GameState.p3CurrentPair = 0;
  GameState.p3Score = 0;
  const container = document.getElementById('phase3-pairs-container');
  container.innerHTML = '';

  LOGIN_PAIRS.forEach((pair, pairIdx) => {
    const pairDiv = document.createElement('div');
    pairDiv.className = 'login-pair' + (pairIdx === 0 ? ' active' : '');
    pairDiv.id = 'login-pair-' + pair.id;
    pairDiv.innerHTML = `
      <div class="login-pair-counter">Par ${pairIdx + 1} de ${LOGIN_PAIRS.length} — ${pair.context}</div>
      <div class="login-comparison">
        ${pair.options.map((opt, optIdx) => buildLoginMockup(opt, pair.id, optIdx)).join('')}
      </div>
      <div class="login-feedback-box" id="login-fb-${pair.id}">
        <h4 id="login-fb-title-${pair.id}"></h4>
        <ul class="diff-list" id="login-fb-diffs-${pair.id}"></ul>
        <div style="margin-top:12px;" id="login-fb-btn-${pair.id}"></div>
      </div>
    `;
    container.appendChild(pairDiv);
  });
}

function buildLoginMockup(opt, pairId, optIdx) {
  const lockIcon = '';
  const urlColor = !opt.hasLock ? '#ef4444' : '#15803d';
  return `
    <div>
      <div class="login-label">${opt.label}</div>
      <div class="login-mockup" id="mockup-${pairId}-${optIdx}"
           onclick="selectLogin(${pairId}, ${optIdx})"
           role="button" tabindex="0"
           aria-label="Opção ${opt.label}: ${opt.browserUrl}"
           onkeydown="if(event.key==='Enter')selectLogin(${pairId},${optIdx})">
        <div class="browser-bar">
          <div class="browser-dots">
            <div class="browser-dot dot-red"></div>
            <div class="browser-dot dot-yellow"></div>
            <div class="browser-dot dot-green"></div>
          </div>
          <div class="browser-address">
            ${lockIcon}
            <span style="color:${urlColor};overflow:hidden;text-overflow:ellipsis;">${opt.browserUrl}</span>
          </div>
        </div>
        <div class="login-form-area">
          <div class="login-logo" style="color:${opt.logoColor}">${opt.logoText}</div>
          <div class="login-subtitle" style="color:${opt.subtitleColor}">${opt.subtitle}</div>
          <div class="mock-input" style="margin-top:6px;">${opt.field1}</div>
          <div class="mock-input">${opt.field2}</div>
          ${opt.extraText ? '<div class="mock-error">' + opt.extraText + '</div>' : ''}
          <div class="mock-btn" style="background:${opt.btnColor}">${opt.btnText}</div>
        </div>
      </div>
    </div>
  `;
}

function selectLogin(pairId, optIdx) {
  const pair = LOGIN_PAIRS.find(p => p.id === pairId);
  if (!pair) return;
  const fbBox = document.getElementById('login-fb-' + pairId);
  if (fbBox.classList.contains('show')) return;

  const selectedOpt = pair.options[optIdx];
  const isCorrect = selectedOpt.isReal;
  const fakeOpt = pair.options.find(o => !o.isReal);
  const realOpt = pair.options.find(o => o.isReal);

  if (isCorrect) GameState.p3Score += 25;

  pair.options.forEach((opt, idx) => {
    const el = document.getElementById('mockup-' + pairId + '-' + idx);
    el.classList.add(opt.isReal ? 'selected-correct' : 'selected-wrong');
    el.style.pointerEvents = 'none';
  });

  const title = document.getElementById('login-fb-title-' + pairId);
  title.textContent = isCorrect ? 'Correto! Você identificou a página legítima.' : 'Errado. Você clicou na página falsa.';
  title.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';

  const diffsToShow = fakeOpt.diffs.length > 0 ? fakeOpt.diffs : realOpt.diffs;
  document.getElementById('login-fb-diffs-' + pairId).innerHTML = `
    <li class="good">A página legítima: <strong>${realOpt.browserUrl}</strong></li>
    <li class="bad">A página falsa: <strong>${fakeOpt.browserUrl}</strong></li>
    ${diffsToShow.map(d => '<li class="' + (d.bad ? 'bad' : 'good') + '">' + d.text + '</li>').join('')}
  `;

  const pairIdx = LOGIN_PAIRS.indexOf(pair);
  const isLast = pairIdx === LOGIN_PAIRS.length - 1;
  document.getElementById('login-fb-btn-' + pairId).innerHTML = `<button class="btn btn-primary" onclick="nextLoginPair(${pairId})">${isLast ? 'Ver Resultado →' : 'Próximo Par →'}</button>`;
  fbBox.classList.add('show');
}

function nextLoginPair(currentPairId) {
  const currentIdx = LOGIN_PAIRS.findIndex(p => p.id === currentPairId);
  const nextIdx = currentIdx + 1;
  document.getElementById('login-pair-' + currentPairId).classList.remove('active');
  if (nextIdx < LOGIN_PAIRS.length) {
    const nextPair = document.getElementById('login-pair-' + LOGIN_PAIRS[nextIdx].id);
    nextPair.classList.add('active');
    nextPair.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showPhase3Result();
  }
}

function showPhase3Result() {
  const score = GameState.p3Score;
  if (!GameState.p3ResultShown) {
    GameState.p3ResultShown = true;
    GameState.phaseScores.p3 = score;
    GameState.totalScore += score;
    updateHeaderScore();
  }
  const correct = score / 25;
  const wrong = LOGIN_PAIRS.length - correct;
  showPhaseResult(3, { score: score, checksHtml: resultChecksHtml(correct, wrong, score) });
}

function finishPhase3() {
  showTransition(3, 4, GameState.phaseScores.p3);
}

// ============================================================
// FASE 4 — TOMADA DE DECISÃO
// ============================================================
function initPhase4() {
  GameState.p4Step = 0;
  GameState.p4Score = 0;
  const container = document.getElementById('phase4-scenario-container');
  container.innerHTML = '';
  renderPhase4Step(0);
}

function renderPhase4Step(stepIdx) {
  const container = document.getElementById('phase4-scenario-container');
  const step = PHASE4_STEPS[stepIdx];
  if (!step) return;
  const total = PHASE4_STEPS.length;

  const shuffledChoices = step.choices.map((c, i) => Object.assign({}, c, { origIdx: i })).sort(() => Math.random() - 0.5);

  const stepDiv = document.createElement('div');
  stepDiv.id = 'p4-step-' + step.id;
  stepDiv.innerHTML = `
    <div class="phase4-step-counter">Cenário ${stepIdx + 1} de ${total}</div>
    <div class="scenario-box">
      <span class="scenario-icon">${step.icon}</span>
      <div class="scenario-message">${step.message}</div>
      <div class="choices-list" id="choices-${step.id}">
        ${shuffledChoices.map((c, i) => {
          return `<button class="choice-btn" onclick='selectChoice(${step.id}, ${i}, ${c.isCorrect}, ${JSON.stringify(JSON.stringify(c.consequence))})'>
            <span class="choice-num">${i + 1}</span>${c.text}
          </button>`;
        }).join('')}
      </div>
      <div class="consequence-box" id="consequence-${step.id}"></div>
    </div>
  `;
  container.appendChild(stepDiv);
}

function selectChoice(stepId, choiceIdx, isCorrect, consequenceJson) {
  const consequence = JSON.parse(consequenceJson);
  const choicesList = document.getElementById('choices-' + stepId);
  const consBox = document.getElementById('consequence-' + stepId);

  choicesList.querySelectorAll('.choice-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === choiceIdx) btn.classList.add(isCorrect ? 'correct' : 'wrong');
  });

  if (isCorrect) GameState.p4Score += 25;

  consBox.className = 'consequence-box show ' + consequence.type;
  consBox.innerHTML = `
    <div class="consequence-title">${consequence.title}</div>
    <p>${consequence.text}</p>
    <button class="btn btn-primary" style="margin-top:12px;" onclick="nextPhase4Step(${stepId})">${GameState.p4Step + 1 < PHASE4_STEPS.length ? 'Próximo Cenário →' : 'Ver Resultado →'}</button>
  `;
  GameState.p4Step++;
}

function nextPhase4Step(stepId) {
  const currentIdx = PHASE4_STEPS.findIndex(s => s.id === stepId);
  const nextIdx = currentIdx + 1;
  if (nextIdx < PHASE4_STEPS.length) {
    renderPhase4Step(nextIdx);
    setTimeout(() => {
      const newStep = document.getElementById('p4-step-' + PHASE4_STEPS[nextIdx].id);
      if (newStep) newStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    showPhase4Result();
  }
}

function showPhase4Result() {
  if (!GameState.p4ResultShown) {
    GameState.p4ResultShown = true;
    GameState.phaseScores.p4 = GameState.p4Score;
    GameState.totalScore += GameState.p4Score;
    updateHeaderScore();
  }
  const checksHtml = '<li><span class="check-icon"></span><div class="check-text"><strong>Pontos</strong><span>+' + GameState.p4Score + ' nesta fase</span></div></li>' +
    '<li><span class="check-icon"></span><div class="check-text"><strong>Decisões seguras</strong><span>Escolhas tiveram consequências reais</span></div></li>';
  showPhaseResult(4, { score: GameState.p4Score, checksHtml: checksHtml });
}

function finishPhase4() {
  showTransition(4, 5, GameState.phaseScores.p4);
}

// ============================================================
// FASE 5 — QUIZ FINAL
// ============================================================
function initPhase5() {
  GameState.p5Current = 0;
  GameState.p5Score = 0;
  const container = document.getElementById('phase5-questions-container');
  container.innerHTML = '';

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question-box';
    qDiv.id = 'quiz-q-' + idx;
    qDiv.style.display = idx === 0 ? 'block' : 'none';
    const letters = ['A', 'B', 'C', 'D'];
    const shuffledOpts = q.options.map((opt, i) => ({ text: opt, origIdx: i })).sort(() => Math.random() - 0.5);
    qDiv.innerHTML = `
      <div class="quiz-q-num">Questão ${idx + 1} de ${QUIZ_QUESTIONS.length}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options" id="quiz-opts-${idx}">
        ${shuffledOpts.map((opt, i) => `
          <button class="quiz-option" onclick="answerQuiz(${idx}, ${opt.origIdx}, ${q.correct})"
                  id="quiz-opt-${idx}-${i}">
            <span class="opt-letter">${letters[i]}</span>
            ${opt.text}
          </button>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="quiz-exp-${idx}">${q.explanation}</div>
    `;
    container.appendChild(qDiv);
  });
  updateP5Progress(0);
}

function answerQuiz(qIdx, selectedOrigIdx, correctOrigIdx) {
  const isCorrect = selectedOrigIdx === correctOrigIdx;
  if (isCorrect) GameState.p5Score += 10;

  const optsContainer = document.getElementById('quiz-opts-' + qIdx);
  optsContainer.querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.add('disabled');
    btn.disabled = true;
    const onclickStr = btn.getAttribute('onclick');
    const match = onclickStr && onclickStr.match(/answerQuiz\(\d+, (\d+)/);
    if (match) {
      const origIdx = parseInt(match[1]);
      if (origIdx === correctOrigIdx) btn.classList.add('correct');
      else if (origIdx === selectedOrigIdx && !isCorrect) btn.classList.add('wrong');
    }
  });

  document.getElementById('quiz-exp-' + qIdx).classList.add('show');

  const qDiv = document.getElementById('quiz-q-' + qIdx);
  const isLast = qIdx === QUIZ_QUESTIONS.length - 1;
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary mt-16';
  nextBtn.textContent = isLast ? 'Finalizar Quiz →' : 'Próxima Questão →';
  nextBtn.onclick = () => nextQuestion(qIdx);
  qDiv.appendChild(nextBtn);

  updateP5Progress(qIdx + 1);
}

function nextQuestion(currentIdx) {
  const nextIdx = currentIdx + 1;
  if (nextIdx < QUIZ_QUESTIONS.length) {
    document.getElementById('quiz-q-' + currentIdx).style.display = 'none';
    const nextQ = document.getElementById('quiz-q-' + nextIdx);
    nextQ.style.display = 'block';
    nextQ.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateP5Progress(nextIdx);
  } else {
    showPhase5Result();
  }
}

function updateP5Progress(current) {
  const total = QUIZ_QUESTIONS.length;
  document.getElementById('p5-quiz-bar').style.width = ((current / total) * 100) + '%';
}

function showPhase5Result() {
  if (!GameState.p5ResultShown) {
    GameState.p5ResultShown = true;
    GameState.phaseScores.p5 = GameState.p5Score;
    GameState.totalScore += GameState.p5Score;
    updateHeaderScore();
  }
  const correct = GameState.p5Score / 10;
  const wrong = QUIZ_QUESTIONS.length - correct;
  showPhaseResult(5, { score: GameState.p5Score, checksHtml: resultChecksHtml(correct, wrong, GameState.p5Score) });
}

function finishPhase5() {
  showTransition(5, 6, GameState.phaseScores.p5);
}

// ============================================================
// CERTIFICADO FINAL
// ============================================================
function showCertificate() {
  const total = GameState.totalScore;
  const maxScore = 500;
  const pct = (total / maxScore) * 100;
  let grade, gradeText;
  if (pct >= 90) { grade = 'A+'; gradeText = 'Excelente — Expert em Segurança'; }
  else if (pct >= 75) { grade = 'A'; gradeText = 'Ótimo — Muito bem treinado'; }
  else if (pct >= 60) { grade = 'B'; gradeText = 'Bom — Continue praticando'; }
  else if (pct >= 45) { grade = 'C'; gradeText = 'Regular — Revise os conceitos'; }
  else { grade = 'D'; gradeText = 'Iniciante — Pratique mais!'; }

  document.getElementById('cert-player-name').textContent = GameState.playerName;
  document.getElementById('cert-score').textContent = total + ' pts';
  document.getElementById('cert-grade').textContent = grade + ' — ' + gradeText;

  const now = new Date();
  document.getElementById('cert-date').textContent = 'Emitido em ' + now.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

  for (let i = 1; i <= 5; i++) {
    document.getElementById('pd' + i).className = 'progress-dot done';
  }

  showScreen('certificate');
  updatePhaseIndicator('Concluído!');
  launchConfetti();
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  showScreen('start');
  updatePhaseIndicator('Início');
  const nameInput = document.getElementById('player-name-input');
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') startGame();
    });
  }
});
