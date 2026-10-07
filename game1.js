/* Cinema Iraq 3D - part */

var SVG_LIB={
cinema:'<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5"/></svg>',
ticket:'<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4V8z"/><path d="M15 6v12" stroke-dasharray="2 3"/></svg>',
gold:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 6v2M12 16v2M9 9h4.5a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3H14"/></svg>',
money:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>',
gift:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M7.5 8a2.5 2.5 0 010-5c1.5 0 3 2 4.5 5M16.5 8a2.5 2.5 0 000-5c-1.5 0-3 2-4.5 5"/></svg>',
user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>',
trophy:'<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3"/></svg>',
video:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/></svg>',
music:'<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
chat:'<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>',
settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
menu:'<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
dance:'<svg viewBox="0 0 24 24"><circle cx="13" cy="4.5" r="2"/><path d="M13 7l-3.5 5 3 2.5L11 21M9.5 12L4 10.5M12.5 14.5l5 2.5 1 4"/></svg>',
friends:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.5a5.5 5.5 0 015 5.5"/></svg>',
shield:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
star:'<svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-6 4 2 8-6-5-6 5 2-8-6-4h7z"/></svg>',
close:'<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
minus:'<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
play:'<svg viewBox="0 0 24 24" class="fill"><path d="M6 4l15 8-15 8z"/></svg>',
stop:'<svg viewBox="0 0 24 24" class="fill"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>',
edit:'<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
save:'<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
reset:'<svg viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.5 9A9 9 0 005.4 5.4L1 10M23 14l-4.4 4.6A9 9 0 013.5 15"/></svg>',
send:'<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
bolt:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
scale:'<svg viewBox="0 0 24 24"><path d="M12 3v18M3 7l9-4 9 4M5 21h14M7 7l-3 6a3 3 0 006 0L7 7zM17 7l-3 6a3 3 0 006 0l-3-6z"/></svg>',
spark:'<svg viewBox="0 0 24 24"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>',
turtle:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="13" rx="7" ry="5"/><circle cx="6" cy="13" r="2"/><path d="M6 11v4M9 11v4M15 11v4M18 11v4M5 9l7-5 7 5"/></svg>',
walk:'<svg viewBox="0 0 24 24"><circle cx="13" cy="4" r="2"/><path d="M14 21l-2-6-3-1 1-4 4 1 2 3 3-2M8 12l-2 3M13 15l2 6"/></svg>',
run:'<svg viewBox="0 0 24 24"><circle cx="14" cy="4" r="2"/><path d="M15 21l-3-6-3-1 2-4 4 1 2 3 3-2M7 12l-3 4M13 15l3 6"/></svg>',
rocket:'<svg viewBox="0 0 24 24"><path d="M9 12l-4 4v4l4-2 4-4M15 12l4 4v4l-4-2M8 8l4-6 4 6M12 14v-6M10 16h4"/></svg>',
freeze:'<svg viewBox="0 0 24 24"><path d="M12 2v20M4 6l16 12M20 6L4 18M12 6l-3-3M12 6l3-3M12 18l-3 3M12 18l3 3"/></svg>',
cloud:'<svg viewBox="0 0 24 24"><path d="M18 10h-1.3a7 7 0 10-12 3.4A4 4 0 006 21h12a5 5 0 000-10z"/></svg>',
sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>',
rain:'<svg viewBox="0 0 24 24"><path d="M18 9h-1.3a7 7 0 10-12 3.4A4 4 0 006 20h12a5 5 0 000-10zM8 22l-2 3M12 22l-2 3M16 22l-2 3"/></svg>',
snow:'<svg viewBox="0 0 24 24"><path d="M12 2v20M4 6l16 12M20 6L4 18"/></svg>',
chair:'<svg viewBox="0 0 24 24"><path d="M6 19v2M18 19v2M6 19h12v-3a3 3 0 00-3-3H9a3 3 0 00-3 3v3zM7 13V5a2 2 0 012-2h6a2 2 0 012 2v8"/></svg>',
up:'<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
road:'<svg viewBox="0 0 24 24"><path d="M4 20L8 4M20 20L16 4M12 6v2M12 12v2M12 18v2"/></svg>',
boy:'<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3"/><path d="M12 9v8M9 21v-4M15 21v-4M8 11l-3 3M16 11l3 3"/></svg>',
girl:'<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3"/><path d="M12 9v8M9 21l-2-4h10l-2 4M9 11l-2 4M15 11l2 4"/></svg>',
crown:'<svg viewBox="0 0 24 24"><path d="M3 18h18l1-10-4 4-6-8-6 8-4-4z"/><circle cx="5" cy="6" r="1.5"/><circle cx="12" cy="3" r="1.5"/><circle cx="19" cy="6" r="1.5"/></svg>',
wifiOff:'<svg viewBox="0 0 24 24"><path d="M1 1l22 22"/><path d="M16.7 12.5a10 10 0 00-3.7-2M5 12.5a10 10 0 014.3-2.4M1.5 9a15 15 0 014-2.8M19 6.2a15 15 0 013.5 2.8M8.5 16a5 5 0 016-1.4"/><circle cx="12" cy="20" r="1" class="fill"/></svg>'
};
function applySvgIcons(){
  document.querySelectorAll('[data-svg]').forEach(function(el){
    var name=el.getAttribute('data-svg');
    if(SVG_LIB[name])el.innerHTML=SVG_LIB[name];
  });
  document.querySelectorAll('.lf.svg-ico').forEach(function(el){el.innerHTML=SVG_LIB.cinema;});
  var oi=document.querySelector('#offline-screen .oi');if(oi)oi.innerHTML=SVG_LIB.wifiOff;
  var tdIcon=document.querySelector('#td .svg-ico');if(tdIcon)tdIcon.innerHTML=SVG_LIB.bolt;
  var ni=document.querySelector('#net-indicator .svg-ico');if(ni)ni.innerHTML=SVG_LIB.wifiOff;
}
applySvgIcons();

setTimeout(function(){
  try{
    var e=document.getElementById('l1');
    if(e && e.style.display!=='none'){
      e.style.opacity='0';e.classList.add('h');
      setTimeout(function(){e.style.display='none';},500);
    }
  }catch(err){}
},4000);

var audioCtx=null,audioMaster=null,ambientGain=null,ambientStarted=false;
function initAudio(){if(audioCtx)return;try{audioCtx=new (window.AudioContext||window.webkitAudioContext)();audioMaster=audioCtx.createGain();audioMaster.gain.value=0.35;audioMaster.connect(audioCtx.destination);}catch(e){}}
function startAmbient(){if(!audioCtx||ambientStarted)return;ambientStarted=true;ambientGain=audioCtx.createGain();ambientGain.gain.value=0;ambientGain.connect(audioMaster);ambientGain.gain.linearRampToValueAtTime(0.06,audioCtx.currentTime+3);[130.81,164.81,196.00,261.63].forEach(function(freq,i){var o=audioCtx.createOscillator();var g=audioCtx.createGain();var f=audioCtx.createBiquadFilter();f.type='lowpass';f.frequency.value=800;o.type=i%2?'sine':'triangle';o.frequency.value=freq;o.detune.value=(Math.random()-.5)*8;g.gain.value=0.15;o.connect(f);f.connect(g);g.connect(ambientGain);o.start();setInterval(function(){if(!audioCtx)return;g.gain.linearRampToValueAtTime(0.08+Math.random()*0.12,audioCtx.currentTime+3);},4000+Math.random()*3000);});var bufSize=audioCtx.sampleRate*4;var noiseBuf=audioCtx.createBuffer(1,bufSize,audioCtx.sampleRate);var data=noiseBuf.getChannelData(0);for(var i=0;i<bufSize;i++)data[i]=(Math.random()*2-1)*0.3;var noise=audioCtx.createBufferSource();noise.buffer=noiseBuf;noise.loop=true;var nf=audioCtx.createBiquadFilter();nf.type='bandpass';nf.frequency.value=400;nf.Q.value=1.5;var ng=audioCtx.createGain();ng.gain.value=0.04;noise.connect(nf);nf.connect(ng);ng.connect(ambientGain);noise.start();}
function resumeAudio(){if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();}
function tone(freq,dur,type,vol,attack){if(!audioCtx)return;dur=dur||0.15;type=type||'sine';vol=vol||0.08;attack=attack||0.008;try{var t=audioCtx.currentTime;var o=audioCtx.createOscillator();var g=audioCtx.createGain();var f=audioCtx.createBiquadFilter();f.type='lowpass';f.frequency.value=3000;o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+attack);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(f);f.connect(g);g.connect(audioMaster);o.start(t);o.stop(t+dur+0.05);}catch(e){}}
function chord(freqs,dur,type,vol){if(!audioCtx)return;freqs.forEach(function(f,i){setTimeout(function(){tone(f,dur||0.4,type||'triangle',vol||0.06);},i*40);});}
function sfxClick(){tone(880,0.06,'sine',0.05);tone(1320,0.04,'sine',0.03);}
function sfxOpen(){chord([523.25,659.25,783.99],0.5,'triangle',0.07);}
function sfxCommon(){tone(440,0.15,'sine',0.06);tone(660,0.12,'sine',0.04);}
function sfxRare(){chord([554.37,659.25,830.61],0.4,'triangle',0.07);}
function sfxEpic(){chord([440,554.37,659.25,880],0.55,'triangle',0.08);}
function sfxLegendary(){chord([392,523.25,659.25,783.99,1046.5],0.7,'triangle',0.09);tone(1568,0.4,'sine',0.06);}
function sfxMythic(){chord([261.63,392,523.25,659.25,783.99,1046.5],0.9,'triangle',0.1);setTimeout(function(){tone(1568,0.6,'sine',0.08);tone(2093,0.5,'sine',0.06);},500);}
function sfxErr(){tone(180,0.2,'sawtooth',0.06);}
function sfxCoin(){tone(1760,0.1,'sine',0.06);setTimeout(function(){tone(2093,0.12,'sine',0.05);},60);}
function sfxTicket(){chord([659.25,880,1046.5],0.3,'triangle',0.06);}
function sfxAdmin(){chord([392,523.25,783.99],0.4,'triangle',0.06);}
function sfxLevelUp(){chord([523.25,659.25,783.99,1046.5,1318.5],0.6,'triangle',0.08);}
function sfxShake(){tone(80,0.3,'sawtooth',0.08);}
function checkNet(){var off=!navigator.onLine;var offScr=document.getElementById('offline-screen');var ni=document.getElementById('net-indicator');if(off && window.gameStarted){if(offScr)offScr.style.display='flex';if(ni)ni.classList.add('s');}else{if(offScr)offScr.style.display='none';if(ni)ni.classList.remove('s');}}
window.addEventListener('online',checkNet);window.addEventListener('offline',checkNet);setInterval(checkNet,3000);

;

var lb1=document.getElementById('lb1'),lb2=document.getElementById('lb2');
function animBar(bar,ms,cb){try{var s=performance.now();(function step(){var t=Math.min(1,(performance.now()-s)/ms);if(bar)bar.style.width=(t*100)+'%';if(t<1)requestAnimationFrame(step);else if(cb)cb();})();}catch(e){if(cb)cb();}}
animBar(lb1,1500,function(){setTimeout(function(){var e=document.getElementById('l1');if(e){e.style.opacity='0';e.classList.add('h');setTimeout(function(){e.style.display='none';},600);}},300);});
function showL2(t,s){document.getElementById('lt2').textContent=t;document.getElementById('ls2').textContent=s;var e=document.getElementById('l2');e.style.display='flex';e.style.opacity='1';e.classList.remove('h');lb2.style.width='0%';animBar(lb2,1200);}
function hideL2(){var e=document.getElementById('l2');e.style.opacity='0';e.classList.add('h');setTimeout(function(){e.style.display='none';},600);}

var SERVER_ROOM='cinema_iraq_main',ADMIN_NAME='رضا',ADMIN_PWD='qqqqqaaa';
var START_BAL=100000,TICKET_PRICE=50000,POPCORN_PRICE=500,TICKET_DUR=600;
var isAdmin=false,userBalance=START_BAL,playerGold=0,playerTickets=0,playerPopcorn=0;
var musicOn=false,musicNodes=[],quality='medium',targetFPS=0;
var currentAccount=null,gameStarted=false,playerFloor=0,playerYaw=Math.PI,playerPitch=0,playerWalkTime=0;
var playerSpeedMult=1,playerFrozen=false,currentWeather='none',dayCycle=0.25,DAY_LEN=240;
var player={name:'لاعب',gender:'boy',shirt:0x00a8ff,pants:0x192a56,hair:0x1e272e,skin:0xffdbac,hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'normal',face:null,faceScale:1};
var ownedChars=[],cinemaTimeLeft=0,playerInCinema=false;
var playerSitting=false,playerSeat=null,nearSeat=null,nearCashier=false,nearPopcorn=false;
var moveInput={x:0,y:0},customer=null,custState='none',targetSeat=null;
var ytFrame=null,ytActive=false,ytHintTimer=null,ytCurrentId=null;
var boxStats={opened:0,common:0,rare:0,epic:0,legendary:0,money:0,tickets:0,totalGold:0};
var playerXP=0,playerLevel=1,lastCinemaTickXP=0,chatXPCount=0,chatXPDate='';
var DUPLICATE_REWARD=250000;
var SELL_PRICES={common:30000,rare:100000,epic:350000,mythic:700000,legendary:1000000};
var leaderboardData=[];
var boxOverrides={};
var firebaseReady=false,db=null,myPlayerRef=null;
var otherMeshes={},otherData={},myId='c'+Math.random().toString(36).slice(2,10),lastChat=0;

