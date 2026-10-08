/* عالم ريو v2.0 — عالم واحد متناسق بمقياس بشري حقيقي */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};

// ====== الإعدادات ======
var WORLD_URL='https://static.poly.pizza/8164c856-b42f-4936-8b3f-c8d9cc75cde0.glb';
var WORLD_CREDIT='العالم: J-Toastie (CC-BY) عبر poly.pizza';
var CHAR_URL='https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Xbot.glb';
var GAME_VER='2.0';

// ====== المشهد ======
var scene,camera,renderer,clock,mixer;
var worldG=new THREE.Group(), charG=new THREE.Group();
scene=new THREE.Scene();
scene.background=new THREE.Color(0x87b5e0);
scene.fog=new THREE.Fog(0x9fc3e8,60,520);
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
sun.position.set(60,95,38);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);
sun.shadow.bias=-0.0004;
sun.shadow.camera.left=-70;sun.shadow.camera.right=70;
sun.shadow.camera.top=70;sun.shadow.camera.bottom=-70;
sun.shadow.camera.far=600;sun.shadow.camera.updateProjectionMatrix();
scene.add(sun);scene.add(sun.target);

// ====== اللاعب ======
var P={x:0,y:0,z:0,vy:0,hd:0,speed:0,ground:0,onGround:true,moving:false,run:false};
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
var joy={x:0,y:0,id:null},camT={id:null,x:0,y:0};
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

// ====== تتبع التنزيل ======
var DL={w:0,c:0,wT:11.7*1048576,cT:2.8*1048576};
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

// ====== تنزيل مجزّأ ======
var CHUNK=2*1048576;
function dlSingle(url,onp){
  return new Promise(function(res,rej){
    var tries=0;
    function attempt(){
      tries++;
      var xhr=new XMLHttpRequest();
      xhr.open('GET',url,true);xhr.responseType='arraybuffer';xhr.timeout=90000;
      xhr.onprogress=function(e){onp(e.loaded,e.lengthComputable?e.total:0);};
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
      dlSingle(url,onp).then(res,rej);
    };
    px.onerror=function(){dlSingle(url,onp).then(res,rej);};
    px.ontimeout=function(){dlSingle(url,onp).then(res,rej);};
    px.send();
  });
}
function loadError(msg){
  $('loadMsg').innerHTML='❌ '+msg;
  $('retryBtn').style.display='inline-block';
  $('dlTitle').textContent='فشل التحميل';
}

// ====== حالة العالم ======
var worldBox=null,dioramaG=null;
var groundTargets=[],colliders=[],clouds=[];
var roadRuns=[],roadY=0,baseYG=0;
var traffic=[],peds=[],birds=[],lifeSpawned=false;
var WB={x0:-60,x1:60,z0:-70,z1:70};
var rayc=new THREE.Raycaster(),downV=new THREE.Vector3(0,-1,0);

function objName(o){
  return ((o.name||'')+' '+(o.userData&&o.userData.name||'')).toLowerCase();
}

// ====== قياس العالم للمقياس البشري (1.75م) ======
function humanScale(w){
  w.updateMatrixWorld(true);
  var amn=new THREE.Vector3(1e9,1e9,1e9),amx=new THREE.Vector3(-1e9,-1e9,-1e9),found=false;
  w.traverse(function(o){
    if(!o.isMesh)return;
    var nm=objName(o);
    if(nm.indexOf('adventurer')>=0||nm.indexOf('basehuman')>=0){
      var b=new THREE.Box3().setFromObject(o);
      amn.min(b.min);amx.max(b.max);found=true;
    }
  });
  var s=1;
  if(found&&(amx.y-amn.y)>0.1)s=1.75/(amx.y-amn.y);
  w.scale.setScalar(s);
  w.updateMatrixWorld(true);
  return s;
}

