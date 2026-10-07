/* Cinema Iraq 3D - part */

var npcs=[];
function applyWalkAnim(group, walkTime, intensity){
  if(!group||!group.userData)return;
  var ud=group.userData;
  if(ud.avatarV2){avatarSetMoving(group,true,(intensity||1)>0.85);return;}
  var s=Math.sin(walkTime);
  var absS=Math.abs(s);
  var legAmp=0.75*(intensity||1);
  var armAmp=0.5*(intensity||1);
  if(ud.legs){
    if(ud.legs.left)ud.legs.left.rotation.x=s*legAmp;
    if(ud.legs.right)ud.legs.right.rotation.x=-s*legAmp;
  }
  if(ud.arms){
    if(ud.arms.left)ud.arms.left.rotation.x=-s*armAmp;
    if(ud.arms.right)ud.arms.right.rotation.x=s*armAmp;
  }
  group.position.y=(1-absS)*0.055*(intensity||1);
  group.rotation.z=s*0.02*(intensity||1);
}
function resetWalkAnim(group,dt){
  if(!group||!group.userData)return;
  var ud=group.userData;
  if(ud.avatarV2){avatarSetMoving(group,false);return;}
  var d=Math.min(1,dt*10);
  if(ud.legs){
    if(ud.legs.left)ud.legs.left.rotation.x*=(1-d);
    if(ud.legs.right)ud.legs.right.rotation.x*=(1-d);
  }
  if(ud.arms){
    if(ud.arms.left)ud.arms.left.rotation.x*=(1-d);
    if(ud.arms.right)ud.arms.right.rotation.x*=(1-d);
  }
  group.position.y*=(1-d);
  group.rotation.z*=(1-d);
  if(Math.abs(group.position.y)<0.002)group.position.y=0;
  if(Math.abs(group.rotation.z)<0.002)group.rotation.z=0;
  if(ud.legs){
    if(ud.legs.left&&Math.abs(ud.legs.left.rotation.x)<0.005)ud.legs.left.rotation.x=0;
    if(ud.legs.right&&Math.abs(ud.legs.right.rotation.x)<0.005)ud.legs.right.rotation.x=0;
  }
  if(ud.arms){
    if(ud.arms.left&&Math.abs(ud.arms.left.rotation.x)<0.005)ud.arms.left.rotation.x=0;
    if(ud.arms.right&&Math.abs(ud.arms.right.rotation.x)<0.005)ud.arms.right.rotation.x=0;
  }
}
function spawnNPCs(){var sh=[0xe74c3c,0x9b59b6,0xf39c12,0x1abc9c,0x34495e,0x27ae60];for(var i=0;i<14;i++){var isG=Math.random()>.5;var np=buildChar({shirt:sh[Math.floor(Math.random()*sh.length)],pants:isG?0x6a1b9a:0x2c3e50,skin:0xffdbac,hair:isG?0x2c1810:0x1e272e,gender:isG?'girl':'boy',hairStyle:isG?'long':'short'});var dir=Math.random()>.5?1:-1;np.position.set((Math.random()-.5)*180,0,16+(Math.random()-.5)*1.5);np.rotation.y=dir>0?-Math.PI/2:Math.PI/2;np.userData.wt=Math.random()*10;np.userData.dir=dir;np.userData.speed=1+Math.random()*.9;scene.add(np);npcs.push(np);}}
function updateNPCs(dt){for(var i=0;i<npcs.length;i++){var np=npcs[i];np.position.x+=np.userData.dir*np.userData.speed*dt;if(np.userData.wt===undefined)np.userData.wt=0;np.userData.wt+=dt*9.5;applyWalkAnim(np,np.userData.wt,Math.min(1,np.userData.speed/2));if(np.position.x>100){np.position.x=-100;}if(np.position.x<-100){np.position.x=100;}}}
function updateAmbient(dt,time){for(var i=0;i<clouds.length;i++){clouds[i].position.x+=dt*clouds[i].userData.speed;if(clouds[i].position.x>200)clouds[i].position.x=-200;}for(var cc=0;cc<roadCars.length;cc++){var c=roadCars[cc];var dx=c.position.x-characterGroup.position.x,dz=c.position.z-characterGroup.position.z;if(dx*dx+dz*dz<6)continue;c.position.x+=c.userData.dir*c.userData.speed*dt;if(c.userData.dir>0&&c.position.x>150)c.position.x=-150;if(c.userData.dir<0&&c.position.x<-150)c.position.x=150;c.userData.spin+=dt*c.userData.speed*3;for(var wi=0;wi<c.userData.wheels.length;wi++){c.userData.wheels[wi].rotation.z=-c.userData.spin;}}for(var ti=0;ti<trees.length;ti++){trees[ti].rotation.z=Math.sin(time*1.5+trees[ti].userData.sw)*.015;}if(screenLight)screenLight.intensity=1+Math.sin(time*3)*.3;}
function updateDayNight(dt){dayCycle+=dt/DAY_LEN;if(dayCycle>1)dayCycle-=1;var sa=dayCycle*Math.PI*2-Math.PI/2,sh2=Math.sin(dayCycle*Math.PI*2-Math.PI/2);var px=characterGroup?characterGroup.position.x:0,pz=characterGroup?characterGroup.position.z:0;sunLight.position.set(px+Math.cos(sa)*40,Math.max(5,sh2*60+10),pz+Math.sin(sa)*40);sunLight.target.position.set(px,0,pz);sunLight.target.updateMatrixWorld();sunLight.intensity=Math.max(0,sh2*1.5+.4);moonLight.intensity=Math.max(0,-sh2*.5);var isNight=sh2<0;var sky=new THREE.Color();if(sh2>.2)sky.setHex(0x87ceeb);else if(sh2>-.2)sky.setHex(0xff9966);else sky.setHex(0x1a2c50);scene.background.copy(sky);scene.fog.color.copy(sky);var li=isNight?1.8:0;for(var i=0;i<lamps.length;i++){lamps[i].light.intensity=li;lamps[i].glow.material.opacity=isNight?.5:.2;}hemi.intensity=.25+Math.max(0,sh2)*.75;}

var doorOpen=0;
function updateDoor(dt){if(!characterGroup)return;var dx=characterGroup.position.x,dz=characterGroup.position.z-8;var nearDoor=Math.abs(dx)<5&&dz>-2.5&&dz<3;var canOpen=playerTickets>0||isAdmin||playerInCinema;var target=(nearDoor&&canOpen)?1:0;doorOpen+=(target-doorOpen)*Math.min(1,dt*6);var maxA=Math.PI*.48;doorLeft.rotation.y=-doorOpen*maxA;doorRight.rotation.y=doorOpen*maxA;if(colliders[doorColIdx]){if(canOpen){colliders[doorColIdx].minX=999;colliders[doorColIdx].maxX=999;}else{colliders[doorColIdx].minX=-CINEMA.doorHalf;colliders[doorColIdx].maxX=CINEMA.doorHalf;}}}
function fmtTime(s){var m=Math.floor(s/60),ss=Math.floor(s%60);return (m<10?'0':'')+m+':'+(ss<10?'0':'')+ss;}
function updateTimer(){var el=document.getElementById('td');var t=document.getElementById('td-txt');if(!playerInCinema||cinemaTimeLeft<=0){el.style.display='none';return;}el.style.display='flex';if(t)t.textContent=fmtTime(cinemaTimeLeft);}
function kickCinema(){playerInCinema=false;cinemaTimeLeft=0;document.getElementById('td').style.display='none';characterGroup.position.set(0,0,14);playerShadow.position.set(0,0,14);toast('انتهى وقتك','w');sfxErr();}
function buyTicket(){if(userBalance<TICKET_PRICE){toast('رصيدك غير كافي','e');sfxErr();return;}userBalance-=TICKET_PRICE;playerTickets++;updateBalanceDisplay();updateTicketDisplay();sfxTicket();toast('اشتريت تذكرة','s');addXP(15);saveData();}
function buyPopcorn(){if(userBalance<POPCORN_PRICE){toast('رصيدك غير كافي','e');sfxErr();return;}userBalance-=POPCORN_PRICE;playerPopcorn++;updateBalanceDisplay();sfxCoin();toast('فشار','s');addXP(5);saveData();}
function updateTicketDisplay(){var e=document.getElementById('ticket-display');if(e)e.textContent=playerTickets;}
function updateGoldDisplay(){var e=document.getElementById('gold-display');if(e)e.textContent=playerGold.toLocaleString('en');}
function updateBalanceDisplay(){var e=document.getElementById('money-display');if(e)e.innerText=userBalance.toLocaleString('en');}
function saveGame(){saveData();}
function sitSeat(seat){if(playerSitting)return;playerSitting=true;playerSeat=seat;seat.occupied=true;characterGroup.position.copy(seat.sitPos);characterGroup.rotation.y=0;playerYaw=0;playerPitch=-.05;var ud=characterGroup.userData;if(ud){ud.emote=null;myEmote='';if(ud.avatarV2&&ud.acts&&ud.acts.sitting)avatarSwitch(characterGroup,'sitting');}if(ud&&ud.legs){ud.legs.left.rotation.x=-1.4;ud.legs.right.rotation.x=-1.4;}document.getElementById('sb2').classList.remove('s');document.getElementById('stb').classList.add('s');toast('جلست','s');sfxClick();}
function standUp(){if(!playerSitting)return;playerSitting=false;if(playerSeat){playerSeat.occupied=false;playerSeat=null;}characterGroup.position.set(0,0,characterGroup.position.z+1);characterGroup.rotation.y=playerYaw;var ud=characterGroup.userData;if(ud){if(ud.avatarV2&&ud.acts)avatarSwitch(characterGroup,'idle');if(ud.legs){ud.legs.left.rotation.x=0;ud.legs.right.rotation.x=0;}if(ud.arms){ud.arms.left.rotation.x=0;ud.arms.right.rotation.x=0;}}document.getElementById('stb').classList.remove('s');toast('قمت','s');sfxClick();}
function updateSeatProx(){if(playerSitting){nearSeat=null;return;}var md=2.2,n=null;for(var i=0;i<seats.length;i++){var s=seats[i];if(s.occupied)continue;var dx=characterGroup.position.x-s.pos.x,dz=characterGroup.position.z-s.pos.z;var d=Math.sqrt(dx*dx+dz*dz);if(d<md){md=d;n=s;}}nearSeat=n;var b=document.getElementById('sb2');if(n)b.classList.add('s');else b.classList.remove('s');}

var custWalk=0,custPath=[],custPathIdx=0;
function spawnCust(){if(customer)return;var empty=[];for(var i=0;i<seats.length;i++)if(!seats[i].occupied)empty.push(seats[i]);if(!empty.length)return;targetSeat=empty[Math.floor(Math.random()*empty.length)];var sh=[0xe74c3c,0x9b59b6,0xf39c12,0x1abc9c,0x34495e];customer=buildChar({shirt:sh[Math.floor(Math.random()*sh.length)],pants:0x2c3e50,skin:0xf0c8a0,hair:0x2c1810,gender:Math.random()>.5?'girl':'boy'});customer.position.set((Math.random()-.5)*6,0,16);scene.add(customer);custPath=[new THREE.Vector3(customer.position.x,0,9),new THREE.Vector3(0,0,3),new THREE.Vector3(targetSeat.pos.x,0,targetSeat.pos.z+1)];custPathIdx=0;custState='in';targetSeat.occupied=true;}
function move3D(t,dt,sp){sp=sp||3.2;var dx=t.x-customer.position.x,dy=t.y-customer.position.y,dz=t.z-customer.position.z;var d=Math.sqrt(dx*dx+dy*dy+dz*dz);if(d<.18)return true;var st=Math.min(d,sp*dt);customer.position.x+=dx/d*st;customer.position.y+=dy/d*st;customer.position.z+=dz/d*st;customer.rotation.y=Math.atan2(-dx,-dz);custWalk+=dt*9;var a=Math.sin(custWalk)*.6;customer.userData.legs.left.rotation.x=a;customer.userData.legs.right.rotation.x=-a;return false;}
function updateCust(dt){if(!customer)return;if(custState==='in'){if(move3D(custPath[custPathIdx],dt)){custPathIdx++;if(custPathIdx>=custPath.length){custState='watch';var wt=5000+Math.random()*5000;setTimeout(function(){if(!customer)return;custPath=[new THREE.Vector3(0,0,3),new THREE.Vector3(customer.position.x,0,9),new THREE.Vector3(customer.position.x,0,16)];custPathIdx=0;custState='out';if(targetSeat){targetSeat.occupied=false;targetSeat=null;}},wt);}}}else if(custState==='out'){if(move3D(custPath[custPathIdx],dt)){custPathIdx++;if(custPathIdx>=custPath.length){scene.remove(customer);customer=null;custState='none';}}}}

