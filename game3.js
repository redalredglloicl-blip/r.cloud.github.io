/* Cinema Iraq 3D - part */

/* ═══════ موسيقى اللعبة الثابتة ═══════ */
(function(){
'use strict';
document.addEventListener('visibilitychange',function(){
  try{
    if(document.hidden){
      if(audio&&!audio.paused){audio.pause();window.__musicWasPlaying=true;}
    }else{
      if(window.__musicWasPlaying&&audio){audio.play().catch(function(){});window.__musicWasPlaying=false;}
    }
  }catch(e){}
});
window.addEventListener('pagehide',function(){try{if(audio)audio.pause();}catch(e){}});
window.addEventListener('beforeunload',function(){try{if(audio)audio.pause();}catch(e){}});
var MUSIC_URL='https://files.catbox.moe/cakut0.m4a';
var audio=new Audio(MUSIC_URL);
audio.loop=true;
audio.preload='auto';
audio.volume=parseFloat(localStorage.getItem('cinema_bgm_vol')||'0.35');
var playing=false;
var started=false;

function startMusic(){
  if(started&&playing)return;
  audio.play().then(function(){
    playing=true;
    started=true;
    updateBtn();
  }).catch(function(){
    playing=false;
    updateBtn();
  });
}
function pauseMusic(){
  audio.pause();
  playing=false;
  updateBtn();
}
function updateBtn(){
  var btn=document.getElementById('music-btn');
  if(!btn)return;
  if(playing){
    btn.style.color='#7bedb5';
  } else {
    btn.style.color='';
  }
}

setTimeout(startMusic,1500);

document.addEventListener('touchstart',function first(){
  if(!playing)startMusic();
  document.removeEventListener('touchstart',first);
},{once:true});
document.addEventListener('click',function firstClick(){
  if(!playing)startMusic();
  document.removeEventListener('click',firstClick);
},{once:true});

function attachBtn(){
  var musicBtn=document.getElementById('music-btn');
  if(!musicBtn){setTimeout(attachBtn,500);return;}
  var newBtn=musicBtn.cloneNode(true);
  musicBtn.parentNode.replaceChild(newBtn,musicBtn);
  newBtn.id='music-btn';
  newBtn.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    if(playing)pauseMusic();else startMusic();
    if(window.sfxClick)sfxClick();
  });
  updateBtn();
}
setTimeout(attachBtn,2000);

setInterval(function(){
  var sm=document.getElementById('settings-modal');
  if(!sm||!sm.classList.contains('a'))return;
  if(document.getElementById('bgm-vol-row'))return;
  var body=sm.querySelector('.mb');
  if(!body)return;
  var sec=document.createElement('div');
  sec.className='ac';
  sec.id='bgm-vol-row';
  sec.innerHTML='<h4>🎵 موسيقى اللعبة</h4>'+
  '<label style="color:#ff8dc7;font-weight:bold;font-size:.72rem;display:block;margin-bottom:6px">الصوت: <span id="bgm-vol-val">'+Math.round(audio.volume*100)+'%</span></label>'+
  '<input id="bgm-vol" type="range" min="0" max="100" value="'+Math.round(audio.volume*100)+'" style="width:100%;accent-color:#ff8dc7">';
  body.appendChild(sec);
  var slider=document.getElementById('bgm-vol');
  var val=document.getElementById('bgm-vol-val');
  slider.addEventListener('input',function(){
    var v=parseInt(this.value)||0;
    val.textContent=v+'%';
    audio.volume=v/100;
    try{localStorage.setItem('cinema_bgm_vol',String(v/100));}catch(e){}
  });
},500);

})();

;

