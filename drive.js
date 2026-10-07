/* Rio Drive v0.1 — قيادة على خرائط حقيقية (OpenStreetMap) — نسخة تجريبية */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};

// ---------- المشهد ----------
var scene,camera,renderer,clock;
var world=new THREE.Group(); // كل عناصر الخريطة
scene=new THREE.Scene();
scene.background=new THREE.Color(0x87b5e0);
scene.fog=new THREE.Fog(0x87b5e0,150,900);
camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,0.1,4000);
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=false;
$('game').appendChild(renderer.domElement);
clock=new THREE.Clock();
scene.add(world);
addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

// إضاءة
var sun=new THREE.DirectionalLight(0xfff2dd,1.0);sun.position.set(120,180,60);scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbdd8ff,0x4a6b3a,0.75));

// ---------- الإسقاط: خطوط طول/عرض ← أمتار ----------
var CLAT=33.3152,CLON=44.3661,LOCNAME='بغداد';
function project(lat,lon){
  return [(lon-CLON)*111320*Math.cos(CLAT*Math.PI/180), -(lat-CLAT)*110540];
}

// ---------- خامة النوافذ ----------
function winTex(){var c=document.createElement('canvas');c.width=64;c.height=64;
  var x=c.getContext('2d');x.fillStyle='#8b8f96';x.fillRect(0,0,64,64);
  x.fillStyle='#2b3f55';for(var r=0;r<4;r++)for(var q=0;q<4;q++)x.fillRect(6+q*15,6+r*15,9,9);
  var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
var WIN=winTex();

// ---------- السيارة ----------
var car={mesh:null,x:0,z:0,hd:0,v:0};
function buildCar(){
  var g=new THREE.Group();
  var bodyM=new THREE.MeshLambertMaterial({color:0xd23c2e});
  var body=new THREE.Mesh(new THREE.BoxGeometry(2,0.7,4.2),bodyM);body.position.y=0.75;g.add(body);
  var cab=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.6,2.0),
    new THREE.MeshLambertMaterial({color:0x1c2733}));cab.position.set(0,1.35,-0.2);g.add(cab);
  var wg=new THREE.CylinderGeometry(0.42,0.42,0.35,10);
  var wm=new THREE.MeshLambertMaterial({color:0x141414});
  [[-1,1.35],[1,1.35],[-1,-1.35],[1,-1.35]].forEach(function(p){
    var w=new THREE.Mesh(wg,wm);w.rotation.z=Math.PI/2;w.position.set(p[0],0.42,p[1]);g.add(w);});
  // أضواء
  var hl=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.25,0.1),
    new THREE.MeshBasicMaterial({color:0xfff6c0}));hl.position.set(0,0.8,2.12);g.add(hl);
  car.mesh=g;scene.add(g);
}
function placeCar(x,z,hd){car.x=x;car.z=z;car.hd=hd;car.v=0;}

// ---------- فيزياء القيادة ----------
var input={up:0,down:0,left:0,right:0};
function stepCar(dt){
  var maxV=42,acc=16,brk=30,drag=0.35;
  if(input.up)car.v+=acc*dt;
  else if(input.down)car.v-=car.v>1?brk*dt:8*dt;
  else car.v-=car.v*drag*dt;
  if(Math.abs(car.v)<0.15&&!input.up)car.v=0;
  car.v=Math.max(-10,Math.min(maxV,car.v));
  var steer=(input.left?-1:0)+(input.right?1:0);
  // انجراف خفيف بالسرعات العالية
  var grip=car.v>25?0.55:1;
  car.hd+=steer*(car.v/maxV)*2.4*grip*dt*(car.v>=0?1:-1);
  car.x+=Math.sin(car.hd)*car.v*dt;
  car.z+=Math.cos(car.hd)*car.v*dt;
  car.mesh.position.set(car.x,0,car.z);
  car.mesh.rotation.y=car.hd;
  // ميلان الجسم بالانعطاف
  car.mesh.rotation.z=-steer*Math.min(1,Math.abs(car.v)/maxV)*0.06;
}

// ---------- كاميرا المطاردة ----------
function stepCam(){
  var d=9,h=4.2;
  var tx=car.x-Math.sin(car.hd)*d, tz=car.z-Math.cos(car.hd)*d;
  camera.position.x+=(tx-camera.position.x)*0.12;
  camera.position.y+=(h-camera.position.y)*0.12;
  camera.position.z+=(tz-camera.position.z)*0.12;
  camera.lookAt(car.x,1.6,car.z+Math.sin(car.hd)*4);
}

