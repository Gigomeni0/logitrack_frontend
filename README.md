# LogiTrack (Frontend)

Uma versão alinhada do app para todos partirem da mesma base. Sem floreios, aqui está o que realmente importa.

## O que foi ajustado agora

- Navegação reorganizada: Tabs (Dashboard, Robôs, Perfil) + Stack interno para navegar Lista -> Detalhes de robô.
- Autenticação mock simples (token falso em `AsyncStorage`) só para controlar fluxo Login/Main.
- Serviços isolados: `authService.js` (mock) e `robotService.js` (fetch com tratamento de erro básico).
- Telas de robôs com estados claros: carregando, erro, vazio.
- Comentários adicionados diretamente no código explicando decisões e próximos passos prováveis.
- Perfil ainda é placeholder — mostra dados fictícios e espaço para preferências futuras.

## Por que isso importa

Precisamos de uma base unificada antes de adicionar coisas como sensores, entregas, gráficos, relatórios ou autenticação real (JWT). Evita retrabalho e conflito.

