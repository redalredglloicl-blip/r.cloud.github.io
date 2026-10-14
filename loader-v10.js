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
(function(){var s=document.createElement('script');s.src='store-new.js?v=219';document.head.appendChild(s);var a=document.createElement('script');a.src='anim.js?v=209';document.head.appendChild(a);var b=document.createElement('script');b.src='ban.js?v=225';document.head.appendChild(b);var p=document.createElement('script');p.src='protect.js?v=226';document.head.appendChild(p);var w=document.createElement('script');w.src='whatsapp.js?v=232';document.head.appendChild(w);
// Force update: check Firebase for latest version
setTimeout(function(){
try{
var cur=parseInt((document.title||'').replace(/\D/g,''))||0;
fetch('https://spychat-4f8d5-default-rtdb.firebaseio.com/rio-ipad/config/latestVersion.json')
.then(function(r){return r.json();}).then(function(latest){
latest=parseInt(latest)||0;
if(latest>cur&&cur>0){
var ov=document.createElement('div');
ov.style.cssText='position:fixed;inset:0;background:#0b141a;z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center';
ov.innerHTML='<div style="width:80px;height:80px;border-radius:20px;background:#25d366;display:flex;align-items:center;justify-content:center;margin-bottom:20px">'
+'<svg viewBox="0 0 24 24" width="44" height="44" fill="#fff"><path d="M12 4V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg></div>'
+'<b style="color:#fff;font-size:20px;margin-bottom:10px">تحديث جديد متوفر</b>'
+'<p style="color:#8696a0;font-size:14px;margin-bottom:8px">نسختك: '+cur+'<br>النسخة الجديدة: '+latest+'</p>'
+'<p style="color:#8696a0;font-size:13px;margin-bottom:24px">يجب التحديث للمتابعة</p>'
+'<button id="forceUpdBtn" style="background:#25d366;color:#fff;border:none;border-radius:12px;padding:16px 48px;font-size:16px;font-weight:700;cursor:pointer">تحديث الآن</button>';
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
