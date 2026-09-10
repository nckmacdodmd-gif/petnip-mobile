// =============================================================
// PETNIP — app.js
// =============================================================
 
(function () {
  "use strict";
 
  // -----------------------------------------------------------
  // 1) DADOS MOCKADOS
  // -----------------------------------------------------------
  const PETS = [
    {
      id: "p1",
      nome: "Bob",
      especie: "cachorro",
      idade: "2 anos",
      cidade: "Carapicuíba, SP",
      porte: "Médio porte",
      temperamento: "Dócil",
      saude: "Vacinado",
      sociavel: "Sociável",
      foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80&auto=format&fit=crop",
      descricao: "Bob é um cachorrinho de 2 anos, muito dócil e brincalhão. Se dá bem com outros animais, faz xixi no lugar certo e adora passear. Já está castrado e pronto para ganhar uma nova família."
    },
    {
      id: "p2",
      nome: "Luna",
      especie: "gato",
      idade: "1 ano",
      cidade: "Osasco, SP",
      porte: "Pequeno porte",
      temperamento: "Independente",
      saude: "Castrada",
      sociavel: "Tímida no início",
      foto: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80&auto=format&fit=crop",
      descricao: "Luna é uma gatinha calma que adora dormir no sol. Leva um tempinho para confiar em pessoas novas, mas depois vira sombra. Já é castrada e vacinada."
    },
    {
      id: "p3",
      nome: "Thor",
      especie: "cachorro",
      idade: "4 anos",
      cidade: "Barueri, SP",
      porte: "Grande porte",
      temperamento: "Protetor",
      saude: "Vacinado",
      sociavel: "Sociável com adultos",
      foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80&auto=format&fit=crop",
      descricao: "Thor é forte, brincalhão e extremamente leal. Ideal para quem tem espaço e experiência com cães de porte grande. Já está castrado."
    },
    {
      id: "p4",
      nome: "Marley",
      especie: "cachorro",
      idade: "6 meses",
      cidade: "São Paulo, SP",
      porte: "Pequeno porte",
      temperamento: "Elétrico",
      saude: "Em dia com vacinas",
      sociavel: "Adora crianças",
      foto: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&q=80&auto=format&fit=crop",
      descricao: "Filhote cheio de energia, ótimo para famílias ativas. Já está em processo de adestramento básico e adora brincar de bolinha."
    },
    {
      id: "p5",
      nome: "Mia",
      especie: "gato",
      idade: "3 anos",
      cidade: "Cotia, SP",
      porte: "Médio porte",
      temperamento: "Carinhosa",
      saude: "Castrada",
      sociavel: "Sociável",
      foto: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80&auto=format&fit=crop",
      descricao: "Mia é super carinhosa e adora colo. Se dá bem com outros gatos e já viveu com crianças. Está com todas as vacinas em dia."
    },
    {
      id: "p6",
      nome: "Piu",
      especie: "passaro",
      idade: "1 ano",
      cidade: "Jandira, SP",
      porte: "Pequeno porte",
      temperamento: "Cantador",
      saude: "Saudável",
      sociavel: "Sociável",
      foto: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80&auto=format&fit=crop",
      descricao: "Piu é um canário alegre que canta todas as manhãs. Precisa de uma gaiola espaçosa e companhia frequente."
    },
    {
      id: "p7",
      nome: "Simba",
      especie: "gato",
      idade: "5 meses",
      cidade: "Osasco, SP",
      porte: "Pequeno porte",
      temperamento: "Brincalhão",
      saude: "Vacinado",
      sociavel: "Sociável",
      foto: "https://images.unsplash.com/photo-1517849845537-4d257902861a?w=800&q=80&auto=format&fit=crop",
      descricao: "Filhote curioso e cheio de energia. Adora brinquedos com penas e já está usando caixa de areia direitinho."
    },
    {
      id: "p8",
      nome: "Nina",
      especie: "silvestre",
      idade: "2 anos",
      cidade: "Itapevi, SP",
      porte: "Pequeno porte",
      temperamento: "Calma",
      saude: "Reabilitada",
      sociavel: "Requer manejo especial",
      foto: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80&auto=format&fit=crop",
      descricao: "Nina foi resgatada e reabilitada por um centro parceiro. Adoção sujeita a avaliação e autorização do órgão ambiental responsável."
    }

   let TASKS = [
  { id: "t1", text: "Tomar vacina antirrábica" },
  { id: "t2", text: "Comprar ração" },
  { id: "t3", text: "Passeio da tarde" },
  { id: "t4", text: "Dar vermífugo" }
];
  ];
 
  const BADGE_CLASS = {
    porte: "badge--porte",
    temperamento: "badge--temperamento",
    saude: "badge--saude",
    sociavel: "badge--sociavel"
  };
 
  // -----------------------------------------------------------
  // 2) ESTADO
  // -----------------------------------------------------------
  const state = {
    favoritos: loadFavorites(),
    filtroEspecie: "todos",
    busca: ""
  };
 
  function loadFavorites() {
    try {
      const raw = localStorage.getItem("petnip:favoritos");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
 
  function saveFavorites() {
    try {
      localStorage.setItem("petnip:favoritos", JSON.stringify(state.favoritos));
    } catch (e) {
      /* localStorage indisponível — segue sem persistir */
    }
  }
 
  // -----------------------------------------------------------
  // 3) ELEMENTOS
  // -----------------------------------------------------------
  const petGrid = document.getElementById("petGrid");
  const favGrid = document.getElementById("favGrid");
  const emptyFeed = document.getElementById("emptyFeed");
  const emptyFav = document.getElementById("emptyFav");
  const feedCount = document.getElementById("feedCount");
  const favCount = document.getElementById("favCount");
  const searchInput = document.getElementById("searchInput");
  const speciesTabs = document.getElementById("speciesTabs");
  const bottomNav = document.getElementById("bottomNav");
  const toast = document.getElementById("toast");
 
  const petModalOverlay = document.getElementById("petModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalPhoto = document.getElementById("modalPhoto");
  const modalBadges = document.getElementById("modalBadges");
  const modalPetName = document.getElementById("modalPetName");
  const modalPetMeta = document.getElementById("modalPetMeta");
  const modalPetDesc = document.getElementById("modalPetDesc");
  const modalAdotarBtn = document.getElementById("modalAdotarBtn");
  const modalApadrinharBtn = document.getElementById("modalApadrinharBtn");
 
  const fabAdd = document.getElementById("fabAdd");
  const formModalOverlay = document.getElementById("formModalOverlay");
  const formCloseBtn = document.getElementById("formCloseBtn");
  const petForm = document.getElementById("petForm");
 
  // -----------------------------------------------------------
  // 4) RENDERIZAÇÃO DE CARDS
  // -----------------------------------------------------------
  function badgeHtml(text, type) {
    return `<span class="badge ${BADGE_CLASS[type]}">${text}</span>`;
  }
 
  function cardHtml(pet) {
    const isFav = state.favoritos.includes(pet.id);
    return `
      <article class="pet-card" data-id="${pet.id}">
        <div class="pet-card__photo-wrap" data-action="open">
          <img src="${pet.foto}" alt="Foto de ${pet.nome}" loading="lazy">
          <button class="pet-card__fav ${isFav ? "is-fav" : ""}" data-action="fav" aria-label="Favoritar ${pet.nome}" aria-pressed="${isFav}">
            ${heartSvg(isFav)}
          </button>
          <div class="pet-card__badges">
            ${badgeHtml(pet.porte, "porte")}
            ${badgeHtml(pet.temperamento, "temperamento")}
          </div>
        </div>
        <div class="pet-card__info">
          <div>
            <div class="pet-card__name-row">
              <span class="pet-card__name">${pet.nome}</span>
              <span class="pet-card__age">${pet.idade}</span>
            </div>
            <p class="pet-card__location">📍 ${pet.cidade}</p>
          </div>
          <div class="pet-card__actions">
            <button class="btn btn--outline" data-action="apadrinhar">Apadrinhar</button>
            <button class="btn btn--primary" data-action="adotar">Adotar</button>
          </div>
        </div>
      </article>`;
  }
 
  function heartSvg(filled) {
    return filled
      ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="#FD5A46"><path d="M12 20.2s-7.5-4.6-9.8-9.1C.7 7.6 2.3 4.4 5.6 3.7c2-.4 3.8.5 5 2.2a1 1 0 0 0 1.6 0c1.2-1.7 3-2.6 5-2.2 3.3.7 4.9 3.9 3.4 7.4-2.3 4.5-9.6 9.1-9.6 9.1Z"/></svg>`
      : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 20.2s-7.5-4.6-9.8-9.1C.7 7.6 2.3 4.4 5.6 3.7c2-.4 3.8.5 5 2.2a1 1 0 0 0 1.6 0c1.2-1.7 3-2.6 5-2.2 3.3.7 4.9 3.9 3.4 7.4-2.3 4.5-9.6 9.1-9.6 9.1Z" stroke="#552CB7" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
  }
 
  function getFilteredPets() {
    return PETS.filter((pet) => {
      const matchEspecie = state.filtroEspecie === "todos" || pet.especie === state.filtroEspecie;
      const q = state.busca.trim().toLowerCase();
      const matchBusca =
        !q ||
        pet.nome.toLowerCase().includes(q) ||
        pet.cidade.toLowerCase().includes(q) ||
        pet.temperamento.toLowerCase().includes(q);
      return matchEspecie && matchBusca;
    });
  }
 
  function renderFeed() {
    const pets = getFilteredPets();
    petGrid.innerHTML = pets.map(cardHtml).join("");
    feedCount.textContent = `${pets.length} ${pets.length === 1 ? "disponível" : "disponíveis"}`;
    emptyFeed.hidden = pets.length !== 0;
  }
 
  function renderFavoritos() {
    const pets = PETS.filter((p) => state.favoritos.includes(p.id));
    favGrid.innerHTML = pets.map(cardHtml).join("");
    favCount.textContent = `${pets.length} salvo${pets.length === 1 ? "" : "s"}`;
    emptyFav.hidden = pets.length !== 0;
    favGrid.hidden = pets.length === 0;
  }
 
  function renderAll() {
    renderFeed();
    renderFavoritos();
  }

 // -----------------------------------------------------------
// 4.1) SKELETON SCREENS
// -----------------------------------------------------------
const FEED_SKELETON_COUNT = 4;

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
        <div class="pet-card__badges-skeleton">
          <span class="skeleton skeleton--badge"></span>
          <span class="skeleton skeleton--badge"></span>
        </div>
        <div class="pet-card__actions">
          <span class="skeleton skeleton--btn"></span>
          <span class="skeleton skeleton--btn"></span>
        </div>
      </div>
    </article>`;
}

function renderFeedSkeletons() {
  petGrid.setAttribute("aria-busy", "true");
  petGrid.innerHTML = Array.from({ length: FEED_SKELETON_COUNT }, skeletonCardHtml).join("");
  emptyFeed.hidden = true;
  feedCount.textContent = "Carregando...";
}

function toggleFeedControls(enabled) {
  searchInput.disabled = !enabled;
  speciesTabs.classList.toggle("is-loading-controls", !enabled);
}

// Simula uma requisição assíncrona ao servidor (1.5s a 2s) e faz a
// transição suave do Skeleton Screen para o conteúdo real do feed.
function loadFeed() {
  renderFeedSkeletons();
  toggleFeedControls(false);

  const simulatedNetworkDelay = 1500 + Math.random() * 500; // 1.5s–2s

  setTimeout(() => {
    // fade-out do skeleton antes de trocar o conteúdo
    petGrid.classList.add("is-transitioning");

    setTimeout(() => {
      renderFeed();
      toggleFeedControls(true);
      petGrid.classList.remove("is-transitioning"); // fade-in do conteúdo real
    }, 220);
  }, simulatedNetworkDelay);
}

  // -----------------------------------------------------------
  // 5) FAVORITAR (delegação de evento — funciona no feed e favoritos)
  // -----------------------------------------------------------
  function toggleFavorite(id) {
    const idx = state.favoritos.indexOf(id);
    if (idx === -1) {
      state.favoritos.push(id);
      showToast("Adicionado aos favoritos 💛");
    } else {
      state.favoritos.splice(idx, 1);
      showToast("Removido dos favoritos");
    }
    saveFavorites();
    renderAll();
  }
 
  function handleGridClick(e) {
    const card = e.target.closest(".pet-card");
    if (!card) return;
    const id = card.dataset.id;
    const action = e.target.closest("[data-action]")?.dataset.action;
 
    if (action === "fav") {
      toggleFavorite(id);
      return;
    }
    if (action === "adotar") {
      openPetModal(id);
      return;
    }
    if (action === "apadrinhar") {
      showToast("Apadrinhamento iniciado — em breve você recebe os detalhes 💌");
      return;
    }
    if (action === "open") {
      openPetModal(id);
    }
  }
 
  petGrid.addEventListener("click", handleGridClick);
  favGrid.addEventListener("click", handleGridClick);
 
  // -----------------------------------------------------------
  // 6) BUSCA E FILTRO DE ESPÉCIE
  // -----------------------------------------------------------
  searchInput.addEventListener("input", (e) => {
    state.busca = e.target.value;
    renderFeed();
  });
 
  speciesTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".species-tab");
    if (!tab) return;
    speciesTabs.querySelectorAll(".species-tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    state.filtroEspecie = tab.dataset.species;
    renderFeed();
  });
 
  // -----------------------------------------------------------
  // 7) NAVEGAÇÃO INFERIOR (bottom nav)
  // -----------------------------------------------------------
  const views = {
    feed: document.getElementById("view-feed"),
    favoritos: document.getElementById("view-favoritos"),
    perfil: document.getElementById("view-perfil")
  };
 
  function switchView(name) {
    if (name === "mensagens") {
      showToast("Mensagens chegando em breve 💬");
      return;
    }
    if (!views[name]) return;
 
    Object.values(views).forEach((v) => v.classList.remove("is-active"));
    views[name].classList.add("is-active");
 
    bottomNav.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.view === name);
    });
 
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
 
  bottomNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    switchView(btn.dataset.view);
  });
 
  // -----------------------------------------------------------
  // 8) MODAL — DETALHE DO PET
  // -----------------------------------------------------------
  let pendingPetId = null;
 
  function openPetModal(id) {
    const pet = PETS.find((p) => p.id === id);
    if (!pet) return;
    pendingPetId = id;
 
    modalPhoto.src = pet.foto;
    modalPhoto.alt = `Foto de ${pet.nome}`;
    modalPetName.textContent = `${pet.nome} · ${pet.idade}`;
    modalPetMeta.textContent = `📍 ${pet.cidade}`;
    modalPetDesc.textContent = pet.descricao;
    modalBadges.innerHTML =
      badgeHtml(pet.porte, "porte") +
      badgeHtml(pet.temperamento, "temperamento") +
      badgeHtml(pet.saude, "saude") +
      badgeHtml(pet.sociavel, "sociavel");
 
    openOverlay(petModalOverlay);
  }
 
  function closePetModal() {
    closeOverlay(petModalOverlay);
    pendingPetId = null;
  }
 
  modalCloseBtn.addEventListener("click", closePetModal);
  petModalOverlay.addEventListener("click", (e) => {
    if (e.target === petModalOverlay) closePetModal();
  });
 
  modalAdotarBtn.addEventListener("click", () => {
    const pet = PETS.find((p) => p.id === pendingPetId);
    showToast(`Pedido de adoção de ${pet ? pet.nome : "pet"} enviado! 🐾`);
    closePetModal();
  });
 
  modalApadrinharBtn.addEventListener("click", () => {
    const pet = PETS.find((p) => p.id === pendingPetId);
    showToast(`Apadrinhamento de ${pet ? pet.nome : "pet"} iniciado 💛`);
    closePetModal();
  });
 
  // -----------------------------------------------------------
  // 9) FAB — DIVULGAR PET
  // -----------------------------------------------------------
  fabAdd.addEventListener("click", () => openOverlay(formModalOverlay));
  formCloseBtn.addEventListener("click", () => closeOverlay(formModalOverlay));
  formModalOverlay.addEventListener("click", (e) => {
    if (e.target === formModalOverlay) closeOverlay(formModalOverlay);
  });
 
  petForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("fNome").value.trim();
    const especie = document.getElementById("fEspecie").value;
    const idade = document.getElementById("fIdade").value.trim();
    const cidade = document.getElementById("fCidade").value.trim();
    const desc = document.getElementById("fDesc").value.trim();
 
    if (!nome || !idade || !cidade) return;
 
    const novoPet = {
      id: "u" + Date.now(),
      nome,
      especie,
      idade,
      cidade,
      porte: "Porte a definir",
      temperamento: "Novo no Petnip",
      saude: "A confirmar",
      sociavel: "A confirmar",
      foto: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80&auto=format&fit=crop",
      descricao: desc || `${nome} está à procura de uma nova família cheia de amor.`
    };
 
    PETS.unshift(novoPet);
    petForm.reset();
    closeOverlay(formModalOverlay);
    switchView("feed");
    renderAll();
    showToast(`${nome} foi publicado no feed! 🎉`);
  });
 
  // -----------------------------------------------------------
  // 10) OVERLAYS / TOAST — helpers
  // -----------------------------------------------------------
  function openOverlay(overlay) {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
 
  function closeOverlay(overlay) {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }
 
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }
 
  // -----------------------------------------------------------
  // 11) INICIALIZAÇÃO
  // -----------------------------------------------------------
