/* Rio iPad 7.2 — rich social apps + Apple Store. Overrides pad.js stubs. */
function chatInputHTML(){return '<div class="row" style="position:sticky;bottom:0;padding-top:8px"><input type="text" id="chatIn" placeholder="اكتب رسالة…" style="flex:1;padding:10px 12px;border:1px solid #d9d9de;border-radius:20px;font-size:14px;font-family:inherit"><button class="btn" id="chatSend">إرسال</button></div>'}
function sAv(seed,sz){sz=sz||44;return '<img src="https://i.pravatar.cc/'+(sz*2)+'?img='+seed+'" style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;flex:0 0 auto" loading="lazy" onerror="this.style.opacity=0.3">'}
function sBack(fn){return '<button class="back" id="sBackBtn" style="margin-bottom:8px">‹ رجوع</button>'}
function bindBack(fn){const b=$('#sBackBtn');if(b)b.addEventListener('click',e=>{e.stopPropagation();fn()})}
function sTicks(){return '<span style="font-size:10.5px;color:#34b7f1">✓✓</span>'}
function mockBubble(me,text,time,theme){
const bg=me?(theme||{}).own||'#dcf8c6':(theme||{}).other||'#fff';
const tx=me?(theme||{}).ownTx||'#111':(theme||{}).otherTx||'#111';
return '<div style="display:flex;justify-content:'+(me?'flex-start':'flex-end')+'"><div style="max-width:80%;background:'+bg+';color:'+tx+';border-radius:14px;padding:7px 10px;margin:2.5px 0;box-shadow:0 1px 1px rgba(0,0,0,.08)"><span style="font-size:13.5px;line-height:1.7">'+text+'</span><div style="text-align:left;font-size:10px;opacity:.65;margin-top:2px">'+time+(me?' '+sTicks():'')+'</div></div></div>'}
function mockDay(d){return '<div style="text-align:center;margin:10px 0"><span style="background:#d4eaf4;color:#54656f;font-size:11.5px;padding:5px 12px;border-radius:8px">'+d+'</span></div>'}
/* ================= WhatsApp — REAL ================= */
const WA_LIST=[
['whatsapp','Rio العام','group',3,'كرار: تمام نلتقي بالليل','١٢:٤٥ م',3],
['whatsapp-dm-ahmad','أحمد','dm',12,'هلا رضا، شلونك؟','١١:٢٠ ص',1],
['whatsapp-dm-sara','سارة','dm',47,'دزيتلك الصور شوفهن','أمس',0],
['whatsapp-grp','عائلة Rio','group',32,'أمي: الغده جاهز','أمس',5],
['whatsapp-dm-omar','عمر','dm',59,'شفت المباراة البارحة؟','الثلاثاء',0]];
function appWhatsApp(){
clearInterval(S.poll);S.waTab=S.waTab||'chats';
const el=$('#appBody');
const tabs=[['chats','الدردشات'],['updates','المستجدات'],['calls','المكالمات']];
let h='<div style="background:#075e54;color:#fff;border-radius:14px 14px 0 0;padding:12px 12px 0"><div class="row" style="align-items:center"><b style="font-size:17px">WhatsApp</b><span style="margin-inline-start:auto;display:flex;gap:14px;font-size:17px"><span>📷</span><span>🔍</span><span>＋</span></span></div>'+
'<div style="display:flex;margin-top:6px">'+tabs.map(t=>'<span data-watab="'+t[0]+'" style="flex:1;text-align:center;font-size:13px;font-weight:600;padding:9px 4px;cursor:pointer;border-bottom:3px solid '+(S.waTab===t[0]?'#fff':'transparent')+';opacity:'+(S.waTab===t[0]?'1':'.75')+'">'+t[1]+'</span>').join('')+'</div></div>';
if(S.waTab==='chats'){
h+='<div style="padding:8px 10px 0"><input type="text" placeholder="بحث" style="width:100%;padding:9px 12px;border:none;border-radius:18px;background:#f0f2f5;font-size:13.5px;font-family:inherit"></div>';
h+='<div style="padding:4px 2px">'+WA_LIST.map(t=>'<div class="row" data-wa="'+t[0]+'" style="align-items:center;padding:10px 8px;cursor:pointer;border-bottom:1px solid #f0f2f5">'+sAv(t[3],48)+'<span style="flex:1;min-width:0"><span class="row" style="align-items:baseline"><b style="font-size:14.5px">'+t[1]+'</b><span class="mut" style="margin-inline-start:auto;font-size:11.5px;flex:0 0 auto">'+t[5]+'</span></span><span class="row" style="align-items:center"><span class="mut" style="font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1">'+t[4]+'</span>'+(t[6]?'<span style="background:#25d366;color:#fff;font-size:11px;font-weight:700;min-width:20px;height:20px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 6px">'+arabNum(t[6])+'</span>':'')+'</span></span></div>').join('')+'</div>';
h+='<p class="mut" style="text-align:center;font-size:11.5px;padding:8px">محادثات حقيقية — أي شخص يفتح Rio iPad يدخل نفس الغرف</p>';
}else if(S.waTab==='updates'){
h+='<div style="padding:12px 10px"><b style="font-size:14px">الحالة</b><div style="display:flex;gap:12px;overflow-x:auto;padding:10px 2px">'+
[['حالتك',12,true]].concat([['أحمد',12],['سارة',47],['عمر',59],['لينا',32]].map(x=>'<span style="text-align:center;flex:0 0 auto"><span style="display:inline-block;border:2.5px solid #25d366;border-radius:50%;padding:2px">'+sAv(x[1],52)+'</span><br><span style="font-size:11px">'+x[0]+'</span></span>')).join('')+'</div>'+
'<b style="font-size:14px">القنوات</b>'+[['أخبار التقنية',22,'١٢ ألف متابِع'],['كرة القدم',56,'٨ آلاف متابِع']].map(c=>'<div class="card row" style="align-items:center;margin-top:8px">'+sAv(c[1],44)+'<span style="flex:1"><b style="font-size:13.5px">'+c[0]+'</b><br><span class="mut">'+c[2]+'</span></span><button class="btn gray" style="padding:6px 14px">متابعة</button></div>').join('')+'</div>';
}else{
const calls=[['أحمد',12,'صادرة','١٠:٣٠ ص','📹'],['سارة',47,'واردة','أمس','📞'],['عمر',59,'فائتة','أمس','📹'],['أمي',32,'واردة','الثلاثاء','📞']];
h+='<div style="padding:6px 2px">'+calls.map(c=>'<div class="row" style="align-items:center;padding:10px 8px;border-bottom:1px solid #f0f2f5">'+sAv(c[1],46)+'<span style="flex:1"><b style="font-size:14px">'+c[0]+'</b><br><span class="mut" style="font-size:12px;color:'+(c[2]==='فائتة'?'#ff3b30':'#8696a0')+'">'+(c[2]==='صادرة'?'↗':'↙')+' '+c[2]+' · '+c[3]+'</span></span><span style="font-size:19px;color:#00a884">'+c[4]+'</span></div>').join('')+'</div>';
}
el.innerHTML=h;
el.querySelectorAll('[data-watab]').forEach(t=>t.addEventListener('click',()=>{S.waTab=t.dataset.watab;appWhatsApp()}));
el.querySelectorAll('[data-wa]').forEach(c=>c.addEventListener('click',()=>{
const t=WA_LIST.find(x=>x[0]===c.dataset.wa);
waThread('/rooms/'+t[0],t[1],t[3]);
}));
}
function waThread(room,title,seed){
const el=$('#appBody');
el.innerHTML=sBack()+'<div style="background:#075e54;color:#fff;border-radius:12px;padding:9px 12px"><div class="row" style="align-items:center;gap:9px">'+sAv(seed,38)+'<span><b style="font-size:14.5px">'+title+'</b><br><span style="font-size:11.5px;opacity:.85">متصل الآن · <b id="prsN">…</b></span></span><span style="margin-inline-start:auto;font-size:17px">📹 📞</span></div></div>'+
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
h+='<div class="row" style="align-items:center;padding:6px 2px"><b style="font-size:21px;font-family:Georgia,serif">Instagram</b><span style="margin-inline-start:auto;display:flex;gap:16px;font-size:19px"><span>♡</span><span>✈</span></span></div>';
h+='<div style="display:flex;gap:12px;overflow-x:auto;padding:6px 2px 12px">'+['<span style="text-align:center;flex:0 0 auto"><span style="position:relative;display:inline-block">'+sAv(5,56)+'<span style="position:absolute;bottom:0;left:0;background:#0a84ff;color:#fff;width:20px;height:20px;border-radius:50%;font-size:14px;line-height:20px;border:2px solid #fff">+</span></span><br><span style="font-size:11px">قصتك</span></span>'].concat(IG_HEADS.map((hh,i)=>'<span style="text-align:center;flex:0 0 auto"><span style="display:inline-block;background:linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7);border-radius:50%;padding:2.5px">'+sAv(12+i*7,54)+'</span><br><span style="font-size:11px">'+hh+'</span></span>')).join('')+'</div>';
h+='<div id="igFeed">'+IG_SEEDS.map((sd,i)=>igPostCard(sd,i)).join('')+'</div>';
}else if(S.igTab==='search'){
h+='<div style="padding:8px 2px"><input type="text" placeholder="بحث" style="width:100%;padding:9px 12px;border:none;border-radius:12px;background:#f0f2f5;font-size:13.5px;font-family:inherit"></div>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">'+Array.from({length:12},(_,i)=>'<img src="https://picsum.photos/seed/igx'+i+'/300/300" style="width:100%;aspect-ratio:1;object-fit:cover;display:block" loading="lazy">').join('')+'</div>';
}else if(S.igTab==='reels'){
h+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">'+Array.from({length:6},(_,i)=>'<div style="position:relative;border-radius:10px;overflow:hidden"><img src="https://picsum.photos/seed/igreel'+i+'/300/440" style="width:100%;display:block" loading="lazy"><span style="position:absolute;bottom:8px;right:8px;color:#fff;font-size:12px">▶ '+arabNum(1200+i*340)+'</span></div>').join('')+'</div>';
}else{
h+='<div class="row" style="align-items:center;padding:8px 2px"><b style="font-size:15px">rio_photos</b><span style="margin-inline-start:auto;font-size:18px">☰</span></div>';
h+='<div class="row" style="align-items:center;gap:14px;padding:6px 2px">'+sAv(12,64)+[['منشور',arabNum(128)],['متابِع',arabNum(4520)],['يتابع',arabNum(312)]].map(s=>'<span style="text-align:center;flex:1"><b style="font-size:15px">'+s[1]+'</b><br><span class="mut" style="font-size:12px">'+s[0]+'</span></span>').join('')+'</div>';
h+='<div style="padding:4px 2px;font-size:13px"><b>رضا</b> · مصور 📸 بغداد</div>';
h+='<div class="row" style="gap:8px;padding:8px 2px"><button class="btn" style="flex:1">تعديل الملف</button><button class="btn gray" style="flex:1">مشاركة الملف</button></div>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:6px">'+IG_SEEDS.concat(['rioinsta5','rioinsta6']).map(sd=>'<img src="https://picsum.photos/seed/'+sd+'/300/300" style="width:100%;aspect-ratio:1;object-fit:cover;display:block" loading="lazy">').join('')+'</div>';
}
const tabs=[['home','⌂'],['search','🔍'],['reels','🎬'],['profile','👤']];
h+='<div style="display:flex;border-top:1px solid #e5e5e5;margin-top:10px;padding-top:6px;position:sticky;bottom:0;background:#fff">'+tabs.map(t=>'<span data-igtab="'+t[0]+'" style="flex:1;text-align:center;font-size:21px;padding:8px;cursor:pointer;opacity:'+(S.igTab===t[0]?'1':'.45')+'">'+t[1]+'</span>').join('')+'</div>';
el.innerHTML=h;
el.querySelectorAll('[data-igtab]').forEach(t=>t.addEventListener('click',()=>{S.igTab=t.dataset.igtab;appInsta()}));
if(S.igTab==='home'){igBindFeed();}
}
function igPostCard(sd,i){
return '<div class="card" style="padding:0;overflow:hidden;margin-bottom:12px"><div class="row" style="padding:9px 11px;align-items:center;gap:9px">'+sAv(12+i*7,32)+'<b style="font-size:13px;flex:1">'+IG_HEADS[i]+'</b><span style="font-size:16px">•••</span></div>'+
'<img data-igimg="'+sd+'" src="https://picsum.photos/seed/'+sd+'/600/430" style="width:100%;display:block">'+
'<div class="row" style="padding:9px 11px;align-items:center;gap:12px;font-size:20px"><span data-like="'+sd+'" style="cursor:pointer">♡</span><span>💬</span><span>✈</span><span style="margin-inline-start:auto">🔖</span></div>'+
'<div style="padding:0 11px 11px;font-size:13px"><b id="lk-'+sd+'">…</b> إعجاب<br><b>'+IG_HEADS[i]+'</b> '+IG_CAP[i]+'<br><span class="mut" data-cmtlink="'+sd+'" style="cursor:pointer">عرض كل التعليقات (<b id="cm-'+sd+'">0</b>)</span></div></div>';
}
function igBindFeed(){
const refresh=async sd=>{const n=await fbGet('/rooms/instagram/likes/'+sd);const t=$('#lk-'+sd);if(t)t.textContent=arabNum(n||0);
const c=await fbGet('/rooms/instagram/comments/'+sd);const ct=$('#cm-'+sd);if(ct)ct.textContent=arabNum(c?Object.keys(c).length:0)};
IG_SEEDS.forEach(refresh);
const like=async sd=>{const n=(await fbGet('/rooms/instagram/likes/'+sd))||0;await fbPut('/rooms/instagram/likes/'+sd,n+1);refresh(sd);const b=document.querySelector('[data-like="'+sd+'"]');if(b){b.textContent='❤';b.style.color='#ed4956'}};
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
/* ================= Telegram — rich mock ================= */
const TG_CHATS=[
['rio',3,'مجموعة Rio','كرار: شباب اللعبة نزلت؟','١٢:٤٥ م',3,'group'],
['ahmad',12,'أحمد','أرسل صورة','١١:٠٢ ص',1,'dm'],
['nora',47,'نورا','تمام، باجر نحجي','أمس',0,'dm'],
['news',22,'قناة الأخبار','عاجل: ...','أمس',12,'channel'],
['movies',56,'أفلام ومسلسلات','الحلقة الجديدة نزلت 🎬','الثلاثاء',7,'channel']];
function appTelegram(){
clearInterval(S.poll);
const el=$('#appBody');
el.innerHTML='<div style="background:#2AABEE;color:#fff;border-radius:14px;padding:12px"><div class="row" style="align-items:center"><span style="font-size:19px">☰</span><b style="font-size:16.5px;margin-inline-start:10px">Telegram</b><span style="margin-inline-start:auto;font-size:18px">🔍</span></div></div>'+
'<div style="display:flex;gap:8px;padding:10px 2px;overflow-x:auto">'+['الكل','الخاص','المجموعات','القنوات'].map((f,i)=>'<span style="flex:0 0 auto;background:'+(i===0?'#2AABEE':'#f0f2f5')+';color:'+(i===0?'#fff':'#2AABEE')+';font-size:12.5px;font-weight:600;padding:7px 14px;border-radius:16px">'+f+'</span>').join('')+'</div>'+
TG_CHATS.map(c=>'<div class="row" data-tg="'+c[0]+'" style="align-items:center;padding:10px 6px;cursor:pointer;border-bottom:1px solid #f5f5f5">'+sAv(c[1],50)+'<span style="flex:1;min-width:0"><span class="row" style="align-items:baseline"><b style="font-size:14.5px">'+c[2]+'</b><span class="mut" style="margin-inline-start:auto;font-size:11.5px">'+c[4]+'</span></span><span class="row" style="align-items:center"><span class="mut" style="font-size:12.5px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+c[3]+'</span>'+(c[5]?'<span style="background:#2AABEE;color:#fff;font-size:11px;font-weight:700;min-width:20px;height:20px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;padding:0 6px">'+arabNum(c[5])+'</span>':'')+'</span></span></div>').join('');
el.querySelectorAll('[data-tg]').forEach(x=>x.addEventListener('click',()=>{
const c=TG_CHATS.find(z=>z[0]===x.dataset.tg);
const conv={
rio:[['كرار',false,'شباب اللعبة نزلت؟','١٢:٣٠ م'],['أنت',true,'اي نزلت، جربها','١٢:٣٥ م'],['لينا',false,'اني لعبتها حلوة 😍','١٢:٤٠ م'],['كرار',false,'تمام نلتقي بالليل','١٢:٤٥ م']],
ahmad:[['أحمد',false,'هلا رضا','١٠:٥٥ ص'],['أنت',true,'هلا بيك','١١:٠٠ ص'],['أحمد',false,'أرسل صورة','١١:٠٢ ص']],
nora:[['نورا',false,'مرحبا، شلونك؟','أمس'],['أنت',true,'تمام الحمدلله','أمس'],['نورا',false,'تمام، باجر نحجي','أمس']],
news:[['القناة',false,'عاجل: أسعار الذهب ترتفع اليوم','أمس'],['القناة',false,'حالة الطقس: مشمس ٣٨°','أمس']],
movies:[['القناة',false,'الحلقة الجديدة نزلت 🎬','الثلاثاء'],['القناة',false,'تقييم الحلقة: ٩/١٠','الثلاثاء']]}[c[0]]||[];
el.innerHTML=sBack()+'<div style="background:#2AABEE;color:#fff;border-radius:12px;padding:9px 12px"><div class="row" style="align-items:center;gap:9px">'+sAv(c[1],38)+'<span><b style="font-size:14.5px">'+c[2]+'</b><br><span style="font-size:11.5px;opacity:.85">'+(c[6]==='channel'?'قناة':'متصل مؤخراً')+'</span></span></div></div><div style="background:#e7edf2;border-radius:12px;padding:8px 6px;margin-top:8px;min-height:280px">'+mockDay('اليوم')+conv.map(m=>mockBubble(m[1],(m[1]?'':'<b style="font-size:11px;color:#2AABEE">'+m[0]+'<br></b>')+m[2],m[3],{own:'#effdde',other:'#fff'})).join('')+'</div><p class="mut" style="text-align:center;font-size:11.5px;margin-top:8px">معاينة تجريبية — المحادثة الحقيقية بالواتساب</p>';
bindBack(appTelegram);
}));
}
/* ================= Messenger — rich mock ================= */
const MS_CHATS=[
['Eno',5,'Eno','أرسل مقطع فيديو','١:٢٠ م',2,true],
['Sara',47,'Sara','ههههه 😂','١٢:١٠ م',0,true],
['Omar',59,'Omar','تمام 👍','أمس',0,false],
['Lina',32,'Lina','شوكت نطلع؟','أمس',1,true]];
function appMessenger(){
clearInterval(S.poll);
const el=$('#appBody');
el.innerHTML='<div class="row" style="align-items:center;padding:4px 2px">'+sAv(8,38)+'<b style="font-size:19px;margin-inline-start:8px">Chats</b><span style="margin-inline-start:auto;display:flex;gap:14px;font-size:18px"><span>📷</span><span>✏️</span></span></div>'+
'<div style="padding:8px 2px"><input type="text" placeholder="بحث" style="width:100%;padding:9px 12px;border:none;border-radius:18px;background:#f0f2f5;font-size:13.5px;font-family:inherit"></div>'+
'<div style="display:flex;gap:12px;overflow-x:auto;padding:4px 2px 10px">'+['<span style="text-align:center;flex:0 0 auto"><span style="position:relative;display:inline-block;background:#f0f2f5;border-radius:50%;width:56px;height:56px;font-size:22px;line-height:56px">+</span><br><span style="font-size:11px">قصتك</span></span>'].concat(MS_CHATS.map(c=>'<span style="text-align:center;flex:0 0 auto"><span style="position:relative;display:inline-block">'+sAv(c[1],56)+'<span style="position:absolute;bottom:2px;left:2px;width:14px;height:14px;background:#31a24c;border:2.5px solid #fff;border-radius:50%"></span></span><br><span style="font-size:11px">'+c[2]+'</span></span>')).join('')+'</div>'+
MS_CHATS.map(c=>'<div class="row" data-ms="'+c[0]+'" style="align-items:center;padding:9px 4px;cursor:pointer"><span style="position:relative">'+sAv(c[1],52)+(c[6]?'<span style="position:absolute;bottom:2px;left:2px;width:14px;height:14px;background:#31a24c;border:2.5px solid #fff;border-radius:50%"></span>':'')+'</span><span style="flex:1;min-width:0;margin-inline-start:10px"><span class="row" style="align-items:baseline"><b style="font-size:14.5px">'+c[2]+'</b><span class="mut" style="margin-inline-start:auto;font-size:11.5px">'+c[4]+'</span></span><span class="row" style="align-items:center"><span class="mut" style="font-size:12.5px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:'+(c[5]?'700':'400')+'">'+c[3]+'</span>'+(c[5]?sAv(c[1],16):'')+'</span></span></div>').join('');
el.querySelectorAll('[data-ms]').forEach(x=>x.addEventListener('click',()=>{
const c=MS_CHATS.find(z=>z[0]===x.dataset.ms);
const conv={'Eno':[[false,'هلا! شلونك؟','١:١٥ م'],[true,'تمام وانت؟','١:١٨ م'],[false,'أرسل مقطع فيديو','١:٢٠ م']],'Sara':[[false,'شفت الصورة؟','١٢:٠٥ م'],[true,'اي حلوة 😍','١٢:٠٨ م'],[false,'ههههه 😂','١٢:١٠ م']]}[c[0]]||[[false,c[3],c[4]]];
el.innerHTML=sBack()+'<div class="row" style="align-items:center;gap:9px;padding:6px 2px;border-bottom:1px solid #eee"><span style="position:relative">'+sAv(c[1],40)+(c[6]?'<span style="position:absolute;bottom:1px;left:1px;width:12px;height:12px;background:#31a24c;border:2px solid #fff;border-radius:50%"></span>':'')+'</span><span><b style="font-size:14.5px">'+c[2]+'</b><br><span class="mut" style="font-size:11.5px">'+(c[6]?'نشط الآن':'نشط قبل ساعة')+'</span></span><span style="margin-inline-start:auto;font-size:18px;color:#0084ff">📞 📹</span></div><div style="padding:8px 4px;min-height:280px">'+mockDay('اليوم')+conv.map(m=>mockBubble(m[0],m[1],m[2],{own:'#0084ff',ownTx:'#fff',other:'#e4e6eb',otherTx:'#111'})).join('')+'</div><p class="mut" style="text-align:center;font-size:11.5px">معاينة تجريبية — المحادثة الحقيقية بالواتساب</p>';
bindBack(appMessenger);
}));
}
/* ================= Facebook — rich mock ================= */
function appFeedNet(k){
clearInterval(S.poll);
const el=$('#appBody'),isX=k==='x';
if(isX){
const tweets=[
['كرار التقني',8,'@karar_tech',true,'٢ س','أبل أعلنت عن أجهزة جديدة اليوم 👀 شنو رأيكم؟',234,891,'12K'],
['أخبار العراق',22,'@iraqnews',true,'٤ س','أسعار الدولار اليوم تستقر عند ١٣٢٠ دينار','89','1.2K','45K'],
['سارة',47,'@sara_a',false,'٦ س','يوم جميل 🌤️',45,230,'3K']];
el.innerHTML='<div class="row" style="align-items:center;padding:6px 2px">'+sAv(8,32)+'<b style="font-size:22px;flex:1;text-align:center">𝕏</b><span style="font-size:18px">✨</span></div>'+
'<div style="display:flex;border-bottom:1px solid #eee">'+['لك','المتابَعون'].map((t,i)=>'<span style="flex:1;text-align:center;font-size:13.5px;font-weight:700;padding:10px;border-bottom:3px solid '+(i===0?'#000':'transparent')+'">'+t+'</span>').join('')+'</div>'+
tweets.map(t=>'<div style="padding:10px 6px;border-bottom:1px solid #f0f0f0"><div class="row" style="gap:9px">'+sAv(t[1],40)+'<span style="flex:1;min-width:0"><b style="font-size:13.5px">'+t[0]+'</b> '+(t[3]?'<span style="color:#1d9bf0">✓</span>':'')+'<span class="mut" style="font-size:12px">'+t[2]+' · '+t[4]+'</span><p style="font-size:14px;line-height:1.7;margin:3px 0">'+t[5]+'</p><div class="row" style="justify-content:space-between;max-width:280px;color:#536471;font-size:12.5px"><span>💬 '+t[6]+'</span><span>🔁 '+t[7]+'</span><span>♡ '+t[8]+'</span><span>📊</span></div></span></div></div>').join('')+
'<button class="btn" style="position:sticky;bottom:16px;float:left;border-radius:50%;width:52px;height:52px;font-size:24px;padding:0">＋</button><p class="mut" style="text-align:center;font-size:11.5px;clear:both">معاينة تجريبية</p>';
return;
}
const posts=[
['لينا',32,'منذ ساعة','رحلة اليوم كانت رائعة! 🏖️','fbpost1','1.2K','234','98'],
['كرار',8,'منذ ٣ ساعات','منو جرب الآيباد الجديد؟','fbpost2','856','112','45'],
['نورا',47,'أمس','وصفة الكيك الجديدة 🍰','fbpost3','2.1K','389','156']];
el.innerHTML='<div style="background:#1877F2;color:#fff;border-radius:14px;padding:10px 12px"><div class="row" style="align-items:center"><b style="font-size:22px">facebook</b><span style="margin-inline-start:auto;display:flex;gap:14px;font-size:17px"><span>＋</span><span>🔍</span></span></div></div>'+
'<div style="display:flex;padding:8px 2px">'+['⌂','📺','🏪','🔔','☰'].map((t,i)=>'<span style="flex:1;text-align:center;font-size:20px;padding:8px;border-bottom:3px solid '+(i===0?'#1877F2':'transparent')+';opacity:'+(i===0?'1':'.5')+'">'+t+'</span>').join('')+'</div>'+
'<div style="display:flex;gap:8px;overflow-x:auto;padding:6px 2px 10px">'+['<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/fbstory0/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover"><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">إنشاء قصة</span></span>'].concat(posts.map((p,i)=>'<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/fbstory'+(i+1)+'/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover"><span style="position:absolute;top:6px;right:6px;border:2.5px solid #1877F2;border-radius:50%">'+sAv(p[1],30)+'</span><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">'+p[0]+'</span></span>')).join('')+'</div>'+
'<div class="card row" style="align-items:center;gap:9px">'+sAv(8,38)+'<span style="flex:1;background:#f0f2f5;border-radius:18px;padding:9px 12px;font-size:13px;color:#65676b">بم تفكر؟</span></div>'+
posts.map(p=>'<div class="card" style="padding:0;overflow:hidden;margin-top:10px"><div class="row" style="padding:10px 12px;align-items:center;gap:9px">'+sAv(p[1],40)+'<span style="flex:1"><b style="font-size:13.5px">'+p[0]+'</b><br><span class="mut" style="font-size:11.5px">'+p[2]+' · 🌍</span></span><span>•••</span></div><p style="padding:0 12px 8px;font-size:14px">'+p[3]+'</p><img src="https://picsum.photos/seed/'+p[4]+'/600/340" style="width:100%;display:block" loading="lazy"><div class="row" style="padding:8px 12px;font-size:12.5px;color:#65676b"><span>👍 '+p[5]+'</span><span style="margin-inline-start:auto">'+p[6]+' تعليق · '+p[7]+' مشاركة</span></div><div class="row" style="border-top:1px solid #eee;margin:0 12px;padding:8px 0">'+['👍 أعجبني','💬 تعليق','↗ مشاركة'].map(a=>'<span style="flex:1;text-align:center;font-size:13px;color:#65676b;font-weight:600">'+a+'</span>').join('')+'</div></div>').join('')+
'<p class="mut" style="text-align:center;font-size:11.5px;margin-top:10px">معاينة تجريبية</p>';
}
/* ================= Snapchat — rich mock ================= */
function appSnapchat(){
clearInterval(S.poll);S.snapTab=S.snapTab||'chat';
const el=$('#appBody');
let h='<div class="row" style="align-items:center;padding:6px 4px"><span style="font-size:22px">👻</span><b style="font-size:16px;margin-inline-start:6px">Snapchat</b><span style="margin-inline-start:auto;font-size:18px">🔍 👤</span></div>';
if(S.snapTab==='chat'){
const fr=[
['أحمد',12,'red','استلمت سناب','٢٠ د'],
['سارة',47,'purple','أرسلت محادثة','١ س'],
['عمر',59,'red-open','فُتحت','٢ س'],
['لينا',32,'purple-open','فُتحت','أمس']];
const ic={red:'<span style="display:inline-block;width:16px;height:16px;background:#ff3b30;border-radius:4px"></span>',purple:'<span style="display:inline-block;width:16px;height:16px;background:#a259ff;border-radius:4px"></span>','red-open':'<span style="display:inline-block;width:16px;height:16px;border:2.5px solid #ff3b30;border-radius:4px"></span>','purple-open':'<span style="display:inline-block;width:16px;height:16px;border:2.5px solid #a259ff;border-radius:4px"></span>'};
h+='<b style="font-size:14px;padding:4px">الأصدقاء</b>'+fr.map(f=>'<div class="row" style="align-items:center;padding:10px 4px;border-bottom:1px solid #f5f5f5">'+sAv(f[1],48)+'<span style="flex:1;margin-inline-start:10px"><b style="font-size:14px">'+f[0]+'</b><br><span class="mut" style="font-size:12px">'+ic[f[2]]+' '+f[3]+' · '+f[4]+'</span></span><span style="font-size:18px">📷 💬</span></div>').join('');
}else if(S.snapTab==='cam'){
h+='<div style="position:relative;border-radius:16px;overflow:hidden;margin-top:6px"><img src="https://picsum.photos/seed/snapcam/600/700" style="width:100%;display:block"><div style="position:absolute;top:10px;left:0;right:0;display:flex;justify-content:center;gap:18px;font-size:20px"><span>⚡</span><span>🔁</span><span>⏱</span></div><div style="position:absolute;bottom:14px;left:0;right:0;display:flex;justify-content:center"><span style="width:64px;height:64px;border-radius:50%;border:4px solid #fff;background:rgba(255,255,255,.25)"></span></div></div>';
}else{
h+='<b style="font-size:14px;padding:4px">القصص</b><div style="display:flex;gap:8px;overflow-x:auto;padding:6px 2px">'+[['أحمد',12],['سارة',47],['عمر',59],['لينا',32]].map(s=>'<span style="flex:0 0 auto;position:relative"><img src="https://picsum.photos/seed/snapstory'+s[1]+'/110/170" style="width:104px;height:160px;border-radius:12px;object-fit:cover" loading="lazy"><span style="position:absolute;bottom:6px;right:6px;color:#fff;font-size:11.5px">'+s[0]+'</span></span>').join('')+'</div>';
}
const tabs=[['map','📍'],['chat','💬'],['cam','📷'],['stories','▶'],['spot','🔦']];
h+='<div style="display:flex;border-top:1px solid #eee;margin-top:10px;padding-top:6px;position:sticky;bottom:0;background:#fff">'+tabs.map(t=>'<span data-snaptab="'+t[0]+'" style="flex:1;text-align:center;font-size:21px;padding:8px;cursor:pointer;opacity:'+(S.snapTab===t[0]?'1':'.4')+'">'+t[1]+'</span>').join('')+'</div><p class="mut" style="text-align:center;font-size:11.5px">معاينة تجريبية</p>';
el.innerHTML=h;
el.querySelectorAll('[data-snaptab]').forEach(t=>t.addEventListener('click',()=>{S.snapTab=t.dataset.snaptab;appSnapchat()}));
}
/* ================= Discord — rich mock ================= */
function appDiscord(){
clearInterval(S.poll);
const el=$('#appBody');
const msgs=[
['كرار',8,'مبرمج','اليوم ١٢:٣٠','شباب، منو جرب التحديث الجديد؟'],
['لينا',32,'مشرفة','اليوم ١٢:٣٥','اني جربته، حلو 😍'],
['رضا',5,'عضو','اليوم ١٢:٤٠','+١'],
['النظام',22,'BOT','اليوم ١٢:٤١','🎉 انضم عمر إلى السيرفر']];
el.innerHTML='<div style="display:flex;gap:0;background:#1e1f22;border-radius:14px;overflow:hidden;color:#dbdee1;min-height:300px">'+
'<div style="width:58px;background:#121214;display:flex;flex-direction:column;align-items:center;padding:10px 0;gap:10px"><span style="width:44px;height:44px;border-radius:16px;background:#5865F2;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:13px">Rio</span><span style="width:44px;height:44px;border-radius:50%;background:#2b2d31;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff">G</span><span style="width:44px;height:44px;border-radius:50%;background:#2b2d31;display:flex;align-items:center;justify-content:center;color:#949ba4;font-size:20px">+</span></div>'+
'<div style="flex:1;display:flex;flex-direction:column;min-width:0"><div style="padding:10px 12px;border-bottom:1px solid #2b2d31"><b style="color:#fff;font-size:14px">Rio Server</b><span class="mut" style="font-size:11px;display:block">👥 ١٢٨ عضو · 🟢 ٣٤ متصل</span></div>'+
'<div style="padding:8px 10px;font-size:13px"><div style="color:#949ba4;font-size:11px;font-weight:700;margin:4px 0">قنوات نصية</div>'+['# عام','# إعلانات','# صور-اللاعبين','# اقتراحات'].map((c,i)=>'<div style="padding:6px 8px;border-radius:6px;background:'+(i===0?'#35373c':'transparent')+';color:'+(i===0?'#fff':'#949ba4')+'">'+c+'</div>').join('')+'<div style="color:#949ba4;font-size:11px;font-weight:700;margin:8px 0 4px">قنوات صوتية</div><div style="padding:6px 8px;color:#949ba4">🔊 الصالة — ٣</div></div></div></div>'+
'<div style="margin-top:8px">'+msgs.map(m=>'<div class="row" style="gap:10px;padding:8px 4px;align-items:flex-start">'+sAv(m[1],38)+'<span style="flex:1"><span><b style="font-size:13.5px">'+m[0]+'</b> <span style="font-size:10px;background:#5865F2;color:#fff;border-radius:4px;padding:1px 5px">'+m[2]+'</span> <span class="mut" style="font-size:10.5px">'+m[3]+'</span></span><p style="font-size:13.5px;margin-top:2px;line-height:1.7">'+m[4]+'</p></span></div>').join('')+
'<div class="mut" style="font-size:12px;padding:4px">✎ عمر يكتب…</div></div><p class="mut" style="text-align:center;font-size:11.5px;margin-top:8px">معاينة تجريبية</p>';
}
/* ================= Apple Store ================= */
const AP_PRODUCTS=[
{id:'ip17pro',n:'iPhone 17 Pro',tag:'الأقوى. الأخف. الأكثر احترافاً.',price:999,colors:['Deep Blue','Silver','Cosmic Orange'],stor:['256GB','512GB','1TB'],g:'linear-gradient(135deg,#1c2b4a,#3a5a8c)'},
{id:'ipair',n:'iPhone Air',tag:'أنحف iPhone على الإطلاق.',price:899,colors:['White','Black','Gold'],stor:['128GB','256GB','512GB'],g:'linear-gradient(135deg,#e8e8ec,#b9c2d0)'},
{id:'ipadpro',n:'iPad Pro 11',tag:'قوة M4 في أنحف تصميم.',price:999,colors:['Silver','Space Black'],stor:['256GB','512GB','1TB'],g:'linear-gradient(135deg,#2b2f36,#5a6270)'},
{id:'mba',n:'MacBook Air 13',tag:'خفيف. قوي. بشريحة M4.',price:999,colors:['Midnight','Starlight','Silver'],stor:['256GB','512GB'],g:'linear-gradient(135deg,#3a3f4b,#7c8598)'},
{id:'watch11',n:'Watch Series 11',tag:'رفيقك الصحي الأذكى.',price:399,colors:['Midnight','Starlight'],stor:['GPS','GPS + Cellular'],g:'linear-gradient(135deg,#123a2a,#2e7d5b)'},
{id:'app3',n:'AirPods Pro 3',tag:'صوت بلا ضجيج.',price:249,colors:['White'],stor:['USB-C'],g:'linear-gradient(135deg,#f2f2f5,#c9ccd4)'}];
function appAppleStore(){
S.apTab=S.apTab||'shop';S.bag=S.bag||[];
const el=$('#appBody');
const bagN=S.bag.length;
let h='<div class="row" style="align-items:center;padding:6px 2px"><img src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" style="width:22px;height:22px" onerror="this.remove()"><b style="font-size:17px;margin-inline-start:6px">Store</b><span style="margin-inline-start:auto;display:flex;gap:14px;font-size:18px;align-items:center"><span data-aptab="search">🔍</span><span data-aptab="bag" style="position:relative">🛍'+(bagN?'<span style="position:absolute;top:-6px;left:-8px;background:#0a84ff;color:#fff;font-size:10px;font-weight:700;min-width:17px;height:17px;border-radius:9px;display:flex;align-items:center;justify-content:center">'+arabNum(bagN)+'</span>':'')+'</span></span></div>';
if(S.apTab==='shop'){
h+='<div style="border-radius:18px;overflow:hidden;margin:8px 0;position:relative"><img src="https://picsum.photos/seed/applestore-hero/700/300" style="width:100%;height:150px;object-fit:cover;display:block"><div style="position:absolute;bottom:0;right:0;left:0;padding:12px;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff"><b style="font-size:17px">iPhone 17 Pro</b><br><span style="font-size:12.5px">تايتانيوم. قوي بشكل يفوق الخيال.</span></div></div>';
h+='<b style="font-size:15px">تسوق حسب المنتج</b><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:8px">'+AP_PRODUCTS.map(p=>'<div data-ap="'+p.id+'" style="cursor:pointer;border-radius:16px;overflow:hidden;background:#f5f5f7"><div style="height:110px;background:'+p.g+';display:flex;align-items:center;justify-content:center"><span style="color:#fff;font-size:30px;font-weight:800;opacity:.9">'+p.n.split(' ')[0]+'</span></div><div style="padding:10px"><b style="font-size:13.5px">'+p.n+'</b><br><span class="mut" style="font-size:12px">'+p.tag+'</span><br><b style="font-size:13px;color:#0a84ff">من $'+p.price+'</b></div></div>').join('')+'</div>';
}else if(S.apTab==='bag'){
if(!S.bag.length){h+='<div style="text-align:center;padding:40px 10px"><div style="font-size:44px">🛍</div><b>حقيبتك فارغة</b><p class="mut" style="margin-top:6px">تصفح المنتجات وأضف ما يعجبك</p><button class="btn" data-aptab="shop" style="margin-top:12px">تسوق الآن</button></div>'}
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
