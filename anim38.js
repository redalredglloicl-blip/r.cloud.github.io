// Improved app open/close animations - 12 — DRAFT (preview-only, NOT published)
// Merges pad37.js dock behaviour into the anim37 override, which currently
// drops it: dock icon pop (1.65x) + sibling nudge on open, bigger landing
// bounce (1.28x) + sibling settle on close. Also unifies the morph corner
// radius to the icon's real radius (14px: .app .ic is 13px, #dock .ic 14px)
// — anim37 used 15px on open but 19px on close, so the window landed
// rounder than the icon it shrank into.
// Durations kept at anim37's proven values (open .46s / close .42s, no
// window fade on close) per Reda's 2026-10-12 order (Update 9.96).
// Shipped to preview 2026-11-23 via loader-v12.js (new filename —
// Pages CDN ignores ?v=). Reda tests on his iPhone, «تمام» → live.
// + zIndex leak fixed (dock icon kept zIndex 30 after close).
(function(){
if(window._animLoaded)return;window._animLoaded=true;

// Version bump
try{document.title='36';var vt=document.getElementById('verTag');if(vt)vt.textContent='v.18';}catch(e){}

window.showAppWin=function(fromEl){
const win=$('#appWin');if(S._from&&S._from!==fromEl&&S._from.style){S._from.style.opacity='';S._from.style.transform='';S._from.style.zIndex=''}S._from=fromEl||null;const tok=(S._anim=(S._anim||0)+1);
win.style.opacity='';win.style.borderRadius='';
win.classList.add('open');document.body.classList.add('appopen');syncPill();
$('#screen').classList.add('appzoom');
const scr=$('#screen').getBoundingClientRect();
// Dock detection: real iOS animation only for dock apps (from pad37.js)
const isDockIcon=fromEl&&fromEl.closest&&fromEl.closest('#dock');
if(isDockIcon){
  // Phase 1: tapped icon pops big, siblings nudge away (real iOS)
  const dockEl=fromEl.closest('#dock');
  const allDock=Array.from(dockEl.querySelectorAll('[data-app]'));
  const tappedWrap=fromEl.closest('[data-app]');
  const tappedIdx=allDock.indexOf(tappedWrap);
  fromEl.style.transition='transform .22s '+IOS_SPRING;
  fromEl.style.transform='scale(1.65)';
  fromEl.style.zIndex='30';
  allDock.forEach((d,i)=>{
    if(i===tappedIdx)return;
    const dir=i<tappedIdx?-1:1,push=Math.max(5,15-Math.abs(i-tappedIdx)*4);
    d.style.transition='transform .22s '+IOS_SPRING;
    d.style.transform='translateX('+(dir*push)+'px) scale(.93)';
  });
  // Siblings spring back after the pop
  setTimeout(()=>{if(S._anim!==tok)return;allDock.forEach((d,i)=>{if(i===tappedIdx)return;d.style.transition='transform .45s '+IOS_SPRING;d.style.transform='';});},320);
}
const r=_iconRect(fromEl);
if(fromEl&&fromEl.style){
  if(isDockIcon){
    // Dock: keep icon visible big briefly, then fade as window takes over
    setTimeout(()=>{if(S._anim!==tok||!fromEl.style)return;fromEl.style.transition='opacity .16s ease';fromEl.style.opacity='0';},200);
  }else{
    fromEl.style.transition='opacity .28s ease,transform .28s ease';fromEl.style.opacity='0';fromEl.style.transform='scale(1.12)';
  }
}
const hasIcon=r&&r.width>=8&&r.right>scr.left&&r.left<scr.right&&r.top<scr.bottom&&r.bottom>scr.top;
win.style.transformOrigin='0 0';win.style.overflow='hidden';win.style.borderRadius='';win.style.boxShadow='';
if(hasIcon){
win.style.transition='none';win.style.opacity='1';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(4)+','+((r.height/scr.height)).toFixed(4)+')';
win.style.clipPath='inset(0 round '+((14*scr.width/Math.max(1,r.width)).toFixed(0))+'px)';
win.getBoundingClientRect();
win.style.transition='transform .46s '+IOS_SPRING+',clip-path .46s '+IOS_SPRING;
win.style.transform='translate(0px,0px) scale(1,1)';
win.style.clipPath='inset(0 round 0px)';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.clipPath='';win.style.transformOrigin=''},530);
}else{
win.style.transition='none';win.style.opacity='0';win.style.transform='scale(.94)';
win.getBoundingClientRect();
win.style.transition='opacity .25s ease,transform .42s '+IOS_SPRING;
win.style.opacity='1';win.style.transform='none';
setTimeout(()=>{if(S._anim!==tok)return;win.style.transition='';win.style.transform='';win.style.opacity=''},460);
}
};