/* ═══════ إدارة الشخصيات - إخفاء/إظهار ═══════ */
(function(){
'use strict';

var HIDDEN_KEY='cinema_hidden_chars';
var hiddenList=[];

/* تحميل القائمة المحفوظة */
function loadHidden(){
  try{
    var r=localStorage.getItem(HIDDEN_KEY);
    if(r)hiddenList=JSON.parse(r)||[];
  }catch(e){hiddenList=[];}
}
function saveHidden(){
  try{localStorage.setItem(HIDDEN_KEY,JSON.stringify(hiddenList));}catch(e){}
}
function isHidden(id){return hiddenList.indexOf(id)!==-1;}
function hideChar(id){
  if(hiddenList.indexOf(id)===-1){hiddenList.push(id);saveHidden();applyFilter();}
}
function showChar(id){
  var idx=hiddenList.indexOf(id);
  if(idx!==-1){hiddenList.splice(idx,1);saveHidden();applyFilter();}
}

/* فلترة chars - إزالة المخفيين */
function applyFilter(){
  if(!window.chars||!Array.isArray(window.chars))return;
  for(var i=window.chars.length-1;i>=0;i--){
    var ch=window.chars[i];
    if(isHidden(ch.id)){
      /* ضع علامة بدل الحذف (حتى نقدر نرجعه) */
      window.chars[i].__hidden=true;
    } else {
      if(window.chars[i].__hidden)delete window.chars[i].__hidden;
    }
  }
}

/* ═══ تبويب الإدارة في الاستوديو ═══ */
function injectManageTab(){
  var tabs=document.getElementById('st-tabs');
  var body=document.getElementById('st-body');
  if(!tabs||!body)return setTimeout(injectManageTab,500);
  if(document.getElementById('st-tab-manage'))return;

  var btn=document.createElement('button');
  btn.className='st-tab';
  btn.setAttribute('data-t','manage');
  btn.textContent='🗑️ إدارة';
  tabs.appendChild(btn);

  var pane=document.createElement('div');
  pane.className='st-pane';
  pane.setAttribute('data-p','manage');
  pane.id='st-tab-manage';

  var header=document.createElement('div');
  header.style.cssText='background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.3);border-radius:10px;padding:12px;margin-bottom:10px;font-size:.72rem;color:#ff8dc7;line-height:1.6';
  header.innerHTML='🗑️ <b>إخفاء الشخصيات</b><br>اختر الشخصيات اللي ما تريدها تظهر — راح تختفي من:<br>• قائمة البكجات<br>• معاينة الشخصيات<br>• أي مكان ثاني';
  pane.appendChild(header);

  var searchRow=document.createElement('div');
  searchRow.className='st-row';
  searchRow.innerHTML='<label>🔍 بحث</label><input id="mg-search" type="text" placeholder="اسم الشخصية..." style="font-size:.8rem">';
  pane.appendChild(searchRow);

  var listContainer=document.createElement('div');
  listContainer.id='mg-list';
  listContainer.style.cssText='display:grid;grid-template-columns:1fr;gap:6px;max-height:60vh;overflow-y:auto;padding:4px;';
  pane.appendChild(listContainer);

  var btnRow=document.createElement('div');
  btnRow.style.cssText='display:flex;gap:6px;margin-top:10px;';
  btnRow.innerHTML=
    '<button id="mg-show-all" style="flex:1;padding:10px;background:linear-gradient(135deg,#16a34a,#22c55e);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.8rem">✅ إظهار الكل</button>'+
    '<button id="mg-save" style="flex:1;padding:10px;background:linear-gradient(135deg,#ff8dc7,#c2185b);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.8rem">💾 حفظ</button>';
  pane.appendChild(btnRow);

  body.appendChild(pane);

  /* رسم القائمة */
  function renderList(){
    var list=document.getElementById('mg-list');
    var search=(document.getElementById('mg-search').value||'').toLowerCase();
    if(!window.chars){list.innerHTML='<div style="text-align:center;padding:20px;color:#d0b8c8">ما فيه شخصيات</div>';return;}
    var h='';
    for(var i=0;i<window.chars.length;i++){
      var ch=window.chars[i];
      if(search&&ch.name.toLowerCase().indexOf(search)===-1)continue;
      var hidden=isHidden(ch.id);
      var rar=ch.rarity||'common';
      var rarName=window.RARITY_NAME&&window.RARITY_NAME[rar]?window.RARITY_NAME[rar]:rar;
      var rarCol=window.RARITY_COLOR&&window.RARITY_COLOR[rar]?window.RARITY_COLOR[rar]:'#fff';
      h+='<div class="mg-item" data-id="'+ch.id+'" style="display:flex;align-items:center;gap:8px;background:rgba(45,15,45,.6);border:2px solid '+(hidden?'#ff6b8a':'rgba(255,141,199,.3)')+';border-radius:10px;padding:8px;cursor:pointer;'+(hidden?'opacity:.5':'')+'">';
      h+='<canvas class="mg-prev" data-id="'+ch.id+'" width="50" height="50" style="width:50px;height:50px;border-radius:8px;background:#100510;flex-shrink:0"></canvas>';
      h+='<div style="flex:1;overflow:hidden">';
      h+='<div style="font-weight:900;font-size:.8rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(hidden?'🚫 ':'')+ch.name+'</div>';
      h+='<div style="font-size:.65rem;color:'+rarCol+';font-weight:bold">'+rarName+'</div>';
      h+='</div>';
      h+='<div style="font-size:1.4rem">'+(hidden?'👁️‍🗨️':'👁️')+'</div>';
      h+='</div>';
    }
    list.innerHTML=h;

    /* رسم المعاينات */
    list.querySelectorAll('.mg-prev').forEach(function(cv){
      var cid=cv.getAttribute('data-id');
      if(!window.drawCharPreview||!window.chars)return;
      for(var k=0;k<window.chars.length;k++){
        if(window.chars[k].id===cid){
          window.drawCharPreview(cv,window.chars[k]);
          break;
        }
      }
    });

    /* التبديل بالضغط */
    list.querySelectorAll('.mg-item').forEach(function(item){
      item.addEventListener('click',function(){
        var id=this.getAttribute('data-id');
        if(isHidden(id)){showChar(id);}
        else{hideChar(id);}
        renderList();
        if(window.sfxClick)sfxClick();
      });
    });
  }

  /* الأحداث */
  document.getElementById('mg-search').addEventListener('input',renderList);
  document.getElementById('mg-show-all').addEventListener('click',function(){
    hiddenList=[];
    saveHidden();
    applyFilter();
    renderList();
    if(window.toast)toast('تم إظهار كل الشخصيات','g');
    if(window.sfxCoin)sfxCoin();
  });
  document.getElementById('mg-save').addEventListener('click',function(){
    saveHidden();
    applyFilter();
    if(window.toast)toast('تم الحفظ 💾','g');
    if(window.sfxLevelUp)sfxLevelUp();
  });

  btn.addEventListener('click',function(){
    document.querySelectorAll('#st-tabs .st-tab').forEach(function(x){x.classList.remove('a');});
    btn.classList.add('a');
    document.querySelectorAll('.st-pane').forEach(function(x){x.classList.remove('a');});
    pane.classList.add('a');
    renderList();
  });
}
setTimeout(injectManageTab,1500);

/* فلترة عند التحميل */
loadHidden();
setTimeout(applyFilter,2000);

/* اجعل الدوال متاحة */
window.__isHiddenChar=isHidden;
window.__hiddenList=hiddenList;
window.__applyCharFilter=applyFilter;

})();

;

