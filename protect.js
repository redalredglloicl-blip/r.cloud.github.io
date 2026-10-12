// Site Protection System - Version 21
(function(){
if(window._protectLoaded)return;window._protectLoaded=true;
try{document.title='22';var vt=document.getElementById('verTag');if(vt)vt.textContent='22';}catch(e){}

// ============ 1. Disable right-click / context menu ============
document.addEventListener('contextmenu',function(e){e.preventDefault();return false;});

// ============ 2. Disable text selection ============
try{
var st=document.createElement('style');
st.textContent='*{-webkit-user-select:none!important;-moz-user-select:none!important;user-select:none!important}input,textarea{ -webkit-user-select:text!important;user-select:text!important }';
document.head.appendChild(st);
}catch(e){}

// ============ 3. Block keyboard shortcuts (view source, save, devtools) ============
document.addEventListener('keydown',function(e){
var k=e.key.toLowerCase();
// F12
if(e.key==='F12'){e.preventDefault();return false;}
// Ctrl+U (view source), Ctrl+S (save), Ctrl+Shift+I/J/C (devtools)
if(e.ctrlKey||e.metaKey){
if(k==='u'||k==='s'){e.preventDefault();return false;}
if(e.shiftKey&&(k==='i'||k==='j'||k==='c')){e.preventDefault();onSuspicious('devtools-key');return false;}
}
});

// ============ 4. DevTools detection ============
var devtoolsOpen=false;
setInterval(function(){
try{
var wDiff=window.outerWidth-window.innerWidth;
var hDiff=window.outerHeight-window.innerHeight;
// DevTools typically adds >160px difference
if(wDiff>160||hDiff>160){
if(!devtoolsOpen){
devtoolsOpen=true;
onSuspicious('devtools-open');
}
}else{
devtoolsOpen=false;
}
}catch(e){}
},1000);

function onSuspicious(type){
// Log suspicious activity
try{
var id=(window.banDeviceId?banDeviceId():'unknown');
var key='rio_susp_'+id;
var count=parseInt(localStorage.getItem(key)||'0')+1;
localStorage.setItem(key,String(count));
// 3 strikes = auto-ban (self-only: selfBanAbuse can only ban this device's own id)
if(count>=3&&window.selfBanAbuse){
selfBanAbuse('محاولة اختراق/عبث بالموقع');
}
}catch(e){}
}

// ============ 5. Enhanced device fingerprint ============
function getFingerprint(){
try{
var fp=[];
// Screen
fp.push(screen.width+'x'+screen.height+'x'+screen.colorDepth);
// Timezone
fp.push(new Date().getTimezoneOffset());
// Language
fp.push(navigator.language||'');
// Platform
fp.push(navigator.platform||'');
// Hardware
fp.push(navigator.hardwareConcurrency||'');
// Touch
fp.push('ontouchstart' in window?'t':'f');
// Canvas fingerprint
try{
var c=document.createElement('canvas');
var ctx=c.getContext('2d');
ctx.textBaseline='top';ctx.font='14px Arial';
ctx.fillText('rio-fp-2026',2,2);
fp.push(c.toDataURL().length);
}catch(e){fp.push('nocanvas');}
var s=fp.join('|');
var h=0;for(var i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}
return 'fp_'+Math.abs(h).toString(36);
}catch(e){return 'fp_unknown';}
}
window.getFingerprint=getFingerprint;

// ============ 6. Block iframe embedding (clickjacking) ============
try{
if(window.top!==window.self){
document.body.innerHTML='<div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;z-index:99999"><h1>غير مسموح بالتضمين</h1></div>';
}
}catch(e){}

// ============ 7. Console warning ============
try{
console.log('%cتوقف!','color:red;font-size:40px;font-weight:bold');
console.log('%cهذه المنطقة للمطورين فقط. لصق أي كود هنا قد يعرض حسابك للخطر.','font-size:16px');
}catch(e){}

})();
