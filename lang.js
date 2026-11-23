/* lang.js — English language for the Rio iPhone system (preview v.19+)
   Settings → General → Language & Region. System chrome switches to
   English (status bar numerals, lock date, home widget, App Library,
   Settings rows + titles, Software Update). App contents and deeper
   Settings sub-pages stay Arabic in this phase.
   Loaded by loader-v15 (preview only). */
(function(){
if(window._langLoaded)return;window._langLoaded=true;

function langGet(){try{return store.get('lang','ar')==='en'?'en':'ar';}catch(e){return 'ar'}}
window.__lang=langGet();
function isEn(){return window.__lang==='en'}
window.langIsEn=isEn;

/* ---------- dictionaries ---------- */
var ROWS_EN={
'نمط الطيران':'Airplane Mode','Wi-Fi':'Wi-Fi','بلوتوث':'Bluetooth','البيانات الخلوية':'Cellular',
'نقطة اتصال شخصية':'Personal Hotspot','البطارية':'Battery','VPN':'VPN',
'الإشعارات':'Notifications','الأصوات والحس اللمسي':'Sounds & Haptics','التركيز':'Focus',
'مدة استخدام الجهاز':'Screen Time','عام':'General','إمكانية الوصول':'Accessibility',
'الكاميرا':'Camera','مركز التحكم':'Control Center','الشاشة والسطوع':'Display & Brightness',
'الشاشة الرئيسية ومكتبة التطبيقات':'Home Screen & App Library','بحث':'Search','Siri':'Siri',
'خلفية الشاشة':'Wallpaper','تخصيص شاشة القفل':'Lock Screen','Face ID ورمز الدخول':'Face ID & Passcode',
'طوارئ SOS':'Emergency SOS','الخصوصية والأمان':'Privacy & Security','App Store':'App Store',
'Game Center':'Game Center','المحفظة وApple Pay':'Wallet & Apple Pay','كلمات السر':'Passwords',
'التطبيقات':'Apps','حول الجهاز':'About','تحديث البرنامج':'Software Update','سعة التخزين':'Storage',
'AirDrop':'AirDrop','التاريخ والوقت':'Date & Time','اللغة والمنطقة':'Language & Region',
'لوحة المفاتيح':'Keyboard','إعادة تعيين':'Reset','التواصل الاجتماعي':'Social',
'الترفيه':'Entertainment','الأدوات والإنتاجية':'Utilities & Productivity',
'لا توجد أحداث اليوم':'No events today','مشمس':'Sunny','غائم':'Cloudy','ماطر':'Rainy',
'عدم الإزعاج':'Do Not Disturb','الجدولة':'Schedule','تفعيل مجدول':'Scheduled',
'من':'From','إلى':'To','تطبيقات مكتومة أثناء التركيز':'Silenced apps during Focus',
'المظهر':'Appearance','السطوع':'Brightness','قفل تلقائي':'Auto-Lock','حجم النص':'Text Size',
'فاتح':'Light','داكن':'Dark','أبداً':'Never','أصغر':'Smaller','أكبر':'Larger',
'وضع النوم':'Sleep Focus','المؤقت':'Timer','المنبه':'Alarm','ساعة عريضة':'Bold clock',
'خلفية من صوري تتبدل':'Shuffle my photos wallpaper','ويدجت القفل':'Lock widgets',
'لون الساعة':'Clock color','سعة تخزين iPad':'iPad Storage','النظام iOS':'iOS System',
'بيانات النظام':'System Data','الصور':'Photos','الشبكة':'Wi-Fi Networks'
};
var TITLES_EN={
'عام':'General','تحديث البرنامج':'Software Update','اللغة والمنطقة':'Language & Region',
'سعة التخزين':'Storage','سعة تخزين iPad':'iPad Storage','AirDrop':'AirDrop',
'التاريخ والوقت':'Date & Time','لوحة المفاتيح':'Keyboard','إعادة تعيين':'Reset',
'الشاشة والسطوع':'Display & Brightness','التركيز':'Focus','مدة استخدام الجهاز':'Screen Time',
'بحث':'Search','Siri':'Siri','الكاميرا':'Camera','شاشة القفل':'Lock Screen',
'خلفية الشاشة':'Wallpaper','حول':'About','البطارية':'Battery','صحة البطارية':'Battery Health',
'الإشعارات':'Notifications','الأصوات والحس اللمسي':'Sounds & Haptics',
'إمكانية الوصول':'Accessibility','مركز التحكم':'Control Center',
'الشاشة الرئيسية ومكتبة التطبيقات':'Home Screen & App Library',
'Face ID ورمز الدخول':'Face ID & Passcode','طوارئ SOS':'Emergency SOS',
'الخصوصية والأمان':'Privacy & Security','المحفظة وApple Pay':'Wallet & Apple Pay',
'كلمات السر':'Passwords','التطبيقات':'Apps','مكتبة التطبيقات':'App Library'
};
var BACK_EN={'‹ الإعدادات':'‹ Settings','‹ عام':'‹ General','‹ البطارية':'‹ Battery','‹ الإعدادات العامة':'‹ Settings'};

/* ---------- apply / restore ---------- */
function langApplyStrings(){
try{
var scr=document.querySelector('#screen');if(!scr)return;
scr.classList.toggle('lang-en',isEn());
scr.dir=isEn()?'ltr':'rtl';
var sp=document.querySelector('#spotPill');if(sp)sp.textContent=isEn()?'Search':'بحث';
var ed=document.querySelector('#editDone');if(ed)ed.textContent=isEn()?'Done':'تم';
var sc=document.querySelector('#spotClose');if(sc)sc.textContent=isEn()?'Close':'إغلاق';
var si=document.querySelector('#spotInp');if(si)si.placeholder=isEn()?'Search apps…':'بحث في التطبيقات…';
document.querySelectorAll('#switcher div').forEach(function(d){
if(d.textContent.indexOf('اسحب البطاقة')>=0)d.textContent=isEn()?'Swipe the card up to close the app · Tap a card to go back to it':'اسحب البطاقة لفوك حتى تقتل التطبيق · دوس البطاقة حتى ترجع إلها';
});
}catch(e){}
}
function langRerender(){
try{if(typeof renderHome==='function')renderHome();}catch(e){}
try{if(typeof renderStatus==='function')renderStatus();}catch(e){}
try{if(typeof renderLockX==='function')renderLockX();}catch(e){}
try{if(window.S&&S.app==='settings'&&typeof appSettings==='function')appSettings(document.querySelector('#appBody'));}catch(e){}
}
function setLang(l,silent){
window.__lang=(l==='en')?'en':'ar';
try{store.set('lang',window.__lang);}catch(e){}
langApplyStrings();
langRerender();
if(!silent){try{if(typeof toast==='function')toast(window.__lang==='en'?'Language: English':'اللغة: العربية');}catch(e){}}
}
window.setLang=setLang;

/* ---------- Latin digits in English mode ---------- */
if(typeof window.arabNum==='function'&&!window._langArabWrapped){
window._langArabWrapped=true;
var _an=window.arabNum;
window.arabNum=function(n){if(isEn())return String(n);return _an(n);};
}

/* ---------- lock screen: English date + charging label ---------- */
if(typeof window.renderLockX==='function'&&!window._langLockWrapped){
window._langLockWrapped=true;
var _rlx=window.renderLockX;
window.renderLockX=function(){
_rlx();
try{
if(!isEn())return;
var ld=document.querySelector('#lockDate');
if(ld)ld.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
var lc=document.querySelector('#lockChg');
if(lc&&lc.style.display!=='none')lc.textContent=Math.round(S.batt.pct)+'% — Charging';
}catch(e){}
};
}

/* ---------- home: widget + library categories + calendar icon ---------- */
if(typeof window.renderHome==='function'&&!window._langHomeWrapped){
window._langHomeWrapped=true;
var _rh=window.renderHome;
window.renderHome=function(){
_rh();
try{
if(!isEn())return;
var w=document.querySelector('.homeWidget');
if(w){
var d=new Date();
w.querySelectorAll('div').forEach(function(x){
var t=x.textContent;
if(t&&['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'].includes(t.trim()))x.textContent=d.toLocaleDateString('en-US',{weekday:'long'});
if(t&&t.indexOf('لا توجد أحداث اليوم')>=0)x.textContent='No events today';
if(t&&t.indexOf('مشمس')>=0)x.textContent=t.replace('مشمس','Sunny').replace('البطارية','Battery');
});
}
document.querySelectorAll('.calD').forEach(function(x){
x.textContent=new Date().toLocaleDateString('en-US',{weekday:'short'});
});
document.querySelectorAll('#homeApps .setrow, #homeApps div').forEach(function(){});
/* App Library category titles */
var lib=document.querySelector('#homeApps');
if(lib){
lib.querySelectorAll('div').forEach(function(x){
if(x.children.length===0&&x.textContent){
var t=x.textContent.trim();
if(ROWS_EN[t])x.textContent=ROWS_EN[t];
}
});
}
langApplyStrings();
}catch(e){}
};
}

/* ---------- Settings rows + titles translation (runs after every render) ---------- */
function langTranslateSettings(el){
try{
if(!isEn())return;
el.querySelectorAll('.setrow').forEach(function(r){
var flex=r.querySelector('span');
if(!flex)return;
for(var i=0;i<flex.childNodes.length;i++){
var n=flex.childNodes[i];
if(n.nodeType===3){
var t=n.textContent.trim();
if(t&&ROWS_EN[t])n.textContent=' '+ROWS_EN[t];
}
}
});
var at=el.querySelector('.app-title');
if(at){var tt=at.textContent.trim();if(TITLES_EN[tt])at.textContent=TITLES_EN[tt];}
var bk=el.querySelector('#setBack');
if(bk){var bt=bk.textContent.trim();if(BACK_EN[bt])bk.textContent=BACK_EN[bt];}
}catch(e){}
}

/* ---------- Language & Region page ---------- */
function langRenderPage(el){
var cur=window.__lang;
el.innerHTML='<button class="back" id="setBack" style="margin-bottom:10px">‹ '+(isEn()?'General':'عام')+'</button>'+
'<div class="app-title" style="font-size:19px;font-weight:700;margin-bottom:10px">'+(isEn()?'Language & Region':'اللغة والمنطقة')+'</div>'+
'<div class="setgroup">'+
'<div class="setrow" data-langpick="ar" style="cursor:pointer"><span style="flex:1">العربية</span>'+(cur==='ar'?'<span style="color:#0a84ff;font-weight:700">✓ '+(isEn()?'Primary':'اللغة الأساسية')+'</span>':'')+'</div>'+
'<div class="setrow" data-langpick="en" style="cursor:pointer"><span style="flex:1">English</span>'+(cur==='en'?'<span style="color:#0a84ff;font-weight:700">✓ Primary</span>':'<span class="mut">'+(isEn()?'Secondary':'ثانوية')+'</span>')+'</div></div>'+
'<div class="setgroup">'+
'<div class="setrow"><span style="flex:1">'+(isEn()?'Region':'المنطقة')+'</span><span class="mut">'+(isEn()?'Iraq':'العراق')+'</span></div>'+
'<div class="setrow"><span style="flex:1">'+(isEn()?'Calendar':'التقويم')+'</span><span class="mut">'+(isEn()?'Gregorian':'الميلادي')+'</span></div></div>'+
'<p class="mut" style="font-size:12px;line-height:1.9;margin:6px 2px">'+(isEn()?'English switches the system: status bar, lock screen, home widget, App Library and Settings. App contents follow in the next update.':'الإنجليزية تبدّل النظام: شريط الحالة وشاشة القفل وودجت الرئيسية ومكتبة التطبيقات والإعدادات. محتويات التطبيقات تتبعها بالتحديث الجاي.')+'</p>';
var back=el.querySelector('#setBack');if(back)back.addEventListener('click',function(){try{S.setPage='general';appSettings(el);}catch(e){}});
el.querySelectorAll('[data-langpick]').forEach(function(r){r.addEventListener('click',function(){
setLang(r.dataset.langpick);
try{appSettings(el);}catch(e){}
});});
}
window.langRenderPage=langRenderPage;

/* ---------- hook into the Settings render chain ---------- */
window._updAfter=window._updAfter||[];
window._updAfter.push(function(el){
try{
var p=S.setPage;
if(p==='glang'){langRenderPage(el);return;}
langTranslateSettings(el);
}catch(e){}
});

/* ---------- init ---------- */
setTimeout(function(){
try{
langApplyStrings();
if(isEn())langRerender();
}catch(e){}
},600);
})();