/* ═══════ استوديو - تبويبات إضافية (نموذج 3D + إدارة) ═══════ */
(function(){
'use strict';

/* ═══════════════════════════════════════════════
   1) نظام إخفاء/إظهار الشخصيات
   ═══════════════════════════════════════════════ */
var HIDDEN_KEY='cinema_hidden_chars';
var hiddenList=[];
function loadHidden(){try{var r=localStorage.getItem(HIDDEN_KEY);if(r)hiddenList=JSON.parse(r)||[];}catch(e){hiddenList=[];}}
function saveHidden(){try{localStorage.setItem(HIDDEN_KEY,JSON.stringify(hiddenList));}catch(e){}}
function isHidden(id){return hiddenList.indexOf(id)!==-1;}
function hideChar(id){if(hiddenList.indexOf(id)===-1){hiddenList.push(id);saveHidden();}}
function showChar(id){var idx=hiddenList.indexOf(id);if(idx!==-1){hiddenList.splice(idx,1);saveHidden();}}

/* ═══════════════════════════════════════════════
   2) نظام تحميل GLB/GLTF
   ═══════════════════════════════════════════════ */
var modelCache={};
function loadGLB(url,cb){
  if(modelCache[url]){cb(modelCache[url]);return;}
  if(typeof THREE.GLTFLoader==='undefined'){cb(null);return;}
  var loader=new THREE.GLTFLoader();
  loader.load(url,function(gltf){
    var model=gltf.scene;
    var box=new THREE.Box3().setFromObject(model);
    var size=box.getSize(new THREE.Vector3());
    var scale=2.0/size.y;
    model.scale.set(scale,scale,scale);
    box=new THREE.Box3().setFromObject(model);
    model.position.y=-box.min.y;
    model.traverse(function(ch){if(ch.isMesh){ch.castShadow=true;ch.receiveShadow=true;}});
    modelCache[url]=model;
    cb(model);
  },undefined,function(){cb(null);});
}

/* استبدل buildChar لدعم النماذج */
if(window.buildChar){
  window.__origBuildChar3=window.buildChar;
  window.buildChar=function(cfg){
    if(cfg&&cfg.modelUrl){
      var container=new THREE.Group();
      var cached=modelCache[cfg.modelUrl];
      if(cached){container.add(cached.clone());}
      else{
        var ph=new THREE.Mesh(new THREE.BoxGeometry(.5,1.8,.5),new THREE.MeshLambertMaterial({color:0x888888}));
        ph.position.y=0.9;container.add(ph);
        loadGLB(cfg.modelUrl,function(m){if(m){container.clear();container.add(m.clone());}});
      }
      container.userData={arms:{},legs:{},size:1,isModel:true,isHead:false,faceMats:[]};
      return container;
    }
    return window.__origBuildChar3(cfg);
  };
}

/* ═══════════════════════════════════════════════
   3) حقن التبويبات في الاستوديو
   ═══════════════════════════════════════════════ */
function injectAllTabs(){
  var tabs=document.getElementById('st-tabs');
  var body=document.getElementById('st-body');
  if(!tabs||!body)return setTimeout(injectAllTabs,500);

  /* ─── تبويب النموذج 3D ─── */
  if(!document.getElementById('st-tab-model')){
    var mBtn=document.createElement('button');
    mBtn.className='st-tab';
    mBtn.setAttribute('data-t','model');
    mBtn.textContent='🧊 نموذج';
    tabs.appendChild(mBtn);

    var mPane=document.createElement('div');
    mPane.className='st-pane';
    mPane.setAttribute('data-p','model');
    mPane.id='st-tab-model';
    mPane.innerHTML=
      '<div style="background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.3);border-radius:10px;padding:12px;margin-bottom:10px;font-size:.72rem;color:#ff8dc7;line-height:1.6">'+
      '🧊 <b>شخصية 3D جاهزة (GLB/GLTF)</b><br>'+
      '📌 من sketchfab.com أو mixamo.com أو quaternius.com<br>'+
      '📌 ارفع GLB على catbox.moe والصق الرابط'+
      '</div>'+
      '<div class="st-row"><label>رابط GLB</label><input id="st-model-url" type="text" placeholder="https://.../model.glb" style="font-size:.7rem"></div>'+
      '<button id="st-model-load" style="width:100%;padding:12px;background:linear-gradient(135deg,#ff8dc7,#c2185b);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.9rem;margin-bottom:8px">⬇️ تحميل</button>'+
      '<div id="st-model-status" style="text-align:center;font-size:.75rem;color:#d0b8c8;padding:6px">ما فيه نموذج</div>';
    body.appendChild(mPane);

    document.getElementById('st-model-load').addEventListener('click',function(){
      var url=document.getElementById('st-model-url').value.trim();
      var st=document.getElementById('st-model-status');
      if(!url){st.textContent='اكتب رابط';st.style.color='#ffb0c0';return;}
      st.textContent='جاري التحميل...';st.style.color='#ffd166';
      loadGLB(url,function(m){
        if(m){st.textContent='✅ تم التحميل!';st.style.color='#7bedb5';}
        else{st.textContent='❌ فشل';st.style.color='#ffb0c0';}
      });
    });

    mBtn.addEventListener('click',function(){
      document.querySelectorAll('#st-tabs .st-tab').forEach(function(x){x.classList.remove('a');});
      mBtn.classList.add('a');
      document.querySelectorAll('.st-pane').forEach(function(x){x.classList.remove('a');});
      mPane.classList.add('a');
    });
  }

  /* ─── تبويب الإدارة ─── */
  if(!document.getElementById('st-tab-manage')){
    var gBtn=document.createElement('button');
    gBtn.className='st-tab';
    gBtn.setAttribute('data-t','manage');
    gBtn.textContent='🗑️ إدارة';
    tabs.appendChild(gBtn);

    var gPane=document.createElement('div');
    gPane.className='st-pane';
    gPane.setAttribute('data-p','manage');
    gPane.id='st-tab-manage';
    gPane.innerHTML=
      '<div style="background:rgba(45,15,45,.6);border:1px solid rgba(255,141,199,.3);border-radius:10px;padding:12px;margin-bottom:10px;font-size:.72rem;color:#ff8dc7;line-height:1.6">'+
      '🗑️ اضغط على شخصية لـ <b>إخفاء/إظهار</b>'+
      '</div>'+
      '<div class="st-row"><label>🔍 بحث</label><input id="mg-search" type="text" placeholder="اسم..." style="font-size:.8rem"></div>'+
      '<div id="mg-list" style="display:grid;grid-template-columns:1fr;gap:6px;max-height:60vh;overflow-y:auto;padding:4px;"></div>'+
      '<div style="display:flex;gap:6px;margin-top:10px;">'+
      '<button id="mg-show-all" style="flex:1;padding:10px;background:linear-gradient(135deg,#16a34a,#22c55e);color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;font-size:.8rem">✅ إظهار الكل</button>'+
      '</div>';
    body.appendChild(gPane);

    function renderList(){
      var list=document.getElementById('mg-list');
      var search=(document.getElementById('mg-search').value||'').toLowerCase();
      if(!window.chars){list.innerHTML='<div style="text-align:center;padding:20px;color:#d0b8c8">ما فيه شخصيات</div>';return;}
      var h='';
      for(var i=0;i<window.chars.length;i++){
        var ch=window.chars[i];
        if(search&&ch.name.toLowerCase().indexOf(search)===-1)continue;
        var hidden=isHidden(ch.id);
        var rar=ch.rarity||'common';
        var rarName=(window.RARITY_NAME&&window.RARITY_NAME[rar])||rar;
        var rarCol=(window.RARITY_COLOR&&window.RARITY_COLOR[rar])||'#fff';
        h+='<div class="mg-item" data-id="'+ch.id+'" style="display:flex;align-items:center;gap:8px;background:rgba(45,15,45,.6);border:2px solid '+(hidden?'#ff6b8a':'rgba(255,141,199,.3)')+';border-radius:10px;padding:8px;cursor:pointer;'+(hidden?'opacity:.5':'')+'">';
        h+='<canvas class="mg-prev" data-id="'+ch.id+'" width="50" height="50" style="width:50px;height:50px;border-radius:8px;background:#100510;flex-shrink:0"></canvas>';
        h+='<div style="flex:1;overflow:hidden"><div style="font-weight:900;font-size:.8rem;color:#fff">'+(hidden?'🚫 ':'')+ch.name+'</div><div style="font-size:.65rem;color:'+rarCol+';font-weight:bold">'+rarName+'</div></div>';
        h+='<div style="font-size:1.4rem">'+(hidden?'👁️‍🗨️':'👁️')+'</div></div>';
      }
      list.innerHTML=h;
      list.querySelectorAll('.mg-prev').forEach(function(cv){
        var cid=cv.getAttribute('data-id');
        if(!window.drawCharPreview)return;
        for(var k=0;k<window.chars.length;k++){
          if(window.chars[k].id===cid){window.drawCharPreview(cv,window.chars[k]);break;}
        }
      });
      list.querySelectorAll('.mg-item').forEach(function(item){
        item.addEventListener('click',function(){
          var id=this.getAttribute('data-id');
          if(isHidden(id))showChar(id);else hideChar(id);
          renderList();
          if(window.sfxClick)sfxClick();
        });
      });
    }

    document.getElementById('mg-search').addEventListener('input',renderList);
    document.getElementById('mg-show-all').addEventListener('click',function(){
      hiddenList=[];saveHidden();renderList();
      if(window.toast)toast('تم إظهار الكل','g');
    });

    gBtn.addEventListener('click',function(){
      document.querySelectorAll('#st-tabs .st-tab').forEach(function(x){x.classList.remove('a');});
      gBtn.classList.add('a');
      document.querySelectorAll('.st-pane').forEach(function(x){x.classList.remove('a');});
      gPane.classList.add('a');
      renderList();
    });
  }
}
setTimeout(injectAllTabs,1500);

/* متاح للفلترة */
window.__isHiddenChar=isHidden;
loadHidden();

})();

;