var RARITY_NAME={common:'شائع',rare:'نادر',epic:'ملحمي',mythic:'ذهبي',legendary:'أسطوري'};
var RARITY_COLOR={common:'#c0a8b8',rare:'#7aa8e8',epic:'#c084fc',mythic:'#ffe07a',legendary:'#ff6b8a'};

var chars=[
{id:'c1',name:'ازرق كلاسيكي',gender:'boy',shirt:0x00a8ff,pants:0x192a56,hair:0x1e272e,skin:0xffdbac,rarity:'common',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c2',name:'احمر ناري',gender:'boy',shirt:0xff3030,pants:0x1a1a2e,hair:0x0a0a0a,skin:0xf0c8a0,rarity:'common',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c3',name:'اخضر زمردي',gender:'boy',shirt:0x27ae60,pants:0x1b5e20,hair:0x4a2c11,skin:0xffdbac,rarity:'common',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c4',name:'برتقالي',gender:'boy',shirt:0xf39c12,pants:0x7f4f00,hair:0x2c1810,skin:0xdba57a,rarity:'common',hairStyle:'spiky',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c5',name:'ازرق غامق',gender:'boy',shirt:0x1e3a8a,pants:0x0a1a3a,hair:0x1a1a1a,skin:0xffdbac,rarity:'common',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'logo',eyeStyle:'normal'},
{id:'c6',name:'اصفر مشمس',gender:'boy',shirt:0xffd700,pants:0x8a6500,hair:0x2c1810,skin:0xdba57a,rarity:'common',hairStyle:'spiky',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c7',name:'بنفسجي هادئ',gender:'girl',shirt:0xb388ff,pants:0x4a148c,hair:0x2c1810,skin:0xffdbac,rarity:'common',hairStyle:'long',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c8',name:'وردي فاتح',gender:'girl',shirt:0xff9ec7,pants:0x6a1b9a,hair:0x4a2c11,skin:0xffdbac,rarity:'common',hairStyle:'ponytail',hat:'none',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c9',name:'بنفسجي ملكي',gender:'boy',shirt:0x9b59b6,pants:0x3a1a5a,hair:0x1a1a1a,skin:0xffdbac,rarity:'rare',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'hoodie',eyeStyle:'normal'},
{id:'c10',name:'سماوي',gender:'boy',shirt:0x1abc9c,pants:0x00838f,hair:0x2c1810,skin:0xdba57a,rarity:'rare',hairStyle:'spiky',hat:'cap',glasses:'none',shirtStyle:'stripes',eyeStyle:'normal'},
{id:'c11',name:'بني مغامر',gender:'boy',shirt:0x8d6e63,pants:0x3e2723,hair:0x2c1810,skin:0xf0c8a0,rarity:'rare',hairStyle:'short',hat:'cap',glasses:'round',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c12',name:'لبني',gender:'girl',shirt:0x81d4fa,pants:0x1565c0,hair:0x2c1810,skin:0xffdbac,rarity:'rare',hairStyle:'long',hat:'headband',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c13',name:'اخضر نعناعي',gender:'girl',shirt:0x4caf50,pants:0x1b5e20,hair:0x2c1810,skin:0xdba57a,rarity:'rare',hairStyle:'ponytail',hat:'none',glasses:'round',shirtStyle:'plain',eyeStyle:'big'},
{id:'c14',name:'فوشيا',gender:'girl',shirt:0xff44aa,pants:0x4a0022,hair:0x000000,skin:0xffdbac,rarity:'rare',hairStyle:'spiky',hat:'none',glasses:'sun',shirtStyle:'plain',eyeStyle:'big'},
{id:'c15',name:'ذهبي فخم',gender:'boy',shirt:0xffd700,pants:0x5a3a00,hair:0x0a0a0a,skin:0xffdbac,rarity:'epic',hairStyle:'short',hat:'none',glasses:'none',shirtStyle:'hoodie',eyeStyle:'normal'},
{id:'c16',name:'اسود شبح',gender:'boy',shirt:0x1a1a1a,pants:0x0a0a0a,hair:0x000000,skin:0xffdbac,rarity:'epic',hairStyle:'short',hat:'cap',glasses:'sun',shirtStyle:'plain',eyeStyle:'normal'},
{id:'c17',name:'سماوي حاد',gender:'boy',shirt:0x00bcd4,pants:0x006064,hair:0x1a1a1a,skin:0xdba57a,rarity:'epic',hairStyle:'spiky',hat:'none',glasses:'none',shirtStyle:'logo',eyeStyle:'normal'},
{id:'c18',name:'ذهبية انيقة',gender:'girl',shirt:0xffd700,pants:0x5a3a00,hair:0x1a1a1a,skin:0xffdbac,rarity:'epic',hairStyle:'long',hat:'headband',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c19',name:'اسود راقي',gender:'girl',shirt:0x2c3e50,pants:0x1a1a1a,hair:0x000000,skin:0xffdbac,rarity:'epic',hairStyle:'ponytail',hat:'none',glasses:'none',shirtStyle:'stripes',eyeStyle:'big'},
{id:'c20',name:'اميرة بنفسجية',gender:'girl',shirt:0x9b59b6,pants:0x3a1a5a,hair:0x2c1810,skin:0xdba57a,rarity:'epic',hairStyle:'long',hat:'crown',glasses:'none',shirtStyle:'plain',eyeStyle:'big'},
{id:'c35',name:'الذهبية',gender:'girl',shirt:0xffd700,pants:0xffd700,hair:0xffcc00,skin:0xffcc00,rarity:'mythic',hairStyle:'long',hat:'crown',glasses:'none',shirtStyle:'plain',eyeStyle:'big',golden:true,mythic:true},
{id:'c21',name:'قوس قزح',gender:'girl',shirt:0xff00ff,pants:0x00ffff,hair:0xffcc00,skin:0xffdbac,rarity:'legendary',hairStyle:'long',hat:'crown',glasses:'sun',shirtStyle:'stripes',eyeStyle:'big'},
{id:'c22',name:'ملك الظلال',gender:'boy',shirt:0x1a0033,pants:0x000000,hair:0x000000,skin:0xc0c0c0,rarity:'legendary',hairStyle:'spiky',hat:'crown',glasses:'sun',shirtStyle:'hoodie',eyeStyle:'sleepy'},
{id:'c23',name:'نار التنين',gender:'boy',shirt:0xff4400,pants:0x1a0000,hair:0xff2200,skin:0xffdbac,rarity:'legendary',hairStyle:'spiky',hat:'none',glasses:'none',shirtStyle:'stripes',eyeStyle:'normal'},
{id:'c24',name:'الملكة الذهبية',gender:'girl',shirt:0xffd700,pants:0xff00aa,hair:0xffcc00,skin:0xffdbac,rarity:'legendary',hairStyle:'long',hat:'crown',glasses:'none',shirtStyle:'plain',eyeStyle:'big'}
];

var BOX_TYPES=[
{id:'classic',name:'البكج الأساسي',icon:'gift',price:50,color:'#ff8dc7',rolls:2,rewards:[{type:'money',amount:300000,weight:100},{type:'money',amount:500000,weight:80},{type:'gold',amount:30,weight:70},{type:'tickets',amount:2,weight:60},{type:'char',rarity:'common',weight:50},{type:'char',rarity:'rare',weight:15}]},
{id:'royal',name:'البكج الملكي',icon:'crown',price:800,color:'#ffc857',rolls:5,rewards:[{type:'charMythic',weight:10},{type:'char',rarity:'legendary',weight:40},{type:'money',amount:15000000,weight:100},{type:'gold',amount:500,weight:80},{type:'tickets',amount:30,weight:60}]}
];

var AK='cinema_accounts_v1',accounts={};
var rac=localStorage.getItem(AK);if(rac)accounts=JSON.parse(rac)||{};
function hashPwd(p){var h=0;for(var i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;}return 'h'+Math.abs(h).toString(36);}
function saveAccounts(){localStorage.setItem(AK,JSON.stringify(accounts));}
function accKey(n){return 'cinema_data_v1_'+n;}
function saveData(){if(!currentAccount)return;try{var d={balance:userBalance,gold:playerGold,tickets:playerTickets,popcorn:playerPopcorn,chars:ownedChars,fps:targetFPS,quality:quality,gender:player.gender,shirt:player.shirt,pants:player.pants,hair:player.hair,skin:player.skin,hairStyle:player.hairStyle,hat:player.hat,glasses:player.glasses,shirtStyle:player.shirtStyle,eyeStyle:player.eyeStyle,face:player.face||null,faceScale:player.faceScale||1,px:characterGroup?characterGroup.position.x:0,py:characterGroup?characterGroup.position.y:0,pz:characterGroup?characterGroup.position.z:0,pr:characterGroup?characterGroup.rotation.y:Math.PI,pf:playerFloor,day:dayCycle,weather:currentWeather,stats:boxStats,xp:playerXP};localStorage.setItem(accKey(currentAccount),JSON.stringify(d));}catch(e){}}
function loadData(){if(!currentAccount)return;var raw=localStorage.getItem(accKey(currentAccount));if(!raw)return;try{var d=JSON.parse(raw);if(typeof d.balance==='number'&&!isAdmin)userBalance=d.balance;if(typeof d.gold==='number')playerGold=d.gold;if(typeof d.tickets==='number')playerTickets=d.tickets;if(typeof d.popcorn==='number')playerPopcorn=d.popcorn;if(Array.isArray(d.chars))ownedChars=d.chars.slice();if(d.gender)player.gender=d.gender;if(typeof d.shirt==='number')player.shirt=d.shirt;if(typeof d.pants==='number')player.pants=d.pants;if(typeof d.hair==='number')player.hair=d.hair;if(typeof d.skin==='number')player.skin=d.skin;if(d.hairStyle)player.hairStyle=d.hairStyle;if(d.hat)player.hat=d.hat;if(d.glasses)player.glasses=d.glasses;if(d.shirtStyle)player.shirtStyle=d.shirtStyle;if(d.eyeStyle)player.eyeStyle=d.eyeStyle;if(d.face)player.face=d.face;if(typeof d.faceScale==='number')player.faceScale=d.faceScale;if(characterGroup&&typeof d.px==='number'&&typeof d.pz==='number'&&isFinite(d.px)&&isFinite(d.pz)){var px=d.px,pz=d.pz;if(Math.abs(px)>200)px=0;if(Math.abs(pz)>200)pz=12;characterGroup.position.set(px,d.py||0,pz);characterGroup.rotation.y=(typeof d.pr==='number')?d.pr:Math.PI;playerShadow.position.x=px;playerShadow.position.z=pz;}if(typeof d.pf==='number')playerFloor=d.pf;if(typeof d.day==='number')dayCycle=d.day;if(d.stats&&typeof d.stats==='object')for(var sk in boxStats)if(typeof d.stats[sk]==='number')boxStats[sk]=d.stats[sk];if(typeof d.xp==='number')playerXP=d.xp;playerLevel=levelFromXP(playerXP);}catch(e){}updateTicketDisplay();updateGoldDisplay();updateHUDLevel();}
function xpForLevel(N){if(N<=1)return 0;return 50*(N-1)+15*N*(N-1);}
function levelFromXP(xp){var n=1;while(n<100&&xpForLevel(n+1)<=xp)n++;return n;}
function getTitle(lvl){if(lvl>=100)return{name:'خالد'};if(lvl>=90)return{name:'إمبراطور'};if(lvl>=70)return{name:'ملك الشاشة'};if(lvl>=50)return{name:'أسطورة سينما'};if(lvl>=40)return{name:'مشهور'};if(lvl>=30)return{name:'نجم'};if(lvl>=20)return{name:'ناقد'};if(lvl>=10)return{name:'عاشق أفلام'};if(lvl>=5)return{name:'زائر'};return{name:'مبتدئ'};}
function updateHUDLevel(){var lvl=levelFromXP(playerXP);var cur=xpForLevel(lvl),next=xpForLevel(lvl+1);var inL=playerXP-cur,need=next-cur;var pct=need>0?Math.min(100,(inL/need)*100):100;var eL=document.getElementById('xp-lvl');if(eL)eL.textContent='م'+lvl;var eF=document.getElementById('xp-fill');if(eF)eF.style.width=pct+'%';playerLevel=lvl;}
function addXP(amount){if(!amount||amount<=0)return;var beforeLvl=levelFromXP(playerXP);playerXP+=amount;var afterLvl=levelFromXP(playerXP);updateHUDLevel();if(afterLvl>beforeLvl){for(var L=beforeLvl+1;L<=afterLvl;L++)grantLevelReward(L);sfxLevelUp();var title=getTitle(afterLvl);toast('وصلت مستوى '+afterLvl+' - '+title.name,'lv');if(currentAccount)pushLeaderboard();}saveData();}
function grantLevelReward(lvl){var money=50000*lvl;userBalance+=money;var lines=['+'+money.toLocaleString('en')+' دينار'];if(lvl%5===0){playerGold+=10;lines.push('+10 ذهب');}if(lvl%10===0){playerTickets+=5;lines.push('+5 تذاكر');}updateBalanceDisplay();updateGoldDisplay();updateTicketDisplay();setTimeout(function(){toast('مكافأة المستوى '+lvl+' - '+lines.join(' | '),'g');},400);}

var selGender='boy',selQuality='medium',selFps=60;
document.querySelectorAll('.go').forEach(function(el){el.addEventListener('click',function(){document.querySelectorAll('.go').forEach(function(x){x.classList.remove('a');});el.classList.add('a');selGender=el.getAttribute('data-gender');sfxClick();});});
document.querySelectorAll('[data-quality]').forEach(function(el){el.addEventListener('click',function(){document.querySelectorAll('[data-quality]').forEach(function(x){x.classList.remove('a');});el.classList.add('a');selQuality=el.getAttribute('data-quality');sfxClick();});});
document.querySelectorAll('[data-fps]').forEach(function(el){el.addEventListener('click',function(){document.querySelectorAll('[data-fps]').forEach(function(x){x.classList.remove('a');});el.classList.add('a');selFps=parseInt(el.getAttribute('data-fps'));sfxClick();});});
var loginStatus=document.getElementById('login-status');
function goGame(name){showL2('مرحبا '+name,'جاري الدخول');setTimeout(function(){hideL2();launch();},1200);}
document.getElementById('btn-login').addEventListener('click',function(){
  resumeAudio();
  var nm=document.getElementById('login-name').value.trim();
  var pwd=document.getElementById('login-pwd').value;
  if(nm.length<2){loginStatus.textContent='اكتب اسم صحيح';loginStatus.style.color='#ffb0c0';sfxErr();return;}
  if(pwd.length<3){loginStatus.textContent='كلمة المرور 3 احرف';loginStatus.style.color='#ffb0c0';sfxErr();return;}
  if(nm===ADMIN_NAME&&pwd===ADMIN_PWD){isAdmin=true;currentAccount=nm;player.name=nm;player.gender='boy';quality='medium';targetFPS=60;playerGold=999999;loginStatus.textContent='مرحبا ايها الادمن';loginStatus.style.color='#ffc857';goGame(nm);return;}
  var isNew=false;
  if(!accounts[nm]){accounts[nm]={pwd:hashPwd(pwd),gender:selGender,quality:'medium',fps:60};saveAccounts();isNew=true;}
  else if(accounts[nm].pwd!==hashPwd(pwd)){loginStatus.textContent='كلمة المرور خطأ';loginStatus.style.color='#ffb0c0';sfxErr();return;}
  isAdmin=false;currentAccount=nm;player.name=nm;player.gender=accounts[nm].gender||'boy';quality=accounts[nm].quality||'medium';targetFPS=(typeof accounts[nm].fps==='number')?accounts[nm].fps:60;
  if(player.gender==='girl'){player.shirt=0xff5da2;player.pants=0x6a1b9a;player.hair=0x2c1810;player.hairStyle='long';}else{player.shirt=0x00a8ff;player.pants=0x192a56;player.hair=0x1e272e;player.hairStyle='short';}
  if(isNew){loginStatus.textContent='حساب جديد!';loginStatus.style.color='#7bedb5';setTimeout(function(){document.getElementById('login-screen').style.display='none';document.getElementById('create-screen').style.display='flex';document.getElementById('create-screen').setAttribute('data-name',nm);document.getElementById('create-screen').setAttribute('data-pwd',pwd);},500);}
  else{loginStatus.textContent='مرحبا '+nm;loginStatus.style.color='#7bedb5';goGame(nm);}
});
document.getElementById('login-pwd').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('btn-login').click();});
document.getElementById('login-name').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('login-pwd').focus();});
document.getElementById('btn-back').addEventListener('click',function(){document.getElementById('create-screen').style.display='none';document.getElementById('login-screen').style.display='flex';sfxClick();});
document.getElementById('btn-start').addEventListener('click',function(){
  var cs=document.getElementById('create-screen');var nm=cs.getAttribute('data-name'),pwd=cs.getAttribute('data-pwd');if(!nm){document.getElementById('btn-back').click();return;}
  accounts[nm]={pwd:hashPwd(pwd||''),gender:selGender,quality:selQuality,fps:selFps};saveAccounts();
  currentAccount=nm;player.name=nm;player.gender=selGender;quality=selQuality;targetFPS=selFps;
  if(player.gender==='girl'){player.shirt=0xff5da2;player.pants=0x6a1b9a;player.hair=0x2c1810;player.hairStyle='long';}else{player.shirt=0x00a8ff;player.pants=0x192a56;player.hair=0x1e272e;player.hairStyle='short';}
  goGame(nm);
});

