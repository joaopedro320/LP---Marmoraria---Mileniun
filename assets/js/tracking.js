// QH4 tracking config for this landing page. Edit the values in QH4_CONFIG below.
/* [QH4 SLOT 7] Configuração da LP Marmoraria Milenium
   Tudo que muda por cliente fica aqui. As páginas index, obrigado e 404 leem este arquivo. */
window.QH4_CONFIG = {
  cliente: "Marmoraria Milenium",
  whatsapp: "5515974019944",                       // DDI + DDD + número, só dígitos
  mensagemPadraoWhats: "Olá, vim pelo site da Milenium e gostaria de um orçamento.",
  mensagemPosFormulario: "Olá, acabei de preencher o formulário no site. Aguardo mais informações.",
  // Google Apps Script (deixe vazio para enviar o formulário direto pelo WhatsApp com todos os campos)
  webhookUrl: "",
  // Rótulos de conversão (preencha só se usar gtag direto, sem GTM: SLOT 4 e SLOT 8)
  googleAdsId: "",          // ex.: "AW-123456789"
  googleAdsLeadLabel: "",   // ex.: "AbCdEfGhIjk"
  redirecionarEmMs: 2500    // tempo na página de obrigado antes de abrir o WhatsApp
};

window.dataLayer = window.dataLayer || [];
window.qh4Track = function (evento, dados) {
  try { window.dataLayer.push(Object.assign({ event: evento }, dados || {})); } catch (e) {}
};
window.qh4WaLink = function (mensagem) {
  var c = window.QH4_CONFIG;
  return "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(mensagem || c.mensagemPadraoWhats);
};
document.documentElement.classList.add("js");