// ====== اكتشاف الطرق من أسماء العقد ======
function detectRoads(){
  var tiles=[];
  dioramaG.traverse(function(o){
    if(!o.isMesh)return;
    var nm=objName(o);
    if(nm.indexOf('road')>=0){
      var b=new THREE.Box3().setFromObject(o);
      var c=new THREE.Vector3();b.getCenter(c);
      tiles.push({x:c.x,z:c.z});
      if(b.max.y>roadY)roadY=b.max.y;
    }
  });
  var runs=[];
  var hGroups={};
  tiles.forEach(function(t){var k=Math.round(t.z/4);(hGroups[k]=hGroups[k]||[]).push(t);});
  Object.keys(hGroups).forEach(function(k){var g=hGroups[k];
    if(g.length>=3){var xs=g.map(function(t){return t.x;});
      runs.push({ax:'x',fixed:g[0].z,min:Math.min.apply(null,xs)-3,max:Math.max.apply(null,xs)+3});}});
  var vGroups={};
  tiles.forEach(function(t){var k=Math.round(t.x/4);(vGroups[k]=vGroups[k]||[]).push(t);});
  Object.keys(vGroups).forEach(function(k){var g=vGroups[k];
    if(g.length>=3){var zs=g.map(function(t){return t.z;});
      runs.push({ax:'z',fixed:g[0].x,min:Math.min.apply(null,zs)-3,max:Math.max.apply(null,zs)+3});}});
  roadRuns=runs;
}

// ====== تصادم تلقائي من مجسمات العالم ======
function extractColliders(){
  dioramaG.traverse(function(o){
    if(!o.isMesh)return;
    var nm=objName(o);
    if(nm.indexOf('road')>=0||nm.indexOf('ground')>=0||nm.indexOf('sidewalk')>=0||
       nm.indexOf('adventurer')>=0||nm.indexOf('basehuman')>=0||nm.indexOf('backpack')>=0)return;
    var b=new THREE.Box3().setFromObject(o);
    var sx=b.max.x-b.min.x,sy=b.max.y-b.min.y,sz=b.max.z-b.min.z;
    if(sy>2.0&&sx*sz>2.5){
      colliders.push({x0:b.min.x-0.3,x1:b.max.x+0.3,z0:b.min.z-0.3,z1:b.max.z+0.3});
    }
  });
}

// ====== الطبيعة حول المدينة (متناسقة: بدون مبانٍ) ======
function buildNature(baseY){
  baseYG=baseY;
  var gp=new THREE.Mesh(new THREE.PlaneGeometry(900,900),
    new THREE.MeshLambertMaterial({color:0x5f8f4e}));
  gp.rotation.x=-Math.PI/2;gp.position.y=baseY-0.08;gp.receiveShadow=true;
  worldG.add(gp);groundTargets.push(gp);
  // أشجار خارج المدينة فقط
  var trunkG=new THREE.CylinderGeometry(0.3,0.4,1.6,6);
  var trunkM=new THREE.MeshLambertMaterial({color:0x6b4a2e});
  var topG=new THREE.ConeGeometry(2.2,5.5,7);
  var topM=new THREE.MeshLambertMaterial({color:0x2f7a35});
  var placed=0,tr=0;
  while(placed<45&&tr<300){
    tr++;
    var a=Math.random()*Math.PI*2,r=70+Math.random()*220;
    var tx=Math.cos(a)*r,tz=Math.sin(a)*r;
    if(tx>WB.x0-8&&tx<WB.x1+8&&tz>WB.z0-8&&tz<WB.z1+8)continue;
    var trk=new THREE.Mesh(trunkG,trunkM);trk.position.set(tx,baseY+0.8,tz);worldG.add(trk);
    var tp=new THREE.Mesh(topG,topM);tp.position.set(tx,baseY+4.2,tz);worldG.add(tp);
    placed++;
  }
  // جبال بعيدة
  var mM=new THREE.MeshLambertMaterial({color:0x6f8272});
  for(var mI=0;mI<9;mI++){
    var ma=mI/9*Math.PI*2+Math.random()*0.4;
    var mr=420+Math.random()*180,mh=90+Math.random()*90,mw=80+Math.random()*70;
    var mn=new THREE.Mesh(new THREE.ConeGeometry(mw,mh,7),mM);
    mn.position.set(Math.cos(ma)*mr,mh/2-6,Math.sin(ma)*mr);
    worldG.add(mn);
  }
  // غيوم
  var cM=new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:0.85});
  for(var cI=0;cI<6;cI++){
    var cg=new THREE.Group();
    for(var sI=0;sI<4;sI++){
      var s=new THREE.Mesh(new THREE.SphereGeometry(7+Math.random()*7,10,8),cM);
      s.position.set(sI*11-17+Math.random()*5,Math.random()*3,Math.random()*7-3);
      s.scale.y=0.55;cg.add(s);
    }
    cg.position.set(Math.random()*700-350,90+Math.random()*50,Math.random()*700-350);
    cg.userData.sp=1.5+Math.random()*2;
    worldG.add(cg);clouds.push(cg);
  }
}