function initFB(){if(typeof firebase==='undefined')return;try{if(!firebase.apps||firebase.apps.length===0)firebase.initializeApp({databaseURL:"https://spychat-4f8d5-default-rtdb.firebaseio.com/"});db=firebase.database();firebaseReady=true;watchPlayers();watchChat();watchGifts();watchCinemaVideo();watchLeaderboard();watchBoxOverrides();watchCustomChars();watchFriends();}catch(e){console.warn('fb',e);}}
function watchOfflineGifts(){if(!db||!currentAccount)return;var key=currentAccount.replace(/[.#$\[\]/]/g,'_');db.ref(SERVER_ROOM+'/offline_gifts/'+key).on('value',function(snap){var g=snap.val();if(!g)return;var tg=0,tm=0,tt=0;for(var id in g){var it=g[id];if(!it)continue;if(it.gold)tg+=it.gold;if(it.money)tm+=it.money;if(it.tickets)tt+=it.tickets;}if(tg||tm||tt){if(tg>0)playerGold+=tg;if(tm>0)userBalance+=tm;if(tt>0)playerTickets+=tt;updateGoldDisplay();updateBalanceDisplay();updateTicketDisplay();saveData();var msg='هدية من الادمن:';if(tg)msg+=' '+tg+' ذهب';if(tm)msg+=' '+tm+' دينار';if(tt)msg+=' '+tt+' تذاكر';toast(msg,'g');sfxCoin();db.ref(SERVER_ROOM+'/offline_gifts/'+key).remove();}});}
function watchBoxOverrides(){if(!db)return;db.ref(SERVER_ROOM+'/box_overrides').on('value',function(snap){boxOverrides=snap.val()||{};applyBoxOverrides();if(document.getElementById('shop-modal').classList.contains('a'))renderBoxes();});}
function applyBoxOverrides(){for(var i=0;i<BOX_TYPES.length;i++){var bt=BOX_TYPES[i];var ov=boxOverrides[bt.id];if(!ov)continue;if(typeof ov.price==='number')bt.price=ov.price;if(typeof ov.rolls==='number')bt.rolls=ov.rolls;if(Array.isArray(ov.rewards))bt.rewards=ov.rewards.slice();}}
function watchCustomChars(){if(!db)return;db.ref(SERVER_ROOM+'/custom_chars').on('value',function(snap){var data=snap.val()||{};for(var id in data){var c=data[id];if(!c||!c.name)continue;var converted={id:id,name:c.name,rarity:c.rarity||'common',gender:c.gender||'boy',shirt:hexStrToNum(c.shirt),pants:hexStrToNum(c.pants),hair:hexStrToNum(c.hair),skin:hexStrToNum(c.skin),hairStyle:c.hairStyle||'short',hat:c.hat||'none',glasses:c.glasses||'none',shirtStyle:'plain',eyeStyle:'normal',face:c.face||null,faceScale:c.faceScale||1,custom:true};var found=false;for(var i=0;i<chars.length;i++){if(chars[i].id===id){chars[i]=converted;found=true;break;}}if(!found)chars.push(converted);}});}
function hexStrToNum(h){if(typeof h==='number')return h;if(!h)return 0xffffff;return parseInt(String(h).replace('#',''),16);}
function watchPlayers(){if(!db)return;db.ref(SERVER_ROOM+'/players').on('value',function(snap){var data=snap.val()||{},now=Date.now(),active={};for(var uid in data){if(uid===myId)continue;var p=data[uid];if(!p||!p.t)continue;if((now-p.t)>8000){db.ref(SERVER_ROOM+'/players/'+uid).remove();continue;}var px=(typeof p.x==='number'&&isFinite(p.x))?p.x:0;var py=(typeof p.y==='number'&&isFinite(p.y))?p.y:0;var pz=(typeof p.z==='number'&&isFinite(p.z))?p.z:0;if(Math.abs(px)>250||Math.abs(pz)>250)continue;active[uid]=true;otherData[uid]=p;if(!otherMeshes[uid]){var m=buildChar({shirt:p.shirt||0xe74c3c,pants:p.pants||0x2c3e50,hair:p.hair||0x2c1810,skin:0xffdbac,gender:p.gender||'boy',hairStyle:(p.gender==='girl')?'long':'short'});m.userData.tX=px;m.userData.tY=py;m.userData.tZ=pz;m.userData.tR=p.r||0;m.userData.walk=0;m.position.set(px,py,pz);otherMeshes[uid]=m;scene.add(m);addTag(uid,p.name||'لاعب');}var me=otherMeshes[uid];me.userData.tX=px;me.userData.tY=py;me.userData.tZ=pz;me.userData.tR=p.r||0;}for(var u in otherMeshes){if(!active[u]){scene.remove(otherMeshes[u]);delete otherMeshes[u];delete otherData[u];rmTag(u);}}});}
function updateOthers(dt){var k=Math.min(1,dt*16);for(var uid in otherMeshes){var m=otherMeshes[uid];if(m.userData.tX===undefined)continue;var ox=m.position.x,oz=m.position.z;m.position.x+=(m.userData.tX-m.position.x)*k;m.position.y+=(m.userData.tY-m.position.y)*k;m.position.z+=(m.userData.tZ-m.position.z)*k;var dr=m.userData.tR-m.rotation.y;while(dr>Math.PI)dr-=Math.PI*2;while(dr<-Math.PI)dr+=Math.PI*2;m.rotation.y+=dr*k;var mv=Math.sqrt((m.position.x-ox)*(m.position.x-ox)+(m.position.z-oz)*(m.position.z-oz));var ud=m.userData;if(!ud.walk)ud.walk=0;if(mv>0.005){ud.walk+=dt*9.5;var intensity=Math.min(1,Math.max(0.5,mv*30));applyWalkAnim(m,ud.walk,intensity);}else{resetWalkAnim(m,dt);}
var pd=otherData[uid];if(pd&&pd.e&&EMOTES[pd.e]&&pd.et&&pd.et>(ud.lastEmoteT||0)){ud.lastEmoteT=pd.et;if(!ud.emote)playEmote(m,pd.e);}}}
function addTag(uid,name){var c=document.getElementById('op');if(document.getElementById('t-'+uid))return;var e=document.createElement('div');e.className='op2';e.id='t-'+uid;e.textContent='● '+name;c.appendChild(e);}
function rmTag(uid){var e=document.getElementById('t-'+uid);if(e)e.remove();}
var lastPush=0;
function pushPos(dt){if(!firebaseReady||!myPlayerRef||!characterGroup)return;lastPush+=dt;if(lastPush<0.08)return;lastPush=0;myPlayerRef.set({name:player.name,gender:player.gender,shirt:player.shirt,pants:player.pants,hair:player.hair,x:characterGroup.position.x,y:characterGroup.position.y,z:characterGroup.position.z,r:characterGroup.rotation.y,sitting:playerSitting,e:myEmote||'',et:myEmoteT||0,t:Date.now()});}
function watchChat(){if(!db)return;db.ref(SERVER_ROOM+'/chat').limitToLast(30).on('child_added',function(s){var m=s.val();if(!m||!m.text||m.uid===myId)return;if(m.t&&m.t<=lastChat)return;if(m.t)lastChat=m.t;var c=document.getElementById('cm');var e=document.createElement('div');e.textContent='['+m.name+']: '+m.text;c.appendChild(e);c.scrollTop=c.scrollHeight;});}
function sendChat(){var i=document.getElementById('ci');var t=i.value.trim();if(!t)return;i.value='';var c=document.getElementById('cm');var e=document.createElement('div');e.textContent='[أنا]: '+t;e.style.color='#ff8dc7';c.appendChild(e);c.scrollTop=c.scrollHeight;if(db)db.ref(SERVER_ROOM+'/chat').push({uid:myId,name:player.name,text:t,admin:isAdmin,t:Date.now()});var today=new Date().toDateString();if(chatXPDate!==today){chatXPDate=today;chatXPCount=0;}if(chatXPCount<20){chatXPCount++;addXP(5);}}
var lastGift=0;
function watchGifts(){if(!db)return;db.ref(SERVER_ROOM+'/gift').on('value',function(s){var g=s.val();if(!g||!g.amount||!g.t)return;if(g.t<=lastGift)return;if(g.from===player.name){lastGift=g.t;return;}if(g.target&&g.target!==myId){lastGift=g.t;return;}lastGift=g.t;if(g.type==='gold'){playerGold+=g.amount;updateGoldDisplay();toast('+'+g.amount+' ذهب','g');}else if(g.type==='xp'){addXP(g.amount);toast('+'+g.amount+' XP','lv');}else{userBalance+=g.amount;updateBalanceDisplay();toast('+'+g.amount+' دينار','ad');}sfxCoin();saveData();});}
function watchCinemaVideo(){if(!db)return;db.ref(SERVER_ROOM+'/cinema_video').on('value',function(snap){var v=snap.val();if(!v||!v.videoId){if(ytFrame){ytFrame.remove();ytFrame=null;}ytActive=false;ytCurrentId=null;return;}if(v.videoId===ytCurrentId)return;ytCurrentId=v.videoId;playYTVideo(v.videoId);if(v.startedBy&&v.startedBy!==player.name)toast(v.startedBy+' شغّل فيديو','s');});}
function playYTVideo(vid){if(ytFrame){ytFrame.remove();ytFrame=null;}ytFrame=document.createElement('iframe');ytFrame.src='https://www.youtube.com/embed/'+vid+'?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1';ytFrame.setAttribute('allow','autoplay; encrypted-media; fullscreen');ytFrame.setAttribute('allowfullscreen','true');ytFrame.setAttribute('frameborder','0');ytFrame.style.cssText='position:fixed;border:none;z-index:2;background:#000;pointer-events:none;display:none;top:0;left:0;';document.body.appendChild(ytFrame);ytActive=true;}
function lbKey(){return currentAccount?currentAccount.replace(/[.#$\[\]/]/g,'_'):'';}
function pushLeaderboard(){if(!db||!currentAccount)return;var lvl=levelFromXP(playerXP),title=getTitle(lvl);db.ref(SERVER_ROOM+'/leaderboard/'+lbKey()).set({name:player.name,lvl:lvl,xp:playerXP,title:title.name,chars:ownedChars.length,gold:playerGold,t:Date.now()});}
function watchLeaderboard(){if(!db)return;db.ref(SERVER_ROOM+'/leaderboard').on('value',function(snap){var data=snap.val()||{},now=Date.now(),arr=[];for(var k in data){var p=data[k];if(!p||!p.t)continue;if((now-p.t)>2592000000)continue;arr.push(p);}arr.sort(function(a,b){if(b.lvl!==a.lvl)return b.lvl-a.lvl;return b.xp-a.xp;});leaderboardData=arr.slice(0,10);if(document.getElementById('leaderboard-modal').classList.contains('a'))renderLeaderboard();});}
function toggleMusic(){if(!audioCtx)initAudio();resumeAudio();if(musicOn){for(var i=0;i<musicNodes.length;i++){try{musicNodes[i].stop();}catch(e){}}musicNodes=[];musicOn=false;document.getElementById('music-btn').style.color='';return;}musicOn=true;document.getElementById('music-btn').style.color='#7bedb5';var n=audioCtx.currentTime;var fr=[174.61,261.63,349.23];for(var fi=0;fi<fr.length;fi++){var o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=fr[fi];g.gain.value=0;g.gain.linearRampToValueAtTime(.028,n+2);o.connect(g);g.connect(audioMaster);o.start();musicNodes.push(o);}}
function toast(msg,type){type=type||'info';var c=document.getElementById('tt');var e=document.createElement('div');e.className='to '+type;e.textContent=msg;c.appendChild(e);setTimeout(function(){e.remove();},3000);}
function hexCol(n){return '#'+('000000'+((n||0)>>>0).toString(16)).slice(-6);}

;

function drawCharPreview(cv,cfg){
  if(!cv)return;
  var ctx=cv.getContext('2d');var w=cv.width=cv.height=120;
  var shirt=hexCol(cfg.shirt),pants=hexCol(cfg.pants),hair=hexCol(cfg.hair),skin=hexCol(cfg.skin||0xffdbac);
  var g=ctx.createLinearGradient(0,0,0,w);
  if(cfg.golden){g.addColorStop(0,'#3a2a00');g.addColorStop(1,'#1a0a00');}else{g.addColorStop(0,'#22101f');g.addColorStop(1,'#100510');}
  ctx.fillStyle=g;ctx.fillRect(0,0,w,w);
  if(cfg.golden){var rg=ctx.createRadialGradient(w/2,w/2,5,w/2,w/2,w*.7);rg.addColorStop(0,'rgba(255,220,0,.5)');rg.addColorStop(1,'rgba(255,220,0,0)');ctx.fillStyle=rg;ctx.fillRect(0,0,w,w);}
  var cx=w/2,s=w/11,baseY=w*0.92;
  ctx.fillStyle=pants;ctx.fillRect(cx-s*1.1,baseY-s*3.6,s*0.8,s*2.6);ctx.fillRect(cx+s*0.3,baseY-s*3.6,s*0.8,s*2.6);
  ctx.fillStyle='#0a0a0a';ctx.fillRect(cx-s*1.3,baseY-s*0.6,s*1.1,s*0.55);ctx.fillRect(cx+s*0.2,baseY-s*0.6,s*1.1,s*0.55);
  ctx.fillStyle=shirt;ctx.fillRect(cx-s*1.4,baseY-s*6.3,s*2.8,s*2.7);
  ctx.fillStyle=skin;ctx.fillRect(cx-s*1.9,baseY-s*6.1,s*0.55,s*2.2);ctx.fillRect(cx+s*1.35,baseY-s*6.1,s*0.55,s*2.2);
  ctx.fillStyle=skin;ctx.fillRect(cx-s*1.0,baseY-s*9,s*2,s*2.7);
  ctx.fillStyle=hair;
  if(cfg.hairStyle==='long'){ctx.fillRect(cx-s*1.1,baseY-s*9.4,s*2.2,s*0.7);ctx.fillRect(cx-s*1.2,baseY-s*9,s*0.35,s*2.5);ctx.fillRect(cx+s*0.85,baseY-s*9,s*0.35,s*2.5);}
  else if(cfg.hairStyle==='ponytail'){ctx.fillRect(cx-s*1.1,baseY-s*9.4,s*2.2,s*0.6);ctx.fillRect(cx-s*0.25,baseY-s*9.9,s*0.5,s*1);}
  else if(cfg.hairStyle==='spiky'){ctx.fillRect(cx-s*1.05,baseY-s*9.4,s*2.1,s*0.5);for(var sp2=0;sp2<5;sp2++)ctx.fillRect(cx-s*0.9+sp2*s*0.4,baseY-s*9.9,s*0.2,s*0.6);}
  else{ctx.fillRect(cx-s*1.0,baseY-s*9.4,s*2,s*0.55);}
  if(cfg.hat==='crown'){ctx.fillStyle='#ffc857';ctx.fillRect(cx-s*0.8,baseY-s*10.1,s*1.6,s*0.4);}
  var eyeY=baseY-s*7.7;
  ctx.fillStyle='#fff';ctx.fillRect(cx-s*0.65,eyeY-s*0.25,s*0.5,s*0.5);ctx.fillRect(cx+s*0.15,eyeY-s*0.25,s*0.5,s*0.5);
  ctx.fillStyle='#000';ctx.fillRect(cx-s*0.55,eyeY-s*0.15,s*0.3,s*0.35);ctx.fillRect(cx+s*0.25,eyeY-s*0.15,s*0.3,s*0.35);
  ctx.fillStyle='#c0392b';ctx.fillRect(cx-s*0.25,baseY-s*6.7,s*0.5,s*0.15);
}
function drawBanknote(cv,value){if(!cv)return;var ctx=cv.getContext('2d');var w=cv.width=140,h=cv.height=70;var g=ctx.createLinearGradient(0,0,w,0);g.addColorStop(0,'#5a1a4a');g.addColorStop(0.5,'#2a0a20');g.addColorStop(1,'#5a1a4a');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ff8dc7';ctx.lineWidth=2;ctx.strokeRect(3,3,w-6,h-6);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 20px sans-serif';var txt=value>=1000000?(value/1000000).toFixed(1)+'M':(value/1000)+'K';ctx.fillText(txt,w/2,h*0.42);ctx.font='bold 9px sans-serif';ctx.fillStyle='#ffd6eb';ctx.fillText('دينار',w/2,h*0.65);}
function drawTicketArt(cv,count){if(!cv)return;var ctx=cv.getContext('2d');var w=cv.width=140,h=cv.height=70;var g=ctx.createLinearGradient(0,0,w,0);g.addColorStop(0,'#5a0025');g.addColorStop(0.5,'#a01840');g.addColorStop(1,'#5a0025');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffc857';ctx.lineWidth=2;ctx.strokeRect(3,3,w-6,h-6);ctx.fillStyle='#ffc857';ctx.font='bold 32px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.beginPath();ctx.moveTo(w*0.22,h*0.3);ctx.lineTo(w*0.38,h*0.5);ctx.lineTo(w*0.22,h*0.7);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.fillText('تذكرة الواحده 50 الف',w*0.65,h*0.4);ctx.fillStyle='#ffc857';ctx.font='bold 22px sans-serif';ctx.fillText('x'+count,w*0.65,h*0.75);}
function drawGoldArt(cv,amount){if(!cv)return;var ctx=cv.getContext('2d');var w=cv.width=140,h=cv.height=70;var g=ctx.createRadialGradient(w/2,h/2,5,w/2,h/2,w*0.6);g.addColorStop(0,'#fff8d0');g.addColorStop(.5,'#ffc857');g.addColorStop(1,'#5a3a00');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.fillStyle='#5a3a00';ctx.font='bold 26px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('G',w*0.28,h*0.5);ctx.fillStyle='#5a3a00';ctx.font='bold 22px sans-serif';ctx.fillText('+'+amount,w*0.62,h*0.5);}
function spawnParticles(container,color,count){for(var i=0;i<count;i++){var p=document.createElement('div');var sz=4+Math.random()*6;p.style.cssText='position:absolute;left:50%;top:50%;width:'+sz+'px;height:'+sz+'px;background:'+color+';border-radius:50%;pointer-events:none;box-shadow:0 0 8px '+color+';z-index:9998';container.appendChild(p);var angle=Math.random()*Math.PI*2,dist=80+Math.random()*180,dur=600+Math.random()*600;var tx=Math.cos(angle)*dist,ty=Math.sin(angle)*dist;try{p.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(calc(-50% + '+tx+'px),calc(-50% + '+ty+'px)) scale(0)',opacity:0}],{duration:dur,easing:'cubic-bezier(.2,.8,.3,1)'});}catch(e){}setTimeout((function(el){return function(){el.remove();};})(p),dur+50);}}

var colliders=[];
function addCol(a,b,c,d){colliders.push({minX:a,maxX:b,minZ:c,maxZ:d});}
function hit(x,z,r){r=r||.35;for(var i=0;i<colliders.length;i++){var c=colliders[i];if(x+r>c.minX&&x-r<c.maxX&&z+r>c.minZ&&z-r<c.maxZ)return true;}return false;}
function nearPlayer(x,z){for(var u in otherMeshes){var m=otherMeshes[u];var dx=m.position.x-x,dz=m.position.z-z;if(dx*dx+dz*dz<2.5)return true;}return false;}
function nearCar(x,z){for(var i=0;i<roadCars.length;i++){var c=roadCars[i];var dx=c.position.x-x,dz=c.position.z-z;if(dx*dx+dz*dz<6)return true;}return false;}
function insideCinema(x,z){return x>-17&&x<17&&z>-19&&z<7;}

/* ═══════ مولّد التكسترات ═══════ */
var _texCache={};
function texBrickCached(a,b){var k='b'+a+'_'+b;if(_texCache[k])return _texCache[k];_texCache[k]=texBrick(a,b);return _texCache[k];}
function texRoofCached(a,b){var k='r'+a+'_'+b;if(_texCache[k])return _texCache[k];_texCache[k]=texRoof(a,b);return _texCache[k];}
var _woodC=null,_winC=null;
function texWoodCached(){if(_woodC)return _woodC;_woodC=texWood();return _woodC;}
function texWindowCached(){if(_winC)return _winC;_winC=texWindow();return _winC;}
function texBrick(baseColor,brickColor){
  var c=document.createElement('canvas');c.width=256;c.height=256;
  var x=c.getContext('2d');
  x.fillStyle=baseColor;x.fillRect(0,0,256,256);
  var bw=42,bh=22,gap=3;
  for(var row=0;row<12;row++){
    var offset=(row%2)?bw/2:0;
    for(var col=-1;col<8;col++){
      var bx=col*bw+offset+gap;
      var by=row*bh+gap;
      var shade=Math.random()*0.15-0.05;
      x.fillStyle=brickColor;
      x.fillRect(bx,by,bw-gap*2,bh-gap*2);
      x.fillStyle='rgba(0,0,0,'+Math.abs(shade)+')';
      x.fillRect(bx,by+bh-gap*2-4,bw-gap*2,4);
      x.fillStyle='rgba(255,255,255,'+(Math.random()*0.08)+')';
      x.fillRect(bx,by,bw-gap*2,2);
    }
  }
  for(var i=0;i<2000;i++){
    x.fillStyle='rgba(0,0,0,'+(Math.random()*0.15)+')';
    x.fillRect(Math.random()*256,Math.random()*256,1,1);
  }
  var t=new THREE.CanvasTexture(c);
  t.wrapS=t.wrapT=THREE.RepeatWrapping;
  return t;
}
function texRoof(baseColor,lineColor){
  var c=document.createElement('canvas');c.width=256;c.height=256;
  var x=c.getContext('2d');
  x.fillStyle=baseColor;x.fillRect(0,0,256,256);
  var tw=32,th=20;
  for(var row=0;row<14;row++){
    var offset=(row%2)?tw/2:0;
    for(var col=-1;col<10;col++){
      var px=col*tw+offset;
      var py=row*th;
      x.fillStyle=lineColor;
      x.beginPath();
      x.moveTo(px+2,py);x.lineTo(px+tw-2,py);
      x.lineTo(px+tw-2,py+th-3);x.lineTo(px+tw/2,py+th);
      x.lineTo(px+2,py+th-3);x.closePath();x.fill();
      x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=1.5;x.stroke();
    }
  }
  for(var j=0;j<1500;j++){
    x.fillStyle='rgba(0,0,0,'+(Math.random()*0.1)+')';
    x.fillRect(Math.random()*256,Math.random()*256,1,1);
  }
  var t=new THREE.CanvasTexture(c);
  t.wrapS=t.wrapT=THREE.RepeatWrapping;
  return t;
}
function texWindow(){
  var c=document.createElement('canvas');c.width=128;c.height=128;
  var x=c.getContext('2d');
  var g=x.createLinearGradient(0,0,128,128);
  g.addColorStop(0,'#87ceeb');
  g.addColorStop(0.5,'#4a90e2');
  g.addColorStop(1,'#2c3e50');
  x.fillStyle=g;x.fillRect(0,0,128,128);
  x.fillStyle='rgba(255,255,255,.7)';
  x.beginPath();x.moveTo(0,0);x.lineTo(80,0);x.lineTo(20,128);x.lineTo(0,128);x.closePath();x.fill();
  x.fillStyle='rgba(255,255,255,.4)';
  x.beginPath();x.moveTo(40,0);x.lineTo(70,0);x.lineTo(30,128);x.lineTo(0,128);x.closePath();x.fill();
  return new THREE.CanvasTexture(c);
}
function texWood(){
  var c=document.createElement('canvas');c.width=128;c.height=128;
  var x=c.getContext('2d');
  x.fillStyle='#6d4c41';x.fillRect(0,0,128,128);
  for(var i=0;i<12;i++){
    x.strokeStyle='rgba(0,0,0,.3)';
    x.lineWidth=1+Math.random();
    x.beginPath();
    x.moveTo(0,i*12+Math.random()*4);
    x.bezierCurveTo(40,i*12+Math.random()*6,80,i*12+Math.random()*6,128,i*12);
    x.stroke();
  }
  for(var j=0;j<500;j++){
    x.fillStyle='rgba(0,0,0,'+(Math.random()*0.2)+')';
    x.fillRect(Math.random()*128,Math.random()*128,1,1);
  }
  var t=new THREE.CanvasTexture(c);
  t.wrapS=t.wrapT=THREE.RepeatWrapping;
  return t;
}
var canvas=document.getElementById('game-canvas');
var scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
scene.fog=new THREE.Fog(0x87ceeb,80,260);
var camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.1,400);
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:"high-performance"});
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,0.7));
renderer.shadowMap.enabled=false;renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
function applyQ(q){quality=q;if(q==='low'){renderer.setPixelRatio(.7);renderer.shadowMap.enabled=false;scene.fog.far=140;}else if(q==='medium'){renderer.setPixelRatio(1);renderer.shadowMap.enabled=true;scene.fog.far=220;}else{renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;scene.fog.far=300;}}
var hemi=new THREE.HemisphereLight(0xbde4ff,0x6b8a3a,.95);scene.add(hemi);
var fillLight=new THREE.DirectionalLight(0xffd6eb,.5);fillLight.position.set(-20,30,-20);scene.add(fillLight);
var sunLight=new THREE.DirectionalLight(0xffffe0,1.4);
sunLight.position.set(30,60,25);sunLight.castShadow=true;
var sc=sunLight.shadow.camera;sc.left=-60;sc.right=60;sc.top=60;sc.bottom=-60;sc.near=1;sc.far=200;
scene.add(sunLight);sunLight.target.position.set(0,0,0);scene.add(sunLight.target);
var moonLight=new THREE.DirectionalLight(0x9099cc,0);moonLight.position.set(-30,60,-25);scene.add(moonLight);
var MAT={trunk:new THREE.MeshLambertMaterial({color:0x7a5a3a}),leaf1:new THREE.MeshLambertMaterial({color:0x3aa03a}),leaf2:new THREE.MeshLambertMaterial({color:0x4ab84a}),leaf3:new THREE.MeshLambertMaterial({color:0x5cc85c}),doorB:new THREE.MeshLambertMaterial({color:0x6d4c41}),poleB:new THREE.MeshLambertMaterial({color:0x555555}),sidewalkM:new THREE.MeshLambertMaterial({color:0xe0e4e8}),roadM:new THREE.MeshLambertMaterial({color:0x33333a}),yellowM:new THREE.MeshBasicMaterial({color:0xffdd00}),greenStrip:new THREE.MeshLambertMaterial({color:0x5cb85c}),groundM:new THREE.MeshLambertMaterial({color:0x7acc55})};
var ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),MAT.groundM);
ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
for(var gp=0;gp<50;gp++){var px=(Math.random()-.5)*300,pz=(Math.random()-.5)*300;if(Math.abs(px)<30&&Math.abs(pz)<20)continue;var patch=new THREE.Mesh(new THREE.CircleGeometry(2+Math.random()*4,8),new THREE.MeshLambertMaterial({color:Math.random()>.5?0x5cb85c:0x70d070}));patch.rotation.x=-Math.PI/2;patch.position.set(px,.005,pz);scene.add(patch);}
var road=new THREE.Mesh(new THREE.PlaneGeometry(500,10),MAT.roadM);
road.rotation.x=-Math.PI/2;road.position.set(0,.02,22);road.receiveShadow=true;scene.add(road);
for(var sx=-250;sx<=250;sx+=8){var st=new THREE.Mesh(new THREE.PlaneGeometry(3,.25),MAT.yellowM);st.rotation.x=-Math.PI/2;st.position.set(sx,.03,22);scene.add(st);}
var sidewalk=new THREE.Mesh(new THREE.PlaneGeometry(500,3.5),MAT.sidewalkM);sidewalk.rotation.x=-Math.PI/2;sidewalk.position.set(0,.025,28.5);sidewalk.receiveShadow=true;scene.add(sidewalk);
var sidewalkS=new THREE.Mesh(new THREE.PlaneGeometry(500,3.5),MAT.sidewalkM);sidewalkS.rotation.x=-Math.PI/2;sidewalkS.position.set(0,.025,15.5);sidewalkS.receiveShadow=true;scene.add(sidewalkS);
var gsn=new THREE.Mesh(new THREE.PlaneGeometry(500,1.2),MAT.greenStrip);gsn.rotation.x=-Math.PI/2;gsn.position.set(0,.03,26.5);scene.add(gsn);
var gss=new THREE.Mesh(new THREE.PlaneGeometry(500,1.2),MAT.greenStrip);gss.rotation.x=-Math.PI/2;gss.position.set(0,.03,17.5);scene.add(gss);
var backG=new THREE.Mesh(new THREE.PlaneGeometry(500,60),new THREE.MeshLambertMaterial({color:0x5cb85c}));backG.rotation.x=-Math.PI/2;backG.position.set(0,.015,-45);scene.add(backG);
function makeTree(x,z,s){s=s||1;var g=new THREE.Group();var barkTex=texWood();barkTex.repeat.set(2,3);var barkMat=new THREE.MeshStandardMaterial({map:barkTex,roughness:.95});var t=new THREE.Mesh(new THREE.CylinderGeometry(.2*s,.28*s,2.4*s,8),barkMat);t.position.y=1.2*s;t.castShadow=true;g.add(t);var leafColors=[0x3aa03a,0x4ab84a,0x5cc85c,0x2e8b2e];var numLeaves=3+Math.floor(Math.random()*2);for(var i=0;i<numLeaves;i++){var lm=new THREE.MeshStandardMaterial({color:leafColors[Math.floor(Math.random()*leafColors.length)],roughness:.85});var rr=1.2*s+Math.random()*.4;var sp=new THREE.Mesh(new THREE.SphereGeometry(rr,8,6),lm);sp.position.set((Math.random()-.5)*.6*s,3*s+(Math.random()-.5)*.5*s,(Math.random()-.5)*.6*s);sp.castShadow=true;g.add(sp);}g.position.set(x,0,z);g.userData.sw=Math.random()*6.28;return g;}
var treePos=[[-80,15.5],[-60,15.5],[-40,15.5],[40,15.5],[60,15.5],[80,15.5],[-80,28.5],[-60,28.5],[-40,28.5],[40,28.5],[60,28.5],[80,28.5]];
var trees=[];for(var tp=0;tp<treePos.length;tp++){var tr=makeTree(treePos[tp][0],treePos[tp][1],1.1);scene.add(tr);trees.push(tr);}
var lamps=[];
function makeLamp(x,z){var g=new THREE.Group();var poleMat=new THREE.MeshStandardMaterial({color:0x2c2c2c,roughness:.4,metalness:.85});var p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.14,5,8),poleMat);p.position.y=2.5;p.castShadow=true;g.add(p);var base=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.25,8),poleMat);base.position.y=.125;g.add(base);var arm=new THREE.Mesh(new THREE.BoxGeometry(.4,.08,.08),poleMat);arm.position.set(.15,4.95,0);g.add(arm);var bulbMat=new THREE.MeshStandardMaterial({color:0xfff8c2,emissive:0xffdd80,emissiveIntensity:1.5,roughness:.3});var b=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),bulbMat);b.position.set(.3,4.85,0);g.add(b);var gl=new THREE.Mesh(new THREE.SphereGeometry(.65,12,10),new THREE.MeshBasicMaterial({color:0xffdd80,transparent:true,opacity:.28}));gl.position.set(.3,4.85,0);g.add(gl);var l=new THREE.PointLight(0xffdd88,0,20,2);l.position.set(.3,4.8,0);g.add(l);g.position.set(x,0,z);scene.add(g);addCol(x-.3,x+.3,z-.3,z+.3);lamps.push({light:l,glow:gl});}
var lampX=[-90,-60,-30,30,60,90];for(var li=0;li<lampX.length;li++){makeLamp(lampX[li],28.5);makeLamp(lampX[li],15.5);}

