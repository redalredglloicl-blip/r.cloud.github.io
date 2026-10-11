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