;

var jz=document.getElementById('jz'),jst=document.getElementById('jst');
var jTouch=null,lTouch=null,llx=0,lly=0;
function isModalOpen(){return document.getElementById('shop-modal').classList.contains('a')||document.getElementById('admin-modal').classList.contains('a')||document.getElementById('youtube-modal').classList.contains('a')||document.getElementById('settings-modal').classList.contains('a')||document.getElementById('leaderboard-modal').classList.contains('a')||document.getElementById('profile-modal').classList.contains('a')||document.getElementById('friends-modal').classList.contains('a')||document.getElementById('box-editor-modal').classList.contains('a')||document.getElementById('emote-panel').style.display==='flex'||(document.getElementById('studio-modal')&&document.getElementById('studio-modal').style.display==='flex');}
window.addEventListener('touchstart',function(e){
  if(isModalOpen()||!gameStarted)return;
  for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.target.closest('button'))continue;var r=jz.getBoundingClientRect();var inJ=t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom;if(inJ){if(jTouch===null){jTouch=t.identifier;updJoy(t,r);}}else if(lTouch===null){lTouch=t.identifier;llx=t.clientX;lly=t.clientY;}}
},{passive:false});
window.addEventListener('touchmove',function(e){
  for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.identifier===jTouch)updJoy(t,jz.getBoundingClientRect());else if(t.identifier===lTouch){var dx=t.clientX-llx,dy=t.clientY-lly;playerYaw-=dx*.006;playerPitch-=dy*.004;playerPitch=Math.max(-.5,Math.min(.6,playerPitch));llx=t.clientX;lly=t.clientY;}}
},{passive:false});
function endT(e){for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.identifier===jTouch){jTouch=null;moveInput={x:0,y:0};jst.style.transform='translate(-50%,-50%)';}else if(t.identifier===lTouch){lTouch=null;}}}
window.addEventListener('touchend',endT);window.addEventListener('touchcancel',endT);
function updJoy(t,r){var cx=r.left+r.width/2,cy=r.top+r.height/2;var dx=t.clientX-cx,dy=t.clientY-cy;var d=Math.sqrt(dx*dx+dy*dy),maxR=r.width*.33;var a=Math.atan2(dy,dx),cap=Math.min(d,maxR);var sx=Math.cos(a)*cap,sy=Math.sin(a)*cap;jst.style.transform='translate(calc(-50% + '+sx+'px),calc(-50% + '+sy+'px))';moveInput.x=sx/maxR;moveInput.y=-sy/maxR;}
var keys={};
window.addEventListener('keydown',function(e){keys[e.key.toLowerCase()]=true;if(e.key===' '&&playerSitting)standUp();if(e.key==='Escape'&&playerSitting)standUp();});
window.addEventListener('keyup',function(e){keys[e.key.toLowerCase()]=false;});
function readKB(){var x=0,y=0;if(keys['w']||keys['arrowup'])y+=1;if(keys['s']||keys['arrowdown'])y-=1;if(keys['a']||keys['arrowleft'])x-=1;if(keys['d']||keys['arrowright'])x+=1;if(x!==0||y!==0){var l=Math.sqrt(x*x+y*y);return {x:x/l,y:y/l};}return null;}
var raycaster=new THREE.Raycaster();
var wallMeshes=[cbw,clw,crw,cfl,cfr,crf];

function updatePlayer(dt){
  if(!characterGroup)return;
  if(playerSitting){var kb=readKB();var inp2=kb||moveInput;if(inp2&&(Math.abs(inp2.x)>.3||Math.abs(inp2.y)>.3)){standUp();return;}}
  var kb=playerFrozen?null:readKB();
  var inp=kb||(playerFrozen?{x:0,y:0}:moveInput);
  var sp=5.5*playerSpeedMult;
  var sy=Math.sin(playerYaw),cy=Math.cos(playerYaw);
  var dirX=inp.x*cy-inp.y*sy;
  var dirZ=-inp.x*sy-inp.y*cy;
  var nx=characterGroup.position.x+dirX*sp*dt;
  var nz=characterGroup.position.z+dirZ*sp*dt;
  if(!hit(nx,characterGroup.position.z,.35)&&!nearPlayer(nx,characterGroup.position.z)&&!nearCar(nx,characterGroup.position.z))characterGroup.position.x=nx;
  if(!hit(characterGroup.position.x,nz,.35)&&!nearPlayer(characterGroup.position.x,nz)&&!nearCar(characterGroup.position.x,nz))characterGroup.position.z=nz;
  characterGroup.position.x=Math.max(-150,Math.min(150,characterGroup.position.x));
  characterGroup.position.z=Math.max(-150,Math.min(150,characterGroup.position.z));
  playerShadow.position.x=characterGroup.position.x;playerShadow.position.z=characterGroup.position.z;
  var moving=inp.x!==0||inp.y!==0;
  var ud=characterGroup.userData;
  if(!playerSitting){
if(moving){
      characterGroup.rotation.y=playerYaw+Math.atan2(-inp.x,inp.y);
      playerWalkTime+=dt*9.5;
      var s=Math.sin(playerWalkTime);
      var absS=Math.abs(s);
      var legAmp=0.75;
      ud.legs.left.rotation.x=s*legAmp;
      ud.legs.right.rotation.x=-s*legAmp;
      var armAmp=0.5;
      ud.arms.left.rotation.x=-s*armAmp;
      ud.arms.right.rotation.x=s*armAmp;
      var bob=(1-absS)*0.055;
      characterGroup.position.y=bob;
      characterGroup.rotation.z=s*0.02;
    }else{
      var d=Math.min(1,dt*10);
      ud.legs.left.rotation.x*=(1-d);
      ud.legs.right.rotation.x*=(1-d);
      ud.arms.left.rotation.x*=(1-d);
      ud.arms.right.rotation.x*=(1-d);
      characterGroup.position.y*=(1-d);
      characterGroup.rotation.z*=(1-d);
      if(Math.abs(characterGroup.position.y)<0.002)characterGroup.position.y=0;
      if(Math.abs(characterGroup.rotation.z)<0.002)characterGroup.rotation.z=0;
      if(Math.abs(ud.legs.left.rotation.x)<0.005)ud.legs.left.rotation.x=0;
      if(Math.abs(ud.legs.right.rotation.x)<0.005)ud.legs.right.rotation.x=0;
      if(Math.abs(ud.arms.left.rotation.x)<0.005)ud.arms.left.rotation.x=0;
      if(Math.abs(ud.arms.right.rotation.x)<0.005)ud.arms.right.rotation.x=0;
    }
  }
  var cd=playerSitting?5.5:4.2;
  var cy2=playerSitting?2.2:(2.3+playerPitch*2);
  if(playerSitting){if(camera.fov!==90){camera.fov=90;camera.updateProjectionMatrix();}}else{if(camera.fov!==72){camera.fov=72;camera.updateProjectionMatrix();}}
  var ty=characterGroup.position.y+1.2;
  var pv=new THREE.Vector3(characterGroup.position.x,ty,characterGroup.position.z);
  var de=new THREE.Vector3(characterGroup.position.x+Math.sin(playerYaw)*cd,characterGroup.position.y+cy2,characterGroup.position.z+Math.cos(playerYaw)*cd);
  var dc=de.clone().sub(pv),dcL=dc.length();dc.normalize();
  raycaster.set(pv,dc);raycaster.far=dcL;
  var h=raycaster.intersectObjects(wallMeshes,true);
  if(h.length>0){var sf=Math.max(.6,h[0].distance-.3);de.copy(pv).addScaledVector(dc,sf);}
  camera.position.copy(de);
  if(playerSitting)camera.lookAt(0,8,-19.35);else camera.lookAt(characterGroup.position.x,characterGroup.position.y+1.2,characterGroup.position.z);
  var dxC=characterGroup.position.x-CASHIER_POS.x,dzC=characterGroup.position.z-CASHIER_POS.z;
  nearCashier=Math.abs(dxC)<3.5&&Math.abs(dzC)<3.5;
  var dxP=characterGroup.position.x-POPCORN_POS.x,dzP=characterGroup.position.z-POPCORN_POS.z;
  nearPopcorn=Math.abs(dxP)<3.5&&Math.abs(dzP)<3.5;
  if(playerInCinema){cinemaTimeLeft-=dt;updateTimer();if(cinemaTimeLeft<=0)kickCinema();if(characterGroup.position.z>8.6){playerInCinema=false;cinemaTimeLeft=0;updateTimer();}if(cinemaTimeLeft>0){var tick=Math.floor((TICKET_DUR-cinemaTimeLeft)/60);if(tick>lastCinemaTickXP){lastCinemaTickXP=tick;addXP(100);}}}
  else{if(insideCinema(characterGroup.position.x,characterGroup.position.z)&&playerTickets>0){playerTickets--;cinemaTimeLeft=TICKET_DUR;playerInCinema=true;lastCinemaTickXP=0;updateTicketDisplay();updateTimer();toast('دخلت السينما','s');addXP(50);saveData();}}
  updateActionBtn();pushPos(dt);
}
function updateActionBtn(){var b=document.getElementById('ab'),l=document.getElementById('action-label');if(playerSitting){b.classList.add('h');return;}if(nearCashier){b.classList.remove('h');b.classList.remove('act');l.textContent='السعر  50 الف لكل تذكره تذكرة';}else if(nearPopcorn){b.classList.remove('h');b.classList.add('act');l.textContent='فشار';}else b.classList.add('h');}
document.getElementById('ab').addEventListener('click',function(){sfxClick();if(nearCashier)buyTicket();else if(nearPopcorn)buyPopcorn();});
document.getElementById('sb2').addEventListener('click',function(){if(nearSeat)sitSeat(nearSeat);});
document.getElementById('stb').addEventListener('click',standUp);

function openShop(){renderBoxes();renderChars();document.getElementById('shop-modal').classList.add('a');}
function closeShop(){document.getElementById('shop-modal').classList.remove('a');sfxClick();}
function switchTab(name){document.querySelectorAll('#shop-modal .tc').forEach(function(x){x.classList.remove('a');});document.querySelectorAll('#shop-modal .nb').forEach(function(x){x.classList.remove('a');});document.getElementById('tab-'+name).classList.add('a');var tabs=['boxes','chars'];var idx=tabs.indexOf(name);if(idx>=0)document.querySelectorAll('#shop-modal .nb')[idx].classList.add('a');if(name==='boxes')renderBoxes();if(name==='chars')renderChars();sfxClick();}
document.querySelectorAll('#shop-modal .nb').forEach(function(b){b.addEventListener('click',function(){switchTab(b.getAttribute('data-tab'));});});
document.getElementById('close-shop-btn').addEventListener('click',closeShop);