// ---------- بناء الطرق ----------
var ROAD_W={motorway:11,trunk:10,primary:9,secondary:8,tertiary:7,residential:5.5,unclassified:5,service:4,living_street:4.5,pedestrian:4};
function buildRoads(ways){
  var pos=[],idx=[],vc=0;
  ways.forEach(function(w){
    var tags=w.tags||{};if(!tags.highway)return;
    var hw=ROAD_W[tags.highway]||5;
    var pts=(w.geometry||[]).map(function(p){return project(p.lat,p.lon);});
    if(pts.length<2)return;
    for(var i=0;i<pts.length;i++){
      var p=pts[i],a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];
      var dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz)||1;
      var nx=-dz/L,nz=dx/L;
      pos.push(p[0]+nx*hw/2,0.06,p[1]+nz*hw/2, p[0]-nx*hw/2,0.06,p[1]-nz*hw/2);
      if(i>0){var q=vc+i*2;idx.push(q-2,q-1,q,q-1,q+1,q);}
    }
    vc+=pts.length*2;
  });
  if(!pos.length)return;
  var g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  g.setIndex(idx);g.computeVertexNormals();
  world.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:0x33333a})));
  return ways;
}
// ---------- بناء المباني ----------
var BCOLS=[0xc9bfae,0xb8a894,0xd6cfc0,0xa89a88,0xcfc4b4,0xbfb3a0];
function buildHeight(tags){
  if(tags.height){var m=parseFloat(tags.height);if(m>2&&m<300)return m;}
  if(tags['building:levels']){var l=parseInt(tags['building:levels']);if(l>0&&l<80)return l*3.1;}
  return 7+Math.random()*9;
}
function buildBuildings(ways){
  var n=0;
  for(var wi=0;wi<ways.length&&n<700;wi++){
    var w=ways[wi];
    var tags=w.tags||{};if(!tags.building)continue;
    var gpts=(w.geometry||[]).map(function(p){return project(p.lat,p.lon);});
    if(gpts.length<4)return;
    // إزالة النقطة الأخيرة إذا مطابقة للأولى
    if(Math.abs(gpts[0][0]-gpts[gpts.length-1][0])<0.01&&Math.abs(gpts[0][1]-gpts[gpts.length-1][1])<0.01)gpts.pop();
    if(gpts.length<3)return;
    var sh=new THREE.Shape();
    sh.moveTo(gpts[0][0],-gpts[0][1]);
    for(var i=1;i<gpts.length;i++)sh.lineTo(gpts[i][0],-gpts[i][1]);
    var h=buildHeight(tags);
    var ex=new THREE.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false});
    ex.rotateX(-Math.PI/2);
    // تصغير الـ UV حتى النوافذ بحجم معقول (بلاطة كل 5 أمتار)
    var uv=ex.attributes.uv;
    for(var u=0;u<uv.count;u++)uv.setXY(u,uv.getX(u)/5,uv.getY(u)/5);
    var mat=new THREE.MeshLambertMaterial({color:BCOLS[Math.floor(Math.random()*BCOLS.length)],map:WIN,side:THREE.DoubleSide});
    var m=new THREE.Mesh(ex,mat);
    m.position.y=0;
    world.add(m);
    n++;
  }
}

// ---------- أشجار بسيطة على جوانب الطرق ----------
function buildTrees(ways){
  var tg=new THREE.ConeGeometry(1.6,4.5,7);
  var tm=new THREE.MeshLambertMaterial({color:0x2f7a35});
  var trunks=new THREE.CylinderGeometry(0.25,0.3,1.4,6);
  var trm=new THREE.MeshLambertMaterial({color:0x6b4a2e});
  var count=0;
  ways.forEach(function(w){
    var tags=w.tags||{};if(!tags.highway)return;
    var pts=(w.geometry||[]).map(function(p){return project(p.lat,p.lon);});
    for(var i=2;i<pts.length-2&&count<260;i+=6){
      var p=pts[i],a=pts[i-1],b=pts[i+1];
      var dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz)||1;
      var nx=-dz/L,nz=dx/L,side=(count%2?1:-1)*(6+Math.random()*3);
      var tx=p[0]+nx*side,tz=p[1]+nz*side;
      var trunk=new THREE.Mesh(trunks,trm);trunk.position.set(tx,0.7,tz);world.add(trunk);
      var top=new THREE.Mesh(tg,tm);top.position.set(tx,3.4,tz);world.add(top);
      count++;
    }
  });
}