var doraCols=[[0xfff4d8,0xff8040],[0xffe0ee,0xe74c3c],[0xd8f5dc,0x2ecc71],[0xfff0c8,0xf39c12],[0xd6e8ff,0x3498db],[0xf0daff,0x9b59b6],[0xffdce8,0xff5da2],[0xe0f8ff,0x1abc9c],[0xfff8dc,0xe84393],[0xd8f0ff,0x8e44ad]];
function dc(i){return doraCols[((i%doraCols.length)+doraCols.length)%doraCols.length];}
function makeHouse(x,z,wc,rc,ry){
  var g=new THREE.Group(),w=7,h=5,d=7;
  var ry2=ry||0;
  var bc1='#'+('000000'+((wc||0)>>>0).toString(16)).slice(-6);
  var bc2='#'+('000000'+((rc||0)>>>0).toString(16)).slice(-6);
  var wallTex=texBrickCached(bc1,bc2).clone();
  wallTex.repeat.set(2,2);wallTex.needsUpdate=true;
  var wallMat=new THREE.MeshStandardMaterial({map:wallTex,roughness:.85,metalness:.05});
  var hb=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),wallMat);
  hb.position.y=h/2;hb.castShadow=true;hb.receiveShadow=true;g.add(hb);
  var roofTex=texRoofCached(bc2,bc1).clone();
  roofTex.repeat.set(2,2);roofTex.needsUpdate=true;
  var roofMat=new THREE.MeshStandardMaterial({map:roofTex,roughness:.8,metalness:.1});
  var rf=new THREE.Mesh(new THREE.ConeGeometry(w*.85,3,4),roofMat);
  rf.position.y=h+1.5;rf.rotation.y=Math.PI/4;rf.castShadow=true;g.add(rf);
  var woodT=texWoodCached();
  var doorMat=new THREE.MeshStandardMaterial({map:woodT,roughness:.9});
  var dr=new THREE.Mesh(new THREE.BoxGeometry(1.4,2.6,.2),doorMat);
  dr.position.set(0,1.3,-d/2-.05);g.add(dr);
  var winT=texWindowCached();
  var winMat=new THREE.MeshStandardMaterial({map:winT,roughness:.15,metalness:.4,emissive:0x223344,emissiveIntensity:.3});
  var wn=new THREE.Mesh(new THREE.BoxGeometry(1.5,1.5,.15),winMat);wn.position.set(2,3,-d/2-.05);g.add(wn);
  var wn2=new THREE.Mesh(new THREE.BoxGeometry(1.5,1.5,.15),winMat);wn2.position.set(-2,3,-d/2-.05);g.add(wn2);
  var wn3=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,.15),winMat);wn3.position.set(0,3.2,-d/2-.05);g.add(wn3);
  g.position.set(x,0,z);g.rotation.y=ry2;
  var hw=w/2+.3,hd=d/2+.3;
  var ac=Math.abs(Math.cos(ry2)),as=Math.abs(Math.sin(ry2));
  var sx2=hw*ac*2+hd*as*2,sz=hw*as*2+hd*ac*2;
  addCol(x-sx2/2,x+sx2/2,z-sz/2,z+sz/2);
  return g;
}
for(var fi=0;fi<14;fi++){var xL=-22-fi*10,xR=22+fi*10;
if(fi===0){scene.add(makeShop(-22,11,'cafe',0));scene.add(makeShop(22,11,'toys',0));}
else if(fi===1){scene.add(makeShop(-32,11,'grocery',0));scene.add(makeShop(32,11,'bakery',0));}
else if(fi===2){scene.add(makeShop(-42,11,'clothes',0));scene.add(makeShop(42,11,'bookstore',0));}
else{scene.add(makeHouse(xL,11,dc(fi)[0],dc(fi)[1],Math.PI));scene.add(makeHouse(xR,11,dc(fi+3)[0],dc(fi+3)[1],Math.PI));}}
for(var si=0;si<4;si++){scene.add(makeHouse(-22-si*8,4,dc(si+2)[0],dc(si+2)[1],Math.PI));scene.add(makeHouse(22+si*8,4,dc(si+6)[0],dc(si+6)[1],Math.PI));}
for(var sb=0;sb<6;sb++){scene.add(makeHouse(-25-sb*8,-24,dc(sb+1)[0],dc(sb+1)[1],0));scene.add(makeHouse(25+sb*8,-24,dc(sb+5)[0],dc(sb+5)[1],0));}
for(var ni=-14;ni<=14;ni++){if(ni===0)continue;scene.add(makeHouse(ni*10,36,dc(ni+3)[0],dc(ni+3)[1],0));}
for(var nj=-14;nj<=14;nj++){if(nj===0)continue;scene.add(makeHouse(nj*10,46,dc(nj+6)[0],dc(nj+6)[1],0));}
for(var si2=-14;si2<=14;si2++){if(si2===0)continue;scene.add(makeHouse(si2*10,-33,dc(si2+5)[0],dc(si2+5)[1],Math.PI));}
for(var sj=-14;sj<=14;sj++){if(sj===0)continue;scene.add(makeHouse(sj*10,-43,dc(sj+2)[0],dc(sj+2)[1],Math.PI));}

