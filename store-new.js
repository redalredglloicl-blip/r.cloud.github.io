// New App Store apps - Update 9.95 (runtime patching)
(function(){
if(window._storeNewLoaded)return;window._storeNewLoaded=true;
// Update version to 9.95
try{document.title='Update 9.95';var vt=document.getElementById('verTag');if(vt)vt.textContent='Update 9.95';}catch(e){}

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
{k:'spotify',n:'Spotify',dev:'Spotify AB',cat:'موسيقى',ver:'9.0.2',size:'92 MB',rt:4.8,rc:'2.1M',age:'12+',desc:'موسيقى وبودكاست بلا حدود. اكتشف ملايين الأغاني والقوائم المخصصة لذوقك.'},
{k:'netflix',n:'Netflix',dev:'Netflix Inc.',cat:'ترفيه',ver:'16.5.0',size:'78 MB',rt:4.7,rc:'1.8M',age:'12+',desc:'شاهد الأفلام والمسلسلات الأصلية. حمّل وشاهد بدون إنترنت.'},
{k:'uber',n:'Uber',dev:'Uber Technologies',cat:'سفر',ver:'4.2.1',size:'145 MB',rt:4.6,rc:'950K',age:'4+',desc:'اطلب سيارة بضغطة زر. تتبع مباشر ودفع آمن.'},
{k:'shahid',n:'Shahid',dev:'MBC Group',cat:'ترفيه',ver:'8.3.0',size:'68 MB',rt:4.5,rc:'420K',age:'12+',desc:'أكبر مكتبة عربية للمسلسلات والأفلام والبرامج.'},
{k:'capcut',n:'CapCut',dev:'Bytedance',cat:'صور وفيديو',ver:'5.1.0',size:'210 MB',rt:4.9,rc:'3.2M',age:'4+',desc:'محرر فيديو احترافي مجاني. قص، أضف مؤثرات، وانشر.'},
{k:'picsart',n:'Picsart',dev:'Picsart Inc.',cat:'صور وفيديو',ver:'24.8.1',size:'156 MB',rt:4.7,rc:'1.5M',age:'4+',desc:'حرر صورك بذكاء اصطناعي. فلاتر، ملصقات، وأدوات إبداعية.'},
];

// Patch openExtra for قيد التطوير
const _openExtra=window.openExtra;
window.openExtra=function(k,fromEl){
if(['spotify','netflix','uber','shahid','capcut','picsart'].includes(k)){
appHeadReset();snapCur();S.app='x_'+k;noteRunning('x_'+k,EXTRA[k].n,EXTRA[k].ic);
$('#appTitle').textContent=EXTRA[k].n;showAppWin(fromEl);
$('#appBody').innerHTML='<div style="text-align:center;padding:60px 20px"><div style="font-size:17px;font-weight:700;margin-bottom:8px">قيد التطوير</div><p class="mut" style="font-size:13px;line-height:1.9">تطبيق '+EXTRA[k].n+' بعدو قيد التطوير<br>راح يتوفر بتحديث قادم</p></div>';
return;
}
return _openExtra(k,fromEl);
};

// Patch appStore to include NEW_APPS
const _appStore=window.appStore;
window.appStore=function(el){
const _origDetail=S.storeDetail;
// Temporarily extend STORE for detail lookup
if(_origDetail&&window.NEW_APPS.find(x=>x.k===_origDetail)){
// Let the original handle it by temporarily adding to STORE
STORE.push(window.NEW_APPS.find(x=>x.k===_origDetail));
try{_appStore(el);}finally{STORE.pop();}
return;
}
_appStore(el);
// Inject NEW_APPS into Apps tab and search via DOM
setTimeout(()=>{
try{
const newApps=window.NEW_APPS;
if(S.storeTab==='apps'){
const secs=[...el.querySelectorAll('.rbx-sec')];
const target=secs.find(s=>s.textContent.includes('تطبيقات جديدة'));
if(target&&!el.querySelector('[data-newapps]')){
const div=document.createElement('div');
div.setAttribute('data-newapps','1');
div.innerHTML='<div class="rbx-sec">حمّل وجرّب</div>'+newApps.map(a=>{
const inst=S.installed.includes(a.k);
return '<div class="card row" style="align-items:center"><span style="flex:0 0 auto">'+icImg(ICONS[a.k])+'</span><span style="flex:1;cursor:pointer" data-detail="'+a.k+'"><span class="big" style="font-size:15px">'+a.n+'</span><br><span class="mut">'+a.cat+' — '+a.dev+'</span></span><button class="btn '+(inst?'gray':'')+'" data-get="'+a.k+'" style="border-radius:16px;padding:7px 18px">'+(inst?'فتح':'احصل')+'</button></div>';
}).join('');
target.parentNode.insertBefore(div,target.nextSibling);
// Bind clicks
div.querySelectorAll('[data-detail]').forEach(d=>d.addEventListener('click',()=>{S.storeDetail=d.dataset.detail;appStore(el);}));
div.querySelectorAll('[data-get]').forEach(b=>b.addEventListener('click',e=>doGet(b.dataset.get,e.target,el)));
}
}
}catch(e){}
},50);
};
})();
