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
var CITY={blocks:4,block:44,road:14}; // 4x4 مربعات
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
  // أرضية
  var ground=new THREE.Mesh(new THREE.PlaneGeometry(CITY.size+200,CITY.size+200),
    new THREE.MeshLambertMaterial({color:0x4d7a43}));
  ground.rotation.x=-Math.PI/2;g.add(ground);
  var roadM=new THREE.MeshLambertMaterial({color:0x2e2e34});
  var sideM=new THREE.MeshLambertMaterial({color:0x9aa0a8});
  var dashM=new THREE.MeshBasicMaterial({color:0xf5d742});
  // الطرق (شبكة)
  for(var i=0;i<=CITY.blocks;i++){
    var p=-CITY.half+i*CITY.step+CITY.road/2;
    var r1=new THREE.Mesh(new THREE.PlaneGeometry(CITY.road,CITY.size),roadM);
    r1.rotation.x=-Math.PI/2;r1.position.set(p,0.02,0);g.add(r1);
    var r2=new THREE.Mesh(new THREE.PlaneGeometry(CITY.size,CITY.road),roadM);
    r2.rotation.x=-Math.PI/2;r2.position.set(0,0.02,p);g.add(r2);
    // خطوط متقطعة
    for(var d=-CITY.half+6;d<CITY.half-6;d+=8){
      var s1=new THREE.Mesh(new THREE.PlaneGeometry(0.5,3),dashM);
      s1.rotation.x=-Math.PI/2;s1.position.set(p,0.04,d);g.add(s1);
      var s2=new THREE.Mesh(new THREE.PlaneGeometry(3,0.5),dashM);
      s2.rotation.x=-Math.PI/2;s2.position.set(d,0.04,p);g.add(s2);
    }
  }
  // المباني داخل المربعات
  var bcols=[0x8a7f70,0x707a8a,0x9a8a7a,0x7a8a7a,0xa08080];
  for(var bx=0;bx<CITY.blocks;bx++)for(var bz=0;bz<CITY.blocks;bz++){
    var cx=-CITY.half+CITY.road+bx*CITY.step+CITY.block/2;
    var cz=-CITY.half+CITY.road+bz*CITY.step+CITY.block/2;
    var n=1+Math.floor(Math.random()*2);
    for(var k=0;k<n;k++){
      var w=rnd(10,18),dep=rnd(10,18),hh=rnd(12,42);
      var ox=rnd(-1,1)*(CITY.block/2-w/2-2),oz=rnd(-1,1)*(CITY.block/2-dep/2-2);
      var bm=new THREE.Mesh(new THREE.BoxGeometry(w,hh,dep),
        new THREE.MeshLambertMaterial({color:bcols[Math.floor(Math.random()*bcols.length)],map:winTex}));
      bm.position.set(cx+ox,hh/2,cz+oz);g.add(bm);
      addCollider(cx+ox-w/2,cx+ox+w/2,cz+oz-dep/2,cz+oz+dep/2);
    }
  }
  // أعمدة إنارة على الطرق
  var poleM=new THREE.MeshLambertMaterial({color:0x333338});
  var lampM=new THREE.MeshBasicMaterial({color:0xfff2b0});
  for(var lx=0;lx<=CITY.blocks;lx++)for(var lz=0;lz<=CITY.blocks;lz+=2){
    var px=-CITY.half+lx*CITY.step+CITY.road+1;
    var pz=-CITY.half+lz*CITY.step+CITY.road/2;
    if(Math.abs(px)>CITY.half||Math.abs(pz)>CITY.half)continue;
    var pole=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.2,7,6),poleM);
    pole.position.set(px,3.5,pz);g.add(pole);
    var lamp=new THREE.Mesh(new THREE.SphereGeometry(0.4,8,6),lampM);
    lamp.position.set(px,7.1,pz);g.add(lamp);
  }
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
