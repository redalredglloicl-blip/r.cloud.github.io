/* Apps2: Freeform + Journal (Update 9.65) */
(function(){
if(window._a2loaded)return;window._a2loaded=true;
// Apple original icons for 10 apps



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
 const ring=(pct,col)=>'<svg width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="28" fill="none" stroke="#f0f0f2" stroke-width="9"/><circle cx="35" cy="35" r="28" fill="none" stroke="'+col+'" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+(pct*1.76).toFixed(0)+' 176" transform="rotate(-90 35 35)"/></svg>';
 el.innerHTML='<b style="font-size:22px">الصحة</b><div class="card" style="margin-top:12px;text-align:center"><div class="row" style="justify-content:center;gap:16px"><div>'+ring(78,'#fa114f')+'<div class="mut" style="font-size:11px">الحركة</div></div><div>'+ring(55,'#a6ff00')+'<div class="mut" style="font-size:11px">التمرين</div></div><div>'+ring(92,'#04c7dd')+'<div class="mut" style="font-size:11px">الوقوف</div></div></div></div><div class="card"><div class="row" style="gap:12px"><div style="flex:1;text-align:center"><div style="font-size:24px;font-weight:700;color:#ff2d55">8,432</div><div class="mut" style="font-size:11px">خطوة</div></div><div style="flex:1;text-align:center"><div style="font-size:24px;font-weight:700">72</div><div class="mut" style="font-size:11px">نبضة/د</div></div><div style="flex:1;text-align:center"><div style="font-size:24px;font-weight:700;color:#ff9500">5.2</div><div class="mut" style="font-size:11px">كم</div></div></div></div><div class="card"><b>النوم</b><p class="mut" style="font-size:13px">7 س 24 د — جيد</p><div style="height:8px;background:#f0f0f2;border-radius:4px"><div style="width:75%;height:100%;background:#5e5ce6;border-radius:4px"></div></div><div class="row" style="margin-top:8px;font-size:11px"><span class="mut">عميق 1:20</span><span class="mut">خفيف 4:30</span><span class="mut">REM 1:34</span></div></div>';
};
window.appWallet=function(el){
 const tx=[['مطعم الشيف','-45,000 د.ع','اليوم'],['محطة وقود','-30,000 د.ع','أمس'],['راتب','+1,200,000 د.ع','1/10']];
 el.innerHTML='<b style="font-size:22px">المحفظة</b><div style="margin-top:12px;display:flex;flex-direction:column;gap:10px"><div style="background:linear-gradient(135deg,#1c1c1e,#3a3a3c);border-radius:14px;padding:18px;color:#fff"><div class="row"><span style="font-size:13px;opacity:.7">البطاقة الرئيسية</span><span style="font-size:13px" dir="ltr">$2,450</span></div><div style="font-size:18px;letter-spacing:2px;margin:10px 0" dir="ltr">•••• 4582</div><div style="font-size:13px">CARDHOLDER</div></div></div><div class="card" style="margin-top:12px"><b>المعاملات الأخيرة</b><div class="setgroup" style="margin-top:8px">'+tx.map(t=>'<div class="setrow"><span style="flex:1"><b>'+t[0]+'</b><br><span class="mut" style="font-size:11px">'+t[2]+'</span></span><b style="color:'+(t[1][0]==='-'?'#ff3b30':'#34c759')+'">'+t[1]+'</b></div>').join('')+'</div></div><button class="btn" style="width:100%;margin-top:12px" onclick="toast(\'امسح بطاقتك لإضافتها\')">+ إضافة بطاقة</button>';
};
window.appPodcasts=function(el){
 const eps=[['حلقة 42: مستقبل الذكاء','35 د','68%'],['حلقة 41: تقنية 2026','28 د','مكتملة'],['حلقة 40: ريادة الأعمال','45 د','12%'],['حلقة 39: الصحة النفسية','32 د','جديدة']];
 el.innerHTML='<b style="font-size:22px">البودكاست</b><div class="card" style="margin-top:12px;background:linear-gradient(135deg,#7d2eff,#b45aff);color:#fff"><b>يُشغل الآن</b><p style="font-size:14px;margin:6px 0">حلقة 42: مستقبل الذكاء</p><div style="height:4px;background:rgba(255,255,255,.3);border-radius:2px"><div style="width:68%;height:100%;background:#fff;border-radius:2px"></div></div><div class="row" style="margin-top:10px;justify-content:center;gap:20px"><button style="background:none;border:none;color:#fff;font-size:22px">⏮</button><button style="background:#fff;border:none;border-radius:50%;width:48px;height:48px;font-size:20px">⏸</button><button style="background:none;border:none;color:#fff;font-size:22px">⏭</button></div></div><div class="setgroup" style="margin-top:12px">'+eps.map(e=>'<div class="setrow"><span style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#7d2eff,#b45aff);display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px">🎧</span><span style="flex:1"><b>'+e[0]+'</b><br><span class="mut">'+e[1]+' • '+e[2]+'</span></span></div>').join('')+'</div>';
};
window.appBooks=function(el){
 const books=[['العادات الذرية','جيمس كلير','72%'],['التفكير السريع والبطيء','دانيال كانيمان','35%'],['الأب الغني الأب الفقير','روبرت كيوساكي','جديد']];
 el.innerHTML='<b style="font-size:22px">الكتب</b><div class="card" style="margin-top:12px"><b>أكمل القراءة</b><div class="row" style="margin-top:8px;gap:10px"><div style="width:60px;height:90px;border-radius:6px;background:linear-gradient(135deg,#ff9f0a,#ff6b00);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700;text-align:center;padding:4px">العادات الذرية</div><div style="flex:1"><b>العادات الذرية</b><p class="mut" style="font-size:12px">صفحة 184 من 256</p><div style="height:6px;background:#f0f0f2;border-radius:3px"><div style="width:72%;height:100%;background:#ff9f0a;border-radius:3px"></div></div></div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">'+books.map((b,i)=>'<div style="background:#fff;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,.08)"><div style="height:110px;border-radius:8px;background:linear-gradient(135deg,'+['#ff9f0a,#ff6b00','#0a84ff,#5e5ce6','#34c759,#30b0c7'][i]+');display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;text-align:center;padding:8px">'+b[0]+'</div><b style="font-size:12px;display:block;margin-top:8px">'+b[0]+'</b><span class="mut" style="font-size:11px">'+b[2]+'</span></div>').join('')+'</div>';
};
window.appStocks=function(el){
 const spark=(up)=>{const pts=up?'0,20 15,15 30,17 45,8 60,10 75,4':'0,10 15,14 30,12 45,18 60,16 75,20';const c=up?'#34c759':'#ff3b30';return '<svg width="75" height="24" viewBox="0 0 75 24"><polyline points="'+pts+'" fill="none" stroke="'+c+'" stroke-width="2"/></svg>';};
 const st=[['AAPL',232.5,1.2,1],['GOOGL',178.3,-0.5,0],['MSFT',428.1,2.1,1],['TSLA',248.9,-1.8,0],['NVDA',875.2,3.4,1]];
 el.innerHTML='<b style="font-size:22px">الأسهم</b><div class="setgroup" style="margin-top:12px">'+st.map(s=>'<div class="setrow"><b style="width:60px">'+s[0]+'</b>'+spark(s[3])+'<span dir="ltr" style="flex:1;text-align:right">$'+s[1]+'</span><span style="background:'+(s[2]>=0?'#34c759':'#ff3b30')+';color:#fff;border-radius:6px;padding:4px 8px;font-size:11px" dir="ltr">'+(s[2]>=0?'+':'')+s[2]+'%</span></div>').join('')+'</div><div class="card" style="margin-top:10px"><b style="font-size:13px">أخبار السوق</b><p class="mut" style="font-size:12px;margin-top:6px">مؤشر S&P 500 يرتفع 0.8% مع تفاؤل المستثمرين بنتائج الشركات التقنية</p></div><p class="mut" style="font-size:10px;text-align:center">أسعار تجريبية</p>';
};
window.appCompass=function(el){
 let deg=45;
 const dirs=[[0,'الشمال'],[45,'شمال شرق'],[90,'الشرق'],[135,'جنوب شرق'],[180,'الجنوب'],[225,'جنوب غرب'],[270,'الغرب'],[315,'شمال غرب']];
 const dirName=()=>{const d=dirs.reduce((a,b)=>Math.abs(b[0]-deg)<Math.abs(a[0]-deg)?b:a);return d[1];};
 const render=()=>{
  el.innerHTML='<b style="font-size:22px">البوصلة</b><div style="text-align:center;margin-top:16px"><div id="cmpDial" style="width:200px;height:200px;border-radius:50%;background:#1c1c1e;margin:0 auto;position:relative;box-shadow:0 4px 20px rgba(0,0,0,.3);cursor:grab"><div style="position:absolute;top:50%;left:50%;width:4px;height:80px;background:linear-gradient(180deg,#ff3b30 50%,#fff 50%);transform:translate(-50%,-50%) rotate('+deg+'deg);border-radius:2px;transition:transform .3s"></div><div style="position:absolute;top:50%;left:50%;width:12px;height:12px;background:#fff;border-radius:50%;transform:translate(-50%,-50%)"></div><span style="position:absolute;top:8px;left:50%;transform:translateX(-50%);color:#ff3b30;font-weight:700">N</span><span style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);color:#fff;font-weight:700">S</span><span style="position:absolute;top:50%;right:10px;transform:translateY(-50%);color:#fff;font-weight:700">E</span><span style="position:absolute;top:50%;left:10px;transform:translateY(-50%);color:#fff;font-weight:700">W</span></div><div style="font-size:48px;font-weight:700;margin-top:12px"><span id="cmpDeg">'+deg+'</span>°</div><div class="mut" id="cmpDir">'+dirName()+'</div><p class="mut" style="font-size:11px;margin-top:8px">33.3152° N, 44.3661° E — بغداد</p><p class="mut" style="font-size:11px">اسحب على البوصلة للتدوير</p></div>';
  const dial=el.querySelector('#cmpDial');
  let sx=0,sd=0,drag=false;
  dial.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;sd=deg;dial.style.cursor='grabbing';});
  window.addEventListener('pointermove',e=>{if(!drag)return;deg=Math.round((sd+(e.clientX-sx)/2+360)%360);el.querySelector('#cmpDeg').textContent=deg;el.querySelector('#cmpDir').textContent=dirName();dial.firstChild.style.transform='translate(-50%,-50%) rotate('+deg+'deg)';});
  window.addEventListener('pointerup',()=>{drag=false;dial.style.cursor='grab';});
 };
 render();
};
window.appTranslate=function(el){
 let hist=[];try{hist=JSON.parse(localStorage.getItem('rio-tr')||'[]')}catch(e){}
 const save=()=>{try{localStorage.setItem('rio-tr',JSON.stringify(hist.slice(0,10)))}catch(e){}};
 const renderHist=()=>'<div class="card" style="margin-top:10px">'+(hist.length?'<b style="font-size:13px">السجل</b>'+hist.map(x=>'<div class="setrow" style="padding:8px 0;border-bottom:1px solid #f0f0f2"><span style="flex:1;font-size:13px">'+escH(x)+'</span></div>').join(''):'<span class="mut" style="font-size:12px">لا يوجد سجل</span>')+'</div>';
 el.innerHTML='<b style="font-size:22px">الترجمة</b><div class="card" style="margin-top:12px"><div class="row" style="gap:8px;align-items:center"><button class="btn gray" style="flex:1">العربية</button><button id="trSwap" style="background:none;border:none;font-size:20px;cursor:pointer">⇄</button><button class="btn gray" style="flex:1">English</button></div><textarea id="trIn" placeholder="اكتب النص..." rows="3" style="width:100%;margin-top:10px;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px"></textarea><button class="btn" id="trGo" style="width:100%;margin-top:8px">ترجم</button><div id="trOut" class="card" style="margin-top:10px;background:#f6f6f8;min-height:60px"></div></div><div id="trHist">'+renderHist()+'</div>';
 el.querySelector('#trSwap').addEventListener('click',()=>toast('تم تبديل اللغات'));
 el.querySelector('#trGo').addEventListener('click',()=>{const t=el.querySelector('#trIn').value.trim();if(t){el.querySelector('#trOut').innerHTML='<b>Translation:</b><p>'+escH(t)+'</p><p class="mut" style="font-size:12px">(ترجمة تجريبية)</p>';hist.unshift(t);save();el.querySelector('#trHist').innerHTML=renderHist();}else{el.querySelector('#trOut').innerHTML='<span class="mut">اكتب شيئاً أولاً</span>';}});
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
 const devs=[['iPhone','معك الآن',1],['AirPods','المنزل — قبل ساعتين',1],['MacBook','المكتب — أمس',0]];
 el.innerHTML='<b style="font-size:22px">تحديد الموقع</b><div style="margin-top:12px;background:#e8f5e9;border-radius:14px;height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="position:absolute;width:120px;height:120px;border-radius:50%;background:rgba(52,199,89,.2)"></div><div style="position:absolute;width:80px;height:80px;border-radius:50%;background:rgba(52,199,89,.3)"></div><span style="width:44px;height:44px;border-radius:50%;background:#34c759;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;z-index:1">👤</span><span style="position:absolute;top:30px;right:40px;width:30px;height:30px;border-radius:50%;background:#0a84ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;z-index:1">A</span></div><div class="setgroup" style="margin-top:12px">'+devs.map((d,i)=>'<div class="setrow"><span style="flex:1"><b>'+d[0]+'</b><br><span class="mut" style="font-size:11px">'+d[1]+'</span></span>'+(d[2]?'<button class="btn gray" style="font-size:11px;padding:6px 10px" data-find="'+i+'">تشغيل صوت</button>':'<span class="mut" style="font-size:11px">غير متصل</span>')+'</div>').join('')+'</div>';
 el.querySelectorAll('[data-find]').forEach(b=>b.addEventListener('click',()=>toast('جاري تشغيل الصوت على '+devs[+b.dataset.find][0])));
};
window.appHomeapp=function(el){
 const scenes=[['صباح الخير','🌅'],['مساء هادئ','🌙'],['خارج المنزل','🚗']];
 const devs=[['إضاءة الصالة','💡',1],['التكييف','❄️',0],['التلفاز','📺',0],['باب المدخل','🚪',1],['الستائر','🪟',0],['المروحة','🌀',1]];
 el.innerHTML='<b style="font-size:22px">المنزل</b><div style="margin-top:12px"><b style="font-size:14px">المشاهد</b><div class="row" style="gap:8px;margin-top:8px">'+scenes.map(s=>'<button class="btn gray" style="flex:1;font-size:12px" data-scene="'+s[0]+'">'+s[1]+' '+s[0]+'</button>').join('')+'</div></div><div style="margin-top:12px"><b style="font-size:14px">الأجهزة</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">'+devs.map(d=>'<div style="background:'+(d[2]?'#fff8e1':'#fff')+';border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.08);cursor:pointer;border:'+(d[2]?'1px solid #ffd54f':'1px solid transparent')+'" data-home="'+d[0]+'"><div style="font-size:26px">'+d[1]+'</div><b style="font-size:13px">'+d[0]+'</b><br><span class="mut" style="font-size:11px">'+(d[2]?'يعمل':'مطفأ')+'</span></div>').join('')+'</div></div>';
 el.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>toast('تم تفعيل: '+b.dataset.scene)));
 el.querySelectorAll('[data-home]').forEach(c=>c.addEventListener('click',()=>toast(c.dataset.home+': تم التبديل')));
};

// Live Clock icon
function liveClockSVG(){const d=new Date(),a=d.getHours()%12*30+d.getMinutes()*.5,b=d.getMinutes()*6+d.getSeconds()*.1,c=d.getSeconds()*6;
return '<span class="ic" style="background:#fff;border-radius:22%;display:block"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="29" fill="#fff"/><g stroke="#1c1c1e" stroke-linecap="round"><line x1="30" y1="30" x2="30" y2="17" stroke-width="3.5" transform="rotate('+a+' 30 30)"/><line x1="30" y1="30" x2="30" y2="11" stroke-width="2.5" transform="rotate('+b+' 30 30)"/></g><line x1="30" y1="34" x2="30" y2="10" stroke="#ff9f0a" stroke-width="1.5" stroke-linecap="round" transform="rotate('+c+' 30 30)"/></svg></span>';}
setInterval(()=>{const t=liveClockSVG();document.querySelectorAll('[data-app="clock"] .ic').forEach(e=>{const d=document.createElement('div');d.innerHTML=t;e.replaceWith(d.firstChild)});},1000);
