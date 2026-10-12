// Live Clock icon - safe version (Update 9.93)
(function(){
if(window._clockLoaded)return;window._clockLoaded=true;
function svg(){
 try{
  const d=new Date(),a=d.getHours()%12*30+d.getMinutes()*.5,b=d.getMinutes()*6+d.getSeconds()*.1,c=d.getSeconds()*6;
  return '<span class="ic" style="background:#fff;border-radius:22%;display:block;width:100%;height:100%"><svg viewBox="0 0 60 60" style="width:100%;height:100%;display:block"><circle cx="30" cy="30" r="29" fill="#fff"/><g stroke="#1c1c1e" stroke-linecap="round"><line x1="30" y1="30" x2="30" y2="17" stroke-width="3.5" transform="rotate('+a+' 30 30)"/><line x1="30" y1="30" x2="30" y2="11" stroke-width="2.5" transform="rotate('+b+' 30 30)"/></g><line x1="30" y1="34" x2="30" y2="10" stroke="#ff9f0a" stroke-width="1.5" stroke-linecap="round" transform="rotate('+c+' 30 30)"/></svg></span>';
 }catch(e){return null;}
}
function update(){
 try{
  const t=svg();if(!t)return;
  document.querySelectorAll('[data-app="clock"] .ic').forEach(function(el){
   const d=document.createElement('div');d.innerHTML=t;
   if(d.firstChild)el.replaceWith(d.firstChild);
  });
 }catch(e){}
}
// Update every second, but only if clock icons exist
setInterval(update,1000);
// Initial update after a short delay (let home render first)
setTimeout(update,2000);
})();
