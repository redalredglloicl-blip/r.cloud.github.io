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
(function(){var s=document.createElement('script');s.src='store-new.js?v=219';document.head.appendChild(s);var a=document.createElement('script');a.src='anim.js?v=209';document.head.appendChild(a);var b=document.createElement('script');b.src='ban.js?v=225';document.head.appendChild(b);var p=document.createElement('script');p.src='protect.js?v=226';document.head.appendChild(p);})();