// ---------- جلب بيانات OSM ----------
var OVERPASS=[
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter'
];
function overpassQuery(s,w,n,e){
  return '[out:json][timeout:25];(way["highway"](__BBOX__);way["building"](__BBOX__););out geom;'
    .replace(/__BBOX__/g,s+','+w+','+n+','+e);
}
function fetchOSM(s,w,n,e,msg){
  msg('⏳ جاري جلب بيانات الخريطة الحقيقية...<br><small>قد يستغرق 10-20 ثانية</small>');
  var qi=0;
  function attempt(){
    if(qi>=OVERPASS.length){fallbackCity(msg);return;}
    var url=OVERPASS[qi++];
    msg('⏳ الاتصال بالخادم '+(qi)+'/'+OVERPASS.length+'...');
    var xhr=new XMLHttpRequest();
    xhr.timeout=30000;
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onload=function(){
      if(xhr.status===200){
        try{buildFromOSM(JSON.parse(xhr.responseText),msg);return;}
        catch(e){attempt();return;}
      }
      attempt();
    };
    xhr.onerror=function(){attempt();};
    xhr.ontimeout=function(){attempt();};
    xhr.send('data='+encodeURIComponent(overpassQuery(s,w,n,e)));
  }
  attempt();
}

// ---------- بناء العالم من بيانات OSM ----------
var built=false;
function clearWorld(){
  while(world.children.length)world.remove(world.children[0]);
  built=false;
}
function groundPlane(size,color){
  var g=new THREE.Mesh(new THREE.PlaneGeometry(size,size),
    new THREE.MeshLambertMaterial({color:color||0x5d8a4a}));
  g.rotation.x=-Math.PI/2;world.add(g);
}
function buildFromOSM(data,msg){
  clearWorld();
  var els=data.elements||[];
  var ways=els.filter(function(e){return e.type==='way';});
  var roads=ways.filter(function(w){return w.tags&&w.tags.highway;});
  var blds=ways.filter(function(w){return w.tags&&w.tags.building;});
  msg('🏗️ بناء العالم: '+roads.length+' شارع، '+blds.length+' مبنى...');
  setTimeout(function(){
    groundPlane(3000);
    buildRoads(roads);
    buildBuildings(blds);
    buildTrees(roads);
    // ضع السيارة على أول شارع
    var placed=false;
    for(var i=0;i<roads.length&&!placed;i++){
      var g=(roads[i].geometry||[]);
      if(g.length>3){
        var p=project(g[1].lat,g[1].lon),q=project(g[2].lat,g[2].lon);
        placeCar(p[0],p[1],Math.atan2(q[0]-p[0],q[1]-p[1]));
        placed=true;
      }
    }
    if(!placed)placeCar(0,0,0);
    built=true;
    startGame();
    showMsg('📍 '+LOCNAME+' — سُق بحرية! 🎮');
  },50);
}

// ---------- مدينة بديلة إذا فشل الاتصال ----------
function fallbackCity(msg){
  msg('⚠️ تعذر جلب الخريطة الحقيقية — بناء مدينة تجريبية...');
  setTimeout(function(){
    clearWorld();
    groundPlane(1200,0x5d8a4a);
    var roadM=new THREE.MeshLambertMaterial({color:0x33333a});
    for(var i=-5;i<=5;i++){
      var r1=new THREE.Mesh(new THREE.PlaneGeometry(10,1100),roadM);
      r1.rotation.x=-Math.PI/2;r1.position.set(i*90,0.06,0);world.add(r1);
      var r2=new THREE.Mesh(new THREE.PlaneGeometry(1100,10),roadM);
      r2.rotation.x=-Math.PI/2;r2.position.set(0,0.06,i*90);world.add(r2);
    }
    for(var bx=-5;bx<5;bx++)for(var bz=-5;bz<5;bz++){
      if(Math.random()<0.7){
        var w=20+Math.random()*20,h=8+Math.random()*30;
        var b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),
          new THREE.MeshLambertMaterial({color:BCOLS[Math.floor(Math.random()*BCOLS.length)],map:WIN}));
        b.position.set(bx*90+45,h/2,bz*90+45);world.add(b);
      }
    }
    placeCar(0,0,0);
    built=true;
    startGame();
    showMsg('🏙️ مدينة تجريبية — جرّب البحث عن مدينة حقيقية من زر 🗺️');
  },50);
}