// ====== بدء التحميل ======
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
                  }catch(e){console.error(e);loadError('فشل تجهيز الشخصية');}
                },function(e){console.error(e);loadError('فشل معالجة ملف الشخصية');});
              }catch(e){console.error(e);loadError('فشل معالجة ملف الشخصية');}
            },60);
          }catch(e){console.error('onWorldLoaded:',e);loadError('فشل بناء العالم');}
        },function(e){console.error('parse world:',e);loadError('فشل معالجة ملف العالم');});
      }catch(e){console.error(e);loadError('فشل معالجة ملف العالم');}
    },80);
  }).catch(function(e){
    loadError('تعذر تنزيل الموارد — تحقق من الاتصال بالإنترنت');
  });
}

// ====== بناء العالم بعد التنزيل ======
function onWorldLoaded(glb){
  var w=glb.scene;
  // 1) مقياس بشري: طول شخصية العالم = 1.75م
  humanScale(w);
  // 2) توسيط
  worldBox=new THREE.Box3().setFromObject(w);
  var c=new THREE.Vector3();worldBox.getCenter(c);
  w.position.x-=c.x;w.position.z-=c.z;
  worldBox=new THREE.Box3().setFromObject(w);
  // 3) ظلال
  w.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  worldG.add(w);groundTargets.push(w);dioramaG=w;
  // 4) الطرق + التصادم
  detectRoads();
  extractColliders();
  // 5) الطبيعة حول المدينة
  buildNature(worldBox.min.y);
  // 6) حدود اللعب
  WB={x0:worldBox.min.x-20,x1:worldBox.max.x+20,z0:worldBox.min.z-20,z1:worldBox.max.z+20};
}

// ====== تجهيز الشخصية ======
function onCharLoaded(glb){
  var m=glb.scene;
  m.traverse(function(o){if(o.isMesh){o.castShadow=true;}});
  charG.add(m);
  mixer=new THREE.AnimationMixer(m);
  (glb.animations||[]).forEach(function(a){anims[a.name]=mixer.clipAction(a);});
  var c=new THREE.Vector3();worldBox.getCenter(c);
  var bx=c.x,bz=c.z,bg=groundAt(bx,bz);
  for(var a=0;a<10;a++){
    var nx=c.x+Math.cos(a/10*Math.PI*2)*22,nz=c.z+Math.sin(a/10*Math.PI*2)*22;
    var ng=groundAt(nx,nz);
    if(ng<bg-1&&ng>-40){bg=ng;bx=nx;bz=nz;}
  }
  P.x=bx;P.z=bz;P.y=(bg>-40?bg:0)+0.02;
  playAnim('idle');
}

// ====== ارتفاع الأرض ======
function groundAt(x,z){
  rayc.set(new THREE.Vector3(x,600,z),downV);
  var hits=rayc.intersectObjects(groundTargets,true);
  return hits.length?hits[0].point.y:-50;
}

