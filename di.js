// Dynamic Island (Update 9.82)
(function(){
if(window._diLoaded)return;window._diLoaded=true;
const css=document.createElement('style');
css.textContent=`#dynIsland{position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:60;background:#000;border-radius:20px;min-width:110px;height:32px;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 12px;transition:all .35s;overflow:hidden}
#dynIsland.expanded{min-width:200px;height:44px;border-radius:24px}
#dynIsland .di-dot{width:8px;height:8px;border-radius:50%;display:none}
#dynIsland .di-dot.orange{display:block;background:#ff9f0a}
#dynIsland .di-dot.green{display:block;background:#30d158}
#dynIsland .di-music{display:none;align-items:center;gap:8px;color:#fff;font-size:12px}
#dynIsland.expanded .di-music{display:flex}
#dynIsland .di-wave{display:flex;align-items:center;gap:2px;height:16px}
#dynIsland .di-wave i{width:3px;background:#fff;border-radius:2px;animation:diW 1s infinite}
#dynIsland .di-wave i:nth-child(2){height:14px}
@keyframes diW{50%{transform:scaleY(1.4)}}`;
document.head.appendChild(css);
const di=document.createElement('div');
di.id='dynIsland';
di.innerHTML='<span class="di-dot" id="diOrange"></span><span class="di-dot" id="diGreen"></span><span class="di-music"><span class="di-wave"><i></i><i></i><i></i></span><span id="diSong"></span></span>';
document.getElementById('screen').appendChild(di);
// Reset recording on boot (should not persist)
try{if(S.set&&S.set.rec){S.set.rec=false;store.set('set',S.set);}}catch(e){}
window.updateDI=function(){
 const rec=S.set&&S.set.rec;
 const music=S.musicPlay;
 const cam=S._camActive;
 di.querySelector('#diOrange').className='di-dot'+(rec?' orange':'');
 di.querySelector('#diGreen').className='di-dot'+(cam?' green':'');
 di.classList.toggle('expanded',!!(music||rec));
 di.querySelector('#diSong').textContent=music?'Shape of You':'';
};
})();
