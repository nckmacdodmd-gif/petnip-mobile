// =============================================================
// PETNIP — app.js  (protótipo 100% local · sem Firebase · sem backend)
// Todos os dados são mockados e vivem no navegador (localStorage).
// =============================================================
(function () {
  "use strict";

  // ---------- Atalhos seguros ----------
  // `on` ignora elementos que não existem, então um id faltando no HTML
  // nunca derruba o resto do app.
  const $ = (id) => document.getElementById(id);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const on = (el, type, fn, opts) => { if (el) el.addEventListener(type, fn, opts); };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const store = {
    get(key, fallback) {
      try { const raw = localStorage.getItem("petnip:" + key); return raw ? JSON.parse(raw) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("petnip:" + key, JSON.stringify(value)); } catch (e) { /* sem storage: segue só em memória */ }
    }
  };

  // -----------------------------------------------------------
  // 1) DADOS MOCKADOS
  // -----------------------------------------------------------
  const IMG = (id) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

  const SPECIES = {
    cachorro: { label: "Cachorro", emoji: "🐶" },
    gato: { label: "Gato", emoji: "🐱" },
    passaro: { label: "Pássaro", emoji: "🦜" },
    silvestre: { label: "Silvestre", emoji: "🦊" }
  };

  // Foto padrão por espécie (usada quando o usuário não informa um link)
  const DEFAULT_PHOTOS = {
    cachorro: IMG("photo-1543466835-00a7907e9de1"),
    gato: IMG("photo-1495360010541-f48722b34f7d"),
    passaro: IMG("photo-1444464666168-49d633b86797"),
    silvestre: IMG("photo-1474511320723-9a56873867b5")
  };

  const PETS = [
    {
      id: "p1", nome: "Bob", especie: "cachorro", raca: "Beagle", idade: "2 anos", cidade: "Carapicuíba, SP",
      porte: "Médio porte", temperamento: "Dócil", saude: "Vacinado", sociavel: "Sociável", dono: "me",
      foto: IMG("photo-1543466835-00a7907e9de1"),
      descricao: "Bob é um cachorrinho de 2 anos, muito dócil e brincalhão. Se dá bem com outros animais, faz xixi no lugar certo e adora passear. Já está castrado e pronto para ganhar uma nova família."
    },
    {
      id: "p2", nome: "Luna", especie: "gato", raca: "Vira-lata (SRD)", idade: "1 ano", cidade: "Osasco, SP",
      porte: "Pequeno porte", temperamento: "Independente", saude: "Castrada", sociavel: "Tímida no início", dono: "me",
      foto: IMG("photo-1495360010541-f48722b34f7d"),
      descricao: "Luna é uma gatinha calma que adora dormir no sol. Leva um tempinho para confiar em pessoas novas, mas depois vira sombra. Já é castrada e vacinada."
    },
    {
      id: "p3", nome: "Thor", especie: "cachorro", raca: "Golden Retriever", idade: "4 anos", cidade: "Barueri, SP",
      porte: "Grande porte", temperamento: "Protetor", saude: "Vacinado", sociavel: "Sociável com adultos", dono: "outro",
      foto: IMG("photo-1552053831-71594a27632d"),
      descricao: "Thor é forte, brincalhão e extremamente leal. Ideal para quem tem espaço e experiência com cães de porte grande. Já está castrado."
    },
    {
      id: "p4", nome: "Marley", especie: "cachorro", raca: "Pastor Australiano", idade: "6 meses", cidade: "São Paulo, SP",
      porte: "Pequeno porte", temperamento: "Elétrico", saude: "Vacinas em dia", sociavel: "Adora crianças", dono: "outro",
      foto: IMG("photo-1587300003388-59208cc962cb"),
      descricao: "Filhote cheio de energia, ótimo para famílias ativas. Já está em processo de adestramento básico e adora brincar de bolinha."
    },
    {
      id: "p5", nome: "Mia", especie: "gato", raca: "British Shorthair", idade: "3 anos", cidade: "Cotia, SP",
      porte: "Médio porte", temperamento: "Carinhosa", saude: "Castrada", sociavel: "Sociável", dono: "outro",
      foto: IMG("photo-1533738363-b7f9aef128ce"),
      descricao: "Mia é super carinhosa e adora colo. Se dá bem com outros gatos e já viveu com crianças. Está com todas as vacinas em dia."
    },
    {
      id: "p6", nome: "Piu", especie: "passaro", raca: "Canário-da-terra", idade: "1 ano", cidade: "Jandira, SP",
      porte: "Pequeno porte", temperamento: "Cantador", saude: "Saudável", sociavel: "Sociável", dono: "outro",
      foto: IMG("photo-1444464666168-49d633b86797"),
      descricao: "Piu é um canário alegre que canta todas as manhãs. Precisa de uma gaiola espaçosa e companhia frequente."
    },
    {
      id: "p7", nome: "Simba", especie: "gato", raca: "Frajola (SRD)", idade: "5 meses", cidade: "Osasco, SP",
      porte: "Pequeno porte", temperamento: "Brincalhão", saude: "Vacinado", sociavel: "Sociável", dono: "outro",
      foto: IMG("photo-1514888286974-6c03e2ca1dba"),
      descricao: "Filhote curioso e cheio de energia. Adora brinquedos com penas e já está usando caixa de areia direitinho."
    },
    {
      id: "p8", nome: "Nina", especie: "silvestre", raca: "Raposa-do-campo", idade: "2 anos", cidade: "Itapevi, SP",
      porte: "Pequeno porte", temperamento: "Calma", saude: "Reabilitada", sociavel: "Requer manejo especial", dono: "outro",
      foto: IMG("photo-1474511320723-9a56873867b5"),
      descricao: "Nina foi resgatada e reabilitada por um centro parceiro. Adoção sujeita a avaliação e autorização do órgão ambiental responsável."
    }
  ];

  // Pets que o usuário divulgou em sessões anteriores
  store.get("meusPets", []).forEach((p) => PETS.unshift(p));

  let TASKS = [
    { id: "t1", text: "Tomar vacina antirrábica" },
    { id: "t2", text: "Comprar ração" },
    { id: "t3", text: "Passeio da tarde" },
    { id: "t4", text: "Dar vermífugo" }
  ];

  const tarefasFeitas = store.get("tarefasFeitas", []);
  TASKS.forEach((t) => { t.done =
    tarefasFeitas.includes(t.id); });
  
  const NOTIFS = [
    { id: "n1", icone: "🐶", texto: "Novo pet perto de você: Marley, 6 meses", tempo: "há 5 min", acao: { pet: "p4" } },
    { id: "n2", icone: "💬", texto: "Maria enviou uma mensagem sobre a Luna", tempo: "há 1 h", acao: { view: "mensagens" } },
    { id: "n3", icone: "💉", texto: "Lembrete: vermífugo do Thor vence amanhã", tempo: "ontem", acao: { view: "perfil" } }
  ];

  const CHATS = [
    { id: "c1", nome: "Maria", avatar: "🐱", msg: "Oi! A Luna ainda está disponível?", hora: "10:42", nao: 2 },
    { id: "c2", nome: "ONG Patas Felizes", avatar: "🐶", msg: "Podemos agendar a visita para sábado?", hora: "Ontem", nao: 0 },
    { id: "c3", nome: "Carlos", avatar: "🦜", msg: "Obrigado pelas dicas sobre o Piu!", hora: "Seg", nao: 0 }
  ];

  const TIPS = [
    "💉 Mantenha a vacinação do seu pet sempre em dia.",
    "🐱 Prateleiras e arranhadores deixam a casa 'gatificada'.",
    "🚶 Passeios diários ajudam a gastar a energia dos cães.",
    "🏠 Antes de adotar, converse com todos que moram com você.",
    "💚 Castrar é um ato de amor e ajuda a reduzir abandono."
  ];

  // -----------------------------------------------------------
  // 2) ESTADO
  // -----------------------------------------------------------
  // Foto de perfil local (com a URL do GitHub como plano B)
const PROFILE_PHOTO = "./assets/imagens/my-notion-faceportrait.png";
const PROFILE_PHOTO_FALLBACK = "https://
raw.githubusercontent.com/nckmacdodmd-gif/petnip-mobile/
82ffac04866d87a2bddac1d142e5e07c9d893b71/assets/imagens/mynotion-face-portrait.png";
  
  
  const state = {
    loading: true,
    filtroEspecie: "todos",
    busca: "",
    favoritos: store.get("favoritos", []),
    notifLidas: store.get("notifLidas", []),
    user: store.get("user", {
      nome: "Toninho Silva",
      cidade: "Carapicuíba, SP",
      foto: PROFILE_PHOTO
    }),
    modo: "adotante"
  };

  let pendingPetId = null;
  let tipIndex = 0;

  // -----------------------------------------------------------
  // 3) ELEMENTOS
  // -----------------------------------------------------------
  const els = {};
  [
    "menuBtn", "notifBtn", "notifDot", "notifPanel", "notifList", "notifReadAll",
    "searchInput", "speciesTabs", "bannerTip",
    "drawer", "drawerOverlay", "drawerClose", "drawerAvatar", "drawerName", "drawerCity",
    "petGrid", "favGrid", "feedCount", "favCount", "emptyFeed", "emptyFav",
    "chatList", "chatCount",
    "profileAvatar", "profileName", "profileSub", "editProfileBtn",
    "statDivulgados", "statFavoritos", "modeSwitch", "modeAdotante", "modeTutor",
    "taskList", "emptyTasks", "myPetsList", "emptyMyPets",
    "fabAdd", "bottomNav", "toast",
    "petModalOverlay", "modalCloseBtn", "modalPhoto", "modalBadges", "modalPetName", "modalPetMeta",
    "modalPetDesc", "modalAdotarBtn", "modalApadrinharBtn",
    "formModalOverlay", "formCloseBtn", "petForm",
    "profileModalOverlay", "profileModalClose", "profileForm", "epNome", "epCidade",
    "successOverlay", "successLottie", "successConfetti", "successDesc"
  ].forEach((id) => { els[id] = $(id); });

  // -----------------------------------------------------------
  // 4) IMAGENS COM PLANO B
  // -----------------------------------------------------------
  // Se uma foto não carregar (link quebrado/sem internet), troca por um
  // desenho com emoji — o card nunca fica "quebrado".
  const FALLBACK_EMOJI = { cachorro: "🐶", gato: "🐱", passaro: "🦜", silvestre: "🦊", user: "🧑" };

  function placeholderSrc(key) {
    const emoji = FALLBACK_EMOJI[key] || "🐾";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="340" viewBox="0 0 400 340">' +
      '<rect width="400" height="340" fill="#EAE1D3"/>' +
      '<text x="200" y="190" font-size="120" text-anchor="middle">' + emoji + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

 document.addEventListener("error", (e) => {
const img = e.target;
if (!img || img.tagName !== "IMG") return;
// 1º plano B: endereço alternativo (ex.: URL do GitHub)
if (img.dataset.altsrc && !img.dataset.triedAlt) {
img.dataset.triedAlt = "1";
img.src = img.dataset.altsrc;
return;
}
// 2º plano B: desenho com emoji

   if (img.dataset.fallback && !img.dataset.failed) {
img.dataset.failed = "1";
img.src = placeholderSrc(img.dataset.fallback);
}
}, true);

  // -----------------------------------------------------------
  // 5) UTILITÁRIOS DE UI (overlays, toast, navegação)
  // -----------------------------------------------------------
  function syncScrollLock() {
    const open = document.querySelector(".modal-overlay.is-open, .success-overlay.is-open, .drawer.is-open");
    document.body.style.overflow = open ? "hidden" : "";
  }

  function openOverlay(el) {
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    syncScrollLock();
  }

  function closeOverlay(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    syncScrollLock();
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!els.toast) return;
    els.toast.textContent = msg;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
  }

  const VIEWS = ["feed", "favoritos", "mensagens", "perfil"];

  function switchView(name) {
    if (VIEWS.indexOf(name) === -1) return;
    VIEWS.forEach((v) => {
      const section = $("view-" + v);
      if (section) section.classList.toggle("is-active", v === name);
    });
    $$(".nav-item").forEach((btn) => {
      const active = btn.dataset.view === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-current", active ? "page" : "false");
    });
    document.body.dataset.view = name;
    closeDrawer();
    closeNotif();
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) { /* ignora */ }
  }

  // -----------------------------------------------------------
  // 6) CARDS, SKELETON E FEED
  // -----------------------------------------------------------
  function heartSvg(filled) {
    const d = "M12 20.2s-7.5-4.6-9.8-9.1C.7 7.6 2.3 4.4 5.6 3.7c2-.4 3.8.5 5 2.2a1 1 0 0 0 1.6 0c1.2-1.7 3-2.6 5-2.2 3.3.7 4.9 3.9 3.4 7.4-2.3 4.5-9.6 9.1-9.6 9.1Z";
    return filled
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="#FD5A46"><path d="${d}"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="${d}" stroke="#552CB7" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
  }

  function badgeHtml(text, type) {
    return `<span class="badge badge--${type}">${esc(text)}</span>`;
  }

  function cardHtml(pet) {
    const isFav = state.favoritos.includes(pet.id);
    return `
      <article class="pet-card" data-id="${esc(pet.id)}">
        <div class="pet-card__photo-wrap" data-action="open">
          <img src="${esc(pet.foto)}" alt="Foto de ${esc(pet.nome)}" loading="lazy" data-fallback="${esc(pet.especie)}">
          <button class="pet-card__fav ${isFav ? "is-fav" : ""}" data-action="fav" aria-pressed="${isFav}" aria-label="Favoritar ${esc(pet.nome)}">${heartSvg(isFav)}</button>
          <div class="pet-card__badges">
            ${badgeHtml(pet.porte, "porte")}
            ${badgeHtml(pet.temperamento, "temperamento")}
          </div>
        </div>
        <div class="pet-card__info">
          <div>
            <div class="pet-card__name-row">
              <span class="pet-card__name">${esc(pet.nome)}</span>
              <span class="pet-card__age">${esc(pet.idade)}</span>
            </div>
            <p class="pet-card__location">${esc(pet.raca)} · 📍 ${esc(pet.cidade)}</p>
          </div>
          <div class="pet-card__actions">
            <button class="btn btn--outline" data-action="apadrinhar">Apadrinhar</button>
            <button class="btn btn--primary" data-action="adotar">Adotar</button>
          </div>
        </div>
      </article>`;
  }

  function skeletonCardHtml() {
    return `
      <article class="pet-card pet-card--skeleton" aria-hidden="true">
        <div class="pet-card__photo-wrap"><div class="skeleton skeleton--photo"></div></div>
        <div class="pet-card__info">
          <div class="pet-card__name-row">
            <span class="skeleton skeleton--text skeleton--name"></span>
            <span class="skeleton skeleton--text skeleton--age"></span>
          </div>
          <span class="skeleton skeleton--text skeleton--location"></span>
          <div class="skeleton-badges"><span class="skeleton skeleton--badge"></span><span class="skeleton skeleton--badge"></span></div>
          <div class="pet-card__actions"><span class="skeleton skeleton--btn"></span><span class="skeleton skeleton--btn"></span></div>
        </div>
      </article>`;
  }

  function getFilteredPets() {
    const q = norm(state.busca.trim());
    return PETS.filter((pet) => {
      const okEspecie = state.filtroEspecie === "todos" || pet.especie === state.filtroEspecie;
      const okBusca = !q || [pet.nome, pet.raca, pet.cidade, pet.temperamento, (SPECIES[pet.especie] || {}).label || ""]
        .some((field) => norm(field).includes(q));
      return okEspecie && okBusca;
    });
  }

  function animateGrid(grid) {
    if (!grid) return;
    grid.classList.add("is-entering");
    setTimeout(() => grid.classList.remove("is-entering"), 600);
  }

  function renderFeed() {
    if (state.loading || !els.petGrid) return; // enquanto o skeleton está na tela, não mexe
    const pets = getFilteredPets();
    els.petGrid.innerHTML = pets.map(cardHtml).join("");
    els.petGrid.removeAttribute("aria-busy");
    animateGrid(els.petGrid);
    if (els.feedCount) els.feedCount.textContent = `${pets.length} ${pets.length === 1 ? "disponível" : "disponíveis"}`;
    if (els.emptyFeed) els.emptyFeed.hidden = pets.length !== 0;
  }

  function renderFavoritos() {
    const pets = PETS.filter((p) => state.favoritos.includes(p.id));
    if (els.favGrid) els.favGrid.innerHTML = pets.map(cardHtml).join("");
    if (els.favGrid) els.favGrid.hidden = pets.length === 0;
    if (els.favCount) els.favCount.textContent = `${pets.length} ${pets.length === 1 ? "salvo" : "salvos"}`;
    if (els.emptyFav) els.emptyFav.hidden = pets.length !== 0;
    if (els.statFavoritos) els.statFavoritos.textContent = String(pets.length);
  }

  // Skeleton Screen: 1.2 s exatos, depois troca pelos cards reais
  function loadFeed() {
    state.loading = true;
    if (els.petGrid) {
      els.petGrid.setAttribute("aria-busy", "true");
      els.petGrid.innerHTML = [1, 2, 3, 4].map(skeletonCardHtml).join("");
    }
    if (els.emptyFeed) els.emptyFeed.hidden = true;
    if (els.feedCount) els.feedCount.textContent = "Carregando...";

    setTimeout(() => {
      state.loading = false;
      renderFeed();
    }, 1200);
  }

  // Atualiza só os corações (sem redesenhar os cards nem reiniciar animações)
  function syncFavButtons() {
    $$(".pet-card[data-id]").forEach((card) => {
      const btn = card.querySelector(".pet-card__fav");
      if (!btn) return;
      const isFav = state.favoritos.includes(card.dataset.id);
      btn.classList.toggle("is-fav", isFav);
      btn.setAttribute("aria-pressed", String(isFav));
      btn.innerHTML = heartSvg(isFav);
    });
  }

  function toggleFavorite(id) {
    const idx = state.favoritos.indexOf(id);
    if (idx === -1) {
      state.favoritos.push(id);
      showToast("Adicionado aos favoritos 💛");
    } else {
      state.favoritos.splice(idx, 1);
      showToast("Removido dos favoritos");
    }
    store.set("favoritos", state.favoritos);
    syncFavButtons();
    renderFavoritos();
  }

  function handleGridClick(e) {
    const card = e.target.closest(".pet-card");
    if (!card || card.classList.contains("pet-card--skeleton")) return;
    const id = card.dataset.id;
    const actionEl = e.target.closest("[data-action]");
    const action = actionEl ? actionEl.dataset.action : null;

    if (action === "fav") toggleFavorite(id);
    else if (action === "adotar" || action === "open") openPetModal(id);
    else if (action === "apadrinhar") showToast("Apadrinhamento iniciado — em breve você recebe os detalhes 💌");
  }

  on(els.petGrid, "click", handleGridClick);
  on(els.favGrid, "click", handleGridClick);

  // -----------------------------------------------------------
  // 7) BUSCA, CATEGORIAS E BANNER
  // -----------------------------------------------------------
  on(els.searchInput, "input", (e) => {
    state.busca = e.target.value;
    renderFeed();
  });

  on(els.speciesTabs, "click", (e) => {
    const tab = e.target.closest(".species-tab");
    if (!tab) return;
    $$(".species-tab", els.speciesTabs).forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    state.filtroEspecie = tab.dataset.species;
    renderFeed();
  });

  function showTip() {
    showToast(TIPS[tipIndex % TIPS.length]);
    tipIndex += 1;
  }
  on(els.bannerTip, "click", showTip);

  // -----------------------------------------------------------
  // 8) NAVEGAÇÃO INFERIOR
  // -----------------------------------------------------------
  on(els.bottomNav, "click", (e) => {
    const btn = e.target.closest(".nav-item");
    if (btn) switchView(btn.dataset.view);
  });

  // -----------------------------------------------------------
  // 9) MENU LATERAL (hambúrguer)
  // -----------------------------------------------------------
  function openDrawer() {
    closeNotif();
    if (els.drawer) { els.drawer.classList.add("is-open"); els.drawer.setAttribute("aria-hidden", "false"); }
    if (els.drawerOverlay) els.drawerOverlay.classList.add("is-open");
    if (els.menuBtn) els.menuBtn.setAttribute("aria-expanded", "true");
    syncScrollLock();
  }

  function closeDrawer() {
    if (els.drawer) { els.drawer.classList.remove("is-open"); els.drawer.setAttribute("aria-hidden", "true"); }
    if (els.drawerOverlay) els.drawerOverlay.classList.remove("is-open");
    if (els.menuBtn) els.menuBtn.setAttribute("aria-expanded", "false");
    syncScrollLock();
  }

  on(els.menuBtn, "click", () => (els.drawer && els.drawer.classList.contains("is-open") ? closeDrawer() : openDrawer()));
  on(els.drawerClose, "click", closeDrawer);
  on(els.drawerOverlay, "click", closeDrawer);

  on(els.drawer, "click", (e) => {
    const item = e.target.closest("[data-drawer]");
    if (!item) return;
    const action = item.dataset.drawer;
    closeDrawer();
    if (action === "perfil" || action === "favoritos" || action === "mensagens") switchView(action);
    else if (action === "divulgar") openOverlay(els.formModalOverlay);
    else if (action === "dicas") showTip();
    else if (action === "sobre") showToast("Petnip conecta pets que precisam de um lar a pessoas dispostas a amar 💚");
  });

  // -----------------------------------------------------------
  // 10) NOTIFICAÇÕES (sino)
  // -----------------------------------------------------------
  function renderNotifs() {
    if (els.notifList) {
      els.notifList.innerHTML = NOTIFS.map((n) => {
        const unread = !state.notifLidas.includes(n.id);
        return `<li><button class="notif-item ${unread ? "is-unread" : ""}" data-notif="${esc(n.id)}">
            <span class="notif-item__icon" aria-hidden="true">${n.icone}</span>
            <span class="notif-item__text">${esc(n.texto)}<span class="notif-item__time">${esc(n.tempo)}</span></span>
          </button></li>`;
      }).join("");
    }
    const unreadCount = NOTIFS.filter((n) => !state.notifLidas.includes(n.id)).length;
    if (els.notifDot) els.notifDot.hidden = unreadCount === 0;
  }

  function openNotif() {
    closeDrawer();
    if (els.notifPanel) els.notifPanel.hidden = false;
    if (els.notifBtn) els.notifBtn.setAttribute("aria-expanded", "true");
  }

  function closeNotif() {
    if (els.notifPanel) els.notifPanel.hidden = true;
    if (els.notifBtn) els.notifBtn.setAttribute("aria-expanded", "false");
  }

  on(els.notifBtn, "click", (e) => {
    e.stopPropagation();
    if (els.notifPanel && els.notifPanel.hidden) openNotif(); else closeNotif();
  });

  on(els.notifReadAll, "click", () => {
    state.notifLidas = NOTIFS.map((n) => n.id);
    store.set("notifLidas", state.notifLidas);
    renderNotifs();
  });

  on(els.notifList, "click", (e) => {
    const btn = e.target.closest("[data-notif]");
    if (!btn) return;
    const notif = NOTIFS.find((n) => n.id === btn.dataset.notif);
    if (!notif) return;
    if (!state.notifLidas.includes(notif.id)) state.notifLidas.push(notif.id);
    store.set("notifLidas", state.notifLidas);
    renderNotifs();
    closeNotif();
    if (notif.acao && notif.acao.pet) openPetModal(notif.acao.pet);
    else if (notif.acao && notif.acao.view) switchView(notif.acao.view);
  });

  // Clicar fora fecha o painel de notificações
  on(document, "click", (e) => {
    if (!els.notifPanel || els.notifPanel.hidden) return;
    if (e.target.closest("#notifPanel") || e.target.closest("#notifBtn")) return;
    closeNotif();
  });

  // -----------------------------------------------------------
  // 11) MENSAGENS (simuladas)
  // -----------------------------------------------------------
  function renderMessages() {
    if (els.chatList) {
      els.chatList.innerHTML = CHATS.map((c) => `
        <li><button class="chat-item" data-chat="${esc(c.id)}">
          <span class="chat-item__avatar" aria-hidden="true">${c.avatar}</span>
          <span class="chat-item__body">
            <span class="chat-item__name">${esc(c.nome)}</span>
            <span class="chat-item__msg">${esc(c.msg)}</span>
          </span>
          <span class="chat-item__meta">${esc(c.hora)}${c.nao ? `<br><span class="chat-item__unread">${c.nao}</span>` : ""}</span>
        </button></li>`).join("");
    }
    const total = CHATS.reduce((sum, c) => sum + c.nao, 0);
    if (els.chatCount) els.chatCount.textContent = total ? `${total} ${total === 1 ? "nova" : "novas"}` : "";
  }

  on(els.chatList, "click", (e) => {
    const btn = e.target.closest("[data-chat]");
    if (!btn) return;
    const chat = CHATS.find((c) => c.id === btn.dataset.chat);
    if (!chat) return;
    chat.nao = 0;
    renderMessages();
    showToast(`Conversa com ${chat.nome} abrirá aqui (protótipo) 💬`);
  });

  // -----------------------------------------------------------
  // 12) PERFIL SIMULADO + MODO + EDITAR
  // -----------------------------------------------------------
  function handleFrom(nome) {
    const first = norm(nome.trim().split(/\s+/)[0] || "tutor").replace(/[^a-z0-9]/g, "");
    return "@" + (first || "tutor");
  }

  function renderProfile() {
    const u = state.user;
    if (els.profileName) els.profileName.textContent = u.nome;
    if (els.profileSub) els.profileSub.textContent = `${handleFrom(u.nome)} · ${u.cidade}`;
    if (els.drawerName) els.drawerName.textContent = u.nome;
    if (els.drawerCity) els.drawerCity.textContent = u.cidade;
    [els.profileAvatar, els.drawerAvatar].forEach((img) => {
if (!img) return;
delete img.dataset.failed;
delete img.dataset.triedAlt;
img.dataset.altsrc = PROFILE_PHOTO_FALLBACK; // plano B se
o arquivo local não abrir
img.src = PROFILE_PHOTO;
});
    if (els.statDivulgados) els.statDivulgados.textContent = String(PETS.filter((p) => p.dono === "me").length);
  }

  function renderMyPets() {
    const mine = PETS.filter((p) => p.dono === "me");
    if (els.myPetsList) {
      els.myPetsList.innerHTML = mine.map((p) => `
        <li><button class="mypet" data-id="${esc(p.id)}">
          <img src="${esc(p.foto)}" alt="Foto de ${esc(p.nome)}" data-fallback="${esc(p.especie)}">
          <span>
            <span class="mypet__name">${esc(p.nome)}</span>
            <span class="mypet__meta">${esc(p.raca)} · ${esc(p.idade)} · ${esc(p.cidade)}</span>
          </span>
        </button></li>`).join("");
    }
    if (els.emptyMyPets) els.emptyMyPets.hidden = mine.length !== 0;
    if (els.statDivulgados) els.statDivulgados.textContent = String(mine.length);
  }

  on(els.myPetsList, "click", (e) => {
    const btn = e.target.closest(".mypet");
    if (btn) openPetModal(btn.dataset.id);
  });

  on(els.modeSwitch, "click", (e) => {
    const btn = e.target.closest("[data-mode]");
    if (!btn) return;
    state.modo = btn.dataset.mode;
    $$(".mode-switch__btn", els.modeSwitch).forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
    if (els.modeAdotante) els.modeAdotante.hidden = state.modo !== "adotante";
    if (els.modeTutor) els.modeTutor.hidden = state.modo !== "tutor";
  });

  on(els.editProfileBtn, "click", () => {
    if (els.epNome) els.epNome.value = state.user.nome;
    if (els.epCidade) els.epCidade.value = state.user.cidade;
    openOverlay(els.profileModalOverlay);
  });
  on(els.profileModalClose, "click", () => closeOverlay(els.profileModalOverlay));
  on(els.profileModalOverlay, "click", (e) => { if (e.target === els.profileModalOverlay) closeOverlay(els.profileModalOverlay); });

  on(els.profileForm, "submit", (e) => {
    e.preventDefault();
    const nome = els.epNome.value.trim();
    const cidade = els.epCidade.value.trim();
    if (!nome || !cidade) return;
    state.user.nome = nome;
    state.user.cidade = cidade;
    store.set("user", state.user);
    renderProfile();
    closeOverlay(els.profileModalOverlay);
    showToast("Perfil atualizado ✅");
  });

  // -----------------------------------------------------------
  // 13) MODAL DE DETALHES + ADOÇÃO (loading → sucesso)
  // -----------------------------------------------------------
  function openPetModal(id) {
    const pet = PETS.find((p) => p.id === id);
    if (!pet) return;
    pendingPetId = id;

    if (els.modalPhoto) {
      delete els.modalPhoto.dataset.failed;
      els.modalPhoto.dataset.fallback = pet.especie;
      els.modalPhoto.src = pet.foto;
      els.modalPhoto.alt = `Foto de ${pet.nome}`;
    }
    if (els.modalPetName) els.modalPetName.textContent = `${pet.nome} · ${pet.idade}`;
    if (els.modalPetMeta) els.modalPetMeta.textContent = `${pet.raca} · 📍 ${pet.cidade}`;
    if (els.modalPetDesc) els.modalPetDesc.textContent = pet.descricao;
    if (els.modalBadges) {
      els.modalBadges.innerHTML =
        badgeHtml(pet.porte, "porte") + badgeHtml(pet.temperamento, "temperamento") +
        badgeHtml(pet.saude, "saude") + badgeHtml(pet.sociavel, "sociavel");
    }
    openOverlay(els.petModalOverlay);
  }

  function closePetModal() {
    closeOverlay(els.petModalOverlay);
    pendingPetId = null;
  }

  on(els.modalCloseBtn, "click", closePetModal);
  on(els.petModalOverlay, "click", (e) => { if (e.target === els.petModalOverlay) closePetModal(); });

  on(els.modalApadrinharBtn, "click", () => {
    const pet = PETS.find((p) => p.id === pendingPetId);
    showToast(`Apadrinhamento de ${pet ? pet.nome : "pet"} iniciado 💛`);
    closePetModal();
  });

  on(els.modalAdotarBtn, "click", () => {
    const pet = PETS.find((p) => p.id === pendingPetId);
    confirmAdoption(pet);
  });

  // Ripple tátil em qualquer .btn / .fab / .icon-btn
  on(document, "click", (e) => {
    const el = e.target.closest(".btn, .fab, .icon-btn");
    if (!el || el.disabled || el.classList.contains("is-loading")) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x - rect.left - size / 2 + "px";
    ripple.style.top = y - rect.top - size / 2 + "px";
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // ---------- Animação de sucesso (Lottie com plano B em CSS) ----------
  const CONFETTI_COLORS = ["#FD5A46", "#FFC567", "#FB7DA8", "#058CD7", "#552CB7"];
  const PAW_SVG =
    '<svg class="paw-fallback" viewBox="0 0 160 160" aria-hidden="true"><g fill="#fff">' +
    '<ellipse cx="80" cy="90" rx="25" ry="21"/><ellipse cx="64" cy="66" rx="9" ry="9"/>' +
    '<ellipse cx="74" cy="58" rx="9" ry="9"/><ellipse cx="86" cy="58" rx="9" ry="9"/>' +
    '<ellipse cx="96" cy="66" rx="9" ry="9"/></g></svg>';

  let lottieAnim = null;
  let successTimer = null;

  function buildConfetti() {
    if (!els.successConfetti) return;
    els.successConfetti.innerHTML = "";
    const pieces = 14;
    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const rad = (((360 / pieces) * i + (Math.random() * 18 - 9)) * Math.PI) / 180;
      const dist = 90 + Math.random() * 46;
      piece.style.setProperty("--cx", Math.round(Math.cos(rad) * dist) + "px");
      piece.style.setProperty("--cy", Math.round(Math.sin(rad) * dist) + "px");
      piece.style.setProperty("--cr", Math.round(Math.random() * 320 - 160) + "deg");
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDelay = (Math.random() * 0.08).toFixed(2) + "s";
      if (Math.random() > 0.5) piece.style.borderRadius = "50%";
      els.successConfetti.appendChild(piece);
    }
  }

  function showPawFallback() {
    if (els.successLottie) els.successLottie.innerHTML = PAW_SVG;
  }

  function playSuccessLottie() {
    if (!els.successLottie) return;
    if (lottieAnim) { try { lottieAnim.destroy(); } catch (e) { /* ignora */ } lottieAnim = null; }
    els.successLottie.innerHTML = "";

    if (typeof lottie === "undefined") { showPawFallback(); return; } // CDN não carregou
    try {
      lottieAnim = lottie.loadAnimation({
        container: els.successLottie, renderer: "svg", loop: false, autoplay: true,
        path: "assets/success-lottie.json"
      });
      lottieAnim.addEventListener("data_failed", showPawFallback);
    } catch (e) {
      showPawFallback();
    }
  }

  function showSuccessAnimation(message, onClose) {
    if (els.successDesc) els.successDesc.textContent = message;
    buildConfetti();
    openOverlay(els.successOverlay);
    playSuccessLottie();

    clearTimeout(successTimer);
    successTimer = setTimeout(() => {
      closeOverlay(els.successOverlay);
      if (typeof onClose === "function") onClose();
    }, 2000);
  }

  function confirmAdoption(pet) {
    const btn = els.modalAdotarBtn;
    if (!pet || !btn || btn.classList.contains("is-loading")) return;

    if (pet.dono === "me") {
      showToast("Esse pet foi divulgado por você 😉");
      return;
    }

    const label = btn.querySelector(".btn__label");
    btn.classList.add("is-loading");
    if (label) label.textContent = "Enviando...";

    setTimeout(() => {
      btn.classList.remove("is-loading");
      if (label) label.textContent = "Quero adotar";
      closePetModal();
      showSuccessAnimation(
        `${pet.nome} ficará muito feliz! Em breve o tutor entra em contato. 🐾`,
        () => switchView("feed")
      );
    }, 1100 + Math.random() * 400);
  }

  // -----------------------------------------------------------
  // 14) FAB — DIVULGAR PET (salva direto no feed local)
  // -----------------------------------------------------------
  on(els.fabAdd, "click", () => openOverlay(els.formModalOverlay));
  on(els.formCloseBtn, "click", () => closeOverlay(els.formModalOverlay));
  on(els.formModalOverlay, "click", (e) => { if (e.target === els.formModalOverlay) closeOverlay(els.formModalOverlay); });

  on(els.petForm, "submit", (e) => {
    e.preventDefault();
    const nome = $("fNome").value.trim();
    const especie = $("fEspecie").value;
    const idade = $("fIdade").value.trim();
    const cidade = $("fCidade").value.trim();
    const raca = $("fRaca").value.trim();
    const fotoUrl = $("fFoto").value.trim();
    const desc = $("fDesc").value.trim();
    if (!nome || !idade || !cidade) return;

    const novoPet = {
      id: "u" + Date.now(),
      nome, especie, idade, cidade,
      raca: raca || "Sem raça definida",
      porte: "Porte a definir",
      temperamento: "Novo no Petnip",
      saude: "A confirmar",
      sociavel: "A confirmar",
      foto: /^https?:\/\//i.test(fotoUrl) ? fotoUrl : DEFAULT_PHOTOS[especie],
      descricao: desc || `${nome} está à procura de uma nova família cheia de amor.`,
      dono: "me"
    };

    PETS.unshift(novoPet);
    store.set("meusPets", PETS.filter((p) => p.id.charAt(0) === "u"));

    els.petForm.reset();
    closeOverlay(els.formModalOverlay);

    // Garante que o pet novo apareça: limpa busca e filtro
    state.busca = "";
    state.filtroEspecie = "todos";
    if (els.searchInput) els.searchInput.value = "";
    $$(".species-tab", els.speciesTabs).forEach((t) => t.classList.toggle("is-active", t.dataset.species === "todos"));

    renderFeed();
    renderFavoritos();
    renderMyPets();
    renderProfile();
    switchView("feed");
    showToast(`${nome} foi publicado no feed! 🎉`);
  });

  // -----------------------------------------------------------
  // 15) CUIDADOS DO PET — "Swipe to Delete" (toque e mouse)
  // -----------------------------------------------------------
  let openSwipeItem = null;
  let dragState = null;

  const TRASH_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m1 0-.7 12.1a2 2 0 0 1-2 1.9H10.7a2 2 0 0 1-2-1.9L8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const CHECK_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5"
    stroke="currentColor" stroke-width="3.2" stroke-linecap="round"
    stroke-linejoin="round"/></svg>';
  
  function taskItemHtml(task) {
    return `
      <li class="task-item ${task.done ? "is-done" : ""}" dataid="${esc(task.id)}">
      <div class="task-item__content">
      <button class="task-check" data-action="toggle" ariapressed="${task.done ? "true" : "false"}" aria-label="Marcar como concluído: ${esc(task.text)}">
      <span class="task-check__box">${CHECK_ICON}</span>
      </button>

          <span class="task-text">${esc(task.text)}</span>
          <button class="task-item__trash" data-action="reveal" aria-label="Excluir tarefa: ${esc(task.text)}">${TRASH_ICON}</button>
        </div>
        <div class="swipe-confirm" aria-hidden="true">
          <div class="swipe-confirm__track" data-role="track">
            <div class="swipe-confirm__fill" data-role="fill"></div>
            <p class="swipe-confirm__label" data-role="label">Arraste para excluir</p>
            <button class="swipe-confirm__handle" data-role="handle" aria-label="Arraste até o fim para confirmar a exclusão">${TRASH_ICON}</button>
          </div>
          <button class="swipe-confirm__cancel" data-action="cancel" aria-label="Cancelar exclusão">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </li>`;
  }

  function renderTasks() {
    if (els.taskList) els.taskList.innerHTML = TASKS.map(taskItemHtml).join("");
    if (els.emptyTasks) els.emptyTasks.hidden = TASKS.length !== 0;
  }

  function resetSwipeVisual(li) {
    const handle = li.querySelector('[data-role="handle"]');
    const fill = li.querySelector('[data-role="fill"]');
    const label = li.querySelector('[data-role="label"]');
    if (!handle) return;
    handle.style.left = "2px";
    fill.style.width = "48px";
    label.style.opacity = "1";
  }

  function openSwipe(li) {
    if (openSwipeItem && openSwipeItem !== li) closeSwipe(openSwipeItem);
    resetSwipeVisual(li);
    li.classList.add("is-revealed");
    li.querySelector(".swipe-confirm").setAttribute("aria-hidden", "false");
    openSwipeItem = li;
  }

  function closeSwipe(li) {
    li.classList.remove("is-revealed");
    li.querySelector(".swipe-confirm").setAttribute("aria-hidden", "true");
    resetSwipeVisual(li);
    if (openSwipeItem === li) openSwipeItem = null;
  }

  on(els.taskList, "click", (e) => {
const li = e.target.closest(".task-item");
if (!li) return;
if (e.target.closest('[data-action="toggle"]'))
toggleTask(li);
else if (e.target.closest('[data-action="reveal"]'))
openSwipe(li);
else if (e.target.closest('[data-action="cancel"]'))
closeSwipe(li);
});

  function toggleTask(li) {
const task = TASKS.find((t) => t.id === li.dataset.id);
if (!task) return;
task.done = !task.done;
li.classList.toggle("is-done", task.done);
const btn = li.querySelector('[data-action="toggle"]');
if (btn) btn.setAttribute("aria-pressed", String(task.done));
store.set("tarefasFeitas", TASKS.filter((t) =>
t.done).map((t) => t.id));
if (task.done) showToast("Cuidado concluído ✅");
}

  on(document, "click", (e) => {
    if (openSwipeItem && !openSwipeItem.contains(e.target)) closeSwipe(openSwipeItem);
  });

  function getClientX(evt) {
    if (evt.touches && evt.touches.length) return evt.touches[0].clientX;
    if (evt.changedTouches && evt.changedTouches.length) return evt.changedTouches[0].clientX;
    return evt.clientX;
  }

  function startDrag(e) {
    const handle = e.target.closest('[data-role="handle"]');
    if (!handle) return;
    const li = handle.closest(".task-item");
    const track = li.querySelector('[data-role="track"]');
    const handleWidth = handle.offsetWidth || 44;
    const maxX = Math.max(track.getBoundingClientRect().width - handleWidth - 4, 1);

    dragState = {
      li, track, handle, handleWidth, maxX, currentX: 0,
      fill: li.querySelector('[data-role="fill"]'),
      label: li.querySelector('[data-role="label"]'),
      startX: getClientX(e)
    };
    track.classList.add("is-dragging");
    if (e.cancelable) e.preventDefault();
  }

  function onDrag(e) {
    if (!dragState) return;
    const newX = Math.min(Math.max(getClientX(e) - dragState.startX, 0), dragState.maxX);
    dragState.currentX = newX;
    dragState.handle.style.left = newX + 2 + "px";
    dragState.fill.style.width = newX + dragState.handleWidth + "px";
    dragState.label.style.opacity = String(Math.max(0, 1 - (newX / dragState.maxX) * 1.4));
    if (e.cancelable) e.preventDefault();
  }

  function endDrag() {
    if (!dragState) return;
    const { li, track, handle, fill, label, currentX, maxX } = dragState;
    track.classList.remove("is-dragging");

    if (currentX / maxX >= 0.85) {
      handle.style.left = maxX + 2 + "px";
      fill.style.width = "100%";
      label.style.opacity = "0";
      const taskId = li.dataset.id;
      setTimeout(() => removeTaskWithAnimation(li, taskId), 120);
    } else {
      handle.style.left = "2px";
      fill.style.width = "48px";
      label.style.opacity = "1";
    }
    dragState = null;
  }

  on(els.taskList, "mousedown", startDrag);
  on(els.taskList, "touchstart", startDrag, { passive: false });
  on(document, "mousemove", onDrag);
  on(document, "touchmove", onDrag, { passive: false });
  on(document, "mouseup", endDrag);
  on(document, "touchend", endDrag);
  on(document, "touchcancel", endDrag);

  function removeTaskWithAnimation(li, taskId) {
    if (openSwipeItem === li) openSwipeItem = null;
    li.style.height = li.getBoundingClientRect().height + "px";
    li.style.overflow = "hidden";
    void li.offsetHeight; // força o navegador a registrar a altura inicial
    li.classList.add("is-deleting");

    requestAnimationFrame(() => {
      li.style.height = "0px";
      li.style.opacity = "0";
      li.style.transform = "scale(0.96)";
    });

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      li.remove();
      TASKS = TASKS.filter((t) => t.id !== taskId);
      if (els.emptyTasks) els.emptyTasks.hidden = TASKS.length !== 0;
      showToast("Tarefa removida ✅");
    };
    li.addEventListener("transitionend", (ev) => { if (ev.propertyName === "height") finish(); });
    setTimeout(finish, 450); // garantia caso o navegador não dispare transitionend
  }

  // -----------------------------------------------------------
  // 16) ATALHO DE TECLADO (Esc fecha tudo)
  // -----------------------------------------------------------
  on(document, "keydown", (e) => {
    if (e.key !== "Escape") return;
    closeNotif();
    closeDrawer();
    closePetModal();
    closeOverlay(els.formModalOverlay);
    closeOverlay(els.profileModalOverlay);
  });

  // -----------------------------------------------------------
  // 17) INICIALIZAÇÃO
  // -----------------------------------------------------------
  // Cada passo roda isolado: se um falhar, os outros continuam.
  [renderProfile, renderNotifs, renderMessages, renderFavoritos, renderMyPets, renderTasks, loadFeed]
    .forEach((step) => {
      try { step(); } catch (err) { console.error("Petnip: erro em " + step.name, err); }
    });

  // -----------------------------------------------------------
  // 18) SERVICE WORKER (PWA offline)
  // -----------------------------------------------------------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) => console.warn("Service Worker não registrado:", err));
    });
  }
})();
