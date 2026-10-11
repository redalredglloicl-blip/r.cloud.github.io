/* Settings3: Missing iPhone Settings (Update 9.65) - Accessibility, Control Center, Display */
(function(){
if(window._s3loaded)return;window._s3loaded=true;
const _oAS=window.appSettings,_oSP=window.setSubPage;

// Accessibility pages
const S3_PAGES={
access:{t:'تسهيلات الاستخدام',rows:[
 ['VoiceOver','', 'sw','s3_vo',false],
 ['التكبير','', 'sw','s3_zoom',false],
 ['حجم النص','', 'link','s3_textsize'],
 ['الخط العريض','', 'sw','s3_bold',false],
 ['تقليل الحركة','', 'sw','s3_rmotion',false],
 ['زيادة التباين','', 'sw','s3_contrast',false]]},
textsize:{t:'حجم النص',rows:[
 ['حجم أكبر','', 'sw','s3_bigtext',false]]},
controlcenter:{t:'مركز التحكم',rows:[
 ['الوصول من التطبيقات','', 'sw','s3_cc_apps',true],
 ['إظهار مؤشر الرئيسية','', 'sw','s3_cc_home',true]]},
display2:{t:'الشاشة والسطوع',rows:[
 ['السطوع التلقائي','', 'sw','s3_autobright',true],
 ['Night Shift','', 'sw','s3_nightshift',false],
 ['True Tone','', 'sw','s3_truetone',true]]},
};

function s3Get(k,d){try{const v=localStorage.getItem('rio-s3-'+k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function s3Set(k,v){try{localStorage.setItem('rio-s3-'+k,JSON.stringify(v))}catch(e){}}

function s3Render(el,page){
 const P=S3_PAGES[page];if(!P)return;
 let h='<button class="back" id="setBack" style="margin-bottom:10px">‹ الإعدادات</button>';
 h+='<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+P.t+'</div>';
 h+='<div class="setgroup">';
 P.rows.forEach(r=>{
  const [label,sub,type,key,val]=r;
  const cur=s3Get(key,val);
  if(type==='sw'){
   h+='<div class="setrow"><span style="flex:1">'+label+(sub?'<br><span class="mut" style="font-size:12px">'+sub+'</span>':'')+'</span><label class="switch"><input type="checkbox" data-s3k="'+key+'" '+(cur?'checked':'')+'><i></i></label></div>';
  }else if(type==='link'){
   h+='<div class="setrow" data-s3go="'+key+'" style="cursor:pointer"><span style="flex:1">'+label+'</span><span class="mut">‹</span></div>';
  }
 });
 h+='</div>';
 el.innerHTML=h;
 const b=el.querySelector('#setBack');
 if(b)b.addEventListener('click',()=>{S.setPage='main';window.appSettings(el);});
 el.querySelectorAll('[data-s3k]').forEach(inp=>{
  inp.addEventListener('change',()=>{
   s3Set(inp.dataset.s3k,inp.checked);
   // Apply immediately
   const k=inp.dataset.s3k;
   if(k==='s3_bold')document.body.classList.toggle('bold-text',inp.checked);
   if(k==='s3_rmotion')document.body.classList.toggle('reduce-motion',inp.checked);
   if(k==='s3_contrast')document.body.classList.toggle('high-contrast',inp.checked);
   if(k==='s3_zoom'&&window.S&&S.fx){S.fx.zoom=inp.checked;}
   toast(inp.checked?'تم التفعيل':'تم الإيقاف');
  });
 });
 el.querySelectorAll('[data-s3go]').forEach(row=>{
  row.addEventListener('click',()=>{
   const k=row.dataset.s3go;
   if(k==='s3_textsize'){S.setPage='s3_textsize';window.appSettings(el);}
  });
 });
}

// Inject new rows into main Settings list
function s3Inject(el){
 // Find the main settings list and add Accessibility, Control Center
 const rows=el.querySelectorAll('.setrow');
 let added=false;
 rows.forEach(r=>{
  const txt=r.textContent;
  // Add after General (عام)
  if(txt.includes('عام')&&!added){
   const div=document.createElement('div');
   div.innerHTML='<div class="setrow" data-s3main="access" style="cursor:pointer"><span style="display:flex;align-items:center;gap:9px;flex:1"><span class="sq" style="background:#0a84ff">'+g('accessibility','#fff',16)+'</span>تسهيلات الاستخدام</span><span class="mut">‹</span></div>'+
   '<div class="setrow" data-s3main="controlcenter" style="cursor:pointer"><span style="display:flex;align-items:center;gap:9px;flex:1"><span class="sq" style="background:#8e8e93">'+g('sliders','#fff',16)+'</span>مركز التحكم</span><span class="mut">‹</span></div>';
   r.parentNode.insertBefore(div.firstChild,r.nextSibling);
   r.parentNode.insertBefore(div.lastChild,r.nextSibling.nextSibling);
   added=true;
  }
 });
 el.querySelectorAll('[data-s3main]').forEach(row=>{
  row.addEventListener('click',()=>{
   S.setPage='s3_'+row.dataset.s3main;window.appSettings(el);
  });
 });
}

window.appSettings=function(el){
 _oAS(el);
 setTimeout(()=>{s3Inject(el);},0);
};

window.setSubPage=function(el){
 const p=S.setPage;
 if(p&&p.startsWith('s3_')){
  const page=p.slice(3);
  if(S3_PAGES[page]){s3Render(el,page);return;}
 }
 _oSP(el);
};
})();
