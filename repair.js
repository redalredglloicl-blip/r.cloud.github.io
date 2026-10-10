/* ===== فك الآيباد الحقيقي — teardown ثنائي الأبعاد على جهاز الآيباد نفسه ===== */
const R_SCREW_SVG='<svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8.5" fill="#c9ced6" stroke="#7d838d" stroke-width="1.5"/><path d="M10 5.5v9M5.5 10h9" stroke="#5d636d" stroke-width="2.2" stroke-linecap="round"/></svg>';
const R_HOLE_SVG='<svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="7" fill="none" stroke="#ff9f0a" stroke-width="1.6" stroke-dasharray="3 2"/></svg>';
const RR_SVG={
screen:'<svg viewBox="0 0 150 210" width="100%" height="100%"><defs><linearGradient id="rrsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e343d"/><stop offset=".5" stop-color="#12151b"/><stop offset="1" stop-color="#20262f"/></linearGradient></defs><rect width="150" height="210" rx="10" fill="url(#rrsg)" stroke="#454c56" stroke-width="2"/><polygon points="0,0 72,0 30,210 0,210" fill="#fff" opacity=".06"/></svg>',
board:'<svg viewBox="0 0 84 56" width="100%" height="100%"><rect width="84" height="56" rx="6" fill="#0e5e35" stroke="#073a21" stroke-width="2"/><rect x="8" y="8" width="26" height="18" rx="2" fill="#16191f"/><rect x="40" y="8" width="18" height="18" rx="2" fill="#16191f"/><rect x="8" y="32" width="42" height="14" rx="2" fill="#16191f"/><circle cx="70" cy="40" r="5.5" fill="#c9a227"/><circle cx="70" cy="40" r="2.2" fill="#6e5410"/><rect x="62" y="6" width="14" height="6" fill="#c9a227"/><path d="M4 52h76" stroke="#c9a227" stroke-width="2"/></svg>',
fcam:'<svg viewBox="0 0 26 26" width="100%" height="100%"><circle cx="13" cy="13" r="12" fill="#2c313a" stroke="#0f1218" stroke-width="2"/><circle cx="13" cy="13" r="7" fill="#090d16"/><circle cx="11" cy="11" r="2.6" fill="#4d6a9e" opacity=".85"/><circle cx="10" cy="10" r="1.1" fill="#d6e8ff"/></svg>',
rcam:'<svg viewBox="0 0 46 46" width="100%" height="100%"><rect width="46" height="46" rx="12" fill="#2c313a" stroke="#0f1218" stroke-width="2"/><circle cx="15" cy="15" r="8" fill="#090d16"/><circle cx="13" cy="13" r="2.2" fill="#4d6a9e"/><circle cx="31" cy="31" r="8" fill="#090d16"/><circle cx="29" cy="29" r="2.2" fill="#4d6a9e"/><circle cx="33" cy="13" r="3.2" fill="#f5e6a8" stroke="#b39b4a" stroke-width="1"/></svg>',
battery:'<svg viewBox="0 0 112 70" width="100%" height="100%"><rect x="4" y="26" width="7" height="18" rx="2" fill="#a9aeb6"/><rect width="112" height="70" rx="8" fill="#d8dce1" stroke="#a9aeb6" stroke-width="2"/><rect x="9" y="9" width="94" height="52" rx="4" fill="#f0f2f5"/><text x="56" y="31" text-anchor="middle" font-size="11" fill="#555" font-weight="700" font-family="sans-serif">Li-ion</text><text x="56" y="47" text-anchor="middle" font-size="10" fill="#8a8f98" font-family="sans-serif">3.79V 28Wh</text><path d="M62 12 L51 29 h7 L54 41 L67 24 h-7 z" fill="#f5a623"/></svg>',
port:'<svg viewBox="0 0 34 12" width="100%" height="100%"><rect width="34" height="12" rx="6" fill="#8a8f98"/><rect x="3" y="3" width="28" height="6" rx="3" fill="#14161a"/></svg>',
spk:'<svg viewBox="0 0 134 14" width="100%" height="100%"><defs><pattern id="rrsp" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.4" fill="#14161a"/></pattern></defs><rect width="134" height="14" rx="7" fill="#3a3f47"/><rect x="7" y="2" width="36" height="10" rx="5" fill="url(#rrsp)"/><rect x="91" y="2" width="36" height="10" rx="5" fill="url(#rrsp)"/></svg>',
sbtn:'<svg viewBox="0 0 6 44" width="100%" height="100%"><rect width="6" height="44" rx="3" fill="#767c86"/></svg>'};
/* x,y,w,h كنسبة مئوية من مساحة الشاشة الداخلية */
const RR_PARTS=[
{id:'board',n:'اللوحة الأم',x:5,y:4,w:56,h:24,sc:[[4,6],[86,6],[4,78],[86,78]]},
{id:'fcam',n:'الكاميرا الأمامية',x:69,y:5,w:17,h:11,sc:[[-26,28],[98,28]]},
{id:'rcam',n:'الكاميرا الخلفية',x:69,y:20,w:21,h:13,sc:[[2,2],[80,2]]},
{id:'battery',n:'البطارية',x:5,y:33,w:72,h:30,sc:[[3,5],[89,5],[3,80],[89,80]]},
{id:'sbtn',n:'الأزرار الجانبية',x:88,y:32,w:6,h:20,sc:[[0,-18],[0,102]]},
{id:'port',n:'منفذ الشحن',x:38,y:76,w:24,h:6,sc:[[-34,-10],[110,-10]]},
{id:'spk',n:'السماعات',x:5,y:86,w:90,h:7,sc:[[2,-34],[90,-34]]},
{id:'screen',n:'الشاشة',display:true,sc:2}
];
function rrDef(id){return RR_PARTS.find(p=>p.id===id)}
function rrSoOut(id){return (S.repair.so||{})[id]||0}
function rrAllScrewsOut(id){const d=rrDef(id);const n=d.display?d.sc: d.sc.length;return rrSoOut(id)>=n}
function rrScrewTotal(){let n=0;RR_PARTS.forEach(p=>{n+=p.display?p.sc:p.sc.length});return n}
function rrScrewOutCt(){let n=0;RR_PARTS.forEach(p=>{n+=rrSoOut(p.id)});return n}
function rrPartsOutCt(){return RR_PARTS.filter(p=>(S.repair.out||{})[p.id]).length}
function rrComplete(){return RR_PARTS.every(p=>!(S.repair.out||{})[p.id]&&rrSoOut(p.id)===0)}
function rrTouched(){return !!S.repair._touched}
function rrFly(fromR,toR,html,cb){
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
function rrCss(){
if(S._rrCss)return;S._rrCss=1;
const st=document.createElement('style');st.textContent=
'#rrInner{position:absolute;left:11px;top:11px;right:11px;bottom:11px;border-radius:17px;overflow:hidden;background:radial-gradient(circle at 50% 30%,#0b0e14,#04060a);z-index:1}'+
'#rrUI{position:absolute;inset:0;z-index:80}'+'#rrDispTap{position:absolute;left:11px;top:11px;right:11px;bottom:11px;border-radius:17px;background:rgba(255,159,10,.06);border:3px solid rgba(255,159,10,.9);cursor:pointer;z-index:4;animation:rrpulse2 1s infinite;display:none}'+'@keyframes rrpulse2{50%{box-shadow:0 0 26px rgba(255,159,10,.85)}}'+
'.rrPart{position:absolute;cursor:pointer;transition:filter .25s}'+
'.rrPart.can{filter:drop-shadow(0 0 10px #ff9f0a);animation:rrwig .8s infinite}'+
'@keyframes rrwig{50%{transform:translateY(-4px)}}'+
'.rrScrew{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;background:none;border:none;cursor:pointer;padding:0;z-index:20}'+
'.rrHole{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;background:none;border:none;cursor:pointer;padding:0;z-index:20}'+
'#rrSheet{position:absolute;left:0;right:0;bottom:0;background:rgba(13,15,20,.94);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,.12);border-radius:20px 20px 0 0;padding:10px 14px calc(12px + env(safe-area-inset-bottom,0px));z-index:5}'+
'.rrCtlRow{display:flex;align-items:center;gap:8px;margin-bottom:8px}'+
'.rrCtlRow b{color:#fff;font-size:14px;flex:1}'+
'.rrCnt{font-size:11.5px;color:#fff;background:rgba(255,255,255,.14);padding:6px 11px;border-radius:12px;display:flex;align-items:center;gap:5px;white-space:nowrap}'+
'.rrBtn{width:38px;height:38px;border-radius:50%;border:none;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}'+
'.rrBtn.ok{background:#34c759;box-shadow:0 0 14px rgba(52,199,89,.7);animation:rrpulse 1.2s infinite}'+
'@keyframes rrpulse{50%{box-shadow:0 0 22px rgba(52,199,89,1)}}'+
'#rrTray{display:flex;gap:8px;overflow-x:auto;min-height:92px;align-items:center}'+
'.rrTrayItem{flex:0 0 auto;width:70px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:6px 4px;cursor:pointer;text-align:center;color:#fff}'+
'.rrTrayItem .th{height:44px;display:flex;align-items:center;justify-content:center;pointer-events:none}'+
'.rrTrayItem .th svg{max-width:58px;max-height:44px}'+
'.rrTrayItem span{font-size:10px;display:block;margin-top:3px;pointer-events:none;color:#fff}'+
'.rrEmpty{font-size:12px;color:rgba(255,255,255,.4);text-align:center;width:100%}';
document.head.appendChild(st);
}
/* مشغّل وضع التصليح من تبويب الصيانة */
function appRepair(el){
S.repair=S.repair||store.get('repair',{out:{},so:{}});
const outc=rrPartsOutCt();
el.innerHTML='<div style="text-align:center;padding:30px 18px">'+
'<div style="font-size:16px;font-weight:800;margin-bottom:8px">فك الآيباد الحقيقي</div>'+
'<p class="mut" style="font-size:13px;line-height:2;margin:0 0 6px">فك الشاشة والبطارية واللوحة الأم والكاميرات<br>قطعة قطعة — على جهاز الآيباد نفسه<br>ورجع ركبهن وشغله</p>'+
(outc?'<p style="font-size:13px;color:#ff9f0a;font-weight:700">القطع المفكوكة حالياً: '+arabNum(outc)+' من '+arabNum(RR_PARTS.length)+'</p>':'')+
'<button class="btn" id="rrStart" style="width:100%;padding:14px;font-size:16px;margin-top:12px">فك الآيباد</button></div>';
el.querySelector('#rrStart').addEventListener('click',()=>{sfx('click');closeApp();setTimeout(startRealRepair,450);});
}
function startRealRepair(){
S.repair=S.repair||store.get('repair',{out:{},so:{}});
rrCss();
const wrap=$('#padWrap'),ipad=$('#ipad'),scr=$('#screen');
if(!wrap||!ipad||!scr)return;
if($('#rrUI'))return;
scr.style.transition='transform .55s cubic-bezier(.3,.7,.3,1),opacity .55s';
/* طبقة القطع الداخلية تحت الشاشة */
const inner=document.createElement('div');inner.id='rrInner';
ipad.insertBefore(inner,scr);
/* واجهة التصليح فوق كلشي */
const ui=document.createElement('div');ui.id='rrUI';
ui.innerHTML=
'<button class="rrScrew" data-rpid="screen" data-i="0" style="left:35%;top:1px">'+R_SCREW_SVG+'</button>'+
'<button class="rrScrew" data-rpid="screen" data-i="1" style="left:65%;top:1px;margin-left:-13px">'+R_SCREW_SVG+'</button>'+
'<div id="rrSheet"><div class="rrCtlRow"><b>وضع التصليح</b><span class="rrCnt" id="rrPCt"></span><span class="rrCnt" id="rrSCt"></span>'+
'<button class="rrBtn" id="rrReset" title="إعادة">'+R_IC_R.reset+'</button>'+
'<button class="rrBtn" id="rrPower" title="تشغيل">'+R_IC_R.power+'</button>'+
'<button class="rrBtn" id="rrExit" title="خروج">'+R_IC_R.exit+'</button></div>'+
'<div id="rrTray"></div></div>';
wrap.appendChild(ui);
S._inRR=true;
rrRender();
toast('فك برغيّ الشاشة بالأعلى أولاً');
}
const R_IC_R={
reset:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 4v5h5"/></svg>',
power:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0"/></svg>',
exit:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'};
function rrSave(){store.set('repair',S.repair)}
function rrRender(){
const ui=$('#rrUI'),inner=$('#rrInner');
if(!ui||!inner)return;
const out=S.repair.out||{};
inner.style.visibility=out.screen?'visible':'hidden';
/* القطع الداخلية */
let h='';
RR_PARTS.filter(p=>!p.display).forEach(p=>{
if(out[p.id])return;
const can=rrAllScrewsOut(p.id)&&out.screen;
h+='<div class="rrPart'+(can?' can':'')+'" data-pid="'+p.id+'" style="left:'+p.x+'%;top:'+p.y+'%;width:'+p.w+'%;height:'+p.h+'%">'+RR_SVG[p.id]+'</div>';
const so=rrSoOut(p.id);
p.sc.forEach((s,i)=>{
const sx=p.x+s[0]*p.w/100, sy=p.y+s[1]*p.h/100;
const hole=i<so;
h+='<button class="'+(hole?'rrHole':'rrScrew')+'" data-pid="'+p.id+'" data-i="'+i+'" style="left:'+sx+'%;top:'+sy+'%">'+(hole?R_HOLE_SVG:R_SCREW_SVG)+'</button>';
});
});
inner.innerHTML=h;
/* براغي الشاشة */
const soS=rrSoOut('screen');
ui.querySelectorAll('[data-rpid="screen"]').forEach((b,i)=>{
const hole=i<soS;
b.className=hole?'rrHole':'rrScrew';
b.innerHTML=hole?R_HOLE_SVG:R_SCREW_SVG;
b.dataset.pid='screen';b.dataset.i=i;
});
/* العدادات */
ui.querySelector('#rrPCt').innerHTML='القطع '+arabNum(rrPartsOutCt())+'／'+arabNum(RR_PARTS.length);
ui.querySelector('#rrSCt').innerHTML=R_SCREW_SVG+' '+arabNum(rrScrewOutCt())+'／'+arabNum(rrScrewTotal());
const ok=rrComplete()&&rrTouched();
ui.querySelector('#rrPower').classList.toggle('ok',ok);
/* الصينية */
const tray=ui.querySelector('#rrTray');
const outs=RR_PARTS.filter(p=>out[p.id]);
tray.innerHTML=outs.length?outs.map(p=>'<button class="rrTrayItem" data-install="'+p.id+'"><span class="th">'+RR_SVG[p.id]+'</span><span>'+p.n+'</span></button>').join(''):'<div class="rrEmpty">الصينية فارغة — فك البراغي ثم القطع</div>';
/* زر فك الشاشة */
let dz=ui.querySelector('#rrDispTap');
const dispRem=!out.screen&&rrAllScrewsOut('screen');
if(dispRem){if(!dz){dz=document.createElement('button');dz.id='rrDispTap';ui.insertBefore(dz,ui.firstChild);}dz.style.display='block';dz.onclick=e=>{e.stopPropagation();rrPartTap('screen');};}
else if(dz)dz.style.display='none';
/* المستمعات */
[ui,inner].forEach(c=>c.querySelectorAll('.rrScrew').forEach(b=>b.onclick=e=>{e.stopPropagation();rrUnscrew(b.dataset.pid,parseInt(b.dataset.i,10),b);}));
[ui,inner].forEach(c=>c.querySelectorAll('.rrHole').forEach(b=>b.onclick=e=>{e.stopPropagation();rrScrewBack(b.dataset.pid,parseInt(b.dataset.i,10),b);}));
inner.querySelectorAll('.rrPart').forEach(p=>p.onclick=e=>{e.stopPropagation();rrPartTap(p.dataset.pid,p);});
tray.querySelectorAll('[data-install]').forEach(b=>b.onclick=e=>{e.stopPropagation();rrInstall(b.dataset.install,b);});
ui.querySelector('#rrReset').onclick=e=>{e.stopPropagation();S.repair={out:{},so:{},_touched:false};rrSave();rrSetDisplay(false);sfx('click');toast('رجعت كل القطع');rrRender();};
ui.querySelector('#rrExit').onclick=e=>{e.stopPropagation();exitRealRepair();};
ui.querySelector('#rrPower').onclick=e=>{e.stopPropagation();rrPower();};
}
function rrUnscrew(pid,i,btn){
const r=btn.getBoundingClientRect();
const t=document.querySelector('#rrSCt').getBoundingClientRect();
S.repair.so=S.repair.so||{};S.repair.so[pid]=(S.repair.so[pid]||0)+1;S.repair._touched=true;rrSave();sfx('click');
rrFly(r,t,'<div>'+R_SCREW_SVG+'</div>',()=>rrRender());
rrRender();
}
function rrScrewBack(pid,i,btn){
S.repair.so[pid]=Math.max(0,rrSoOut(pid)-1);rrSave();sfx('click');
rrRender();
const nb=document.querySelector('.rrScrew[data-pid="'+pid+'"][data-i="'+i+'"]')||document.querySelector('#rrUI .rrScrew[data-rpid="screen"][data-i="'+i+'"]');
if(nb){const r=nb.getBoundingClientRect();const c=document.querySelector('#rrSCt').getBoundingClientRect();rrFly(c,r,'<div>'+R_SCREW_SVG+'</div>');}
}
function rrPartTap(pid,elm){
const d=rrDef(pid);
if(pid!=='screen'&&!(S.repair.out||{}).screen){toast('فك الشاشة أولاً');return}
if(!rrAllScrewsOut(pid)){const n=d.display?d.sc:d.sc.length;toast('فك براغي '+d.n+' أولاً — باقي '+arabNum(n-rrSoOut(pid)));return}
S.repair.out=S.repair.out||{};S.repair.out[pid]=1;S.repair._touched=true;rrSave();sfx('send');
if(pid==='screen'){
rrSetDisplay(true);
rrRender();
const tray=document.querySelector('#rrTray');
const it=tray&&tray.querySelector('[data-install="screen"]');
if(it){const t=it.getBoundingClientRect();const r={left:t.left,top:t.top-300,width:t.width*3,height:t.height*3};rrFly(r,t,'<div>'+RR_SVG.screen+'</div>');}
return;
}
const r=elm.getBoundingClientRect();
rrRender();
const tray=document.querySelector('#rrTray');
const it=tray&&tray.querySelector('[data-install="'+pid+'"]');
if(it)rrFly(r,it.getBoundingClientRect(),'<div>'+RR_SVG[pid]+'</div>');
}
function rrInstall(pid,btn){
const r=btn.getBoundingClientRect();
delete S.repair.out[pid];rrSave();sfx('click');
if(pid==='screen'){rrSetDisplay(false);rrRender();return}
rrRender();
const slot=document.querySelector('.rrPart[data-pid="'+pid+'"]');
if(slot)rrFly(r,slot.getBoundingClientRect(),'<div>'+RR_SVG[pid]+'</div>');
}
function rrSetDisplay(out){
const scr=$('#screen');if(!scr)return;
if(out){
scr.style.transform='translateY(-34%) scale(.93)';scr.style.opacity='0';
setTimeout(()=>{if((S.repair.out||{}).screen){scr.style.visibility='hidden';}},600);
}else{
scr.style.visibility='visible';
requestAnimationFrame(()=>{requestAnimationFrame(()=>{scr.style.transform='';scr.style.opacity='';});});
}
}
function exitRealRepair(){
const ui=$('#rrUI'),inner=$('#rrInner');
if(ui)ui.remove();if(inner)inner.remove();
const scr=$('#screen');
if(scr){scr.style.transform='';scr.style.opacity='';scr.style.visibility='';scr.style.transition='';}
S._inRR=false;sfx('click');
}
function rrPower(){
if(!(rrComplete()&&rrTouched())){
const missing=RR_PARTS.filter(p=>(S.repair.out||{})[p.id]||rrSoOut(p.id)>0).map(p=>p.n).join('، ');
toast('ركّب كلشي أولاً — باقي: '+missing);sfx('lock');return;
}
sfx('send');
S.repair._touched=false;rrSave();
exitRealRepair();
setTimeout(()=>{
const scr=$('#screen');
const b=document.createElement('div');b.id='rBoot';
const st=document.createElement('style');
st.textContent='#rBoot{position:absolute;inset:0;background:#000;z-index:400;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;opacity:0;transition:opacity .5s}#rBoot.on{opacity:1}#rBoot .ra{font-size:88px;color:#fff;line-height:1}#rBoot .rbw{width:170px;height:5px;background:#2c2c2e;border-radius:3px;overflow:hidden}#rBoot .rb{height:100%;width:0;background:#fff;border-radius:3px}';
document.head.appendChild(st);
b.innerHTML='<div class="ra"></div><div class="rbw"><div class="rb"></div></div>';
scr.appendChild(b);
requestAnimationFrame(()=>{requestAnimationFrame(()=>{b.classList.add('on');const bar=b.querySelector('.rb');bar.style.transition='width 2.4s linear';bar.style.width='100%';});});
setTimeout(()=>{b.remove();st.remove();S.locked=true;S._pinAsk=false;const L=$('#lock');L.classList.remove('bye');L.classList.add('show');try{renderLockX();renderStatus();}catch(e){}sfx('lock');},3600);
},450);
}
