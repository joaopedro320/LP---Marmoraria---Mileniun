# Tracking QH4: Marmoraria Milenium

Os slots são comentários `[QH4 SLOT n]` iguais em index.html, obrigado.html e 404.html. Cole o código em todas as páginas que tiverem o slot.

| Slot | Onde | O que colar |
|---|---|---|
| 1 | Primeira linha do `<head>` | Script do Google Tag Manager |
| 2 | `<head>`, depois das metas | Verificações de domínio (Search Console, Meta) |
| 3 | Antes do `</body>` | Meta Pixel direto, **só se não usar GTM** |
| 4 | Antes do `</body>` | gtag Google Ads / GA4 direto, **só se não usar GTM** |
| 5 | Logo após o `<body>` | `<noscript>` do GTM |
| 6 | Antes do `</body>` | Scripts de terceiros (chat, heatmap) |
| 7 | `assets/js/tracking.js` | WhatsApp, `webhookUrl`, `googleAdsId`, `googleAdsLeadLabel`, tempo de redirecionamento |
| 8 | Script do obrigado.html | Conversão do Google Ads via gtag (usa os valores do slot 7, só sem GTM) |

## Com GTM (recomendado)

Gatilhos de Evento personalizado no GTM:
- `generate_lead`: conversão principal (Google Ads Lead + Meta `Lead`)
- `whatsapp_click`: conversão secundária (Meta `Contact`), use `wa_local` como variável
- `thank_you_view`: alternativa de conversão por página
- `form_start`: micro conversão para público

Variáveis de dataLayer úteis: `ambiente`, `material`, `prazo`, `fase`, `cidade`, `wa_local`.

## Sem GTM

1. Cole o gtag no slot 4 e o Pixel no slot 3 das três páginas.
2. Preencha `googleAdsId` e `googleAdsLeadLabel` em `assets/js/tracking.js`. A conversão dispara sozinha no obrigado (slot 8).
3. Para o Pixel, adicione `fbq('track','Lead')` no slot 8.
