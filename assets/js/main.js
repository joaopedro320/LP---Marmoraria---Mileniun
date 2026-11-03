(function () {
  "use strict";
  var C = window.QH4_CONFIG;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Entrada do hero */
  requestAnimationFrame(function () { document.body.classList.add("carregou"); });

  /* Ano no rodapé */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* Topo muda ao rolar */
  var topo = document.getElementById("topo");
  var onScroll = function () { topo.classList.toggle("rolou", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* Links de WhatsApp com rastreio */
  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = window.qh4WaLink();
    a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", function () {
      window.qh4Track("whatsapp_click", { wa_local: a.getAttribute("data-wa-local") || "indefinido" });
    });
  });

  /* Parallax leve na chapa do hero */
  var px = document.querySelector(".js-parallax");
  if (px && !reduz) {
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        px.style.transform = "translateY(" + (-y * 0.08) + "px)";
        tick = false;
      });
    }, { passive: true });
  }

  /* Reveal ao rolar */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduz) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revs.forEach(function (r) { io.observe(r); });
  } else { revs.forEach(function (r) { r.classList.add("visivel"); }); }

  /* Mostruário de materiais (abas) */
  var MATS = [
    { nome: "Quartzitos", img: "assets/img/quartzito-bancada-esculpida.webp", w: 640, h: 640, alt: "Bancada em quartzito com cuba esculpida na própria pedra",
      desc: "Pedra natural de veios marcantes, para quem quer uma peça única na cozinha, no banheiro ou na escada. É uma das especialidades da Milenium.", cta: "Quero orçar em quartzito", val: "Quartzito" },
    { nome: "Lâminas ultracompactas", img: "assets/img/lamina-ilha-cascata.webp", w: 900, h: 1600, alt: "Ilha em lâmina com veios e acabamento em cascata",
      desc: "Placas de grande formato que permitem ilhas em cascata, bancadas contínuas e revestimentos com poucas emendas. Outra especialidade da casa.", cta: "Quero orçar em lâmina", val: "Lâmina ultracompacta" },
    { nome: "Quartzo", img: "assets/img/quartzo-ilha-branca.webp", w: 1200, h: 1600, alt: "Ilha branca com cooktop e banquetas",
      desc: "Superfície de cor uniforme para bancadas de cozinha e banheiro, com acabamento limpo e moderno.", cta: "Quero orçar em quartzo", val: "Quartzo" },
    { nome: "Mármores e granitos", img: "assets/img/granito-preto-cuba.webp", w: 1200, h: 1600, alt: "Bancada em pedra preta com cuba e torneira dourada",
      desc: "Rochas ornamentais nacionais e importadas, em diferentes cores e acabamentos, para bancadas, escadas e lareiras.", cta: "Quero orçar em mármore ou granito", val: "Mármore ou granito" }
  ];
  var abas = Array.prototype.slice.call(document.querySelectorAll(".mat-abas [role=tab]"));
  var painel = document.getElementById("painel-mat");
  var matImg = painel && painel.querySelector(".mat-img");
  var matNome = painel && painel.querySelector(".mat-nome");
  var matDesc = painel && painel.querySelector(".mat-desc");
  var matCta = painel && painel.querySelector(".js-mat-cta");
  function selecionaMat(i, foco) {
    abas.forEach(function (b, j) {
      var on = j === i;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      if (on && foco) b.focus();
    });
    var m = MATS[i];
    painel.setAttribute("aria-labelledby", abas[i].id);
    matImg.classList.add("trocando");
    setTimeout(function () {
      matImg.src = m.img; matImg.width = m.w; matImg.height = m.h; matImg.alt = m.alt;
      matNome.textContent = m.nome; matDesc.textContent = m.desc;
      matCta.textContent = m.cta; matCta.setAttribute("data-material", m.val);
      matImg.onload = function () { matImg.classList.remove("trocando"); };
      if (matImg.complete) matImg.classList.remove("trocando");
    }, reduz ? 0 : 260);
  }
  abas.forEach(function (b, i) {
    b.addEventListener("click", function () { selecionaMat(i); });
    b.addEventListener("keydown", function (e) {
      var k = e.key, n = abas.length;
      if (k === "ArrowDown" || k === "ArrowRight") { e.preventDefault(); selecionaMat((i + 1) % n, true); }
      if (k === "ArrowUp" || k === "ArrowLeft") { e.preventDefault(); selecionaMat((i - 1 + n) % n, true); }
    });
  });
  MATS.forEach(function (m) { var p = new Image(); p.src = m.img; });
  if (matCta) matCta.addEventListener("click", function () {
    var sel = document.getElementById("f-material");
    var v = matCta.getAttribute("data-material");
    Array.prototype.forEach.call(sel.options, function (o) { if (o.text === v) sel.value = o.value || o.text; });
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  });

  /* Lista de peças com prévia */
  var prev = document.querySelector(".pecas-preview-img");
  var pecas = document.querySelectorAll(".peca");
  function mostraPeca(btn) {
    pecas.forEach(function (p) { p.classList.toggle("ativa", p === btn); });
    var src = btn.getAttribute("data-img");
    if (!prev || prev.getAttribute("src") === src) return;
    prev.classList.add("trocando");
    setTimeout(function () {
      prev.src = src;
      prev.onload = function () { prev.classList.remove("trocando"); };
      if (prev.complete) prev.classList.remove("trocando");
    }, reduz ? 0 : 200);
  }
  pecas.forEach(function (p, i) {
    var pre = new Image(); pre.src = p.getAttribute("data-img");
    p.addEventListener("mouseenter", function () { mostraPeca(p); });
    p.addEventListener("focus", function () { mostraPeca(p); });
    p.addEventListener("click", function () { mostraPeca(p); });
    if (i === 0) p.classList.add("ativa");
  });

  /* Filtro da galeria */
  var filtros = document.querySelectorAll(".filtro");
  var obras = document.querySelectorAll(".obra");
  filtros.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.getAttribute("data-filtro");
      filtros.forEach(function (x) { x.setAttribute("aria-pressed", x === f ? "true" : "false"); });
      obras.forEach(function (o) {
        var mostra = cat === "todas" || o.getAttribute("data-cat") === cat;
        o.classList.toggle("oculta", !mostra);
      });
    });
  });

  /* Formulário */
  var form = document.getElementById("form-orcamento");
  if (!form) return;
  var btn = document.getElementById("f-enviar");
  var ajuda = document.getElementById("f-ajuda");
  var whats = document.getElementById("f-whats");
  var comecou = false;

  whats.addEventListener("input", function () {
    var d = whats.value.replace(/\D/g, "").slice(0, 11);
    var out = d;
    if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    whats.value = out;
  });

  function valida() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    ajuda.textContent = ok ? "Tudo certo. Ao enviar, você fala com a Milenium no WhatsApp." : "Preencha os campos para liberar o envio.";
  }
  ["input", "change"].forEach(function (ev) {
    form.addEventListener(ev, function (e) {
      if (!comecou) { comecou = true; window.qh4Track("form_start", { form_id: "orcamento" }); }
      if (e.target && e.target.classList) e.target.classList.add("tocado");
      valida();
    });
  });
  valida();

  function dados() {
    var fd = new FormData(form), o = {};
    fd.forEach(function (v, k) { o[k] = String(v).trim(); });
    return o;
  }
  function montaMensagem(d) {
    var linhas = [
      "Olá, vim pelo site da Milenium e quero um orçamento.",
      "",
      "Nome: " + d.nome,
      "WhatsApp: " + d.whatsapp,
      "Cidade: " + d.cidade,
      "Bairro/condomínio: " + d.bairro,
      "Ambiente: " + d.ambiente,
      "Material: " + d.material,
      "Fase do projeto: " + d.fase,
      "Prazo: " + d.prazo
    ];
    if (d.detalhes) linhas.push("Detalhes: " + d.detalhes);
    return linhas.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var d = dados();
    btn.disabled = true; btn.textContent = "Enviando...";
    window.qh4Track("generate_lead", { form_id: "orcamento", ambiente: d.ambiente, material: d.material, prazo: d.prazo, fase: d.fase, cidade: d.cidade });

    var msg;
    if (C.webhookUrl) {
      msg = C.mensagemPosFormulario;
      var corpo = Object.assign({ origem: "LP Milenium", pagina: location.href, data: new Date().toISOString() }, d);
      fetch(C.webhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(corpo) })
        .catch(function () {})
        .finally(function () { segue(msg); });
    } else {
      msg = montaMensagem(d);
      segue(msg);
    }
  });

  function segue(msg) {
    try { sessionStorage.setItem("qh4_wa_msg", msg); } catch (e) {}
    location.href = "obrigado.html?m=" + encodeURIComponent(msg);
  }
})();
