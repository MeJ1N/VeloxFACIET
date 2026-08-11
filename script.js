const state = {
  elo: 1428,
  wins: 24,
  matches: [
    {result:"WIN", mode:"Ranked 5v5", score:"13 : 9", map:"Sakura", elo:"+24", time:"12 мин назад"},
    {result:"WIN", mode:"Ranked 5v5", score:"13 : 7", map:"Province", elo:"+19", time:"Вчера"},
    {result:"LOSS", mode:"Team 2v2", score:"8 : 13", map:"Rust", elo:"-17", time:"Вчера"},
    {result:"WIN", mode:"Duel 1v1", score:"9 : 5", map:"Sandstone", elo:"+12", time:"2 дня назад"}
  ]
};

const players = [
  ["1","M4XIM","1842"],["2","s1mple2","1776"],["3","vortex","1694"],
  ["4","D0cK","1621"],["5","Kolt","1428"],["6","Nexor","1387"],
  ["7","RageKid","1330"],["8","Lunex","1294"]
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function showPage(id){
  $$(".page").forEach(p=>p.classList.remove("active-page"));
  $(`#${id}`).classList.add("active-page");
  $$(".nav-item").forEach(b=>b.classList.toggle("active", b.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
}

function toast(text){
  const t=$("#toast"); t.textContent=text; t.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

function renderMatches(target){
  $(target).innerHTML=state.matches.map(m=>`
    <div class="match">
      <div class="result ${m.result==="WIN"?"win":"loss"}">${m.result==="WIN"?"ПОБЕДА":"ПОРАЖЕНИЕ"}</div>
      <div class="match-info"><b>${m.mode} • ${m.score}</b><small>${m.map} • ${m.time}</small></div>
      <div class="elo ${m.elo.startsWith("+")?"up":"down"}">${m.elo} ELO</div>
      <div class="muted">›</div>
    </div>`).join("");
}

function renderLeaderboard(){
  $("#leaderboardList").innerHTML=players.map(p=>`
    <div class="player-row">
      <div class="place">#${p[0]}</div>
      <div class="player"><div class="mini-avatar">${p[1][0]}</div><div><b>${p[1]}</b><small>${p[1].toLowerCase()==="kolt"?"Вы":"Verified player"}</small></div></div>
      <strong>${p[2]}</strong><strong>${Number(p[2])>=1600?"LVL 10":Number(p[2])>=1400?"LVL 8":"LVL 7"}</strong>
    </div>`).join("");
}

function syncStats(){
  $("#heroElo").textContent=state.elo;
  $("#profileElo").textContent=state.elo;
  $("#wins").textContent=state.wins;
  const progress=Math.min(100, Math.max(0, ((state.elo-1200)/300)*100));
  $("#heroProgress").style.width=progress+"%";
  $("#heroNext").textContent=Math.max(0,1500-state.elo)+" ELO";
}

function openQueue(mode="5v5"){
  const names={ "5v5":"Ranked 5v5","2v2":"Team 2v2","1v1":"Duel 1v1" };
  $("#modalText").textContent=`Ищем соперников для ${names[mode]}...`;
  $("#modal").classList.remove("hidden");
  setTimeout(()=>{
    if(!$("#modal").classList.contains("hidden")){
      $("#modalText").textContent="Матч найден! Подключение к лобби...";
      setTimeout(()=>{ $("#modal").classList.add("hidden"); toast(`Матч ${names[mode]} найден!`); },1300);
    }
  },1800);
}

$$(".nav-item").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$$("[data-page-jump]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.pageJump)));

$("#findMatchBtn").addEventListener("click",()=>openQueue("5v5"));
$("#cancelQueue").addEventListener("click",()=>{$("#modal").classList.add("hidden");toast("Поиск отменён");});
$("#closeModal").addEventListener("click",()=>$("#modal").classList.add("hidden"));
$("#avatarBtn").addEventListener("click",()=>showPage("profile"));

$$("[data-queue]").forEach(card=>card.addEventListener("click",()=>{
  const mode=card.dataset.queue;
  $$(".queue-card").forEach(c=>c.classList.toggle("selected",c.dataset.queue===mode));
  if(card.classList.contains("quick-card")) openQueue(mode);
  else {
    const names={ "5v5":"Ranked 5v5","2v2":"Team 2v2","1v1":"Duel 1v1" };
    $("#queueTitle").textContent=names[mode];
    $("#queueText").textContent=mode==="1v1"?"Быстрый матч один на один":"Поиск соперников с похожим рейтингом";
  }
}));

$("#queueBtn").addEventListener("click",()=>{
  const selected=$(".queue-card.selected")?.dataset.queue||"5v5";
  openQueue(selected);
});

$("#themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("veloxTheme",document.body.classList.contains("light")?"light":"dark");
  toast(document.body.classList.contains("light")?"Светлая тема":"Тёмная тема");
});

$("#resetBtn").addEventListener("click",()=>{
  state.elo=1428; state.wins=24; syncStats(); toast("Демо-данные сброшены");
});

if(localStorage.getItem("veloxTheme")==="light") document.body.classList.add("light");
renderMatches("#recentMatches");
renderMatches("#profileMatches");
renderLeaderboard();
syncStats();

$("#onlineCount").textContent=(1284+Math.floor(Math.random()*100)).toLocaleString("ru-RU")+" игрока";
