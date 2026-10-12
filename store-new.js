// New App Store apps - Version 12 (runtime patching)
(function(){
if(window._storeNewLoaded)return;window._storeNewLoaded=true;
try{document.title='13';var vt=document.getElementById('verTag');if(vt)vt.textContent='13';}catch(e){}

// Icons
Object.assign(ICONS,{
spotify:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b2/af/e8/b2afe87d-2d6a-8e4b-01bf-73b5752996dc/AppIcon-0-0-1x_U007epad-0-1-0-0-85-220.png/512x512bb.jpg',
netflix:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/51/63/b65163f4-46c5-facf-54b3-c03fd55fd1f3/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-0-85-220.png/512x512bb.jpg',
uber:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ea/16/5e/ea165e23-d682-bdf5-3852-8ccf523c259b/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/512x512bb.jpg',
shahid:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d2/42/fa/d242faad-9002-fc5e-e5e9-16a57e9d4330/AppIcon-0-0-1x_U007emarketing-0-0-0-11-0-0-85-220.png/512x512bb.jpg',
capcut:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5e/3f/96/5e3f9662-e690-3e55-e0b0-77da51f98fd2/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
picsart:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/29/70/0f/29700f73-1932-2d9a-d03d-971142f9ea57/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/512x512bb.jpg',
});
Object.assign(EXTRA,{
spotify:{n:'Spotify',ic:'spotify'},netflix:{n:'Netflix',ic:'netflix'},
uber:{n:'Uber',ic:'uber'},shahid:{n:'Shahid',ic:'shahid'},
capcut:{n:'CapCut',ic:'capcut'},picsart:{n:'Picsart',ic:'picsart'}
});
window.NEW_APPS=[
{k:'spotify',n:'Spotify',dev:'Spotify AB',cat:'موسيقى',ver:'9.0.2',size:'92 MB',rt:4.8,rc:'2.1M',age:'12+',desc:'موسيقى وبودكاست بلا حدود.',comingSoon:true},
{k:'netflix',n:'Netflix',dev:'Netflix Inc.',cat:'ترفيه',ver:'16.5.0',size:'78 MB',rt:4.7,rc:'1.8M',age:'12+',desc:'أفلام ومسلسلات أصلية.',comingSoon:true},
{k:'uber',n:'Uber',dev:'Uber Technologies',cat:'سفر',ver:'4.2.1',size:'145 MB',rt:4.6,rc:'950K',age:'4+',desc:'اطلب سيارة بضغطة زر.',comingSoon:true},
{k:'shahid',n:'Shahid',dev:'MBC Group',cat:'ترفيه',ver:'8.3.0',size:'68 MB',rt:4.5,rc:'420K',age:'12+',desc:'مكتبة عربية للمسلسلات.',comingSoon:true},
{k:'capcut',n:'CapCut',dev:'Bytedance',cat:'صور وفيديو',ver:'5.1.0',size:'210 MB',rt:4.9,rc:'3.2M',age:'4+',desc:'محرر فيديو احترافي.',comingSoon:true},
{k:'picsart',n:'Picsart',dev:'Picsart Inc.',cat:'صور وفيديو',ver:'24.8.1',size:'156 MB',rt:4.7,rc:'1.5M',age:'4+',desc:'حرر صورك بذكاء اصطناعي.',comingSoon:true},
];

// Apps removed from device - Store only as "قريباً"
window.COMING_SOON=[
{k:'instagram',n:'Instagram',dev:'Meta Platforms',cat:'صور وفيديو',desc:'شارك صورك وتابع أصدقاءك.',comingSoon:true},
{k:'facebook',n:'Facebook',dev:'Meta Platforms',cat:'تواصل اجتماعي',desc:'تواصل مع الأصدقاء.',comingSoon:true},
{k:'x',n:'X',dev:'X Corp.',cat:'أخبار وتواصل',desc:'تابع الترندات.',comingSoon:true},
{k:'camera',n:'Camera',dev:'Apple',cat:'صور وفيديو',desc:'التقط صور وفيديوهات.',comingSoon:true},
];

// Mark original STORE Instagram/Facebook/X as coming soon (not downloadable)
try{
if(typeof STORE!=='undefined'){
STORE.forEach(function(a){
if(['instagram','facebook','x'].indexOf(a.k)!==-1){a.comingSoon=true;}
});
}
}catch(e){}

// Patch doGet to block coming-soon apps
try{
var _doGet=window.doGet;
window.doGet=function(k,btn,el){
try{
var all=(window.COMING_SOON||[]).concat(window.NEW_APPS||[]).concat(typeof STORE!=='undefined'?STORE:[]);
var app=all.find(function(x){return x.k===k;});
if(app&&app.comingSoon){toast('قريباً');return;}
}catch(e){}
return _doGet(k,btn,el);
};
}catch(e){}

// Remove from installed if present
try{
if(typeof S!=='undefined'&&S.installed){
var rm=['instagram','facebook','x','camera','spotify','netflix','uber','shahid','capcut','picsart'];
S.installed=S.installed.filter(function(k){return rm.indexOf(k)===-1;});
if(typeof store!=='undefined')store.set('installed',S.installed);
}
}catch(e){}

// Hide Camera from home screen
try{
if(typeof APPS!=='undefined'&&!window._camHidden){
var ci=APPS.findIndex(function(a){return a.id==='camera';});
if(ci!==-1){window._camHidden=true;APPS.splice(ci,1);}
}
}catch(e){}

// Patch openExtra for قيد التطوير (fallback)
var _openExtra=window.openExtra;
window.openExtra=function(k,fromEl){
if(['spotify','netflix','uber','shahid','capcut','picsart'].indexOf(k)!==-1){
appHeadReset();snapCur();S.app='x_'+k;noteRunning('x_'+k,EXTRA[k].n,EXTRA[k].ic);
$('#appTitle').textContent=EXTRA[k].n;showAppWin(fromEl);
$('#appBody').innerHTML='<div style="text-align:center;padding:60px 20px"><div style="font-size:17px;font-weight:700;margin-bottom:8px">قيد التطوير</div><p class="mut" style="font-size:13px;line-height:1.9">تطبيق '+EXTRA[k].n+' بعدو قيد التطوير<br>راح يتوفر بتحديث قادم</p></div>';
return;
}
return _openExtra(k,fromEl);
};

// Patch storeRow to show قريباً for coming-soon apps
try{
var _storeRow=window.storeRow;
if(_storeRow){
window.storeRow=function(a){
var html=_storeRow(a);
if(a.comingSoon){
html=html.replace(/<button class="btn[^"]*" data-get="[^"]*"[^>]*>.*?<\/button>/,'<button class="btn gray" disabled style="border-radius:16px;padding:7px 18px">قريباً</button>');
}
return html;
};
}
}catch(e){}

// Patch appStore to show COMING_SOON with "قريباً" buttons
var _appStore=window.appStore;
window.appStore=function(el){
var _origDetail=S.storeDetail;
if(_origDetail){
var found=window.NEW_APPS.concat(window.COMING_SOON).find(function(x){return x.k===_origDetail;});
if(found){STORE.push(found);try{_appStore(el);}finally{STORE.pop();}return;}
}
_appStore(el);
setTimeout(function(){
try{
if(S.storeTab==='apps'&&!el.querySelector('[data-comingsoon]')){
var secs=el.querySelectorAll('.rbx-sec');
var target=null;
secs.forEach(function(s){if(s.textContent.indexOf('تطبيقات جديدة')!==-1)target=s;});
if(target){
var div=document.createElement('div');
div.setAttribute('data-comingsoon','1');
var all=window.COMING_SOON.concat(window.NEW_APPS);
div.innerHTML='<div class="rbx-sec">قريباً</div>'+all.map(function(a){
return '<div class="card row" style="align-items:center;opacity:.75"><span style="flex:0 0 auto">'+icImg(ICONS[a.k]||'')+'</span><span style="flex:1"><span class="big" style="font-size:15px">'+a.n+'</span><br><span class="mut">'+a.cat+' — '+a.dev+'</span></span><button class="btn gray" disabled style="border-radius:16px;padding:7px 18px">قريباً</button></div>';
}).join('');
target.parentNode.insertBefore(div,target.nextSibling);
}
}
}catch(e){}
},50);
};
})();
