# 1 Ano — Nossa História 💕

Página romântica para celebrar 1 ano de namoro.

## Como usar

1. **Coloque suas fotos** na pasta `assets/images/`:
   - `foto-principal.png` — foto de vocês na tela inicial
   - `evento-1.jpg` até `evento-5.jpg` — fotos da timeline
   - `galeria-1.jpg` até `galeria-6.jpg` — fotos extras

2. **Personalize os textos** em `js/timeline-data.js`:
   - Edite as datas, títulos e textos de cada momento
   - Adicione ou remova eventos no array `TIMELINE`
   - Edite as fotos da galeria no array `GALLERY`
   - Escreva sua mensagem final em `FINALE_MESSAGE`

3. **Abra no navegador**:
   - Dê duplo clique em `index.html`, ou
   - Use uma extensão Live Server no VS Code/Cursor

## Publicar online (GitHub Pages)

```bash
git add .
git commit -m "Página de 1 ano de namoro"
git push origin main
```

Depois, em **Settings → Pages** do repositório no GitHub, escolha a branch `main` e pasta `/ (root)`.

## Estrutura

```
1ano/
├── index.html
├── css/style.css
├── js/
│   ├── timeline-data.js
│   └── main.js
└── assets/
    ├── audio/trilha.mp3
    └── images/
```

## Créditos

- Trilha sonora: **Leberch — Romantic** (`leberch-romantic-584478.mp3`), música livre de copyright.

## Dicas

- Fotos quadradas ou 4:3 funcionam melhor na timeline
- A foto principal fica melhor em formato retrato (vertical)
- Enquanto não colocar as fotos, placeholders aparecem automaticamente
- A música começa ao clicar em **Começar**; use o botão ♪ para pausar