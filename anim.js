// Improved app open/close animations - 11
// Overrides showAppWin/closeApp with iPhone-like timing, no transparency on close
(function(){
if(window._animLoaded)return;window._animLoaded=true;

// Version bump
try{document.title='25';var vt=document.getElementById('verTag');if(vt)vt.textContent='25';}catch(e){}

window.showAppWin=function(fromEl){
const win=$('#appWin');if(S._from&&S._from!==fromEl&&S._from.style){S._from.style.opacity='';S._from.style.transform=''}S._from=fromEl||null;const tok=(S._anim=(S._anim||0)+1);
win.style.opacity='';win.style.borderRadius='';
win.classList.add('open');document.body.classList.add('appopen');syncPill();
$('#screen').classList.add('appzoom');
const scr=$('#screen').getBoundingClientRect();
const r=_iconRect(fromEl);
if(fromEl&&fromEl.style){fromEl.style.transition='opacity .28s ease,transform .28s ease';fromEl.style.opacity='0';fromEl.style.transform='scale(1.12)'}
const hasIcon=r&&r.width>=8&&r.right>scr.left&&r.left<scr.right&&r.top<scr.bottom&&r.bottom>scr.top;
win.style.transformOrigin='0 0';win.style.overflow='hidden';win.style.borderRadius='';win.style.boxShadow='';
if(hasIcon){
win.style.transition='none';win.style.opacity='1';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(4)+','+((r.height/scr.height)).toFixed(4)+')';
win.style.clipPath='inset(0 round '+((15*scr.width/Math.max(1,r.width)).toFixed(0))+'px)';
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
win.style.clipPath='inset(0 round '+((19*scr.width/Math.max(1,r.width)).toFixed(0))+'px)';
win.style.transform='translate('+((r.left-scr.left)).toFixed(1)+'px,'+((r.top-scr.top)).toFixed(1)+'px) scale('+((r.width/scr.width)).toFixed(3)+','+((r.height/scr.height)).toFixed(3)+')';
setTimeout(()=>{if(S._anim!==tok)return;
win.classList.remove('open');document.body.classList.remove('appopen');$('#screen').classList.remove('appzoom');syncPill();if(S._from&&S._from.style){S._from.style.opacity='';S._from.style.transform=''};win.style.transition='';win.style.clipPath='';win.style.transform='';win.style.opacity='';win.style.borderRadius='';win.style.boxShadow='';win.style.transformOrigin='';S._from=null;
const land=back&&(back.closest?back.closest('.app'):null);if(land&&land.animate)land.animate([{transform:'scale(1)'},{transform:'scale(1.09)'},{transform:'scale(1)'}],{duration:200,easing:'ease-out'})},480);
};
})();