function makeShop(x,z,type,ry){
  var shops={
    cafe:{wall:0x6d4c41,roof:0x3e2723,sign:'مقهى',bg:'#3e2723',fg:'#d7ccc8'},
    grocery:{wall:0x66bb6a,roof:0x2e7d32,sign:'بقالة',bg:'#1b5e20',fg:'#ffffff'},
    clothes:{wall:0xad1457,roof:0x6a0d3a,sign:'ملابس',bg:'#4a0522',fg:'#f8bbd0'},
    toys:{wall:0xe6a817,roof:0xa86a00,sign:'ألعاب',bg:'#7a4d00',fg:'#fff3c4'},
    bakery:{wall:0xc9702a,roof:0x8c3f00,sign:'مخبز',bg:'#5c2a00',fg:'#fff0d0'},
    bookstore:{wall:0x3949ab,roof:0x1a237e,sign:'مكتبة',bg:'#0d1441',fg:'#c5cae9'}
  };
  var s=shops[type]||shops.cafe;
  var g=new THREE.Group();
  var W=6,H=4.5,D=5;
  var ry2=ry||0;
  var bc1='#'+('000000'+s.wall.toString(16)).slice(-6);
  var bc2='#'+('000000'+s.roof.toString(16)).slice(-6);
  var wallTex=texBrickCached(bc1,bc2).clone();wallTex.repeat.set(2,2);wallTex.needsUpdate=true;
  var wallMat=new THREE.MeshStandardMaterial({map:wallTex,roughness:.85});
  var wall=new THREE.Mesh(new THREE.BoxGeometry(W,H,D),wallMat);
  wall.position.y=H/2;wall.castShadow=true;wall.receiveShadow=true;g.add(wall);
  var roofTex=texRoofCached(bc2,bc1).clone();roofTex.repeat.set(2,2);roofTex.needsUpdate=true;
  var roofMat=new THREE.MeshStandardMaterial({map:roofTex,roughness:.8});
  var roof=new THREE.Mesh(new THREE.BoxGeometry(W+0.4,0.4,D+0.4),roofMat);
  roof.position.y=H+0.2;roof.castShadow=true;g.add(roof);
  var awningMat=new THREE.MeshStandardMaterial({color:s.roof,roughness:.6});
  var awning=new THREE.Mesh(new THREE.BoxGeometry(W+0.6,0.1,1.5),awningMat);
  awning.position.set(0,H*0.75,D/2+0.5);awning.rotation.x=-0.2;g.add(awning);
  var signC=document.createElement('canvas');signC.width=512;signC.height=128;
  var sx=signC.getContext('2d');
  sx.fillStyle=s.bg;sx.fillRect(0,0,512,128);
  sx.strokeStyle=s.fg;sx.lineWidth=8;sx.strokeRect(8,8,496,112);
  sx.fillStyle=s.fg;sx.font='bold 64px sans-serif';
  sx.textAlign='center';sx.textBaseline='middle';
  sx.fillText(s.sign,256,64);
  var signTex=new THREE.CanvasTexture(signC);
  var signMat=new THREE.MeshBasicMaterial({map:signTex,side:THREE.DoubleSide});
  var signMesh=new THREE.Mesh(new THREE.PlaneGeometry(4.5,1.1),signMat);
  signMesh.position.set(0,H+1.2,D/2+0.02);g.add(signMesh);
  var postMat=new THREE.MeshStandardMaterial({color:0x333333,roughness:.5,metalness:.7});
  var p1=new THREE.Mesh(new THREE.BoxGeometry(0.15,1.8,0.15),postMat);
  p1.position.set(-2,H+0.2,D/2);g.add(p1);
  var p2=p1.clone();p2.position.x=2;g.add(p2);
  var woodT=texWoodCached();
  var doorMat=new THREE.MeshStandardMaterial({map:woodT,roughness:.9});
  var door=new THREE.Mesh(new THREE.BoxGeometry(1.4,2.8,0.25),doorMat);
  door.position.set(0,1.4,D/2+0.1);g.add(door);
  var handleMat=new THREE.MeshStandardMaterial({color:0xffd700,roughness:.2,metalness:1});
  var handle=new THREE.Mesh(new THREE.SphereGeometry(0.08,8,6),handleMat);
  handle.position.set(0.5,1.4,D/2+0.25);g.add(handle);
  var winT=texWindowCached();
  var winMat=new THREE.MeshStandardMaterial({map:winT,roughness:.15,metalness:.4,emissive:0xffaa44,emissiveIntensity:.4});
  var w1=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.6,0.15),winMat);
  w1.position.set(-2,2.2,D/2+0.05);g.add(w1);
  var w2=w1.clone();w2.position.x=2;g.add(w2);
  var stepMat=new THREE.MeshStandardMaterial({color:0x666666,roughness:.9});
  var step=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.15,0.6),stepMat);
  step.position.set(0,0.075,D/2+0.3);g.add(step);
  g.position.set(x,0,z);g.rotation.y=ry2;
  var hw=W/2+0.3,hd=D/2+0.3;
  var ac=Math.abs(Math.cos(ry2)),as=Math.abs(Math.sin(ry2));
  var sx2=hw*ac*2+hd*as*2,sz=hw*as*2+hd*ac*2;
  addCol(x-sx2/2,x+sx2/2,z-sz/2,z+sz/2);
  return g;
}
var roadCars=[],carColors=[0xff5555,0x3498db,0xffcc00,0x9b59b6,0x2ecc71,0xffffff];
function makeCar(dir,startX){
  var g=new THREE.Group(),col=carColors[Math.floor(Math.random()*carColors.length)];
  var bodyMat=new THREE.MeshStandardMaterial({color:col,roughness:.25,metalness:.75});
  var glassMat=new THREE.MeshStandardMaterial({color:0x2c3e50,roughness:.05,metalness:.9,transparent:true,opacity:.85});
  var chromeMat=new THREE.MeshStandardMaterial({color:0xcccccc,roughness:.1,metalness:1});
  var body=new THREE.Mesh(new THREE.BoxGeometry(3.5,.7,1.6),bodyMat);
  body.position.y=.6;body.castShadow=true;g.add(body);
  var hood=new THREE.Mesh(new THREE.BoxGeometry(3.5,.15,1.5),chromeMat);
  hood.position.y=.95;g.add(hood);
  var cab=new THREE.Mesh(new THREE.BoxGeometry(1.6,.55,1.4),glassMat);
  cab.position.set(0,1.15,0);cab.castShadow=true;g.add(cab);
  var lightF=new THREE.Mesh(new THREE.BoxGeometry(.3,.15,.15),new THREE.MeshBasicMaterial({color:0xfff8c2}));
  lightF.position.set(1.75,.65,-.5);g.add(lightF);
  var lightF2=lightF.clone();lightF2.position.set(1.75,.65,.5);g.add(lightF2);
  var lightR=new THREE.Mesh(new THREE.BoxGeometry(.2,.15,.15),new THREE.MeshBasicMaterial({color:0xff3030}));
  lightR.position.set(-1.75,.65,-.5);g.add(lightR);
  var lightR2=lightR.clone();lightR2.position.set(-1.75,.65,.5);g.add(lightR2);
  var wh=[];
  var wheelMat=new THREE.MeshStandardMaterial({color:0x0a0a0a,roughness:.9,metalness:.1});
  var rimMat=new THREE.MeshStandardMaterial({color:0xcccccc,roughness:.2,metalness:.9});
  for(var wx=-1.1;wx<=1.1;wx+=2.2){
    for(var wz=-.9;wz<=.9;wz+=1.8){
      var wg=new THREE.Group();
      wg.position.set(wx,.35,wz);
      var w=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.25,16),wheelMat);
      w.rotation.x=Math.PI/2;w.castShadow=true;wg.add(w);
      var rim=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.26,10),rimMat);
      rim.rotation.x=Math.PI/2;wg.add(rim);
      g.add(wg);wh.push(wg);
    }
  }
  g.userData.dir=dir;g.userData.speed=2+Math.random()*6;g.userData.lane=dir>0?20:24;g.userData.wheels=wh;g.userData.spin=0;
  g.position.set(startX,0,g.userData.lane);if(dir<0)g.rotation.y=Math.PI;
  scene.add(g);roadCars.push(g);
}
makeCar(1,-100);makeCar(-1,50);makeCar(1,120);makeCar(-1,-150);makeCar(1,-30);makeCar(-1,180);

