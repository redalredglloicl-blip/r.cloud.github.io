/* ===== تطبيق تصليح الآيباد — teardown ثنائي الأبعاد ===== */
const R_SCREW_SVG='<svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8.5" fill="#c9ced6" stroke="#7d838d" stroke-width="1.5"/><path d="M10 5.5v9M5.5 10h9" stroke="#5d636d" stroke-width="2.2" stroke-linecap="round"/></svg>';
const R_HOLE_SVG='<svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="7" fill="none" stroke="#ff9f0a" stroke-width="1.6" stroke-dasharray="3 2"/></svg>';
const R_IC={
flip:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a8 8 0 0 1 13.6-2.6L20 8.8"/><path d="M20 4.8v4h-4"/><path d="M20 15a8 8 0 0 1-13.6 2.6L4 15.2"/><path d="M4 19.2v-4h4"/></svg>',
reset:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 4v5h5"/></svg>',
power:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0"/></svg>'};
const RPART_DEFS=[
{id:'screen',n:'الشاشة',face:'front',x:0,y:0,w:150,h:210,z:10,sc:[[52,216],[98,216]],
svg:'<svg viewBox="0 0 150 210" width="100%" height="100%"><defs><linearGradient id="rsg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e343d"/><stop offset=".5" stop-color="#12151b"/><stop offset="1" stop-color="#20262f"/></linearGradient></defs><rect width="150" height="210" rx="10" fill="url(#rsg1)" stroke="#454c56" stroke-width="2"/><polygon points="0,0 72,0 30,210 0,210" fill="#fff" opacity=".06"/><rect x="58" y="200" width="34" height="4" rx="2" fill="#454c56"/></svg>'},
{id:'board',n:'اللوحة الأم',face:'front',x:8,y:8,w:84,h:56,z:5,sc:[[2,2],[68,2],[2,40],[68,40]],
svg:'<svg viewBox="0 0 84 56" width="100%" height="100%"><rect width="84" height="56" rx="6" fill="#0e5e35" stroke="#073a21" stroke-width="2"/><rect x="8" y="8" width="26" height="18" rx="2" fill="#16191f"/><rect x="40" y="8" width="18" height="18" rx="2" fill="#16191f"/><rect x="8" y="32" width="42" height="14" rx="2" fill="#16191f"/><circle cx="70" cy="40" r="5.5" fill="#c9a227"/><circle cx="70" cy="40" r="2.2" fill="#6e5410"/><rect x="62" y="6" width="14" height="6" fill="#c9a227"/><path d="M4 52h76" stroke="#c9a227" stroke-width="2"/></svg>'},
{id:'fcam',n:'الكاميرا الأمامية',face:'front',x:104,y:16,w:26,h:26,z:5,sc:[[-10,5],[24,5]],
svg:'<svg viewBox="0 0 26 26" width="100%" height="100%"><circle cx="13" cy="13" r="12" fill="#2c313a" stroke="#0f1218" stroke-width="2"/><circle cx="13" cy="13" r="7" fill="#090d16"/><circle cx="11" cy="11" r="2.6" fill="#4d6a9e" opacity=".85"/><circle cx="10" cy="10" r="1.1" fill="#d6e8ff"/></svg>'},
{id:'battery',n:'البطارية',face:'front',x:8,y:76,w:112,h:70,z:5,sc:[[2,2],[96,2],[2,54],[96,54]],
svg:'<svg viewBox="0 0 112 70" width="100%" height="100%"><rect x="4" y="26" width="7" height="18" rx="2" fill="#a9aeb6"/><rect width="112" height="70" rx="8" fill="#d8dce1" stroke="#a9aeb6" stroke-width="2"/><rect x="9" y="9" width="94" height="52" rx="4" fill="#f0f2f5"/><text x="56" y="31" text-anchor="middle" font-size="11" fill="#555" font-weight="700" font-family="sans-serif">Li-ion</text><text x="56" y="47" text-anchor="middle" font-size="10" fill="#8a8f98" font-family="sans-serif">3.79V 28Wh</text><path d="M62 12 L51 29 h7 L54 41 L67 24 h-7 z" fill="#f5a623"/></svg>'},
{id:'port',n:'منفذ الشحن',face:'front',x:58,y:164,w:34,h:12,z:5,sc:[[-12,0],[38,0]],
svg:'<svg viewBox="0 0 34 12" width="100%" height="100%"><rect width="34" height="12" rx="6" fill="#8a8f98"/><rect x="3" y="3" width="28" height="6" rx="3" fill="#14161a"/></svg>'},
{id:'spk',n:'السماعات',face:'front',x:8,y:186,w:134,h:14,z:5,sc:[[2,-2],[118,-2]],
svg:'<svg viewBox="0 0 134 14" width="100%" height="100%"><defs><pattern id="rsp" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.4" fill="#14161a"/></pattern></defs><rect width="134" height="14" rx="7" fill="#3a3f47"/><rect x="7" y="2" width="36" height="10" rx="5" fill="url(#rsp)"/><rect x="91" y="2" width="36" height="10" rx="5" fill="url(#rsp)"/></svg>'},
{id:'sbtn',n:'الأزرار الجانبية',face:'front',x:142,y:60,w:6,h:44,z:5,sc:[[-2,-14],[-2,48]],
svg:'<svg viewBox="0 0 6 44" width="100%" height="100%"><rect width="6" height="44" rx="3" fill="#767c86"/></svg>'},
{id:'rcam',n:'الكاميرا الخلفية',face:'back',x:14,y:14,w:46,h:46,z:5,sc:[[0,0],[32,0]],
svg:'<svg viewBox="0 0 46 46" width="100%" height="100%"><rect width="46" height="46" rx="12" fill="#2c313a" stroke="#0f1218" stroke-width="2"/><circle cx="15" cy="15" r="8" fill="#090d16"/><circle cx="13" cy="13" r="2.2" fill="#4d6a9e"/><circle cx="31" cy="31" r="8" fill="#090d16"/><circle cx="29" cy="29" r="2.2" fill="#4d6a9e"/><circle cx="33" cy="13" r="3.2" fill="#f5e6a8" stroke="#b39b4a" stroke-width="1"/></svg>'}
];
function rDef(id){return RPART_DEFS.find(p=>p.id===id)}
function rOutCt(){return RPART_DEFS.filter(p=>(S.repair.out||{})[p.id]).length}
function rScrewCt(){let n=0;RPART_DEFS.forEach(p=>{n+=(S.repair.so||{})[p.id]||0});return n}
function rScrewTotal(){let n=0;RPART_DEFS.forEach(p=>{n+=p.sc.length});return n}
function rSoOut(id){return (S.repair.so||{})[id]||0}
function rAllScrewsOut(id){const d=rDef(id);return rSoOut(id)>=d.sc.length}
function rComplete(){return RPART_DEFS.every(p=>!(S.repair.out||{})[p.id]&&rSoOut(p.id)===0)}
function rFly(fromR,toR,html,cb){
const d=document.createElement('div');
d.innerHTML=html;
Object.assign(d.style,{position:'fixed',left:fromR.left+'px',top:fromR.top+'px',width:fromR.width+'px',height:fromR.height+'px',zIndex:9999,pointerEvents:'none',transition:'transform .45s cubic-bezier(.3,.7,.3,1),opacity .45s',margin:'0',padding:'0'});
d.firstChild.style.width='100%';d.firstChild.style.height='100%';
document.body.appendChild(d);
const dx=toR.left+toR.width/2-(fromR.left+fromR.width/2);
const dy=toR.top+toR.height/2-(fromR.top+fromR.height/2);
requestAnimationFrame(()=>{requestAnimationFrame(()=>{d.style.transform='translate('+dx+'px,'+dy+'px) scale(.35)';d.style.opacity='.85';});});
setTimeout(()=>{d.remove();if(cb)cb();},500);
}
function appRepair(el){
S.repair=S.repair||store.get('repair',{out:{},so:{}});
const save=()=>store.set('repair',S.repair);
if(!S._rCss){S._rCss=1;const st=document.createElement('style');st.textContent=
'#repairApp{height:100%;display:flex;flex-direction:column;color:#fff;user-select:none;-webkit-user-select:none;background:linear-gradient(180deg,#343437,#1d1d1f);margin:-12px -12px -12px;padding:12px;border-radius:18px}'+
'.rTop{display:flex;align-items:center;gap:8px;padding:2px 2px 8px}'+
'.rTop b{font-size:17px;flex:1}'+
'.rCnt{font-size:11.5px;background:rgba(255,255,255,.14);padding:5px 10px;border-radius:12px;display:flex;align-items:center;gap:5px;white-space:nowrap}'+
'.rBtn{width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;cursor:pointer}'+
'.rBtn.ok{background:#34c759;box-shadow:0 0 12px rgba(52,199,89,.7);animation:rpulse 1.2s infinite}'+
'@keyframes rpulse{50%{box-shadow:0 0 20px rgba(52,199,89,1)}}'+
'#rStage{flex:1;position:relative;display:flex;align-items:center;justify-content:center;perspective:1000px;min-height:0;overflow:hidden}'+
'#rPad{width:172px;height:232px;position:relative;transition:transform .65s cubic-bezier(.3,.7,.3,1);transform-style:preserve-3d}'+
'#rPad.flipped{transform:rotateY(180deg)}'+
'.rFace{position:absolute;inset:0;border-radius:20px;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden}'+
'#rFront{background:linear-gradient(150deg,#43474f,#17191d 60%,#22252b);box-shadow:inset 0 0 0 2px #4a4e57,0 10px 26px rgba(0,0,0,.5)}'+
'#rBack{background:linear-gradient(150deg,#9aa0a8,#6e747c 60%,#878d95);transform:rotateY(180deg);box-shadow:inset 0 0 0 2px #b9bec6,0 10px 26px rgba(0,0,0,.5)}'+
'.rPart{position:absolute;cursor:pointer;transition:filter .25s}'+
'.rPart.can{filter:drop-shadow(0 0 8px #ff9f0a);animation:rwig .8s infinite}'+
'@keyframes rwig{50%{transform:translateY(-3px)}}'+
'.rScrew{position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;background:none;border:none;cursor:pointer;padding:0;z-index:20}'+
'.rHole{position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;background:none;border:none;cursor:pointer;padding:0;z-index:20}'+
'.rTrayLabel{font-size:12px;color:rgba(255,255,255,.65);margin:6px 2px 4px}'+
'#rTray{display:flex;gap:8px;overflow-x:auto;padding:10px;min-height:104px;background:rgba(0,0,0,.28);border-radius:14px;align-items:center}'+
'.rTrayItem{flex:0 0 auto;width:66px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:6px 4px;cursor:pointer;text-align:center;color:#fff}'+
'.rTrayItem .th{height:44px;display:flex;align-items:center;justify-content:center;pointer-events:none}'+
'.rTrayItem .th svg{max-width:56px;max-height:44px}'+
'.rTrayItem span{font-size:10px;display:block;margin-top:3px;pointer-events:none}'+
'.rEmpty{font-size:12px;color:rgba(255,255,255,.4);text-align:center;width:100%}'+
'#rBoot{position:absolute;inset:0;background:#000;z-index:400;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;opacity:0;transition:opacity .5s}'+
'#rBoot.on{opacity:1}'+
'#rBoot .ra{font-size:88px;color:#fff;line-height:1}'+
'#rBoot .rbw{width:170px;height:5px;background:#2c2c2e;border-radius:3px;overflow:hidden}'+
'#rBoot .rb{height:100%;width:0;background:#fff;border-radius:3px}';
document.head.appendChild(st);}
render();
function render(){
const out=S.repair.out||{};
const partsOut=rOutCt(),screwCt=rScrewCt(),screwTotal=rScrewTotal();
const ok=rComplete();
el.innerHTML='<div id="repairApp">'+
'<div class="rTop"><b>تصليح الآيباد</b>'+
'<span class="rCnt">القطع '+arabNum(partsOut)+'／'+arabNum(RPART_DEFS.length)+'</span>'+
'<span class="rCnt" id="rScrewCt">'+R_SCREW_SVG+' '+arabNum(screwCt)+'／'+arabNum(screwTotal)+'</span>'+
'<button class="rBtn" id="rFlip" title="اقلب">'+R_IC.flip+'</button>'+
'<button class="rBtn" id="rReset" title="إعادة">'+R_IC.reset+'</button>'+
'<button class="rBtn'+(ok?' ok':'')+'" id="rPower" title="تشغيل">'+R_IC.power+'</button></div>'+
'<div id="rStage"><div id="rPad" class="'+(S._rFlip?'flipped':'')+'">'+
'<div class="rFace" id="rFront">'+faceHTML('front')+'</div>'+
'<div class="rFace" id="rBack"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><div style="font-size:64px;color:rgba(40,44,50,.85);line-height:1"></div><div style="font-size:15px;color:rgba(40,44,50,.7);font-weight:600;letter-spacing:2px">iPad</div></div>'+faceHTML('back')+'</div>'+
'</div></div>'+
'<div class="rTrayLabel">صينية القطع — دوس على قطعة حتى ترجعها</div>'+
'<div id="rTray">'+(partsOut?RPART_DEFS.filter(p=>out[p.id]).map(p=>'<button class="rTrayItem" data-install="'+p.id+'"><span class="th">'+p.svg+'</span><span>'+p.n+'</span></button>').join(''):'<div class="rEmpty">الصينية فارغة — فك البراغي ثم القطع</div>')+'</div>'+
'</div>';
el.querySelector('#rFlip').addEventListener('click',e=>{e.stopPropagation();S._rFlip=!S._rFlip;sfx('click');render();});
el.querySelector('#rReset').addEventListener('click',e=>{e.stopPropagation();S.repair={out:{},so:{}};save();sfx('click');toast('رجعت كل القطع والبراغي');render();});
el.querySelector('#rPower').addEventListener('click',e=>{e.stopPropagation();rPower();});
el.querySelectorAll('.rScrew').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rUnscrew(b.dataset.pid,parseInt(b.dataset.i,10),b);}));
el.querySelectorAll('.rHole').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rScrewBack(b.dataset.pid,parseInt(b.dataset.i,10),b);}));
el.querySelectorAll('.rPart').forEach(p=>p.addEventListener('click',e=>{e.stopPropagation();rPartTap(p.dataset.pid,p);}));
el.querySelectorAll('[data-install]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rInstall(b.dataset.install,b);}));
}
function faceHTML(face){
let h='';
RPART_DEFS.filter(p=>p.face===face).forEach(p=>{
const isOut=(S.repair.out||{})[p.id];
if(isOut)return;
const hideable=p.face==='front'&&p.id!=='screen'&&!(S.repair.out||{}).screen;
const can=!hideable&&rAllScrewsOut(p.id)&&(p.id==='screen'||!(S.repair.out||{}).screen);
h+='<div class="rPart'+(can?' can':'')+'" data-pid="'+p.id+'" id="rp-'+p.id+'" style="left:'+(10+p.x)+'px;top:'+(10+p.y)+'px;width:'+p.w+'px;height:'+p.h+'px;z-index:'+p.z+';'+(hideable?'visibility:hidden':'')+'">'+p.svg+'</div>';
if(!hideable){
const so=rSoOut(p.id);
p.sc.forEach((s,i)=>{
const sx=10+p.x+s[0],sy=10+p.y+s[1];
if(i<so)h+='<button class="rHole" data-pid="'+p.id+'" data-i="'+i+'" style="left:'+sx+'px;top:'+sy+'px">'+R_HOLE_SVG+'</button>';
else h+='<button class="rScrew" data-pid="'+p.id+'" data-i="'+i+'" style="left:'+sx+'px;top:'+sy+'px">'+R_SCREW_SVG+'</button>';
});
}
});
return h;
}
function rUnscrew(pid,i,btn){
const r=btn.getBoundingClientRect();
const t=document.querySelector('#rScrewCt').getBoundingClientRect();
S.repair.so=S.repair.so||{};S.repair.so[pid]=(S.repair.so[pid]||0)+1;save();sfx('click');
rFly(r,t,'<div>'+R_SCREW_SVG+'</div>',()=>render());
render();
}
function rScrewBack(pid,i,btn){
const t=btn.getBoundingClientRect();
S.repair.so[pid]=Math.max(0,(S.repair.so[pid]||0)-1);save();sfx('click');
render();
const hole=document.querySelector('.rScrew[data-pid="'+pid+'"][data-i="'+i+'"]');
if(hole){const r=hole.getBoundingClientRect();const c=document.querySelector('#rScrewCt').getBoundingClientRect();rFly(c,r,'<div>'+R_SCREW_SVG+'</div>');}
}
function rPartTap(pid,elm){
const d=rDef(pid);
if((S.repair.out||{})[pid])return;
if(pid!=='screen'&&!(S.repair.out||{}).screen){toast('فك الشاشة أولاً');return}
if(!rAllScrewsOut(pid)){const left=d.sc.length-rSoOut(pid);toast('فك براغي '+d.n+' أولاً — باقي '+arabNum(left));return}
const r=elm.getBoundingClientRect();
S.repair.out=S.repair.out||{};S.repair.out[pid]=1;save();sfx('send');
render();
const tray=el.querySelector('#rTray');
const items=tray.querySelectorAll('[data-install="'+pid+'"]');
if(items.length){const t=items[0].getBoundingClientRect();rFly(r,t,'<div>'+d.svg+'</div>');}
else render();
}
function rInstall(pid,btn){
const r=btn.getBoundingClientRect();
delete S.repair.out[pid];save();sfx('click');
render();
const slot=document.querySelector('#rp-'+pid);
if(slot){const t=slot.getBoundingClientRect();rFly(r,t,'<div>'+rDef(pid).svg+'</div>');}
}
function rPower(){
if(!rComplete()){
const missing=RPART_DEFS.filter(p=>(S.repair.out||{})[p.id]||rSoOut(p.id)>0).map(p=>p.n).join('، ');
toast('ركّب كلشي أولاً — باقي: '+missing);sfx('lock');return;
}
sfx('send');closeApp();
setTimeout(()=>{
const scr=$('#screen');
const b=document.createElement('div');b.id='rBoot';
b.innerHTML='<div class="ra"></div><div class="rbw"><div class="rb"></div></div>';
scr.appendChild(b);
requestAnimationFrame(()=>{requestAnimationFrame(()=>{b.classList.add('on');const bar=b.querySelector('.rb');bar.style.transition='width 2.4s linear';bar.style.width='100%';});});
setTimeout(()=>{b.remove();S.locked=true;const L=$('#lock');L.classList.remove('bye');L.classList.add('show');try{renderLockX();renderStatus();}catch(e){}sfx('lock');},3600);
},450);
}
}

