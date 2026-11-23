// Camera — real camera (preview-only via loader-v12 until Reda says «تمام»)
// Uses the global camStream + stopCam() from pad.js; captures go to S.photos (Photos app).
(function(){
if(window._camLoaded)return;window._camLoaded=true;
var facing='environment';
var flashOn=false;
var busy=false;

function camStopAll(){
  try{if(window._camWatch){clearInterval(window._camWatch);window._camWatch=null;}}catch(e){}
  try{stopCam();}catch(e){}
}

function renderThumb(){
  var th=document.getElementById('camThumb');
  if(!th)return;
  var p=(S.photos&&S.photos[0])||'';
  if(p){th.innerHTML='<img src="'+p+'" style="width:100%;height:100%;object-fit:cover">';}
  else{th.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="9" cy="10" r="1.8" fill="#fff"/><path d="M4 18l5-5 4 4 3-3 4 4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';}
}

function showErr(kind){
  var msg=document.getElementById('camMsg');
  if(!msg)return;
  var t=kind==='nosupport'?'المتصفح ما يدعم الكاميرا':kind==='nocam'?'ما لگينا كاميرا بهذا الجهاز':'الكاميرا مغلقة';
  var s=kind==='nosupport'?'جرّب من سفاري على الآيفون':kind==='nocam'?'':'اسمح بالوصول للكاميرا من إعدادات سفاري ثم ارجع';
  msg.style.display='flex';
  msg.innerHTML='<div style="font-size:16px;font-weight:700">'+t+'</div>'+(s?'<div style="font-size:13px;opacity:.7;margin-top:8px;line-height:1.8">'+s+'</div>':'')+'<button id="camRetry" style="margin-top:18px;background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:14px;padding:11px 22px;font-size:14px;font-weight:700">إعادة المحاولة</button>';
  var r=document.getElementById('camRetry');
  if(r)r.addEventListener('click',function(){startCam();});
}

function startCam(){
  var vid=document.getElementById('camVid');
  var msg=document.getElementById('camMsg');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){showErr('nosupport');return;}
  if(msg){msg.innerHTML='<div style="font-size:16px;font-weight:700">الكاميرا تجهز…</div><div style="font-size:13px;opacity:.7;margin-top:8px">اسمح بالوصول للكاميرا حتى تشتغل</div>';msg.style.display='flex';}
  navigator.mediaDevices.getUserMedia({video:{facingMode:facing},audio:false}).then(function(st){
    camStream=st;
    if(vid){vid.srcObject=st;vid.style.transform=(facing==='user')?'scaleX(-1)':'';}
    if(msg)msg.style.display='none';
    try{if(window._camWatch)clearInterval(window._camWatch);}catch(e){}
    window._camWatch=setInterval(function(){if(S.app!=='camera'){camStopAll();}},1000);
  }).catch(function(err){
    showErr(err&&err.name==='NotAllowedError'?'denied':(err&&err.name==='NotFoundError'?'nocam':'denied'));
  });
}

function capture(){
  if(busy)return;
  var vid=document.getElementById('camVid');
  if(!vid||!vid.videoWidth||!camStream)return;
  busy=true;
  var fx=document.getElementById('camFx');
  if(flashOn&&fx){fx.style.transition='none';fx.style.opacity='1';void fx.offsetWidth;fx.style.transition='opacity .35s ease';fx.style.opacity='0';}
  try{
    var vw=vid.videoWidth,vh=vid.videoHeight;
    var sc=Math.min(1,1080/Math.max(vw,vh));
    var cv=document.createElement('canvas');
    cv.width=Math.round(vw*sc);cv.height=Math.round(vh*sc);
    var cx=cv.getContext('2d');
    if(facing==='user'){cx.translate(cv.width,0);cx.scale(-1,1);}
    cx.drawImage(vid,0,0,cv.width,cv.height);
    var url=cv.toDataURL('image/jpeg',0.82);
    S.photos=S.photos||[];
    S.photos.unshift(url);
    if(S.photos.length>12)S.photos.pop();
    try{store.set('photos',S.photos);}catch(e){}
    renderThumb();
    try{if(navigator.vibrate)navigator.vibrate(10);}catch(e){}
  }catch(e){}
  setTimeout(function(){busy=false;},350);
}

window.appCamera=function(el){
  camStopAll();
  var root=document.createElement('div');
  root.id='camRoot';
  root.style.cssText='position:absolute;inset:0;background:#000;overflow:hidden;direction:rtl';
  root.innerHTML=
  '<style>#camShutter:active,#camThumb:active,#camFlip:active,#camBack:active,#camFlash:active{transform:scale(.93)}</style>'
  +'<video id="camVid" autoplay playsinline muted style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000"></video>'
  +'<div id="camFx" style="position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .35s ease"></div>'
  +'<div style="position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;z-index:5">'
  +'<button id="camBack" style="width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.35);border:none;display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 5l-7 7 7 7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
  +'<div style="color:#fff;font-size:15px;font-weight:700;text-shadow:0 1px 6px rgba(0,0,0,.5)">صورة</div>'
  +'<button id="camFlash" style="width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.35);border:none;display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="21" height="21"><path id="camBolt" d="M13 2 5 13h5l-1 9 8-11h-5z" fill="#fff" opacity=".55"/></svg></button>'
  +'</div>'
  +'<div id="camMsg" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px;z-index:4"><div style="font-size:16px;font-weight:700">الكاميرا تجهز…</div><div style="font-size:13px;opacity:.7;margin-top:8px">اسمح بالوصول للكاميرا حتى تشتغل</div></div>'
  +'<div style="position:absolute;bottom:0;left:0;right:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:18px 22px 26px;z-index:5">'
  +'<button id="camThumb" style="justify-self:start;width:46px;height:46px;border-radius:10px;overflow:hidden;border:1.5px solid rgba(255,255,255,.85);background:rgba(255,255,255,.12);padding:0;display:flex;align-items:center;justify-content:center"></button>'
  +'<button id="camShutter" style="justify-self:center;width:74px;height:74px;border-radius:50%;background:transparent;border:4px solid #fff;padding:0;display:flex;align-items:center;justify-content:center"><span style="display:block;width:60px;height:60px;border-radius:50%;background:#fff"></span></button>'
  +'<button id="camFlip" style="justify-self:end;width:46px;height:46px;border-radius:50%;background:rgba(0,0,0,.35);border:none;display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 12a8 8 0 1 1-2.3-5.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M20 3v4h-4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
  +'</div>';
  el.innerHTML='';
  el.appendChild(root);
  renderThumb();
  var back=document.getElementById('camBack');
  if(back)back.addEventListener('click',function(){camStopAll();try{closeApp();}catch(e){}});
  var fl=document.getElementById('camFlash');
  if(fl)fl.addEventListener('click',function(){
    flashOn=!flashOn;
    var bolt=document.getElementById('camBolt');
    if(bolt){bolt.setAttribute('fill',flashOn?'#ffd60a':'#fff');bolt.setAttribute('opacity',flashOn?'1':'.55');}
  });
  var sh=document.getElementById('camShutter');
  if(sh)sh.addEventListener('click',function(){capture();});
  var fp=document.getElementById('camFlip');
  if(fp)fp.addEventListener('click',function(){facing=(facing==='environment')?'user':'environment';camStopAll();startCam();});
  var th=document.getElementById('camThumb');
  if(th)th.addEventListener('click',function(){try{openApp('photos');}catch(e){}});
  startCam();
};
})();