var clouds=[];
for(var cl=0;cl<12;cl++){var cg=new THREE.Group();for(var ci=0;ci<4;ci++){var sp=new THREE.Mesh(new THREE.SphereGeometry(3+Math.random()*3,7,6),new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.94}));sp.position.set((Math.random()-.5)*9,(Math.random()-.5)*1,(Math.random()-.5)*6);cg.add(sp);}cg.position.set((Math.random()-.5)*300,50+Math.random()*20,(Math.random()-.5)*300);cg.userData.speed=.6+Math.random()*.7;scene.add(cg);clouds.push(cg);}

var weatherP=null,weatherType=null;
function setupWeather(type){if(weatherP){scene.remove(weatherP);weatherP=null;weatherType=null;}if(type==='none')return;var cnt=type==='rain'?350:250;var geo=new THREE.BufferGeometry();var pos=new Float32Array(cnt*3);for(var i=0;i<cnt;i++){pos[i*3]=(Math.random()-.5)*80;pos[i*3+1]=Math.random()*35;pos[i*3+2]=(Math.random()-.5)*80;}geo.setAttribute('position',new THREE.BufferAttribute(pos,3));var mat=type==='rain'?new THREE.PointsMaterial({color:0xaaddff,size:.15,transparent:true,opacity:.7}):new THREE.PointsMaterial({color:0xffffff,size:.25,transparent:true,opacity:.9});weatherP=new THREE.Points(geo,mat);if(characterGroup)weatherP.position.set(characterGroup.position.x,0,characterGroup.position.z);scene.add(weatherP);weatherType=type;}
function updateWeather(dt){if(!weatherP)return;var p=weatherP.geometry.attributes.position,a=p.array,c=a.length/3,sp=weatherType==='rain'?22*dt:3*dt;for(var i=0;i<c;i++){a[i*3+1]-=sp;if(a[i*3+1]<0){a[i*3+1]=35;a[i*3]=(Math.random()-.5)*80;a[i*3+2]=(Math.random()-.5)*80;}}p.needsUpdate=true;if(characterGroup){weatherP.position.x=characterGroup.position.x;weatherP.position.z=characterGroup.position.z;}}

;

