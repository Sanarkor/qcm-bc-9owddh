/* « Erreurs » : mémorise localement (localStorage) chaque question ratée, sur toutes les pages corrigées du site. */
(function(){
var K="qcmbc:erreurs";
function ld(){try{return JSON.parse(localStorage.getItem(K)||"{}")||{};}catch(e){return {};}}
function sv(o){try{localStorage.setItem(K,JSON.stringify(o));}catch(e){}}
function nk(s){return String(s||"").replace(/^\s*Q?\d+\.\s*/,"").replace(/\s+/g," ").trim();}
var api={key:nk,load:ld,save:sv,
add:function(q){var k=nk(q.s);if(!k||!q.a||!q.o||q.o.length<2)return;var o=ld(),x=o[k]||{n:0};x.s=k;x.o=q.o;x.a=q.a;if(q.e)x.e=q.e;if(q.t)x.t=q.t;if(q.p)x.p=q.p;x.n=(x.n||0)+1;x.d=Date.now();o[k]=x;sv(o);},
del:function(s){var o=ld();delete o[nk(s)];sv(o);},
clear:function(){try{localStorage.removeItem(K);}catch(e){}},
count:function(){return Object.keys(ld()).length;}};
window.QERR=api;
if(window.QERR_NOAUTO)return;
var seen={},fm=(location.pathname.match(/\/(\d\d)_[^\/]*$/)||[])[1],PT=fm?parseInt(fm,10):null;
function txt(el){return el?el.textContent.replace(/\s+/g," ").trim():"";}
function num(d){var m=(d.id||"").match(/^q(\d+)$/);return m?parseInt(m[1],10)-1:-1;}
function fromDiv(d){
if(!d.querySelector("input:checked"))return;
var k=nk(txt(d.querySelector(".s")));if(!k||seen[k])return;seen[k]=1;
var P=window.POOL_DATA,S=window.st,i=num(d);
if(P&&S&&S.qs&&i>=0&&S.qs[i]&&P.q[S.qs[i].i]){var q=P.q[S.qs[i].i];api.add({s:q.s,o:q.o,a:q.a,e:q.e,t:q.t,p:location.pathname});return;}
var o=[];d.querySelectorAll("label").forEach(function(l){o.push(txt(l).replace(/^[A-D]\.\s*/,""));});
var a=d.getAttribute("data-a")||"";if(!a&&window.K&&i>=0)a=window.K[i]||"";
var e="";if(window.X&&i>=0)e=window.X[i]||"";
if(!e){var c=d.querySelector(".c");if(c){var t=document.createElement("div");t.innerHTML=c.innerHTML.replace(/<br\s*\/?>/gi," ");e=txt(t).replace(/^(Réponse\s*:\s*[A-D](,\s*[A-D])*\s*|Faux – bonne\(s\) réponse\(s\) : [A-D, ]+\.\s*)/,"");}}
api.add({s:k,o:o,a:a,e:e,t:PT,p:location.pathname});}
try{new MutationObserver(function(ms){ms.forEach(function(m){var t=m.target;if(!t.classList||!t.classList.contains("ko"))return;
var P=window.POOL_DATA,S=window.st;
if(t.id==="fb"){if(P&&S&&S.cur!=null&&!S.qs&&P.q[S.cur]){var tag=S.cur+"/"+S.n;if(seen[tag])return;seen[tag]=1;var q=P.q[S.cur];api.add({s:q.s,o:q.o,a:q.a,e:q.e,t:q.t,p:location.pathname});}return;}
if(t.classList.contains("q"))fromDiv(t);});}).observe(document.body,{attributes:true,attributeFilter:["class"],subtree:true});}catch(e){}
})();