function renderBoxes(){
  var c=document.getElementById('boxes-content');if(!c)return;
  var h='';
  h+='<div style="display:flex;gap:8px;margin-bottom:12px">';
  h+='<div style="flex:1;text-align:center;background:linear-gradient(135deg,rgba(255,200,87,.2),rgba(80,50,0,.5));border:2px solid var(--gd);border-radius:12px;padding:8px"><div style="font-size:.55rem;color:var(--gd)">ذهبك</div><div style="font-size:1rem;font-weight:900;color:var(--gd)">'+playerGold.toLocaleString('en')+'</div></div>';
  h+='<div style="flex:1;text-align:center;background:linear-gradient(135deg,rgba(255,141,199,.2),rgba(80,0,40,.5));border:2px solid var(--cy);border-radius:12px;padding:8px"><div style="font-size:.55rem;color:var(--cy)">فتحت</div><div style="font-size:1rem;font-weight:900;color:var(--cy)">'+boxStats.opened+'</div></div>';
  h+='</div>';
  for(var i=0;i<BOX_TYPES.length;i++){
    var bt=BOX_TYPES[i];var ca=playerGold>=bt.price;
    h+='<div class="pbox-container">';
    h+='<div class="pbox-header">'+bt.name+'</div>';
    h+='<div class="pbox-info"><div class="pbox-info-row"><span>السعر</span><span class="pbox-info-val">'+bt.price+' ذهب</span></div><div class="pbox-info-row"><span>عدد الجوائز</span><span class="pbox-info-val">'+bt.rolls+'</span></div></div>';
    h+='<div class="pbox-grid">';
    var pr=bt.rewards.slice(0,6);
    for(var j=0;j<6;j++){
      if(j<pr.length){
        var rw=pr[j];var rar=getRewardRarity(rw);var icon=getRewardIcon(rw);var lbl=getRewardLabel(rw);
        h+='<div class="pbox-cell '+rar+'"><div class="cicon">'+(SVG_LIB[icon]||'')+'</div><div class="clabel">'+lbl+'</div></div>';
      }else h+='<div class="pbox-cell empty"></div>';
    }
    h+='</div><div class="pbox-price"><button class="pbox-buy" data-box="'+bt.id+'" '+(ca?'':'disabled')+'>'+(ca?'افتح - '+bt.price:'غير كافي')+'</button></div></div>';
  }
  c.innerHTML=h;
  c.querySelectorAll('[data-box]').forEach(function(b){b.addEventListener('click',function(){sfxClick();openPremiumBox(b.getAttribute('data-box'));});});
}
function findCharById(id){for(var i=0;i<chars.length;i++)if(chars[i].id===id)return chars[i];return null;}
function getRewardRarity(rw){
  if(rw.type==='charMythic')return 'mythic';
  if(rw.type==='charSpecific'){var c=findCharById(rw.charId);if(!c)return 'common';return c.mythic?'mythic':c.rarity;}
  if(rw.type==='char')return rw.rarity==='mythic'?'mythic':(rw.rarity||'common');
  if(rw.type==='money')return 'legendary';
  if(rw.type==='gold')return 'legendary';
  if(rw.type==='tickets')return 'rare';
  return 'common';
}
function getRewardIcon(rw){
  if(rw.type==='charMythic')return 'crown';
  if(rw.type==='charSpecific')return 'user';
  if(rw.type==='char')return 'user';
  if(rw.type==='money')return 'money';
  if(rw.type==='gold')return 'gold';
  if(rw.type==='tickets')return 'ticket';
  return 'gift';
}
function getRewardLabel(rw){
  if(rw.type==='charMythic')return 'ذهبي';
  if(rw.type==='charSpecific'){var c=findCharById(rw.charId);if(!c)return 'شخصية';var n=c.name.length>8?c.name.slice(0,7)+'…':c.name;return n;}
  if(rw.type==='char')return RARITY_NAME[rw.rarity]||'شخصية';
  if(rw.type==='money')return (rw.amount/1000000).toFixed(1)+'M';
  if(rw.type==='gold')return rw.amount;
  if(rw.type==='tickets')return rw.amount;
  return '؟';
}
function pickWeighted(list){var tot=0;for(var i=0;i<list.length;i++)tot+=(list[i].weight||1);if(tot<=0)return list[0];var r=Math.random()*tot;for(var i=0;i<list.length;i++){r-=(list[i].weight||1);if(r<=0)return list[i];}return list[list.length-1];}
function pickRarityChar(rar){var pool=[];for(var i=0;i<chars.length;i++){for(var j=0;j<rar.length;j++){if(chars[i].rarity===rar[j]&&!chars[i].mythic)pool.push(chars[i]);}}if(!pool.length)return chars[0];return pool[Math.floor(Math.random()*pool.length)];}
function findMythicChar(){for(var i=0;i<chars.length;i++)if(chars[i].mythic)return chars[i];return chars[chars.length-1];}
function applyReward(rw){
  if(rw.type==='money'){userBalance+=rw.amount;return{type:'money',amount:rw.amount,text:rw.amount.toLocaleString('en')+' دينار',cls:'legendary'};}
  if(rw.type==='gold'){playerGold+=rw.amount;return{type:'gold',amount:rw.amount,text:'+'+rw.amount+' ذهب',cls:'legendary'};}
  if(rw.type==='tickets'){playerTickets+=rw.amount;return{type:'ticket',amount:rw.amount,text:rw.amount+' تذاكر',cls:'rare'};}
  if(rw.type==='charMythic'){var mc=findMythicChar();var ow=false;for(var k=0;k<ownedChars.length;k++)if(ownedChars[k]===mc.id)ow=true;if(ow){userBalance+=DUPLICATE_REWARD;return{type:'money',amount:DUPLICATE_REWARD,text:'مكرر +'+DUPLICATE_REWARD.toLocaleString('en'),cls:'duplicate',isDuplicate:true,duplicateReward:DUPLICATE_REWARD};}ownedChars.push(mc.id);return{type:'char',char:mc,text:mc.name,cls:'mythic',mythic:true};}
  if(rw.type==='charSpecific'){var sc=findCharById(rw.charId);if(!sc)sc=chars[0];var owS=false;for(var kks=0;kks<ownedChars.length;kks++)if(ownedChars[kks]===sc.id)owS=true;if(owS){userBalance+=DUPLICATE_REWARD;return{type:'money',amount:DUPLICATE_REWARD,text:'مكرر +'+DUPLICATE_REWARD.toLocaleString('en'),cls:'duplicate',isDuplicate:true,duplicateReward:DUPLICATE_REWARD};}ownedChars.push(sc.id);if(sc.rarity==='legendary')boxStats.legendary++;else if(sc.rarity==='mythic')boxStats.legendary++;else if(sc.rarity==='epic')boxStats.epic++;else if(sc.rarity==='rare')boxStats.rare++;else boxStats.common++;return{type:'char',char:sc,text:sc.name,cls:sc.rarity,mythic:!!sc.mythic};}
  if(rw.type==='char'){var c=pickRarityChar([rw.rarity||'common']);var ow2=false;for(var kk=0;kk<ownedChars.length;kk++)if(ownedChars[kk]===c.id)ow2=true;if(ow2){userBalance+=DUPLICATE_REWARD;return{type:'money',amount:DUPLICATE_REWARD,text:'مكرر +'+DUPLICATE_REWARD.toLocaleString('en'),cls:'duplicate',isDuplicate:true,duplicateReward:DUPLICATE_REWARD};}ownedChars.push(c.id);if(c.rarity==='legendary')boxStats.legendary++;else if(c.rarity==='mythic')boxStats.legendary++;else if(c.rarity==='epic')boxStats.epic++;else if(c.rarity==='rare')boxStats.rare++;else boxStats.common++;return{type:'char',char:c,text:c.name,cls:c.rarity};}
  return null;
}
function openPremiumBox(boxId){
  var bt=null;for(var i=0;i<BOX_TYPES.length;i++)if(BOX_TYPES[i].id===boxId)bt=BOX_TYPES[i];if(!bt)return;
  if(playerGold<bt.price){toast('ما عندك ذهب كافي','e');sfxErr();return;}
  playerGold-=bt.price;boxStats.opened++;boxStats.totalGold+=bt.price;updateGoldDisplay();
  var rewards=[];
  for(var r=0;r<(bt.rolls||1);r++){var p=pickWeighted(bt.rewards);var a=applyReward(p);if(a)rewards.push(a);}
  updateBalanceDisplay();updateTicketDisplay();saveData();pushLeaderboard();showLoot(rewards);
}
function showLoot(rewards){
  var ov=document.getElementById('lo'),box=document.getElementById('lbox'),tit=document.getElementById('ltit');
  var res=document.getElementById('lrs'),grid=document.getElementById('lg'),cb=document.getElementById('lc');
  ov.classList.add('a');ov.classList.remove('shake','shakeStrong');box.classList.remove('ex');res.classList.remove('s');cb.classList.remove('s');
  tit.style.display='block';tit.textContent='جاري فتح البكج...';box.style.display='flex';grid.innerHTML='';
  box.innerHTML=SVG_LIB.gift;sfxOpen();
  setTimeout(function(){
    box.classList.add('ex');sfxShake();
    setTimeout(function(){
      box.style.display='none';tit.textContent='النتائج';res.classList.add('s');
      grid.className='';if(rewards.length===1)grid.classList.add('g1');else grid.classList.add('g10');
      for(var i=0;i<rewards.length;i++){
        (function(rw,idx){
          var el=document.createElement('div');el.className='li '+rw.cls;
          el.style.opacity='0';el.style.transform='rotateY(90deg) scale(.3)';
          var br=rw.isDuplicate?'duplicate':(rw.mythic?'mythic':(rw.type==='char'?rw.char.rarity:(rw.type==='ticket'?'rare':'legendary')));
          var b='<div class="lbadge">'+(RARITY_NAME[br]||'مكرر')+'</div>';
          if(rw.type==='char'){var cvId='cv_'+Date.now()+'_'+idx;var extra=rw.isDuplicate?'<div class="ldup">+'+rw.duplicateReward.toLocaleString('en')+'</div>':'';el.innerHTML=b+'<canvas class="lprev" id="'+cvId+'"></canvas><div class="ltx">'+rw.text+'</div>'+extra;grid.appendChild(el);drawCharPreview(document.getElementById(cvId),rw.char);}
          else if(rw.type==='money'){var cvM='cvM_'+Date.now()+'_'+idx;el.innerHTML=b+'<canvas class="lprev wide" id="'+cvM+'"></canvas><div class="ltx">'+rw.text+'</div>';grid.appendChild(el);drawBanknote(document.getElementById(cvM),rw.amount);}
          else if(rw.type==='ticket'){var cvT='cvT_'+Date.now()+'_'+idx;el.innerHTML=b+'<canvas class="lprev wide" id="'+cvT+'"></canvas><div class="ltx">'+rw.text+'</div>';grid.appendChild(el);drawTicketArt(document.getElementById(cvT),rw.amount);}
          else if(rw.type==='gold'){var cvG='cvG_'+Date.now()+'_'+idx;el.innerHTML=b+'<canvas class="lprev wide" id="'+cvG+'"></canvas><div class="ltx">'+rw.text+'</div>';grid.appendChild(el);drawGoldArt(document.getElementById(cvG),rw.amount);}
          setTimeout(function(){
            el.style.transition='all .5s cubic-bezier(.34,1.56,.64,1)';
            el.style.opacity='1';el.style.transform='rotateY(0deg) scale(1)';
            if(br==='mythic'){sfxMythic();ov.classList.add('shakeStrong');setTimeout(function(){ov.classList.remove('shakeStrong');},1700);spawnParticles(ov,'#ffe07a',30);spawnParticles(ov,'#ff8dc7',20);}
            else if(br==='legendary'){sfxLegendary();ov.classList.add('shakeStrong');setTimeout(function(){ov.classList.remove('shakeStrong');},1500);spawnParticles(ov,'#ff6b8a',25);}
            else if(br==='epic'){sfxEpic();spawnParticles(ov,'#c084fc',12);}
            else if(br==='rare'){sfxRare();spawnParticles(ov,'#7aa8e8',6);}
            else if(br==='duplicate'){sfxCoin();spawnParticles(ov,'#7bedb5',8);}
            else sfxCommon();
          },idx*350);
        })(rewards[i],i);
      }
      setTimeout(function(){cb.classList.add('s');},rewards.length*350+600);
    },600);
  },2200);
  cb.onclick=function(){sfxClick();ov.classList.remove('a','shake','shakeStrong');cb.classList.remove('s');box.style.display='flex';box.classList.remove('ex');};
}

