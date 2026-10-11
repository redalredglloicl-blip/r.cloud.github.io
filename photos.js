function phKey(p){return p.key}
function phAll(){
S.phFav=S.phFav||store.get('phFav',{});S.phDel=S.phDel||store.get('phDel',[]);
const now=Date.now(),day=864e5,arr=[];
for(let i=0;i<42;i++){const sd='rioph'+(i+1);arr.push({key:sd,src:'https://picsum.photos/seed/'+sd+'/500/500',big:'https://picsum.photos/seed/'+sd+'/1200/1200',ts:now-Math.round(i*2.17)*day-(i*37%11)*36e5,own:false})}
(S.photos||[]).forEach(p=>arr.push({key:'u'+String(p).slice(-24),src:p,big:p,ts:now,own:true}));
const dk={};S.phDel.forEach(d=>dk[d.key]=1);
return arr.filter(p=>!dk[p.key]).map(p=>Object.assign({},p,{fav:!!S.phFav[p.key]}));
}
function phDate(ts){const d=new Date(ts),months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()}
function phTime(ts){const d=new Date(ts);let hh=d.getHours(),mm=String(d.getMinutes()).padStart(2,'0');const ap=hh>=12?'م':'ص';hh=hh%12||12;return hh+':'+mm+' '+ap}
function appPhotos(el){
S.phTab=S.phTab||'lib';S.phSeg=S.phSeg||'all';
const render=()=>{
const all=phAll().sort((a,b)=>b.ts-a.ts);
const favs=all.filter(p=>p.fav);
const del=S.phDel||[];
let h='';
if(S.phTab==='lib'){
h+='<div class="row" style="align-items:center;margin-bottom:8px"><b style="font-size:22px;flex:1">المكتبة</b></div>';
h+='<div class="row" style="gap:6px;margin-bottom:10px">'+[['years','السنوات'],['months','الأشهر'],['days','الأيام'],['all','كل الصور']].map(s2=>'<span data-phseg="'+s2[0]+'" style="flex:1;text-align:center;padding:8px 4px;border-radius:10px;font-size:13px;cursor:pointer;'+(S.phSeg===s2[0]?'background:#0a84ff;color:#fff;font-weight:700':'background:#f1f1f4;color:#333')+'">'+s2[1]+'</span>').join('')+'</div>';
h+='<div id="phBody">';
if(!all.length)h+='<p class="mut" style="text-align:center;padding:40px">لا توجد صور</p>';
else if(S.phSeg==='all'){
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">'+all.map((p,i)=>'<img src="'+p.src+'" data-phi="'+i+'" loading="lazy" style="width:100%;aspect-ratio:1;object-fit:cover;cursor:pointer'+(p.fav?';outline:2px solid #fff;outline-offset:-2px':'')+'">').join('')+'</div>';
}else{
const groups={};
all.forEach(p=>{let k;const d=new Date(p.ts);
if(S.phSeg==='years')k=d.getFullYear();
else if(S.phSeg==='months')k=d.getFullYear()+'-'+d.getMonth();
else k=phDate(p.ts);
(groups[k]=groups[k]||[]).push(p)});
Object.keys(groups).sort().reverse().forEach(k=>{
let label=k;
if(S.phSeg==='months'){const y=+k.split('-')[0],m=+k.split('-')[1],months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];label=months[m]+' '+y}
h+='<div style="margin:14px 0 6px"><b style="font-size:16px">'+label+'</b> <span class="mut" style="font-size:12px">'+groups[k].length+' صورة</span></div>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">'+groups[k].map(p=>'<img src="'+p.src+'" data-phk="'+p.key+'" loading="lazy" style="width:100%;aspect-ratio:1;object-fit:cover;cursor:pointer">').join('')+'</div>';
});
}
h+='</div>';
}else{
const alb=(t,n,cover,go)=>'<div class="row" data-alb="'+go+'" style="align-items:center;padding:10px 4px;cursor:pointer;border-bottom:1px solid #f0f0f2"><img src="'+cover+'" style="width:56px;height:56px;border-radius:10px;object-fit:cover;flex:0 0 auto"><span style="flex:1;margin-inline-start:12px"><b style="font-size:15px">'+t+'</b><br><span class="mut" style="font-size:12.5px">'+n+' صورة</span></span><span style="color:#c7c7cc;font-size:18px">‹</span></div>';
const c0=all[0]?all[0].src:'',c1=favs[0]?favs[0].src:c0,c2=del[0]?del[0].src:c0;
h+='<div class="row" style="align-items:center;margin-bottom:8px"><b style="font-size:22px;flex:1">الألبومات</b></div>';
h+=alb('الأخيرة',all.length,c0,'recents')+alb('المفضلة',favs.length,c1,'fav')+alb('المحذوفة مؤخراً',del.length,c2,'del');
h+='<p class="mut" style="font-size:12px;line-height:1.9;margin-top:12px">الصور المحذوفة تبقى 30 يوماً في "المحذوفة مؤخراً" قبل حذفها نهائياً.</p>';
}
h+='<div style="display:flex;border-top:1px solid #e5e5e5;margin-top:12px;padding-top:8px;position:sticky;bottom:-12px;background:#fff;margin-left:-12px;margin-right:-12px;margin-bottom:-12px;padding-left:12px;padding-right:12px;padding-bottom:14px">'+[['lib','الصور'],['albums','الألبومات']].map(t=>'<span data-phtab="'+t[0]+'" style="flex:1;text-align:center;font-size:13px;padding:8px;cursor:pointer;color:'+(S.phTab===t[0]?'#0a84ff':'#8e8e93')+';font-weight:'+(S.phTab===t[0]?'700':'400')+'">'+t[1]+'</span>').join('')+'</div>';
el.innerHTML=h;
el.querySelectorAll('[data-phtab]').forEach(b=>b.addEventListener('click',()=>{S.phTab=b.dataset.phtab;S.phAlb=null;render()}));
el.querySelectorAll('[data-phseg]').forEach(b=>b.addEventListener('click',()=>{S.phSeg=b.dataset.phseg;render()}));
el.querySelectorAll('[data-alb]').forEach(b=>b.addEventListener('click',()=>{S.phAlb=b.dataset.alb;phAlbumView(el)}));
const openByIdx=i=>phView(el,all,i,'lib');
el.querySelectorAll('[data-phi]').forEach(im=>im.addEventListener('click',()=>openByIdx(+im.dataset.phi)));
el.querySelectorAll('[data-phk]').forEach(im=>im.addEventListener('click',()=>{const ix=all.findIndex(p=>p.key===im.dataset.phk);if(ix>=0)phView(el,all,ix,'lib')}));
};
const saveFav=()=>{try{store.set('phFav',S.phFav||{})}catch(e){}};
const saveDel=()=>{try{store.set('phDel',S.phDel||[])}catch(e){}};
window.phToggleFav=key=>{S.phFav=S.phFav||{};if(S.phFav[key])delete S.phFav[key];else S.phFav[key]=1;saveFav();return !!S.phFav[key]};
window.phDelete=key=>{
const all=phAll();const p=all.find(x=>x.key===key);if(!p)return false;
S.phDel=S.phDel||[];S.phDel.unshift({key:p.key,src:p.src,big:p.big,ts:p.ts,delTs:Date.now(),own:p.own});saveDel();
if(p.own){S.photos=(S.photos||[]).filter(x=>x!==p.src);store.set('photos',S.photos)}
if(S.phFav&&S.phFav[key]){delete S.phFav[key];saveFav()}
return true;
};
window.phRecover=key=>{
S.phDel=(S.phDel||[]).filter(d=>d.key!==key);saveDel();
};
window.phPurge=key=>{S.phDel=(S.phDel||[]).filter(d=>d.key!==key);saveDel()};
render();
}
function phAlbumView(el){
const all=phAll().sort((a,b)=>b.ts-a.ts);
const favs=all.filter(p=>p.fav),del=S.phDel||[];
let list=all,title='الأخيرة',mode='recents';
if(S.phAlb==='fav'){list=favs;title='المفضلة';mode='fav'}
if(S.phAlb==='del'){list=del.map(d=>({key:d.key,src:d.src,big:d.big,ts:d.ts,fav:false}));title='المحذوفة مؤخراً';mode='del'}
let h='<div class="row" style="align-items:center;margin-bottom:10px"><span id="phAlbBack" style="color:#0a84ff;font-size:16px;cursor:pointer">‹ الألبومات</span><b style="flex:1;text-align:center;font-size:17px">'+title+'</b><span style="width:70px"></span></div>';
if(!list.length)h+='<p class="mut" style="text-align:center;padding:40px">فارغ</p>';
else{
if(mode==='del')h+='<p class="mut" style="font-size:12px;margin:0 0 8px">اضغط على أي صورة للاسترداد أو الحذف النهائي.</p>';
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">'+list.map((p,i)=>'<div data-phi="'+i+'" style="position:relative;cursor:pointer"><img src="'+p.src+'" loading="lazy" style="width:100%;aspect-ratio:1;object-fit:cover;display:block">'+(mode==='del'?'<span style="position:absolute;bottom:4px;right:4px;left:4px;background:rgba(0,0,0,.6);color:#fff;font-size:10px;text-align:center;border-radius:6px;padding:2px">'+Math.max(1,30-Math.floor((Date.now()-(S.phDel.find(d=>d.key===p.key)||{delTs:Date.now()}).delTs)/864e5))+' يوم</span>':'')+'</div>').join('')+'</div>';
}
el.innerHTML=h;
document.querySelector('#phAlbBack').addEventListener('click',()=>appPhotos(el));
el.querySelectorAll('[data-phi]').forEach(im=>im.addEventListener('click',()=>phView(el,list,+im.dataset.phi,mode)));
}
function phView(el,list,ix,mode){
if(ix<0||ix>=list.length)return;
const p=list[ix];
const isDel=mode==='del';
let h='<div style="position:sticky;top:-12px;z-index:5;background:#fff;margin:-12px -12px 0;padding:10px 12px" class="row"><span id="phVBack" style="color:#0a84ff;font-size:16px;cursor:pointer;flex:1">‹ رجوع</span><b style="font-size:14px">'+phDate(p.ts)+'</b><span style="flex:1"></span></div>';
h+='<div id="phStage" style="margin:10px -12px;position:relative;touch-action:pan-y"><img id="phImg" src="'+p.big+'" style="width:100%;display:block;min-height:300px;background:#000;object-fit:contain">';
h+='<span id="phPrev" style="position:absolute;top:50%;right:6px;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;display:'+(ix>0?'flex':'none')+';align-items:center;justify-content:center;font-size:20px;cursor:pointer">‹</span>';
h+='<span id="phNext" style="position:absolute;top:50%;left:6px;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;display:'+(ix<list.length-1?'flex':'none')+';align-items:center;justify-content:center;font-size:20px;cursor:pointer">›</span></div>';
h+='<p class="mut" style="text-align:center;font-size:12.5px">'+phDate(p.ts)+' · '+phTime(p.ts)+'</p>';
if(isDel){
h+='<div class="row" style="gap:8px;margin-top:10px"><button class="btn" id="phRec" style="flex:1">استرداد</button><button class="btn" id="phPurge" style="flex:1;background:#ff3b30">حذف نهائي</button></div>';
}else{
h+='<div class="row" style="gap:4px;margin-top:10px;position:sticky;bottom:-12px;background:#fff;padding:10px 0 14px;margin-left:-12px;margin-right:-12px;padding-left:12px;padding-right:12px">'
+'<span id="phShare" style="flex:1;text-align:center;padding:10px;cursor:pointer">'+si('share',22,'#0a84ff')+'</span>'
+'<span id="phFav" style="flex:1;text-align:center;padding:10px;cursor:pointer">'+si(p.fav?'heartF':'heart',22,p.fav?'#ff2d55':'#0a84ff')+'</span>'
+'<span id="phInfo" style="flex:1;text-align:center;padding:10px;cursor:pointer">'+si('info',22,'#0a84ff')+'</span>'
+'<span id="phDel" style="flex:1;text-align:center;padding:10px;cursor:pointer">'+si('trash',22,'#ff3b30')+'</span></div>';
}
el.innerHTML=h;
document.querySelector('#phVBack').addEventListener('click',()=>{if(isDel)phAlbumView(el);else appPhotos(el)});
const go=n=>{const nx=ix+n;if(nx>=0&&nx<list.length)phView(el,list,nx,mode)};
const pv=document.querySelector('#phPrev'),nx=document.querySelector('#phNext');
if(pv)pv.addEventListener('click',e=>{e.stopPropagation();go(-1)});
if(nx)nx.addEventListener('click',e=>{e.stopPropagation();go(1)});
let sx0=null;
const st=document.querySelector('#phStage');
st.addEventListener('pointerdown',e=>{sx0=e.clientX});
st.addEventListener('pointerup',e=>{if(sx0==null)return;const dx=e.clientX-sx0;sx0=null;if(Math.abs(dx)>60)go(dx<0?1:-1)});
if(isDel){
document.querySelector('#phRec').addEventListener('click',()=>{window.phRecover(p.key);toast('استُردت الصورة');phAlbumView(el)});
document.querySelector('#phPurge').addEventListener('click',()=>{window.phPurge(p.key);toast('انحذفت نهائياً');phAlbumView(el)});
return;
}
document.querySelector('#phShare').addEventListener('click',()=>showShare({img:p.big,title:'صورة من Rio iPad'}));
document.querySelector('#phFav').addEventListener('click',e=>{const f=window.phToggleFav(p.key);p.fav=f;e.currentTarget.innerHTML=si(f?'heartF':'heart',22,f?'#ff2d55':'#0a84ff');toast(f?'أُضيفت للمفضلة':'أُزيلت من المفضلة')});
document.querySelector('#phInfo').addEventListener('click',()=>toast(phDate(p.ts)+' · '+phTime(p.ts)+' · 1200×1200'));
document.querySelector('#phDel').addEventListener('click',()=>{window.phDelete(p.key);toast('انحذفت — تلقاها في "المحذوفة مؤخراً"');appPhotos(el)});
}