var CINEMA={height:20,thick:.6,doorHalf:4};
var cg=new THREE.Group();
var cwm=new THREE.MeshLambertMaterial({color:0x2a1050});
var cdm=new THREE.MeshLambertMaterial({color:0x120620});
var cgm=new THREE.MeshStandardMaterial({color:0xffcc00,emissive:0x886600,emissiveIntensity:.7,metalness:.7,roughness:.25});
var cgl=new THREE.MeshStandardMaterial({color:0x88eeff,transparent:true,opacity:.45,metalness:.4,roughness:.05,emissive:0x0099cc,emissiveIntensity:1.2,side:THREE.DoubleSide});
function makeCarpet(){var c=document.createElement('canvas');c.width=c.height=512;var x=c.getContext('2d');var g=x.createRadialGradient(256,256,20,256,256,380);g.addColorStop(0,'#900030');g.addColorStop(1,'#3a0010');x.fillStyle=g;x.fillRect(0,0,512,512);x.strokeStyle='#c02050';x.lineWidth=3;for(var i=0;i<=512;i+=64){x.beginPath();x.moveTo(i,0);x.lineTo(i,512);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(512,i);x.stroke();}var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(5,5);return t;}
var cfm=new THREE.Mesh(new THREE.PlaneGeometry(36,28),new THREE.MeshLambertMaterial({map:makeCarpet()}));
cfm.rotation.x=-Math.PI/2;cfm.position.set(0,.03,-6);cfm.receiveShadow=true;cg.add(cfm);
var cbw=new THREE.Mesh(new THREE.BoxGeometry(36,CINEMA.height,CINEMA.thick),cwm);cbw.position.set(0,CINEMA.height/2,-20+CINEMA.thick/2);cg.add(cbw);
var clw=new THREE.Mesh(new THREE.BoxGeometry(CINEMA.thick,CINEMA.height,28),cwm);clw.position.set(-18+CINEMA.thick/2,CINEMA.height/2,-6);cg.add(clw);
var crw=new THREE.Mesh(new THREE.BoxGeometry(CINEMA.thick,CINEMA.height,28),cwm);crw.position.set(18-CINEMA.thick/2,CINEMA.height/2,-6);cg.add(crw);
var fsw=(36-CINEMA.doorHalf*2)/2;
var cfl=new THREE.Mesh(new THREE.BoxGeometry(fsw,CINEMA.height,CINEMA.thick),cwm);cfl.position.set(-(CINEMA.doorHalf+fsw/2),CINEMA.height/2,8-CINEMA.thick/2);cg.add(cfl);
var cfr=new THREE.Mesh(new THREE.BoxGeometry(fsw,CINEMA.height,CINEMA.thick),cwm);cfr.position.set(CINEMA.doorHalf+fsw/2,CINEMA.height/2,8-CINEMA.thick/2);cg.add(cfr);
[-17,-8,8,17].forEach(function(x){var p=new THREE.Mesh(new THREE.BoxGeometry(.6,CINEMA.height+1,.8),cgm);p.position.set(x,(CINEMA.height+1)/2,8-CINEMA.thick/2);cg.add(p);});
var crf=new THREE.Mesh(new THREE.BoxGeometry(37,.6,29),cdm);crf.position.set(0,CINEMA.height+.3,-6);cg.add(crf);
var scv=document.createElement('canvas');scv.width=1024;scv.height=384;
var sctx=scv.getContext('2d');
function drawScreen(){var t=Date.now()/1000;var g=sctx.createLinearGradient(0,0,1024,0);var h1=(t*20)%360,h2=(t*20+60)%360;g.addColorStop(0,'hsl('+h1+',80%,50%)');g.addColorStop(.5,'hsl('+h2+',80%,60%)');g.addColorStop(1,'hsl('+h1+',80%,50%)');sctx.fillStyle=g;sctx.fillRect(0,0,1024,384);sctx.fillStyle='rgba(0,0,0,.4)';sctx.fillRect(0,140,1024,104);sctx.fillStyle='#fff';sctx.font='bold 72px Impact,sans-serif';sctx.textAlign='center';sctx.textBaseline='middle';sctx.fillText('الآن يعرض',512,192);screenTex.needsUpdate=true;}
var screenTex=new THREE.CanvasTexture(scv);drawScreen();setInterval(drawScreen,80);
var screenMesh=new THREE.Mesh(new THREE.PlaneGeometry(20,11),new THREE.MeshBasicMaterial({map:screenTex}));
screenMesh.position.set(0,8,-19.35);cg.add(screenMesh);
var screenLight=new THREE.PointLight(0x8888ff,1.2,35,2);screenLight.position.set(0,8,-16);cg.add(screenLight);

