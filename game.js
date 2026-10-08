/* عالم ريو 🌍 — لعبة عالم جاهز مستورد + شخصية واقعية */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};

// ====== الإعدادات (رابط العالم يوضع هنا بعد البحث) ======
var WORLD_URL='https://static.poly.pizza/8164c856-b42f-4936-8b3f-c8d9cc75cde0.glb';
var WORLD_CREDIT='العالم: J-Toastie (CC-BY) عبر poly.pizza';
var CHAR_URL='https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Xbot.glb';

// ====== المشهد ======
var scene,camera,renderer,clock,mixer;
var worldG=new THREE.Group(), charG=new THREE.Group();
scene=new THREE.Scene();
scene.background=new THREE.Color(0x87b5e0);
scene.fog=new THREE.Fog(0x9fc3e8,80,700);
camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,3000);
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputEncoding=THREE.sRGBEncoding;
$('game').appendChild(renderer.domElement);
clock=new THREE.Clock();
scene.add(worldG);scene.add(charG);
addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

// ====== السماء والإضاءة ======
(function sky(){
  var c=document.createElement('canvas');c.width=4;c.height=256;
  var x=c.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);
  gr.addColorStop(0,'#3d7ac2');gr.addColorStop(0.55,'#8fc0ea');gr.addColorStop(0.8,'#cfe8f7');gr.addColorStop(1,'#e8f4fb');
  x.fillStyle=gr;x.fillRect(0,0,4,256);
  var tex=new THREE.CanvasTexture(c);
  var dome=new THREE.Mesh(new THREE.SphereGeometry(1400,24,16),
    new THREE.MeshBasicMaterial({map:tex,side:THREE.BackSide,fog:false}));
  scene.add(dome);
})();
var hemi=new THREE.HemisphereLight(0xcfe5ff,0x6a7a5a,0.85);scene.add(hemi);
var sun=new THREE.DirectionalLight(0xfff1d6,1.15);
sun.position.set(120,190,70);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);
sun.shadow.bias=-0.0004;
scene.add(sun);scene.add(sun.target);

// ====== اللاعب ======
var P={x:0,y:0,z:0,vy:0,hd:0,speed:0,ground:0,onGround:true};
var anims={},curAnim=null;
function playAnim(name){
  if(curAnim===name||!anims[name])return;
  var from=curAnim?anims[curAnim]:null,to=anims[name];
  if(from)from.fadeOut(0.18);
  to.reset().fadeIn(0.18).play();
  curAnim=name;
}

// ====== الإدخال ======
var input={f:0,b:0,l:0,r:0,run:0,jump:0};
addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w')input.f=1;
  if(k==='arrowdown'||k==='s')input.b=1;
  if(k==='arrowleft'||k==='a')input.l=1;
  if(k==='arrowright'||k==='d')input.r=1;
  if(k==='shift')input.run=1;
  if(k===' '){input.jump=1;e.preventDefault();}
});
addEventListener('keyup',function(e){
  var k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w')input.f=0;
  if(k==='arrowdown'||k==='s')input.b=0;
  if(k==='arrowleft'||k==='a')input.l=0;
  if(k==='arrowright'||k==='d')input.r=0;
  if(k==='shift')input.run=0;
  if(k===' ')input.jump=0;
});
// الكاميرا بالسحب
var camYaw=Math.PI,camPitch=0.32,camDist=7,dragging=false,lx=0,ly=0;
var cv=renderer.domElement;
cv.addEventListener('mousedown',function(e){dragging=true;lx=e.clientX;ly=e.clientY;});
addEventListener('mousemove',function(e){
  if(!dragging)return;
  camYaw-=(e.clientX-lx)*0.005;camPitch+=(e.clientY-ly)*0.004;
  camPitch=Math.max(0.05,Math.min(1.2,camPitch));lx=e.clientX;ly=e.clientY;
});
addEventListener('mouseup',function(){dragging=false;});
cv.addEventListener('wheel',function(e){camDist=Math.max(3.5,Math.min(16,camDist+e.deltaY*0.01));},{passive:true});
// لمس: سحب للكاميرا
var joy={x:0,y:0,id:null},joyCX=0,joyCY=0,camT={id:null,x:0,y:0};
function setupTouch(){
  if(!('ontouchstart'in window))return;
  $('touch').style.display='block';
  var base=$('joy'),knob=$('knob');
  function bpos(){var r=base.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2,r.width/2];}
  base.addEventListener('touchstart',function(e){
    e.preventDefault();var t=e.changedTouches[0];joy.id=t.identifier;
  },{passive:false});
  addEventListener('touchmove',function(e){
    for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];
      if(t.identifier===joy.id){
        var p=bpos(),dx=t.clientX-p[0],dy=t.clientY-p[1],m=Math.hypot(dx,dy),mx=p[2];
        if(m>mx){dx*=mx/m;dy*=mx/m;}
        joy.x=dx/mx;joy.y=dy/mx;
        knob.style.transform='translate('+dx+'px,'+dy+'px)';
      }else if(t.identifier===camT.id){
        camYaw-=(t.clientX-camT.x)*0.007;camPitch+=(t.clientY-camT.y)*0.005;
        camPitch=Math.max(0.05,Math.min(1.2,camPitch));camT.x=t.clientX;camT.y=t.clientY;
      }
    }
  },{passive:false});
  addEventListener('touchend',function(e){
    for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];
      if(t.identifier===joy.id){joy.id=null;joy.x=0;joy.y=0;knob.style.transform='translate(0,0)';}
      if(t.identifier===camT.id)camT.id=null;
    }
  });
  cv.addEventListener('touchstart',function(e){
    for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];
      if(t.clientX>innerWidth*0.4&&camT.id===null){camT.id=t.identifier;camT.x=t.clientX;camT.y=t.clientY;}
    }
  },{passive:true});
  $('jumpBtn').addEventListener('touchstart',function(e){e.preventDefault();input.jump=1;},{passive:false});
  $('jumpBtn').addEventListener('touchend',function(){input.jump=0;});
}

