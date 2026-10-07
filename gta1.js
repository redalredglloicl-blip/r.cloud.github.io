/* ===== GTA Iraq - gta1.js : الأساسيات، المدينة، اللاعب ===== */
'use strict';
// ---------- الإعداد الأساسي ----------
var canvas=document.getElementById('c');
var renderer;
try{
  renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:false,powerPreference:'high-performance'});
}catch(e){
  document.getElementById('loadmsg').textContent='متصفحك لا يدعم WebGL';
  throw e;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
renderer.setSize(window.innerWidth,window.innerHeight);
var scene=new THREE.Scene();
scene.background=new THREE.Color(0x87b5e0);
scene.fog=new THREE.Fog(0x87b5e0,60,240);
var camera=new THREE.PerspectiveCamera(62,window.innerWidth/window.innerHeight,0.1,600);
window.addEventListener('resize',function(){
  camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
// إضاءة
scene.add(new THREE.HemisphereLight(0xcfe8ff,0x3a5f2a,0.95));
var sun=new THREE.DirectionalLight(0xfff2d0,0.9);sun.position.set(60,100,40);scene.add(sun);

// ---------- أدوات ----------
function rnd(a,b){return a+Math.random()*(b-a);}
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function mkCanvasTex(w,h,fn){
  var cv=document.createElement('canvas');cv.width=w;cv.height=h;
  fn(cv.getContext('2d'),w,h);
  var t=new THREE.CanvasTexture(cv);return t;
}
// تحميل GLB مع بديل
function loadGLB(url,ok,fail){
  try{
    new THREE.GLTFLoader().load(url,function(g){ok(g);},undefined,function(e){fail&&fail(e);});
  }catch(e){fail&&fail(e);}
}

// ---------- المدينة ----------
var CITY={blocks:6,block:44,road:14}; // لوس سانتوس: 6x6 مربعات
CITY.step=CITY.block+CITY.road;
CITY.size=CITY.blocks*CITY.step+CITY.road;
CITY.half=CITY.size/2;
var colliders=[]; // {x0,x1,z0,z1} للتصادم
function addCollider(x0,x1,z0,z1){colliders.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),z0:Math.min(z0,z1),z1:Math.max(z0,z1)});}
function collideCircle(p,r){
  for(var i=0;i<colliders.length;i++){
    var c=colliders[i];
    var nx=clamp(p.x,c.x0,c.x1),nz=clamp(p.z,c.z0,c.z1);
    var dx=p.x-nx,dz=p.z-nz,d2=dx*dx+dz*dz;
    if(d2<r*r){
      var d=Math.sqrt(d2)||0.001,push=(r-d)/d;
      p.x+=dx*push;p.z+=dz*push;
      return true;
    }
  }
  return false;
}
var winTex=mkCanvasTex(64,96,function(x,w,h){
  x.fillStyle='#2b2f3a';x.fillRect(0,0,w,h);
  for(var ry=4;ry<h-6;ry+=12)for(var rx=4;rx<w-6;rx+=10){
    x.fillStyle=Math.random()>0.5?'#ffe9a0':'#20242e';x.fillRect(rx,ry,6,8);
  }
});
function buildCity(){
  var g=new THREE.Group();
  // ---- المحيط (غرب) ----
  var ocean=new THREE.Mesh(new THREE.PlaneGeometry(500,1100),
    new THREE.MeshLambertMaterial({color:0x1b6f9e}));
  ocean.rotation.x=-Math.PI/2;ocean.position.set(-CITY.half-250,-0.6,0);g.add(ocean);
  // ---- الشاطئ الرملي ----
  var sand=new THREE.Mesh(new THREE.PlaneGeometry(36,1100),
    new THREE.MeshLambertMaterial({color:0xe3d09b}));
  sand.rotation.x=-Math.PI/2;sand.position.set(-CITY.half-18,0.015,0);g.add(sand);
  // ---- الأرضية ----
  var ground=new THREE.Mesh(new THREE.PlaneGeometry(CITY.size+260,CITY.size+260),
    new THREE.MeshLambertMaterial({color:0x4d7a43}));
  ground.rotation.x=-Math.PI/2;g.add(ground);
  var roadM=new THREE.MeshLambertMaterial({color:0x2e2e34});
  var dashM=new THREE.MeshBasicMaterial({color:0xf5d742});
  // ---- شبكة الطرق ----
  for(var i=0;i<=CITY.blocks;i++){
    var p=-CITY.half+i*CITY.step+CITY.road/2;
    var r1=new THREE.Mesh(new THREE.PlaneGeometry(CITY.road,CITY.size),roadM);
    r1.rotation.x=-Math.PI/2;r1.position.set(p,0.02,0);g.add(r1);
    var r2=new THREE.Mesh(new THREE.PlaneGeometry(CITY.size,CITY.road),roadM);
    r2.rotation.x=-Math.PI/2;r2.position.set(0,0.02,p);g.add(r2);
    for(var d=-CITY.half+6;d<CITY.half-6;d+=8){
      var s1=new THREE.Mesh(new THREE.PlaneGeometry(0.5,3),dashM);
      s1.rotation.x=-Math.PI/2;s1.position.set(p,0.04,d);g.add(s1);
      var s2=new THREE.Mesh(new THREE.PlaneGeometry(3,0.5),dashM);
      s2.rotation.x=-Math.PI/2;s2.position.set(d,0.04,p);g.add(s2);
    }
  }
  // ---- المباني: داون تاون (وسط) ناطحات، والباقي أحياء ----
  var bcols=[0x8a7f70,0x707a8a,0x9a8a7a,0x7a8a7a,0xa08080];
  var dcols=[0x3a4a5a,0x5a6a7a,0x6a7a8a,0x4a5a6a];
  for(var bx=0;bx<CITY.blocks;bx++)for(var bz=0;bz<CITY.blocks;bz++){
    var cx=-CITY.half+CITY.road+bx*CITY.step+CITY.block/2;
    var cz=-CITY.half+CITY.road+bz*CITY.step+CITY.block/2;
    var downtown=(bx>=2&&bx<=3&&bz>=2&&bz<=3);
    var n=downtown?2:1+Math.floor(Math.random()*2);
    for(var k=0;k<n;k++){
      var w,dep,hh,cols;
      if(downtown){w=rnd(14,20);dep=rnd(14,20);hh=rnd(55,110);cols=dcols;}
      else{w=rnd(10,18);dep=rnd(10,18);hh=rnd(10,32);cols=bcols;}
      var ox=rnd(-1,1)*(CITY.block/2-w/2-2),oz=rnd(-1,1)*(CITY.block/2-dep/2-2);
      var bm=new THREE.Mesh(new THREE.BoxGeometry(w,hh,dep),
        new THREE.MeshLambertMaterial({color:cols[Math.floor(Math.random()*cols.length)],map:winTex}));
      bm.position.set(cx+ox,hh/2,cz+oz);g.add(bm);
      addCollider(cx+ox-w/2,cx+ox+w/2,cz+oz-dep/2,cz+oz+dep/2);
    }
  }
  // ---- جبل VINEWOOD (شمال) ----
  var hill=new THREE.Mesh(new THREE.SphereGeometry(110,20,14),
    new THREE.MeshLambertMaterial({color:0x3d6b35}));
  hill.scale.set(1.4,0.42,1);hill.position.set(30,0,-CITY.half-95);g.add(hill);
  var signTex=mkCanvasTex(1024,160,function(x,w,h2){
    x.clearRect(0,0,w,h2);
    x.fillStyle='#f7f2e8';x.font='bold 110px Arial';x.textAlign='center';x.textBaseline='middle';
    x.fillText('VINEWOOD',w/2,h2/2);
  });
  var sign=new THREE.Mesh(new THREE.PlaneGeometry(95,15),
    new THREE.MeshBasicMaterial({map:signTex,transparent:true}));
  sign.position.set(30,52,-CITY.half-78);sign.rotation.y=0.15;g.add(sign);
  // ---- المطار (جنوب): مدرج ----
  var rw=new THREE.Mesh(new THREE.PlaneGeometry(240,26),
    new THREE.MeshLambertMaterial({color:0x3a3a40}));
  rw.rotation.x=-Math.PI/2;rw.position.set(40,0.03,CITY.half+55);g.add(rw);
  for(var m=-110;m<=110;m+=14){
    var mk=new THREE.Mesh(new THREE.PlaneGeometry(6,1),dashM);
    mk.rotation.x=-Math.PI/2;mk.position.set(40+m,0.05,CITY.half+55);g.add(mk);
  }
  var hangar=new THREE.Mesh(new THREE.BoxGeometry(40,14,30),
    new THREE.MeshLambertMaterial({color:0x8a94a0}));
  hangar.position.set(40,7,CITY.half+95);g.add(hangar);
  addCollider(20,60,CITY.half+80,CITY.half+110);
  // ---- الميناء (جنوب شرق): حاويات ----
  var ccols=[0xc0392b,0x2980b9,0x27ae60,0xf39c12,0x8e44ad];
  for(var ci=0;ci<14;ci++){
    var cont=new THREE.Mesh(new THREE.BoxGeometry(8,3,3),
      new THREE.MeshLambertMaterial({color:ccols[ci%ccols.length]}));
    var px2=CITY.half-60+(ci%4)*10,pz2=CITY.half+35+Math.floor(ci/4)*5;
    cont.position.set(px2,1.5+(ci%2)*3.1,pz2);g.add(cont);
  }
  // ---- أعمدة إنارة ----
  var poleM=new THREE.MeshLambertMaterial({color:0x333338});
  var lampM=new THREE.MeshBasicMaterial({color:0xfff2b0});
  for(var lx=0;lx<=CITY.blocks;lx+=2)for(var lz=0;lz<=CITY.blocks;lz+=2){
    var px=-CITY.half+lx*CITY.step+CITY.road+1;
    var pz=-CITY.half+lz*CITY.step+CITY.road/2;
    if(Math.abs(px)>CITY.half||Math.abs(pz)>CITY.half)continue;
    var pole=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.2,7,6),poleM);
    pole.position.set(px,3.5,pz);g.add(pole);
    var lamp=new THREE.Mesh(new THREE.SphereGeometry(0.4,8,6),lampM);
    lamp.position.set(px,7.1,pz);g.add(lamp);
  }
  // ---- رصيف خشبي على الشاطئ ----
  var pier=new THREE.Mesh(new THREE.BoxGeometry(60,1,8),
    new THREE.MeshLambertMaterial({color:0x8a6a45}));
  pier.position.set(-CITY.half-45,0.5,40);g.add(pier);
  scene.add(g);
}
// ---------- اللاعب ----------
var player={
  pos:new THREE.Vector3(0,0,30),vel:new THREE.Vector3(),
  angle:0,speed:0,onGround:true,vy:0,inCar:null,group:null,
  walkPhase:0,model:null,parts:null
};
var BOY_URL='https://static.poly.pizza/3746be88-6799-4817-929b-6bc067c47caa.glb';
function buildProceduralPerson(shirt,pants,skin){
  var g=new THREE.Group();
  var mS=new THREE.MeshLambertMaterial({color:shirt||0x2266cc});
  var mP=new THREE.MeshLambertMaterial({color:pants||0x223344});
  var mK=new THREE.MeshLambertMaterial({color:skin||0xffdbac});
  var torso=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.75,0.34),mS);torso.position.y=1.12;g.add(torso);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.36,0.32),mK);head.position.y=1.72;g.add(head);
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.36,0.14,0.34),new THREE.MeshLambertMaterial({color:0x1e1a16}));
  hair.position.y=1.92;g.add(hair);
  var mkLimb=function(w,h,d,m,x,y){
    var pivot=new THREE.Group();pivot.position.set(x,y,0);
    var mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.y=-h/2;pivot.add(mesh);
    g.add(pivot);return pivot;
  };
  var armL=mkLimb(0.18,0.68,0.2,mS,-0.42,1.45),armR=mkLimb(0.18,0.68,0.2,mS,0.42,1.45);
  var legL=mkLimb(0.22,0.75,0.24,mP,-0.16,0.75),legR=mkLimb(0.22,0.75,0.24,mP,0.16,0.75);
  g.userData.parts={armL:armL,armR:armR,legL:legL,legR:legR,head:head};
  return g;
}
function createPlayer(){
  var g=buildProceduralPerson(0x22aa55,0x223344,0xffdbac);
  g.position.copy(player.pos);scene.add(g);
  player.group=g;player.parts=g.userData.parts;
  // محاولة ترقية لموديل 3D حقيقي
  loadGLB(BOY_URL,function(glb){
    try{
      var model=glb.scene;
      var box=new THREE.Box3().setFromObject(model);
      var s=1.8/Math.max(box.getSize(new THREE.Vector3()).y,0.01);
      model.scale.set(s,s,s);
      model.rotation.y=Math.PI;
      // إزالة القديم وإضافة الجديد
      while(g.children.length)g.remove(g.children[0]);
      g.add(model);
      player.model=model;player.parts=null;
    }catch(e){}
  });
}
function updatePlayer(dt,input){
  var p=player;
  if(p.inCar)return;
  var run=input.run?9:5;
  var mx=input.x,mz=input.z;
  var moving=Math.abs(mx)>0.05||Math.abs(mz)>0.05;
  if(moving){
    var target=Math.atan2(mx,mz);
    var da=target-p.angle;
    while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;
    p.angle+=da*Math.min(1,dt*12);
    p.speed+= (run-p.speed)*Math.min(1,dt*8);
    p.walkPhase+=dt*p.speed*2.2;
  }else{
    p.speed+=(0-p.speed)*Math.min(1,dt*10);
  }
  var vx=Math.sin(p.angle)*p.speed,vz=Math.cos(p.angle)*p.speed;
  p.pos.x+=vx*dt;p.pos.z+=vz*dt;
  // قفز
  if(input.jump&&p.onGround){p.vy=6;p.onGround=false;}
  if(!p.onGround){
    p.vy-=18*dt;p.pos.y+=p.vy*dt;
    if(p.pos.y<=0){p.pos.y=0;p.vy=0;p.onGround=true;}
  }
  // تصادم
  collideCircle(p.pos,0.5);
  p.pos.x=clamp(p.pos.x,-CITY.half-80,CITY.half+80);
  p.pos.z=clamp(p.pos.z,-CITY.half-80,CITY.half+80);
  // تطبيق
  p.group.position.copy(p.pos);
  p.group.rotation.y=p.angle;
  // أنيميشن المشي
  if(p.parts){
    var sw=Math.sin(p.walkPhase)*clamp(p.speed/6,0,1)*0.7;
    p.parts.legL.rotation.x=sw;p.parts.legR.rotation.x=-sw;
    p.parts.armL.rotation.x=-sw*0.8;p.parts.armR.rotation.x=sw*0.8;
    p.group.position.y=p.pos.y+Math.abs(Math.sin(p.walkPhase))*0.05*clamp(p.speed/6,0,1);
  }
}
// كاميرا تتبع
var camDist=9,camH=4.5,camPos=new THREE.Vector3(0,10,40),camLook=new THREE.Vector3();
function updateCamera(dt){
  var p=player,target,desired;
  if(p.inCar){
    var c=p.inCar;
    target=c.group.position;
    var back=new THREE.Vector3(Math.sin(c.angle),0,Math.cos(c.angle)).multiplyScalar(-11);
    desired=new THREE.Vector3(target.x+back.x,7.5,target.z+back.z);
  }else{
    target=p.group.position;
    var back2=new THREE.Vector3(Math.sin(p.angle),0,Math.cos(p.angle)).multiplyScalar(-camDist);
    desired=new THREE.Vector3(target.x+back2.x,camH,target.z+back2.z);
  }
  var k=1-Math.pow(0.001,dt);
  camPos.lerp(desired,k);
  camLook.lerp(new THREE.Vector3(target.x,target.y+1.6,target.z),k);
  camera.position.copy(camPos);camera.lookAt(camLook);
}
