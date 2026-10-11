/* Apps2: Freeform + Journal (Update 9.65) */
(function(){
if(window._a2loaded)return;window._a2loaded=true;

// Freeform: simple whiteboard
window.appFreeform=function(el){
 let h='<div class="row" style="align-items:center;margin-bottom:10px"><b style="font-size:22px;flex:1">Freeform</b><button id="ffClear" class="btn gray" style="font-size:13px">مسح</button></div>';
 h+='<canvas id="ffCanvas" style="width:100%;height:60vh;background:#fff;border-radius:12px;touch-action:none;box-shadow:0 2px 8px rgba(0,0,0,.1)"></canvas>';
 h+='<div class="row" style="margin-top:12px;gap:8px;justify-content:center">'+
  ['#000','#ff3b30','#0a84ff','#34c759','#ff9f0a'].map((c,i)=>'<button data-ffc="'+c+'" style="width:36px;height:36px;border-radius:50%;background:'+c+';border:'+(i===0?'3px solid #0a84ff':'none')+';cursor:pointer"></button>').join('')+'</div>';
 el.innerHTML=h;
 const cv=el.querySelector('#ffCanvas'),ctx=cv.getContext('2d');
 const r=cv.getBoundingClientRect();cv.width=r.width;cv.height=r.height;
 let drawing=false,color='#000',last=null;
 ctx.lineWidth=3;ctx.lineCap='round';ctx.strokeStyle=color;
 const pos=e=>{const rr=cv.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:t.clientX-rr.left,y:t.clientY-rr.top};};
 cv.addEventListener('touchstart',e=>{e.preventDefault();drawing=true;last=pos(e);},{passive:false});
 cv.addEventListener('touchmove',e=>{e.preventDefault();if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;},{passive:false});
 cv.addEventListener('touchend',()=>{drawing=false;});
 cv.addEventListener('mousedown',e=>{drawing=true;last=pos(e);});
 cv.addEventListener('mousemove',e=>{if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;});
 cv.addEventListener('mouseup',()=>{drawing=false;});
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
