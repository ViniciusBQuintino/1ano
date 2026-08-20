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
├── index.html          # Página principal
├── css/style.css       # Estilos e animações
├── js/
│   ├── timeline-data.js  # ← EDITE AQUI (textos e fotos)
│   └── main.js           # Lógica e animações
└── assets/images/      # ← COLOQUE SUAS FOTOS AQUI
```

## Dicas

- Fotos quadradas ou 4:3 funcionam melhor na timeline
- A foto principal fica melhor em formato retrato (vertical)
- Enquanto não colocar as fotos, placeholders aparecem automaticamente
