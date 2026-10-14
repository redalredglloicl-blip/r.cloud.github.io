// WhatsApp - Full Real Implementation - Version 27
(function(){
if(window._waLoaded)return;window._waLoaded=true;
try{document.title='27';var vt=document.getElementById('verTag');if(vt)vt.textContent='27';}catch(e){}

var FB='https://spychat-4f8d5-default-rtdb.firebaseio.com/rio-ipad/whatsapp';
var WA={user:null,chat:null,poll:null};

// SVG Icons (real WhatsApp style)
var WA_ICONS={
chat:'<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3 0 .1 0 .4-.2 1z"/></svg>',
status:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/></svg>',
calls:'<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
camera:'<svg viewBox="0 0 24 24" width="24" height="24" fill="#8696a0"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5l2.5 2.5H17a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h2.5L12 2z"/></svg>',
search:'<svg viewBox="0 0 24 24" width="22" height="22" fill="#8696a0"><path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>',
back:'<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"/></svg>',
send:'<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>',
mic:'<svg viewBox="0 0 24 24" width="24" height="24" fill="#8696a0"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>',
attach:'<svg viewBox="0 0 24 24" width="24" height="24" fill="#8696a0"><path d="M16.5 6v11.5a4.5 4.5 0 0 1-9 0V6a3 3 0 0 1 6 0v9.5a1.5 1.5 0 0 1-3 0V7H9v8.5a3 3 0 0 0 6 0V6a4.5 4.5 0 0 0-9 0v11.5a6 6 0 0 0 12 0V6h-1.5z" transform="rotate(45 12 12)"/></svg>',
tick:'<svg viewBox="0 0 16 11" width="16" height="11" fill="#8696a0"><path d="M11.1.5L6.2 6.8 4 4.2 2.8 5.5l3.4 4.5 6.1-8.2z"/></svg>',
ticks:'<svg viewBox="0 0 18 11" width="18" height="11" fill="#8696a0"><path d="M11.1.5L6.2 6.8 4 4.2 2.8 5.5l3.4 4.5 6.1-8.2zm6.5 0L12.7 6.8l-1-1.3 4.9-5z"/></svg>',
ticksBlue:'<svg viewBox="0 0 18 11" width="18" height="11" fill="#53bdeb"><path d="M11.1.5L6.2 6.8 4 4.2 2.8 5.5l3.4 4.5 6.1-8.2zm6.5 0L12.7 6.8l-1-1.3 4.9-5z"/></svg>',
phone:'<svg viewBox="0 0 24 24" width="22" height="22" fill="#0a84ff"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
video:'<svg viewBox="0 0 24 24" width="22" height="22" fill="#0a84ff"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
plus:'<svg viewBox="0 0 24 24" width="22" height="22" fill="#0a84ff"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>'
};

// Simple hash for password
function waHash(s){var h=0;for(var i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return 'h'+Math.abs(h).toString(36);}

// Get/set local session
function waSession(){try{return JSON.parse(localStorage.getItem('wa_session')||'null');}catch(e){return null;}}
function waSetSession(u){try{localStorage.setItem('wa_session',JSON.stringify(u));}catch(e){}}

// Background notification checker
function waStartNotifier(){
if(WA._notifOn)return;WA._notifOn=true;
WA._lastCheck={};
setInterval(()=>{
if(!WA.user||S.app==='whatsapp')return; // Only notify when NOT in WhatsApp
fetch(FB+'/chats.json').then(r=>r.json()).then(d=>{
if(!d)return;
Object.keys(d).forEach(k=>{
var chat=d[k];
if(!chat.users||chat.users.indexOf(WA.user.u)===-1)return;
var lm=chat.lastMsg;
if(!lm||!lm.ts)return;
var key='wa_notif_'+k;
var lastSeen=0;
try{lastSeen=parseInt(localStorage.getItem(key)||'0');}catch(e){}
if(lm.ts>lastSeen){
// Check if it's from someone else
fetch(FB+'/chats/'+k+'/messages.json').then(r=>r.json()).then(ms=>{
if(!ms)return;
var arr=Object.values(ms).sort((a,b)=>(b.ts||0)-(a.ts||0));
var latest=arr[0];
if(latest&&latest.by!==WA.user.u&&latest.ts>lastSeen){
waShowNotif(latest.by,latest.t,k);
}
try{localStorage.setItem(key,String(lm.ts));}catch(e){}
});
}
});
}).catch(()=>{});
},5000);
}
function waShowNotif(from,text,chatId){
// In-site banner notification
var b=document.createElement('div');
b.style.cssText='position:fixed;top:50px;left:12px;right:12px;background:#fff;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:99999;padding:12px 14px;display:flex;gap:10px;align-items:center;cursor:pointer;animation:waSlideDown .3s ease';
b.innerHTML='<div style="width:44px;height:44px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg></div>'
+'<div style="flex:1;min-width:0"><b style="font-size:13px">WhatsApp</b><br><span style="font-size:13px;color:#555;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block"><b>'+from+':</b> '+String(text||'').slice(0,50)+'</span></div>';
b.addEventListener('click',()=>{b.remove();});
document.body.appendChild(b);
setTimeout(()=>{b.style.transition='opacity .4s';b.style.opacity='0';setTimeout(()=>b.remove(),400);},4000);
// Add animation
if(!document.querySelector('#waNotifAnim')){
var st=document.createElement('style');st.id='waNotifAnim';
st.textContent='@keyframes waSlideDown{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}';
document.head.appendChild(st);
}
}
// Start notifier when logged in
var _origShowMain=showMain;

// Main entry
window.openWhatsApp=function(fromEl){
appHeadReset();snapCur();S.app='whatsapp';noteRunning('whatsapp','WhatsApp','whatsapp');
$('#appTitle').textContent='WhatsApp';showAppWin(fromEl);
// Full-screen flush
var ab=$('#appBody');
if(ab){ab.style.padding='0';ab.style.margin='0';}
WA.user=waSession();
if(!WA.user)showLogin();
else showMain();
};

// Login screen
function showLogin(){
var el=$('#appBody');
el.innerHTML='<div style="background:#fff;min-height:100%;display:flex;flex-direction:column;align-items:center;padding:40px 24px">'
+'<div style="width:80px;height:80px;border-radius:20px;background:#25d366;display:flex;align-items:center;justify-content:center;margin-bottom:20px">'
+'<svg viewBox="0 0 24 24" width="44" height="44" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3 0 .1 0 .4-.2 1z"/></svg></div>'
+'<h2 style="font-size:22px;margin-bottom:8px">مرحباً بك في واتساب</h2>'
+'<p class="mut" style="font-size:14px;margin-bottom:24px;text-align:center">سجل الدخول أو أنشئ حساباً جديداً</p>'
+'<input id="waUser" placeholder="اسم المستخدم" style="width:100%;padding:14px;border:1px solid #ddd;border-radius:12px;margin-bottom:12px;font-size:16px;direction:ltr;text-align:center">'
+'<input id="waPass" type="password" placeholder="كلمة السر" style="width:100%;padding:14px;border:1px solid #ddd;border-radius:12px;margin-bottom:20px;font-size:16px;direction:ltr;text-align:center">'
+'<button id="waLoginBtn" style="width:100%;background:#25d366;color:#fff;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:700;margin-bottom:10px">دخول</button>'
+'<button id="waRegBtn" style="width:100%;background:#f0f0f0;color:#333;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:600">حساب جديد</button>'
+'<p id="waErr" style="color:#e11d48;font-size:13px;margin-top:12px"></p>'
+'</div>';
document.querySelector('#waLoginBtn').addEventListener('click',doLogin);
document.querySelector('#waRegBtn').addEventListener('click',doRegister);
}

function doLogin(){
var u=document.querySelector('#waUser').value.trim().toLowerCase();
var p=document.querySelector('#waPass').value;
if(!u||!p){document.querySelector('#waErr').textContent='أدخل اسم المستخدم وكلمة السر';return;}
fetch(FB+'/users/'+u+'.json').then(r=>r.json()).then(d=>{
if(!d||d.ph!==waHash(p)){document.querySelector('#waErr').textContent='بيانات الدخول خاطئة';return;}
WA.user={u:u,n:d.n||u,pic:d.pic||''};
waSetSession(WA.user);
waStartNotifier();
showMain();
});
}

function doRegister(){
var u=document.querySelector('#waUser').value.trim().toLowerCase();
var p=document.querySelector('#waPass').value;
if(!u||u.length<3){document.querySelector('#waErr').textContent='اسم المستخدم 3 أحرف على الأقل';return;}
if(!p||p.length<4){document.querySelector('#waErr').textContent='كلمة السر 4 أحرف على الأقل';return;}
if(!/^[a-z0-9_]+$/.test(u)){document.querySelector('#waErr').textContent='أحرف إنجليزية وأرقام فقط';return;}
fetch(FB+'/users/'+u+'.json').then(r=>r.json()).then(d=>{
if(d){document.querySelector('#waErr').textContent='اسم المستخدم موجود';return;}
var user={n:u,ph:waHash(p),pic:'',ts:Date.now()};
fetch(FB+'/users/'+u+'.json',{method:'PUT',body:JSON.stringify(user)}).then(()=>{
WA.user={u:u,n:u,pic:''};
waSetSession(WA.user);
showMain();
});
});
}

// Main screen with tabs
function showMain(){
var el=$('#appBody');
el.innerHTML='<div style="display:flex;flex-direction:column;height:100%;background:#fff">'
// iOS-style header
+'<div style="background:#f6f6f6;padding:12px 16px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e0e0e0">'
+'<span id="waEditBtn" style="color:#0a84ff;font-size:16px;cursor:pointer">تحرير</span>'
+'<b id="waTitleBar" style="font-size:17px">الدردشات</b>'
+'<div style="display:flex;gap:16px;align-items:center"><span style="cursor:pointer" id="waSettingsBtn" style="color:#0a84ff;font-size:20px">⚙️</span><span style="cursor:pointer" id="waNewTopBtn" style="color:#0a84ff;font-size:22px">+</span></div>'
+'</div>'
+'<div style="padding:8px 16px;background:#f6f6f6"><div style="display:flex;align-items:center;background:#e8e8e8;border-radius:10px;padding:8px 12px;gap:8px"><span>'+WA_ICONS.search+'</span><input id="waSearchTop" placeholder="بحث" style="flex:1;background:none;border:none;outline:none;font-size:15px;min-width:0"></div></div>'
+'<div id="waContent" style="flex:1;overflow-y:auto;position:relative"></div>'
// Bottom nav (iOS style)
+'<div style="display:flex;border-top:1px solid #eee;background:#f9f9f9;padding:8px 0">'
+'<div data-watab="chats" style="flex:1;text-align:center;color:#25d366;cursor:pointer"><div>'+WA_ICONS.chat+'</div><div style="font-size:10px">الدردشات</div></div>'
+'<div data-watab="status" style="flex:1;text-align:center;color:#8696a0;cursor:pointer"><div>'+WA_ICONS.status+'</div><div style="font-size:10px">الحالة</div></div>'
+'<div data-watab="calls" style="flex:1;text-align:center;color:#8696a0;cursor:pointer"><div>'+WA_ICONS.calls+'</div><div style="font-size:10px">المكالمات</div></div>'
+'</div>'
// New chat FAB
+'<button id="waNewChat" style="position:absolute;bottom:80px;left:16px;width:56px;height:56px;border-radius:50%;background:#25d366;border:none;box-shadow:0 4px 12px rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center">'
+'<svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 9H7V9h4V5h2v4h4v2h-4v4H9v-4z"/></svg></button>'
+'</div>';

// Tab switching
var _waCurTab='chats';
function _waSetTab(t){
_waCurTab=t;
el.querySelectorAll('[data-watab]').forEach(x=>{
var active=x.dataset.watab===t;
x.style.color=active?'#0a84ff':'#8696a0';
});
var titles={chats:'الدردشات',status:'الحالة',calls:'المكالمات'};
var tb=el.querySelector('#waTitleBar');
if(tb)tb.textContent=titles[t]||'';
showWaTab(t);
}
el.querySelectorAll('[data-watab]').forEach(t=>{
t.addEventListener('click',()=>_waSetTab(t.dataset.watab));
});

document.querySelector('#waNewChat').addEventListener('click',showUserSearch);
var _st=document.querySelector('#waSearchTop');
if(_st)_st.addEventListener('click',showUserSearch);
var _nt=document.querySelector('#waNewTopBtn');
if(_nt)_nt.addEventListener('click',showUserSearch);
var _eb=document.querySelector('#waEditBtn');
if(_eb)_eb.addEventListener('click',()=>toast('اسحب لحذف محادثة'));
document.querySelector('#waSettingsBtn').addEventListener('click',showWaSettings);

showWaTab('chats');
}

function showWaTab(tab){
var c=document.querySelector('#waContent');
if(!c)return;
if(tab==='chats')loadChats();
else if(tab==='status')showStatusTab();
else if(tab==='calls')showCallsTab();
}

// Load chat list
function loadChats(){
var c=document.querySelector('#waContent');
c.innerHTML='<div style="padding:20px;text-align:center;color:#8696a0">جارٍ التحميل...</div>';
fetch(FB+'/chats.json').then(r=>r.json()).then(d=>{
var myChats=[];
if(d){
Object.keys(d).forEach(k=>{
var chat=d[k];
if(chat.users&&chat.users.indexOf(WA.user.u)!==-1){
var other=chat.users.find(u=>u!==WA.user.u);
var lastMsg=chat.lastMsg||{};
myChats.push({id:k,other:other,last:lastMsg.t||'',ts:lastMsg.ts||0,unread:0});
}
});
}
myChats.sort((a,b)=>b.ts-a.ts);
if(!myChats.length){
c.innerHTML='<div style="text-align:center;padding:60px 20px;color:#8696a0">'
+'<div style="font-size:48px;margin-bottom:16px;opacity:.3">'+WA_ICONS.chat+'</div>'
+'<b style="font-size:16px;color:#555">لا توجد دردشات</b><p style="font-size:13px;margin-top:8px">اضغط زر + لبدء محادثة جديدة<br>ابحث عن صديقك باسم المستخدم</p></div>';
return;
}
// Load other user info
var html='';
myChats.forEach(ch=>{
html+='<div data-chat="'+ch.id+'" data-other="'+ch.other+'" style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid #f0f0f0;cursor:pointer;align-items:center">'
+'<div class="waAv" data-u="'+ch.other+'" style="width:52px;height:52px;border-radius:50%;background:#dfe5e7;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:600;overflow:hidden"></div>'
+'<div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;align-items:center"><b class="waName" data-u="'+ch.other+'" style="font-size:16px">'+ch.other+'</b><span style="font-size:12px;color:#8696a0">'+waTime(ch.ts)+'</span></div>'
+'<p style="font-size:14px;color:#8696a0;margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+escH(ch.last)+'</p></div></div>';
});
c.innerHTML=html;
// Load avatars and names
c.querySelectorAll('.waAv').forEach(av=>{
var u=av.dataset.u;
fetch(FB+'/users/'+u+'.json').then(r=>r.json()).then(d=>{
if(d&&d.pic){av.innerHTML='<img src="'+d.pic+'" style="width:100%;height:100%;object-fit:cover">';}
else av.textContent=(d&&d.n?d.n:u).slice(0,1).toUpperCase();
});
});
c.querySelectorAll('.waName').forEach(nm=>{
var u=nm.dataset.u;
fetch(FB+'/users/'+u+'.json').then(r=>r.json()).then(d=>{
if(d&&d.n)nm.textContent=d.n;
});
});
c.querySelectorAll('[data-chat]').forEach(ch=>{
ch.addEventListener('click',()=>openChat(ch.dataset.chat,ch.dataset.other));
});
});
}

function waTime(ts){
if(!ts)return '';
var d=new Date(ts),now=new Date();
if(d.toDateString()===now.toDateString())return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');
var yest=new Date(now);yest.setDate(yest.getDate()-1);
if(d.toDateString()===yest.toDateString())return 'أمس';
return d.getDate()+'/'+(d.getMonth()+1);
}

// User search
function showUserSearch(){
var el=$('#appBody');
var overlay=document.createElement('div');
overlay.style.cssText='position:absolute;inset:0;background:#fff;z-index:100;display:flex;flex-direction:column';
overlay.innerHTML='<div style="background:#075e54;color:#fff;padding:12px 16px;display:flex;align-items:center;gap:12px">'
+'<span id="waSearchBack" style="cursor:pointer;font-size:20px">‹</span><b style="font-size:16px">محادثة جديدة</b></div>'
+'<div style="padding:12px"><input id="waSearchIn" placeholder="ابحث باسم المستخدم..." style="width:100%;padding:12px;border:1px solid #ddd;border-radius:12px;font-size:15px;direction:ltr;text-align:center"></div>'
+'<div id="waSearchRes" style="flex:1;overflow-y:auto;padding:0 12px"></div>';
el.appendChild(overlay);
document.querySelector('#waSearchBack').addEventListener('click',()=>overlay.remove());
var inp=document.querySelector('#waSearchIn');
inp.focus();
var search=()=>{
var q=inp.value.trim().toLowerCase();
var res=document.querySelector('#waSearchRes');
if(!q||q.length<2){res.innerHTML='';return;}
// Search users
fetch(FB+'/users.json').then(r=>r.json()).then(d=>{
var found=[];
if(d)Object.keys(d).forEach(k=>{
if(k!==WA.user.u&&(k.includes(q)||(d[k].n&&d[k].n.toLowerCase().includes(q))))found.push({u:k,n:d[k].n||k,pic:d[k].pic||''});
});
if(!found.length){res.innerHTML='<p style="text-align:center;color:#8696a0;padding:20px">لا نتائج</p>';return;}
res.innerHTML=found.map(f=>'<div data-start="'+f.u+'" style="display:flex;gap:12px;align-items:center;padding:12px;border-bottom:1px solid #f0f0f0;cursor:pointer">'
+'<div style="width:48px;height:48px;border-radius:50%;background:#dfe5e7;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0">'
+(f.pic?'<img src="'+f.pic+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:18px;font-weight:600">'+f.n.slice(0,1).toUpperCase()+'</span>')+'</div>'
+'<div><b style="font-size:15px">'+f.n+'</b><br><span class="mut" style="font-size:12px">@'+f.u+'</span></div></div>').join('');
res.querySelectorAll('[data-start]').forEach(b=>{
b.addEventListener('click',()=>{overlay.remove();startChat(b.dataset.start);});
});
});
};
inp.addEventListener('input',search);
}

// Start or open chat
function startChat(other){
var users=[WA.user.u,other].sort();
var chatId=users.join('_');
fetch(FB+'/chats/'+chatId+'.json').then(r=>r.json()).then(d=>{
if(!d){
fetch(FB+'/chats/'+chatId+'.json',{method:'PUT',body:JSON.stringify({users:users,ts:Date.now()})});
}
openChat(chatId,other);
});
}

// Open chat view
function openChat(chatId,other){
WA.chat={id:chatId,other:other};
var el=$('#appBody');
fetch(FB+'/users/'+other+'.json').then(r=>r.json()).then(u=>{
var name=u&&u.n?u.n:other;
var pic=u&&u.pic?u.pic:'';
el.innerHTML='<div style="display:flex;flex-direction:column;height:100%">'
// iOS-style chat header
+'<div style="background:#f6f6f6;padding:8px 12px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #e0e0e0">'
+'<span id="waChatBack" style="cursor:pointer;color:#0a84ff;font-size:18px">‹</span>'
+'<div style="width:40px;height:40px;border-radius:50%;background:#dfe5e7;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center">'
+(pic?'<img src="'+pic+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-weight:600">'+name.slice(0,1).toUpperCase()+'</span>')+'</div>'
+'<div style="flex:1;min-width:0"><b style="font-size:16px;color:#000">'+name+'</b><br><span id="waOnline" style="font-size:12px;color:#8696a0">متصل الآن</span></div>'
+'<span style="cursor:pointer;color:#0a84ff">'+WA_ICONS.video+'</span><span style="cursor:pointer;color:#0a84ff">'+WA_ICONS.phone+'</span>'
+'</div>'
// Messages
+'<div id="waMsgs" style="flex:1;overflow-y:auto;padding:12px 8px;background:#ece5dd;background-image:radial-gradient(#d4c9b8 1px,transparent 1px);background-size:20px 20px"></div>'
// Input
+'<div style="display:flex;gap:8px;align-items:center;padding:8px;background:#f0f0f0">'
+'<div style="flex:1;display:flex;align-items:center;background:#fff;border-radius:24px;padding:4px 4px 4px 12px">'
+'<input id="waMsgIn" placeholder="رسالة" style="flex:1;border:none;outline:none;font-size:15px;background:none;min-width:0">'
+'<label style="cursor:pointer;padding:6px">'+WA_ICONS.attach+'<input id="waImgPick" type="file" accept="image/*" style="display:none"></label>'
+'<span style="cursor:pointer;padding:6px" id="waCamBtn2">'+WA_ICONS.camera+'</span>'
+'</div>'
+'<button id="waSendBtn" style="width:48px;height:48px;border-radius:50%;background:#25d366;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+WA_ICONS.send+'</button>'
+'</div>'
+'</div>';

document.querySelector('#waChatBack').addEventListener('click',()=>{
clearInterval(WA.poll);clearInterval(WA._typePoll);
if(WA.chat)fetch(FB+'/chats/'+WA.chat.id+'/typing/'+WA.user.u+'.json',{method:'DELETE'});
showMain();
});
document.querySelector('#waSendBtn').addEventListener('click',sendWaMsg);
(function(){
var _mi=document.querySelector('#waMsgIn');
if(!_mi)return;
_waTypeT=null;
_mi.addEventListener('input',()=>{
if(!WA.chat)return;
fetch(FB+'/chats/'+WA.chat.id+'/typing/'+WA.user.u+'.json',{method:'PUT',body:JSON.stringify(Date.now())});
clearTimeout(window._waTypeT);
window._waTypeT=setTimeout(()=>{
if(WA.chat)fetch(FB+'/chats/'+WA.chat.id+'/typing/'+WA.user.u+'.json',{method:'DELETE'});
},3000);
});
clearInterval(WA._typePoll);
WA._typePoll=setInterval(()=>{
if(!WA.chat||!WA.chat.id)return;
fetch(FB+'/chats/'+WA.chat.id+'/typing.json').then(r=>r.json()).then(d=>{
var onEl=document.querySelector('#waOnline');
if(!onEl)return;
var typing=false;
if(d){Object.keys(d).forEach(k=>{if(k!==WA.user.u&&Date.now()-(d[k]||0)<4000)typing=true;});}
onEl.textContent=typing?'يكتب...':'متصل الآن';
onEl.style.color=typing?'#25d366':'#8696a0';
onEl.style.fontWeight=typing?'600':'400';
}).catch(()=>{});
},1500);
})();
document.querySelector('#waImgPick').addEventListener('change',function(e){
var f=e.target.files[0];
if(!f||!WA.chat)return;
toast('جارٍ إرسال الصورة...');
var reader=new FileReader();
reader.onload=function(ev){
var img=new Image();
img.onload=function(){
var cv=document.createElement('canvas');
var maxW=800,sc=Math.min(1,maxW/img.width);
cv.width=img.width*sc;cv.height=img.height*sc;
cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);
var b64=cv.toDataURL('image/jpeg',0.7);
var msg={by:WA.user.u,img:b64,t:'📷 صورة',ts:Date.now(),read:false};
fetch(FB+'/chats/'+WA.chat.id+'/messages.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(msg)});
fetch(FB+'/chats/'+WA.chat.id+'.json',{method:'PATCH',body:JSON.stringify({lastMsg:{t:'📷 صورة',ts:Date.now()}})});
loadWaMsgs();
toast('تم إرسال الصورة ✓');
};
img.src=ev.target.result;
};
reader.readAsDataURL(f);
e.target.value='';
});
var _cb=document.querySelector('#waCamBtn2');
if(_cb)_cb.addEventListener('click',()=>document.querySelector('#waImgPick').click());
document.querySelector('#waMsgIn').addEventListener('keypress',e=>{if(e.key==='Enter')sendWaMsg();});

loadWaMsgs();
clearInterval(WA.poll);
WA.poll=setInterval(()=>{if(WA.chat&&WA.chat.id===chatId)loadWaMsgs();},2000);
});
}

function loadWaMsgs(){
var box=document.querySelector('#waMsgs');
if(!box||!WA.chat)return;
fetch(FB+'/chats/'+WA.chat.id+'/messages.json').then(r=>r.json()).then(d=>{
var msgs=d?Object.keys(d).map(k=>({k:k,...d[k]})).sort((a,b)=>(a.ts||0)-(b.ts||0)):[];
// Mark as read
msgs.forEach(m=>{
if(m.by!==WA.user.u&&!m.read){
fetch(FB+'/chats/'+WA.chat.id+'/messages/'+m.k+'.json',{method:'PATCH',body:JSON.stringify({read:true})});
}
});
var wasAtBottom=box.scrollHeight-box.scrollTop-box.clientHeight<50;
box.innerHTML=msgs.map(m=>{
var mine=m.by===WA.user.u;
var ticks=mine?(m.read?WA_ICONS.ticksBlue:WA_ICONS.ticks):'';
var tm=m.ts?new Date(m.ts).getHours()+':'+String(new Date(m.ts).getMinutes()).padStart(2,'0'):'';
var react=m.react?'<div style="position:absolute;bottom:-8px;'+(mine?'left':'right')+':8px;background:#fff;border-radius:12px;padding:2px 6px;font-size:14px;box-shadow:0 1px 3px rgba(0,0,0,.2)">'+m.react+'</div>':'';
var content=m.img
?'<img src="'+m.img+'" style="max-width:100%;border-radius:8px;display:block">'
:'<div style="font-size:14.5px;line-height:1.5;word-break:break-word">'+escH(m.t)+'</div>';
return '<div style="display:flex;justify-content:'+(mine?'flex-end':'flex-start')+';margin-bottom:8px">'
+'<div class="waMsg" data-k="'+m.k+'" data-t="'+escH(m.t||'')+'" style="max-width:75%;background:'+(mine?'#dcf8c6':'#fff')+';border-radius:12px;padding:8px 10px;box-shadow:0 1px 1px rgba(0,0,0,.1);position:relative;cursor:pointer">'
+content
+'<div style="display:flex;justify-content:flex-end;align-items:center;gap:4px;margin-top:2px"><span style="font-size:11px;color:#8696a0">'+tm+'</span>'+ticks+'</div>'
+react
+'</div></div>';
}).join('')||'<div style="text-align:center;color:#8696a0;font-size:13px;padding:20px;background:rgba(255,255,255,.7);border-radius:12px;margin:10px">👋 قل مرحباً لبدء المحادثة</div>';
// Long-press for copy/reactions
box.querySelectorAll('.waMsg').forEach(msgEl=>{
var lpTimer=null;
msgEl.addEventListener('touchstart',()=>{lpTimer=setTimeout(()=>waMsgMenu(msgEl),500);},{passive:true});
msgEl.addEventListener('touchend',()=>clearTimeout(lpTimer));
msgEl.addEventListener('touchmove',()=>clearTimeout(lpTimer));
// Also for mouse
msgEl.addEventListener('mousedown',()=>{lpTimer=setTimeout(()=>waMsgMenu(msgEl),500);});
msgEl.addEventListener('mouseup',()=>clearTimeout(lpTimer));
});
if(wasAtBottom||!box.dataset.loaded){box.scrollTop=box.scrollHeight;box.dataset.loaded='1';}
});
}

// Message context menu (copy + reactions)
function waMsgMenu(msgEl){
var k=msgEl.dataset.k, t=msgEl.dataset.t;
var menu=document.createElement('div');
menu.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99999;display:flex;align-items:center;justify-content:center';
menu.innerHTML='<div style="background:#fff;border-radius:16px;padding:8px;min-width:260px;box-shadow:0 8px 32px rgba(0,0,0,.3)">'
+'<div style="display:flex;justify-content:center;gap:8px;padding:12px;border-bottom:1px solid #f0f0f0">'
+['❤️','😂','👍','😮','😢','🙏'].map(e=>'<span data-react="'+e+'" style="font-size:28px;cursor:pointer;padding:4px">'+e+'</span>').join('')
+'</div>'
+'<div data-act="copy" style="padding:14px;font-size:15px;cursor:pointer;border-bottom:1px solid #f0f0f0">📋 نسخ</div>'
+'<div data-act="cancel" style="padding:14px;font-size:15px;cursor:pointer;color:#e11d48;text-align:center">إلغاء</div>'
+'</div>';
document.body.appendChild(menu);
menu.querySelectorAll('[data-react]').forEach(r=>{
r.addEventListener('click',()=>{
if(WA.chat)fetch(FB+'/chats/'+WA.chat.id+'/messages/'+k+'.json',{method:'PATCH',body:JSON.stringify({react:r.dataset.react})}).then(()=>loadWaMsgs());
menu.remove();
});
});
menu.querySelector('[data-act="copy"]').addEventListener('click',()=>{
try{
if(navigator.clipboard)navigator.clipboard.writeText(t);
else{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}
toast('تم النسخ ✓');
}catch(e){toast(t);}
menu.remove();
});
menu.querySelector('[data-act="cancel"]').addEventListener('click',()=>menu.remove());
menu.addEventListener('click',e=>{if(e.target===menu)menu.remove();});
}

function sendWaMsg(){
var inp=document.querySelector('#waMsgIn');
var t=inp.value.trim();
if(!t||!WA.chat)return;
inp.value='';
if(WA.chat)fetch(FB+'/chats/'+WA.chat.id+'/typing/'+WA.user.u+'.json',{method:'DELETE'});
var msg={by:WA.user.u,t:t,ts:Date.now(),read:false};
fetch(FB+'/chats/'+WA.chat.id+'/messages.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(msg)});
fetch(FB+'/chats/'+WA.chat.id+'.json',{method:'PATCH',body:JSON.stringify({lastMsg:{t:t,ts:Date.now()}})});
loadWaMsgs();
}

// Settings page (like real WhatsApp)
function showWaSettings(){
var el=$('#appBody');
el.innerHTML='<div style="background:#f6f6f6;min-height:100%">'
+'<div style="background:#f6f6f6;padding:12px 16px;display:flex;align-items:center;border-bottom:1px solid #e0e0e0">'
+'<span id="waSetBack" style="color:#0a84ff;font-size:16px;cursor:pointer">‹ رجوع</span>'
+'<b style="flex:1;text-align:center;font-size:17px">الإعدادات</b><span style="width:50px"></span></div>'
// Profile card
+'<div id="waProfileCard" style="background:#fff;margin:16px;border-radius:12px;padding:16px;display:flex;gap:14px;align-items:center;cursor:pointer">'
+'<div style="width:64px;height:64px;border-radius:50%;background:#dfe5e7;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center">'
+(WA.user.pic?'<img src="'+WA.user.pic+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:24px;font-weight:600">'+WA.user.n.slice(0,1).toUpperCase()+'</span>')+'</div>'
+'<div style="flex:1"><b style="font-size:17px">'+WA.user.n+'</b><br><span class="mut" style="font-size:13px">@'+WA.user.u+'</span><br><span class="mut" style="font-size:12px">متاح</span></div>'
+'<span style="color:#c0c0c0">‹</span></div>'
// Settings rows
+[
['🔔','الإشعارات','صوت التنبيه والبانر'],
['🔒','الخصوصية','الحظر وجهات الاتصال'],
['💾','التخزين والبيانات','إدارة مساحة التخزين'],
['❓','المساعدة','الأسئلة الشائعة والدعم'],
['ℹ️','حول','إصدار واتساب']
].map(r=>'<div class="waSetRow" data-set="'+r[1]+'" style="background:#fff;margin:0 16px;padding:14px 16px;display:flex;gap:12px;align-items:center;cursor:pointer;border-bottom:1px solid #f0f0f0">'
+'<span style="font-size:20px">'+r[0]+'</span><div style="flex:1"><b style="font-size:15px">'+r[1]+'</b><br><span class="mut" style="font-size:12px">'+r[2]+'</span></div><span style="color:#c0c0c0">‹</span></div>').join('')
+'<button id="waLogout2" style="width:calc(100% - 32px);margin:16px;background:#fee;color:#e11d48;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600">تسجيل الخروج</button>'
+'<p style="text-align:center;color:#8696a0;font-size:12px;padding:10px">WhatsApp v27<br>صُنع بحب</p>'
+'</div>';
document.querySelector('#waSetBack').addEventListener('click',showMain);
document.querySelector('#waProfileCard').addEventListener('click',()=>{showMain();});
document.querySelectorAll('.waSetRow').forEach(r=>{
r.addEventListener('click',()=>toast(r.dataset.set+' — قريباً'));
});
document.querySelector('#waLogout2').addEventListener('click',()=>{
if(confirm('تسجيل الخروج؟')){
try{localStorage.removeItem('wa_session');}catch(e){}
clearInterval(WA.poll);WA.user=null;showLogin();
}
});
}

// Status tab
function showStatusTab(){
var c=document.querySelector('#waContent');
c.innerHTML='<div style="padding:16px">'
+'<div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0">'
+'<div style="position:relative"><div style="width:56px;height:56px;border-radius:50%;background:#dfe5e7;display:flex;align-items:center;justify-content:center;overflow:hidden">'
+(WA.user.pic?'<img src="'+WA.user.pic+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:20px;font-weight:600">'+WA.user.n.slice(0,1).toUpperCase()+'</span>')+'</div>'
+'<div style="position:absolute;bottom:0;left:0;width:22px;height:22px;border-radius:50%;background:#25d366;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;cursor:pointer" id="waAddStatus">+</div></div>'
+'<div><b>حالتي</b><br><span class="mut" style="font-size:13px">اضغط لإضافة تحديث للحالة</span></div></div>'
+'<p class="mut" style="font-size:13px;margin:16px 0 8px">التحديثات الأخيرة</p>'
+'<div style="text-align:center;color:#8696a0;padding:30px">لا توجد تحديثات</div>'
+'<div style="margin-top:20px;padding:16px;background:#f8f8f8;border-radius:12px">'
+'<b style="font-size:14px">صورتك الشخصية</b>'
+'<div style="display:flex;gap:10px;margin-top:10px;align-items:center">'
+'<div id="waPicPrev" style="width:60px;height:60px;border-radius:50%;background:#dfe5e7;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center">'
+(WA.user.pic?'<img src="'+WA.user.pic+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:22px;font-weight:600">'+WA.user.n.slice(0,1).toUpperCase()+'</span>')+'</div>'
+'<label style="flex:1;background:#25d366;color:#fff;border-radius:8px;padding:12px;text-align:center;font-size:14px;font-weight:600;cursor:pointer">اختر صورة<input id="waPicFile" type="file" accept="image/*" style="display:none"></label>'
+'</div><p id="waPicMsg" style="font-size:12px;color:#8696a0;margin-top:8px"></p>'
+'</div>'
+'<button id="waLogout" style="width:100%;margin-top:16px;background:#fee;color:#e11d48;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600">تسجيل الخروج</button>'
+'</div>';
document.querySelector('#waPicFile').addEventListener('change',function(e){
var f=e.target.files[0];
if(!f)return;
document.querySelector('#waPicMsg').textContent='جارٍ الرفع...';
var reader=new FileReader();
reader.onload=function(ev){
var img=new Image();
img.onload=function(){
// Compress to 200x200
var cv=document.createElement('canvas');cv.width=200;cv.height=200;
var cx=cv.getContext('2d');
var s=Math.min(img.width,img.height);
cx.drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,200,200);
var b64=cv.toDataURL('image/jpeg',0.7);
fetch(FB+'/users/'+WA.user.u+'.json',{method:'PATCH',body:JSON.stringify({pic:b64})}).then(()=>{
WA.user.pic=b64;waSetSession(WA.user);
document.querySelector('#waPicMsg').textContent='تم حفظ الصورة ✓';
document.querySelector('#waPicPrev').innerHTML='<img src="'+b64+'" style="width:100%;height:100%;object-fit:cover">';
toast('تم تحديث صورتك');
});
};
img.src=ev.target.result;
};
reader.readAsDataURL(f);
});
document.querySelector('#waLogout').addEventListener('click',()=>{
if(confirm('تسجيل الخروج؟')){
try{localStorage.removeItem('wa_session');}catch(e){}
clearInterval(WA.poll);WA.user=null;showLogin();
}
});
document.querySelector('#waAddStatus').addEventListener('click',()=>toast('قريباً: مشاركة الحالة'));
}

// Calls tab
function showCallsTab(){
var c=document.querySelector('#waContent');
c.innerHTML='<div style="text-align:center;padding:60px 20px;color:#8696a0">'
+'<div style="opacity:.3;margin-bottom:16px">'+WA_ICONS.calls+'</div>'
+'<b style="font-size:16px;color:#555">لا توجد مكالمات</b><p style="font-size:13px;margin-top:8px">المكالمات الصوتية والمرئية قريباً</p></div>';
}

function escH(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

// Hook into app system - replace placeholder with real WhatsApp
window.appWhatsApp=function(fromEl){window.openWhatsApp(fromEl);};
try{
if(typeof COMING_SOON!=='undefined'){
var wi=COMING_SOON.findIndex(function(x){return x.k==='whatsapp';});
if(wi!==-1)COMING_SOON.splice(wi,1);
}
}catch(e){}
})();
