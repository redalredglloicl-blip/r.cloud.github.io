/* ===== Rio iPad 3.0 system layer ===== */
S.fx=Object.assign({focus:{sched:false,from:'22:00',to:'07:00',mute:['YouTube','TikTok']},nstyle:'stack',summary:'21:00',lastSum:'',lock:{wcol:'#ffffff',bold:true,widgets:['battery','weather','music'],shuffle:false},acc:{night:false,reduce:false,bold:false,dzoom:false},icons:{mode:'light',big:false,nolabel:false},limits:{},downtime:{on:false,from:'23:00',to:'06:00'},use:{date:'',sec:{}},seen:{},airSeen:0,peers:[],autos:[]},store.get('fx3',{}));
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
function sfx(kind){
if(S.set.vol<=0)return;
if(kind==='unlock'){tone(587,0,.09,'sine');tone(880,.07,.12,'sine')}
else if(kind==='lock'){tone(392,0,.1,'sine');tone(262,.06,.12,'sine')}
else if(kind==='shutter'){tone(1250,0,.035,'square',.7);tone(760,.045,.05,'square',.7)}
else if(kind==='send'){tone(740,0,.06,'sine');tone(1180,.05,.09,'sine')}
else if(kind==='alarm'){tone(880,0,.16,'sine');tone(880,.22,.16,'sine');tone(1174,.44,.2,'sine')}
else if(kind==='click'){tone(980,0,.04,'sine',.5)}
}
const NICON={FaceTime:'facetime',Messages:'messages','App Store':'appstore','الإعدادات':'settings',WhatsApp:'whatsapp',Telegram:'telegram',Messenger:'messenger',Instagram:'instagram',Facebook:'facebook',Discord:'discord',AirDrop:'photos','وقت الشاشة':'settings','المنبه':'clock','المؤقت':'clock','ملخص الإشعارات':'settings'};
function notify(app,title,text,fn,opts){
opts=opts||{};
pushNotif(app,(title&&title!==app?title+' — ':'')+text);
renderLockX();
const muted=S.set.dnd&&S.fx.focus.mute.includes(app);
if(opts.pop===false||muted||S.locked)return;
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
function renderLockX(){
const L=$('#lock');if(!L)return;
let x=$('#lockX');
if(!x){x=document.createElement('div');x.id='lockX';const hint=L.children[3];if(hint)L.insertBefore(x,hint);else L.appendChild(x)}
const nots=(S.notifs||[]).slice(0,3);
x.innerHTML='<div class="lwidRow">'+lockWidHTML()+'</div>'+liveHTML()+
(nots.length?'<div class="lnots">'+nots.map(n=>'<div class="lnot">'+notifIcon(n.app)+'<span style="flex:1;text-align:right"><b>'+escH(n.app)+'</b><br><span>'+escH(n.text)+'</span></span><span class="mut2">'+relTime(n.t)+'</span></div>').join('')+'</div>':'');
const lt=$('#lockTime'),ld=$('#lockDate');
if(lt){lt.style.color=S.fx.lock.wcol;lt.style.fontWeight=S.fx.lock.bold?'700':'300'}
if(ld)ld.style.color=S.fx.lock.wcol;
if(S.fx.lock.shuffle&&S.photos.length){L.style.backgroundImage='linear-gradient(rgba(10,12,18,.45),rgba(10,12,18,.45)),url("'+S.photos[0]+'")';L.style.backgroundSize='cover';L.style.backgroundPosition='center'}else{L.style.backgroundImage=''}
const pb=x.querySelector('[data-lmus]');if(pb)pb.addEventListener('click',e=>{e.stopPropagation();S.musicPlay=false;renderLockX();updWidgets()});
}
new MutationObserver(()=>{if($('#lock').classList.contains('show'))renderLockX()}).observe($('#lock'),{attributes:true,attributeFilter:['class']});
(function(){
const L=$('#lock');let sy=null;
L.addEventListener('touchstart',e=>{if(e.target.closest('.lbtn')||e.target.closest('button')){sy=null;return}sy=e.touches[0].clientY},{passive:true});
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
'<div class="wcard" id="wCal"><div style="color:#ff3b30;font-weight:700;font-size:12px" id="wCalD"></div><div style="font-size:30px;font-weight:700;line-height:1.02" id="wCalN"></div><div class="wsub" id="wCalS">لا توجد أحداث اليوم</div></div>'+
'<div class="wcard wblue" id="wWx"><div style="font-size:12.5px;font-weight:600">بغداد</div><div style="font-size:28px;font-weight:700;line-height:1.05" id="wWxT">…°</div><div class="wsub">الطقس الحقيقي — البطارية <b id="wBatt"></b></div></div>'+
'<div class="wcard wmus" id="wMus"><img id="wMusImg" alt=""><span style="flex:1;min-width:0"><b data-must id="wMusT" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px">Music</b><span class="lbar"><i data-musbar></i></span></span><button id="wMusBtn" class="wplay"></button></div>'+
'<div class="wcard wphoto" id="wPho"><img id="wPhoImg" alt=""><span>الصور</span></div>'+
'<button class="wtoday" id="wToday">'+g('calendar-outline','#fff',16)+' شاشة اليوم ›</button>';
$('#wToday').addEventListener('click',e=>{e.stopPropagation();openToday()});
$('#wWx').addEventListener('click',()=>openToday());
$('#wCal').addEventListener('click',e=>{e.stopPropagation();openApp('calendar',null)});
$('#wPho').addEventListener('click',e=>{e.stopPropagation();openApp('photos',null)});
$('#wMusBtn').addEventListener('click',e=>{e.stopPropagation();S.musicPlay=!S.musicPlay;sfx('click');updWidgets();renderLockX()});
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
const mi=$('#wMusImg'),mt=$('#wMusT'),mb=$('#wMusBtn');
if(mi){const a=ALBUMS[S.album||0];if(mi.getAttribute('src')!==a[2])mi.src=a[2];if(mt)mt.textContent=a[0]+' — '+a[1];if(mb)mb.innerHTML=g(S.musicPlay?'pause':'play','#fff',18)}
const pi=$('#wPhoImg');
if(pi){const pool=S.photos.length?S.photos:['https://picsum.photos/seed/riophoto1/400/400','https://picsum.photos/seed/riophoto3/400/400','https://picsum.photos/seed/riophoto5/400/400'];
if(!pi._rot||Date.now()-pi._rot>20000){pi._rot=Date.now();const src=pool[Math.floor(Date.now()/20000)%pool.length];if(pi.getAttribute('src')!==src)pi.src=src}}
wxFetch();
}
function openToday(){
let t=$('#todayV');if(!t){t=document.createElement('div');t.id='todayV';$('#screen').appendChild(t)}
const d=new Date();
const top=Object.entries(S.fx.use.sec||{}).sort((a,b)=>b[1]-a[1]).slice(0,3);
const mx=Math.max(1,...top.map(r=>r[1]));
t.innerHTML='<div class="todayHead"><b>اليوم</b><span>'+daysAr()[d.getDay()]+'، '+arabNum(d.getDate())+' '+monthsAr()[d.getMonth()]+'</span><button id="todayX">✕</button></div>'+
'<div class="todayCard wblueB"><div style="font-size:13px;opacity:.9">بغداد — طقس حقيقي</div><div style="font-size:44px;font-weight:200">'+(S._wx?S._wx.t+'°':'…°')+'</div><div style="font-size:13px;opacity:.9">البطارية '+arabNum(Math.round(S.batt.pct))+'٪'+(S.batt.charging?' — جاي ينشحن':'')+'</div></div>'+
'<div class="todayCard"><div class="th">وقت الشاشة اليوم</div>'+(top.length?top.map(r=>'<div class="trow"><span style="flex:0 0 92px">'+appName(r[0])+'</span><span class="tbar"><i style="width:'+Math.round(r[1]/mx*100)+'%"></i></span><span class="mut2" style="color:#fff">'+fmtDur(r[1])+'</span></div>').join(''):'<div style="opacity:.85;font-size:13px">ما استخدمت شي بعد اليوم</div>')+'</div>'+
'<div class="todayCard"><div class="th">الموسيقى</div><div class="row" style="gap:10px"><img src="'+ALBUMS[S.album||0][2]+'" style="width:44px;height:44px;border-radius:9px" alt=""><span style="flex:1;min-width:0"><b data-must style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+ALBUMS[S.album||0][0]+' — '+ALBUMS[S.album||0][1]+'</b><span class="lbar"><i data-musbar></i></span></span><button class="btn" id="tvMus">'+(S.musicPlay?'إيقاف':'تشغيل')+'</button></div></div>'+
'<div class="todayCard"><div class="th">آخر الصور</div><div class="pgrid">'+(S.photos.length?S.photos.slice(0,3):['https://picsum.photos/seed/riophoto1/400/400','https://picsum.photos/seed/riophoto3/400/400','https://picsum.photos/seed/riophoto5/400/400']).map(p=>'<img src="'+p+'" alt="">').join('')+'</div></div>'+
'<button class="btn gray" id="todayClose" style="width:100%;margin-top:4px">إغلاق</button>';
t.classList.add('open');
$('#todayX').addEventListener('click',()=>t.classList.remove('open'));
$('#todayClose').addEventListener('click',()=>t.classList.remove('open'));
const mv=$('#tvMus');if(mv)mv.addEventListener('click',()=>{S.musicPlay=!S.musicPlay;openToday();updWidgets()});
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
function setSubPage(el){
const p=S.setPage,fx=S.fx;
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
/* ===== wrappers + init ===== */
const _ors=renderStatus;
renderStatus=function(){_ors();try{if(S.set.dnd){const si=$('#sbIcons');if(si&&!si.querySelector('[data-moon]'))si.insertAdjacentHTML('afterbegin','<span data-moon="1" style="display:inline-flex">'+g('moon','#cfc9ff',14)+'</span>')}}catch(e){}};
const _orh=renderHome;
renderHome=function(){_orh();try{mountWidgets();applyFx()}catch(e){}};
const _occ=renderCC;
renderCC=function(){_occ();try{const sp=document.querySelector('.ccPill span:nth-of-type(2)');if(sp)sp.textContent=S.musicPlay?(ALBUMS[S.album||0][0]+' — '+ALBUMS[S.album||0][1]):'متوقف'}catch(e){}};
applyFx();
renderHome();
renderStatus();
wxFetch();
renderLockX();
