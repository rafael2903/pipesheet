<br />
<p align="center">
  <img src="public/logo.svg" alt="PipeSheet logo" width="300"/>
</p>



[Pipesheet](https://pipesheet.vercel.app) é um app construído com [Next.js](https://nextjs.org/) para criar integrações entre pipes e planilhas do Google.

Com ele é possível ter os dados dos seus pipes em planilhas, que são atualizadas automaticamente a cada 10 minutos.

[API Reference]() - Ainda em construção

## 🚀 Rodando o projeto localmente

Basta executar os seguintes comandos:

```bash
yarn install
yarn dev
```

Com isso o projeto deve estar rodando em https://localhost:3000.

## 🏷️ Variáveis de ambiente

É preciso criar um arquivo `.env.local` para inserir as variáveis de ambiente.

`PIPEFY_PERSONAL_ACCESS_TOKEN` - Este é o token obtido nesta [página](https://app.pipefy.com/tokens) do Pipefy.

## ✏️ Contribuindo

### Branches

As branches seguem o seguinte formato: **tipo/nome_da_branch**. 

Ex: feat/get_pipe_route

Os tipos podem ser:

- feat - Adiciona uma nova feature
- fix - Consertar algum bug no código
- chore - Adiciona ou modifica arquivos de configuração (.gitignore, jsconfig, etc)
- docs - Adiciona ou modifica arquivos de documentaçao (README ...)

### Commits

Fazemos os commits seguindo os padrões do [gitmoji](https://gitmoji.dev/). No seguinte formato: **:emoji: Mensagem**

Ex: ✨ Adiciona alguma coisa muito legal

Basta baixar a extensão do vscode (ou olhar no site mesmo) e conferir qual emoji se encaixa melhor nos seus commits.