var sellState={};
function sellCharacter(cid){
  var price=sellState[cid]||30000;var chName='';for(var i=0;i<chars.length;i++)if(chars[i].id===cid){chName=chars[i].name;break;}
  if(!chName){toast('غير موجودة','e');return;}
  if(!confirm('تريد تبيع "'+chName+'" مقابل '+price.toLocaleString('en')+' دينار؟'))return;
  var idx=-1;for(var k2=0;k2<ownedChars.length;k2++)if(ownedChars[k2]===cid)idx=k2;
  if(idx<0){toast('ما عندك','e');return;}
  ownedChars.splice(idx,1);userBalance+=price;
  var xpR={common:20,rare:50,epic:100,legendary:200,mythic:500};var rar='common';for(var i2=0;i2<chars.length;i2++)if(chars[i2].id===cid){rar=chars[i2].rarity;break;}
  addXP(xpR[rar]||20);updateBalanceDisplay();sfxCoin();toast('بعت '+chName,'g');saveData();renderChars();pushLeaderboard();
}
function renderChars(){
  var c=document.getElementById('chars-content');if(!c)return;sellState={};
  var tc=chars.length;var oc=ownedChars.length;var pct=Math.min(100,(oc/tc)*100);
  var prog='<div class="char-progress"><div class="char-progress-lbl"><span>مجموعتي</span><span>'+oc+' / '+tc+' ('+Math.round(pct)+'%)</span></div><div class="char-progress-track"><div class="char-progress-fill" style="width:'+pct+'%"></div></div></div>';
  if(!ownedChars.length){c.innerHTML=prog+'<div style="text-align:center;padding:40px 20px;opacity:.7"><p>ما عندك شخصيات بعد</p></div>';return;}
  var h=prog;
  h+='<div class="ac" style="margin-bottom:10px;padding:8px"><h4>شخصيتك الحالية</h4><div style="display:flex;justify-content:center"><canvas id="my_current_preview" style="width:120px;height:120px;border-radius:10px"></canvas></div></div>';
  h+='<div id="chars-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">';
  for(var i=0;i<chars.length;i++){
    var ch=chars[i],owned=false;for(var k=0;k<ownedChars.length;k++)if(ownedChars[k]===ch.id)owned=true;
    if(!owned)continue;
    var isW=player.shirt===ch.shirt&&player.hair===ch.hair&&player.gender===ch.gender;
    var sp=SELL_PRICES[ch.rarity]||30000;sellState[ch.id]=sp;
    var ec=ch.mythic?'mythic':'r'+ch.rarity[0];
    h+='<div class="cc '+ec+'" style="padding:8px">';
    h+='<canvas class="char-prev-canvas" data-char-id="'+ch.id+'" style="width:100%;aspect-ratio:1;border-radius:8px;background:#100510;display:block"></canvas>';
    h+='<div class="cn" style="margin-top:4px">'+ch.name+'</div><div class="cr" style="color:'+RARITY_COLOR[ch.rarity]+'">'+RARITY_NAME[ch.rarity]+'</div>';
    h+='<button type="button" class="cw '+(isW?'w':'')+'" data-wear="'+ch.id+'">'+(isW?'مُلبوس':'البس')+'</button>';
    if(!isW)h+='<button type="button" class="sell-btn" data-sell="'+ch.id+'">بيع ('+(sp/1000)+'K)</button>';
    h+='</div>';
  }
  h+='</div>';c.innerHTML=h;
  drawCharPreview(document.getElementById('my_current_preview'),player);
  c.querySelectorAll('.char-prev-canvas').forEach(function(cv){var cid=cv.getAttribute('data-char-id');for(var i=0;i<chars.length;i++)if(chars[i].id===cid){drawCharPreview(cv,chars[i]);break;}});
  var g=document.getElementById('chars-grid');
  if(g){g.addEventListener('click',function(e){
    var sb=e.target.closest('[data-sell]');if(sb){e.preventDefault();e.stopPropagation();sellCharacter(sb.getAttribute('data-sell'));return;}
    var wb=e.target.closest('[data-wear]');
    if(wb){e.preventDefault();e.stopPropagation();var cid=wb.getAttribute('data-wear');for(var i=0;i<chars.length;i++)if(chars[i].id===cid){var ch=chars[i];player.gender=ch.gender;player.shirt=ch.shirt;player.pants=ch.pants;player.hair=ch.hair;player.skin=ch.skin;player.hairStyle=ch.hairStyle;player.hat=ch.hat;player.glasses=ch.glasses;player.shirtStyle=ch.shirtStyle;player.eyeStyle=ch.eyeStyle;rebuildChar();saveData();sfxClick();toast('لبست '+ch.name,'s');renderChars();break;}}
  });}
}

;

function renderLeaderboard(){var c=document.getElementById('lb-content');if(!c)return;if(!leaderboardData.length){c.innerHTML='<div style="text-align:center;padding:40px 20px;opacity:.7">لا يوجد لاعبين</div>';return;}var h='';var mn=player.name;for(var i=0;i<leaderboardData.length;i++){var p=leaderboardData[i];var im=p.name===mn;var m=i===0?'1':(i===1?'2':(i===2?'3':'#'+(i+1)));h+='<div style="display:flex;align-items:center;gap:8px;background:rgba(45,15,45,.6);border:2px solid rgba(255,141,199,.15);border-radius:12px;padding:10px;margin-bottom:6px;'+(im?'border-color:#ffc857':'')+'"><div style="width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-weight:900;background:rgba(0,0,0,.4);color:#fff">'+m+'</div><div style="flex:1"><div style="font-weight:900;color:#fff">'+(im?'★ ':'')+p.name+'</div><div style="font-size:.65rem;color:#c084fc">'+(p.title||'مبتدئ')+'</div></div><div style="font-weight:900;color:#ffc857;background:rgba(0,0,0,.4);padding:3px 8px;border-radius:8px;font-family:monospace">م'+p.lvl+'</div></div>';}c.innerHTML=h;}
function openLeaderboard(){document.getElementById('leaderboard-modal').classList.add('a');renderLeaderboard();if(currentAccount)pushLeaderboard();sfxClick();}
document.getElementById('close-lb-btn').addEventListener('click',function(){document.getElementById('leaderboard-modal').classList.remove('a');sfxClick();});

function renderProfile(){var c=document.getElementById('profile-content');if(!c)return;var lvl=levelFromXP(playerXP);var title=getTitle(lvl);var h='<div style="text-align:center;padding:16px;background:linear-gradient(160deg,rgba(192,132,252,.3),rgba(45,15,45,.7));border:2px solid #c084fc;border-radius:14px;margin-bottom:12px"><div style="font-size:1.3rem;font-weight:900;color:#fff">'+player.name+'</div><div style="font-size:.85rem;color:#ffc857;font-weight:bold;margin:6px 0">'+title.name+'</div><div style="display:inline-block;background:linear-gradient(135deg,#c084fc,#7c3aed);color:#fff;padding:6px 14px;border-radius:20px;font-weight:900;font-family:monospace">مستوى '+lvl+'</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div style="background:rgba(45,15,45,.6);border:2px solid rgba(255,141,199,.15);border-radius:12px;padding:10px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:#ffc857;font-family:monospace">'+userBalance.toLocaleString('en')+'</div><div style="font-size:.6rem;color:#fff;opacity:.85">دينار</div></div><div style="background:rgba(45,15,45,.6);border:2px solid rgba(255,141,199,.15);border-radius:12px;padding:10px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:#ffc857;font-family:monospace">'+playerGold.toLocaleString('en')+'</div><div style="font-size:.6rem;color:#fff;opacity:.85">ذهب</div></div><div style="background:rgba(45,15,45,.6);border:2px solid rgba(255,141,199,.15);border-radius:12px;padding:10px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:#ffc857;font-family:monospace">'+playerTickets+'</div><div style="font-size:.6rem;color:#fff;opacity:.85">تذاكر</div></div><div style="background:rgba(45,15,45,.6);border:2px solid rgba(255,141,199,.15);border-radius:12px;padding:10px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:#ffc857;font-family:monospace">'+ownedChars.length+' / '+chars.length+'</div><div style="font-size:.6rem;color:#fff;opacity:.85">شخصيات</div></div></div>';c.innerHTML=h;}
function openProfile(){document.getElementById('profile-modal').classList.add('a');renderProfile();sfxClick();}
document.getElementById('close-profile-btn').addEventListener('click',function(){document.getElementById('profile-modal').classList.remove('a');sfxClick();});
function openSettings(){document.getElementById('settings-modal').classList.add('a');sfxClick();}
document.getElementById('close-settings-btn').addEventListener('click',function(){document.getElementById('settings-modal').classList.remove('a');sfxClick();});
document.querySelectorAll('#set-quality .po').forEach(function(el){el.addEventListener('click',function(){document.querySelectorAll('#set-quality .po').forEach(function(x){x.classList.remove('a');});el.classList.add('a');quality=el.getAttribute('data-q');applyQ(quality);saveData();sfxClick();});});
document.querySelectorAll('#set-fps .po').forEach(function(el){el.addEventListener('click',function(){document.querySelectorAll('#set-fps .po').forEach(function(x){x.classList.remove('a');});el.classList.add('a');targetFPS=parseInt(el.getAttribute('data-f'));fpsInt=targetFPS>0?1000/targetFPS:0;saveData();sfxClick();});});
document.getElementById('btn-boy').addEventListener('click',function(){changeGender('boy');});
document.getElementById('btn-girl').addEventListener('click',function(){changeGender('girl');});
function changeGender(g){player.gender=g;if(g==='girl'){player.shirt=0xff5da2;player.pants=0x6a1b9a;player.hair=0x2c1810;player.hairStyle='long';}else{player.shirt=0x00a8ff;player.pants=0x192a56;player.hair=0x1e272e;player.hairStyle='short';}rebuildChar();saveData();sfxClick();}

function extractYT(url){if(!url)return null;var p=[/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,/^([a-zA-Z0-9_-]{11})$/];for(var i=0;i<p.length;i++){var m=url.match(p[i]);if(m&&m[1])return m[1];}return null;}
function openYT(){document.getElementById('youtube-modal').classList.add('a');sfxClick();}
document.getElementById('close-yt-btn').addEventListener('click',function(){document.getElementById('youtube-modal').classList.remove('a');sfxClick();});
document.getElementById('btn-yt-play').addEventListener('click',function(){var url=document.getElementById('yt-url-input').value.trim();var vid=extractYT(url);if(!vid){toast('رابط غير صالح','e');sfxErr();return;}if(db)db.ref(SERVER_ROOM+'/cinema_video').set({videoId:vid,startedBy:player.name,startTime:Date.now(),state:'play'});ytCurrentId=vid;playYTVideo(vid);toast('شغّل للجميع','s');sfxClick();document.getElementById('youtube-modal').classList.remove('a');});
document.getElementById('btn-yt-stop').addEventListener('click',function(){if(db)db.ref(SERVER_ROOM+'/cinema_video').remove();if(ytFrame){ytFrame.remove();ytFrame=null;}ytActive=false;ytCurrentId=null;toast('أوقف','w');sfxClick();document.getElementById('youtube-modal').classList.remove('a');});
var yh=document.getElementById('yh');yh.addEventListener('click',function(){if(!ytFrame)return;ytFrame.style.pointerEvents='auto';yh.style.display='none';if(ytHintTimer)clearTimeout(ytHintTimer);ytHintTimer=setTimeout(function(){if(ytFrame)ytFrame.style.pointerEvents='none';},10000);});
var _yc1=new THREE.Vector3(),_yc2=new THREE.Vector3(),_yc3=new THREE.Vector3(),_yc4=new THREE.Vector3(),_yD=new THREE.Vector3(),_cD=new THREE.Vector3();
function updateYTFrame(){if(!ytFrame||!ytActive){if(yh)yh.style.display='none';return;}var SZ=-19.35,SW=20,SH=11;if(camera.position.z<=SZ+1){ytFrame.style.display='none';yh.style.display='none';return;}camera.getWorldDirection(_cD);_yD.set(0,8,SZ).sub(camera.position);var dc=_yD.length();_yD.normalize();if(_cD.dot(_yD)<.25){ytFrame.style.display='none';yh.style.display='none';return;}raycaster.set(camera.position,_yD);raycaster.far=dc-1.5;if(raycaster.intersectObjects(wallMeshes,true).length>0){ytFrame.style.display='none';yh.style.display='none';return;}_yc1.set(-SW/2,8+SH/2,SZ);_yc2.set(SW/2,8+SH/2,SZ);_yc3.set(-SW/2,8-SH/2,SZ);_yc4.set(SW/2,8-SH/2,SZ);_yc1.project(camera);_yc2.project(camera);_yc3.project(camera);_yc4.project(camera);if(_yc1.z>1||_yc2.z>1){ytFrame.style.display='none';return;}var w=innerWidth,h=innerHeight;var x1=(_yc1.x*.5+.5)*w,y1=(-_yc1.y*.5+.5)*h;var x2=(_yc2.x*.5+.5)*w,y2=(-_yc2.y*.5+.5)*h;var x3=(_yc3.x*.5+.5)*w,y3=(-_yc3.y*.5+.5)*h;var x4=(_yc4.x*.5+.5)*w,y4=(-_yc4.y*.5+.5)*h;var mnX=Math.min(x1,x2,x3,x4),mxX=Math.max(x1,x2,x3,x4);var mnY=Math.min(y1,y2,y3,y4),mxY=Math.max(y1,y2,y3,y4);var wPx=mxX-mnX,hPx=mxY-mnY;if(wPx<80||hPx<50){ytFrame.style.display='none';return;}ytFrame.style.display='block';ytFrame.style.left=mnX+'px';ytFrame.style.top=mnY+'px';ytFrame.style.width=wPx+'px';ytFrame.style.height=hPx+'px';}