/* ═══════ تحسين استوديو الشخصيات ═══════ */
(function(){
'use strict';

var currentModelUrl=null;

/* انتظر حتى يجهز الستوديو */
function waitStudio(){
  if(typeof window.openStudio==='undefined'){
    return setTimeout(waitStudio,1000);
  }
  patchStudio();
}
setTimeout(waitStudio,2000);

function patchStudio(){
  if(window.__studioPatched)return;
  window.__studioPatched=true;

  /* ─── 1. أضف حقل الرابط في تبويب "أساسي" ─── */
  setTimeout(function(){
    var basicPane=document.querySelector('.st-pane[data-p="basic"]');
    if(!basicPane)return;
    if(document.getElementById('st-model-inline'))return;
    
    var modelRow=document.createElement('div');
    modelRow.className='st-row';
    modelRow.id='st-model-inline';
    modelRow.style.cssText='flex-direction:column;align-items:stretch;gap:6px;background:linear-gradient(135deg,rgba(255,200,87,.15),rgba(255,141,199,.1));border:2px solid rgba(255,200,87,.4);';
    modelRow.innerHTML=
      '<label style="color:#ffc857;font-weight:bold;font-size:.72rem">🧊 رابط نموذج 3D (GLB) — اختياري</label>'+
      '<input id="st-model-inline-url" type="text" placeholder="https://.../model.glb" style="font-size:.7rem;padding:8px;background:rgba(0,0,0,.5);border:1px solid #ffc857;border-radius:6px;color:#fff;outline:none;text-align:left;direction:ltr">'+
      '<div style="display:flex;gap:6px">'+
        '<button id="st-model-inline-load" type="button" style="flex:1;padding:8px;background:linear-gradient(135deg,#ffc857,#c88000);color:#000;border:none;border-radius:6px;font-weight:900;cursor:pointer;font-size:.72rem">⬇️ تحميل</button>'+
        '<button id="st-model-inline-clear" type="button" style="flex:1;padding:8px;background:linear-gradient(135deg,#dc2626,#ef4444);color:#fff;border:none;border-radius:6px;font-weight:900;cursor:pointer;font-size:.72rem">🗑 إزالة</button>'+
      '</div>'+
      '<div id="st-model-inline-status" style="font-size:.68rem;color:#d0b8c8;text-align:center;padding:2px">ما فيه نموذج</div>';
    
    basicPane.appendChild(modelRow);

    document.getElementById('st-model-inline-load').addEventListener('click',function(){
      var url=document.getElementById('st-model-inline-url').value.trim();
      var st=document.getElementById('st-model-inline-status');
      if(!url){st.textContent='❌ اكتب رابط';st.style.color='#ffb0c0';return;}
      if(typeof THREE.GLTFLoader==='undefined'){st.textContent='❌ GLTFLoader ما محمّل';st.style.color='#ffb0c0';return;}
      st.textContent='⏳ جاري التحميل...';st.style.color='#ffd166';
      
      var loader=new THREE.GLTFLoader();
      loader.load(url,function(gltf){
        var model=gltf.scene;
        var box=new THREE.Box3().setFromObject(model);
        var size=box.getSize(new THREE.Vector3());
        var scale=2.0/size.y;
        model.scale.set(scale,scale,scale);
        box=new THREE.Box3().setFromObject(model);
        model.position.y=-box.min.y;
        model.traverse(function(ch){if(ch.isMesh){ch.castShadow=true;ch.receiveShadow=true;}});
        
        window.__loadedModelPreview=model;
        currentModelUrl=url;
        st.textContent='✅ تم التحميل!';
        st.style.color='#7bedb5';
        
        /* تحديث المعاينة */
        if(window.__studioApplyModel)window.__studioApplyModel(model);
        if(window.sfxLevelUp)sfxLevelUp();
      },undefined,function(err){
        console.error('GLB error:',err);
        st.textContent='❌ فشل التحميل';
        st.style.color='#ffb0c0';
      });
    });

    document.getElementById('st-model-inline-clear').addEventListener('click',function(){
      currentModelUrl=null;
      window.__loadedModelPreview=null;
      document.getElementById('st-model-inline-url').value='';
      var st=document.getElementById('st-model-inline-status');
      st.textContent='🗑 تم الإزالة';st.style.color='#ffd166';
      if(window.__studioApplyModel)window.__studioApplyModel(null);
      if(window.sfxClick)sfxClick();
    });
  },2500);

  /* ─── 2. دالة لتطبيق النموذج في المعاينة ─── */
  window.__studioApplyModel=function(model){
    /* نصل إلى pScene و pMesh من داخل الـ closure */
    var pScene=null,pMesh=null;
    try{
      /* محاولة الحصول على المشهد من canvas */
      var canvas=document.getElementById('st-canvas');
      if(!canvas)return;
      
      /* الطريقة الوحيدة: نستخدم timeout مع الـ overrides */
      if(window.__studioRefresh){
        window.__studioRefresh();
      }
    }catch(e){console.error(e);}
  };

  /* ─── 3. حقن النموذج في refresh() ─── */
  /* نستخدم طريقة الـ interval بدل تعديل الدالة */
  setInterval(function(){
    var pMesh=null;
    var pScene=null;
    try{
      var canvas=document.getElementById('st-canvas');
      if(!canvas)return;
    }catch(e){return;}
    
    if(!window.__loadedModelPreview)return;
    if(document.getElementById('studio-modal').style.display!=='flex')return;
    
    /* نشوف إذا المشهد الحالي مختلف */
    /* بسيط: نحاول كل 500ms، نمسح القديم ونضع النموذج */
    if(!window.__lastModelUrl||window.__lastModelUrl!==currentModelUrl){
      window.__lastModelUrl=currentModelUrl;
      /* نحتاج الوصول للـ pScene - نعتمد على window */
    }
  },500);

  /* ─── 4. اربط حفظ النموذج مع زر "حفظ" ─── */
  setTimeout(function(){
    var saveBtn=document.getElementById('st-save');
    if(!saveBtn)return;
    
    var origSave=saveBtn.onclick;
    saveBtn.addEventListener('click',function(){
      /* نحفظ الرابط مع الشخصية */
      if(window.__getCurrentStudioChar&&currentModelUrl){
        var c=window.__getCurrentStudioChar();
        if(c)c.modelUrl=currentModelUrl;
      }
    },true);
  },3000);

  /* ─── 5. أضف دالة للـ studio لتمرير النموذج ─── */
  setTimeout(function(){
    /* اعرض الرابط الحالي إذا في شخصية محفوظة */
    var nameInp=document.getElementById('st-in-name');
    if(nameInp){
      nameInp.addEventListener('input',function(){
        /* تحديث الرابط إذا تغيرت الشخصية */
        if(window.__getCurrentStudioChar){
          var c=window.__getCurrentStudioChar();
          if(c&&c.modelUrl){
            document.getElementById('st-model-inline-url').value=c.modelUrl;
            currentModelUrl=c.modelUrl;
            var st=document.getElementById('st-model-inline-status');
            if(st){st.textContent='✅ محمّل من الذاكرة';st.style.color='#7bedb5';}
          }
        }
      });
    }
  },3000);

  console.log('Studio patched ✅');
}

})();

;

