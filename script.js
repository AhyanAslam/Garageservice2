const IMGS=["images/car-1.jpg","images/car-2.jpg","images/car-3.jpg","images/car-4.jpg","images/car-5.jpg","images/car-6.jpg","images/car-7.jpg","images/car-8.jpg","images/car-9.jpg"],NAMES=["Electric hypercar","Carbon hypercar","Red coupe","Drift livery","Grand tourer","Classic 911-style coupe","4x4 off-roader","Muscle classic","Matte sports coupe"];
const SV=[["Engine diagnostics","🔧","Computer scan and full report of faults.",150,"Repair"],["Brake service","🛑","Pads, discs and fluid check.",299,"Repair"],["AC repair","❄️","Gas refill, leak and compressor check.",249,"Repair"],["Battery & electrical","⚡","Battery test, alternator, wiring.",179,"Repair"],["Oil & filter service","🛢️","Quality oil, new filter, fluid top-up.",199,"Maintenance"],["Tyres & alignment","🛞","Balancing, rotation and alignment.",129,"Maintenance"],["Full inspection","📋","40-point check before a long trip or sale.",99,"Maintenance"],["Detailing & ceramic","✨","Deep clean, polish and protective coating.",399,"Detailing"]];
const $=s=>document.querySelector(s);
// slideshow
const sl=$('#slides'),dots=$('#dots');let cur=0,tm;
IMGS.slice(0,6).forEach((u,i)=>{sl.insertAdjacentHTML('beforeend',`<img src="${u}" alt="${NAMES[i]} in the garage">`);dots.insertAdjacentHTML('beforeend','<i></i>')});
const si=[...sl.children],di=[...dots.children];
function go(n){cur=(n+si.length)%si.length;si.forEach((e,i)=>e.classList.toggle('on',i==cur));di.forEach((e,i)=>e.classList.toggle('on',i==cur));clearInterval(tm);tm=setInterval(()=>go(cur+1),5500)}
$('#nx').onclick=()=>go(cur+1);$('#pv').onclick=()=>go(cur-1);di.forEach((d,i)=>d.onclick=()=>go(i));go(0);
const SI=[8,2,4,0,7,6,5,1];
// services
const g=$('#grid'),sel=$('#s');
SV.forEach(([t,ic,d,p,c],i)=>{g.insertAdjacentHTML('beforeend',`<div class="card sv rv" data-c="${c}" data-t="${t}"><div class="im"><img src="${IMGS[SI[i]]}" alt="${t}" loading="lazy"><span class="tag">${c}</span><span class="go">&rarr;</span></div><div class="bd"><h3>${t}</h3><p>${d}</p><div class="pr"><span>Starting from</span><b>${p} AED</b></div></div></div>`);sel.insertAdjacentHTML('beforeend',`<option>${t} – from ${p} AED</option>`)});
g.onclick=e=>{const c=e.target.closest('.card');if(!c)return;g.querySelectorAll('.card').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');[...sel.options].forEach(o=>{if(o.text.startsWith(c.dataset.t))sel.value=o.text});$('#book').scrollIntoView()};
g.onmousemove=e=>{const c=e.target.closest('.card');if(c){const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');c.style.setProperty('--ry',((x/r.width-.5)*10)+'deg');c.style.setProperty('--rx',((.5-y/r.height)*8)+'deg')}};
g.onmouseout=e=>{const c=e.target.closest('.card');if(c){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}};
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x==b));g.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',b.dataset.c!='all'&&c.dataset.c!=b.dataset.c))};
// booking
$('#d').min=new Date().toISOString().slice(0,10);
$('#bf').onsubmit=e=>{e.preventDefault();const t=`Hi NexGen Garage, I'd like to book: ${sel.value}. Car: ${$('#c').value}. Date: ${$('#d').value}. Name: ${$('#n').value}, phone ${$('#p').value}. ${$('#m').value}`;const o=$('#ok');o.style.display='block';o.innerHTML=`Thanks ${$('#n').value}! Your request is ready. <a style="color:var(--ac)" target="_blank" rel="noopener" href="https://wa.me/971500000000?text=${encodeURIComponent(t)}">Send it on WhatsApp</a>`};
// reveal + counters + parallax
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*90+'ms';io.observe(e)});
document.querySelectorAll('[data-n]').forEach(el=>{const n=+el.dataset.n,f=n%1?1:0,t0=performance.now();(function s(t){const k=Math.min((t-t0)/1600,1);el.textContent=(n*(1-Math.pow(1-k,3))).toFixed(f);if(k<1)requestAnimationFrame(s)})(t0)});
addEventListener('scroll',()=>{$('#bgt').style.transform=`translateX(${-scrollY*.25}px)`},{passive:true});