function openAdmin(){if(!isAdmin)return;document.getElementById('admin-modal').classList.add('a');sfxAdmin();}
document.getElementById('close-admin-btn').addEventListener('click',function(){document.getElementById('admin-modal').classList.remove('a');sfxClick();});
document.getElementById('admin-add-money').addEventListener('click',function(){var v=parseInt(document.getElementById('admin-money-input').value)||0;userBalance+=v;updateBalanceDisplay();sfxCoin();saveData();});
document.getElementById('admin-rem-money').addEventListener('click',function(){var v=parseInt(document.getElementById('admin-money-input').value)||0;userBalance=Math.max(0,userBalance-v);updateBalanceDisplay();sfxCoin();saveData();});
document.getElementById('admin-give-gold-me').addEventListener('click',function(){var v=parseInt(document.getElementById('admin-gold-input').value)||0;playerGold+=v;updateGoldDisplay();sfxCoin();saveData();});
document.getElementById('admin-give-tickets').addEventListener('click',function(){var v=parseInt(document.getElementById('admin-ticket-input').value)||0;playerTickets+=v;updateTicketDisplay();sfxTicket();saveData();});
document.getElementById('admin-add-xp').addEventListener('click',function(){var v=parseInt(document.getElementById('admin-xp-input').value)||0;addXP(v);sfxLevelUp();});
document.getElementById('admin-open-box-editor').addEventListener('click',function(){document.getElementById('box-editor-modal').classList.add('a');loadBoxEditor();sfxClick();});
document.getElementById('admin-give-offline').addEventListener('click',function(){var name=document.getElementById('admin-offline-name').value.trim();var g=parseInt(document.getElementById('admin-offline-gold').value)||0;var m=parseInt(document.getElementById('admin-offline-money').value)||0;var t=parseInt(document.getElementById('admin-offline-tickets').value)||0;if(!name){toast('اكتب اسم','e');sfxErr();return;}if(!db){toast('لا يوجد اتصال','e');sfxErr();return;}var key=name.replace(/[.#$\[\]/]/g,'_');db.ref(SERVER_ROOM+'/offline_gifts/'+key).push({gold:g,money:m,tickets:t,from:player.name,t:Date.now()});toast('أُرسلت لـ '+name,'g');sfxCoin();});
document.querySelectorAll('.tp2').forEach(function(b){b.addEventListener('click',function(){var x=parseFloat(b.getAttribute('data-tx')),z=parseFloat(b.getAttribute('data-tz'));characterGroup.position.set(x,.4,z);sfxAdmin();toast('انتقلت','ad');});});
document.querySelectorAll('.sp2').forEach(function(b){b.addEventListener('click',function(){playerSpeedMult=parseFloat(b.getAttribute('data-sp'));sfxAdmin();toast('السرعة','ad');});});
document.getElementById('admin-freeze-player').addEventListener('click',function(){playerFrozen=!playerFrozen;sfxAdmin();toast(playerFrozen?'تجمد':'انفك','ad');});
document.querySelectorAll('.w2').forEach(function(b){b.addEventListener('click',function(){var w=b.getAttribute('data-w');setupWeather(w);currentWeather=w;sfxAdmin();saveData();toast('الطقس','ad');});});

var beRewards=[];
function loadBoxEditor(){
  var boxId=document.getElementById('be-box-select').value;
  var bt=null;
  for(var i=0;i<BOX_TYPES.length;i++)if(BOX_TYPES[i].id===boxId)bt=BOX_TYPES[i];
  if(!bt)return;
  document.getElementById('be-price').value=bt.price;
  document.getElementById('be-rolls').value=bt.rolls||1;
  beRewards=[];
  for(var j=0;j<bt.rewards.length;j++){
    var rw=bt.rewards[j];
    var item={type:rw.type,amount:rw.amount||0,rarity:rw.rarity||'common',weight:rw.weight||50};
    if(rw.type==='charSpecific')item.charId=rw.charId||chars[0].id;
    beRewards.push(item);
  }
  renderBeRewards();
}
function renderBeRewards(){
  var c=document.getElementById('be-rewards-list');
  var h='';
  for(var i=0;i<beRewards.length;i++){
    var rw=beRewards[i];
    h+='<div class="be-reward" data-idx="'+i+'">';
    h+='<div class="be-reward-row"><label>النوع</label>';
    h+='<select class="be-type" data-idx="'+i+'">';
    h+='<option value="money"'+(rw.type==='money'?' selected':'')+'>فلوس</option>';
    h+='<option value="gold"'+(rw.type==='gold'?' selected':'')+'>ذهب</option>';
    h+='<option value="tickets"'+(rw.type==='tickets'?' selected':'')+'>تذاكر</option>';
    h+='<option value="char"'+(rw.type==='char'?' selected':'')+'>شخصية عشوائية</option>';
    h+='<option value="charSpecific"'+(rw.type==='charSpecific'?' selected':'')+'>🎯 شخصية محددة</option>';
    h+='<option value="charMythic"'+(rw.type==='charMythic'?' selected':'')+'>الذهبية</option>';
    h+='</select>';
    h+='<button class="be-del" data-del="'+i+'">X</button></div>';
    if(rw.type==='money'||rw.type==='gold'||rw.type==='tickets'){
      h+='<div class="be-reward-row"><label>المبلغ</label><input type="number" class="be-amount" data-idx="'+i+'" value="'+(rw.amount||0)+'"></div>';
    }
    if(rw.type==='char'){
      h+='<div class="be-reward-row"><label>الندرة</label><select class="be-rarity" data-idx="'+i+'">';
      h+='<option value="common"'+(rw.rarity==='common'?' selected':'')+'>شائع</option>';
      h+='<option value="rare"'+(rw.rarity==='rare'?' selected':'')+'>نادر</option>';
      h+='<option value="epic"'+(rw.rarity==='epic'?' selected':'')+'>ملحمي</option>';
      h+='<option value="mythic"'+(rw.rarity==='mythic'?' selected':'')+'>ذهبي</option>';
      h+='<option value="legendary"'+(rw.rarity==='legendary'?' selected':'')+'>أسطوري</option>';
      h+='</select></div>';
    }
    if(rw.type==='charSpecific'){
      var selCh=findCharById(rw.charId)||chars[0];
      h+='<div class="be-reward-row"><label>الشخصية</label><select class="be-char" data-idx="'+i+'">';
      for(var ci=0;ci<chars.length;ci++){
        var ch=chars[ci];
        var sel=(rw.charId===ch.id)?' selected':'';
        var rar=RARITY_NAME[ch.rarity]||'شخصية';
        h+='<option value="'+ch.id+'"'+sel+'>'+ch.name+' — '+rar+'</option>';
      }
      h+='</select></div>';
      h+='<div class="be-reward-row" style="justify-content:center"><canvas class="be-preview" data-idx="'+i+'" width="100" height="100" style="width:100px;height:100px;border-radius:8px;border:2px solid #ff8dc7;background:#100510"></canvas></div>';
      h+='<div style="text-align:center;font-size:.65rem;color:#ffc857;font-weight:bold;margin-top:4px" class="be-name-disp" data-idx="'+i+'">'+selCh.name+'</div>';
    }
    h+='<div class="be-reward-row"><label>الحظ</label><input type="number" class="be-weight" data-idx="'+i+'" value="'+rw.weight+'"></div>';
    h+='</div>';
  }
  c.innerHTML=h;

  c.querySelectorAll('.be-preview').forEach(function(cvv){
    var idx=parseInt(cvv.getAttribute('data-idx'));
    var rw=beRewards[idx];
    var ch=findCharById(rw.charId);
    if(ch&&window.drawCharPreview)window.drawCharPreview(cvv,ch);
  });

  c.querySelectorAll('.be-type').forEach(function(el){
    el.addEventListener('change',function(){
      var idx=parseInt(this.getAttribute('data-idx'));
      beRewards[idx].type=this.value;
      if(this.value==='charSpecific'&&!beRewards[idx].charId)beRewards[idx].charId=chars[0].id;
      if(this.value==='char'&&!beRewards[idx].rarity)beRewards[idx].rarity='common';
      if((this.value==='money'||this.value==='gold'||this.value==='tickets')&&!beRewards[idx].amount)beRewards[idx].amount=100000;
      renderBeRewards();sfxClick();
    });
  });
  c.querySelectorAll('.be-rarity').forEach(function(el){
    el.addEventListener('change',function(){beRewards[parseInt(this.getAttribute('data-idx'))].rarity=this.value;});
  });
  c.querySelectorAll('.be-char').forEach(function(el){
    el.addEventListener('change',function(){
      var idx=parseInt(this.getAttribute('data-idx'));
      beRewards[idx].charId=this.value;
      var ch=findCharById(this.value);
      var cvv=c.querySelector('.be-preview[data-idx="'+idx+'"]');
      if(cvv&&ch&&window.drawCharPreview)window.drawCharPreview(cvv,ch);
      var nd=c.querySelector('.be-name-disp[data-idx="'+idx+'"]');
      if(nd&&ch)nd.textContent=ch.name;
      sfxClick();
    });
  });
  c.querySelectorAll('.be-amount').forEach(function(el){
    el.addEventListener('change',function(){beRewards[parseInt(this.getAttribute('data-idx'))].amount=parseInt(this.value)||0;});
  });
  c.querySelectorAll('.be-weight').forEach(function(el){
    el.addEventListener('change',function(){beRewards[parseInt(this.getAttribute('data-idx'))].weight=parseFloat(this.value)||1;});
  });
  c.querySelectorAll('[data-del]').forEach(function(el){
    el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-del'));beRewards.splice(idx,1);renderBeRewards();sfxClick();});
  });
}
document.getElementById('be-box-select').addEventListener('change',function(){loadBoxEditor();sfxClick();});
document.getElementById('be-add-reward').addEventListener('click',function(){beRewards.push({type:'money',amount:100000,weight:50});renderBeRewards();sfxClick();});
document.getElementById('be-save').addEventListener('click',function(){var boxId=document.getElementById('be-box-select').value;var data={price:parseInt(document.getElementById('be-price').value)||50,rolls:parseInt(document.getElementById('be-rolls').value)||1,rewards:beRewards};if(db)db.ref(SERVER_ROOM+'/box_overrides/'+boxId).set(data);toast('تم الحفظ','g');sfxAdmin();});
document.getElementById('be-reset').addEventListener('click',function(){var boxId=document.getElementById('be-box-select').value;if(!confirm('رجع الافتراضي؟'))return;if(db)db.ref(SERVER_ROOM+'/box_overrides/'+boxId).remove();toast('رجع الافتراضي','w');sfxClick();setTimeout(loadBoxEditor,500);});
document.getElementById('close-box-editor').addEventListener('click',function(){document.getElementById('box-editor-modal').classList.remove('a');sfxClick();});

document.getElementById('shop-btn').addEventListener('click',function(){openShop();sfxClick();});
document.getElementById('box-btn').addEventListener('click',function(){openShop();switchTab('boxes');sfxClick();});
document.getElementById('youtube-btn').addEventListener('click',openYT);
document.getElementById('menu-btn').addEventListener('click',function(){sfxClick();if(confirm('تسجيل الخروج؟')){saveData();location.reload();}});
document.getElementById('admin-btn').addEventListener('click',openAdmin);
document.getElementById('settings-btn').addEventListener('click',openSettings);
document.getElementById('music-btn').addEventListener('click',function(){toggleMusic();sfxClick();});
document.getElementById('chat-btn').addEventListener('click',function(){document.getElementById('cp').classList.toggle('o');sfxClick();});
document.getElementById('emote-btn').addEventListener('click',function(){var p=document.getElementById('emote-panel');p.style.display=(p.style.display==='flex')?'none':'flex';sfxClick();});
(function(){var eb=document.querySelectorAll('#emote-panel [data-emote]');for(var i=0;i<eb.length;i++){eb[i].addEventListener('click',function(){playEmote(characterGroup,this.getAttribute('data-emote'));document.getElementById('emote-panel').style.display='none';});}})();
document.getElementById('friends-btn').addEventListener('click',openFriends);
document.getElementById('close-friends-btn').addEventListener('click',closeFriends);
document.getElementById('ftab-list').addEventListener('click',function(){friendsTab='list';renderFriends();sfxClick();});
document.getElementById('ftab-req').addEventListener('click',function(){friendsTab='req';renderFriends();sfxClick();});
document.getElementById('ftab-add').addEventListener('click',function(){friendsTab='add';renderFriends();sfxClick();});
document.getElementById('leaderboard-btn').addEventListener('click',openLeaderboard);
document.getElementById('profile-btn').addEventListener('click',openProfile);
document.getElementById('cs').addEventListener('click',sendChat);
document.getElementById('ci').addEventListener('keydown',function(e){if(e.key==='Enter')sendChat();});

/* ═══════ نظام الرقصات والحركات + الأصدقاء ═══════ */
var EMOTES={
  dance:{label:'رقص',dur:4},
  wave:{label:'تلويح',dur:2.5},
  jump:{label:'قفز',dur:1.4},
  spin:{label:'دوران',dur:1.8}
};
var myEmote='',myEmoteT=0;
function playEmote(group,name){
  if(!group||!group.userData||!EMOTES[name])return;
  if(group===characterGroup&&playerSitting){toast('قف أولاً 🙂','w');return;}
  var ud=group.userData;
  ud.emote={name:name,t0:gameTime};
  if(ud.acts){
    var clip=name==='dance'?'dance':(name==='wave'?'wave':(name==='jump'?'jump':null));
    if(clip&&ud.acts[clip]){
      avatarSwitch(group,clip);
      setTimeout(function(){try{if(ud.acts&&ud.acts.idle&&!ud.emote)avatarSwitch(group,'idle');}catch(e){}},EMOTES[name].dur*1000);
    }
  }
  if(group===characterGroup){myEmote=name;myEmoteT=Date.now();sfxClick();}
}
function resetEmotePose(g){
  var ud=g.userData;if(!ud)return;
  if(ud.legs){if(ud.legs.left)ud.legs.left.rotation.set(0,0,0);if(ud.legs.right)ud.legs.right.rotation.set(0,0,0);}
  if(ud.arms){if(ud.arms.left)ud.arms.left.rotation.set(0,0,0);if(ud.arms.right)ud.arms.right.rotation.set(0,0,0);}
  g.position.y=0;g.rotation.z=0;
}
function procEmote(g,name,t,dt){
  var ud=g.userData;
  var L=ud.legs&&ud.legs.left,R=ud.legs&&ud.legs.right,AL=ud.arms&&ud.arms.left,AR=ud.arms&&ud.arms.right;
  if(name==='dance'){
    g.position.y=Math.abs(Math.sin(t*9))*.28;
    g.rotation.z=Math.sin(t*4.5)*.09;
    if(AL){AL.rotation.x=-.4+Math.sin(t*9)*.5;AL.rotation.z=2.5+Math.sin(t*9)*.35;}
    if(AR){AR.rotation.x=-.4-Math.sin(t*9)*.5;AR.rotation.z=-2.5-Math.sin(t*9)*.35;}
    if(L)L.rotation.x=Math.sin(t*9)*.55;
    if(R)R.rotation.x=-Math.sin(t*9)*.55;
  }else if(name==='wave'){
    if(AR){AR.rotation.z=-2.7;AR.rotation.x=Math.sin(t*13)*.55;}
    if(AL){AL.rotation.z=.15;AL.rotation.x=0;}
    g.position.y=Math.abs(Math.sin(t*6))*.06;
  }else if(name==='jump'){
    var k=Math.sin(Math.min(1,t/1.4)*Math.PI);
    g.position.y=k*.9;
    if(AL)AL.rotation.z=2.6;if(AR)AR.rotation.z=-2.6;
    if(L)L.rotation.x=-.5*k;if(R)R.rotation.x=-.5*k;
  }else if(name==='spin'){
    g.rotation.y+=dt*13;
    g.position.y=Math.abs(Math.sin(t*10))*.12;
    if(AL)AL.rotation.z=1.4;if(AR)AR.rotation.z=-1.4;
  }
}
function updateEmoteMesh(g,dt){
  if(!g||!g.userData||!g.userData.emote)return;
  var ud=g.userData,em=ud.emote,el=gameTime-em.t0;
  if(el>=EMOTES[em.name].dur){ud.emote=null;resetEmotePose(g);if(g===characterGroup)myEmote='';return;}
  if(ud.legs||ud.arms)procEmote(g,em.name,el,dt);
}
function updateEmotes(dt){
  if(typeof characterGroup!=='undefined'&&characterGroup)updateEmoteMesh(characterGroup,dt);
  if(typeof otherMeshes!=='undefined')for(var uid in otherMeshes)updateEmoteMesh(otherMeshes[uid],dt);
}
/* ─── الأصدقاء ─── */
function safeName(n){return String(n||'').replace(/[.#$\[\]\/'"]/g,'_').slice(0,40);}
function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
var friendsCache={},freqCache={},friendsTab='list',friendsOpen=false;
function watchFriends(){
  if(!db||!player||!player.name)return;
  var me=safeName(player.name);
  db.ref(SERVER_ROOM+'/friends/'+me).on('value',function(s){friendsCache=s.val()||{};updateFreqBadge();if(friendsOpen)renderFriends();});
  db.ref(SERVER_ROOM+'/freq/'+me).on('value',function(s){
    var old=Object.keys(freqCache).length;freqCache=s.val()||{};
    if(Object.keys(freqCache).length>old)toast('📩 طلب صداقة جديد!','s');
    updateFreqBadge();if(friendsOpen)renderFriends();
  });
  db.ref(SERVER_ROOM+'/freqAcc/'+me).on('child_added',function(s){
    var v=s.val();if(!v||!v.name)return;
    db.ref(SERVER_ROOM+'/friends/'+me+'/'+safeName(v.name)).set({name:v.name,t:Date.now()});
    db.ref(SERVER_ROOM+'/freqAcc/'+me+'/'+s.key).remove();
    toast('🎉 '+v.name+' قبل صداقتك!','s');try{sfxLevelUp();}catch(e){}
    if(friendsOpen)renderFriends();
  });
}
function updateFreqBadge(){
  var n=Object.keys(freqCache).length;
  var b=document.getElementById('freq-badge'),c=document.getElementById('freq-count');
  if(b){b.style.display=n?'flex':'none';b.textContent=n;}
  if(c)c.textContent=n?('('+n+')'):'';
}
function friendOnline(name){
  if(typeof otherData==='undefined')return null;
  for(var uid in otherData){var p=otherData[uid];if(p&&p.name===name)return uid;}
  return null;
}
function openFriends(){friendsOpen=true;friendsTab='list';document.getElementById('friends-modal').classList.add('a');renderFriends();sfxClick();}
function closeFriends(){friendsOpen=false;document.getElementById('friends-modal').classList.remove('a');}
function renderFriends(){
  var c=document.getElementById('friends-content');if(!c)return;
  var h='';
  if(friendsTab==='list'){
    var ks=Object.keys(friendsCache);
    if(!ks.length)h='<div style="text-align:center;opacity:.6;padding:20px">لا أصدقاء بعد<br>أضف أصدقاء من تبويب ➕</div>';
    ks.forEach(function(k){
      var f=friendsCache[k],on=friendOnline(f.name);
      h+='<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid rgba(255,255,255,.08)">'
        +'<span style="color:'+(on?'#7bedb5':'#888')+'">●</span>'
        +'<b style="flex:1">'+escapeHtml(f.name)+'</b>'
        +(on?'<button class="cb" onclick="goToFriend(\''+k+'\')">📍 انتقال</button>':'<span style="opacity:.5;font-size:12px">غير متصل</span>')
        +'<button class="cb" onclick="delFriend(\''+k+'\')">🗑</button></div>';
    });
  }else if(friendsTab==='req'){
    var ks2=Object.keys(freqCache);
    if(!ks2.length)h='<div style="text-align:center;opacity:.6;padding:20px">لا طلبات جديدة</div>';
    ks2.forEach(function(k){
      var r=freqCache[k];
      h+='<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid rgba(255,255,255,.08)">'
        +'<b style="flex:1">'+escapeHtml(r.name)+'</b>'
        +'<button class="cb" onclick="acceptFriend(\''+k+'\')">✅ قبول</button>'
        +'<button class="cb" onclick="declineFriend(\''+k+'\')">❌ رفض</button></div>';
    });
  }else{
    var added=0;
    for(var uid in otherData){
      var p=otherData[uid];if(!p||!p.name||p.name===player.name)continue;
      if(friendsCache[safeName(p.name)])continue;
      added++;
      h+='<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid rgba(255,255,255,.08)">'
        +'<span style="color:#7bedb5">●</span><b style="flex:1">'+escapeHtml(p.name)+'</b>'
        +'<button class="cb" onclick="sendFriendReq(\''+uid+'\')">➕ إضافة</button></div>';
    }
    if(!added)h='<div style="text-align:center;opacity:.6;padding:20px">لا لاعبين متصلين الآن</div>';
  }
  c.innerHTML=h;
}
function sendFriendReq(uid){
  if(!db)return;
  if(player.name==='لاعب'){toast('سجل دخول باسم أولاً','w');return;}
  var p=otherData[uid];if(!p||!p.name)return;
  db.ref(SERVER_ROOM+'/freq/'+safeName(p.name)+'/'+safeName(player.name)).set({name:player.name,t:Date.now()});
  toast('📩 أُرسل الطلب إلى '+p.name,'s');sfxClick();
}
function acceptFriend(k){
  if(!db)return;
  var r=freqCache[k];if(!r)return;
  var me=safeName(player.name);
  db.ref(SERVER_ROOM+'/friends/'+me+'/'+k).set({name:r.name,t:Date.now()});
  db.ref(SERVER_ROOM+'/freqAcc/'+k+'/'+me).set({name:player.name,t:Date.now()});
  db.ref(SERVER_ROOM+'/freq/'+me+'/'+k).remove();
  toast('🎉 أصبحت صديقاً لـ '+r.name,'s');sfxLevelUp();
}
function declineFriend(k){
  if(!db)return;
  db.ref(SERVER_ROOM+'/freq/'+safeName(player.name)+'/'+k).remove();sfxClick();
}
function delFriend(k){
  if(!db)return;
  if(!confirm('حذف '+((friendsCache[k]||{}).name||'')+' من الأصدقاء؟'))return;
  db.ref(SERVER_ROOM+'/friends/'+safeName(player.name)+'/'+k).remove();sfxClick();
}
function goToFriend(k){
  var f=friendsCache[k];if(!f)return;
  var uid=friendOnline(f.name);
  if(!uid){toast('غير متصل الآن','w');return;}
  var p=otherData[uid];
  characterGroup.position.set(p.x,0,p.z+2.5);
  closeFriends();toast('📍 انتقلت إلى '+f.name,'s');sfxClick();
}

var clock=new THREE.Clock(),gameTime=0,nextCust=3,fpsInt=1000/60,lastFrame=performance.now();
function animate(now){
  requestAnimationFrame(animate);
  try{
    if(targetFPS>0&&fpsInt>0){var el=now-lastFrame;if(el<fpsInt)return;lastFrame=now-(el%fpsInt);}
    var dt=Math.min(clock.getDelta(),.05);gameTime+=dt;
    if(gameStarted){updatePlayer(dt);updateCust(dt);updateDoor(dt);updateSeatProx();}
    updateOthers(dt);updateNPCs(dt);updateEmotes(dt);updateAvatars(dt);updateAmbient(dt,gameTime);updateWeather(dt);updateDayNight(dt);
    if(gameStarted&&!customer&&custState==='none'&&gameTime>=nextCust){spawnCust();nextCust=gameTime+8+Math.random()*5;}
    renderer.render(scene,camera);
    if(ytActive)updateYTFrame();
  }catch(e){console.error('frame',e);}
}
window.addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

function launch(){
  if(gameStarted)return;
  document.getElementById('login-screen').style.display='none';
  document.getElementById('create-screen').style.display='none';
  document.getElementById('hud').style.display='flex';
  document.getElementById('jz').style.display='block';
  document.getElementById('ab').style.display='flex';
  document.getElementById('name-chip').textContent=player.name;
  if(isAdmin){document.getElementById('admin-btn').style.display='flex';document.getElementById('name-chip').classList.add('ad');document.getElementById('name-chip').textContent='⚙ '+player.name;userBalance=999999999;playerGold=999999;}
  gameStarted=true;window.gameStarted=true;
  initAudio();startAmbient();applyQ(quality);rebuildChar();loadData();
  if(player.face)setTimeout(applyPlayerFace,300);
  fpsInt=targetFPS>0?1000/targetFPS:0;
  setTimeout(function(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();},100);
  if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length){if(!db)db=firebase.database();myPlayerRef=db.ref(SERVER_ROOM+'/players/'+myId);watchOfflineGifts();}
  updateBalanceDisplay();updateTicketDisplay();updateGoldDisplay();updateHUDLevel();
  if(currentAccount)pushLeaderboard();
  toast('مرحبا '+player.name,'s');sfxLevelUp();
}
try{initFB();}catch(e){console.warn('initFB:',e);}
renderBoxes();renderChars();spawnNPCs();
animate(performance.now());
setInterval(function(){if(gameStarted){saveData();pushLeaderboard();}},5000);
document.addEventListener('visibilitychange',function(){if(document.hidden&&gameStarted){saveData();pushLeaderboard();}});
window.addEventListener('pagehide',function(){if(gameStarted)saveData();});
window.addEventListener('beforeunload',function(){saveData();if(myPlayerRef)try{myPlayerRef.remove();}catch(e){}});

;

/* ═══════ Character Studio v8 - Final + Music ═══════ */
(function(){
'use strict';

var SK='cinema_studio_v8';
var list=[], cur=null;
var pScene,pCam,pRen,pMesh;
var pRun=false,loopActive=false;
var curRotY=0,dragging=false,lastX=0;

function def(){return{id:null,name:'شخصية جديدة',rarity:'common',gender:'boy',shirt:'#00a8ff',pants:'#192a56',hair:'#1e272e',skin:'#ffdbac',hairStyle:'short',hat:'none',glasses:'none',face:null,faceScale:1};}
cur=def();

function hx(h){if(typeof h==='number')return h;if(!h)return 0xffffff;return parseInt(String(h).replace('#',''),16);}
function toChar(c){return{shirt:hx(c.shirt),pants:hx(c.pants),hair:hx(c.hair),skin:hx(c.skin),gender:c.gender,hairStyle:c.hairStyle,hat:c.hat,glasses:c.glasses,size:1.0};}

var m=document.createElement('div');
m.id='studio-modal';
m.style.cssText='position:fixed;inset:0;z-index:8500;background:rgba(10,5,10,.98);display:none;flex-direction:column;color:#fff;font-family:system-ui,sans-serif;direction:rtl;touch-action:none';
m.innerHTML=
'<div style="padding:10px 14px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(90deg,#1a0820,#2d0d3d);border-bottom:2px solid #ff8dc7;padding-top:calc(10px + env(safe-area-inset-top,0px));flex-shrink:0">'+
'<h3 style="color:#ff8dc7;font-size:.95rem;margin:0">استوديو الشخصيات</h3>'+
'<button id="st-close" style="background:#ff6b8a;color:#fff;border:none;padding:8px 14px;border-radius:10px;font-weight:900;cursor:pointer;font-size:.85rem">إغلاق</button>'+
'</div>'+
'<div id="st-preview" style="height:40vh;min-height:230px;background:linear-gradient(180deg,#2a1a3a,#100510);position:relative;border-bottom:2px solid #ff8dc7;flex-shrink:0;overflow:hidden;touch-action:none;user-select:none">'+
'<canvas id="st-canvas" style="width:100%;height:100%;display:block;touch-action:none;user-select:none"></canvas>'+
'<div id="st-name-display" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);padding:4px 10px;border-radius:8px;font-size:.7rem;color:#ffc857;font-weight:900;pointer-events:none">جديد</div>'+
'<div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.6);padding:4px 12px;border-radius:8px;font-size:.65rem;color:#ff8dc7;font-weight:900;pointer-events:none">👆 اسحب للتدوير</div>'+
'<button id="st-rotL" style="position:absolute;top:50%;left:8px;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(255,141,199,.3);border:2px solid #ff8dc7;color:#fff;font-size:18px;font-weight:900;cursor:pointer">◀</button>'+
'<button id="st-rotR" style="position:absolute;top:50%;right:8px;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(255,141,199,.3);border:2px solid #ff8dc7;color:#fff;font-size:18px;font-weight:900;cursor:pointer">▶</button>'+
'</div>'+
'<div id="st-tabs" style="display:flex;background:#1a0820;border-bottom:1px solid rgba(255,141,199,.3);overflow-x:auto;flex-shrink:0;scrollbar-width:none">'+
'<button class="st-tab a" data-t="basic">أساسي</button>'+
'<button class="st-tab" data-t="colors">الألوان</button>'+
'<button class="st-tab" data-t="face">📷 الوجه</button>'+
'<button class="st-tab" data-t="style">الشكل</button>'+
'<button class="st-tab" data-t="lib">مكتبتي</button>'+
'</div>'+
'<div id="st-body" style="flex:1;overflow-y:auto;padding:10px;padding-bottom:120px">'+
'<div class="st-pane a" data-p="basic">'+
'<div class="st-row"><label>الاسم</label><input id="st-in-name" type="text" maxlength="20" value="شخصية جديدة"></div>'+
'<div class="st-row"><label>الجنس</label><select id="st-in-gender"><option value="boy">ولد</option><option value="girl">بنت</option></select></div>'+
'<div class="st-row"><label>الندرة</label><select id="st-in-rarity"><option value="common">شائع</option><option value="rare">نادر</option><option value="epic">ملحمي</option><option value="mythic">ذهبي</option><option value="legendary">أسطوري</option></select></div>'+
'</div>'+
'<div class="st-pane" data-p="colors">'+
'<div class="st-row"><label>القميص</label><input type="color" id="st-in-shirt" value="#00a8ff"></div>'+
'<div class="st-row"><label>البنطال</label><input type="color" id="st-in-pants" value="#192a56"></div>'+
'<div class="st-row"><label>الشعر</label><input type="color" id="st-in-hair" value="#1e272e"></div>'+
'<div class="st-row"><label>البشرة</label><input type="color" id="st-in-skin" value="#ffdbac"></div>'+
'</div>'+
'<div class="st-pane" data-p="face">'+
'<div style="background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.3);border-radius:10px;padding:12px;text-align:center;color:#ff8dc7;font-size:.75rem;margin-bottom:10px">اختر صورة واضحة للوجه</div>'+
'<input id="st-face-file" type="file" accept="image/*" style="display:none">'+
'<button id="st-face-up" style="width:100%;padding:14px;background:linear-gradient(135deg,#ff8dc7,#c2185b);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.9rem;margin-bottom:8px">📷 استيراد صورة وجه</button>'+
'<div id="st-face-wrap" style="display:none;text-align:center;padding:10px;background:rgba(0,0,0,.3);border-radius:10px;margin-bottom:8px"><img id="st-face-img" style="max-width:150px;max-height:150px;border-radius:10px;border:2px solid #ff8dc7"></div>'+
'<button id="st-face-rm" style="width:100%;padding:12px;background:linear-gradient(135deg,#dc2626,#ef4444);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.85rem;display:none">❌ إزالة الصورة</button>'+
'<div id="st-scale-wrap" style="background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.3);border-radius:10px;padding:12px;margin-top:10px;display:none">'+
'<label style="color:#ff8dc7;font-weight:bold;font-size:.75rem;display:block;margin-bottom:8px">حجم الصورة: <span id="st-face-scale-val">100%</span></label>'+
'<input id="st-face-scale" type="range" min="50" max="200" value="100" style="width:100%;accent-color:#ff8dc7">'+
'</div>'+
'</div>'+
'<div class="st-pane" data-p="style">'+
'<div class="st-row"><label>قصة الشعر</label><select id="st-in-hairStyle"><option value="short">قصير</option><option value="long">طويل</option><option value="ponytail">ذيل فرس</option><option value="spiky">سبايكي</option></select></div>'+
'<div class="st-row"><label>القبعة</label><select id="st-in-hat"><option value="none">بدون</option><option value="cap">كاب</option><option value="crown">تاج</option></select></div>'+
'<div class="st-row"><label>النظارة</label><select id="st-in-glasses"><option value="none">بدون</option><option value="round">دائرية</option><option value="sun">شمسية</option></select></div>'+
'</div>'+
'<div class="st-pane" data-p="lib">'+
'<div style="color:#ff8dc7;font-weight:bold;font-size:.85rem;margin-bottom:10px">شخصياتي المحفوظة</div>'+
'<div id="st-lib" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px"></div>'+
'</div>'+
'</div>'+
'<div style="position:fixed;bottom:0;left:0;right:0;padding:10px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));background:#1a0820;border-top:2px solid #ff8dc7;display:flex;gap:5px;z-index:5;flex-wrap:wrap">'+
'<button id="st-wear" style="flex:1;min-width:70px;padding:12px 6px;background:linear-gradient(135deg,#c084fc,#7c3aed);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.75rem">البس</button>'+
'<button id="st-reset" style="flex:.7;min-width:60px;padding:12px 6px;background:#c084fc;color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.75rem">جديد</button>'+
'<button id="st-save" style="flex:1;min-width:70px;padding:12px 6px;background:linear-gradient(135deg,#16a34a,#22c55e);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.75rem">حفظ</button>'+
'<button id="st-pub" style="flex:1.2;min-width:85px;padding:12px 6px;background:linear-gradient(135deg,#ff8dc7,#c2185b);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.72rem">🌐 نشر</button>'+
'</div>';
document.body.appendChild(m);

var stStyle=document.createElement('style');
stStyle.textContent=
'.st-row{display:flex;align-items:center;gap:8px;background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.2);border-radius:10px;padding:8px 10px;margin-bottom:6px}'+
'.st-row label{font-size:.75rem;color:#ff8dc7;font-weight:bold;min-width:75px}'+
'.st-row input[type=color]{width:44px;height:32px;border:2px solid #ff8dc7;border-radius:6px;background:none;cursor:pointer;padding:0}'+
'.st-row input[type=text]{flex:1;padding:8px;background:rgba(0,0,0,.5);border:1px solid #ff8dc7;border-radius:6px;color:#fff;font-size:.85rem;outline:none;text-align:right}'+
'.st-row select{flex:1;padding:8px;background:rgba(0,0,0,.5);color:#fff;border:1px solid #ff8dc7;border-radius:6px;font-size:.8rem;font-weight:bold;cursor:pointer}'+
'#st-tabs button{flex:1;min-width:65px;padding:10px 4px;background:none;border:none;color:#7a6070;font-weight:bold;font-size:.72rem;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}'+
'#st-tabs button.a{color:#ff8dc7;border-bottom-color:#ff8dc7}'+
'#st-tabs::-webkit-scrollbar{display:none}'+
'.st-pane{display:none}.st-pane.a{display:block}';
document.head.appendChild(stStyle);

var canvas=document.getElementById('st-canvas');

function initPrev(){
  if(pRen){pRun=true;startLoop();return;}
  pRen=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:false});
  var w=canvas.clientWidth||300;
  var h=canvas.clientHeight||230;
  pRen.setSize(w,h,false);
  pRen.setPixelRatio(Math.min(devicePixelRatio,1.5));
  pScene=new THREE.Scene();
  pScene.background=new THREE.Color(0x2a1a3a);
  pCam=new THREE.PerspectiveCamera(42,1,.1,100);
  pCam.position.set(0,1.15,-3.2);
  pCam.lookAt(0,1.05,0);
  pScene.add(new THREE.HemisphereLight(0xffffff,0x444444,1.2));
  var d1=new THREE.DirectionalLight(0xffffff,1.3);d1.position.set(3,5,-3);pScene.add(d1);
  var d2=new THREE.DirectionalLight(0xff88cc,.7);d2.position.set(-3,3,3);pScene.add(d2);
  var fl=new THREE.Mesh(new THREE.CircleGeometry(4,32),new THREE.MeshLambertMaterial({color:0x100510}));
  fl.rotation.x=-Math.PI/2;fl.position.y=-.01;pScene.add(fl);
  pRun=true;startLoop();
}
function startLoop(){if(loopActive)return;loopActive=true;stepLoop();}
function stepLoop(){
  if(!pRun){loopActive=false;return;}
  requestAnimationFrame(stepLoop);
  if(!pRen)return;
  if(canvas.clientWidth&&canvas.clientHeight&&(canvas.width!==canvas.clientWidth||canvas.height!==canvas.clientHeight)){
    pRen.setSize(canvas.clientWidth,canvas.clientHeight,false);
    pCam.aspect=canvas.clientWidth/canvas.clientHeight;
    pCam.updateProjectionMatrix();
  }
  pRen.render(pScene,pCam);
}
function stopLoop(){pRun=false;loopActive=false;}

function hideFaceMats(group){
  if(!group||!group.userData||!group.userData.faceMats)return;
  for(var i=0;i<group.userData.faceMats.length;i++)group.userData.faceMats[i].visible=false;
}

function refresh(){
  if(!pScene)return;
  if(pMesh)pScene.remove(pMesh);
  pMesh=window.buildChar(Object.assign({keepProcedural:true},toChar(cur)));
  pMesh.position.y=0;
  pMesh.rotation.y=curRotY;
  pScene.add(pMesh);
  if(cur.face){
    hideFaceMats(pMesh);
    setTimeout(function(){applyFaceToChar(pMesh,cur.face,hx(cur.skin),cur.faceScale||1);},60);
  }
  var nd=document.getElementById('st-name-display');
  if(nd)nd.textContent=cur.name||'جديد';
  if(pRen)pRen.render(pScene,pCam);
}

function onStart(x){dragging=true;lastX=x;}
function onMove(x){if(!dragging||!pMesh)return;var dx=x-lastX;lastX=x;curRotY+=dx*0.015;pMesh.rotation.y=curRotY;}
function onEnd(){dragging=false;}

canvas.addEventListener('touchstart',function(e){if(e.touches.length===1){onStart(e.touches[0].clientX);e.preventDefault();e.stopPropagation();}},{passive:false});
canvas.addEventListener('touchmove',function(e){if(e.touches.length===1){onMove(e.touches[0].clientX);e.preventDefault();e.stopPropagation();}},{passive:false});
canvas.addEventListener('touchend',function(e){onEnd();e.preventDefault();},{passive:false});
canvas.addEventListener('touchcancel',function(){onEnd();});
canvas.addEventListener('mousedown',function(e){onStart(e.clientX);e.preventDefault();});
window.addEventListener('mousemove',function(e){if(dragging)onMove(e.clientX);});
window.addEventListener('mouseup',function(){onEnd();});

document.getElementById('st-rotL').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();curRotY-=0.4;if(pMesh)pMesh.rotation.y=curRotY;});
document.getElementById('st-rotR').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();curRotY+=0.4;if(pMesh)pMesh.rotation.y=curRotY;});

function bind(id,key,isColor){
  var el=document.getElementById(id);
  if(!el)return;
  var upd=function(){if(isColor)cur[key]=el.value;else cur[key]=el.value;refresh();};
  el.addEventListener('input',upd);el.addEventListener('change',upd);
}
bind('st-in-name','name');
bind('st-in-gender','gender');
bind('st-in-rarity','rarity');
bind('st-in-shirt','shirt',true);
bind('st-in-pants','pants',true);
bind('st-in-hair','hair',true);
bind('st-in-skin','skin',true);
bind('st-in-hairStyle','hairStyle');
bind('st-in-hat','hat');
bind('st-in-glasses','glasses');

function applyFaceToChar(group,faceUrl,skinColor,scale){
  if(!group||!faceUrl)return false;
  var head=null;
  for(var i=0;i<group.children.length;i++){
    if(group.children[i].userData&&group.children[i].userData.isHead){head=group.children[i];break;}
  }
  if(!head)return false;
  scale=scale||1;
  try{
    new THREE.TextureLoader().load(faceUrl,function(tex){
      tex.wrapS=THREE.RepeatWrapping;
      tex.wrapT=THREE.RepeatWrapping;
      tex.repeat.set(1/scale,1/scale);
      tex.offset.set((1-1/scale)/2,(1-1/scale)/2);
      tex.needsUpdate=true;
      var skinMat=new THREE.MeshLambertMaterial({color:skinColor||0xffdbac});
      var faceMat=new THREE.MeshBasicMaterial({map:tex});
      head.material=[skinMat,skinMat,skinMat,skinMat,skinMat,faceMat];
      head.material.needsUpdate=true;
      if(pRen&&pScene&&pCam)pRen.render(pScene,pCam);
    });
    return true;
  }catch(e){return false;}
}

var faceFile=document.getElementById('st-face-file');
var faceUpBtn=document.getElementById('st-face-up');
var faceWrap=document.getElementById('st-face-wrap');
var faceImg=document.getElementById('st-face-img');
var faceRmBtn=document.getElementById('st-face-rm');
var scaleWrap=document.getElementById('st-scale-wrap');
var scaleSlider=document.getElementById('st-face-scale');
var scaleVal=document.getElementById('st-face-scale-val');

function updateFaceUI(){
  if(cur.face){
    faceImg.src=cur.face;
    faceWrap.style.display='block';
    faceRmBtn.style.display='block';
    scaleWrap.style.display='block';
    faceUpBtn.textContent='📷 تغيير الصورة';
    var sv=Math.round((cur.faceScale||1)*100);
    if(scaleSlider)scaleSlider.value=sv;
    if(scaleVal)scaleVal.textContent=sv+'%';
  }else{
    faceWrap.style.display='none';
    faceRmBtn.style.display='none';
    scaleWrap.style.display='none';
    faceUpBtn.textContent='📷 استيراد صورة وجه';
  }
}

function processImage(file,cb){
  var reader=new FileReader();
  reader.onload=function(e){
    var img=new Image();
    img.onload=function(){
      var maxS=256;
      var w=img.width,h=img.height;
      if(w>maxS||h>maxS){
        if(w>h){h=Math.round(h*maxS/w);w=maxS;}
        else{w=Math.round(w*maxS/h);h=maxS;}
      }
      var c=document.createElement('canvas');
      c.width=w;c.height=h;
      c.getContext('2d').drawImage(img,0,0,w,h);
      cb(c.toDataURL('image/jpeg',0.82));
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}

faceUpBtn.addEventListener('click',function(){faceFile.click();});
faceFile.addEventListener('change',function(e){
  var f=e.target.files[0];
  if(!f)return;
  processImage(f,function(url){
    cur.face=url;
    cur.faceScale=1;
    updateFaceUI();
    refresh();
    if(window.toast)toast('تم رفع الصورة','g');
  });
});
faceRmBtn.addEventListener('click',function(){
  cur.face=null;
  updateFaceUI();
  refresh();
  if(window.toast)toast('تم إزالة الصورة','w');
});
if(scaleSlider){
  scaleSlider.addEventListener('input',function(){
    var v=parseInt(this.value)||100;
    if(scaleVal)scaleVal.textContent=v+'%';
    cur.faceScale=v/100;
    if(pMesh&&cur.face){
      hideFaceMats(pMesh);
      applyFaceToChar(pMesh,cur.face,hx(cur.skin),cur.faceScale);
    }
  });
}

function saveLib(){try{localStorage.setItem(SK,JSON.stringify(list));}catch(e){}}
function loadLib(){try{var r=localStorage.getItem(SK);if(r)list=JSON.parse(r)||[];}catch(e){list=[];}}

function renderLib(){
  var c=document.getElementById('st-lib');if(!c)return;
  c.innerHTML='';
  if(!list.length){c.innerHTML='<div style="opacity:.6;font-size:.7rem;padding:20px;text-align:center;grid-column:1/-1">ما عندك شخصيات محفوظة</div>';return;}
  for(var i=0;i<list.length;i++){
    (function(ch){
      var item=document.createElement('div');
      item.style.cssText='background:rgba(45,15,45,.8);border:2px solid '+(cur.id===ch.id?'#ffc857':'rgba(255,141,199,.3)')+';border-radius:8px;padding:5px;text-align:center;cursor:pointer;font-size:.65rem;color:#fff';
      var cvv=document.createElement('canvas');
      cvv.style.cssText='width:100%;aspect-ratio:1;background:#100510;border-radius:6px;display:block;margin-bottom:3px';
      cvv.width=100;cvv.height=100;
      item.appendChild(cvv);
      var nm=document.createElement('div');
      nm.style.cssText='font-weight:bold;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
      nm.textContent=ch.name||'بدون';
      item.appendChild(nm);
      c.appendChild(item);
      setTimeout(function(){
        if(window.drawCharPreview){
          window.drawCharPreview(cvv,{shirt:hx(ch.shirt),pants:hx(ch.pants),hair:hx(ch.hair),skin:hx(ch.skin),hairStyle:ch.hairStyle,hat:ch.hat,gender:ch.gender});
        }
      },10);
      item.addEventListener('click',function(){loadCfg(ch);if(window.sfxClick)sfxClick();});
    })(list[i]);
  }
}

function loadCfg(c){
  cur=JSON.parse(JSON.stringify(c));
  if(!cur.face)cur.face=null;
  if(!cur.faceScale)cur.faceScale=1;
  document.getElementById('st-in-name').value=c.name||'';
  document.getElementById('st-in-gender').value=c.gender||'boy';
  document.getElementById('st-in-rarity').value=c.rarity||'common';
  document.getElementById('st-in-shirt').value=c.shirt||'#00a8ff';
  document.getElementById('st-in-pants').value=c.pants||'#192a56';
  document.getElementById('st-in-hair').value=c.hair||'#1e272e';
  document.getElementById('st-in-skin').value=c.skin||'#ffdbac';
  document.getElementById('st-in-hairStyle').value=c.hairStyle||'short';
  document.getElementById('st-in-hat').value=c.hat||'none';
  document.getElementById('st-in-glasses').value=c.glasses||'none';
  updateFaceUI();
  refresh();
  renderLib();
}

document.querySelectorAll('#st-tabs .st-tab').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('#st-tabs .st-tab').forEach(function(x){x.classList.remove('a');});
    this.classList.add('a');
    var t=this.getAttribute('data-t');
    document.querySelectorAll('.st-pane').forEach(function(x){x.classList.remove('a');});
    var p=document.querySelector('.st-pane[data-p="'+t+'"]');
    if(p)p.classList.add('a');
    if(t==='lib')renderLib();
  });
});

