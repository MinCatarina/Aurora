# Aurora — Landing Page (Etapa 2)

Landing page da Aurora, plataforma de IA para RH, recriando o visual definido na Etapa 1
(Bootstrap 5 + fonte Outfit + paleta violeta/azul), agora publicada e com formulário funcional.

## Estrutura do projeto

```
aurora/
├── index.html
├── assets/
│   ├── style.css
│   ├── images/
│   │   └── logo-aurora.svg
│   └── js/
│       ├── phone-mask.js
│       └── lead-form.js
└── README.md
```

## Como publicar

### 1. Subir para o GitHub

Dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Etapa 2: landing page publicada"
git branch -M main
git remote add origin https://github.com/fabriciogallo/aurora.git
git push -u origin main
```

Se o repositório já tiver arquivos (da Etapa 1), pode ser necessário:

```bash
git pull origin main --allow-unrelated-histories
```

antes do `push`, resolvendo conflitos se aparecerem.

### 2. Deploy pela Netlify (recomendado — o formulário já está pronto para ela)

1. Acesse https://app.netlify.com e crie uma conta gratuita (pode entrar com GitHub).
2. Clique em **Add new site → Import an existing project** e conecte o repositório.
3. Não é preciso configurar build command nem publish directory (o site é estático).
4. Depois do deploy, vá em **Project overview → Make public** para garantir que o link
   funcione para qualquer visitante, sem exigir login.
5. Em **Site settings → Forms**, as respostas do formulário "lead" ficam disponíveis
   automaticamente, sem precisar de backend.

## Acessibilidade implementada

- Link de "pular para o conteúdo" e estrutura semântica (nav, main implícito nas sections, footer).
- Navegação completa por teclado, com foco visível em todos os elementos interativos.
- Rótulos associados a cada campo do formulário, com mensagens de erro acessíveis (`.invalid-feedback` + `aria-describedby`).
- Contraste de cores verificado (nível AA) entre texto e fundo.
- Imagens e ícones decorativos ocultados de leitores de tela (`aria-hidden`).
- Animações reduzidas quando o usuário ativa "reduzir movimento" no sistema.
- Layout responsivo (grid do Bootstrap), do celular ao desktop.
- Seção dedicada "Acessibilidade nesta página" identificando esses recursos para quem avalia o projeto.
