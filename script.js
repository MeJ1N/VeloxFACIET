(() => {
  "use strict";

  const API = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";
  const FALLBACK_IMAGE = "https://community.akamai.steamstatic.com/economy/image/"; // only used as a marker if a remote image fails

  const FALLBACK_SKINS = [
    {id:"f1",name:"AK-47 | Redline",rarity:{name:"Classified",color:"#d32ce6"},price:42.50,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"f2",name:"AWP | Asiimov",rarity:{name:"Covert",color:"#eb4b4b"},price:92.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"f3",name:"M4A1-S | Printstream",rarity:{name:"Covert",color:"#eb4b4b"},price:120.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"f4",name:"Desert Eagle | Printstream",rarity:{name:"Covert",color:"#eb4b4b"},price:70.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"f5",name:"Glock-18 | Vogue",rarity:{name:"Classified",color:"#d32ce6"},price:18.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"f6",name:"USP-S | Kill Confirmed",rarity:{name:"Covert",color:"#eb4b4b"},price:78.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"f7",name:"★ Karambit | Doppler",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:780.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_png.png"},
    {id:"f8",name:"★ Sport Gloves | Vice",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:930.00,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/ct_gloves_sporty_militia_light_png.png"}
  ];

  const state = {
    skins: [],
    inventory: [],
    history: [],
    source: null,
    target: null,
    balance: Number(localStorage.getItem("lunex_balance") || 400),
    sound: localStorage.getItem("lunex_sound") !== "off",
    busy: false
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const money = (n) => "$" + Number(n || 0).toFixed(2);

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
  }

  function normalizeSkin(s, i) {
    return {
      id: s.id || "skin-" + i,
      name: s.name || "Unknown Skin",
      rarity: s.rarity?.name || "Restricted",
      color: s.rarity?.color || "#4b69ff",
      image: s.image || "",
      price: Number(s.price || (8 + ((i * 17) % 300))),
      market_hash_name: s.market_hash_name || s.name
    };
  }

  function save() {
    localStorage.setItem("lunex_balance", String(state.balance));
    localStorage.setItem("lunex_inventory", JSON.stringify(state.inventory.slice(-80)));
    localStorage.setItem("lunex_history", JSON.stringify(state.history.slice(-50)));
  }

  function load() {
    try {
      state.inventory = JSON.parse(localStorage.getItem("lunex_inventory") || "[]");
      state.history = JSON.parse(localStorage.getItem("lunex_history") || "[]");
      state.inventory = state.inventory.map((x, i) => ({...x, uid: x.uid || ("item-" + Date.now() + "-" + i + "-" + Math.random().toString(36).slice(2,8))}));
    } catch {
      state.inventory = [];
      state.history = [];
    }
  }

  function showToast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    $("#toastStack").appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function setBalance() {
    $("#balance").textContent = Math.floor(state.balance).toLocaleString("ru-RU");
  }

  function imageFallback(img) {
    img.onerror = () => {
      img.onerror = null;
      img.src = FALLBACK_IMAGE;
      img.style.opacity = ".15";
    };
  }

  function skinCard(skin, selectable = true, showSell = true) {
    const selected = state.source?.id === skin.id ? "selected" : "";
    return `<article class="skin-card ${selected}" data-skin-id="${escapeHtml(skin.id)}" data-item-uid="${escapeHtml(skin.uid || "")}" ${selectable ? "" : "data-static=\"1\""}>
      <div class="skin-image"><img src="${escapeHtml(skin.image)}" alt="${escapeHtml(skin.name)}" loading="lazy" onerror="this.style.opacity='.12'"></div>
      <div class="skin-name">${escapeHtml(skin.name)}</div>
      <div class="skin-meta">
        <span><i class="rarity-dot" style="background:${escapeHtml(skin.color)}"></i>${escapeHtml(skin.rarity)}</span>
        <b>${money(skin.price)}</b>
      </div>
      ${showSell ? `<button class="sell-item-btn" type="button" data-sell-id="${escapeHtml(skin.uid || skin.id)}">💰 Продать предмет</button>` : ""}
    </article>`;
  }

  function renderInventory() {
    const q = ($("#searchInput")?.value || "").toLowerCase().trim();
    const rarity = $("#rarityFilter")?.value || "all";
    const list = state.inventory.filter(s =>
      (!q || s.name.toLowerCase().includes(q)) &&
      (rarity === "all" || s.rarity === rarity)
    );
    $("#inventoryGrid").innerHTML = list.length
      ? list.map(s => skinCard(s)).join("")
      : `<div class="empty-state">Инвентарь пуст. Выбери предмет из стартового набора или открой кейс.</div>`;
    $$("#inventoryGrid .skin-card").forEach(card => {
      card.addEventListener("click", () => {
        const skin = state.inventory.find(x => (card.dataset.itemUid && x.uid === card.dataset.itemUid) || x.id === card.dataset.skinId);
        if (skin) selectSource(skin);
      });
    });
  }

  function renderFullInventory() {
    const box = $("#fullInventoryGrid");
    if (!state.inventory.length) {
      box.innerHTML = `<div class="empty-state">Пока ничего нет.</div>`;
      return;
    }
    box.innerHTML = state.inventory.map(s => skinCard(s)).join("");
  }

  function renderHistory() {
    const box = $("#historyList");
    if (!state.history.length) {
      box.innerHTML = `<div class="empty-state">История появится после первого апгрейда.</div>`;
      return;
    }
    box.innerHTML = state.history.slice().reverse().map(h => `
      <div class="history-row">
        <img src="${escapeHtml(h.image)}" alt="" onerror="this.style.opacity='.1'">
        <div><div class="history-name">${escapeHtml(h.title)}</div><div class="history-sub">${escapeHtml(h.time)} · ${escapeHtml(h.type)}</div></div>
        <div class="${h.win ? "win" : "loss"}">${h.win ? "WIN" : "LOSS"}</div>
        <div class="history-price">${money(h.price)}</div>
      </div>`).join("");
  }

  function renderCases() {
    const cases = [
      {name:"Lunex Starter",price:15,icon:"📦",min:8,max:55},
      {name:"Blue Phantom",price:35,icon:"💠",min:20,max:130},
      {name:"Neon Rush",price:80,icon:"⚡",min:45,max:310},
      {name:"Lunex Black",price:180,icon:"🖤",min:100,max:850}
    ];
    $("#caseGrid").innerHTML = cases.map((c,i) => `
      <article class="case-card">
        <div class="case-art"><div class="case-box">${c.icon}</div></div>
        <h3>${c.name}</h3>
        <p>Возможный дроп: ${money(c.min)} — ${money(c.max)}</p>
        <button class="case-open" data-case="${i}">ОТКРЫТЬ · ${money(c.price)}</button>
      </article>`).join("");
    $$("#caseGrid .case-open").forEach(btn => btn.addEventListener("click", () => openCase(Number(btn.dataset.case))));
  }

  function selectSource(skin) {
    state.source = skin;
    renderSelected();
    renderInventory();
    calculate();
    showToast("Предмет выбран: " + skin.name);
  }

  function selectTarget(skin) {
    if (!state.source) return showToast("Сначала выбери предмет для апгрейда");
    if (skin.id === state.source.id) return showToast("Цель должна отличаться от исходного предмета");
    if (skin.price <= state.source.price) return showToast("Цель должна быть дороже исходного предмета");
    state.target = skin;
    renderSelected();
    calculate();
  }

  function sellSkin(itemUid) {
    const index = state.inventory.findIndex(item => item.uid === itemUid || item.id === itemUid);
    if (index === -1) {
      showToast("Предмет уже отсутствует в инвентаре");
      return;
    }

    const item = state.inventory[index];
    const payout = Number((Number(item.price || 0) * 0.90).toFixed(2));

    state.inventory.splice(index, 1);
    state.balance = Number((state.balance + payout).toFixed(2));

    if (state.source?.uid === item.uid) {
      state.source = null;
      state.target = null;
      renderSelected();
      calculate();
    }

    state.history.push({
      title: item.name,
      image: item.image,
      price: payout,
      win: true,
      type: "Продажа",
      time: new Date().toLocaleString("ru-RU")
    });

    save();
    setBalance();
    renderInventory();
    renderFullInventory();
    renderHistory();
    showToast("💰 Предмет продан", `${item.name} → +${money(payout)}`);
  }

  function selectedHtml(skin) {
    return `<div class="selected-item">
      <img src="${escapeHtml(skin.image)}" alt="${escapeHtml(skin.name)}">
      <div class="item-name">${escapeHtml(skin.name)}</div>
      <div class="item-price">${money(skin.price)}</div>
    </div>`;
  }

  function renderSelected() {
    $("#sourceSlot").innerHTML = state.source ? selectedHtml(state.source) : `<div class="slot-empty"><div class="plus">+</div><strong>Выберите предмет</strong><span>из инвентаря ниже</span></div>`;
    $("#targetSlot").innerHTML = state.target ? selectedHtml(state.target) : `<div class="slot-empty"><div class="plus">+</div><strong>Выберите цель</strong><span>цель должна быть дороже</span></div>`;
    $("#sourcePrice").textContent = money(state.source?.price);
    $("#targetPrice").textContent = money(state.target?.price);
  }

  function calculate() {
    const s = state.source, t = state.target;
    if (!s || !t || t.price <= s.price) {
      $("#chanceText").textContent = "0%";
      $("#chanceBar").style.width = "0%";
      $("#multiplier").textContent = "x0.00";
      $("#multiplierBig").textContent = "x0.00";
      $("#chanceHint").textContent = "Выберите два предмета";
      $("#upgradeBtn").disabled = true;
      $("#upgradeCost").textContent = "$0.00";
      return;
    }
    const mult = t.price / s.price;
    const chance = Math.min(95, Math.max(2, 100 / mult));
    $("#chanceText").textContent = chance.toFixed(2) + "%";
    $("#chanceBar").style.width = chance + "%";
    $("#multiplier").textContent = "x" + mult.toFixed(2);
    $("#multiplierBig").textContent = "x" + mult.toFixed(2);
    $("#chanceHint").textContent = chance < 10 ? "Очень рискованный апгрейд" : chance < 35 ? "Высокий риск" : "Нормальный шанс";
    $("#upgradeBtn").disabled = state.busy;
    $("#upgradeCost").textContent = money(s.price);
  }

  function chooseRandomTarget() {
    if (!state.source) return showToast("Сначала выбери исходный предмет");
    const options = state.skins.filter(s => s.price > state.source.price * 1.05);
    if (!options.length) return showToast("Нет подходящих целей");
    const target = options[Math.floor(Math.random() * options.length)];
    state.target = target;
    renderSelected();
    calculate();
  }

  function playTone(success) {
    if (!state.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = success ? 660 : 180;
      gain.gain.setValueAtTime(.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .18);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + .18);
    } catch {}
  }

  async function upgrade() {
    if (state.busy || !state.source || !state.target) return;
    const source = state.source, target = state.target;
    const chance = Math.min(95, Math.max(2, 100 / (target.price / source.price)));
    state.busy = true;
    $("#upgradeBtn").disabled = true;
    $("#upgradeBtn").classList.add("is-running");
    $("#upgradeBtn span:nth-child(2)").textContent = "ПРОВЕРКА...";
    showToast("Проверяем результат...");
    await new Promise(r => setTimeout(r, 1450));
    const win = Math.random() * 100 < chance;
    state.balance = Math.max(0, state.balance - source.price);
    if (win) {
      state.inventory = state.inventory.filter(x => x.id !== source.id);
      state.inventory.push({...target, uid:"upgrade-" + Date.now() + "-" + Math.random().toString(36).slice(2,8)});
      state.balance += target.price;
    } else {
      state.inventory = state.inventory.filter(x => x.id !== source.id);
    }
    state.history.push({title: win ? target.name : source.name,image:win ? target.image : source.image,price:win ? target.price : source.price,win,type:"Апгрейд",time:new Date().toLocaleString("ru-RU")});
    save(); setBalance(); renderInventory(); renderFullInventory(); renderHistory();
    playTone(win);
    showResult(win, win ? target : source, chance);
    state.source = null; state.target = null; renderSelected(); calculate();
    state.busy = false;
    $("#upgradeBtn").classList.remove("is-running");
    $("#upgradeBtn span:nth-child(2)").textContent = "UPGRADE";
  }

  function showResult(win, item, chance) {
    $("#resultLabel").textContent = win ? "⚡ УСПЕШНЫЙ АПГРЕЙД" : "💥 АПГРЕЙД НЕ УДАЛСЯ";
    $("#resultTitle").textContent = win ? "WIN" : "LOSS";
    $("#resultTitle").className = "result-title " + (win ? "win" : "loss");
    $("#resultItem").innerHTML = `<div><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"><div class="result-name">${escapeHtml(item.name)}</div></div>`;
    $("#resultContinue").textContent = win ? "Забрать предмет" : "Закрыть";
    $("#resultModal").classList.add("open");
    $("#resultModal").setAttribute("aria-hidden","false");
  }

  function closeResult() {
    $("#resultModal").classList.remove("open");
    $("#resultModal").setAttribute("aria-hidden","true");
  }

  function openCase(index) {
    const configs = [
      {price:15,min:8,max:55},{price:35,min:20,max:130},{price:80,min:45,max:310},{price:180,min:100,max:850}
    ];
    const c = configs[index];
    if (state.balance < c.price) return showToast("Недостаточно виртуальных кредитов");
    state.balance -= c.price;
    setBalance();
    $("#caseModal").classList.add("open");
    $("#caseContinue").disabled = true;
    $("#caseResultTitle").textContent = "ОТКРЫВАЕМ...";
    const pool = state.skins.filter(s => s.price >= c.min && s.price <= c.max);
    const item = (pool.length ? pool : state.skins).slice().sort(() => Math.random() - .5)[0];
    const roll = $("#caseRoll");
    roll.innerHTML = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">`;
    let n = 0;
    const timer = setInterval(() => {
      n++;
      roll.style.transform = `translateX(${Math.sin(n * .8) * 5}px)`;
      if (n > 18) {
        clearInterval(timer);
        roll.style.transform = "";
        state.inventory.push({...item, uid:"case-" + Date.now() + "-" + Math.random().toString(36).slice(2,8)});
        state.history.push({title:item.name,image:item.image,price:item.price,win:true,type:"Кейс",time:new Date().toLocaleString("ru-RU")});
        save(); renderInventory(); renderFullInventory(); renderHistory();
        $("#caseResultTitle").textContent = item.name;
        $("#caseContinue").disabled = false;
        showToast("Получен " + item.name);
      }
    }, 70);
  }

  function closeCase() {
    $("#caseModal").classList.remove("open");
  }

  function navigate(page) {
    $$(".page").forEach(p => p.classList.remove("active"));
    $(`#page-${page}`).classList.add("active");
    $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === page));
    if (page === "inventory") renderFullInventory();
    if (page === "history") renderHistory();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  async function loadCatalog() {
    load();
    setBalance();
    if (state.inventory.length === 0) {
      state.inventory = FALLBACK_SKINS.slice(0,5).map((x,i) => ({...x, uid:"starter-" + Date.now() + "-" + i}));
      save();
    }
    try {
      const res = await fetch(API, {cache:"no-store"});
      if (!res.ok) throw new Error("API " + res.status);
      const data = await res.json();
      const normalized = data.map(normalizeSkin);
      const useful = normalized.filter(s => s.image && s.name);
      state.skins = useful.length > 30 ? useful : FALLBACK_SKINS;
      $("#apiStatus").textContent = "Каталог CS2 подключён";
      $("#apiStatus").parentElement.querySelector("i").style.background = "var(--green)";
    } catch (e) {
      state.skins = FALLBACK_SKINS;
      $("#apiStatus").textContent = "Резервный каталог";
      showToast("Каталог API недоступен — включён резервный режим");
    }
    // Keep inventory items in the target catalog.
    const known = new Map(state.skins.map(s => [s.id,s]));
    state.inventory = state.inventory.map(x => known.get(x.id) || x);
    renderInventory(); renderFullInventory(); renderHistory(); renderCases(); renderSelected(); calculate(); renderPromoStatus();
  }

/* =========================
   LUNEX PROMO CODES
   ========================= */
const PROMO_CODES = {
  "LUNEX100": {amount:100, max:100},
  "LUNEX500": {amount:500, max:100},
  "LUNEX1000": {amount:1000, max:100},
  "LUNEX2500": {amount:2500, max:100}
};

function promoStorageKey(code){ return "lunex_promo_" + code; }

function redeemPromo(rawCode){
  const code = String(rawCode || "").trim().toUpperCase();
  const promo = PROMO_CODES[code];
  if(!promo) return showToast("❌ Промокод не найден");
  const used = Number(localStorage.getItem(promoStorageKey(code)) || 0);
  if(used >= promo.max) return showToast("⛔ Лимит активаций этого промокода исчерпан");
  state.balance = Number((state.balance + promo.amount).toFixed(2));
  localStorage.setItem(promoStorageKey(code), String(used + 1));
  save();
  setBalance();
  calculate();
  renderPromoStatus();
  showToast("🎁 Промокод активирован", `+${money(promo.amount)} к балансу`);
}

function renderPromoStatus(){
  const box = document.querySelector("#promoStatus");
  if(!box) return;
  box.innerHTML = Object.entries(PROMO_CODES).map(([code,p])=>{
    const used=Number(localStorage.getItem(promoStorageKey(code))||0);
    return `<div class="promo-row"><b>${code}</b><span>${used}/${p.max}</span></div>`;
  }).join("");
}


  $$(".nav-btn").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.nav)));
  $(".brand").addEventListener("click", e => {e.preventDefault();navigate("upgrade")});
  $("#clearSource").addEventListener("click", () => {state.source=null;state.target=null;renderSelected();calculate();renderInventory()});
  $("#randomTarget").addEventListener("click", chooseRandomTarget);
  $("#upgradeBtn").addEventListener("click", upgrade);
  $("#closeModal").addEventListener("click", closeResult);
  $("#resultContinue").addEventListener("click", closeResult);
  $("#closeCaseModal").addEventListener("click", closeCase);
  $("#caseContinue").addEventListener("click", closeCase);
  $("#searchInput").addEventListener("input", renderInventory);
  $("#rarityFilter").addEventListener("change", renderInventory);

  $("#promoBtn")?.addEventListener("click", () => {
    redeemPromo($("#promoInput")?.value);
    if($("#promoInput")) $("#promoInput").value = "";
  });
  $("#promoInput")?.addEventListener("keydown", e => {
    if(e.key === "Enter") $("#promoBtn").click();
  });

  $("#soundBtn").addEventListener("click", () => {
    state.sound = !state.sound;
    localStorage.setItem("lunex_sound", state.sound ? "on" : "off");
    $("#soundBtn").textContent = state.sound ? "🔊" : "🔇";
  });
  $("#balanceBtn").addEventListener("click", () => {
    state.balance += 100;
    save(); setBalance(); calculate(); showToast("+100 виртуальных кредитов");
  });
  document.addEventListener("click", e => {
    const sellButton = e.target.closest(".sell-item-btn");
    if (!sellButton) return;
    e.preventDefault();
    e.stopPropagation();
    sellSkin(sellButton.dataset.sellId);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeResult(); closeCase(); }
  });

  $("#soundBtn").textContent = state.sound ? "🔊" : "🔇";
  loadCatalog();
})();