document.getElementById('st-close').onclick=function(){m.style.display='none';stopLoop();if(window.sfxClick)sfxClick();};
document.getElementById('st-reset').onclick=function(){loadCfg(def());if(window.sfxClick)sfxClick();};

document.getElementById('st-wear').onclick=function(){
  if(!window.player)window.player={};
  window.player.gender=cur.gender;
  window.player.shirt=hx(cur.shirt);
  window.player.pants=hx(cur.pants);
  window.player.hair=hx(cur.hair);
  window.player.skin=hx(cur.skin);
  window.player.hairStyle=cur.hairStyle;
  window.player.hat=cur.hat;
  window.player.glasses=cur.glasses;
  window.player.face=cur.face||null;
  window.player.faceScale=cur.faceScale||1;
  if(window.rebuildChar)window.rebuildChar();
  if(window.saveData)window.saveData();
  if(window.toast)toast('لبست: '+cur.name,'g');
  if(window.sfxLevelUp)sfxLevelUp();
};

document.getElementById('st-save').onclick=function(){
  if(!cur.name||cur.name.length<1){if(window.toast)toast('اكتب اسم','e');return;}
  if(!cur.id)cur.id='cc_'+Date.now()+'_'+Math.random().toString(36).slice(2,6);
  var f=false;
  for(var i=0;i<list.length;i++){if(list[i].id===cur.id){list[i]=JSON.parse(JSON.stringify(cur));f=true;break;}}
  if(!f)list.push(JSON.parse(JSON.stringify(cur)));
  saveLib();
  if(window.toast)toast('حفظت: '+cur.name,'g');
  if(window.sfxLevelUp)sfxLevelUp();
  renderLib();
};

