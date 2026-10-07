/* ===== GTA Iraq - gta2.js : السيارات، الشرطة، التحكم، الحلقة ===== */
'use strict';
// ---------- السيارات ----------
var CAR_URLS=[
 'https://static.poly.pizza/59a67a6c-490e-472e-bae6-5a4d2541f1c7.glb',
 'https://static.poly.pizza/34db1344-31cc-49ac-bc46-c055f68e39ca.glb',
 'https://static.poly.pizza/d35173c8-6078-4367-8f87-b1f2599f0bb7.glb',
 'https://static.poly.pizza/179e43ce-b9e0-40cf-8b99-641693d3207e.glb'
];
var carCols=[0xd23c3c,0x3c6ed2,0x3cd27a,0xe0a83c,0x444449,0x2a9d8f];
function buildBoxCar(color){
  var g=new THREE.Group();
  var body=new THREE.Mesh(new THREE.BoxGeometry(2,0.7,4.2),
    new THREE.MeshLambertMaterial({color:color}));
  body.position.y=0.65;g.add(body);
  var cab=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.6,2),
    new THREE.MeshLambertMaterial({color:0x1a2530}));
  cab.position.set(0,1.2,-0.2);g.add(cab);
  var wg=new THREE.CylinderGeometry(0.38,0.38,0.3,10);
  var wm=new THREE.MeshLambertMaterial({color:0x141414});
  [[-0.95,1.35],[0.95,1.35],[-0.95,-1.35],[0.95,-1.35]].forEach(function(p){
    var w=new THREE.Mesh(wg,wm);w.rotation.z=Math.PI/2;
    w.position.set(p[0],0.38,p[1]);g.add(w);
  });
  return g;
}
var cars=[]; // {group,angle,speed,parked,traffic,police,color}
function spawnCar(x,z,angle,opts){
  opts=opts||{};
  var color=opts.color!=null?opts.color:carCols[Math.floor(Math.random()*carCols.length)];
  var g=buildBoxCar(color);
  g.position.set(x,0,z);g.rotation.y=angle||0;scene.add(g);
  var car={group:g,angle:angle||0,speed:0,parked:!!opts.parked,
    traffic:!!opts.traffic,police:!!opts.police,color:color,
    t:Math.random()*100,path:opts.path||null,pi:0};
  cars.push(car);
  // ترقية GLB
  if(!opts.police)loadGLB(CAR_URLS[Math.floor(Math.random()*CAR_URLS.length)],function(glb){
    try{
      var model=glb.scene,box=new THREE.Box3().setFromObject(model);
      var sz=box.getSize(new THREE.Vector3()),s=4.4/Math.max(sz.z,0.01);
      model.scale.set(s,s,s);
      while(g.children.length)g.remove(g.children[0]);
      g.add(model);
    }catch(e){}
  });
  return car;
}
function roadPos(i){return -CITY.half+i*CITY.step+CITY.road/2;}
function spawnParkedCars(){
  var spots=[[0,2],[1,5],[2,1],[3,4],[1,2],[2,6],[0,4],[3,0]];
  spots.forEach(function(s,i){
    var rx=roadPos(s[0]),rz=-CITY.half+20+i*23;
    spawnCar(rx+CITY.road/2-2.2,rz,(i%2?0:Math.PI),{parked:true});
  });
}
function spawnTraffic(){
  for(var i=0;i<5;i++){
    var ri=Math.floor(rnd(0,CITY.blocks+1));
    var p=roadPos(ri),h=CITY.half-4;
    var path=[{x:p,z:-h},{x:p,z:h},{x:-h,z:p},{x:h,z:p}];
    var c=spawnCar(p,-h+rnd(0,20),0,{traffic:true,path:path});
    c.pi=i%4;
  }
}
var police=null,wanted=0,cash=500;
function spawnPolice(){
  police=spawnCar(0,-CITY.half+10,0,{police:true,color:0x2244aa});
  police.group.children.forEach(function(){});
  // شريط أضواء
  var bar=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.25,0.5),
    new THREE.MeshBasicMaterial({color:0xff2222}));
  bar.position.y=1.55;police.group.add(bar);
  police.bar=bar;police.on=false;
}
// ---------- المشاة ----------
var peds=[];
function spawnPeds(){
  for(var i=0;i<8;i++){
    var g=buildProceduralPerson([0xcc5533,0x3388cc,0x993399][i%3],0x333333,0xffdbac);
    var bx=Math.floor(rnd(0,CITY.blocks)),bz=Math.floor(rnd(0,CITY.blocks));
    var x=-CITY.half+CITY.road+bx*CITY.step+rnd(6,CITY.block-6);
    var z=-CITY.half+CITY.road+bz*CITY.step+CITY.block+2;
    g.position.set(x,0,z);scene.add(g);
    peds.push({g:g,x:x,z:z,dir:rnd(0,Math.PI*2),sp:rnd(1,2),ph:rnd(0,6)});
  }
}
function updatePeds(dt){
  peds.forEach(function(p){
    p.ph+=dt*p.sp*3;
    p.x+=Math.sin(p.dir)*p.sp*dt;p.z+=Math.cos(p.dir)*p.sp*dt;
    if(Math.random()<dt*0.1)p.dir=rnd(0,Math.PI*2);
    p.x=clamp(p.x,-CITY.half,CITY.half);p.z=clamp(p.z,-CITY.half,CITY.half);
    p.g.position.set(p.x,Math.abs(Math.sin(p.ph))*0.04,p.z);
    p.g.rotation.y=p.dir;
    var pts=p.g.userData.parts;
    if(pts){var s=Math.sin(p.ph)*0.5;pts.legL.rotation.x=s;pts.legR.rotation.x=-s;}
  });
}
// ---------- الإدخال ----------
var input={x:0,z:0,run:false,jump:false};
var keys={};
window.addEventListener('keydown',function(e){
  keys[e.code]=true;
  if(e.code==='KeyE')tryEnterExit();
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].indexOf(e.code)>=0)e.preventDefault();
});
window.addEventListener('keyup',function(e){keys[e.code]=false;});
function pollKeys(){
  var x=0,z=0;
  if(keys['KeyW']||keys['ArrowUp'])z+=1;
  if(keys['KeyS']||keys['ArrowDown'])z-=1;
  if(keys['KeyA']||keys['ArrowLeft'])x-=1;
  if(keys['KeyD']||keys['ArrowRight'])x+=1;
  if(joy.active){x=joy.x;z=joy.z;}
  input.x=clamp(x,-1,1);input.z=clamp(z,-1,1);
  input.run=!!keys['ShiftLeft']||!!keys['ShiftRight']||joy.run;
  if(keys['Space'])input.jump=true;
}
// جويستيك لمس
var joy={active:false,x:0,z:0,run:false,id:null};
function setupJoystick(){
  var base=document.getElementById('joy'),knob=document.getElementById('joyk');
  var R=50;
  function setK(dx,dy){
    var d=Math.sqrt(dx*dx+dy*dy),m=d>R?R/d:1;
    dx*=m;dy*=m;
    knob.style.transform='translate('+dx+'px,'+dy+'px)';
    joy.x=dx/R;joy.z=-dy/R;joy.active=true;joy.run=d>R*0.85;
  }
  function end(){joy.active=false;joy.x=joy.z=0;joy.run=false;knob.style.transform='translate(0,0)';}
  base.addEventListener('touchstart',function(e){
    var t=e.changedTouches[0];joy.id=t.identifier;
    var r=base.getBoundingClientRect();
    setK(t.clientX-(r.left+r.width/2),t.clientY-(r.top+r.height/2));
    e.preventDefault();
  },{passive:false});
  base.addEventListener('touchmove',function(e){
    for(var i=0;i<e.changedTouches.length;i++){
      var t=e.changedTouches[i];
      if(t.identifier===joy.id){
        var r=base.getBoundingClientRect();
        setK(t.clientX-(r.left+r.width/2),t.clientY-(r.top+r.height/2));
      }
    }
    e.preventDefault();
  },{passive:false});
  var e2=function(e){if(joy.id!=null){joy.id=null;end();}};
  base.addEventListener('touchend',e2);base.addEventListener('touchcancel',e2);
  document.getElementById('btn-jump').addEventListener('touchstart',function(e){input.jump=true;e.preventDefault();},{passive:false});
  document.getElementById('btn-car').addEventListener('touchstart',function(e){tryEnterExit();e.preventDefault();},{passive:false});
}
// ---------- ركوب السيارات ----------
function nearestCar(maxD){
  var best=null,bd=maxD;
  for(var i=0;i<cars.length;i++){
    var c=cars[i];
    if(c.traffic||c===player.inCar)continue;
    var d=c.group.position.distanceTo(player.group.position);
    if(d<bd){bd=d;best=c;}
  }
  return best;
}
function tryEnterExit(){
  var p=player;
  if(p.inCar){
    var c=p.inCar;p.inCar=null;
    p.pos.set(c.group.position.x+Math.cos(c.angle)*2.5,0,c.group.position.z-Math.sin(c.angle)*2.5);
    p.group.visible=true;c.speed=0;
    document.getElementById('btn-car').textContent='🚗';
    return;
  }
  var c=nearestCar(3.5);
  if(c){p.inCar=c;p.group.visible=false;c.parked=false;
    document.getElementById('btn-car').textContent='🚶';}
}
function updateDriving(dt){
  var p=player,c=p.inCar;
  if(!c)return;
  var th=0,st=0;
  if(keys['KeyW']||keys['ArrowUp'])th+=1;
  if(keys['KeyS']||keys['ArrowDown'])th-=1;
  if(keys['KeyA']||keys['ArrowLeft'])st+=1;
  if(keys['KeyD']||keys['ArrowRight'])st-=1;
  if(joy.active){th=joy.z;st=-joy.x;}
  var maxS=26;
  c.speed+=th*22*dt;
  c.speed-=c.speed*1.6*dt;
  c.speed=clamp(c.speed,-10,maxS);
  if(Math.abs(c.speed)>0.5)c.angle+=st*1.9*dt*Math.sign(c.speed)*clamp(Math.abs(c.speed)/8,0,1);
  c.group.position.x+=Math.sin(c.angle)*c.speed*dt;
  c.group.position.z+=Math.cos(c.angle)*c.speed*dt;
  if(collideCircle(c.group.position,2.2)){
    if(Math.abs(c.speed)>12){wanted=Math.min(3,wanted+1);updateWanted();}
    c.speed*=0.4;
  }
  c.group.position.x=clamp(c.group.position.x,-CITY.half-80,CITY.half+80);
  c.group.position.z=clamp(c.group.position.z,-CITY.half-80,CITY.half+80);
  c.group.rotation.y=c.angle;
  p.pos.copy(c.group.position);
  // دهس المشاة؟ لا — نتجاوز
  document.getElementById('speed').textContent=Math.abs(Math.round(c.speed*3.6))+' كم/س';
}
function updateTraffic(dt){
  cars.forEach(function(c){
    if(!c.traffic||!c.path)return;
    var wp=c.path[c.pi];
    var dx=wp.x-c.group.position.x,dz=wp.z-c.group.position.z;
    var d=Math.sqrt(dx*dx+dz*dz);
    if(d<3){c.pi=(c.pi+1)%c.path.length;return;}
    var ta=Math.atan2(dx,dz),da=ta-c.angle;
    while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;
    c.angle+=clamp(da,-1,1)*Math.min(1,dt*3);
    var sp=10;
    c.group.position.x+=Math.sin(c.angle)*sp*dt;
    c.group.position.z+=Math.cos(c.angle)*sp*dt;
    c.group.rotation.y=c.angle;
  });
}
// ---------- الشرطة والمطلوبية ----------
function updateWanted(){
  var el=document.getElementById('wanted'),s='';
  for(var i=0;i<3;i++)s+=i<wanted?'⭐':'☆';
  el.textContent=s;
}
function updatePolice(dt){
  if(!police)return;
  var p=player;
  if(wanted>0){
    var tp=p.inCar?p.inCar.group.position:p.group.position;
    var pp=police.group.position;
    var dx=tp.x-pp.x,dz=tp.z-pp.z,d=Math.sqrt(dx*dx+dz*dz);
    if(d>1){
      var ta=Math.atan2(dx,dz);
      police.angle+=clamp(ta-police.angle,-1,1)*Math.min(1,dt*4);
      var sp=wanted>=3?24:18;
      pp.x+=Math.sin(police.angle)*sp*dt;pp.z+=Math.cos(police.angle)*sp*dt;
      police.group.rotation.y=police.angle;
      police.bar.material.color.setHex(Math.floor(performance.now()/300)%2?0xff2222:0x2222ff);
    }
    if(d<3.5){ // مسكوك!
      wanted=0;updateWanted();cash=Math.max(0,cash-200);
      document.getElementById('cash').textContent=cash+' $';
      if(p.inCar){p.inCar.speed=0;p.inCar=null;p.group.visible=true;}
      p.pos.set(0,0,30);p.group.position.copy(p.pos);
      pp.set(0,0,-CITY.half+10);
      showMsg('🚨 تم القبض عليك! غرامة 200$');
    }
  }
}
// ---------- واجهة ----------
function showMsg(t){
  var m=document.getElementById('msg');m.textContent=t;m.style.opacity=1;
  clearTimeout(m._t);m._t=setTimeout(function(){m.style.opacity=0;},2200);
}
var mmc;
function setupMinimap(){
  mmc=document.getElementById('mmap').getContext('2d');
}
function drawMinimap(){
  var S=120,sc=S/(CITY.size+40);
  mmc.fillStyle='#0d1a0d';mmc.fillRect(0,0,S,S);
  mmc.fillStyle='#333';
  for(var i=0;i<=CITY.blocks;i++){
    var p=(-CITY.half+i*CITY.step+CITY.road/2+CITY.half+20)*sc;
    mmc.fillRect(p,0,CITY.road*sc,S);mmc.fillRect(0,p,S,CITY.road*sc);
  }
  mmc.fillStyle='#e33';
  cars.forEach(function(c){
    if(c===player.inCar)return;
    mmc.fillRect((c.group.position.x+CITY.half+20)*sc-2,(c.group.position.z+CITY.half+20)*sc-2,4,4);
  });
  var p=player,px=(p.pos.x+CITY.half+20)*sc,pz=(p.pos.z+CITY.half+20)*sc;
  mmc.fillStyle=p.inCar?'#ff0':'#0f0';
  mmc.beginPath();mmc.arc(px,pz,4,0,7);mmc.fill();
}
// ---------- الحلقة الرئيسية ----------
var clock=new THREE.Clock(),frame=0;
function loop(){
  requestAnimationFrame(loop);
  var dt=Math.min(clock.getDelta(),0.05);
  pollKeys();
  updatePlayer(dt,input);
  updateDriving(dt);
  updateTraffic(dt);
  updatePolice(dt);
  updatePeds(dt);
  updateCamera(dt);
  input.jump=false;
  if((frame++%10)===0){
    drawMinimap();
    var nc=nearestCar(3.5);
    var btn=document.getElementById('btn-car');
    if(!player.inCar)btn.style.display=nc?'flex':'none';
    else btn.style.display='flex';
    if(!player.inCar)document.getElementById('speed').textContent='';
  }
  renderer.render(scene,camera);
}
// ---------- التهيئة (بالترتيب!) ----------
buildCity();
createPlayer();
spawnParkedCars();
spawnTraffic();
spawnPolice();
spawnPeds();
setupJoystick();
setupMinimap();
updateWanted();
document.getElementById('cash').textContent=cash+' $';
document.getElementById('loadmsg').style.display='none';
document.getElementById('hud').style.display='block';
showMsg('أهلاً بك في GTA العراق! امشِ بالعصا واقترب من سيارة 🚗');
loop();
