/* Apps2: Freeform + Journal (Update 9.65) */
(function(){
if(window._a2loaded)return;window._a2loaded=true;
// Apple original icons for 10 apps
Object.assign(ICONS,{
health:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a5/fb/89/a5fb89bb-85f2-a51c-ee80-e55c7a2bc30f/healthCalistoga-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg',
wallet:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/18/81/b7/1881b7e2-7323-4b41-9c34-43911b53c9d6/walletCalistoga-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
podcasts:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e9/44/84/e94484bf-b003-2f78-1abd-7274f6dd3a19/podcastsCalistoga-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg',
books:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d3/c1/14/d3c1140b-f2a5-9e50-cacb-aa9b77516f55/booksCalistoga-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg',
stocks:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5a/a7/39/5aa73929-5347-a496-b5b1-c13385339387/stocksCalistoga-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg',
compass:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/19/aa/a2/19aaa22d-d7f1-b122-d595-cb7f99879323/compassCalistoga-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
translate:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/a8/6e/7aa86e63-2625-3bbc-81c9-d3afead27c9b/translateCalistoga-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
reminders:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/57/a4/28/57a4284a-c1a3-499d-c510-e977a94ab15b/remindersCalistoga-0-0-1x_U007epad-0-1-0-0-85-220.png/512x512bb.jpg',
findmy:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/0c/46/4c0c4686-9c91-67d0-b85b-887c8b10b474/findmyCalistoga-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
homeapp:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/13/1e/d3/131ed315-8e64-ae38-abd7-8e0008db75b6/homeCalistoga-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg'
});


// Freeform: simple whiteboard
window.appFreeform=function(el){
 let h='<div class="row" style="align-items:center;margin-bottom:10px"><b style="font-size:22px;flex:1">Freeform</b><button id="ffClear" class="btn gray" style="font-size:13px">مسح</button></div>';
 h+='<canvas id="ffCanvas" style="width:100%;height:60vh;background:#fff;border-radius:12px;touch-action:none;box-shadow:0 2px 8px rgba(0,0,0,.1)"></canvas>';
 h+='<div class="row" style="margin-top:12px;gap:8px;justify-content:center">'+
  ['#000','#ff3b30','#0a84ff','#34c759','#ff9f0a'].map((c,i)=>'<button data-ffc="'+c+'" style="width:36px;height:36px;border-radius:50%;background:'+c+';border:'+(i===0?'3px solid #0a84ff':'none')+';cursor:pointer"></button>').join('')+'</div>';
 el.innerHTML=h;
 const cv=el.querySelector('#ffCanvas'),ctx=cv.getContext('2d');
 const setupCanvas=()=>{
  const r=cv.getBoundingClientRect();
  const dpr=window.devicePixelRatio||1;
  cv.width=r.width*dpr;cv.height=r.height*dpr;
  ctx.scale(dpr,dpr);
  ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=color;
 };
 let drawing=false,color='#000',last=null;
 setupCanvas();
 setTimeout(setupCanvas,100);
 const pos=e=>{
  const rr=cv.getBoundingClientRect();
  let cx,cy;
  if(e.touches&&e.touches.length){cx=e.touches[0].clientX;cy=e.touches[0].clientY;}
  else if(e.changedTouches&&e.changedTouches.length){cx=e.changedTouches[0].clientX;cy=e.changedTouches[0].clientY;}
  else{cx=e.clientX;cy=e.clientY;}
  return{x:cx-rr.left,y:cy-rr.top};
 };
 const start=e=>{e.preventDefault();drawing=true;last=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);};
 const move=e=>{e.preventDefault();if(!drawing||!last)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;};
 const end=e=>{if(e)e.preventDefault();drawing=false;last=null;};
 cv.style.touchAction='none';cv.style.webkitUserSelect='none';cv.style.userSelect='none';
 cv.addEventListener('touchstart',start,{passive:false});
 cv.addEventListener('touchmove',move,{passive:false});
 cv.addEventListener('touchend',end,{passive:false});
 cv.addEventListener('touchcancel',end,{passive:false});
 cv.addEventListener('mousedown',start);
 cv.addEventListener('mousemove',move);
 cv.addEventListener('mouseup',end);
 cv.addEventListener('mouseleave',end);
 el.querySelectorAll('[data-ffc]').forEach(b=>b.addEventListener('click',()=>{
  color=b.dataset.ffc;ctx.strokeStyle=color;
  el.querySelectorAll('[data-ffc]').forEach(x=>x.style.border='none');
  b.style.border='3px solid #0a84ff';
 }));
 el.querySelector('#ffClear').addEventListener('click',()=>{ctx.clearRect(0,0,cv.width,cv.height);});
};

// Journal: diary entries
window.appJournal=function(el){
 let entries=[];try{entries=JSON.parse(localStorage.getItem('rio-journal')||'[]')}catch(e){}
 const save=()=>{try{localStorage.setItem('rio-journal',JSON.stringify(entries))}catch(e){}};
 let h='<div class="row" style="align-items:center;margin-bottom:10px"><b style="font-size:22px;flex:1">Journal</b><button id="jAdd" class="btn" style="font-size:14px">+ جديد</button></div>';
 h+='<div id="jList">';
 if(!entries.length){
  h+='<div style="text-align:center;padding:50px 20px"><p class="mut">لا توجد مدخلات بعد<br>ابدأ بكتابة يومياتك</p></div>';
 }else{
  h+='<div class="setgroup">'+entries.map((e,i)=>'<div class="setrow" style="align-items:flex-start"><span style="flex:1"><b>'+escH(e.t||'بدون عنوان')+'</b><br><span class="mut" style="font-size:12px">'+escH(e.d)+'</span><br><span style="font-size:13px">'+escH(e.b.slice(0,80))+(e.b.length>80?'...':'')+'</span></span><button data-jdel="'+i+'" style="background:none;border:none;color:#ff3b30;cursor:pointer;font-size:16px">×</button></div>').join('')+'</div>';
 }
 h+='</div>';
 h+='<div id="jModal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:999;align-items:center;justify-content:center"><div style="background:#fff;border-radius:14px;padding:20px;width:85%;max-width:340px;max-height:80vh;overflow-y:auto"><b style="font-size:17px">مدخلة جديدة</b><div style="margin-top:12px"><input id="jTitle" placeholder="العنوان" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;font-size:15px;box-sizing:border-box"><textarea id="jBody" placeholder="اكتب يومياتك..." rows="5" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px;box-sizing:border-box;resize:vertical"></textarea></div><div class="row" style="margin-top:12px;gap:8px"><button id="jCancel" class="btn gray" style="flex:1">إلغاء</button><button id="jSave" class="btn" style="flex:1">حفظ</button></div></div></div>';
 el.innerHTML=h;
 const modal=el.querySelector('#jModal');
 el.querySelector('#jAdd').addEventListener('click',()=>{modal.style.display='flex';});
 el.querySelector('#jCancel').addEventListener('click',()=>{modal.style.display='none';});
 el.querySelector('#jSave').addEventListener('click',()=>{
  const t=el.querySelector('#jTitle').value.trim(),b=el.querySelector('#jBody').value.trim();
  if(!b){toast('اكتب شيئاً أولاً');return;}
  const d=new Date();
  entries.unshift({t:t,b:b,d:d.toLocaleDateString('ar')+' '+d.toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'})});
  save();modal.style.display='none';window.appJournal(el);toast('تم الحفظ');
 });
 el.querySelectorAll('[data-jdel]').forEach(btn=>btn.addEventListener('click',()=>{
  entries.splice(+btn.dataset.jdel,1);save();window.appJournal(el);
 }));
};
})();

// === 10 Apple apps (Update 9.74) ===
window.appHealth=function(el){
 el.innerHTML='<b style="font-size:22px">الصحة</b><div class="card" style="margin-top:12px"><div class="row" style="gap:12px"><div style="flex:1;text-align:center"><div style="font-size:28px;font-weight:700;color:#ff2d55">8,432</div><div class="mut" style="font-size:12px">خطوة</div></div><div style="flex:1;text-align:center"><div style="font-size:28px;font-weight:700;color:#ff9500">5.2</div><div class="mut" style="font-size:12px">كم</div></div><div style="flex:1;text-align:center"><div style="font-size:28px;font-weight:700;color:#34c759">320</div><div class="mut" style="font-size:12px">سعرة</div></div></div></div><div class="card"><b>النوم</b><p class="mut" style="font-size:13px">7 س 24 د — جيد</p><div style="height:8px;background:#f0f0f2;border-radius:4px"><div style="width:75%;height:100%;background:#5e5ce6;border-radius:4px"></div></div></div>';
};
window.appWallet=function(el){
 el.innerHTML='<b style="font-size:22px">المحفظة</b><div style="margin-top:12px;display:flex;flex-direction:column;gap:10px"><div style="background:linear-gradient(135deg,#1c1c1e,#3a3a3c);border-radius:14px;padding:18px;color:#fff"><div style="font-size:13px;opacity:.7">البطاقة الرئيسية</div><div style="font-size:18px;letter-spacing:2px;margin:10px 0" dir="ltr">•••• 4582</div><div style="font-size:13px">رضا</div></div><div style="background:linear-gradient(135deg,#0a84ff,#5e5ce6);border-radius:14px;padding:18px;color:#fff"><div style="font-size:13px;opacity:.7">بطاقة السفر</div><div style="font-size:18px;letter-spacing:2px;margin:10px 0" dir="ltr">•••• 9012</div></div></div><button class="btn" style="width:100%;margin-top:14px" onclick="toast(\'امسح بطاقتك لإضافتها\')">+ إضافة بطاقة</button>';
};
window.appPodcasts=function(el){
 const eps=[['حلقة 42: مستقبل الذكاء','35 د'],['حلقة 41: تقنية 2026','28 د'],['حلقة 40: ريادة الأعمال','45 د']];
 el.innerHTML='<b style="font-size:22px">البودكاست</b><div class="setgroup" style="margin-top:12px">'+eps.map(e=>'<div class="setrow"><span style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#7d2eff,#b45aff);display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px">🎧</span><span style="flex:1"><b>'+e[0]+'</b><br><span class="mut">'+e[1]+'</span></span><button class="btn gray" style="border-radius:50%;width:36px;height:36px;padding:0">▶</button></div>').join('')+'</div>';
};
window.appBooks=function(el){
 const books=[['العادات الذرية','جيمس كلير'],['التفكير السريع والبطيء','دانيال كانيمان'],['الأب الغني الأب الفقير','روبرت كيوساكي']];
 el.innerHTML='<b style="font-size:22px">الكتب</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">'+books.map((b,i)=>'<div style="background:#fff;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,.08)"><div style="height:120px;border-radius:8px;background:linear-gradient(135deg,'+['#ff9f0a,#ff6b00','#0a84ff,#5e5ce6','#34c759,#30b0c7'][i]+');display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;text-align:center;padding:8px">'+b[0]+'</div><b style="font-size:13px;display:block;margin-top:8px">'+b[0]+'</b><span class="mut" style="font-size:11px">'+b[1]+'</span></div>').join('')+'</div>';
};
window.appStocks=function(el){
 const st=[['AAPL',232.5,1.2],['GOOGL',178.3,-0.5],['MSFT',428.1,2.1],['TSLA',248.9,-1.8]];
 el.innerHTML='<b style="font-size:22px">الأسهم</b><div class="setgroup" style="margin-top:12px">'+st.map(s=>'<div class="setrow"><b style="flex:1">'+s[0]+'</b><span dir="ltr">$'+s[1]+'</span><span style="background:'+(s[2]>=0?'#34c759':'#ff3b30')+';color:#fff;border-radius:6px;padding:4px 8px;font-size:12px" dir="ltr">'+(s[2]>=0?'+':'')+s[2]+'%</span></div>').join('')+'</div><p class="mut" style="font-size:11px;text-align:center">أسعار تجريبية</p>';
};
window.appCompass=function(el){
 el.innerHTML='<b style="font-size:22px">البوصلة</b><div style="text-align:center;margin-top:20px"><div style="width:200px;height:200px;border-radius:50%;background:#1c1c1e;margin:0 auto;position:relative;box-shadow:0 4px 20px rgba(0,0,0,.3)"><div style="position:absolute;top:50%;left:50%;width:4px;height:80px;background:linear-gradient(180deg,#ff3b30 50%,#fff 50%);transform:translate(-50%,-50%) rotate(45deg);border-radius:2px"></div><div style="position:absolute;top:50%;left:50%;width:12px;height:12px;background:#fff;border-radius:50%;transform:translate(-50%,-50%)"></div><span style="position:absolute;top:8px;left:50%;transform:translateX(-50%);color:#ff3b30;font-weight:700">N</span></div><div style="font-size:48px;font-weight:700;margin-top:16px">45°</div><div class="mut">شمال شرق</div></div>';
};
window.appTranslate=function(el){
 el.innerHTML='<b style="font-size:22px">الترجمة</b><div class="card" style="margin-top:12px"><div class="row" style="gap:8px"><button class="btn gray" style="flex:1">العربية</button><button class="btn gray" style="flex:1">English</button></div><textarea id="trIn" placeholder="اكتب النص..." rows="3" style="width:100%;margin-top:10px;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px"></textarea><button class="btn" id="trGo" style="width:100%;margin-top:8px">ترجم</button><div id="trOut" class="card" style="margin-top:10px;background:#f6f6f8;min-height:60px"></div></div>';
 el.querySelector('#trGo').addEventListener('click',()=>{const t=el.querySelector('#trIn').value.trim();el.querySelector('#trOut').innerHTML=t?'<b>Translation:</b><p>'+escH(t)+' (translated)</p>':'<span class="mut">اكتب شيئاً أولاً</span>';});
};
window.appReminders=function(el){
 let items=[];try{items=JSON.parse(localStorage.getItem('rio-rem')||'[]')}catch(e){}
 const save=()=>{try{localStorage.setItem('rio-rem',JSON.stringify(items))}catch(e){}};
 const render=()=>{
  el.innerHTML='<div class="row" style="align-items:center;margin-bottom:10px"><b style="font-size:22px;flex:1">التذكيرات</b><button id="rmAdd" class="btn" style="border-radius:50%;width:36px;height:36px;padding:0">+</button></div><div class="setgroup">'+(items.length?items.map((t,i)=>'<div class="setrow"><button data-rm="'+i+'" style="width:24px;height:24px;border-radius:50%;border:2px solid #0a84ff;background:none;cursor:pointer"></button><span style="flex:1">'+escH(t)+'</span></div>').join(''):'<div class="setrow"><span class="mut">لا توجد تذكيرات</span></div>')+'</div>';
  el.querySelector('#rmAdd').addEventListener('click',()=>{const t=prompt('تذكير جديد:');if(t){items.push(t);save();render();}});
  el.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',()=>{items.splice(+b.dataset.rm,1);save();render();toast('تم ✓');}));
 };
 render();
};
window.appFindmy=function(el){
 el.innerHTML='<b style="font-size:22px">تحديد الموقع</b><div style="margin-top:12px;background:#e8f5e9;border-radius:14px;height:200px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="position:absolute;width:120px;height:120px;border-radius:50%;background:rgba(52,199,89,.2)"></div><div style="position:absolute;width:80px;height:80px;border-radius:50%;background:rgba(52,199,89,.3)"></div><span style="width:44px;height:44px;border-radius:50%;background:#34c759;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;z-index:1">R</span></div><div class="setgroup" style="margin-top:12px"><div class="setrow"><span style="flex:1"><b>iPhone رضا</b><br><span class="mut">معك الآن</span></span><span style="color:#34c759">●</span></div></div>';
};
window.appHomeapp=function(el){
 el.innerHTML='<b style="font-size:22px">المنزل</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">'+[['الإضاءة','💡',1],['التكييف','❄️',0],['التلفاز','📺',0],['الباب','🚪',1]].map(d=>'<div style="background:#fff;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08);cursor:pointer" data-home="'+d[0]+'"><div style="font-size:28px">'+d[1]+'</div><b style="font-size:14px">'+d[0]+'</b><br><span class="mut" style="font-size:12px">'+(d[2]?'يعمل':'مطفأ')+'</span></div>').join('')+'</div>';
 el.querySelectorAll('[data-home]').forEach(c=>c.addEventListener('click',()=>toast(c.dataset.home+': تم التبديل')));
};