// ====== تحميل العالم ======
var worldBox=null,rayc=new THREE.Raycaster(),downV=new THREE.Vector3(0,-1,0);
function setLoad(p,t){$('bar').style.width=Math.round(p*100)+'%';if(t)$('loadMsg').innerHTML=t;}
function loadWorld(){
  setLoad(0.05,'🌍 جاري تحميل العالم...');
  var loader=new THREE.GLTFLoader();
  loader.load(WORLD_URL,function(glb){
    var w=glb.scene;
    // قياس العالم وتوحيد حجمه
    worldBox=new THREE.Box3().setFromObject(w);
    var size=new THREE.Vector3();worldBox.getSize(size);
    var maxDim=Math.max(size.x,size.z);
    var s=maxDim>0?320/maxDim:1;
    if(s!==1){w.scale.setScalar(s);worldBox=new THREE.Box3().setFromObject(w);}
    // توسيط العالم على الأصل
    var c=new THREE.Vector3();worldBox.getCenter(c);
    w.position.x-=c.x;w.position.z-=c.z;
    worldBox=new THREE.Box3().setFromObject(w);
    w.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
    worldG.add(w);
    // ظل الشمس يغطي العالم
    var sz=new THREE.Vector3();worldBox.getSize(sz);
    var ext=Math.max(sz.x,sz.z)/2;
    sun.shadow.camera.left=-ext;sun.shadow.camera.right=ext;
    sun.shadow.camera.top=ext;sun.shadow.camera.bottom=-ext;
    sun.shadow.camera.far=800;sun.shadow.camera.updateProjectionMatrix();
    sun.position.set(ext*0.6,ext*1.1,ext*0.4);
    sun.target.position.set(0,0,0);
    setLoad(0.55,'🧍 جاري تحميل الشخصية...');
    loadChar();
  },function(xhr){
    if(xhr.total)setLoad(0.05+0.45*(xhr.loaded/xhr.total),'🌍 جاري تحميل العالم... '+Math.round(xhr.loaded/1024)+'KB');
  },function(err){
    setLoad(0,'❌ فشل تحميل العالم — تحقق من الاتصال وحدّث الصفحة');
  });
}

// ====== تحميل الشخصية ======
function loadChar(){
  var loader=new THREE.GLTFLoader();
  loader.load(CHAR_URL,function(glb){
    var m=glb.scene;
    m.traverse(function(o){if(o.isMesh){o.castShadow=true;}});
    charG.add(m);
    mixer=new THREE.AnimationMixer(m);
    (glb.animations||[]).forEach(function(a){
      anims[a.name]=mixer.clipAction(a);
    });
    // نقطة البداية: وسط العالم
    var c=new THREE.Vector3();worldBox.getCenter(c);
    P.x=c.x;P.z=c.z+10;
    P.y=groundAt(P.x,P.z)+0.02;
    playAnim('idle');
    setLoad(1,'✅ جاهز!');
    setTimeout(startGame,400);
  },function(xhr){
    if(xhr.total)setLoad(0.55+0.4*(xhr.loaded/xhr.total),'🧍 جاري تحميل الشخصية...');
  },function(err){
    setLoad(0,'❌ فشل تحميل الشخصية — حدّث الصفحة');
  });
}

