/* عالم ريو 🌍 — لعبة عالم جاهز مستورد + شخصية واقعية */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};

// ====== الإعدادات (رابط العالم يوضع هنا بعد البحث) ======
var WORLD_URL='https://static.poly.pizza/8164c856-b42f-4936-8b3f-c8d9cc75cde0.glb';
var WORLD_CREDIT='العالم: J-Toastie (CC-BY) عبر poly.pizza';
var CHAR_URL='https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Xbot.glb';
var GAME_VER='1.5'; // رقم الإصدار — يظهر بشاشة التحميل

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
// ====== خامة النوافذ لمباني الضواحي ======
function winTex(){var c=document.createElement('canvas');c.width=64;c.height=64;
  var x=c.getContext('2d');x.fillStyle='#9aa0a8';x.fillRect(0,0,64,64);
  x.fillStyle='#2b3f55';for(var r=0;r<4;r++)for(var q=0;q<4;q++)x.fillRect(6+q*15,6+r*15,9,9);
  var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
var WIN=winTex();
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
var groundTargets=[],colliders=[],clouds=[],suburbDots=[];
var traffic=[],peds=[],birds=[];
var baseYG=0,lifeSpawned=false;
var BOUNDS=740;

// ====== الضواحي: توسيع العالم حول المدينة المستوردة ======
function scaleUV(geo,sx,sy){
  var uv=geo.attributes.uv;
  for(var i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*sx,uv.getY(i)*sy);
}
function buildOutskirts(baseY){
  baseYG=baseY;
  var R0=195,R1=710;
  // أرضية شاسعة
  var gp=new THREE.Mesh(new THREE.PlaneGeometry(2200,2200),
    new THREE.MeshLambertMaterial({color:0x5f8f4e}));
  gp.rotation.x=-Math.PI/2;gp.position.y=baseY-0.08;gp.receiveShadow=true;
  worldG.add(gp);groundTargets.push(gp);
  var roadM=new THREE.MeshLambertMaterial({color:0x3a3a42});
  // طريق دائري
  var ringG=new THREE.RingGeometry(358,372,72);ringG.rotateX(-Math.PI/2);
  var ring=new THREE.Mesh(ringG,roadM);ring.position.y=baseY+0.02;ring.receiveShadow=true;worldG.add(ring);
  // طرق شعاعية
  for(var k=0;k<4;k++){
    var rg=new THREE.PlaneGeometry(15,R1-R0+80);rg.rotateX(-Math.PI/2);
    var rad=new THREE.Mesh(rg,roadM);
    var a=k*Math.PI/2,rr=(R0+R1)/2;
    rad.position.set(Math.sin(a)*rr,baseY+0.02,Math.cos(a)*rr);
    rad.rotation.y=a;rad.receiveShadow=true;worldG.add(rad);
  }
  // مباني الضواحي
  var bcols=[0xc9bfae,0xb8a894,0xd6cfc0,0xa89a88,0x9fb3c8,0xc4b49a];
  var placed=[];
  for(var b=0;b<60;b++){
    var ok=false,px=0,pz=0,tr=0;
    while(!ok&&tr<25){
      tr++;
      var aa=Math.random()*Math.PI*2,rad2=R0+20+Math.random()*(R1-R0-40);
      px=Math.cos(aa)*rad2;pz=Math.sin(aa)*rad2;
      ok=true;
      for(var j=0;j<placed.length;j++){
        if(Math.hypot(px-placed[j][0],pz-placed[j][1])<52){ok=false;break;}
      }
    }
    if(!ok)continue;
    placed.push([px,pz]);
    var w=14+Math.random()*14,d=14+Math.random()*14,h=10+Math.random()*30;
    var bg=new THREE.BoxGeometry(w,h,d);
    scaleUV(bg,Math.max(w,d)/7,h/7);
    var bm=new THREE.Mesh(bg,new THREE.MeshLambertMaterial({
      color:bcols[Math.floor(Math.random()*bcols.length)],map:WIN}));
    bm.position.set(px,baseY+h/2,pz);
    bm.rotation.y=(Math.random()<0.5?0:Math.PI/2);
    bm.castShadow=true;bm.receiveShadow=true;
    worldG.add(bm);groundTargets.push(bm);
    colliders.push({x0:px-w/2-0.5,x1:px+w/2+0.5,z0:pz-d/2-0.5,z1:pz+d/2+0.5});
    suburbDots.push([px,pz]);
  }
  // أشجار
  var trunkG=new THREE.CylinderGeometry(0.3,0.4,1.6,6);
  var trunkM=new THREE.MeshLambertMaterial({color:0x6b4a2e});
  var topG=new THREE.ConeGeometry(2.2,5.5,7);
  var topM=new THREE.MeshLambertMaterial({color:0x2f7a35});
  for(var t=0;t<110;t++){
    var ta=Math.random()*Math.PI*2,tr2=R0+10+Math.random()*(R1-R0);
    var tx=Math.cos(ta)*tr2,tz=Math.sin(ta)*tr2;
    var near=false;
    for(var j2=0;j2<placed.length;j2++){
      if(Math.hypot(tx-placed[j2][0],tz-placed[j2][1])<20){near=true;break;}
    }
    if(near)continue;
    var trk=new THREE.Mesh(trunkG,trunkM);trk.position.set(tx,baseY+0.8,tz);worldG.add(trk);
    var tp=new THREE.Mesh(topG,topM);tp.position.set(tx,baseY+4.2,tz);worldG.add(tp);
  }
  // أعمدة إنارة على الطريق الدائري
  var poleG=new THREE.CylinderGeometry(0.18,0.24,7,6);
  var poleM=new THREE.MeshLambertMaterial({color:0x3a3f45});
  var lampM=new THREE.MeshBasicMaterial({color:0xffe9a8});
  for(var l=0;l<16;l++){
    var la=l/16*Math.PI*2;
    var lx=Math.cos(la)*365,lz=Math.sin(la)*365;
    var pole=new THREE.Mesh(poleG,poleM);pole.position.set(lx,baseY+3.5,lz);worldG.add(pole);
    var lamp=new THREE.Mesh(new THREE.SphereGeometry(0.55,8,6),lampM);
    lamp.position.set(lx,baseY+7.1,lz);worldG.add(lamp);
  }
  // جبال بعيدة للأفق
  var mM=new THREE.MeshLambertMaterial({color:0x6f8272});
  for(var mI=0;mI<10;mI++){
    var ma=mI/10*Math.PI*2+Math.random()*0.4;
    var mr=1050+Math.random()*250,mh=160+Math.random()*140,mw=150+Math.random()*120;
    var mn=new THREE.Mesh(new THREE.ConeGeometry(mw,mh,7),mM);
    mn.position.set(Math.cos(ma)*mr,mh/2-10,Math.sin(ma)*mr);
    worldG.add(mn);
  }
  // غيوم متحركة
  var cM=new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:0.85});
  for(var cI=0;cI<7;cI++){
    var cg=new THREE.Group();
    for(var sI=0;sI<4;sI++){
      var s=new THREE.Mesh(new THREE.SphereGeometry(9+Math.random()*9,10,8),cM);
      s.position.set(sI*13-20+Math.random()*6,Math.random()*4,Math.random()*8-4);
      s.scale.y=0.55;cg.add(s);
    }
    cg.position.set(Math.random()*1600-800,130+Math.random()*70,Math.random()*1600-800);
    cg.userData.sp=1.5+Math.random()*2;
    worldG.add(cg);clouds.push(cg);
  }
}
// ====== تتبع التنزيل (عداد احترافي) ======
var DL={w:0,c:0,wT:12.26*1048576,cT:2.93*1048576};
function dlUpdate(stage,full){
  var done=DL.w+DL.c,total=DL.wT+DL.cT;
  var p=full?1:Math.min(1,done/total);
  $('bar').style.width=(p*100)+'%';
  $('pct').textContent=Math.round(p*100)+'%';
  $('dlDone').textContent=(Math.min(done,total)/1048576).toFixed(1);
  $('dlTotal').textContent=(total/1048576).toFixed(1);
  $('dlLeft').textContent=(Math.max(0,total-done)/1048576).toFixed(1);
  if(stage)$('loadMsg').innerHTML=stage;
}
// ====== تنزيل مجزّأ: قطع 2MB بإعادة محاولة مستقلة لكل قطعة ======
var CHUNK=2*1048576;
function dlSingle(url,onp,knownSize){
  return new Promise(function(res,rej){
    var tries=0;
    function attempt(){
      tries++;
      var xhr=new XMLHttpRequest();
      xhr.open('GET',url,true);xhr.responseType='arraybuffer';xhr.timeout=90000;
      xhr.onprogress=function(e){onp(e.loaded,e.lengthComputable?e.total:(knownSize||0));};
      xhr.onload=function(){
        if(xhr.status>=200&&xhr.status<300)res(xhr.response);
        else if(tries<4)attempt();else rej(new Error('HTTP '+xhr.status));
      };
      xhr.onerror=function(){if(tries<4)attempt();else rej(new Error('net'));};
      xhr.ontimeout=function(){if(tries<4)attempt();else rej(new Error('timeout'));};
      xhr.send();
    }
    attempt();
  });
}
function dlChunked(url,onp,size){
  var n=Math.ceil(size/CHUNK),parts=new Array(n),prog=new Array(n).fill(0);
  function sum(){var s=0;for(var k=0;k<n;k++)s+=prog[k];return s;}
  function getChunk(i){
    return new Promise(function(res,rej){
      var tries=0;
      function attempt(){
        tries++;
        var xhr=new XMLHttpRequest();
        xhr.open('GET',url,true);xhr.responseType='arraybuffer';xhr.timeout=60000;
        xhr.setRequestHeader('Range','bytes='+(i*CHUNK)+'-'+Math.min((i+1)*CHUNK-1,size-1));
        xhr.onprogress=function(e){prog[i]=e.loaded;onp(sum(),size);};
        xhr.onload=function(){
          if(xhr.status===206){
            parts[i]=xhr.response;prog[i]=xhr.response.byteLength;onp(sum(),size);res();
          }
          else if(tries<5){prog[i]=0;attempt();}
          else rej(new Error('HTTP '+xhr.status));
        };
        xhr.onerror=function(){if(tries<5){prog[i]=0;attempt();}else rej(new Error('net'));};
        xhr.ontimeout=function(){if(tries<5){prog[i]=0;attempt();}else rej(new Error('timeout'));};
        xhr.send();
      }
      attempt();
    });
  }
  var idx=0;
  function worker(){
    if(idx>=n)return Promise.resolve();
    var i=idx++;
    return getChunk(i).then(worker);
  }
  var workers=[],W=Math.min(3,n);
  for(var w=0;w<W;w++)workers.push(worker());
  return Promise.all(workers).then(function(){
    var buf=new Uint8Array(size),off=0;
    for(var j=0;j<n;j++){
      if(!parts[j])throw new Error('missing chunk '+j);
      buf.set(new Uint8Array(parts[j]),off);off+=parts[j].byteLength;
    }
    return buf.buffer;
  });
}
function dlFile(url,onp){
  // فحص سريع: هل يدعم الخادم التحميل المجزأ؟
  return new Promise(function(res,rej){
    var px=new XMLHttpRequest();
    px.open('GET',url,true);px.responseType='arraybuffer';px.timeout=25000;
    px.setRequestHeader('Range','bytes=0-1');
    px.onload=function(){
      if(px.status===206){
        var cr=px.getResponseHeader('Content-Range')||'';
        var size=parseInt(cr.split('/')[1],10);
        if(size>0){dlChunked(url,onp,size).then(res,rej);return;}
      }
      dlSingle(url,onp,0).then(res,rej);
    };
    px.onerror=function(){dlSingle(url,onp,0).then(res,rej);};
    px.ontimeout=function(){dlSingle(url,onp,0).then(res,rej);};
    px.send();
  });
}
function loadError(msg){
  $('loadMsg').innerHTML='❌ '+msg;
  $('retryBtn').style.display='inline-block';
  $('dlTitle').textContent='فشل التحميل';
}
// ====== الحياة: سيارات ومشاة وطيور ======
var carBodyG=new THREE.BoxGeometry(2,0.8,4.4);
var carCabG=new THREE.BoxGeometry(1.7,0.7,2.2);
var carWheelG=new THREE.CylinderGeometry(0.42,0.42,0.35,10);carWheelG.rotateZ(Math.PI/2);
var wheelM=new THREE.MeshLambertMaterial({color:0x161616});
var glassM=new THREE.MeshLambertMaterial({color:0x1c2733});
function buildCarMesh(color){
  var g=new THREE.Group();
  var body=new THREE.Mesh(carBodyG,new THREE.MeshLambertMaterial({color:color}));
  body.position.y=0.75;body.castShadow=true;g.add(body);
  var cab=new THREE.Mesh(carCabG,glassM);cab.position.set(0,1.4,-0.2);cab.castShadow=true;g.add(cab);
  [[-1,1.4],[1,1.4],[-1,-1.4],[1,-1.4]].forEach(function(p){
    var w=new THREE.Mesh(carWheelG,wheelM);w.position.set(p[0],0.42,p[1]);g.add(w);
  });
  var hl=new THREE.Mesh(new THREE.BoxGeometry(1.5,0.22,0.1),
    new THREE.MeshBasicMaterial({color:0xfff6c0}));hl.position.set(0,0.8,2.22);g.add(hl);
  return g;
}
var legG=new THREE.BoxGeometry(0.18,0.75,0.2);legG.translate(0,-0.32,0);
var armG=new THREE.BoxGeometry(0.13,0.6,0.15);armG.translate(0,-0.26,0);
var headG=new THREE.SphereGeometry(0.22,10,8);
var torsoG=new THREE.BoxGeometry(0.5,0.65,0.3);
var skinM=new THREE.MeshLambertMaterial({color:0xd9a066});
function buildPed(shirtColor){
  var g=new THREE.Group();
  var shirt=new THREE.MeshLambertMaterial({color:shirtColor});
  var pants=new THREE.MeshLambertMaterial({color:0x33415c});
  var head=new THREE.Mesh(headG,skinM);head.position.y=1.62;head.castShadow=true;g.add(head);
  var torso=new THREE.Mesh(torsoG,shirt);torso.position.y=1.15;torso.castShadow=true;g.add(torso);
  var legL=new THREE.Mesh(legG,pants);legL.position.set(-0.13,0.8,0);g.add(legL);
  var legR=new THREE.Mesh(legG,pants);legR.position.set(0.13,0.8,0);g.add(legR);
  var armL=new THREE.Mesh(armG,shirt);armL.position.set(-0.34,1.42,0);g.add(armL);
  var armR=new THREE.Mesh(armG,shirt);armR.position.set(0.34,1.42,0);g.add(armR);
  g.userData={legL:legL,legR:legR,armL:armL,armR:armR};
  return g;
}
function spawnLife(){
  if(lifeSpawned)return;lifeSpawned=true;
  // --- سيارات ---
  var cols=[0xd23c2e,0x2e6fd2,0xf2c12e,0x2ed27a,0xe8e8e8,0x7a4fd2,0xff8c42,0x3a3f45];
  for(var i=0;i<9;i++){
    var cm=buildCarMesh(cols[i%cols.length]);
    worldG.add(cm);
    if(i<6)traffic.push({m:cm,mode:'ring',a:Math.random()*Math.PI*2,dir:i%2?1:-1,sp:11+Math.random()*7,lane:i%2?4:-4});
    else traffic.push({m:cm,mode:'radial',road:(i-6)%4,t:Math.random()*1200-600,rdir:i%2?1:-1,sp:12+Math.random()*6,lane:(i%2?3.5:-3.5)});
  }
  // --- مشاة على الرصيف ---
  var shirts=[0xd24a4a,0x4a7ad2,0x4ad27a,0xd2b44a,0x9a4ad2,0x4ad2c8,0xe8e8e8,0xd27a4a];
  for(var j=0;j<9;j++){
    var pm=buildPed(shirts[j%shirts.length]);
    worldG.add(pm);
    peds.push({m:pm,a:Math.random()*Math.PI*2,dir:j%2?1:-1,sp:1.3+Math.random()*1.3,
      r:j%2?379:351,ph:Math.random()*6});
  }
  // --- طيور ---
  var bM=new THREE.MeshBasicMaterial({color:0x2c2c38,side:THREE.DoubleSide});
  var wingG=new THREE.PlaneGeometry(1.7,0.55);
  for(var k=0;k<6;k++){
    var bg=new THREE.Group();
    var wl=new THREE.Mesh(wingG,bM);wl.position.x=-0.8;bg.add(wl);
    var wr=new THREE.Mesh(wingG,bM);wr.position.x=0.8;bg.add(wr);
    scene.add(bg);
    birds.push({g:bg,wl:wl,wr:wr,a:Math.random()*Math.PI*2,r:140+Math.random()*320,
      h:55+Math.random()*90,sp:0.12+Math.random()*0.15,ph:Math.random()*6});
  }
}
function stepTraffic(dt){
  for(var i=0;i<traffic.length;i++){var c=traffic[i],m=c.m;
    if(c.mode==='ring'){
      c.a+=c.dir*c.sp/365*dt;
      var r=365+c.lane;
      m.position.set(Math.cos(c.a)*r,baseYG,Math.sin(c.a)*r);
      m.rotation.y=Math.atan2(-Math.sin(c.a)*c.dir,Math.cos(c.a)*c.dir);
    }else{
      c.t+=c.rdir*c.sp*dt;
      if(c.t>680){c.t=680;c.rdir=-1;}
      if(c.t<-680){c.t=-680;c.rdir=1;}
      var a2=c.road*Math.PI/2;
      // إزاحة جانبية بسيطة عن وسط الطريق
      var ox=Math.cos(a2)*c.lane,oz=-Math.sin(a2)*c.lane;
      m.position.set(Math.sin(a2)*c.t+ox,baseYG,Math.cos(a2)*c.t+oz);
      m.rotation.y=Math.atan2(Math.sin(a2)*c.rdir,Math.cos(a2)*c.rdir);
    }
  }
}
function stepPeds(dt){
  for(var i=0;i<peds.length;i++){var c=peds[i],m=c.m;
    c.a+=c.dir*c.sp/c.r*dt;
    c.ph+=dt*c.sp*3.4;
    var sw=Math.sin(c.ph);
    m.position.set(Math.cos(c.a)*c.r,baseYG+Math.abs(sw)*0.05,Math.sin(c.a)*c.r);
    m.rotation.y=Math.atan2(-Math.sin(c.a)*c.dir,Math.cos(c.a)*c.dir);
    var u=m.userData;
    u.legL.rotation.x=sw*0.55;u.legR.rotation.x=-sw*0.55;
    u.armL.rotation.x=-sw*0.4;u.armR.rotation.x=sw*0.4;
  }
}
function stepBirds(dt){
  var t=performance.now()*0.012;
  for(var i=0;i<birds.length;i++){var b=birds[i];
    b.a+=b.sp*dt;
    b.g.position.set(Math.cos(b.a)*b.r,b.h+Math.sin(b.a*2+i)*5,Math.sin(b.a)*b.r);
    b.g.rotation.y=-b.a;
    var f=Math.sin(t+b.ph)*0.55;
    b.wl.rotation.z=f;b.wr.rotation.z=-f;
  }
}
// ====== بدء التحميل: الملفان معاً بالتوازي ======
function boot(){
  $('retryBtn').style.display='none';
  DL.w=0;DL.c=0;
  dlUpdate('🌍 جاري تنزيل الموارد...');
  var wP=dlFile(WORLD_URL,function(l,t){DL.w=l;if(t)DL.wT=t;dlUpdate('🌍 تنزيل العالم...');});
  var cP=dlFile(CHAR_URL,function(l,t){DL.c=l;if(t)DL.cT=t;dlUpdate('🧍 تنزيل الشخصية...');});
  Promise.all([wP,cP]).then(function(rs){
    var loader=new THREE.GLTFLoader();
    dlUpdate('🔨 بناء العالم... <small>(قد يأخذ ثواني)</small>');
    setTimeout(function(){
      try{
        loader.parse(rs[0],'',function(glb){
          try{
            onWorldLoaded(glb);
            dlUpdate('🔨 تجهيز الشخصية...');
            setTimeout(function(){
              try{
                loader.parse(rs[1],'',function(glb2){
                  try{
                    onCharLoaded(glb2);
                    dlUpdate('✅ اكتمل التنزيل!',true);
                    setTimeout(startGame,600);
                  }catch(e){loadError('فشل تجهيز الشخصية');}
                },function(e){loadError('فشل معالجة ملف الشخصية');});
              }catch(e){loadError('فشل معالجة ملف الشخصية');}
            },60);
          }catch(e){console.error('onWorldLoaded:',e);loadError('فشل بناء العالم');}
        },function(e){loadError('فشل معالجة ملف العالم');});
      }catch(e){console.error('parse world:',e);loadError('فشل معالجة ملف العالم');}
    },80);
  }).catch(function(e){
    loadError('تعذر تنزيل الموارد — تحقق من الاتصال بالإنترنت');
  });
}
// ====== بناء العالم بعد التنزيل ======
function onWorldLoaded(glb){
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
  groundTargets.push(w);
  // بناء الضواحي حول المدينة (توسيع العالم)
  buildOutskirts(worldBox.min.y);
  // ظل الشمس يتبع اللاعب (يُحدّث كل إطار)
  sun.shadow.camera.left=-70;sun.shadow.camera.right=70;
  sun.shadow.camera.top=70;sun.shadow.camera.bottom=-70;
  sun.shadow.camera.far=600;sun.shadow.camera.updateProjectionMatrix();
}