// ====== تحديث اللاعب ======
function stepPlayer(dt){
  var ix=(input.r?1:0)-(input.l?1:0)+joy.x;
  var iz=(input.b?1:0)-(input.f?1:0)+joy.y;
  var moving=Math.hypot(ix,iz)>0.15;
  var wantRun=input.run||('ontouchstart'in window&&Math.hypot(joy.x,joy.y)>0.85);
  var maxSp=moving?(wantRun?8:4):0;
  P.speed+=(maxSp-P.speed)*Math.min(1,dt*8);
  if(moving){
    var ang=camYaw+Math.PI-Math.atan2(ix,-iz);
    var d=ang-P.hd;
    while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;
    P.hd+=d*Math.min(1,dt*10);
    P.x+=Math.sin(P.hd)*P.speed*dt;
    P.z+=Math.cos(P.hd)*P.speed*dt;
  }
  // حدود العالم
  P.x=Math.max(WB.x0,Math.min(WB.x1,P.x));
  P.z=Math.max(WB.z0,Math.min(WB.z1,P.z));
  // تصادم المباني (دفع خارج الصندوق)
  for(var ci=0;ci<colliders.length;ci++){
    var cb=colliders[ci];
    if(P.x>cb.x0-0.55&&P.x<cb.x1+0.55&&P.z>cb.z0-0.55&&P.z<cb.z1+0.55){
      var dxl=P.x-(cb.x0-0.55),dxr=(cb.x1+0.55)-P.x;
      var dzl=P.z-(cb.z0-0.55),dzr=(cb.z1+0.55)-P.z;
      var mn=Math.min(dxl,dxr,dzl,dzr);
      if(mn===dxl)P.x=cb.x0-0.55;else if(mn===dxr)P.x=cb.x1+0.55;
      else if(mn===dzl)P.z=cb.z0-0.55;else P.z=cb.z1+0.55;
    }
  }
  // الأرض: لا تقفز للأسطح — اقبل فقط ما هو بمستواك أو أخفض
  var g=groundAt(P.x,P.z);
  if(P.onGround&&input.jump){P.vy=6.5;P.onGround=false;input.jump=0;}
  if(!P.onGround){
    P.vy-=22*dt;P.y+=P.vy*dt;
    if(g>-40&&P.y<=g&&g<=P.y+1.2){P.y=g;P.vy=0;P.onGround=true;}
    else if(P.y<-60){P.y=0;P.vy=0;P.onGround=true;}
  }else{
    if(g>-40&&g<=P.y+0.55){
      P.y+=(g-P.y)*Math.min(1,dt*14);
      if(Math.abs(P.y-g)<0.05)P.y=g;
    }else if(g>-40&&g<P.y-1.2){
      P.onGround=false;P.vy=0; // مشى عن حافة → سقوط
    }
    // وإلا: سقف فوق الرأس → تجاهله تماماً
  }
  charG.position.set(P.x,P.y,P.z);
  charG.rotation.y=P.hd;
  P.moving=moving;P.run=wantRun;
  if(!P.onGround)playAnim('idle');
  else if(P.speed>5)playAnim('run');
  else if(P.speed>0.6)playAnim('walk');
  else playAnim('idle');
  if(mixer)mixer.update(dt);
}

// ====== الكاميرا ======
function stepCam(dt){
  var tx=P.x+Math.sin(camYaw)*Math.cos(camPitch)*camDist;
  var tz=P.z+Math.cos(camYaw)*Math.cos(camPitch)*camDist;
  var ty=P.y+1.6+Math.sin(camPitch)*camDist;
  var gg=groundAt(tx,tz);if(gg>-40&&ty<gg+0.6)ty=gg+0.6;
  var k=1-Math.pow(0.0001,dt);
  camera.position.x+=(tx-camera.position.x)*k;
  camera.position.y+=(ty-camera.position.y)*k;
  camera.position.z+=(tz-camera.position.z)*k;
  camera.lookAt(P.x,P.y+1.7,P.z);
  var tf=(P.moving&&P.run)?68:60;
  if(Math.abs(camera.fov-tf)>0.05){
    camera.fov+=(tf-camera.fov)*Math.min(1,dt*5);
    camera.updateProjectionMatrix();
  }
}

