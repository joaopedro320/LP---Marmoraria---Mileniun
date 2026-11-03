# LP Marmoraria Milenium (QH4 Growth)

Landing page da Marmoraria Milenium (Sorocaba/SP), produto High Ticket Stones.
Contrato de 21/10/2026 a 21/04/2027. Contato: Francisco Teixeira da Silva Filho, WhatsApp (15) 97401-9944.

## Estrutura

```
index.html          LP principal (página única, sem abrir outras páginas, como o cliente pediu)
obrigado.html       Página de obrigado (dispara thank_you_view e abre o WhatsApp)
404.html            Página de erro personalizada
robots.txt          Libera tudo, bloqueia /obrigado.html, aponta o sitemap
sitemap.xml         URL principal
site.webmanifest    Nome, cores e ícones
vercel.json         cleanUrls, cache longo em /assets e cabeçalhos de segurança
TRACKING-QH4.md     Onde colar GTM, Pixel e conversões (slots [QH4 SLOT n])
assets/css/style.css
assets/js/tracking.js   Configuração do cliente (WhatsApp, webhook, rótulos) e dataLayer
assets/js/main.js       Interações, formulário e eventos
assets/img/             Fotos em .webp (pasta 02. Imagens/Fotos enviada pelo cliente), logo prata, OG 1200x630, favicon e ícones
```

## Publicar na Vercel

1. Descompacte o zip.
2. Vercel > Add New > Project > arraste a pasta (ou `vercel --prod` dentro dela).
3. Framework: Other. Sem build command, output = raiz.
4. Em Domains, adicione o domínio do cliente e aponte o DNS.

## Pendências antes de publicar

- [ ] **Domínio**: o cliente registrou um domínio mas não lembra qual. Hoje está como `https://marmorariamilenium.com.br/` (provisório) em: canonical, og:url, og:image, twitter:image, JSON-LD, robots.txt e sitemap.xml. Troque tudo de uma vez com buscar e substituir.
- [x] **Logo**: aplicado a partir do arquivo preto da pasta 03. Logo, recolorido em prata (preto e prata do briefing). O arquivo colorido do cliente é dourado e não foi usado. Versões em `assets/img/logo-horizontal-prata.png` (topo) e `logo-milenium-prata.png` (rodapé, obrigado, 404). Favicon e ícones usam o monograma.
- [ ] **GTM / Pixel / Google Ads**: colar nos slots (ver TRACKING-QH4.md).
- [ ] **Webhook (Apps Script)**: `webhookUrl` em `assets/js/tracking.js` está vazio. Sem webhook, o formulário monta a mensagem com todos os campos e manda direto pro WhatsApp. Com webhook, envia pro Apps Script, abre o obrigado e redireciona com a mensagem padrão.
- [ ] **Instagram da QH4 no rodapé**: link em `https://www.instagram.com/qh4growth/`, confirmar o @.
- [ ] **Horário**: o briefing diz "das 07 às 17" sem dias da semana. Por isso o JSON-LD não tem openingHours. Se o cliente confirmar os dias, adicionar.
- [ ] **Google Meu Negócio**: o cliente não tem link de avaliações. A LP não tem depoimentos (nada inventado). Quando o GMN (prata) estiver ativo, dá pra incluir avaliações reais.

## Fonte do conteúdo

Tudo veio do briefing (formulário Google preenchido pelo Francisco) e do resumo de kickoff:
- 3 anos e meio de mercado; nasceu depois de 7 anos de sociedade familiar; Francisco começou como ajudante e passou por vendas.
- Materiais: rochas ornamentais, sintéticos, lâminas ultracompactas, quartzitos. Destaque: quartzitos, lâminas e quartzo. Tema obrigatório: materiais importados.
- Peças: bancadas, escadas, lareiras, lavatórios, mesas, nichos, soleiras, peitoris.
- Transformação/diferencial: serviço limpo, ambiente organizado, prazo de entrega, acabamento e instalação, especialista em lâminas e quartzitos.
- Atendimento das 7h às 17h. Sorocaba (SP). CNPJ 50.190.737/0001-92.
- Visual: preto e prata, fundo mesclado, sem fonte definida (Poppins + Inter, padrão QH4). Não quer site padrão nem várias páginas.

Não foram usados números, prazos, garantias, depoimentos ou nomes de pedras que não estão no briefing.

## Filtro de leads (dor principal do cliente)

O formulário pede o que o comercial precisa para separar projeto de curioso: cidade + bairro/condomínio, ambiente (inclui a opção "Só soleiras, peitoris ou peças pequenas" para identificar esse lead), material, fase do projeto (projeto de arquiteto, medidas, obra em andamento, só ideia), prazo e medidas aproximadas. Tudo vai no texto do WhatsApp e no dataLayer (`generate_lead`), útil para a IA de pré-qualificação e o CRM.

## Eventos de rastreamento (dataLayer)

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer link de WhatsApp | `wa_local`: hero, cta_final, rodape, flutuante, obrigado, pagina_404 |
| `form_start` | Primeira interação no formulário | `form_id` |
| `generate_lead` | Envio válido do formulário | `form_id`, `ambiente`, `material`, `prazo`, `fase`, `cidade` |
| `thank_you_view` | Abertura do obrigado.html | `form_id` |

## Checklist de SEO

- [x] Title e meta description com cidade e nicho
- [x] H1 com "Marmoraria" e "perto de você"
- [x] Canonical, Open Graph completo e Twitter Card
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage (só fatos do briefing)
- [x] robots.txt, sitemap.xml, site.webmanifest, vercel.json
- [x] Imagens .webp com width/height (CLS) e preload da imagem do hero
- [x] Alt descritivo em todas as fotos
- [x] Página de obrigado (noindex) e 404 personalizada
- [x] Botão do formulário desabilitado até tudo estar válido
- [x] WhatsApp flutuante no canto direito
- [x] Rodapé "Desenvolvido pro QH4 Growth"
- [x] Responsivo, foco visível no teclado e respeito a reduzir movimento
