# Sorteio Websocket - Código Fonte TV

Uma aplicação simples de sorteio em tempo real utilizando WebSockets, agora com suporte a TypeScript, desenvolvida para o canal Código Fonte TV no YouTube.

## Descrição

Esta aplicação foi aprimorada para incluir uma funcionalidade de contagem regressiva e validação de arquivo `.env` usando Zod.
A mesma consiste em duas partes principais:

1. **Admin**: Uma interface para realizar o sorteio, visualizar a quantidade de participantes conectados e iniciar a contagem regressiva para o sorteio.
2. **Cliente**: Uma interface para os usuários se conectarem e participarem do sorteio. Durante a contagem regressiva e o sorteio, a interface do cliente muda de cor e mostra um código se o usuário ganhar.

## Tecnologias Atualizadas

- **TypeScript** para uma base de código mais robusta e segura.
- **ts-node** para executar aplicações TypeScript diretamente.
- **Zod** para validar o arquivo `.env`, garantindo que todas as variáveis de ambiente necessárias estejam presentes e corretas.
- **Express** para servir a aplicação web.
- **WebSocket** para comunicação em tempo real entre o servidor e os clientes.

## Dependências

- `@types/express`: ^4.17.21
- `@types/node`: ^20.11.20
- `@types/ws`: ^8.5.10
- `express`: ^4.18.2
- `ts-node`: ^10.9.2
- `typescript`: ^5.3.3
- `ws`: ^8.16.0
- `zod`: ^3.22.4

## Configuração e Instalação

### Pré-requisitos

- Node.js e npm (ou yarn) instalados. [Veja como instalar Node.js](https://nodejs.org/en/download/).

### Passos para configuração

1. **Clonar o Repositório**

```bash
git clone https://github.com/gabrielfroes/sorteio-websocket
cd sorteio-websocket
```

2. **Instalar dependências**

Usando npm:

```bash
npm install
```

Ou, se preferir usar yarn:

```bash
yarn install
```

3. **Iniciar o Servidor com TypeScript**

Para rodar a aplicação em desenvolvimento com suporte ao TypeScript, execute:

```bash
npm run dev
```

4. **Configuração do WebSocket**

A lógica de comunicação e sorteio foi aprimorada para utilizar TypeScript, proporcionando uma base de código mais segura e fácil de manter.

5. **Funcionalidade de Contagem Regressiva**

A interface do administrador agora inclui uma funcionalidade de contagem regressiva para o sorteio, melhorando a experiência do usuário e aumentando a expectativa.

6. **Validação de `.env` com Zod**

Antes de iniciar a aplicação, certifique-se de que todas as variáveis de ambiente necessárias estão definidas corretamente, utilizando Zod para validar o arquivo `.env`.

7. **Como Executar o Sorteio**

- Acesse a página de administração em `http://localhost:3000/admin`.
- O contador de participantes mostra quantos clientes estão conectados.
- Inicie a contagem regressiva e clique no botão "Realizar Sorteio" para iniciar o sorteio. Um código de confirmação será gerado automaticamente.
- Todos os clientes conectados receberão os resultados do sorteio em tempo real. O vencedor verá o código de confirmação em sua tela.