// ====== الحياة على طرق العالم نفسه ======
var carBodyG=new THREE.BoxGeometry(1.9,0.75,4.2);
var carCabG=new THREE.BoxGeometry(1.6,0.65,2.0);
var carWheelG=new THREE.CylinderGeometry(0.4,0.4,0.33,10);carWheelG.rotateZ(Math.PI/2);
var wheelM=new THREE.MeshLambertMaterial({color:0x161616});
var glassM=new THREE.MeshLambertMaterial({color:0x1c2733});
function buildCarMesh(color){
  var g=new THREE.Group();
  var body=new THREE.Mesh(carBodyG,new THREE.MeshLambertMaterial({color:color}));
  body.position.y=0.72;body.castShadow=true;g.add(body);
  var cab=new THREE.Mesh(carCabG,glassM);cab.position.set(0,1.32,-0.2);g.add(cab);
  [[-0.95,1.3],[0.95,1.3],[-0.95,-1.3],[0.95,-1.3]].forEach(function(p){
    var w=new THREE.Mesh(carWheelG,wheelM);w.position.set(p[0],0.4,p[1]);g.add(w);
  });
  return g;
}
var legG=new THREE.BoxGeometry(0.17,0.72,0.19);legG.translate(0,-0.31,0);
var armG=new THREE.BoxGeometry(0.12,0.58,0.14);armG.translate(0,-0.25,0);
var headG=new THREE.SphereGeometry(0.21,10,8);
var torsoG=new THREE.BoxGeometry(0.48,0.62,0.28);
var skinM=new THREE.MeshLambertMaterial({color:0xd9a066});
function buildPed(shirtColor){
  var g=new THREE.Group();
  var shirt=new THREE.MeshLambertMaterial({color:shirtColor});
  var pants=new THREE.MeshLambertMaterial({color:0x33415c});
  var head=new THREE.Mesh(headG,skinM);head.position.y=1.58;head.castShadow=true;g.add(head);
  var torso=new THREE.Mesh(torsoG,shirt);torso.position.y=1.12;torso.castShadow=true;g.add(torso);
  var legL=new THREE.Mesh(legG,pants);legL.position.set(-0.12,0.78,0);g.add(legL);
  var legR=new THREE.Mesh(legG,pants);legR.position.set(0.12,0.78,0);g.add(legR);
  var armL=new THREE.Mesh(armG,shirt);armL.position.set(-0.32,1.38,0);g.add(armL);
  var armR=new THREE.Mesh(armG,shirt);armR.position.set(0.32,1.38,0);g.add(armR);
  g.userData={legL:legL,legR:legR,armL:armL,armR:armR};
  return g;
}
function runPoint(run,t,lane){
  if(run.ax==='x')return[t,run.fixed+lane,1,0];
  return[run.fixed+lane,t,0,1];
}
function spawnLife(){
  if(lifeSpawned||!roadRuns.length)return;lifeSpawned=true;
  var cols=[0xd23c2e,0x2e6fd2,0xf2c12e,0x2ed27a,0xe8e8e8,0x7a4fd2];
  for(var i=0;i<6;i++){
    var r=roadRuns[i%roadRuns.length];
    var cm=buildCarMesh(cols[i%cols.length]);
    worldG.add(cm);
    traffic.push({m:cm,run:r,t:r.min+Math.random()*(r.max-r.min),
      dir:Math.random()<0.5?1:-1,sp:5+Math.random()*3.5,lane:(i%2?1.4:-1.4)});
  }
  var shirts=[0xd24a4a,0x4a7ad2,0x4ad27a,0xd2b44a,0x9a4ad2,0x4ad2c8,0xe8e8e8,0xd27a4a];
  for(var j=0;j<8;j++){
    var r2=roadRuns[j%roadRuns.length];
    var pm=buildPed(shirts[j%shirts.length]);
    worldG.add(pm);
    peds.push({m:pm,run:r2,t:r2.min+Math.random()*(r2.max-r2.min),
      dir:Math.random()<0.5?1:-1,sp:1.1+Math.random()*1.1,
      lane:(j%2?3.2:-3.2),ph:Math.random()*6});
  }
  var bM=new THREE.MeshBasicMaterial({color:0x2c2c38,side:THREE.DoubleSide});
  var wingG=new THREE.PlaneGeometry(1.6,0.5);
  for(var k=0;k<5;k++){
    var bg=new THREE.Group();
    var wl=new THREE.Mesh(wingG,bM);wl.position.x=-0.75;bg.add(wl);
    var wr=new THREE.Mesh(wingG,bM);wr.position.x=0.75;bg.add(wr);
    scene.add(bg);
    birds.push({g:bg,wl:wl,wr:wr,a:Math.random()*Math.PI*2,
      r:60+Math.random()*120,h:40+Math.random()*40,sp:0.12+Math.random()*0.12,ph:Math.random()*6});
  }
}
function stepTraffic(dt){
  for(var i=0;i<traffic.length;i++){var c=traffic[i],r=c.run,m=c.m;
    c.t+=c.dir*c.sp*dt;
    if(c.t>r.max){c.t=r.max;c.dir=-1;}
    if(c.t<r.min){c.t=r.min;c.dir=1;}
    var p=runPoint(r,c.t,c.lane);
    m.position.set(p[0],roadY,p[1]);
    m.rotation.y=Math.atan2(p[2]*c.dir,p[3]*c.dir);
  }
}
function stepPeds(dt){
  for(var i=0;i<peds.length;i++){var c=peds[i],r=c.run,m=c.m;
    c.t+=c.dir*c.sp*dt;
    if(c.t>r.max){c.t=r.max;c.dir=-1;}
    if(c.t<r.min){c.t=r.min;c.dir=1;}
    c.ph+=dt*c.sp*3.4;
    var sw=Math.sin(c.ph),p=runPoint(r,c.t,c.lane);
    m.position.set(p[0],roadY+Math.abs(sw)*0.04,p[1]);
    m.rotation.y=Math.atan2(p[2]*c.dir,p[3]*c.dir);
    var u=m.userData;
    u.legL.rotation.x=sw*0.55;u.legR.rotation.x=-sw*0.55;
    u.armL.rotation.x=-sw*0.4;u.armR.rotation.x=sw*0.4;
  }
}
function stepBirds(dt){
  var t=performance.now()*0.012;
  for(var i=0;i<birds.length;i++){var b=birds[i];
    b.a+=b.sp*dt;
    b.g.position.set(Math.cos(b.a)*b.r,b.h+Math.sin(b.a*2+i)*4,Math.sin(b.a)*b.r);
    b.g.rotation.y=-b.a;
    var f=Math.sin(t+b.ph)*0.55;
    b.wl.rotation.z=f;b.wr.rotation.z=-f;
  }
}