document.getElementById('st-pub').onclick=function(){
  if(typeof db==='undefined'||!db){if(window.toast)toast('لا يوجد اتصال','e');return;}
  if(!cur.name||cur.name.length<1){if(window.toast)toast('اكتب اسم','e');return;}
  if(!cur.id)cur.id='cc_'+Date.now()+'_'+Math.random().toString(36).slice(2,6);
  var f=false;
  for(var i=0;i<list.length;i++){if(list[i].id===cur.id){list[i]=JSON.parse(JSON.stringify(cur));f=true;break;}}
  if(!f)list.push(JSON.parse(JSON.stringify(cur)));
  saveLib();
  var p=JSON.parse(JSON.stringify(cur));
  p.publishedBy=(window.player&&window.player.name)||'admin';
  p.publishedAt=Date.now();
  db.ref(SERVER_ROOM+'/custom_chars/'+cur.id).set(p).then(function(){
    if(window.toast)toast('نُشرت: '+cur.name,'g');
    if(window.sfxMythic)sfxMythic();
  }).catch(function(){
    if(window.toast)toast('فشل النشر','e');
  });
};

loadLib();

window.openStudio=function(){
  m.style.display='flex';
  setTimeout(function(){
    initPrev();
    refresh();
    renderLib();
    updateFaceUI();
    if(window.sfxAdmin)sfxAdmin();
  },100);
};

function injectBtn(){
  var p=document.querySelector('#admin-modal .mb');
  if(!p)return setTimeout(injectBtn,500);
  if(document.getElementById('admin-open-studio'))return;
  var s=document.createElement('div');
  s.className='ac';
  s.innerHTML='<h4>استوديو الشخصيات</h4><button class="adt go" id="admin-open-studio">افتح الاستوديو</button>';
  p.insertBefore(s,p.firstChild);
  document.getElementById('admin-open-studio').addEventListener('click',function(){
    document.getElementById('admin-modal').classList.remove('a');
    window.openStudio();
  });
}
setTimeout(injectBtn,800);

})();