// ---------- البحث عن مدينة (Nominatim) ----------
function searchPlace(q,cb){
  var xhr=new XMLHttpRequest();
  xhr.open('GET','https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(q),true);
  xhr.onload=function(){
    try{
      var r=JSON.parse(xhr.responseText);
      if(r&&r.length){cb(parseFloat(r[0].lat),parseFloat(r[0].lon),r[0].display_name.split(',')[0]);}
      else cb(null);
    }catch(e){cb(null);}
  };
  xhr.onerror=function(){cb(null);};
  xhr.send();
}
function loadLocation(lat,lon,name){
  CLAT=lat;CLON=lon;LOCNAME=name;
  $('start').style.display='none';
  $('load').style.display='flex';
  $('hud').style.display='none';
  var msg=function(t){$('loadMsg').innerHTML=t;};
  // صندوق ~1.2 كم
  var dLat=0.0055,dLon=0.0055/Math.cos(lat*Math.PI/180);
  if(built){clearWorld();}
  fetchOSM(lat-dLat,lon-dLon,lat+dLat,lon+dLon,msg);
}

// ---------- بدء اللعب ----------
function startGame(){
  $('load').style.display='none';
  $('hud').style.display='block';
  $('loc').textContent='📍 '+LOCNAME;
  if('ontouchstart'in window)$('touch').style.display='block';
  clock.getDelta();
  animate();
}
var animating=false;
function animate(){
  if(animating)return;animating=true;
  (function loop(){
    requestAnimationFrame(loop);
    var dt=Math.min(clock.getDelta(),0.05);
    stepCar(dt);
    stepCam();
    var kmh=Math.round(Math.abs(car.v)*3.6);
    var sb=$('speed').querySelector('b');
    if(sb.textContent!=kmh)sb.textContent=kmh;
    renderer.render(scene,camera);
  })();
}

// ---------- رسائل ----------
var msgT=null;
function showMsg(t){
  var m=$('msg');m.innerHTML=t;m.style.display='block';
  clearTimeout(msgT);msgT=setTimeout(function(){m.style.display='none';},4500);
}

// ---------- التحكم ----------
addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w')input.up=1;
  if(k==='arrowdown'||k==='s')input.down=1;
  if(k==='arrowleft'||k==='a')input.left=1;
  if(k==='arrowright'||k==='d')input.right=1;
});
addEventListener('keyup',function(e){
  var k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w')input.up=0;
  if(k==='arrowdown'||k==='s')input.down=0;
  if(k==='arrowleft'||k==='a')input.left=0;
  if(k==='arrowright'||k==='d')input.right=0;
});
function bindTouch(id,key){
  var el=$(id);
  var on=function(e){e.preventDefault();input[key]=1;el.classList.add('on');};
  var off=function(e){e.preventDefault();input[key]=0;el.classList.remove('on');};
  el.addEventListener('touchstart',on,{passive:false});
  el.addEventListener('touchend',off);el.addEventListener('touchcancel',off);
}
bindTouch('tUp','up');bindTouch('tDown','down');bindTouch('tLeft','left');bindTouch('tRight','right');

// ---------- أزرار الواجهة ----------
buildCar();
$('goBtn').onclick=function(){
  var q=$('search').value.trim();
  if(!q){showMsg('اكتب اسم مدينة أولاً ✍️');return;}
  $('load').style.display='flex';
  var msg=function(t){$('loadMsg').innerHTML=t;};
  msg('🔍 البحث عن "'+q+'"...');
  searchPlace(q,function(lat,lon,name){
    if(lat===null){$('load').style.display='none';showMsg('❌ ما لقيت هالمكان — جرّب اسم ثاني');return;}
    loadLocation(lat,lon,name);
  });
};
$('search').addEventListener('keydown',function(e){if(e.key==='Enter')$('goBtn').click();});
var qb=document.querySelectorAll('.qbtn');
for(var i=0;i<qb.length;i++)(function(b){
  b.onclick=function(){$('search').value=b.getAttribute('data-q');$('goBtn').click();};
})(qb[i]);
$('back').onclick=function(){location.href='index.html';};
$('newLoc').onclick=function(){
  $('hud').style.display='none';$('touch').style.display='none';
  $('start').style.display='flex';
};
})();
