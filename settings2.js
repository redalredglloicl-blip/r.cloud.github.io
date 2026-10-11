/* Settings2: iPhone-real app settings (Update 9.49) */
(function(){
if(window._s2loaded)return;window._s2loaded=true;
const _origAppSettings=window.appSettings;
const _origSetSubPage=window.setSubPage;
// New app-specific settings pages (iOS 17 order)
const S2_PAGES={
safari:{t:'Safari',c:'#0a84ff',g:'safari',rows:[
 ['منع التتبع','', 'sw','s2_safari_track',true],
 ['حظر النوافذ المنبثقة','', 'sw','s2_safari_popup',true],
 ['التصفح الخاص','', 'sw','s2_safari_private',false],
 ['قارئ Safari','', 'sw','s2_safari_reader',true]]},
maps:{t:'الخرائط',c:'#34c759',g:'mappin',rows:[
 ['الموقع الدقيق','', 'sw','s2_maps_precise',true],
 ['حركة المرور','', 'sw','s2_maps_traffic',true],
 ['التوجيه الصوتي','', 'sw','s2_maps_voice',true]]},
weather:{t:'الطقس',c:'#0a84ff',g:'weathersun',rows:[
 ['وحدة الحرارة','', 'seg','s2_wx_unit',['مئوية','فهرنهايت'],0],
 ['تنبيهات الطقس','', 'sw','s2_wx_alert',true]]},
translate:{t:'الترجمة',c:'#0a84ff',g:'translate',rows:[
 ['على الجهاز','', 'sw','s2_tr_device',true],
 ['سجل الترجمة','', 'sw','s2_tr_hist',false]]},
notes:{t:'الملاحظات',c:'#ffcc00',g:'note',rows:[
 ['الحساب الافتراضي','iCloud', 'info'],
 ['فرز الملاحظات','حسب التاريخ', 'info']]},
reminders:{t:'التذكيرات',c:'#ff9500',g:'reminders',rows:[
 ['قائمة اليوم','', 'sw','s2_rem_today',true],
 ['المجدولة','', 'sw','s2_rem_sched',true]]},
voicememo:{t:'المذكرات الصوتية',c:'#ff3b30',g:'voicememo',rows:[
 ['جودة الصوت','', 'seg','s2_vm_q',['مضغوطة','غير مضغوطة'],0]]},
compass:{t:'البوصلة',c:'#111',g:'compass',rows:[
 ['الشمال الحقيقي','', 'sw','s2_cp_true',false]]},
measure:{t:'القياس',c:'#8e8e93',g:'ruler',rows:[
 ['وحدة القياس','', 'seg','s2_ms_unit',['متري','إمبراطوري'],0]]},
mail:{t:'البريد',c:'#0a84ff',g:'mail',rows:[
 ['الحساب الافتراضي','iCloud', 'info'],
 ['تحميل الصور','', 'sw','s2_mail_img',true]]},
contacts:{t:'جهات الاتصال',c:'#8e8e93',g:'contacts',rows:[
 ['ترتيب العرض','الاسم الأول', 'info'],
 ['الاسم المختصر','', 'sw','s2_con_short',true]]},
calendar:{t:'التقويم',c:'#ff3b30',g:'calendar',rows:[
 ['الأسبوع يبدأ','الأحد', 'info'],
 ['تنبيهات الأحداث','', 'sw','s2_cal_alert',true]]},
phone:{t:'الهاتف',c:'#34c759',g:'phone',rows:[
 ['إظهار رقم المتصل','', 'sw','s2_ph_caller',true],
 ['حظر المجهول','', 'sw','s2_ph_block',false],
 ['الرد التلقائي','', 'sw','s2_ph_auto',false]]},
messages:{t:'الرسائل',c:'#34c759',g:'message',rows:[
 ['iMessage','', 'sw','s2_msg_im',true],
 ['إيصالات القراءة','', 'sw','s2_msg_read',true],
 ['مؤشر الكتابة','', 'sw','s2_msg_typing',true]]},
facetime:{t:'FaceTime',c:'#34c759',g:'facetime',rows:[
 ['FaceTime','', 'sw','s2_ft_on',true],
 ['مكالمات صوتية','', 'sw','s2_ft_audio',true],
 ['مشاركة الشاشة','', 'sw','s2_ft_share',false]]},
stocks:{t:'الأسهم',c:'#111',g:'stocks',rows:[
 ['العملة الافتراضية','دولار', 'info']]},
};
// Render a settings2 page
function s2Render(el,page){
 const P=S2_PAGES[page];if(!P)return false;
 const fx=S.fx;S2_PAGES._fx=S2_PAGES._fx||{};
 const st=S2_PAGES._fx;
 const sw=(id,on)=>'<label class="switch"><input type="checkbox" id="'+id+'" '+(st[id]!==undefined?st[id]:on?'checked':'')+'><i></i></label>';
 const sq2=(c,gl)=>'<span class="sq" style="background:'+c+'">'+g(gl,'#fff',16)+'</span>';
 let h='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>';
 h+='<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+P.t+'</div><div class="setgroup">';
 P.rows.forEach(r=>{
  const lbl=r[0],val=r[1],typ=r[2],id=r[3];
  let v='';
  if(typ==='sw')v=sw(id,r[4]);
  else if(typ==='seg'){const opts=r[4],sel=st[id]!==undefined?st[id]:r[5];
   v='<span class="mut">'+opts[sel]+'</span>';
  }
  else v='<span class="mut">'+val+'</span>';
  h+='<div class="setrow" '+(typ==='seg'?'data-s2seg="'+id+'" style="cursor:pointer"':'')+'><span style="display:flex;align-items:center;gap:9px;flex:1">'+sq2(P.c,P.g)+lbl+'</span>'+v+'</div>';
 });
 h+='</div>';
 el.innerHTML=h;
 $('#setBack').addEventListener('click',()=>{S.setPage='main';_origAppSettings(el);s2Inject(el);});
 // bind switches
 P.rows.forEach(r=>{
  if(r[2]==='sw'){const cb=$('#'+r[3]);if(cb)cb.addEventListener('change',e=>{st[r[3]]=e.target.checked;});}
  if(r[2]==='seg'){const row=el.querySelector('[data-s2seg="'+r[3]+'"]');if(row)row.addEventListener('click',()=>{
   const cur=st[r[3]]!==undefined?st[r[3]]:r[5];const nxt=(cur+1)%r[4].length;st[r[3]]=nxt;s2Render(el,page);
  });}
 });
 // special: weather unit actually changes
 if(page==='weather'){const cb=$('#s2_wx_unit');}
 return true;
}
// Inject app settings rows into main Settings page
function s2Inject(el){
 if(S.setPage!=='main'&&S.setPage) return;
 // Find the last setgroup (Apps hub) and add our section after it
 const groups=el.querySelectorAll('.setgroup');
 if(!groups.length)return;
 const last=groups[groups.length-1];
 // Check if already injected
 if(el.querySelector('[data-s2app]'))return;
 const sq2=(c,gl)=>'<span class="sq" style="background:'+c+'">'+g(gl,'#fff',15)+'</span>';
 const arrow='<span class="mut">‹</span>';
 let h='<div class="rbx-sec">التطبيقات</div><div class="setgroup">';
 Object.keys(S2_PAGES).forEach(k=>{
  const P=S2_PAGES[k];
  h+='<div class="setrow" data-s2app="'+k+'" style="cursor:pointer"><span style="display:flex;align-items:center;gap:9px;flex:1">'+sq2(P.c,P.g)+P.t+'</span>'+arrow+'</div>';
 });
 h+='</div>';
 last.insertAdjacentHTML('afterend',h);
 el.querySelectorAll('[data-s2app]').forEach(r=>r.addEventListener('click',()=>{
  S.setPage='s2_'+r.dataset.s2app;s2Render(el,r.dataset.s2app);
 }));
}
// Wrap appSettings
window.appSettings=function(el){
 _origAppSettings(el);
 // Defer inject to after render
 setTimeout(()=>{s2Inject(el);
  // Hide the 'big icons' toggle row (always-on now)
  el.querySelectorAll('.setrow').forEach(r=>{
   if(r.textContent.includes('أيقونات كبيرة'))r.style.display='none';
  });
 },0);
};
// Wrap setSubPage
window.setSubPage=function(el){
 const p=S.setPage;
 if(p&&p.startsWith('s2_')){
  const page=p.slice(3);
  if(S2_PAGES[page]){s2Render(el,page);return;}
 }
 _origSetSubPage(el);
};
})();
// Force big icons always ON (user preference)
(function(){
function forceBig(){
 try{
  if(window.S&&S.fx&&S.fx.icons){S.fx.icons.big=true;}
  const scr=document.querySelector('#screen');
  if(scr)scr.classList.add('icons-big');
 }catch(e){}
}
forceBig();
setInterval(forceBig,2000);
const _oAF=window.applyFx;
window.applyFx=function(){try{if(S.fx&&S.fx.icons)S.fx.icons.big=true;}catch(e){}_oAF();};
})();

