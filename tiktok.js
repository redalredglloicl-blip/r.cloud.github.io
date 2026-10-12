// TikTok - realistic vertical video app - Update 9.97
(function(){
if(window._ttLoaded)return;window._ttLoaded=true;
try{document.title='Update 9.97';var vt=document.getElementById('verTag');if(vt)vt.textContent='Update 9.97';}catch(e){}

// My account (neutral, verified)
const ME={u:'rio.creator',n:'Rio Creator',verified:true,following:'1,284',followers:'2.4M',likes:'48.2M',bio:'صانع محتوى 🎬 | يوميات وأفكار',av:'linear-gradient(135deg,#fe2c55,#25f4ee)'};

// TikTok feed data - creators with videos
const TT_FEED=[
{id:'aqz-KE-bpKQ',u:'blender.studio',n:'Blender Studio',v:true,cap:'أرنب عملاق ينتقم بطريقته الخاصة 🐰🔥 #فيلم_قصير #أنيميشن',music:'الصوت الأصلي - blender.studio',likes:'1.2M',comments:'8,432',shares:'45.1K',avc:'#ff6b6b'},
{id:'jfKfPfyJRdk',u:'lofigirl',n:'Lofi Girl',v:true,cap:'موسيقى هادئة للمذاكرة والاسترخاء 🎧 #lofi #موسيقى',music:'lofi hip hop radio 📚 beats to relax',likes:'856K',comments:'12.1K',shares:'23.4K',avc:'#4ecdc4'},
{id:'dQw4w9WgXcQ',u:'rickastley',n:'Rick Astley',v:true,cap:'Never gonna give you up! 🕺 #كلاسيك #ثمانينات',music:'Never Gonna Give You Up - Rick Astley',likes:'2.1M',comments:'45K',shares:'189K',avc:'#45b7d1'},
{id:'kJQP7kiw5Fk',u:'luisfonsi',n:'Luis Fonsi',v:true,cap:'Despacito 🌎🎶 #موسيقى #لاتين',music:'Despacito ft. Daddy Yankee',likes:'3.4M',comments:'67K',shares:'234K',avc:'#f9ca24'},
{id:'JGwWNGJdvx8',u:'edsheeran',n:'Ed Sheeran',v:true,cap:'Shape of you ❤️ #موسيقى',music:'Shape of You - Ed Sheeran',likes:'2.8M',comments:'34K',shares:'156K',avc:'#6c5ce7'},
{id:'60ItHLz5WEA',u:'alanwalker',n:'Alan Walker',v:true,cap:'Faded... where are you now? 🎭 #موسيقى_إلكترونية',music:'Faded - Alan Walker',likes:'1.9M',comments:'28K',shares:'98K',avc:'#a29bfe'},
{id:'9bZkp7q19f0',u:'psy.oppa',n:'PSY',v:true,cap:'GANGNAM STYLE! 🐴 #كبوب #رقص',music:'GANGNAM STYLE - PSY',likes:'4.2M',comments:'89K',shares:'312K',avc:'#fd79a8'},
{id:'RgKAFK5djSk',u:'wizkhalifa',n:'Wiz Khalifa',v:true,cap:'See you again 🕊️ #ذكريات',music:'See You Again ft. Charlie Puth',likes:'2.3M',comments:'41K',shares:'178K',avc:'#00b894'},
{id:'MmB9b5njVbA',u:'minecraft',n:'Minecraft',v:true,cap:'عالم لا نهائي من المكعبات ⛏️ #ألعاب #minecraft',music:'الصوت الأصلي - minecraft',likes:'987K',comments:'15K',shares:'67K',avc:'#55a630'},
{id:'CevxZvSJLk8',u:'katyperry',n:'Katy Perry',v:true,cap:'Roar! 🦁 #موسيقى #بوب',music:'Roar - Katy Perry',likes:'1.7M',comments:'22K',shares:'89K',avc:'#e17055'},
];

const TT_COMMENTS=[
{n:'أحمد',t:'فيديو رهيب! 🔥',l:'12.4K',avc:'#ff6b6b'},
{n:'سارة',t:'أول مرة أشوف هيج شي، إبداع',l:'8.1K',avc:'#4ecdc4'},
{n:'محمد',t:'مين جاي من الاكسبلور؟ 👋',l:'5.6K',avc:'#45b7d1'},
{n:'فاطمة',t:'حفظته عندي، أرجع له بعدين ❤️',l:'3.2K',avc:'#f9ca24'},
{n:'علي',t:'الجودة خيالية ما شاء الله',l:'2.8K',avc:'#6c5ce7'},
{n:'نور',t:'ضحكني المقطع 😂😂',l:'1.9K',avc:'#fd79a8'},
];

let ttIdx=0, ttLiked={};
const vBadge='<svg width="14" height="14" viewBox="0 0 24 24" fill="#20d5ec"><path d="M12 2l2.4 2.4 3.4-.5.9 3.3 3.3.9-.5 3.4L23 12l-2.4 2.4.5 3.4-3.3.9-.9 3.3-3.4-.5L12 23l-2.4-2.4-3.4.5-.9-3.3-3.3-.9.5-3.4L1 12l2.4-2.4-.5-3.4 3.3-.9.9-3.3 3.4.5z"/><path d="M10.6 14.6l-2.1-2.1-1.4 1.4 3.5 3.5 7-7-1.4-1.4z" fill="#fff"/></svg>';

function ttHeartSVG(filled){
return '<svg width="32" height="32" viewBox="0 0 24 24" fill="'+(filled?'#fe2c55':'#fff')+'"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
}
function ttCommentSVG(){
return '<svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
}
function ttShareSVG(){
return '<svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"/></svg>';
}

function ttVideoHTML(v,idx){
const liked=ttLiked[idx];
return '<div class="tt-slide" data-idx="'+idx+'" style="position:absolute;inset:0;background:#000">'
+'<iframe src="https://www.youtube.com/embed/'+v.id+'?autoplay='+(idx===0?'1':'0')+'&mute=1&loop=1&playlist='+v.id+'&controls=0&rel=0&playsinline=1" style="position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;object-fit:cover;transform:scale(1.35)" allow="autoplay;encrypted-media" allowfullscreen></iframe>'
+'<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 30%,transparent 70%,rgba(0,0,0,.35) 100%);pointer-events:none"></div>'
// Right action bar
+'<div style="position:absolute;right:8px;bottom:110px;display:flex;flex-direction:column;align-items:center;gap:18px;z-index:5">'
+'<div style="position:relative"><div style="width:48px;height:48px;border-radius:50%;background:'+v.avc+';border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px">'+v.n[0]+'</div><div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:20px;height:20px;border-radius:50%;background:#fe2c55;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:700">+</div></div>'
+'<div style="text-align:center" data-like="'+idx+'"><div>'+ttHeartSVG(liked)+'</div><div style="color:#fff;font-size:12px;font-weight:600">'+v.likes+'</div></div>'
+'<div style="text-align:center" data-comments="'+idx+'"><div>'+ttCommentSVG()+'</div><div style="color:#fff;font-size:12px;font-weight:600">'+v.comments+'</div></div>'
+'<div style="text-align:center"><div>'+ttShareSVG()+'</div><div style="color:#fff;font-size:12px;font-weight:600">'+v.shares+'</div></div>'
+'<div class="tt-disc" style="width:44px;height:44px;border-radius:50%;background:conic-gradient(#333,#666,#333,#666,#333);border:8px solid #222;display:flex;align-items:center;justify-content:center;animation:ttspin 4s linear infinite"><div style="width:16px;height:16px;border-radius:50%;background:'+v.avc+'"></div></div>'
+'</div>'
// Bottom info
+'<div style="position:absolute;left:12px;right:76px;bottom:104px;z-index:5">'
+'<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><b style="color:#fff;font-size:17px">@'+v.u+'</b>'+(v.v?vBadge:'')+'</div>'
+'<p style="color:#fff;font-size:14px;line-height:1.5;margin-bottom:10px">'+v.cap+'</p>'
+'<div style="display:flex;align-items:center;gap:8px"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg><div style="overflow:hidden;flex:1"><div style="color:#fff;font-size:13px;white-space:nowrap;animation:ttmarquee 8s linear infinite">'+v.music+' ♪ '+v.music+'</div></div></div>'
+'</div>'
// Double-tap heart overlay
+'<div class="tt-bigheart" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;z-index:6"><svg width="110" height="110" viewBox="0 0 24 24" fill="#fe2c55" style="filter:drop-shadow(0 4px 20px rgba(254,44,85,.6))"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>'
+'<style>@keyframes ttspin{to{transform:rotate(360deg)}}@keyframes ttmarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>'
+'</div>';
}

function ttShowComments(){
const el=$('#appBody');
const sheet=document.createElement('div');
sheet.id='ttSheet';
sheet.innerHTML='<div style="position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:40" id="ttSheetBg"></div>'
+'<div style="position:absolute;left:0;right:0;bottom:0;height:65%;background:#fff;border-radius:16px 16px 0 0;z-index:41;display:flex;flex-direction:column;animation:ttup .3s ease">'
+'<div style="padding:12px;text-align:center;border-bottom:1px solid #eee"><b style="font-size:14px">'+TT_COMMENTS.length+' تعليق</b></div>'
+'<div style="flex:1;overflow-y:auto;padding:12px">'
+TT_COMMENTS.map(c=>'<div style="display:flex;gap:10px;margin-bottom:16px"><div style="width:40px;height:40px;border-radius:50%;background:'+c.avc+';flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">'+c.n[0]+'</div><div style="flex:1"><b style="font-size:13px">'+c.n+'</b><p style="font-size:14px;margin:4px 0">'+c.t+'</p><span style="font-size:12px;color:#888">قبل ساعتين · رد</span></div><div style="text-align:center;color:#888"><svg width="18" height="18" viewBox="0 0 24 24" fill="#ccc"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><div style="font-size:11px">'+c.l+'</div></div></div>').join('')
+'</div>'
+'<div style="padding:10px 12px;border-top:1px solid #eee;display:flex;gap:8px;align-items:center"><div style="width:36px;height:36px;border-radius:50%;background:'+ME.av+';flex-shrink:0"></div><input placeholder="أضف تعليقاً..." style="flex:1;background:#f1f1f2;border:0;border-radius:20px;padding:10px 14px;font-size:14px"></div>'
+'</div><style>@keyframes ttup{from{transform:translateY(100%)}to{transform:translateY(0)}}</style>';
el.appendChild(sheet);
$('#ttSheetBg').addEventListener('click',()=>sheet.remove());
}

function ttShowProfile(){
const el=$('#appBody');
el.innerHTML='<div style="position:absolute;inset:0;background:#fff;overflow-y:auto;z-index:30">'
+'<div style="padding:50px 16px 16px;text-align:center">'
+'<div style="width:96px;height:96px;border-radius:50%;background:'+ME.av+';margin:0 auto 12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:36px;font-weight:700">R</div>'
+'<div style="display:flex;align-items:center;justify-content:center;gap:6px"><b style="font-size:18px">@'+ME.u+'</b>'+vBadge+'</div>'
+'<div style="display:flex;justify-content:center;gap:24px;margin:16px 0">'
+'<div style="text-align:center"><b style="font-size:17px">'+ME.following+'</b><div style="font-size:13px;color:#666">أتابع</div></div>'
+'<div style="text-align:center"><b style="font-size:17px">'+ME.followers+'</b><div style="font-size:13px;color:#666">متابِع</div></div>'
+'<div style="text-align:center"><b style="font-size:17px">'+ME.likes+'</b><div style="font-size:13px;color:#666">إعجاب</div></div>'
+'</div>'
+'<div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px"><button style="flex:1;max-width:160px;padding:10px;background:#fe2c55;color:#fff;border:0;border-radius:4px;font-weight:600;font-size:15px">تعديل الملف</button><button style="padding:10px 14px;background:#f1f1f2;border:0;border-radius:4px">📤</button></div>'
+'<p style="font-size:14px;color:#333">'+ME.bio+'</p>'
+'</div>'
+'<div style="display:flex;border-bottom:1px solid #eee"><div style="flex:1;text-align:center;padding:12px;border-bottom:2px solid #000"><svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M4 4h16v16H4z" opacity=".3"/><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg></div><div style="flex:1;text-align:center;padding:12px;opacity:.4"><svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div></div>'
+'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#eee">'
+TT_FEED.slice(0,6).map((v,i)=>'<div style="position:relative;aspect-ratio:3/4;background:#000"><img src="https://i.ytimg.com/vi/'+v.id+'/mqdefault.jpg" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;bottom:6px;left:6px;color:#fff;font-size:12px;display:flex;align-items:center;gap:4px"><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>'+v.likes+'</div></div>').join('')
+'</div>'
+'<div style="height:90px"></div>'
+'</div>'
+ttNavHTML('me');
ttBindNav();
}

function ttNavHTML(active){
const item=(id,svg,label)=>'<div data-ttnav="'+id+'" style="flex:1;text-align:center;color:'+(active===id?'#000':'#888')+'">'+svg+'<div style="font-size:10px;margin-top:2px">'+label+'</div></div>';
return '<div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #eee;display:flex;padding:8px 0 calc(8px + env(safe-area-inset-bottom));z-index:35">'
+item('home','<svg width="26" height="26" viewBox="0 0 24 24" fill="'+(active==='home'?'#000':'none')+'" stroke="'+(active==='home'?'#000':'#888')+'" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>','الرئيسية')
+item('discover','<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+(active==='discover'?'#000':'#888')+'" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>','اكتشف')
+'<div style="flex:1;text-align:center"><div style="width:48px;height:32px;background:#000;border-radius:8px;margin:0 auto;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;position:relative"><span style="position:absolute;left:6px;color:#25f4ee">+</span><span style="position:absolute;right:6px;color:#fe2c55">+</span><span style="z-index:1">+</span></div></div>'
+item('inbox','<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+(active==='inbox'?'#000':'#888')+'" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>','البريد')
+item('me','<div style="width:26px;height:26px;border-radius:50%;background:'+ME.av+';margin:0 auto;border:'+(active==='me'?'2px solid #000':'0')+'"></div>','أنا')
+'</div>';
}

function ttBindNav(){
document.querySelectorAll('[data-ttnav]').forEach(b=>b.addEventListener('click',()=>{
const t=b.dataset.ttnav;
if(t==='home')appTikTokReal();
else if(t==='me')ttShowProfile();
else toast('قريباً');
}));
}

function ttRenderFeed(){
const el=$('#appBody');
el.innerHTML='<div id="ttFeed" style="position:absolute;inset:0;background:#000;overflow:hidden">'
+'<div id="ttSlides" style="position:absolute;inset:0;transition:transform .35s cubic-bezier(.32,.72,.24,1)">'
+TT_FEED.map((v,i)=>ttVideoHTML(v,i)).join('')
+'</div>'
// Top tabs
+'<div style="position:absolute;top:44px;left:0;right:0;display:flex;justify-content:center;gap:20px;z-index:10">'
+'<span style="color:rgba(255,255,255,.7);font-size:16px;font-weight:600">أتابَع</span>'
+'<span style="color:#fff;font-size:16px;font-weight:700;border-bottom:2px solid #fff;padding-bottom:4px">من أجلك</span>'
+'</div>'
+'<div style="position:absolute;top:44px;right:12px;z-index:10;color:#fff"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z"/></svg></div>'
+ttNavHTML('home')
+'</div>';
ttBindNav();

// Swipe handling
const slides=$('#ttSlides');
let startY=0,curY=0,dragging=false;
const feed=$('#ttFeed');
feed.addEventListener('touchstart',e=>{startY=e.touches[0].clientY;dragging=true;slides.style.transition='none';},{passive:true});
feed.addEventListener('touchmove',e=>{if(!dragging)return;curY=e.touches[0].clientY;const dy=curY-startY;slides.style.transform='translateY('+(-ttIdx*feed.clientHeight+dy)+'px)';},{passive:true});
feed.addEventListener('touchend',e=>{
if(!dragging)return;dragging=false;
const dy=curY-startY;
slides.style.transition='transform .35s cubic-bezier(.32,.72,.24,1)';
if(dy<-70&&ttIdx<TT_FEED.length-1)ttIdx++;
else if(dy>70&&ttIdx>0)ttIdx--;
slides.style.transform='translateY('+(-ttIdx*feed.clientHeight)+'px)';
ttUpdateIframes();
},{passive:true});
// Mouse for testing
feed.addEventListener('mousedown',e=>{startY=e.clientY;dragging=true;slides.style.transition='none';});
feed.addEventListener('mousemove',e=>{if(!dragging)return;curY=e.clientY;const dy=curY-startY;slides.style.transform='translateY('+(-ttIdx*feed.clientHeight+dy)+'px)';});
feed.addEventListener('mouseup',e=>{
if(!dragging)return;dragging=false;
const dy=curY-startY;
slides.style.transition='transform .35s cubic-bezier(.32,.72,.24,1)';
if(dy<-70&&ttIdx<TT_FEED.length-1)ttIdx++;
else if(dy>70&&ttIdx>0)ttIdx--;
slides.style.transform='translateY('+(-ttIdx*feed.clientHeight)+'px)';
ttUpdateIframes();
});

// Like buttons
el.querySelectorAll('[data-like]').forEach(b=>b.addEventListener('click',e=>{
e.stopPropagation();
const idx=+b.dataset.like;
ttLiked[idx]=!ttLiked[idx];
b.querySelector('svg path').setAttribute('fill',ttLiked[idx]?'#fe2c55':'#fff');
if(ttLiked[idx])ttBigHeart(b.closest('.tt-slide'));
}));
// Comments
el.querySelectorAll('[data-comments]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();ttShowComments();}));
// Double tap
el.querySelectorAll('.tt-slide').forEach(s=>{
let lastTap=0;
s.addEventListener('click',()=>{
const now=Date.now();
if(now-lastTap<300){
const idx=+s.dataset.idx;
if(!ttLiked[idx]){ttLiked[idx]=true;const lb=s.querySelector('[data-like] svg path');if(lb)lb.setAttribute('fill','#fe2c55');}
ttBigHeart(s);
}
lastTap=now;
});
});
}

function ttBigHeart(slide){
const h=slide.querySelector('.tt-bigheart');
h.style.transition='none';h.style.opacity='1';h.style.transform='scale(.6)';
h.getBoundingClientRect();
h.style.transition='all .45s cubic-bezier(.17,.89,.32,1.28)';h.style.transform='scale(1.15)';h.style.opacity='0';
}

function ttUpdateIframes(){
// Reload iframes to switch autoplay
document.querySelectorAll('.tt-slide iframe').forEach((f,i)=>{
const v=TT_FEED[i];
const shouldPlay=i===ttIdx;
const cur=f.src.includes('autoplay=1');
if(shouldPlay!==cur){
f.src='https://www.youtube.com/embed/'+v.id+'?autoplay='+(shouldPlay?'1':'0')+'&mute=1&loop=1&playlist='+v.id+'&controls=0&rel=0&playsinline=1';
}
});
}

window.appTikTokReal=function(){
appHeadReset();
$('#appTitle').textContent='TikTok';
ttIdx=0;ttLiked={};
ttRenderFeed();
};

// Override the under-development TikTok
const _ttOrig=window.appTikTok;
window.appTikTok=function(){window.appTikTokReal();};
})();
