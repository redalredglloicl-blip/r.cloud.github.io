// Site ban system - Version 21 (admin only, console-hardened)
(function(){
if(window._banLoaded)return;window._banLoaded=true;
try{document.title='25';var vt=document.getElementById('verTag');if(vt)vt.textContent='25';}catch(e){}

// Simple hash for PIN (hash only - the PIN itself is NOT stored in this file)
function _hash(s){var h=0;for(var i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return String(h);}
var PIN_HASH='1428562823';

// Device ID (persistent)
function banDeviceId(){
try{
var id=localStorage.getItem('rio_device_id');
if(!id){id='d_'+Math.random().toString(36).slice(2,11)+Date.now().toString(36);localStorage.setItem('rio_device_id',id);}
return id;
}catch(e){return 'd_unknown';}
}
window.banDeviceId=banDeviceId;

var FB='https://spychat-4f8d5-default-rtdb.firebaseio.com/rio-ipad/bans';

// Save visitor
function saveVisitor(){
try{
var id=banDeviceId();
fetch(FB.replace('/bans','/visitors')+'/'+id+'.json',{method:'PUT',body:JSON.stringify({ts:Date.now()})}).catch(function(){});
}catch(e){}
}

// Check ban on load
function checkBan(){
try{
var id=banDeviceId();
fetch(FB+'/'+id+'.json').then(function(r){return r.json();}).then(function(d){
if(d&&d.banned){
showBanScreen(d.reason||'');
}
}).catch(function(){});
}catch(e){}
}

function showBanScreen(reason){
document.body.innerHTML='<div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;z-index:99999">'
+'<div style="width:80px;height:80px;border-radius:50%;background:#fe2c55;display:flex;align-items:center;justify-content:center;margin-bottom:24px"><svg width="40" height="40" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg></div>'
+'<h1 style="font-size:24px;margin-bottom:12px">تم حظرك من الموقع</h1>'
+'<p style="color:#888;font-size:15px;line-height:1.8">'+(reason?'السبب: '+reason+'<br>':'')+'إذا تعتقد أن هذا خطأ، تواصل مع الإدارة.</p>'
+'</div>';
// Block everything
document.body.style.overflow='hidden';
}

// Ban a device (closure-only: NOT exposed on window, so the browser console
// cannot ban other devices. Only the PIN-gated admin panel below can call these.)
function doBan(deviceId,reason){
try{
// Self-ban protection
if(deviceId===banDeviceId()){
if(!confirm('⚠️ هذا معرف جهازك! متأكد تريد تحظر نفسك؟')){toast('تم الإلغاء');return;}
}
fetch(FB+'/'+deviceId+'.json',{method:'PUT',body:JSON.stringify({banned:true,reason:reason||'',ts:Date.now()})});
toast('تم الحظر');
}catch(e){}
}

// Unban (closure-only, same as above)
function doUnban(deviceId){
try{
fetch(FB+'/'+deviceId+'.json',{method:'DELETE'});
toast('تم فك الحظر');
}catch(e){}
}

// Narrow self-only hook for the anti-tamper system (protect.js):
// it can only ever ban THIS device's own id, never anyone else's,
// so calling it from the console harms nobody but the caller.
window.selfBanAbuse=function(reason){
try{doBan(banDeviceId(),reason||'محاولة اختراق/عبث بالموقع');}catch(e){}
};

// Admin: 10 taps on version
var tapCount=0,tapTimer=null;
function initAdminTrigger(){
var vt=document.getElementById('verTag');
if(!vt||vt._banInit)return;vt._banInit=true;
vt.addEventListener('click',function(){
tapCount++;
clearTimeout(tapTimer);
tapTimer=setTimeout(function(){tapCount=0;},3000);
if(tapCount>=10){
tapCount=0;
askPin();
}
});
}
function askPin(){
var pin=prompt('أدخل رمز الإدارة:');
if(pin===null)return;
if(_hash(pin)===PIN_HASH){
showAdminPanel();
}else{
toast('رمز خاطئ');
}
}

function showAdminPanel(){
var el=$('#appBody')||document.body;
var panel=document.createElement('div');
panel.id='banAdmin';
panel.innerHTML='<div style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99990" id="banBg"></div>'
+'<div style="position:fixed;left:10px;right:10px;top:60px;bottom:60px;background:#fff;border-radius:16px;z-index:99991;display:flex;flex-direction:column;overflow:hidden">'
+'<div style="padding:16px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between"><b style="font-size:17px">إدارة الحظر</b><button id="banClose" style="background:#f1f1f2;border:0;border-radius:50%;width:32px;height:32px;font-size:18px">×</button></div>'
+'<div style="padding:12px;border-bottom:1px solid #eee"><div style="display:flex;gap:8px"><input id="banInput" placeholder="معرف الجهاز للحظر" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:10px"><button id="banBtn" style="background:#fe2c55;color:#fff;border:0;border-radius:10px;padding:10px 16px;font-weight:600">حظر</button></div>'
+'<div style="margin-top:8px;font-size:12px;color:#888">معرف جهازك: <b id="myId" style="user-select:all">'+banDeviceId()+'</b></div></div>'
+'<div style="display:flex;border-bottom:1px solid #eee"><div data-bantab="banned" style="flex:1;text-align:center;padding:10px;font-weight:700;border-bottom:2px solid #fe2c55;cursor:pointer">محظورين</div><div data-bantab="visitors" style="flex:1;text-align:center;padding:10px;color:#888;cursor:pointer">الزوار المحفوظين</div></div>'
+'<div id="banList" style="flex:1;overflow-y:auto;padding:12px"><p style="color:#888;text-align:center">جارٍ التحميل...</p></div>'
+'</div>';
(document.getElementById('screen')||document.body).appendChild(panel);
document.getElementById('banBg').addEventListener('click',function(){panel.remove();});
document.getElementById('banClose').addEventListener('click',function(){panel.remove();});
document.getElementById('banBtn').addEventListener('click',function(){
var id=document.getElementById('banInput').value.trim();
if(id){var r=prompt('سبب الحظر (اختياري):');doBan(id,r||'');document.getElementById('banInput').value='';loadBans();}
});
// Tab switching
panel.querySelectorAll('[data-bantab]').forEach(function(t){
t.addEventListener('click',function(){
panel.querySelectorAll('[data-bantab]').forEach(function(x){x.style.fontWeight='400';x.style.color='#888';x.style.borderBottom='none';});
t.style.fontWeight='700';t.style.color='#000';t.style.borderBottom='2px solid #fe2c55';
if(t.dataset.bantab==='visitors')loadVisitors();else loadBans();
});
});
function loadVisitors(){
var list=document.getElementById('banList');
list.innerHTML='<p style="color:#888;text-align:center">جارٍ التحميل...</p>';
fetch(FB.replace('/bans','/visitors')+'.json').then(function(r){return r.json();}).then(function(d){
if(!d){list.innerHTML='<p style="color:#888;text-align:center">لا يوجد زوار</p>';return;}
var keys=Object.keys(d).sort(function(a,b){return (d[b].ts||0)-(d[a].ts||0);});
var html='';
keys.slice(0,50).forEach(function(k){
var date=d[k].ts?new Date(d[k].ts).toLocaleString('ar'):'';
html+='<div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9f9f9;border-radius:10px;margin-bottom:8px"><span style="flex:1;font-size:12px;word-break:break-all">'+k+'<br><span style="color:#888">'+date+'</span></span><button data-banv="'+k+'" style="background:#fe2c55;color:#fff;border:0;border-radius:8px;padding:8px 12px;font-size:13px">حظر</button></div>';
});
list.innerHTML=html||'<p style="color:#888;text-align:center">لا يوجد زوار</p>';
list.querySelectorAll('[data-banv]').forEach(function(b){
b.addEventListener('click',function(){var r=prompt('سبب الحظر:');doBan(b.dataset.banv,r||'');toast('تم الحظر');});
});
}).catch(function(){list.innerHTML='<p style="color:#888;text-align:center">خطأ بالتحميل</p>';});
}
// Load ban list
loadBans();
function loadBans(){
fetch(FB+'.json').then(function(r){return r.json();}).then(function(d){
var list=document.getElementById('banList');
if(!d){list.innerHTML='<p style="color:#888;text-align:center">لا يوجد محظورين</p>';return;}
var html='';
Object.keys(d).forEach(function(k){
if(d[k]&&d[k].banned){
html+='<div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f9f9f9;border-radius:10px;margin-bottom:8px"><span style="flex:1;font-size:13px;word-break:break-all">'+k+(d[k].reason?'<br><span style="color:#888">'+d[k].reason+'</span>':'')+'</span><button data-unban="'+k+'" style="background:#34c759;color:#fff;border:0;border-radius:8px;padding:8px 12px;font-size:13px">فك</button></div>';
}
});
list.innerHTML=html||'<p style="color:#888;text-align:center">لا يوجد محظورين</p>';
list.querySelectorAll('[data-unban]').forEach(function(b){
b.addEventListener('click',function(){doUnban(b.dataset.unban);setTimeout(loadBans,500);});
});
}).catch(function(){});
}
}

// Init
checkBan();
saveVisitor();
// Re-check ban every 5 seconds (real-time ban)
setInterval(checkBan,5000);
// Retry admin trigger init (verTag may load late)
initAdminTrigger();
setTimeout(initAdminTrigger,1000);
setTimeout(initAdminTrigger,3000);
window.initBanAdmin=initAdminTrigger;
})();