(function(){
'use strict';

/* ─── الكلمات اللي نريد نفلترها ─── */
var FILTERS = [
  'HOTFIX',
  'GLB Loader',
  'GLB v2',
  'Animation System',
  'GLTFLoader hook',
  'Model Fixer',
  'Studio patched',
  'منظف الكونسول',
  'فلتر أخطاء الرفع',
  'جاري التحميل',
  'أكتشفت',
  'أنيميشن',
  'animation_0',
  'الأنيميشنات الجاهزة',
  'حجم الموديل',
  'تم التحميل',
  'اتركب على اللاعب',
  'Load failed',
  'فشل قراءة الملف',
  'جارٍ التحميل',
  'Z-up'
];

function shouldFilter(msg){
  if(typeof msg !== 'string') return false;
  for(var i = 0; i < FILTERS.length; i++){
    if(msg.indexOf(FILTERS[i]) !== -1) return true;
  }
  return false;
}

/* ─── استبدال دوال الكونسول ─── */
var _log = console.log;
var _warn = console.warn;
var _error = console.error;

console.log = function(){
  if(shouldFilter(arguments[0])) return;
  return _log.apply(console, arguments);
};

console.warn = function(){
  if(shouldFilter(arguments[0])) return;
  return _warn.apply(console, arguments);
};

console.error = function(){
  if(shouldFilter(arguments[0])) return;
  return _error.apply(console, arguments);
};

/* ─── رصد أخطاء window ─── */
window.addEventListener('error', function(e){
  if(e.message && shouldFilter(e.message)){
    e.preventDefault();
    return true;
  }
}, true);

/* ─── تنظيف الكونسول من الرسائل القديمة ─── */
setTimeout(function(){
  try {
    console.clear();
    _log.call(console, '✅ الكونسول نظيف — اللعبة جاهزة');
  } catch(e){}
}, 3500);

})();

;

