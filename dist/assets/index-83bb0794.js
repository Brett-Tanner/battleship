(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();function b(){const n=document.createElement("form"),t=[1,2].map(l=>B(l)),a=document.createElement("button");return a.innerText="Start Game",a.classList.add("text-4xl","font-semibold","p-3","rounded","bg-teal-800","hover:bg-teal-700","outline","outline-teal-900","focus-within:outline-teal-700"),a.addEventListener("click",l=>{l.preventDefault();const i=v(1),o=v(2);P(i,o)}),n.append(...t,a),n.classList.add("grow","flex","flex-wrap","justify-around","items-center"),n}function v(n){const t=document.getElementById(`name${n}`);if(t===null||!(t instanceof HTMLInputElement))throw new Error(`Name input missing for player ${n}`);const a=t.value,l=document.getElementById(`human${n}`);if(l===null||!(l instanceof HTMLInputElement))throw new Error(`Humanity missing for player ${n}`);const i=l.value==="1";return{name:a,human:i}}function B(n){const t=document.createElement("div"),a=document.createElement("h1");a.innerText=`Player ${n}`,a.classList.add("font-bold","text-5xl");const l=document.createElement("div"),i=document.createElement("label");i.htmlFor=`name${n}`,i.innerText="Name",i.classList.add("font-semibold","text-2xl");const o=document.createElement("input");o.id=`name${n}`,n===1&&(o.autofocus=!0),o.placeholder=`Player ${n} Name`,o.classList.add("text-slate-900","h-10","rounded","text-center","outline","focus-within:outline-slate-500"),l.append(i,o),l.classList.add("flex","flex-col","gap-3");const h=document.createElement("div"),m=document.createElement("label");m.innerText="Human?",m.classList.add("font-semibold","text-2xl");const e=document.createElement("input");return e.id=`human${n}`,e.type="checkbox",e.classList.add("h-8"),h.append(m,e),h.classList.add("flex","gap-3"),t.append(a,l,h),t.classList.add("flex","flex-col","items-center","gap-6","p-6","basis-1/2"),t}function y(n,t,a){const l=document.createElement("table");function i(o,h){const m=document.createElement("tr"),e=o.map(c=>{const r=o.indexOf(c),s=document.createElement("td");return s.dataset.coordinates=`y${h}_x${r}`,c.ship&&!a?s.appendChild(k(c)):(c.hit&&s.appendChild(w()),c.missed&&s.appendChild(E())),s.classList.add("border","border-neutral-200","w-[10%]","h-[10%]"),s});return m.append(...e),m}if(t){const o=document.createElement("caption");o.innerText=t,o.classList.add("p-3","text-2xl","text-center","font-semibold"),l.appendChild(o)}return n.rows.forEach(o=>{const h=n.rows.indexOf(o);l.appendChild(i(o,h))}),l.classList.add("table-fixed","border-collapse","basis-[40%]"),l}function C(n,t,a,l){return new Promise(i=>{t.querySelectorAll("td").forEach(o=>{const h=g(o),m=l.gameBoard.rows[h.y][h.x];m.hit||m.missed||o.addEventListener("click",()=>{const e=a.attack(l.gameBoard,g(o));e?o.appendChild(w()):o.appendChild(E()),n.removeChild(t),e?n.appendChild(y(l.gameBoard,`You ${e.sunk()?"sunk":"hit"} my ${e.type}`,!0)):n.appendChild(y(l.gameBoard,"You missed :p",!0)),i()})}),n.appendChild(t)})}function g(n){var i;const t=(i=n.dataset.coordinates)==null?void 0:i.split("_");if(t===void 0||t.some(o=>o===void 0))throw new Error("Dataset coordinates are missing");const a=parseInt(t[0].split("")[1]),l=parseInt(t[1].split("")[1]);return{y:a,x:l}}function w(){const n=document.createElement("div"),t=document.createElement("div");return t.classList.add("bg-red-600","rounded-full","h-3","w-3"),n.appendChild(t),n.classList.add("flex","justify-center","items-center"),n}function E(){const n=document.createElement("div"),t=document.createElement("div");return t.classList.add("bg-neutral-200","rounded-full","h-3","w-3"),n.appendChild(t),n.classList.add("flex","justify-center","items-center"),n}function k(n){const t=document.createElement("div"),a=document.createElement("div");return a.classList.add("bg-slate-400","rounded-full","h-5","w-5"),n.hit&&a.appendChild(w()),n.missed&&a.appendChild(E()),a.classList.add("flex","justify-center","items-center"),t.appendChild(a),t.classList.add("flex","justify-center","items-center"),t}function T(n){const t=I(n);let a=0;const l=()=>(a++,a),i=()=>a>=t;function o(m,e,c){const r=e.y-c.y,s=e.x-c.x;let d=[];if(r!==0)for(let u=0;u<t;u++){const p=r>0?m.rows[e.y-u][e.x]:m.rows[e.y+u][e.x];d.push(p)}else for(let u=0;u<t;u++){const p=s>0?m.rows[e.y][e.x-u]:m.rows[e.y][e.x+u];d.push(p)}return!d.some(u=>u.ship)}function h(m,e){const c=[],r={y:e.y+t-1,x:e.x};r.y>=0&&r.y<=9&&o(m,e,r)&&c.push(r);const s={y:e.y-t+1,x:e.x};s.y>=0&&s.y<=9&&o(m,e,s)&&c.push(s);const d={y:e.y,x:e.x+t-1};d.x>=0&&d.x<=9&&o(m,e,d)&&c.push(d);const u={y:e.y,x:e.x-t+1};return u.x>=0&&u.x<=9&&o(m,e,u)&&c.push(u),c}return{length:t,type:n,hit:l,possibleEnds:h,sunk:i}}function I(n){switch(n){case"Carrier":return 5;case"Battleship":return 4;case"Destroyer":return 3;case"Submarine":return 3;case"Patrol Boat":return 2;default:throw new Error("That's not a real ship type!")}}function S(){return{ship:null,hit:!1,missed:!1}}function M(){const n=["Carrier","Battleship","Destroyer","Submarine","Patrol Boat"],t=o(),a=n.map(r=>T(r)),l=()=>a.every(r=>r.sunk());function i(r,s,d){const u=s.x-d.x,p=Math.abs(u)+1,f=s.y-d.y,L=Math.abs(f)+1;if(p!==r&&L!==r)throw u!==0?new Error(`Your coordinates cover ${p} spaces on the X-axis; your ship covers ${r} spaces`):new Error(`Your coordinates cover ${L} spaces on the Y-axis; your ship covers ${r} spaces`);return{y:f,x:u}}function o(){return Array.from({length:10},()=>Array.from({length:10},()=>S()))}function h(r,s){if(r.ship)throw new Error(`That space is occupied by a ${r.ship.type}`);r.ship=s}return{allSunk:l,placeShip:(r,s,d)=>{const u=i(r.length,s,d);if(u.y!==0)for(let p=0;p<r.length;p++){const f=u.y>0?t[s.y-p][s.x]:t[s.y+p][s.x];h(f,r)}else for(let p=0;p<r.length;p++){const f=u.x>0?t[s.y][s.x-p]:t[s.y][s.x+p];h(f,r)}},receiveAttack:r=>{const s=t[r.y][r.x];return s.ship?(s.ship.hit(),s.hit=!0):s.missed=!0,s.ship},rows:t,ships:a,vacant:r=>t[r.y][r.x].ship===null}}function $(n,t){const a=M();function l(e,c){return c?e.receiveAttack({y:c.y,x:c.x}):e.receiveAttack({y:Math.floor(Math.random()*9),x:Math.floor(Math.random()*9)})}async function i(e,c){e.innerHTML="";const r=y(a,`${n}, place your ${c.type}`);return new Promise(s=>{r.querySelectorAll("td").forEach(d=>{d.addEventListener("click",()=>{e.innerHTML="",e.appendChild(y(a,`${n}, place your ${c.type}`)),s(d)})}),e.appendChild(r)})}async function o(e,c){if(c===void 0){e.innerHTML="",e.appendChild(y(a));return}const r=await i(e,c),s=await h(r,c);a.placeShip(c,g(r),s);const d=a.ships.findIndex(u=>u.type===c.type)+1;return o(e,a.ships[d])}async function h(e,c){var d;const r=g(e);(d=document.querySelector(`[data-coordinates=y${r.y}_x${r.x}]`))==null||d.classList.add("bg-neutral-200");const s=c.possibleEnds(a,r);return new Promise(u=>{s.forEach(p=>{const f=document.querySelector(`[data-coordinates=y${p.y}_x${p.x}]`);f==null||f.classList.add("bg-green-500"),f==null||f.addEventListener("click",()=>{u(p)})})})}async function m(e,c){e.innerHTML="",e.appendChild(y(this.gameBoard,`${this.name}`));const r=y(c.gameBoard,`${c.name}`,!0);if(await C(e,r,this,c),c.gameBoard.allSunk()){e.innerHTML="";const s=document.createElement("h1");s.innerText=`${this.name} wins!`,s.classList.add("text-9xl","font-bold","w-full"),e.append(s,y(this.gameBoard,`${this.name} (Winner)`),y(c.gameBoard,`${c.name} (SaDBoi)`));return}else{const s=document.createElement("div"),d=document.createElement("button");d.innerText=`Pass to ${c.name}`,d.addEventListener("click",()=>{d.innerText="3";const u=setInterval(()=>{const p=parseInt(d.innerText);p===1&&(window.clearInterval(u),d.remove(),c.takeTurn(e,this)),d.innerText=`${p-1}`},1e3)}),d.classList.add("text-4xl","font-semibold","p-3","rounded","bg-teal-800","hover:bg-teal-700","outline","outline-teal-900","focus-within:outline-teal-700"),s.appendChild(d),s.classList.add("w-full","flex","justify-center","items-center"),e.appendChild(s)}}return{attack:l,gameBoard:a,human:t,name:n,placeShips:o,takeTurn:m}}const x=document.getElementById("app")||document.body.appendChild(document.createElement("main"));x.appendChild(b());async function P(n,t){const a=[$(n.name,n.human),$(t.name,t.human)];await a[0].placeShips(x,a[0].gameBoard.ships[0]),await a[1].placeShips(x,a[1].gameBoard.ships[0]),a[0].takeTurn(x,a[1])}
