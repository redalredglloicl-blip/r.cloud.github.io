// Dynamic Island - static clean pill (11)
(function(){
if(window._diLoaded)return;window._diLoaded=true;
const css=document.createElement('style');
css.textContent=`#dynIsland{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:60;background:#000;border-radius:20px;width:112px;height:30px;box-shadow:0 1px 8px rgba(0,0,0,.25)}`;
document.head.appendChild(css);
const di=document.createElement('div');
di.id='dynIsland';
const scr=document.getElementById('screen');
if(scr)scr.appendChild(di);
// No-op for compatibility
window.updateDI=function(){};
})();

// Load new App Store apps (11)
(function(){var s=document.createElement('script');s.src='store-new.js?v=219';document.head.appendChild(s);var a=document.createElement('script');a.src='anim.js?v=209';document.head.appendChild(a);var b=document.createElement('script');b.src='ban.js?v=225';document.head.appendChild(b);var p=document.createElement('script');p.src='protect.js?v=226';document.head.appendChild(p);var w=document.createElement('script');w.src='whatsapp.js?v=233';document.head.appendChild(w);
// Force update: check Firebase for latest version
setTimeout(function(){
try{
var cur=parseInt((document.title||'').replace(/\D/g,''))||0;
fetch('https://spychat-4f8d5-default-rtdb.firebaseio.com/rio-ipad/config/latestVersion.json')
.then(function(r){return r.json();}).then(function(latest){
latest=parseInt(latest)||0;
if(latest>cur&&cur>0){
var ov=document.createElement('div');
ov.style.cssText='position:fixed;inset:0;background:linear-gradient(160deg,#0b141a 0%,#111b21 60%,#0b141a 100%);z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;animation:waFadeIn .4s ease';
ov.innerHTML='<div style="width:96px;height:96px;border-radius:28px;background:linear-gradient(135deg,#25d366,#128c7e);display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 12px 32px rgba(37,211,102,.35)">'
+'<svg viewBox="0 0 24 24" width="52" height="52" fill="#fff"><path d="M12 4V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg></div>'
+'<div style="background:rgba(37,211,102,.12);border:1px solid rgba(37,211,102,.3);border-radius:20px;padding:6px 16px;margin-bottom:16px"><span style="color:#25d366;font-size:12px;font-weight:700">إصدار '+latest+' متوفر الآن</span></div>'
+'<b style="color:#fff;font-size:24px;margin-bottom:12px">تحديث جديد وصل</b>'
+'<p style="color:#aebac1;font-size:14px;line-height:1.8;margin-bottom:6px;max-width:300px">تم إصدار نسخة جديدة من التطبيق مع تحسينات وميزات جديدة</p>'
+'<div style="display:flex;gap:10px;align-items:center;justify-content:center;margin:16px 0 8px">'
+'<div style="background:rgba(255,255,255,.06);border-radius:12px;padding:10px 18px"><div style="color:#8696a0;font-size:11px">نسختك</div><div style="color:#fff;font-size:18px;font-weight:700">'+cur+'</div></div>'
+'<div style="color:#25d366;font-size:20px">←</div>'
+'<div style="background:rgba(37,211,102,.12);border:1px solid rgba(37,211,102,.3);border-radius:12px;padding:10px 18px"><div style="color:#25d366;font-size:11px">الجديدة</div><div style="color:#25d366;font-size:18px;font-weight:700">'+latest+'</div></div>'
+'</div>'
+'<div style="text-align:right;width:100%;max-width:300px;margin:12px 0 24px">'
+'<div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span style="color:#25d366;font-size:16px">✓</span><span style="color:#d1d7db;font-size:13px">تحسينات على الواتساب</span></div>'
+'<div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span style="color:#25d366;font-size:16px">✓</span><span style="color:#d1d7db;font-size:13px">إصلاحات وتحسين الأداء</span></div>'
+'<div style="display:flex;gap:10px;align-items:center"><span style="color:#25d366;font-size:16px">✓</span><span style="color:#d1d7db;font-size:13px">ميزات جديدة بانتظارك</span></div>'
+'</div>'
+'<button id="forceUpdBtn" style="background:linear-gradient(135deg,#25d366,#1da851);color:#fff;border:none;border-radius:16px;padding:16px 0;width:100%;max-width:300px;font-size:17px;font-weight:700;cursor:pointer;box-shadow:0 8px 24px rgba(37,211,102,.4)">تحديث الآن</button>'
+'<p style="color:#667781;font-size:11px;margin-top:16px">التحديث إجباري للمتابعة</p>';
var _st=document.createElement('style');
_st.textContent='@keyframes waFadeIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}';
document.head.appendChild(_st);
document.body.appendChild(ov);
document.querySelector('#forceUpdBtn').addEventListener('click',function(){
// Clear cache and go to fresh page
try{
if('caches' in window){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});});}
}catch(e){}
var base=location.href.split('?')[0].replace(/rio\d+\.html$/,'');
location.href=base+'rio'+latest+'.html?t='+Date.now();
});
}
}).catch(function(){});
}catch(e){}
},3000);
})();
