# Aurora — Landing Page (Etapa 2)

Landing page da Aurora, plataforma de IA para times de RH e Operações.

## Estrutura do projeto

```
aurora/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Como publicar

### 1. Subir para o GitHub

```bash
git init
git add .
git commit -m "Etapa 2: landing page publicada"
git branch -M main
git remote add origin https://github.com/MinCatarina/Aurora.git
git push -u origin main
```

### 2. Deploy pela Netlify (recomendado — o formulário já está pronto para ela)

1. Acesse https://app.netlify.com e crie uma conta gratuita.
2. Clique em **Add new site → Import an existing project** e conecte o repositório do GitHub.
3. Não é preciso configurar build command nem publish directory (o site é estático).
4. Após o deploy, acesse **Site settings → Forms** — o formulário "lead" aparece automaticamente
   e as respostas ficam disponíveis ali, sem precisar de backend.
5. Copie a URL pública gerada (ex.: `https://aurora-xxxx.netlify.app`) para o PDF de entrega.

### 3. Alternativa: GitHub Pages

Se preferir publicar pelo GitHub Pages, vá em **Settings → Pages**, selecione a branch `main`
e a pasta raiz. Nesse caso, o atributo `data-netlify="true"` do formulário é ignorado — troque o
`action` do `<form>` por um endpoint do [Formspree](https://formspree.io) (gratuito) para manter
o envio funcional.

## Acessibilidade implementada

- Estrutura semântica (`header`, `nav`, `main`, `section`, `footer`) e link de "pular para o conteúdo".
- Navegação completa por teclado, com foco visível em todos os elementos interativos.
- Rótulos associados a cada campo do formulário, com mensagens de erro anunciadas por leitores de tela.
- Contraste de cores testado para o padrão AA.
- Animações desativadas automaticamente quando o usuário ativa "reduzir movimento" no sistema.
- Layout responsivo, do celular ao desktop.