// ====== ارتفاع الأرض ======
function groundAt(x,z){
  rayc.set(new THREE.Vector3(x,500,z),downV);
  var hits=rayc.intersectObject(worldG,true);
  return hits.length?hits[0].point.y:-50;
}

// ====== تحديث اللاعب ======
function stepPlayer(dt){
  // اتجاه الحركة نسبة لزاوية الكاميرا
  var ix=(input.r?1:0)-(input.l?1:0)+joy.x;
  var iz=(input.b?1:0)-(input.f?1:0)+joy.y;
  // iz موجب = للخلف (عصا للأسفل)
  var moving=Math.hypot(ix,iz)>0.15;
  var wantRun=input.run||('ontouchstart'in window&&Math.hypot(joy.x,joy.y)>0.85);
  var maxSp=moving?(wantRun?9:4.2):0;
  P.speed+=(maxSp-P.speed)*Math.min(1,dt*8);
  if(moving){
    var ang=camYaw+Math.PI-Math.atan2(ix,-iz);
    // تدوير ناعم نحو الاتجاه
    var d=ang-P.hd;
    while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;
    P.hd+=d*Math.min(1,dt*10);
    P.x+=Math.sin(P.hd)*P.speed*dt;
    P.z+=Math.cos(P.hd)*P.speed*dt;
  }
  // حدود العالم
  if(worldBox){
    var m=2;
    P.x=Math.max(worldBox.min.x+m,Math.min(worldBox.max.x-m,P.x));
    P.z=Math.max(worldBox.min.z+m,Math.min(worldBox.max.z-m,P.z));
  }
  // الجاذبية والقفز
  var g=groundAt(P.x,P.z);
  if(g<-40)g=P.y; // خارج العالم: ثبّت
  if(P.onGround&&input.jump&&P.speed<20){P.vy=7;P.onGround=false;input.jump=0;}
  if(!P.onGround){
    P.vy-=22*dt;P.y+=P.vy*dt;
    if(P.y<=g){P.y=g;P.vy=0;P.onGround=true;}
  }else{
    P.y+=(g-P.y)*Math.min(1,dt*14);
    if(Math.abs(P.y-g)<0.05)P.y=g;
  }
  charG.position.set(P.x,P.y,P.z);
  charG.rotation.y=P.hd;
  // الأنيميشن حسب السرعة
  if(!P.onGround)playAnim('idle');
  else if(P.speed>5.5)playAnim('run');
  else if(P.speed>0.6)playAnim('walk');
  else playAnim('idle');
  if(mixer)mixer.update(dt);
}

// ====== الكاميرا ======
function stepCam(dt){
  var tx=P.x+Math.sin(camYaw)*Math.cos(camPitch)*camDist;
  var tz=P.z+Math.cos(camYaw)*Math.cos(camPitch)*camDist;
  var ty=P.y+1.6+Math.sin(camPitch)*camDist;
  // تجنب دخول الكاميرا تحت الأرض
  var gg=groundAt(tx,tz);if(gg>-40&&ty<gg+0.6)ty=gg+0.6;
  var k=1-Math.pow(0.0001,dt);
  camera.position.x+=(tx-camera.position.x)*k;
  camera.position.y+=(ty-camera.position.y)*k;
  camera.position.z+=(tz-camera.position.z)*k;
  camera.lookAt(P.x,P.y+1.7,P.z);
}

// ====== الحلقة ======
var started=false;
function loop(){
  requestAnimationFrame(loop);
  var dt=Math.min(clock.getDelta(),0.05);
  stepPlayer(dt);stepCam(dt);
  renderer.render(scene,camera);
}
function startGame(){
  if(started)return;started=true;
  $('load').style.display='none';
  $('hud').style.display='block';
  $('credit').textContent=WORLD_CREDIT;
  setupTouch();
  clock.getDelta();
  loop();
  showMsg('🎮 امشِ بالأسهم / WASD — اسحب لتدوير الكاميرا');
}
var msgT=null;
function showMsg(t){
  var m=$('msg');m.innerHTML=t;m.style.display='block';
  clearTimeout(msgT);msgT=setTimeout(function(){m.style.display='none';},5000);
}

// ====== انطلاق ======
if(typeof THREE.GLTFLoader==='undefined'){
  setLoad(0,'❌ تعذر تحميل مكتبة GLTF');
}else{
  loadWorld();
}
})();
