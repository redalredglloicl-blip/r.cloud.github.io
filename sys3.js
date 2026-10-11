/* ===== Rio iPad 3.0 system layer ===== */
S.fx=Object.assign({focus:{sched:false,from:'22:00',to:'07:00',mute:['YouTube','TikTok']},nstyle:'stack',summary:'21:00',lastSum:'',lock:{wcol:'#ffffff',bold:true,widgets:['battery','weather','music'],shuffle:false},acc:{night:false,reduce:false,bold:false,dzoom:false},icons:{mode:'light',big:false,nolabel:false},limits:{},downtime:{on:false,from:'23:00',to:'06:00'},use:{date:'',sec:{}},seen:{},airSeen:0,peers:[],autos:[]},store.get('fx3',{}));
const FXDEF={celldata:true,hotspot:{on:false,pass:'rio2026'},vpn:false,snd:{lock:true,keys:true,send:true,ring:'افتتاحية'},btdev:{},perms:{location:true,camera:true,microphone:true,photos:true,tracking:false},pass:'',passLen:0,faceid:false,autolock:0,dt24:false,textscale:100,truetone:false,airdrop:'all',searchOn:true,siri:true,gcname:'',cards:[],vault:[],appNotif:{},searchApps:{},bgref:{},camgrid:false,camfmt:'HEIF',sosBtn:true,solidCC:false,cellUsed:1.24,caps:true};
for(const k in FXDEF)if(S.fx[k]===undefined)S.fx[k]=FXDEF[k];
S.alarms=store.get('alarms',[]);
S.musPos=S.musPos||0;
function saveFx(){store.set('fx3',S.fx)}
function todayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function hmNow(){const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function inWin(f,t){if(!f||!t)return false;const n=hmNow();return f<=t?(n>=f&&n<t):(n>=f||n<t)}
function fmtDur(sec){sec=Math.round(sec||0);if(sec<60)return arabNum(sec)+' ثا';const m=Math.floor(sec/60);if(m<60)return arabNum(m)+' د';return arabNum(Math.floor(m/60))+' س '+arabNum(m%60)+' د'}
function appName(id){if(!id)return id;if(id.startsWith('x_'))return (EXTRA[id.slice(2)]||{}).n||id;const a=APPS.find(x=>x.id===id);return a?a.n:id}
let _ac=null;
function tone(f,t0,dur,type,vol){try{if(!_ac)_ac=new (window.AudioContext||window.webkitAudioContext)();if(_ac.state==='suspended')_ac.resume();const t=_ac.currentTime+t0;const o=_ac.createOscillator(),gn=_ac.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(Math.max(0.02,(S.set.vol/100)*0.22*(vol||1)),t+0.012);gn.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(gn);gn.connect(_ac.destination);o.start(t);o.stop(t+dur+0.05)}catch(e){}}
function sfx(kind){}
const NICON={FaceTime:'facetime',Messages:'messages','App Store':'appstore','الإعدادات':'settings',WhatsApp:'whatsapp',Telegram:'telegram',Messenger:'messenger',Instagram:'instagram',Facebook:'facebook',Discord:'discord',AirDrop:'photos','وقت الشاشة':'settings','المنبه':'clock','المؤقت':'clock','ملخص الإشعارات':'settings'};
function notify(app,title,text,fn,opts){
opts=opts||{};
pushNotif(app,(title&&title!==app?title+' — ':'')+text);
renderLockX();
const muted=S.set.dnd&&S.fx.focus.mute.includes(app);
const appOff=S.fx.appNotif&&S.fx.appNotif[app]===false;
if(opts.pop===false||muted||appOff||S.locked)return;
showBanner(app,(title&&title!==app?title+' — ':'')+text,fn);
}
function showBanner(app,text,fn){
const b=$('#banner');if(!b)return;
const k=NICON[app]||(ICONS[app]?app:'messages');
b.innerHTML='<span style="flex:0 0 auto;width:34px;height:34px;display:block">'+icImg(ICONS[k]||ICONS.messages)+'</span><span class="bt"><b>'+escH(app)+'</b>'+escH(text)+'</span>';
b.classList.add('show');
b.onclick=e=>{e.stopPropagation();b.classList.remove('show');if(fn)fn();else showNC()};
clearTimeout(b._h);b._h=setTimeout(()=>b.classList.remove('show'),6000);
}
function renderNC(){
const items=S.notifs||[];const st=S.fx.nstyle||'stack';
let body='';
if(!items.length)body='<div style="text-align:center;opacity:.75;padding:22px 6px">لا توجد إشعارات جديدة</div>';
else if(st==='count')body='<div class="ncCard" style="align-items:center">'+notifIcon(items[0].app)+'<span style="flex:1"><b style="font-size:15px">'+arabNum(items.length)+' إشعارات</b><br><span style="font-size:12.5px;opacity:.85">آخر واحد: '+escH(items[0].app)+' — '+escH(items[0].text)+'</span></span></div>';
else if(st==='list')body=items.map(n=>'<div class="ncCard">'+notifIcon(n.app)+'<span style="flex:1"><span style="display:flex;justify-content:space-between"><b style="font-size:13px">'+escH(n.app)+'</b><span style="font-size:11px;opacity:.75">'+relTime(n.t)+'</span></span><span style="font-size:13.5px;opacity:.95;line-height:1.5">'+escH(n.text)+'</span></span></div>').join('');
else{const byApp={};items.forEach(n=>{(byApp[n.app]=byApp[n.app]||[]).push(n)});
body=Object.keys(byApp).map(a=>{const arr=byApp[a];return '<div class="ncCard">'+notifIcon(a)+'<span style="flex:1"><span style="display:flex;justify-content:space-between"><b style="font-size:13px">'+escH(a)+(arr.length>1?' <span style="background:rgba(255,255,255,.35);border-radius:9px;padding:0 7px;font-size:11px">'+arabNum(arr.length)+'</span>':'')+'</b><span style="font-size:11px;opacity:.75">'+relTime(arr[0].t)+'</span></span>'+arr.slice(0,3).map(n=>'<span style="display:block;font-size:13px;opacity:.95">'+escH(n.text)+'</span>').join('')+'</span></div>'}).join('')}
$('#nc').innerHTML='<div style="text-align:center;margin-bottom:8px"><div style="font-size:15px;font-weight:600">'+$('#lockDate').textContent+'</div><div style="font-size:52px;font-weight:700;line-height:1.05">'+fmtTime()+'</div></div>'+
'<div style="font-weight:700;font-size:15px;margin:10px 2px 2px">الإشعارات</div>'+body+
'<button id="ncClear" style="margin:14px auto 4px;display:block;background:rgba(255,255,255,.18);color:#fff;border:none;padding:9px 22px;border-radius:16px;font-weight:700;cursor:pointer">مسح الكل</button>'+
'<div style="text-align:center;font-size:12px;opacity:.8;margin-top:8px">اضغط بره حتى تسكر</div>';
const c=$('#ncClear');if(c)c.addEventListener('click',e=>{e.stopPropagation();S.notifs=[];store.set('notifs',[]);renderNC();renderLockX()});
}
S._wx=null;S._wxT=0;
function wxFetch(){if(S._wx&&Date.now()-S._wxT<600000)return;fetch('https://api.open-meteo.com/v1/forecast?latitude=33.3152&longitude=44.3661&current=temperature_2m,weather_code&timezone=Asia%2FBaghdad').then(r=>r.json()).then(d=>{S._wx={t:Math.round(d.current.temperature_2m),c:d.current.weather_code};S._wxT=Date.now();updWidgets();renderLockX()}).catch(()=>{})}
function gateBlock(id){
if(!id)return false;
const ess=['settings','clock','files','shortcuts'];
const dt=S.fx.downtime;
if(dt.on&&inWin(dt.from,dt.to)&&!ess.includes(id)){toast('وقت التوقف مفعّل — '+appName(id)+' مقفل هسه');notify('وقت الشاشة','وقت التوقف','انحظر فتح '+appName(id)+' بوقت التوقف',null,{pop:false});return true}
const lim=S.fx.limits[id];
if(lim&&((S.fx.use.sec[id]||0)>=lim*60)){toast('خلص حد '+appName(id)+' اليوم — وقت الشاشة');notify('وقت الشاشة','حد التطبيق','وصلت حد '+arabNum(lim)+' دقيقة لـ '+appName(id),null,{pop:false});return true}
return false;
}
function doAuto(a){
toast('اختصار اشتغل: '+a.name);
if(a.then==='focusOn'){S.set.dnd=true;store.set('set',S.set);renderStatus()}
else if(a.then==='focusOff'){S.set.dnd=false;store.set('set',S.set);renderStatus()}
else if(a.then==='wall'){S.set.wp=Math.min(3,Math.max(0,+a.val2||0));saveSet();applyTheme()}
else if(a.then==='bright'){S.set.bright=Math.min(100,Math.max(10,+a.val2||50));store.set('set',S.set);renderStatus()}
else if(a.then==='openapp'){openApp(a.val2,null)}
else if(a.then==='lockpad'){setPad(false)}
notify('الاختصارات','اختصار',a.name+' اشتغل',null,{pop:false});
}
function runAutos(evt,val){
(S.fx.autos||[]).forEach(a=>{
if(!a.on)return;let fire=false;
if(a.when==='battery'&&evt==='tick'){if(S.batt.pct<=(+a.val||20)){if(!a._f){a._f=1;fire=true}}else if(S.batt.pct>(+a.val||20)+5)a._f=0}
if(a.when==='time'&&evt==='tick'&&hmNow()===a.val&&a._d!==todayKey()){a._d=todayKey();fire=true}
if(a.when==='appopen'&&evt==='appopen'&&val===a.val)fire=true;
if(fire)doAuto(a);
});
}
function ringAlert(title,text){
stopRing();
S._ring=title;
notify(title,title,text,()=>{stopRing()});
showAlarmCard(title,text);
sfx('alarm');
let n=0;S._ringIv=setInterval(()=>{sfx('alarm');if(++n>9||!S._ring)clearInterval(S._ringIv)},1600);
}
function showAlarmCard(title,text){
const old=$('#alarmCard');if(old)old.remove();
const d=document.createElement('div');d.id='alarmCard';
d.innerHTML='<div class="big" style="font-size:17px">'+escH(title)+'</div><p style="margin:6px 0 12px">'+escH(text)+'</p><button class="btn" id="alarmStop">إيقاف</button> <button class="btn gray" id="alarmSnooze">غفوة ٥ د</button>';
$('#screen').appendChild(d);
$('#alarmStop').addEventListener('click',stopRing);
$('#alarmSnooze').addEventListener('click',()=>{stopRing();S.timerEnd=Date.now()+5*60000;S.timerKind='غفوة';toast('غفوة — يرن بعد ٥ دقايق');renderLockX()});
}
function stopRing(){S._ring=null;clearInterval(S._ringIv);const d=$('#alarmCard');if(d)d.remove()}
function alarmTick(){
const now=hmNow(),tk=todayKey();
(S.alarms||[]).forEach(a=>{if(a.on&&a.t===now&&a._f!==tk){a._f=tk;store.set('alarms',S.alarms);ringAlert('المنبه','منبه الساعة '+arabNum(a.t))}});
}
function timerTick(){
if(S.timerEnd&&Date.now()>=S.timerEnd){S.timerEnd=0;const k=S.timerKind||'المؤقت';S.timerKind='';ringAlert(k,'خلص الوقت');updWidgets();renderLockX()}
}
setInterval(()=>{
try{
if(S.musicPlay){S.musPos++;const dur=[231,212,354][S.album||0]||231;if(S.musPos>=dur){S.album=((S.album||0)+1)%ALBUMS.length;S.musPos=0}
document.querySelectorAll('[data-musbar]').forEach(b=>b.style.width=Math.min(100,S.musPos/dur*100)+'%');
document.querySelectorAll('[data-must]').forEach(e2=>e2.textContent=ALBUMS[S.album||0][0]+' — '+ALBUMS[S.album||0][1]);}
const tk=todayKey();if(S.fx.use.date!==tk){S.fx.use={date:tk,sec:{}};saveFx()}
if(S.app&&S.padOut){S.fx.use.sec[S.app]=(S.fx.use.sec[S.app]||0)+1;if(S.fx.use.sec[S.app]%15===0)saveFx()}
alarmTick();timerTick();
if(S.locked&&(S.timerEnd||S.musicPlay||S._ring))renderLockX();
}catch(e){}
},1000);
setInterval(()=>{
try{
updWidgets();if(S.locked)renderLockX();
}catch(e){}
},5000);
setInterval(()=>{
try{
summaryTick();focusSchedTick();runAutos('tick');
if(S.padOut){chatWatch();
if(Date.now()-(S._peerT||0)>20000){S._peerT=Date.now();fbPost('/presence',{u:myName(),sid:S.sid,ts:Date.now()});airPoll()}}
}catch(e){}
},8000);
function summaryTick(){
const tk=todayKey();
if(S.fx.lastSum===tk)return;
if(hmNow()>=(S.fx.summary||'21:00')&&(S.notifs||[]).length){S.fx.lastSum=tk;saveFx();notify('ملخص الإشعارات','ملخص الإشعارات','عندك '+arabNum(S.notifs.length)+' إشعارات بانتظارك',()=>showNC(),{pop:true})}
}
function focusSchedTick(){
if(!S.fx.focus.sched)return;
const want=inWin(S.fx.focus.from,S.fx.focus.to);
if(want!==!!S.set.dnd){S.set.dnd=want;store.set('set',S.set);renderStatus();notify('التركيز','التركيز',want?'انفعل التركيز حسب الجدولة':'انطفأ التركيز حسب الجدولة',null,{pop:!want})}
}
async function chatWatch(){
const rooms={whatsapp:'WhatsApp',messenger:'Messenger',telegram:'Telegram'};
for(const k of Object.keys(rooms)){
if(S.app==='x_'+k)continue;
if(!S.installed.includes(k))continue;
const d=await fbGet('/rooms/'+k+'/msgs');if(!d)continue;
const arr=Object.values(d).sort((a,b)=>(a.ts||0)-(b.ts||0));const last=arr[arr.length-1];if(!last)continue;
if(!S.fx.seen[k]){S.fx.seen[k]=last.ts;saveFx();continue}
if(last.ts>S.fx.seen[k]&&last.u!==myName()){S.fx.seen[k]=last.ts;saveFx();notify(rooms[k],rooms[k],'رسالة جديدة من '+last.u+': '+String(last.t||'').slice(0,40),()=>openApp('x_'+k,null))}
}
}
async function airPoll(){
const pr=await fbGet('/presence');
if(pr){const seenSid={};S.fx.peers=Object.values(pr).filter(x=>Date.now()-(x.ts||0)<90000&&x.sid!==S.sid&&x.u).filter(x=>!seenSid[x.sid]&&(seenSid[x.sid]=1))}
const d=await fbGet('/airdrop');if(!d)return;
if(S.fx.airdrop==='off'){Object.values(d).forEach(x=>{S.fx.airSeen=Math.max(S.fx.airSeen||0,x.ts||0)});saveFx();return}
Object.values(d).filter(x=>(x.ts||0)>(S.fx.airSeen||0)&&(x.to==='all'||x.to===S.sid)&&x.sid!==S.sid).sort((a,b)=>(a.ts||0)-(b.ts||0)).forEach(x=>{
S.fx.airSeen=Math.max(S.fx.airSeen||0,x.ts||0);saveFx();
notify('AirDrop','AirDrop','وصلك '+(x.kind==='img'?'صورة':'نص')+' من '+x.from,()=>acceptAir(x),{pop:true});
});
}
function acceptAir(x){
if(x.kind==='img'&&x.data){S.photos.unshift(x.data);if(S.photos.length>12)S.photos.pop();store.set('photos',S.photos);renderHome();toast('انحفظت صورة AirDrop بالمعرض')}
else toast('AirDrop: '+String(x.data||'').slice(0,60));
}

/* ===== lock screen 3.0 ===== */
function daysAr(){return ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']}
function monthsAr(){return ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']}
function lockWidHTML(){
const L=S.fx.lock,out=[],d=new Date();
(L.widgets||[]).forEach(w=>{
if(w==='battery')out.push('<span class="lwid">'+g('battery-charging','#fff',15)+' '+arabNum(Math.round(S.batt.pct))+'٪</span>');
if(w==='weather')out.push('<span class="lwid">بغداد '+(S._wx?S._wx.t+'°':'…')+'</span>');
if(w==='music')out.push('<span class="lwid">'+g(S.musicPlay?'pause':'play','#fff',14)+' <span data-must>'+(S.musicPlay?ALBUMS[S.album||0][0]:'Music')+'</span></span>');
if(w==='calendar')out.push('<span class="lwid">'+daysAr()[d.getDay()]+' '+arabNum(d.getDate())+' '+monthsAr()[d.getMonth()]+'</span>');
});
return out.join('');
}
function liveHTML(){
if(S._ring)return '<div class="liveCard"><span style="font-size:20px">'+g('alarm','#ffb340',22)+'</span><span style="flex:1"><b>'+escH(S._ring)+'</b><br><span class="mut2">جاي يرن — وقّفه من البطاقة الطافية</span></span></div>';
if(S.timerEnd){const s=Math.max(0,Math.round((S.timerEnd-Date.now())/1000));return '<div class="liveCard"><span style="font-size:20px">'+g('timer','#ffb340',22)+'</span><span style="flex:1"><b>المؤقت</b><br><span style="font-size:16px">'+Math.floor(s/60)+':'+String(s%60).padStart(2,'0')+'</span></span></div>'}
if(S.musicPlay){const a=ALBUMS[S.album||0];const dur=[231,212,354][S.album||0]||231;return '<div class="liveCard"><img src="'+a[2]+'" alt=""><span style="flex:1;min-width:0"><b data-must>'+a[0]+' — '+a[1]+'</b><span class="lbar"><i data-musbar style="width:'+(S.musPos/dur*100)+'%"></i></span></span><button class="lplay" data-lmus>'+g('pause','#fff',20)+'</button></div>'}
return '';
}
function wipeDevice(){if(!confirm('تخطي iCloud يمسح كل شي: تطبيقاتك المنزلة وصورك وملاحظاتك وحساباتك، ويرجع الآيباد جديد بتطبيقات النظام فقط. متأكد؟'))return;Object.keys(localStorage).filter(k=>k.startsWith('rioipad-')||k==='rio-phmeta'||k==='rio-actlock').forEach(k=>localStorage.removeItem(k));location.reload()}
function renderLockX(){
const L=$('#lock');if(!L)return;
let x=$('#lockX');
if(!x){x=document.createElement('div');x.id='lockX'}
const _lt=document.querySelector('#lockTime');if(_lt)_lt.after(x);else L.appendChild(x)
const pinAsk=S._pinAsk&&S.locked&&(S.fx.pass||S.fx.faceid);
const _L0=$('#lock');if(_L0&&!S.fx.ownerLock){_L0.style.backdropFilter='';_L0.style.webkitBackdropFilter='';_L0.style.background=''}
if(S.fx.ownerLock){
const _olt=$('#lockTime'),_old=$('#lockDate');if(_olt)_olt.style.display='none';if(_old)_old.style.display='none';
const _Lb=$('#lock');if(_Lb){_Lb.style.backdropFilter='none';_Lb.style.webkitBackdropFilter='none';_Lb.style.background='rgba(0,0,0,.94)'}
const _aid=(S.apple&&S.apple.id)||'';
const _mask=_aid?_aid.slice(0,1)+'•••'+_aid.slice(_aid.indexOf('@')):'';
x.innerHTML='<div id="ownLock" style="text-align:center;color:#fff;padding:40px 26px;animation:pinIn .35s">'+
'<div style="width:76px;height:76px;border-radius:50%;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">'+g('lock-closed','#fff',34)+'</div>'+
'<div style="font-size:22px;font-weight:800;margin-bottom:10px">مقيد بالمالك</div>'+
'<p style="font-size:13.5px;line-height:2;opacity:.85;margin:0 0 18px">هذا الآيباد تقيد بعد محاولات رمز دخول خاطئة كثيرة.<br>أدخل بريد iCloud الخاص بالمالك لفتحه.</p>'+
(_aid?'<input id="ownMail" type="email" inputmode="email" autocomplete="off" autocapitalize="off" placeholder="بريد iCloud" dir="ltr" style="width:100%;padding:13px;border:none;border-radius:12px;font-size:16px;text-align:center;margin-bottom:10px;box-sizing:border-box"><button id="ownGo" style="width:100%;padding:13px;border:none;border-radius:12px;background:#0a84ff;color:#fff;font-size:16px;font-weight:700;cursor:pointer">فتح الآيباد</button><p class="mut2" style="margin-top:10px;font-size:12px">تلميح الحساب: '+escH(_mask)+'</p>'
:'<div id="ownTimer" style="font-size:17px;font-weight:700"></div><p class="mut2" style="font-size:12.5px;margin-top:8px;line-height:1.8">لا يوجد حساب iCloud مسجل<br>انتظر ثم حاول مجدداً</p>')+
'<button id="ownSkip" style="background:none;border:none;color:#fff;opacity:.65;font-size:13px;margin-top:14px;cursor:pointer;text-decoration:underline">تخطي iCloud — مسح الجهاز والبدء من جديد</button>'+
'</div>';
const _go=x.querySelector('#ownGo');
if(_go)_go.addEventListener('click',()=>{
const _v=(x.querySelector('#ownMail').value||'').trim().toLowerCase();
if(_v&&_v===_aid.toLowerCase()){S.fx.ownerLock=false;S.fx.badPin=0;saveFx();_unlock0()}
else toast('بريد iCloud غير صحيح — حاول مرة ثانية')});
const _sk=x.querySelector('#ownSkip');if(_sk)_sk.addEventListener('click',()=>wipeDevice());
else{let _sec=60;const _tEl=x.querySelector('#ownTimer');const _tick=()=>{if(_tEl)_tEl.textContent='حاول بعد '+arabNum(_sec)+' ثانية'};_tick();
const _iv=setInterval(()=>{if(!S.fx.ownerLock){clearInterval(_iv);return}_sec--;_tick();if(_sec<=0){clearInterval(_iv);S.fx.ownerLock=false;S.fx.badPin=0;saveFx();renderLockX()}},1000)}
return}

const nots=(S.notifs||[]).slice(0,(S.fx.pass||S.fx.faceid)?2:3);
x.innerHTML=pinAsk?'':'<div class="lwidRow">'+lockWidHTML()+'</div>'+liveHTML()+
(nots.length?'<div class="lnots">'+nots.map(n=>'<div class="lnot">'+notifIcon(n.app)+'<span style="flex:1;text-align:right"><b>'+escH(n.app)+'</b><br><span>'+escH(n.text)+'</span></span><span class="mut2">'+relTime(n.t)+'</span></div>').join('')+'</div>':'');
const lt=$('#lockTime'),ld=$('#lockDate');
if(lt){lt.style.color=S.fx.lock.wcol;lt.style.fontWeight=S.fx.lock.bold?'700':'300';lt.style.display=pinAsk?'none':''}
if(ld){ld.style.color=S.fx.lock.wcol;ld.style.display=pinAsk?'none':''}
if(S.fx.lock.shuffle&&S.photos.length){L.style.backgroundImage='linear-gradient(rgba(10,12,18,.45),rgba(10,12,18,.45)),url("'+S.photos[0]+'")';L.style.backgroundSize='cover';L.style.backgroundPosition='center'}else{L.style.backgroundImage=''}
const pb=x.querySelector('[data-lmus]');if(pb)pb.addEventListener('click',e=>{e.stopPropagation();S.musicPlay=false;renderLockX();updWidgets()});
const pzOld=x.querySelector('#pinZone');if(pzOld)pzOld.remove();
if(pinAsk){
const pz=document.createElement('div');pz.id='pinZone';pz.style.marginTop='12px';
pz.innerHTML=(S.fx.faceid?'<button id="fidBtn" class="pinFid">'+g('scan','#fff',20)+'<span>Face ID</span></button>':'')+
(S.fx.pass?'<div class="pinTitle">أدخل رمز الدخول</div><div id="pinDots">'+'○'.repeat(S.fx.passLen||4)+'</div><div class="pinGrid">'+[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(n=>'<button data-pin="'+n+'">'+(n===''?'':n)+'</button>').join('')+'</div>':'')+
'<button id="pinCancel">إلغاء</button>';
x.appendChild(pz);x.scrollTop=x.scrollHeight;
const pc=pz.querySelector('#pinCancel');if(pc)pc.addEventListener('click',e=>{e.stopPropagation();S._pinAsk=false;sfx('click');renderLockX();});
const fb=pz.querySelector('#fidBtn');if(fb)fb.addEventListener('click',e=>{e.stopPropagation();fb.textContent='جاي يتعرف على وجهك…';setTimeout(()=>{S._pinAsk=false;_unlock0()},750)});
pz.querySelectorAll('[data-pin]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const v=b.dataset.pin;
if(v==='\u232b')S._pin=(S._pin||'').slice(0,-1);else if(v!==''&&((S._pin||'').length<(S.fx.passLen||4)))S._pin=(S._pin||'')+v;
const dots=$('#pinDots');if(dots)dots.textContent='\u25cf'.repeat((S._pin||'').length)+'\u25cb'.repeat(Math.max(0,(S.fx.passLen||4)-(S._pin||'').length));
sfx('click');
if((S._pin||'').length===(S.fx.passLen||4)){if(simpHash(S._pin)===S.fx.pass){S._pin='';S._pinAsk=false;S.fx.badPin=0;saveFx();_unlock0()}else{S._pin='';S.fx.badPin=(S.fx.badPin||0)+1;if(S.fx.badPin>=5){S.fx.ownerLock=true;saveFx();renderLockX();return}if(dots){dots.textContent='○'.repeat(S.fx.passLen||4);dots.classList.remove('shake');void dots.offsetWidth;dots.classList.add('shake');}toast('رمز غلط — حاول مرة ثانية');sfx('lock')}}
}));
}
}
let _lockWasShown=false;
new MutationObserver(()=>{const _sh=$('#lock').classList.contains('show');if(_sh&&!_lockWasShown)S._pinAsk=false;_lockWasShown=_sh;if(_sh)renderLockX()}).observe($('#lock'),{attributes:true,attributeFilter:['class']});
(function(){
const L=$('#lock');let sy=null;
L.addEventListener('touchstart',e=>{if(e.target.closest('.lbtn')||e.target.closest('button')||e.target.closest('input,textarea')){sy=null;return}sy=e.touches[0].clientY},{passive:true});
L.addEventListener('touchmove',e=>{if(sy===null)return;const dy=e.touches[0].clientY-sy;if(dy<0)L.style.transform='translateY('+Math.max(dy,-160)+'px)'},{passive:true});
L.addEventListener('touchend',e=>{if(sy===null)return;const dy=e.changedTouches[0].clientY-sy;sy=null;L.style.transform='';if(dy<-55)unlock()},{passive:true});
let wasOut=false;
new MutationObserver(()=>{const out=!$('#padWrap').classList.contains('away');if(wasOut&&!out)sfx('lock');wasOut=out}).observe($('#padWrap'),{attributes:true,attributeFilter:['class']});
})();
/* ===== live home widgets + today view ===== */
function mountWidgets(){
const w=document.querySelector('.homeWidget');if(!w||w.dataset.live)return;
w.dataset.live='1';
w.innerHTML=
'<div id="wCal" style="flex:1;background:#fff;border-radius:20px;padding:10px 12px;color:#111;box-shadow:0 2px 8px rgba(0,0,0,.12);cursor:pointer"><div style="color:#ff3b30;font-weight:700;font-size:12px" id="wCalD"></div><div style="font-size:30px;font-weight:700;line-height:1.02" id="wCalN"></div><div style="font-size:11.5px;color:#8e8e93;margin-top:2px" id="wCalS">لا توجد أحداث اليوم</div></div>'+
'<div id="wWx" style="flex:1;background:linear-gradient(160deg,#4aa8ff,#1668dc);border-radius:20px;padding:10px 12px;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.12);cursor:pointer"><div style="font-size:12.5px;font-weight:600">بغداد</div><div style="font-size:28px;font-weight:700;line-height:1.05" id="wWxT">…°</div><div style="font-size:11.5px;opacity:.92">الطقس الحقيقي — البطارية <b id="wBatt"></b></div></div>';
$('#wCal').addEventListener('click',e=>{e.stopPropagation();openApp('calendar',null)});
$('#wWx').addEventListener('click',e=>{e.stopPropagation();openApp('weather',null)});
updWidgets();
}
function updWidgets(){
const w=document.querySelector('.homeWidget');if(!w||!w.dataset.live)return;
const d=new Date();
const cd=$('#wCalD'),cn=$('#wCalN'),cs=$('#wCalS');
if(cd){cd.textContent=daysAr()[d.getDay()];cn.textContent=arabNum(d.getDate());
const na=(S.alarms||[]).filter(a=>a.on).sort((a,b)=>a.t<b.t?-1:1)[0];
cs.textContent=S.timerEnd?'المؤقت شغال':(na?'منبه '+arabNum(na.t):'لا توجد أحداث اليوم')}
const wt=$('#wWxT'),wb=$('#wBatt');if(wt)wt.textContent=S._wx?S._wx.t+'°':'…°';if(wb)wb.textContent=arabNum(Math.round(S.batt.pct))+'٪';
wxFetch();
}
/* ===== share sheet + AirDrop ===== */
function closeShare(){const d=$('#shareSheet');if(d)d.remove()}
function showShare(o){
closeShare();
const d=document.createElement('div');d.id='shareSheet';
const peers=(S.fx.peers||[]).slice(0,5);
d.innerHTML='<div class="sheetCard"><div class="sheetGrab"></div><div class="big" style="font-size:16px">'+escH(o.title||'مشاركة')+'</div>'+
'<div class="mut" style="margin:3px 0 10px">AirDrop — ابعث لأي لاعب Rio أونلاين قريب</div>'+
'<div class="airRow">'+peers.map(p=>'<button class="airP" data-air="'+escH(p.sid)+'"><span>'+escH((p.u||'R').slice(0,1).toUpperCase())+'</span><b>'+escH(p.u||'لاعب')+'</b></button>').join('')+
'<button class="airP" data-air="all"><span style="font-size:15px">الكل</span><b>كل القريبين</b></button></div>'+
'<div class="sheetActs"><button data-shact="copy">نسخ</button><button data-shact="insta">انشر بانستغرام Rio</button><button data-shact="cancel">إلغاء</button></div></div>';
$('#screen').appendChild(d);
d.addEventListener('click',e=>{if(e.target===d)closeShare()});
d.querySelectorAll('[data-air]').forEach(b=>b.addEventListener('click',()=>{
fbPost('/airdrop',{from:myName(),sid:S.sid,to:b.dataset.air,kind:o.img?'img':'text',data:o.img||o.text||'',ts:Date.now()});
closeShare();toast('انبعث بـ AirDrop');sfx('send');
}));
d.querySelectorAll('[data-shact]').forEach(b=>b.addEventListener('click',()=>{
const a=b.dataset.shact;closeShare();
if(a==='copy'){try{navigator.clipboard.writeText(o.img||o.text||'');toast('انسخ')}catch(e){toast('ما كدرت أنسخ')}}
if(a==='insta'){if(o.img){fbPost('/rooms/instagram/posts',{u:myName(),img:o.img,ts:Date.now()});toast('انحفظ للإرسال بانستغرام Rio')}else toast('النص يتنسخ بس')}
}));
}
/* ===== accessibility + icon appearance ===== */
function applyFx(){
const scr=$('#screen');if(!scr)return;const fx=S.fx;
scr.classList.toggle('icons-dark',fx.icons.mode==='dark');
scr.classList.toggle('icons-tinted',fx.icons.mode==='tinted');
scr.classList.toggle('icons-big',!!fx.icons.big);
scr.classList.toggle('icons-nolabel',!!fx.icons.nolabel);
scr.classList.toggle('acc-bold',!!fx.acc.bold);
scr.classList.toggle('acc-dzoom',!!fx.acc.dzoom);
scr.classList.toggle('acc-rm',!!fx.acc.reduce);
let ns=$('#nsLayer');
if(fx.acc.night){if(!ns){ns=document.createElement('div');ns.id='nsLayer';scr.appendChild(ns)}}else if(ns)ns.remove();
}

/* ===== settings subpages 3.0 ===== */
const SET3_PAGES=['bluetooth','cellular','hotspot','vpn','sounds','general','camera','display','search','siri','faceid','sos','privacy','gamecenter','wallet','passwords','appshub','appdetail','gupdate','gstorage','gdatetime','gkeyboard','glang','gairdrop','greset'];
function setSubPage(el){
const p=S.setPage,fx=S.fx;
if(SET3_PAGES.includes(p)){setPageX(el);return}
const back='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>';
const sw=(id,on)=>'<label class="switch"><input type="checkbox" id="'+id+'" '+(on?'checked':'')+'><i></i></label>';
const sq2=(c,gl)=>'<span class="sq" style="background:'+c+'">'+g(gl,'#fff',16)+'</span>';
const row2=(label,left,val)=>'<div class="setrow"><span style="display:flex;align-items:center;gap:9px;flex:1">'+left+label+'</span>'+(val||'')+'</div>';
const grp=h=>'<div class="setgroup">'+h+'</div>';
const done=()=>{const b=$('#setBack');if(b)b.addEventListener('click',()=>{S.setPage='main';appSettings(el)})};
if(p==='ncset'){
const seg=['stack','list','count'].map((m,i)=>'<button data-nstyle="'+m+'" class="'+(fx.nstyle===m?'on':'')+'">'+['مكدّسة','قائمة','عدد'][i]+'</button>').join('');
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">الإشعارات</div>'+
'<div class="rbx-sec" style="margin-top:0">أسلوب العرض</div><div class="segRow">'+seg+'</div>'+
'<div class="rbx-sec">الملخص المجدول</div>'+grp(row2('وقت الملخص',sq2('#ff9f0a','notifications'),'<input type="time" id="nsSum" value="'+fx.summary+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px">'))+
'<p class="mut" style="margin:4px 2px 10px">من يوصل الوقت ينزل ملخص بعدد إشعاراتك مرة وحدة باليوم.</p>'+
'<div class="rbx-sec">الأخيرة</div>'+grp((S.notifs||[]).length?(S.notifs||[]).slice(0,4).map(n=>row2(escH(n.app),'',('<span class="mut">'+escH(n.text.slice(0,28))+'</span>'))).join(''):row2('لا إشعارات','',''))+
'<button class="btn gray" id="nsClear" style="width:100%;margin-top:8px">مسح كل الإشعارات</button>';
done();
el.querySelectorAll('[data-nstyle]').forEach(b=>b.addEventListener('click',()=>{fx.nstyle=b.dataset.nstyle;saveFx();appSettings(el);toast('انحفظ أسلوب الإشعارات')}));
$('#nsSum').addEventListener('change',e=>{fx.summary=e.target.value||'21:00';fx.lastSum='';saveFx();toast('انضبط الملخص '+fx.summary)});
$('#nsClear').addEventListener('click',()=>{S.notifs=[];store.set('notifs',[]);renderLockX();appSettings(el)});
return;
}
if(p==='focus'){
const names=[...APPS.map(a=>a.n),'WhatsApp','Telegram','Messenger','Instagram','Facebook','Snapchat','X','Discord','FaceTime','Messages','AirDrop','App Store'];
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">التركيز</div>'+
grp(row2('عدم الإزعاج',sq2('#5e5ce6','moon'),sw('fMaster',S.set.dnd)))+
'<div class="rbx-sec">الجدولة</div>'+
grp(row2('تفعيل مجدول',sq2('#5e5ce6','timer'),sw('fSched',fx.focus.sched))+
row2('من',sq2('#8e8e93','time'),'<input type="time" id="fFrom" value="'+fx.focus.from+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px">')+
row2('إلى',sq2('#8e8e93','time'),'<input type="time" id="fTo" value="'+fx.focus.to+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px">'))+
'<div class="rbx-sec">تطبيقات مكتومة أثناء التركيز</div><p class="mut" style="margin:2px 2px 8px">إشعاراتها توصل بصمت لمركز الإشعارات بدون بانر.</p>'+
'<div style="display:flex;flex-wrap:wrap;gap:7px">'+names.map(n=>'<button class="chip '+(fx.focus.mute.includes(n)?'on':'')+'" data-mute="'+escH(n)+'">'+escH(n)+'</button>').join('')+'</div>';
done();
$('#fMaster').addEventListener('change',e=>{S.set.dnd=e.target.checked;store.set('set',S.set);renderStatus();toast(S.set.dnd?'التركيز شغال':'التركيز وقف')});
$('#fSched').addEventListener('change',e=>{fx.focus.sched=e.target.checked;saveFx();focusSchedTick()});
$('#fFrom').addEventListener('change',e=>{fx.focus.from=e.target.value||'22:00';saveFx();focusSchedTick()});
$('#fTo').addEventListener('change',e=>{fx.focus.to=e.target.value||'07:00';saveFx();focusSchedTick()});
el.querySelectorAll('[data-mute]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.mute;fx.focus.mute=fx.focus.mute.includes(n)?fx.focus.mute.filter(x=>x!==n):[...fx.focus.mute,n];saveFx();appSettings(el)}));
return;
}
if(p==='screen'){
const sec=fx.use.sec||{};const top=Object.entries(sec).sort((a,b)=>b[1]-a[1]);
const total=top.reduce((a,r)=>a+r[1],0);const mx=Math.max(1,...top.map(r=>r[1]));
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">مدة استخدام الجهاز</div>'+
'<div class="card" style="text-align:center"><div class="mut">اليوم</div><div style="font-size:30px;font-weight:700">'+fmtDur(total)+'</div></div>'+
'<div class="rbx-sec">الأكثر استخداماً</div>'+grp(top.length?top.slice(0,6).map(r=>'<div class="setrow"><span style="flex:1">'+appName(r[0])+'</span><span style="width:104px;height:7px;background:#e3e3e8;border-radius:4px;overflow:hidden"><span style="display:block;height:100%;width:'+Math.round(r[1]/mx*100)+'%;background:#5e5ce6"></span></span><span class="mut" style="width:56px">'+fmtDur(r[1])+'</span></div>').join(''):row2('لا استخدام اليوم','',''))+
'<div class="rbx-sec">حدود التطبيقات (دقائق/يوم)</div>'+
(Object.keys(fx.limits).length?Object.entries(fx.limits).map(([id,m])=>'<div class="card row"><span style="flex:1"><b>'+appName(id)+'</b><br><span class="mut">'+arabNum(m)+' دقيقة — استُخدم '+fmtDur(sec[id]||0)+'</span></span><button class="btn red" data-limdel="'+id+'" style="padding:6px 10px">حذف</button></div>').join(''):'<p class="mut" style="margin:2px">لا حدود مضبوطة</p>')+
'<div class="card"><div class="row"><select id="limApp" style="flex:1;padding:9px;border-radius:10px">'+APPS.map(a=>'<option value="'+a.id+'">'+a.n+'</option>').join('')+S.installed.filter(id=>EXTRA[id]).map(id=>'<option value="x_'+id+'">'+EXTRA[id].n+'</option>').join('')+'</select>'+
'<select id="limMin" style="padding:9px;border-radius:10px"><option>15</option><option selected>30</option><option>60</option><option>120</option></select><button class="btn" id="limAdd">ضبط</button></div></div>'+
'<div class="rbx-sec">وقت التوقف</div>'+
grp(row2('وقت التوقف',sq2('#5e5ce6','moon'),sw('dtOn',fx.downtime.on))+
row2('من',sq2('#8e8e93','time'),'<input type="time" id="dtFrom" value="'+fx.downtime.from+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px">')+
row2('إلى',sq2('#8e8e93','time'),'<input type="time" id="dtTo" value="'+fx.downtime.to+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px">'))+
'<p class="mut" style="margin:4px 2px">بوقت التوقف تنقفل التطبيقات كلها عدا الإعدادات والساعة والملفات والاختصارات.</p>';
done();
el.querySelectorAll('[data-limdel]').forEach(b=>b.addEventListener('click',()=>{delete fx.limits[b.dataset.limdel];saveFx();appSettings(el)}));
$('#limAdd').addEventListener('click',()=>{fx.limits[$('#limApp').value]=+$('#limMin').value;saveFx();appSettings(el);toast('انضبط الحد')});
$('#dtOn').addEventListener('change',e=>{fx.downtime.on=e.target.checked;saveFx();toast('انسجل وقت التوقف')});
$('#dtFrom').addEventListener('change',e=>{fx.downtime.from=e.target.value||'23:00';saveFx()});
$('#dtTo').addEventListener('change',e=>{fx.downtime.to=e.target.value||'06:00';saveFx()});
return;
}
if(p==='acc'){
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">إمكانية الوصول</div>'+
grp(row2('Night Shift',sq2('#ff9f0a','moon'),sw('acNight',fx.acc.night))+
row2('تقليل الحركة',sq2('#30b0c7','accessibility'),sw('acReduce',fx.acc.reduce))+
row2('نص عريض',sq2('#111','text'),sw('acBold',fx.acc.bold))+
row2('تكبير العرض',sq2('#0a84ff','search'),sw('acDzoom',fx.acc.dzoom)))+
'<p class="mut" style="margin:4px 2px;line-height:1.8">Night Shift يلوّن الشاشة بالدافي لليل، تقليل الحركة يخفف الأنميشن، والنص العريض وتكبير العرض يكبرون الواجهة — كلها تنطبق فوراً.</p>';
done();
const bindA=(id,key)=>{const e2=$(id);if(e2)e2.addEventListener('change',()=>{fx.acc[key]=e2.checked;saveFx();applyFx();toast('انطبق على النظام')})};
bindA('#acNight','night');bindA('#acReduce','reduce');bindA('#acBold','bold');bindA('#acDzoom','dzoom');
return;
}
if(p==='home'){
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">الشاشة الرئيسية</div>'+
'<div class="rbx-sec" style="margin-top:0">مظهر الأيقونات</div><div class="segRow">'+['light','dark','tinted'].map((m,i)=>'<button data-imode="'+m+'" class="'+(fx.icons.mode===m?'on':'')+'">'+['فاتح','داكن','ملوّن'][i]+'</button>').join('')+'</div>'+
'<div class="rbx-sec">الحجم والتسمية</div>'+
grp(row2('أيقونات كبيرة',sq2('#ff9500','grid'),sw('icBig',fx.icons.big))+
row2('إخفاء الأسماء',sq2('#8e8e93','text'),sw('icNoLabel',fx.icons.nolabel)))+
'<p class="mut" style="margin:4px 2px">نفس خيارات تخصيص الشاشة الرئيسية الحديثة بالآيفون — تنطبق على أيقوناتك فوراً.</p>';
done();
el.querySelectorAll('[data-imode]').forEach(b=>b.addEventListener('click',()=>{fx.icons.mode=b.dataset.imode;saveFx();applyFx();appSettings(el)}));
$('#icBig').addEventListener('change',e=>{fx.icons.big=e.target.checked;saveFx();applyFx()});
$('#icNoLabel').addEventListener('change',e=>{fx.icons.nolabel=e.target.checked;saveFx();applyFx()});
return;
}
if(p==='lockset'){
const cols=['#ffffff','#111111','#ffd60a','#0a84ff','#ff375f','#30d158'];
el.innerHTML=back+'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">شاشة القفل</div>'+
'<div class="rbx-sec" style="margin-top:0">لون الساعة</div><div style="display:flex;gap:9px;margin-bottom:12px">'+cols.map(c=>'<button data-lcol="'+c+'" style="width:38px;height:38px;border-radius:50%;background:'+c+';border:2.5px solid '+(fx.lock.wcol===c?'#0a84ff':'rgba(0,0,0,.12)')+';cursor:pointer"></button>').join('')+'</div>'+
grp(row2('ساعة عريضة',sq2('#111','text'),sw('lkBold',fx.lock.bold))+
row2('خلفية من صوري تتبدل',sq2('#30b0c7','image'),sw('lkShuffle',fx.lock.shuffle)))+
'<div class="rbx-sec">ويدجت القفل</div>'+
grp(['battery','weather','music','calendar'].map(w=>row2({battery:'البطارية',weather:'طقس بغداد',music:'الموسيقى',calendar:'التقويم'}[w],sq2('#8e8e93','grid'),sw('lkw-'+w,fx.lock.widgets.includes(w)))).join(''))+
'<p class="mut" style="margin:4px 2px">افتح القفل وشوف النتيجة — ساعة ملوّنة وويدجت وإشعاراتك على القفل.</p>';
done();
el.querySelectorAll('[data-lcol]').forEach(b=>b.addEventListener('click',()=>{fx.lock.wcol=b.dataset.lcol;saveFx();renderLockX();appSettings(el)}));
$('#lkBold').addEventListener('change',e=>{fx.lock.bold=e.target.checked;saveFx();renderLockX()});
$('#lkShuffle').addEventListener('change',e=>{fx.lock.shuffle=e.target.checked;saveFx();renderLockX();toast(S.photos.length?'':'صور أول صورة بالكاميرا حتى تتبدل الخلفية')});
['battery','weather','music','calendar'].forEach(w=>{const e2=$('#lkw-'+w);if(e2)e2.addEventListener('change',()=>{fx.lock.widgets=e2.checked?[...new Set([...fx.lock.widgets,w])]:fx.lock.widgets.filter(x=>x!==w);saveFx();renderLockX()})});
return;
}
}
/* ===== Files + Shortcuts apps ===== */
function appFiles(el){
S.filesTab=S.filesTab||'all';
const phCount=S.photos.length,used=(12400+S.photos.length*1.3+S.installed.length*86)/1000;
const notePrev=(S.notes||'').trim().slice(0,90);
const items=[];
S.photos.slice(0,6).forEach((p,i)=>items.push({t:'img',src:p,label:'صورة '+(i+1)}));
if(notePrev)items.push({t:'note',label:'ملاحظة',sub:notePrev});
const show=S.filesTab==='img'?items.filter(i=>i.t==='img'):S.filesTab==='note'?items.filter(i=>i.t==='note'):items;
el.innerHTML='<div class="big" style="font-size:20px;margin-bottom:8px">الملفات</div>'+
'<div class="card"><div class="row" style="justify-content:space-between"><b>iCloud Drive</b><span class="mut">'+used.toFixed(1)+' GB من 64 GB</span></div><div style="height:7px;background:#e9e9ee;border-radius:4px;margin-top:9px;overflow:hidden"><span style="display:block;height:100%;width:'+Math.min(96,used/64*100)+'%;background:#0a84ff"></span></div></div>'+
'<div class="row" style="margin-bottom:6px">'+[['all','الكل'],['img','الصور'],['note','النصوص']].map(t=>'<button class="btn '+(S.filesTab===t[0]?'':'gray')+'" data-ftab="'+t[0]+'" style="padding:7px 14px">'+t[1]+'</button>').join('')+'</div>'+
'<div class="rbx-sec">الأخيرة</div>'+
(show.length?show.map(i=>i.t==='img'?'<div class="card row" data-fopen="photos" style="cursor:pointer"><img src="'+i.src+'" style="width:46px;height:46px;object-fit:cover;border-radius:9px" alt=""><span style="flex:1"><b style="font-size:13.5px">'+i.label+'</b><br><span class="mut">صور — على هذا الآيباد</span></span></div>':'<div class="card row" data-fopen="notes" style="cursor:pointer"><span class="sq" style="background:#ffcc00">'+g('document-text','#fff',16)+'</span><span style="flex:1"><b style="font-size:13.5px">'+i.label+'</b><br><span class="mut">'+escH(i.sub)+'</span></span></div>').join(''):'<div class="mut" style="text-align:center;padding:20px">لا ملفات من هذا النوع بعد</div>')+
'<div class="rbx-sec">المجلدات</div><div class="setgroup">'+
'<div class="setrow" data-fopen="photos" style="cursor:pointer"><span style="display:flex;gap:9px;align-items:center;flex:1">'+g('folder','#0a84ff',18)+'الصور</span><span class="mut">'+arabNum(phCount+8)+' عناصر</span></div>'+
'<div class="setrow" data-fopen="notes" style="cursor:pointer"><span style="display:flex;gap:9px;align-items:center;flex:1">'+g('folder','#ff9f0a',18)+'المستندات</span><span class="mut">'+arabNum(notePrev?1:0)+' عناصر</span></div>'+
'<div class="setrow"><span style="display:flex;gap:9px;align-items:center;flex:1">'+g('cloud','#8e8e93',18)+'iCloud Drive</span><span class="mut">'+(S.apple.id?'المزامنة مفعلة':'سجل دخولك بـ Apple ID')+'</span></div></div>';
el.querySelectorAll('[data-ftab]').forEach(b=>b.addEventListener('click',()=>{S.filesTab=b.dataset.ftab;appFiles(el)}));
el.querySelectorAll('[data-fopen]').forEach(r=>r.addEventListener('click',()=>openApp(r.dataset.fopen,null)));
}
function autoDesc(a){
const w=a.when==='battery'?'من البطارية تنزل لـ '+a.val+'٪':a.when==='time'?'الساعة '+a.val:'من أفتح '+appName(a.val);
const t={focusOn:'يشغّل التركيز',focusOff:'يطفئ التركيز',wall:'يبدل الخلفية',bright:'يغير السطوع',openapp:'يفتح تطبيق ثاني',lockpad:'يرجع الآيباد للجيب'}[a.then]||a.then;
return w+' ← '+t;
}
function appShortcuts(el){
const A=S.fx.autos||[];
el.innerHTML='<div class="big" style="font-size:20px;margin-bottom:8px">الاختصارات</div>'+
(A.length?A.map((a,i)=>'<div class="card row"><span style="flex:1"><b style="font-size:14px">'+escH(a.name)+'</b><br><span class="mut">'+autoDesc(a)+'</span></span><label class="switch"><input type="checkbox" data-autot="'+i+'" '+(a.on?'checked':'')+'><i></i></label><button class="btn red" data-autod="'+i+'" style="padding:6px 10px">حذف</button></div>').join(''):'<div class="mut" style="text-align:center;padding:14px">لا اختصارات بعد — سوّي أول واحد جوّه</div>')+
'<div class="card"><div class="big" style="margin-bottom:8px">اختصار جديد</div>'+
'<input id="auName" type="text" placeholder="اسم الاختصار" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px">'+
'<label class="mut">من يصير…</label><select id="auWhen" style="width:100%;padding:10px;border-radius:10px;margin:4px 0 8px"><option value="battery">البطارية تنزل لقيمة</option><option value="time">يوصل وقت معين</option><option value="appopen">أفتح تطبيق معين</option></select>'+
'<input id="auVal" type="text" placeholder="القيمة: 20 أو 21:30 أو youtube" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px">'+
'<label class="mut">سوّي…</label><select id="auThen" style="width:100%;padding:10px;border-radius:10px;margin:4px 0 8px"><option value="focusOn">شغّل التركيز</option><option value="focusOff">طفّي التركيز</option><option value="wall">بدّل الخلفية (رقم 0–3 بالقيمة الثانية)</option><option value="bright">غيّر السطوع (القيمة الثانية)</option><option value="openapp">افتح تطبيق (معرّفه بالقيمة الثانية)</option><option value="lockpad">رجّع الآيباد للجيب</option></select>'+
'<input id="auVal2" type="text" placeholder="قيمة ثانية (اختياري)" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px">'+
'<button class="btn" id="auAdd" style="width:100%;padding:11px">إضافة الاختصار</button>'+
'<p class="mut" style="margin-top:8px;line-height:1.8">أمثلة: «من البطارية 20 ← شغّل التركيز»، «الساعة 22:00 ← بدّل الخلفية 2»، «من أفتح youtube ← رجّع الآيباد للجيب».</p></div>';
el.querySelectorAll('[data-autot]').forEach(c=>c.addEventListener('change',()=>{S.fx.autos[+c.dataset.autot].on=c.checked;saveFx()}));
el.querySelectorAll('[data-autod]').forEach(b=>b.addEventListener('click',()=>{S.fx.autos.splice(+b.dataset.autod,1);saveFx();appShortcuts(el)}));
$('#auAdd').addEventListener('click',()=>{
const name=$('#auName').value.trim()||'اختصاري';let val=$('#auVal').value.trim();
const when=$('#auWhen').value;
if(when==='appopen'){const hit=APPS.find(a=>a.n.toLowerCase()===val.toLowerCase()||a.id===val.toLowerCase());if(hit)val=hit.id}
S.fx.autos.push({name,when,val,then:$('#auThen').value,val2:$('#auVal2').value.trim(),on:true});saveFx();appShortcuts(el);toast('انضاف الاختصار');
});
}
document.addEventListener('dragstart',e=>e.preventDefault());
/* ===== wrappers + init ===== */
const _ors=renderStatus;
renderStatus=function(){_ors();try{const si=$('#sbIcons');if(si){if(S.set.dnd&&!si.querySelector('[data-moon]'))si.insertAdjacentHTML('afterbegin','<span data-moon="1" style="display:inline-flex">'+g('moon','#cfc9ff',14)+'</span>');if(S.fx.vpn&&!si.querySelector('[data-vpn]'))si.insertAdjacentHTML('beforeend','<span data-vpn="1" style="font-size:9.5px;font-weight:800;border:1.2px solid #fff;border-radius:4px;padding:0 3px">VPN</span>')}}catch(e){}};
const _orh=renderHome;
renderHome=function(){_orh();try{mountWidgets();applyFx()}catch(e){}};
const _occ=renderCC;
renderCC=function(){_occ();try{const sp=document.querySelector('.ccPill span:nth-of-type(2)');if(sp)sp.textContent=S.musicPlay?(ALBUMS[S.album||0][0]+' — '+ALBUMS[S.album||0][1]):'متوقف'}catch(e){}};
applyFx();
const _tv=$('#todayV');if(_tv)_tv.remove();
renderHome();
renderStatus();
wxFetch();
renderLockX();

/* ===== Settings 3.2 pages (iPhone order) ===== */
function gotoPage(p){S.setPage=p;appSettings($('#appBody'))}
function playRing(name){
const pat={'افتتاحية':[523,659,784,1046],'موجات':[392,494,587,784],'حرير':[880,988,1108,1318],'رادار':[1200,1200,1200,900],'إشعاع':[659,659,830,988]}[name]||[523,659,784];
pat.forEach((f,i)=>tone(f,i*0.14,0.16,'sine'));
}
function permDenied(what){
return '<div class="card" style="text-align:center;padding:28px 16px"><div class="big" style="font-size:17px">«'+what+'» بدون وصول</div><p class="mut" style="margin:8px 0 14px;line-height:1.8">طفّيت إذن '+what+' من الخصوصية — فعّله حتى يشتغل هنا، مثل الآيفون بالضبط.</p><button class="btn" onclick="openApp(\'settings\',null);setTimeout(()=>gotoPage(\'privacy\'),450)">فتح الخصوصية والأمان</button></div>';
}
function setPageX(el){
const p=S.setPage,fx=S.fx,s=S.set;
const sw=(id,on)=>'<label class="switch"><input type="checkbox" id="'+id+'" '+(on?'checked':'')+'><i></i></label>';
const sq2=(c,gl)=>'<span class="sq" style="background:'+c+'">'+g(gl,'#fff',16)+'</span>';
const row2=(label,left,val,go)=>'<div class="setrow" '+(go?'data-go="'+go+'" style="cursor:pointer"':'')+'><span style="display:flex;align-items:center;gap:9px;flex:1">'+left+label+'</span>'+(val||'')+'</div>';
const grp=h=>'<div class="setgroup">'+h+'</div>';
const arrow='<span class="mut">‹</span>';
const bk=(t)=>{const b=$('#setBack');if(b)b.addEventListener('click',()=>gotoPage(t))};
const head=(t,back)=>'<button class="back" id="setBack" style="margin-bottom:10px">‹ '+(back==='general'?'عام':'الإعدادات')+'</button><div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+t+'</div>';
el.querySelectorAll&&0;
const bindGo=()=>{el.querySelectorAll('[data-go]').forEach(r=>r.addEventListener('click',()=>gotoPage(r.dataset.go)))};
if(p==='bluetooth'){
el.innerHTML=head('Bluetooth')+grp(row2('Bluetooth',sq2('#0a84ff','bluetooth'),sw('pBt',s.bt)))+
'<div class="rbx-sec">أجهزتي</div>'+grp([['AirPods Pro','headset'],['Apple Watch','watch'],['مكبر Rio','speaker']].map(d=>'<div class="setrow" data-btd="'+d[0]+'" style="cursor:pointer"><span style="display:flex;gap:9px;align-items:center;flex:1">'+g(d[1],'#0a84ff',18)+d[0]+'</span><span class="mut">'+(fx.btdev[d[0]]&&s.bt?'متصل':'غير متصل')+'</span></div>').join(''))+
'<p class="mut" style="margin:4px 2px">دوس أي جهاز حتى يتصل أو ينفصل — ينحفظ اختياره.</p>';
bk('main');$('#pBt').addEventListener('change',e=>{s.bt=e.target.checked;store.set('set',s);renderStatus();appSettings(el)});
el.querySelectorAll('[data-btd]').forEach(r=>r.addEventListener('click',()=>{if(!s.bt)return toast('شغّل Bluetooth أولاً');const n=r.dataset.btd;fx.btdev[n]=!fx.btdev[n];saveFx();appSettings(el);toast(fx.btdev[n]?'اتصل '+n:'انفصل '+n)}));
return}
if(p==='cellular'){
el.innerHTML=head('بيانات الهاتف')+grp(row2('بيانات الهاتف',sq2('#34c759','cellular'),sw('pCell',fx.celldata))+
row2('المشغل','','<span class="mut">Zain — 4.5G+</span>')+
row2('تجوال البيانات',sq2('#8e8e93','globe'),sw('pRoam',!!fx.roam)))+
'<div class="card"><div class="row" style="justify-content:space-between"><b>الاستخدام هالشهر</b><span class="mut">'+String(fx.cellUsed||1.24).slice(0,5)+' GB</span></div><div style="height:7px;background:#e9e9ee;border-radius:4px;margin-top:9px;overflow:hidden"><span style="display:block;height:100%;width:'+Math.min(95,(fx.cellUsed||1.24)/10*100)+'%;background:#34c759"></span></div><button class="btn gray" id="cellReset" style="margin-top:10px">إعادة تعيين الإحصائيات</button></div>'+
'<p class="mut" style="margin:4px 2px;line-height:1.8">من تطفئ البيانات والواي فاي سوه، تطبيقات التواصل تطلع «لا يوجد اتصال» مثل الآيفون.</p>';
bk('main');
$('#pCell').addEventListener('change',e=>{fx.celldata=e.target.checked;saveFx();renderStatus();toast(fx.celldata?'البيانات شغالة':'البيانات مطفية')});
$('#pRoam').addEventListener('change',e=>{fx.roam=e.target.checked;saveFx()});
$('#cellReset').addEventListener('click',()=>{fx.cellUsed=0;saveFx();appSettings(el)});
return}
if(p==='hotspot'){
el.innerHTML=head('نقطة اتصال شخصية')+grp(row2('السماح للآخرين بالانضمام',sq2('#34c759','radio-outline'),sw('pHot',fx.hotspot.on))+
row2('اسم الشبكة','','<span class="mut">iPad — Reda</span>')+
row2('كلمة سر Wi-Fi','','<input type="text" id="hotPass" value="'+escH(fx.hotspot.pass||'rio2026')+'" style="padding:7px;border:1px solid #d9d9de;border-radius:9px;width:130px;text-align:center">'))+
'<p class="mut" style="margin:4px 2px">غيّر كلمة السر وانحفظ — أجهزتك القريبة تشوف شبكة «iPad — Reda».</p>';
bk('main');
$('#pHot').addEventListener('change',e=>{fx.hotspot.on=e.target.checked;saveFx();toast(fx.hotspot.on?'نقطة الاتصال شغالة':'انطفت نقطة الاتصال')});
$('#hotPass').addEventListener('change',e=>{fx.hotspot.pass=e.target.value||'rio2026';saveFx();toast('انحفظت كلمة السر')});
return}
if(p==='vpn'){
el.innerHTML=head('VPN')+grp(row2('VPN',sq2('#8e8e93','shield-checkmark'),sw('pVpn',fx.vpn))+
row2('الخادم','','<span class="mut">'+(fx.vpnSrv||'فرانكفورت — ألمانيا')+'</span>')+
row2('البروتوكول','','<span class="mut">IKEv2</span>'))+
'<div class="rbx-sec">خوادم</div>'+grp(['فرانكفورت — ألمانيا','نيويورك — أمريكا','دبي — الإمارات'].map(v=>'<div class="setrow" data-vpns="'+v+'" style="cursor:pointer"><span style="flex:1">'+v+'</span>'+((fx.vpnSrv||'فرانكفورت — ألمانيا')===v?'<span style="color:#0a84ff;font-weight:700">✓</span>':'')+'</div>').join(''))+
'<p class="mut" style="margin:4px 2px">من يشتغل VPN تطلع علامته بشريط الحالة فوق.</p>';
bk('main');
$('#pVpn').addEventListener('change',e=>{fx.vpn=e.target.checked;saveFx();renderStatus();toast(fx.vpn?'VPN متصل':'انفصل VPN')});
el.querySelectorAll('[data-vpns]').forEach(r=>r.addEventListener('click',()=>{fx.vpnSrv=r.dataset.vpns;saveFx();appSettings(el)}));
return}
if(p==='sounds'){
el.innerHTML=head('الأصوات والحس اللمسي')+
'<div class="rbx-sec" style="margin-top:0">نغمة الرنين</div>'+grp(['افتتاحية','موجات','حرير','رادار','إشعاع'].map(r=>'<div class="setrow" data-ring="'+r+'" style="cursor:pointer"><span style="flex:1">'+r+'</span>'+(fx.snd.ring===r?'<span style="color:#0a84ff;font-weight:700">✓</span>':'')+'</div>').join(''))+
'<div class="rbx-sec">مستوى الصوت</div><div class="card"><input type="range" id="sndVol" min="0" max="100" value="'+s.vol+'" style="width:100%"></div>'+
'<div class="rbx-sec">أصوات النظام</div>'+grp(row2('صوت القفل',sq2('#111','lock-closed'),sw('sndLock',fx.snd.lock!==false))+
row2('نقرات لوحة المفاتيح',sq2('#8e8e93','text'),sw('sndKeys',fx.snd.keys!==false))+
row2('صوت الإرسال',sq2('#34c759','send'),sw('sndSend',fx.snd.send!==false)))+
'<p class="mut" style="margin:4px 2px">كلها تنحكم بأصوات النظام الحقيقية باللعبة — جرّب تقفل وتفتح الآيباد.</p>';
bk('main');
el.querySelectorAll('[data-ring]').forEach(r=>r.addEventListener('click',()=>{fx.snd.ring=r.dataset.ring;saveFx();playRing(fx.snd.ring);appSettings(el)}));
$('#sndVol').addEventListener('input',e=>{s.vol=+e.target.value;store.set('set',s);sfx('click')});
$('#sndLock').addEventListener('change',e=>{fx.snd.lock=e.target.checked;saveFx()});
$('#sndKeys').addEventListener('change',e=>{fx.snd.keys=e.target.checked;saveFx()});
$('#sndSend').addEventListener('change',e=>{fx.snd.send=e.target.checked;saveFx()});
return}
if(p==='general'){
el.innerHTML=head('عام')+grp(
row2('حول الجهاز',sq2('#8e8e93','information-circle'),arrow,'about')+
row2('تحديث البرنامج',sq2('#8e8e93','arrow-down-circle'),arrow,'gupdate')+
row2('سعة التخزين',sq2('#8e8e93','server'),arrow,'gstorage')+
row2('AirDrop',sq2('#0a84ff','radio-outline'),arrow,'gairdrop')+
row2('التاريخ والوقت',sq2('#8e8e93','time'),arrow,'gdatetime')+
row2('اللغة والمنطقة',sq2('#8e8e93','globe'),arrow,'glang')+
row2('لوحة المفاتيح',sq2('#8e8e93','text'),arrow,'gkeyboard')+
row2('إعادة تعيين',sq2('#ff3b30','refresh'),arrow,'greset'));
bk('main');bindGo();return}
if(p==='gupdate'){
el.innerHTML=head('تحديث البرنامج','general')+
'<div class="card" style="text-align:center;padding:22px"><div class="big" style="font-size:18px">RioOS 26.0</div><p class="mut" style="margin:6px 0 14px">إصدار نظام Rio iPad الحالي — ريّو 3.2</p><button class="btn" id="updChk" style="padding:11px 22px">التحقق من تحديث</button><div id="updOut" class="mut" style="margin-top:12px"></div></div>';
bk('general');
$('#updChk').addEventListener('click',()=>{const o=$('#updOut');o.textContent='جاي يتحقق من خوادم Rio…';setTimeout(()=>{o.textContent='نظامك محدّث — ماكو تحديث أجدد من RioOS 26.0';notify('الإعدادات','تحديث البرنامج','نظامك محدث بالكامل',null,{pop:false})},1100)});
return}
if(p==='gstorage'){
const used=(12400+S.photos.length*1.3+S.installed.length*86)/1000;
el.innerHTML=head('سعة تخزين iPad','general')+
'<div class="card"><div class="row" style="justify-content:space-between"><b>'+used.toFixed(1)+' GB</b><span class="mut">من 64 GB</span></div><div style="height:9px;background:#e9e9ee;border-radius:5px;margin-top:9px;overflow:hidden;display:flex"><span style="height:100%;width:14%;background:#ff9f0a"></span><span style="height:100%;width:'+Math.min(20,used-12)+'%;background:#0a84ff"></span><span style="height:100%;width:8%;background:#34c759"></span></div></div>'+
grp(row2('النظام RioOS','','<span class="mut">9.2 GB</span>')+
row2('التطبيقات ('+arabNum(APPS.length+S.installed.length)+')','','<span class="mut">'+(2.1+S.installed.length*0.086).toFixed(1)+' GB</span>')+
row2('الصور','','<span class="mut">'+(0.4+S.photos.length*0.0013).toFixed(2)+' GB</span>')+
row2('بيانات Rيو','','<span class="mut">0.8 GB</span>'));
bk('general');return}
if(p==='gairdrop'){
el.innerHTML=head('AirDrop','general')+
grp(['off','contacts','all'].map((m,i)=>row2(['إيقاف الاستلام','جهات الاتصال فقط','الجميع'][i],'','<span class="'+(fx.airdrop===m?'':'mut')+'" style="'+(fx.airdrop===m?'color:#0a84ff;font-weight:700':'')+'">'+(fx.airdrop===m?'✓':'')+'</span>','__'+m)).join(''))+
'<p class="mut" style="margin:4px 2px">يتحكم منو يكدر يبعثلك صور ونصوص بـ AirDrop داخل Rio.</p>';
bk('general');
el.querySelectorAll('[data-go]').forEach(r=>r.addEventListener('click',()=>{fx.airdrop=r.dataset.go.slice(2);saveFx();appSettings(el);toast('انحفظ استلام AirDrop')}));
return}
if(p==='gdatetime'){
el.innerHTML=head('التاريخ والوقت','general')+grp(
row2('تعيين تلقائياً',sq2('#8e8e93','time'),sw('dtAuto',true))+
row2('تنسيق ٢٤ ساعة',sq2('#8e8e93','timer'),sw('dt24',fx.dt24))+
row2('المنطقة الزمنية','','<span class="mut">بغداد (GMT+3)</span>')+
row2('الوقت الآن','','<span class="mut">'+fmtTime()+'</span>'))+
'<p class="mut" style="margin:4px 2px">تنسيق ٢٤ ساعة يغير ساعة شريط الحالة والقفل ومركز الإشعارات فوراً.</p>';
bk('general');
const a=$('#dtAuto');if(a)a.addEventListener('change',()=>toast('التوقيت التلقائي من شبكة Zain'));
$('#dt24').addEventListener('change',e=>{fx.dt24=e.target.checked;saveFx();renderStatus();appSettings(el);toast('انبدل تنسيق الوقت')});
return}
if(p==='glang'){
el.innerHTML=head('اللغة والمنطقة','general')+grp(
row2('العربي','','<span style="color:#0a84ff;font-weight:700">✓ اللغة الأساسية</span>')+
row2('English','','<span class="mut">ثانوية</span>')+
row2('المنطقة','','<span class="mut">العراق</span>')+
row2('التقويم','','<span class="mut">الميلادي</span>'));
bk('general');return}
if(p==='gkeyboard'){
el.innerHTML=head('لوحة المفاتيح','general')+grp(
row2('نقرات المفاتيح',sq2('#8e8e93','text'),sw('kbKeys',fx.snd.keys!==false))+
row2('أحرف كبيرة تلقائياً',sq2('#8e8e93','text'),sw('kbCaps',fx.caps!==false))+
row2('التصحيح التلقائي',sq2('#8e8e93','text'),sw('kbCorr',true)))+
'<p class="mut" style="margin:4px 2px">نقرات المفاتيح تنسمع بالنظام من تكتب بالنوتات والدردشات.</p>';
bk('general');
$('#kbKeys').addEventListener('change',e=>{fx.snd.keys=e.target.checked;saveFx();sfx('click')});
$('#kbCaps').addEventListener('change',e=>{fx.caps=e.target.checked;saveFx()});
$('#kbCorr').addEventListener('change',()=>toast('انسجل التصحيح التلقائي'));
return}
if(p==='greset'){
el.innerHTML=head('إعادة تعيين','general')+
grp(row2('إعادة تعيين إعدادات Rio','','<span class="mut">ترجع الإعدادات للوضع الافتراضي</span>'))+
'<button class="btn gray" id="rstSet" style="width:100%;padding:12px;margin-bottom:9px">إعادة تعيين كل الإعدادات</button>'+
'<button class="btn red" id="rstAll" style="width:100%;padding:12px">مسح كل المحتوى والإعدادات</button>'+
'<p class="mut" style="margin:8px 2px;line-height:1.8">المسح الكامل يصفي صورك ونوتاتك وتطبيقاتك وحسابك من هذا المتصفح ويرجع الآيباد جديد.</p>';
bk('general');
$('#rstSet').addEventListener('click',()=>{if(confirm('متأكد؟ ترجع كل الإعدادات للافتراضي')){localStorage.removeItem('rioipad-fx3');location.reload()}});
$('#rstAll').addEventListener('click',()=>{if(confirm('تحذير: ينمسح كل شي. متأكد؟')){if(S.apple&&S.apple.id)localStorage.setItem('rio-actlock',S.apple.id);Object.keys(localStorage).filter(k=>k.startsWith('rioipad-')||k==='rio-phmeta').forEach(k=>localStorage.removeItem(k));location.reload()}});
return}
}

function ttApply(){
let t=$('#ttLayer');
if(S.fx.truetone){if(!t){t=document.createElement('div');t.id='ttLayer';t.style.cssText='position:absolute;inset:0;z-index:48;pointer-events:none;background:rgba(255,196,110,.07)';$('#screen').appendChild(t)}}else if(t)t.remove();
}
function applyText(){const ab=$('#appBody');if(ab)ab.style.fontSize=(S.fx.textscale||100)+'%'}
function setPageX2(el){
const p=S.setPage,fx=S.fx,s=S.set;
const sw=(id,on)=>'<label class="switch"><input type="checkbox" id="'+id+'" '+(on?'checked':'')+'><i></i></label>';
const sq2=(c,gl)=>'<span class="sq" style="background:'+c+'">'+g(gl,'#fff',16)+'</span>';
const row2=(label,left,val,go)=>'<div class="setrow" '+(go?'data-go="'+go+'" style="cursor:pointer"':'')+'><span style="display:flex;align-items:center;gap:9px;flex:1">'+left+label+'</span>'+(val||'')+'</div>';
const grp=h=>'<div class="setgroup">'+h+'</div>';
const arrow='<span class="mut">‹</span>';
const bk=(t)=>{const b=$('#setBack');if(b)b.addEventListener('click',()=>gotoPage(t))};
const head=(t,back)=>'<button class="back" id="setBack" style="margin-bottom:10px">‹ '+(back==='general'?'عام':'الإعدادات')+'</button><div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+t+'</div>';
if(p==='camera'){
el.innerHTML=head('الكاميرا')+grp(
row2('شبكة التصوير',sq2('#8e8e93','grid'),sw('camGrid',fx.camgrid))+
row2('تنسيق الصور','','<span class="segRow" style="width:150px"><button data-camfmt="HEIF" class="'+(fx.camfmt==='HEIF'?'on':'')+'">HEIF</button><button data-camfmt="JPEG" class="'+(fx.camfmt==='JPEG'?'on':'')+'">JPEG</button></span>'))+
'<p class="mut" style="margin:4px 2px;line-height:1.8">الشبكة تظهر فوق عدسة الكاميرا باللعبة من تفتحها. HEIF يوفر مساحة، JPEG يتوافق أكثر.</p>';
bk('main');
$('#camGrid').addEventListener('change',e=>{fx.camgrid=e.target.checked;saveFx();toast('انسجلت شبكة الكاميرا')});
el.querySelectorAll('[data-camfmt]').forEach(b=>b.addEventListener('click',()=>{fx.camfmt=b.dataset.camfmt;saveFx();appSettings(el)}));
return}
if(p==='display'){
el.innerHTML=head('الشاشة والسطوع')+
'<div class="rbx-sec" style="margin-top:0">المظهر</div><div class="segRow" style="margin-bottom:12px"><button data-dm="0" class="'+(s.dark?'':'on')+'">فاتح</button><button data-dm="1" class="'+(s.dark?'on':'')+'">داكن</button></div>'+
'<div class="rbx-sec">السطوع</div><div class="card"><input type="range" id="dpBright" min="10" max="100" value="'+s.bright+'" style="width:100%"></div>'+
grp(row2('Night Shift',sq2('#ff9f0a','moon'),sw('dpNight',fx.acc.night))+
row2('True Tone',sq2('#ff9f0a','sunny'),sw('dpTone',fx.truetone))+
row2('نص عريض',sq2('#111','text'),sw('dpBold',fx.acc.bold)))+
'<div class="rbx-sec">قفل تلقائي</div><div class="segRow" style="margin-bottom:12px">'+[['0','أبداً'],['1','١ د'],['2','٢ د'],['5','٥ د']].map(o=>'<button data-alock="'+o[0]+'" class="'+(String(fx.autolock)===o[0]?'on':'')+'">'+o[1]+'</button>').join('')+'</div>'+
'<div class="rbx-sec">حجم النص</div><div class="card"><input type="range" id="dpText" min="85" max="120" value="'+(fx.textscale||100)+'" style="width:100%"><div class="row" style="justify-content:space-between"><span class="mut">أصغر</span><span class="mut" id="dpTextV">'+(fx.textscale||100)+'٪</span><span class="mut">أكبر</span></div></div>';
bk('main');
el.querySelectorAll('[data-dm]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{if(S.app==='settings')gotoPage('display')},80)));
$('#dpBright').addEventListener('input',e=>{s.bright=+e.target.value;store.set('set',s);renderStatus()});
$('#dpNight').addEventListener('change',e=>{fx.acc.night=e.target.checked;saveFx();applyFx();toast('انسجل Night Shift')});
$('#dpTone').addEventListener('change',e=>{fx.truetone=e.target.checked;saveFx();ttApply();toast('انسجل True Tone')});
$('#dpBold').addEventListener('change',e=>{fx.acc.bold=e.target.checked;saveFx();applyFx()});
el.querySelectorAll('[data-alock]').forEach(b=>b.addEventListener('click',()=>{fx.autolock=+b.dataset.alock;saveFx();appSettings(el);toast(fx.autolock?'القفل التلقائي بعد '+fx.autolock+' دقائق':'ما ينقفل تلقائياً')}));
$('#dpText').addEventListener('input',e=>{fx.textscale=+e.target.value;$('#dpTextV').textContent=fx.textscale+'٪';applyText()});
$('#dpText').addEventListener('change',()=>saveFx());
return}
if(p==='search'){
el.innerHTML=head('بحث')+grp(
row2('بحث Spotlight — اسحب لتحت بالشاشة الرئيسية',sq2('#8e8e93','search'),sw('srOn',fx.searchOn!==false))+
row2('اقتراحات التطبيقات',sq2('#8e8e93','apps'),sw('srSug',true)))+
'<div class="rbx-sec">إظهار أو إخفاء تطبيقات من البحث</div>'+
APPS.map(a=>'<div class="card row" style="padding:9px 12px"><span style="flex:0 0 auto">'+icImg(ICONS[a.ic])+'</span><span style="flex:1"><b style="font-size:13.5px">'+a.n+'</b></span>'+sw('sr-'+a.id,fx.searchApps[a.id]!==false)+'</div>').join('')+
'<p class="mut" style="margin:4px 2px">المخفي ما يطلع بنتائج بحث Spotlight أبداً.</p>';
bk('main');
$('#srOn').addEventListener('change',e=>{fx.searchOn=e.target.checked;saveFx();syncPill();toast('انسجل البحث بالرئيسية')});
$('#srSug').addEventListener('change',()=>toast('انسجلت الاقتراحات'));
APPS.forEach(a=>{const c=$('#sr-'+a.id);if(c)c.addEventListener('change',()=>{fx.searchApps[a.id]=c.checked;saveFx()})});
return}
if(p==='siri'){
el.innerHTML=head('Siri')+grp(
row2('Siri',sq2('#111','mic'),sw('siOn',fx.siri!==false))+
row2('اللغة','','<span class="mut">العربية (السعودية)</span>')+
row2('صوت Siri','','<span class="mut">صوت ٢ — طبيعي</span>'))+
'<button class="btn" id="siTry" style="width:100%;padding:13px;font-size:15px">جرّب Siri — اسألها</button>'+
'<p class="mut" style="margin:8px 2px;line-height:1.8">جرّب: «افتح يوتيوب»، «شكد الوقت؟»، «البطارية»، «الطقس»، «شغل التركيز»، «اقفل الآيباد».</p>';
bk('main');
$('#siOn').addEventListener('change',e=>{fx.siri=e.target.checked;saveFx()});
$('#siTry').addEventListener('click',()=>openSiri());
return}
if(p==='faceid'){
el.innerHTML=head('Face ID ورمز الدخول')+
(fx.pass?
grp(row2('رمز الدخول','','<span class="mut">مفعّل — '+arabNum(fx.passLen)+' أرقام</span>'))+
'<button class="btn gray" id="fidChange" style="width:100%;padding:11px;margin-bottom:8px">تغيير رمز الدخول</button><button class="btn red" id="fidRemove" style="width:100%;padding:11px">إيقاف رمز الدخول</button>'
:
'<div class="card"><div class="big">تعيين رمز دخول</div><p class="mut" style="margin:6px 0 10px;line-height:1.7">٤ إلى ٦ أرقام — ينطلب منك بكل فتح قفل، مثل الآيفون.</p><div class="row"><input type="password" id="fidNew" inputmode="numeric" placeholder="الرمز الجديد" style="flex:1;padding:11px;border:1px solid #d9d9de;border-radius:11px"><button class="btn" id="fidSet">تعيين</button></div></div>')+
grp(row2('Face ID',sq2('#34c759','scan'),sw('fidOn',fx.faceid)))+
grp(row2('تخصيص شاشة القفل',sq2('#3a3a3c','lock-closed'),arrow,'lockset'))+
'<p class="mut" style="margin:4px 2px;line-height:1.8">تنبيه: إذا نسيت الرمز، صفحة الإعدادات ما تنفتح إلا بعد الفتح — بس تكدر تصفي بيانات المتصفح وترجع من الصفر.</p>';
bk('main');
el.querySelectorAll('[data-go]').forEach(r=>r.addEventListener('click',()=>gotoPage(r.dataset.go)));
$('#fidOn').addEventListener('change',e=>{fx.faceid=e.target.checked;saveFx();toast(fx.faceid?'Face ID شغال — يقفل ويفتح بوجهك':'Face ID وقف')});
const fs=$('#fidSet');if(fs)fs.addEventListener('click',()=>{const v=$('#fidNew').value.trim();if(!/^\d{4,6}$/.test(v))return toast('الرمز لازم ٤-٦ أرقام');fx.pass=simpHash(v);fx.passLen=v.length;saveFx();appSettings(el);toast('انضبط رمز الدخول — اقفل وجرّب')});
const fr=$('#fidRemove');if(fr)fr.addEventListener('click',()=>{fx.pass='';fx.passLen=0;saveFx();appSettings(el);toast('انشال رمز الدخول')});
const fc=$('#fidChange');if(fc)fc.addEventListener('click',()=>{fx.pass='';fx.passLen=0;saveFx();appSettings(el);toast('اكتب الرمز الجديد')});
return}
if(p==='sos'){
el.innerHTML=head('طوارئ SOS')+grp(
row2('زر SOS بالطوارئ',sq2('#ff3b30','call'),sw('sosOn',fx.sosBtn!==false))+
row2('مشاركة موقعي','','<span class="mut">بغداد — العراق</span>'))+
'<button class="btn red" id="sosCall" style="width:100%;padding:14px;font-size:15.5px;margin-top:4px">اتصال طارئ SOS</button>'+
'<div class="rbx-sec">جهات اتصال الطوارئ</div>'+grp(FRIENDS.slice(0,3).map(f=>row2(f[0],'','<span class="mut">FaceTime</span>')).join(''));
bk('main');
$('#sosOn').addEventListener('change',e=>{fx.sosBtn=e.target.checked;saveFx()});
$('#sosCall').addEventListener('click',()=>{if(fx.sosBtn===false)return toast('زر SOS مطفي من الإعدادات');closeApp();setTimeout(()=>startCall(FRIENDS[0],true),420)});
return}
if(p==='privacy'){
el.innerHTML=head('الخصوصية والأمان')+grp(
row2('خدمات الموقع',sq2('#0a84ff','location'),sw('pvLoc',fx.perms.location))+
row2('الكاميرا',sq2('#8e8e93','camera'),sw('pvCam',fx.perms.camera))+
row2('الميكروفون',sq2('#ff9f0a','mic'),sw('pvMic',fx.perms.microphone))+
row2('الصور',sq2('#34c759','image'),sw('pvPho',fx.perms.photos))+
row2('التتبع عبر التطبيقات',sq2('#8e8e93','shield-checkmark'),sw('pvTrk',fx.perms.tracking)))+
'<p class="mut" style="margin:4px 2px;line-height:1.8">هاي مو ديكور: طفّي الكاميرا وافتحها تلگاها مرفوضة فعلاً، وطفّي الصور ينقفل المعرض — مثل الآيفون بالضبط.</p>';
bk('main');
const bnd=(id,k)=>{const e2=$(id);if(e2)e2.addEventListener('change',()=>{fx.perms[k]=e2.checked;saveFx();toast('انسجل إذن '+(e2.checked?'مسموح':'مرفوض'))})};
bnd('#pvLoc','location');bnd('#pvCam','camera');bnd('#pvMic','microphone');bnd('#pvPho','photos');bnd('#pvTrk','tracking');
return}
if(p==='gamecenter'){
const used=Object.values(fx.use.sec||{}).reduce((a,b)=>a+b,0);
const ach=[['الخطوة الأولى','افتح أي تطبيق',used>0],['مصوّر Rio','التقط صورة بالكاميرا',S.photos.length>0],['اجتماعي','ثبّت ٣ تطبيقات تواصل',S.installed.length>=3],['باني اختصارات','سوّي اختصار أتمتة',(fx.autos||[]).length>=1],['مستخدم نشط','استخدم الآيباد ٥ دقائق',used>=300]];
el.innerHTML=head('Game Center')+
'<div class="card" style="display:flex;gap:12px;align-items:center"><span style="width:52px;height:52px;border-radius:50%;background:linear-gradient(150deg,#f92c4c,#ff9f0a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700">'+(fx.gcname||myName()).slice(0,1).toUpperCase()+'</span><span style="flex:1"><b style="font-size:16px">'+escH(fx.gcname||myName())+'</b><br><span class="mut">معرّف Game Center</span></span></div>'+
'<div class="card"><label class="mut">الاسم المستعار</label><div class="row" style="margin-top:7px"><input type="text" id="gcName" value="'+escH(fx.gcname||'')+'" placeholder="'+escH(myName())+'" style="flex:1;padding:10px;border:1px solid #d9d9de;border-radius:10px"><button class="btn" id="gcSave">حفظ</button></div></div>'+
'<div class="rbx-sec">الإنجازات</div>'+ach.map(a=>'<div class="card row"><span style="font-size:19px">'+(a[2]?'🏆':'🔒')+'</span><span style="flex:1"><b style="font-size:13.5px">'+a[0]+'</b><br><span class="mut">'+a[1]+'</span></span><span class="mut">'+(a[2]?'مفتوح':'مقفل')+'</span></div>').join('');
bk('main');
$('#gcSave').addEventListener('click',()=>{fx.gcname=$('#gcName').value.trim();saveFx();appSettings(el);toast('انحفظ اسم Game Center')});
return}
if(p==='wallet'){
el.innerHTML=head('المحفظة وApple Pay')+
(fx.cards.length?fx.cards.map((c,i)=>'<div class="card" style="background:linear-gradient(140deg,#1c1c1e,#3a3a3c);color:#fff;padding:16px"><div style="font-size:12px;opacity:.8">RIO PAY</div><div style="font-size:19px;letter-spacing:2px;margin:10px 0">•••• '+c.last4+'</div><div class="row" style="justify-content:space-between"><span>'+escH(c.name)+'</span><button class="btn red" data-carddel="'+i+'" style="padding:5px 10px">حذف</button></div></div>').join(''):'<div class="mut" style="text-align:center;padding:14px">لا بطاقات بعد</div>')+
'<div class="card"><div class="big" style="margin-bottom:8px">إضافة بطاقة</div><input type="text" id="cdName" placeholder="الاسم على البطاقة" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px"><input type="text" id="cdNum" inputmode="numeric" placeholder="رقم البطاقة" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px"><button class="btn" id="cdAdd" style="width:100%;padding:11px">إضافة إلى المحفظة</button><p class="mut" style="margin-top:8px">بطاقة تجريبية داخل اللعبة — ينحفظ بس آخر ٤ أرقام.</p></div>';
bk('main');
el.querySelectorAll('[data-carddel]').forEach(b=>b.addEventListener('click',()=>{fx.cards.splice(+b.dataset.carddel,1);saveFx();appSettings(el)}));
$('#cdAdd').addEventListener('click',()=>{const n=$('#cdNum').value.replace(/\D/g,'');if(n.length<8)return toast('اكتب رقم بطاقة صحيح');fx.cards.push({name:$('#cdName').value.trim()||'Reda',last4:n.slice(-4)});saveFx();appSettings(el);toast('انضافت البطاقة للمحفظة')});
return}
if(p==='passwords'){
el.innerHTML=head('كلمات السر')+
(fx.vault.length?fx.vault.map((v,i)=>'<div class="card"><div class="row"><span style="flex:1"><b>'+escH(v.site)+'</b><br><span class="mut">'+escH(v.user)+'</span></span><span class="mut" data-vpass="'+i+'">••••••••</span><button class="btn gray" data-vshow="'+i+'" style="padding:6px 10px">إظهار</button><button class="btn red" data-vdel="'+i+'" style="padding:6px 10px">حذف</button></div></div>').join(''):'<div class="mut" style="text-align:center;padding:14px">لا كلمات سر محفوظة</div>')+
'<div class="card"><div class="big" style="margin-bottom:8px">حفظ كلمة سر جديدة</div><input type="text" id="vwSite" placeholder="الموقع (مثل zain.iq)" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:7px"><input type="text" id="vwUser" placeholder="اسم المستخدم" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:7px"><input type="password" id="vwPass" placeholder="كلمة السر" style="width:100%;padding:10px;border:1px solid #d9d9de;border-radius:10px;margin-bottom:8px"><button class="btn" id="vwAdd" style="width:100%;padding:11px">حفظ</button><p class="mut" style="margin-top:8px">محفوظة على جهازك فقط داخل اللعبة.</p></div>';
bk('main');
el.querySelectorAll('[data-vshow]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.vshow;const sp=el.querySelector('[data-vpass="'+i+'"]');const show=sp.textContent==='••••••••';sp.textContent=show?fx.vault[i].pass:'••••••••';b.textContent=show?'إخفاء':'إظهار'}));
el.querySelectorAll('[data-vdel]').forEach(b=>b.addEventListener('click',()=>{fx.vault.splice(+b.dataset.vdel,1);saveFx();appSettings(el)}));
$('#vwAdd').addEventListener('click',()=>{const st=$('#vwSite').value.trim(),us=$('#vwUser').value.trim(),pw=$('#vwPass').value;if(!st||!pw)return toast('اكتب الموقع وكلمة السر');fx.vault.push({site:st,user:us,pass:pw});saveFx();appSettings(el);toast('انحفظت كلمة السر')});
return}
if(p==='appshub'){
const all=APPS.concat(S.installed.filter(id=>EXTRA[id]).map(id=>({id:'x_'+id,n:EXTRA[id].n,ic:id})));
el.innerHTML=head('التطبيقات')+'<div class="row" style="margin-bottom:10px"><input id="ahQ" type="text" placeholder="بحث بالتطبيقات…" style="flex:1;padding:11px 12px;border:1px solid #d9d9de;border-radius:12px;font-size:14px"></div><div id="ahList">'+
all.map(a=>'<div class="card row" data-ah="'+a.id+'" style="cursor:pointer;padding:9px 12px"><span style="flex:0 0 auto">'+icImg(ICONS[a.ic])+'</span><span style="flex:1"><b style="font-size:14px">'+a.n+'</b><br><span class="mut">إعدادات التطبيق</span></span><span class="mut">‹</span></div>').join('')+'</div>';
bk('main');
el.querySelectorAll('[data-ah]').forEach(r=>r.addEventListener('click',()=>{S.appDetail=r.dataset.ah;gotoPage('appdetail')}));
const q=$('#ahQ');if(q)q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();el.querySelectorAll('[data-ah]').forEach(r=>{const a=APPS.find(x=>x.id===r.dataset.ah)||EXTRA[r.dataset.ah.slice(2)];r.style.display=(!v||(a&&a.n.toLowerCase().includes(v)))?'':'none'})});
return}
if(p==='appdetail'){
const id=S.appDetail||'settings';const a=id.startsWith('x_')?{n:EXTRA[id.slice(2)].n,ic:id.slice(2)}:(APPS.find(x=>x.id===id)||{n:id,ic:id});
el.innerHTML=head(a.n)+
'<div class="card" style="display:flex;gap:12px;align-items:center"><span>'+icImg(ICONS[a.ic])+'</span><span style="flex:1"><b style="font-size:17px">'+a.n+'</b><br><span class="mut">استخدام اليوم: '+fmtDur(S.fx.use.sec[id]||0)+'</span></span></div>'+
grp(row2('السماح بالإشعارات',sq2('#ff3b30','notifications'),sw('adNotif',fx.appNotif[a.n]!==false))+
row2('تحديث التطبيق بالخلفية',sq2('#8e8e93','refresh'),sw('adBg',fx.bgref[id]!==false)))+
'<button class="btn" id="adOpen" style="width:100%;padding:12px">فتح '+a.n+'</button>';
bk('appshub');
$('#adNotif').addEventListener('change',e=>{fx.appNotif[a.n]=e.target.checked;saveFx();toast(e.target.checked?'إشعارات '+a.n+' مسموحة':'انكتمت إشعارات '+a.n)});
$('#adBg').addEventListener('change',e=>{fx.bgref[id]=e.target.checked;saveFx()});
$('#adOpen').addEventListener('click',()=>openApp(id,null));
return}
}
/* ===== Siri overlay ===== */
function openSiri(){
if(S.fx.siri===false)return toast('Siri مطفية من الإعدادات');
closeSiri();
const d=document.createElement('div');d.id='siriOv';
d.innerHTML='<div class="sheetCard"><div class="sheetGrab"></div><div class="big" style="font-size:17px">Siri</div><div id="siriOut" class="mut" style="margin:8px 0;line-height:1.8">هلا! اسألني: افتح يوتيوب، شكد الوقت؟، البطارية، الطقس، شغل التركيز…</div><div class="row"><input type="text" id="siriIn" placeholder="اكتب طلبك…" style="flex:1;padding:11px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px"><button class="btn" id="siriGo">اسأل</button></div><button class="btn gray" id="siriX" style="width:100%;margin-top:9px">إغلاق</button></div>';
$('#screen').appendChild(d);
d.addEventListener('click',e=>{if(e.target===d)closeSiri()});
$('#siriX').addEventListener('click',closeSiri);
const ask=()=>{const v=$('#siriIn').value.trim();if(v)askSiri(v)};
$('#siriGo').addEventListener('click',ask);
$('#siriIn').addEventListener('keydown',e=>{if(e.key==='Enter')ask});
setTimeout(()=>{const i=$('#siriIn');i&&i.focus()},80);
}
function closeSiri(){const d=$('#siriOv');if(d)d.remove()}
function siriSay(t){const o=$('#siriOut');if(o)o.textContent=t}
function askSiri(v){
sfx('click');
const low=v.toLowerCase();
const all=APPS.map(a=>({id:a.id,n:a.n})).concat(Object.keys(EXTRA).map(k=>({id:'x_'+k,n:EXTRA[k].n})));
if(low.includes('افتح')||low.includes('شغل تطبيق')){const hit=all.find(a=>low.includes(a.n.toLowerCase())||low.includes(a.id.replace('x_','')));if(hit){siriSay('حاضر — أفتح '+hit.n+' هسه');setTimeout(()=>{closeSiri();openApp(hit.id,null)},750);return}siriSay('ما لكيت هذا التطبيق عندك');return}
if(low.includes('وقت')||low.includes('ساعة')){siriSay('الساعة هسه '+fmtTime()+' بتوقيت بغداد');return}
if(low.includes('بطاري')){siriSay('بطاريتك '+arabNum(Math.round(S.batt.pct))+'٪'+(S.batt.charging?' وجاي تنشحن':'')+' — تكفيك تقريباً '+arabNum(Math.max(1,Math.round(S.batt.pct/9)))+' ساعات لعب');return}
if(low.includes('طقس')){wxFetch();siriSay(S._wx?'طقس بغداد هسه '+S._wx.t+' درجة — يوم مناسب للعب':'جاي أجيب الطقس، اسألني بعد ثواني');return}
if(low.includes('تركيز')){S.set.dnd=!S.set.dnd;store.set('set',S.set);renderStatus();siriSay(S.set.dnd?'شغّلت وضع التركيز — ما يزعجك شي':'طفّيت التركيز');return}
if(low.includes('اقفل')||low.includes('رجع الآيباد')){siriSay('تمام، أرجع الآيباد لجيبك');setTimeout(()=>{closeSiri();setPad(false)},700);return}
if(low.includes('مرحب')||low.includes('هلا')||low.includes('سلام')){siriSay('هلا بيك! اؤمرني — أفتح تطبيق أو أجاوبك عن الوقت والبطارية والطقس');return}
if(low.includes('صورة')||low.includes('التقط')){siriSay('أفتح لك الكاميرا');setTimeout(()=>{closeSiri();openApp('camera',null)},700);return}
siriSay('ما فهمت عليك — جرّب: «افتح يوتيوب»، «شكد الوقت؟»، «البطارية»، «الطقس»، «شغل التركيز»');
}
/* ===== Face ID / passcode lock wiring + wrappers ===== */
const _unlock0=unlock;
unlock=function(){
if(!S.locked)return;
if(S.fx.pass||S.fx.faceid){if(!S._pinAsk)S._pinAsk=true;renderLockX();return}
_unlock0();
};
const _camApp3=appCamera;
appCamera=function(el){
if(!S.fx.perms.camera){el.innerHTML=permDenied('الكاميرا');return}
const r=_camApp3(el);
if(S.fx.camgrid)setTimeout(()=>{const c=$('#camView');if(c&&c.parentNode){const wrap=document.createElement('div');wrap.style.position='relative';c.parentNode.insertBefore(wrap,c);wrap.appendChild(c);const o=document.createElement('div');o.style.cssText='position:absolute;inset:0;pointer-events:none;border-radius:12px;background:linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px);background-size:33.4% 33.4%';wrap.appendChild(o)}},420);
return r;
};
const _phoApp3=appPhotos;
appPhotos=function(el){
if(!S.fx.perms.photos){el.innerHTML=permDenied('الصور');return}
return _phoApp3(el);
};
const _oe3=openExtra;
openExtra=function(k,fromEl){
_oe3(k,fromEl);
if((S.set.airplane||(!S.set.wifi&&!S.fx.celldata))&&SOCIAL[k]){clearInterval(S.poll);const el=$('#appBody');if(el){el.innerHTML='<div class="card" style="text-align:center;padding:30px 16px"><div class="big" style="font-size:17px">لا يوجد اتصال بالإنترنت</div><p class="mut" style="margin-top:8px;line-height:1.8">شغّل Wi-Fi أو بيانات الهاتف حتى يشتغل '+SOCIAL[k].n+' — مثل الآيفون بالضبط.</p><button class="btn" id="offSet" style="margin-top:10px">فتح الإعدادات</button></div>';const b=$('#offSet');if(b)b.addEventListener('click',()=>openApp('settings',null))}}
};
const _spPill=syncPill;
syncPill=function(){_spPill();try{if(S.fx.searchOn===false)$('#spotPill').style.display='none'}catch(e){}};
function fmtTime(){const d=new Date();if(S.fx.dt24)return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');let h=d.getHours()%12;if(h===0)h=12;return h+':'+String(d.getMinutes()).padStart(2,'0')}
document.addEventListener('touchstart',()=>{S._actT=Date.now()},{passive:true});
document.addEventListener('click',()=>{S._actT=Date.now()});
setInterval(()=>{
try{
if(S.fx.autolock>0&&S.padOut&&!S.locked&&Date.now()-(S._actT||Date.now())>S.fx.autolock*60000){closeApp();S.locked=true;const L=$('#lock');L.classList.remove('bye');L.classList.add('show');renderStatus();renderLockX();sfx('lock');toast('انقفل الآيباد تلقائياً')}
}catch(e){}
},10000);
if(S.setPage==='x'){}
setPageX2Router();
function setPageX2Router(){const _old=setSubPage;setSubPage=function(el){if(['camera','display','search','siri','faceid','sos','privacy','gamecenter','wallet','passwords','appshub','appdetail'].includes(S.setPage)){setPageX2(el);return}_old(el)}}
ttApply();
if(S.fx.textscale&&S.fx.textscale!==100)setInterval(()=>{if(S.app==='settings')applyText()},1500);

/* ===== Spotlight by swiping down on Home (like real iPadOS — no floating pill) ===== */
(function(){
let sy=null,sx=null;
const scr=$('#screen');
scr.addEventListener('touchstart',e=>{
if(S.app||S.locked||!S.padOut){sy=null;return}
const t=e.touches[0],r=scr.getBoundingClientRect();
sy=t.clientY;sx=t.clientX;
if(sy-r.top<46)sy=null;
},{passive:true});
scr.addEventListener('touchend',e=>{
if(sy===null||sy===undefined)return;
const t=e.changedTouches[0],dy=t.clientY-sy,dx=Math.abs(t.clientX-sx);
sy=null;
if(dy>52&&dx<42&&!S.app&&!S.locked&&S.fx.searchOn!==false){const sp=$('#spot');if(sp&&typeof spotRender==='function'){sp.classList.add('open');spotRender('')}}
},{passive:true});
})();