var CASHIER_POS={x:6,z:10};
/* ===== Avatar system (moved before first use) ===== */
var AVATAR_URLS={
  boy:'https://static.poly.pizza/3746be88-6799-4817-929b-6bc067c47caa.glb',
  girl:'https://static.poly.pizza/cf08b740-dd48-443e-9fde-6d3d54abf119.glb'
};
var avatarCacheAB={};
var avatarMixers=[];
function avatarSwitch(g,name){
  if(!g||!g.userData)return;
  var a=g.userData.acts;if(!a||!a[name])return;
  if(g.userData.currentAction===a[name])return;
  try{
    if(g.userData.currentAction)g.userData.currentAction.fadeOut(.2);
    a[name].reset().fadeIn(.2).play();
    g.userData.currentAction=a[name];
  }catch(e){}
}
function avatarActs(anims){
  var acts={};
  for(var i=0;i<anims.length;i++){
    var n=anims[i].name.toLowerCase(),key=null;
    if(n.indexOf('idle')>=0)key='idle';
    else if(n.indexOf('sitting')>=0)key='sitting';
    else if(n.indexOf('walking')>=0)key='walk';
    else if(n.indexOf('walk')>=0)key='walk';
    else if(n.indexOf('running')>=0)key='run';
    else if(n.indexOf('run')>=0)key='run';
    else if(n.indexOf('jump')>=0&&n.indexOf('running')<0)key='jump';
    else if(n.indexOf('clap')>=0)key='dance';
    if(key&&!acts[key])acts[key]=anims[i];
  }
  return acts;
}
function loadAvatarGLB(url,cb){
  function parseAB(ab,cb2){
    try{new THREE.GLTFLoader().parse(ab.slice(0),'',function(gltf){cb2({scene:gltf.scene,anims:gltf.animations||[]});},function(e){cb2(null);});}
    catch(e){cb2(null);}
  }
  if(avatarCacheAB[url]){parseAB(avatarCacheAB[url],cb);return;}
  var xhr=new XMLHttpRequest();
  xhr.open('GET',url,true);xhr.responseType='arraybuffer';
  xhr.onload=function(){
    if(xhr.status!==200&&xhr.status!==0){cb(null);return;}
    avatarCacheAB[url]=xhr.response;
    parseAB(xhr.response,cb);
  };
  xhr.onerror=function(){cb(null);};
  xhr.send();
}
function upgradeCharToAvatar(g,cfg){
  if(typeof AVATAR_URLS==='undefined'||!AVATAR_URLS)return;
  if(!g||!cfg||cfg.keepProcedural)return;
  if(g.userData.isGLB||g.userData.avatarLoading)return;
  var gender=cfg.gender==='girl'?'girl':'boy';
  g.userData.avatarLoading=true;
  loadAvatarGLB(AVATAR_URLS[gender],function(data){
    g.userData.avatarLoading=false;
    if(!data||!g.parent)return;
    try{
      var model=data.scene;
      while(g.children.length)g.remove(g.children[0]);
      if(gender==='boy'){
        model.traverse(function(o){
          if(o.isMesh&&o.material&&o.material.name){
            var mn=o.material.name.toLowerCase(),col=null;
            if(mn.indexOf('shirt')>=0)col=cfg.shirt;
            else if(mn.indexOf('pants')>=0||mn.indexOf('socks')>=0)col=cfg.pants;
            else if(mn.indexOf('skin')>=0)col=(cfg.skin==null?0xffdbac:cfg.skin);
            else if(mn.indexOf('hair')>=0)col=cfg.hair;
            if(col!=null){o.material=o.material.clone();o.material.color.setHex(col);}
          }
        });
      }
      var box=new THREE.Box3().setFromObject(model);
      var size=box.getSize(new THREE.Vector3());
      var sc=1.8/Math.max(size.y,.001);
      model.scale.set(sc,sc,sc);
      model.rotation.y=Math.PI;
      model.updateMatrixWorld(true);
      box=new THREE.Box3().setFromObject(model);
      model.position.y-=box.min.y;
      model.updateMatrixWorld(true);
      g.add(model);
      g.traverse(function(o){if(o.isMesh)o.castShadow=true;});
      g.userData.isGLB=true;g.userData.avatarV2=true;
      g.userData.__model=model;
      g.userData.legs={left:{rotation:{x:0,y:0,z:0}},right:{rotation:{x:0,y:0,z:0}}};
      g.userData.arms={left:{rotation:{x:0,y:0,z:0}},right:{rotation:{x:0,y:0,z:0}}};
      var mixer=new THREE.AnimationMixer(model);
      var clips=avatarActs(data.anims),acts={};
      for(var k in clips)acts[k]=mixer.clipAction(clips[k]);
      g.userData.mixer=mixer;g.userData.acts=acts;
      avatarMixers.push(g);
      if(acts.idle){acts.idle.play();g.userData.currentAction=acts.idle;}
    }catch(e){console.warn('avatar',e);}
  });
}
function avatarSetMoving(g,moving,run){
  var ud=g.userData;if(!ud||!ud.avatarV2||!ud.acts||ud.emote)return;
  if(moving)avatarSwitch(g,(run&&ud.acts.run)?'run':'walk');
  else avatarSwitch(g,'idle');
}
function updateAvatars(dt){
  for(var i=avatarMixers.length-1;i>=0;i--){
    var g=avatarMixers[i];
    if(!g||!g.parent){avatarMixers.splice(i,1);continue;}
    try{if(g.userData.mixer)g.userData.mixer.update(dt);}catch(e){}
  }
  if(typeof characterGroup!=='undefined'&&characterGroup&&characterGroup.userData.avatarV2&&characterGroup.userData.acts&&!playerSitting){
    var cg=characterGroup,ud=cg.userData;
    if(!ud.emote){
      var dx=cg.position.x-(ud.__lx==null?cg.position.x:ud.__lx),dz=cg.position.z-(ud.__lz==null?cg.position.z:ud.__lz);
      var d=Math.sqrt(dx*dx+dz*dz);
      if(d>0.02)avatarSwitch(cg,(ud.acts.run&&d>0.08)?'run':'walk');
      else avatarSwitch(cg,'idle');
    }
    ud.__lx=cg.position.x;ud.__lz=cg.position.z;
  }

function buildCounter(){
  var g=new THREE.Group(),W=3.5,D=1.4,H=1.2;
  var b=new THREE.Mesh(new THREE.BoxGeometry(W,H,D),cwm);b.position.y=H/2;b.castShadow=true;g.add(b);
  var t=new THREE.Mesh(new THREE.BoxGeometry(W+.3,.15,D+.3),new THREE.MeshStandardMaterial({color:0xff8dc7,emissive:0x661133,emissiveIntensity:.6,metalness:.5,roughness:.3}));
  t.position.y=H+.05;g.add(t);
  var sc=document.createElement('canvas');sc.width=256;sc.height=96;var x=sc.getContext('2d');
  x.fillStyle='#2a0d1f';x.fillRect(0,0,256,96);
  x.strokeStyle='#ff8dc7';x.lineWidth=4;x.strokeRect(4,4,248,88);
  x.fillStyle='#ff8dc7';x.font='bold 44px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('تذاكر',128,48);
  var st=new THREE.CanvasTexture(sc);
  var sm=new THREE.Mesh(new THREE.PlaneGeometry(2.5,.9),new THREE.MeshBasicMaterial({map:st}));
  sm.position.set(0,H+2,D/2+.01);g.add(sm);
  g.position.set(CASHIER_POS.x,0,CASHIER_POS.z);cg.add(g);
  addCol(CASHIER_POS.x-W/2-.3,CASHIER_POS.x+W/2+.3,CASHIER_POS.z-D/2-.3,CASHIER_POS.z+D/2+.3);
  var sel=buildChar({shirt:0xff5da2,pants:0x2a0a1a,hair:0x1e272e,gender:'girl',hairStyle:'long'});
  sel.position.set(CASHIER_POS.x,0,CASHIER_POS.z-.9);sel.rotation.y=Math.PI;cg.add(sel);
}
buildCounter();

var POPCORN_POS={x:-12,z:6};
function buildPop(){
  var g=new THREE.Group(),W=4,D=1.4,H=1.3;
  var b=new THREE.Mesh(new THREE.BoxGeometry(W,H,D),cwm);b.position.y=H/2;b.castShadow=true;g.add(b);
  var t=new THREE.Mesh(new THREE.BoxGeometry(W+.2,.12,D+.2),new THREE.MeshStandardMaterial({color:0xffc857,emissive:0x664400,emissiveIntensity:.6,metalness:.5,roughness:.3}));
  t.position.y=H+.05;g.add(t);
  g.position.set(POPCORN_POS.x,0,POPCORN_POS.z);cg.add(g);
  addCol(POPCORN_POS.x-W/2-.2,POPCORN_POS.x+W/2+.2,POPCORN_POS.z-D/2-.2,POPCORN_POS.z+D/2+.2);
}
buildPop();

var seats=[],SEAT_ROWS=8;
var seatBase=new THREE.MeshLambertMaterial({color:0x3a0a20}),seatCush=new THREE.MeshLambertMaterial({color:0xdd3322});
function makeSeatMesh(tier){var g=new THREE.Group(),ph=.15+tier*.4;var p=new THREE.Mesh(new THREE.BoxGeometry(1.1,ph,1.4),seatBase);p.position.y=ph/2;g.add(p);var yb=ph;var s=new THREE.Mesh(new THREE.BoxGeometry(1,.15,.9),seatCush);s.position.set(0,yb+.5,0);g.add(s);var bk=new THREE.Mesh(new THREE.BoxGeometry(1,.75,.15),seatCush);bk.position.set(0,yb+.9,.4);g.add(bk);g.userData.yb=yb;return g;}
(function(){var startZ=-14,rowSp=1.7,seatSp=1.3,cols=5,lc=-4.1,rc=4.1;for(var r=0;r<SEAT_ROWS;r++){var z=startZ+r*rowSp,yb=.15+r*.4;for(var c=0;c<cols;c++){var x=lc+(c-(cols-1)/2)*seatSp;var sm=makeSeatMesh(r);sm.position.set(x,0,z);cg.add(sm);addCol(x-.55,x+.55,z-.7,z+.7);seats.push({mesh:sm,pos:new THREE.Vector3(x,0,z),sitPos:new THREE.Vector3(x,yb,z+.1),occupied:false});}for(var c2=0;c2<cols;c2++){var x2=rc+(c2-(cols-1)/2)*seatSp;var sm2=makeSeatMesh(r);sm2.position.set(x2,0,z);cg.add(sm2);addCol(x2-.55,x2+.55,z-.7,z+.7);seats.push({mesh:sm2,pos:new THREE.Vector3(x2,0,z),sitPos:new THREE.Vector3(x2,yb,z+.1),occupied:false});}}})();

var doorLeft,doorRight;
function makeDoor(){var g=new THREE.Group(),h=CINEMA.height-3,dw=CINEMA.doorHalf;var lp=new THREE.Group();lp.position.set(-dw,h/2+.5,0);var lg=new THREE.Mesh(new THREE.PlaneGeometry(dw,h),cgl);lg.position.x=dw/2;lp.add(lg);g.add(lp);var rp=new THREE.Group();rp.position.set(dw,h/2+.5,0);var rg=new THREE.Mesh(new THREE.PlaneGeometry(dw,h),cgl);rg.position.x=-dw/2;rp.add(rg);g.add(rp);g.position.set(0,0,8.1);cg.add(g);return {left:lp,right:rp};}
var gd=makeDoor();doorLeft=gd.left;doorRight=gd.right;
scene.add(cg);
addCol(-18.3,18.3,-20.3,-19.7);
addCol(-18.3,-17.7,-20.3,8.3);
addCol(17.7,18.3,-20.3,8.3);
addCol(-18.3,-CINEMA.doorHalf,7.7,8.3);
addCol(CINEMA.doorHalf,18.3,7.7,8.3);
addCol(-CINEMA.doorHalf,CINEMA.doorHalf,7.7,8.3);
var doorColIdx=colliders.length-1;

function buildChar(cfg){
  var shirt=(cfg.shirt!==undefined&&cfg.shirt!==null)?cfg.shirt:0xffd700;
  var pants=(cfg.pants!==undefined&&cfg.pants!==null)?cfg.pants:0x2c5aa0;
  var skin=(cfg.skin!==undefined&&cfg.skin!==null)?cfg.skin:0xf5c99b;
  var hair=(cfg.hair!==undefined&&cfg.hair!==null)?cfg.hair:0x0a0a0a;
  var size=cfg.size||1;
  var hs=cfg.hairStyle||'short',hat=cfg.hat||'none';
  var isGolden=!!cfg.golden;
  var g=new THREE.Group();
  function mat(col){return isGolden?new THREE.MeshStandardMaterial({color:col,metalness:.9,roughness:.15,emissive:0x664400,emissiveIntensity:.5}):new THREE.MeshLambertMaterial({color:col});}
  var skinM=mat(skin),shirtM=mat(shirt),pantsM=mat(pants),hairM=mat(hair);
  var whiteM=new THREE.MeshLambertMaterial({color:0xffffff});
  var blackM=new THREE.MeshBasicMaterial({color:0x0a0a0a});
  var mouthM=new THREE.MeshBasicMaterial({color:0x8b1a1a});
  var blushM=new THREE.MeshBasicMaterial({color:0xff8ea0,transparent:true,opacity:.55});
  var frameM=new THREE.MeshBasicMaterial({color:0x2a2a2a});
  var lensM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.2});
  var shoeM=mat(0xf5f5f5);

  /* رقبة */
  var neck=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.1,12),skinM);
  neck.position.y=1.36;g.add(neck);

  /* راس - كرة */
  var headR=.32;
  var head=new THREE.Mesh(new THREE.SphereGeometry(headR,20,16),skinM);
  head.position.y=1.7;head.castShadow=true;head.userData.isHead=true;g.add(head);

  var faceMats=[];
  /* عيون */
  [-.11,.11].forEach(function(x){
    var eye=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),whiteM);
    eye.position.set(x,1.74,-headR+.04);eye.userData.isFace=true;g.add(eye);faceMats.push(eye);
    var pu=new THREE.Mesh(new THREE.SphereGeometry(.028,10,8),blackM);
    pu.position.set(x,1.74,-headR+.02);pu.userData.isFace=true;g.add(pu);faceMats.push(pu);
  });
  /* نظارة دائرية */
  [-.11,.11].forEach(function(x){
    var frame=new THREE.Mesh(new THREE.TorusGeometry(.09,.016,8,20),frameM);
    frame.position.set(x,1.74,-headR+.01);g.add(frame);
    var lens=new THREE.Mesh(new THREE.CircleGeometry(.08,20),lensM);
    lens.position.set(x,1.74,-headR+.02);g.add(lens);
  });
  var bridge=new THREE.Mesh(new THREE.BoxGeometry(.05,.02,.02),frameM);
  bridge.position.set(0,1.74,-headR+.01);g.add(bridge);
  [-.24,.24].forEach(function(x){
    var arm=new THREE.Mesh(new THREE.BoxGeometry(.02,.02,.25),frameM);
    arm.position.set(x,1.74,-headR+.13);g.add(arm);
  });
  /* انف */
  var nose=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),skinM);
  nose.position.set(0,1.66,-headR+.02);g.add(nose);
  /* فم */
  var mouth=new THREE.Mesh(new THREE.BoxGeometry(.11,.045,.03),mouthM);
  mouth.position.set(0,1.58,-headR+.02);mouth.userData.isFace=true;g.add(mouth);faceMats.push(mouth);
  /* خدود */
  [-.19,.19].forEach(function(x){
    var bl=new THREE.Mesh(new THREE.CircleGeometry(.06,12),blushM);
    bl.position.set(x,1.63,-headR+.04);bl.userData.isFace=true;g.add(bl);faceMats.push(bl);
  });
  g.userData.faceMats=faceMats;

  /* شعر */
  if(hs==='long'){
    var lc=new THREE.Mesh(new THREE.SphereGeometry(headR+.015,20,12,0,Math.PI*2,0,Math.PI/2),hairM);
    lc.position.y=1.7;g.add(lc);
    var lb=new THREE.Mesh(new THREE.SphereGeometry(headR*.95,14,12,0,Math.PI,0,Math.PI),hairM);
    lb.position.set(0,1.55,.12);lb.scale.set(1,1.4,.85);g.add(lb);
    var ls1=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),hairM);
    ls1.position.set(-.34,1.55,0);ls1.scale.set(.6,1.5,1);g.add(ls1);
    var ls2=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),hairM);
    ls2.position.set(.34,1.55,0);ls2.scale.set(.6,1.5,1);g.add(ls2);
  }else if(hs==='ponytail'){
    var pc=new THREE.Mesh(new THREE.SphereGeometry(headR+.015,20,12,0,Math.PI*2,0,Math.PI/2),hairM);
    pc.position.y=1.7;g.add(pc);
    var tail=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,.6,10),hairM);
    tail.position.set(0,1.5,.35);tail.rotation.x=0.3;g.add(tail);
    var tailEnd=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),hairM);
    tailEnd.position.set(0,1.25,.5);g.add(tailEnd);
    var tie=new THREE.Mesh(new THREE.TorusGeometry(.1,.025,6,14),mat(0xff5da2));
    tie.position.set(0,1.75,.32);tie.rotation.x=Math.PI/2;g.add(tie);
  }else if(hs==='spiky'){
    var sc=new THREE.Mesh(new THREE.SphereGeometry(headR+.015,20,12,0,Math.PI*2,0,Math.PI/2),hairM);
    sc.position.y=1.7;g.add(sc);
    for(var sp=0;sp<8;sp++){
      var ang=Math.PI*2*sp/8;
      var spike=new THREE.Mesh(new THREE.ConeGeometry(.06,.2,6),hairM);
      spike.position.set(Math.cos(ang)*headR*.75,2.05,Math.sin(ang)*headR*.75);
      spike.rotation.z=-Math.cos(ang)*0.5;
      spike.rotation.x=Math.sin(ang)*0.5;
      g.add(spike);
    }
  }else{
    /* نوبيتا - قبة + غرة */
    var nc=new THREE.Mesh(new THREE.SphereGeometry(headR+.015,20,12,0,Math.PI*2,0,Math.PI/2),hairM);
    nc.position.y=1.7;g.add(nc);
    var bang=new THREE.Mesh(new THREE.SphereGeometry(headR*.85,14,10,0,Math.PI,0,Math.PI/2),hairM);
    bang.position.set(0,1.75,-headR*.25);bang.scale.set(1.05,0.7,.7);g.add(bang);
    var sb1=new THREE.Mesh(new THREE.SphereGeometry(.08,10,8),hairM);
    sb1.position.set(-.31,1.68,-.05);sb1.scale.set(.5,1.3,1);g.add(sb1);
    var sb2=new THREE.Mesh(new THREE.SphereGeometry(.08,10,8),hairM);
    sb2.position.set(.31,1.68,-.05);sb2.scale.set(.5,1.3,1);g.add(sb2);
    var bk=new THREE.Mesh(new THREE.SphereGeometry(headR*.9,12,10,0,Math.PI,0,Math.PI),hairM);
    bk.position.set(0,1.62,.1);bk.scale.set(1,1.15,.75);g.add(bk);
  }

  /* قبعة */
  if(hat==='crown'){
    var cr=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.13,10),new THREE.MeshStandardMaterial({color:0xffcc00,metalness:.9,emissive:0xffaa00,emissiveIntensity:.8}));
    cr.position.set(0,2.08,0);g.add(cr);
  }else if(hat==='cap'){
    var cp=new THREE.Mesh(new THREE.SphereGeometry(.34,14,10,0,Math.PI*2,0,Math.PI/2),mat(0xff3030));
    cp.position.set(0,1.75,0);g.add(cp);
    var brim=new THREE.Mesh(new THREE.BoxGeometry(.5,.04,.25),mat(0xff3030));
    brim.position.set(0,1.75,-.35);g.add(brim);
  }

  /* جسم - أسطوانة */
  var torso=new THREE.Mesh(new THREE.CylinderGeometry(.26,.24,.7,16),shirtM);
  torso.position.y=.98;torso.castShadow=true;g.add(torso);

  /* ياقة */
  var collar=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.05,16),whiteM);
  collar.position.y=1.31;g.add(collar);
  var cTie=new THREE.Mesh(new THREE.BoxGeometry(.1,.16,.04),whiteM);
  cTie.position.set(0,1.24,-.2);cTie.rotation.z=Math.PI/4;g.add(cTie);

  /* الأطراف */
  var arms={},legs={};
  [[-1,'left'],[1,'right']].forEach(function(arr){
    var s=arr[0],name=arr[1];
    /* ذراع */
    var arm=new THREE.Group();arm.position.set(.28*s,1.28,0);
    var sleeve=new THREE.Mesh(new THREE.CylinderGeometry(.09,.08,.3,10),shirtM);
    sleeve.position.y=-.15;arm.add(sleeve);
    var forearm=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.3,10),skinM);
    forearm.position.y=-.45;arm.add(forearm);
    var hand=new THREE.Mesh(new THREE.SphereGeometry(.085,10,8),skinM);
    hand.position.y=-.62;hand.scale.set(1,1.1,.9);arm.add(hand);
    g.add(arm);arms[name]=arm;

    /* رجل */
    var leg=new THREE.Group();leg.position.set(.11*s,.62,0);
    var shorts=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.22,12),pantsM);
    shorts.position.y=-.11;leg.add(shorts);
    var legSkin=new THREE.Mesh(new THREE.CylinderGeometry(.085,.08,.32,10),skinM);
    legSkin.position.y=-.38;leg.add(legSkin);
    var sock=new THREE.Mesh(new THREE.CylinderGeometry(.095,.09,.22,10),whiteM);
    sock.position.y=-.65;leg.add(sock);
    var shoe=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8,0,Math.PI*2,0,Math.PI/2),shoeM);
    shoe.position.set(0,-.76,-.02);shoe.scale.set(1,.7,1.4);leg.add(shoe);
    g.add(leg);legs[name]=leg;
  });

  if(size!==1)g.scale.set(size,size,size);
  g.userData.arms=arms;g.userData.legs=legs;g.userData.size=size;
  upgradeCharToAvatar(g,cfg);
  return g;
}
/* ═══════ أفاتار GLB الجديد (Quaternius — CC0) ═══════ */
}
var characterGroup=buildChar({shirt:0x00a8ff,pants:0x192a56,hair:0x1e272e,skin:0xffdbac,gender:'boy',hairStyle:'short',hat:'none'});
scene.add(characterGroup);characterGroup.position.set(0,0,14);characterGroup.rotation.y=Math.PI;
function rebuildChar(){var op=characterGroup.position.clone(),or=characterGroup.rotation.y;scene.remove(characterGroup);characterGroup=buildChar({shirt:player.shirt,pants:player.pants,hair:player.hair,skin:player.skin,gender:player.gender,hairStyle:player.hairStyle,hat:player.hat,glasses:player.glasses,shirtStyle:player.shirtStyle,eyeStyle:player.eyeStyle});characterGroup.position.copy(op);characterGroup.rotation.y=or;scene.add(characterGroup);if(player.face)applyPlayerFace();}
var playerShadow=new THREE.Mesh(new THREE.CircleGeometry(.4,12),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.4}));
playerShadow.rotation.x=-Math.PI/2;playerShadow.position.y=.02;scene.add(playerShadow);
function applyFaceTex(group,faceUrl,skinColor,scale){
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
    });
    return true;
  }catch(e){return false;}
}
function applyPlayerFace(){
  if(!player.face)return;
  if(characterGroup.userData.avatarV2)return;
  var fm=characterGroup.userData.faceMats;
  if(fm)for(var k=0;k<fm.length;k++)fm[k].visible=false;
  applyFaceTex(characterGroup,player.face,player.skin,player.faceScale||1);
}
setInterval(function(){
  try{
    if(!window.gameStarted)return;
    if(!player.face)return;
    if(!characterGroup)return;
    var head=null;
    for(var i=0;i<characterGroup.children.length;i++){
      if(characterGroup.children[i].userData&&characterGroup.children[i].userData.isHead){head=characterGroup.children[i];break;}
    }
    if(!head)return;
    var fm=characterGroup.userData.faceMats;
    if(fm)for(var k=0;k<fm.length;k++)fm[k].visible=false;
    if(Array.isArray(head.material)&&head.material.length===6&&head.material[5]&&head.material[5].map)return;
    applyFaceTex(characterGroup,player.face,player.skin,player.faceScale||1);
  }catch(e){}
},1000);
