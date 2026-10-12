// Dynamic Island - static clean pill (Update 9.86)
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

// Load new App Store apps (Update 9.95)
(function(){var s=document.createElement('script');s.src='store-new.js?v=208';document.head.appendChild(s);var a=document.createElement('script');a.src='anim.js?v=209';document.head.appendChild(a);var t=document.createElement('script');t.src='tiktok.js?v=215';document.head.appendChild(t);})();
