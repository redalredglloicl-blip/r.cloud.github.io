/* updates3.js — Rio iPhone in-phone Software Update system (preview v.19+)
   iOS 14.0..27.0 (current iOS 17.0), real download progress, install + reboot,
   downgrade. The iOS version is separate from the site build version (verTag
   stays v.19 via the stamps). Loaded by loader-v16 (preview only). No shared
   file is edited: everything hooks in by wrapping globals at runtime.
   v3 fix: the download bar is painted directly into the live DOM (the
   full-page re-render after a click proved unreliable in the cloud
   browser — state saved fine but the bar never appeared). */
(function(){
if(window._updLoaded)return;window._updLoaded=true;

/* ---------- catalog ---------- */
var UPDATES=[
{v:14,size:1200,notes:'النظام الموحد — آيفون كامل بتطبيقات حقيقية',notesEn:'One unified system — a complete iPhone with real apps',feat:null},
{v:15,size:2100,notes:'يوتيوب حقيقي وسفاري كمتصفح كامل',notesEn:'Real YouTube and Safari as a full browser',feat:null},
{v:16,size:3000,notes:'إعادة بناء الإعدادات ومركز التحكم',notesEn:'Settings and Control Center rebuilt',feat:null},
{v:17,size:4200,notes:'البطارية والمتجر والكاميرا والاستوديو الخاص',notesEn:'Battery, Store, Camera and private Photos',feat:null},
{v:18,size:5100,notes:'الحاسبة العلمية — دوال sin وcos و√ وسجل العمليات',notesEn:'Scientific Calculator — sin, cos, square root and a history',feat:'calc'},
{v:19,size:5400,notes:'3 خلفيات جديدة: غابة ومحيط ومدينة',notesEn:'3 new wallpapers: forest, ocean and city',feat:'walls'},
{v:20,size:5600,notes:'إعادة تسمية التسجيلات الصوتية وترتيبها',notesEn:'Rename and sort your voice memos',feat:'memos'},
{v:21,size:5800,notes:'الوضع الداكن التلقائي — يشتغل من 7 المساء إلى 7 الصبح',notesEn:'Automatic Dark Mode — on from 7 PM to 7 AM',feat:'autodark'},
{v:22,size:6000,notes:'وضع النوم — تركيز مجدول من 11 الليل إلى 7 الصبح',notesEn:'Sleep Focus — scheduled focus from 11 PM to 7 AM',feat:'sleep'},
{v:23,size:6100,notes:'3 أحجام لأيقونات الشاشة الرئيسية',notesEn:'3 home-screen icon sizes',feat:'iconsize'},
{v:24,size:6300,notes:'خلفية متحركة — تدرج حي للشاشة الرئيسية',notesEn:'Animated wallpaper — a living gradient for the home screen',feat:'animwall'},
{v:25,size:6400,notes:'ويدجت المؤقت والمنبه على شاشة القفل',notesEn:'Timer and alarm widgets on the lock screen',feat:'lockwid'},
{v:26,size:6500,notes:'شكل ساعة قفل جديد — مدمجة',notesEn:'A new lock clock style — compact',feat:'clockstyle'},
{v:27,size:6800,notes:'خلفية ديناميكية — تتبدل حسب الوقت',notesEn:'Dynamic wallpaper — changes with the time of day',feat:'dynwall'}
];
var NEWEST=27, OLDEST=14;
function updMeta(v){for(var i=0;i<UPDATES.length;i++)if(UPDATES[i].v===v)return UPDATES[i];return null}

/* ---------- state ---------- */
function updBuildDefault(){return 17}
function updInstalled(){try{var v=parseInt(localStorage.getItem('rioipad-ios-ver'))||0;if(v>=OLDEST&&v<=NEWEST)return v;}catch(e){}return updBuildDefault()}
function updSetInstalled(v){try{localStorage.setItem('rioipad-ios-ver',String(v))}catch(e){}}
function updHas(v){return updInstalled()>=v}
function updHasNewer(){return updInstalled()<NEWEST}
window.updInstalled=updInstalled;window.updHas=updHas;window.updHasNewer=updHasNewer;
window.updNewest=function(){return NEWEST};

/* language helper: English when lang.js switched (window.__lang==='en') */
function updT(ar,en){try{if(window.__lang==='en')return en}catch(e){}return ar}
window.updT=updT;
function updFmtMB(mb){if(mb>=1000)return (mb/1000).toFixed(1)+' GB';return mb+' MB'}

/* The iOS version is separate from the site build version: verTag keeps
   showing the build (v.19) via the stamp files. About shows iOS X.0. */

/* ---------- CSS ---------- */
if(!document.querySelector('#updCss')){
var _css=document.createElement('style');_css.id='updCss';
_css.textContent=
'.upd-bar{height:4px;background:rgba(120,120,128,.25);border-radius:3px;overflow:hidden;width:100%}'+
'.upd-fill{height:100%;background:#0a84ff;border-radius:3px;transition:width .25s linear}'+
'.upd-badge{display:inline-block;background:#ff3b30;color:#fff;border-radius:10px;padding:1px 7px;font-size:12px;font-weight:700;margin-inline-start:6px}'+
'.upd-ver-row{cursor:pointer}'+
'.upd-notes{font-size:12.5px;line-height:1.9;color:#6e6e73;margin-top:6px}'+
'#animWall{position:absolute;inset:0;display:none;background:linear-gradient(120deg,#0a84ff,#5e5ce6,#ff375f,#ff9f0a,#30d158,#0a84ff);background-size:400% 400%;animation:updAurora 24s ease infinite}'+
'@keyframes updAurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}'+
'#screen.icons-sm #homeApps .app .ic{width:52px!important;height:52px!important}'+
'#screen.icons-sm #dock .ic{width:52px!important;height:52px!important}'+
'#screen.lang-en{direction:ltr}';
document.head.appendChild(_css);
}

/* ---------- new wallpapers (v.21) ---------- */
try{
if(!window._updWpsPushed&&typeof WPS!=='undefined'&&WPS.length===4){
WPS.push('https://picsum.photos/seed/rioForest/700/900','https://picsum.photos/seed/rioOcean/700/900','https://picsum.photos/seed/rioCity2/700/900');
window._updWpsPushed=true;
}
}catch(e){}
/* animated wallpaper layer (v.26) */
try{
var _wall=document.querySelector('#wall');
if(_wall&&!document.querySelector('#animWall')){var _aw=document.createElement('div');_aw.id='animWall';_wall.appendChild(_aw);}
}catch(e){}

/* ---------- download ---------- */
var _dlTimer=null,_dl=null;
function updDlGet(){try{var d=JSON.parse(localStorage.getItem('rioipad-upd-dl')||'null');if(d&&d.v&&d.pct>=0&&d.pct<100)return d;}catch(e){}return null}
function updDlSet(d){try{if(d)localStorage.setItem('rioipad-upd-dl',JSON.stringify(d));else localStorage.removeItem('rioipad-upd-dl');}catch(e){}}
function updDledGet(){try{return parseInt(localStorage.getItem('rioipad-upd-dled'))||0;}catch(e){return 0}}
function updDledSet(v){try{if(v)localStorage.setItem('rioipad-upd-dled',String(v));else localStorage.removeItem('rioipad-upd-dled');}catch(e){}}
function updDlTick(){
if(!_dl)return;
var m=updMeta(_dl.v);if(!m){updDlStop();return}
_dl.pct=Math.min(100,_dl.pct+100/120);
updDlSet({v:_dl.v,pct:Math.round(_dl.pct)});
updDlPaint();
if(_dl.pct>=100){var _dv=_dl.v;updDlStop();updDledSet(_dv);updDlSet(null);_dl=null;updDlDoneUI(_dv);try{if(typeof toast==='function')toast(updT('اكتمل التنزيل — دوس تثبيت الآن','Download complete — tap Install now'))}catch(e){}updRefreshPage();}
}
function updDlPaint(){
try{
if(!_dl)return;
var v=_dl.v,m=updMeta(v);if(!m)return;
var host=null;
if(v===NEWEST){var b=document.querySelector('[data-upddl="'+v+'"]');if(b)host=b.closest('.card');}
else host=document.querySelector('[data-updrow="'+v+'"]');
if(!host)return;
var bar=document.querySelector('#updBar');
if(!bar){
var div=document.createElement('div');
div.className='upd-dl-live';
div.innerHTML='<div class="upd-bar" style="margin-top:10px"><div class="upd-fill" id="updBar" style="width:0%"></div></div><div class="row" style="justify-content:space-between;margin-top:6px"><span class="mut" style="font-size:12px" id="updPct"></span><span class="mut" style="font-size:12px" id="updMB"></span></div><div class="mut" style="font-size:12px;margin-top:2px" id="updEta"></div><button class="btn gray" data-updcancel style="margin-top:8px;padding:7px 16px;font-size:13px">'+updT('إلغاء','Cancel')+'</button>';
host.appendChild(div);
var cb=host.querySelector('[data-updcancel]');if(cb)cb.addEventListener('click',function(){updDlCancel();});
var dlb=host.querySelector('[data-upddl="'+v+'"]');if(dlb)dlb.style.display='none';
bar=document.querySelector('#updBar');
}
if(bar)bar.style.width=Math.round(_dl.pct)+'%';
var pc=document.querySelector('#updPct');if(pc)pc.textContent=updT('تم تنزيل ','Downloaded ')+Math.round(_dl.pct)+'٪';
var mb=document.querySelector('#updMB');if(mb){var done=Math.round(m.size*_dl.pct/100);mb.textContent=updFmtMB(done)+' / '+updFmtMB(m.size);}
var eta=document.querySelector('#updEta');if(eta){var left=Math.max(0,Math.ceil((100-_dl.pct)/100*30));eta.textContent=updT('متبقّي تقريباً ','About ')+left+updT(' ثانية',' sec left');}
}catch(e){}
}
function updDlDoneUI(v){
try{
document.querySelectorAll('.upd-dl-live').forEach(function(n){n.remove();});
document.querySelectorAll('[data-upddl="'+v+'"]').forEach(function(b){
var inst=document.createElement('button');
inst.className='btn';inst.setAttribute('data-updinst',String(v));
inst.style.cssText=b.style.cssText||'padding:7px 16px;font-size:13px';
inst.textContent=(b.style.width==='100%')?updT('تثبيت الآن','Install now'):updT('تثبيت','Install');
inst.addEventListener('click',function(){updInstall(v);});
b.replaceWith(inst);
});
}catch(e){}
}
function updDlStart(v){
if(_dl&&_dl.v===v)return;
updDlStop();
var saved=updDlGet();
_dl={v:v,pct:(saved&&saved.v===v)?saved.pct:0};
_dlTimer=setInterval(updDlTick,250);
updDlPaint();
}
function updDlStop(){if(_dlTimer){clearInterval(_dlTimer);_dlTimer=null;}}
function updDlCancel(){var v=_dl?_dl.v:null;updDlStop();updDlSet(null);_dl=null;
try{document.querySelectorAll('.upd-dl-live').forEach(function(n){n.remove();});
if(v!==null){document.querySelectorAll('[data-upddl="'+v+'"]').forEach(function(b){b.style.display='';});}
}catch(e){}
updRefreshPage();}
window.updDlStart=updDlStart;window.updDlCancel=updDlCancel;

/* ---------- install + reboot ---------- */
function updShowInstall(v){
var ov=document.createElement('div');
ov.id='updInstallOv';
ov.style.cssText='position:fixed;inset:0;background:#000;z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center';
ov.innerHTML='<div style="font-size:64px;color:#fff;line-height:1">\uF8FF</div>'+
'<div class="upd-bar" style="width:220px;margin-top:30px;background:rgba(255,255,255,.25)"><div class="upd-fill" id="updInstFill" style="width:0%;background:#fff"></div></div>'+
'<div style="color:#8e8e93;font-size:13px;margin-top:16px">'+updT('جارٍ تثبيت التحديث… ','Installing update… ')+'iOS '+v+'.0'+'</div>';
document.body.appendChild(ov);
var p=0;
var iv=setInterval(function(){
p=Math.min(100,p+100/28);
var f=document.querySelector('#updInstFill');if(f)f.style.width=p+'%';
if(p>=100){clearInterval(iv);updSetInstalled(v);updDledSet(0);updDlSet(null);try{localStorage.setItem('rioipad-upd-just',String(v))}catch(e){}setTimeout(function(){location.reload()},400);}
},250);
}
function updInstall(v){
if(v===updInstalled())return;
if(v<updInstalled()){
if(!confirm(updT('راح ترجع إلى إصدار أقدم (iOS '+v+'.0) — متأكد؟','You will go back to an older version (iOS '+v+'.0) — are you sure?')))return;
}
if(updDledGet()!==v){updDlStart(v);updRefreshPage();return;}
updShowInstall(v);
}
window.updInstall=updInstall;

/* ---------- post-reboot notice ---------- */
try{
var _just=parseInt(localStorage.getItem('rioipad-upd-just'))||0;
if(_just){
localStorage.removeItem('rioipad-upd-just');
setTimeout(function(){
var m=updMeta(_just);
try{if(typeof notify==='function')notify(updT('الإعدادات','Settings'),updT('تحديث البرنامج','Software Update'),updT('تم تثبيت iOS '+_just+'.0','Installed iOS '+_just+'.0')+(m&&m.feat?updT(' — '+m.notes,' — '+m.notesEn):''),null,{pop:false});}catch(e){}
try{if(typeof toast==='function')toast(updT('تم تثبيت iOS '+_just+'.0','Installed iOS '+_just+'.0'));}catch(e){}
},2500);
}
}catch(e){}

function updRefreshPage(){try{if(window.S&&S.setPage==='gupdate'&&typeof appSettings==='function')appSettings(document.querySelector('#appBody'));}catch(e){}}
window.updRefreshPage=updRefreshPage;

/* ---------- Software Update page (iPhone-style) ---------- */
function updRowHTML(m){
var cur=updInstalled(),isCur=m.v===cur,isDl=updDledGet()===m.v,isDling=_dl&&_dl.v===m.v;
var btn='';
if(isCur)btn='<span style="color:#34c759;font-weight:700;font-size:13px">'+updT('مثبّت ✓','Installed ✓')+'</span>';
else if(isDling)btn='<span style="color:#0a84ff;font-size:13px">'+updT('جارٍ التنزيل…','Downloading…')+'</span>';
else if(isDl)btn='<button class="btn" data-updinst="'+m.v+'" style="padding:7px 16px;font-size:13px">'+updT('تثبيت','Install')+'</button>';
else btn='<button class="btn" data-upddl="'+m.v+'" style="padding:7px 16px;font-size:13px">'+updT('تنزيل','Download')+'</button>';
var tag=(m.v<cur)?' <span class="mut" style="font-size:11px">'+updT('إصدار أقدم','Older version')+'</span>':'';
return '<div class="card upd-ver-row" data-updrow="'+m.v+'" style="margin-bottom:8px"><div class="row" style="justify-content:space-between;align-items:center"><span><b style="font-size:15px">iOS '+m.v+'.0</b>'+tag+'<br><span class="mut" style="font-size:12px">'+updFmtMB(m.size)+'</span></span>'+btn+'</div>'+
(isDling&&m.v!==NEWEST?'<div class="upd-bar" style="margin-top:10px"><div class="upd-fill" id="updBar" style="width:'+Math.round(_dl.pct)+'%"></div></div><div class="row" style="justify-content:space-between;margin-top:6px"><span class="mut" style="font-size:12px" id="updPct"></span><span class="mut" style="font-size:12px" id="updMB"></span></div><div class="mut" style="font-size:12px;margin-top:2px" id="updEta"></div><button class="btn gray" data-updcancel style="margin-top:8px;padding:7px 16px;font-size:13px">'+updT('إلغاء','Cancel')+'</button>':'')+
'<div class="upd-notes" data-updnotes="'+m.v+'" style="display:none">'+escH(updT(m.notes,m.notesEn))+'</div></div>';
}
function updPageHTML(){
var cur=updInstalled();
var h='<button class="back" id="setBack" style="margin-bottom:10px">‹ '+updT('عام','General')+'</button><div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+updT('تحديث البرنامج','Software Update')+'</div>';
h+='<div class="card" style="text-align:center;padding:20px"><div class="mut" style="font-size:13px">'+updT('الإصدار الحالي','Current version')+'</div><div style="font-size:30px;font-weight:700;margin:4px 0">iOS '+cur+'.0</div><div class="mut" style="font-size:12.5px">'+(cur>=NEWEST?updT('نظامك محدّث بالكامل','Your system is fully up to date'):updT('تحديث أجدد متوفر بالأسفل','A newer update is available below'))+'</div></div>';
if(cur<NEWEST){
var nm=updMeta(NEWEST);
h+='<div class="card" style="padding:16px"><div style="font-size:16px;font-weight:700">iOS '+NEWEST+'.0 '+updT('متوفر الآن','is now available')+'</div><div class="mut" style="font-size:12.5px;margin:4px 0 8px">'+updFmtMB(nm.size)+' · '+escH(updT(nm.notes,nm.notesEn))+'</div>';
if(_dl&&_dl.v===NEWEST){
h+='<div class="upd-bar"><div class="upd-fill" id="updBar" style="width:'+Math.round(_dl.pct)+'%"></div></div><div class="row" style="justify-content:space-between;margin-top:8px"><span class="mut" style="font-size:12.5px" id="updPct"></span><span class="mut" style="font-size:12.5px" id="updMB"></span></div><div class="mut" style="font-size:12px;margin-top:2px" id="updEta"></div><button class="btn gray" data-updcancel style="width:100%;margin-top:10px;padding:12px">'+updT('إلغاء التنزيل','Cancel download')+'</button>';
}else if(updDledGet()===NEWEST){
h+='<button class="btn" data-updinst="'+NEWEST+'" style="width:100%;padding:13px;font-size:15px">'+updT('تثبيت الآن','Install now')+'</button>';
}else{
h+='<button class="btn" data-upddl="'+NEWEST+'" style="width:100%;padding:13px;font-size:15px">'+updT('تنزيل وتثبيت','Download and Install')+'</button>';
}
h+='</div>';
}
h+='<div class="rbx-sec">'+updT('كل الإصدارات','All versions')+'</div>';
for(var i=UPDATES.length-1;i>=0;i--)h+=updRowHTML(UPDATES[i]);
h+='<p class="mut" style="font-size:12px;line-height:1.9;margin:6px 2px">'+updT('من يثبّت التحديث، ينطفي الآيفون ويرجع يشتغل بالإصدار الجديد. تكدر ترجع لأي إصدار أقدم بنفس الطريقة.','When you install an update, the iPhone restarts on the new version. You can go back to any older version the same way.')+'</p>';
return h;
}
function updBindPage(el){
var back=el.querySelector('#setBack');if(back)back.addEventListener('click',function(){try{S.setPage='general';appSettings(el);}catch(e){}});
el.querySelectorAll('[data-upddl]').forEach(function(b){b.addEventListener('click',function(){var v=+b.dataset.upddl;var saved=updDlGet();if(saved&&saved.v===v&&saved.pct>0){updDlStart(v);}else{updDlStart(v);}updRefreshPage();});});
el.querySelectorAll('[data-updinst]').forEach(function(b){b.addEventListener('click',function(){updInstall(+b.dataset.updinst);});});
el.querySelectorAll('[data-updcancel]').forEach(function(b){b.addEventListener('click',function(){updDlCancel();});});
el.querySelectorAll('[data-updrow]').forEach(function(r){r.addEventListener('click',function(e){if(e.target.closest('button'))return;var n=el.querySelector('[data-updnotes="'+r.dataset.updrow+'"]');if(n)n.style.display=n.style.display==='none'?'block':'none';});});
updDlPaint();
}
window.updRenderPage=function(el){el.innerHTML=updPageHTML();updBindPage(el);};

/* ---------- Settings post-processing ---------- */
function updStripAbout(el){
try{el.querySelectorAll('.setrow').forEach(function(r){if(r.textContent.indexOf('إصدار الموقع')>=0)r.remove();});}catch(e){}
}
function updBadgeGeneral(el){
try{
if(!updHasNewer())return;
var row=el.querySelector('[data-go="gupdate"]');if(!row||row.querySelector('.upd-badge'))return;
var sp=document.createElement('span');sp.className='upd-badge';sp.textContent='1';
row.appendChild(sp);
}catch(e){}
}
function updEnhanceDisplay(el){
try{
if(!updHas(21))return;
if(el.querySelector('#updAutoDark'))return;
var seg=el.querySelector('.segRow');
var sec=document.createElement('div');
sec.innerHTML='<div class="rbx-sec">'+updT('الوضع الداكن التلقائي','Automatic Dark Mode')+'</div><div class="setgroup"><div class="setrow"><span style="flex:1">'+updT('تلقائي — داكن من 7 المساء إلى 7 الصبح','Automatic — dark from 7 PM to 7 AM')+'</span><label class="switch"><input type="checkbox" id="updAutoDark" '+(S.fx.autodark?'checked':'')+'><i></i></label></div></div>';
if(seg&&seg.parentNode)seg.parentNode.insertBefore(sec,seg.nextSibling);else el.appendChild(sec);
var t=el.querySelector('#updAutoDark');if(t)t.addEventListener('change',function(){S.fx.autodark=t.checked;saveFx();applyTheme();toast(t.checked?updT('انفعل الوضع الداكن التلقائي','Automatic Dark Mode on'):updT('انطفأ الوضع الداكن التلقائي','Automatic Dark Mode off'));});
}catch(e){}
}
function updEnhanceFocus(el){
try{
if(!updHas(22))return;
if(el.querySelector('#updSleepOn'))return;
if(!S.fx.sleep)S.fx.sleep={on:false,from:'23:00',to:'07:00'};
var sec=document.createElement('div');
sec.innerHTML='<div class="rbx-sec">'+updT('وضع النوم','Sleep Focus')+'</div><div class="setgroup">'+
'<div class="setrow"><span style="flex:1">'+updT('وضع النوم','Sleep')+'</span><label class="switch"><input type="checkbox" id="updSleepOn" '+(S.fx.sleep.on?'checked':'')+'><i></i></label></div>'+
'<div class="setrow"><span style="flex:1">'+updT('من','From')+'</span><input type="time" id="updSleepFrom" value="'+S.fx.sleep.from+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px"></div>'+
'<div class="setrow"><span style="flex:1">'+updT('إلى','To')+'</span><input type="time" id="updSleepTo" value="'+S.fx.sleep.to+'" style="padding:6px;border:1px solid #d9d9de;border-radius:9px"></div></div>'+
'<p class="mut" style="margin:4px 2px;line-height:1.8">'+updT('من يجي وقت النوم، ينفعل عدم الإزعاج تلقائياً ويطفي من يخلص الوقت.','When bedtime comes, Do Not Disturb turns on automatically and off when time is up.')+'</p>';
el.appendChild(sec);
var on=el.querySelector('#updSleepOn');if(on)on.addEventListener('change',function(){S.fx.sleep.on=on.checked;saveFx();updSleepTick();toast(on.checked?updT('انفعل وضع النوم','Sleep Focus on'):updT('انطفأ وضع النوم','Sleep Focus off'));});
var fr=el.querySelector('#updSleepFrom');if(fr)fr.addEventListener('change',function(){S.fx.sleep.from=fr.value||'23:00';saveFx();updSleepTick();});
var to=el.querySelector('#updSleepTo');if(to)to.addEventListener('change',function(){S.fx.sleep.to=to.value||'07:00';saveFx();updSleepTick();});
}catch(e){}
}
function updEnhanceWall(el){
try{
el.querySelectorAll('[data-wp]').forEach(function(im){
var i=+im.dataset.wp;
if(i>=4&&i<=6&&!updHas(19))im.style.display='none';
if(i===7&&!updHas(24))im.style.display='none';
});
if(updHas(24)&&!el.querySelector('[data-wp="7"]')){
var grid=el.querySelector('[data-wp]');if(grid&&grid.parentNode){
var d=document.createElement('div');
d.setAttribute('data-wp','7');
d.style.cssText='width:100%;height:150px;border-radius:16px;cursor:pointer;background:linear-gradient(120deg,#0a84ff,#5e5ce6,#ff375f,#ff9f0a);background-size:300% 300%;animation:updAurora 12s ease infinite;'+(S.set.wp===7?'outline:3.5px solid #0a84ff':'');
d.addEventListener('click',function(){S.set.wp=7;saveSet();applyTheme();appSettings(el);toast(updT('اتبدلت الخلفية','Wallpaper changed'));});
grid.parentNode.appendChild(d);
}
}
if(updHas(24)&&!el.querySelector('[data-lockwp="7"]')){
var lw=el.querySelector('[data-lockwp]');if(lw&&lw.parentNode){
var d2=document.createElement('div');
d2.setAttribute('data-lockwp','7');
d2.style.cssText='width:100%;height:140px;border-radius:16px;cursor:pointer;background:linear-gradient(120deg,#0a84ff,#5e5ce6,#ff375f,#ff9f0a);background-size:300% 300%;animation:updAurora 12s ease infinite;'+(S.set.lockWp===7?'outline:3.5px solid #0a84ff':'');
d2.addEventListener('click',function(){S.set.lockWp=7;saveSet();applyTheme();appSettings(el);toast(updT('اتبدلت خلفية القفل','Lock wallpaper changed'));});
lw.parentNode.appendChild(d2);
}
}
}catch(e){}
}
function updEnhanceLockset(el){
try{
if(!updHas(25))return;
if(el.querySelector('#lkw-timer'))return;
var grp2=el.querySelectorAll('.setgroup');if(!grp2.length)return;
var sec=document.createElement('div');
sec.innerHTML='<div class="rbx-sec">'+updT('ويدجت جديدة — v.27','New widgets — v.27')+'</div><div class="setgroup">'+
'<div class="setrow"><span style="flex:1">'+updT('المؤقت','Timer')+'</span><label class="switch"><input type="checkbox" id="lkw-timer" '+(S.fx.lock.widgets.includes('timer')?'checked':'')+'><i></i></label></div>'+
'<div class="setrow"><span style="flex:1">'+updT('المنبه','Alarm')+'</span><label class="switch"><input type="checkbox" id="lkw-alarm" '+(S.fx.lock.widgets.includes('alarm')?'checked':'')+'><i></i></label></div></div>';
el.appendChild(sec);
['timer','alarm'].forEach(function(w){
var c=el.querySelector('#lkw-'+w);if(c)c.addEventListener('change',function(){
S.fx.lock.widgets=c.checked?[...new Set([...S.fx.lock.widgets,w])]:S.fx.lock.widgets.filter(function(x){return x!==w});
saveFx();renderLockX();
});
});
}catch(e){}
}
function updEnhanceHome(el){
try{
if(!updHas(23))return;
var sw=el.querySelector('#icBig');if(!sw)return;
var rowEl=sw.closest('.setrow');if(!rowEl||rowEl.querySelector('[data-icsz]'))return;
if(!S.fx.icons.size)S.fx.icons.size='md';
rowEl.innerHTML='<span style="display:flex;align-items:center;gap:9px;flex:1"><span class="sq" style="background:#ff9500">'+(typeof g==='function'?g('grid','#fff',16):'')+'</span>'+updT('حجم الأيقونات','Icon size')+'</span><span class="segRow" style="width:170px">'+
['sm','md','lg'].map(function(s){return '<button data-icsz="'+s+'" class="'+(S.fx.icons.size===s?'on':'')+'">'+updT({sm:'صغير',md:'عادي',lg:'كبير'}[s],{sm:'Small',md:'Normal',lg:'Large'}[s])+'</button>'}).join('')+'</span>';
rowEl.querySelectorAll('[data-icsz]').forEach(function(b){b.addEventListener('click',function(){
S.fx.icons.size=b.dataset.icsz;S.fx.icons.big=(b.dataset.icsz==='lg');saveFx();applyFx();appSettings(el);
});});
}catch(e){}
}
function updEnhanceReset(el){
try{
if(el.querySelector('#updResetVer'))return;
var b=document.createElement('button');
b.id='updResetVer';b.className='btn gray';
b.style.cssText='width:100%;padding:12px;margin-bottom:9px';
b.textContent=updT('إعادة تعيين إصدار النظام','Reset system version');
b.addEventListener('click',function(){
if(!confirm(updT('راح يرجع إصدار النظام إلى iOS '+updBuildDefault()+'.0 ويرجع يشتغل الآيفون — متأكد؟','System version will go back to iOS '+updBuildDefault()+'.0 and the iPhone will restart — sure?')))return;
try{localStorage.removeItem('rioipad-ios-ver');}catch(e){}
location.reload();
});
var rst=el.querySelector('#rstSet');if(rst&&rst.parentNode)rst.parentNode.insertBefore(b,rst);else el.appendChild(b);
}catch(e){}
}
function updAboutIOS(el){
try{
el.querySelectorAll('.setrow').forEach(function(r){
var sp=r.querySelector('span');
if(sp&&sp.textContent.trim()==='نظام التشغيل'){
for(var i=0;i<r.childNodes.length;i++){var n=r.childNodes[i];if(n.nodeType===3&&n.textContent.indexOf('iOS')>=0)n.textContent='iOS '+updInstalled()+'.0';}
}
});
}catch(e){}
}
function updEnhanceDynWall(el){
try{
if(!updHas(27))return;
if(el.querySelector('#updDynWall'))return;
var sec=document.createElement('div');
sec.innerHTML='<div class="rbx-sec">'+updT('خلفية ديناميكية','Dynamic wallpaper')+'</div><div class="setgroup"><div class="setrow"><span style="flex:1">'+updT('تتبدل حسب الوقت — صبح وظهر وليل','Changes with the time of day')+'</span><label class="switch"><input type="checkbox" id="updDynWall" '+(S.fx.dynwall?'checked':'')+'><i></i></label></div></div>';
el.appendChild(sec);
var t=el.querySelector('#updDynWall');if(t)t.addEventListener('change',function(){S.fx.dynwall=t.checked;saveFx();applyTheme();toast(t.checked?updT('انفعلت الخلفية الديناميكية','Dynamic wallpaper on'):updT('انطفت الخلفية الديناميكية','Dynamic wallpaper off'));});
}catch(e){}
}
function updEnhanceLockClock(el){
try{
if(!updHas(26))return;
if(el.querySelector('[data-lockck="3"]'))return;
var g=el.querySelector('[data-lockck]');
if(!g)return;
var grp=g.closest('.setgroup');if(!grp)return;
var row=document.createElement('div');
row.className='setrow';row.setAttribute('data-lockck','3');row.style.cursor='pointer';
row.innerHTML='<span style="flex:1">'+updT('مدمجة','Compact')+'</span>'+(S.set.lockClock===3?'<span style="color:#0a84ff">✓</span>':'');
row.addEventListener('click',function(){S.set.lockClock=3;saveSet();applyTheme();appSettings(el);});
grp.appendChild(row);
}catch(e){}
}
function updAfterSettings(el){
try{
var p=S.setPage;
if(p==='about'){updStripAbout(el);updAboutIOS(el);}
else if(p==='general')updBadgeGeneral(el);
else if(p==='gupdate'){updRenderPage(el);}
else if(p==='display')updEnhanceDisplay(el);
else if(p==='focus')updEnhanceFocus(el);
else if(p==='wall'){updEnhanceWall(el);updEnhanceDynWall(el);}
else if(p==='lockcustom'){updEnhanceWall(el);updEnhanceLockClock(el);}
else if(p==='lockset')updEnhanceLockset(el);
else if(p==='home')updEnhanceHome(el);
else if(p==='greset')updEnhanceReset(el);
}catch(e){}
}
window._updAfter=window._updAfter||[];
if(!window._updWrapped&&typeof window.appSettings==='function'){
window._updWrapped=true;
var _as=window.appSettings;
window.appSettings=function(el){
_as(el);
try{updAfterSettings(el);}catch(e){}
(window._updAfter||[]).forEach(function(f){try{f(el);}catch(e){}});
};
}

/* ---------- Calculator scientific mode (v.20) ---------- */
function appCalcSci(el){
var expr='';
function histPush(s){try{var h=JSON.parse(localStorage.getItem('rioipad-calc-hist')||'[]');h.unshift(s);h=h.slice(0,5);localStorage.setItem('rioipad-calc-hist',JSON.stringify(h));}catch(e){}}
function histHTML(){try{var h=JSON.parse(localStorage.getItem('rioipad-calc-hist')||'[]');if(!h.length)return '';return '<div class="mut" style="font-size:12px;line-height:2;margin-top:8px">'+h.map(function(x){return escH(x)}).join('<br>')+'</div>';}catch(e){return ''}}
function calcEval(e){return eval(e.replace(/×/g,'*').replace(/÷/g,'/').replace(/%/g,'/100'))}
el.innerHTML='<div class="card"><div id="calcOut" style="text-align:left;font-size:30px;font-weight:700;padding:8px;min-height:44px">0</div>'+
'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+
['C','⌫','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='].map(function(k){return '<button class="btn '+(k==='='?'':'gray')+'" data-ck="'+k+'" style="padding:13px 0;font-size:16px">'+k+'</button>'}).join('')+'</div>'+
'<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:8px">'+
['sin','cos','tan','√','x²','π'].map(function(k){return '<button class="btn gray" data-cks="'+k+'" style="padding:9px 0;font-size:13px">'+k+'</button>'}).join('')+'</div>'+
'<div id="calcHist">'+histHTML()+'</div></div>';
var out=el.querySelector('#calcOut');
el.querySelectorAll('[data-ck]').forEach(function(b){b.addEventListener('click',function(){
var k=b.dataset.ck;
if(k==='C')expr='';
else if(k==='⌫')expr=expr.slice(0,-1);
else if(k==='='){try{var r=String(calcEval(expr)||'0');histPush(expr+' = '+r);expr=r;var hh=el.querySelector('#calcHist');if(hh)hh.innerHTML=histHTML();}catch(e){expr='Error'}}
else expr+=k;
out.textContent=expr||'0';
});});
el.querySelectorAll('[data-cks]').forEach(function(b){b.addEventListener('click',function(){
var k=b.dataset.cks;
try{
if(k==='π'){expr+='3.14159265';}
else{var v=calcEval(expr||'0');
if(k==='sin')v=Math.sin(v*Math.PI/180);
else if(k==='cos')v=Math.cos(v*Math.PI/180);
else if(k==='tan')v=Math.tan(v*Math.PI/180);
else if(k==='√')v=Math.sqrt(v);
else if(k==='x²')v=v*v;
expr=String(Math.round(v*1000000)/1000000);}
}catch(e){expr='Error'}
out.textContent=expr||'0';
});});
}
if(typeof window.appCalc==='function'){
var _calc=window.appCalc;
window.appCalc=function(el){if(updHas(18))return appCalcSci(el);return _calc(el);};
}

/* ---------- Voice Memos rename + sort (v.22) ---------- */
function appVoiceMemos22(el){
S.memos=S.memos||store.get('memos',[]);
if(typeof S._vmSort==='undefined')S._vmSort='new';
var render=function(){
var list=S.memos.slice();
if(S._vmSort==='old')list=list.slice().reverse();
el.innerHTML='<b style="font-size:20px">'+updT('المذكرات الصوتية','Voice Memos')+'</b>'+
'<div style="text-align:left;margin-top:6px"><button class="btn gray" id="vmSort" style="padding:6px 14px;font-size:12px">'+(S._vmSort==='new'?updT('الأحدث أولاً','Newest first'):updT('الأقدم أولاً','Oldest first'))+'</button></div>'+
'<div id="vmList" style="margin-top:10px">'+(list.length?list.map(function(m){
var i=S.memos.indexOf(m);
return '<div class="card"><b style="font-size:14px;cursor:pointer" data-vmren="'+i+'">'+escH(m.n)+' ✎</b><br><span class="mut" style="font-size:12px">'+escH(m.d)+'</span><audio controls src="'+m.u+'" style="width:100%;margin-top:8px"></audio><button class="btn gray" data-vmdel="'+i+'" style="margin-top:6px;padding:6px 14px;font-size:12px">'+updT('حذف','Delete')+'</button></div>'}).join(''):'<div class="mut" style="text-align:center;padding:30px;line-height:1.9">'+updT('لا تسجيلات بعد<br>دوس تسجيل واحجي','No recordings yet<br>Tap record and talk')+'</div>')+'</div>'+
'<button class="btn" id="vmRec" style="width:100%;margin-top:10px;padding:14px;font-size:16px">● '+updT('تسجيل','Record')+'</button><p class="mut" style="text-align:center;font-size:11.5px;margin-top:8px">'+updT('التسجيل حقيقي من مايكروفون جهازك','Real recording from your device microphone')+'</p>';
var mr=null;var chunks=[];
var rb=document.querySelector('#vmRec');
rb.addEventListener('click',async function(){
if(mr&&mr.state==='recording'){mr.stop();return}
try{
var st=await navigator.mediaDevices.getUserMedia({audio:true});
mr=new MediaRecorder(st);
mr.ondataavailable=function(e){if(e.data.size)chunks.push(e.data)};
mr.onstop=function(){var blob=new Blob(chunks,{type:mr.mimeType||'audio/webm'});var rd=new FileReader();rd.onload=function(){S.memos.unshift({n:updT('تسجيل ','Recording ')+(S.memos.length+1),d:new Date().toLocaleDateString('en-GB'),u:rd.result});store.set('memos',S.memos);st.getTracks().forEach(function(t){t.stop()});mr=null;render();toast(updT('انحفظ التسجيل','Recording saved'))};rd.readAsDataURL(blob);chunks.length=0};
mr.start();rb.innerHTML='■ '+updT('إيقاف التسجيل','Stop recording');rb.style.background='#ff3b30';
}catch(e){toast(updT('المايكروفون محظور — فعّله من الإعدادات','Microphone blocked — enable it in Settings'))}
});
var sb=document.querySelector('#vmSort');if(sb)sb.addEventListener('click',function(){S._vmSort=S._vmSort==='new'?'old':'new';render();});
el.querySelectorAll('[data-vmdel]').forEach(function(b){b.addEventListener('click',function(){S.memos.splice(+b.dataset.vmdel,1);store.set('memos',S.memos);render();});});
el.querySelectorAll('[data-vmren]').forEach(function(b){b.addEventListener('click',function(){
var i=+b.dataset.vmren;var nn=prompt(updT('اسم جديد للتسجيل','New name for the recording'),S.memos[i].n);
if(nn&&nn.trim()){S.memos[i].n=nn.trim();store.set('memos',S.memos);render();}
});});
};
render();
}
if(typeof window.appVoiceMemos==='function'){
var _vm=window.appVoiceMemos;
window.appVoiceMemos=function(el){if(updHas(20))return appVoiceMemos22(el);return _vm(el);};
}

/* ---------- applyTheme wrap: wallpaper gating + animated + auto-dark ---------- */
function updEvalAutoDark(){
try{
if(S.fx&&S.fx.autodark){var h=new Date().getHours();var want=(h>=19||h<7);if(!!S.set.dark!==want){S.set.dark=want;saveSet();}}
}catch(e){}
}
var _updSavedWp=null,_updSavedLockWp=null;
if(typeof window.applyTheme==='function'){
var _at=window.applyTheme;
window.applyTheme=function(){
try{
updEvalAutoDark();
_updSavedWp=null;_updSavedLockWp=null;
if(typeof WPS!=='undefined'){
if((S.set.wp||0)>=4&&(S.set.wp||0)<=6&&!updHas(19)){S.set.wp=0;saveSet();}
if(S.set.wp===7&&!updHas(24)){S.set.wp=0;saveSet();}
if((S.set.lockWp||-1)>=4&&(S.set.lockWp||-1)<=6&&!updHas(19)){S.set.lockWp=-1;saveSet();}
if(S.set.lockWp===7){_updSavedLockWp=7;S.set.lockWp=-1;}
if(S.set.lockClock===3&&!updHas(26)){S.set.lockClock=0;saveSet();}
if(S.fx&&S.fx.dynwall&&updHas(27)){var _hh=new Date().getHours();var _di=_hh>=6&&_hh<12?1:(_hh>=12&&_hh<18?2:(_hh>=18&&_hh<22?0:3));_updSavedWp=S.set.wp;S.set.wp=_di;}
else if(S.set.wp===7){_updSavedWp=7;S.set.wp=0;}
}
}catch(e){}
_at();
try{
if(_updSavedWp!==null&&_updSavedWp!==undefined){S.set.wp=_updSavedWp;_updSavedWp=null;}
if(_updSavedLockWp===7){S.set.lockWp=7;_updSavedLockWp=null;}
var wi=document.querySelector('#wallImg'),aw=document.querySelector('#animWall');
var dynOn=!!(S.fx&&S.fx.dynwall&&updHas(27));
var anim=(S.set.wp===7)&&updHas(24)&&!dynOn;
if(wi)wi.style.display=anim?'none':'';
if(aw)aw.style.display=anim?'block':'none';
var ltm=document.querySelector('#lockTime');
if(ltm&&S.set.lockClock===3&&updHas(26)){ltm.style.fontSize='56px';ltm.style.fontWeight='600';}
}catch(e){}
};
}
setInterval(function(){try{updEvalAutoDark();if(S.fx&&(S.fx.autodark||S.fx.dynwall))applyTheme();}catch(e){}},60000);

/* ---------- lock widgets: timer + alarm (v.27) ---------- */
if(typeof window.lockWidHTML==='function'){
var _lwh=window.lockWidHTML;
window.lockWidHTML=function(){
var h=_lwh();
try{
if(!updHas(25))return h;
var L=S.fx.lock;var w=L.widgets||[];
if(w.includes('timer')&&S.timerEnd){
var s=Math.max(0,Math.round((S.timerEnd-Date.now())/1000));
h+='<span class="lwid">'+(typeof g==='function'?g('timer','#fff',15):'')+' '+Math.floor(s/60)+':'+String(s%60).padStart(2,'0')+'</span>';
}
if(w.includes('alarm')){
var al=(S.alarms||[]).find(function(a){return a.on});
if(al)h+='<span class="lwid">'+(typeof g==='function'?g('alarm','#fff',15):'')+' '+arabNum(al.t)+'</span>';
}
}catch(e){}
return h;
};
}

/* ---------- applyFx wrap: icon size (v.25) ---------- */
if(typeof window.applyFx==='function'){
var _afx=window.applyFx;
window.applyFx=function(){
_afx();
try{
var scr=document.querySelector('#screen');if(!scr)return;
var sz=(S.fx.icons&&S.fx.icons.size)||'md';
scr.classList.toggle('icons-sm',sz==='sm');
scr.classList.toggle('icons-big',sz==='lg');
if(sz!=='lg')scr.classList.remove('icons-big');
}catch(e){}
};
try{applyFx();}catch(e){}
}

/* ---------- Sleep Focus tick (v.24) ---------- */
function updSleepTick(){
try{
if(!S.fx.sleep||!S.fx.sleep.on)return;
if(typeof inWin!=='function')return;
var want=inWin(S.fx.sleep.from,S.fx.sleep.to);
if(want&&!S.set.dnd){S.set.dnd=true;S._sleepDnd=true;store.set('set',S.set);if(typeof renderStatus==='function')renderStatus();if(typeof notify==='function')notify(updT('التركيز','Focus'),updT('وضع النوم','Sleep'),updT('انفعل وضع النوم — تصبح على خير','Sleep Focus on — good night'),null,{pop:false});}
else if(!want&&S._sleepDnd){S.set.dnd=false;S._sleepDnd=false;store.set('set',S.set);if(typeof renderStatus==='function')renderStatus();if(typeof notify==='function')notify(updT('التركيز','Focus'),updT('وضع النوم','Sleep'),updT('انطفأ وضع النوم — صباح الخير','Sleep Focus off — good morning'),null,{pop:false});}
}catch(e){}
}
if(typeof window.focusSchedTick==='function'){
var _fst=window.focusSchedTick;
window.focusSchedTick=function(){_fst();try{updSleepTick();}catch(e){}};
}
setInterval(function(){try{updSleepTick();}catch(e){}},60000);
setTimeout(function(){try{updSleepTick();}catch(e){}},5000);

/* ---------- resume a partial download when the update page opens ---------- */
var _updResumeHook=function(el){
try{
if(S.setPage==='gupdate'){
var saved=updDlGet();
if(saved&&!_dl)updDlStart(saved.v);
}
}catch(e){}
};
window._updAfter.push(_updResumeHook);

/* ---------- init ---------- */
try{if(typeof applyTheme==='function')applyTheme();}catch(e){}
})();