// ====== تجهيز الشخصية بعد التنزيل ======
function onCharLoaded(glb){
  var m=glb.scene;
  m.traverse(function(o){if(o.isMesh){o.castShadow=true;}});
  charG.add(m);
  mixer=new THREE.AnimationMixer(m);
  (glb.animations||[]).forEach(function(a){
    anims[a.name]=mixer.clipAction(a);
  });
  // نقطة البداية: ابحث عن أرض منخفضة قرب الوسط (تجنّب أسطح المباني)
  var c=new THREE.Vector3();worldBox.getCenter(c);
  var bx=c.x,bz=c.z,bg=groundAt(bx,bz);
  for(var a=0;a<10;a++){
    var nx=c.x+Math.cos(a/10*Math.PI*2)*28,nz=c.z+Math.sin(a/10*Math.PI*2)*28;
    var ng=groundAt(nx,nz);
    if(ng<bg-1&&ng>-40){bg=ng;bx=nx;bz=nz;}
  }
  P.x=bx;P.z=bz;
  P.y=(bg>-40?bg:0)+0.02;
  playAnim('idle');
}

// ====== ارتفاع الأرض (فوق الأهداف الأرضية فقط) ======
function groundAt(x,z){
  rayc.set(new THREE.Vector3(x,600,z),downV);
  var hits=rayc.intersectObjects(groundTargets,true);
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
  // حدود العالم الموسّع
  P.x=Math.max(-BOUNDS,Math.min(BOUNDS,P.x));
  P.z=Math.max(-BOUNDS,Math.min(BOUNDS,P.z));
  // تصادم مع مباني الضواحي (دفع خارج الصندوق)
  for(var ci=0;ci<colliders.length;ci++){
    var cb=colliders[ci];
    if(P.x>cb.x0-0.7&&P.x<cb.x1+0.7&&P.z>cb.z0-0.7&&P.z<cb.z1+0.7){
      var dxl=P.x-(cb.x0-0.7),dxr=(cb.x1+0.7)-P.x;
      var dzl=P.z-(cb.z0-0.7),dzr=(cb.z1+0.7)-P.z;
      var mn=Math.min(dxl,dxr,dzl,dzr);
      if(mn===dxl)P.x=cb.x0-0.7;else if(mn===dxr)P.x=cb.x1+0.7;
      else if(mn===dzl)P.z=cb.z0-0.7;else P.z=cb.z1+0.7;
    }
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
  P.moving=moving;P.run=wantRun;
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
  // توسع مجال الرؤية عند الركض
  var tf=(P.moving&&P.run)?68:60;
  if(Math.abs(camera.fov-tf)>0.05){
    camera.fov+=(tf-camera.fov)*Math.min(1,dt*5);
    camera.updateProjectionMatrix();
  }
}

// ====== الخريطة المصغرة ======
var mmapT=0;
function drawMap(dt){
  mmapT+=dt;if(mmapT<0.4)return;mmapT=0;
  var cv=$('mmap');if(!cv||!started)return;
  var x=cv.getContext('2d'),W=cv.width,cx=W/2,sc=(W/2-6)/BOUNDS;
  x.clearRect(0,0,W,W);
  x.fillStyle='rgba(10,20,35,0.9)';
  x.beginPath();x.arc(cx,cx,cx-2,0,7);x.fill();
  x.save();
  x.beginPath();x.arc(cx,cx,cx-2,0,7);x.clip();
  // مباني الضواحي
  x.fillStyle='#5a7a9a';
  for(var i=0;i<suburbDots.length;i++){
    x.fillRect(cx+suburbDots[i][0]*sc-1.5,cx+suburbDots[i][1]*sc-1.5,3,3);
  }
  // وسط المدينة
  x.fillStyle='#4fc3f7';
  x.fillRect(cx-8,cx-8,16,16);
  // اللاعب
  var px=cx+P.x*sc,pz=cx+P.z*sc;
  x.save();x.translate(px,pz);x.rotate(-P.hd+Math.PI);
  x.fillStyle='#fff';
  x.beginPath();x.moveTo(0,-6);x.lineTo(4,4);x.lineTo(-4,4);x.closePath();x.fill();
  x.restore();x.restore();
}

// ====== الحلقة ======
var started=false;
function loop(){
  requestAnimationFrame(loop);
  var dt=Math.min(clock.getDelta(),0.05);
  stepPlayer(dt);stepCam(dt);
  stepTraffic(dt);stepPeds(dt);stepBirds(dt);
  // الشمس وظلالها تتبع اللاعب
  sun.position.set(P.x+55,P.y+95,P.z+38);
  sun.target.position.set(P.x,P.y,P.z);
  sun.target.updateMatrixWorld();
  // الغيوم تنجرف
  for(var i=0;i<clouds.length;i++){
    var c=clouds[i];
    c.position.x+=c.userData.sp*dt;
    if(c.position.x>950)c.position.x=-950;
  }
  drawMap(dt);
  renderer.render(scene,camera);
}
function startGame(){
  if(started)return;started=true;
  $('load').style.display='none';
  $('hud').style.display='block';
  $('credit').textContent=WORLD_CREDIT;
  setupTouch();
  spawnLife();
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
  dlUpdate('❌ تعذر تحميل مكتبة GLTF',true);
}else{
  $('retryBtn').onclick=function(){boot();};
  boot();
}
})();