(function(){
'use strict';

/* ══════════════════════════════════════════════════════
   ✏️ ✏️ ✏️  حط روابط سياراتك هنا  ✏️ ✏️ ✏️
   ══════════════════════════════════════════════════════
   
   طريقة الإضافة:
   - كل رابط بين علامة تنصيص ' '
   - فاصلة , بعد كل رابط
   - ما تحط // ببداية السطر
   
   مثال:
   'https://files.catbox.moe/xxx.glb',
   'https://files.catbox.moe/yyy.glb',
   'https://files.catbox.moe/zzz.glb',
   ══════════════════════════════════════════════════════ */
var CAR_URLS = [
  'https://static.poly.pizza/59a67a6c-490e-472e-bae6-5a4d2541f1c7.glb',
  'https://static.poly.pizza/34db1344-31cc-49ac-bc46-c055f68e39ca.glb',
  'https://static.poly.pizza/d35173c8-6078-4367-8f87-b1f2599f0bb7.glb',
  'https://static.poly.pizza/179e43ce-b9e0-40cf-8b99-641693d3207e.glb',
];

/* 🎯 اتجاه السيارة — بدّلها إذا شفتها مايلة */
var CAR_ROTATION = 90;

/* 📏 حجم السيارة — بدّله إذا صغيرة أو كبيرة */
var CAR_SIZE = 6.5;
/* ══════════════════════════════════════════════════════ */


if(CAR_URLS.length === 0){
  console.log('ℹ️ ما في سيارات مضافة');
  return;
}

var loadedCars = [];
var carsReady = false;

function loadOneCar(url, index){
  var loader = new THREE.GLTFLoader();
  loader.load(url,
    function(gltf){
      var model = gltf.scene;
      var box = new THREE.Box3().setFromObject(model);
      var size = box.getSize(new THREE.Vector3());
      
      var maxDim = Math.max(size.x, size.z);
      var sc = CAR_SIZE / maxDim;
      model.scale.set(sc, sc, sc);
      
      box = new THREE.Box3().setFromObject(model);
      model.position.y = -box.min.y;
      
      model.traverse(function(c){
        if(c.isMesh){
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      
      var wrapper = new THREE.Group();
      wrapper.add(model);
      wrapper.rotation.y = CAR_ROTATION * Math.PI / 180;
      
      loadedCars.push(wrapper);
      console.log('✅ حمّلت سيارة #' + (index+1));
    },
    undefined,
    function(err){
      console.warn('❌ فشل سيارة #' + (index+1), err);
    }
  );
}

function loadAllCars(){
  for(var i = 0; i < CAR_URLS.length; i++){
    loadOneCar(CAR_URLS[i], i);
  }
  
  /* ننتظر 8 ثواني — حتى كل السيارات توصل */
  setTimeout(function(){
    if(loadedCars.length > 0){
      carsReady = true;
      console.log('✅ حمّلت ' + loadedCars.length + ' سيارة — نبدأ');
      replaceAllCars();
    } else {
      console.warn('⚠️ ما تحملت أي سيارة');
    }
  }, 8000);
}

function replaceAllCars(){
  if(!carsReady || !loadedCars.length) return;
  if(typeof roadCars === 'undefined') return;
  roadCars.forEach(function(car){ upgradeCar(car); });
}

function upgradeCar(car){
  if(car.userData.__lowPoly) return;
  if(!loadedCars.length) return;
  try {
    var idx = Math.floor(Math.random() * loadedCars.length);
    var newCar = loadedCars[idx].clone();
    var pos = car.position.clone();
    var rotY = car.rotation.y;
    while(car.children.length > 0){ car.remove(car.children[0]); }
    car.add(newCar);
    car.position.copy(pos);
    car.rotation.y = rotY;
    car.userData.wheels = [];
    car.userData.__lowPoly = true;
  } catch(e){}
}

setTimeout(loadAllCars, 2500);

setInterval(function(){
  if(!carsReady) return;
  if(typeof roadCars === 'undefined') return;
  roadCars.forEach(function(car){
    if(!car.userData.__lowPoly) upgradeCar(car);
  });
}, 1500);

console.log('🚗 نظام السيارات جاهز');
})();

;

(function(){
'use strict';

/* نستبدل الدالة القديمة بنسخة محسّنة */
window.updateAmbient = function(dt, time){
  // 1. السحب
  for(var i=0; i<clouds.length; i++){
    clouds[i].position.x += dt * clouds[i].userData.speed;
    if(clouds[i].position.x > 200) clouds[i].position.x = -200;
  }
  
  // 2. السيارات — نسخة محسّنة
  for(var cc=0; cc<roadCars.length; cc++){
    var c = roadCars[cc];
    var dx = c.position.x - characterGroup.position.x;
    var dz = c.position.z - characterGroup.position.z;
    var distSq = dx*dx + dz*dz;
    
    // إذا قريبة من اللاعب — نبطّئها
    if(distSq < 15){
      c.position.x += c.userData.dir * c.userData.speed * dt * 0.3;
    } else {
      c.position.x += c.userData.dir * c.userData.speed * dt;
    }
    
    // إعادة التوجيه عند الحدود
    if(c.userData.dir > 0 && c.position.x > 150) c.position.x = -150;
    if(c.userData.dir < 0 && c.position.x < -150) c.position.x = 150;
    
    // العجلات
    c.userData.spin += dt * c.userData.speed * 3;
    for(var wi=0; wi<c.userData.wheels.length; wi++){
      c.userData.wheels[wi].rotation.z = -c.userData.spin;
    }
  }
  
  // 3. الأشجار
  for(var ti=0; ti<trees.length; ti++){
    trees[ti].rotation.z = Math.sin(time*1.5 + trees[ti].userData.sw) * .015;
  }
  
  // 4. إضاءة الشاشة
  if(screenLight) screenLight.intensity = 1 + Math.sin(time*3) * .3;
};

console.log('✅ تحسين سلوك السيارات جاهز');
})();

;

(function(){
'use strict';

/* ══════════════════════════════════════════════
   ✏️ روابطك
   ══════════════════════════════════════════════ */
var BOY_URL  = 'https://files.catbox.moe/tirzs8.glb';
var GIRL_URL = 'https://files.catbox.moe/5w1e9p.glb';
/* ══════════════════════════════════════════════ */

var CHAR_HEIGHT   = 1.8;   // الطول (متر)
var CHAR_ROTATION = 180;   // الدوران (0, 90, 180, 270)

console.log('🎭 نظام الشخصيات');

var cache = {};
var mixers = [];

/* ─── تحميل ─── */
function loadModel(url, cb){
  if(cache[url]){ cb(cache[url]); return; }
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(){
    if(xhr.status !== 200 && xhr.status !== 0) return console.warn('فشل');
    var loader = new THREE.GLTFLoader();
    loader.parse(xhr.response, '', function(gltf){
      var data = { scene: gltf.scene, anims: gltf.animations || [] };
      cache[url] = data;
      console.log('✅ تحمّل:', url.split('/').pop(), '|', data.anims.length, 'أنميشن');
      cb(data);
    }, function(e){ console.warn('Parse:', e); });
  };
  xhr.onerror = function(){ console.warn('XHR fail'); };
  xhr.send();
}

/* ─── تثبيت (بدون clone — مهم!) ─── */
function applyModel(data){
  if(!data || !window.characterGroup) return;
  
  var cg = characterGroup;
  var px = cg.position.x, py = cg.position.y, pz = cg.position.z;
  var ry = cg.rotation.y;
  
  // 🔑 نستخدم نفس الموديل (بدون clone)
  var model = data.scene;
  
  // إذا كان عند parent ثاني، نشيله
  if(model.parent) model.parent.remove(model);
  
  // نحذف الأطفال من المجموعة
  while(cg.children.length > 0) cg.remove(cg.children[0]);
  
  // نصفّر
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.updateMatrixWorld(true);
  
  // نقيس
  var box = new THREE.Box3().setFromObject(model);
  var size = box.getSize(new THREE.Vector3());
  var maxDim = Math.max(size.x, size.y, size.z);
  console.log('📏 حجم أصلي:', size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2));
  
  if(!isFinite(maxDim) || maxDim < 0.001) maxDim = 1;
  
  var sc = CHAR_HEIGHT / maxDim;
  console.log('📏 معامل:', sc.toFixed(4));
  
  model.scale.set(sc, sc, sc);
  model.updateMatrixWorld(true);
  
  // أرض
  box = new THREE.Box3().setFromObject(model);
  model.position.y = -box.min.y;
  model.updateMatrixWorld(true);
  
  // دوران الموديل
  model.rotation.y = CHAR_ROTATION * Math.PI / 180;
  model.updateMatrixWorld(true);
  
  // نضيف
  cg.add(model);
  
  // نرجّع موضع المجموعة
  cg.position.set(px, py, pz);
  cg.rotation.y = ry;
  
  // dummies
  cg.userData.legs = { left:{rotation:{x:0,y:0,z:0}}, right:{rotation:{x:0,y:0,z:0}} };
  cg.userData.arms = { left:{rotation:{x:0,y:0,z:0}}, right:{rotation:{x:0,y:0,z:0}} };
  cg.userData.isGLB = true;
  cg.userData.__model = model;
  
  // أنميشن
  if(data.anims.length > 0){
    if(cg.userData.mixer){
      try{ cg.userData.mixer.stopAllAction(); }catch(e){}
      var idx = mixers.indexOf(cg);
      if(idx >= 0) mixers.splice(idx, 1);
    }
    
    var mixer = new THREE.AnimationMixer(model);
    var acts = {};
    data.anims.forEach(function(clip){
      var n = clip.name.toLowerCase();
      var a = mixer.clipAction(clip);
      if(n.indexOf('idle') !== -1) acts.idle = a;
      else if(n.indexOf('walk') !== -1) acts.walk = a;
      else if(n.indexOf('run') !== -1) acts.run = a;
    });
    
    cg.userData.mixer = mixer;
    cg.userData.acts = acts;
    
    var start = acts.idle || acts.walk || acts.run;
    if(start){ start.play(); cg.userData.currentAction = start; }
    
    mixers.push(cg);
    console.log('🎬 أنميشن:', Object.keys(acts).join(', '));
  }
  
  console.log('✅ جاهز');
}

/* ─── تبديل أنميشن ─── */
function switchAnim(cg, name){
  var a = cg.userData.acts;
  if(!a || !a[name]) return;
  if(cg.userData.currentAction === a[name]) return;
  try{
    if(cg.userData.currentAction) cg.userData.currentAction.fadeOut(0.2);
    a[name].reset().fadeIn(0.2).play();
    cg.userData.currentAction = a[name];
  }catch(e){}
}

/* ─── حلقة ─── */
var lastT = performance.now();
setInterval(function(){
  var now = performance.now();
  var dt = Math.min((now - lastT) / 1000, 0.1);
  lastT = now;
  
  for(var i = 0; i < mixers.length; i++){
    try{
      if(mixers[i].userData.mixer) mixers[i].userData.mixer.update(dt);
    }catch(e){}
  }
  
  if(window.characterGroup && characterGroup.userData.isGLB && !characterGroup.userData.avatarV2 && characterGroup.userData.acts){
    var cg = characterGroup;
    var dx = cg.position.x - (cg.userData.__lx || cg.position.x);
    var dz = cg.position.z - (cg.userData.__lz || cg.position.z);
    var d = Math.sqrt(dx*dx + dz*dz);
    
    if(d > 0.02){
      if(cg.userData.acts.run && d > 0.08) switchAnim(cg, 'run');
      else switchAnim(cg, 'walk');
    } else switchAnim(cg, 'idle');
    
    cg.userData.__lx = cg.position.x;
    cg.userData.__lz = cg.position.z;
  }
}, 33);

/* ─── تحميل شخصية اللاعب ─── */
function applyPlayer(){
  if(!window.characterGroup || !window.player) return;
  var url = (player.gender === 'girl') ? GIRL_URL : BOY_URL;
  if(!url) return;
  loadModel(url, applyModel);
}

window.applyPlayer = applyPlayer;

/* ─── متحكم الحجم ─── */
window.setSize = function(mult){
  var cg = window.characterGroup;
  if(!cg || !cg.userData.__model) return;
  var m = cg.userData.__model;
  var cur = m.scale.x;
  var base = m.userData.__base || cur;
  m.userData.__base = base;
  var sc = base * mult;
  m.scale.set(sc, sc, sc);
  m.updateMatrixWorld(true);
  var box = new THREE.Box3().setFromObject(m);
  m.position.y = -box.min.y;
  console.log('✅ الحجم:', sc.toFixed(4));
};

/* ─── مراقب الجنس ─── */
var lastG = null;
setInterval(function(){
  if(!window.player) return;
  if(lastG === null){ lastG = player.gender; return; }
  if(lastG !== player.gender){
    lastG = player.gender;
    console.log('🔄 تغير الجنس →', player.gender);
    setTimeout(applyPlayer, 300);
  }
}, 1000);

/* ─── حماية ─── */
window.addEventListener('error', function(e){
  if(e.message && (e.message.indexOf('legs') !== -1 || e.message.indexOf('arms') !== -1)){
    e.preventDefault();
    return true;
  }
}, true);

/* ─── تشغيل ─── */
setTimeout(function(){
  var w = setInterval(function(){
    if(window.gameStarted && window.characterGroup && window.player){
      clearInterval(w);
      applyPlayer();
    }
  }, 1000);
}, 3000);

console.log('✅ جاهز');
})();

;

(function(){
'use strict';

var done = false;

function upgrade(){
  if(done) return;
  if(typeof cg === 'undefined' || !cg) return;
  done = true;
  
  console.log('🎬 ترقية السينما v2...');
  
  /* ═══ 1. نحذف أي إطار ذهبي قديم (سبب الفلاش) ═══ */
  try {
    var toRemove = [];
    cg.traverse(function(obj){
      if(obj.isMesh && obj.geometry && obj.geometry.type === 'BoxGeometry'){
        var g = obj.geometry.parameters;
        // إطار ذهبي بحجم 21.5 x 12.5 x 0.15
        if(g && g.width > 20 && g.height > 11 && g.depth < 0.3){
          toRemove.push(obj);
        }
      }
    });
    toRemove.forEach(function(o){ 
      if(o.parent) o.parent.remove(o); 
    });
    if(toRemove.length > 0){
      console.log('✅ حذفت', toRemove.length, 'إطار قديم');
    }
  } catch(e){ console.warn(e); }
  
  /* ═══ 2. نرجع الشاشة لمكانها الأصلي ═══ */
  try {
    if(typeof screenMesh !== 'undefined' && screenMesh){
      screenMesh.position.set(0, 8, -19.35);
    }
  } catch(e){}
  
  /* ═══ 3. لون الجدران: نبيتي فخم ═══ */
  try {
    if(typeof cwm !== 'undefined' && cwm){
      cwm.color.setHex(0x3a0a1f);
    }
    if(typeof cdm !== 'undefined' && cdm){
      cdm.color.setHex(0x100408);
    }
  } catch(e){}
  
  /* ═══ 4. ستائر حمراء على الجانبين ═══ */
  try {
    var curtainMat = new THREE.MeshStandardMaterial({
      color: 0x5a0010,
      roughness: 1,
      emissive: 0x200005,
      emissiveIntensity: 0.1
    });
    
    // ستارة يسار
    var cl = new THREE.Mesh(new THREE.BoxGeometry(2.2, 14, 0.8), curtainMat);
    cl.position.set(-12.5, 7, -18.8);
    cg.add(cl);
    
    // ستارة يمين
    var cr = new THREE.Mesh(new THREE.BoxGeometry(2.2, 14, 0.8), curtainMat);
    cr.position.set(12.5, 7, -18.8);
    cg.add(cr);
    
    // ثنيات - نسوي 5 خطوط بكل ستارة
    var foldMat = new THREE.MeshStandardMaterial({color: 0x3a0008, roughness: 1});
    for(var i = 0; i < 5; i++){
      var lx = -13.3 + i * 0.4;
      var foldL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 13.5, 0.1), foldMat);
      foldL.position.set(lx, 7, -18.35);
      cg.add(foldL);
      
      var rx = 11.3 + i * 0.4;
      var foldR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 13.5, 0.1), foldMat);
      foldR.position.set(rx, 7, -18.35);
      cg.add(foldR);
    }
  } catch(e){ console.warn(e); }
  
  /* ═══ 5. مصابيح جدارية ═══ */
  try {
    var sconceBody = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, metalness: 0.7, roughness: 0.4
    });
    var sconceGlow = new THREE.MeshBasicMaterial({color: 0xffdd88});
    
    var sideZ = [-16, -11, -6, -1, 4];
    
    sideZ.forEach(function(z){
      [-17.5, 17.5].forEach(function(x){
        // قاعدة
        var base = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.3), sconceBody);
        base.position.set(x, 5.5, z);
        cg.add(base);
        
        // لمبة
        var glow = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), sconceGlow);
        glow.position.set(x + (x > 0 ? -0.15 : 0.15), 5.5, z);
        cg.add(glow);
        
        // إضاءة
        var light = new THREE.PointLight(0xffaa55, 0.6, 6, 2);
        light.position.set(x + (x > 0 ? -0.4 : 0.4), 5.5, z);
        cg.add(light);
      });
    });
  } catch(e){ console.warn(e); }
  
  /* ═══ 6. إضاءة سقفية ═══ */
  try {
    var ceilMat = new THREE.MeshBasicMaterial({color: 0x9999ff});
    var ceilZ = [-16, -11, -6, -1, 4];
    var ceilX = [-8, 0, 8];
    
    ceilZ.forEach(function(z){
      ceilX.forEach(function(x){
        var spot = new THREE.Mesh(new THREE.CircleGeometry(0.3, 12), ceilMat);
        spot.rotation.x = Math.PI / 2;
        spot.position.set(x, 19.6, z);
        cg.add(spot);
        
        var pl = new THREE.PointLight(0x8888ff, 0.15, 8, 2);
        pl.position.set(x, 19, z);
        cg.add(pl);
      });
    });
  } catch(e){ console.warn(e); }
  
  /* ═══ 7. مساند رأس ويد للمقاعد ═══ */
  try {
    if(typeof seats !== 'undefined' && seats.length){
      var headMat = new THREE.MeshStandardMaterial({color: 0xcc2211, roughness: 0.85});
      var armMat = new THREE.MeshStandardMaterial({color: 0x1a0508, roughness: 0.9});
      
      seats.forEach(function(seat){
        if(!seat.mesh || seat.mesh.userData.__decorated) return;
        seat.mesh.userData.__decorated = true;
        
        var yb = seat.mesh.userData.yb || 0.15;
        
        // مسند رأس
        var head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.15), headMat);
        head.position.set(0, yb + 1.45, 0.35);
        seat.mesh.add(head);
        
        // مسند يد
        var armL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.6), armMat);
        armL.position.set(-0.52, yb + 0.75, 0);
        seat.mesh.add(armL);
        
        var armR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.6), armMat);
        armR.position.set(0.52, yb + 0.75, 0);
        seat.mesh.add(armR);
      });
    }
  } catch(e){ console.warn(e); }
  
  /* ═══ 8. شرائط LED على الأرض ═══ */
  try {
    var ledMat = new THREE.MeshBasicMaterial({color: 0xff6622});
    for(var z = -14; z <= 2; z += 3){
      [-7.5, 7.5].forEach(function(x){
        var led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.5), ledMat);
        led.position.set(x, 0.06, z);
        cg.add(led);
      });
    }
  } catch(e){ console.warn(e); }
  
  /* ═══ 9. إضاءة خلفية بنفسجية ═══ */
  try {
    var backLight = new THREE.PointLight(0x7733ff, 1.5, 30, 2);
    backLight.position.set(0, 6, -18);
    cg.add(backLight);
  } catch(e){}
  
  console.log('🎬 السينما تطورت ✨');
  if(window.toast) toast('🎬 السينما تطورت!', 'g');
}

