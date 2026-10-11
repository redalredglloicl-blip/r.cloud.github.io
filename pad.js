S.msgs=[];store.set('msgs',[]);
S.notifs=store.get('notifs',[]);
S.myPic=store.get('myPic','');
S.locked=true;
const IOS_EASE='cubic-bezier(.32,.72,.24,1)';
const IOS_SPRING='cubic-bezier(.30,1.08,.36,1)';
function iconImgOf(el){if(!el)return null;const im=el.tagName==='IMG'?el:el.querySelector&&el.querySelector('img');if(!im)return null;return im.currentSrc||im.src}
function showAppWin(fromEl){
const win=$('#appWin');S._from=fromEl||null;const tok=(S._anim=(S._anim||0)+1);
win.style.opacity='';win.style.borderRadius='';
win.classList.add('open');document.body.classList.add('appopen');syncPill();
$('#screen').classList.add('appzoom');
const scr=$('#screen').getBoundingClientRect();
const r=(fromEl&&fromEl.getBoundingClientRect)?fromEl.getBoundingClientRect():null;
const hasIcon=r&&r.width>=8&&r.right>scr.left&&r.left<scr.right&&r.top<scr.bottom&&r.bottom>scr.top;
win.style.transformOrigin='0 0';win.style.overflow='hidden';win.style.borderRadius='';win.style.boxShadow='';
if(hasIcon){
win.style.transition='none';win.style.opacity='1';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(4)+','+((r.height/scr.height)).toFixed(4)+')';
win.style.borderRadius=((15*scr.width/Math.max(1,r.width)).toFixed(0))+'px/'+((15*scr.height/Math.max(1,r.height)).toFixed(0))+'px';
win.style.boxShadow='0 16px 48px rgba(0,0,0,.38)';
win.getBoundingClientRect();
win.style.transition='transform .42s '+IOS_SPRING+',border-radius .42s '+IOS_SPRING+',box-shadow .42s ease';
win.style.transform='translate(0px,0px) scale(1,1)';
win.style.borderRadius='0px';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin=''},450);
}else{
win.style.transition='none';win.style.opacity='0';win.style.transform='scale(.94)';
win.getBoundingClientRect();
win.style.transition='opacity .25s ease,transform .35s '+IOS_SPRING;
win.style.opacity='1';win.style.transform='none';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.opacity=''},380);
}
}
function snapCur(){if(!S.app)return;try{S.snaps=S.snaps||{};S.snaps[S.app]=$('#appBody').innerHTML.replace(/ id="[^"]*"/g,'').slice(0,60000)}catch(e){}}
function noteRunning(id,title,ic){if(!id)return;S.running=S.running||[];S.running=S.running.filter(r=>r.id!==id);S.running.unshift({id,title,ic})}
function armHome(){S._armUntil=Date.now()+4000;const hb=$('#homeBar');hb.classList.add('armed');setTimeout(()=>{if(Date.now()>(S._armUntil||0))hb.classList.remove('armed')},4100)}
function disarmHome(){S._armUntil=0;$('#homeBar').classList.remove('armed')}
function closeApp(){try{window.closeGptDrawer&&window.closeGptDrawer()}catch(e){}
appHeadReset();
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
win.style.transition='transform .38s '+IOS_EASE+',border-radius .38s '+IOS_EASE+',opacity .1s ease .3s,box-shadow .38s';
win.style.borderRadius=((19*scr.width/Math.max(1,r.width)).toFixed(0))+'px/'+((19*scr.height/Math.max(1,r.height)).toFixed(0))+'px';win.style.boxShadow='0 18px 50px rgba(0,0,0,.35)';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(3)+','+((r.height/scr.height)).toFixed(3)+')';
win.style.opacity='0';
setTimeout(()=>{if(S._anim!==tok)return;
win.classList.remove('open');document.body.classList.remove('appopen');$('#screen').classList.remove('appzoom');syncPill();win.style.transition='';win.style.transform='';win.style.opacity='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin='';S._from=null;
const land=back&&(back.closest?back.closest('.app'):null);if(land&&land.animate)land.animate([{transform:'scale(1)'},{transform:'scale(1.09)'},{transform:'scale(1)'}],{duration:200,easing:'ease-out'})},400);
}
function renderSwitcher(){
const track=$('#swTrack');const list=S.running||[];
track.innerHTML=list.length?list.map((r,ix)=>{const snap=(S.snaps||{})[r.id];
return '<div class="swCard" data-sw="'+r.id+'" style="animation-delay:'+(ix*55)+'ms"><div class="swPrev">'+(snap?'<div class="swSnap">'+snap+'</div>':'<div class="swBig">'+icImg(ICONS[r.ic]||'')+'</div>')+'</div><div class="swLabel">'+icImg(ICONS[r.ic]||'')+'<b>'+r.title+'</b></div></div>'}).join(''):'<div style="color:#fff;text-align:center;width:100%;padding:40px 0;font-size:14px">لا تطبيقات شغالة بالخلفية</div>';
track.querySelectorAll('[data-sw]').forEach(c=>{
let sx=null,sy=null,pid=null,mode=null;
c.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;pid=e.pointerId;mode=null});
c.addEventListener('pointermove',e=>{
if(sx===null||e.pointerId!==pid)return;
const dx=e.clientX-sx,dy=sy-e.clientY;
if(!mode){
if(dy>14){mode='kill';try{c.setPointerCapture(pid)}catch(_){}c.style.transition='none'}
else if(Math.abs(dx)>14||dy<-14){mode='scroll'}
}
if(mode==='kill'){const d=Math.max(0,dy);c.style.transform='translateY('+(-d)+'px) scale('+(1-Math.min(.1,d/1100)).toFixed(3)+')';c.style.opacity=String(1-Math.min(.55,d/560))}
});
function cend(e){
if(sx===null||(e&&e.pointerId!==pid))return;
const dx=e.clientX-sx,dy=sy-e.clientY,wasKill=mode==='kill';
sx=null;sy=null;mode=null;c.style.transition='';
if(wasKill&&dy>85){c.style.transform='translateY(-115%) scale(.86)';c.style.opacity='0';const id=c.dataset.sw;setTimeout(()=>killApp(id),170)}
else if(wasKill){c.style.transform='';c.style.opacity=''}
else if(Math.abs(dx)<12&&Math.abs(dy)<12){const id=c.dataset.sw;const ic=c.querySelector('.swLabel .ic');dismissSw();if(id!==S.app){id.startsWith('x_')?openExtra(id.slice(2),ic):openApp(id,ic)}}
else{c.style.transform='';c.style.opacity=''}
}
c.addEventListener('pointerup',cend);
c.addEventListener('pointercancel',cend);
});
}
function dismissSw(){$('#switcher').classList.remove('open');document.body.classList.remove('swopen')}
function openSwitcher(){snapCur();renderSwitcher();$('#switcher').classList.add('open');document.body.classList.add('swopen')}
$('#switcher').addEventListener('click',e=>{if(!e.target.closest('.swCard'))dismissSw()});
let _swY=null;
$('#switcher').addEventListener('touchstart',e=>{_swY=e.touches[0].clientY},{passive:true});
$('#switcher').addEventListener('touchend',e=>{if(_swY===null)return;const dy=e.changedTouches[0].clientY-_swY;_swY=null;if(dy>45)dismissSw()});
function killApp(id){S.running=(S.running||[]).filter(r=>r.id!==id);if(S.snaps)delete S.snaps[id];if(S.app===id){dismissSw();closeApp()}else renderSwitcher();toast('انقتل التطبيق من الخلفية')}
function openApp(id,fromEl){try{window.closeGptDrawer&&window.closeGptDrawer()}catch(e){}
appHeadReset();hideCC();clearInterval(S.poll);
if(gateBlock(id))return;
runAutos('appopen',id);
if(id==='phone'){toast('المكالمات داخل FaceTime هنا');id='facetime'}
if(id&&id.startsWith('x_')){const k=id.slice(2);return openExtra(k,fromEl)}
snapCur();S.app=id; tickUse(id);noteRunning(id,(APPS.find(a=>a.id===id)||{}).n||id,(APPS.find(a=>a.id===id)||{}).ic||id);
const names={facetime:'FaceTime',camera:'Camera',photos:'Photos',messages:'Messages',appstore:'App Store',safari:'Safari',tiktok:'TikTok',maps:'Maps',weather:'Weather',calendar:'Calendar',music:'Music',clock:'Clock',notes:'Notes',calc:'Calculator',maint:'الصيانة',voicememos:'Voice Memos',settings:'Settings',files:'Files',shortcuts:'Shortcuts'};
$('#appTitle').textContent=names[id]||id;
showAppWin(fromEl);
({facetime:appFaceTime,camera:appCamera,photos:appPhotos,messages:appMessages,appstore:appStore,safari:appSafari,tiktok:appTikTok,maps:appMaps,weather:appWeather,calendar:appCalendar,music:appMusic,clock:appClock,notes:appNotes,calc:appCalc,maint:appMaint,voicememos:appVoiceMemos,settings:appSettings,files:appFiles,shortcuts:appShortcuts}[id]||(()=>{}))($('#appBody'));
}
const _ab=$('#appBack');if(_ab)_ab.addEventListener('click',e=>{e.stopPropagation();closeApp()});
function syncPill(){const pill=$('#spotPill');if(!pill)return;const lockOn=$('#lock').classList.contains('show');const tr=$('#pagesTrack');let onLib=false;if(tr&&tr.children.length>1){onLib=Math.round(tr.scrollLeft/tr.clientWidth)>=tr.children.length-1}pill.style.display=($('#appWin').classList.contains('open')||lockOn||onLib)?'none':'flex'}
new MutationObserver(syncPill).observe($('#lock'),{attributes:true,attributeFilter:['class']});
$('#homeBar').addEventListener('click',()=>{
if($('#switcher').classList.contains('open')){dismissSw();if($('#appWin').classList.contains('open'))closeApp();return}
if(!$('#appWin').classList.contains('open')){openSwitcher();return}
closeApp();
});
let G=null;
const _scr=$('#screen');
_scr.addEventListener('touchstart',e=>{
if(S.locked||$('#switcher').classList.contains('open')){G=null;return}
const r=_scr.getBoundingClientRect(),tt=e.touches[0];
if(tt.clientY<r.bottom-34){G=null;return}
G={y0:tt.clientY,y:tt.clientY,t0:Date.now(),timer:null};
G.timer=setTimeout(()=>{if(G&&G.y0-G.y>36){var _w=document.querySelector('#appWin');_w.style.transition='';_w.style.transform='';openSwitcher();G=null}},340);
},{passive:true});
_scr.addEventListener('touchmove',e=>{
if(!G)return;G.y=e.touches[0].clientY;const dy=G.y0-G.y;
const win=$('#appWin');
if(win.classList.contains('open')&&dy>0){win.style.transition='none';const pp=Math.min(dy,340);win.style.transform='translateY('+(-pp)+'px) scale('+(1-pp/2600).toFixed(4)+')';win.style.borderRadius=Math.min(30,pp/11)+'px';win.style.opacity=String(1-pp/760)}
},{passive:true});
_scr.addEventListener('touchend',e=>{
if(!G)return;clearTimeout(G.timer);
const endY=e.changedTouches[0]?e.changedTouches[0].clientY:G.y;
const dy=G.y0-endY;const vel=dy/Math.max(1,Date.now()-(G.t0||Date.now()));
const win=$('#appWin');G=null;
if($('#switcher').classList.contains('open'))return;
if(win.classList.contains('open')){
if(dy>100||vel>0.45){closeApp()}
else{
win.style.transition='transform .42s cubic-bezier(.32,.72,0,1),border-radius .42s,opacity .32s';win.style.transform='';win.style.borderRadius='';win.style.opacity='';
const tkA=S._anim;setTimeout(()=>{if(S._anim===tkA){win.style.transition='';win.style.transform='';win.style.borderRadius='';win.style.opacity=''}},440);
}
}else if(dy>55)openSwitcher();
});
function extraMeta(k){try{if(typeof EXTRA!=='undefined'&&EXTRA[k])return{n:EXTRA[k].n,ic:EXTRA[k].ic}}catch(e){}try{if(typeof GAMES!=='undefined'){const kk=String(k).replace(/^dl_/,'');const _g=GAMES.find(x=>x.k===kk);if(_g)return{n:_g.n,ic:kk}}}catch(e){}return null}
function openExtra(k,fromEl){
appHeadReset();
const _gg=GAMES.find(x=>x.k===k);
if(_gg){snapCur();S.app='x_'+k;noteRunning('x_'+k,_gg.n,k);$('#appTitle').textContent=_gg.n;showAppWin(fromEl);return appGame(k)}
snapCur();S.app='x_'+k;noteRunning('x_'+k,EXTRA[k].n,EXTRA[k].ic);$('#appTitle').textContent=EXTRA[k].n;showAppWin(fromEl);
if(k==='whatsapp')return appWhatsApp();
if(k==='telegram')return appTelegram();
if(k==='messenger')return appMessenger();
if(k==='discord')return appDiscord();
if(k==='facebook'||k==='x')return appFeedNet(k);
if(k==='snapchat')return appSnapchat();
if(k==='instagram')return appInsta();
if(k==='youtube'){S.ytView='home';return appYouTubeX()}
if(k==='chatgpt')return appChatGPT();

$('#appBody').innerHTML='<div class="card" style="text-align:center;padding:28px 14px"><div style="display:flex;justify-content:center;margin-bottom:10px">'+IC[EXTRA[k].ic]()+'</div><div class="big">'+EXTRA[k].n+'</div><p class="mut" style="margin-top:6px">انثبت على الآيفون ويشتغل من الشاشة الرئيسية.</p><button class="btn" style="margin-top:12px" onclick="closeApp()">تمام</button></div>';
}
const FRIENDS=[['Eno','#e74c3c'],['Ahmad','#3498db'],['Sara','#e84393'],['Omar','#2ecc71'],['Lina','#f39c12'],['Yusuf','#9b59b6'],['Nora','#1abc9c'],['Khalid','#e67e22']];
function playFakeGame(name){toast('انسحبت اللعبة الوهمية — ألعابنا الحقيقية جاية قريباً')}
let selfieMode=false;
let camStream=null;
async function appCamera(el){
el.innerHTML='<div style="text-align:center;padding:60px 20px"><div style="font-size:17px;font-weight:700;margin-bottom:8px">قيد التطوير</div><p class="mut" style="font-size:13px;line-height:1.9">تطبيق الكاميرا بعدو قيد التطوير<br>راح يتوفر بتحديث قادم</p></div>';
}
function stopCam(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null}}
function phMeta(){try{return JSON.parse(localStorage.getItem('rio-phmeta')||'{}')}catch(e){return{}}}

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
function emptyChats(title,head){const el=document.querySelector('#appBody');el.innerHTML=head+'<div style="text-align:center;padding:64px 22px"><div style="width:76px;height:76px;border-radius:24px;background:#f1f1f4;display:flex;align-items:center;justify-content:center;margin:0 auto 18px">'+si('comment',30,'#8e8e93')+'</div><b style="font-size:18px">'+title+'</b><p class="mut" style="font-size:13.5px;line-height:2.1;margin:10px 0 0">لا توجد محادثات بعد<br>قريباً: ابحث باليوزر وابدأ محادثة</p></div>';}
const IM_THREADS=[];
function appMessages(el){
if(S.imT==null)S.imT=-1;
if(S.imT<0){emptyChats('رسائل','<div class="row" style="align-items:center;margin-bottom:8px"><b style="font-size:22px;flex:1">رسائل</b></div>');return}
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
if(S.setPage==='lockcustom'){
const lwp=(S.set.lockWp==null?-1:S.set.lockWp),lck=(S.set.lockClock==null?0:S.set.lockClock);
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>'+
'<div class="rbx-sec">خلفية شاشة القفل</div><div class="setgroup"><div class="setrow" data-lockwp="-1" style="cursor:pointer"><span style="flex:1">مثل الشاشة الرئيسية</span>'+(lwp===-1?'<span style="color:#0a84ff">✓</span>':'')+'</div></div>'+
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0">'+WPS.map((w,i)=>'<img src="'+w+'" data-lockwp="'+i+'" style="width:100%;height:140px;object-fit:cover;border-radius:16px;cursor:pointer;'+(lwp===i?'outline:3.5px solid #0a84ff':'')+'">').join('')+'</div>'+
'<div class="rbx-sec">شكل الساعة</div><div class="setgroup">'+['كلاسيكية','عريضة وثقيلة','رفيعة وأنيقة'].map((c,i)=>'<div class="setrow" data-lockck="'+i+'" style="cursor:pointer"><span style="flex:1">'+c+'</span>'+(lck===i?'<span style="color:#0a84ff">✓</span>':'')+'</div>').join('')+'</div>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});
el.querySelectorAll('[data-lockwp]').forEach(x=>x.addEventListener('click',()=>{S.set.lockWp=+x.dataset.lockwp;saveSet();applyTheme();appSettings(el);toast('اتبدلت خلفية القفل')}));
el.querySelectorAll('[data-lockck]').forEach(x=>x.addEventListener('click',()=>{S.set.lockClock=+x.dataset.lockck;saveSet();applyTheme();appSettings(el)}));
return;
}
if(S.setPage==='about'){
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button><div class="setgroup">'+
row('الاسم','', 'iPhone')+row('طراز الجهاز','', 'iPhone 16 Pro')+row('نظام التشغيل','', 'iOS 17')+
row('السعة','', '128 GB')+row('المساحة المتوفرة','', '115.6 GB')+
row('الرقم التسلسلي','', 'DMPX42LKDNQH')+row('المشغل','', 'Zain')+'</div>';
$('#setBack').addEventListener('click',()=>{S.setPage='main';appSettings(el)});return;
}
if(S.setPage==='batteryhealth'){
const mc=Math.max(72,Math.round(S.batt.maxCap||100));
const degraded=mc<80;
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ البطارية</button>'+
'<div class="rbx-sec">صحة البطارية</div><div class="setgroup">'+
'<div class="setrow"><span style="flex:1"><b>الحد الأقصى للقدرة</b><br><span class="mut" style="font-size:12px">مقياس سعة البطارية مقارنةً بوقت شرائها</span></span><b style="font-size:17px">'+arabNum(mc)+'٪</b></div></div>'+
'<p class="mut" style="font-size:12.5px;line-height:1.9;margin:4px 2px 12px">هذا مقياس لسعة البطارية نسبةً إلى وقت كانت جديدة. السعة الأقل تعني ساعات استخدام أقل بين عمليات الشحن.</p>'+
'<div class="rbx-sec">قدرة الأداء القصوى</div><div class="setgroup"><div class="setrow"><span style="flex:1;font-size:13px;line-height:1.8">'+(degraded?'تدهورت صحة البطارية بشكل ملحوظ. قد تحتاج إلى استبدال البطارية لاستعادة الأداء الكامل.':'البطارية تدعم حالياً ذروة الأداء الطبيعي.')+'</span><span style="color:'+(degraded?'#ff9f0a':'#34c759')+';font-size:18px">'+(degraded?'⚠':'✓')+'</span></div></div>'+
'<div class="rbx-sec">الشحن</div><div class="setgroup">'+
row('شحن البطارية المحسّن',sq('#34c759','battery-charging',15),'<label class="switch"><input type="checkbox" id="swOptChg" '+(S.set.optChg?'checked':'')+'><i></i></label>')+'</div>'+
'<p class="mut" style="font-size:12px;line-height:1.8;margin:4px 2px">يقلل تآكل البطارية بتقليل الوقت الذي تكون فيه مشحونة بالكامل.</p>';
$('#setBack').addEventListener('click',()=>{S.setPage='battery';appSettings(el)});
const oc=$('#swOptChg');if(oc)oc.addEventListener('change',e=>{S.set.optChg=e.target.checked;store.set('set',S.set);toast(e.target.checked?'انفعل الشحن المحسّن':'انطفأ الشحن المحسّن')});
return;
}
if(S.setPage==='battery'){
const useObj=((S.fx.use||{}).sec)||{};
const rows=Object.entries(useObj).filter(r=>r[1]>4).sort((a,b)=>b[1]-a[1]).slice(0,8);
const tot=rows.reduce((t,r)=>t+r[1],0),mx=Math.max(1,...rows.map(r=>r[1]));
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>'+
'<div class="card" style="text-align:center"><div style="font-size:36px;font-weight:700">'+arabNum(Math.round(S.batt.pct))+'٪</div><div class="mut">'+(S.batt.charging?'جاي ينشحن':'غير موصول بالشاحن')+'</div></div>'+
'<div class="setgroup">'+row('نمط الطاقة المنخفضة',sq('#f5c518','battery-charging',15),'<label class="switch"><input type="checkbox" id="swLpm" '+(s.lpm?'checked':'')+'><i></i></label>')+
row('الشحن الآن',sq('#34c759','flash',15),'<label class="switch"><input type="checkbox" id="swChg" '+(S.batt.charging?'checked':'')+'><i></i></label>')+'</div>'+
'<div class="setgroup">'+row('صحة البطارية',sq('#ff9f0a','heart',15),'<span class="mut">'+arabNum(Math.max(72,Math.round(S.batt.maxCap||100)))+'٪</span>'+arrow,'batteryhealth')+'</div>'+'<div class="rbx-sec">استهلاك البطارية — آخر 24 ساعة</div><div class="setgroup">'+(rows.length?rows.map(r=>{const m=appMeta(r[0]);return '<div class="setrow" style="align-items:center;gap:10px"><span style="width:32px;height:32px;flex:0 0 auto">'+icImg(ICONS[m.ic]||ICONS.settings)+'</span><span style="flex:1;min-width:0"><b style="font-size:14px">'+m.n+'</b><br><span class="mut" style="font-size:12px">'+arabNum(Math.round(r[1]/tot*100))+'٪ من استهلاك اليوم</span></span><span style="width:80px;height:7px;background:#e3e3e8;border-radius:4px;overflow:hidden;flex:0 0 auto"><span style="display:block;height:100%;width:'+Math.round(r[1]/mx*100)+'%;background:#34c759"></span></span><span class="mut" style="width:54px;text-align:left;font-size:12.5px;flex:0 0 auto">'+arabNum(Math.max(1,Math.round(r[1]/60)))+' د</span></div>'}).join(''):'<div class="setrow mut">استخدم تطبيقاتك وشوف استهلاكها هنا</div>')+'</div>';
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
'<div class="card" style="display:flex;gap:12px;align-items:center;padding:13px;cursor:pointer" id="profCard"><span id="profAv" style="position:relative;flex:0 0 auto;cursor:pointer">'+meAv(52)+'<span style="position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#0a84ff;border:2px solid #fff;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">+</span></span><span style="flex:1"><b style="font-size:16px">'+S.apple.name+'</b><br><span class="mut">'+S.apple.id+' — iCloud</span></span></div>':
'<div class="card" style="display:flex;gap:12px;align-items:center;padding:13px;cursor:pointer" id="profCard"><span id="profAv" style="position:relative;flex:0 0 auto;cursor:pointer">'+meAv(52)+'<span style="position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#0a84ff;border:2px solid #fff;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">+</span></span><span style="flex:1"><b style="font-size:15px">تسجيل الدخول إلى iPad</b><br><span class="mut">iCloud وApp Store والرسائل</span></span></div>';
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
row('خلفية الشاشة',sq('#5e5ce6','image',15),arrow,'wall')+row('تخصيص شاشة القفل',sq('#ff2d55','lock-closed',15),arrow,'lockcustom')+'</div>'+
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
const pa=$('#profAv');if(pa)pa.addEventListener('click',e=>{e.stopPropagation();pickMyPic()});
const so=$('#signOutBtn');if(so)so.addEventListener('click',()=>{signOutApple();appSettings(el)});
const bind=(id,fn)=>{const e2=$(id);if(e2)e2.addEventListener('change',fn)};
bind('#swAir',e=>{S.set.airplane=e.target.checked;store.set('set',S.set);renderStatus()});
bind('#swBt',e=>{S.set.bt=e.target.checked;store.set('set',S.set);renderStatus()});
bind('#swDnd',e=>{S.set.dnd=e.target.checked;store.set('set',S.set);renderCC&&null});
const br=$('#setBright');if(br)br.addEventListener('input',e=>{S.set.bright=+e.target.value;store.set('set',S.set);renderStatus()});
el.querySelectorAll('[data-setact]').forEach(r=>r.addEventListener('click',e=>{
if(e.target.closest('label.switch'))return;
const a=r.dataset.setact;
if(['about','battery','batteryhealth','lockcustom','wifi','wall','ncset','focus','screen','acc','home','lockset','bluetooth','cellular','hotspot','vpn','sounds','general','camera','display','search','siri','faceid','sos','privacy','gamecenter','wallet','passwords','appshub','appdetail','gupdate','gstorage','gdatetime','gkeyboard','glang','gairdrop','greset'].includes(a)){S.setPage=a;appSettings(el)}
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
{k:'chatgpt',n:'ChatGPT',dev:'OpenAI',cat:'إنتاجية',ver:'1.2026.1',size:'48 MB',desc:'مساعد ذكي حقيقي يجاوبك فوراً — مربوط بنموذج مجاني بدون حساب.'},
{k:'youtube',n:'YouTube',dev:'Google LLC',cat:'فيديو وموسيقى',ver:'20.11.3',size:'156 MB',desc:'شاهد الفيديوات، علق مباشرة، وشاهد مع أصدقائك بنفس اللحظة.'},
];
const GAMES=[
{k:'minecraft',n:'عالم المكعبات',rt:4.8,rc:'12.4K',age:'9+',dev:'Games',cat:'ألعاب',ver:'1.0',size:'1.4 GB',price:5,url:'https://vincent-p-essy.github.io/minecraft-clone/',desc:'عالم مكعبات لا نهائي بجرافيك ثلاثي الأبعاد — ابنِ، استكشف، وعيش مغامرتك الخاصة ليل ونهار.'},
{k:'wembleguys',n:'Wemble Guys',rt:4.6,rc:'8.1K',age:'9+',dev:'Games',cat:'ألعاب',ver:'1.0',size:'2.1 GB',price:8,url:'https://grep-many.github.io/wemble-guys/',desc:'تحدَّ نفسك على منصات سداسية تنهار تحتك — لعبة منصات مرحة بجرافيك ثلاثي الأبعاد.'},
{k:'moonrover',n:'روفر القمر',rt:4.7,rc:'5.3K',age:'4+',dev:'Games',cat:'ألعاب',ver:'1.0',size:'1.8 GB',price:5,url:'https://winchxyz.github.io/moon-rover/',desc:'قُد مركبة فضائية على سطح القمر — مهمات علمية واستكشاف بجرافيك ثلاثي الأبعاد.'},
{k:'bunny',n:'Bunny Runner',rt:4.9,rc:'21.7K',age:'4+',dev:'Games',cat:'ألعاب',ver:'1.0',size:'1.1 GB',price:9,url:'https://bunny.omsingh.me/',desc:'اقفز وانزلق مع الأرنب عبر 3 مسارات — لعبة ركض لطيفة بجرافيك ثلاثي الأبعاد.'},
{k:'orbit',n:'ORBIT',rt:4.5,rc:'3.9K',age:'4+',dev:'Games',cat:'ألعاب',ver:'1.0',size:'2.6 GB',price:7,url:'https://jaydemks.github.io/orbit_game/',desc:'اثنِ الجاذبية ودحرج عبر 24 مرحلة ألغاز ثلاثية الأبعاد مصممة يدوياً.'},
];
function storeRow(a){
const inst=S.installed.includes(a.k),hiddenB=false;
return '<div class="card row" style="align-items:center"><span style="flex:0 0 auto">'+icImg(ICONS[a.k])+'</span><span style="flex:1;cursor:pointer" data-detail="'+a.k+'"><span class="big" style="font-size:15px">'+a.n+'</span><br><span class="mut">'+a.cat+' — '+a.dev+'</span></span><button class="btn '+(inst?'gray':'')+'" data-get="'+a.k+'" style="border-radius:16px;padding:7px 18px">'+(inst?'فتح':'احصل')+'</button></div>';
}
function gameRow(g){
const inst=S.installed.includes(g.k);
const freeFirst=!S.gameFree[g.k]&&!inst;
const isDl=S.dl&&S.dl.k===g.k;
return '<div class="card row" style="align-items:center"><span style="flex:0 0 auto">'+icImg(ICONS[g.k])+'</span><span style="flex:1;cursor:pointer" data-detail="'+g.k+'"><span class="big" style="font-size:15px">'+g.n+'</span><br><span class="mut">'+g.cat+' · '+g.size+'</span><br>'+(freeFirst?'<span style="font-size:12px;color:#34c759;font-weight:700">مجاناً لأول مرة</span> <span class="mut" style="font-size:12px;text-decoration:line-through">$'+g.price+'</span>':'<b style="font-size:13px;color:#0a84ff">$'+g.price+'</b>')+'</span><button class="btn '+(inst?'gray':'')+'" data-get="'+g.k+'" style="border-radius:16px;padding:7px 18px;min-width:88px">'+(isDl?dlBtnHTML(g.k):(inst?'فتح':(freeFirst?'مجاناً':'$'+g.price)))+'</button></div>';
}
function anyRow(a){return a.price!=null?gameRow(a):storeRow(a)}
function initSwitches(root){
(root||document).querySelectorAll('.switch').forEach(sw=>{
if(sw._asw)return;sw._asw=1;
const inp=sw.querySelector('input'),track=sw.querySelector('i');
if(!inp||!track)return;
const RANGE=20;let sx=0,dragging=false,moved=false,lpT=0,pid=null;
function baseX(){return inp.checked?RANGE:0}
sw.addEventListener('pointerdown',e=>{
if(dragging)return;dragging=true;moved=false;sx=e.clientX;pid=e.pointerId;
try{sw.setPointerCapture(pid)}catch(_){}
sw.classList.add('drag');clearTimeout(lpT);
lpT=setTimeout(()=>{if(dragging&&!moved)sw.classList.add('hold')},380);
e.preventDefault();
});
sw.addEventListener('pointermove',e=>{
if(!dragging||e.pointerId!==pid)return;
const dx=e.clientX-sx;
if(!moved&&Math.abs(dx)>5){moved=true;clearTimeout(lpT);sw.classList.remove('hold')}
if(moved){const x=Math.max(-5,Math.min(RANGE+5,baseX()+dx));sw.style.setProperty('--kx',x+'px');track.style.background=x>RANGE/2?'#34c759':''}
});
function end(e){
if(!dragging||(e&&e.pointerId!==pid))return;
dragging=false;clearTimeout(lpT);sw.classList.remove('hold','drag');
sw.style.removeProperty('--kx');track.style.background='';
if(moved){if(Math.abs(e.clientX-sx)>RANGE/2)inp.checked=!inp.checked}
else inp.checked=!inp.checked;
moved=false;
inp.dispatchEvent(new Event('change',{bubbles:true}));
}
sw.addEventListener('pointerup',end);
sw.addEventListener('pointercancel',end);
});
}
let _swQ=false;
new MutationObserver(()=>{if(_swQ)return;_swQ=true;requestAnimationFrame(()=>{_swQ=false;initSwitches(document)})}).observe(document.body,{childList:true,subtree:true});
initSwitches(document);
function lgTabs(bar,tabs,cur,onPick){
const pill=bar.querySelector('.lg-pill'),btns=[...bar.querySelectorAll('.lg-tab')];
function place(i,instant){const b=btns[i];if(!b)return;const br=b.getBoundingClientRect(),cr=bar.getBoundingClientRect();if(instant)pill.style.transition='none';pill.style.transform='translateX('+(br.left-cr.left)+'px)';pill.style.width=br.width+'px';if(instant)requestAnimationFrame(()=>{pill.style.transition=''})}
function setOn(i){btns.forEach((b,j)=>b.classList.toggle('on',j===i))}
place(cur,true);setOn(cur);
let drag=false,pid=null,pend=cur;
function moveTo(x){const cr=bar.getBoundingClientRect(),cx=Math.max(cr.left,Math.min(cr.right,x)),bw=btns[cur].offsetWidth;const px=Math.max(0,Math.min(cr.width-bw,cx-cr.left-bw/2));pill.style.transform='translateX('+px+'px)';pill.style.width=bw+'px';let best=cur,bd=1e9;btns.forEach((b,j)=>{const r=b.getBoundingClientRect(),d=Math.abs(cx-(r.left+r.width/2));if(d<bd){bd=d;best=j}});if(best!==pend){pend=best;setOn(best)}}
bar.addEventListener('pointerdown',e=>{const t=e.target.closest('.lg-tab');if(!t||drag)return;drag=true;pid=e.pointerId;pend=btns.indexOf(t);try{bar.setPointerCapture(pid)}catch(_){}pill.classList.add('bloom');pill.style.transition='none';setOn(pend);moveTo(e.clientX);e.preventDefault()});
bar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==pid)return;moveTo(e.clientX)});
function end(e){if(!drag||(e&&e.pointerId!==pid))return;drag=false;pill.classList.remove('bloom');pill.style.transition='';cur=pend;place(cur,false);setOn(cur);onPick(tabs[cur])}
bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);
window.addEventListener('resize',()=>place(cur,true));
}
function appStore(el){
S.gameFree=store.get('gameFree',{});
if(!S.storeTab)S.storeTab='games';
const tab=S.storeTab;
if(S.storeDetail){const a=STORE.concat(GAMES).find(x=>x.k===S.storeDetail);if(a){
if(a.price!=null){gameDetail(a,el);return}
const _isG=a.price!=null,_inst=S.installed.includes(a.k),_ff=_isG&&!S.gameFree[a.k]&&!_inst;
const inst=S.installed.includes(a.k);
el.innerHTML='<button class="back" id="stBack" style="margin-bottom:8px">‹ رجوع</button>'+
'<div class="row" style="align-items:center;gap:12px"><span>'+icImg(ICONS[a.k])+'</span><span style="flex:1"><span class="big" style="font-size:18px">'+a.n+'</span><br><span class="mut">'+a.dev+'</span></span><button class="btn" id="stGet" style="border-radius:16px;padding:8px 20px">'+(_inst?'فتح':(_isG?(_ff?'مجاناً':'$'+a.price):'احصل'))+'</button></div>'+
'<div class="rbx-sec">الوصف</div><p style="line-height:1.8">'+a.desc+'</p>'+
'<div class="rbx-sec">المعلومات</div><div class="setgroup">'+
'<div class="setrow"><span style="flex:1">الإصدار</span><span class="mut">'+a.ver+'</span></div>'+
'<div class="setrow"><span style="flex:1">الحجم</span><span class="mut">'+a.size+'</span></div>'+
'<div class="setrow"><span style="flex:1">المطور</span><span class="mut">'+a.dev+'</span></div>'+
'<div class="setrow"><span style="flex:1">التصنيف</span><span class="mut">'+a.cat+'</span></div>'+(_isG?'<div class="setrow"><span style="flex:1">السعر</span><span>'+(_ff?'<b style="color:#34c759">مجاناً لأول مرة</b> <span class="mut" style="text-decoration:line-through">$'+a.price+'</span>':'<b>$'+a.price+'</b>')+'</span></div>':'')+'</div>';
$('#stBack').addEventListener('click',()=>{S.storeDetail=null;appStore(el)});
$('#stGet').addEventListener('click',e=>doGet(a.k,e.target,el));
return;
}}
const acct=S.apple.id?
'<span style="display:flex;align-items:center;gap:9px"><span style="width:38px;height:38px;border-radius:50%;background:linear-gradient(150deg,#8e8e93,#636366);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">'+S.apple.name.slice(0,1).toUpperCase()+'</span><b>'+S.apple.name+'</b></span>':
'<button class="btn" id="stSign" style="padding:8px 14px">تسجيل الدخول بـ Apple ID</button>';
let body='';
if(tab==='games'){
body='<div class="rbx-sec" style="margin-top:2px">الألعاب — حمّل والعب</div>'+GAMES.map(gameRow).join('');
} else if(tab==='today'){
const f=STORE[0];
body='<div class="card" style="padding:0;overflow:hidden"><div style="background:linear-gradient(140deg,'+SOCIAL[f.k].c+',#0c1520);height:150px;display:flex;align-items:center;justify-content:center;gap:12px"><span style="background:#fff;border-radius:24px;padding:8px;display:inline-flex">'+icImg(ICONS[f.k])+'</span></div><div style="padding:12px"><span class="mut">تطبيق اليوم</span><div class="big" style="font-size:17px">'+f.n+'</div><p class="mut" style="margin:4px 0 10px">'+f.desc+'</p><button class="btn" data-get="'+f.k+'" style="border-radius:16px;padding:7px 18px">'+(S.installed.includes(f.k)?'فتح':'احصل')+'</button></div></div>'+
STORE.slice(1,4).map(storeRow).join('');
} else if(tab==='apps'){
body='<div class="rbx-sec" style="margin-top:2px">تواصل اجتماعي — أونلاين</div>'+STORE.filter(a=>SOCIAL[a.k]).map(storeRow).join('')+'<div class="rbx-sec">تطبيقات جديدة</div>'+STORE.filter(a=>!SOCIAL[a.k]).map(storeRow).join('')+
(S.hidden.length?'<div class="rbx-sec">تطبيقات حذفتها — استرجعها</div>'+S.hidden.map(id=>{const pa=APPS.find(x=>x.id===id);return pa?'<div class="card row" style="align-items:center"><span>'+icImg(ICONS[pa.ic])+'</span><span style="flex:1"><span class="big" style="font-size:15px">'+pa.n+'</span><br><span class="mut">تطبيق نظام</span></span><button class="btn" data-unhide="'+id+'" style="border-radius:16px;padding:7px 18px">احصل</button></div>':''}).join(''):'');
} else {
body='<div class="row" style="margin-bottom:10px"><input id="stQ" type="text" placeholder="ابحث عن تطبيقات وألعاب…" style="flex:1;padding:11px 13px;border:1px solid #d9d9de;border-radius:14px;font-size:14px"></div><div id="stRes">'+GAMES.map(gameRow).join('')+STORE.map(storeRow).join('')+'</div>';
}
el.innerHTML='<div class="row" style="align-items:center;margin-bottom:12px"><span class="big" style="font-size:21px;flex:1">App Store</span>'+acct+'</div>'+body+
'<div class="lg-bar'+(S.set.dark?' dk':'')+'" id="lgStoreBar"><div class="lg-pill"></div>'+
[['games','الألعاب'],['today','اليوم'],['apps','التطبيقات'],['search','بحث']].map(t=>'<button class="lg-tab" data-tab="'+t[0]+'">'+t[1]+'</button>').join('')+'</div>';
lgTabs($('#lgStoreBar'),['games','today','apps','search'],['games','today','apps','search'].indexOf(tab),k=>{S.storeTab=k;S.storeDetail=null;appStore(el)});
const sg=$('#stSign');if(sg)sg.addEventListener('click',()=>appleSignInForm(el,()=>appStore(el)));
const q=$('#stQ');if(q)q.addEventListener('input',()=>{const v=q.value.trim();$('#stRes').innerHTML=STORE.concat(GAMES).filter(a=>!v||a.n.includes(v)||a.cat.includes(v)).map(anyRow).join('')||'<p class="mut" style="text-align:center;padding:16px">لا نتائج</p>';bindGets(el)});
el.querySelectorAll('[data-unhide]').forEach(b=>b.addEventListener('click',()=>{S.hidden=S.hidden.filter(x=>x!==b.dataset.unhide);store.set('hidden',S.hidden);renderHome();appStore(el);toast('رجع التطبيق للشاشة الرئيسية')}));
bindGets(el);
}
function gameStars(rt){rt=rt||4.5;let s='';for(let i=1;i<=5;i++)s+='<span style="color:'+(i<=Math.round(rt)?'#ff9f0a':'#d9d9de')+';font-size:13px">★</span>';return s}
function gameDetail(g,el){
const inst=S.installed.includes(g.k);
const freeFirst=!S.gameFree[g.k]&&!inst;
const isDl=S.dl&&S.dl.k===g.k;
const revs=[['أحمد ك.','لعبة رهيبة! الجرافيك قوي وتشتغل بسلاسة تامة على الآيفون.','قبل أسبوع'],['سارة م.','ممتعة جداً، بس أتمنى يضيفون مراحل أكثر بالتحديث الجاي.','قبل 3 أيام'],['محمد ع.','أحلى لعبة جربتها هالفترة، أنصح الكل يجربها.','قبل يومين']];
let h='<button class="back" id="stBack" style="margin-bottom:10px">‹ رجوع</button>';
h+='<div class="row" style="align-items:center;gap:14px">'+icImg(ICONS[g.k]).replace('class="ic"', 'class="ic" style="width:92px;height:92px"')+'<span style="flex:1;min-width:0"><b style="font-size:21px">'+g.n+'</b><br><span class="mut" style="font-size:13px">'+g.dev+'</span><br><span class="mut" style="font-size:12.5px">'+g.cat+' · '+g.size+'</span></span><button class="btn" id="stGet" style="border-radius:18px;padding:9px 26px;font-size:15px;font-weight:700;min-width:96px">'+(isDl?dlBtnHTML(g.k):(inst?'فتح':(freeFirst?'مجاناً':'$'+g.price)))+'</button></div>';
if(freeFirst&&!inst)h+='<div style="margin-top:8px"><span style="font-size:12.5px;color:#34c759;font-weight:700">مجاناً لأول تحميل</span> <span class="mut" style="font-size:12.5px;text-decoration:line-through">$'+g.price+'</span></div>';
h+='<div class="row" style="margin-top:16px;padding:12px 0;border-top:1px solid #e8e8ec;border-bottom:1px solid #e8e8ec;text-align:center">'
+'<span style="flex:1"><b style="font-size:15px">'+g.rt+'</b><br>'+gameStars(g.rt)+'<br><span class="mut" style="font-size:11px">'+g.rc+' تقييم</span></span>'
+'<span style="flex:1;border-inline-start:1px solid #e8e8ec"><b style="font-size:15px">'+g.age+'</b><br><span class="mut" style="font-size:11px">العمر</span></span>'
+'<span style="flex:1;border-inline-start:1px solid #e8e8ec"><b style="font-size:15px">'+g.size+'</b><br><span class="mut" style="font-size:11px">الحجم</span></span></div>';
h+='<div class="rbx-sec">لمحات</div><div class="row" style="gap:10px;overflow-x:auto;padding:4px 2px">'
+[0,1,2].map(i=>'<div style="flex:0 0 168px;height:300px;border-radius:14px;overflow:hidden;position:relative;background:linear-gradient(160deg,#23232f,#0d0d14)"><img src="'+ICONS[g.k]+'" loading="lazy" style="width:100%;height:100%;object-fit:cover;opacity:.92"><span style="position:absolute;bottom:0;right:0;left:0;padding:26px 10px 10px;background:linear-gradient(transparent,rgba(0,0,0,.75));color:#fff;font-weight:700;font-size:13.5px">'+g.n+'</span></div>').join('')+'</div>';
h+='<div class="rbx-sec">الوصف</div><p style="line-height:1.9;font-size:14px">'+g.desc+'</p>';
h+='<div class="rbx-sec">التقييمات والمراجعات</div><div class="row" style="align-items:center;gap:12px;margin-bottom:8px"><b style="font-size:34px">'+g.rt+'</b><span><span style="font-size:13px">'+gameStars(g.rt)+'</span><br><span class="mut" style="font-size:12px">'+g.rc+' تقييم</span></span></div>'
+revs.map(r=>'<div class="card"><div class="row" style="align-items:center"><span style="width:36px;height:36px;border-radius:50%;background:linear-gradient(150deg,#8e8e93,#636366);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto">'+r[0].charAt(0)+'</span><span style="flex:1;margin-inline-start:10px"><b style="font-size:13.5px">'+r[0]+'</b><br><span class="mut" style="font-size:11.5px">'+r[2]+'</span></span><span style="color:#ff9f0a;font-size:12px">★★★★★</span></div><p style="font-size:13.5px;line-height:1.8;margin:8px 0 0">'+r[1]+'</p></div>').join('');
h+='<div class="rbx-sec">المعلومات</div><div class="setgroup">'
+'<div class="setrow"><span style="flex:1">المطور</span><span class="mut">'+g.dev+'</span></div>'
+'<div class="setrow"><span style="flex:1">الحجم</span><span class="mut">'+g.size+'</span></div>'
+'<div class="setrow"><span style="flex:1">التصنيف</span><span class="mut">'+g.cat+'</span></div>'
+'<div class="setrow"><span style="flex:1">التوافق</span><span class="mut">يتطلب iOS 17 أو أحدث</span></div>'
+'<div class="setrow"><span style="flex:1">اللغات</span><span class="mut">العربية، الإنجليزية</span></div>'
+'<div class="setrow"><span style="flex:1">حقوق النشر</span><span class="mut">© '+g.dev+'</span></div></div>';
el.innerHTML=h;
document.querySelector('#stBack').addEventListener('click',()=>{S.storeDetail=null;appStore(el)});
document.querySelector('#stGet').addEventListener('click',e=>doGet(g.k,e.currentTarget,el));
}
function bindGets(el){
el.querySelectorAll('[data-get]').forEach(b=>b.addEventListener('click',()=>doGet(b.dataset.get,b,el)));
el.querySelectorAll('[data-detail]').forEach(d=>d.addEventListener('click',()=>{S.storeDetail=d.dataset.detail;appStore(el)}));
}
function dlRing(pr,paused){const c=2*Math.PI*20,off=(c*(1-(pr||0))).toFixed(1);
return '<span class="dlring" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none"><span style="position:absolute;inset:0;background:rgba(10,10,14,.38);border-radius:22.37%"></span><svg width="36" height="36" viewBox="0 0 44 44" style="position:relative"><circle cx="22" cy="22" r="20" fill="rgba(18,18,22,.72)"/><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="3.5"/><circle class="dlfg" cx="22" cy="22" r="20" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off+'" transform="rotate(-90 22 22)"/>'+(paused?'<path d="M18.5 15.5l9 6.5-9 6.5z" fill="#fff"/>':'<rect x="18.6" y="15" width="2.7" height="14" rx="1.35" fill="#fff"/><rect x="22.7" y="15" width="2.7" height="14" rx="1.35" fill="#fff"/>')+'</svg></span>'}
function dlPause(){if(!S.dl||S.dl.paused)return;S.dl.paused=true;renderHome()}
function dlResume(){if(!S.dl||!S.dl.paused)return;S.dl.paused=false;S.dl.t0=Date.now()-S.dl.prog*S.dl.total;renderHome()}
function toggleDl(){if(!S.dl)return;if(S.dl.paused)dlResume();else dlPause()}
function finishDl(k,g,freeFirst,el){
clearInterval(S.dlT);S.dl=null;
if(!S.installed.includes(k))S.installed.push(k);store.set('installed',S.installed);
if(g){S.gameFree=S.gameFree||{};S.gameFree[k]=true;store.set('gameFree',S.gameFree)}
renderHome();S.storeDetail=null;appStore(el);
const nm=(g||{}).n||k;
toast('انثبت '+nm+' على الشاشة الرئيسية'+(freeFirst?' \u2014 مجاناً':''));
try{notify('appstore','تم التثبيت','انثبت '+nm+' \u2014 اضغط للعب')}catch(e){}
}
function doGet(k,btn,el){
if(!S.apple.id){toast('سجل دخولك بـ Apple ID حتى تنزل \u2014 روح للإعدادات أو اضغط تسجيل الدخول');appleSignInForm(el,()=>appStore(el));return}
if(S.installed.includes(k)){S.storeDetail=null;openApp('x_'+k,null);return}
S.gameFree=S.gameFree||store.get('gameFree',{});
const g=GAMES.find(x=>x.k===k);
const freeFirst=g&&!S.gameFree[k];
if(S.dl&&S.dl.k===k){toggleDl();if(btn)btn.innerHTML=dlBtnHTML(k);return}
if(S.dl){toast('انتظر يخلص التحميل الحالي');return}
S.dl={k:k,prog:0,paused:false};
const sizeGB=parseFloat(String((g&&g.size)||'1 GB').replace(/[^\d.]/g,''))||1;
S.dl.total=Math.max(4000,sizeGB*4500);S.dl.t0=Date.now();
S.installed.push('dl_'+k);store.set('installed',S.installed);
renderHome();
if(btn)btn.innerHTML=dlBtnHTML(k);
clearInterval(S.dlT);
S.dlT=setInterval(()=>{
if(!S.dl||S.dl.paused)return;
S.dl.prog=Math.min(1,(Date.now()-S.dl.t0)/S.dl.total);
const fg=document.querySelector('[data-app="x_dl_'+k+'"] .dlfg');
if(fg){const c=2*Math.PI*20;fg.setAttribute('stroke-dashoffset',(c*(1-S.dl.prog)).toFixed(1))}
document.querySelectorAll('[data-get="'+k+'"]').forEach(b=>{b.innerHTML=dlBtnHTML(k)});
const sb=document.querySelector('#stGet');
if(sb&&S.storeDetail===k)sb.innerHTML=dlBtnHTML(k);
if(S.dl.prog>=1){
S.installed=S.installed.filter(x=>x!=='dl_'+k);store.set('installed',S.installed);
finishDl(k,g,freeFirst,el);
}
},200);
}
function dlBtnHTML(k){
if(S.dl&&S.dl.k===k){const pc=Math.round(S.dl.prog*100);return '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="17" height="17" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(0,122,255,.25)" stroke-width="6"/><circle cx="22" cy="22" r="20" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+(2*Math.PI*20).toFixed(1)+'" stroke-dashoffset="'+(2*Math.PI*20*(1-S.dl.prog)).toFixed(1)+'" transform="rotate(-90 22 22)"/></svg>'+pc+'٪</span>'}
return 'تحميل';
}

function isGameOpen(){const id=S.app||'';if(!id.startsWith('x_'))return false;try{return!!GAMES.find(x=>x.k===id.slice(2))}catch(e){return false}}
function appHeadReset(){const hh=$('#appHead');if(hh)hh.style.display='';const ab=$('#appBody');if(ab){ab.style.position='';ab.style.padding='';ab.style.overflow=''}}
function appMeta(id){try{const a=APPS.find(x=>x.id===id);if(a)return{n:a.n,ic:a.ic};if(id&&id.startsWith('x_')){const m=extraMeta(id.slice(2));if(m)return m}}catch(e){}return{n:id||'تطبيق',ic:'settings'}}
const APP_SIZES={safari:184,photos:96,camera:88,messages:142,music:210,clock:24,notes:38,calc:18,files:64,settings:52,appstore:176,weather:44,calendar:36,maps:288,tiktok:320,facetime:96,voicememos:42,shortcuts:58,maint:34};
function appSizeMB(id){try{if(id&&id.startsWith('x_')){const gm=GAMES.find(x=>x.k===id.slice(2));if(gm&&gm.size){const m=gm.size.match(/([\d.]+)\s*GB/);if(m)return Math.round(parseFloat(m[1])*1000)}return 86}}catch(e){}return APP_SIZES[id]||64}
function fmtSize(mb){return mb>=1000?(mb/1000).toFixed(1)+' GB':Math.round(mb)+' MB'}
function meAv(sz){sz=sz||44;if(S.myPic)return '<img src="'+S.myPic+'" style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;flex:0 0 auto;object-fit:cover">';return '<span style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;flex:0 0 auto;background:linear-gradient(150deg,#8e8e93,#5a5a5e);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:'+Math.round(sz/2.4)+'px">'+escH((S.apple.name||'R').slice(0,1).toUpperCase())+'</span>'}
function pickMyPic(){
let inp=document.querySelector('#picPick');
if(!inp){
inp=document.createElement('input');inp.type='file';inp.id='picPick';inp.accept='image/*';inp.style.display='none';
inp.addEventListener('change',()=>{
const f=inp.files&&inp.files[0];inp.value='';if(!f)return;
const rd=new FileReader();
rd.onload=()=>{
const img=new Image();
img.onload=()=>{
try{
const mx=160,sc=Math.min(1,mx/Math.max(img.width,img.height));
const c=document.createElement('canvas');
c.width=Math.max(1,Math.round(img.width*sc));c.height=Math.max(1,Math.round(img.height*sc));
c.getContext('2d').drawImage(img,0,0,c.width,c.height);
S.myPic=c.toDataURL('image/jpeg',.82);store.set('myPic',S.myPic);
toast('انحفظت صورتك — تظهر بكل التطبيقات');
if(S.app==='settings'&&document.querySelector('#appBody'))appSettings(document.querySelector('#appBody'));
}catch(e){toast('ما انحفظت الصورة')}
};
img.src=rd.result;
};
rd.readAsDataURL(f);
});
document.body.appendChild(inp);
}
inp.click();
}
function appGame(k){
const g=GAMES.find(x=>x.k===k);if(!g)return;
const hh=$('#appHead');if(hh)hh.style.display='none';
const ab=$('#appBody');ab.style.position='relative';ab.style.padding='0';ab.style.overflow='hidden';
ab.innerHTML='<div style="position:absolute;inset:0;contain:strict"><iframe src="'+g.url+'" style="width:100%;height:100%;border:0;display:block;transform:translateZ(0);-webkit-transform:translateZ(0)" allow="autoplay;fullscreen;gamepad" allowfullscreen scrolling="no"></iframe></div>';
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
if(!store.get('notesList',null)&&S.notes){try{store.set('notesList',[{t:S.notes,ts:Date.now()}])}catch(e){}}
S.notesList=S.notesList||store.get('notesList',[]);
const save=()=>{try{store.set('notesList',S.notesList)}catch(e){}};
const fmt=ts=>{const d=new Date(ts);return d.getDate()+'/'+(d.getMonth()+1)+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
if(S.noteEdit==null||!S.notesList[S.noteEdit]){
let h='<div class="row" style="align-items:center;margin-bottom:8px"><b style="font-size:22px;flex:1">الملاحظات</b><span id="noteNew" style="color:#0a84ff;font-size:28px;cursor:pointer;line-height:1">+</span></div>';
h+=S.notesList.length?S.notesList.map((n,ix)=>{const t=String(n.t||'').split('\n');return '<div class="card row" data-note="'+ix+'" style="align-items:center;cursor:pointer;padding:10px 12px"><span style="flex:1"><b style="font-size:15px">'+escH(t[0]||'ملاحظة جديدة')+'</b><br><span class="mut" style="font-size:12.5px">'+fmt(n.ts)+'  '+escH((t[1]||'').slice(0,42))+'</span></span><span style="color:#c7c7cc;font-size:18px">‹</span></div>'}).join(''):'<p class="mut" style="text-align:center;padding:44px;line-height:2">لا توجد ملاحظات<br>اضغط + لإنشاء ملاحظة جديدة</p>';
el.innerHTML=h;
document.querySelector('#noteNew').addEventListener('click',()=>{S.notesList.unshift({t:'',ts:Date.now()});save();S.noteEdit=0;appNotes(el)});
el.querySelectorAll('[data-note]').forEach(r=>r.addEventListener('click',()=>{S.noteEdit=+r.dataset.note;appNotes(el)}));
}else{
const n=S.notesList[S.noteEdit];
el.innerHTML='<div class="row" style="align-items:center;margin-bottom:8px"><span id="noteBack" style="color:#0a84ff;font-size:16px;cursor:pointer">‹ الملاحظات</span><b style="flex:1;text-align:center;font-size:12px" class="mut">'+fmt(n.ts)+'</b><span id="noteDel" style="cursor:pointer">'+si('trash',20,'#ff3b30')+'</span></div><textarea id="noteEd" placeholder="اكتب هنا…" style="width:100%;height:62vh;border:none;font-size:16px;line-height:1.9;outline:none;resize:none;background:transparent;color:#111"></textarea>';
const ta=document.querySelector('#noteEd');ta.value=n.t||'';
ta.addEventListener('input',()=>{n.t=ta.value;n.ts=Date.now();save()});
document.querySelector('#noteBack').addEventListener('click',()=>{if(!String(n.t||'').trim()){S.notesList.splice(S.noteEdit,1);save()}S.noteEdit=null;appNotes(el)});
document.querySelector('#noteDel').addEventListener('click',()=>{S.notesList.splice(S.noteEdit,1);save();S.noteEdit=null;appNotes(el);toast('انحذفت الملاحظة')});
}
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

function appTikTok(el){
el.innerHTML='<div style="text-align:center;padding:60px 20px"><div style="font-size:17px;font-weight:700;margin-bottom:8px">قيد التطوير</div><p class="mut" style="font-size:13px;line-height:1.9">تطبيق تيك توك بعدو قيد التطوير<br>راح يتوفر بتحديث قادم</p></div>';
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
function unlock(){if(!S.locked)return;S.locked=false;sfx('unlock');const L=$('#lock');L.classList.add('bye');setTimeout(()=>{L.classList.remove('show','bye');syncPill()},400)}
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
m.innerHTML=(appId.startsWith('x_')?'<button class="danger" id="ctxDel">حذف التطبيق</button>':'')+'<button id="ctxMove">إعادة ترتيب التطبيقات</button><button id="ctxCancel">إلغاء</button>';
m.style.display='block';
m.style.left=Math.max(8,Math.min(scr.width-190,r.left-scr.left-40))+'px';
m.style.top=Math.max(30,r.bottom-scr.top+6)+'px';
const cd=$('#ctxDel');if(cd)cd.addEventListener('click',()=>{hideCtx();deleteApp(appId)});
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
const ALOGO='<img src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" style="width:44px;height:44px" onerror="this.outerHTML=\'<div style=\\\'font-size:40px\\\'>\uF8FF</div>\'">';
const ALOG0=ALOGO;
const sheet=(inner)=>'<div class="card" style="max-width:340px;margin:14px auto;padding:26px 20px;text-align:center">'+ALOG0+inner+'</div>';
let mode='email',em='',code='';
const render=()=>{
if(mode==='email'){
el.innerHTML=sheet('<div class="big" style="font-size:20px;margin:10px 0 4px">تسجيل الدخول بـ<br>Apple ID</div>'+
'<p class="mut" style="margin:0 0 16px;font-size:13px;line-height:1.8">سيتم تسجيل دخولك إلى iCloud وApp Store<br>وخدمات Apple على هذا الآيفون</p>'+
'<input id="aEmail" type="email" placeholder="البريد الإلكتروني" style="width:100%;padding:12px;border:1px solid #d9d9de;border-radius:12px;font-size:15px;font-family:inherit;text-align:center" value="'+escH(em)+'">'+
'<button class="btn" id="aNext" style="width:100%;margin-top:12px;padding:12px">متابعة ←</button>'+
'<p style="margin-top:14px;font-size:13px"><span class="mut">ليس لديك Apple ID؟</span> <a href="#" id="aCreate" style="color:#0a84ff">أنشئ حسابك الآن</a></p>'+
'<p class="mut" style="margin-top:10px;font-size:11px;line-height:1.7">🔒 حساب تجريبي — كلمة السر تُحفظ على جهازك فقط<br>ولا تُرسل إلى أي خادم</p>');
$('#aNext').addEventListener('click',()=>{const v=$('#aEmail').value.trim();if(!v||!v.includes('@'))return toast('اكتب بريداً إلكترونياً صحيحاً');em=v;mode='pass';render()});
$('#aCreate').addEventListener('click',e=>{e.preventDefault();mode='create';render()});
}else if(mode==='pass'){
el.innerHTML=sheet('<div style="font-size:13px" class="mut">'+escH(em)+'</div>'+
'<div class="big" style="font-size:19px;margin:8px 0 4px">أدخل كلمة السر</div>'+
'<p class="mut" style="font-size:12.5px;margin-bottom:14px">للمتابعة إلى Apple ID</p>'+
'<div style="position:relative"><input id="aPass" type="password" placeholder="كلمة السر" style="width:100%;padding:12px;border:1px solid #d9d9de;border-radius:12px;font-size:15px;font-family:inherit;text-align:center">'+
'<span id="aEye" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:17px;opacity:.6">👁</span></div>'+
'<button class="btn" id="aGo" style="width:100%;margin-top:12px;padding:12px">تسجيل الدخول</button>'+
'<p style="margin-top:12px;font-size:13px"><a href="#" id="aBackE" style="color:#0a84ff">← بريد مختلف</a> · <a href="#" id="aForgot" style="color:#0a84ff">نسيت كلمة السر؟</a></p>');
$('#aEye').addEventListener('click',()=>{const i=$('#aPass');i.type=i.type==='password'?'text':'password'});
$('#aBackE').addEventListener('click',e=>{e.preventDefault();mode='email';render()});
$('#aForgot').addEventListener('click',e=>{e.preventDefault();toast('أُرسل رابط الاستعادة إلى '+em)});
$('#aGo').addEventListener('click',()=>{
const pw=$('#aPass').value;
if(pw.length<4)return toast('كلمة السر قصيرة جداً');
S._applePw=pw;mode='2fa';code=String(Math.floor(100000+Math.random()*900000));render();
});
}else if(mode==='2fa'){
el.innerHTML=sheet('<div class="big" style="font-size:19px;margin:10px 0 4px">المصادقة بخطوتين</div>'+
'<p class="mut" style="font-size:13px;line-height:1.9;margin-bottom:14px">أدخل رمز التحقق المكوّن من ٦ أرقام<br>الذي أُرسل إلى أجهزتك الموثوقة</p>'+
'<input id="aCode" type="text" inputmode="numeric" maxlength="6" placeholder="– – – – – –" style="width:100%;padding:12px;border:1.5px solid #0a84ff;border-radius:12px;font-size:22px;letter-spacing:8px;text-align:center;font-family:inherit">'+
'<button class="btn" id="aVerify" style="width:100%;margin-top:12px;padding:12px">تحقق</button>'+
'<div class="card" style="margin-top:12px;background:#f2f2f7"><span class="mut" style="font-size:12px">رمز تجريبي (في الحقيقة يصلك على جهازك):</span><br><b style="font-size:22px;letter-spacing:6px">'+code+'</b></div>');
setTimeout(()=>{const i=$('#aCode');if(i)i.focus()},300);
$('#aVerify').addEventListener('click',()=>{
if($('#aCode').value.trim()!==code)return toast('الرمز غير صحيح — حاول مجدداً');
finishSignIn();
});
}else if(mode==='create'){
el.innerHTML=sheet('<div class="big" style="font-size:19px;margin:10px 0 4px">إنشاء Apple ID</div>'+
'<input id="cName" type="text" placeholder="الاسم الكامل" style="width:100%;padding:11px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;font-family:inherit;margin-bottom:8px;text-align:center">'+
'<input id="cEmail" type="email" placeholder="البريد الإلكتروني" style="width:100%;padding:11px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;font-family:inherit;margin-bottom:8px;text-align:center">'+
'<input id="cPass" type="password" placeholder="كلمة سر جديدة" style="width:100%;padding:11px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;font-family:inherit;text-align:center">'+
'<div id="pwReq" class="mut" style="font-size:11.5px;text-align:right;margin:8px 4px;line-height:1.9"></div>'+
'<label class="row" style="font-size:12px;gap:8px;margin:6px 0"><input type="checkbox" id="cTerms"> <span>أوافق على <a href="#" style="color:#0a84ff">الشروط والأحكام</a> وسياسة الخصوصية</span></label>'+
'<button class="btn" id="cGo" style="width:100%;margin-top:8px;padding:12px">إنشاء الحساب</button>'+
'<p style="margin-top:10px;font-size:13px"><a href="#" id="cBack" style="color:#0a84ff">لدي حساب — تسجيل الدخول</a></p>');
const chk=()=>{const v=$('#cPass').value;const req=[['٨ أحرف على الأقل',v.length>=8],['حرف كبير وصغير',/[a-z]/.test(v)&&/[A-Z]/.test(v)],['رقم واحد على الأقل',/\d/.test(v)]];$('#pwReq').innerHTML=req.map(r=>'<div>'+(r[1]?'<span style="color:#34c759">✓</span>':'<span style="color:#c7c7cc">○</span>')+' '+r[0]+'</div>').join('');return req.every(r=>r[1])};
$('#cPass').addEventListener('input',chk);chk();
$('#cBack').addEventListener('click',e=>{e.preventDefault();mode='email';render()});
$('#cGo').addEventListener('click',()=>{
const nm=$('#cName').value.trim(),ce=$('#cEmail').value.trim();
if(!nm)return toast('اكتب اسمك');
if(!ce.includes('@'))return toast('بريد إلكتروني غير صحيح');
if(!chk())return toast('كلمة السر لا تطابق الشروط');
if(!$('#cTerms').checked)return toast('وافق على الشروط أولاً');
em=ce;S._appleName=nm;S._applePw=$('#cPass').value;mode='2fa';code=String(Math.floor(100000+Math.random()*900000));render();
});
}
};
const finishSignIn=()=>{
const nm=S._appleName||em.split('@')[0]||'Reda';
S.apple={id:em,name:nm,created:Date.now()};store.set('apple',S.apple);
S._applePw=null;S._appleName=null;
toast('أهلاً '+nm+' — تم تسجيل الدخول ✓');
notify('settings','Apple ID','تم تسجيل الدخول بنجاح على هذا الآيفون',null,{pop:false});
if(done)done();
};
render();
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
const WA_THREADS=[['whatsapp','المجموعة العامة','group'],['whatsapp-dm-ahmad','أحمد','dm'],['whatsapp-dm-mohammad','محمد','dm'],['whatsapp-grp','العائلة','group']];
function appWhatsApp(){emptyChats('WhatsApp','<div style="background:#075e54;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">WhatsApp</b><span style="display:block;font-size:12px;opacity:.85">متصل \u2014 بانتظار ميزة اليوزر</span></div>')}

function miniChat(el,head,bg,room,theme){el.innerHTML=head+'<div id="chatList" style="background:'+bg+';border-radius:12px;padding:8px 6px;min-height:170px;margin-top:8px"></div>'+chatInputHTML();chatThread(room,theme)}
function appTelegram(){emptyChats('Telegram','<div style="background:#2AABEE;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Telegram</b></div>')}

function appMessenger(){emptyChats('Messenger','<div style="background:linear-gradient(90deg,#0084ff,#9b30d9);color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Messenger</b></div>')}

function appDiscord(){emptyChats('Discord','<div style="background:#1e1f22;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Discord</b></div>')}

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
function appSnapchat(){emptyChats('Snapchat','<div style="background:#e8c832;color:#111;border-radius:14px;padding:12px"><b style="font-size:16px">Snapchat</b></div>')}

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
const lw=$('#lockWall');if(lw){const li=(S.set.lockWp==null?-1:S.set.lockWp);lw.src=(li>=0&&WPS[li])?WPS[li]:(WPS[S.set.wp||0]||'')}
const ltm=$('#lockTime');if(ltm){const lc=(S.set.lockClock==null?0:S.set.lockClock);ltm.style.fontWeight=lc===1?'800':(lc===2?'200':'700');ltm.style.fontSize=lc===1?'80px':(lc===2?'64px':'72px')}
$('#ipad').classList.toggle('dark',!!S.set.dark);
}
const LIBCATS=[['التواصل الاجتماعي',['whatsapp','telegram','messenger','instagram','facebook','snapchat','x','discord','messages','phone','facetime']],['الترفيه',['x_youtube','tiktok','music','photos','camera']],['الأدوات والإنتاجية',['settings','appstore','safari','maps','weather','clock','calendar','calc','notes','files','shortcuts','voicememos','maint','chatgpt']]];
function spotRender(q){
const allA=APPS.concat(S.installed.filter(id=>extraMeta(id)).map(id=>{const _m=extraMeta(id);return{id:'x_'+id,n:_m.n,ic:_m.ic,extra:id}})).filter(a=>!S.fx||!S.fx.searchApps||S.fx.searchApps[a.id]!==false);
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
const BATT_IMG='<svg viewBox="0 0 120 76" width="100%" height="150" style="border-radius:12px;background:linear-gradient(140deg,#f2f2f7,#e4e4ea)"><rect x="8" y="24" width="8" height="20" rx="2.5" fill="#a9aeb6"/><rect x="18" y="14" width="86" height="44" rx="9" fill="#d8dce1" stroke="#a9aeb6" stroke-width="2"/><rect x="24" y="20" width="60" height="32" rx="5" fill="#34c759"/><path d="M58 22 L46 40 h8 L52 54 L66 34 h-8 Z" fill="#fff"/></svg>';
const BATT_PRODS=[
{id:'max',n:'بطارية ماكس',d:'أقوى بطارية — سعة مضاعفة تدوم أطول بكثير وتدعم أسرع شحن.',pro:true,price:90},
{id:'pro',n:'بطارية أصلية',d:'أعلى جودة — تدوم أطول وتدعم الشحن السريع والأداء الكامل للجهاز.'},
{id:'std',n:'بطارية بديلة',d:'جودة ممتازة بسعر مناسب — تشتغل طبيعي وترجع القدرة ١٠٠٪.'}
];
const CHG_IMG=w=>'<svg viewBox="0 0 120 76" width="100%" height="150" style="border-radius:12px;background:linear-gradient(140deg,#f2f2f7,#e4e4ea)"><rect x="44" y="10" width="32" height="26" rx="7" fill="#d8dce1" stroke="#a9aeb6" stroke-width="2"/><rect x="50" y="4" width="6" height="12" rx="3" fill="#a9aeb6"/><rect x="64" y="4" width="6" height="12" rx="3" fill="#a9aeb6"/><path d="M60 36 q0 12 -14 16 q14 2 14 14" stroke="#a9aeb6" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="60" cy="58" r="11" fill="#0a84ff"/><text x="60" y="63" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">'+w+'</text></svg>';
const CHG_PRODS=[
{id:'c20',n:'شاحن سريع',w:'20W',rate:2,price:15,d:'شحن أسرع بمرتين من الشاحن العادي.'},
{id:'c45',n:'شاحن ألترا',w:'45W',rate:3.5,price:29,d:'شحن فائق السرعة — فل شحن بوقت قصير.'},
{id:'c65',n:'شاحن ماكس',w:'65W',rate:5,price:45,d:'أسرع شاحن عندنا — خمس أضعاف السرعة العادية.'}
];
function appMaint(el){
S.battBought=store.get('battBought',0);S.chgBought=store.get('chgBought',0);S.chgRate=store.get('chgRate',1);
S.maintTab=S.maintTab||'batt';
const free=S.battBought===0;
const mc=Math.max(72,Math.round(S.batt.maxCap||100));
let h='<b style="font-size:20px">البطارية والشحن</b>'+
'<div class="card" style="margin-top:10px;text-align:center;padding:18px"><div class="mut" style="font-size:13px">الحد الأقصى للقدرة الحالي</div><div style="font-size:44px;font-weight:800;color:'+(mc<80?'#ff9f0a':'#34c759')+'">'+arabNum(mc)+'٪</div><div class="mut" style="font-size:12px;margin-top:4px;line-height:1.7">كل ما تنزل القدرة يصير صرف الشحن أكثر<br>اشترِ بطارية جديدة ورجعها ١٠٠٪</div></div>'+
'<div class="segRow" style="margin:12px 0"><button data-mtab="batt" class="'+(S.maintTab==='batt'?'on':'')+'">البطاريات</button><button data-mtab="chg" class="'+(S.maintTab==='chg'?'on':'')+'">الشواحن</button></div>';
if(S.maintTab==='batt'){
h+='<div class="rbx-sec">'+(free?'بطاريتك الأولى مجاناً':'البطاريات')+'</div>'+
BATT_PRODS.map(pr=>{const prc=pr.price||60;return '<div class="card">'+BATT_IMG+'<div class="row" style="align-items:center;margin-top:10px"><span style="flex:1"><b style="font-size:15px">'+pr.n+'</b>'+(pr.pro?'<br><span style="font-size:11.5px;color:#ff9f0a;font-weight:700">الأقوى — تدوم أطول</span>':'')+'</span><b style="color:'+(free?'#34c759':'#0a84ff')+'">'+(free?'مجاني':'$'+prc)+'</b></div><p class="mut" style="font-size:12.5px;line-height:1.8;margin-top:6px">'+pr.d+'</p><button class="btn" data-battbuy="'+pr.id+'" style="width:100%;margin-top:8px;padding:11px">تركيب البطارية — '+(free?'مجاني':'$'+prc)+'</button></div>'}).join('');
}else{
h+='<div class="rbx-sec">'+(S.chgBought?'الشواحن السريعة':'أول شاحن مجاني لأول مرة')+'</div>'+
CHG_PRODS.map(cp=>{const cf=S.chgBought===0;const cur=(S.chgRate||1)===cp.rate;return '<div class="card">'+CHG_IMG(cp.w)+'<div class="row" style="align-items:center;margin-top:10px"><span style="flex:1"><b style="font-size:15px">'+cp.n+'</b><br><span class="mut" style="font-size:12px">'+cp.w+' — أسرع بـ '+cp.rate+'x</span>'+(cur?'<br><span style="font-size:11.5px;color:#34c759;font-weight:700">مستخدم حالياً</span>':'')+'</span><b style="color:'+(cf?'#34c759':'#0a84ff')+'">'+(cur?'✓':(cf?'مجاني':'$'+cp.price))+'</b></div><p class="mut" style="font-size:12.5px;line-height:1.8;margin-top:6px">'+cp.d+'</p>'+(cur?'':'<button class="btn" data-chgbuy="'+cp.id+'" style="width:100%;margin-top:8px;padding:11px">اشترِ الشاحن — '+(cf?'مجاني':'$'+cp.price)+'</button>')+'</div>'}).join('');
}
el.innerHTML=h;
el.querySelectorAll('[data-mtab]').forEach(b=>b.addEventListener('click',()=>{S.maintTab=b.dataset.mtab;appMaint(el)}));
el.querySelectorAll('[data-battbuy]').forEach(b=>b.addEventListener('click',()=>{
const pr=BATT_PRODS.find(x=>x.id===b.dataset.battbuy);
S.batt.maxCap=100;S.batt.pct=Math.max(S.batt.pct,60);if(pr&&pr.pro)S.batt.pro=true;store.set('batt',S.batt);
S.battBought++;store.set('battBought',S.battBought);
toast(free?'انتركبت بطاريتك المجانية — القدرة رجعت ١٠٠٪':'انتركبت البطارية الجديدة — القدرة رجعت ١٠٠٪');
appMaint(el)}));
el.querySelectorAll('[data-chgbuy]').forEach(b=>b.addEventListener('click',()=>{
const cp=CHG_PRODS.find(x=>x.id===b.dataset.chgbuy);if(!cp)return;
const wasFree=S.chgBought===0;
S.chgRate=cp.rate;S.chgBought=(S.chgBought||0)+1;store.set('chgBought',S.chgBought);store.set('chgRate',S.chgRate);
toast(wasFree?'شاحنك الأول مجاني — الشحن صار أسرع بـ '+cp.rate+'x':'تم تفعيل '+cp.n+' — الشحن أسرع بـ '+cp.rate+'x');
appMaint(el)}));
}
function appVoiceMemos(el){
S.memos=S.memos||store.get('memos',[]);
const render=()=>{
el.innerHTML='<b style="font-size:20px">المذكرات الصوتية</b><div id="vmList" style="margin-top:10px">'+(S.memos.length?S.memos.map((m,i)=>'<div class="card"><b style="font-size:14px">'+escH(m.n)+'</b><br><span class="mut" style="font-size:12px">'+escH(m.d)+'</span><audio controls src="'+m.u+'" style="width:100%;margin-top:8px"></audio><button class="btn gray" data-vmdel="'+i+'" style="margin-top:6px;padding:6px 14px;font-size:12px">حذف</button></div>').join(''):'<div class="mut" style="text-align:center;padding:30px;line-height:1.9">لا تسجيلات بعد<br>دوس تسجيل واحجي</div>')+'</div>'+
'<button class="btn" id="vmRec" style="width:100%;margin-top:10px;padding:14px;font-size:16px">● تسجيل</button><p class="mut" style="text-align:center;font-size:11.5px;margin-top:8px">التسجيل حقيقي من مايكروفون جهازك</p>';
let mr=null;const chunks=[];
const rb=document.querySelector('#vmRec');
rb.addEventListener('click',async()=>{
if(mr&&mr.state==='recording'){mr.stop();return}
try{
const st=await navigator.mediaDevices.getUserMedia({audio:true});
mr=new MediaRecorder(st);
mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
mr.onstop=()=>{const blob=new Blob(chunks,{type:mr.mimeType||'audio/webm'});const rd=new FileReader();rd.onload=()=>{S.memos.unshift({n:'تسجيل '+(S.memos.length+1),d:new Date().toLocaleDateString('en-GB'),u:rd.result});store.set('memos',S.memos);st.getTracks().forEach(t=>t.stop());mr=null;render();toast('انحفظ التسجيل')};rd.readAsDataURL(blob);chunks.length=0};
mr.start();rb.innerHTML='■ إيقاف التسجيل';rb.style.background='#ff3b30';
}catch(e){toast('المايكروفون محظور — فعّله من الإعدادات')}
});
el.querySelectorAll('[data-vmdel]').forEach(b=>b.addEventListener('click',()=>{S.memos.splice(+b.dataset.vmdel,1);store.set('memos',S.memos);render()}));
};
render();
}

