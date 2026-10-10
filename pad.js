S.msgs=[];store.set('msgs',[]);
S.notifs=store.get('notifs',[]);
S.locked=true;
const IOS_EASE='cubic-bezier(.32,.72,.24,1)';
const IOS_SPRING='cubic-bezier(.30,1.08,.36,1)';
function iconImgOf(el){if(!el)return null;const im=el.tagName==='IMG'?el:el.querySelector&&el.querySelector('img');if(!im)return null;return im.currentSrc||im.src}
function showAppWin(fromEl){
const win=$('#appWin');S._from=fromEl||null;const tok=(S._anim=(S._anim||0)+1);
win.classList.add('open');document.body.classList.add('appopen');syncPill();
$('#screen').classList.add('appzoom');
const scr=$('#screen').getBoundingClientRect();
const r=(fromEl&&fromEl.getBoundingClientRect)?fromEl.getBoundingClientRect():null;
const hasIcon=r&&r.width>=8&&r.right>scr.left&&r.left<scr.right&&r.top<scr.bottom&&r.bottom>scr.top;
win.style.transformOrigin='0 0';win.style.overflow='hidden';
if(hasIcon){
win.style.transition='none';win.style.opacity='1';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(4)+','+((r.height/scr.height)).toFixed(4)+')';
win.style.borderRadius=((15*scr.width/Math.max(1,r.width)).toFixed(0))+'px/'+((15*scr.height/Math.max(1,r.height)).toFixed(0))+'px';
win.style.boxShadow='0 16px 48px rgba(0,0,0,.38)';
win.getBoundingClientRect();
win.style.transition='transform .55s '+IOS_SPRING+',border-radius .55s '+IOS_SPRING+',box-shadow .55s ease';
win.style.transform='translate(0px,0px) scale(1,1)';
win.style.borderRadius='0px';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin=''},580);
}else{
win.style.transition='none';win.style.opacity='0';win.style.transform='scale(.94)';
win.getBoundingClientRect();
win.style.transition='opacity .3s ease,transform .45s '+IOS_SPRING;
win.style.opacity='1';win.style.transform='none';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.opacity=''},480);
}
}
function snapCur(){if(!S.app)return;try{S.snaps=S.snaps||{};S.snaps[S.app]=$('#appBody').innerHTML.replace(/ id="[^"]*"/g,'').slice(0,60000)}catch(e){}}
function noteRunning(id,title,ic){if(!id)return;S.running=S.running||[];S.running=S.running.filter(r=>r.id!==id);S.running.unshift({id,title,ic})}
function armHome(){S._armUntil=Date.now()+4000;const hb=$('#homeBar');hb.classList.add('armed');setTimeout(()=>{if(Date.now()>(S._armUntil||0))hb.classList.remove('armed')},4100)}
function disarmHome(){S._armUntil=0;$('#homeBar').classList.remove('armed')}
function closeApp(){
clearInterval(S.poll);
const sw=$('#switcher');if(sw.classList.contains('open'))dismissSw();
const win=$('#appWin');if(!win.classList.contains('open')){S.app=null;return}
snapCur();
const tok=(S._anim=(S._anim||0)+1);
S.app=null;stopCam();disarmHome();$('#screen').classList.remove('appzoom');
const back=(S._from&&document.body.contains(S._from))?S._from:null;
const scr=$('#screen').getBoundingClientRect();let r=back?back.getBoundingClientRect():null;
if(!r||r.width<8||r.right<scr.left||r.left>scr.right||r.top>scr.bottom)r={left:scr.left+scr.width/2-26,top:scr.bottom-130,width:52,height:52};
win.getBoundingClientRect();
win.style.transformOrigin='0 0';
win.style.transition='transform .5s '+IOS_EASE+',border-radius .5s '+IOS_EASE+',opacity .12s ease .4s,box-shadow .5s';
win.style.borderRadius=((19*scr.width/Math.max(1,r.width)).toFixed(0))+'px/'+((19*scr.height/Math.max(1,r.height)).toFixed(0))+'px';win.style.boxShadow='0 18px 50px rgba(0,0,0,.35)';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(3)+','+((r.height/scr.height)).toFixed(3)+')';
win.style.opacity='0';
setTimeout(()=>{if(S._anim!==tok)return;
win.classList.remove('open');document.body.classList.remove('appopen');$('#screen').classList.remove('appzoom');syncPill();win.style.transition='';win.style.transform='';win.style.opacity='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin='';S._from=null;
const land=back&&(back.closest?back.closest('.app'):null);if(land&&land.animate)land.animate([{transform:'scale(1)'},{transform:'scale(1.09)'},{transform:'scale(1)'}],{duration:240,easing:'ease-out'})},500);
}
function renderSwitcher(){
const track=$('#swTrack');const list=S.running||[];
track.innerHTML=list.length?list.map(r=>{const snap=(S.snaps||{})[r.id];
return '<div class="swCard" data-sw="'+r.id+'"><div class="swHead">'+icImg(ICONS[r.ic]||'')+'<b>'+r.title+'</b><button class="swKill" data-kill="'+r.id+'">✕</button></div><div class="swPrev">'+(snap?'<div class="swSnap">'+snap+'</div>':'<div class="swBig">'+icImg(ICONS[r.ic]||'')+'<span style="font-size:13px;font-weight:600">'+r.title+'</span></div>')+'</div></div>'}).join(''):'<div style="color:#fff;text-align:center;width:100%;padding:40px 0;font-size:14px">لا تطبيقات شغالة بالخلفية</div>';
track.querySelectorAll('[data-kill]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();killApp(b.dataset.kill)}));
track.querySelectorAll('[data-sw]').forEach(c=>{
let cy=null;
c.addEventListener('touchstart',e=>{cy=e.touches[0].clientY},{passive:true});
c.addEventListener('touchmove',e=>{if(cy===null)return;const dy=cy-e.touches[0].clientY;if(dy>55){cy=null;killApp(c.dataset.sw)}},{passive:true});
c.addEventListener('click',()=>{const id=c.dataset.sw;dismissSw();if(id===S.app)return;id.startsWith('x_')?openExtra(id.slice(2),c.querySelector('.swHead .ic')):openApp(id,c.querySelector('.swHead .ic'))});
});
}
function dismissSw(){$('#switcher').classList.remove('open');document.body.classList.remove('swopen')}
function openSwitcher(){snapCur();renderSwitcher();$('#switcher').classList.add('open');document.body.classList.add('swopen')}
$('#switcher').addEventListener('click',e=>{if(!e.target.closest('.swCard'))dismissSw()});
let _swY=null;
$('#switcher').addEventListener('touchstart',e=>{_swY=e.touches[0].clientY},{passive:true});
$('#switcher').addEventListener('touchend',e=>{if(_swY===null)return;const dy=e.changedTouches[0].clientY-_swY;_swY=null;if(dy>45)dismissSw()});
function killApp(id){S.running=(S.running||[]).filter(r=>r.id!==id);if(S.snaps)delete S.snaps[id];if(S.app===id){dismissSw();closeApp()}else renderSwitcher();toast('انقتل التطبيق من الخلفية')}
function openApp(id,fromEl){
hideCC();clearInterval(S.poll);
if(gateBlock(id))return;
runAutos('appopen',id);
if(id==='phone'){toast('المكالمات داخل FaceTime هنا');id='facetime'}
if(id&&id.startsWith('x_')){const k=id.slice(2);return openExtra(k,fromEl)}
snapCur();S.app=id; tickUse(id);noteRunning(id,(APPS.find(a=>a.id===id)||{}).n||id,(APPS.find(a=>a.id===id)||{}).ic||id);
const names={roblox:'Roblox',youtube:'YouTube',facetime:'FaceTime',camera:'Camera',photos:'Photos',messages:'Messages',appstore:'App Store',safari:'Safari',tiktok:'TikTok',maps:'Maps',weather:'Weather',calendar:'Calendar',music:'Music',clock:'Clock',notes:'Notes',calc:'Calculator',settings:'Settings',files:'Files',shortcuts:'Shortcuts'};
$('#appTitle').textContent=names[id]||id;
showAppWin(fromEl);
({roblox:appRoblox,youtube:appYouTube,facetime:appFaceTime,camera:appCamera,photos:appPhotos,messages:appMessages,appstore:appStore,safari:appSafari,tiktok:appTikTok,maps:appMaps,weather:appWeather,calendar:appCalendar,music:appMusic,clock:appClock,notes:appNotes,calc:appCalc,settings:appSettings,files:appFiles,shortcuts:appShortcuts}[id]||(()=>{}))($('#appBody'));
}
const _ab=$('#appBack');if(_ab)_ab.addEventListener('click',e=>{e.stopPropagation();closeApp()});
function syncPill(){const pill=$('#spotPill');if(!pill)return;const lockOn=$('#lock').classList.contains('show');pill.style.display=($('#appWin').classList.contains('open')||lockOn)?'none':'flex'}
new MutationObserver(syncPill).observe($('#lock'),{attributes:true,attributeFilter:['class']});
$('#homeBar').addEventListener('click',()=>{
if($('#switcher').classList.contains('open')){dismissSw();if($('#appWin').classList.contains('open'))closeApp();return}
if(!$('#appWin').classList.contains('open')){openSwitcher();return}
if(Date.now()<(S._armUntil||0))closeApp();else armHome();
});
let G=null;
const _scr=$('#screen');
_scr.addEventListener('touchstart',e=>{
if(S.locked||$('#switcher').classList.contains('open')){G=null;return}
const r=_scr.getBoundingClientRect(),tt=e.touches[0];
if(tt.clientY<r.bottom-34){G=null;return}
G={y0:tt.clientY,y:tt.clientY,armedBefore:Date.now()<(S._armUntil||0),timer:null};
G.timer=setTimeout(()=>{if(G&&G.y0-G.y>36){openSwitcher();G=null}},340);
},{passive:true});
_scr.addEventListener('touchmove',e=>{
if(!G)return;G.y=e.touches[0].clientY;const dy=G.y0-G.y;
const win=$('#appWin');
if(win.classList.contains('open')&&dy>8)win.style.transform='translateY('+(-Math.min(dy,26)).toFixed(0)+'px) scale('+(1-Math.min(dy,260)/11000).toFixed(3)+')';
},{passive:true});
_scr.addEventListener('touchend',e=>{
if(!G)return;clearTimeout(G.timer);
const dy=G.y0-(e.changedTouches[0]?e.changedTouches[0].clientY:G.y);
const win=$('#appWin'),wasArmed=G.armedBefore;G=null;
if($('#switcher').classList.contains('open'))return;
if(win.classList.contains('open')){
if(wasArmed&&dy>30){closeApp()}
else{
win.style.transition='transform .22s ease';win.style.transform='';
const tkA=S._anim;setTimeout(()=>{if(S._anim===tkA)win.style.transition=''},240);
if(!wasArmed&&dy>22)armHome();
}
}else if(dy>55)openSwitcher();
});
function openExtra(k,fromEl){
snapCur();S.app='x_'+k;noteRunning('x_'+k,EXTRA[k].n,EXTRA[k].ic);$('#appTitle').textContent=EXTRA[k].n;showAppWin(fromEl);
if(k==='whatsapp')return appWhatsApp();
if(k==='telegram')return appTelegram();
if(k==='messenger')return appMessenger();
if(k==='discord')return appDiscord();
if(k==='facebook'||k==='x')return appFeedNet(k);
if(k==='snapchat')return appSnapchat();
if(k==='instagram')return appInsta();
$('#appBody').innerHTML='<div class="card" style="text-align:center;padding:28px 14px"><div style="display:flex;justify-content:center;margin-bottom:10px">'+IC[EXTRA[k].ic]()+'</div><div class="big">'+EXTRA[k].n+'</div><p class="mut" style="margin-top:6px">انثبت على الآيباد ويشتغل من الشاشة الرئيسية.</p><button class="btn" style="margin-top:12px" onclick="closeApp()">تمام</button></div>';
}
const FRIENDS=[['Eno','#e74c3c'],['Ahmad','#3498db'],['Sara','#e84393'],['Omar','#2ecc71'],['Lina','#f39c12'],['Yusuf','#9b59b6'],['Nora','#1abc9c'],['Khalid','#e67e22']];
const GAMES=[['Adopt Me!','2.1M','#ff9ff3'],['Escape Obby!','845K','#54a0ff'],['Tower of Fun','1.3M','#5f27cd'],['Pet Simulator','976K','#ff9f43'],['Brook Village RP','3.4M','#1dd1a1'],['Hide and Seek','512K','#ee5253'],['Speed Run 4','689K','#48dbfb'],['Natural Disaster','1.1M','#fca311']];
function appRoblox(el){
el.innerHTML=
'<div class="rbx-head"><span class="logo"><svg width="22" height="22" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(12 12 12)" fill="#fff"/><rect x="10" y="10" width="4.4" height="4.4" transform="rotate(12 12 12)" fill="#191b1e"/></svg></span><div><div class="big">Home</div><div class="mut">@rio_player</div></div></div>'+
'<a href="https://www.roblox.com/games/128248561501148/Apple-IPad-Origional" target="_blank" rel="noopener" class="btn" style="display:block;text-align:center;text-decoration:none;padding:12px;margin-bottom:6px">العب الماب الحقيقي بروبلوكس نفسه</a>'+
'<input type="text" placeholder="Search" style="width:100%;padding:10px 12px;border:none;border-radius:10px;background:#e9e9ee;font-size:14px" readonly>'+
'<div class="rbx-sec">Connections</div><div class="friends">'+FRIENDS.map((f,fi)=>'<div class="friend"><div class="fa" style="background:none;border:none"><img src="https://i.pravatar.cc/104?img='+(12+fi*9)+'" style="width:52px;height:52px;border-radius:50%"></div><div class="fn">'+f[0]+'</div></div>').join('')+'</div>'+
'<div class="rbx-sec">Continue</div>'+
GAMES.map((g,i)=>'<div class="gcard" data-game="'+i+'"><img class="thumb" src="https://picsum.photos/seed/riogame'+i+'/220/160" style="object-fit:cover;background:linear-gradient(140deg,'+g[2]+',#222f3e)"><span><span class="big">'+g[0]+'</span><br><span class="mut">▶ '+g[1]+' يلعبون هسه</span></span></div>').join('')+
'<p class="mut" style="text-align:center;margin-top:8px">هذا روبلوكس محاكاة داخل اللعبة، مو حسابك الحقيقي.</p>';
el.querySelectorAll('[data-game]').forEach(c=>c.addEventListener('click',()=>playFakeGame(GAMES[+c.dataset.game][0])));
}
function playFakeGame(name){toast('انسحبت اللعبة الوهمية — ألعابنا الحقيقية جاية قريباً')}
let selfieMode=false;
let camStream=null;
async function appCamera(el){
el.innerHTML='<canvas id="camView" width="340" height="250"></canvas>'+
'<div class="row" style="flex-wrap:wrap;gap:6px;margin-top:8px;justify-content:center"><button class="btn gray" data-camf="none" style="padding:6px 12px;font-size:12px">عادي</button><button class="btn gray" data-camf="sepia(.45) saturate(1.25)" style="padding:6px 12px;font-size:12px">دافئ</button><button class="btn gray" data-camf="hue-rotate(-14deg) saturate(1.15)" style="padding:6px 12px;font-size:12px">بارد</button><button class="btn gray" data-camf="contrast(1.25) saturate(1.25)" style="padding:6px 12px;font-size:12px">درامي</button><button class="btn gray" data-camf="grayscale(1)" style="padding:6px 12px;font-size:12px">أحادي</button></div><div class="row" style="margin-top:10px;justify-content:center;gap:10px"><button class="btn gray" id="camFlip">سيلفي / عالم</button><button class="btn" id="camShoot" style="border-radius:50%;width:58px;height:58px;font-size:12px">صوّر</button></div><p class="mut" style="text-align:center;margin-top:8px">إذا سمحت للكاميرا تنفتح كامرتك الحقيقية، وإذا لا يتصور عالم اللعبة.</p>';
const cvs=$('#camView'),cx=cvs.getContext('2d');
let video=null;
try{camStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});
video=document.createElement('video');video.srcObject=camStream;video.setAttribute('playsinline','');await video.play();
}catch(e){camStream=null}
S.camFilter=S.camFilter||'none';
let alive=true;
const draw=()=>{if(!document.body.contains(cvs)){alive=false;return}
cvs.style.filter=S.camFilter;
if(video){cx.save();cx.scale(-1,1);cx.drawImage(video,-340,0,340,250);cx.restore()}
else{cx.drawImage(cv,0,0,340,250);
if(selfieMode){cx.fillStyle='rgba(0,0,0,.12)';cx.fillRect(0,0,340,250);
cx.fillStyle='#f2c89b';cx.fillRect(140,80,60,55);cx.fillStyle='#20242a';cx.fillRect(140,72,60,16);
cx.fillStyle='#e74c3c';cx.fillRect(134,135,72,60)}}
if(alive)requestAnimationFrame(draw)};
draw();
el.querySelectorAll('[data-camf]').forEach(b=>b.addEventListener('click',()=>{S.camFilter=b.dataset.camf;toast('انطبق الفلتر')}));
$('#camFlip').addEventListener('click',()=>{selfieMode=!selfieMode});
$('#camShoot').addEventListener('click',()=>{
const out=document.createElement('canvas');out.width=320;out.height=235;
const oc=out.getContext('2d');oc.filter=S.camFilter;oc.drawImage(cvs,0,0,320,235);
sfx('shutter');S.photos.unshift(out.toDataURL('image/jpeg',0.72));
if(S.photos.length>12)S.photos.pop();
store.set('photos',S.photos);renderHome();
toast('انحفظت الصورة بالمعرض');
});
}
function stopCam(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null}}
function phMeta(){try{return JSON.parse(localStorage.getItem('rio-phmeta')||'{}')}catch(e){return{}}}
function appPhotos(el){
el.innerHTML='<div class="rbx-sec" style="margin-top:2px">المعرض</div><div class="row" style="margin-bottom:10px">'+[['all','الكل'],['fav','المفضلة']].map(t=>'<button class="btn '+(S.phTab===t[0]?'':'gray')+'" data-phtab="'+t[0]+'" style="padding:7px 16px">'+t[1]+'</button>').join('')+'</div><div id="phGrid"></div>';
S.phTab=S.phTab||'all';
const draw=()=>{
const meta=phMeta();
const builtIn=[];for(let i=1;i<=8;i++)builtIn.push({src:'https://picsum.photos/seed/riophoto'+i+'/400/400',own:false});
let items=S.photos.map(p=>({src:p,own:true,fav:!!meta[p.slice(-26)]&&!!meta[p.slice(-26)].fav})).concat(builtIn.map(x=>({...x,fav:false})));
if(S.phTab==='fav')items=items.filter(x=>x.fav);
const g=$('#phGrid');if(!g)return;
g.innerHTML=items.length?'<div class="pgrid">'+items.map((p,i)=>'<img src="'+p.src+'" data-ph="'+i+'" loading="lazy" style="'+(p.fav?'outline:2.5px solid #ff2d55;outline-offset:-2.5px':'')+'">').join('')+'</div>':'<div class="mut" style="text-align:center;padding:26px">لا صور هنا بعد</div>';
g.querySelectorAll('[data-ph]').forEach(im=>im.addEventListener('click',()=>{
const p=items[+im.dataset.ph],key=p.src.slice(-26);
el.innerHTML='<img src="'+p.src+'" style="width:100%;border-radius:12px">'+
'<div class="row" style="margin-top:12px;flex-wrap:wrap;gap:8px"><button class="btn gray" id="phBack">رجوع</button>'+(p.own?'<button class="btn '+(p.fav?'red':'gray')+'" id="phFav">'+(p.fav?'إزالة من المفضلة':'أضف للمفضلة ♥')+'</button><button class="btn gray" id="phShare">مشاركة</button><button class="btn red" id="phDel">حذف</button>':'')+'</div>';
$('#phBack').addEventListener('click',()=>appPhotos(el));
const fb=$('#phFav');if(fb)fb.addEventListener('click',()=>{const m=phMeta();m[key]={fav:!p.fav};localStorage.setItem('rio-phmeta',JSON.stringify(m));appPhotos(el);toast(p.fav?'انشالت من المفضلة':'انضافت للمفضلة')});
const sh=$('#phShare');if(sh)sh.addEventListener('click',()=>showShare({img:p.src,title:'صورة من Rio iPad'}));
const del=$('#phDel');if(del)del.addEventListener('click',()=>{S.photos=S.photos.filter(x=>x!==p.src);store.set('photos',S.photos);renderHome();appPhotos(el);toast('انحذفت الصورة')});
}));
};
el.querySelectorAll('[data-phtab]').forEach(b=>b.addEventListener('click',()=>{S.phTab=b.dataset.phtab;appPhotos(el)}));
draw();
}
function appFaceTime(el){
el.innerHTML=(S.missedCall?'<div class="card row" style="background:#e8f8ee"><span style="flex:1"><span class="big">مكالمة واردة من Eno</span><br><span class="mut">FaceTime</span></span><button class="btn" id="ftAnswer">رد</button><button class="btn red" id="ftDecline">رفض</button></div>':'')+'<div class="rbx-sec" style="margin-top:2px">جهات الاتصال</div>'+
((S.missedCall)?'':''); // placeholder replaced below
if(S.missedCall){
$('#ftAnswer').addEventListener('click',()=>{S.missedCall=false;startCall(FRIENDS[0],true)});
$('#ftDecline').addEventListener('click',()=>{S.missedCall=false;appFaceTime(el);toast('رفضت المكالمة')});
}
el.innerHTML+=
FRIENDS.map((f,i)=>'<div class="card row"><span><img src="https://i.pravatar.cc/84?img='+(12+i*9)+'" style="width:42px;height:42px;border-radius:50%" alt=""></span><span style="flex:1"><span class="big">'+f[0]+'</span><br><span class="mut">FaceTime</span></span><button class="btn" data-call="'+i+'">اتصال</button></div>').join('');
el.querySelectorAll('[data-call]').forEach(b=>b.addEventListener('click',()=>startCall(FRIENDS[+b.dataset.call],false)));
}
function startCall(f,incoming){
const ui=$('#callUI');
ui.innerHTML='<img src="https://i.pravatar.cc/160?img=12" alt="Eno" style="width:96px;height:96px;border-radius:50%;object-fit:cover;margin-bottom:6px"><div style="font-size:22px;font-weight:700">'+f[0]+'</div><div id="callState" style="opacity:.85;margin-top:4px">'+(incoming?'FaceTime واردة…':'جاي يتصل…')+'</div>'+
'<div class="callBtns">'+(incoming?'<button class="callBtn" style="background:#ff3b30" id="callDecline"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 9c5-3.4 11-3.4 16 0l-2 3c-.4.6-1.2.8-1.9.5l-2.4-1a13 13 0 0 1-3.4 0l-2.4 1c-.7.3-1.5.1-1.9-.5z" fill="#fff"/></svg></button>':'')+
'<button class="callBtn" style="background:#34c759" id="callAccept"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M6.6 3.8c.6-.6 1.6-.5 2.1.2l1.6 2c.5.6.4 1.5-.1 2.1L9 9.3c.9 1.9 2.8 3.8 4.7 4.7l1.2-1.2c.6-.5 1.5-.6 2.1-.1l2 1.6c.7.5.8 1.5.2 2.1l-1.1 1.2c-.6.6-1.4.9-2.2.7C10.6 17.2 6.8 13.4 5.7 8.1c-.2-.8.1-1.6.7-2.2z" fill="#fff"/></svg></button></div>';
ui.classList.add('show');
const dec=$('#callDecline');if(dec)dec.addEventListener('click',()=>{ui.classList.remove('show');showBanner('FaceTime','مكالمة فائتة من '+f[0],null)});
$('#callAccept').addEventListener('click',()=>{
$('#callState').textContent='00:00';
S.callSec=0;clearInterval(S.callTimer);
S.callTimer=setInterval(()=>{S.callSec++;const m=String(Math.floor(S.callSec/60)).padStart(2,'0'),ss=String(S.callSec%60).padStart(2,'0');const st=$('#callState');if(st)st.textContent=m+':'+ss},1000);
ui.querySelector('.callBtns').innerHTML='<button class="callBtn" style="background:#ff3b30" id="callEnd"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 9c5-3.4 11-3.4 16 0l-2 3c-.4.6-1.2.8-1.9.5l-2.4-1a13 13 0 0 1-3.4 0l-2.4 1c-.7.3-1.5.1-1.9-.5z" fill="#fff"/></svg></button>';
$('#callEnd').addEventListener('click',()=>{clearInterval(S.callTimer);ui.classList.remove('show');toast('انتهت المكالمة')});
});
}
function appMessages(el){
el.innerHTML='<div id="msgList">'+(S.msgs.length?S.msgs.map(m=>'<div class="msg '+(m.me?'me':'them')+'">'+m.t.replace(/</g,'&lt;')+'</div>').join(''):'<div class="mut" style="text-align:center;padding:30px 12px;line-height:1.9">لا توجد رسائل<br>اكتب من جوّه وابعث أول رسالة</div>')+'</div>'+
'<div class="row" style="position:sticky;bottom:0;background:#f2f2f7;padding-top:8px"><input type="text" id="msgIn" placeholder="iMessage" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px"><button class="btn" id="msgSend">إرسال</button></div>';
const list=$('#msgList');list.scrollTop=1e6;
const send=()=>{const inp=$('#msgIn'),v=inp.value.trim();if(!v)return;
sfx('send');S.msgs.push({me:true,t:v});store.set('msgs',S.msgs);appMessages(el);
};
$('#msgSend').addEventListener('click',send);
$('#msgIn').addEventListener('keydown',e=>{if(e.key==='Enter')send});
}
function appSettings(el){
const s=S.set,u=S.batt.usage;
const sq=(color,glyph,size)=>'<span class="sq" style="background:'+color+'">'+g(glyph,'#fff',size||16)+'</span>';
const row=(label,left,val,act)=>'<div class="setrow" '+(act?'data-setact="'+act+'" style="cursor:pointer"':'')+'><span style="display:flex;align-items:center;gap:9px;flex:1">'+left+label+'</span>'+(val||'')+'</div>';
const arrow='<span class="mut">‹</span>';
if(S.setPage==='wall'){
el.innerHTML='<button class="btn gray" id="setBack">‹ رجوع</button><div class="app-title" style="margin-top:12px">خلفية الشاشة</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">'+
WPS.map((w,i)=>'<img src="'+w+'" data-wp="'+i+'" style="width:100%;height:150px;object-fit:cover;border-radius:16px;cursor:pointer;'+(S.set.wp===i?'outline:3.5px solid #0a84ff':'')+'">').join('')+'</div>'+
'<p class="mut" style="text-align:center;margin-top:12px">تنطبق على الشاشة الرئيسية وقفل الشاشة وتنحفظ</p>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});
el.querySelectorAll('[data-wp]').forEach(im=>im.addEventListener('click',()=>{S.set.wp=+im.dataset.wp;saveSet();applyTheme();appSettings(el);toast('اتبدلت الخلفية')}));
return;
}
if(S.setPage==='about'){
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button><div class="setgroup">'+
row('الاسم','',"Rio's iPad")+row('طراز الجهاز','', 'iPad Pro 11')+row('نظام التشغيل','', 'RioOS 26.0')+
row('إصدار اللعبة','', 'Rio iPad 3.8')+row('السعة','', '64 GB')+row('المساحة المتوفرة','', '51.2 GB')+
row('الرقم التسلسلي','', 'RGX2IPAD2026')+row('المشغل','', 'Zain — 4.5G+')+'</div>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});return;
}
if(S.setPage==='battery'){
const rows=Object.entries(u).sort((a,b)=>b[1]-a[1]).slice(0,6);
const mx=Math.max(1,...rows.map(r=>r[1]));
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>'+
'<div class="card" style="text-align:center"><div style="font-size:36px;font-weight:700">'+arabNum(Math.round(S.batt.pct))+'٪</div><div class="mut">'+(S.batt.charging?'جاي ينشحن':'غير موصول بالشاحن')+'</div></div>'+
'<div class="setgroup">'+row('نمط الطاقة المنخفضة',sq('#f5c518','battery-charging',15),'<label class="switch"><input type="checkbox" id="swLpm" '+(s.lpm?'checked':'')+'><i></i></label>')+
row('الشحن الآن',sq('#34c759','flash',15),'<label class="switch"><input type="checkbox" id="swChg" '+(S.batt.charging?'checked':'')+'><i></i></label>')+'</div>'+
'<div class="rbx-sec">الاستخدام حسب التطبيق</div><div class="setgroup">'+(rows.length?rows.map(r=>'<div class="setrow"><span style="flex:1">'+r[0]+'</span><span style="width:110px;height:7px;background:#e3e3e8;border-radius:4px;overflow:hidden"><span style="display:block;height:100%;width:'+Math.round(r[1]/mx*100)+'%;background:#34c759"></span></span><span class="mut" style="width:52px;text-align:left">'+Math.max(1,Math.round(r[1]/60))+' د</span></div>').join(''):'<div class="setrow mut">لا يوجد استخدام بعد</div>')+'</div>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});
$('#swLpm').addEventListener('change',e=>{S.set.lpm=e.target.checked;store.set('set',S.set);renderStatus();toast(S.set.lpm?'نمط الطاقة المنخفضة يشتغل':'انطفأ نمط الطاقة')});
$('#swChg').addEventListener('change',e=>{S.batt.charging=e.target.checked;store.set('batt',S.batt);renderStatus();appSettings(el)});return;
}
if(S.setPage==='wifi'){
const nets=[['Zain Home 5G',true],['Reda_Home',false],['Baghdad WiFi',false],['Neighbor_4G',false]];
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button><div class="setgroup">'+
row('Wi-Fi',sq('#0a84ff','wifi',15),'<label class="switch"><input type="checkbox" id="swWifi2" '+(s.wifi?'checked':'')+'><i></i></label>')+'</div>'+
'<div class="rbx-sec">الشبكات</div><div class="setgroup">'+nets.map(n=>'<div class="setrow" data-net="'+n[0]+'" style="cursor:pointer"><span style="flex:1">'+n[0]+'</span>'+((s.ssid||'Zain Home 5G')===n[0]&&s.wifi?'<span style="color:#0a84ff;font-weight:700">✓</span>':'<span class="mut">'+g('wifi','#8e8e93',14)+'</span>')+'</div>').join('')+'</div>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});
$('#swWifi2').addEventListener('change',e=>{S.set.wifi=e.target.checked;store.set('set',S.set);renderStatus();appSettings(el)});
el.querySelectorAll('[data-net]').forEach(r=>r.addEventListener('click',()=>{S.set.ssid=r.dataset.net;S.set.wifi=true;store.set('set',S.set);renderStatus();appSettings(el);toast('اتصلت بـ '+r.dataset.net)}));return;
}
if(S.setPage&&S.setPage!=='main'){setSubPage(el);return}
const prof=S.apple.id?
'<div class="card" style="display:flex;gap:12px;align-items:center;padding:13px;cursor:pointer" id="profCard"><span style="width:52px;height:52px;border-radius:50%;background:linear-gradient(150deg,#8e8e93,#636366);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700">'+(S.apple.name||'R').slice(0,1).toUpperCase()+'</span><span style="flex:1"><b style="font-size:16px">'+S.apple.name+'</b><br><span class="mut">'+S.apple.id+' — iCloud</span></span></div>':
'<div class="card" style="display:flex;gap:12px;align-items:center;padding:13px;cursor:pointer" id="profCard"><span style="width:52px;height:52px;border-radius:50%;background:#e9e9ee;display:flex;align-items:center;justify-content:center">'+g('person','#8e8e93',26)+'</span><span style="flex:1"><b style="font-size:15px">تسجيل الدخول إلى iPad</b><br><span class="mut">iCloud وApp Store والرسائل</span></span></div>';
el.innerHTML=prof+
'<div class="setgroup">'+
row('وضع الطيران',sq('#ff9f0a','airplane',15),'<label class="switch"><input type="checkbox" id="swAir" '+(s.airplane?'checked':'')+'><i></i></label>')+
row('Wi-Fi',sq('#0a84ff','wifi',15),'<span class="mut">'+(s.wifi?(s.ssid||'Zain Home 5G'):'مطفأ')+'</span>'+arrow,'wifi')+
row('Bluetooth',sq('#0a84ff','bluetooth',15),'<label class="switch"><input type="checkbox" id="swBt" '+(s.bt?'checked':'')+'><i></i></label>','bluetooth')+
row('بيانات الهاتف',sq('#34c759','cellular',15),'<span class="mut">Zain</span>'+arrow,'cellular')+
row('نقطة اتصال شخصية',sq('#34c759','radio-outline',15),arrow,'hotspot')+
row('البطارية',sq('#34c759','battery-charging',15),'<span class="mut">'+arabNum(Math.round(S.batt.pct))+'٪</span>'+arrow,'battery')+
row('VPN',sq('#8e8e93','shield-checkmark',15),'<span class="mut">'+(S.fx.vpn?'متصل':'غير متصل')+'</span>'+arrow,'vpn')+'</div>'+
'<div class="setgroup">'+
row('الإشعارات',sq('#ff3b30','notifications',15),arrow,'ncset')+
row('الأصوات والحس اللمسي',sq('#fc3c44','volume-high',15),arrow,'sounds')+
row('التركيز',sq('#5e5ce6','moon',15),'<label class="switch"><input type="checkbox" id="swDnd" '+(s.dnd?'checked':'')+'><i></i></label>','focus')+
row('مدة استخدام الجهاز',sq('#5e5ce6','timer',15),arrow,'screen')+'</div>'+
'<div class="setgroup">'+
row('عام',sq('#8e8e93','settings',16),arrow,'general')+
row('إمكانية الوصول',sq('#0a84ff','accessibility',16),arrow,'acc')+
row('الكاميرا',sq('#8e8e93','camera',15),arrow,'camera')+
row('مركز التحكم',sq('#8e8e93','options',15),arrow,'cc')+
row('الشاشة والسطوع',sq('#0a84ff','sunny',15),arrow,'display')+
row('الشاشة الرئيسية ومكتبة التطبيقات',sq('#ff9500','grid',15),arrow,'home')+
row('بحث',sq('#8e8e93','search',15),arrow,'search')+
row('Siri',sq('#111','mic',15),arrow,'siri')+
row('خلفية الشاشة',sq('#5e5ce6','image',15),arrow,'wall')+'</div>'+
'<div class="setgroup">'+
row('Face ID ورمز الدخول',sq('#34c759','scan',15),arrow,'faceid')+
row('طوارئ SOS',sq('#ff3b30','call',15),arrow,'sos')+
row('الخصوصية والأمان',sq('#0a84ff','shield-checkmark',15),arrow,'privacy')+'</div>'+
'<div class="setgroup">'+
row('App Store',sq('#0a84ff','bag',15),arrow,'store')+
row('Game Center',sq('#f92c4c','game-controller',15),arrow,'gamecenter')+
row('المحفظة وApple Pay',sq('#111','wallet',15),arrow,'wallet')+
row('كلمات السر',sq('#8e8e93','key',15),arrow,'passwords')+'</div>'+
'<div class="setgroup">'+
row('التطبيقات',sq('#8e8e93','apps',15),arrow,'appshub')+'</div>'+
(S.apple.id?'<button class="btn gray" id="signOutBtn" style="width:100%;margin-top:6px">تسجيل الخروج من Apple ID</button>':'');
const pg=$('#profCard');if(pg)pg.addEventListener('click',()=>{if(!S.apple.id)appleSignInForm(el,()=>appSettings(el))});
const so=$('#signOutBtn');if(so)so.addEventListener('click',()=>{signOutApple();appSettings(el)});
const bind=(id,fn)=>{const e2=$(id);if(e2)e2.addEventListener('change',fn)};
bind('#swAir',e=>{S.set.airplane=e.target.checked;store.set('set',S.set);renderStatus()});
bind('#swBt',e=>{S.set.bt=e.target.checked;store.set('set',S.set);renderStatus()});
bind('#swDnd',e=>{S.set.dnd=e.target.checked;store.set('set',S.set);renderCC&&null});
const br=$('#setBright');if(br)br.addEventListener('input',e=>{S.set.bright=+e.target.value;store.set('set',S.set);renderStatus()});
el.querySelectorAll('[data-setact]').forEach(r=>r.addEventListener('click',e=>{
if(e.target.closest('label.switch'))return;
const a=r.dataset.setact;
if(['about','battery','wifi','wall','ncset','focus','screen','acc','home','lockset','bluetooth','cellular','hotspot','vpn','sounds','general','camera','display','search','siri','faceid','sos','privacy','gamecenter','wallet','passwords','appshub','appdetail','gupdate','gstorage','gdatetime','gkeyboard','glang','gairdrop','greset'].includes(a)){S.setPage=a;appSettings(el)}
else if(a==='nc'){S.setPage='ncset';appSettings(el)}
else if(a==='cc'){closeApp();setTimeout(showCC,380)}
else if(a==='store'){openApp('appstore',null)}
else if(a==='usage'){S.setPage='screen';appSettings(el)}
}));
}
const STORE=[
{k:'whatsapp',n:'WhatsApp Messenger',dev:'Meta Platforms',cat:'تواصل اجتماعي',ver:'24.10.4',size:'178 MB',desc:'مراسلة ومكالمات '},
{k:'telegram',n:'Telegram',dev:'Telegram FZ-LLC',cat:'تواصل اجتماعي',ver:'11.2',size:'96 MB',desc:'مراسلة سريعة وآم'},
{k:'instagram',n:'Instagram',dev:'Meta Platforms',cat:'صور وفيديو',ver:'312.0',size:'210 MB',desc:'شارك صورك وتابع '},
{k:'facebook',n:'Facebook',dev:'Meta Platforms',cat:'تواصل اجتماعي',ver:'485.0',size:'320 MB',desc:'تواصل مع الأصدقا'},
{k:'messenger',n:'Messenger',dev:'Meta Platforms',cat:'تواصل اجتماعي',ver:'478.0',size:'150 MB',desc:'رسائل فورية لأصد'},
{k:'snapchat',n:'Snapchat',dev:'Snap Inc.',cat:'تواصل اجتماعي',ver:'13.9',size:'98 MB',desc:'لقطات ورسائل سري'},
{k:'x',n:'X',dev:'X Corp.',cat:'أخبار وتواصل',ver:'10.55',size:'120 MB',desc:'منصة التغريدات. '},
{k:'discord',n:'Discord',dev:'Discord Inc.',cat:'تواصل اجتماعي',ver:'243.0',size:'132 MB',desc:'قنوات صوت ونص لل'},
];
function storeRow(a){
const inst=S.installed.includes(a.k),hiddenB=false;
return '<div class="card row" style="align-items:center"><span style="flex:0 0 auto">'+icImg(ICONS[a.k])+'</span><span style="flex:1;cursor:pointer" data-detail="'+a.k+'"><span class="big" style="font-size:15px">'+a.n+'</span><br><span class="mut">'+a.cat+' — '+a.dev+'</span></span><button class="btn '+(inst?'gray':'')+'" data-get="'+a.k+'" style="border-radius:16px;padding:7px 18px">'+(inst?'فتح':'احصل')+'</button></div>';
}
function appStore(el){
if(S.storeTab==='games')S.storeTab='apps';
const tab=S.storeTab;
if(S.storeDetail){const a=STORE.find(x=>x.k===S.storeDetail);if(a){
const inst=S.installed.includes(a.k);
el.innerHTML='<button class="back" id="stBack" style="margin-bottom:8px">‹ رجوع</button>'+
'<div class="row" style="align-items:center;gap:12px"><span>'+icImg(ICONS[a.k])+'</span><span style="flex:1"><span class="big" style="font-size:18px">'+a.n+'</span><br><span class="mut">'+a.dev+'</span></span><button class="btn" id="stGet" style="border-radius:16px;padding:8px 20px">'+(inst?'فتح':'احصل')+'</button></div>'+
'<div class="rbx-sec">الوصف</div><p style="line-height:1.8">'+a.desc+'</p>'+
'<div class="rbx-sec">المعلومات</div><div class="setgroup">'+
'<div class="setrow"><span style="flex:1">الإصدار</span><span class="mut">'+a.ver+'</span></div>'+
'<div class="setrow"><span style="flex:1">الحجم</span><span class="mut">'+a.size+'</span></div>'+
'<div class="setrow"><span style="flex:1">المطور</span><span class="mut">'+a.dev+'</span></div>'+
'<div class="setrow"><span style="flex:1">التصنيف</span><span class="mut">'+a.cat+'</span></div></div>';
$('#stBack').addEventListener('click',()=>{S.storeDetail=null;appStore(el)});
$('#stGet').addEventListener('click',e=>doGet(a.k,e.target,el));
return;
}}
const acct=S.apple.id?
'<span style="display:flex;align-items:center;gap:9px"><span style="width:38px;height:38px;border-radius:50%;background:linear-gradient(150deg,#8e8e93,#636366);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">'+S.apple.name.slice(0,1).toUpperCase()+'</span><b>'+S.apple.name+'</b></span>':
'<button class="btn" id="stSign" style="padding:8px 14px">تسجيل الدخول بـ Apple ID</button>';
let body='';
if(tab==='today'){
const f=STORE[0];
body='<div class="card" style="padding:0;overflow:hidden"><div style="background:linear-gradient(140deg,'+SOCIAL[f.k].c+',#0c1520);height:150px;display:flex;align-items:center;justify-content:center;gap:12px"><span style="background:#fff;border-radius:24px;padding:8px;display:inline-flex">'+icImg(ICONS[f.k])+'</span></div><div style="padding:12px"><span class="mut">تطبيق اليوم</span><div class="big" style="font-size:17px">'+f.n+'</div><p class="mut" style="margin:4px 0 10px">'+f.desc+'</p><button class="btn" data-get="'+f.k+'" style="border-radius:16px;padding:7px 18px">'+(S.installed.includes(f.k)?'فتح':'احصل')+'</button></div></div>'+
STORE.slice(1,4).map(storeRow).join('');
} else if(tab==='apps'){
body='<div class="rbx-sec" style="margin-top:2px">تواصل اجتماعي — أونلاين</div>'+STORE.filter(a=>SOCIAL[a.k]).map(storeRow).join('')+
(S.hidden.length?'<div class="rbx-sec">تطبيقات حذفتها — استرجعها</div>'+S.hidden.map(id=>{const pa=APPS.find(x=>x.id===id);return pa?'<div class="card row" style="align-items:center"><span>'+icImg(ICONS[pa.ic])+'</span><span style="flex:1"><span class="big" style="font-size:15px">'+pa.n+'</span><br><span class="mut">تطبيق نظام</span></span><button class="btn" data-unhide="'+id+'" style="border-radius:16px;padding:7px 18px">احصل</button></div>':''}).join(''):'');
} else {
body='<div class="row" style="margin-bottom:10px"><input id="stQ" type="text" placeholder="ابحث عن تطبيقات وألعاب…" style="flex:1;padding:11px 13px;border:1px solid #d9d9de;border-radius:14px;font-size:14px"></div><div id="stRes">'+STORE.map(storeRow).join('')+'</div>';
}
el.innerHTML='<div class="row" style="align-items:center;margin-bottom:12px"><span class="big" style="font-size:21px;flex:1">App Store</span>'+acct+'</div>'+body+
'<div style="display:flex;gap:6px;margin-top:14px;background:#e9e9ee;border-radius:14px;padding:4px">'+
[['today','اليوم'],['apps','التطبيقات'],['search','بحث']].map(t=>'<button data-tab="'+t[0]+'" style="flex:1;padding:8px;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-size:12.5px;'+(tab===t[0]?'background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.15)':'background:none;color:#555')+'">'+t[1]+'</button>').join('')+'</div>';
el.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{S.storeTab=b.dataset.tab;S.storeDetail=null;appStore(el)}));
const sg=$('#stSign');if(sg)sg.addEventListener('click',()=>appleSignInForm(el,()=>appStore(el)));
const q=$('#stQ');if(q)q.addEventListener('input',()=>{const v=q.value.trim();$('#stRes').innerHTML=STORE.filter(a=>!v||a.n.includes(v)||a.cat.includes(v)).map(storeRow).join('')||'<p class="mut" style="text-align:center;padding:16px">لا نتائج</p>';bindGets(el)});
el.querySelectorAll('[data-unhide]').forEach(b=>b.addEventListener('click',()=>{S.hidden=S.hidden.filter(x=>x!==b.dataset.unhide);store.set('hidden',S.hidden);renderHome();appStore(el);toast('رجع التطبيق للشاشة الرئيسية')}));
bindGets(el);
}
function bindGets(el){
el.querySelectorAll('[data-get]').forEach(b=>b.addEventListener('click',()=>doGet(b.dataset.get,b,el)));
el.querySelectorAll('[data-detail]').forEach(d=>d.addEventListener('click',()=>{S.storeDetail=d.dataset.detail;appStore(el)}));
}
function doGet(k,btn,el){
if(!S.apple.id){toast('سجل دخولك بـ Apple ID حتى تنزل — روح للإعدادات أو اضغط تسجيل الدخول');appleSignInForm(el,()=>appStore(el));return}
if(S.installed.includes(k)){S.storeDetail=null;openApp('x_'+k,null);return}
btn.textContent='...';
setTimeout(()=>{S.installed.push(k);store.set('installed',S.installed);renderHome();S.storeDetail=null;appStore(el);toast('انثبت '+STORE.find(a=>a.k===k).n+' على الشاشة الرئيسية');notify('appstore','App Store','اكتمل تثبيت '+STORE.find(a=>a.k===k).n,null,{pop:false})},750);
}
const SITES=[
['Apple','#111','apple','موقع آبل الحقيقي','https://picsum.photos/seed/riosf1/640/340','يفتح موقع آبل الرسمي على جهازك.','https://www.apple.com'],
['YouTube','#ff0033','youtube','يوتيوب الحقيقي','https://picsum.photos/seed/riosf2/640/340','يفتح يوتيوب الحقيقي على جهازك.','https://www.youtube.com'],
['Roblox','#191b1e','roblox','روبلوكس الحقيقي','https://picsum.photos/seed/riosf3/640/340','يفتح روبلوكس الحقيقي على جهازك.','https://www.roblox.com'],
['ويكيبيديا','#fff','wiki','ويكيبيديا — تنعرض هنا صدك','https://picsum.photos/seed/riosf4/640/340','موسوعة حرة يكتبها الناس، تنعرض داخل سفاري هنا.','https://ar.wikipedia.org']
];
function appSafari(el){
el.innerHTML='<div class="row" style="gap:7px"><span style="color:#8e8e93;font-size:17px">‹</span><span style="color:#c7c7cc;font-size:17px">›</span><input type="text" id="sfIn" placeholder="Search or enter website name" style="flex:1;padding:10px 12px;border:none;border-radius:10px;background:#e9e9ee;font-size:13.5px;text-align:center"></div><div id="sfOut">'+
'<div class="rbx-sec">المفضلة</div><div class="pgrid" style="grid-template-columns:repeat(4,1fr);gap:9px">'+SITES.map((s,i)=>'<div data-site="'+i+'" style="cursor:pointer;text-align:center"><div style="background:'+s[1]+';border-radius:14px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.08)"><span style="color:'+(s[2]==='wiki'?'#111':'#fff')+';font-size:21px;font-weight:800">'+s[0][0]+'</span></div><div style="font-size:11px;margin-top:4px;color:#333">'+s[0]+'</div></div>').join('')+'</div>'+
'<div class="rbx-sec">قائمة القراءة</div>'+SITES.slice(0,3).map(s=>'<div class="card row"><img src="'+s[4]+'" style="width:56px;height:42px;object-fit:cover;border-radius:8px"><span><span class="big" style="font-size:13.5px">'+s[3]+'</span><br><span class="mut">'+s[0]+'</span></span></div>').join('')+'</div>';
const openSite=s=>{
$('#sfOut').innerHTML=(s[2]==='wiki'?'<iframe src="https://ar.wikipedia.org" style="width:100%;height:330px;border:0;border-radius:12px;margin-top:12px;background:#fff"></iframe>':'<img src="'+s[4]+'" style="width:100%;border-radius:12px;margin-top:12px;aspect-ratio:16/8.5;object-fit:cover">')+
'<div class="card" style="margin-top:10px"><div class="big" style="font-size:16px">'+s[3]+'</div><p class="mut" style="margin-top:5px;line-height:1.7">'+s[5]+'</p>'+
'<a class="btn" href="'+s[6]+'" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none;margin-top:12px;padding:12px">افتح '+s[0]+' الحقيقي</a></div><button class="btn gray" id="sfBack" style="margin-top:4px">رجوع</button>';
$('#sfIn').value=s[6].replace('https://','');
$('#sfBack').addEventListener('click',()=>appSafari(el));
};
el.querySelectorAll('[data-site]').forEach(n=>n.addEventListener('click',()=>openSite(SITES[+n.dataset.site])));
$('#sfIn').addEventListener('keydown',e=>{if(e.key==='Enter'){const v=e.target.value.trim().toLowerCase();
const hit=SITES.find(s=>v.includes(s[0].toLowerCase())||v.includes(s[2]));
if(hit)openSite(hit);
else $('#sfOut').innerHTML='<div class="card" style="margin-top:12px;text-align:center"><div class="big">تبحث عن: '+e.target.value.replace(/</g,'&lt;')+'</div><a class="btn" href="https://www.google.com/search?q='+encodeURIComponent(e.target.value)+'" target="_blank" rel="noopener" style="display:block;text-decoration:none;margin-top:12px;padding:12px">ابحث بجوجل الحقيقي</a></div>'}});
}
const ALBUMS=[
['Shape of You','Ed Sheeran','https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/400x400bb.jpg'],
['Faded','Alan Walker','https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0d/a3/1a/0da31af7-d0ff-9bee-c427-1b6d0336f6fc/886446321981.jpg/400x400bb.jpg'],
['Bohemian Rhapsody','Queen','https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8b/0a/ea/8b0aea60-6f4a-195b-5958-cdf459c2333b/602527644271.jpg/400x400bb.jpg']];
function appMusic(el){
const cur=ALBUMS[S.album||0];
el.innerHTML='<div class="card" style="text-align:center;padding:20px 14px"><img src="'+cur[2]+'" style="width:130px;height:130px;border-radius:14px;box-shadow:0 8px 22px rgba(0,0,0,.25)"><div class="big" style="font-size:18px;margin-top:12px">'+cur[0]+'</div><p class="mut">'+cur[1]+'</p><div style="height:6px;background:#e9e9ee;border-radius:4px;margin:16px 0;overflow:hidden"><div id="musBar" style="height:100%;width:'+(S.musicPlay?40:5)+'%;background:#f92c4c"></div></div><button class="btn" id="musBtn">'+(S.musicPlay?'إيقاف مؤقت':'تشغيل')+'</button></div>'+
'<div style="padding:4px 2px 2px;font-weight:700">ألبومات حقيقية من Apple Music</div>'+
ALBUMS.map((a,i)=>'<div class="musicRow" data-alb="'+i+'" style="display:flex;gap:11px;align-items:center;padding:8px 2px;cursor:pointer"><img src="'+a[2]+'" style="width:46px;height:46px;border-radius:8px"><span style="flex:1"><b style="font-size:13.5px">'+a[0]+'</b><br><span class="mut">'+a[1]+'</span></span>'+g('play-circle','#f92c4c',26)+'</div>').join('');
$('#musBtn').addEventListener('click',()=>{S.musicPlay=!S.musicPlay;appMusic(el)});
el.querySelectorAll('[data-alb]').forEach(r=>r.addEventListener('click',()=>{S.album=+r.dataset.alb;S.musicPlay=true;appMusic(el)}));
if(S.musicPlay){const iv=setInterval(()=>{if(S.app!=='music'){clearInterval(iv);return}const b=$('#musBar');if(b){let w=parseFloat(b.style.width)||0;w+=2;if(w>100)w=0;b.style.width=w+'%'}},300)}
}
function appClock(el){
el.innerHTML='<div class="card" style="text-align:center;padding:20px"><canvas id="clk" width="180" height="180"></canvas><div class="big" id="clkT" style="margin-top:6px"></div></div>'+
'<div class="card"><b>المنبه</b><div id="alList" style="margin-top:6px"></div><div class="row" style="margin-top:8px"><input type="time" id="alTime" style="flex:1;padding:9px;border:1px solid #d9d9de;border-radius:10px"><button class="btn" id="alAdd">إضافة</button></div></div>'+
'<div class="card"><b>المؤقت</b><div id="tmState" class="mut" style="margin:6px 0">ما مشغل مؤقت</div><div class="row"><input type="number" id="tmMin" placeholder="دقائق" style="flex:1;padding:9px;border:1px solid #d9d9de;border-radius:10px"><button class="btn" id="tmStart">ابدأ</button><button class="btn gray" id="tmStop">إيقاف</button></div></div>'+
'<div class="card"><b>ساعة إيقاف</b><div id="swState" style="font-size:22px;font-weight:700;margin:6px 0">0.0</div><div class="row"><button class="btn" id="swStart">ابدأ</button><button class="btn gray" id="swLap">لفة</button><button class="btn gray" id="swReset">تصفير</button></div><div id="swLaps" class="mut" style="margin-top:6px"></div></div>';
const draw=()=>{const c=$('#clk');if(!c||S.app!=='clock')return;const x=c.getContext('2d'),d=new Date();
x.clearRect(0,0,180,180);x.fillStyle='#111';x.beginPath();x.arc(90,90,84,0,7);x.fill();
x.fillStyle='#fff';for(let i=0;i<12;i++){const a=i*Math.PI/6;x.fillRect(90+Math.sin(a)*72-1.5,90-Math.cos(a)*72-5,3,10)}
const ha=(d.getHours()%12+d.getMinutes()/60)*Math.PI/6,ma=(d.getMinutes()+d.getSeconds()/60)*Math.PI/30,sa=d.getSeconds()*Math.PI/30;
x.strokeStyle='#fff';x.lineWidth=6;x.beginPath();x.moveTo(90,90);x.lineTo(90+Math.sin(ha)*44,90-Math.cos(ha)*44);x.stroke();
x.lineWidth=4;x.beginPath();x.moveTo(90,90);x.lineTo(90+Math.sin(ma)*64,90-Math.cos(ma)*64);x.stroke();
x.strokeStyle='#ff9f0a';x.lineWidth=2;x.beginPath();x.moveTo(90,90);x.lineTo(90+Math.sin(sa)*70,90-Math.cos(sa)*70);x.stroke();
$('#clkT').textContent=fmtTime();setTimeout(draw,500)};
draw();
const drawA=()=>{const l=$('#alList');if(!l)return;
l.innerHTML=(S.alarms||[]).length?S.alarms.map((a,i)=>'<div class="row" style="justify-content:space-between;padding:5px 0"><span style="font-size:19px;font-weight:600">'+arabNum(a.t)+'</span><label class="switch"><input type="checkbox" data-alon="'+i+'" '+(a.on?'checked':'')+'><i></i></label><button class="btn red" data-aldel="'+i+'" style="padding:5px 9px">حذف</button></div>').join(''):'<div class="mut">لا منبهات — ضيف واحد من جوّه</div>';
l.querySelectorAll('[data-alon]').forEach(c=>c.addEventListener('change',()=>{S.alarms[+c.dataset.alon].on=c.checked;store.set('alarms',S.alarms)}));
l.querySelectorAll('[data-aldel]').forEach(b=>b.addEventListener('click',()=>{S.alarms.splice(+b.dataset.aldel,1);store.set('alarms',S.alarms);drawA()}))};
drawA();
$('#alAdd').addEventListener('click',()=>{const v=$('#alTime').value;if(!v)return toast('اختر وقت للمنبه');S.alarms.push({t:v,on:1});store.set('alarms',S.alarms);drawA();updWidgets();toast('انضبط منبه '+v)});
const updTm=()=>{const s2=$('#tmState');if(!s2)return;if(S.timerEnd){const left=Math.max(0,Math.round((S.timerEnd-Date.now())/1000));s2.textContent='باقي '+Math.floor(left/60)+':'+String(left%60).padStart(2,'0')}else s2.textContent='ما مشغل مؤقت'};
updTm();const tmIv=setInterval(()=>{if(S.app!=='clock'){clearInterval(tmIv);return}updTm()},500);
$('#tmStart').addEventListener('click',()=>{const m=+$('#tmMin').value;if(!m)return toast('اكتب الدقائق');S.timerEnd=Date.now()+m*60000;S.timerKind='المؤقت';updTm();renderLockX();toast('اشتغل المؤقت')});
$('#tmStop').addEventListener('click',()=>{S.timerEnd=0;updTm();renderLockX();toast('وقف المؤقت')});
let swOn=false,swT0=0,swAcc=0,swIv=null;
const swDraw=()=>{const e2=$('#swState');if(e2)e2.textContent=((swAcc+(swOn?Date.now()-swT0:0))/1000).toFixed(1)};
$('#swStart').addEventListener('click',e=>{if(swOn){swOn=false;swAcc+=Date.now()-swT0;clearInterval(swIv);e.target.textContent='ابدأ'}else{swOn=true;swT0=Date.now();swIv=setInterval(()=>{if(S.app!=='clock'){clearInterval(swIv);return}swDraw()},100);e.target.textContent='وقف'}swDraw()});
$('#swLap').addEventListener('click',()=>{const l=$('#swLaps');if(l)l.innerHTML='لفة: '+((swAcc+(swOn?Date.now()-swT0:0))/1000).toFixed(1)+' ثا<br>'+l.innerHTML});
$('#swReset').addEventListener('click',()=>{swOn=false;swAcc=0;clearInterval(swIv);const b=$('#swStart');if(b)b.textContent='ابدأ';const l=$('#swLaps');if(l)l.innerHTML='';swDraw()});
}
function appNotes(el){
el.innerHTML='<textarea id="noteTxt" placeholder="اكتب ملاحظة…" style="width:100%;height:230px;border:none;border-radius:12px;padding:12px;font-size:15px;background:#fff">'+S.notes.replace(/</g,'&lt;')+'</textarea><p class="mut" style="margin-top:8px">تنحفظ الملاحظة بالآيباد.</p><button class="btn gray" id="noteShare" style="margin-top:6px">مشاركة الملاحظة</button>';
$('#noteTxt').addEventListener('input',e=>{S.notes=e.target.value;store.set('notes',S.notes)});
$('#noteShare').addEventListener('click',()=>showShare({text:S.notes||'ملاحظة فارغة',title:'ملاحظة من Rio iPad'}));
}
function appCalc(el){
let expr='';
el.innerHTML='<div class="card"><div id="calcOut" style="text-align:left;font-size:30px;font-weight:700;padding:8px;min-height:44px">0</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+
['C','⌫','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='].map(k=>'<button class="btn '+(k==='='?'':'gray')+'" data-ck="'+k+'" style="padding:13px 0;font-size:16px">'+k+'</button>').join('')+'</div></div>';
el.querySelectorAll('[data-ck]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ck;
if(k==='C')expr='';else if(k==='⌫')expr=expr.slice(0,-1);
else if(k==='='){try{expr=String(eval(expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/%/g,'/100'))||'0')}catch(e){expr='Error'}}
else expr+=k;
$('#calcOut').textContent=expr||'0'}));
}
const REAL_VIDEOS=[
['kJQP7kiw5Fk','Luis Fonsi — Despacito ft. Daddy Yankee','Luis Fonsi'],
['JGwWNGJdvx8','Ed Sheeran — Shape of You','Ed Sheeran'],
['RgKAFK5djSk','Wiz Khalifa — See You Again ft. Charlie Puth','Wiz Khalifa'],
['60ItHLz5WEA','Alan Walker — Faded','Alan Walker'],
['fJ9rUzIMcZQ','Queen — Bohemian Rhapsody','Queen Official'],
['hTWKbfoikeg','Nirvana — Smells Like Teen Spirit','Nirvana'],
['MmB9b5njVbA','Minecraft: Official Trailer','Minecraft'],
['aqz-KE-bpKQ','Big Buck Bunny — فيلم قصير','Blender Studio']
];
function appYouTube(el){
el.innerHTML='<div class="rbx-sec" style="margin-top:2px">فيديوات حقيقية من يوتيوب — دوس أي فيديو يشتغل هنا</div>'+
REAL_VIDEOS.map((v,i)=>'<div style="margin-top:13px;cursor:pointer" data-vid="'+i+'"><img src="https://img.youtube.com/vi/'+v[0]+'/hqdefault.jpg" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover;background:#111"><div style="margin-top:7px"><span class="big" style="font-size:14px">'+v[1]+'</span><br><span class="mut">'+v[2]+' • YouTube</span></div></div>').join('')+
'<a href="https://www.youtube.com" target="_blank" rel="noopener" class="btn" style="display:block;text-align:center;text-decoration:none;margin-top:16px;padding:12px">افتح يوتيوب الحقيقي كامل بجهازك</a>';
el.querySelectorAll('[data-vid]').forEach(c=>c.addEventListener('click',()=>playVideo(REAL_VIDEOS[+c.dataset.vid])));
}
function playVideo(v){
const el=$('#appBody');
el.innerHTML='<div style="position:relative;aspect-ratio:16/9;background:#000;border-radius:12px;overflow:hidden"><iframe src="https://www.youtube-nocookie.com/embed/'+v[0]+'?autoplay=1&playsinline=1&rel=0" style="width:100%;height:100%;border:0" allow="autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe></div>'+
'<div class="big" style="margin-top:12px;font-size:15.5px">'+v[1]+'</div><p class="mut" style="margin-top:4px">'+v[2]+' • يعرض هسه من يوتيوب الحقيقي</p>'+
'<div class="row" style="margin-top:12px"><button class="btn gray" id="ytBack" style="flex:1">رجوع للفيديوات</button><a class="btn" href="https://www.youtube.com/watch?v='+v[0]+'" target="_blank" rel="noopener" style="flex:1;text-align:center;text-decoration:none">افتحه بيوتيوب</a></div>';
$('#ytBack').addEventListener('click',()=>appYouTube(el));
}
function appTikTok(el){
el.innerHTML='<div style="text-align:center;padding:30px 18px"><div style="display:flex;justify-content:center">'+IC.tiktok()+'</div>'+
'<div class="big" style="margin-top:12px;font-size:19px">TikTok الحقيقي</div>'+
'<p class="mut" style="margin:10px 0 18px;line-height:1.8">تيك توك يمنع أي موقع يعرض فيده من داخله، فبدل النسخة المزيفة هذا يفتحلك تيك توك الحقيقي نفسه على جهازك:</p>'+
'<a class="btn" href="https://www.tiktok.com" target="_blank" rel="noopener" style="display:block;text-decoration:none;padding:14px;font-size:15px">افتح TikTok الحقيقي</a>'+
'<a class="btn gray" href="https://www.tiktok.com/explore" target="_blank" rel="noopener" style="display:block;text-decoration:none;padding:12px;margin-top:10px">اكتشف الترندات هسه</a></div>';
}
function appMaps(el){
const frame=q=>'<iframe src="https://www.google.com/maps?q='+encodeURIComponent(q)+'&z=13&output=embed" style="width:100%;height:330px;border:0;border-radius:12px;background:#e8f3e2" loading="lazy"></iframe>';
el.innerHTML='<div class="row" style="gap:7px"><input type="text" id="mapIn" placeholder="ابحث عن مكان حقيقي…" style="flex:1;padding:11px 12px;border:none;border-radius:10px;background:#e9e9ee;font-size:14px"><button class="btn" id="mapGo">بحث</button></div><div id="mapBox" style="margin-top:10px">'+frame('بغداد')+'</div><p class="mut" style="margin-top:8px">هاي خرائط جوجل الحقيقية — حرّك وكبّر باصبعك، وابحث عن أي مكان بالعالم.</p>';
const go=()=>{const v=$('#mapIn').value.trim()||'بغداد';$('#mapBox').innerHTML=frame(v)};
$('#mapGo').addEventListener('click',go);
$('#mapIn').addEventListener('keydown',e=>{if(e.key==='Enter')go()});
}
function appWeather(el){
el.innerHTML='<div class="card" style="text-align:center;padding:26px"><div class="big">بغداد</div><p class="mut" style="margin-top:8px">يجيب الطقس الحقيقي هسه…</p></div>';
const codeTxt=c=>({0:'صافي',1:'مشمس غالباً',2:'غائم جزئياً',3:'غائم',45:'ضباب',48:'ضباب',51:'رذاذ خفيف',53:'رذاذ',55:'رذاذ',61:'مطر خفيف',63:'مطر',65:'مطر قوي',80:'زخات',95:'عاصفة'})[c]||'—';
fetch('https://api.open-meteo.com/v1/forecast?latitude=33.3152&longitude=44.3661&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1&timezone=Asia%2FBaghdad')
.then(r=>r.json()).then(d=>{
if(S.app!=='weather')return;
const cur=d.current,hour=new Date().getHours();
const hours=[];for(let k=0;k<8;k++){const hh=(hour+k)%24;hours.push([(k===0?'هسه':hh+':00'),Math.round(d.hourly.temperature_2m[hh])+'°'])}
el.innerHTML='<div class="card" style="background:linear-gradient(160deg,#4aa8ff,#1668dc);color:#fff;text-align:center;padding:24px 14px"><div style="font-size:16px">بغداد — طقس مباشر</div><div style="font-size:54px;font-weight:200">'+Math.round(cur.temperature_2m)+'°</div><div>'+codeTxt(cur.weather_code)+'</div><div style="opacity:.85;font-size:12.5px">رياح '+Math.round(cur.wind_speed_10m)+' كم/س • بيانات حقيقية من Open-Meteo</div></div>'+
'<div class="card"><div class="rbx-sec" style="margin-top:0">الساعات الجاية</div><div class="friends">'+hours.map(h=>'<div class="friend"><div class="fn" style="font-size:12px">'+h[0]+'</div><b style="font-size:16px">'+h[1]+'</b></div>').join('')+'</div></div>';
}).catch(()=>{if(S.app==='weather')el.innerHTML='<div class="card" style="text-align:center;padding:24px"><div class="big">ماكو إنترنت</div><p class="mut" style="margin-top:6px">الطقس الحقيقي يحتاج اتصال — تأكد من الشبكة وارجع.</p></div>'});
}
function appCalendar(el){
const now=new Date(),y=now.getFullYear(),m=now.getMonth(),first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate();
const months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
let cells='';for(let i=0;i<first;i++)cells+='<span></span>';
for(let dnum=1;dnum<=dim;dnum++)cells+='<span style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:13.5px;'+(dnum===now.getDate()?'background:#ff3b30;color:#fff;font-weight:700':'color:#222')+'">'+dnum+'</span>';
el.innerHTML='<div class="card"><div class="big" style="font-size:18px;color:#ff3b30">'+months[m]+' '+y+'</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-top:10px;text-align:center" class="mut"><span>أحد</span><span>اثنين</span><span>ثلاثاء</span><span>أربعاء</span><span>خميس</span><span>جمعة</span><span>سبت</span>'+cells+'</div></div><div class="card"><div class="rbx-sec" style="margin-top:0">اليوم</div><p class="mut">ما عندك أحداث اليوم. العب براحتك.</p></div>';
}
$('#lockGlyph').innerHTML=g('lock-closed','#fff',30);
$('#lockTorch').innerHTML=g('flashlight','#fff',21);
$('#lockCam').innerHTML=g('camera','#fff',21);
function unlock(){if(!S.locked)return;S.locked=false;sfx('unlock');const L=$('#lock');L.classList.add('bye');setTimeout(()=>{L.classList.remove('show','bye');syncPill()},470)}
$('#lock').addEventListener('click',()=>unlock());
$('#lockTorch').addEventListener('click',e=>{e.stopPropagation();unlock();S.set.flash=!S.set.flash;store.set('set',S.set);toast(S.set.flash?'المصباح يعمل':'المصباح انطفأ')});
$('#lockCam').addEventListener('click',e=>{e.stopPropagation();unlock();setTimeout(()=>openApp('camera'),480)});
const FBB='https://spychat-4f8d5-default-rtdb.firebaseio.com/rio-ipad';
function myName(){return S.apple.name||('Rio '+S.sid.slice(1,5))}
async function fbGet(path){try{const r=await fetch(FBB+path+'.json');return await r.json()}catch(e){return null}}
async function fbPost(path,body){try{await fetch(FBB+path+'.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}catch(e){}}
async function fbPut(path,body){try{await fetch(FBB+path+'.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}catch(e){}}
function simpHash(v){let h=5381;for(let i=0;i<v.length;i++)h=((h*33)^v.charCodeAt(i))>>>0;return h.toString(36)}
function enterJiggle(){if(S.jiggle)return;S.jiggle=true;$('#screen').classList.add('jiggling');$('#editBar').style.display='block';if(navigator.vibrate)navigator.vibrate(12)}
function exitJiggle(){S.jiggle=false;$('#screen').classList.remove('jiggling');$('#editBar').style.display='none';hideCtx()}
function hideCtx(){$('#ctxMenu').style.display='none'}
function showCtx(el){
const m=$('#ctxMenu'),name=navigator,appId=el.dataset.app;
const scr=$('#screen').getBoundingClientRect(),r=el.getBoundingClientRect();
m.innerHTML='<button class="danger" id="ctxDel">حذف التطبيق</button><button id="ctxMove">إعادة ترتيب التطبيقات</button><button id="ctxCancel">إلغاء</button>';
m.style.display='block';
m.style.left=Math.max(8,Math.min(scr.width-190,r.left-scr.left-40))+'px';
m.style.top=Math.max(30,r.bottom-scr.top+6)+'px';
$('#ctxDel').addEventListener('click',()=>{hideCtx();deleteApp(appId)});
$('#ctxMove').addEventListener('click',()=>{hideCtx();toast('اسحب الأيقونات حتى تعيد ترتيبها — قيد التطوير')});
$('#ctxCancel').addEventListener('click',hideCtx);
}
function deleteApp(id){
if(id.startsWith('x_')){const k=id.slice(2);S.installed=S.installed.filter(x=>x!==k);store.set('installed',S.installed)}
else if(!S.hidden.includes(id)){S.hidden.push(id);store.set('hidden',S.hidden)}
renderHome();toast('انحذف التطبيق — تكدر تنزله مرة ثانية من App Store');
}
$('#editDone').addEventListener('click',exitJiggle);
$('#homeApps').addEventListener('click',e=>{if(S.jiggle&&e.target.id==='homeApps'||S.jiggle&&e.target.id==='pagesTrack'||S.jiggle&&e.target.classList.contains('hpage'))exitJiggle()});
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener('contextmenu',e=>{const t=e.target.tagName;if(t!=='INPUT'&&t!=='TEXTAREA')e.preventDefault()});
function signOutApple(){S.apple={id:'',name:''};store.set('apple',S.apple);toast('انسجل خروجك من Apple ID')}
function appleSignInForm(el,done){
el.innerHTML='<div class="card" style="max-width:340px;margin:16px auto;padding:22px 18px;text-align:center">'+
'<div style="font-size:34px">●</div><div class="big" style="font-size:19px">تسجيل الدخول بـ Apple ID</div>'+
'<p class="mut" style="margin:6px 0 14px">حسابك يربط iCloud وApp Store بهذا الآيباد</p>'+
'<input id="appleEmail" type="email" placeholder="Apple ID (إيميل)" style="width:100%;padding:12px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;margin-bottom:9px">'+
'<input id="applePass" type="password" placeholder="كلمة السر" style="width:100%;padding:12px;border:1px solid #d9d9de;border-radius:12px;font-size:14px">'+
'<button class="btn" id="appleGo" style="width:100%;margin-top:12px;padding:12px">تسجيل الدخول</button>'+
'<p class="mut" style="margin-top:10px;font-size:11.5px">حساب تجريبي داخل اللعبة — لا تستخدم كلمة سرك الحقيقية</p></div>';
$('#appleGo').addEventListener('click',async()=>{
const em=$('#appleEmail').value.trim(),pw=$('#applePass').value;
if(!em||!pw)return toast('اكتب الإيميل وكلمة السر');
const nm=em.split('@')[0]||'Reda';
S.apple={id:em,name:nm};store.set('apple',S.apple);
fbPut('/accounts/'+simpHash(em),{name:nm,email:em,pw:simpHash(pw),ts:Date.now()});
toast('أهلاً '+nm+' — انسجل دخولك');
if(done)done();
});
}
function escH(v){return String(v||'').replace(/</g,'&lt;')}
function chatInputHTML(){return ''+chatInputHTML()+''}
function chatThread(roomPath,theme){
const list=$('#chatList');if(!list)return;
fbPost(roomPath+'/presence',{u:myName(),sid:S.sid,ts:Date.now()});
const render=msgs=>{
const l=$('#chatList');if(!l){clearInterval(S.poll);return}
const arr=msgs?Object.values(msgs).sort((a,b)=>(a.ts||0)-(b.ts||0)).slice(-40):[];
l.innerHTML=arr.length?arr.map(x=>{const me=x.u===myName();return '<div style="display:flex;justify-content:'+(me?'flex-start':'flex-end')+'"><div style="max-width:78%;background:'+(me?theme.own:theme.other)+';color:'+(me?theme.ownTx:theme.otherTx)+';border-radius:14px;padding:7px 10px;margin:2.5px 0;box-shadow:0 1px 1px rgba(0,0,0,.08)"><b style="display:block;font-size:10.5px;opacity:.75">'+escH(x.u)+'</b><span style="font-size:13.5px">'+escH(x.t)+'</span>'+(me?'<div style="text-align:left;font-size:10px;color:#34b7f1;margin-top:1px">✓✓</div>':'')+'</div></div>'}).join(''):'<div class="mut" style="text-align:center;padding:22px">المحادثة فارغة — كن أول من يكتب</div>';
l.scrollTop=1e6;
};
const load=async()=>{render(await fbGet(roomPath+'/msgs'));
const pr=await fbGet(roomPath+'/presence');const n=$('#prsN');
if(n&&pr)n.textContent=String(Math.max(1,Object.values(pr).filter(x=>Date.now()-(x.ts||0)<60000).length))};
load();clearInterval(S.poll);S.poll=setInterval(load,2500);
const send=async()=>{const inp=$('#chatIn'),v=inp.value.trim();if(!v)return;inp.value='';await fbPost(roomPath+'/msgs',{u:myName(),t:v,ts:Date.now()});load()};
const sb=$('#chatSend');if(sb)sb.addEventListener('click',send);
const ci=$('#chatIn');if(ci)ci.addEventListener('keydown',e=>{if(e.key==='Enter')send});
}
function chatChrome(headBg,title,sub,bg){
const el=$('#appBody');
el.innerHTML='<div style="background:'+headBg+';color:#fff;border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:8px"><b>'+title+'</b><span style="font-size:12px;opacity:.85">'+sub+'</span><span style="margin-inline-start:auto;font-size:12px">متصلون: <b id="prsN">…</b></span></div>'+
'<div id="chatList" style="background:'+bg+';border-radius:14px;padding:8px 6px;min-height:180px;margin-top:8px"><div class="mut" style="text-align:center;padding:16px">جاي يحمل…</div></div>'+
'<div class="row" style="position:sticky;bottom:0;background:#f2f2f7;padding-top:8px"><input type="text" id="chatIn" placeholder="اكتب رسالة…" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px"><button class="btn" id="chatSend">إرسال</button></div>';
}
const WA_THREADS=[['whatsapp','Rio العام — كل اللاعبين','group'],['whatsapp-dm-ahmad','أحمد','dm'],['whatsapp-dm-mohammad','محمد','dm'],['whatsapp-grp','عائلة Rio','group']];
function appWhatsApp(){
const el=$('#appBody');
el.innerHTML='<div style="background:#075e54;color:#fff;border-radius:14px 14px 0 0;padding:12px"><b style="font-size:16px">WhatsApp</b><span style="display:block;font-size:12px;opacity:.85">متصل كـ '+escH(myName())+'</span></div>'+
'<div style="display:flex;background:#075e54;color:#fff;padding:0 8px 8px;gap:4px">'+['الدردشات','المجموعات','المكالمات'].map((t,i)=>'<span style="flex:1;text-align:center;font-size:12.5px;padding:6px;border-bottom:'+(i===0?'3px solid #fff':'3px solid transparent')+'">'+t+'</span>').join('')+'</div>'+
WA_THREADS.map((t,i)=>'<div class="card row" data-wa="'+t[0]+'" style="cursor:pointer;margin-top:8px;align-items:center"><img src="https://i.pravatar.cc/90?img='+(15+i*11)+'" style="width:46px;height:46px;border-radius:50%"><span style="flex:1"><b style="font-size:14px">'+t[1]+'</b><br><span class="mut">اضغط لفتح المحادثة — أونلاين</span></span><span class="mut">الآن</span></div>').join('')+
'<p class="mut" style="text-align:center;margin-top:12px;font-size:12px">محادثات حقيقية عبر Firebase — أي لاعب Rio يدخل يشوف رسائلك</p>';
el.querySelectorAll('[data-wa]').forEach(c=>c.addEventListener('click',()=>{
const room='/rooms/'+c.dataset.wa;
chatChrome('#075e54',c.dataset.wa==='whatsapp'?'Rio العام':(WA_THREADS.find(t=>t[0]===c.dataset.wa)||[])[1]||'محادثة','WhatsApp','#ece5dd');
chatThread(room,{own:'#dcf8c6',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}));
}
function miniChat(el,head,bg,room,theme){el.innerHTML=head+'<div id="chatList" style="background:'+bg+';border-radius:12px;padding:8px 6px;min-height:170px;margin-top:8px"></div>'+chatInputHTML();chatThread(room,theme)}
function appTelegram(){
const el=$('#appBody');
el.innerHTML='<div style="background:#2AABEE;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Telegram</b><span style="display:block;font-size:12px;opacity:.85">'+escH(myName())+'</span></div>'+
'<div class="card row" style="margin-top:8px;align-items:center"><span style="flex:1"><b>قناة Rio الرسمية + المجموعة</b><br><span class="mut">محادثة عامة أونلاين</span></span></div>'+
'<div id="chatList" style="background:#e7edf2;border-radius:12px;padding:8px 6px;min-height:170px;margin-top:8px"></div>'+
''+chatInputHTML()+'';
chatThread('/rooms/telegram',{own:'#effdde',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}
function appMessenger(){
const el=$('#appBody');
el.innerHTML='<div style="background:linear-gradient(90deg,#0084ff,#9b30d9);color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Messenger</b><span style="display:block;font-size:12px;opacity:.88">'+escH(myName())+'</span></div>'+
'<div id="chatList" style="background:#f0f2f5;border-radius:12px;padding:8px 6px;min-height:170px;margin-top:8px"></div>'+
'<div class="row" style="position:sticky;bottom:0;background:#f2f2f7;padding-top:8px"><input type="text" id="chatIn" placeholder="Aa…" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px"><button class="btn" id="chatSend">إرسال</button></div>';
chatThread('/rooms/messenger',{own:'#0084ff',ownTx:'#fff',other:'#e4e6eb',otherTx:'#111'});
}
function appDiscord(){
const el=$('#appBody');
el.innerHTML='<div style="display:flex;gap:0;background:#1e1f22;border-radius:14px;overflow:hidden;color:#dbdee1">'+
'<div style="width:56px;background:#121214;display:flex;flex-direction:column;align-items:center;padding:10px 0;gap:10px"><span style="width:44px;height:44px;border-radius:16px;background:#5865F2;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff">Rio</span><span style="width:44px;height:44px;border-radius:50%;background:#2b2d31;display:flex;align-items:center;justify-content:center;font-weight:700">G</span></div>'+
'<div style="flex:1;padding:10px"><b style="color:#fff">Rio Server</b><div style="margin:8px 0;font-size:13px"><div style="background:#35373c;border-radius:8px;padding:6px 9px"># عام</div><div style="padding:6px 9px;opacity:.75"># إعلانات</div><div style="padding:6px 9px;opacity:.75"># صور-اللاعبين</div></div></div></div>'+
'<div id="chatList" style="background:#313338;border-radius:12px;padding:8px 6px;min-height:160px;margin-top:8px;color:#dbdee1"></div>'+
'<div class="row" style="position:sticky;bottom:0;background:#f2f2f7;padding-top:8px"><input type="text" id="chatIn" placeholder="راسل #عام…" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px"><button class="btn" id="chatSend">إرسال</button></div>';
chatThread('/rooms/discord',{own:'#5865F2',ownTx:'#fff',other:'#2b2d31',otherTx:'#dbdee1'});
}
function appFeedNet(k){
const el=$('#appBody'),isX=k==='x';
el.innerHTML='<div style="background:'+(isX?'#000':'#1877F2')+';color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">'+(isX?'X':'Facebook')+'</b><span style="display:block;font-size:12px;opacity:.85">'+escH(myName())+'</span></div>'+
'<div class="card" style="margin-top:8px"><div class="row"><img src="https://i.pravatar.cc/70?img=12" style="width:38px;height:38px;border-radius:50%"><input id="fdIn" type="text" placeholder="'+(isX?'شنو يصير؟':'شنو ببالك، '+escH(myName())+'؟')+'" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:13.5px"><button class="btn" id="fdPost">نشر</button></div></div>'+
'<div id="fdList"><div class="mut" style="text-align:center;padding:18px">جاي يحمل المنشورات…</div></div>';
const load=async()=>{
const d=await fbGet('/rooms/'+k+'/posts');const l=$('#fdList');if(!l){clearInterval(S.poll);return}
const arr=d?Object.values(d).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,25):[];
l.innerHTML=arr.length?arr.map(x=>'<div class="card"><div class="row" style="align-items:center"><img src="https://i.pravatar.cc/70?img='+(5+((x.ts||0)%60))+'" style="width:38px;height:38px;border-radius:50%"><span style="flex:1"><b style="font-size:13.5px">'+escH(x.u)+'</b><br><span class="mut">'+new Date(x.ts||Date.now()).toLocaleTimeString('ar-IQ',{hour:'numeric',minute:'2-digit'})+'</span></span></div><p style="line-height:1.8;margin-top:7px">'+escH(x.t)+'</p></div>').join(''):'<div class="mut" style="text-align:center;padding:20px">لا منشورات بعد — انشر أول منشور</div>';
};
load();clearInterval(S.poll);S.poll=setInterval(load,4000);
$('#fdPost').addEventListener('click',async()=>{const v=$('#fdIn').value.trim();if(!v)return;await fbPost('/rooms/'+k+'/posts',{u:myName(),t:v,ts:Date.now()});$('#fdIn').value='';load()});
}
function appSnapchat(){
chatChrome('#e8c832','Snapchat','أصدقاء وقصص','#fffbe8');
chatThread('/rooms/snapchat',{own:'#fffc00',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}
function appInsta(){
const el=$('#appBody');
const seeds=['rioinsta1','rioinsta2','rioinsta3','rioinsta4'];
const heads=['rio_photos','iraq.views','baghdad.life','travel.iraq'];
el.innerHTML='<div class="rbx-sec" style="margin-top:2px">Instagram</div>'+
'<div style="display:flex;gap:12px;overflow-x:auto;padding:4px 2px 10px">'+heads.map((h,i)=>'<span style="text-align:center;flex:0 0 auto"><img src="https://i.pravatar.cc/90?img='+(12+i*7)+'" style="width:54px;height:54px;border-radius:50%;border:2.5px solid #E1306C;padding:2px"><br><span style="font-size:11px">'+h+'</span></span>').join('')+'</div>'+
seeds.map((sd,i)=>
'<div class="card" style="padding:0;overflow:hidden"><div class="row" style="padding:9px 11px;align-items:center"><img src="https://i.pravatar.cc/60?img='+(12+i*7)+'" style="width:32px;height:32px;border-radius:50%"><b style="font-size:13px">@'+heads[i]+'</b></div>'+
'<img src="https://picsum.photos/seed/'+sd+'/600/430" style="width:100%;display:block">'+
'<div class="row" style="padding:9px 11px;align-items:center"><button class="btn gray" data-like="'+sd+'" style="padding:6px 14px">أعجبني</button><span class="mut" id="lk-'+sd+'">… إعجاب</span><span class="mut">💬 <b id="cm-'+sd+'">0</b></span><button class="btn gray" data-cmt="'+sd+'" style="padding:6px 12px">تعليق</button></div></div>').join('');
const refresh=async sd=>{const n=await fbGet('/rooms/instagram/likes/'+sd);const t=$('#lk-'+sd);if(t)t.textContent=(n||0)+' إعجاب';
const c=await fbGet('/rooms/instagram/comments/'+sd);const ct=$('#cm-'+sd);if(ct)ct.textContent=String(c?Object.keys(c).length:0)};
seeds.forEach(refresh);
el.querySelectorAll('[data-like]').forEach(b=>b.addEventListener('click',async()=>{
const sd=b.dataset.like,n=(await fbGet('/rooms/instagram/likes/'+sd))||0;
await fbPut('/rooms/instagram/likes/'+sd,n+1);refresh(sd);toast('انسجل إعجابك أونلاين');
}));
el.querySelectorAll('[data-cmt]').forEach(b=>b.addEventListener('click',async()=>{
const t=prompt('اكتب تعليقك:');if(!t)return;
await fbPost('/rooms/instagram/comments/'+b.dataset.cmt,{u:myName(),t,ts:Date.now()});refresh(b.dataset.cmt);toast('اننشر تعليقك أونلاين');
}));
}
function saveSet(){store.set('set',S.set)}
const WPS=['https://picsum.photos/seed/riowall/700/900','https://picsum.photos/seed/rioSkyline/700/900','https://picsum.photos/seed/rioPalms/700/900','https://picsum.photos/seed/rioDunes/700/900'];
function applyTheme(){
const wi=$('#wallImg');if(wi&&WPS[S.set.wp||0])wi.src=WPS[S.set.wp||0];
$('#ipad').classList.toggle('dark',!!S.set.dark);
}
const LIBCATS=[['التواصل الاجتماعي',['whatsapp','telegram','messenger','instagram','facebook','snapchat','x','discord','messages','phone','facetime']],['الترفيه',['youtube','tiktok','music','roblox','photos','camera']],['الأدوات والإنتاجية',['settings','appstore','safari','maps','weather','clock','calendar','calc','notes','files','shortcuts']]];
function spotRender(q){
const allA=APPS.concat(S.installed.filter(id=>EXTRA[id]).map(id=>({id:'x_'+id,n:EXTRA[id].n,ic:EXTRA[id].ic,extra:id}))).filter(a=>!S.fx||!S.fx.searchApps||S.fx.searchApps[a.id]!==false);
const name=a=>a.extra?EXTRA[a.extra].n:a.n;
const cell=a=>'<button class="app" data-spotapp="'+a.id+'" style="background:none;border:none;cursor:pointer">'+icImg(ICONS[a.ic])+'<span class="nm">'+name(a)+'</span></button>';
let h='';
if(q){const list=allA.filter(a=>name(a).toLowerCase().includes(q.toLowerCase())||a.id.includes(q.toLowerCase()));
h=list.length?'<div class="spotGrid">'+list.map(cell).join('')+'</div>':'';
let ex='';
if(S.notes&&S.notes.includes(q))ex+='<div class="spotRes" data-spotopen="notes"><b>ملاحظة</b><span>'+escH(S.notes.slice(0,60))+'…</span></div>';
if(q.includes('صور')||q.toLowerCase().includes('photo'))ex+='<div class="spotRes" data-spotopen="photos"><b>الصور</b><span>'+arabNum(S.photos.length+8)+' صورة بالمعرض</span></div>';
if((S.alarms||[]).length&&(q.includes('منبه')||q.toLowerCase().includes('alarm')))ex+='<div class="spotRes" data-spotopen="clock"><b>المنبه</b><span>'+S.alarms.filter(a=>a.on).map(a=>arabNum(a.t)).join('، ')+'</span></div>';
h+=ex;if(!h)h='<div style="text-align:center;padding:22px;opacity:.8">لا نتائج</div>';}
else h='<div style="font-weight:700;margin-top:16px;font-size:15px">مكتبة التطبيقات</div>'+LIBCATS.map(c=>{
const items=allA.filter(a=>c[1].includes(a.extra||a.id));
return items.length?'<div style="margin-top:14px"><div style="font-size:13px;opacity:.85;font-weight:600">'+c[0]+'</div><div class="spotGrid">'+items.map(cell).join('')+'</div></div>':''}).join('');
$('#spotBody').innerHTML=h;
$('#spotBody').querySelectorAll('[data-spotapp]').forEach(b=>b.addEventListener('click',()=>{$('#spot').classList.remove('open');
const id=b.dataset.spotapp;id.startsWith('x_')?openExtra(id.slice(2)):openApp(id);}));
$('#spotBody').querySelectorAll('[data-spotopen]').forEach(b=>b.addEventListener('click',()=>{$('#spot').classList.remove('open');openApp(b.dataset.spotopen,null)}));
}
$('#spotPill').addEventListener('click',()=>{$('#spot').classList.add('open');spotRender('');setTimeout(()=>{const i=$('#spotInp');i&&i.focus()},60)});
$('#spotClose').addEventListener('click',()=>$('#spot').classList.remove('open'));
$('#spotInp').addEventListener('input',e=>spotRender(e.target.value.trim()));
document.addEventListener('click',e=>{const b=e.target.closest('[data-dm]');if(!b)return;S.set.dark=b.dataset.dm==='1';saveSet();applyTheme();if(S.cur==='settings')appSettings($('#appBody'));toast(S.set.dark?'انفعل الوضع الليلي':'انفعل الوضع الفاتح')});
applyTheme();
renderHome();renderStatus();
setInterval(renderStatus,20000);