renderFavoritos();
renderTasks();
loadFeed();

  // -----------------------------------------------------------
  // 12) SERVICE WORKER (PWA / offline)
  // -----------------------------------------------------------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("sw.js")
        .catch((err) => console.warn("Falha ao registrar o Service Worker:", err));
    });
  }
})();

// -----------------------------------------------------------
// CUIDADOS DO PET — GESTOS: "Swipe to Delete"
// -----------------------------------------------------------
let openSwipeItem = null;
let dragState = null;

const TRASH_ICON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m1 0-.7 12.1a2 2 0 0 1-2 1.9H10.7a2 2 0 0 1-2-1.9L8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function taskItemHtml(task) {
  return `
    <li class="task-item" data-id="${task.id}">
      <div class="task-item__content">
        <span class="task-checkbox" aria-hidden="true"></span>
        <span class="task-text">${task.text}</span>
        <button class="task-item__trash" data-action="reveal" aria-label="Excluir tarefa: ${task.text}">
          ${TRASH_ICON}
        </button>
      </div>
      <div class="swipe-confirm" aria-hidden="true">
        <div class="swipe-confirm__track" data-role="track">
          <div class="swipe-confirm__fill" data-role="fill"></div>
          <p class="swipe-confirm__label" data-role="label">Arraste para excluir</p>
          <button class="swipe-confirm__handle" data-role="handle" aria-label="Arraste até o fim para confirmar a exclusão">
            ${TRASH_ICON}
          </button>
        </div>
        <button class="swipe-confirm__cancel" data-action="cancel" aria-label="Cancelar exclusão">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </li>`;
}