// === Social apps -> coming soon mode ===
(function(){
const _oOE=window.openExtra;
window.openExtra=function(k,fromEl){
 if(k==='instagram'||k==='facebook'||k==='x'){
  appHeadReset();
  S.app='x_'+k;
  const meta={instagram:['Instagram','#E1306C'],facebook:['Facebook','#1877F2'],x:['X','#111']}[k];
  try{noteRunning('x_'+k,meta[0],k)}catch(e){}
  $('#appTitle').textContent=meta[0];
  showAppWin(fromEl);
  emptyChats(meta[0],'<div style="background:'+meta[1]+';color:#fff;border-radius:14px;padding:12px"><b style="font-size:16px">'+meta[0]+'</b><span style="display:block;font-size:12px;opacity:.85">متصل — بانتظار ميزة اليوزر</span></div>');
  return;
 }
 _oOE(k,fromEl);
};
})();

// === Phone/FaceTime: real iPhone style, no fake contacts ===
(function(){
window.appFaceTime=function(el){
 S.myContacts=S.myContacts||[];S.myFavs=S.myFavs||[];
 const tab=S.ftTab||'recents';
 const plusSVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
 let h='<div class="row" style="align-items:center;margin-bottom:10px"><b style="font-size:22px;flex:1">الهاتف</b><button id="ftAdd" style="background:none;border:none;cursor:pointer;padding:8px">'+plusSVG+'</button></div>';
 h+='<div class="segRow" style="margin-bottom:12px">'+
  ['favs','recents','contacts','keypad'].map(t=>'<button data-fttab="'+t+'" style="flex:1;padding:8px;border-radius:8px;font-size:13px;'+(tab===t?'background:#0a84ff;color:#fff':'background:#f0f0f2')+'">'+({favs:'\u0627\u0644\u0645\u0641\u0636\u0644\u0629',recents:'\u0627\u0644\u0623\u062e\u064a\u0631\u0629',contacts:'\u062c\u0647\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',keypad:'\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d'}[t])+'</button>').join('')+'</div>';
 if(tab==='favs'){
  const favs=S.myContacts.filter(c=>S.myFavs.includes(c.p));
  h+=favs.length?'<div class="setgroup">'+favs.map(c=>'<div class="setrow"><span style="width:38px;height:38px;border-radius:50%;background:#ff9f0a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">'+escH(c.n[0]||'?')+'</span><span style="flex:1"><b>'+escH(c.n)+'</b><br><span class="mut" dir="ltr">'+escH(c.p)+'</span></span><button class="btn gray" data-ftcallp="'+escH(c.p)+'">\u0627\u062a\u0635\u0627\u0644</button></div>').join('')+'</div>':'<div style="text-align:center;padding:50px 20px"><p class="mut">\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0641\u0636\u0644\u0629</p></div>';
 }else if(tab==='contacts'){
  if(!S.myContacts.length){
   h+='<div style="text-align:center;padding:50px 20px"><p class="mut">\u0644\u0627 \u062a\u0648\u062c\u062f \u062c\u0647\u0627\u062a \u0627\u062a\u0635\u0627\u0644</p></div>';
  }else{
   h+='<div class="setgroup">'+S.myContacts.map((c,i)=>{const isFav=S.myFavs.includes(c.p);return '<div class="setrow"><span style="width:38px;height:38px;border-radius:50%;background:#0a84ff;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto">'+escH(c.n[0]||'?')+'</span><span style="flex:1;min-width:0"><b>'+escH(c.n)+'</b><br><span class="mut" dir="ltr">'+escH(c.p)+'</span></span><button data-ftfav="'+i+'" style="background:none;border:none;cursor:pointer;padding:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="'+(isFav?'#ff9f0a':'none')+'" stroke="'+(isFav?'#ff9f0a':'#8e8e93')+'" stroke-width="2"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg></button><button class="btn gray" data-ftcall="'+i+'">\u0627\u062a\u0635\u0627\u0644</button></div>'}).join('')+'</div>';
  }
 }else if(tab==='recents'){
  const rec=S.ftRecents||[];
  h+=rec.length?'<div class="setgroup">'+rec.map(r=>'<div class="setrow"><span style="flex:1"><b>'+escH(r.n)+'</b><br><span class="mut">'+escH(r.t)+'</span></span><span class="mut">'+escH(r.d)+'</span></div>').join('')+'</div>':'<div style="text-align:center;padding:50px 20px"><p class="mut">\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0643\u0627\u0644\u0645\u0627\u062a</p></div>';
 }else{
  h+='<div style="text-align:center;padding:10px"><div id="ftNum" dir="ltr" style="font-size:32px;min-height:44px;letter-spacing:2px"></div><div style="display:grid;grid-template-columns:repeat(3,72px);gap:12px;justify-content:center;margin-top:10px">'+
  [1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n=>'<button data-ftk="'+n+'" style="width:72px;height:72px;border-radius:50%;background:#f0f0f2;font-size:26px;border:none;cursor:pointer">'+n+'</button>').join('')+'</div><button id="ftDial" style="margin-top:14px;background:#34c759;border-radius:50%;width:72px;height:72px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg></button></div>';
 }
 h+='<div id="ftModal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:999;align-items:center;justify-content:center"><div style="background:#fff;border-radius:14px;padding:20px;width:85%;max-width:320px"><b style="font-size:17px">\u062c\u0647\u0629 \u0627\u062a\u0635\u0627\u0644 \u062c\u062f\u064a\u062f\u0629</b><div style="margin-top:14px"><input id="ftName" placeholder="\u0627\u0644\u0627\u0633\u0645" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;font-size:15px;box-sizing:border-box"><input id="ftPhone" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641" dir="ltr" inputmode="tel" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px;box-sizing:border-box;text-align:left"></div><div class="row" style="margin-top:14px;gap:8px"><button id="ftCancel" class="btn gray" style="flex:1">\u0625\u0644\u063a\u0627\u0621</button><button id="ftSave" class="btn" style="flex:1">\u062d\u0641\u0638</button></div></div></div>';
 el.innerHTML=h;
 el.querySelectorAll('[data-fttab]').forEach(b=>b.addEventListener('click',()=>{S.ftTab=b.dataset.fttab;window.appFaceTime(el);}));
 const modal=el.querySelector('#ftModal');
 const addB=el.querySelector('#ftAdd');
 if(addB)addB.addEventListener('click',()=>{modal.style.display='flex';});
 const cancelB=el.querySelector('#ftCancel');
 if(cancelB)cancelB.addEventListener('click',()=>{modal.style.display='none';});
 const saveB=el.querySelector('#ftSave');
 if(saveB)saveB.addEventListener('click',()=>{
  const n=el.querySelector('#ftName').value.trim(),p=el.querySelector('#ftPhone').value.trim();
  if(!n){toast('\u0623\u062f\u062e\u0644 \u0627\u0644\u0627\u0633\u0645');return;}
  if(!p){toast('\u0623\u062f\u062e\u0644 \u0627\u0644\u0631\u0642\u0645');return;}
  S.myContacts.push({n:n,p:p});
  try{if(typeof saveFx==='function')saveFx();}catch(e){}
  S.ftTab='contacts';window.appFaceTime(el);toast('\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629');
 });
 el.querySelectorAll('[data-ftfav]').forEach(b=>b.addEventListener('click',()=>{
  const c=S.myContacts[+b.dataset.ftfav];const i=S.myFavs.indexOf(c.p);
  if(i>=0)S.myFavs.splice(i,1);else S.myFavs.push(c.p);
  try{if(typeof saveFx==='function')saveFx();}catch(e){}
  window.appFaceTime(el);
 }));
 const doCall=(name)=>{
  S.ftRecents=S.ftRecents||[];S.ftRecents.unshift({n:name,t:'\u0635\u0627\u062f\u0631\u0629',d:'\u0627\u0644\u0622\u0646'});
  try{if(typeof saveFx==='function')saveFx();}catch(e){}
  toast('\u062c\u0627\u0631\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0640 '+name+'...');
 };
 el.querySelectorAll('[data-ftcall]').forEach(b=>b.addEventListener('click',()=>{
  const c=S.myContacts[+b.dataset.ftcall];doCall(c.n);
 }));
 el.querySelectorAll('[data-ftcallp]').forEach(b=>b.addEventListener('click',()=>{
  const c=S.myContacts.find(x=>x.p===b.dataset.ftcallp);if(c)doCall(c.n);
 }));
 let num='';
 el.querySelectorAll('[data-ftk]').forEach(b=>b.addEventListener('click',()=>{
  num+=b.dataset.ftk;const d=el.querySelector('#ftNum');if(d)d.textContent=num;
 }));
 const dial=el.querySelector('#ftDial');
 if(dial)dial.addEventListener('click',()=>{
  if(!num){toast('\u0623\u062f\u062e\u0644 \u0627\u0644\u0631\u0642\u0645 \u0623\u0648\u0644\u0627\u064b');return;}
  doCall(num);num='';const d=el.querySelector('#ftNum');if(d)d.textContent='';
 });
};
})();