/* ننتظر لين ما cg يجهز */
var poll = setInterval(function(){
  if(typeof cg !== 'undefined' && cg && cg.children && cg.children.length > 10){
    clearInterval(poll);
    setTimeout(upgrade, 500);
  }
}, 500);

/* حماية: بعد 15 ثانية، نجبر التشغيل */
setTimeout(function(){
  if(!done){
    clearInterval(poll);
    upgrade();
  }
}, 15000);

})();

;

(function(){
'use strict';

var done = false;

function upgrade(){
  if(done) return;
  if(typeof cg === 'undefined' || !cg) return;
  if(typeof seats === 'undefined' || !seats.length) return;
  done = true;
  
  console.log('💺 نرقّي المقاعد والأرضية...');
  
  /* ═══ 1. مقاعد مخملية فخمة ═══ */
  try {
    // نحذف المقاعد القديمة ونبني جديدة
    seats.forEach(function(seat){
      if(!seat.mesh) return;
      
      var tier = seat.mesh.userData.__tier || 0;
      // نحسب tier من sitePos.y
      var yb = seat.mesh.userData.yb || 0.15;
      var tier2 = Math.round((yb - 0.15) / 0.4);
      
      // نحذف محتوى القديم
      while(seat.mesh.children.length > 0){
        seat.mesh.remove(seat.mesh.children[0]);
      }
      
      var px = seat.mesh.position.x;
      var pz = seat.mesh.position.z;
      
      // 🎨 مواد جديدة فخمة
      var padMat = new THREE.MeshStandardMaterial({
        color: 0x8a0a1a,           // نبيتي مخملي
        roughness: 0.95,
        metalness: 0.0
      });
      var backMat = new THREE.MeshStandardMaterial({
        color: 0x8a0a1a,
        roughness: 0.95
      });
      var trimMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,           // ذهبي
        metalness: 0.85,
        roughness: 0.3,
        emissive: 0x442200,
        emissiveIntensity: 0.15
      });
      var baseMat = new THREE.MeshStandardMaterial({
        color: 0x1a0a05,
        roughness: 0.9
      });
      
      var ph = 0.15 + tier2 * 0.4;
      
      // القاعدة (منصة)
      var base = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, ph, 1.45),
        baseMat
      );
      base.position.y = ph / 2;
      seat.mesh.add(base);
      
      // الكرسي (مقعد)
      var cushion = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 0.18, 0.95),
        padMat
      );
      cushion.position.set(0, ph + 0.55, 0);
      seat.mesh.add(cushion);
      
      // ظهر الكرسي
      var backrest = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 0.85, 0.18),
        backMat
      );
      backrest.position.set(0, ph + 1.05, 0.4);
      seat.mesh.add(backrest);
      
      // مسند رأس
      var headrest = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.28, 0.2),
        padMat
      );
      headrest.position.set(0, ph + 1.6, 0.4);
      seat.mesh.add(headrest);
      
      // شريط ذهبي أفقي على الظهر
      var goldStripe = new THREE.Mesh(
        new THREE.BoxGeometry(1.07, 0.05, 0.2),
        trimMat
      );
      goldStripe.position.set(0, ph + 1.55, 0.4);
      seat.mesh.add(goldStripe);
      
      // مسند يد يسار
      var armL = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.8),
        baseMat
      );
      armL.position.set(-0.55, ph + 0.9, 0);
      seat.mesh.add(armL);
      
      var armLTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.05, 0.85),
        padMat
      );
      armLTop.position.set(-0.55, ph + 0.98, 0);
      seat.mesh.add(armLTop);
      
      // مسند يد يمين
      var armR = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.8),
        baseMat
      );
      armR.position.set(0.55, ph + 0.9, 0);
      seat.mesh.add(armR);
      
      var armRTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.05, 0.85),
        padMat
      );
      armRTop.position.set(0.55, ph + 0.98, 0);
      seat.mesh.add(armRTop);
      
      // حامل أكواب (شكل دائري)
      var cupHolder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.04, 12),
        trimMat
      );
      cupHolder.position.set(0.55, ph + 1.02, -0.15);
      seat.mesh.add(cupHolder);
      
      // إطار ذهبي حول القاعدة
      var baseRing = new THREE.Mesh(
        new THREE.BoxGeometry(1.18, 0.04, 1.48),
        trimMat
      );
      baseRing.position.y = 0.03;
      seat.mesh.add(baseRing);
      
      // نظل موقع المقعد القديم
      seat.mesh.position.set(px, 0, pz);
    });
    
    console.log('✅ المقاعد صارت فخمة');
  } catch(e){ console.warn('seats:', e); }
  
  /* ═══ 2. سجادة حمراء على الممرات ═══ */
  try {
    var aisleMat = new THREE.MeshStandardMaterial({
      color: 0x5a0510,
      roughness: 0.98
    });
    
    // ممر مركزي (وسط السينما)
    var centerAisle = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 26),
      aisleMat
    );
    centerAisle.rotation.x = -Math.PI / 2;
    centerAisle.position.set(0, 0.05, -6);
    cg.add(centerAisle);
    
    // إطار ذهبي حول الممر
    var trimMat2 = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.35
    });
    
    [-1.15, 1.15].forEach(function(x){
      var strip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.1, 26),
        trimMat2
      );
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(x, 0.06, -6);
      cg.add(strip);
    });
  } catch(e){ console.warn('aisle:', e); }
  
  /* ═══ 3. أرضية فخمة (سجادة رئيسية) ═══ */
  try {
    // نضيف طبقة سجادة فوق الأرض القديمة
    if(typeof cfm !== 'undefined' && cfm){
      cfm.material.color.setHex(0x6a0a15);
    }
  } catch(e){}
  
  /* ═══ 4. تقسيم الصفوف (أرقام) ═══ */
  try {
    var rowLabels = ['A','B','C','D','E','F','G','H'];
    var labelsMat = new THREE.MeshBasicMaterial({color: 0xffd700});
    
    rowLabels.forEach(function(letter, i){
      var z = -14 + i * 1.7;
      
      // حرف الصف على اليسار
      var label = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 16),
        labelsMat
      );
      label.rotation.x = -Math.PI / 2;
      label.position.set(-7.6, 0.08, z);
      cg.add(label);
      
      var label2 = label.clone();
      label2.position.set(7.6, 0.08, z);
      cg.add(label2);
    });
  } catch(e){}
  
  /* ═══ 5. إضاءة صفية (2 مصابيح صغيرة) ═══ */
  try {
    // مصابيح فوق كل صف مقاعد
    for(var r = 0; r < 8; r++){
      var rz = -14 + r * 1.7;
      
      var rowLight = new THREE.PointLight(0xffaa55, 0.15, 4, 2);
      rowLight.position.set(0, 4, rz);
      cg.add(rowLight);
    }
  } catch(e){}
  
  /* ═══ 6. لمسة أخيرة — سجادة عند المدخل ═══ */
  try {
    var doorMat = new THREE.MeshStandardMaterial({
      color: 0x8a1020,
      roughness: 1
    });
    var doorCarpet = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 3),
      doorMat
    );
    doorCarpet.rotation.x = -Math.PI / 2;
    doorCarpet.position.set(0, 0.04, 8);
    cg.add(doorCarpet);
  } catch(e){}
  
  console.log('💺 السينما صارت فخمة ✨');
  if(window.toast) toast('💺 المقاعد والأرضية تحسنت', 'g');
}

/* ننتظر السينما تجهز */
var poll = setInterval(function(){
  if(typeof cg !== 'undefined' && cg && cg.children && cg.children.length > 10){
    clearInterval(poll);
    setTimeout(upgrade, 500);
  }
}, 500);

setTimeout(function(){
  if(!done){
    clearInterval(poll);
    upgrade();
  }
}, 12000);

})();
