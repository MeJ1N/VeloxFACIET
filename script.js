const items={
 common:[
  {name:"Blue Shard",price:35,icon:"🔷",c:"#1688ff",rarity:"COMMON"},
  {name:"Neon Coin",price:55,icon:"🪙",c:"#1688ff",rarity:"COMMON"},
  {name:"Lunar Stone",price:80,icon:"🌑",c:"#1688ff",rarity:"COMMON"}
 ],
 rare:[
  {name:"Phantom Blade",price:150,icon:"🗡️",c:"#6c5cff",rarity:"RARE"},
  {name:"Void Crystal",price:220,icon:"💠",c:"#6c5cff",rarity:"RARE"},
  {name:"Cyber Mask",price:300,icon:"🎭",c:"#6c5cff",rarity:"RARE"}
 ],
 epic:[
  {name:"Galaxy Orb",price:550,icon:"🔮",c:"#b34cff",rarity:"EPIC"},
  {name:"Lunex Core",price:750,icon:"💎",c:"#b34cff",rarity:"EPIC"},
  {name:"Astral Sword",price:950,icon:"⚔️",c:"#b34cff",rarity:"EPIC"}
 ],
 legendary:[
  {name:"Solar Crown",price:1600,icon:"👑",c:"#ffc42e",rarity:"LEGENDARY"},
  {name:"Dragon Core",price:2400,icon:"🐉",c:"#ffc42e",rarity:"LEGENDARY"}
 ],
 mythic:[
  {name:"Lunex Star",price:5000,icon:"⭐",c:"#ff4d88",rarity:"MYTHIC"},
  {name:"Eternal Moon",price:9000,icon:"🌙",c:"#ff4d88",rarity:"MYTHIC"}
 ]
};

const cases={
 starter:{name:"Starter Case",price:100,color:"#1688ff",emoji:"📦",pool:[["common",65],["rare",27],["epic",8]]},
 phantom:{name:"Phantom Case",price:250,color:"#765cff",emoji:"🎁",pool:[["common",20],["rare",55],["epic",22],["legendary",3]]},
 galaxy:{name:"Galaxy Case",price:500,color:"#b34cff",emoji:"💎",pool:[["rare",25],["epic",60],["legendary",13],["mythic",2]]},
 inferno:{name:"Inferno Case",price:1000,color:"#ff4b3e",emoji:"🔥",pool:[["epic",40],["legendary",50],["mythic",10]]}
};

let balance=Number(localStorage.getItem("lunex_balance")??1000);
let inventory=JSON.parse(localStorage.getItem("lunex_inventory")||"[]");
let source=null,target=null;

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function save(){
 localStorage.setItem("lunex_balance",balance);
 localStorage.setItem("lunex_inventory",JSON.stringify(inventory));
 render();
}

function render(){
 $("#balance").textContent=balance;
 renderCases();
 renderInventory();
 renderTargets();
 updateUpgrade();
}

function renderCases(){
 $("#casesGrid").innerHTML=Object.entries(cases).map(([id,c])=>`
 <article class="card">
  <div class="case-icon" style="--c:${c.color}">${c.emoji}</div>
  <h3>${c.name}</h3>
  <p>Открытие кейса и случайный дроп</p>
  <div class="rarity">${c.pool.map(x=>x[0].toUpperCase()).join(" · ")}</div>
  <div class="price">◆ ${c.price}</div>
  <button class="primary" onclick="openCase('${id}')">ОТКРЫТЬ</button>
 </article>`).join("");
}

function renderInventory(){
 $("#inventoryGrid").innerHTML=inventory.length?inventory.map((x,i)=>`
 <div class="item">
  <div class="icon" style="--c:${x.c}">${x.icon}</div>
  <h3>${x.name}</h3>
  <p>${x.rarity} · ◆ ${x.price}</p>
  <button class="secondary" style="margin-top:12px;width:100%" onclick="selectSource(${i})">В апгрейдер</button>
 </div>`).join(""):`<div style="grid-column:1/-1;text-align:center;color:#64748a;padding:60px">Инвентарь пуст. Открой первый кейс!</div>`;
 $("#inventoryValue").textContent=inventory.reduce((a,x)=>a+x.price,0);
}

function renderTargets(){
 const all=Object.values(items).flat();
 $("#targets").innerHTML=all.map((x,i)=>`
 <div class="item" onclick="selectTarget(${i})">
  <div class="icon" style="--c:${x.c}">${x.icon}</div>
  <h3>${x.name}</h3><p>◆ ${x.price}</p>
 </div>`).join("");
 window.targetPool=all;
}