// ====== الخريطة المصغرة ======
var mmapT=0;
function drawMap(dt){
  mmapT+=dt;if(mmapT<0.4)return;mmapT=0;
  var cv=$('mmap');if(!cv||!started)return;
  var x=cv.getContext('2d'),W=cv.width,cx=W/2;
  var span=Math.max(WB.x1-WB.x0,WB.z1-WB.z0)/2;
  var sc=(cx-8)/span,ox=(WB.x0+WB.x1)/2,oz=(WB.z0+WB.z1)/2;
  x.clearRect(0,0,W,W);
  x.fillStyle='rgba(10,20,35,0.9)';
  x.beginPath();x.arc(cx,cx,cx-2,0,7);x.fill();
  x.save();x.beginPath();x.arc(cx,cx,cx-2,0,7);x.clip();
  x.strokeStyle='#4fc3f7';x.lineWidth=2;
  for(var i=0;i<roadRuns.length;i++){var r=roadRuns[i];
    x.beginPath();
    if(r.ax==='x'){x.moveTo(cx+(r.min-ox)*sc,cx+(r.fixed-oz)*sc);x.lineTo(cx+(r.max-ox)*sc,cx+(r.fixed-oz)*sc);}
    else{x.moveTo(cx+(r.fixed-ox)*sc,cx+(r.min-oz)*sc);x.lineTo(cx+(r.fixed-ox)*sc,cx+(r.max-oz)*sc);}
    x.stroke();
  }
  var px=cx+(P.x-ox)*sc,pz=cx+(P.z-oz)*sc;
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
  sun.position.set(P.x+55,P.y+95,P.z+38);
  sun.target.position.set(P.x,P.y,P.z);
  sun.target.updateMatrixWorld();
  for(var i=0;i<clouds.length;i++){
    var c=clouds[i];
    c.position.x+=c.userData.sp*dt;
    if(c.position.x>420)c.position.x=-420;
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