window.closeApp=function(){try{window.closeGptDrawer&&window.closeGptDrawer()}catch(e){}
S._camActive=false;try{updateDI()}catch(e){}
appHeadReset();
clearInterval(S.poll);
const sw=$('#switcher');if(sw.classList.contains('open'))dismissSw();
const win=$('#appWin');if(!win.classList.contains('open')){S.app=null;return}
snapCur();
const tok=(S._anim=(S._anim||0)+1);
S.app=null;stopCam();disarmHome();$('#screen').classList.remove('appzoom');
const back=(S._from&&document.body.contains(S._from))?S._from:null;
const scr=$('#screen').getBoundingClientRect();let r=back?_iconRect(back):null;
if(back&&back.style){back.style.transition='opacity .36s ease,transform .36s ease';back.style.opacity='';back.style.transform=''}
if(!r||r.width<8||r.right<scr.left||r.left>scr.right||r.top>scr.bottom)r={left:scr.left+scr.width/2-26,top:scr.bottom-130,width:52,height:52};
win.getBoundingClientRect();
win.style.transformOrigin='0 0';
win.style.transition='transform .42s '+IOS_EASE+',clip-path .42s '+IOS_EASE;
win.style.clipPath='inset(0 round '+((14*scr.width/Math.max(1,r.width)).toFixed(0))+'px)';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(3)+','+((r.height/scr.height)).toFixed(3)+')';
setTimeout(()=>{if(S._anim!==tok)return;
win.classList.remove('open');document.body.classList.remove('appopen');$('#screen').classList.remove('appzoom');syncPill();if(S._from&&S._from.style){S._from.style.opacity='';S._from.style.transform='';S._from.style.zIndex=''};win.style.transition='';win.style.clipPath='';win.style.transform='';win.style.opacity='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin='';S._from=null;
const land=back&&(back.closest?back.closest('.app'):null);
const isDockLand=back&&back.closest&&back.closest('#dock');
if(land&&land.animate){
  if(isDockLand){
    // Dock landing: bigger bounce + sibling settle (real iOS, from pad37.js)
    land.animate([{transform:'scale(1)'},{transform:'scale(1.28)'},{transform:'scale(1)'}],{duration:320,easing:'cubic-bezier(.30,1.4,.36,1)'});
    const dockEl=back.closest('#dock');
    if(dockEl){
      const allDock=Array.from(dockEl.querySelectorAll('[data-app]'));
      const tappedIdx=allDock.indexOf(back.closest('[data-app]'));
      allDock.forEach((d,i)=>{
        if(i===tappedIdx||!d.animate)return;
        const dir=i<tappedIdx?-1:1;
        d.animate([{transform:'translateX(0)'},{transform:'translateX('+(dir*7)+'px)'},{transform:'translateX(0)'}],{duration:320,easing:'ease-out'});
      });
    }
  }else{
    land.animate([{transform:'scale(1)'},{transform:'scale(1.09)'},{transform:'scale(1)'}],{duration:200,easing:'ease-out'});
  }
}
},480);
};
})();
