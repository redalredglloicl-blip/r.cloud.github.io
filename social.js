/* Rio iPad 7.2 — rich social apps + Apple Store. Overrides pad.js stubs. */
function chatInputHTML(){return '<div class="row" style="position:sticky;bottom:0;padding-top:8px"><input type="text" id="chatIn" placeholder="اكتب رسالة…" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px;font-family:inherit"><button class="btn" id="chatSend">إرسال</button></div>'}
const SVG_P={
search:'<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
'chevron-left':'<path d="M15 18l-6-6 6-6"/>',
'chevron-right':'<path d="M9 18l6-6-6-6"/>',
copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
video:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
heartF:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="COLOR" stroke="none"/>',
comment:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
film:'<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
tv:'<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>',
bag:'<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
check:'<polyline points="20 6 9 17 4 12"/>',
zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
play:'<polygon points="6 3 20 12 6 21 6 3"/>',
mapPin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
repeat:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
thumb:'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
sparkles:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
upRight:'<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
downLeft:'<line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/>',
ghost:'<path d="M12 2C7.6 2 4.5 5.6 4.5 10.2V20l2.7-1.7 2.5 1.7 1.4-1.3 1.4 1.3 2.5-1.7 2.7 1.7v-9.8C19.5 5.6 16.4 2 12 2z" fill="COLOR" stroke="none"/><circle cx="9" cy="10" r="1.4" fill="#fff" stroke="none"/><circle cx="15" cy="10" r="1.4" fill="#fff" stroke="none"/>',
x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
};
function si(n,sz,col){sz=sz||20;col=col||'currentColor';return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 auto;vertical-align:middle;display:inline-block">'+(SVG_P[n]||'').replace(/COLOR/g,col)+'</svg>'}
function sAv(seed,sz){sz=sz||44;return '<img src="https://i.pravatar.cc/'+(sz*2)+'?img='+seed+'" style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;flex:0 0 auto" loading="lazy" onerror="this.style.opacity=0.3">'}
function sBack(fn){return '<button class="back" id="sBackBtn" style="margin-bottom:8px">‹ رجوع</button>'}
function bindBack(fn){const b=$('#sBackBtn');if(b)b.addEventListener('click',e=>{e.stopPropagation();fn()})}
function sTicks(){return '<span style="font-size:10.5px;color:#34b7f1">✓✓</span>'}
/* ================= WhatsApp — REAL ================= */
const WA_LIST=[
['whatsapp','Rio العام','group',3,'كرار: تمام نلتقي بالليل','١٢:٤٥ م',3],
['whatsapp-dm-ahmad','أحمد','dm',12,'هلا رضا، شلونك؟','١١:٢٠ ص',1],
['whatsapp-dm-sara','سارة','dm',47,'دزيتلك الصور شوفهن','أمس',0],
['whatsapp-grp','عائلة Rio','group',32,'أمي: الغده جاهز','أمس',5],
['whatsapp-dm-omar','عمر','dm',59,'شفت المباراة البارحة؟','الثلاثاء',0]];
function appWhatsApp(){emptyChats('WhatsApp','<div style="background:#075e54;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">WhatsApp</b><span style="display:block;font-size:12px;opacity:.85">متصل \u2014 بانتظار ميزة اليوزر</span></div>')}

function waThread(room,title,seed){
const el=$('#appBody');
el.innerHTML=sBack()+'<div style="background:#075e54;color:#fff;border-radius:12px;padding:9px 12px"><div class="row" style="align-items:center;gap:9px">'+sAv(seed,38)+'<span><b style="font-size:14.5px">'+title+'</b><br><span style="font-size:11.5px;opacity:.85">متصل الآن · <b id="prsN">…</b></span></span><span style="margin-inline-start:auto;display:flex;gap:12px;align-items:center">'+si('video',19)+si('phone',19)+'</span></div></div>'+
'<div id="chatList" style="background:#ece5dd;border-radius:12px;padding:8px 6px;min-height:300px;margin-top:8px"><div class="mut" style="text-align:center;padding:16px">جاي يحمل…</div></div>'+chatInputHTML();
bindBack(appWhatsApp);
chatThread(room,{own:'#dcf8c6',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}
/* ================= Instagram — REAL ================= */
const IG_SEEDS=['rioinsta1','rioinsta2','rioinsta3','rioinsta4'];
const IG_HEADS=['rio_photos','iraq.views','baghdad.life','travel.iraq'];
const IG_CAP=['يوم جميل في بغداد 🌅','أحلى لقطة اليوم','من أجمل الأماكن','سفرة لا تُنسى'];
function appInsta(){
clearInterval(S.poll);S.igTab=S.igTab||'home';
const el=$('#appBody');
let h='';
if(S.igTab==='home'){
h+='<div class="row" style="align-items:center;padding:6px 2px"><b style="font-size:21px;font-family:Georgia,serif">Instagram</b><span style="margin-inline-start:auto;display:flex;gap:16px;align-items:center"><span style="display:inline-flex">'+si('heart',21)+'</span><span style="display:inline-flex">'+si('send',21)+'</span></span></div>';
h+='<div style="display:flex;gap:12px;overflow-x:auto;padding:6px 2px 12px">'+['<span style="text-align:center;flex:0 0 auto"><span style="position:relative;display:inline-block">'+sAv(5,56)+'<span style="position:absolute;bottom:0;left:0;background:#0a84ff;color:#fff;width:20px;height:20px;border-radius:50%;font-size:14px;line-height:20px;border:2px solid #fff">+</span></span><br><span style="font-size:11px">قصتك</span></span>'].concat(IG_HEADS.map((hh,i)=>'<span style="text-align:center;flex:0 0 auto"><span style="display:inline-block;background:linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7);border-radius:50%;padding:2.5px">'+sAv(12+i*7,54)+'</span><br><span style="font-size:11px">'+hh+'</span></span>')).join('')+'</div>';
h+='<div id="igFeed">'+IG_SEEDS.map((sd,i)=>igPostCard(sd,i)).join('')+'</div>';
}else if(S.igTab==='search'){
h+='<div style="padding:8px 2px"><input type="text" placeholder="بحث" style="width:100%;padding:9px 12px;border:none;border-radius:12px;background:#f0f2f5;font-size:13.5px;font-family:inherit"></div>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">'+Array.from({length:12},(_,i)=>'<img src="https://picsum.photos/seed/igx'+i+'/300/300" style="width:100%;aspect-ratio:1;object-fit:cover;display:block" loading="lazy">').join('')+'</div>';
}else if(S.igTab==='reels'){
h+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">'+Array.from({length:6},(_,i)=>'<div style="position:relative;border-radius:10px;overflow:hidden"><img src="https://picsum.photos/seed/igreel'+i+'/300/440" style="width:100%;display:block" loading="lazy"><span style="position:absolute;bottom:8px;right:8px;color:#fff;font-size:12px;display:inline-flex;align-items:center;gap:4px">'+si('play',11,'#fff')+' '+arabNum(1200+i*340)+'</span></div>').join('')+'</div>';
}else{
h+='<div class="row" style="align-items:center;padding:8px 2px"><b style="font-size:15px">rio_photos</b><span style="margin-inline-start:auto;display:inline-flex">'+si('menu',20)+'</span></div>';
h+='<div class="row" style="align-items:center;gap:14px;padding:6px 2px">'+sAv(12,64)+[['منشور',arabNum(128)],['متابِع',arabNum(4520)],['يتابع',arabNum(312)]].map(s=>'<span style="text-align:center;flex:1"><b style="font-size:15px">'+s[1]+'</b><br><span class="mut" style="font-size:12px">'+s[0]+'</span></span>').join('')+'</div>';
h+='<div style="padding:4px 2px;font-size:13px"><b>رضا</b> · مصور 📸 بغداد</div>';
h+='<div class="row" style="gap:8px;padding:8px 2px"><button class="btn" style="flex:1">تعديل الملف</button><button class="btn gray" style="flex:1">مشاركة الملف</button></div>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:6px">'+IG_SEEDS.concat(['rioinsta5','rioinsta6']).map(sd=>'<img src="https://picsum.photos/seed/'+sd+'/300/300" style="width:100%;aspect-ratio:1;object-fit:cover;display:block" loading="lazy">').join('')+'</div>';
}
const tabs=[['home','home'],['search','search'],['reels','film'],['profile','user']];
h+='<div style="display:flex;border-top:1px solid #e5e5e5;margin-top:10px;padding-top:6px;position:sticky;bottom:0;background:#fff">'+tabs.map(t=>'<span data-igtab="'+t[0]+'" style="flex:1;text-align:center;padding:8px;cursor:pointer;display:flex;justify-content:center;opacity:'+(S.igTab===t[0]?'1':'.45')+'">'+si(t[1],23)+'</span>').join('')+'</div>';
el.innerHTML=h;
el.querySelectorAll('[data-igtab]').forEach(t=>t.addEventListener('click',()=>{S.igTab=t.dataset.igtab;appInsta()}));
if(S.igTab==='home'){igBindFeed();}
}
function igPostCard(sd,i){
return '<div class="card" style="padding:0;overflow:hidden;margin-bottom:12px"><div class="row" style="padding:9px 11px;align-items:center;gap:9px">'+sAv(12+i*7,32)+'<b style="font-size:13px;flex:1">'+IG_HEADS[i]+'</b><span style="font-size:16px">•••</span></div>'+
'<img data-igimg="'+sd+'" src="https://picsum.photos/seed/'+sd+'/600/430" style="width:100%;display:block">'+
'<div class="row" style="padding:9px 11px;align-items:center;gap:12px;font-size:20px"><span data-like="'+sd+'" style="cursor:pointer;display:inline-flex">'+si('heart',22)+'</span><span style="display:inline-flex">'+si('comment',22)+'</span><span style="display:inline-flex">'+si('send',22)+'</span><span style="margin-inline-start:auto;display:inline-flex">'+si('bookmark',22)+'</span></div>'+
'<div style="padding:0 11px 11px;font-size:13px"><b id="lk-'+sd+'">…</b> إعجاب<br><b>'+IG_HEADS[i]+'</b> '+IG_CAP[i]+'<br><span class="mut" data-cmtlink="'+sd+'" style="cursor:pointer">عرض كل التعليقات (<b id="cm-'+sd+'">0</b>)</span></div></div>';
}
function igBindFeed(){
const refresh=async sd=>{const n=await fbGet('/rooms/instagram/likes/'+sd);const t=$('#lk-'+sd);if(t)t.textContent=arabNum(n||0);
const c=await fbGet('/rooms/instagram/comments/'+sd);const ct=$('#cm-'+sd);if(ct)ct.textContent=arabNum(c?Object.keys(c).length:0)};
IG_SEEDS.forEach(refresh);
const like=async sd=>{const n=(await fbGet('/rooms/instagram/likes/'+sd))||0;await fbPut('/rooms/instagram/likes/'+sd,n+1);refresh(sd);const b=document.querySelector('[data-like="'+sd+'"]');if(b){b.innerHTML=si('heartF',22,'#ed4956')}};
document.querySelectorAll('[data-like]').forEach(b=>b.addEventListener('click',()=>like(b.dataset.like)));
document.querySelectorAll('[data-igimg]').forEach(im=>{let last=0;im.addEventListener('click',()=>{const n=Date.now();if(n-last<350)like(im.dataset.igimg);last=n})});
const openCm=async sd=>{
const c=await fbGet('/rooms/instagram/comments/'+sd);const arr=c?Object.values(c).sort((a,b)=>(a.ts||0)-(b.ts||0)):[];
$('#appBody').innerHTML=sBack()+'<b style="font-size:16px">التعليقات</b><div style="margin-top:10px;max-height:60vh;overflow-y:auto">'+(arr.length?arr.map(x=>'<div class="row" style="gap:9px;padding:8px 2px;align-items:flex-start">'+sAv(20+((x.ts||0)%50),34)+'<span style="flex:1"><b style="font-size:12.5px">'+escH(x.u)+'</b> <span style="font-size:13px">'+escH(x.t)+'</span></span></div>').join(''):'<p class="mut" style="text-align:center;padding:20px">لا تعليقات بعد</p>')+'</div>'+chatInputHTML();
bindBack(appInsta);
const send=async()=>{const inp=$('#chatIn'),v=inp.value.trim();if(!v)return;await fbPost('/rooms/instagram/comments/'+sd,{u:myName(),t:v,ts:Date.now()});openCm(sd)};
$('#chatSend').addEventListener('click',send);$('#chatIn').addEventListener('keydown',e=>{if(e.key==='Enter')send});
};
document.querySelectorAll('[data-cmtlink]').forEach(b=>b.addEventListener('click',()=>openCm(b.dataset.cmtlink)));
}
/* ================= Telegram — REAL ================= */
const TG_CHATS=[
['telegram','مجموعة Rio','group',3,'١٢:٤٥ م'],
['tg-ahmad','أحمد','dm',12,'١١:٠٢ ص'],
['tg-nora','نورا','dm',47,'أمس'],
['tg-news','قناة الأخبار','channel',22,'أمس'],
['tg-movies','أفلام ومسلسلات','channel',56,'الثلاثاء']];
function appTelegram(){emptyChats('Telegram','<div style="background:#2AABEE;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Telegram</b></div>')}

function tgThread(roomId,title,seed,sub){
const el=$('#appBody');
el.innerHTML=sBack()+'<div style="background:#2AABEE;color:#fff;border-radius:12px;padding:9px 12px"><div class="row" style="align-items:center;gap:9px">'+sAv(seed,38)+'<span><b style="font-size:14.5px">'+title+'</b><br><span style="font-size:11.5px;opacity:.85">'+sub+' · <b id="prsN">…</b> متصل</span></span><span style="margin-inline-start:auto;font-size:17px">📞 📹</span></div></div>'+
'<div id="chatList" style="background:#e7edf2;border-radius:12px;padding:8px 6px;min-height:300px;margin-top:8px"><div class="mut" style="text-align:center;padding:16px">جاي يحمل…</div></div>'+chatInputHTML();
bindBack(appTelegram);
chatThread('/rooms/'+roomId,{own:'#effdde',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}
/* ================= Messenger — REAL ================= */
const MS_CHATS=[
['messenger','Eno','dm',5,'١:٢٠ م',true],
['ms-sara','Sara','dm',47,'١٢:١٠ م',true],
['ms-omar','Omar','dm',59,'أمس',false],
['ms-lina','Lina','dm',32,'أمس',true]];
function appMessenger(){emptyChats('Messenger','<div style="background:linear-gradient(90deg,#0084ff,#9b30d9);color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Messenger</b></div>')}

function msThread(roomId,name,seed,active){
const el=$('#appBody');
el.innerHTML=sBack()+'<div class="row" style="align-items:center;gap:9px;padding:6px 2px;border-bottom:1px solid #eee"><span style="position:relative">'+sAv(seed,40)+(active?'<span style="position:absolute;bottom:1px;left:1px;width:12px;height:12px;background:#31a24c;border:2px solid #fff;border-radius:50%"></span>':'')+'</span><span><b style="font-size:14.5px">'+name+'</b><br><span class="mut" style="font-size:11.5px">'+(active?'نشط الآن':'نشط قبل ساعة')+' · <b id="prsN">…</b></span></span><span style="margin-inline-start:auto;display:flex;gap:12px;align-items:center;color:#0084ff">'+si('phone',19)+si('video',19)+'</span></div>'+
'<div id="chatList" style="padding:8px 4px;min-height:300px"><div class="mut" style="text-align:center;padding:16px">جاي يحمل…</div></div>'+chatInputHTML();
bindBack(appMessenger);
chatThread('/rooms/'+roomId,{own:'#0084ff',ownTx:'#fff',other:'#e4e6eb',otherTx:'#111'});
}
/* ================= Facebook / X — REAL posts ================= */
function appFeedNet(k){
clearInterval(S.poll);
const el=$('#appBody'),isX=k==='x';
const avSeed=u=>5+((u||'').length*7)%50;
if(isX){
el.innerHTML='<div class="row" style="align-items:center;padding:6px 2px">'+sAv(8,32)+'<b style="font-size:22px;flex:1;text-align:center">𝕏</b><span style="display:inline-flex">'+si('sparkles',20)+'</span></div>'+
'<div style="display:flex;border-bottom:1px solid #eee">'+['لك','المتابَعون'].map((t,i)=>'<span style="flex:1;text-align:center;font-size:13.5px;font-weight:700;padding:10px;border-bottom:3px solid '+(i===0?'#000':'transparent')+'">'+t+'</span>').join('')+'</div>'+
'<div class="card" style="margin-top:8px"><div class="row" style="gap:9px">'+sAv(8,38)+'<input id="fdIn" type="text" placeholder="شنو يصير؟" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:13.5px;font-family:inherit"><button class="btn" id="fdPost">نشر</button></div></div>'+
'<div id="fdList"><div class="mut" style="text-align:center;padding:18px">جاي يحمل المنشورات…</div></div><p class="mut" style="text-align:center;font-size:11.5px">منشورات حقيقية عبر Firebase</p>';
}else{
el.innerHTML='<div style="background:#1877F2;color:#fff;border-radius:14px;padding:10px 12px"><div class="row" style="align-items:center"><b style="font-size:22px">facebook</b><span style="margin-inline-start:auto;display:flex;gap:14px;align-items:center"><span>'+si('plus',20,'#fff')+'</span><span>'+si('search',20,'#fff')+'</span></span></div></div>'+
'<div style="display:flex;padding:8px 2px">'+['home','tv','bag','bell','menu'].map((t,i)=>'<span style="flex:1;text-align:center;font-size:20px;padding:8px;border-bottom:3px solid '+(i===0?'#1877F2':'transparent')+';opacity:'+(i===0?'1':'.5')+';display:flex;justify-content:center">'+si(t,22)+'</span>').join('')+'</div>'+
'<div style="display:flex;gap:8px;overflow-x:auto;padding:6px 2px 10px">'+['<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/fbstory0/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover"><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">إنشاء قصة</span></span>','<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/fbstory1/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover"><span style="position:absolute;top:6px;right:6px;border:2.5px solid #1877F2;border-radius:50%">'+sAv(32,30)+'</span><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">لينا</span></span>','<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/fbstory2/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover"><span style="position:absolute;top:6px;right:6px;border:2.5px solid #1877F2;border-radius:50%">'+sAv(8,30)+'</span><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">كرار</span></span>'].join('')+'</div>'+
'<div class="card row" style="align-items:center;gap:9px">'+meAv(38)+'<input id="fdIn" type="text" placeholder="بم تفكر، '+escH(myName())+'؟" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:13.5px;font-family:inherit"><button class="btn" id="fdPost">نشر</button></div>'+
'<div id="fdList"><div class="mut" style="text-align:center;padding:18px">جاي يحمل المنشورات…</div></div><p class="mut" style="text-align:center;font-size:11.5px">منشورات حقيقية عبر Firebase</p>';
}
const load=async()=>{
const d=await fbGet('/rooms/'+k+'/posts');const l=$('#fdList');if(!l){clearInterval(S.poll);return}
const arr=d?Object.values(d).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,25):[];
if(isX){
l.innerHTML=arr.length?arr.map(x=>'<div style="padding:10px 6px;border-bottom:1px solid #f0f0f0"><div class="row" style="gap:9px">'+sAv(avSeed(x.u),40)+'<span style="flex:1;min-width:0"><b style="font-size:13.5px">'+escH(x.u)+'</b> <span class="mut" style="font-size:12px">@'+escH(x.u.replace(/\s/g,'_'))+' · '+new Date(x.ts||Date.now()).toLocaleTimeString('ar-IQ',{hour:'numeric',minute:'2-digit'})+'</span><p style="font-size:14px;line-height:1.7;margin:3px 0">'+escH(x.t)+'</p><div class="row" style="justify-content:space-between;max-width:280px;color:#536471;font-size:12.5px"><span style="display:inline-flex">'+si('comment',17)+'</span><span style="display:inline-flex">'+si('repeat',17)+'</span><span style="display:inline-flex">'+si('heart',17)+'</span><span style="display:inline-flex">'+si('chart',17)+'</span></div></span></div></div>').join(''):'<div class="mut" style="text-align:center;padding:20px">لا منشورات بعد — انشر أول منشور</div>';
}else{
l.innerHTML=arr.length?arr.map(x=>'<div class="card" style="padding:0;overflow:hidden;margin-top:10px"><div class="row" style="padding:10px 12px;align-items:center;gap:9px">'+sAv(avSeed(x.u),40)+'<span style="flex:1"><b style="font-size:13.5px">'+escH(x.u)+'</b><br><span class="mut" style="font-size:11.5px">'+new Date(x.ts||Date.now()).toLocaleTimeString('ar-IQ',{hour:'numeric',minute:'2-digit'})+' · '+si('globe',12)+'</span></span><span>•••</span></div><p style="padding:0 12px 10px;font-size:14px;line-height:1.8">'+escH(x.t)+'</p><div class="row" style="border-top:1px solid #eee;margin:0 12px;padding:8px 0">'+[['thumb','أعجبني'],['comment','تعليق'],['share','مشاركة']].map(a=>'<span style="flex:1;text-align:center;font-size:13px;color:#65676b;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:6px">'+si(a[0],16,'#65676b')+' '+a[1]+'</span>').join('')+'</div></div>').join(''):'<div class="mut" style="text-align:center;padding:20px">لا منشورات بعد — انشر أول منشور</div>';
}
};
load();clearInterval(S.poll);S.poll=setInterval(load,4000);
$('#fdPost').addEventListener('click',async()=>{const v=$('#fdIn').value.trim();if(!v)return;await fbPost('/rooms/'+k+'/posts',{u:myName(),t:v,ts:Date.now()});$('#fdIn').value='';load()});
}

/* ================= Snapchat — REAL ================= */
const SN_CHATS=[
['snapchat','أحمد',12,'٢٠ د'],
['sn-sara','سارة',47,'١ س'],
['sn-omar','عمر',59,'٢ س']];
function appSnapchat(){emptyChats('Snapchat','<div style="background:#e8c832;color:#111;border-radius:14px;padding:12px"><b style="font-size:16px">Snapchat</b></div>')}

function snThread(roomId,name,seed){
const el=$('#appBody');
el.innerHTML=sBack()+'<div style="background:#e8c832;border-radius:12px;padding:9px 12px"><div class="row" style="align-items:center;gap:9px">'+sAv(seed,38)+'<span><b style="font-size:14.5px">'+name+'</b><br><span style="font-size:11.5px;opacity:.75">صديق · <b id="prsN">…</b> متصل</span></span><span style="margin-inline-start:auto;display:flex;gap:12px;align-items:center">'+si('camera',19)+si('phone',19)+'</span></div></div>'+
'<div id="chatList" style="background:#fffbe8;border-radius:12px;padding:8px 6px;min-height:300px;margin-top:8px"><div class="mut" style="text-align:center;padding:16px">جاي يحمل…</div></div>'+chatInputHTML();
bindBack(appSnapchat);
chatThread('/rooms/'+roomId,{own:'#fffc00',ownTx:'#111',other:'#ffffff',otherTx:'#111'});
}
/* ================= Discord — REAL ================= */
const DC_CH=[['discord','# عام'],['dc-news','# إعلانات'],['dc-pics','# صور-اللاعبين']];
function appDiscord(){emptyChats('Discord','<div style="background:#1e1f22;color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">Discord</b></div>')}

function appAppleStore(){
S.apTab=S.apTab||'shop';S.bag=S.bag||[];
const el=$('#appBody');
const bagN=S.bag.length;
let h='<div class="row" style="align-items:center;padding:6px 2px"><img src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" style="width:22px;height:22px" onerror="this.remove()"><b style="font-size:17px;margin-inline-start:6px">Store</b><span style="margin-inline-start:auto;display:flex;gap:14px;font-size:18px;align-items:center"><span data-aptab="search" style="display:inline-flex;cursor:pointer">'+si('search',20)+'</span><span data-aptab="bag" style="position:relative;display:inline-flex;cursor:pointer">'+si('bag',21)+''+(bagN?'<span style="position:absolute;top:-6px;left:-8px;background:#0a84ff;color:#fff;font-size:10px;font-weight:700;min-width:17px;height:17px;border-radius:9px;display:flex;align-items:center;justify-content:center">'+arabNum(bagN)+'</span>':'')+'</span></span></div>';
if(S.apTab==='shop'){
h+='<div style="border-radius:18px;overflow:hidden;margin:8px 0;position:relative"><img src="https://picsum.photos/seed/applestore-hero/700/300" style="width:100%;height:150px;object-fit:cover;display:block"><div style="position:absolute;bottom:0;right:0;left:0;padding:12px;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff"><b style="font-size:17px">iPhone 17 Pro</b><br><span style="font-size:12.5px">تايتانيوم. قوي بشكل يفوق الخيال.</span></div></div>';
h+='<b style="font-size:15px">تسوق حسب المنتج</b><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:8px">'+AP_PRODUCTS.map(p=>'<div data-ap="'+p.id+'" style="cursor:pointer;border-radius:16px;overflow:hidden;background:#f5f5f7"><div style="height:110px;background:'+p.g+';display:flex;align-items:center;justify-content:center"><span style="color:#fff;font-size:30px;font-weight:800;opacity:.9">'+p.n.split(' ')[0]+'</span></div><div style="padding:10px"><b style="font-size:13.5px">'+p.n+'</b><br><span class="mut" style="font-size:12px">'+p.tag+'</span><br><b style="font-size:13px;color:#0a84ff">من $'+p.price+'</b></div></div>').join('')+'</div>';
}else if(S.apTab==='bag'){
if(!S.bag.length){h+='<div style="text-align:center;padding:40px 10px"><div style="display:flex;justify-content:center">'+si('bag',44,'#8e8e93')+'</div><b>حقيبتك فارغة</b><p class="mut" style="margin-top:6px">تصفح المنتجات وأضف ما يعجبك</p><button class="btn" data-aptab="shop" style="margin-top:12px">تسوق الآن</button></div>'}
else{const total=S.bag.reduce((a,b)=>a+b.price,0);
h+='<b style="font-size:15px">حقيبة التسوق</b>'+S.bag.map((b,i)=>'<div class="card row" style="align-items:center;margin-top:8px"><span style="width:52px;height:52px;border-radius:12px;background:'+b.g+'"></span><span style="flex:1;margin-inline-start:10px"><b style="font-size:13.5px">'+b.n+'</b><br><span class="mut" style="font-size:12px">'+b.opt+'</span><br><b style="font-size:13px">$'+b.price+'</b></span><button class="btn gray" data-bagrm="'+i+'" style="padding:6px 12px">حذف</button></div>').join('')+
'<div class="card" style="margin-top:10px"><div class="row"><span style="flex:1">المجموع</span><b>$'+total+'</b></div><button class="btn" id="apCheckout" style="width:100%;margin-top:10px;padding:12px">إتمام الشراء</button></div>'}
}else{
h+='<div style="padding:8px 0"><input id="apSearch" type="text" placeholder="ابحث في المتجر" style="width:100%;padding:10px 14px;border:none;border-radius:14px;background:#f0f2f5;font-size:14px;font-family:inherit"></div><div id="apRes" class="mut" style="text-align:center;padding:20px">اكتب للبحث عن المنتجات</div>';
}
el.innerHTML=h;
el.querySelectorAll('[data-aptab]').forEach(t=>t.addEventListener('click',()=>{S.apTab=t.dataset.aptab;appAppleStore()}));
el.querySelectorAll('[data-ap]').forEach(c=>c.addEventListener('click',()=>apDetail(c.dataset.ap)));
el.querySelectorAll('[data-bagrm]').forEach(b=>b.addEventListener('click',()=>{S.bag.splice(+b.dataset.bagrm,1);appAppleStore()}));
const co=$('#apCheckout');if(co)co.addEventListener('click',()=>{S.bag=[];el.innerHTML='<div style="text-align:center;padding:50px 16px"><div style="font-size:52px">✓</div><b style="font-size:17px">تم استلام طلبك!</b><p class="mut" style="margin-top:8px;line-height:1.9">شكراً لتسوقك من Apple Store.<br>سيصلك تأكيد الطلب قريباً.</p><button class="btn" id="apBackShop" style="margin-top:14px">متابعة التسوق</button></div>';$('#apBackShop').addEventListener('click',()=>{S.apTab='shop';appAppleStore()})});
const si=$('#apSearch');if(si)si.addEventListener('input',()=>{const q=si.value.trim().toLowerCase();const r=$('#apRes');const list=AP_PRODUCTS.filter(p=>p.n.toLowerCase().includes(q)||p.tag.includes(si.value.trim()));r.innerHTML=list.length?list.map(p=>'<div class="card row" data-ap="'+p.id+'" style="align-items:center;margin-top:8px;cursor:pointer"><span style="width:46px;height:46px;border-radius:10px;background:'+p.g+'"></span><span style="flex:1;margin-inline-start:10px"><b>'+p.n+'</b><br><span class="mut">$'+p.price+'</span></span></div>').join(''):'لا نتائج';r.querySelectorAll('[data-ap]').forEach(c=>c.addEventListener('click',()=>apDetail(c.dataset.ap)))});
}
function apDetail(id){
const p=AP_PRODUCTS.find(x=>x.id===id);if(!p)return;
S.apColor=S.apColor||{};S.apStor=S.apStor||{};
if(!S.apColor[id])S.apColor[id]=p.colors[0];if(!S.apStor[id])S.apStor[id]=p.stor[0];
const el=$('#appBody');
const render=()=>{
el.innerHTML=sBack()+'<div style="height:190px;border-radius:18px;background:'+p.g+';display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff"><span style="font-size:34px;font-weight:800">'+p.n.split(' ')[0]+'</span><span style="font-size:14px;opacity:.9">'+p.n+'</span></div>'+
'<b style="font-size:19px;margin-top:12px;display:block">'+p.n+'</b><p class="mut" style="margin:4px 0 10px">'+p.tag+'</p>'+
'<b style="font-size:13.5px">اللون: '+S.apColor[id]+'</b><div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap">'+p.colors.map(c=>'<span data-apc="'+c+'" style="padding:8px 14px;border-radius:16px;font-size:12.5px;cursor:pointer;border:2px solid '+(S.apColor[id]===c?'#0a84ff':'#e5e5e5')+';background:'+(S.apColor[id]===c?'#eef5ff':'#fff')+'">'+c+'</span>').join('')+'</div>'+
'<b style="font-size:13.5px">المواصفات: '+S.apStor[id]+'</b><div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap">'+p.stor.map(s2=>'<span data-aps="'+s2+'" style="padding:8px 14px;border-radius:16px;font-size:12.5px;cursor:pointer;border:2px solid '+(S.apStor[id]===s2?'#0a84ff':'#e5e5e5')+';background:'+(S.apStor[id]===s2?'#eef5ff':'#fff')+'">'+s2+'</span>').join('')+'</div>'+
'<div class="row" style="align-items:center;margin-top:10px"><b style="font-size:20px">$'+p.price+'</b><button class="btn" id="apAdd" style="margin-inline-start:auto;padding:11px 26px">أضف إلى الحقيبة</button></div>'+
'<div class="card" style="margin-top:12px"><b style="font-size:13.5px">لماذا '+p.n+'؟</b><p class="mut" style="font-size:12.5px;line-height:1.9;margin-top:4px">شحن مجاني · إرجاع مجاني خلال ١٤ يوم · تقسيط بدون فوائد · نقش مجاني عند الطلب</p></div>';
bindBack(appAppleStore);
el.querySelectorAll('[data-apc]').forEach(x=>x.addEventListener('click',()=>{S.apColor[id]=x.dataset.apc;render()}));
el.querySelectorAll('[data-aps]').forEach(x=>x.addEventListener('click',()=>{S.apStor[id]=x.dataset.aps;render()}));
$('#apAdd').addEventListener('click',()=>{S.bag.push({n:p.n,price:p.price,g:p.g,opt:S.apColor[id]+' · '+S.apStor[id]});toast('انضافت إلى الحقيبة 🛍');S.apTab='bag';appAppleStore()});
};
render();
}
const YT_VIDS=[
['aqz-KE-bpKQ','Big Buck Bunny \u2014 \u0641\u064a\u0644\u0645 \u0642\u0635\u064a\u0631','Blender Foundation','3.4M','21M','\u0623\u0641\u0644\u0627\u0645','9:56','\u0642\u0628\u0644 5 \u0633\u0646\u0648\u0627\u062a'],
['jfKfPfyJRdk','lofi hip hop radio \u2014 beats to relax/study to','Lofi Girl','14.8M','34K','\u0628\u062b \u0645\u0628\u0627\u0634\u0631','\u0645\u0628\u0627\u0634\u0631','\u0627\u0644\u0622\u0646'],
['dQw4w9WgXcQ','Rick Astley \u2014 Never Gonna Give You Up (Official Video)','Rick Astley','3.1M','1.6B','\u0645\u0648\u0633\u064a\u0642\u0649','3:33','\u0642\u0628\u0644 14 \u0633\u0646\u0629'],
['kJQP7kiw5Fk','Luis Fonsi \u2014 Despacito ft. Daddy Yankee','Luis Fonsi','42M','8.7B','\u0645\u0648\u0633\u064a\u0642\u0649','4:42','\u0642\u0628\u0644 8 \u0633\u0646\u0648\u0627\u062a'],
['JGwWNGJdvx8','Ed Sheeran \u2014 Shape of You (Official Music Video)','Ed Sheeran','39M','6.3B','\u0645\u0648\u0633\u064a\u0642\u0649','4:24','\u0642\u0628\u0644 8 \u0633\u0646\u0648\u0627\u062a'],
['60ItHLz5WEA','Alan Walker \u2014 Faded','Alan Walker','46M','3.8B','\u0645\u0648\u0633\u064a\u0642\u0649','3:33','\u0642\u0628\u0644 9 \u0633\u0646\u0648\u0627\u062a'],
['fJ9rUzIMcZQ','Queen \u2014 Bohemian Rhapsody (Official Video Remastered)','Queen Official','18M','1.9B','\u0645\u0648\u0633\u064a\u0642\u0649','5:59','\u0642\u0628\u0644 6 \u0633\u0646\u0648\u0627\u062a'],
['9bZkp7q19f0','PSY \u2014 GANGNAM STYLE (Official M/V)','officialpsy','32M','5.1B','\u0645\u0648\u0633\u064a\u0642\u0649','4:13','\u0642\u0628\u0644 12 \u0633\u0646\u0629'],
['RgKAFK5djSk','Wiz Khalifa \u2014 See You Again ft. Charlie Puth','Wiz Khalifa','36M','6.5B','\u0645\u0648\u0633\u064a\u0642\u0649','3:58','\u0642\u0628\u0644 10 \u0633\u0646\u0648\u0627\u062a'],
['hTWKbfoikeg','Nirvana \u2014 Smells Like Teen Spirit (Official Music Video)','Nirvana','12M','2.1B','\u0645\u0648\u0633\u064a\u0642\u0649','4:38','\u0642\u0628\u0644 15 \u0633\u0646\u0629'],
['MmB9b5njVbA','Minecraft: Official Trailer','Minecraft','15M','220M','\u0623\u0644\u0639\u0627\u0628','1:01','\u0642\u0628\u0644 12 \u0633\u0646\u0629'],
['CevxZvSJLk8','Katy Perry \u2014 Roar (Official)','Katy Perry','45M','4.1B','\u0645\u0648\u0633\u064a\u0642\u0649','3:48','\u0642\u0628\u0644 11 \u0633\u0646\u0629'],
['YQHsXMglC9A','Adele \u2014 Hello (Official Music Video)','Adele','31M','3.2B','\u0645\u0648\u0633\u064a\u0642\u0649','6:07','\u0642\u0628\u0644 9 \u0633\u0646\u0648\u0627\u062a'],
['e-ORhEE9VVg','Taylor Swift \u2014 Blank Space (Official Music Video)','Taylor Swift','58M','3.1B','\u0645\u0648\u0633\u064a\u0642\u0649','4:33','\u0642\u0628\u0644 10 \u0633\u0646\u0648\u0627\u062a'],
['OPf0YbXqDm0','Mark Ronson \u2014 Uptown Funk (Official Video) ft. Bruno Mars','Mark Ronson','20M','5.2B','\u0645\u0648\u0633\u064a\u0642\u0649','4:31','\u0642\u0628\u0644 10 \u0633\u0646\u0648\u0627\u062a'],
['pRpeEdMmmQY','Shakira \u2014 Waka Waka (Esto es \u00c1frica) (Official Video)','Shakira','44M','4.0B','\u0645\u0648\u0633\u064a\u0642\u0649','3:31','\u0642\u0628\u0644 14 \u0633\u0646\u0629'],
['fRh_vgS2dFE','Justin Bieber \u2014 Sorry (Official Video)','Justin Bieber','72M','3.9B','\u0645\u0648\u0633\u064a\u0642\u0649','3:25','\u0642\u0628\u0644 9 \u0633\u0646\u0648\u0627\u062a']
];
function ytUid(){if(!S.uid){S.uid='u'+Math.random().toString(36).slice(2,9);store.set('uid',S.uid)}return S.uid}
function ytParseId(u){u=String(u||'').trim();const m=u.match(/(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|live\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);return m?m[1]:null}
function ytNum(s){const m=String(s).match(/([\d.]+)([KMB])?/);if(!m)return 0;const n=parseFloat(m[1]);return Math.round(n*(m[2]==='B'?1e9:m[2]==='M'?1e6:m[2]==='K'?1e3:1))}
function ytFmt(n){n=+n||0;if(n>=1e9)return (n/1e9).toFixed(1)+'B';if(n>=1e6)return (n/1e6).toFixed(1)+'M';if(n>=1e3)return (n/1e3).toFixed(1)+'K';return ''+n}
const ytEstPos=()=>S.ytPos&&S.ytPos.playing?(S.ytPos.t+(Date.now()-S.ytPos.at)/1000):((S.ytPos||{}).t||0);
const ytSeek=d=>{const np=Math.max(0,Math.round(ytEstPos()+d));ytCmd('seekTo',[np,true]);S.ytPos={t:np,at:Date.now(),playing:true};S.ytLastSync=Date.now();fbPut('/rooms/youtube/'+S.ytVid+'/sync',{a:'seek',pos:np,by:ytUid(),ts:Date.now()});toast(d>0?'قدّمت 5 ثواني — وصل لصديقك':'رجّعت 5 ثواني — وصل لصديقك')};
function ytCmd(f,a){const fr=document.querySelector('#ytFrame');if(fr&&fr.contentWindow){try{fr.contentWindow.postMessage(JSON.stringify({event:'command',func:f,args:a||[]}),'*')}catch(e){}}}
function ytEst(){const p=S.ytPos||{t:0,at:Date.now(),playing:false};return p.playing?p.t+(Date.now()-p.at)/1000:p.t}
function ytSay(a,pos){fbPut('/rooms/youtube/'+S.ytVid+'/sync',{a:a,pos:Math.round(pos),by:ytUid(),ts:Date.now()})}
function ytState(info){
if(S.ytApplying||S.app!=='x_youtube'||!S.ytVid)return;
if(info===1){S.ytPos={t:ytEst(),at:Date.now(),playing:true};ytSay('play',S.ytPos.t)}
else if(info===2){S.ytPos={t:ytEst(),at:Date.now(),playing:false};ytSay('pause',S.ytPos.t)}
}
if(!window._ytL){window._ytL=true;window.addEventListener('message',e=>{let d;try{d=typeof e.data==='string'?JSON.parse(e.data):e.data}catch(_){return}if(d&&d.event==='onStateChange')ytState(d.info)})}
function ytCard(v){
return '<div data-ytv="'+v[0]+'" style="margin-top:14px;cursor:pointer"><div style="position:relative"><img src="https://img.youtube.com/vi/'+v[0]+'/hqdefault.jpg" loading="lazy" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover;background:#111;display:block"><span style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,.82);color:#fff;font-size:11.5px;padding:2px 7px;border-radius:6px">'+(v[6]||'')+'</span>'+(v[5]==='بث مباشر'?'<span style="position:absolute;bottom:8px;right:8px;background:#c00;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px">مباشر</span>':'')+'</div>'+
'<div class="row" style="margin-top:8px;gap:10px;align-items:flex-start"><span style="width:38px;height:38px;border-radius:50%;background:linear-gradient(150deg,#ff0033,#7a0018);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto">'+v[2].slice(0,1)+'</span>'+
'<span style="flex:1;min-width:0"><b style="font-size:14px;line-height:1.5;display:block">'+v[1]+'</b><span class="mut" style="font-size:12.5px">'+v[2]+' • '+v[4]+' مشاهدة • '+(v[7]||'')+'</span></span></div></div>';
}
function ytMini(v){return '<div data-ytv="'+v[0]+'" class="row" style="margin-top:10px;cursor:pointer;gap:10px;align-items:flex-start"><div style="position:relative;flex:0 0 150px"><img src="https://img.youtube.com/vi/'+v[0]+'/hqdefault.jpg" loading="lazy" style="width:150px;aspect-ratio:16/9;object-fit:cover;border-radius:8px;background:#111;display:block"><span style="position:absolute;bottom:5px;left:5px;background:rgba(0,0,0,.82);color:#fff;font-size:10.5px;padding:1px 6px;border-radius:5px">'+(v[6]||'')+'</span></div><span style="flex:1;min-width:0"><b style="font-size:13px;line-height:1.5;display:block;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">'+v[1]+'</b><span class="mut" style="font-size:11.5px">'+v[2]+' • '+v[4]+' مشاهدة</span></span></div>';}
function appYouTubeX(){
const el=document.querySelector('#appBody');
S.ytView=S.ytView||'home';
if(S.ytView==='home')return ytHome(el);
if(S.ytView==='search')return ytSearchV(el);
return ytWatch(el,S.ytVidV);
}
function ytHome(el){
let h='<div class="row" style="align-items:center;margin:-12px -12px 0;padding:11px 14px 9px;position:sticky;top:-12px;background:#fff;z-index:5;border-bottom:1px solid #f0f0f2"><span style="display:inline-flex;align-items:center;gap:6px"><span style="width:30px;height:22px;background:#ff0033;border-radius:6px;display:inline-flex;align-items:center;justify-content:center"><span style="width:0;height:0;border-left:9px solid #fff;border-top:6px solid transparent;border-bottom:6px solid transparent;margin-inline-start:2px"></span></span><b style="font-size:19px;letter-spacing:-.5px">YouTube</b></span><span style="margin-inline-start:auto;display:flex;gap:16px;align-items:center"><span data-ytgo="search" style="display:inline-flex;cursor:pointer">'+si('search',21)+'</span><span style="display:inline-flex">'+si('bell',21)+'</span><span style="display:inline-flex">'+meAv(30)+'</span></span></div>';
S.ytCat=S.ytCat||'الكل';
h+='<div class="row" style="gap:8px;overflow-x:auto;padding:4px 0">'+['الكل','موسيقى','أفلام','بث مباشر','ألعاب'].map(c=>'<span data-ytcat="'+c+'" style="padding:7px 14px;border-radius:9px;font-size:13px;white-space:nowrap;cursor:pointer;'+(S.ytCat===c?'background:#0f0f0f;color:#fff':'background:#f2f2f2')+'">'+c+'</span>').join('')+'</div>';
const _vf=YT_VIDS.filter(v=>S.ytCat==='الكل'||v[5]===S.ytCat);
h+='<div class="row" style="align-items:center;margin-top:14px"><span style="width:24px;height:32px;background:#ff0033;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;margin-inline-end:8px;flex:0 0 auto"><span style="width:0;height:0;border-left:9px solid #fff;border-top:6px solid transparent;border-bottom:6px solid transparent;margin-inline-start:2px"></span></span><b style="font-size:16px">Shorts</b></div>';
h+='<div class="row" style="gap:10px;overflow-x:auto;padding:10px 2px 4px">'+YT_VIDS.slice(0,8).map(v=>'<div data-ytv="'+v[0]+'" style="flex:0 0 118px;cursor:pointer"><img src="https://img.youtube.com/vi/'+v[0]+'/hqdefault.jpg" loading="lazy" style="width:118px;height:210px;object-fit:cover;border-radius:10px;background:#111;display:block"><b style="font-size:12px;line-height:1.5;display:block;margin-top:6px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">'+v[1]+'</b><span class="mut" style="font-size:11px">'+v[4]+' مشاهدة</span></div>').join('')+'</div>';
h+=_vf.length?_vf.map(ytCard).join(''):'<p class="mut" style="text-align:center;padding:30px">لا توجد فيديوات بهذا التصنيف</p>';
el.innerHTML=h;
el.querySelectorAll('[data-ytgo]').forEach(x=>x.addEventListener('click',()=>{S.ytView=x.dataset.ytgo;appYouTubeX()}));
el.querySelectorAll('[data-ytcat]').forEach(x=>x.addEventListener('click',()=>{S.ytCat=x.dataset.ytcat;appYouTubeX()}));
el.querySelectorAll('[data-ytv]').forEach(c=>c.addEventListener('click',()=>{const v=YT_VIDS.find(x=>x[0]===c.dataset.ytv);S.ytView='watch';S.ytVidV={id:v[0],title:v[1],ch:v[2],subs:v[3],views:v[4],cat:v[5],dur:v[6],time:v[7]};appYouTubeX()}));
}
function ytSearchV(el){
el.innerHTML='<div class="row" style="align-items:center;margin-bottom:10px"><span data-ytgo="home" style="color:#0a84ff;cursor:pointer">‹ رجوع</span><b style="flex:1;text-align:center">بحث</b><span style="width:50px"></span></div>'+
'<div class="card"><b style="font-size:14.5px">الصق رابط أي مقطع يوتيوب</b><p class="mut" style="font-size:12.5px;margin:4px 0 10px;line-height:1.8">انسخ رابط الفيديو من يوتيوب والصقه هنا — يشتغل عندك مباشرة مع التعليقات والمشاهدة المشتركة.</p>'+
'<input id="ytUrl" placeholder="https://www.youtube.com/watch?v=…" style="width:100%;padding:12px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;font-family:inherit;direction:ltr;text-align:left">'+
'<button class="btn" id="ytPlayUrl" style="width:100%;margin-top:10px;padding:12px">تشغيل المقطع</button></div>'+
'<div class="card"><b style="font-size:14px">بحث في الفيديوات</b><input id="ytQ" placeholder="ابحث بعنوان أو قناة\u2026" style="width:100%;padding:11px 12px;border:1px solid #d9d9de;border-radius:12px;font-size:14px;font-family:inherit;margin-top:8px"><div id="ytQR"></div></div>'+
'<div class="card"><b style="font-size:14px">فيديوات مقترحة</b><div style="margin-top:6px">'+YT_VIDS.slice(0,4).map(ytCard).join('')+'</div></div>';
el.querySelectorAll('[data-ytgo]').forEach(x=>x.addEventListener('click',()=>{S.ytView=x.dataset.ytgo;appYouTubeX()}));
el.querySelectorAll('[data-ytv]').forEach(c=>c.addEventListener('click',()=>{const v=YT_VIDS.find(x=>x[0]===c.dataset.ytv);S.ytView='watch';S.ytVidV={id:v[0],title:v[1],ch:v[2],subs:v[3],views:v[4],cat:v[5],dur:v[6],time:v[7]};appYouTubeX()}));
const ytQ=document.querySelector('#ytQ');if(ytQ)ytQ.addEventListener('input',()=>{const q=ytQ.value.trim();const r=document.querySelector('#ytQR');if(!r)return;if(!q){r.innerHTML='';return}const f=YT_VIDS.filter(v=>v[1].includes(q)||v[2].includes(q));r.innerHTML=f.length?f.slice(0,6).map(ytMini).join(''):'<p class="mut" style="padding:10px 2px;font-size:13px">لا نتائج</p>';r.querySelectorAll('[data-ytv]').forEach(c=>c.addEventListener('click',()=>{const v=YT_VIDS.find(x=>x[0]===c.dataset.ytv);S.ytView='watch';S.ytVidV={id:v[0],title:v[1],ch:v[2],subs:v[3],views:v[4],cat:v[5],dur:v[6],time:v[7]};appYouTubeX()}));});
document.querySelector('#ytPlayUrl').addEventListener('click',()=>{
const id=ytParseId(document.querySelector('#ytUrl').value);
if(!id)return toast('الرابط مو صحيح — الصق رابط يوتيوب كامل');
S.ytView='watch';S.ytVidV={id:id,title:'فيديو من الرابط',ch:'YouTube',subs:'—'};appYouTubeX();
});
}
function ytWatch(el,v){
S.ytVid=v.id;S.ytPos={t:0,at:Date.now(),playing:false};S.ytLastSync=0;S.ytApplying=false;
if(!S._ytMsg){S._ytMsg=1;window.addEventListener('message',e=>{try{
const d=typeof e.data==='string'?JSON.parse(e.data):e.data;
if(!d||d.event!=='onStateChange'||S.ytApplying||!S.ytVid||S.app!=='x_youtube')return;
const st=d.info,pos=S.ytPos&&S.ytPos.playing?(S.ytPos.t+(Date.now()-S.ytPos.at)/1000):((S.ytPos||{}).t||0);
if(st===1){S.ytPos={t:pos,at:Date.now(),playing:true};fbPut('/rooms/youtube/'+S.ytVid+'/sync',{a:'play',pos:Math.round(pos),by:ytUid(),ts:Date.now()})}
else if(st===2){S.ytPos={t:pos,at:Date.now(),playing:false};fbPut('/rooms/youtube/'+S.ytVid+'/sync',{a:'pause',pos:Math.round(pos),by:ytUid(),ts:Date.now()})}
}catch(_){}})}
const chId='ch'+simpHash(v.ch);
const me=ytUid(),myName=S.apple.name||'Rio';
let h='<div class="row" style="align-items:center;margin-bottom:8px"><span id="ytBack" style="color:#0a84ff;cursor:pointer;font-size:15px">‹ رجوع</span><span style="flex:1"></span><span id="ytWatchN" class="mut" style="font-size:12px"></span></div>';
h+='<div style="position:relative;aspect-ratio:16/9;background:#000;border-radius:12px;overflow:hidden"><iframe id="ytFrame" src="https://www.youtube-nocookie.com/embed/'+v.id+'?enablejsapi=1&rel=0&playsinline=1&autoplay=1&origin='+encodeURIComponent(location.origin)+'" style="width:100%;height:100%;border:0" allow="autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe></div>';
h+='<div class="row" style="gap:10px;justify-content:center;margin:12px 0 2px"><button class="btn gray" id="ytBack10" style="border-radius:50%;width:46px;height:46px;padding:0;font-size:14px;flex:0 0 auto">-5</button><button class="btn gray" id="ytFwd10" style="border-radius:50%;width:46px;height:46px;padding:0;font-size:14px;flex:0 0 auto">+5</button></div>';
h+='<b style="font-size:15.5px;margin-top:10px;display:block;line-height:1.6">'+v.title+'</b>';
h+='<div class="row" style="align-items:center;margin-top:10px;gap:10px"><span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(150deg,#ff0033,#7a0018);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto">'+v.ch.slice(0,1)+'</span><span style="flex:1;min-width:0"><b style="font-size:14px">'+v.ch+'</b><br><span class="mut" style="font-size:12px"><span id="ytSubN">…</span> مشترك</span></span><button class="btn" id="ytSubB" style="border-radius:18px;padding:8px 18px;font-size:13px">اشتراك</button></div>';
h+='<div class="card" style="margin-top:12px;background:#f2f2f2"><b style="font-size:13px">'+(v.views||'')+' مشاهدة • '+(v.time||'')+'</b><p class="mut" style="font-size:12.5px;margin:6px 0 0;line-height:1.8">'+escH(v.title||'')+' — شاهد المقطع كاملاً مع المشاهدة المشتركة والتعليقات المباشرة.</p></div>';
h+='<div class="row" style="gap:8px;margin-top:12px"><button class="btn gray" id="ytLikeB" style="flex:1;border-radius:18px;padding:9px;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:6px">'+si('thumb',15)+' <span id="ytLikeN">…</span></button><button class="btn gray" id="ytShareB" style="flex:1;border-radius:18px;padding:9px;font-size:13px">مشاركة</button></div>';
h+='<div class="card" id="ytParty" style="margin-top:12px;background:#f6f6fa"><div class="row" style="align-items:center"><b style="font-size:13.5px;flex:1">مشاهدة مشتركة — نفس اللحظة</b><span style="width:9px;height:9px;border-radius:50%;background:#34c759;display:inline-block"></span></div><p class="mut" style="font-size:12px;margin:4px 0 0;line-height:1.8">أي واحد يشغّل أو يوقف أو يقدّم — يصير عند الكل بنفس اللحظة. افتح نفس المقطع بجهاز صديقك.</p><div id="ytWatchers" class="mut" style="font-size:12px;margin-top:6px"></div></div>';
h+='<div class="card" style="margin-top:14px;padding:0;overflow:hidden"><div style="text-align:center;padding:9px 0 0"><span style="display:inline-block;width:38px;height:4.5px;border-radius:3px;background:#d9d9de"></span></div><div class="row" style="align-items:center;padding:8px 14px 4px"><b style="font-size:14.5px;flex:1">التعليقات <span class="mut" id="ytCN" style="font-weight:400"></span></b></div><div id="ytCList" style="display:flex;flex-direction:column;gap:12px;padding:8px 14px;max-height:360px;overflow-y:auto"></div><div class="row" style="gap:8px;align-items:center;padding:10px 14px;border-top:1px solid #f0f0f2;background:#fafafc">'+meAv(34)+'<input id="ytCIn" placeholder="أضف تعليقاً…" style="flex:1;padding:10px 14px;border:1px solid #e4e4e7;border-radius:20px;font-size:13.5px;font-family:inherit;background:#fff;min-width:0"><button class="btn" id="ytCSend" style="border-radius:50%;width:38px;height:38px;padding:0;flex:0 0 auto;font-size:16px">↑</button></div></div>';
h+='<b style="font-size:15px;display:block;margin:18px 0 2px">فيديوات مقترحة</b>'+YT_VIDS.filter(x=>x[0]!==v.id).slice(0,6).map(ytMini).join('');
el.innerHTML=h;
const ytLeave=async()=>{const vid=S.ytVid;S.ytVid=null;clearInterval(S.ytCPoll);if(!vid)return;try{const c=await fbGet('/rooms/youtube/'+vid+'/comments');if(c){const me=ytUid();for(const k of Object.keys(c)){if(c[k]&&c[k].uid===me){try{await fetch(FBB+'/rooms/youtube/'+vid+'/comments/'+k+'.json',{method:'DELETE'})}catch(e){}}}}}catch(e){}};
document.querySelector('#ytBack').addEventListener('click',()=>{ytLeave();S.ytView='home';appYouTubeX()});
document.querySelector('#ytBack10').addEventListener('click',()=>ytSeek(-5));document.querySelector('#ytFwd10').addEventListener('click',()=>ytSeek(5));
el.querySelectorAll('[data-ytv]').forEach(c=>c.addEventListener('click',()=>{const vv=YT_VIDS.find(x=>x[0]===c.dataset.ytv);if(!vv)return;S.ytView='watch';S.ytVidV={id:vv[0],title:vv[1],ch:vv[2],subs:vv[3],views:vv[4],cat:vv[5],dur:vv[6],time:vv[7]};appYouTubeX()}));
const fr=document.querySelector('#ytFrame');
fr.addEventListener('load',()=>{setTimeout(()=>ytCmd('addEventListener',['onStateChange']),700)});
const room='/rooms/youtube/'+v.id;
const subKey='/channels/'+chId+'/subs';
const likeKey=room+'/like';
const refreshSubs=async()=>{let d=await fbGet(subKey);if(!d){d={c:ytNum(v.subs),u:{}};await fbPut(subKey,d)}const n=document.querySelector('#ytSubN');if(n)n.textContent=ytFmt(d.c);const b=document.querySelector('#ytSubB');if(b){const sub=d.u&&d.u[me];b.textContent=sub?'مشترك ✓':'اشتراك';b.classList.toggle('gray',!!sub)}};
const refreshLike=async()=>{const d=(await fbGet(likeKey))||{c:0,u:{}};const n=document.querySelector('#ytLikeN');if(n)n.textContent=ytFmt(d.c);const b=document.querySelector('#ytLikeB');if(b)b.style.opacity=(d.u&&d.u[me])?1:.75;return d};
document.querySelector('#ytSubB').addEventListener('click',async()=>{let d=(await fbGet(subKey))||{c:ytNum(v.subs),u:{}};d.u=d.u||{};if(d.u[me]){d.c=Math.max(0,d.c-1);delete d.u[me];toast('ألغيت الاشتراك')}else{d.c++;d.u[me]=1;toast('اشتركت بالقناة ✓')}await fbPut(subKey,d);refreshSubs()});
document.querySelector('#ytLikeB').addEventListener('click',async()=>{const d=await refreshLike();d.u=d.u||{};if(d.u[me]){d.c=Math.max(0,d.c-1);delete d.u[me]}else{d.c++;d.u[me]=1;sfx('like')}await fbPut(likeKey,d);refreshLike()});
document.querySelector('#ytShareB').addEventListener('click',()=>{toast('اننسخ رابط المقطع — الصقه بأي مكان')});
let _cSig='';
const loadC=async()=>{const c=await fbGet(room+'/comments');const l=document.querySelector('#ytCList');if(!l)return;
const a=c?Object.values(c).sort((x,y)=>(y.ts||0)-(x.ts||0)):[];const sig=a.map(x=>(x.ts||0)+':'+String(x.t||'')).join('|');if(sig===_cSig&&l.children.length)return;_cSig=sig;const cn=document.querySelector('#ytCN');if(cn)cn.textContent=a.length?'('+arabNum(a.length)+')':'';const me=ytUid();l.innerHTML=a.length?a.map(x=>'<div class="row" style="gap:9px;align-items:flex-start">'+(x.uid&&x.uid===me&&S.myPic?'<img src="'+S.myPic+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex:0 0 auto">':'<span style="width:32px;height:32px;border-radius:50%;background:linear-gradient(150deg,#8e8e93,#5a5a5e);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex:0 0 auto">'+escH(String(x.by||'?').slice(0,1))+'</span>')+'<span style="flex:1;min-width:0"><b style="font-size:12.5px">'+escH(String(x.by||'زائر'))+'</b> <span class="mut" style="font-size:11px">'+relTime(x.ts||Date.now())+'</span><br><span style="font-size:13.5px;line-height:1.6;word-break:break-word">'+escH(String(x.t))+'</span></span></div>').join(''):'<div class="mut" style="font-size:13px;text-align:center;padding:10px">كن أول من يعلق</div>'};
const sendC=async()=>{const inp=document.querySelector('#ytCIn'),t=inp.value.trim();if(!t)return;inp.value='';_cSig='';let ok=false;for(let i=0;i<3&&!ok;i++){try{const r=await fetch(FBB+room+'/comments.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t:t,by:myName,uid:ytUid(),ts:Date.now()})});ok=r&&r.ok}catch(e){await new Promise(rr=>setTimeout(rr,600))}}if(!ok)toast('ما انرسل التعليق — تحقق من الإنترنت');loadC()};
document.querySelector('#ytCSend').addEventListener('click',sendC);
document.querySelector('#ytCIn').addEventListener('keydown',e=>{if(e.key==='Enter')sendC()});
const poll=async()=>{
if(S.app!=='x_youtube'||!document.querySelector('#ytFrame')){ytLeave();clearInterval(S.poll);return}
loadC();
fbPut(room+'/watchers/'+me,{n:myName,ts:Date.now()});
const w=await fbGet(room+'/watchers');const wl=document.querySelector('#ytWatchers');const wn=document.querySelector('#ytWatchN');
if(w){const now=Date.now();const act=Object.values(w).filter(x=>now-(x.ts||0)<40000);if(wl)wl.textContent=act.length?'يشاهد الآن ('+act.length+'): '+act.slice(0,5).map(x=>x.n).join('، '):'لا أحد يشاهد الآن';if(wn)wn.textContent=act.length?act.length+' يشاهد':''}
const s=await fbGet(room+'/sync');
if(s&&s.ts>(S.ytLastSync||0)&&s.by!==me){
S.ytLastSync=s.ts;S.ytApplying=true;
if(s.a==='play'){ytCmd('seekTo',[s.pos||0,true]);ytCmd('playVideo');S.ytPos={t:s.pos||0,at:Date.now(),playing:true};toast('صديقك شغّل المقطع — تتابع وياه')}
else if(s.a==='pause'){ytCmd('pauseVideo');S.ytPos={t:s.pos||0,at:Date.now(),playing:false}}
else if(s.a==='seek'){ytCmd('seekTo',[s.pos||0,true]);S.ytPos={t:s.pos||0,at:Date.now(),playing:(S.ytPos||{}).playing}}
setTimeout(()=>{S.ytApplying=false},1500);
}
loadC();
};
refreshSubs();refreshLike();loadC();poll();clearInterval(S.poll);S.poll=setInterval(poll,2500);clearInterval(S.ytCPoll);S.ytCPoll=setInterval(()=>{if(S.app==='x_youtube'&&document.querySelector('#ytCList'))loadC()},1500);
}

function gptLogo(sz){sz=sz||30;let p='';for(let k=0;k<6;k++)p+='<path d="M50 14 C56 24 56 34 50 42 C44 34 44 24 50 14 Z" fill="#000" transform="rotate('+(k*60)+' 50 50)"/>';return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 100 100">'+p+'</svg>'}
function appChatGPT(){
const el=document.querySelector('#appBody');
S.gpt=S.gpt||[];
S.gptHist=S.gptHist||store.get('gptHist',[]);
window.closeGptDrawer=()=>{const d=document.querySelector('#gptDrawer');if(d)d.remove()};
const mdLite=s=>{
const lines2=escH(s||'').split('\n');let h='',inCode=false,cb='';
const inl=t=>t.replace(/`([^`]+)`/g,'<code style="background:#ececf1;border-radius:6px;padding:1px 6px;font-size:12.5px">$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
for(const ln of lines2){
if(/^```/.test(ln)){if(inCode){h+='<pre style="background:#1c1c1e;color:#f5f5f7;border-radius:12px;padding:12px;overflow-x:auto;font-size:12.5px;direction:ltr;text-align:left;margin:6px 0">'+cb.replace(/\n$/,'')+'</pre>';cb=''}inCode=!inCode;continue}
if(inCode){cb+=ln+'\n';continue}
let m;
if(m=ln.match(/^#{1,3}\s+(.*)/))h+='<div style="font-weight:700;font-size:'+(ln.indexOf('###')===0?'15px':'16.5px')+';margin:8px 0 3px">'+inl(m[1])+'</div>';
else if(m=ln.match(/^(\d+)[.)]\s+(.*)/))h+='<div style="margin:3px 0"><span style="font-weight:700">'+m[1]+'.</span> '+inl(m[2])+'</div>';
else if(m=ln.match(/^[-*•]\s+(.*)/))h+='<div style="margin:3px 0;padding-inline-start:18px;position:relative"><span style="position:absolute;inset-inline-start:5px">•</span>'+inl(m[1])+'</div>';
else if(!ln.trim())h+='<div style="height:7px"></div>';
else h+='<div style="margin:3px 0">'+inl(ln)+'</div>';
}
if(inCode)h+='<pre style="background:#1c1c1e;color:#f5f5f7;border-radius:12px;padding:12px;overflow-x:auto;font-size:12.5px;direction:ltr;text-align:left;margin:6px 0">'+cb+'</pre>';
return h;
};
const saveHist=()=>{try{store.set('gptHist',S.gptHist||[])}catch(e){}};
const newChat=()=>{if(S.gpt.length){const fu=S.gpt.find(m=>m.role==='user');S.gptHist.unshift({id:'c'+Date.now(),title:(fu?fu.t:'محادثة جديدة').slice(0,28),msgs:S.gpt,ts:Date.now()});S.gptHist=S.gptHist.slice(0,30);saveHist()}S.gpt=[];S.gptBusy=false;if(S._tw){clearInterval(S._tw);S._tw=null}render()};
const openDrawer=()=>{
window.closeGptDrawer();
const d=document.createElement('div');d.id='gptDrawer';
d.innerHTML='<div id="gptDrBg" style="position:absolute;inset:0;background:rgba(0,0,0,.35);z-index:40"></div>'+
'<div style="position:absolute;top:0;bottom:0;right:0;width:272px;max-width:82%;background:#fff;z-index:41;display:flex;flex-direction:column;box-shadow:-4px 0 20px rgba(0,0,0,.15);animation:gptDrIn .28s cubic-bezier(.32,.72,.24,1)">'+
'<div class="row" style="align-items:center;padding:15px 14px;border-bottom:1px solid #eee"><b style="flex:1;font-size:16px">المحادثات</b><span id="gptDrNew" style="color:#0a84ff;font-size:13px;font-weight:600;cursor:pointer">+ جديدة</span></div>'+
'<div style="flex:1;overflow-y:auto;padding:8px">'+(S.gptHist.length?S.gptHist.map(c=>'<div class="row" data-gh="'+c.id+'" style="align-items:center;padding:12px 10px;border-radius:10px;cursor:pointer"><span style="flex:1;min-width:0"><b style="font-size:13.5px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+escH(c.title)+'</b><span class="mut" style="font-size:11.5px">'+c.msgs.length+' رسائل</span></span><span data-ghdel="'+c.id+'" style="color:#ff3b30;padding:8px;font-size:13px">✕</span></div>').join(''):'<p class="mut" style="text-align:center;padding:30px 10px;font-size:13px;line-height:2">لا توجد محادثات محفوظة بعد<br>ابدأ محادثة وستظهر هنا</p>')+'</div></div>';
document.querySelector('#appWin').appendChild(d);
document.querySelector('#gptDrBg').addEventListener('click',window.closeGptDrawer);
document.querySelector('#gptDrNew').addEventListener('click',()=>{window.closeGptDrawer();newChat();toast('محادثة جديدة')});
d.querySelectorAll('[data-gh]').forEach(x=>x.addEventListener('click',e=>{
if(e.target.closest('[data-ghdel]'))return;
const c=S.gptHist.find(cc=>cc.id===x.dataset.gh);if(!c)return;
if(S.gpt.length&&!S.gptHist.some(cc=>cc.msgs===S.gpt)){const fu=S.gpt.find(m=>m.role==='user');S.gptHist.unshift({id:'c'+Date.now(),title:(fu?fu.t:'محادثة').slice(0,28),msgs:S.gpt,ts:Date.now()});saveHist()}
S.gpt=c.msgs;S.gptBusy=false;window.closeGptDrawer();render();
}));
d.querySelectorAll('[data-ghdel]').forEach(x=>x.addEventListener('click',e=>{e.stopPropagation();S.gptHist=S.gptHist.filter(cc=>cc.id!==x.dataset.ghdel);saveHist();openDrawer()}));
};
const render=()=>{
const msgs=S.gpt;
let h='<div style="display:flex;flex-direction:column;min-height:100%">';
h+='<div class="row" style="align-items:center;margin:-12px -12px 0;padding:11px 14px 9px;position:sticky;top:-12px;background:#fff;z-index:5;border-bottom:1px solid #f0f0f2"><span id="gptMenu" style="display:inline-flex;cursor:pointer;padding:4px">'+si('menu',21)+'</span><b style="flex:1;text-align:center;font-size:16.5px">ChatGPT</b><span id="gptNew" style="display:inline-flex;cursor:pointer;padding:4px">'+si('edit',20)+'</span></div>';
h+='<div style="text-align:center;margin:10px 0 4px"><span style="display:inline-block;background:#f4f4f5;border:1px solid #e4e4e7;border-radius:16px;padding:5px 14px;font-size:12.5px;color:#3f3f46">GPT-4o mini — نموذج مجاني</span></div>';
h+='<div id="gptList" style="flex:1;display:flex;flex-direction:column;gap:16px;padding:6px 2px 10px">';
if(!msgs.length){
h+='<div style="text-align:center;padding:30px 6px 8px"><div style="display:flex;justify-content:center;margin-bottom:14px">'+gptLogo(56)+'</div><b style="font-size:20px">كيف أقدر أساعدك اليوم؟</b><p class="mut" style="font-size:13px;margin:8px 0 0">جرّب واحد من الاقتراحات أو اسأل أي شيء</p></div>';
h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px">'+['اكتبلي نكتة تضحك','اشرحلي الذكاء الاصطناعي ببساطة','نصيحة لتعلّم الإنجليزية بسرعة','اكتبلي قصة قصيرة مشوّقة'].map(s2=>'<div data-gptsug="'+s2+'" class="card" style="margin:0;padding:13px 12px;font-size:13px;cursor:pointer;line-height:1.7;border-radius:14px">'+s2+'</div>').join('')+'</div>';
}else{
h+=msgs.map((m,ix)=>{
const isLast=ix===msgs.length-1,anim=isLast?' msgIn':'';
if(m.role==='user')return '<div class="'+anim.trim()+'" style="align-self:flex-end;max-width:85%;background:#f4f4f5;border-radius:20px;padding:10px 15px;font-size:14.5px;line-height:1.75;word-break:break-word">'+escH(m.t)+'</div>';
const body=m.typing?mdLite((m.t||'').split(/(\s+)/).slice(0,m.shown||0).join(''))+'<span class="gptCaret"></span>':mdLite(m.t);
return '<div class="'+anim.trim()+'" style="display:flex;flex-direction:column;gap:4px"><div class="row" style="gap:10px;align-items:flex-start"><span style="flex:0 0 auto;margin-top:1px'+(m.typing?';animation:gptPulse 1.1s ease-in-out infinite':'')+'">'+gptLogo(26)+'</span><div id="'+(m.typing?'gptStream':'')+'" style="flex:1;font-size:14.5px;line-height:1.9;word-break:break-word;min-width:0">'+body+'</div></div>'+(m.typing?'':'<div class="row" style="gap:4px;padding-inline-start:36px"><span data-gptcopy="'+ix+'" style="display:inline-flex;align-items:center;gap:5px;color:#8e8e93;font-size:12px;cursor:pointer;padding:5px 9px;border-radius:8px">'+si('copy',13)+' نسخ</span></div>')+'</div>';
}).join('');
if(S.gptBusy)h+='<div class="row msgIn" style="gap:10px;align-items:center"><span style="animation:gptPulse 1.1s ease-in-out infinite">'+gptLogo(26)+'</span><span style="display:flex;gap:5px;align-items:center"><span class="tdot"></span><span class="tdot"></span><span class="tdot"></span></span></div>';
}
h+='</div>';
h+='<div style="margin:auto -12px -12px;background:#fff;padding:10px 12px 16px;position:sticky;bottom:-12px;z-index:6"><div class="row" style="align-items:center;gap:6px;background:#f7f7f8;border:1px solid #e9e9ec;border-radius:28px;padding:6px 6px 6px 12px"><span style="width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;color:#3f3f46">'+si('plus',18)+'</span><input id="gptIn" placeholder="اسأل أي شيء…" style="flex:1;border:none;background:none;outline:none;font-size:14px;font-family:inherit;min-width:0;padding:8px 0"><button id="gptSend" style="width:36px;height:36px;border-radius:50%;background:#000;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto">'+si('upRight',16,'#fff')+'</button></div></div>';
h+='</div>';
el.innerHTML=h;
requestAnimationFrame(()=>{try{el.scrollTop=el.scrollHeight}catch(e){}});
const inp=document.querySelector('#gptIn');
const send=async txt=>{
const v=(txt||inp.value).trim();if(!v||S.gptBusy)return;
S.gpt.push({role:'user',t:v});S.gptBusy=true;render();
const SYS='أنت مساعد ذكي ودود اسمك ChatGPT. أجب باللغة العربية دائماً وبأسلوب واضح ومنظم: استخدم العناوين والقوائم المرقمة والنقاط والخط العريض لتنظيم الإجابة.';
const histMsgs=S.gpt.slice(0,-1).slice(-8).map(m=>({role:m.role==='ai'?'assistant':'user',content:m.t}));
const isSrvErr=t=>{const s=(t||'').trim();return !s||(/^\s*\{/.test(s)&&/"(error|status)"/.test(s))};
let ans='';
try{
const r=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages:[{role:'system',content:SYS}].concat(histMsgs,[{role:'user',content:v}])}),signal:AbortSignal.timeout(30000)});
if(r.ok){const jj=await r.json();const cc=jj&&jj.choices&&jj.choices[0]&&jj.choices[0].message&&jj.choices[0].message.content;if(cc&&cc.trim()&&!isSrvErr(cc))ans=cc.trim().slice(0,3000)}
}catch(e){}
for(let a=0;a<2&&!ans;a++){
try{
if(a)await new Promise(r=>setTimeout(r,1200));
const r=await fetch('https://text.pollinations.ai/'+encodeURIComponent(v)+'?system='+encodeURIComponent(SYS),{signal:AbortSignal.timeout(30000)});
const t=await r.text();
if(r.ok&&t&&t.trim()&&!isSrvErr(t))ans=t.trim().slice(0,3000);
}catch(e){}
}
S.gptBusy=false;
if(ans){
const m={role:'ai',t:ans,shown:0,typing:true};S.gpt.push(m);render();
const words=ans.split(/(\s+)/);
if(S._tw)clearInterval(S._tw);
S._tw=setInterval(()=>{
const cur=S.gpt[S.gpt.length-1];
if(!cur||cur!==m){clearInterval(S._tw);S._tw=null;return}
m.shown=Math.min(words.length,(m.shown||0)+4);
const t2=document.querySelector('#gptStream');
if(t2){t2.innerHTML=mdLite(words.slice(0,m.shown).join(''))+'<span class="gptCaret"></span>';try{el.scrollTop=el.scrollHeight}catch(e){}}
if(m.shown>=words.length){clearInterval(S._tw);S._tw=null;m.typing=false;render()}
},45);
}else{
S.gpt.push({role:'ai',t:'الخدمة مشغولة حالياً — انتظر شوي وحاول مرة ثانية.'});
render();
}
};
document.querySelector('#gptSend').addEventListener('click',()=>send());
inp.addEventListener('keydown',e=>{if(e.key==='Enter')send()});
el.querySelectorAll('[data-gptsug]').forEach(c=>c.addEventListener('click',()=>send(c.dataset.gptsug)));
el.querySelectorAll('[data-gptcopy]').forEach(c=>c.addEventListener('click',()=>{const m=S.gpt[+c.dataset.gptcopy];if(m&&m.t&&navigator.clipboard)navigator.clipboard.writeText(m.t).then(()=>toast('اننسخ النص')).catch(()=>toast('ما اننسخ'));}));
const gm=document.querySelector('#gptMenu');if(gm)gm.addEventListener('click',openDrawer);
const nn=document.querySelector('#gptNew');if(nn)nn.addEventListener('click',()=>{newChat();toast('محادثة جديدة')});
setTimeout(()=>{const i2=document.querySelector('#gptIn');if(i2&&!S.gpt.length)i2.focus()},400);
};
render();
}