function renderTasks() {
  taskList.innerHTML = TASKS.map(taskItemHtml).join("");
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

function resetSwipeVisual(li) {
  const handle = li.querySelector('[data-role="handle"]');
  const fill = li.querySelector('[data-role="fill"]');
  const label = li.querySelector('[data-role="label"]');
  if (!handle) return;
  handle.style.left = "2px";
  fill.style.width = "48px";
  label.style.opacity = "1";
}

taskList.addEventListener("click", (e) => {
  const li = e.target.closest(".task-item");
  if (!li) return;
  if (e.target.closest('[data-action="reveal"]')) { openSwipe(li); return; }
  if (e.target.closest('[data-action="cancel"]')) { closeSwipe(li); }
});

document.addEventListener("click", (e) => {
  if (!openSwipeItem) return;
  if (!openSwipeItem.contains(e.target)) closeSwipe(openSwipeItem);
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
  const fill = li.querySelector('[data-role="fill"]');
  const label = li.querySelector('[data-role="label"]');

  const trackWidth = track.getBoundingClientRect().width;
  const handleWidth = handle.offsetWidth;
  const maxX = Math.max(trackWidth - handleWidth - 4, 1);

  dragState = { li, track, handle, fill, label, startX: getClientX(e), maxX, handleWidth, currentX: 0 };

  track.classList.add("is-dragging");
  if (e.cancelable) e.preventDefault();
}

function onDrag(e) {
  if (!dragState) return;
  const clientX = getClientX(e);
  const delta = clientX - dragState.startX;
  const newX = Math.min(Math.max(delta, 0), dragState.maxX);
  dragState.currentX = newX;

  dragState.handle.style.left = (newX + 2) + "px";
  dragState.fill.style.width = (newX + dragState.handleWidth) + "px";
  dragState.label.style.opacity = String(Math.max(0, 1 - (newX / dragState.maxX) * 1.4));

  if (e.cancelable) e.preventDefault();
}

function endDrag() {
  if (!dragState) return;
  const { li, track, handle, fill, label, currentX, maxX } = dragState;
  track.classList.remove("is-dragging");
  const percent = currentX / maxX;
  const CONFIRM_THRESHOLD = 0.85;

  if (percent >= CONFIRM_THRESHOLD) {
    handle.style.left = (maxX + 2) + "px";
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

taskList.addEventListener("mousedown", startDrag);
taskList.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("mousemove", onDrag);
document.addEventListener("touchmove", onDrag, { passive: false });
document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);
document.addEventListener("touchcancel", endDrag);

function removeTaskWithAnimation(li, taskId) {
  if (openSwipeItem === li) openSwipeItem = null;

  const height = li.getBoundingClientRect().height;
  li.style.height = height + "px";
  li.style.overflow = "hidden";
  void li.offsetHeight;

  li.classList.add("is-deleting");

  requestAnimationFrame(() => {
    li.style.height = "0px";
    li.style.marginBottom = "0px";
    li.style.opacity = "0";
    li.style.transform = "scale(0.96)";
  });

  li.addEventListener("transitionend", function onEnd(ev) {
    if (ev.propertyName !== "height") return;
    li.removeEventListener("transitionend", onEnd);
    li.remove();
    TASKS = TASKS.filter((t) => t.id !== taskId);
    showToast("Tarefa removida ✅");
  });
}

 