function weighted(pool){
 let r=Math.random()*100;
 for(const [rarity,chance] of pool){if((r-=chance)<=0)return items[rarity][Math.floor(Math.random()*items[rarity].length)]}
 return items.common[0];
}

function openCase(id){
 const c=cases[id];
 if(balance<c.price){toast("Недостаточно средств");return}
 balance-=c.price; save();
 $("#modalTitle").textContent=c.name;
 $("#modal").classList.add("show");
 $("#again").classList.add("hidden");
 $("#result").textContent="Открываем...";
 const track=$("#rouletteTrack");
 track.innerHTML="";
 const winner=weighted(c.pool);
 for(let i=0;i<28;i++){
   const x=i===24?winner:weighted(c.pool);
   track.innerHTML+=`<div class="roll-item" style="--c:${x.c}">${x.icon}</div>`;
 }
 track.style.transition="none"; track.style.left="0px";
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
   const offset=24*140-330;
   track.style.transition="left 4s cubic-bezier(.12,.72,.1,1)";
   track.style.left=`-${offset}px`;
 }));
 setTimeout(()=>{
   inventory.push({...winner,id:Date.now()});
   $("#result").innerHTML=`${winner.icon} ${winner.name}<br><span style="color:#68b8ff">◆ ${winner.price}</span>`;
   $("#again").classList.remove("hidden");
   save(); toast(`Получен ${winner.name}`);
 },4300);
 $("#again").onclick=()=>openCase(id);
}

function closeModal(){$("#modal").classList.remove("show")}
$("#closeModal").onclick=closeModal;

function showPage(id){
 $$(".page").forEach(x=>x.classList.remove("active"));
 $("#"+id).classList.add("active");
 $$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===id));
 window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav").forEach(x=>x.onclick=()=>showPage(x.dataset.page));
$("#scrollCases").onclick=()=>document.querySelector("#casesGrid").scrollIntoView({behavior:"smooth"});

function openSelector(){
 $("#selectorGrid").innerHTML=inventory.length?inventory.map((x,i)=>`
 <div class="item" onclick="selectSource(${i})">
  <div class="icon" style="--c:${x.c}">${x.icon}</div>
  <h3>${x.name}</h3><p>◆ ${x.price}</p>
 </div>`).join(""):`<p style="color:#72819b">Сначала открой кейс.</p>`;
 $("#selector").classList.add("show");
}
$("#chooseSource").onclick=openSelector;
$("#closeSelector").onclick=()=>$("#selector").classList.remove("show");

function selectSource(i){
 source={...inventory[i],index:i};
 $("#sourceSlot").innerHTML=`<span>${source.icon}</span><small>${source.name}<br>◆ ${source.price}</small>`;
 $("#sourceSlot").classList.remove("empty");
 $("#selector").classList.remove("show");
 updateUpgrade();
}

function selectTarget(i){
 target={...window.targetPool[i]};
 $("#targetSlot").innerHTML=`<span>${target.icon}</span><small>${target.name}</small>`;
 $("#targetSlot").classList.remove("empty");
 $("#targetPrice").textContent=target.price;
 updateUpgrade();
}

function updateUpgrade(){
 if(!source||!target){
  $("#chance").textContent="0%";
  $("#upgradeBtn").disabled=true;
  return;
 }
 if(target.price<=source.price){
  $("#chance").textContent="—";
  $("#upgradeBtn").disabled=true;
  return;
 }
 let chance=Math.max(3,Math.min(95,(source.price/target.price)*100*0.9));
 chance=Math.round(chance);
 $("#chance").textContent=chance+"%";
 $("#upgradeBtn").disabled=false;
}

function upgradeItem(){
 if(!source||!target)return;
 let chance=Math.max(3,Math.min(95,(source.price/target.price)*100*0.9));
 const win=Math.random()*100<chance;
 const index=source.index;
 if(win){
  inventory.splice(index,1);
  inventory.push({...target,id:Date.now()});
  toast(`🎉 Успех! ${target.name}`);
 }else{
  inventory.splice(index,1);
  toast("💥 Неудача. Предмет потерян.");
 }
 source=null;
 $("#sourceSlot").className="item-slot empty";
 $("#sourceSlot").textContent="?";
 save();
}

function toast(text){
 const t=$("#toast");t.textContent=text;t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),2500);
}

render();
