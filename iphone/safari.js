/* سفاري الحقيقي — متصفح شغال فعلاً: بحث وتصفح حقيقي عبر الإنترنت */
function sfHost(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return String(u||'')}}
function sfA(v){return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function sfProxy(u){return 'https://api.allorigins.win/raw?url='+encodeURIComponent(u)}
function sfInit(){
if(!S.safari)S.safari={tabs:[],active:0,seq:1,overview:false};
if(!S.sfFav)S.sfFav=store.get('sfFav',[{url:'https://duckduckgo.com',title:'DuckDuckGo'},{url:'https://ar.wikipedia.org',title:'ويكيبيديا'}]);
if(!S.sfHist)S.sfHist=store.get('sfHist',[]);
if(!S.sfRead)S.sfRead=store.get('sfRead',[]);
}
function sfTab(){const ts=S.safari.tabs;return ts&&ts.length?ts[Math.min(S.safari.active,ts.length-1)]:null}
async function sfGet(u,ms){
const c=new AbortController();const to=setTimeout(()=>c.abort(),ms||22000);
try{const r=await fetch(sfProxy(u),{signal:c.signal});clearTimeout(to);if(!r.ok)throw new Error('http '+r.status);return await r.text()}
catch(e){clearTimeout(to);throw e}
}
function sfPushHist(tab,url,title,kind,data){
tab.hist=tab.hist.slice(0,tab.hi+1);
tab.hist.push({url:url,title:title,kind:kind,data:data});
if(tab.hist.length>50)tab.hist.shift();
tab.hi=tab.hist.length-1;
}
function sfApplyEntry(tab,e){tab.url=e.url;tab.title=e.title;tab.kind=e.kind;tab.data=e.data}
function sfHistAdd(url,title){
if(!/^https?:\/\//i.test(url||''))return;
S.sfHist=S.sfHist||[];
S.sfHist=S.sfHist.filter(h=>h.url!==url);
S.sfHist.unshift({url:url,title:title||sfHost(url),ts:Date.now()});
if(S.sfHist.length>60)S.sfHist.length=60;
store.set('sfHist',S.sfHist);
}
function sfFrequent(){
const m={};
(S.sfHist||[]).forEach(h=>{try{const host=sfHost(h.url);if(!host)return;if(!m[host])m[host]={host:host,title:h.title,n:0,url:h.url};m[host].n++}catch(e){}});
return Object.values(m).sort((a,b)=>b.n-a.n).slice(0,6);
}
function sfParseResults(html){
const out=[];
try{
const doc=new DOMParser().parseFromString(html,'text/html');
doc.querySelectorAll('a.result__a').forEach(a=>{
const res=a.closest('.result');
let href=a.getAttribute('href')||'';let real=href;
try{const u=new URL(href,'https://duckduckgo.com');const ud=u.searchParams.get('uddg');if(ud)real=decodeURIComponent(ud)}catch(e){}
if(!/^https?:\/\//i.test(real))return;
const sn=res?res.querySelector('.result__snippet'):null;
out.push({title:(a.textContent||'').trim(),url:real,snip:sn?(sn.textContent||'').trim():''});
});
}catch(e){}
return out.slice(0,20);
}
function sfParsePage(html,base){
let title='';
try{const doc0=new DOMParser().parseFromString(html,'text/html');const t0=doc0.querySelector('title');if(t0)title=(t0.textContent||'').trim()}catch(e){}
let paras=[],imgs=[];
try{
const doc=new DOMParser().parseFromString(html,'text/html');
doc.querySelectorAll('script,style,noscript,iframe,svg,footer,header,nav,form,aside').forEach(e=>{e.remove()});
const root=doc.querySelector('article')||doc.querySelector('main')||doc.body;
if(root){
paras=[...root.querySelectorAll('p')].map(p=>(p.textContent||'').replace(/\s+/g,' ').trim()).filter(t=>t.length>50).slice(0,30);
if(!paras.length){const t=(root.textContent||'').replace(/\s+/g,' ').trim();if(t.length>80)paras=[t.slice(0,3000)]}
const seen={};
[...root.querySelectorAll('img')].forEach(im=>{
const s=im.getAttribute('src');if(!s||s.indexOf('data:')===0||s.indexOf('blob:')===0)return;
let abs='';try{abs=new URL(s,base).href}catch(e){return}
const w=parseInt(im.getAttribute('width')||'0',10);if(w&&w<80)return;
if(seen[abs])return;seen[abs]=1;imgs.push(abs);
});
}
}catch(e){}
return {title:title||sfHost(base),paras:paras.slice(0,25),imgs:imgs.slice(0,6)};
}
async function sfSearch(q,tab){
tab=tab||sfTab();if(!tab)return;
S.safari.overview=false;
sfPushHist(tab,'search:'+q,'بحث: '+q,'loading',{mode:'search',q:q});
sfApplyEntry(tab,tab.hist[tab.hi]);sfRender();
try{
const html=await sfGet('https://html.duckduckgo.com/html/?q='+encodeURIComponent(q));
const res=sfParseResults(html);
const e2={url:'search:'+q,title:'بحث: '+q,kind:'results',data:{mode:'search',q:q,results:res}};
tab.hist[tab.hi]=e2;sfApplyEntry(tab,e2);
}catch(err){
const e2={url:'search:'+q,title:'بحث: '+q,kind:'error',data:{mode:'search',q:q,msg:String((err&&err.message)||err)}};
tab.hist[tab.hi]=e2;sfApplyEntry(tab,e2);
}
sfRender();
}
async function sfLoad(url,tab){
tab=tab||sfTab();if(!tab)return;
S.safari.overview=false;
sfPushHist(tab,url,sfHost(url),'loading',{mode:'page'});
sfApplyEntry(tab,tab.hist[tab.hi]);sfRender();
try{
const html=await sfGet(url);
const d=sfParsePage(html,url);
const e2={url:url,title:d.title||sfHost(url),kind:'page',data:d};
tab.hist[tab.hi]=e2;sfApplyEntry(tab,e2);sfHistAdd(url,e2.title);
}catch(err){
const e2={url:url,title:sfHost(url),kind:'error',data:{mode:'page',msg:String((err&&err.message)||err)}};
tab.hist[tab.hi]=e2;sfApplyEntry(tab,e2);
}
sfRender();
}
function sfGo(v,tab){
v=(v||'').trim();if(!v)return;
tab=tab||sfTab();if(!tab)return;
S.safari.overview=false;
if(/\s/.test(v)||v.indexOf('.')<0){sfSearch(v,tab);return}
let url=v;
if(!/^https?:\/\//i.test(url))url='https://'+url;
sfLoad(url,tab);
}
function sfBack(){const t=sfTab();if(t&&t.hi>0){t.hi--;sfApplyEntry(t,t.hist[t.hi]);sfRender()}}
function sfFwd(){const t=sfTab();if(t&&t.hi<t.hist.length-1){t.hi++;sfApplyEntry(t,t.hist[t.hi]);sfRender()}}
function sfNewTab(url){
const id='t'+(S.safari.seq++);
const tab={id:id,title:'تبويب جديد',url:'',kind:'start',data:null,hist:[],hi:-1};
S.safari.tabs.push(tab);S.safari.active=S.safari.tabs.length-1;S.safari.overview=false;
if(url)sfGo(url,tab);else sfRender();
return tab;
}
function sfCloseTab(id){
const i=S.safari.tabs.findIndex(t=>t.id===id);if(i<0)return;
S.safari.tabs.splice(i,1);
if(!S.safari.tabs.length){sfNewTab();return}
if(S.safari.active>=S.safari.tabs.length)S.safari.active=S.safari.tabs.length-1;
sfRender();
}
function sfStartHTML(){
const favs=S.sfFav||[];const freq=sfFrequent();const read=S.sfRead||[];
let h='<div style="padding:18px 14px;max-width:560px;margin:0 auto">';
h+='<div style="font-size:32px;font-weight:800;margin:6px 0 2px">تصفح</div>';
h+='<p class="mut" style="margin:0 0 6px;font-size:13px">متصفح حقيقي — ابحث أو اكتب رابط بالأعلى</p>';
h+='<div style="font-weight:700;font-size:15px;margin:14px 0 8px">المفضلة</div>';
h+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">';
h+=favs.map((f,i)=>'<div data-sffav="'+i+'" style="cursor:pointer;text-align:center"><img loading="lazy" src="https://www.google.com/s2/favicons?domain='+sfA(sfHost(f.url))+'&sz=64" style="width:52px;height:52px;border-radius:12px;background:#f2f2f7;box-shadow:0 1px 4px rgba(0,0,0,.1)" onerror="this.style.display=\'none\'"><div style="font-size:11px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+escH(f.title)+'</div></div>').join('');
h+='</div>';
if(freq.length){
h+='<div style="font-weight:700;font-size:15px;margin:18px 0 8px">تُزار كثيراً</div>';
h+=freq.map((f,i)=>'<div data-sffreq="'+i+'" class="card row" style="cursor:pointer;align-items:center;gap:10px"><img loading="lazy" src="https://www.google.com/s2/favicons?domain='+sfA(f.host)+'&sz=64" style="width:30px;height:30px;border-radius:8px" onerror="this.style.display=\'none\'"><span style="flex:1;min-width:0"><b style="font-size:13.5px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+escH(f.title)+'</b><span class="mut" style="font-size:11.5px">'+escH(f.host)+'</span></span></div>').join('');
}
if(read.length){
h+='<div style="font-weight:700;font-size:15px;margin:18px 0 8px">قائمة القراءة</div>';
h+=read.map((r,i)=>'<div data-sfread="'+i+'" class="card" style="cursor:pointer"><b style="font-size:13.5px">'+escH(r.title)+'</b><br><span class="mut" style="font-size:11.5px">'+escH(sfHost(r.url))+'</span></div>').join('');
}
h+='<button class="btn gray" id="sfClearHist" style="margin-top:20px;width:100%;padding:11px">مسح سجل التصفح</button>';
return h+'</div>';
}
function sfResultsHTML(t){
const d=t.data||{q:'',results:[]};
let h='<div style="padding:14px;max-width:640px;margin:0 auto">';
h+='<div class="mut" style="font-size:12px;margin-bottom:10px">نتائج البحث عن: <b style="color:#111">'+escH(d.q)+'</b></div>';
if(!(d.results||[]).length)h+='<div class="card" style="text-align:center;padding:24px"><div class="big">لا نتائج</div><p class="mut">جرّب كلمات ثانية</p></div>';
h+=(d.results||[]).map((r,i)=>'<div class="card" data-sfres="'+i+'" style="cursor:pointer"><div style="font-size:15px;font-weight:700;color:#1a0dab">'+escH(r.title)+'</div><div style="font-size:12px;color:#0a7d2c;margin:2px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr;text-align:right">'+escH(r.url)+'</div>'+(r.snip?'<div class="mut" style="font-size:12.5px;line-height:1.7">'+escH(r.snip)+'</div>':'')+'</div>').join('');
return h+'</div>';
}
function sfPageHTML(t){
const d=t.data||{title:t.title,paras:[],imgs:[]};
let h='<div style="max-width:640px;margin:0 auto;padding:0 0 20px">';
h+='<div style="padding:16px 14px 8px"><div style="font-size:21px;font-weight:800;line-height:1.5">'+escH(d.title)+'</div><div class="mut" style="font-size:12px;margin-top:4px;direction:ltr;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+escH(t.url)+'</div></div>';
if(d.imgs&&d.imgs.length)h+='<img loading="lazy" src="'+sfA(d.imgs[0])+'" style="width:100%;max-height:260px;object-fit:cover" onerror="this.remove()">';
h+='<div style="padding:12px 16px;font-size:15.5px;line-height:2;color:#1d1d1f">';
(d.paras||[]).forEach(p=>{h+='<p style="margin:0 0 14px">'+escH(p)+'</p>'});
if(!(d.paras||[]).length)h+='<p class="mut">ما قدرت أستخرج نص من هالصفحة.</p>';
h+='</div>';
if(d.imgs&&d.imgs.length>1){
h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:0 14px">'+d.imgs.slice(1).map(u=>'<img loading="lazy" src="'+sfA(u)+'" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px" onerror="this.remove()">').join('')+'</div>';
}
return h+'</div>';
}
function sfLoadingHTML(t){
const q=(t.data&&t.data.q)||t.url||'';
return '<div style="text-align:center;padding:80px 20px"><span class="sfSpin" style="width:30px;height:30px;border-width:3px"></span><div class="mut" style="margin-top:14px;font-size:13px">جاري التحميل…</div><div class="mut" style="font-size:11.5px;margin-top:4px;direction:ltr;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:300px;margin-inline:auto">'+escH(String(q)).slice(0,60)+'</div></div>';
}
function sfErrorHTML(t){
return '<div style="padding:60px 24px;text-align:center;max-width:420px;margin:0 auto"><div style="margin-bottom:10px">'+si('globe',20,'#8e8e93',44)+'</div><div class="big" style="font-size:17px">تعذر فتح الصفحة</div><p class="mut" style="font-size:13px;line-height:1.9">تحقق من الاتصال بالإنترنت وحاول مرة ثانية.</p><button class="btn" id="sfRetry" style="padding:11px 30px">إعادة المحاولة</button></div>';
}
function sfOverviewHTML(){
let h='<div style="padding:16px 12px"><div style="font-weight:800;font-size:18px;margin-bottom:12px">التبويبات <span class="mut">'+arabNum(S.safari.tabs.length)+'</span></div>';
h+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">';
h+=S.safari.tabs.map((t,i)=>'<div data-sftab="'+sfA(t.id)+'" style="cursor:pointer;background:#f2f2f7;border-radius:12px;padding:12px;position:relative;min-height:110px;'+(i===S.safari.active?'outline:2.5px solid #0a84ff':'')+'"><button data-sfclose="'+sfA(t.id)+'" style="position:absolute;top:6px;left:6px;background:rgba(120,120,128,.28);border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;display:flex;align-items:center;justify-content:center">'+si('x',20,'#333',14)+'</button><div style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:26px">'+escH(t.title||'تبويب جديد')+'</div><div class="mut" style="font-size:11px;direction:ltr;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:4px">'+escH(t.url||'')+'</div></div>').join('');
h+='<div data-sfnewtab="1" style="cursor:pointer;border:2px dashed #c7c7cc;border-radius:12px;min-height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#8e8e93">'+si('plus',20,'#8e8e93',30)+'<span style="font-size:12.5px">تبويب جديد</span></div>';
return h+'</div></div>';
}
function sfCopy(txt){
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(()=>toast('اننسخ الرابط')).catch(()=>toast('تعذر النسخ'))}
else{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('اننسخ الرابط')}catch(e){toast('تعذر النسخ')}ta.remove()}
}
function sfFavToggle(url,title){
S.sfFav=S.sfFav||[];
const i=S.sfFav.findIndex(f=>f.url===url);
if(i>=0){S.sfFav.splice(i,1);toast('انشالت من المفضلة')}
else{S.sfFav.push({url:url,title:title||sfHost(url)});toast('انضافت للمفضلة')}
store.set('sfFav',S.sfFav);
}
function sfReadAdd(url,title){
S.sfRead=S.sfRead||[];
if(!S.sfRead.some(r=>r.url===url)){S.sfRead.unshift({url:url,title:title||sfHost(url),ts:Date.now()});if(S.sfRead.length>40)S.sfRead.pop();store.set('sfRead',S.sfRead)}
}
function sfShareSheet(el){
const t=sfTab();if(!t||!/^https?:\/\//i.test(t.url||'')){toast('لا رابط للمشاركة');return}
const old=el.querySelector('#sfSheet');if(old)old.remove();
const isFav=(S.sfFav||[]).some(f=>f.url===t.url);
const sh=document.createElement('div');sh.id='sfSheet';
sh.style.cssText='position:absolute;inset:0;z-index:50;display:flex;align-items:flex-end;background:rgba(0,0,0,.35)';
sh.innerHTML='<div style="width:100%;background:#f2f2f7;border-radius:16px 16px 0 0;padding:10px 14px 26px">'+
'<div class="mut" style="text-align:center;font-size:12px;margin:6px 0 10px;direction:ltr;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+escH(t.url)+'</div>'+
'<button class="btn" id="sfShCopy" style="width:100%;margin-bottom:8px;padding:12px">نسخ الرابط</button>'+
'<button class="btn gray" id="sfShFav" style="width:100%;margin-bottom:8px;padding:12px">'+(isFav?'إزالة من المفضلة':'أضف للمفضلة')+'</button>'+
'<button class="btn gray" id="sfShRead" style="width:100%;margin-bottom:8px;padding:12px">أضف لقائمة القراءة</button>'+
'<button class="btn gray" id="sfShX" style="width:100%;padding:12px">إلغاء</button></div>';
if(getComputedStyle(el).position==='static')el.style.position='relative';
el.appendChild(sh);
sh.addEventListener('click',e=>{if(e.target===sh)sh.remove()});
sh.querySelector('#sfShX').addEventListener('click',()=>sh.remove());
sh.querySelector('#sfShCopy').addEventListener('click',()=>{sfCopy(t.url);sh.remove()});
sh.querySelector('#sfShFav').addEventListener('click',()=>{sfFavToggle(t.url,t.title);sh.remove();sfRender()});
sh.querySelector('#sfShRead').addEventListener('click',()=>{sfReadAdd(t.url,t.title);sh.remove();toast('انضافت لقائمة القراءة')});
}
function sfWireView(view,t){
view.querySelectorAll('[data-sfres]').forEach(n=>n.addEventListener('click',()=>{const r=((t.data||{}).results||[])[+n.dataset.sfres];if(r)sfLoad(r.url)}));
view.querySelectorAll('[data-sffav]').forEach(n=>n.addEventListener('click',()=>{const f=(S.sfFav||[])[+n.dataset.sffav];if(f)sfGo(f.url)}));
view.querySelectorAll('[data-sffreq]').forEach(n=>n.addEventListener('click',()=>{const f=sfFrequent()[+n.dataset.sffreq];if(f)sfLoad(f.url)}));
view.querySelectorAll('[data-sfread]').forEach(n=>n.addEventListener('click',()=>{const r=(S.sfRead||[])[+n.dataset.sfread];if(r)sfLoad(r.url)}));
const ch=view.querySelector('#sfClearHist');
if(ch)ch.addEventListener('click',()=>{const ok=(typeof confirm==='function')?confirm('مسح سجل التصفح؟'):true;if(ok){S.sfHist=[];store.set('sfHist',[]);sfRender()}});
const rt=view.querySelector('#sfRetry');
if(rt)rt.addEventListener('click',()=>{const d=t.data||{};if(d.mode==='search')sfSearch(d.q,t);else if(t.url&&!/^search:/.test(t.url||''))sfLoad(t.url,t)});
}
function sfWireOverview(view){
view.querySelectorAll('[data-sfclose]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();sfCloseTab(b.dataset.sfclose)}));
view.querySelectorAll('[data-sftab]').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('[data-sfclose]'))return;const i=S.safari.tabs.findIndex(t=>t.id===c.dataset.sftab);if(i>=0){S.safari.active=i;S.safari.overview=false;sfRender()}}));
const nt=view.querySelector('[data-sfnewtab]');if(nt)nt.addEventListener('click',()=>sfNewTab());
}
function sfRender(){
const view=$('#sfView');if(!view)return;
const t=sfTab();
const bk=$('#sfBack'),fw=$('#sfFwd'),addr=$('#sfAddr'),spin=$('#sfSpin');
if(bk)bk.style.opacity=(t&&t.hi>0)?1:.3;
if(fw)fw.style.opacity=(t&&t.hi<t.hist.length-1)?1:.3;
if(addr&&document.activeElement!==addr){
const isUrl=/^https?:\/\//i.test((t&&t.url)||'');
addr.value=isUrl?t.url:'';
}
if(spin)spin.style.display=(t&&t.kind==='loading')?'inline-block':'none';
if(S.safari.overview){view.innerHTML=sfOverviewHTML();sfWireOverview(view);return}
if(!t){view.innerHTML='';return}
if(t.kind==='start')view.innerHTML=sfStartHTML();
else if(t.kind==='results')view.innerHTML=sfResultsHTML(t);
else if(t.kind==='page')view.innerHTML=sfPageHTML(t);
else if(t.kind==='loading')view.innerHTML=sfLoadingHTML(t);
else if(t.kind==='error')view.innerHTML=sfErrorHTML(t);
else view.innerHTML=sfStartHTML();
sfWireView(view,t);
view.scrollTop=0;
}
function appSafari(el){
sfInit();
el.innerHTML=
'<div id="sfRoot" style="display:flex;flex-direction:column;height:100%">'+
'<div id="sfView" style="flex:1;overflow-y:auto;min-height:0;-webkit-overflow-scrolling:touch;background:#fff"></div>'+
'<div id="sfBar" style="display:flex;align-items:center;gap:2px;padding:8px 8px 14px;background:rgba(248,248,248,.95);border-top:1px solid #d9d9de">'+
'<button id="sfBack" class="sfBtn" style="min-width:36px">'+si('chevron-right',20,'#0a84ff',24)+'</button>'+
'<button id="sfFwd" class="sfBtn" style="min-width:36px">'+si('chevron-left',20,'#0a84ff',24)+'</button>'+
'<button id="sfShare" class="sfBtn" style="min-width:36px">'+si('share',20,'#0a84ff',22)+'</button>'+
'<div style="flex:1;display:flex;align-items:center;gap:6px;background:#e3e3e8;border-radius:10px;padding:7px 12px;min-width:0">'+
'<span id="sfSpin" class="sfSpin" style="display:none"></span>'+
'<input id="sfAddr" enterkeyhint="go" style="flex:1;min-width:0;border:none;background:none;outline:none;font-size:13.5px;text-align:center;font-family:inherit;color:#111" placeholder="بحث أو أدخل موقع">'+
'</div>'+
'<button id="sfTabs" class="sfBtn" style="min-width:36px">'+si('copy',20,'#0a84ff',22)+'</button>'+
'<button id="sfPlus" class="sfBtn" style="min-width:36px">'+si('plus',20,'#0a84ff',24)+'</button>'+
'</div></div>'+
'<style>'+
'.sfBtn{background:none;border:none;padding:6px;cursor:pointer;display:flex;align-items:center;justify-content:center}'+
'.sfSpin{width:14px;height:14px;border-radius:50%;border:2px solid #c7c7cc;border-top-color:#0a84ff;animation:sfRot .7s linear infinite;flex:none}'+
'@keyframes sfRot{to{transform:rotate(360deg)}}'+
'#ipad.dark #sfBar{background:rgba(28,28,30,.95);border-top-color:#38383a}'+
'#ipad.dark #sfBar>div{background:#38383a}'+
'#ipad.dark #sfAddr{color:#fff}'+
'</style>';
el.querySelector('#sfBack').addEventListener('click',sfBack);
el.querySelector('#sfFwd').addEventListener('click',sfFwd);
el.querySelector('#sfShare').addEventListener('click',()=>sfShareSheet(el));
el.querySelector('#sfTabs').addEventListener('click',()=>{S.safari.overview=!S.safari.overview;sfRender()});
el.querySelector('#sfPlus').addEventListener('click',()=>sfNewTab());
const addr=el.querySelector('#sfAddr');
addr.addEventListener('keydown',e=>{if(e.key==='Enter'){addr.blur();sfGo(addr.value)}});
addr.addEventListener('focus',()=>{setTimeout(()=>{try{addr.select()}catch(e){}},50)});
if(!S.safari.tabs.length)sfNewTab();else sfRender();
}
