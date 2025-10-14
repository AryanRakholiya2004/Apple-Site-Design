(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ld(i){const e=Object.create(null);for(const t of i.split(","))e[t]=1;return t=>t in e}const Lt={},Fo=[],ar=()=>{},y_=()=>!1,bu=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Id=i=>i.startsWith("onUpdate:"),Gn=Object.assign,Ud=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},Dx=Object.prototype.hasOwnProperty,yt=(i,e)=>Dx.call(i,e),st=Array.isArray,Ya=i=>Eu(i)==="[object Map]",Lx=i=>Eu(i)==="[object Set]",lt=i=>typeof i=="function",un=i=>typeof i=="string",ma=i=>typeof i=="symbol",jt=i=>i!==null&&typeof i=="object",S_=i=>(jt(i)||lt(i))&&lt(i.then)&&lt(i.catch),Ix=Object.prototype.toString,Eu=i=>Ix.call(i),Ux=i=>Eu(i).slice(8,-1),Nx=i=>Eu(i)==="[object Object]",Nd=i=>un(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,qa=Ld(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),wu=i=>{const e=Object.create(null);return(t=>e[t]||(e[t]=i(t)))},Ox=/-\w/g,ds=wu(i=>i.replace(Ox,e=>e.slice(1).toUpperCase())),Fx=/\B([A-Z])/g,ro=wu(i=>i.replace(Fx,"-$1").toLowerCase()),M_=wu(i=>i.charAt(0).toUpperCase()+i.slice(1)),Yu=wu(i=>i?`on${M_(i)}`:""),Ws=(i,e)=>!Object.is(i,e),qu=(i,...e)=>{for(let t=0;t<i.length;t++)i[t](...e)},T_=(i,e,t,n=!1)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,writable:n,value:t})},Bx=i=>{const e=parseFloat(i);return isNaN(e)?i:e};let Vp;const Au=()=>Vp||(Vp=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ru(i){if(st(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],r=un(n)?Vx(n):Ru(n);if(r)for(const s in r)e[s]=r[s]}return e}else if(un(i)||jt(i))return i}const kx=/;(?![^(]*\))/g,zx=/:([^]+)/,Hx=/\/\*[^]*?\*\//g;function Vx(i){const e={};return i.replace(Hx,"").split(kx).forEach(t=>{if(t){const n=t.split(zx);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Cu(i){let e="";if(un(i))e=i;else if(st(i))for(let t=0;t<i.length;t++){const n=Cu(i[t]);n&&(e+=n+" ")}else if(jt(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}const Gx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Wx=Ld(Gx);function b_(i){return!!i||i===""}/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Yn;class Xx{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Yn,!e&&Yn&&(this.index=(Yn.scopes||(Yn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Yn;try{return Yn=this,e()}finally{Yn=t}}}on(){++this._on===1&&(this.prevScope=Yn,Yn=this)}off(){this._on>0&&--this._on===0&&(Yn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Yx(){return Yn}let Dt;const Ku=new WeakSet;class E_{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Yn&&Yn.active&&Yn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ku.has(this)&&(Ku.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||A_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Gp(this),R_(this);const e=Dt,t=Hi;Dt=this,Hi=!0;try{return this.fn()}finally{C_(this),Dt=e,Hi=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Bd(e);this.deps=this.depsTail=void 0,Gp(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ku.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){nh(this)&&this.run()}get dirty(){return nh(this)}}let w_=0,Ka,ja;function A_(i,e=!1){if(i.flags|=8,e){i.next=ja,ja=i;return}i.next=Ka,Ka=i}function Od(){w_++}function Fd(){if(--w_>0)return;if(ja){let e=ja;for(ja=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let i;for(;Ka;){let e=Ka;for(Ka=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(n){i||(i=n)}e=t}}if(i)throw i}function R_(i){for(let e=i.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function C_(i){let e,t=i.depsTail,n=t;for(;n;){const r=n.prevDep;n.version===-1?(n===t&&(t=r),Bd(n),qx(n)):e=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=r}i.deps=e,i.depsTail=t}function nh(i){for(let e=i.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(P_(e.dep.computed)||e.dep.version!==e.version))return!0;return!!i._dirty}function P_(i){if(i.flags&4&&!(i.flags&16)||(i.flags&=-17,i.globalVersion===gl)||(i.globalVersion=gl,!i.isSSR&&i.flags&128&&(!i.deps&&!i._dirty||!nh(i))))return;i.flags|=2;const e=i.dep,t=Dt,n=Hi;Dt=i,Hi=!0;try{R_(i);const r=i.fn(i._value);(e.version===0||Ws(r,i._value))&&(i.flags|=128,i._value=r,e.version++)}catch(r){throw e.version++,r}finally{Dt=t,Hi=n,C_(i),i.flags&=-3}}function Bd(i,e=!1){const{dep:t,prevSub:n,nextSub:r}=i;if(n&&(n.nextSub=r,i.prevSub=void 0),r&&(r.prevSub=n,i.nextSub=void 0),t.subs===i&&(t.subs=n,!n&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Bd(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function qx(i){const{prevDep:e,nextDep:t}=i;e&&(e.nextDep=t,i.prevDep=void 0),t&&(t.prevDep=e,i.nextDep=void 0)}let Hi=!0;const D_=[];function Fr(){D_.push(Hi),Hi=!1}function Br(){const i=D_.pop();Hi=i===void 0?!0:i}function Gp(i){const{cleanup:e}=i;if(i.cleanup=void 0,e){const t=Dt;Dt=void 0;try{e()}finally{Dt=t}}}let gl=0;class Kx{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class L_{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Dt||!Hi||Dt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Dt)t=this.activeLink=new Kx(Dt,this),Dt.deps?(t.prevDep=Dt.depsTail,Dt.depsTail.nextDep=t,Dt.depsTail=t):Dt.deps=Dt.depsTail=t,I_(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const n=t.nextDep;n.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=n),t.prevDep=Dt.depsTail,t.nextDep=void 0,Dt.depsTail.nextDep=t,Dt.depsTail=t,Dt.deps===t&&(Dt.deps=n)}return t}trigger(e){this.version++,gl++,this.notify(e)}notify(e){Od();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Fd()}}}function I_(i){if(i.dep.sc++,i.sub.flags&4){const e=i.dep.computed;if(e&&!i.dep.subs){e.flags|=20;for(let n=e.deps;n;n=n.nextDep)I_(n)}const t=i.dep.subs;t!==i&&(i.prevSub=t,t&&(t.nextSub=i)),i.dep.subs=i}}const ih=new WeakMap,Xs=Symbol(""),rh=Symbol(""),_l=Symbol("");function xn(i,e,t){if(Hi&&Dt){let n=ih.get(i);n||ih.set(i,n=new Map);let r=n.get(t);r||(n.set(t,r=new L_),r.map=n,r.key=t),r.track()}}function Rr(i,e,t,n,r,s){const o=ih.get(i);if(!o){gl++;return}const a=l=>{l&&l.trigger()};if(Od(),e==="clear")o.forEach(a);else{const l=st(i),c=l&&Nd(t);if(l&&t==="length"){const u=Number(n);o.forEach((f,h)=>{(h==="length"||h===_l||!ma(h)&&h>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(_l)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Xs)),Ya(i)&&a(o.get(rh)));break;case"delete":l||(a(o.get(Xs)),Ya(i)&&a(o.get(rh)));break;case"set":Ya(i)&&a(o.get(Xs));break}}Fd()}function lo(i){const e=Et(i);return e===i?e:(xn(e,"iterate",_l),lr(i)?e:e.map(fi))}function kd(i){return xn(i=Et(i),"iterate",_l),i}const jx={__proto__:null,[Symbol.iterator](){return ju(this,Symbol.iterator,fi)},concat(...i){return lo(this).concat(...i.map(e=>st(e)?lo(e):e))},entries(){return ju(this,"entries",i=>(i[1]=fi(i[1]),i))},every(i,e){return _r(this,"every",i,e,void 0,arguments)},filter(i,e){return _r(this,"filter",i,e,t=>t.map(fi),arguments)},find(i,e){return _r(this,"find",i,e,fi,arguments)},findIndex(i,e){return _r(this,"findIndex",i,e,void 0,arguments)},findLast(i,e){return _r(this,"findLast",i,e,fi,arguments)},findLastIndex(i,e){return _r(this,"findLastIndex",i,e,void 0,arguments)},forEach(i,e){return _r(this,"forEach",i,e,void 0,arguments)},includes(...i){return $u(this,"includes",i)},indexOf(...i){return $u(this,"indexOf",i)},join(i){return lo(this).join(i)},lastIndexOf(...i){return $u(this,"lastIndexOf",i)},map(i,e){return _r(this,"map",i,e,void 0,arguments)},pop(){return Ma(this,"pop")},push(...i){return Ma(this,"push",i)},reduce(i,...e){return Wp(this,"reduce",i,e)},reduceRight(i,...e){return Wp(this,"reduceRight",i,e)},shift(){return Ma(this,"shift")},some(i,e){return _r(this,"some",i,e,void 0,arguments)},splice(...i){return Ma(this,"splice",i)},toReversed(){return lo(this).toReversed()},toSorted(i){return lo(this).toSorted(i)},toSpliced(...i){return lo(this).toSpliced(...i)},unshift(...i){return Ma(this,"unshift",i)},values(){return ju(this,"values",fi)}};function ju(i,e,t){const n=kd(i),r=n[e]();return n!==i&&!lr(i)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const $x=Array.prototype;function _r(i,e,t,n,r,s){const o=kd(i),a=o!==i&&!lr(i),l=o[e];if(l!==$x[e]){const f=l.apply(i,s);return a?fi(f):f}let c=t;o!==i&&(a?c=function(f,h){return t.call(this,fi(f),h,i)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,i)}));const u=l.call(o,c,n);return a&&r?r(u):u}function Wp(i,e,t,n){const r=kd(i);let s=t;return r!==i&&(lr(i)?t.length>3&&(s=function(o,a,l){return t.call(this,o,a,l,i)}):s=function(o,a,l){return t.call(this,o,fi(a),l,i)}),r[e](s,...n)}function $u(i,e,t){const n=Et(i);xn(n,"iterate",_l);const r=n[e](...t);return(r===-1||r===!1)&&Gd(t[0])?(t[0]=Et(t[0]),n[e](...t)):r}function Ma(i,e,t=[]){Fr(),Od();const n=Et(i)[e].apply(i,t);return Fd(),Br(),n}const Zx=Ld("__proto__,__v_isRef,__isVue"),U_=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(ma));function Jx(i){ma(i)||(i=String(i));const e=Et(this);return xn(e,"has",i),e.hasOwnProperty(i)}class N_{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return n===(r?s?ly:k_:s?B_:F_).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=st(e);if(!r){let l;if(o&&(l=jx[t]))return l;if(t==="hasOwnProperty")return Jx}const a=Reflect.get(e,t,zn(e)?e:n);if((ma(t)?U_.has(t):Zx(t))||(r||xn(e,"get",t),s))return a;if(zn(a)){const l=o&&Nd(t)?a:a.value;return r&&jt(l)?oh(l):l}return jt(a)?r?oh(a):Hd(a):a}}class O_ extends N_{constructor(e=!1){super(!1,e)}set(e,t,n,r){let s=e[t];if(!this._isShallow){const l=jo(s);if(!lr(n)&&!jo(n)&&(s=Et(s),n=Et(n)),!st(e)&&zn(s)&&!zn(n))return l||(s.value=n),!0}const o=st(e)&&Nd(t)?Number(t)<e.length:yt(e,t),a=Reflect.set(e,t,n,zn(e)?e:r);return e===Et(r)&&(o?Ws(n,s)&&Rr(e,"set",t,n):Rr(e,"add",t,n)),a}deleteProperty(e,t){const n=yt(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Rr(e,"delete",t,void 0),r}has(e,t){const n=Reflect.has(e,t);return(!ma(t)||!U_.has(t))&&xn(e,"has",t),n}ownKeys(e){return xn(e,"iterate",st(e)?"length":Xs),Reflect.ownKeys(e)}}class Qx extends N_{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const ey=new O_,ty=new Qx,ny=new O_(!0);const sh=i=>i,Xl=i=>Reflect.getPrototypeOf(i);function iy(i,e,t){return function(...n){const r=this.__v_raw,s=Et(r),o=Ya(s),a=i==="entries"||i===Symbol.iterator&&o,l=i==="keys"&&o,c=r[i](...n),u=t?sh:e?ah:fi;return!e&&xn(s,"iterate",l?rh:Xs),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Yl(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function ry(i,e){const t={get(r){const s=this.__v_raw,o=Et(s),a=Et(r);i||(Ws(r,a)&&xn(o,"get",r),xn(o,"get",a));const{has:l}=Xl(o),c=e?sh:i?ah:fi;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!i&&xn(Et(r),"iterate",Xs),r.size},has(r){const s=this.__v_raw,o=Et(s),a=Et(r);return i||(Ws(r,a)&&xn(o,"has",r),xn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=Et(a),c=e?sh:i?ah:fi;return!i&&xn(l,"iterate",Xs),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Gn(t,i?{add:Yl("add"),set:Yl("set"),delete:Yl("delete"),clear:Yl("clear")}:{add(r){!e&&!lr(r)&&!jo(r)&&(r=Et(r));const s=Et(this);return Xl(s).has.call(s,r)||(s.add(r),Rr(s,"add",r,r)),this},set(r,s){!e&&!lr(s)&&!jo(s)&&(s=Et(s));const o=Et(this),{has:a,get:l}=Xl(o);let c=a.call(o,r);c||(r=Et(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?Ws(s,u)&&Rr(o,"set",r,s):Rr(o,"add",r,s),this},delete(r){const s=Et(this),{has:o,get:a}=Xl(s);let l=o.call(s,r);l||(r=Et(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&Rr(s,"delete",r,void 0),c},clear(){const r=Et(this),s=r.size!==0,o=r.clear();return s&&Rr(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=iy(r,i,e)}),t}function zd(i,e){const t=ry(i,e);return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(yt(t,r)&&r in n?t:n,r,s)}const sy={get:zd(!1,!1)},oy={get:zd(!1,!0)},ay={get:zd(!0,!1)};const F_=new WeakMap,B_=new WeakMap,k_=new WeakMap,ly=new WeakMap;function cy(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function uy(i){return i.__v_skip||!Object.isExtensible(i)?0:cy(Ux(i))}function Hd(i){return jo(i)?i:Vd(i,!1,ey,sy,F_)}function fy(i){return Vd(i,!1,ny,oy,B_)}function oh(i){return Vd(i,!0,ty,ay,k_)}function Vd(i,e,t,n,r){if(!jt(i)||i.__v_raw&&!(e&&i.__v_isReactive))return i;const s=uy(i);if(s===0)return i;const o=r.get(i);if(o)return o;const a=new Proxy(i,s===2?n:t);return r.set(i,a),a}function $a(i){return jo(i)?$a(i.__v_raw):!!(i&&i.__v_isReactive)}function jo(i){return!!(i&&i.__v_isReadonly)}function lr(i){return!!(i&&i.__v_isShallow)}function Gd(i){return i?!!i.__v_raw:!1}function Et(i){const e=i&&i.__v_raw;return e?Et(e):i}function hy(i){return!yt(i,"__v_skip")&&Object.isExtensible(i)&&T_(i,"__v_skip",!0),i}const fi=i=>jt(i)?Hd(i):i,ah=i=>jt(i)?oh(i):i;function zn(i){return i?i.__v_isRef===!0:!1}function dy(i){return zn(i)?i.value:i}const py={get:(i,e,t)=>e==="__v_raw"?i:dy(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const r=i[e];return zn(r)&&!zn(t)?(r.value=t,!0):Reflect.set(i,e,t,n)}};function z_(i){return $a(i)?i:new Proxy(i,py)}class my{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new L_(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=gl-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&Dt!==this)return A_(this,!0),!0}get value(){const e=this.dep.track();return P_(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function gy(i,e,t=!1){let n,r;return lt(i)?n=i:(n=i.get,r=i.set),new my(n,r,t)}const ql={},eu=new WeakMap;let Is;function _y(i,e=!1,t=Is){if(t){let n=eu.get(t);n||eu.set(t,n=[]),n.push(i)}}function vy(i,e,t=Lt){const{immediate:n,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,c=v=>r?v:lr(v)||r===!1||r===0?es(v,1):es(v);let u,f,h,d,g=!1,_=!1;if(zn(i)?(f=()=>i.value,g=lr(i)):$a(i)?(f=()=>c(i),g=!0):st(i)?(_=!0,g=i.some(v=>$a(v)||lr(v)),f=()=>i.map(v=>{if(zn(v))return v.value;if($a(v))return c(v);if(lt(v))return l?l(v,2):v()})):lt(i)?e?f=l?()=>l(i,2):i:f=()=>{if(h){Fr();try{h()}finally{Br()}}const v=Is;Is=u;try{return l?l(i,3,[d]):i(d)}finally{Is=v}}:f=ar,e&&r){const v=f,E=r===!0?1/0:r;f=()=>es(v(),E)}const m=Yx(),p=()=>{u.stop(),m&&m.active&&Ud(m.effects,u)};if(s&&e){const v=e;e=(...E)=>{v(...E),p()}}let b=_?new Array(i.length).fill(ql):ql;const S=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(e){const E=u.run();if(r||g||(_?E.some((C,R)=>Ws(C,b[R])):Ws(E,b))){h&&h();const C=Is;Is=u;try{const R=[E,b===ql?void 0:_&&b[0]===ql?[]:b,d];b=E,l?l(e,3,R):e(...R)}finally{Is=C}}}else u.run()};return a&&a(S),u=new E_(f),u.scheduler=o?()=>o(S,!1):S,d=v=>_y(v,!1,u),h=u.onStop=()=>{const v=eu.get(u);if(v){if(l)l(v,4);else for(const E of v)E();eu.delete(u)}},e?n?S(!0):b=u.run():o?o(S.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function es(i,e=1/0,t){if(e<=0||!jt(i)||i.__v_skip||(t=t||new Map,(t.get(i)||0)>=e))return i;if(t.set(i,e),e--,zn(i))es(i.value,e,t);else if(st(i))for(let n=0;n<i.length;n++)es(i[n],e,t);else if(Lx(i)||Ya(i))i.forEach(n=>{es(n,e,t)});else if(Nx(i)){for(const n in i)es(i[n],e,t);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&es(i[n],e,t)}return i}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kl(i,e,t,n){try{return n?i(...n):i()}catch(r){Pu(r,e,t)}}function fr(i,e,t,n){if(lt(i)){const r=kl(i,e,t,n);return r&&S_(r)&&r.catch(s=>{Pu(s,e,t)}),r}if(st(i)){const r=[];for(let s=0;s<i.length;s++)r.push(fr(i[s],e,t,n));return r}}function Pu(i,e,t,n=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Lt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](i,l,c)===!1)return}a=a.parent}if(s){Fr(),kl(s,null,10,[i,l,c]),Br();return}}xy(i,t,r,n,o)}function xy(i,e,t,n=!0,r=!1){if(r)throw i;console.error(i)}const Un=[];let Ki=-1;const Bo=[];let Jr=null,Co=0;const H_=Promise.resolve();let tu=null;function yy(i){const e=tu||H_;return i?e.then(this?i.bind(this):i):e}function Sy(i){let e=Ki+1,t=Un.length;for(;e<t;){const n=e+t>>>1,r=Un[n],s=vl(r);s<i||s===i&&r.flags&2?e=n+1:t=n}return e}function Wd(i){if(!(i.flags&1)){const e=vl(i),t=Un[Un.length-1];!t||!(i.flags&2)&&e>=vl(t)?Un.push(i):Un.splice(Sy(e),0,i),i.flags|=1,V_()}}function V_(){tu||(tu=H_.then(W_))}function My(i){st(i)?Bo.push(...i):Jr&&i.id===-1?Jr.splice(Co+1,0,i):i.flags&1||(Bo.push(i),i.flags|=1),V_()}function Xp(i,e,t=Ki+1){for(;t<Un.length;t++){const n=Un[t];if(n&&n.flags&2){if(i&&n.id!==i.uid)continue;Un.splice(t,1),t--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function G_(i){if(Bo.length){const e=[...new Set(Bo)].sort((t,n)=>vl(t)-vl(n));if(Bo.length=0,Jr){Jr.push(...e);return}for(Jr=e,Co=0;Co<Jr.length;Co++){const t=Jr[Co];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Jr=null,Co=0}}const vl=i=>i.id==null?i.flags&2?-1:1/0:i.id;function W_(i){try{for(Ki=0;Ki<Un.length;Ki++){const e=Un[Ki];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),kl(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ki<Un.length;Ki++){const e=Un[Ki];e&&(e.flags&=-2)}Ki=-1,Un.length=0,G_(),tu=null,(Un.length||Bo.length)&&W_()}}let ir=null,X_=null;function nu(i){const e=ir;return ir=i,X_=i&&i.type.__scopeId||null,e}function Ty(i,e=ir,t){if(!e||i._n)return i;const n=(...r)=>{n._d&&tm(-1);const s=nu(e);let o;try{o=i(...r)}finally{nu(s),n._d&&tm(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function Ms(i,e,t,n){const r=i.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[n];l&&(Fr(),fr(l,t,8,[i.el,a,i,e]),Br())}}const by=Symbol("_vte"),Ey=i=>i.__isTeleport,wy=Symbol("_leaveCb");function Xd(i,e){i.shapeFlag&6&&i.component?(i.transition=e,Xd(i.component.subTree,e)):i.shapeFlag&128?(i.ssContent.transition=e.clone(i.ssContent),i.ssFallback.transition=e.clone(i.ssFallback)):i.transition=e}function Y_(i){i.ids=[i.ids[0]+i.ids[2]+++"-",0,0]}const iu=new WeakMap;function Za(i,e,t,n,r=!1){if(st(i)){i.forEach((g,_)=>Za(g,e&&(st(e)?e[_]:e),t,n,r));return}if(Ja(n)&&!r){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Za(i,e,t,n.component.subTree);return}const s=n.shapeFlag&4?jd(n.component):n.el,o=r?null:s,{i:a,r:l}=i,c=e&&e.r,u=a.refs===Lt?a.refs={}:a.refs,f=a.setupState,h=Et(f),d=f===Lt?y_:g=>yt(h,g);if(c!=null&&c!==l){if(Yp(e),un(c))u[c]=null,d(c)&&(f[c]=null);else if(zn(c)){c.value=null;const g=e;g.k&&(u[g.k]=null)}}if(lt(l))kl(l,a,12,[o,u]);else{const g=un(l),_=zn(l);if(g||_){const m=()=>{if(i.f){const p=g?d(l)?f[l]:u[l]:l.value;if(r)st(p)&&Ud(p,s);else if(st(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],d(l)&&(f[l]=u[l]);else{const b=[s];l.value=b,i.k&&(u[i.k]=b)}}else g?(u[l]=o,d(l)&&(f[l]=o)):_&&(l.value=o,i.k&&(u[i.k]=o))};if(o){const p=()=>{m(),iu.delete(i)};p.id=-1,iu.set(i,p),ai(p,t)}else Yp(i),m()}}}function Yp(i){const e=iu.get(i);e&&(e.flags|=8,iu.delete(i))}Au().requestIdleCallback;Au().cancelIdleCallback;const Ja=i=>!!i.type.__asyncLoader,q_=i=>i.type.__isKeepAlive;function Ay(i,e){K_(i,"a",e)}function Ry(i,e){K_(i,"da",e)}function K_(i,e,t=On){const n=i.__wdc||(i.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Du(e,n,t),t){let r=t.parent;for(;r&&r.parent;)q_(r.parent.vnode)&&Cy(n,e,t,r),r=r.parent}}function Cy(i,e,t,n){const r=Du(e,i,n,!0);j_(()=>{Ud(n[e],r)},t)}function Du(i,e,t=On,n=!1){if(t){const r=t[i]||(t[i]=[]),s=e.__weh||(e.__weh=(...o)=>{Fr();const a=zl(t),l=fr(e,t,i,o);return a(),Br(),l});return n?r.unshift(s):r.push(s),s}}const Vr=i=>(e,t=On)=>{(!Sl||i==="sp")&&Du(i,(...n)=>e(...n),t)},Py=Vr("bm"),so=Vr("m"),Dy=Vr("bu"),Ly=Vr("u"),Iy=Vr("bum"),j_=Vr("um"),Uy=Vr("sp"),Ny=Vr("rtg"),Oy=Vr("rtc");function Fy(i,e=On){Du("ec",i,e)}const By=Symbol.for("v-ndc"),lh=i=>i?m0(i)?jd(i):lh(i.parent):null,Qa=Gn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>lh(i.parent),$root:i=>lh(i.root),$host:i=>i.ce,$emit:i=>i.emit,$options:i=>Z_(i),$forceUpdate:i=>i.f||(i.f=()=>{Wd(i.update)}),$nextTick:i=>i.n||(i.n=yy.bind(i.proxy)),$watch:i=>oS.bind(i)}),Zu=(i,e)=>i!==Lt&&!i.__isScriptSetup&&yt(i,e),ky={get({_:i},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:n,data:r,props:s,accessCache:o,type:a,appContext:l}=i;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return n[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Zu(n,e))return o[e]=1,n[e];if(r!==Lt&&yt(r,e))return o[e]=2,r[e];if((c=i.propsOptions[0])&&yt(c,e))return o[e]=3,s[e];if(t!==Lt&&yt(t,e))return o[e]=4,t[e];ch&&(o[e]=0)}}const u=Qa[e];let f,h;if(u)return e==="$attrs"&&xn(i.attrs,"get",""),u(i);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==Lt&&yt(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,yt(h,e))return h[e]},set({_:i},e,t){const{data:n,setupState:r,ctx:s}=i;return Zu(r,e)?(r[e]=t,!0):n!==Lt&&yt(n,e)?(n[e]=t,!0):yt(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(s[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(t[a]||i!==Lt&&a[0]!=="$"&&yt(i,a)||Zu(e,a)||(l=s[0])&&yt(l,a)||yt(n,a)||yt(Qa,a)||yt(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:yt(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function qp(i){return st(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let ch=!0;function zy(i){const e=Z_(i),t=i.proxy,n=i.ctx;ch=!1,e.beforeCreate&&Kp(e.beforeCreate,i,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:b,destroyed:S,unmounted:v,render:E,renderTracked:C,renderTriggered:R,errorCaptured:D,serverPrefetch:T,expose:M,inheritAttrs:I,components:F,directives:Y,filters:$}=e;if(c&&Hy(c,n,null),o)for(const V in o){const B=o[V];lt(B)&&(n[V]=B.bind(t))}if(r){const V=r.call(t,t);jt(V)&&(i.data=Hd(V))}if(ch=!0,s)for(const V in s){const B=s[V],ae=lt(B)?B.bind(t,t):lt(B.get)?B.get.bind(t,t):ar,U=!lt(B)&&lt(B.set)?B.set.bind(t):ar,ge=PS({get:ae,set:U});Object.defineProperty(n,V,{enumerable:!0,configurable:!0,get:()=>ge.value,set:Oe=>ge.value=Oe})}if(a)for(const V in a)$_(a[V],n,t,V);if(l){const V=lt(l)?l.call(t):l;Reflect.ownKeys(V).forEach(B=>{qy(B,V[B])})}u&&Kp(u,i,"c");function W(V,B){st(B)?B.forEach(ae=>V(ae.bind(t))):B&&V(B.bind(t))}if(W(Py,f),W(so,h),W(Dy,d),W(Ly,g),W(Ay,_),W(Ry,m),W(Fy,D),W(Oy,C),W(Ny,R),W(Iy,b),W(j_,v),W(Uy,T),st(M))if(M.length){const V=i.exposed||(i.exposed={});M.forEach(B=>{Object.defineProperty(V,B,{get:()=>t[B],set:ae=>t[B]=ae,enumerable:!0})})}else i.exposed||(i.exposed={});E&&i.render===ar&&(i.render=E),I!=null&&(i.inheritAttrs=I),F&&(i.components=F),Y&&(i.directives=Y),T&&Y_(i)}function Hy(i,e,t=ar){st(i)&&(i=uh(i));for(const n in i){const r=i[n];let s;jt(r)?"default"in r?s=Uc(r.from||n,r.default,!0):s=Uc(r.from||n):s=Uc(r),zn(s)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[n]=s}}function Kp(i,e,t){fr(st(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function $_(i,e,t,n){let r=n.includes(".")?u0(t,n):()=>t[n];if(un(i)){const s=e[i];lt(s)&&Qu(r,s)}else if(lt(i))Qu(r,i.bind(t));else if(jt(i))if(st(i))i.forEach(s=>$_(s,e,t,n));else{const s=lt(i.handler)?i.handler.bind(t):e[i.handler];lt(s)&&Qu(r,s,i)}}function Z_(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=i.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!n?l=e:(l={},r.length&&r.forEach(c=>ru(l,c,o,!0)),ru(l,e,o)),jt(e)&&s.set(e,l),l}function ru(i,e,t,n=!1){const{mixins:r,extends:s}=e;s&&ru(i,s,t,!0),r&&r.forEach(o=>ru(i,o,t,!0));for(const o in e)if(!(n&&o==="expose")){const a=Vy[o]||t&&t[o];i[o]=a?a(i[o],e[o]):e[o]}return i}const Vy={data:jp,props:$p,emits:$p,methods:Oa,computed:Oa,beforeCreate:An,created:An,beforeMount:An,mounted:An,beforeUpdate:An,updated:An,beforeDestroy:An,beforeUnmount:An,destroyed:An,unmounted:An,activated:An,deactivated:An,errorCaptured:An,serverPrefetch:An,components:Oa,directives:Oa,watch:Wy,provide:jp,inject:Gy};function jp(i,e){return e?i?function(){return Gn(lt(i)?i.call(this,this):i,lt(e)?e.call(this,this):e)}:e:i}function Gy(i,e){return Oa(uh(i),uh(e))}function uh(i){if(st(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function An(i,e){return i?[...new Set([].concat(i,e))]:e}function Oa(i,e){return i?Gn(Object.create(null),i,e):e}function $p(i,e){return i?st(i)&&st(e)?[...new Set([...i,...e])]:Gn(Object.create(null),qp(i),qp(e??{})):e}function Wy(i,e){if(!i)return e;if(!e)return i;const t=Gn(Object.create(null),i);for(const n in e)t[n]=An(i[n],e[n]);return t}function J_(){return{app:null,config:{isNativeTag:y_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Xy=0;function Yy(i,e){return function(n,r=null){lt(n)||(n=Gn({},n)),r!=null&&!jt(r)&&(r=null);const s=J_(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:Xy++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:DS,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&lt(u.install)?(o.add(u),u.install(c,...f)):lt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||In(n,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),i(d,u,h),l=!0,c._container=u,u.__vue_app__=c,jd(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(fr(a,c._instance,16),i(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=ko;ko=c;try{return u()}finally{ko=f}}};return c}}let ko=null;function qy(i,e){if(On){let t=On.provides;const n=On.parent&&On.parent.provides;n===t&&(t=On.provides=Object.create(n)),t[i]=e}}function Uc(i,e,t=!1){const n=bS();if(n||ko){let r=ko?ko._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return t&&lt(e)?e.call(n&&n.proxy):e}}const Q_={},e0=()=>Object.create(Q_),t0=i=>Object.getPrototypeOf(i)===Q_;function Ky(i,e,t,n=!1){const r={},s=e0();i.propsDefaults=Object.create(null),n0(i,e,r,s);for(const o in i.propsOptions[0])o in r||(r[o]=void 0);t?i.props=n?r:fy(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function jy(i,e,t,n){const{props:r,attrs:s,vnode:{patchFlag:o}}=i,a=Et(r),[l]=i.propsOptions;let c=!1;if((n||o>0)&&!(o&16)){if(o&8){const u=i.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Lu(i.emitsOptions,h))continue;const d=e[h];if(l)if(yt(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=ds(h);r[g]=fh(l,a,g,d,i,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{n0(i,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!yt(e,f)&&((u=ro(f))===f||!yt(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=fh(l,a,f,void 0,i,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!yt(e,f))&&(delete s[f],c=!0)}c&&Rr(i.attrs,"set","")}function n0(i,e,t,n){const[r,s]=i.propsOptions;let o=!1,a;if(e)for(let l in e){if(qa(l))continue;const c=e[l];let u;r&&yt(r,u=ds(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Lu(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,o=!0)}if(s){const l=Et(t),c=a||Lt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=fh(r,l,f,c[f],i,!yt(c,f))}}return o}function fh(i,e,t,n,r,s){const o=i[t];if(o!=null){const a=yt(o,"default");if(a&&n===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&lt(l)){const{propsDefaults:c}=r;if(t in c)n=c[t];else{const u=zl(r);n=c[t]=l.call(null,e),u()}}else n=l;r.ce&&r.ce._setProp(t,n)}o[0]&&(s&&!a?n=!1:o[1]&&(n===""||n===ro(t))&&(n=!0))}return n}const $y=new WeakMap;function i0(i,e,t=!1){const n=t?$y:e.propsCache,r=n.get(i);if(r)return r;const s=i.props,o={},a=[];let l=!1;if(!lt(i)){const u=f=>{l=!0;const[h,d]=i0(f,e,!0);Gn(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return jt(i)&&n.set(i,Fo),Fo;if(st(s))for(let u=0;u<s.length;u++){const f=ds(s[u]);Zp(f)&&(o[f]=Lt)}else if(s)for(const u in s){const f=ds(u);if(Zp(f)){const h=s[u],d=o[f]=st(h)||lt(h)?{type:h}:Gn({},h),g=d.type;let _=!1,m=!0;if(st(g))for(let p=0;p<g.length;++p){const b=g[p],S=lt(b)&&b.name;if(S==="Boolean"){_=!0;break}else S==="String"&&(m=!1)}else _=lt(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||yt(d,"default"))&&a.push(f)}}const c=[o,a];return jt(i)&&n.set(i,c),c}function Zp(i){return i[0]!=="$"&&!qa(i)}const Yd=i=>i==="_"||i==="_ctx"||i==="$stable",qd=i=>st(i)?i.map(Qi):[Qi(i)],Zy=(i,e,t)=>{if(e._n)return e;const n=Ty((...r)=>qd(e(...r)),t);return n._c=!1,n},r0=(i,e,t)=>{const n=i._ctx;for(const r in i){if(Yd(r))continue;const s=i[r];if(lt(s))e[r]=Zy(r,s,n);else if(s!=null){const o=qd(s);e[r]=()=>o}}},s0=(i,e)=>{const t=qd(e);i.slots.default=()=>t},o0=(i,e,t)=>{for(const n in e)(t||!Yd(n))&&(i[n]=e[n])},Jy=(i,e,t)=>{const n=i.slots=e0();if(i.vnode.shapeFlag&32){const r=e._;r?(o0(n,e,t),t&&T_(n,"_",r,!0)):r0(e,n)}else e&&s0(i,e)},Qy=(i,e,t)=>{const{vnode:n,slots:r}=i;let s=!0,o=Lt;if(n.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:o0(r,e,t):(s=!e.$stable,r0(e,r)),o=e}else e&&(s0(i,e),o={default:1});if(s)for(const a in r)!Yd(a)&&o[a]==null&&delete r[a]},ai=pS;function eS(i){return tS(i)}function tS(i,e){const t=Au();t.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=ar,insertStaticContent:g}=i,_=(L,x,G,Z=null,K=null,P=null,le=void 0,J=null,re=!!x.dynamicChildren)=>{if(L===x)return;L&&!Ta(L,x)&&(Z=se(L),Oe(L,K,P,!0),L=null),x.patchFlag===-2&&(re=!1,x.dynamicChildren=null);const{type:ie,ref:Se,shapeFlag:A}=x;switch(ie){case Iu:m(L,x,G,Z);break;case $o:p(L,x,G,Z);break;case Nc:L==null&&b(x,G,Z,le);break;case Ji:F(L,x,G,Z,K,P,le,J,re);break;default:A&1?E(L,x,G,Z,K,P,le,J,re):A&6?Y(L,x,G,Z,K,P,le,J,re):(A&64||A&128)&&ie.process(L,x,G,Z,K,P,le,J,re,Ce)}Se!=null&&K?Za(Se,L&&L.ref,P,x||L,!x):Se==null&&L&&L.ref!=null&&Za(L.ref,null,P,L,!0)},m=(L,x,G,Z)=>{if(L==null)n(x.el=a(x.children),G,Z);else{const K=x.el=L.el;x.children!==L.children&&c(K,x.children)}},p=(L,x,G,Z)=>{L==null?n(x.el=l(x.children||""),G,Z):x.el=L.el},b=(L,x,G,Z)=>{[L.el,L.anchor]=g(L.children,x,G,Z,L.el,L.anchor)},S=({el:L,anchor:x},G,Z)=>{let K;for(;L&&L!==x;)K=h(L),n(L,G,Z),L=K;n(x,G,Z)},v=({el:L,anchor:x})=>{let G;for(;L&&L!==x;)G=h(L),r(L),L=G;r(x)},E=(L,x,G,Z,K,P,le,J,re)=>{x.type==="svg"?le="svg":x.type==="math"&&(le="mathml"),L==null?C(x,G,Z,K,P,le,J,re):T(L,x,K,P,le,J,re)},C=(L,x,G,Z,K,P,le,J)=>{let re,ie;const{props:Se,shapeFlag:A,transition:y,dirs:O}=L;if(re=L.el=o(L.type,P,Se&&Se.is,Se),A&8?u(re,L.children):A&16&&D(L.children,re,null,Z,K,Ju(L,P),le,J),O&&Ms(L,null,Z,"created"),R(re,L,L.scopeId,le,Z),Se){for(const ee in Se)ee!=="value"&&!qa(ee)&&s(re,ee,null,Se[ee],P,Z);"value"in Se&&s(re,"value",null,Se.value,P),(ie=Se.onVnodeBeforeMount)&&qi(ie,Z,L)}O&&Ms(L,null,Z,"beforeMount");const q=nS(K,y);q&&y.beforeEnter(re),n(re,x,G),((ie=Se&&Se.onVnodeMounted)||q||O)&&ai(()=>{ie&&qi(ie,Z,L),q&&y.enter(re),O&&Ms(L,null,Z,"mounted")},K)},R=(L,x,G,Z,K)=>{if(G&&d(L,G),Z)for(let P=0;P<Z.length;P++)d(L,Z[P]);if(K){let P=K.subTree;if(x===P||h0(P.type)&&(P.ssContent===x||P.ssFallback===x)){const le=K.vnode;R(L,le,le.scopeId,le.slotScopeIds,K.parent)}}},D=(L,x,G,Z,K,P,le,J,re=0)=>{for(let ie=re;ie<L.length;ie++){const Se=L[ie]=J?Qr(L[ie]):Qi(L[ie]);_(null,Se,x,G,Z,K,P,le,J)}},T=(L,x,G,Z,K,P,le)=>{const J=x.el=L.el;let{patchFlag:re,dynamicChildren:ie,dirs:Se}=x;re|=L.patchFlag&16;const A=L.props||Lt,y=x.props||Lt;let O;if(G&&Ts(G,!1),(O=y.onVnodeBeforeUpdate)&&qi(O,G,x,L),Se&&Ms(x,L,G,"beforeUpdate"),G&&Ts(G,!0),(A.innerHTML&&y.innerHTML==null||A.textContent&&y.textContent==null)&&u(J,""),ie?M(L.dynamicChildren,ie,J,G,Z,Ju(x,K),P):le||B(L,x,J,null,G,Z,Ju(x,K),P,!1),re>0){if(re&16)I(J,A,y,G,K);else if(re&2&&A.class!==y.class&&s(J,"class",null,y.class,K),re&4&&s(J,"style",A.style,y.style,K),re&8){const q=x.dynamicProps;for(let ee=0;ee<q.length;ee++){const X=q[ee],ve=A[X],ue=y[X];(ue!==ve||X==="value")&&s(J,X,ve,ue,K,G)}}re&1&&L.children!==x.children&&u(J,x.children)}else!le&&ie==null&&I(J,A,y,G,K);((O=y.onVnodeUpdated)||Se)&&ai(()=>{O&&qi(O,G,x,L),Se&&Ms(x,L,G,"updated")},Z)},M=(L,x,G,Z,K,P,le)=>{for(let J=0;J<x.length;J++){const re=L[J],ie=x[J],Se=re.el&&(re.type===Ji||!Ta(re,ie)||re.shapeFlag&198)?f(re.el):G;_(re,ie,Se,null,Z,K,P,le,!0)}},I=(L,x,G,Z,K)=>{if(x!==G){if(x!==Lt)for(const P in x)!qa(P)&&!(P in G)&&s(L,P,x[P],null,K,Z);for(const P in G){if(qa(P))continue;const le=G[P],J=x[P];le!==J&&P!=="value"&&s(L,P,J,le,K,Z)}"value"in G&&s(L,"value",x.value,G.value,K)}},F=(L,x,G,Z,K,P,le,J,re)=>{const ie=x.el=L?L.el:a(""),Se=x.anchor=L?L.anchor:a("");let{patchFlag:A,dynamicChildren:y,slotScopeIds:O}=x;O&&(J=J?J.concat(O):O),L==null?(n(ie,G,Z),n(Se,G,Z),D(x.children||[],G,Se,K,P,le,J,re)):A>0&&A&64&&y&&L.dynamicChildren?(M(L.dynamicChildren,y,G,K,P,le,J),(x.key!=null||K&&x===K.subTree)&&a0(L,x,!0)):B(L,x,G,Se,K,P,le,J,re)},Y=(L,x,G,Z,K,P,le,J,re)=>{x.slotScopeIds=J,L==null?x.shapeFlag&512?K.ctx.activate(x,G,Z,le,re):$(x,G,Z,K,P,le,re):j(L,x,re)},$=(L,x,G,Z,K,P,le)=>{const J=L.component=TS(L,Z,K);if(q_(L)&&(J.ctx.renderer=Ce),ES(J,!1,le),J.asyncDep){if(K&&K.registerDep(J,W,le),!L.el){const re=J.subTree=In($o);p(null,re,x,G),L.placeholder=re.el}}else W(J,L,x,G,K,P,le)},j=(L,x,G)=>{const Z=x.component=L.component;if(hS(L,x,G))if(Z.asyncDep&&!Z.asyncResolved){V(Z,x,G);return}else Z.next=x,Z.update();else x.el=L.el,Z.vnode=x},W=(L,x,G,Z,K,P,le)=>{const J=()=>{if(L.isMounted){let{next:A,bu:y,u:O,parent:q,vnode:ee}=L;{const me=l0(L);if(me){A&&(A.el=ee.el,V(L,A,le)),me.asyncDep.then(()=>{L.isUnmounted||J()});return}}let X=A,ve;Ts(L,!1),A?(A.el=ee.el,V(L,A,le)):A=ee,y&&qu(y),(ve=A.props&&A.props.onVnodeBeforeUpdate)&&qi(ve,q,A,ee),Ts(L,!0);const ue=Qp(L),be=L.subTree;L.subTree=ue,_(be,ue,f(be.el),se(be),L,K,P),A.el=ue.el,X===null&&dS(L,ue.el),O&&ai(O,K),(ve=A.props&&A.props.onVnodeUpdated)&&ai(()=>qi(ve,q,A,ee),K)}else{let A;const{el:y,props:O}=x,{bm:q,m:ee,parent:X,root:ve,type:ue}=L,be=Ja(x);Ts(L,!1),q&&qu(q),!be&&(A=O&&O.onVnodeBeforeMount)&&qi(A,X,x),Ts(L,!0);{ve.ce&&ve.ce._def.shadowRoot!==!1&&ve.ce._injectChildStyle(ue);const me=L.subTree=Qp(L);_(null,me,G,Z,L,K,P),x.el=me.el}if(ee&&ai(ee,K),!be&&(A=O&&O.onVnodeMounted)){const me=x;ai(()=>qi(A,X,me),K)}(x.shapeFlag&256||X&&Ja(X.vnode)&&X.vnode.shapeFlag&256)&&L.a&&ai(L.a,K),L.isMounted=!0,x=G=Z=null}};L.scope.on();const re=L.effect=new E_(J);L.scope.off();const ie=L.update=re.run.bind(re),Se=L.job=re.runIfDirty.bind(re);Se.i=L,Se.id=L.uid,re.scheduler=()=>Wd(Se),Ts(L,!0),ie()},V=(L,x,G)=>{x.component=L;const Z=L.vnode.props;L.vnode=x,L.next=null,jy(L,x.props,Z,G),Qy(L,x.children,G),Fr(),Xp(L),Br()},B=(L,x,G,Z,K,P,le,J,re=!1)=>{const ie=L&&L.children,Se=L?L.shapeFlag:0,A=x.children,{patchFlag:y,shapeFlag:O}=x;if(y>0){if(y&128){U(ie,A,G,Z,K,P,le,J,re);return}else if(y&256){ae(ie,A,G,Z,K,P,le,J,re);return}}O&8?(Se&16&&ne(ie,K,P),A!==ie&&u(G,A)):Se&16?O&16?U(ie,A,G,Z,K,P,le,J,re):ne(ie,K,P,!0):(Se&8&&u(G,""),O&16&&D(A,G,Z,K,P,le,J,re))},ae=(L,x,G,Z,K,P,le,J,re)=>{L=L||Fo,x=x||Fo;const ie=L.length,Se=x.length,A=Math.min(ie,Se);let y;for(y=0;y<A;y++){const O=x[y]=re?Qr(x[y]):Qi(x[y]);_(L[y],O,G,null,K,P,le,J,re)}ie>Se?ne(L,K,P,!0,!1,A):D(x,G,Z,K,P,le,J,re,A)},U=(L,x,G,Z,K,P,le,J,re)=>{let ie=0;const Se=x.length;let A=L.length-1,y=Se-1;for(;ie<=A&&ie<=y;){const O=L[ie],q=x[ie]=re?Qr(x[ie]):Qi(x[ie]);if(Ta(O,q))_(O,q,G,null,K,P,le,J,re);else break;ie++}for(;ie<=A&&ie<=y;){const O=L[A],q=x[y]=re?Qr(x[y]):Qi(x[y]);if(Ta(O,q))_(O,q,G,null,K,P,le,J,re);else break;A--,y--}if(ie>A){if(ie<=y){const O=y+1,q=O<Se?x[O].el:Z;for(;ie<=y;)_(null,x[ie]=re?Qr(x[ie]):Qi(x[ie]),G,q,K,P,le,J,re),ie++}}else if(ie>y)for(;ie<=A;)Oe(L[ie],K,P,!0),ie++;else{const O=ie,q=ie,ee=new Map;for(ie=q;ie<=y;ie++){const Pe=x[ie]=re?Qr(x[ie]):Qi(x[ie]);Pe.key!=null&&ee.set(Pe.key,ie)}let X,ve=0;const ue=y-q+1;let be=!1,me=0;const he=new Array(ue);for(ie=0;ie<ue;ie++)he[ie]=0;for(ie=O;ie<=A;ie++){const Pe=L[ie];if(ve>=ue){Oe(Pe,K,P,!0);continue}let Ee;if(Pe.key!=null)Ee=ee.get(Pe.key);else for(X=q;X<=y;X++)if(he[X-q]===0&&Ta(Pe,x[X])){Ee=X;break}Ee===void 0?Oe(Pe,K,P,!0):(he[Ee-q]=ie+1,Ee>=me?me=Ee:be=!0,_(Pe,x[Ee],G,null,K,P,le,J,re),ve++)}const xe=be?iS(he):Fo;for(X=xe.length-1,ie=ue-1;ie>=0;ie--){const Pe=q+ie,Ee=x[Pe],_e=x[Pe+1],Ge=Pe+1<Se?_e.el||_e.placeholder:Z;he[ie]===0?_(null,Ee,G,Ge,K,P,le,J,re):be&&(X<0||ie!==xe[X]?ge(Ee,G,Ge,2):X--)}}},ge=(L,x,G,Z,K=null)=>{const{el:P,type:le,transition:J,children:re,shapeFlag:ie}=L;if(ie&6){ge(L.component.subTree,x,G,Z);return}if(ie&128){L.suspense.move(x,G,Z);return}if(ie&64){le.move(L,x,G,Ce);return}if(le===Ji){n(P,x,G);for(let A=0;A<re.length;A++)ge(re[A],x,G,Z);n(L.anchor,x,G);return}if(le===Nc){S(L,x,G);return}if(Z!==2&&ie&1&&J)if(Z===0)J.beforeEnter(P),n(P,x,G),ai(()=>J.enter(P),K);else{const{leave:A,delayLeave:y,afterLeave:O}=J,q=()=>{L.ctx.isUnmounted?r(P):n(P,x,G)},ee=()=>{P._isLeaving&&P[wy](!0),A(P,()=>{q(),O&&O()})};y?y(P,q,ee):ee()}else n(P,x,G)},Oe=(L,x,G,Z=!1,K=!1)=>{const{type:P,props:le,ref:J,children:re,dynamicChildren:ie,shapeFlag:Se,patchFlag:A,dirs:y,cacheIndex:O}=L;if(A===-2&&(K=!1),J!=null&&(Fr(),Za(J,null,G,L,!0),Br()),O!=null&&(x.renderCache[O]=void 0),Se&256){x.ctx.deactivate(L);return}const q=Se&1&&y,ee=!Ja(L);let X;if(ee&&(X=le&&le.onVnodeBeforeUnmount)&&qi(X,x,L),Se&6)qe(L.component,G,Z);else{if(Se&128){L.suspense.unmount(G,Z);return}q&&Ms(L,null,x,"beforeUnmount"),Se&64?L.type.remove(L,x,G,Ce,Z):ie&&!ie.hasOnce&&(P!==Ji||A>0&&A&64)?ne(ie,x,G,!1,!0):(P===Ji&&A&384||!K&&Se&16)&&ne(re,x,G),Z&&et(L)}(ee&&(X=le&&le.onVnodeUnmounted)||q)&&ai(()=>{X&&qi(X,x,L),q&&Ms(L,null,x,"unmounted")},G)},et=L=>{const{type:x,el:G,anchor:Z,transition:K}=L;if(x===Ji){Ke(G,Z);return}if(x===Nc){v(L);return}const P=()=>{r(G),K&&!K.persisted&&K.afterLeave&&K.afterLeave()};if(L.shapeFlag&1&&K&&!K.persisted){const{leave:le,delayLeave:J}=K,re=()=>le(G,P);J?J(L.el,P,re):re()}else P()},Ke=(L,x)=>{let G;for(;L!==x;)G=h(L),r(L),L=G;r(x)},qe=(L,x,G)=>{const{bum:Z,scope:K,job:P,subTree:le,um:J,m:re,a:ie}=L;Jp(re),Jp(ie),Z&&qu(Z),K.stop(),P&&(P.flags|=8,Oe(le,L,x,G)),J&&ai(J,x),ai(()=>{L.isUnmounted=!0},x)},ne=(L,x,G,Z=!1,K=!1,P=0)=>{for(let le=P;le<L.length;le++)Oe(L[le],x,G,Z,K)},se=L=>{if(L.shapeFlag&6)return se(L.component.subTree);if(L.shapeFlag&128)return L.suspense.next();const x=h(L.anchor||L.el),G=x&&x[by];return G?h(G):x};let Me=!1;const Ie=(L,x,G)=>{L==null?x._vnode&&Oe(x._vnode,null,null,!0):_(x._vnode||null,L,x,null,null,null,G),x._vnode=L,Me||(Me=!0,Xp(),G_(),Me=!1)},Ce={p:_,um:Oe,m:ge,r:et,mt:$,mc:D,pc:B,pbc:M,n:se,o:i};return{render:Ie,hydrate:void 0,createApp:Yy(Ie)}}function Ju({type:i,props:e},t){return t==="svg"&&i==="foreignObject"||t==="mathml"&&i==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ts({effect:i,job:e},t){t?(i.flags|=32,e.flags|=4):(i.flags&=-33,e.flags&=-5)}function nS(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function a0(i,e,t=!1){const n=i.children,r=e.children;if(st(n)&&st(r))for(let s=0;s<n.length;s++){const o=n[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Qr(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&a0(o,a)),a.type===Iu&&a.patchFlag!==-1&&(a.el=o.el),a.type===$o&&!a.el&&(a.el=o.el)}}function iS(i){const e=i.slice(),t=[0];let n,r,s,o,a;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=t[t.length-1],i[r]<c){e[n]=r,t.push(n);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,i[t[a]]<c?s=a+1:o=a;c<i[t[s]]&&(s>0&&(e[n]=t[s-1]),t[s]=n)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function l0(i){const e=i.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:l0(e)}function Jp(i){if(i)for(let e=0;e<i.length;e++)i[e].flags|=8}const rS=Symbol.for("v-scx"),sS=()=>Uc(rS);function Qu(i,e,t){return c0(i,e,t)}function c0(i,e,t=Lt){const{immediate:n,deep:r,flush:s,once:o}=t,a=Gn({},t),l=e&&n||!e&&s!=="post";let c;if(Sl){if(s==="sync"){const d=sS();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ar,d.resume=ar,d.pause=ar,d}}const u=On;a.call=(d,g,_)=>fr(d,u,g,_);let f=!1;s==="post"?a.scheduler=d=>{ai(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():Wd(d)}),a.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=vy(i,e,a);return Sl&&(c?c.push(h):l&&h()),h}function oS(i,e,t){const n=this.proxy,r=un(i)?i.includes(".")?u0(n,i):()=>n[i]:i.bind(n,n);let s;lt(e)?s=e:(s=e.handler,t=e);const o=zl(this),a=c0(r,s.bind(n),t);return o(),a}function u0(i,e){const t=e.split(".");return()=>{let n=i;for(let r=0;r<t.length&&n;r++)n=n[t[r]];return n}}const aS=(i,e)=>e==="modelValue"||e==="model-value"?i.modelModifiers:i[`${e}Modifiers`]||i[`${ds(e)}Modifiers`]||i[`${ro(e)}Modifiers`];function lS(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||Lt;let r=t;const s=e.startsWith("update:"),o=s&&aS(n,e.slice(7));o&&(o.trim&&(r=t.map(u=>un(u)?u.trim():u)),o.number&&(r=t.map(Bx)));let a,l=n[a=Yu(e)]||n[a=Yu(ds(e))];!l&&s&&(l=n[a=Yu(ro(e))]),l&&fr(l,i,6,r);const c=n[a+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[a])return;i.emitted[a]=!0,fr(c,i,6,r)}}const cS=new WeakMap;function f0(i,e,t=!1){const n=t?cS:e.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let o={},a=!1;if(!lt(i)){const l=c=>{const u=f0(c,e,!0);u&&(a=!0,Gn(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!a?(jt(i)&&n.set(i,null),null):(st(s)?s.forEach(l=>o[l]=null):Gn(o,s),jt(i)&&n.set(i,o),o)}function Lu(i,e){return!i||!bu(e)?!1:(e=e.slice(2).replace(/Once$/,""),yt(i,e[0].toLowerCase()+e.slice(1))||yt(i,ro(e))||yt(i,e))}function Qp(i){const{type:e,vnode:t,proxy:n,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=i,m=nu(i);let p,b;try{if(t.shapeFlag&4){const v=r||n,E=v;p=Qi(c.call(E,v,u,f,d,h,g)),b=a}else{const v=e;p=Qi(v.length>1?v(f,{attrs:a,slots:o,emit:l}):v(f,null)),b=e.props?a:uS(a)}}catch(v){el.length=0,Pu(v,i,1),p=In($o)}let S=p;if(b&&_!==!1){const v=Object.keys(b),{shapeFlag:E}=S;v.length&&E&7&&(s&&v.some(Id)&&(b=fS(b,s)),S=Zo(S,b,!1,!0))}return t.dirs&&(S=Zo(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(t.dirs):t.dirs),t.transition&&Xd(S,t.transition),p=S,nu(m),p}const uS=i=>{let e;for(const t in i)(t==="class"||t==="style"||bu(t))&&((e||(e={}))[t]=i[t]);return e},fS=(i,e)=>{const t={};for(const n in i)(!Id(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function hS(i,e,t){const{props:n,children:r,component:s}=i,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return n?em(n,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==n[h]&&!Lu(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?em(n,o,c):!0:!!o;return!1}function em(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(e[s]!==i[s]&&!Lu(t,s))return!0}return!1}function dS({vnode:i,parent:e},t){for(;e;){const n=e.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=e.vnode).el=t,e=e.parent;else break}}const h0=i=>i.__isSuspense;function pS(i,e){e&&e.pendingBranch?st(i)?e.effects.push(...i):e.effects.push(i):My(i)}const Ji=Symbol.for("v-fgt"),Iu=Symbol.for("v-txt"),$o=Symbol.for("v-cmt"),Nc=Symbol.for("v-stc"),el=[];let mi=null;function _s(i=!1){el.push(mi=i?null:[])}function mS(){el.pop(),mi=el[el.length-1]||null}let xl=1;function tm(i,e=!1){xl+=i,i<0&&mi&&e&&(mi.hasOnce=!0)}function gS(i){return i.dynamicChildren=xl>0?mi||Fo:null,mS(),xl>0&&mi&&mi.push(i),i}function vs(i,e,t,n,r,s){return gS(yl(i,e,t,n,r,s,!0))}function d0(i){return i?i.__v_isVNode===!0:!1}function Ta(i,e){return i.type===e.type&&i.key===e.key}const p0=({key:i})=>i??null,Oc=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?un(i)||zn(i)||lt(i)?{i:ir,r:i,k:e,f:!!t}:i:null);function yl(i,e=null,t=null,n=0,r=null,s=i===Ji?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&p0(e),ref:e&&Oc(e),scopeId:X_,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:ir};return a?(Kd(l,t),s&128&&i.normalize(l)):t&&(l.shapeFlag|=un(t)?8:16),xl>0&&!o&&mi&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&mi.push(l),l}const In=_S;function _S(i,e=null,t=null,n=0,r=null,s=!1){if((!i||i===By)&&(i=$o),d0(i)){const a=Zo(i,e,!0);return t&&Kd(a,t),xl>0&&!s&&mi&&(a.shapeFlag&6?mi[mi.indexOf(i)]=a:mi.push(a)),a.patchFlag=-2,a}if(CS(i)&&(i=i.__vccOpts),e){e=vS(e);let{class:a,style:l}=e;a&&!un(a)&&(e.class=Cu(a)),jt(l)&&(Gd(l)&&!st(l)&&(l=Gn({},l)),e.style=Ru(l))}const o=un(i)?1:h0(i)?128:Ey(i)?64:jt(i)?4:lt(i)?2:0;return yl(i,e,t,n,r,o,s,!0)}function vS(i){return i?Gd(i)||t0(i)?Gn({},i):i:null}function Zo(i,e,t=!1,n=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=i,c=e?yS(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&p0(c),ref:e&&e.ref?t&&s?st(s)?s.concat(Oc(e)):[s,Oc(e)]:Oc(e):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==Ji?o===-1?16:o|16:o,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&Zo(i.ssContent),ssFallback:i.ssFallback&&Zo(i.ssFallback),placeholder:i.placeholder,el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce};return l&&n&&Xd(u,l.clone(u)),u}function xS(i=" ",e=0){return In(Iu,null,i,e)}function Uu(i,e){const t=In(Nc,null,i);return t.staticCount=e,t}function Qi(i){return i==null||typeof i=="boolean"?In($o):st(i)?In(Ji,null,i.slice()):d0(i)?Qr(i):In(Iu,null,String(i))}function Qr(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:Zo(i)}function Kd(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(st(e))t=16;else if(typeof e=="object")if(n&65){const r=e.default;r&&(r._c&&(r._d=!1),Kd(i,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!t0(e)?e._ctx=ir:r===3&&ir&&(ir.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else lt(e)?(e={default:e,_ctx:ir},t=32):(e=String(e),n&64?(t=16,e=[xS(e)]):t=8);i.children=e,i.shapeFlag|=t}function yS(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const r in n)if(r==="class")e.class!==n.class&&(e.class=Cu([e.class,n.class]));else if(r==="style")e.style=Ru([e.style,n.style]);else if(bu(r)){const s=e[r],o=n[r];o&&s!==o&&!(st(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=n[r])}return e}function qi(i,e,t,n=null){fr(i,e,7,[t,n])}const SS=J_();let MS=0;function TS(i,e,t){const n=i.type,r=(e?e.appContext:i.appContext)||SS,s={uid:MS++,vnode:i,type:n,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Xx(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:i0(n,r),emitsOptions:f0(n,r),emit:null,emitted:null,propsDefaults:Lt,inheritAttrs:n.inheritAttrs,ctx:Lt,data:Lt,props:Lt,attrs:Lt,slots:Lt,refs:Lt,setupState:Lt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=lS.bind(null,s),i.ce&&i.ce(s),s}let On=null;const bS=()=>On||ir;let su,hh;{const i=Au(),e=(t,n)=>{let r;return(r=i[t])||(r=i[t]=[]),r.push(n),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};su=e("__VUE_INSTANCE_SETTERS__",t=>On=t),hh=e("__VUE_SSR_SETTERS__",t=>Sl=t)}const zl=i=>{const e=On;return su(i),i.scope.on(),()=>{i.scope.off(),su(e)}},nm=()=>{On&&On.scope.off(),su(null)};function m0(i){return i.vnode.shapeFlag&4}let Sl=!1;function ES(i,e=!1,t=!1){e&&hh(e);const{props:n,children:r}=i.vnode,s=m0(i);Ky(i,n,s,e),Jy(i,r,t||e);const o=s?wS(i,e):void 0;return e&&hh(!1),o}function wS(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,ky);const{setup:n}=t;if(n){Fr();const r=i.setupContext=n.length>1?RS(i):null,s=zl(i),o=kl(n,i,0,[i.props,r]),a=S_(o);if(Br(),s(),(a||i.sp)&&!Ja(i)&&Y_(i),a){if(o.then(nm,nm),e)return o.then(l=>{im(i,l)}).catch(l=>{Pu(l,i,0)});i.asyncDep=o}else im(i,o)}else g0(i)}function im(i,e,t){lt(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:jt(e)&&(i.setupState=z_(e)),g0(i)}function g0(i,e,t){const n=i.type;i.render||(i.render=n.render||ar);{const r=zl(i);Fr();try{zy(i)}finally{Br(),r()}}}const AS={get(i,e){return xn(i,"get",""),i[e]}};function RS(i){const e=t=>{i.exposed=t||{}};return{attrs:new Proxy(i.attrs,AS),slots:i.slots,emit:i.emit,expose:e}}function jd(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(z_(hy(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in Qa)return Qa[t](i)},has(e,t){return t in e||t in Qa}})):i.proxy}function CS(i){return lt(i)&&"__vccOpts"in i}const PS=(i,e)=>gy(i,e,Sl),DS="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let dh;const rm=typeof window<"u"&&window.trustedTypes;if(rm)try{dh=rm.createPolicy("vue",{createHTML:i=>i})}catch{}const _0=dh?i=>dh.createHTML(i):i=>i,LS="http://www.w3.org/2000/svg",IS="http://www.w3.org/1998/Math/MathML",Er=typeof document<"u"?document:null,sm=Er&&Er.createElement("template"),US={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const r=e==="svg"?Er.createElementNS(LS,i):e==="mathml"?Er.createElementNS(IS,i):t?Er.createElement(i,{is:t}):Er.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>Er.createTextNode(i),createComment:i=>Er.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>Er.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{sm.innerHTML=_0(n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i);const a=sm.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},NS=Symbol("_vtc");function OS(i,e,t){const n=i[NS];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const om=Symbol("_vod"),FS=Symbol("_vsh"),BS=Symbol(""),kS=/(?:^|;)\s*display\s*:/;function zS(i,e,t){const n=i.style,r=un(t);let s=!1;if(t&&!r){if(e)if(un(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Fc(n,a,"")}else for(const o in e)t[o]==null&&Fc(n,o,"");for(const o in t)o==="display"&&(s=!0),Fc(n,o,t[o])}else if(r){if(e!==t){const o=n[BS];o&&(t+=";"+o),n.cssText=t,s=kS.test(t)}}else e&&i.removeAttribute("style");om in i&&(i[om]=s?n.display:"",i[FS]&&(n.display="none"))}const am=/\s*!important$/;function Fc(i,e,t){if(st(t))t.forEach(n=>Fc(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))i.setProperty(e,t);else{const n=HS(i,e);am.test(t)?i.setProperty(ro(n),t.replace(am,""),"important"):i[n]=t}}const lm=["Webkit","Moz","ms"],ef={};function HS(i,e){const t=ef[e];if(t)return t;let n=ds(e);if(n!=="filter"&&n in i)return ef[e]=n;n=M_(n);for(let r=0;r<lm.length;r++){const s=lm[r]+n;if(s in i)return ef[e]=s}return e}const cm="http://www.w3.org/1999/xlink";function um(i,e,t,n,r,s=Wx(e)){n&&e.startsWith("xlink:")?t==null?i.removeAttributeNS(cm,e.slice(6,e.length)):i.setAttributeNS(cm,e,t):t==null||s&&!b_(t)?i.removeAttribute(e):i.setAttribute(e,s?"":ma(t)?String(t):t)}function fm(i,e,t,n,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(i[e]=e==="innerHTML"?_0(t):t);return}const s=i.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?i.getAttribute("value")||"":i.value,l=t==null?i.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in i))&&(i.value=l),t==null&&i.removeAttribute(e),i._value=t;return}let o=!1;if(t===""||t==null){const a=typeof i[e];a==="boolean"?t=b_(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{i[e]=t}catch{}o&&i.removeAttribute(r||e)}function VS(i,e,t,n){i.addEventListener(e,t,n)}function GS(i,e,t,n){i.removeEventListener(e,t,n)}const hm=Symbol("_vei");function WS(i,e,t,n,r=null){const s=i[hm]||(i[hm]={}),o=s[e];if(n&&o)o.value=n;else{const[a,l]=XS(e);if(n){const c=s[e]=KS(n,r);VS(i,a,c,l)}else o&&(GS(i,a,o,l),s[e]=void 0)}}const dm=/(?:Once|Passive|Capture)$/;function XS(i){let e;if(dm.test(i)){e={};let n;for(;n=i.match(dm);)i=i.slice(0,i.length-n[0].length),e[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):ro(i.slice(2)),e]}let tf=0;const YS=Promise.resolve(),qS=()=>tf||(YS.then(()=>tf=0),tf=Date.now());function KS(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;fr(jS(n,t.value),e,5,[n])};return t.value=i,t.attached=qS(),t}function jS(i,e){if(st(e)){const t=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{t.call(i),i._stopped=!0},e.map(n=>r=>!r._stopped&&n&&n(r))}else return e}const pm=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,$S=(i,e,t,n,r,s)=>{const o=r==="svg";e==="class"?OS(i,n,o):e==="style"?zS(i,t,n):bu(e)?Id(e)||WS(i,e,t,n,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):ZS(i,e,n,o))?(fm(i,e,n),!i.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&um(i,e,n,o,s,e!=="value")):i._isVueCE&&(/[A-Z]/.test(e)||!un(n))?fm(i,ds(e),n,s,e):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),um(i,e,n,o))};function ZS(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&pm(e)&&lt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return pm(e)&&un(t)?!1:e in i}const JS=Gn({patchProp:$S},US);let mm;function QS(){return mm||(mm=eS(JS))}const eM=((...i)=>{const e=QS().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=nM(n);if(!r)return;const s=e._component;!lt(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,tM(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function tM(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function nM(i){return un(i)?document.querySelector(i):i}const iM="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2019.2.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20fill='%23FFFFFF'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2050%2050'%20width='500px'%20height='500px'%3e%3cpath%20d='M44.529,34.75c-1.081,2.393-1.598,3.464-2.986,5.579c-1.94,2.954-4.678,6.64-8.064,6.665c-3.012,0.025-3.789-1.965-7.876-1.932c-4.087,0.02-4.939,1.969-7.954,1.938c-3.386-0.031-5.978-3.352-7.92-6.3C4.3,32.429,3.727,22.736,7.082,17.579c2.374-3.657,6.13-5.805,9.657-5.805c3.592,0,5.85,1.974,8.82,1.974c2.882,0,4.637-1.979,8.791-1.979c3.142,0,6.464,1.712,8.838,4.666C35.422,20.69,36.684,31.782,44.529,34.75z%20M31.197,8.468c1.511-1.94,2.657-4.677,2.242-7.468c-2.466,0.168-5.349,1.743-7.034,3.782c-1.526,1.857-2.791,4.615-2.298,7.283C26.797,12.152,29.581,10.548,31.197,8.468z'/%3e%3c/svg%3e";function wr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function v0(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var vi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Jo={duration:.5,overwrite:!1,delay:0},$d,pn,Ft,Ci=1e8,Ct=1/Ci,ph=Math.PI*2,rM=ph/4,sM=0,x0=Math.sqrt,oM=Math.cos,aM=Math.sin,fn=function(e){return typeof e=="string"},Wt=function(e){return typeof e=="function"},kr=function(e){return typeof e=="number"},Zd=function(e){return typeof e>"u"},hr=function(e){return typeof e=="object"},$n=function(e){return e!==!1},Jd=function(){return typeof window<"u"},Kl=function(e){return Wt(e)||fn(e)},y0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Mn=Array.isArray,mh=/(?:-?\.?\d|\.)+/gi,S0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Io=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,nf=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,M0=/[+-]=-?[.\d]+/,T0=/[^,'"\[\]\s]+/gi,lM=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,zt,$i,gh,Qd,xi={},ou={},b0,E0=function(e){return(ou=Qo(e,xi))&&ti},ep=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ml=function(e,t){return!t&&console.warn(e)},w0=function(e,t){return e&&(xi[e]=t)&&ou&&(ou[e]=t)||xi},Tl=function(){return 0},cM={suppressEvents:!0,isStart:!0,kill:!1},Bc={suppressEvents:!0,kill:!1},uM={suppressEvents:!0},tp={},cs=[],_h={},A0,ui={},rf={},gm=30,kc=[],np="",ip=function(e){var t=e[0],n,r;if(hr(t)||Wt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=kc.length;r--&&!kc[r].targetTest(t););n=kc[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Z0(e[r],n)))||e.splice(r,1);return e},Ys=function(e){return e._gsap||ip(Pi(e))[0]._gsap},R0=function(e,t,n){return(n=e[t])&&Wt(n)?e[t]():Zd(n)&&e.getAttribute&&e.getAttribute(t)||n},Zn=function(e,t){return(e=e.split(",")).forEach(t)||e},qt=function(e){return Math.round(e*1e5)/1e5||0},Qt=function(e){return Math.round(e*1e7)/1e7||0},zo=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},fM=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},au=function(){var e=cs.length,t=cs.slice(0),n,r;for(_h={},cs.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},rp=function(e){return!!(e._initted||e._startAt||e.add)},C0=function(e,t,n,r){cs.length&&!pn&&au(),e.render(t,n,!!(pn&&t<0&&rp(e))),cs.length&&!pn&&au()},P0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(T0).length<2?t:fn(e)?e.trim():e},D0=function(e){return e},yi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},hM=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},Qo=function(e,t){for(var n in t)e[n]=t[n];return e},_m=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=hr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},lu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},tl=function(e){var t=e.parent||zt,n=e.keyframes?hM(Mn(e.keyframes)):yi;if($n(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},dM=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},L0=function(e,t,n,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Nu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},ps=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},qs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},pM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},vh=function(e,t,n,r){return e._startAt&&(pn?e._startAt.revert(Bc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},mM=function i(e){return!e||e._ts&&i(e.parent)},vm=function(e){return e._repeat?ea(e._tTime,e=e.duration()+e._rDelay)*e:0},ea=function(e,t){var n=Math.floor(e=Qt(e/t));return e&&n===e?n-1:n},cu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ou=function(e){return e._end=Qt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ct)||0))},Fu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Qt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ou(e),n._dirty||qs(n,e)),e},I0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=cu(e.rawTime(),t),(!t._dur||Hl(0,t.totalDuration(),n)-t._tTime>Ct)&&t.render(n,!0)),qs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Ct}},tr=function(e,t,n,r){return t.parent&&ps(t),t._start=Qt((kr(n)?n:n||e!==zt?Ei(e,n,t):e._time)+t._delay),t._end=Qt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),L0(e,t,"_first","_last",e._sort?"_start":0),xh(t)||(e._recent=t),r||I0(e,t),e._ts<0&&Fu(e,e._tTime),e},U0=function(e,t){return(xi.ScrollTrigger||ep("scrollTrigger",t))&&xi.ScrollTrigger.create(t,e)},N0=function(e,t,n,r,s){if(op(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!pn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&A0!==di.frame)return cs.push(e),e._lazy=[s,r],1},gM=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},xh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},_M=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&gM(e)&&!(!e._initted&&xh(e))||(e._ts<0||e._dp._ts<0)&&!xh(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=Hl(0,e._tDur,t),u=ea(l,a),e._yoyo&&u&1&&(o=1-o),u!==ea(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||pn||r||e._zTime===Ct||!t&&e._zTime){if(!e._initted&&N0(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Ct:0),n||(n=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&vh(e,t,n,!0),e._onUpdate&&!n&&gi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&gi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&ps(e,1),!n&&!pn&&(gi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},vM=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},ta=function(e,t,n,r){var s=e._repeat,o=Qt(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Qt(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Fu(e,e._tTime=e._tDur*a),e.parent&&Ou(e),n||qs(e.parent,e),e},xm=function(e){return e instanceof Fn?qs(e):ta(e,e._dur)},xM={_start:0,endTime:Tl,totalDuration:Tl},Ei=function i(e,t,n){var r=e.labels,s=e._recent||xM,o=e.duration()>=Ci?s.endTime(!1):e._dur,a,l,c;return fn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Mn(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},nl=function(e,t,n){var r=kr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;o.immediateRender=$n(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Jt(t[0],o,t[s+1])},xs=function(e,t){return e||e===0?t(e):t},Hl=function(e,t,n){return n<e?e:n>t?t:n},yn=function(e,t){return!fn(e)||!(t=lM.exec(e))?"":t[1]},yM=function(e,t,n){return xs(n,function(r){return Hl(e,t,r)})},yh=[].slice,O0=function(e,t){return e&&hr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&hr(e[0]))&&!e.nodeType&&e!==$i},SM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return fn(r)&&!t||O0(r,1)?(s=n).push.apply(s,Pi(r)):n.push(r)})||n},Pi=function(e,t,n){return Ft&&!t&&Ft.selector?Ft.selector(e):fn(e)&&!n&&(gh||!na())?yh.call((t||Qd).querySelectorAll(e),0):Mn(e)?SM(e,n):O0(e)?yh.call(e,0):e?[e]:[]},Sh=function(e){return e=Pi(e)[0]||Ml("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Pi(t,n.querySelectorAll?n:n===e?Ml("Invalid scope")||Qd.createElement("div"):e)}},F0=function(e){return e.sort(function(){return .5-Math.random()})},B0=function(e){if(Wt(e))return e;var t=hr(e)?e:{each:e},n=Ks(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return fn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,b,S,v,E,C,R,D,T;if(!m){if(T=t.grid==="auto"?0:(t.grid||[1,Ci])[1],!T){for(R=-Ci;R<(R=g[T++].getBoundingClientRect().left)&&T<_;);T<_&&T--}for(m=o[_]=[],p=l?Math.min(T,_)*u-.5:r%T,b=T===Ci?0:l?_*f/T-.5:r/T|0,R=0,D=Ci,C=0;C<_;C++)S=C%T-p,v=b-(C/T|0),m[C]=E=c?Math.abs(c==="y"?v:S):x0(S*S+v*v),E>R&&(R=E),E<D&&(D=E);r==="random"&&F0(m),m.max=R-D,m.min=D,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(T>_?_-1:c?c==="y"?_/T:T:Math.max(T,_/T))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=yn(t.amount||t.each)||0,n=n&&_<0?K0(n):n}return _=(m[h]-m.min)/m.max||0,Qt(m.b+(n?n(_):_)*m.v)+m.u}},Mh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=Qt(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(kr(n)?0:yn(n))}},k0=function(e,t){var n=Mn(e),r,s;return!n&&hr(e)&&(r=n=e.radius||Ci,e.values?(e=Pi(e.values),(s=!kr(e[0]))&&(r*=r)):e=Mh(e.increment)),xs(t,n?Wt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ci,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||kr(o)?u:u+yn(o)}:Mh(e))},z0=function(e,t,n,r){return xs(Mn(e)?!t:n===!0?!!(n=0):!r,function(){return Mn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},MM=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},TM=function(e,t){return function(n){return e(parseFloat(n))+(t||yn(n))}},bM=function(e,t,n){return V0(e,t,0,1,n)},H0=function(e,t,n){return xs(n,function(r){return e[~~t(r)]})},EM=function i(e,t,n){var r=t-e;return Mn(e)?H0(e,i(0,e.length),t):xs(n,function(s){return(r+(s-e)%r)%r+e})},wM=function i(e,t,n){var r=t-e,s=r*2;return Mn(e)?H0(e,i(0,e.length-1),t):xs(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},bl=function(e){for(var t=0,n="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?T0:mh),n+=e.substr(t,r-t)+z0(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},V0=function(e,t,n,r,s){var o=t-e,a=r-n;return xs(s,function(l){return n+((l-e)/o*a||0)})},AM=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=fn(e),a={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(Mn(e)&&!Mn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=t}else r||(e=Qo(Mn(e)?[]:{},e));if(!u){for(l in t)sp.call(a,e,l,"get",t[l]);s=function(g){return cp(g,a)||(o?e.p:e)}}}return xs(n,s)},ym=function(e,t,n){var r=e.labels,s=Ci,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},gi=function(e,t,n){var r=e.vars,s=r[t],o=Ft,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&cs.length&&au(),a&&(Ft=a),u=l?s.apply(c,l):s.call(c),Ft=o,u},Fa=function(e){return ps(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pn),e.progress()<1&&gi(e,"onInterrupt"),e},Uo,G0=[],W0=function(e){if(e)if(e=!e.name&&e.default||e,Jd()||e.headless){var t=e.name,n=Wt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Tl,render:cp,add:sp,kill:GM,modifier:VM,rawVars:0},o={targetTest:0,get:0,getSetter:lp,aliases:{},register:0};if(na(),e!==r){if(ui[t])return;yi(r,yi(lu(e,s),o)),Qo(r.prototype,Qo(s,lu(e,o))),ui[r.prop=t]=r,e.targetTest&&(kc.push(r),tp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}w0(t,r),e.register&&e.register(ti,r,Jn)}else G0.push(e)},Rt=255,Ba={aqua:[0,Rt,Rt],lime:[0,Rt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Rt],navy:[0,0,128],white:[Rt,Rt,Rt],olive:[128,128,0],yellow:[Rt,Rt,0],orange:[Rt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Rt,0,0],pink:[Rt,192,203],cyan:[0,Rt,Rt],transparent:[Rt,Rt,Rt,0]},sf=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Rt+.5|0},X0=function(e,t,n){var r=e?kr(e)?[e>>16,e>>8&Rt,e&Rt]:0:Ba.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ba[e])r=Ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Rt,r&Rt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Rt,e&Rt]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(mh),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=sf(l+1/3,s,o),r[1]=sf(l,s,o),r[2]=sf(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(S0),n&&r.length<4&&(r[3]=1),r}else r=e.match(mh)||Ba.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/Rt,o=r[1]/Rt,a=r[2]/Rt,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Y0=function(e){var t=[],n=[],r=-1;return e.split(us).forEach(function(s){var o=s.match(Io)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Sm=function(e,t,n){var r="",s=(e+r).match(us),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=X0(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Y0(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(us,"1").split(Io),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(us),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},us=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ba)i+="|"+e+"\\b";return new RegExp(i+")","gi")})(),RM=/hsl[a]?\(/,q0=function(e){var t=e.join(" "),n;if(us.lastIndex=0,us.test(t))return n=RM.test(t),e[1]=Sm(e[1],n),e[0]=Sm(e[0],n,Y0(e[1])),!0},El,di=(function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=i()-r,b=m===!0,S,v,E,C;if((p>e||p<0)&&(n+=p-t),r+=p,E=r-n,S=E-o,(S>0||b)&&(C=++f.frame,h=E-f.time*1e3,f.time=E=E/1e3,o+=S+(S>=s?4:s-S),v=1),b||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](E,h,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){b0&&(!gh&&Jd()&&($i=gh=window,Qd=$i.document||{},xi.gsap=ti,($i.gsapVersions||($i.gsapVersions=[])).push(ti.version),E0(ou||$i.GreenSockGlobals||!$i.gsap&&$i||{}),G0.forEach(W0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},El=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),El=0,c=Tl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,b){var S=p?function(v,E,C,R){m(v,E,C,R),f.remove(S)}:m;return f.remove(m),a[b?"unshift":"push"](S),na(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f})(),na=function(){return!El&&di.wake()},pt={},CM=/^[\d.\-M][\d.\-,\s]/,PM=/["']/g,DM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(PM,"").trim():+c,r=l.substr(a+1).trim();return t},LM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},IM=function(e){var t=(e+"").split("("),n=pt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[DM(t[1])]:LM(e).split(",").map(P0)):pt._CE&&CM.test(e)?pt._CE("",e):n},K0=function(e){return function(t){return 1-e(1-t)}},j0=function i(e,t){for(var n=e._first,r;n;)n instanceof Fn?i(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?i(n.timeline,t):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=t)),n=n._next},Ks=function(e,t){return e&&(Wt(e)?e:pt[e]||IM(e))||t},oo=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Zn(e,function(a){pt[a]=xi[a]=s,pt[o=a.toLowerCase()]=n;for(var l in s)pt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=pt[a+"."+l]=s[l]}),s},$0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},of=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/ph*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*aM((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:$0(a);return s=ph/s,l.config=function(c,u){return i(e,c,u)},l},af=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:$0(n);return r.config=function(s){return i(e,s)},r};Zn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;oo(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});pt.Linear.easeNone=pt.none=pt.Linear.easeIn;oo("Elastic",of("in"),of("out"),of());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};oo("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);oo("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});oo("Circ",function(i){return-(x0(1-i*i)-1)});oo("Sine",function(i){return i===1?1:-oM(i*rM)+1});oo("Back",af("in"),af("out"),af());pt.SteppedEase=pt.steps=xi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-Ct;return function(a){return((r*Hl(0,o,a)|0)+s)*n}}};Jo.ease=pt["quad.out"];Zn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return np+=i+","+i+"Params,"});var Z0=function(e,t){this.id=sM++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:R0,this.set=t?t.getSetter:lp},wl=(function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ta(this,+t.duration,1,1),this.data=t.data,Ft&&(this._ctx=Ft,Ft.data.push(this)),El||di.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ta(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(na(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Fu(this,n),!s._dp||s.parent||I0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&tr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ct||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),C0(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+vm(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+vm(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?ea(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Ct?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?cu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ct?0:this._rts,this.totalTime(Hl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Ou(this),pM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(na(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ct&&(this._tTime-=Ct)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&tr(r,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?cu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=uM);var r=pn;return pn=n,rp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),pn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,xm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,xm(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(Ei(this,n),$n(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,$n(r)),this._dur||(this._zTime=-Ct),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ct:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ct,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Ct)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this;return new Promise(function(s){var o=Wt(n)?n:D0,a=function(){var c=r.then;r.then=null,Wt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){Fa(this)},i})();yi(wl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ct,_prom:0,_ps:!1,_rts:1});var Fn=(function(i){v0(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),zt&&tr(n.parent||zt,wr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&U0(wr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return nl(0,arguments,this),this},t.from=function(r,s,o){return nl(1,arguments,this),this},t.fromTo=function(r,s,o,a){return nl(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,tl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Jt(r,s,Ei(this,o),1),this},t.call=function(r,s,o){return tr(this,Jt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Jt(r,o,Ei(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,tl(o).immediateRender=$n(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,tl(a).immediateRender=$n(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Qt(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,_,m,p,b,S,v,E,C,R;if(this!==zt&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,v=this._start,S=this._ts,p=!S,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Qt(u%m),u===l?(_=this._repeat,h=c):(E=Qt(u/m),_=~~E,_&&_===E&&(h=c,_--),h>c&&(h=c)),E=ea(this._tTime,m),!a&&this._tTime&&E!==_&&this._tTime-E*m-this._dur<=0&&(E=_),C&&_&1&&(h=c-h,R=1),_!==E&&!this._lock){var D=C&&E&1,T=D===(C&&_&1);if(_<E&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(R?0:Qt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&gi(this,"onRepeat"),this.vars.repeatRefresh&&!R&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,T&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!R&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;j0(this,R)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=vM(this,Qt(a),Qt(h)),b&&(u-=h-(h=b._start))),this._tTime=u,this._time=h,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!s&&!E&&(gi(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-Ct);break}}d=g}else{d=this._last;for(var M=r<0?r:h;d;){if(g=d._prev,(d._act||M<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(M-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(M-d._start)*d._ts,s,o||pn&&rp(d)),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=M?-Ct:Ct);break}}d=g}}if(b&&!s&&(this.pause(),b.render(h>=a?0:-Ct)._zTime=h>=a?1:-1,this._ts))return this._start=v,Ou(this),this.render(r,s,o);this._onUpdate&&!s&&gi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ps(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(gi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(kr(s)||(s=Ei(this,s,r)),!(r instanceof wl)){if(Mn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(fn(r))return this.addLabel(r,s);if(Wt(r))r=Jt.delayedCall(0,r);else return this}return this!==r?tr(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ci);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Jt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return fn(r)?this.removeLabel(r):Wt(r)?this.killTweensOf(r):(r.parent===this&&Nu(this,r),r===this._recent&&(this._recent=this._last),qs(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Qt(di.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Ei(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Jt.delayedCall(0,s||Tl,o);return a.data="isPause",this._hasPause=1,tr(this,a,Ei(this,r))},t.removePause=function(r){var s=this._first;for(r=Ei(this,r);s;)s._start===r&&s.data==="isPause"&&ps(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)ns!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Pi(r),l=this._first,c=kr(s),u;l;)l instanceof Jt?fM(l._targets,a)&&(c?(!ns||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Ei(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Jt.to(o,yi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ct,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&ta(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,yi({startAt:{time:Ei(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),ym(this,Ei(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),ym(this,Ei(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ct)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return qs(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),qs(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Ci,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,tr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ta(o,o===zt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(zt._ts&&(C0(zt,cu(r,zt)),A0=di.frame),di.frame>=gm){gm+=vi.autoSleep||120;var s=zt._first;if((!s||!s._ts)&&vi.autoSleep&&di._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||di.sleep()}}},e})(wl);yi(Fn.prototype,{_lock:0,_hasPause:0,_forcing:0});var UM=function(e,t,n,r,s,o,a){var l=new Jn(this._pt,e,t,0,1,iv,null,s),c=0,u=0,f,h,d,g,_,m,p,b;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=bl(r)),o&&(b=[n,r],o(b,e,t),n=b[0],r=b[1]),h=n.match(nf)||[];f=nf.exec(r);)g=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?zo(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=nf.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(M0.test(r)||p)&&(l.e=0),this._pt=l,l},sp=function(e,t,n,r,s,o,a,l,c,u){Wt(r)&&(r=r(s||0,e,o));var f=e[t],h=n!=="get"?n:Wt(f)?c?e[t.indexOf("set")||!Wt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Wt(f)?c?kM:tv:ap,g;if(fn(r)&&(~r.indexOf("random(")&&(r=bl(r)),r.charAt(1)==="="&&(g=zo(h,r)+(yn(h)||0),(g||g===0)&&(r=g))),!u||h!==r||Th)return!isNaN(h*r)&&r!==""?(g=new Jn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?HM:nv,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&ep(t,r),UM.call(this,e,t,h,r,d,l||vi.stringFilter,c))},NM=function(e,t,n,r,s){if(Wt(e)&&(e=il(e,s,t,n,r)),!hr(e)||e.style&&e.nodeType||Mn(e)||y0(e))return fn(e)?il(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=il(e[a],s,t,n,r);return o},J0=function(e,t,n,r,s,o){var a,l,c,u;if(ui[e]&&(a=new ui[e]).init(s,a.rawVars?t[e]:NM(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Jn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Uo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ns,Th,op=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,S=e._overwrite==="auto"&&!$d,v=e.timeline,E,C,R,D,T,M,I,F,Y,$,j,W,V;if(v&&(!h||!s)&&(s="none"),e._ease=Ks(s,Jo.ease),e._yEase=f?K0(Ks(f===!0?s:f,Jo.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(F=m[0]?Ys(m[0]).harness:0,W=F&&r[F.prop],E=lu(r,tp),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Bc:cM),_._lazy=0),o){if(ps(e._startAt=Jt.set(m,yi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return gi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn||!a&&!d)&&e._startAt.revert(Bc),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),R=yi({overwrite:!1,data:"isFromStart",lazy:a&&!_&&$n(l),immediateRender:a,stagger:0,parent:p},E),W&&(R[F.prop]=W),ps(e._startAt=Jt.set(m,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn?e._startAt.revert(Bc):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,Ct,Ct);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&$n(l)||l&&!g,C=0;C<m.length;C++){if(T=m[C],I=T._gsap||ip(m)[C]._gsap,e._ptLookup[C]=$={},_h[I.id]&&cs.length&&au(),j=b===m?C:b.indexOf(T),F&&(Y=new F).init(T,W||E,e,j,b)!==!1&&(e._pt=D=new Jn(e._pt,T,Y.name,0,1,Y.render,Y,0,Y.priority),Y._props.forEach(function(B){$[B]=D}),Y.priority&&(M=1)),!F||W)for(R in E)ui[R]&&(Y=J0(R,E,e,j,T,b))?Y.priority&&(M=1):$[R]=D=sp.call(e,T,R,"get",E[R],j,b,0,r.stringFilter);e._op&&e._op[C]&&e.kill(T,e._op[C]),S&&e._pt&&(ns=e,zt.killTweensOf(T,$,e.globalTime(t)),V=!e.parent,ns=0),e._pt&&l&&(_h[I.id]=1)}M&&rv(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!V,h&&t<=0&&v.render(Ci,!0,!0)},OM=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Th=1,e.vars[t]="+=0",op(e,a),Th=0,l?Ml(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=qt(n)+yn(f.e)),f.b&&(f.b=u.s+yn(f.b))},FM=function(e,t){var n=e[0]?Ys(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=Qo({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},BM=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(Mn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},il=function(e,t,n,r,s){return Wt(e)?e.call(t,n,r,s):fn(e)&&~e.indexOf("random(")?bl(e):e},Q0=np+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",ev={};Zn(Q0+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return ev[i]=1});var Jt=(function(i){v0(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:tl(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=r.parent||zt,S=(Mn(n)||y0(n)?kr(n[0]):"length"in r)?[n]:Pi(n),v,E,C,R,D,T,M,I;if(a._targets=S.length?ip(S):Ml("GSAP target "+n+" not found. https://gsap.com",!vi.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||Kl(c)||Kl(u)){if(r=a.vars,v=a.timeline=new Fn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:S}),v.kill(),v.parent=v._dp=wr(a),v._start=0,h||Kl(c)||Kl(u)){if(R=S.length,M=h&&B0(h),hr(h))for(D in h)~Q0.indexOf(D)&&(I||(I={}),I[D]=h[D]);for(E=0;E<R;E++)C=lu(r,ev),C.stagger=0,p&&(C.yoyoEase=p),I&&Qo(C,I),T=S[E],C.duration=+il(c,wr(a),E,T,S),C.delay=(+il(u,wr(a),E,T,S)||0)-a._delay,!h&&R===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(T,C,M?M(E,T,S):0),v._ease=pt.none;v.duration()?c=u=0:a.timeline=0}else if(g){tl(yi(v.vars.defaults,{ease:"none"})),v._ease=Ks(g.ease||r.ease||"none");var F=0,Y,$,j;if(Mn(g))g.forEach(function(W){return v.to(S,W,">")}),v.duration();else{C={};for(D in g)D==="ease"||D==="easeEach"||BM(D,g[D],C,g.easeEach);for(D in C)for(Y=C[D].sort(function(W,V){return W.t-V.t}),F=0,E=0;E<Y.length;E++)$=Y[E],j={ease:$.e,duration:($.t-(E?Y[E-1].t:0))/100*c},j[D]=$.v,v.to(S,j,F),F+=j.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!$d&&(ns=wr(a),zt.killTweensOf(S),ns=0),tr(b,wr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===Qt(b._time)&&$n(f)&&mM(wr(a))&&b.data!=="nested")&&(a._tTime=-Ct,a.render(Math.max(0,-u)||0)),m&&U0(wr(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Ct&&!u?l:r<Ct?0:r,h,d,g,_,m,p,b,S,v;if(!c)_M(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=Qt(f%_),f===l?(g=this._repeat,h=c):(m=Qt(f/_),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,h=c-h),m=ea(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(S&&this._yEase&&j0(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(Qt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(N0(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(h/c),this._from&&(this.ratio=b=1-b),!a&&f&&!s&&!m&&(gi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;S&&S.render(r<0?r:S._dur*S._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&vh(this,r,s,o),gi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&gi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&vh(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ps(this,1),!s&&!(u&&!a)&&(f||a||p)&&(gi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){El||di.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||op(this,c),u=this._ease(c/this._dur),OM(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Fu(this,0),this.parent||L0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Fa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ns&&ns.vars.overwrite!==!0)._first||Fa(this),this.parent&&o!==this.timeline.totalDuration()&&ta(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Pi(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&dM(a,l))return s==="all"&&(this._pt=0),Fa(this);for(f=this._op=this._op||[],s!=="all"&&(fn(s)&&(_={},Zn(s,function(b){return _[b]=1}),s=_),s=FM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Nu(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Fa(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return nl(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return nl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return zt.killTweensOf(r,s,o)},e})(wl);yi(Jt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Zn("staggerTo,staggerFrom,staggerFromTo",function(i){Jt[i]=function(){var e=new Fn,t=yh.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var ap=function(e,t,n){return e[t]=n},tv=function(e,t,n){return e[t](n)},kM=function(e,t,n,r){return e[t](r.fp,n)},zM=function(e,t,n){return e.setAttribute(t,n)},lp=function(e,t){return Wt(e[t])?tv:Zd(e[t])&&e.setAttribute?zM:ap},nv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},HM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},iv=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},cp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},VM=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},GM=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Nu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},WM=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},rv=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Jn=(function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||nv,this.d=l||this,this.set=c||ap,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=WM,this.m=n,this.mt=s,this.tween=r},i})();Zn(np+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return tp[i]=1});xi.TweenMax=xi.TweenLite=Jt;xi.TimelineLite=xi.TimelineMax=Fn;zt=new Fn({sortChildren:!1,defaults:Jo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});vi.stringFilter=q0;var js=[],zc={},XM=[],Mm=0,YM=0,lf=function(e){return(zc[e]||XM).map(function(t){return t()})},bh=function(){var e=Date.now(),t=[];e-Mm>2&&(lf("matchMediaInit"),js.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=$i.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),lf("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Mm=e,lf("matchMedia"))},sv=(function(){function i(t,n){this.selector=n&&Sh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=YM++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){Wt(n)&&(s=r,r=n,n=Wt);var o=this,a=function(){var c=Ft,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Sh(s)),Ft=o,f=r.apply(o,arguments),Wt(f)&&o._r.push(f),Ft=c,o.selector=u,o.isReverted=!1,f};return o.last=a,n===Wt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=Ft;Ft=null,n(this),Ft=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Jt&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Fn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Jt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=js.length;o--;)js[o].id===this.id&&js.splice(o,1)},e.revert=function(n){this.kill(n||{})},i})(),qM=(function(){function i(t){this.contexts=[],this.scope=t,Ft&&Ft.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){hr(n)||(n={matches:n});var o=new sv(0,s||this.scope),a=o.conditions={},l,c,u;Ft&&!o.selector&&(o.selector=Ft.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=$i.matchMedia(n[c]),l&&(js.indexOf(o)<0&&js.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(bh):l.addEventListener("change",bh)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i})(),uu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return W0(r)})},timeline:function(e){return new Fn(e)},getTweensOf:function(e,t){return zt.getTweensOf(e,t)},getProperty:function(e,t,n,r){fn(e)&&(e=Pi(e)[0]);var s=Ys(e||{}).get,o=n?D0:P0;return n==="native"&&(n=""),e&&(t?o((ui[t]&&ui[t].get||s)(e,t,n,r)):function(a,l,c){return o((ui[a]&&ui[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Pi(e),e.length>1){var r=e.map(function(u){return ti.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=ui[t],a=Ys(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Uo._pt=0,f.init(e,n?u+n:u,Uo,0,[e]),f.render(1,f),Uo._pt&&cp(1,Uo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=ti.to(e,yi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return zt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ks(e.ease,Jo.ease)),_m(Jo,e||{})},config:function(e){return _m(vi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!ui[a]&&!xi[a]&&Ml(t+" effect requires "+a+" plugin.")}),rf[t]=function(a,l,c){return n(Pi(a),yi(l||{},s),c)},o&&(Fn.prototype[t]=function(a,l,c){return this.add(rf[t](a,hr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){pt[e]=Ks(t)},parseEase:function(e,t){return arguments.length?Ks(e,t):pt},getById:function(e){return zt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Fn(e),r,s;for(n.smoothChildTiming=$n(e.smoothChildTiming),zt.remove(n),n._dp=0,n._time=n._tTime=zt._time,r=zt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Jt&&r.vars.onComplete===r._targets[0]))&&tr(n,r,r._start-r._delay),r=s;return tr(zt,n,0),n},context:function(e,t){return e?new sv(e,t):Ft},matchMedia:function(e){return new qM(e)},matchMediaRefresh:function(){return js.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||bh()},addEventListener:function(e,t){var n=zc[e]||(zc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=zc[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:EM,wrapYoyo:wM,distribute:B0,random:z0,snap:k0,normalize:bM,getUnit:yn,clamp:yM,splitColor:X0,toArray:Pi,selector:Sh,mapRange:V0,pipe:MM,unitize:TM,interpolate:AM,shuffle:F0},install:E0,effects:rf,ticker:di,updateRoot:Fn.updateRoot,plugins:ui,globalTimeline:zt,core:{PropTween:Jn,globals:w0,Tween:Jt,Timeline:Fn,Animation:wl,getCache:Ys,_removeLinkedListItem:Nu,reverting:function(){return pn},context:function(e){return e&&Ft&&(Ft.data.push(e),e._ctx=Ft),Ft},suppressOverwrites:function(e){return $d=e}}};Zn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return uu[i]=Jt[i]});di.add(Fn.updateRoot);Uo=uu.to({},{duration:0});var KM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},jM=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=KM(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},cf=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(fn(s)&&(l={},Zn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}jM(a,s)}}}},ti=uu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)pn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},cf("roundProps",Mh),cf("modifiers"),cf("snap",k0))||uu;Jt.version=Fn.version=ti.version="3.13.0";b0=1;Jd()&&na();pt.Power0;pt.Power1;pt.Power2;pt.Power3;pt.Power4;pt.Linear;pt.Quad;pt.Cubic;pt.Quart;pt.Quint;pt.Strong;pt.Elastic;pt.Back;pt.SteppedEase;pt.Bounce;pt.Sine;pt.Expo;pt.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Tm,is,Ho,up,Hs,bm,fp,$M=function(){return typeof window<"u"},zr={},Us=180/Math.PI,Vo=Math.PI/180,co=Math.atan2,Em=1e8,hp=/([A-Z])/g,ZM=/(left|right|width|margin|padding|x)/i,JM=/[\s,\(]\S/,rr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Eh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},QM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},eT=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},tT=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},ov=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},av=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},nT=function(e,t,n){return e.style[t]=n},iT=function(e,t,n){return e.style.setProperty(t,n)},rT=function(e,t,n){return e._gsap[t]=n},sT=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},oT=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},aT=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Ht="transform",Qn=Ht+"Origin",lT=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in zr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=rr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Ar(r,a)}):this.tfm[e]=o.x?o[e]:Ar(r,e),e===Qn&&(this.tfm.zOrigin=o.zOrigin);else return rr.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(Ht)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Qn,t,"")),e=Ht}(s||t)&&this.props.push(e,t,s[e])},lv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},cT=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(hp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=fp(),(!s||!s.isStart)&&!n[Ht]&&(lv(n),r.zOrigin&&n[Qn]&&(n[Qn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},cv=function(e,t){var n={target:e,props:[],revert:cT,save:lT};return e._gsap||ti.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},uv,wh=function(e,t){var n=is.createElementNS?is.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):is.createElement(e);return n&&n.style?n:is.createElement(e)},Di=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(hp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,ia(t)||t,1)||""},wm="O,Moz,ms,Ms,Webkit".split(","),ia=function(e,t,n){var r=t||Hs,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(wm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?wm[o]:"")+e},Ah=function(){$M()&&window.document&&(Tm=window,is=Tm.document,Ho=is.documentElement,Hs=wh("div")||{style:{}},wh("div"),Ht=ia(Ht),Qn=Ht+"Origin",Hs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",uv=!!ia("perspective"),fp=ti.core.reverting,up=1)},Am=function(e){var t=e.ownerSVGElement,n=wh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Ho.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Ho.removeChild(n),s},Rm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},fv=function(e){var t,n;try{t=e.getBBox()}catch{t=Am(e),n=1}return t&&(t.width||t.height)||n||(t=Am(e)),t&&!t.width&&!t.x&&!t.y?{x:+Rm(e,["x","cx","x1"])||0,y:+Rm(e,["y","cy","y1"])||0,width:0,height:0}:t},hv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&fv(e))},Qs=function(e,t){if(t){var n=e.style,r;t in zr&&t!==Qn&&(t=Ht),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(hp,"-$1").toLowerCase())):n.removeAttribute(t)}},rs=function(e,t,n,r,s,o){var a=new Jn(e._pt,t,n,0,1,o?av:ov);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},Cm={deg:1,rad:1,turn:1},uT={grid:1,flex:1},ms=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Hs.style,l=ZM.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||Cm[r]||Cm[o])return s;if(o!=="px"&&!h&&(s=i(e,t,n,"px")),p=e.getCTM&&hv(e),(d||o==="%")&&(zr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],qt(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===is||!_.appendChild)&&(_=is.body),m=_._gsap,m&&d&&m.width&&l&&m.time===di.time&&!m.uncache)return qt(s/m.width*f);if(d&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=f+r,g=e[u],b?e.style[t]=b:Qs(e,t)}else(d||o==="%")&&!uT[Di(_,"display")]&&(a.position=Di(e,"position")),_===e&&(a.position="static"),_.appendChild(Hs),g=Hs[u],_.removeChild(Hs),a.position="absolute";return l&&d&&(m=Ys(_),m.time=di.time,m.width=_[u]),qt(h?g*s/f:g&&s?f/g*s:0)},Ar=function(e,t,n,r){var s;return up||Ah(),t in rr&&t!=="transform"&&(t=rr[t],~t.indexOf(",")&&(t=t.split(",")[0])),zr[t]&&t!=="transform"?(s=Rl(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:hu(Di(e,Qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=fu[t]&&fu[t](e,t,n)||Di(e,t)||R0(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ms(e,t,s,n)+n:s},fT=function(e,t,n,r){if(!n||n==="none"){var s=ia(t,e,1),o=s&&Di(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Di(e,"borderTopColor"))}var a=new Jn(this._pt,e.style,t,0,1,iv),l=0,c=0,u,f,h,d,g,_,m,p,b,S,v,E;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Di(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=Di(e,t)||r,_?e.style[t]=_:Qs(e,t)),u=[n,r],q0(u),n=u[0],r=u[1],h=n.match(Io)||[],E=r.match(Io)||[],E.length){for(;f=Io.exec(r);)m=f[0],b=r.substring(l,f.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=zo(d,m)+v),p=parseFloat(m),S=m.substr((p+"").length),l=Io.lastIndex-S.length,S||(S=S||vi.units[t]||v,l===r.length&&(r+=S,a.e+=S)),v!==S&&(d=ms(e,t,_,S)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?av:ov;return M0.test(r)&&(a.e=0),this._pt=a,a},Pm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},hT=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=Pm[n]||n,t[1]=Pm[r]||r,t.join(" ")},dT=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],zr[a]&&(l=1,a=a==="transformOrigin"?Qn:Ht),Qs(n,a);l&&(Qs(n,Ht),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Rl(n,1),o.uncache=1,lv(r)))}},fu={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Jn(e._pt,t,n,0,0,dT);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},Al=[1,0,0,1,0,0],dv={},pv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Dm=function(e){var t=Di(e,Ht);return pv(t)?Al:t.substr(7).match(S0).map(qt)},dp=function(e,t){var n=e._gsap||Ys(e),r=e.style,s=Dm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Al:s):(s===Al&&!e.offsetParent&&e!==Ho&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ho.appendChild(e)),s=Dm(e),l?r.display=l:Qs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ho.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Rh=function(e,t,n,r,s,o){var a=e._gsap,l=s||dp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],S=t.split(" "),v=parseFloat(S[0])||0,E=parseFloat(S[1])||0,C,R,D,T;n?l!==Al&&(R=d*m-g*_)&&(D=v*(m/R)+E*(-_/R)+(_*b-m*p)/R,T=v*(-g/R)+E*(d/R)-(d*b-g*p)/R,v=D,E=T):(C=fv(e),v=C.x+(~S[0].indexOf("%")?v/100*C.width:v),E=C.y+(~(S[1]||S[0]).indexOf("%")?E/100*C.height:E)),r||r!==!1&&a.smooth?(p=v-c,b=E-u,a.xOffset=f+(p*d+b*_)-p,a.yOffset=h+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Qn]="0px 0px",o&&(rs(o,a,"xOrigin",c,v),rs(o,a,"yOrigin",u,E),rs(o,a,"xOffset",f,a.xOffset),rs(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},Rl=function(e,t){var n=e._gsap||new Z0(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Di(e,Qn)||"0",u,f,h,d,g,_,m,p,b,S,v,E,C,R,D,T,M,I,F,Y,$,j,W,V,B,ae,U,ge,Oe,et,Ke,qe;return u=f=h=_=m=p=b=S=v=0,d=g=1,n.svg=!!(e.getCTM&&hv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ht]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ht]!=="none"?l[Ht]:"")),r.scale=r.rotate=r.translate="none"),R=dp(e,n.svg),n.svg&&(n.uncache?(B=e.getBBox(),c=n.xOrigin-B.x+"px "+(n.yOrigin-B.y)+"px",V=""):V=!t&&e.getAttribute("data-svg-origin"),Rh(e,V||c,!!V||n.originIsAbsolute,n.smooth!==!1,R)),E=n.xOrigin||0,C=n.yOrigin||0,R!==Al&&(I=R[0],F=R[1],Y=R[2],$=R[3],u=j=R[4],f=W=R[5],R.length===6?(d=Math.sqrt(I*I+F*F),g=Math.sqrt($*$+Y*Y),_=I||F?co(F,I)*Us:0,b=Y||$?co(Y,$)*Us+_:0,b&&(g*=Math.abs(Math.cos(b*Vo))),n.svg&&(u-=E-(E*I+C*Y),f-=C-(E*F+C*$))):(qe=R[6],et=R[7],U=R[8],ge=R[9],Oe=R[10],Ke=R[11],u=R[12],f=R[13],h=R[14],D=co(qe,Oe),m=D*Us,D&&(T=Math.cos(-D),M=Math.sin(-D),V=j*T+U*M,B=W*T+ge*M,ae=qe*T+Oe*M,U=j*-M+U*T,ge=W*-M+ge*T,Oe=qe*-M+Oe*T,Ke=et*-M+Ke*T,j=V,W=B,qe=ae),D=co(-Y,Oe),p=D*Us,D&&(T=Math.cos(-D),M=Math.sin(-D),V=I*T-U*M,B=F*T-ge*M,ae=Y*T-Oe*M,Ke=$*M+Ke*T,I=V,F=B,Y=ae),D=co(F,I),_=D*Us,D&&(T=Math.cos(D),M=Math.sin(D),V=I*T+F*M,B=j*T+W*M,F=F*T-I*M,W=W*T-j*M,I=V,j=B),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=qt(Math.sqrt(I*I+F*F+Y*Y)),g=qt(Math.sqrt(W*W+qe*qe)),D=co(j,W),b=Math.abs(D)>2e-4?D*Us:0,v=Ke?1/(Ke<0?-Ke:Ke):0),n.svg&&(V=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!pv(Di(e,Ht)),V&&e.setAttribute("transform",V))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(d*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=qt(d),n.scaleY=qt(g),n.rotation=qt(_)+a,n.rotationX=qt(m)+a,n.rotationY=qt(p)+a,n.skewX=b+a,n.skewY=S+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Qn]=hu(c)),n.xOffset=n.yOffset=0,n.force3D=vi.force3D,n.renderTransform=n.svg?mT:uv?mv:pT,n.uncache=0,n},hu=function(e){return(e=e.split(" "))[0]+" "+e[1]},uf=function(e,t,n){var r=yn(t);return qt(parseFloat(t)+parseFloat(ms(e,"x",n+"px",r)))+r},pT=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,mv(e,t)},bs="0deg",ba="0px",Es=") ",mv=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,S=n.zOrigin,v="",E=p==="auto"&&e&&e!==1||p===!0;if(S&&(f!==bs||u!==bs)){var C=parseFloat(u)*Vo,R=Math.sin(C),D=Math.cos(C),T;C=parseFloat(f)*Vo,T=Math.cos(C),o=uf(b,o,R*T*-S),a=uf(b,a,-Math.sin(C)*-S),l=uf(b,l,D*T*-S+S)}m!==ba&&(v+="perspective("+m+Es),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(E||o!==ba||a!==ba||l!==ba)&&(v+=l!==ba||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Es),c!==bs&&(v+="rotate("+c+Es),u!==bs&&(v+="rotateY("+u+Es),f!==bs&&(v+="rotateX("+f+Es),(h!==bs||d!==bs)&&(v+="skew("+h+", "+d+Es),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Es),b.style[Ht]=v||"translate(0, 0)"},mT=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,S=parseFloat(o),v=parseFloat(a),E,C,R,D,T;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Vo,c*=Vo,E=Math.cos(l)*f,C=Math.sin(l)*f,R=Math.sin(l-c)*-h,D=Math.cos(l-c)*h,c&&(u*=Vo,T=Math.tan(c-u),T=Math.sqrt(1+T*T),R*=T,D*=T,u&&(T=Math.tan(u),T=Math.sqrt(1+T*T),E*=T,C*=T)),E=qt(E),C=qt(C),R=qt(R),D=qt(D)):(E=f,D=h,C=R=0),(S&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(S=ms(d,"x",o,"px"),v=ms(d,"y",a,"px")),(g||_||m||p)&&(S=qt(S+g-(g*E+_*R)+m),v=qt(v+_-(g*C+_*D)+p)),(r||s)&&(T=d.getBBox(),S=qt(S+r/100*T.width),v=qt(v+s/100*T.height)),T="matrix("+E+","+C+","+R+","+D+","+S+","+v+")",d.setAttribute("transform",T),b&&(d.style[Ht]=T)},gT=function(e,t,n,r,s){var o=360,a=fn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Us:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Em)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Em)%o-~~(c/o)*o)),e._pt=h=new Jn(e._pt,t,n,r,c,QM),h.e=u,h.u="deg",e._props.push(n),h},Lm=function(e,t){for(var n in t)e[n]=t[n];return e},_T=function(e,t,n){var r=Lm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,f,h,d,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ht]=t,a=Rl(n,1),Qs(n,Ht),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ht],o[Ht]=t,a=Rl(n,1),o[Ht]=c);for(l in zr)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=yn(c),g=yn(u),f=d!==g?ms(n,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Jn(e._pt,a,l,f,h-f,Eh),e._pt.u=g||0,e._props.push(l));Lm(a,r)};Zn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});fu[e>1?"border"+i:i]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Ar(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var gv={name:"css",register:Ah,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,f,h,d,g,_,m,p,b,S,v,E,C,R,D;up||Ah(),this.styles=this.styles||cv(e),D=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(ui[_]&&J0(_,t,n,r,e,s)))){if(d=typeof u,g=fu[_],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=bl(u)),g)g(this,e,_,u,n)&&(R=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",us.lastIndex=0,us.test(c)||(m=yn(c),p=yn(u)),p?m!==p&&(c=ms(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),D.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,e,s):l[_],fn(c)&&~c.indexOf("random(")&&(c=bl(c)),yn(c+"")||c==="auto"||(c+=vi.units[_]||yn(Ar(e,_))||""),(c+"").charAt(1)==="="&&(c=Ar(e,_))):c=Ar(e,_),h=parseFloat(c),b=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),f=parseFloat(u),_ in rr&&(_==="autoAlpha"&&(h===1&&Ar(e,"visibility")==="hidden"&&f&&(h=0),D.push("visibility",0,a.visibility),rs(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=rr[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in zr,S){if(this.styles.save(_),d==="string"&&u.substring(0,6)==="var(--"&&(u=Di(e,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),v||(E=e._gsap,E.renderTransform&&!t.parseTransform||Rl(e,t.parseTransform),C=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new Jn(this._pt,a,Ht,0,1,E.renderTransform,E,0,-1),v.dep=1),_==="scale")this._pt=new Jn(this._pt,E,"scaleY",E.scaleY,(b?zo(E.scaleY,b+f):f)-E.scaleY||0,Eh),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){D.push(Qn,0,a[Qn]),u=hT(u),E.svg?Rh(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&rs(this,E,"zOrigin",E.zOrigin,p),rs(this,a,_,hu(c),hu(u)));continue}else if(_==="svgOrigin"){Rh(e,u,1,C,0,this);continue}else if(_ in dv){gT(this,E,_,h,b?zo(h,b+u):u);continue}else if(_==="smoothOrigin"){rs(this,E,"smooth",E.smooth,u);continue}else if(_==="force3D"){E[_]=u;continue}else if(_==="transform"){_T(this,u,e);continue}}else _ in a||(_=ia(_)||_);if(S||(f||f===0)&&(h||h===0)&&!JM.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=yn(u)||(_ in vi.units?vi.units[_]:m),m!==p&&(h=ms(e,_,c,p)),this._pt=new Jn(this._pt,S?E:a,_,h,(b?zo(h,b+f):f)-h,!S&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?tT:Eh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=eT);else if(_ in a)fT.call(this,e,_,c,b?b+u:u);else if(_ in e)this.add(e,_,c||e[_],b?b+u:u,r,s);else if(_!=="parseTransform"){ep(_,u);continue}S||(_ in a?D.push(_,0,a[_]):typeof e[_]=="function"?D.push(_,2,e[_]()):D.push(_,1,c||e[_])),o.push(_)}}R&&rv(this)},render:function(e,t){if(t.tween._time||!fp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ar,aliases:rr,getSetter:function(e,t,n){var r=rr[t];return r&&r.indexOf(",")<0&&(t=r),t in zr&&t!==Qn&&(e._gsap.x||Ar(e,"x"))?n&&bm===n?t==="scale"?sT:rT:(bm=n||{})&&(t==="scale"?oT:aT):e.style&&!Zd(e.style[t])?nT:~t.indexOf("-")?iT:lp(e,t)},core:{_removeProperty:Qs,_getMatrix:dp}};ti.utils.checkPrefix=ia;ti.core.getStyleSaver=cv;(function(i,e,t,n){var r=Zn(i+","+e+","+t,function(s){zr[s]=1});Zn(e,function(s){vi.units[s]="deg",dv[s]=1}),rr[r[13]]=i+","+e,Zn(n,function(s){var o=s.split(":");rr[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Zn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){vi.units[i]="px"});ti.registerPlugin(gv);var kn=ti.registerPlugin(gv)||ti;kn.core.Tween;function vT(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function xT(i,e,t){return e&&vT(i.prototype,e),i}/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dn,Hc,pi,ss,os,Go,_v,Ns,rl,vv,Pr,Fi,xv,yv=function(){return dn||typeof window<"u"&&(dn=window.gsap)&&dn.registerPlugin&&dn},Sv=1,No=[],ut=[],cr=[],sl=Date.now,Ch=function(e,t){return t},yT=function(){var e=rl.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,ut),r.push.apply(r,cr),ut=n,cr=r,Ch=function(o,a){return t[o](a)}},fs=function(e,t){return~cr.indexOf(e)&&cr[cr.indexOf(e)+1][t]},ol=function(e){return!!~vv.indexOf(e)},Rn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},En=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},jl="scrollLeft",$l="scrollTop",Ph=function(){return Pr&&Pr.isPressed||ut.cache++},du=function(e,t){var n=function r(s){if(s||s===0){Sv&&(pi.history.scrollRestoration="manual");var o=Pr&&Pr.isPressed;s=r.v=Math.round(s)||(Pr&&Pr.iOS?1:0),e(s),r.cacheID=ut.cache,o&&Ch("ss",s)}else(t||ut.cache!==r.cacheID||Ch("ref"))&&(r.cacheID=ut.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},Bn={s:jl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:du(function(i){return arguments.length?pi.scrollTo(i,nn.sc()):pi.pageXOffset||ss[jl]||os[jl]||Go[jl]||0})},nn={s:$l,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Bn,sc:du(function(i){return arguments.length?pi.scrollTo(Bn.sc(),i):pi.pageYOffset||ss[$l]||os[$l]||Go[$l]||0})},qn=function(e,t){return(t&&t._ctx&&t._ctx.selector||dn.utils.toArray)(e)[0]||(typeof e=="string"&&dn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ST=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},gs=function(e,t){var n=t.s,r=t.sc;ol(e)&&(e=ss.scrollingElement||os);var s=ut.indexOf(e),o=r===nn.sc?1:2;!~s&&(s=ut.push(e)-1),ut[s+o]||Rn(e,"scroll",Ph);var a=ut[s+o],l=a||(ut[s+o]=du(fs(e,n),!0)||(ol(e)?r:du(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=dn.getProperty(e,"scrollBehavior")==="smooth"),l},Dh=function(e,t,n){var r=e,s=e,o=sl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=sl();_||m-o>l?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=n?0:r,a=o=0},h=function(g){var _=a,m=s,p=sl();return(g||g===0)&&g!==r&&u(g),o===a||p-a>c?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:h}},Ea=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Im=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Mv=function(){rl=dn.core.globals().ScrollTrigger,rl&&rl.core&&yT()},Tv=function(e){return dn=e||yv(),!Hc&&dn&&typeof document<"u"&&document.body&&(pi=window,ss=document,os=ss.documentElement,Go=ss.body,vv=[pi,ss,os,Go],dn.utils.clamp,xv=dn.core.context||function(){},Ns="onpointerenter"in Go?"pointer":"mouse",_v=Kt.isTouch=pi.matchMedia&&pi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in pi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Fi=Kt.eventTypes=("ontouchstart"in os?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in os?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Sv=0},500),Mv(),Hc=1),Hc};Bn.op=nn;ut.cache=0;var Kt=(function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Hc||Tv(dn)||console.warn("Please gsap.registerPlugin(Observer)"),rl||Mv();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,S=n.onPress,v=n.onRelease,E=n.onRight,C=n.onLeft,R=n.onUp,D=n.onDown,T=n.onChangeX,M=n.onChangeY,I=n.onChange,F=n.onToggleX,Y=n.onToggleY,$=n.onHover,j=n.onHoverEnd,W=n.onMove,V=n.ignoreCheck,B=n.isNormalizer,ae=n.onGestureStart,U=n.onGestureEnd,ge=n.onWheel,Oe=n.onEnable,et=n.onDisable,Ke=n.onClick,qe=n.scrollSpeed,ne=n.capture,se=n.allowClicks,Me=n.lockAxis,Ie=n.onLockAxis;this.target=a=qn(a)||os,this.vars=n,d&&(d=dn.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,qe=qe||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(pi.getComputedStyle(Go).lineHeight)||22);var Ce,We,L,x,G,Z,K,P=this,le=0,J=0,re=n.passive||!u&&n.passive!==!1,ie=gs(a,Bn),Se=gs(a,nn),A=ie(),y=Se(),O=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Fi[0]==="pointerdown",q=ol(a),ee=a.ownerDocument||ss,X=[0,0,0],ve=[0,0,0],ue=0,be=function(){return ue=sl()},me=function(Fe,Qe){return(P.event=Fe)&&d&&ST(Fe.target,d)||Qe&&O&&Fe.pointerType!=="touch"||V&&V(Fe,Qe)},he=function(){P._vx.reset(),P._vy.reset(),We.pause(),f&&f(P)},xe=function(){var Fe=P.deltaX=Im(X),Qe=P.deltaY=Im(ve),Te=Math.abs(Fe)>=r,Xe=Math.abs(Qe)>=r;I&&(Te||Xe)&&I(P,Fe,Qe,X,ve),Te&&(E&&P.deltaX>0&&E(P),C&&P.deltaX<0&&C(P),T&&T(P),F&&P.deltaX<0!=le<0&&F(P),le=P.deltaX,X[0]=X[1]=X[2]=0),Xe&&(D&&P.deltaY>0&&D(P),R&&P.deltaY<0&&R(P),M&&M(P),Y&&P.deltaY<0!=J<0&&Y(P),J=P.deltaY,ve[0]=ve[1]=ve[2]=0),(x||L)&&(W&&W(P),L&&(m&&L===1&&m(P),b&&b(P),L=0),x=!1),Z&&!(Z=!1)&&Ie&&Ie(P),G&&(ge(P),G=!1),Ce=0},Pe=function(Fe,Qe,Te){X[Te]+=Fe,ve[Te]+=Qe,P._vx.update(Fe),P._vy.update(Qe),c?Ce||(Ce=requestAnimationFrame(xe)):xe()},Ee=function(Fe,Qe){Me&&!K&&(P.axis=K=Math.abs(Fe)>Math.abs(Qe)?"x":"y",Z=!0),K!=="y"&&(X[2]+=Fe,P._vx.update(Fe,!0)),K!=="x"&&(ve[2]+=Qe,P._vy.update(Qe,!0)),c?Ce||(Ce=requestAnimationFrame(xe)):xe()},_e=function(Fe){if(!me(Fe,1)){Fe=Ea(Fe,u);var Qe=Fe.clientX,Te=Fe.clientY,Xe=Qe-P.x,ze=Te-P.y,$e=P.isDragging;P.x=Qe,P.y=Te,($e||(Xe||ze)&&(Math.abs(P.startX-Qe)>=s||Math.abs(P.startY-Te)>=s))&&(L=$e?2:1,$e||(P.isDragging=!0),Ee(Xe,ze))}},Ge=P.onPress=function(Re){me(Re,1)||Re&&Re.button||(P.axis=K=null,We.pause(),P.isPressed=!0,Re=Ea(Re),le=J=0,P.startX=P.x=Re.clientX,P.startY=P.y=Re.clientY,P._vx.reset(),P._vy.reset(),Rn(B?a:ee,Fi[1],_e,re,!0),P.deltaX=P.deltaY=0,S&&S(P))},N=P.onRelease=function(Re){if(!me(Re,1)){En(B?a:ee,Fi[1],_e,!0);var Fe=!isNaN(P.y-P.startY),Qe=P.isDragging,Te=Qe&&(Math.abs(P.x-P.startX)>3||Math.abs(P.y-P.startY)>3),Xe=Ea(Re);!Te&&Fe&&(P._vx.reset(),P._vy.reset(),u&&se&&dn.delayedCall(.08,function(){if(sl()-ue>300&&!Re.defaultPrevented){if(Re.target.click)Re.target.click();else if(ee.createEvent){var ze=ee.createEvent("MouseEvents");ze.initMouseEvent("click",!0,!0,pi,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),Re.target.dispatchEvent(ze)}}})),P.isDragging=P.isGesturing=P.isPressed=!1,f&&Qe&&!B&&We.restart(!0),L&&xe(),p&&Qe&&p(P),v&&v(P,Te)}},de=function(Fe){return Fe.touches&&Fe.touches.length>1&&(P.isGesturing=!0)&&ae(Fe,P.isDragging)},pe=function(){return(P.isGesturing=!1)||U(P)},we=function(Fe){if(!me(Fe)){var Qe=ie(),Te=Se();Pe((Qe-A)*qe,(Te-y)*qe,1),A=Qe,y=Te,f&&We.restart(!0)}},fe=function(Fe){if(!me(Fe)){Fe=Ea(Fe,u),ge&&(G=!0);var Qe=(Fe.deltaMode===1?l:Fe.deltaMode===2?pi.innerHeight:1)*g;Pe(Fe.deltaX*Qe,Fe.deltaY*Qe,0),f&&!B&&We.restart(!0)}},oe=function(Fe){if(!me(Fe)){var Qe=Fe.clientX,Te=Fe.clientY,Xe=Qe-P.x,ze=Te-P.y;P.x=Qe,P.y=Te,x=!0,f&&We.restart(!0),(Xe||ze)&&Ee(Xe,ze)}},Le=function(Fe){P.event=Fe,$(P)},Ve=function(Fe){P.event=Fe,j(P)},gt=function(Fe){return me(Fe)||Ea(Fe,u)&&Ke(P)};We=P._dc=dn.delayedCall(h||.25,he).pause(),P.deltaX=P.deltaY=0,P._vx=Dh(0,50,!0),P._vy=Dh(0,50,!0),P.scrollX=ie,P.scrollY=Se,P.isDragging=P.isGesturing=P.isPressed=!1,xv(this),P.enable=function(Re){return P.isEnabled||(Rn(q?ee:a,"scroll",Ph),o.indexOf("scroll")>=0&&Rn(q?ee:a,"scroll",we,re,ne),o.indexOf("wheel")>=0&&Rn(a,"wheel",fe,re,ne),(o.indexOf("touch")>=0&&_v||o.indexOf("pointer")>=0)&&(Rn(a,Fi[0],Ge,re,ne),Rn(ee,Fi[2],N),Rn(ee,Fi[3],N),se&&Rn(a,"click",be,!0,!0),Ke&&Rn(a,"click",gt),ae&&Rn(ee,"gesturestart",de),U&&Rn(ee,"gestureend",pe),$&&Rn(a,Ns+"enter",Le),j&&Rn(a,Ns+"leave",Ve),W&&Rn(a,Ns+"move",oe)),P.isEnabled=!0,P.isDragging=P.isGesturing=P.isPressed=x=L=!1,P._vx.reset(),P._vy.reset(),A=ie(),y=Se(),Re&&Re.type&&Ge(Re),Oe&&Oe(P)),P},P.disable=function(){P.isEnabled&&(No.filter(function(Re){return Re!==P&&ol(Re.target)}).length||En(q?ee:a,"scroll",Ph),P.isPressed&&(P._vx.reset(),P._vy.reset(),En(B?a:ee,Fi[1],_e,!0)),En(q?ee:a,"scroll",we,ne),En(a,"wheel",fe,ne),En(a,Fi[0],Ge,ne),En(ee,Fi[2],N),En(ee,Fi[3],N),En(a,"click",be,!0),En(a,"click",gt),En(ee,"gesturestart",de),En(ee,"gestureend",pe),En(a,Ns+"enter",Le),En(a,Ns+"leave",Ve),En(a,Ns+"move",oe),P.isEnabled=P.isPressed=P.isDragging=!1,et&&et(P))},P.kill=P.revert=function(){P.disable();var Re=No.indexOf(P);Re>=0&&No.splice(Re,1),Pr===P&&(Pr=0)},No.push(P),B&&ol(a)&&(Pr=P),P.enable(_)},xT(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i})();Kt.version="3.13.0";Kt.create=function(i){return new Kt(i)};Kt.register=Tv;Kt.getAll=function(){return No.slice()};Kt.getById=function(i){return No.filter(function(e){return e.vars.id===i})[0]};yv()&&dn.registerPlugin(Kt);/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ne,Po,ct,Pt,hi,xt,pp,pu,Cl,al,ka,Zl,_n,Bu,Lh,Dn,Um,Nm,Do,bv,ff,Ev,Pn,Ih,wv,Av,Zr,Uh,mp,Wo,gp,mu,Nh,hf,Jl=1,vn=Date.now,df=vn(),Ii=0,za=0,Om=function(e,t,n){var r=ci(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Fm=function(e,t){return t&&(!ci(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},MT=function i(){return za&&requestAnimationFrame(i)},Bm=function(){return Bu=1},km=function(){return Bu=0},Zi=function(e){return e},Ha=function(e){return Math.round(e*1e5)/1e5||0},Rv=function(){return typeof window<"u"},Cv=function(){return Ne||Rv()&&(Ne=window.gsap)&&Ne.registerPlugin&&Ne},eo=function(e){return!!~pp.indexOf(e)},Pv=function(e){return(e==="Height"?gp:ct["inner"+e])||hi["client"+e]||xt["client"+e]},Dv=function(e){return fs(e,"getBoundingClientRect")||(eo(e)?function(){return Yc.width=ct.innerWidth,Yc.height=gp,Yc}:function(){return Cr(e)})},TT=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=fs(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?Pv(s):e["client"+s])||0}},bT=function(e,t){return!t||~cr.indexOf(e)?Dv(e):function(){return Yc}},sr=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=fs(e,n))?o()-Dv(e)()[s]:eo(e)?(hi[n]||xt[n])-Pv(r):e[n]-e["offset"+r])},Ql=function(e,t){for(var n=0;n<Do.length;n+=3)(!t||~t.indexOf(Do[n+1]))&&e(Do[n],Do[n+1],Do[n+2])},ci=function(e){return typeof e=="string"},Sn=function(e){return typeof e=="function"},Va=function(e){return typeof e=="number"},Os=function(e){return typeof e=="object"},wa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},pf=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},uo=Math.abs,Lv="left",Iv="top",_p="right",vp="bottom",$s="width",Zs="height",ll="Right",cl="Left",ul="Top",fl="Bottom",Zt="padding",Ai="margin",ra="Width",xp="Height",tn="px",Ri=function(e){return ct.getComputedStyle(e)},ET=function(e){var t=Ri(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},zm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Cr=function(e,t){var n=t&&Ri(e)[Lh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ne.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect();return n&&n.progress(0).kill(),r},gu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Uv=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},wT=function(e){return function(t){return Ne.utils.snap(Uv(e),t)}},yp=function(e){var t=Ne.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},AT=function(e){return function(t,n){return yp(Uv(e))(t,n.direction)}},ec=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},ln=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},an=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},tc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Hm={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},nc={toggleActions:"play",anticipatePin:0},_u={top:0,left:0,center:.5,bottom:1,right:1},Vc=function(e,t){if(ci(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in _u?_u[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},ic=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Pt.createElement("div"),_=eo(n)||fs(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?xt:n,b=e.indexOf("start")!==-1,S=b?c:u,v="border-color:"+S+";font-size:"+f+";color:"+S+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(r===nn?_p:vp)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],Gc(g,0,r,b),g},Gc=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+ra]=1,s["border"+a+ra]=0,s[n.p]=t+"px",Ne.set(e,s)},at=[],Oh={},Pl,Vm=function(){return vn()-Ii>34&&(Pl||(Pl=requestAnimationFrame(Ir)))},fo=function(){(!Pn||!Pn.isPressed||Pn.startX>xt.clientWidth)&&(ut.cache++,Pn?Pl||(Pl=requestAnimationFrame(Ir)):Ir(),Ii||no("scrollStart"),Ii=vn())},mf=function(){Av=ct.innerWidth,wv=ct.innerHeight},Ga=function(e){ut.cache++,(e===!0||!_n&&!Ev&&!Pt.fullscreenElement&&!Pt.webkitFullscreenElement&&(!Ih||Av!==ct.innerWidth||Math.abs(ct.innerHeight-wv)>ct.innerHeight*.25))&&pu.restart(!0)},to={},RT=[],Nv=function i(){return an(Je,"scrollEnd",i)||Vs(!0)},no=function(e){return to[e]&&to[e].map(function(t){return t()})||RT},li=[],Ov=function(e){for(var t=0;t<li.length;t+=5)(!e||li[t+4]&&li[t+4].query===e)&&(li[t].style.cssText=li[t+1],li[t].getBBox&&li[t].setAttribute("transform",li[t+2]||""),li[t+3].uncache=1)},Sp=function(e,t){var n;for(Dn=0;Dn<at.length;Dn++)n=at[Dn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));mu=!0,t&&Ov(t),t||no("revert")},Fv=function(e,t){ut.cache++,(t||!Ln)&&ut.forEach(function(n){return Sn(n)&&n.cacheID++&&(n.rec=0)}),ci(e)&&(ct.history.scrollRestoration=mp=e)},Ln,Js=0,Gm,CT=function(){if(Gm!==Js){var e=Gm=Js;requestAnimationFrame(function(){return e===Js&&Vs(!0)})}},Bv=function(){xt.appendChild(Wo),gp=!Pn&&Wo.offsetHeight||ct.innerHeight,xt.removeChild(Wo)},Wm=function(e){return Cl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Vs=function(e,t){if(hi=Pt.documentElement,xt=Pt.body,pp=[ct,Pt,hi,xt],Ii&&!e&&!mu){ln(Je,"scrollEnd",Nv);return}Bv(),Ln=Je.isRefreshing=!0,ut.forEach(function(r){return Sn(r)&&++r.cacheID&&(r.rec=r())});var n=no("refreshInit");bv&&Je.sort(),t||Sp(),ut.forEach(function(r){Sn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),at.slice(0).forEach(function(r){return r.refresh()}),mu=!1,at.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Nh=1,Wm(!0),at.forEach(function(r){var s=sr(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Wm(!1),Nh=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),ut.forEach(function(r){Sn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Fv(mp,1),pu.pause(),Js++,Ln=2,Ir(2),at.forEach(function(r){return Sn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Ln=Je.isRefreshing=!1,no("refresh")},Fh=0,Wc=1,hl,Ir=function(e){if(e===2||!Ln&&!mu){Je.isUpdating=!0,hl&&hl.update(0);var t=at.length,n=vn(),r=n-df>=50,s=t&&at[0].scroll();if(Wc=Fh>s?-1:1,Ln||(Fh=s),r&&(Ii&&!Bu&&n-Ii>200&&(Ii=0,no("scrollEnd")),ka=df,df=n),Wc<0){for(Dn=t;Dn-- >0;)at[Dn]&&at[Dn].update(0,r);Wc=1}else for(Dn=0;Dn<t;Dn++)at[Dn]&&at[Dn].update(0,r);Je.isUpdating=!1}Pl=0},Bh=[Lv,Iv,vp,_p,Ai+fl,Ai+ll,Ai+ul,Ai+cl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Xc=Bh.concat([$s,Zs,"boxSizing","max"+ra,"max"+xp,"position",Ai,Zt,Zt+ul,Zt+ll,Zt+fl,Zt+cl]),PT=function(e,t,n){Xo(n);var r=e._gsap;if(r.spacerIsNative)Xo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},gf=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Bh.length,o=t.style,a=e.style,l;s--;)l=Bh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[vp]=a[_p]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[$s]=gu(e,Bn)+tn,o[Zs]=gu(e,nn)+tn,o[Zt]=a[Ai]=a[Iv]=a[Lv]="0",Xo(r),a[$s]=a["max"+ra]=n[$s],a[Zs]=a["max"+xp]=n[Zs],a[Zt]=n[Zt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},DT=/([A-Z])/g,Xo=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||Ne.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(DT,"-$1").toLowerCase())}},rc=function(e){for(var t=Xc.length,n=e.style,r=[],s=0;s<t;s++)r.push(Xc[s],n[Xc[s]]);return r.t=e,r},LT=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Yc={left:0,top:0},Xm=function(e,t,n,r,s,o,a,l,c,u,f,h,d,g){Sn(e)&&(e=e(l)),ci(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Vc("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,b;if(d&&d.seek(0),isNaN(e)||(e=+e),Va(e))d&&(e=Ne.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&Gc(a,n,r,!0);else{Sn(t)&&(t=t(l));var S=(e||"0").split(" "),v,E,C,R;b=qn(t,l)||xt,v=Cr(b)||{},(!v||!v.left&&!v.top)&&Ri(b).display==="none"&&(R=b.style.display,b.style.display="block",v=Cr(b),R?b.style.display=R:b.style.removeProperty("display")),E=Vc(S[0],v[r.d]),C=Vc(S[1]||"0",n),e=v[r.p]-c[r.p]-u+E+s-C,a&&Gc(a,C,r,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var D=e+n,T=o._isStart;m="scroll"+r.d2,Gc(o,D,r,T&&D>20||!T&&(f?Math.max(xt[m],hi[m]):o.parentNode[m])<=D+1),f&&(c=Cr(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+tn))}return d&&b&&(m=Cr(b),d.seek(h),p=Cr(b),d._caScrollDist=m[r.p]-p[r.p],e=e/d._caScrollDist*h),d&&d.seek(_),d?e:Math.round(e)},IT=/(webkit|moz|length|cssText|inset)/i,Ym=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===xt){e._stOrig=s.cssText,a=Ri(e);for(o in a)!+o&&!IT.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;Ne.core.getCache(e).uncache=1,t.appendChild(e)}},kv=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},sc=function(e,t,n){var r={};r[t.p]="+="+n,Ne.set(e,r)},qm=function(e,t){var n=gs(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||n();var _=kv(n,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){ut.cache++,o.tween&&Ir()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Ne.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ln(e,"wheel",n.wheelHandler),Je.isTouch&&ln(e,"touchmove",n.wheelHandler),s},Je=(function(){function i(t,n){Po||i.register(Ne)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Uh(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!za){this.update=this.refresh=this.kill=Zi;return}n=zm(ci(n)||Va(n)||n.nodeType?{trigger:n}:n,nc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,S=s.once,v=s.snap,E=s.pinReparent,C=s.pinSpacer,R=s.containerAnimation,D=s.fastScrollEnd,T=s.preventOverlaps,M=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Bn:nn,I=!f&&f!==0,F=qn(n.scroller||ct),Y=Ne.core.getCache(F),$=eo(F),j=("pinType"in n?n.pinType:fs(F,"pinType")||$&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],V=I&&n.toggleActions.split(" "),B="markers"in n?n.markers:nc.markers,ae=$?0:parseFloat(Ri(F)["border"+M.p2+ra])||0,U=this,ge=n.onRefreshInit&&function(){return n.onRefreshInit(U)},Oe=TT(F,$,M),et=bT(F,$),Ke=0,qe=0,ne=0,se=gs(F,M),Me,Ie,Ce,We,L,x,G,Z,K,P,le,J,re,ie,Se,A,y,O,q,ee,X,ve,ue,be,me,he,xe,Pe,Ee,_e,Ge,N,de,pe,we,fe,oe,Le,Ve;if(U._startClamp=U._endClamp=!1,U._dir=M,m*=45,U.scroller=F,U.scroll=R?R.time.bind(R):se,We=se(),U.vars=n,r=r||n.animation,"refreshPriority"in n&&(bv=1,n.refreshPriority===-9999&&(hl=U)),Y.tweenScroll=Y.tweenScroll||{top:qm(F,nn),left:qm(F,Bn)},U.tweenTo=Me=Y.tweenScroll[M.p],U.scrubDuration=function(Te){de=Va(Te)&&Te,de?N?N.duration(Te):N=Ne.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:de,paused:!0,onComplete:function(){return p&&p(U)}}):(N&&N.progress(1).kill(),N=0)},r&&(r.vars.lazy=!1,r._initted&&!U.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),U.animation=r.pause(),r.scrollTrigger=U,U.scrubDuration(f),_e=0,l||(l=r.vars.id)),v&&((!Os(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in xt.style&&Ne.set($?[xt,hi]:F,{scrollBehavior:"auto"}),ut.forEach(function(Te){return Sn(Te)&&Te.target===($?Pt.scrollingElement||hi:F)&&(Te.smooth=!1)}),Ce=Sn(v.snapTo)?v.snapTo:v.snapTo==="labels"?wT(r):v.snapTo==="labelsDirectional"?AT(r):v.directional!==!1?function(Te,Xe){return yp(v.snapTo)(Te,vn()-qe<500?0:Xe.direction)}:Ne.utils.snap(v.snapTo),pe=v.duration||{min:.1,max:2},pe=Os(pe)?al(pe.min,pe.max):al(pe,pe),we=Ne.delayedCall(v.delay||de/2||.1,function(){var Te=se(),Xe=vn()-qe<500,ze=Me.tween;if((Xe||Math.abs(U.getVelocity())<10)&&!ze&&!Bu&&Ke!==Te){var $e=(Te-x)/ie,Xt=r&&!I?r.totalProgress():$e,it=Xe?0:(Xt-Ge)/(vn()-ka)*1e3||0,Ot=Ne.utils.clamp(-$e,1-$e,uo(it/2)*it/.185),Yt=$e+(v.inertia===!1?0:Ot),It,wt,St=v,ni=St.onStart,Ut=St.onInterrupt,Tn=St.onComplete;if(It=Ce(Yt,U),Va(It)||(It=Yt),wt=Math.max(0,Math.round(x+It*ie)),Te<=G&&Te>=x&&wt!==Te){if(ze&&!ze._initted&&ze.data<=uo(wt-Te))return;v.inertia===!1&&(Ot=It-$e),Me(wt,{duration:pe(uo(Math.max(uo(Yt-Xt),uo(It-Xt))*.185/it/.05||0)),ease:v.ease||"power3",data:uo(wt-Te),onInterrupt:function(){return we.restart(!0)&&Ut&&Ut(U)},onComplete:function(){U.update(),Ke=se(),r&&!I&&(N?N.resetTo("totalProgress",It,r._tTime/r._tDur):r.progress(It)),_e=Ge=r&&!I?r.totalProgress():U.progress,b&&b(U),Tn&&Tn(U)}},Te,Ot*ie,wt-Te-Ot*ie),ni&&ni(U,Me.tween)}}else U.isActive&&Ke!==Te&&we.restart(!0)}).pause()),l&&(Oh[l]=U),h=U.trigger=qn(h||d!==!0&&d),Ve=h&&h._gsap&&h._gsap.stRevert,Ve&&(Ve=Ve(U)),d=d===!0?h:qn(d),ci(a)&&(a={targets:h,className:a}),d&&(g===!1||g===Ai||(g=!g&&d.parentNode&&d.parentNode.style&&Ri(d.parentNode).display==="flex"?!1:Zt),U.pin=d,Ie=Ne.core.getCache(d),Ie.spacer?Se=Ie.pinState:(C&&(C=qn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Ie.spacerIsNative=!!C,C&&(Ie.spacerState=rc(C))),Ie.spacer=O=C||Pt.createElement("div"),O.classList.add("pin-spacer"),l&&O.classList.add("pin-spacer-"+l),Ie.pinState=Se=rc(d)),n.force3D!==!1&&Ne.set(d,{force3D:!0}),U.spacer=O=Ie.spacer,Ee=Ri(d),be=Ee[g+M.os2],ee=Ne.getProperty(d),X=Ne.quickSetter(d,M.a,tn),gf(d,O,Ee),y=rc(d)),B){J=Os(B)?zm(B,Hm):Hm,P=ic("scroller-start",l,F,M,J,0),le=ic("scroller-end",l,F,M,J,0,P),q=P["offset"+M.op.d2];var gt=qn(fs(F,"content")||F);Z=this.markerStart=ic("start",l,gt,M,J,q,0,R),K=this.markerEnd=ic("end",l,gt,M,J,q,0,R),R&&(Le=Ne.quickSetter([Z,K],M.a,tn)),!j&&!(cr.length&&fs(F,"fixedMarkers")===!0)&&(ET($?xt:F),Ne.set([P,le],{force3D:!0}),he=Ne.quickSetter(P,M.a,tn),Pe=Ne.quickSetter(le,M.a,tn))}if(R){var Re=R.vars.onUpdate,Fe=R.vars.onUpdateParams;R.eventCallback("onUpdate",function(){U.update(0,0,1),Re&&Re.apply(R,Fe||[])})}if(U.previous=function(){return at[at.indexOf(U)-1]},U.next=function(){return at[at.indexOf(U)+1]},U.revert=function(Te,Xe){if(!Xe)return U.kill(!0);var ze=Te!==!1||!U.enabled,$e=_n;ze!==U.isReverted&&(ze&&(fe=Math.max(se(),U.scroll.rec||0),ne=U.progress,oe=r&&r.progress()),Z&&[Z,K,P,le].forEach(function(Xt){return Xt.style.display=ze?"none":"block"}),ze&&(_n=U,U.update(ze)),d&&(!E||!U.isActive)&&(ze?PT(d,O,Se):gf(d,O,Ri(d),me)),ze||U.update(ze),_n=$e,U.isReverted=ze)},U.refresh=function(Te,Xe,ze,$e){if(!((_n||!U.enabled)&&!Xe)){if(d&&Te&&Ii){ln(i,"scrollEnd",Nv);return}!Ln&&ge&&ge(U),_n=U,Me.tween&&!ze&&(Me.tween.kill(),Me.tween=0),N&&N.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(ft){return ft.vars.immediateRender&&ft.render(0,!0,!0)})),U.isReverted||U.revert(!0,!0),U._subPinOffset=!1;var Xt=Oe(),it=et(),Ot=R?R.duration():sr(F,M),Yt=ie<=.01||!ie,It=0,wt=$e||0,St=Os(ze)?ze.end:n.end,ni=n.endTrigger||h,Ut=Os(ze)?ze.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),Tn=U.pinnedContainer=n.pinnedContainer&&qn(n.pinnedContainer,U),Si=h&&Math.max(0,at.indexOf(U))||0,en=Si,w,k,Q,te,z,ce,ye,Ue,De,He,ke,Be,tt;for(B&&Os(ze)&&(Be=Ne.getProperty(P,M.p),tt=Ne.getProperty(le,M.p));en-- >0;)ce=at[en],ce.end||ce.refresh(0,1)||(_n=U),ye=ce.pin,ye&&(ye===h||ye===d||ye===Tn)&&!ce.isReverted&&(He||(He=[]),He.unshift(ce),ce.revert(!0,!0)),ce!==at[en]&&(Si--,en--);for(Sn(Ut)&&(Ut=Ut(U)),Ut=Om(Ut,"start",U),x=Xm(Ut,h,Xt,M,se(),Z,P,U,it,ae,j,Ot,R,U._startClamp&&"_startClamp")||(d?-.001:0),Sn(St)&&(St=St(U)),ci(St)&&!St.indexOf("+=")&&(~St.indexOf(" ")?St=(ci(Ut)?Ut.split(" ")[0]:"")+St:(It=Vc(St.substr(2),Xt),St=ci(Ut)?Ut:(R?Ne.utils.mapRange(0,R.duration(),R.scrollTrigger.start,R.scrollTrigger.end,x):x)+It,ni=h)),St=Om(St,"end",U),G=Math.max(x,Xm(St||(ni?"100% 0":Ot),ni,Xt,M,se()+It,K,le,U,it,ae,j,Ot,R,U._endClamp&&"_endClamp"))||-.001,It=0,en=Si;en--;)ce=at[en],ye=ce.pin,ye&&ce.start-ce._pinPush<=x&&!R&&ce.end>0&&(w=ce.end-(U._startClamp?Math.max(0,ce.start):ce.start),(ye===h&&ce.start-ce._pinPush<x||ye===Tn)&&isNaN(Ut)&&(It+=w*(1-ce.progress)),ye===d&&(wt+=w));if(x+=It,G+=It,U._startClamp&&(U._startClamp+=It),U._endClamp&&!Ln&&(U._endClamp=G||-.001,G=Math.min(G,sr(F,M))),ie=G-x||(x-=.01)&&.001,Yt&&(ne=Ne.utils.clamp(0,1,Ne.utils.normalize(x,G,fe))),U._pinPush=wt,Z&&It&&(w={},w[M.a]="+="+It,Tn&&(w[M.p]="-="+se()),Ne.set([Z,K],w)),d&&!(Nh&&U.end>=sr(F,M)))w=Ri(d),te=M===nn,Q=se(),ve=parseFloat(ee(M.a))+wt,!Ot&&G>1&&(ke=($?Pt.scrollingElement||hi:F).style,ke={style:ke,value:ke["overflow"+M.a.toUpperCase()]},$&&Ri(xt)["overflow"+M.a.toUpperCase()]!=="scroll"&&(ke.style["overflow"+M.a.toUpperCase()]="scroll")),gf(d,O,w),y=rc(d),k=Cr(d,!0),Ue=j&&gs(F,te?Bn:nn)(),g?(me=[g+M.os2,ie+wt+tn],me.t=O,en=g===Zt?gu(d,M)+ie+wt:0,en&&(me.push(M.d,en+tn),O.style.flexBasis!=="auto"&&(O.style.flexBasis=en+tn)),Xo(me),Tn&&at.forEach(function(ft){ft.pin===Tn&&ft.vars.pinSpacing!==!1&&(ft._subPinOffset=!0)}),j&&se(fe)):(en=gu(d,M),en&&O.style.flexBasis!=="auto"&&(O.style.flexBasis=en+tn)),j&&(z={top:k.top+(te?Q-x:Ue)+tn,left:k.left+(te?Ue:Q-x)+tn,boxSizing:"border-box",position:"fixed"},z[$s]=z["max"+ra]=Math.ceil(k.width)+tn,z[Zs]=z["max"+xp]=Math.ceil(k.height)+tn,z[Ai]=z[Ai+ul]=z[Ai+ll]=z[Ai+fl]=z[Ai+cl]="0",z[Zt]=w[Zt],z[Zt+ul]=w[Zt+ul],z[Zt+ll]=w[Zt+ll],z[Zt+fl]=w[Zt+fl],z[Zt+cl]=w[Zt+cl],A=LT(Se,z,E),Ln&&se(0)),r?(De=r._initted,ff(1),r.render(r.duration(),!0,!0),ue=ee(M.a)-ve+ie+wt,xe=Math.abs(ie-ue)>1,j&&xe&&A.splice(A.length-2,2),r.render(0,!0,!0),De||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),ff(0)):ue=ie,ke&&(ke.value?ke.style["overflow"+M.a.toUpperCase()]=ke.value:ke.style.removeProperty("overflow-"+M.a));else if(h&&se()&&!R)for(k=h.parentNode;k&&k!==xt;)k._pinOffset&&(x-=k._pinOffset,G-=k._pinOffset),k=k.parentNode;He&&He.forEach(function(ft){return ft.revert(!1,!0)}),U.start=x,U.end=G,We=L=Ln?fe:se(),!R&&!Ln&&(We<fe&&se(fe),U.scroll.rec=0),U.revert(!1,!0),qe=vn(),we&&(Ke=-1,we.restart(!0)),_n=0,r&&I&&(r._initted||oe)&&r.progress()!==oe&&r.progress(oe||0,!0).render(r.time(),!0,!0),(Yt||ne!==U.progress||R||_||r&&!r._initted)&&(r&&!I&&(r._initted||ne||r.vars.immediateRender!==!1)&&r.totalProgress(R&&x<-.001&&!ne?Ne.utils.normalize(x,G,0):ne,!0),U.progress=Yt||(We-x)/ie===ne?0:ne),d&&g&&(O._pinOffset=Math.round(U.progress*ue)),N&&N.invalidate(),isNaN(Be)||(Be-=Ne.getProperty(P,M.p),tt-=Ne.getProperty(le,M.p),sc(P,M,Be),sc(Z,M,Be-($e||0)),sc(le,M,tt),sc(K,M,tt-($e||0))),Yt&&!Ln&&U.update(),u&&!Ln&&!re&&(re=!0,u(U),re=!1)}},U.getVelocity=function(){return(se()-L)/(vn()-ka)*1e3||0},U.endAnimation=function(){wa(U.callbackAnimation),r&&(N?N.progress(1):r.paused()?I||wa(r,U.direction<0,1):wa(r,r.reversed()))},U.labelToScroll=function(Te){return r&&r.labels&&(x||U.refresh()||x)+r.labels[Te]/r.duration()*ie||0},U.getTrailing=function(Te){var Xe=at.indexOf(U),ze=U.direction>0?at.slice(0,Xe).reverse():at.slice(Xe+1);return(ci(Te)?ze.filter(function($e){return $e.vars.preventOverlaps===Te}):ze).filter(function($e){return U.direction>0?$e.end<=x:$e.start>=G})},U.update=function(Te,Xe,ze){if(!(R&&!ze&&!Te)){var $e=Ln===!0?fe:U.scroll(),Xt=Te?0:($e-x)/ie,it=Xt<0?0:Xt>1?1:Xt||0,Ot=U.progress,Yt,It,wt,St,ni,Ut,Tn,Si;if(Xe&&(L=We,We=R?se():$e,v&&(Ge=_e,_e=r&&!I?r.totalProgress():it)),m&&d&&!_n&&!Jl&&Ii&&(!it&&x<$e+($e-L)/(vn()-ka)*m?it=1e-4:it===1&&G>$e+($e-L)/(vn()-ka)*m&&(it=.9999)),it!==Ot&&U.enabled){if(Yt=U.isActive=!!it&&it<1,It=!!Ot&&Ot<1,Ut=Yt!==It,ni=Ut||!!it!=!!Ot,U.direction=it>Ot?1:-1,U.progress=it,ni&&!_n&&(wt=it&&!Ot?0:it===1?1:Ot===1?2:3,I&&(St=!Ut&&V[wt+1]!=="none"&&V[wt+1]||V[wt],Si=r&&(St==="complete"||St==="reset"||St in r))),T&&(Ut||Si)&&(Si||f||!r)&&(Sn(T)?T(U):U.getTrailing(T).forEach(function(Q){return Q.endAnimation()})),I||(N&&!_n&&!Jl?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",it,r._tTime/r._tDur):(N.vars.totalProgress=it,N.invalidate().restart())):r&&r.totalProgress(it,!!(_n&&(qe||Te)))),d){if(Te&&g&&(O.style[g+M.os2]=be),!j)X(Ha(ve+ue*it));else if(ni){if(Tn=!Te&&it>Ot&&G+1>$e&&$e+1>=sr(F,M),E)if(!Te&&(Yt||Tn)){var en=Cr(d,!0),w=$e-x;Ym(d,xt,en.top+(M===nn?w:0)+tn,en.left+(M===nn?0:w)+tn)}else Ym(d,O);Xo(Yt||Tn?A:y),xe&&it<1&&Yt||X(ve+(it===1&&!Tn?ue:0))}}v&&!Me.tween&&!_n&&!Jl&&we.restart(!0),a&&(Ut||S&&it&&(it<1||!hf))&&Cl(a.targets).forEach(function(Q){return Q.classList[Yt||S?"add":"remove"](a.className)}),o&&!I&&!Te&&o(U),ni&&!_n?(I&&(Si&&(St==="complete"?r.pause().totalProgress(1):St==="reset"?r.restart(!0).pause():St==="restart"?r.restart(!0):r[St]()),o&&o(U)),(Ut||!hf)&&(c&&Ut&&pf(U,c),W[wt]&&pf(U,W[wt]),S&&(it===1?U.kill(!1,1):W[wt]=0),Ut||(wt=it===1?1:3,W[wt]&&pf(U,W[wt]))),D&&!Yt&&Math.abs(U.getVelocity())>(Va(D)?D:2500)&&(wa(U.callbackAnimation),N?N.progress(1):wa(r,St==="reverse"?1:!it,1))):I&&o&&!_n&&o(U)}if(Pe){var k=R?$e/R.duration()*(R._caScrollDist||0):$e;he(k+(P._isFlipped?1:0)),Pe(k)}Le&&Le(-$e/R.duration()*(R._caScrollDist||0))}},U.enable=function(Te,Xe){U.enabled||(U.enabled=!0,ln(F,"resize",Ga),$||ln(F,"scroll",fo),ge&&ln(i,"refreshInit",ge),Te!==!1&&(U.progress=ne=0,We=L=Ke=se()),Xe!==!1&&U.refresh())},U.getTween=function(Te){return Te&&Me?Me.tween:N},U.setPositions=function(Te,Xe,ze,$e){if(R){var Xt=R.scrollTrigger,it=R.duration(),Ot=Xt.end-Xt.start;Te=Xt.start+Ot*Te/it,Xe=Xt.start+Ot*Xe/it}U.refresh(!1,!1,{start:Fm(Te,ze&&!!U._startClamp),end:Fm(Xe,ze&&!!U._endClamp)},$e),U.update()},U.adjustPinSpacing=function(Te){if(me&&Te){var Xe=me.indexOf(M.d)+1;me[Xe]=parseFloat(me[Xe])+Te+tn,me[1]=parseFloat(me[1])+Te+tn,Xo(me)}},U.disable=function(Te,Xe){if(U.enabled&&(Te!==!1&&U.revert(!0,!0),U.enabled=U.isActive=!1,Xe||N&&N.pause(),fe=0,Ie&&(Ie.uncache=1),ge&&an(i,"refreshInit",ge),we&&(we.pause(),Me.tween&&Me.tween.kill()&&(Me.tween=0)),!$)){for(var ze=at.length;ze--;)if(at[ze].scroller===F&&at[ze]!==U)return;an(F,"resize",Ga),$||an(F,"scroll",fo)}},U.kill=function(Te,Xe){U.disable(Te,Xe),N&&!Xe&&N.kill(),l&&delete Oh[l];var ze=at.indexOf(U);ze>=0&&at.splice(ze,1),ze===Dn&&Wc>0&&Dn--,ze=0,at.forEach(function($e){return $e.scroller===U.scroller&&(ze=1)}),ze||Ln||(U.scroll.rec=0),r&&(r.scrollTrigger=null,Te&&r.revert({kill:!1}),Xe||r.kill()),Z&&[Z,K,P,le].forEach(function($e){return $e.parentNode&&$e.parentNode.removeChild($e)}),hl===U&&(hl=0),d&&(Ie&&(Ie.uncache=1),ze=0,at.forEach(function($e){return $e.pin===d&&ze++}),ze||(Ie.spacer=0)),n.onKill&&n.onKill(U)},at.push(U),U.enable(!1,!1),Ve&&Ve(U),r&&r.add&&!ie){var Qe=U.update;U.update=function(){U.update=Qe,ut.cache++,x||G||U.refresh()},Ne.delayedCall(.01,U.update),ie=.01,x=G=0}else U.refresh();d&&CT()},i.register=function(n){return Po||(Ne=n||Cv(),Rv()&&window.document&&i.enable(),Po=za),Po},i.defaults=function(n){if(n)for(var r in n)nc[r]=n[r];return nc},i.disable=function(n,r){za=0,at.forEach(function(o){return o[r?"kill":"disable"](n)}),an(ct,"wheel",fo),an(Pt,"scroll",fo),clearInterval(Zl),an(Pt,"touchcancel",Zi),an(xt,"touchstart",Zi),ec(an,Pt,"pointerdown,touchstart,mousedown",Bm),ec(an,Pt,"pointerup,touchend,mouseup",km),pu.kill(),Ql(an);for(var s=0;s<ut.length;s+=3)tc(an,ut[s],ut[s+1]),tc(an,ut[s],ut[s+2])},i.enable=function(){if(ct=window,Pt=document,hi=Pt.documentElement,xt=Pt.body,Ne&&(Cl=Ne.utils.toArray,al=Ne.utils.clamp,Uh=Ne.core.context||Zi,ff=Ne.core.suppressOverwrites||Zi,mp=ct.history.scrollRestoration||"auto",Fh=ct.pageYOffset||0,Ne.core.globals("ScrollTrigger",i),xt)){za=1,Wo=document.createElement("div"),Wo.style.height="100vh",Wo.style.position="absolute",Bv(),MT(),Kt.register(Ne),i.isTouch=Kt.isTouch,Zr=Kt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ih=Kt.isTouch===1,ln(ct,"wheel",fo),pp=[ct,Pt,hi,xt],Ne.matchMedia?(i.matchMedia=function(c){var u=Ne.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Ne.addEventListener("matchMediaInit",function(){return Sp()}),Ne.addEventListener("matchMediaRevert",function(){return Ov()}),Ne.addEventListener("matchMedia",function(){Vs(0,1),no("matchMedia")}),Ne.matchMedia().add("(orientation: portrait)",function(){return mf(),mf})):console.warn("Requires GSAP 3.11.0 or later"),mf(),ln(Pt,"scroll",fo);var n=xt.hasAttribute("style"),r=xt.style,s=r.borderTopStyle,o=Ne.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Cr(xt),nn.m=Math.round(a.top+nn.sc())||0,Bn.m=Math.round(a.left+Bn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(xt.setAttribute("style",""),xt.removeAttribute("style")),Zl=setInterval(Vm,250),Ne.delayedCall(.5,function(){return Jl=0}),ln(Pt,"touchcancel",Zi),ln(xt,"touchstart",Zi),ec(ln,Pt,"pointerdown,touchstart,mousedown",Bm),ec(ln,Pt,"pointerup,touchend,mouseup",km),Lh=Ne.utils.checkPrefix("transform"),Xc.push(Lh),Po=vn(),pu=Ne.delayedCall(.2,Vs).pause(),Do=[Pt,"visibilitychange",function(){var c=ct.innerWidth,u=ct.innerHeight;Pt.hidden?(Um=c,Nm=u):(Um!==c||Nm!==u)&&Ga()},Pt,"DOMContentLoaded",Vs,ct,"load",Vs,ct,"resize",Ga],Ql(ln),at.forEach(function(c){return c.enable(0,1)}),l=0;l<ut.length;l+=3)tc(an,ut[l],ut[l+1]),tc(an,ut[l],ut[l+2])}},i.config=function(n){"limitCallbacks"in n&&(hf=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Zl)||(Zl=r)&&setInterval(Vm,r),"ignoreMobileResize"in n&&(Ih=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ql(an)||Ql(ln,n.autoRefreshEvents||"none"),Ev=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=qn(n),o=ut.indexOf(s),a=eo(s);~o&&ut.splice(o,a?6:2),r&&(a?cr.unshift(ct,r,xt,r,hi,r):cr.unshift(s,r))},i.clearMatchMedia=function(n){at.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(ci(n)?qn(n):n).getBoundingClientRect(),a=o[s?$s:Zs]*r||0;return s?o.right-a>0&&o.left+a<ct.innerWidth:o.bottom-a>0&&o.top+a<ct.innerHeight},i.positionInViewport=function(n,r,s){ci(n)&&(n=qn(n));var o=n.getBoundingClientRect(),a=o[s?$s:Zs],l=r==null?a/2:r in _u?_u[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ct.innerWidth:(o.top+l)/ct.innerHeight},i.killAll=function(n){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=to.killAll||[];to={},r.forEach(function(s){return s()})}},i})();Je.version="3.13.0";Je.saveStyles=function(i){return i?Cl(i).forEach(function(e){if(e&&e.style){var t=li.indexOf(e);t>=0&&li.splice(t,5),li.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ne.core.getCache(e),Uh())}}):li};Je.revert=function(i,e){return Sp(!i,e)};Je.create=function(i,e){return new Je(i,e)};Je.refresh=function(i){return i?Ga(!0):(Po||Je.register())&&Vs(!0)};Je.update=function(i){return++ut.cache&&Ir(i===!0?2:0)};Je.clearScrollMemory=Fv;Je.maxScroll=function(i,e){return sr(i,e?Bn:nn)};Je.getScrollFunc=function(i,e){return gs(qn(i),e?Bn:nn)};Je.getById=function(i){return Oh[i]};Je.getAll=function(){return at.filter(function(i){return i.vars.id!=="ScrollSmoother"})};Je.isScrolling=function(){return!!Ii};Je.snapDirectional=yp;Je.addEventListener=function(i,e){var t=to[i]||(to[i]=[]);~t.indexOf(e)||t.push(e)};Je.removeEventListener=function(i,e){var t=to[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Je.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=Ne.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Sn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Sn(s)&&(s=s(),ln(Je,"refresh",function(){return s=e.batchMax()})),Cl(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Je.create(c))}),t};var Km=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},_f=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Kt.isTouch?" pinch-zoom":""):"none",e===hi&&i(xt,t)},oc={auto:1,scroll:1},UT=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ne.core.getCache(s),a=vn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==xt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(oc[(l=Ri(s)).overflowY]||oc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!eo(s)&&(oc[(l=Ri(s)).overflowY]||oc[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},zv=function(e,t,n,r){return Kt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&UT,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&ln(Pt,Kt.eventTypes[0],$m,!1,!0)},onDisable:function(){return an(Pt,Kt.eventTypes[0],$m,!0)}})},NT=/(input|label|select|textarea)/i,jm,$m=function(e){var t=NT.test(e.target.tagName);(t||jm)&&(e._gsapAllow=!0,jm=t)},OT=function(e){Os(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=qn(e.target)||hi,u=Ne.core.globals().ScrollSmoother,f=u&&u.get(),h=Zr&&(e.content&&qn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=gs(c,nn),g=gs(c,Bn),_=1,m=(Kt.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,p=0,b=Sn(r)?function(){return r(a)}:function(){return r||2.8},S,v,E=zv(c,e.type,!0,s),C=function(){return v=!1},R=Zi,D=Zi,T=function(){l=sr(c,nn),D=al(Zr?1:0,l),n&&(R=al(0,sr(c,Bn))),S=Js},M=function(){h._gsap.y=Ha(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},I=function(){if(v){requestAnimationFrame(C);var B=Ha(a.deltaY/2),ae=D(d.v-B);if(h&&ae!==d.v+d.offset){d.offset=ae-d.v;var U=Ha((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+U+", 0, 1)",h._gsap.y=U+"px",d.cacheID=ut.cache,Ir()}return!0}d.offset&&M(),v=!0},F,Y,$,j,W=function(){T(),F.isActive()&&F.vars.scrollY>l&&(d()>l?F.progress(1)&&d(l):F.resetTo("scrollY",l))};return h&&Ne.set(h,{y:"+=0"}),e.ignoreCheck=function(V){return Zr&&V.type==="touchmove"&&I()||_>1.05&&V.type!=="touchstart"||a.isGesturing||V.touches&&V.touches.length>1},e.onPress=function(){v=!1;var V=_;_=Ha((ct.visualViewport&&ct.visualViewport.scale||1)/m),F.pause(),V!==_&&_f(c,_>1.01?!0:n?!1:"x"),Y=g(),$=d(),T(),S=Js},e.onRelease=e.onGestureStart=function(V,B){if(d.offset&&M(),!B)j.restart(!0);else{ut.cache++;var ae=b(),U,ge;n&&(U=g(),ge=U+ae*.05*-V.velocityX/.227,ae*=Km(g,U,ge,sr(c,Bn)),F.vars.scrollX=R(ge)),U=d(),ge=U+ae*.05*-V.velocityY/.227,ae*=Km(d,U,ge,sr(c,nn)),F.vars.scrollY=D(ge),F.invalidate().duration(ae).play(.01),(Zr&&F.vars.scrollY>=l||U>=l-1)&&Ne.to({},{onUpdate:W,duration:ae})}o&&o(V)},e.onWheel=function(){F._ts&&F.pause(),vn()-p>1e3&&(S=0,p=vn())},e.onChange=function(V,B,ae,U,ge){if(Js!==S&&T(),B&&n&&g(R(U[2]===B?Y+(V.startX-V.x):g()+B-U[1])),ae){d.offset&&M();var Oe=ge[2]===ae,et=Oe?$+V.startY-V.y:d()+ae-ge[1],Ke=D(et);Oe&&et!==Ke&&($+=Ke-et),d(Ke)}(ae||B)&&Ir()},e.onEnable=function(){_f(c,n?!1:"x"),Je.addEventListener("refresh",W),ln(ct,"resize",W),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),E.enable()},e.onDisable=function(){_f(c,!0),an(ct,"resize",W),Je.removeEventListener("refresh",W),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new Kt(e),a.iOS=Zr,Zr&&!d()&&d(1),Zr&&Ne.ticker.add(Zi),j=a._dc,F=Ne.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:kv(d,d(),function(){return F.pause()})},onUpdate:Ir,onComplete:j.vars.onComplete}),a};Je.sort=function(i){if(Sn(i))return at.sort(i);var e=ct.pageYOffset||0;return Je.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),at.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Je.observe=function(i){return new Kt(i)};Je.normalizeScroll=function(i){if(typeof i>"u")return Pn;if(i===!0&&Pn)return Pn.enable();if(i===!1){Pn&&Pn.kill(),Pn=i;return}var e=i instanceof Kt?i:OT(i);return Pn&&Pn.target===e.target&&Pn.kill(),eo(e.target)&&(Pn=e),e};Je.core={_getVelocityProp:Dh,_inputObserver:zv,_scrollers:ut,_proxies:cr,bridge:{ss:function(){Ii||no("scrollStart"),Ii=vn()},ref:function(){return _n}}};Cv()&&Ne.registerPlugin(Je);const FT={id:"hero-section",class:"section"},BT={__name:"HeroSection",setup(i){return kn.registerPlugin(Je),so(()=>{const e=r=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:r}))},t={default:{position:{x:0,y:-2,z:0},rotation:{x:0,y:180,z:0},camera:{x:0,y:0,z:24,mm:20}}};e(t.default);const n=document.querySelectorAll(".top_right_btn button");n.length>=2&&n[1].addEventListener("click",()=>e(t.explore)),Je.create({trigger:"#hero-section",start:"top top",end:"bottom top",scrub:1,onEnter:()=>e(t.default),onEnterBack:()=>e(t.default)})}),(e,t)=>(_s(),vs("section",FT,[...t[0]||(t[0]=[Uu('<div class="w-screen bg-black h-screen relative mb-[200px]"><div class="flex items-center justify-between p-4 relative z-50 font-pop"><div class="img_box"><img src="'+iM+'" alt="" class="h-[36px]"></div><div><h1 class="text-white text-center ms-20 text-2xl mt-2 font-rob font-bold">iPhone 17 Pro</h1></div><div class="top_right_btn flex gap-2 items-center justify-center text-stone-300"><button class="liquid-glass p-2 px-4 rounded-full hover:bg-stone-100 transition duration-300 hover:text-stone-800 hover:shadow-inner">Sign-in</button><button class="liquid-glass p-2 px-4 rounded-full bg-white text-stone-800 hover:bg-opacity-5 hover:text-stone-100 transition duration-300">Explore</button></div></div><div class="img_box w-full pt-28 relative"><div class="fixed bg-orange-500 bg-opacity-10 h-[500px] w-[500px] rounded-full top-1/3 left-1/3 blur-[200px]"></div></div></div>',1)])]))}},kT=(i,e)=>{const t=i.__vccOpts||i;for(const[n,r]of e)t[n]=r;return t};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mp="180",zT=0,Zm=1,HT=2,Tp=1,VT=2,br=3,Hr=0,ei=1,nr=2,Ur=0,Yo=1,kh=2,Jm=3,Qm=4,GT=5,ks=100,WT=101,XT=102,YT=103,qT=104,KT=200,jT=201,$T=202,ZT=203,zh=204,Hh=205,JT=206,QT=207,eb=208,tb=209,nb=210,ib=211,rb=212,sb=213,ob=214,Vh=0,Gh=1,Wh=2,sa=3,Xh=4,Yh=5,qh=6,Kh=7,Hv=0,ab=1,lb=2,hs=0,cb=1,ub=2,fb=3,hb=4,db=5,pb=6,Vv=7,eg="attached",mb="detached",Gv=300,oa=301,aa=302,jh=303,$h=304,ku=306,la=1e3,as=1001,vu=1002,Hn=1003,Wv=1004,Wa=1005,_i=1006,qc=1007,Dr=1008,dr=1009,Xv=1010,Yv=1011,Dl=1012,bp=1013,io=1014,zi=1015,Nr=1016,Ep=1017,wp=1018,Ll=1020,qv=35902,Kv=35899,jv=1021,$v=1022,Li=1023,Il=1026,Ul=1027,Ap=1028,Rp=1029,Zv=1030,Cp=1031,Pp=1033,Kc=33776,jc=33777,$c=33778,Zc=33779,Zh=35840,Jh=35841,Qh=35842,ed=35843,td=36196,nd=37492,id=37496,rd=37808,sd=37809,od=37810,ad=37811,ld=37812,cd=37813,ud=37814,fd=37815,hd=37816,dd=37817,pd=37818,md=37819,gd=37820,_d=37821,vd=36492,xd=36494,yd=36495,Sd=36283,Md=36284,Td=36285,bd=36286,Nl=2300,Ol=2301,vf=2302,tg=2400,ng=2401,ig=2402,gb=2500,_b=0,Jv=1,Ed=2,vb=3200,xb=3201,Qv=0,yb=1,ts="",hn="srgb",Wn="srgb-linear",xu="linear",bt="srgb",ho=7680,rg=519,Sb=512,Mb=513,Tb=514,ex=515,bb=516,Eb=517,wb=518,Ab=519,wd=35044,sg="300 es",or=2e3,yu=2001;class ga{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let og=1234567;const dl=Math.PI/180,ca=180/Math.PI;function Vi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function Dp(i,e){return(i%e+e)%e}function Rb(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Cb(i,e,t){return i!==e?(t-i)/(e-i):0}function pl(i,e,t){return(1-t)*i+t*e}function Pb(i,e,t,n){return pl(i,e,1-Math.exp(-t*n))}function Db(i,e=1){return e-Math.abs(Dp(i,e*2)-e)}function Lb(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ib(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ub(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Nb(i,e){return i+Math.random()*(e-i)}function Ob(i){return i*(.5-Math.random())}function Fb(i){i!==void 0&&(og=i);let e=og+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bb(i){return i*dl}function kb(i){return i*ca}function zb(i){return(i&i-1)===0&&i!==0}function Hb(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vb(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gb(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),f=s((e-n)/2),h=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*f,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*f,a*c);break;case"ZXZ":i.set(l*f,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Bi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Wb={DEG2RAD:dl,RAD2DEG:ca,generateUUID:Vi,clamp:ht,euclideanModulo:Dp,mapLinear:Rb,inverseLerp:Cb,lerp:pl,damp:Pb,pingpong:Db,smoothstep:Lb,smootherstep:Ib,randInt:Ub,randFloat:Nb,randFloatSpread:Ob,seededRandom:Fb,degToRad:Bb,radToDeg:kb,isPowerOfTwo:zb,ceilPowerOfTwo:Hb,floorPowerOfTwo:Vb,setQuaternionFromProperEuler:Gb,normalize:Mt,denormalize:Bi};class Ze{constructor(e=0,t=0){Ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ys{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const E=Math.sqrt(S),C=Math.atan2(E,p*b);m=Math.sin(m*C)/E,a=Math.sin(a*C)/E}const v=a*b;if(l=l*m+h*v,c=c*m+d*v,u=u*m+g*v,f=f*m+_*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=E,c*=E,u*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),f=a(s/2),h=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,n=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ag.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ag.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),f=2*(s*n-o*t);return this.x=t+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xf.copy(this).projectOnVector(e),this.sub(xf)}reflect(e){return this.sub(xf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xf=new H,ag=new ys;class nt{constructor(e,t,n,r,s,o,a,l,c){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],b=r[1],S=r[4],v=r[7],E=r[2],C=r[5],R=r[8];return s[0]=o*_+a*b+l*E,s[3]=o*m+a*S+l*C,s[6]=o*p+a*v+l*R,s[1]=c*_+u*b+f*E,s[4]=c*m+u*S+f*C,s[7]=c*p+u*v+f*R,s[2]=h*_+d*b+g*E,s[5]=h*m+d*S+g*C,s[8]=h*p+d*v+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(yf.makeScale(e,t)),this}rotate(e){return this.premultiply(yf.makeRotation(-e)),this}translate(e,t){return this.premultiply(yf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yf=new nt;function tx(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fl(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xb(){const i=Fl("canvas");return i.style.display="block",i}const lg={};function Bl(i){i in lg||(lg[i]=!0,console.warn(i))}function Yb(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const cg=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ug=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qb(){const i={enabled:!0,workingColorSpace:Wn,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=Or(r.r),r.g=Or(r.g),r.b=Or(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=qo(r.r),r.g=qo(r.g),r.b=qo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ts?xu:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Bl("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Bl("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wn]:{primaries:e,whitePoint:n,transfer:xu,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const mt=qb();function Or(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let po;class Kb{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{po===void 0&&(po=Fl("canvas")),po.width=e.width,po.height=e.height;const r=po.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=po}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Or(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Or(t[n]/255)*255):t[n]=Or(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jb=0;class Lp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jb++}),this.uuid=Vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Sf(r[o].image)):s.push(Sf(r[o]))}else s=Sf(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Sf(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kb.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $b=0;const Mf=new H;class cn extends ga{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,n=as,r=as,s=_i,o=Dr,a=Li,l=dr,c=cn.DEFAULT_ANISOTROPY,u=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$b++}),this.uuid=Vi(),this.name="",this.source=new Lp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Mf).x}get height(){return this.source.getSize(Mf).y}get depth(){return this.source.getSize(Mf).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case la:e.x=e.x-Math.floor(e.x);break;case as:e.x=e.x<0?0:1;break;case vu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case la:e.y=e.y-Math.floor(e.y);break;case as:e.y=e.y<0?0:1;break;case vu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Gv;cn.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,n=0,r=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(d+1)/2,E=(p+1)/2,C=(u+h)/4,R=(f+_)/4,D=(g+m)/4;return S>v&&S>E?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=C/n,s=R/n):v>E?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=C/r,s=D/r):E<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),n=R/s,r=D/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zb extends ga{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_i,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new cn(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:_i,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Lp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends Zb{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nx extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jb extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ui):Ui.fromBufferAttribute(s,o),Ui.applyMatrix4(e.matrixWorld),this.expandByPoint(Ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ac.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ac.copy(n.boundingBox)),ac.applyMatrix4(e.matrixWorld),this.union(ac)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ui),Ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Aa),lc.subVectors(this.max,Aa),mo.subVectors(e.a,Aa),go.subVectors(e.b,Aa),_o.subVectors(e.c,Aa),Wr.subVectors(go,mo),Xr.subVectors(_o,go),ws.subVectors(mo,_o);let t=[0,-Wr.z,Wr.y,0,-Xr.z,Xr.y,0,-ws.z,ws.y,Wr.z,0,-Wr.x,Xr.z,0,-Xr.x,ws.z,0,-ws.x,-Wr.y,Wr.x,0,-Xr.y,Xr.x,0,-ws.y,ws.x,0];return!Tf(t,mo,go,_o,lc)||(t=[1,0,0,0,1,0,0,0,1],!Tf(t,mo,go,_o,lc))?!1:(cc.crossVectors(Wr,Xr),t=[cc.x,cc.y,cc.z],Tf(t,mo,go,_o,lc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vr=[new H,new H,new H,new H,new H,new H,new H,new H],Ui=new H,ac=new Gr,mo=new H,go=new H,_o=new H,Wr=new H,Xr=new H,ws=new H,Aa=new H,lc=new H,cc=new H,As=new H;function Tf(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){As.fromArray(i,s);const a=r.x*Math.abs(As.x)+r.y*Math.abs(As.y)+r.z*Math.abs(As.z),l=e.dot(As),c=t.dot(As),u=n.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Qb=new Gr,Ra=new H,bf=new H;class mr{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Qb.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);const t=Ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ra,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add(bf)),this.expandByPoint(Ra.copy(e.center).sub(bf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xr=new H,Ef=new H,uc=new H,Yr=new H,wf=new H,fc=new H,Af=new H;class zu{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xr.copy(this.origin).addScaledVector(this.direction,t),xr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ef.copy(e).add(t).multiplyScalar(.5),uc.copy(t).sub(e).normalize(),Yr.copy(this.origin).sub(Ef);const s=e.distanceTo(t)*.5,o=-this.direction.dot(uc),a=Yr.dot(this.direction),l=-Yr.dot(uc),c=Yr.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ef).addScaledVector(uc,h),d}intersectSphere(e,t){xr.subVectors(e.center,this.origin);const n=xr.dot(this.direction),r=xr.dot(xr)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,xr)!==null}intersectTriangle(e,t,n,r,s){wf.subVectors(t,e),fc.subVectors(n,e),Af.crossVectors(wf,fc);let o=this.direction.dot(Af),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yr.subVectors(this.origin,e);const l=a*this.direction.dot(fc.crossVectors(Yr,fc));if(l<0)return null;const c=a*this.direction.dot(wf.cross(Yr));if(c<0||l+c>o)return null;const u=-a*Yr.dot(Af);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/vo.setFromMatrixColumn(e,0).length(),s=1/vo.setFromMatrixColumn(e,1).length(),o=1/vo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(eE,e,tE)}lookAt(e,t,n){const r=this.elements;return si.subVectors(e,t),si.lengthSq()===0&&(si.z=1),si.normalize(),qr.crossVectors(n,si),qr.lengthSq()===0&&(Math.abs(n.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),qr.crossVectors(n,si)),qr.normalize(),hc.crossVectors(si,qr),r[0]=qr.x,r[4]=hc.x,r[8]=si.x,r[1]=qr.y,r[5]=hc.y,r[9]=si.y,r[2]=qr.z,r[6]=hc.z,r[10]=si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],E=n[15],C=r[0],R=r[4],D=r[8],T=r[12],M=r[1],I=r[5],F=r[9],Y=r[13],$=r[2],j=r[6],W=r[10],V=r[14],B=r[3],ae=r[7],U=r[11],ge=r[15];return s[0]=o*C+a*M+l*$+c*B,s[4]=o*R+a*I+l*j+c*ae,s[8]=o*D+a*F+l*W+c*U,s[12]=o*T+a*Y+l*V+c*ge,s[1]=u*C+f*M+h*$+d*B,s[5]=u*R+f*I+h*j+d*ae,s[9]=u*D+f*F+h*W+d*U,s[13]=u*T+f*Y+h*V+d*ge,s[2]=g*C+_*M+m*$+p*B,s[6]=g*R+_*I+m*j+p*ae,s[10]=g*D+_*F+m*W+p*U,s[14]=g*T+_*Y+m*V+p*ge,s[3]=b*C+S*M+v*$+E*B,s[7]=b*R+S*I+v*j+E*ae,s[11]=b*D+S*F+v*W+E*U,s[15]=b*T+S*Y+v*V+E*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+n*c*h+r*a*d-n*l*d)+_*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+n*o*d+s*a*u-n*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,S=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,v=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,E=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,C=t*b+n*S+r*v+s*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return e[0]=b*R,e[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*R,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*R,e[3]=(f*l*s-a*h*s-f*r*c+n*h*c+a*r*d-n*l*d)*R,e[4]=S*R,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*R,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*R,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*R,e[8]=v*R,e[9]=(g*f*s-u*_*s-g*n*d+t*_*d+u*n*p-t*f*p)*R,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*R,e[11]=(u*a*s-o*f*s-u*n*c+t*f*c+o*n*d-t*a*d)*R,e[12]=E*R,e[13]=(u*_*r-g*f*r+g*n*h-t*_*h-u*n*m+t*f*m)*R,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*R,e[15]=(o*f*r-u*a*r+u*n*l-t*f*l-o*n*h+t*a*h)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,b=l*c,S=l*u,v=l*f,E=n.x,C=n.y,R=n.z;return r[0]=(1-(_+p))*E,r[1]=(d+v)*E,r[2]=(g-S)*E,r[3]=0,r[4]=(d-v)*C,r[5]=(1-(h+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(g+S)*R,r[9]=(m-b)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=vo.set(r[0],r[1],r[2]).length();const o=vo.set(r[4],r[5],r[6]).length(),a=vo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ni.copy(this);const c=1/s,u=1/o,f=1/a;return Ni.elements[0]*=c,Ni.elements[1]*=c,Ni.elements[2]*=c,Ni.elements[4]*=u,Ni.elements[5]*=u,Ni.elements[6]*=u,Ni.elements[8]*=f,Ni.elements[9]*=f,Ni.elements[10]*=f,t.setFromRotationMatrix(Ni),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=or,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===or)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===yu)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=or,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===or)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===yu)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vo=new H,Ni=new ot,eE=new H(0,0,0),tE=new H(1,1,1),qr=new H,hc=new H,si=new H,fg=new ot,hg=new ys;class pr{constructor(e=0,t=0,n=0,r=pr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fg,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hg.setFromEuler(this),this.setFromQuaternion(hg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pr.DEFAULT_ORDER="XYZ";class ix{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nE=0;const dg=new H,xo=new ys,yr=new ot,dc=new H,Ca=new H,iE=new H,rE=new ys,pg=new H(1,0,0),mg=new H(0,1,0),gg=new H(0,0,1),_g={type:"added"},sE={type:"removed"},yo={type:"childadded",child:null},Rf={type:"childremoved",child:null};class Vt extends ga{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nE++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new H,t=new pr,n=new ys,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new nt}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ix,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xo.setFromAxisAngle(e,t),this.quaternion.multiply(xo),this}rotateOnWorldAxis(e,t){return xo.setFromAxisAngle(e,t),this.quaternion.premultiply(xo),this}rotateX(e){return this.rotateOnAxis(pg,e)}rotateY(e){return this.rotateOnAxis(mg,e)}rotateZ(e){return this.rotateOnAxis(gg,e)}translateOnAxis(e,t){return dg.copy(e).applyQuaternion(this.quaternion),this.position.add(dg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pg,e)}translateY(e){return this.translateOnAxis(mg,e)}translateZ(e){return this.translateOnAxis(gg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dc.copy(e):dc.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yr.lookAt(Ca,dc,this.up):yr.lookAt(dc,Ca,this.up),this.quaternion.setFromRotationMatrix(yr),r&&(yr.extractRotation(r.matrixWorld),xo.setFromRotationMatrix(yr),this.quaternion.premultiply(xo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_g),yo.child=e,this.dispatchEvent(yo),yo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sE),Rf.child=e,this.dispatchEvent(Rf),Rf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yr.multiply(e.parent.matrixWorld)),e.applyMatrix4(yr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_g),yo.child=e,this.dispatchEvent(yo),yo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,e,iE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,rE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new H(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Oi=new H,Sr=new H,Cf=new H,Mr=new H,So=new H,Mo=new H,vg=new H,Pf=new H,Df=new H,Lf=new H,If=new vt,Uf=new vt,Nf=new vt;class ki{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Oi.subVectors(e,t),r.cross(Oi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Oi.subVectors(r,t),Sr.subVectors(n,t),Cf.subVectors(e,t);const o=Oi.dot(Oi),a=Oi.dot(Sr),l=Oi.dot(Cf),c=Sr.dot(Sr),u=Sr.dot(Cf),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Mr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mr.x),l.addScaledVector(o,Mr.y),l.addScaledVector(a,Mr.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return If.setScalar(0),Uf.setScalar(0),Nf.setScalar(0),If.fromBufferAttribute(e,t),Uf.fromBufferAttribute(e,n),Nf.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(If,s.x),o.addScaledVector(Uf,s.y),o.addScaledVector(Nf,s.z),o}static isFrontFacing(e,t,n,r){return Oi.subVectors(n,t),Sr.subVectors(e,t),Oi.cross(Sr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),Sr.subVectors(this.a,this.b),Oi.cross(Sr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ki.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ki.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return ki.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return ki.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ki.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;So.subVectors(r,n),Mo.subVectors(s,n),Pf.subVectors(e,n);const l=So.dot(Pf),c=Mo.dot(Pf);if(l<=0&&c<=0)return t.copy(n);Df.subVectors(e,r);const u=So.dot(Df),f=Mo.dot(Df);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(So,o);Lf.subVectors(e,s);const d=So.dot(Lf),g=Mo.dot(Lf);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Mo,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return vg.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(vg,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(n).addScaledVector(So,o).addScaledVector(Mo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kr={h:0,s:0,l:0},pc={h:0,s:0,l:0};function Of(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=mt.workingColorSpace){if(e=Dp(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Of(o,s,e+1/3),this.g=Of(o,s,e),this.b=Of(o,s,e-1/3)}return mt.colorSpaceToWorking(this,r),this}setStyle(e,t=hn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=rx[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Or(e.r),this.g=Or(e.g),this.b=Or(e.b),this}copyLinearToSRGB(e){return this.r=qo(e.r),this.g=qo(e.g),this.b=qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return mt.workingToColorSpace(gn.copy(this),e),Math.round(ht(gn.r*255,0,255))*65536+Math.round(ht(gn.g*255,0,255))*256+Math.round(ht(gn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(gn.copy(this),t);const n=gn.r,r=gn.g,s=gn.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=hn){mt.workingToColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,r=gn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Kr),this.setHSL(Kr.h+e,Kr.s+t,Kr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kr),e.getHSL(pc);const n=pl(Kr.h,pc.h,t),r=pl(Kr.s,pc.s,t),s=pl(Kr.l,pc.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new je;je.NAMES=rx;let oE=0;class ur extends ga{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=Yo,this.side=Hr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zh,this.blendDst=Hh,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=sa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ho,this.stencilZFail=ho,this.stencilZPass=ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yo&&(n.blending=this.blending),this.side!==Hr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zh&&(n.blendSrc=this.blendSrc),this.blendDst!==Hh&&(n.blendDst=this.blendDst),this.blendEquation!==ks&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==sa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rg&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ho&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ho&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ho&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ls extends ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.combine=Hv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new H,mc=new Ze;let aE=0;class Vn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:aE++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wd,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mc.fromBufferAttribute(this,t),mc.applyMatrix3(e),this.setXY(t,mc.x,mc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wd&&(e.usage=this.usage),e}}class sx extends Vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ox extends Vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Wi extends Vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let lE=0;const bi=new ot,Ff=new Vt,To=new H,oi=new Gr,Pa=new Gr,on=new H;class Xi extends ga{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lE++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tx(e)?ox:sx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new nt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bi.makeRotationFromQuaternion(e),this.applyMatrix4(bi),this}rotateX(e){return bi.makeRotationX(e),this.applyMatrix4(bi),this}rotateY(e){return bi.makeRotationY(e),this.applyMatrix4(bi),this}rotateZ(e){return bi.makeRotationZ(e),this.applyMatrix4(bi),this}translate(e,t,n){return bi.makeTranslation(e,t,n),this.applyMatrix4(bi),this}scale(e,t,n){return bi.makeScale(e,t,n),this.applyMatrix4(bi),this}lookAt(e){return Ff.lookAt(e),Ff.updateMatrix(),this.applyMatrix4(Ff.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(To).negate(),this.translate(To.x,To.y,To.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wi(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];oi.setFromBufferAttribute(s),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Pa.setFromBufferAttribute(a),this.morphTargetsRelative?(on.addVectors(oi.min,Pa.min),oi.expandByPoint(on),on.addVectors(oi.max,Pa.max),oi.expandByPoint(on)):(oi.expandByPoint(Pa.min),oi.expandByPoint(Pa.max))}oi.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)on.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(on));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)on.fromBufferAttribute(a,c),l&&(To.fromBufferAttribute(e,c),on.add(To)),r=Math.max(r,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new H,l[D]=new H;const c=new H,u=new H,f=new H,h=new Ze,d=new Ze,g=new Ze,_=new H,m=new H;function p(D,T,M){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,M),h.fromBufferAttribute(s,D),d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,M),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[D].add(_),a[T].add(_),a[M].add(_),l[D].add(m),l[T].add(m),l[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let D=0,T=b.length;D<T;++D){const M=b[D],I=M.start,F=M.count;for(let Y=I,$=I+F;Y<$;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const S=new H,v=new H,E=new H,C=new H;function R(D){E.fromBufferAttribute(r,D),C.copy(E);const T=a[D];S.copy(T),S.sub(E.multiplyScalar(E.dot(T))).normalize(),v.crossVectors(C,T);const I=v.dot(l[D])<0?-1:1;o.setXYZW(D,S.x,S.y,S.z,I)}for(let D=0,T=b.length;D<T;++D){const M=b[D],I=M.start,F=M.count;for(let Y=I,$=I+F;Y<$;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,f=new H;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Vn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xi,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xg=new ot,Rs=new zu,gc=new mr,yg=new H,_c=new H,vc=new H,xc=new H,Bf=new H,yc=new H,Sg=new H,Sc=new H;class Kn extends Vt{constructor(e=new Xi,t=new ls){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){yc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Bf.fromBufferAttribute(f,e),o?yc.addScaledVector(Bf,u):yc.addScaledVector(Bf.sub(t),u))}t.add(yc)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gc.copy(n.boundingSphere),gc.applyMatrix4(s),Rs.copy(e.ray).recast(e.near),!(gc.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(gc,yg)===null||Rs.origin.distanceToSquared(yg)>(e.far-e.near)**2))&&(xg.copy(s).invert(),Rs.copy(e.ray).applyMatrix4(xg),!(n.boundingBox!==null&&Rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Rs)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,E=S;v<E;v+=3){const C=a.getX(v),R=a.getX(v+1),D=a.getX(v+2);r=Mc(this,p,e,n,c,u,f,C,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);r=Mc(this,o,e,n,c,u,f,b,S,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,E=S;v<E;v+=3){const C=v,R=v+1,D=v+2;r=Mc(this,p,e,n,c,u,f,C,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,v=m+2;r=Mc(this,o,e,n,c,u,f,b,S,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function cE(i,e,t,n,r,s,o,a){let l;if(e.side===ei?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===Hr,a),l===null)return null;Sc.copy(a),Sc.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Sc);return c<t.near||c>t.far?null:{distance:c,point:Sc.clone(),object:i}}function Mc(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,_c),i.getVertexPosition(l,vc),i.getVertexPosition(c,xc);const u=cE(i,e,t,n,_c,vc,xc,Sg);if(u){const f=new H;ki.getBarycoord(Sg,_c,vc,xc,f),r&&(u.uv=ki.getInterpolatedAttribute(r,a,l,c,f,new Ze)),s&&(u.uv1=ki.getInterpolatedAttribute(s,a,l,c,f,new Ze)),o&&(u.normal=ki.getInterpolatedAttribute(o,a,l,c,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new H,materialIndex:0};ki.getNormal(_c,vc,xc,h.normal),u.face=h,u.barycoord=f}return u}class Vl extends Xi{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Wi(c,3)),this.setAttribute("normal",new Wi(u,3)),this.setAttribute("uv",new Wi(f,2));function g(_,m,p,b,S,v,E,C,R,D,T){const M=v/R,I=E/D,F=v/2,Y=E/2,$=C/2,j=R+1,W=D+1;let V=0,B=0;const ae=new H;for(let U=0;U<W;U++){const ge=U*I-Y;for(let Oe=0;Oe<j;Oe++){const et=Oe*M-F;ae[_]=et*b,ae[m]=ge*S,ae[p]=$,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[p]=C>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(Oe/R),f.push(1-U/D),V+=1}}for(let U=0;U<D;U++)for(let ge=0;ge<R;ge++){const Oe=h+ge+j*U,et=h+ge+j*(U+1),Ke=h+(ge+1)+j*(U+1),qe=h+(ge+1)+j*U;l.push(Oe,et,qe),l.push(et,Ke,qe),B+=6}a.addGroup(d,B,T),d+=B,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ua(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Cn(i){const e={};for(let t=0;t<i.length;t++){const n=ua(i[t]);for(const r in n)e[r]=n[r]}return e}function uE(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ax(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const Su={clone:ua,merge:Cn};var fE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fE,this.fragmentShader=hE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ua(e.uniforms),this.uniformsGroups=uE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class lx extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=or,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jr=new H,Mg=new Ze,Tg=new Ze;class Nn extends lx{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ca*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ca*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){jr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jr.x,jr.y).multiplyScalar(-e/jr.z),jr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jr.x,jr.y).multiplyScalar(-e/jr.z)}getViewSize(e,t){return this.getViewBounds(e,Mg,Tg),t.subVectors(Tg,Mg)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(dl*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bo=-90,Eo=1;class dE extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(bo,Eo,e,t);r.layers=this.layers,this.add(r);const s=new Nn(bo,Eo,e,t);s.layers=this.layers,this.add(s);const o=new Nn(bo,Eo,e,t);o.layers=this.layers,this.add(o);const a=new Nn(bo,Eo,e,t);a.layers=this.layers,this.add(a);const l=new Nn(bo,Eo,e,t);l.layers=this.layers,this.add(l);const c=new Nn(bo,Eo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===or)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yu)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cx extends cn{constructor(e=[],t=oa,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pE extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new cx(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vl(5,5,5),s=new jn({name:"CubemapFromEquirect",uniforms:ua(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ei,blending:Ur});s.uniforms.tEquirect.value=t;const o=new Kn(r,s),a=t.minFilter;return t.minFilter===Dr&&(t.minFilter=_i),new dE(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class Gs extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mE={type:"move"};class kf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mE)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Gs;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class gE extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pr,this.environmentIntensity=1,this.environmentRotation=new pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _E{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wd,this.updateRanges=[],this.version=0,this.uuid=Vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new H;class Ip{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),s=Mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Vn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ip(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const bg=new H,Eg=new vt,wg=new vt,vE=new H,Ag=new ot,Tc=new H,zf=new mr,Rg=new ot,Hf=new zu;class xE extends Kn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=eg,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Gr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Tc),this.boundingBox.expandByPoint(Tc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Tc),this.boundingSphere.expandByPoint(Tc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zf.copy(this.boundingSphere),zf.applyMatrix4(r),e.ray.intersectsSphere(zf)!==!1&&(Rg.copy(r).invert(),Hf.copy(e.ray).applyMatrix4(Rg),!(this.boundingBox!==null&&Hf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Hf)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new vt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===eg?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mb?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Eg.fromBufferAttribute(r.attributes.skinIndex,e),wg.fromBufferAttribute(r.attributes.skinWeight,e),bg.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=wg.getComponent(s);if(o!==0){const a=Eg.getComponent(s);Ag.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(vE.copy(bg).applyMatrix4(Ag),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class ux extends Vt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class fx extends cn{constructor(e=null,t=1,n=1,r,s,o,a,l,c=Hn,u=Hn,f,h){super(null,o,a,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cg=new ot,yE=new ot;class Up{constructor(e=[],t=[]){this.uuid=Vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:yE;Cg.multiplyMatrices(a,t[s]),Cg.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Up(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new fx(t,e,e,Li,zi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new ux),this.bones.push(o),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class Ad extends Vn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wo=new ot,Pg=new ot,bc=[],Dg=new Gr,SE=new ot,Da=new Kn,La=new mr;class ME extends Kn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ad(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,SE)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wo),Dg.copy(e.boundingBox).applyMatrix4(wo),this.boundingBox.union(Dg)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wo),La.copy(e.boundingSphere).applyMatrix4(wo),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Da.geometry=this.geometry,Da.material=this.material,Da.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,wo),Pg.multiplyMatrices(n,wo),Da.matrixWorld=Pg,Da.raycast(e,bc);for(let o=0,a=bc.length;o<a;o++){const l=bc[o];l.instanceId=s,l.object=this,t.push(l)}bc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ad(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new fx(new Float32Array(r*this.count),r,this.count,Ap,zi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Vf=new H,TE=new H,bE=new nt;class Fs{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Vf.subVectors(n,t).cross(TE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vf),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bE.getNormalMatrix(e),r=this.coplanarPoint(Vf).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cs=new mr,EE=new Ze(.5,.5),Ec=new H;class Np{constructor(e=new Fs,t=new Fs,n=new Fs,r=new Fs,s=new Fs,o=new Fs){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=or,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],b=s[12],S=s[13],v=s[14],E=s[15];if(r[0].setComponents(c-o,d-u,p-g,E-b).normalize(),r[1].setComponents(c+o,d+u,p+g,E+b).normalize(),r[2].setComponents(c+a,d+f,p+_,E+S).normalize(),r[3].setComponents(c-a,d-f,p-_,E-S).normalize(),n)r[4].setComponents(l,h,m,v).normalize(),r[5].setComponents(c-l,d-h,p-m,E-v).normalize();else if(r[4].setComponents(c-l,d-h,p-m,E-v).normalize(),t===or)r[5].setComponents(c+l,d+h,p+m,E+v).normalize();else if(t===yu)r[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){Cs.center.set(0,0,0);const t=EE.distanceTo(e.center);return Cs.radius=.7071067811865476+t,Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Ec.x=r.normal.x>0?e.max.x:e.min.x,Ec.y=r.normal.y>0?e.max.y:e.min.y,Ec.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ec)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hx extends ur{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mu=new H,Tu=new H,Lg=new ot,Ia=new zu,wc=new mr,Gf=new H,Ig=new H;class Op extends Vt{constructor(e=new Xi,t=new hx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Mu.fromBufferAttribute(t,r-1),Tu.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Mu.distanceTo(Tu);e.setAttribute("lineDistance",new Wi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wc.copy(n.boundingSphere),wc.applyMatrix4(r),wc.radius+=s,e.ray.intersectsSphere(wc)===!1)return;Lg.copy(r).invert(),Ia.copy(e.ray).applyMatrix4(Lg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),b=u.getX(_+1),S=Ac(this,e,Ia,l,p,b,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=Ac(this,e,Ia,l,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=Ac(this,e,Ia,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ac(this,e,Ia,l,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ac(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(Mu.fromBufferAttribute(a,r),Tu.fromBufferAttribute(a,s),t.distanceSqToSegment(Mu,Tu,Gf,Ig)>n)return;Gf.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Gf);if(!(c<e.near||c>e.far))return{distance:c,point:Ig.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ug=new H,Ng=new H;class wE extends Op{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ug.fromBufferAttribute(t,r),Ng.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ug.distanceTo(Ng);e.setAttribute("lineDistance",new Wi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class AE extends Op{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class dx extends ur{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Og=new ot,Rd=new zu,Rc=new mr,Cc=new H;class RE extends Vt{constructor(e=new Xi,t=new dx){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rc.copy(n.boundingSphere),Rc.applyMatrix4(r),Rc.radius+=s,e.ray.intersectsSphere(Rc)===!1)return;Og.copy(r).invert(),Rd.copy(e.ray).applyMatrix4(Og);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);Cc.fromBufferAttribute(f,m),Fg(Cc,m,l,r,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)Cc.fromBufferAttribute(f,g),Fg(Cc,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fg(i,e,t,n,r,s,o){const a=Rd.distanceSqToPoint(i);if(a<t){const l=new H;Rd.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class px extends cn{constructor(e,t,n=io,r,s,o,a=Hn,l=Hn,c,u=Il,f=1){if(u!==Il&&u!==Ul)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class mx extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Hu extends Xi{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*h-o;for(let S=0;S<c;S++){const v=S*f-s;g.push(v,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const S=b+c*p,v=b+c*(p+1),E=b+1+c*(p+1),C=b+1+c*p;d.push(S,v,C),d.push(v,E,C)}this.setIndex(d),this.setAttribute("position",new Wi(g,3)),this.setAttribute("normal",new Wi(_,3)),this.setAttribute("uv",new Wi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hu(e.width,e.height,e.widthSegments,e.heightSegments)}}class Fp extends ur{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qv,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gr extends Fp{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class CE extends ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PE extends ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Pc(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function DE(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function LE(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Bg(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=i[a+l]}return r}function gx(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class Gl{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class IE extends Gl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tg,endingEnd:tg}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case ng:s=e,a=2*t-n;break;case ig:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ng:o=e,l=2*n-t;break;case ig:o=1,l=n+r[1]-r[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,b=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,S=(-1-d)*m+(1.5+d)*_+.5*g,v=d*m-d*_;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+b*o[c+E]+S*o[l+E]+v*o[f+E];return s}}class UE extends Gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}}class NE extends Gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Yi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Pc(t,this.TimeBufferType),this.values=Pc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Pc(e.times,Array),values:Pc(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new NE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new UE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new IE(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Nl:t=this.InterpolantFactoryMethodDiscrete;break;case Ol:t=this.InterpolantFactoryMethodLinear;break;case vf:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nl;case this.InterpolantFactoryMethodLinear:return Ol;case this.InterpolantFactoryMethodSmooth:return vf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&DE(r))for(let a=0,l=r.length;a!==l;++a){const c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===vf,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{const f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){const _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const f=a*n,h=o*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Yi.prototype.ValueTypeName="";Yi.prototype.TimeBufferType=Float32Array;Yi.prototype.ValueBufferType=Float32Array;Yi.prototype.DefaultInterpolation=Ol;class _a extends Yi{constructor(e,t,n){super(e,t,n)}}_a.prototype.ValueTypeName="bool";_a.prototype.ValueBufferType=Array;_a.prototype.DefaultInterpolation=Nl;_a.prototype.InterpolantFactoryMethodLinear=void 0;_a.prototype.InterpolantFactoryMethodSmooth=void 0;class _x extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}_x.prototype.ValueTypeName="color";class fa extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}fa.prototype.ValueTypeName="number";class OE extends Gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(r-t);let c=e*a;for(let u=c+a;c!==u;c+=4)ys.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ha extends Yi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new OE(this.times,this.values,this.getValueSize(),e)}}ha.prototype.ValueTypeName="quaternion";ha.prototype.InterpolantFactoryMethodSmooth=void 0;class va extends Yi{constructor(e,t,n){super(e,t,n)}}va.prototype.ValueTypeName="string";va.prototype.ValueBufferType=Array;va.prototype.DefaultInterpolation=Nl;va.prototype.InterpolantFactoryMethodLinear=void 0;va.prototype.InterpolantFactoryMethodSmooth=void 0;class da extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}da.prototype.ValueTypeName="vector";class FE{constructor(e="",t=-1,n=[],r=gb){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Vi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(kE(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Yi.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=LE(l);l=Bg(l,1,u),c=Bg(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new fa(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const f=u[1];let h=r[f];h||(r[f]=h=[]),h.push(c)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,h,d,g,_){if(d.length!==0){const m=[],p=[];gx(d,m,p,g),m.length!==0&&_.push(new f(h,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let f=0;f<c.length;f++){const h=c[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let b=0;b!==h[g].morphTargets.length;++b){const S=h[g];m.push(S.time),p.push(S.morphTarget===_?1:0)}r.push(new fa(".morphTargetInfluence["+_+"]",m,p))}l=d.length*o}else{const d=".bones["+t[f].name+"]";n(da,d+".position",h,"pos",r),n(ha,d+".quaternion",h,"rot",r),n(da,d+".scale",h,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function BE(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fa;case"vector":case"vector2":case"vector3":case"vector4":return da;case"color":return _x;case"quaternion":return ha;case"bool":case"boolean":return _a;case"string":return va}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function kE(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=BE(i.type);if(i.times===void 0){const t=[],n=[];gx(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Lr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class zE{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const HE=new zE;class xa{constructor(e){this.manager=e!==void 0?e:HE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}xa.DEFAULT_MATERIAL_NAME="__DEFAULT";const Tr={};class VE extends Error{constructor(e,t){super(e),this.response=t}}class vx extends xa{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Lr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Tr[e]!==void 0){Tr[e].push({onLoad:t,onProgress:n,onError:r});return}Tr[e]=[],Tr[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Tr[e],f=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=h?parseInt(h):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){b();function b(){f.read().then(({done:S,value:v})=>{if(S)p.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let C=0,R=u.length;C<R;C++){const D=u[C];D.onProgress&&D.onProgress(E)}p.enqueue(v),b()}},S=>{p.error(S)})}}});return new Response(m)}else throw new VE(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{Lr.add(`file:${e}`,c);const u=Tr[e];delete Tr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=Tr[e];if(u===void 0)throw this.manager.itemError(e),c;delete Tr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ao=new WeakMap;class GE extends xa{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Lr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let f=Ao.get(o);f===void 0&&(f=[],Ao.set(o,f)),f.push({onLoad:t,onError:r})}return o}const a=Fl("img");function l(){u(),t&&t(this);const f=Ao.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Ao.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),Lr.remove(`image:${e}`);const h=Ao.get(this)||[];for(let d=0;d<h.length;d++){const g=h[d];g.onError&&g.onError(f)}Ao.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Lr.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class WE extends xa{constructor(e){super(e)}load(e,t,n,r){const s=new cn,o=new GE(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Vu extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Wf=new ot,kg=new H,zg=new H;class Bp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=dr,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Np,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;kg.setFromMatrixPosition(e.matrixWorld),t.position.copy(kg),zg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zg),t.updateMatrixWorld(),Wf.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wf,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class XE extends Bp{constructor(){super(new Nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ca*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class YE extends Vu{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new XE}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Hg=new ot,Ua=new H,Xf=new H;class qE extends Bp{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ze(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ua),Xf.copy(n.position),Xf.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Xf),n.updateMatrixWorld(),r.makeTranslation(-Ua.x,-Ua.y,-Ua.z),Hg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hg,n.coordinateSystem,n.reversedDepth)}}class KE extends Vu{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new qE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Gu extends lx{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jE extends Bp{constructor(){super(new Gu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lo extends Vu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new jE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $E extends Vu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ml{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Yf=new WeakMap;class ZE extends xa{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Lr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Yf.has(o)===!0)r&&r(Yf.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Lr.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),Yf.set(l,c),Lr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Lr.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class JE extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class QE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const kp="\\[\\]\\.:\\/",ew=new RegExp("["+kp+"]","g"),zp="[^"+kp+"]",tw="[^"+kp.replace("\\.","")+"]",nw=/((?:WC+[\/:])*)/.source.replace("WC",zp),iw=/(WCOD+)?/.source.replace("WCOD",tw),rw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zp),sw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zp),ow=new RegExp("^"+nw+iw+rw+sw+"$"),aw=["material","materials","bones","map"];class lw{constructor(e,t,n){const r=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Tt{constructor(e,t,n){this.path=t,this.parsedPath=n||Tt.parseTrackName(t),this.node=Tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Tt.Composite(e,t,n):new Tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ew,"")}static parseTrackName(e){const t=ow.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);aw.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[r];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Tt.Composite=lw;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Vg(i,e,t,n){const r=cw(n);switch(t){case jv:return i*e;case Ap:return i*e/r.components*r.byteLength;case Rp:return i*e/r.components*r.byteLength;case Zv:return i*e*2/r.components*r.byteLength;case Cp:return i*e*2/r.components*r.byteLength;case $v:return i*e*3/r.components*r.byteLength;case Li:return i*e*4/r.components*r.byteLength;case Pp:return i*e*4/r.components*r.byteLength;case Kc:case jc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $c:case Zc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jh:case ed:return Math.max(i,16)*Math.max(e,8)/4;case Zh:case Qh:return Math.max(i,8)*Math.max(e,8)/2;case td:case nd:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case id:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rd:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sd:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case od:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ad:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ld:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case cd:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ud:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fd:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case hd:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case dd:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case pd:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case md:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case gd:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case _d:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vd:case xd:case yd:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Sd:case Md:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Td:case bd:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cw(i){switch(i){case dr:case Xv:return{byteLength:1,components:1};case Dl:case Yv:case Nr:return{byteLength:2,components:1};case Ep:case wp:return{byteLength:2,components:4};case io:case bp:case zi:return{byteLength:4,components:1};case qv:case Kv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xx(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function uw(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var fw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_w=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ew=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ww=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Aw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Iw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Uw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Nw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ow=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ww=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$w=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,e1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,i1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,r1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,s1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,l1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,c1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,u1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,f1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,h1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,x1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,y1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,M1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,A1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,C1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,P1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,U1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,N1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,O1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,B1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,k1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,z1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,H1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,W1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Y1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,q1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,K1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,j1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,J1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,eA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,rA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,oA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_A=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,xA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,SA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,EA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,CA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,DA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,LA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,NA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,kA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,VA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,GA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:fw,alphahash_pars_fragment:hw,alphamap_fragment:dw,alphamap_pars_fragment:pw,alphatest_fragment:mw,alphatest_pars_fragment:gw,aomap_fragment:_w,aomap_pars_fragment:vw,batching_pars_vertex:xw,batching_vertex:yw,begin_vertex:Sw,beginnormal_vertex:Mw,bsdfs:Tw,iridescence_fragment:bw,bumpmap_pars_fragment:Ew,clipping_planes_fragment:ww,clipping_planes_pars_fragment:Aw,clipping_planes_pars_vertex:Rw,clipping_planes_vertex:Cw,color_fragment:Pw,color_pars_fragment:Dw,color_pars_vertex:Lw,color_vertex:Iw,common:Uw,cube_uv_reflection_fragment:Nw,defaultnormal_vertex:Ow,displacementmap_pars_vertex:Fw,displacementmap_vertex:Bw,emissivemap_fragment:kw,emissivemap_pars_fragment:zw,colorspace_fragment:Hw,colorspace_pars_fragment:Vw,envmap_fragment:Gw,envmap_common_pars_fragment:Ww,envmap_pars_fragment:Xw,envmap_pars_vertex:Yw,envmap_physical_pars_fragment:i1,envmap_vertex:qw,fog_vertex:Kw,fog_pars_vertex:jw,fog_fragment:$w,fog_pars_fragment:Zw,gradientmap_pars_fragment:Jw,lightmap_pars_fragment:Qw,lights_lambert_fragment:e1,lights_lambert_pars_fragment:t1,lights_pars_begin:n1,lights_toon_fragment:r1,lights_toon_pars_fragment:s1,lights_phong_fragment:o1,lights_phong_pars_fragment:a1,lights_physical_fragment:l1,lights_physical_pars_fragment:c1,lights_fragment_begin:u1,lights_fragment_maps:f1,lights_fragment_end:h1,logdepthbuf_fragment:d1,logdepthbuf_pars_fragment:p1,logdepthbuf_pars_vertex:m1,logdepthbuf_vertex:g1,map_fragment:_1,map_pars_fragment:v1,map_particle_fragment:x1,map_particle_pars_fragment:y1,metalnessmap_fragment:S1,metalnessmap_pars_fragment:M1,morphinstance_vertex:T1,morphcolor_vertex:b1,morphnormal_vertex:E1,morphtarget_pars_vertex:w1,morphtarget_vertex:A1,normal_fragment_begin:R1,normal_fragment_maps:C1,normal_pars_fragment:P1,normal_pars_vertex:D1,normal_vertex:L1,normalmap_pars_fragment:I1,clearcoat_normal_fragment_begin:U1,clearcoat_normal_fragment_maps:N1,clearcoat_pars_fragment:O1,iridescence_pars_fragment:F1,opaque_fragment:B1,packing:k1,premultiplied_alpha_fragment:z1,project_vertex:H1,dithering_fragment:V1,dithering_pars_fragment:G1,roughnessmap_fragment:W1,roughnessmap_pars_fragment:X1,shadowmap_pars_fragment:Y1,shadowmap_pars_vertex:q1,shadowmap_vertex:K1,shadowmask_pars_fragment:j1,skinbase_vertex:$1,skinning_pars_vertex:Z1,skinning_vertex:J1,skinnormal_vertex:Q1,specularmap_fragment:eA,specularmap_pars_fragment:tA,tonemapping_fragment:nA,tonemapping_pars_fragment:iA,transmission_fragment:rA,transmission_pars_fragment:sA,uv_pars_fragment:oA,uv_pars_vertex:aA,uv_vertex:lA,worldpos_vertex:cA,background_vert:uA,background_frag:fA,backgroundCube_vert:hA,backgroundCube_frag:dA,cube_vert:pA,cube_frag:mA,depth_vert:gA,depth_frag:_A,distanceRGBA_vert:vA,distanceRGBA_frag:xA,equirect_vert:yA,equirect_frag:SA,linedashed_vert:MA,linedashed_frag:TA,meshbasic_vert:bA,meshbasic_frag:EA,meshlambert_vert:wA,meshlambert_frag:AA,meshmatcap_vert:RA,meshmatcap_frag:CA,meshnormal_vert:PA,meshnormal_frag:DA,meshphong_vert:LA,meshphong_frag:IA,meshphysical_vert:UA,meshphysical_frag:NA,meshtoon_vert:OA,meshtoon_frag:FA,points_vert:BA,points_frag:kA,shadow_vert:zA,shadow_frag:HA,sprite_vert:VA,sprite_frag:GA},Ae={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},er={basic:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:Cn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:Cn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:Cn([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:Cn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:Cn([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:Cn([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:Cn([Ae.common,Ae.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:Cn([Ae.lights,Ae.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};er.physical={uniforms:Cn([er.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const Dc={r:0,b:0,g:0},Ps=new pr,WA=new ot;function XA(i,e,t,n,r,s,o){const a=new je(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const E=g(S);E===null?p(a,l):E&&E.isColor&&(p(E,1),v=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===ku)?(u===void 0&&(u=new Kn(new Vl(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:ua(er.backgroundCube.uniforms),vertexShader:er.backgroundCube.vertexShader,fragmentShader:er.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ps.copy(v.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(WA.makeRotationFromEuler(Ps)),u.material.toneMapped=mt.getTransfer(E.colorSpace)!==bt,(f!==E||h!==E.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=E,h=E.version,d=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Kn(new Hu(2,2),new jn({name:"BackgroundMaterial",uniforms:ua(er.background.uniforms),vertexShader:er.background.vertexShader,fragmentShader:er.background.fragmentShader,side:Hr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=mt.getTransfer(E.colorSpace)!==bt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||h!==E.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=E,h=E.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,v){S.getRGB(Dc,ax(i)),n.buffers.color.setClear(Dc.r,Dc.g,Dc.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m,dispose:b}}function YA(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,o=!1;function a(M,I,F,Y,$){let j=!1;const W=f(Y,F,I);s!==W&&(s=W,c(s.object)),j=d(M,Y,F,$),j&&g(M,Y,F,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(M,I,F,Y),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function f(M,I,F){const Y=F.wireframe===!0;let $=n[M.id];$===void 0&&($={},n[M.id]=$);let j=$[I.id];j===void 0&&(j={},$[I.id]=j);let W=j[Y];return W===void 0&&(W=h(l()),j[Y]=W),W}function h(M){const I=[],F=[],Y=[];for(let $=0;$<t;$++)I[$]=0,F[$]=0,Y[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:Y,object:M,attributes:{},index:null}}function d(M,I,F,Y){const $=s.attributes,j=I.attributes;let W=0;const V=F.getAttributes();for(const B in V)if(V[B].location>=0){const U=$[B];let ge=j[B];if(ge===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor)),U===void 0||U.attribute!==ge||ge&&U.data!==ge.data)return!0;W++}return s.attributesNum!==W||s.index!==Y}function g(M,I,F,Y){const $={},j=I.attributes;let W=0;const V=F.getAttributes();for(const B in V)if(V[B].location>=0){let U=j[B];U===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(U=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(U=M.instanceColor));const ge={};ge.attribute=U,U&&U.data&&(ge.data=U.data),$[B]=ge,W++}s.attributes=$,s.attributesNum=W,s.index=Y}function _(){const M=s.newAttributes;for(let I=0,F=M.length;I<F;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){const F=s.newAttributes,Y=s.enabledAttributes,$=s.attributeDivisors;F[M]=1,Y[M]===0&&(i.enableVertexAttribArray(M),Y[M]=1),$[M]!==I&&(i.vertexAttribDivisor(M,I),$[M]=I)}function b(){const M=s.newAttributes,I=s.enabledAttributes;for(let F=0,Y=I.length;F<Y;F++)I[F]!==M[F]&&(i.disableVertexAttribArray(F),I[F]=0)}function S(M,I,F,Y,$,j,W){W===!0?i.vertexAttribIPointer(M,I,F,$,j):i.vertexAttribPointer(M,I,F,Y,$,j)}function v(M,I,F,Y){_();const $=Y.attributes,j=F.getAttributes(),W=I.defaultAttributeValues;for(const V in j){const B=j[V];if(B.location>=0){let ae=$[V];if(ae===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),ae!==void 0){const U=ae.normalized,ge=ae.itemSize,Oe=e.get(ae);if(Oe===void 0)continue;const et=Oe.buffer,Ke=Oe.type,qe=Oe.bytesPerElement,ne=Ke===i.INT||Ke===i.UNSIGNED_INT||ae.gpuType===bp;if(ae.isInterleavedBufferAttribute){const se=ae.data,Me=se.stride,Ie=ae.offset;if(se.isInstancedInterleavedBuffer){for(let Ce=0;Ce<B.locationSize;Ce++)p(B.location+Ce,se.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ce=0;Ce<B.locationSize;Ce++)m(B.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Ce=0;Ce<B.locationSize;Ce++)S(B.location+Ce,ge/B.locationSize,Ke,U,Me*qe,(Ie+ge/B.locationSize*Ce)*qe,ne)}else{if(ae.isInstancedBufferAttribute){for(let se=0;se<B.locationSize;se++)p(B.location+se,ae.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let se=0;se<B.locationSize;se++)m(B.location+se);i.bindBuffer(i.ARRAY_BUFFER,et);for(let se=0;se<B.locationSize;se++)S(B.location+se,ge/B.locationSize,Ke,U,ge*qe,ge/B.locationSize*se*qe,ne)}}else if(W!==void 0){const U=W[V];if(U!==void 0)switch(U.length){case 2:i.vertexAttrib2fv(B.location,U);break;case 3:i.vertexAttrib3fv(B.location,U);break;case 4:i.vertexAttrib4fv(B.location,U);break;default:i.vertexAttrib1fv(B.location,U)}}}}b()}function E(){D();for(const M in n){const I=n[M];for(const F in I){const Y=I[F];for(const $ in Y)u(Y[$].object),delete Y[$];delete I[F]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const F in I){const Y=I[F];for(const $ in Y)u(Y[$].object),delete Y[$];delete I[F]}delete n[M.id]}function R(M){for(const I in n){const F=n[I];if(F[M.id]===void 0)continue;const Y=F[M.id];for(const $ in Y)u(Y[$].object),delete Y[$];delete F[M.id]}}function D(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:T,dispose:E,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function qA(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function KA(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==Li&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===Nr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==dr&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==zi&&!D)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:E,maxSamples:C}}function jA(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Fs,a=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,S=b*4;let v=p.clippingState||null;l.value=v,v=u(g,h,S,d);for(let E=0;E!==S;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==_;++S,v+=4)o.copy(f[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function $A(i){let e=new WeakMap;function t(o,a){return a===jh?o.mapping=oa:a===$h&&(o.mapping=aa),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===jh||a===$h)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new pE(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Oo=4,Gg=[.125,.215,.35,.446,.526,.582],zs=20,qf=new Gu,Wg=new je;let Kf=null,jf=0,$f=0,Zf=!1;const Bs=(1+Math.sqrt(5))/2,Ro=1/Bs,Xg=[new H(-Bs,Ro,0),new H(Bs,Ro,0),new H(-Ro,0,Bs),new H(Ro,0,Bs),new H(0,Bs,-Ro),new H(0,Bs,Ro),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],ZA=new H;class Yg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=ZA}=s;Kf=this._renderer.getRenderTarget(),jf=this._renderer.getActiveCubeFace(),$f=this._renderer.getActiveMipmapLevel(),Zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kf,jf,$f),this._renderer.xr.enabled=Zf,e.scissorTest=!1,Lc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oa||e.mapping===aa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kf=this._renderer.getRenderTarget(),jf=this._renderer.getActiveCubeFace(),$f=this._renderer.getActiveMipmapLevel(),Zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_i,minFilter:_i,generateMipmaps:!1,type:Nr,format:Li,colorSpace:Wn,depthBuffer:!1},r=qg(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qg(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=JA(s)),this._blurMaterial=QA(s,e,t)}return r}_compileMaterial(e){const t=new Kn(this._lodPlanes[0],e);this._renderer.compile(t,qf)}_sceneToCubeUV(e,t,n,r,s){const l=new Nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Wg),f.toneMapping=hs,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const _=new ls({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),m=new Kn(new Vl,_);let p=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,p=!0):(_.color.copy(Wg),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const E=this._cubeSize;Lc(r,v*E,S>2?E:0,E,E),f.setRenderTarget(r),p&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===oa||e.mapping===aa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=jg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Kn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Lc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,qf)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xg[(r-s-1)%Xg.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Kn(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zs-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):zs;m>zs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zs}`);const p=[];let b=0;for(let R=0;R<zs;++R){const D=R/_,T=Math.exp(-D*D/2);p.push(T),R===0?b+=T:R<m&&(b+=2*T)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-n;const v=this._sizeLods[r],E=3*v*(r>S-Oo?r-S+Oo:0),C=4*(this._cubeSize-v);Lc(t,E,C,3*v,2*v),l.setRenderTarget(t),l.render(f,qf)}}function JA(i){const e=[],t=[],n=[];let r=i;const s=i-Oo+1+Gg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Oo?l=Gg[o-i+Oo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),S=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){const R=C%3*2/3-1,D=C>2?0:-1,T=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];b.set(T,_*g*C),S.set(h,m*g*C);const M=[C,C,C,C,C,C];v.set(M,p*g*C)}const E=new Xi;E.setAttribute("position",new Vn(b,_)),E.setAttribute("uv",new Vn(S,m)),E.setAttribute("faceIndex",new Vn(v,p)),e.push(E),r>Oo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qg(i,e,t){const n=new Gi(i,e,t);return n.texture.mapping=ku,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Lc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function QA(i,e,t){const n=new Float32Array(zs),r=new H(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:zs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function Kg(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function jg(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function Hp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function eR(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===jh||l===$h,u=l===oa||l===aa;if(c||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Yg(i)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Yg(i)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function tR(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Bl("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function nR(i,e,t,n){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let S=0,v=b.length;S<v;S+=3){const E=b[S+0],C=b[S+1],R=b[S+2];h.push(E,C,C,R,R,E)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const E=S+0,C=S+1,R=S+2;h.push(E,C,C,R,R,E)}}else return;const m=new(tx(h)?ox:sx)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function iR(i,e,t){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*o),t.update(d,n,1)}function c(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function rR(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function sR(i,e,t){const n=new WeakMap,r=new vt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let M=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,C=1;E>e.maxTextureSize&&(C=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const R=new Float32Array(E*C*4*f),D=new nx(R,E,C,f);D.type=zi,D.needsUpdate=!0;const T=v*4;for(let I=0;I<f;I++){const F=p[I],Y=b[I],$=S[I],j=E*C*4*I;for(let W=0;W<F.count;W++){const V=W*T;g===!0&&(r.fromBufferAttribute(F,W),R[j+V+0]=r.x,R[j+V+1]=r.y,R[j+V+2]=r.z,R[j+V+3]=0),_===!0&&(r.fromBufferAttribute(Y,W),R[j+V+4]=r.x,R[j+V+5]=r.y,R[j+V+6]=r.z,R[j+V+7]=0),m===!0&&(r.fromBufferAttribute($,W),R[j+V+8]=r.x,R[j+V+9]=r.y,R[j+V+10]=r.z,R[j+V+11]=$.itemSize===4?r.w:1)}}h={count:f,texture:D,size:new Ze(E,C)},n.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function oR(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const yx=new cn,$g=new px(1,1),Sx=new nx,Mx=new Jb,Tx=new cx,Zg=[],Jg=[],Qg=new Float32Array(16),e_=new Float32Array(9),t_=new Float32Array(4);function ya(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Zg[r];if(s===void 0&&(s=new Float32Array(r),Zg[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function rn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function sn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Wu(i,e){let t=Jg[e];t===void 0&&(t=new Int32Array(e),Jg[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function aR(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2fv(this.addr,e),sn(t,e)}}function cR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;i.uniform3fv(this.addr,e),sn(t,e)}}function uR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4fv(this.addr,e),sn(t,e)}}function fR(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;t_.set(n),i.uniformMatrix2fv(this.addr,!1,t_),sn(t,n)}}function hR(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;e_.set(n),i.uniformMatrix3fv(this.addr,!1,e_),sn(t,n)}}function dR(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;Qg.set(n),i.uniformMatrix4fv(this.addr,!1,Qg),sn(t,n)}}function pR(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2iv(this.addr,e),sn(t,e)}}function gR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3iv(this.addr,e),sn(t,e)}}function _R(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4iv(this.addr,e),sn(t,e)}}function vR(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2uiv(this.addr,e),sn(t,e)}}function yR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3uiv(this.addr,e),sn(t,e)}}function SR(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4uiv(this.addr,e),sn(t,e)}}function MR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?($g.compareFunction=ex,s=$g):s=yx,t.setTexture2D(e||s,r)}function TR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Mx,r)}function bR(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Tx,r)}function ER(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Sx,r)}function wR(i){switch(i){case 5126:return aR;case 35664:return lR;case 35665:return cR;case 35666:return uR;case 35674:return fR;case 35675:return hR;case 35676:return dR;case 5124:case 35670:return pR;case 35667:case 35671:return mR;case 35668:case 35672:return gR;case 35669:case 35673:return _R;case 5125:return vR;case 36294:return xR;case 36295:return yR;case 36296:return SR;case 35678:case 36198:case 36298:case 36306:case 35682:return MR;case 35679:case 36299:case 36307:return TR;case 35680:case 36300:case 36308:case 36293:return bR;case 36289:case 36303:case 36311:case 36292:return ER}}function AR(i,e){i.uniform1fv(this.addr,e)}function RR(i,e){const t=ya(e,this.size,2);i.uniform2fv(this.addr,t)}function CR(i,e){const t=ya(e,this.size,3);i.uniform3fv(this.addr,t)}function PR(i,e){const t=ya(e,this.size,4);i.uniform4fv(this.addr,t)}function DR(i,e){const t=ya(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function LR(i,e){const t=ya(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function IR(i,e){const t=ya(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function UR(i,e){i.uniform1iv(this.addr,e)}function NR(i,e){i.uniform2iv(this.addr,e)}function OR(i,e){i.uniform3iv(this.addr,e)}function FR(i,e){i.uniform4iv(this.addr,e)}function BR(i,e){i.uniform1uiv(this.addr,e)}function kR(i,e){i.uniform2uiv(this.addr,e)}function zR(i,e){i.uniform3uiv(this.addr,e)}function HR(i,e){i.uniform4uiv(this.addr,e)}function VR(i,e,t){const n=this.cache,r=e.length,s=Wu(t,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||yx,s[o])}function GR(i,e,t){const n=this.cache,r=e.length,s=Wu(t,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Mx,s[o])}function WR(i,e,t){const n=this.cache,r=e.length,s=Wu(t,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Tx,s[o])}function XR(i,e,t){const n=this.cache,r=e.length,s=Wu(t,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Sx,s[o])}function YR(i){switch(i){case 5126:return AR;case 35664:return RR;case 35665:return CR;case 35666:return PR;case 35674:return DR;case 35675:return LR;case 35676:return IR;case 5124:case 35670:return UR;case 35667:case 35671:return NR;case 35668:case 35672:return OR;case 35669:case 35673:return FR;case 5125:return BR;case 36294:return kR;case 36295:return zR;case 36296:return HR;case 35678:case 36198:case 36298:case 36306:case 35682:return VR;case 35679:case 36299:case 36307:return GR;case 35680:case 36300:case 36308:case 36293:return WR;case 36289:case 36303:case 36311:case 36292:return XR}}class qR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wR(t.type)}}class KR{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=YR(t.type)}}class jR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Jf=/(\w+)(\])?(\[|\.)?/g;function n_(i,e){i.seq.push(e),i.map[e.id]=e}function $R(i,e,t){const n=i.name,r=n.length;for(Jf.lastIndex=0;;){const s=Jf.exec(n),o=Jf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){n_(t,c===void 0?new qR(a,i,e):new KR(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new jR(a),n_(t,f)),t=f}}}class Jc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);$R(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function i_(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ZR=37297;let JR=0;function QR(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const r_=new nt;function eC(i){mt._getMatrix(r_,mt.workingColorSpace,i);const e=`mat3( ${r_.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(i)){case xu:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function s_(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+QR(i.getShaderSource(e),a)}else return s}function tC(i,e){const t=eC(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function nC(i,e){let t;switch(e){case cb:t="Linear";break;case ub:t="Reinhard";break;case fb:t="Cineon";break;case hb:t="ACESFilmic";break;case pb:t="AgX";break;case Vv:t="Neutral";break;case db:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ic=new H;function iC(){mt.getLuminanceCoefficients(Ic);const i=Ic.x.toFixed(4),e=Ic.y.toFixed(4),t=Ic.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rC(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xa).join(`
`)}function sC(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function oC(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Xa(i){return i!==""}function o_(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function a_(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const aC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cd(i){return i.replace(aC,cC)}const lC=new Map;function cC(i,e){let t=rt[e];if(t===void 0){const n=lC.get(e);if(n!==void 0)t=rt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Cd(t)}const uC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function l_(i){return i.replace(uC,fC)}function fC(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function c_(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function hC(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Tp?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===VT?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===br&&(e="SHADOWMAP_TYPE_VSM"),e}function dC(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case oa:case aa:e="ENVMAP_TYPE_CUBE";break;case ku:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pC(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case aa:e="ENVMAP_MODE_REFRACTION";break}return e}function mC(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hv:e="ENVMAP_BLENDING_MULTIPLY";break;case ab:e="ENVMAP_BLENDING_MIX";break;case lb:e="ENVMAP_BLENDING_ADD";break}return e}function gC(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _C(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=hC(t),c=dC(t),u=pC(t),f=mC(t),h=gC(t),d=rC(t),g=sC(s),_=r.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xa).join(`
`),p.length>0&&(p+=`
`)):(m=[c_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xa).join(`
`),p=[c_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hs?"#define TONE_MAPPING":"",t.toneMapping!==hs?rt.tonemapping_pars_fragment:"",t.toneMapping!==hs?nC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,tC("linearToOutputTexel",t.outputColorSpace),iC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xa).join(`
`)),o=Cd(o),o=o_(o,t),o=a_(o,t),a=Cd(a),a=o_(a,t),a=a_(a,t),o=l_(o),a=l_(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===sg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+o,v=b+p+a,E=i_(r,r.VERTEX_SHADER,S),C=i_(r,r.FRAGMENT_SHADER,v);r.attachShader(_,E),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(I){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(_)||"",Y=r.getShaderInfoLog(E)||"",$=r.getShaderInfoLog(C)||"",j=F.trim(),W=Y.trim(),V=$.trim();let B=!0,ae=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,E,C);else{const U=s_(r,E,"vertex"),ge=s_(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+j+`
`+U+`
`+ge)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(W===""||V==="")&&(ae=!1);ae&&(I.diagnostics={runnable:B,programLog:j,vertexShader:{log:W,prefix:m},fragmentShader:{log:V,prefix:p}})}r.deleteShader(E),r.deleteShader(C),D=new Jc(r,_),T=oC(r,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,ZR)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=JR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=C,this}let vC=0;class xC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yC(e),t.set(e,n)),n}}class yC{constructor(e){this.id=vC++,this.code=e,this.usedTimes=0}}function SC(i,e,t,n,r,s,o){const a=new ix,l=new xC,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,M,I,F,Y){const $=F.fog,j=Y.geometry,W=T.isMeshStandardMaterial?F.environment:null,V=(T.isMeshStandardMaterial?t:e).get(T.envMap||W),B=V&&V.mapping===ku?V.image.height:null,ae=g[T.type];T.precision!==null&&(d=r.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const U=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ge=U!==void 0?U.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let et,Ke,qe,ne;if(ae){const Re=er[ae];et=Re.vertexShader,Ke=Re.fragmentShader}else et=T.vertexShader,Ke=T.fragmentShader,l.update(T),qe=l.getVertexShaderID(T),ne=l.getFragmentShaderID(T);const se=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ie=Y.isInstancedMesh===!0,Ce=Y.isBatchedMesh===!0,We=!!T.map,L=!!T.matcap,x=!!V,G=!!T.aoMap,Z=!!T.lightMap,K=!!T.bumpMap,P=!!T.normalMap,le=!!T.displacementMap,J=!!T.emissiveMap,re=!!T.metalnessMap,ie=!!T.roughnessMap,Se=T.anisotropy>0,A=T.clearcoat>0,y=T.dispersion>0,O=T.iridescence>0,q=T.sheen>0,ee=T.transmission>0,X=Se&&!!T.anisotropyMap,ve=A&&!!T.clearcoatMap,ue=A&&!!T.clearcoatNormalMap,be=A&&!!T.clearcoatRoughnessMap,me=O&&!!T.iridescenceMap,he=O&&!!T.iridescenceThicknessMap,xe=q&&!!T.sheenColorMap,Pe=q&&!!T.sheenRoughnessMap,Ee=!!T.specularMap,_e=!!T.specularColorMap,Ge=!!T.specularIntensityMap,N=ee&&!!T.transmissionMap,de=ee&&!!T.thicknessMap,pe=!!T.gradientMap,we=!!T.alphaMap,fe=T.alphaTest>0,oe=!!T.alphaHash,Le=!!T.extensions;let Ve=hs;T.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ve=i.toneMapping);const gt={shaderID:ae,shaderType:T.type,shaderName:T.name,vertexShader:et,fragmentShader:Ke,defines:T.defines,customVertexShaderID:qe,customFragmentShaderID:ne,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:Ce,batchingColor:Ce&&Y._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&Y.instanceColor!==null,instancingMorph:Ie&&Y.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Wn,alphaToCoverage:!!T.alphaToCoverage,map:We,matcap:L,envMap:x,envMapMode:x&&V.mapping,envMapCubeUVHeight:B,aoMap:G,lightMap:Z,bumpMap:K,normalMap:P,displacementMap:h&&le,emissiveMap:J,normalMapObjectSpace:P&&T.normalMapType===yb,normalMapTangentSpace:P&&T.normalMapType===Qv,metalnessMap:re,roughnessMap:ie,anisotropy:Se,anisotropyMap:X,clearcoat:A,clearcoatMap:ve,clearcoatNormalMap:ue,clearcoatRoughnessMap:be,dispersion:y,iridescence:O,iridescenceMap:me,iridescenceThicknessMap:he,sheen:q,sheenColorMap:xe,sheenRoughnessMap:Pe,specularMap:Ee,specularColorMap:_e,specularIntensityMap:Ge,transmission:ee,transmissionMap:N,thicknessMap:de,gradientMap:pe,opaque:T.transparent===!1&&T.blending===Yo&&T.alphaToCoverage===!1,alphaMap:we,alphaTest:fe,alphaHash:oe,combine:T.combine,mapUv:We&&_(T.map.channel),aoMapUv:G&&_(T.aoMap.channel),lightMapUv:Z&&_(T.lightMap.channel),bumpMapUv:K&&_(T.bumpMap.channel),normalMapUv:P&&_(T.normalMap.channel),displacementMapUv:le&&_(T.displacementMap.channel),emissiveMapUv:J&&_(T.emissiveMap.channel),metalnessMapUv:re&&_(T.metalnessMap.channel),roughnessMapUv:ie&&_(T.roughnessMap.channel),anisotropyMapUv:X&&_(T.anisotropyMap.channel),clearcoatMapUv:ve&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:ue&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:he&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(T.sheenRoughnessMap.channel),specularMapUv:Ee&&_(T.specularMap.channel),specularColorMapUv:_e&&_(T.specularColorMap.channel),specularIntensityMapUv:Ge&&_(T.specularIntensityMap.channel),transmissionMapUv:N&&_(T.transmissionMap.channel),thicknessMapUv:de&&_(T.thicknessMap.channel),alphaMapUv:we&&_(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(P||Se),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!j.attributes.uv&&(We||we),fog:!!$,useFog:T.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:Y.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Oe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:We&&T.map.isVideoTexture===!0&&mt.getTransfer(T.map.colorSpace)===bt,decodeVideoTextureEmissive:J&&T.emissiveMap.isVideoTexture===!0&&mt.getTransfer(T.emissiveMap.colorSpace)===bt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===nr,flipSided:T.side===ei,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Le&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&T.extensions.multiDraw===!0||Ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function p(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)M.push(I),M.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(b(M,T),S(M,T),M.push(i.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function b(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function S(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function v(T){const M=g[T.type];let I;if(M){const F=er[M];I=Su.clone(F.uniforms)}else I=T.uniforms;return I}function E(T,M){let I;for(let F=0,Y=u.length;F<Y;F++){const $=u[F];if($.cacheKey===M){I=$,++I.usedTimes;break}}return I===void 0&&(I=new _C(i,M,T,s),u.push(I)),I}function C(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function R(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:C,releaseShaderCache:R,programs:u,dispose:D}}function MC(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function TC(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function u_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function f_(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||TC),n.length>1&&n.sort(h||u_),r.length>1&&r.sort(h||u_)}function u(){for(let f=e,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function bC(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new f_,i.set(n,[o])):r>=s.length?(o=new f_,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function EC(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new je};break;case"SpotLight":t={position:new H,direction:new H,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function wC(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let AC=0;function RC(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function CC(i){const e=new EC,t=wC(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const r=new H,s=new ot,o=new ot;function a(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,S=0,v=0,E=0,C=0,R=0;c.sort(RC);for(let T=0,M=c.length;T<M;T++){const I=c[T],F=I.color,Y=I.intensity,$=I.distance,j=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*Y,f+=F.g*Y,h+=F.b*Y;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],Y);R++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.directionalShadow[d]=B,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=I.shadow.matrix,b++}n.directional[d]=W,d++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(F).multiplyScalar(Y),W.distance=$,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[_]=W;const V=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,V.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[_]=V.matrix,I.castShadow){const B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.spotShadow[_]=B,n.spotShadowMap[_]=j,v++}_++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(F).multiplyScalar(Y),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const V=I.shadow,B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,B.shadowCameraNear=V.camera.near,B.shadowCameraFar=V.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=I.shadow.matrix,S++}n.point[g]=W,g++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(Y),W.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==b||D.numPointShadows!==S||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+E-C,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,D.directionalLength=d,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=b,D.numPointShadows=S,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=R,n.version=AC++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[f];v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(S.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function h_(i){const e=new CC(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function PC(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new h_(i),e.set(r,[a])):s>=o.length?(a=new h_(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const DC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function IC(i,e,t){let n=new Np;const r=new Ze,s=new Ze,o=new vt,a=new CE({depthPacking:xb}),l=new PE,c={},u=t.maxTextureSize,f={[Hr]:ei,[ei]:Hr,[nr]:nr},h=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:DC,fragmentShader:LC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Xi;g.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Kn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tp;let p=this.type;this.render=function(C,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ur),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=p!==br&&this.type===br,$=p===br&&this.type!==br;for(let j=0,W=C.length;j<W;j++){const V=C[j],B=V.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const ae=B.getFrameExtents();if(r.multiply(ae),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,B.mapSize.y=s.y)),B.map===null||Y===!0||$===!0){const ge=this.type!==br?{minFilter:Hn,magFilter:Hn}:{};B.map!==null&&B.map.dispose(),B.map=new Gi(r.x,r.y,ge),B.map.texture.name=V.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const U=B.getViewportCount();for(let ge=0;ge<U;ge++){const Oe=B.getViewport(ge);o.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),F.viewport(o),B.updateMatrices(V,ge),n=B.getFrustum(),v(R,D,B.camera,V,this.type)}B.isPointLightShadow!==!0&&this.type===br&&b(B,D),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,M,I)};function b(C,R){const D=e.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gi(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(R,null,D,h,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(R,null,D,d,_,null)}function S(C,R,D,T){let M=null;const I=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)M=I;else if(M=D.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=M.uuid,Y=R.uuid;let $=c[F];$===void 0&&($={},c[F]=$);let j=$[Y];j===void 0&&(j=M.clone(),$[Y]=j,R.addEventListener("dispose",E)),M=j}if(M.visible=R.visible,M.wireframe=R.wireframe,T===br?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:f[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=i.properties.get(M);F.light=D}return M}function v(C,R,D,T,M){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===br)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const Y=e.update(C),$=C.material;if(Array.isArray($)){const j=Y.groups;for(let W=0,V=j.length;W<V;W++){const B=j[W],ae=$[B.materialIndex];if(ae&&ae.visible){const U=S(C,ae,T,M);C.onBeforeShadow(i,C,R,D,Y,U,B),i.renderBufferDirect(D,null,Y,U,C,B),C.onAfterShadow(i,C,R,D,Y,U,B)}}}else if($.visible){const j=S(C,$,T,M);C.onBeforeShadow(i,C,R,D,Y,j,null),i.renderBufferDirect(D,null,Y,j,C,null),C.onAfterShadow(i,C,R,D,Y,j,null)}}const F=C.children;for(let Y=0,$=F.length;Y<$;Y++)v(F[Y],R,D,T,M)}function E(C){C.target.removeEventListener("dispose",E);for(const D in c){const T=c[D],M=C.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const UC={[Vh]:Gh,[Wh]:qh,[Xh]:Kh,[sa]:Yh,[Gh]:Vh,[qh]:Wh,[Kh]:Xh,[Yh]:sa};function NC(i,e){function t(){let N=!1;const de=new vt;let pe=null;const we=new vt(0,0,0,0);return{setMask:function(fe){pe!==fe&&!N&&(i.colorMask(fe,fe,fe,fe),pe=fe)},setLocked:function(fe){N=fe},setClear:function(fe,oe,Le,Ve,gt){gt===!0&&(fe*=Ve,oe*=Ve,Le*=Ve),de.set(fe,oe,Le,Ve),we.equals(de)===!1&&(i.clearColor(fe,oe,Le,Ve),we.copy(de))},reset:function(){N=!1,pe=null,we.set(-1,0,0,0)}}}function n(){let N=!1,de=!1,pe=null,we=null,fe=null;return{setReversed:function(oe){if(de!==oe){const Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),de=oe;const Ve=fe;fe=null,this.setClear(Ve)}},getReversed:function(){return de},setTest:function(oe){oe?se(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(oe){pe!==oe&&!N&&(i.depthMask(oe),pe=oe)},setFunc:function(oe){if(de&&(oe=UC[oe]),we!==oe){switch(oe){case Vh:i.depthFunc(i.NEVER);break;case Gh:i.depthFunc(i.ALWAYS);break;case Wh:i.depthFunc(i.LESS);break;case sa:i.depthFunc(i.LEQUAL);break;case Xh:i.depthFunc(i.EQUAL);break;case Yh:i.depthFunc(i.GEQUAL);break;case qh:i.depthFunc(i.GREATER);break;case Kh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=oe}},setLocked:function(oe){N=oe},setClear:function(oe){fe!==oe&&(de&&(oe=1-oe),i.clearDepth(oe),fe=oe)},reset:function(){N=!1,pe=null,we=null,fe=null,de=!1}}}function r(){let N=!1,de=null,pe=null,we=null,fe=null,oe=null,Le=null,Ve=null,gt=null;return{setTest:function(Re){N||(Re?se(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(Re){de!==Re&&!N&&(i.stencilMask(Re),de=Re)},setFunc:function(Re,Fe,Qe){(pe!==Re||we!==Fe||fe!==Qe)&&(i.stencilFunc(Re,Fe,Qe),pe=Re,we=Fe,fe=Qe)},setOp:function(Re,Fe,Qe){(oe!==Re||Le!==Fe||Ve!==Qe)&&(i.stencilOp(Re,Fe,Qe),oe=Re,Le=Fe,Ve=Qe)},setLocked:function(Re){N=Re},setClear:function(Re){gt!==Re&&(i.clearStencil(Re),gt=Re)},reset:function(){N=!1,de=null,pe=null,we=null,fe=null,oe=null,Le=null,Ve=null,gt=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,E=null,C=null,R=new je(0,0,0),D=0,T=!1,M=null,I=null,F=null,Y=null,$=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,V=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),W=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),W=V>=2);let ae=null,U={};const ge=i.getParameter(i.SCISSOR_BOX),Oe=i.getParameter(i.VIEWPORT),et=new vt().fromArray(ge),Ke=new vt().fromArray(Oe);function qe(N,de,pe,we){const fe=new Uint8Array(4),oe=i.createTexture();i.bindTexture(N,oe),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<pe;Le++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(de+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return oe}const ne={};ne[i.TEXTURE_2D]=qe(i.TEXTURE_2D,i.TEXTURE_2D,1),ne[i.TEXTURE_CUBE_MAP]=qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[i.TEXTURE_2D_ARRAY]=qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ne[i.TEXTURE_3D]=qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(sa),K(!1),P(Zm),se(i.CULL_FACE),G(Ur);function se(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function Me(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Ie(N,de){return f[N]!==de?(i.bindFramebuffer(N,de),f[N]=de,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=de),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=de),!0):!1}function Ce(N,de){let pe=d,we=!1;if(N){pe=h.get(de),pe===void 0&&(pe=[],h.set(de,pe));const fe=N.textures;if(pe.length!==fe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Le=fe.length;oe<Le;oe++)pe[oe]=i.COLOR_ATTACHMENT0+oe;pe.length=fe.length,we=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,we=!0);we&&i.drawBuffers(pe)}function We(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const L={[ks]:i.FUNC_ADD,[WT]:i.FUNC_SUBTRACT,[XT]:i.FUNC_REVERSE_SUBTRACT};L[YT]=i.MIN,L[qT]=i.MAX;const x={[KT]:i.ZERO,[jT]:i.ONE,[$T]:i.SRC_COLOR,[zh]:i.SRC_ALPHA,[nb]:i.SRC_ALPHA_SATURATE,[eb]:i.DST_COLOR,[JT]:i.DST_ALPHA,[ZT]:i.ONE_MINUS_SRC_COLOR,[Hh]:i.ONE_MINUS_SRC_ALPHA,[tb]:i.ONE_MINUS_DST_COLOR,[QT]:i.ONE_MINUS_DST_ALPHA,[ib]:i.CONSTANT_COLOR,[rb]:i.ONE_MINUS_CONSTANT_COLOR,[sb]:i.CONSTANT_ALPHA,[ob]:i.ONE_MINUS_CONSTANT_ALPHA};function G(N,de,pe,we,fe,oe,Le,Ve,gt,Re){if(N===Ur){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(se(i.BLEND),_=!0),N!==GT){if(N!==m||Re!==T){if((p!==ks||v!==ks)&&(i.blendEquation(i.FUNC_ADD),p=ks,v=ks),Re)switch(N){case Yo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFunc(i.ONE,i.ONE);break;case Jm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qm:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Yo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Jm:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qm:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,S=null,E=null,C=null,R.set(0,0,0),D=0,m=N,T=Re}return}fe=fe||de,oe=oe||pe,Le=Le||we,(de!==p||fe!==v)&&(i.blendEquationSeparate(L[de],L[fe]),p=de,v=fe),(pe!==b||we!==S||oe!==E||Le!==C)&&(i.blendFuncSeparate(x[pe],x[we],x[oe],x[Le]),b=pe,S=we,E=oe,C=Le),(Ve.equals(R)===!1||gt!==D)&&(i.blendColor(Ve.r,Ve.g,Ve.b,gt),R.copy(Ve),D=gt),m=N,T=!1}function Z(N,de){N.side===nr?Me(i.CULL_FACE):se(i.CULL_FACE);let pe=N.side===ei;de&&(pe=!pe),K(pe),N.blending===Yo&&N.transparent===!1?G(Ur):G(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const we=N.stencilWrite;a.setTest(we),we&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),J(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function P(N){N!==zT?(se(i.CULL_FACE),N!==I&&(N===Zm?i.cullFace(i.BACK):N===HT?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),I=N}function le(N){N!==F&&(W&&i.lineWidth(N),F=N)}function J(N,de,pe){N?(se(i.POLYGON_OFFSET_FILL),(Y!==de||$!==pe)&&(i.polygonOffset(de,pe),Y=de,$=pe)):Me(i.POLYGON_OFFSET_FILL)}function re(N){N?se(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function ie(N){N===void 0&&(N=i.TEXTURE0+j-1),ae!==N&&(i.activeTexture(N),ae=N)}function Se(N,de,pe){pe===void 0&&(ae===null?pe=i.TEXTURE0+j-1:pe=ae);let we=U[pe];we===void 0&&(we={type:void 0,texture:void 0},U[pe]=we),(we.type!==N||we.texture!==de)&&(ae!==pe&&(i.activeTexture(pe),ae=pe),i.bindTexture(N,de||ne[N]),we.type=N,we.texture=de)}function A(){const N=U[ae];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(N){et.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),et.copy(N))}function Pe(N){Ke.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ke.copy(N))}function Ee(N,de){let pe=c.get(de);pe===void 0&&(pe=new WeakMap,c.set(de,pe));let we=pe.get(N);we===void 0&&(we=i.getUniformBlockIndex(de,N.name),pe.set(N,we))}function _e(N,de){const we=c.get(de).get(N);l.get(de)!==we&&(i.uniformBlockBinding(de,we,N.__bindingPointIndex),l.set(de,we))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ae=null,U={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,E=null,C=null,R=new je(0,0,0),D=0,T=!1,M=null,I=null,F=null,Y=null,$=null,et.set(0,0,i.canvas.width,i.canvas.height),Ke.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Me,bindFramebuffer:Ie,drawBuffers:Ce,useProgram:We,setBlending:G,setMaterial:Z,setFlipSided:K,setCullFace:P,setLineWidth:le,setPolygonOffset:J,setScissorTest:re,activeTexture:ie,bindTexture:Se,unbindTexture:A,compressedTexImage2D:y,compressedTexImage3D:O,texImage2D:me,texImage3D:he,updateUBOMapping:Ee,uniformBlockBinding:_e,texStorage2D:ue,texStorage3D:be,texSubImage2D:q,texSubImage3D:ee,compressedTexSubImage2D:X,compressedTexSubImage3D:ve,scissor:xe,viewport:Pe,reset:Ge}}function OC(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,y){return d?new OffscreenCanvas(A,y):Fl("canvas")}function _(A,y,O){let q=1;const ee=Se(A);if((ee.width>O||ee.height>O)&&(q=O/Math.max(ee.width,ee.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(q*ee.width),ve=Math.floor(q*ee.height);f===void 0&&(f=g(X,ve));const ue=y?g(X,ve):f;return ue.width=X,ue.height=ve,ue.getContext("2d").drawImage(A,0,0,X,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+X+"x"+ve+")."),ue}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(A,y,O,q,ee=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=y;if(y===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8)),y===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),y===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8)),y===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),y===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),y===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),y===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),y===i.RGBA){const ve=ee?xu:mt.getTransfer(q);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=ve===bt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(A,y){let O;return A?y===null||y===io||y===Ll?O=i.DEPTH24_STENCIL8:y===zi?O=i.DEPTH32F_STENCIL8:y===Dl&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===io||y===Ll?O=i.DEPTH_COMPONENT24:y===zi?O=i.DEPTH_COMPONENT32F:y===Dl&&(O=i.DEPTH_COMPONENT16),O}function E(A,y){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Hn&&A.minFilter!==_i?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function C(A){const y=A.target;y.removeEventListener("dispose",C),D(y),y.isVideoTexture&&u.delete(y)}function R(A){const y=A.target;y.removeEventListener("dispose",R),M(y)}function D(A){const y=n.get(A);if(y.__webglInit===void 0)return;const O=A.source,q=h.get(O);if(q){const ee=q[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(A),Object.keys(q).length===0&&h.delete(O)}n.remove(A)}function T(A){const y=n.get(A);i.deleteTexture(y.__webglTexture);const O=A.source,q=h.get(O);delete q[y.__cacheKey],o.memory.textures--}function M(A){const y=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let ee=0;ee<y.__webglFramebuffer[q].length;ee++)i.deleteFramebuffer(y.__webglFramebuffer[q][ee]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const O=A.textures;for(let q=0,ee=O.length;q<ee;q++){const X=n.get(O[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(O[q])}n.remove(A)}let I=0;function F(){I=0}function Y(){const A=I;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),I+=1,A}function $(A){const y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function j(A,y){const O=n.get(A);if(A.isVideoTexture&&re(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(O,A,y);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+y)}function W(A,y){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ne(O,A,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+y)}function V(A,y){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ne(O,A,y);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+y)}function B(A,y){const O=n.get(A);if(A.version>0&&O.__version!==A.version){se(O,A,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+y)}const ae={[la]:i.REPEAT,[as]:i.CLAMP_TO_EDGE,[vu]:i.MIRRORED_REPEAT},U={[Hn]:i.NEAREST,[Wv]:i.NEAREST_MIPMAP_NEAREST,[Wa]:i.NEAREST_MIPMAP_LINEAR,[_i]:i.LINEAR,[qc]:i.LINEAR_MIPMAP_NEAREST,[Dr]:i.LINEAR_MIPMAP_LINEAR},ge={[Sb]:i.NEVER,[Ab]:i.ALWAYS,[Mb]:i.LESS,[ex]:i.LEQUAL,[Tb]:i.EQUAL,[wb]:i.GEQUAL,[bb]:i.GREATER,[Eb]:i.NOTEQUAL};function Oe(A,y){if(y.type===zi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===_i||y.magFilter===qc||y.magFilter===Wa||y.magFilter===Dr||y.minFilter===_i||y.minFilter===qc||y.minFilter===Wa||y.minFilter===Dr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,ae[y.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,ae[y.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,ae[y.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,U[y.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,U[y.minFilter]),y.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ge[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Hn||y.minFilter!==Wa&&y.minFilter!==Dr||y.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function et(A,y){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",C));const q=y.source;let ee=h.get(q);ee===void 0&&(ee={},h.set(q,ee));const X=$(y);if(X!==A.__cacheKey){ee[X]===void 0&&(ee[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ee[X].usedTimes++;const ve=ee[A.__cacheKey];ve!==void 0&&(ee[A.__cacheKey].usedTimes--,ve.usedTimes===0&&T(y)),A.__cacheKey=X,A.__webglTexture=ee[X].texture}return O}function Ke(A,y,O){return Math.floor(Math.floor(A/O)/y)}function qe(A,y,O,q){const X=A.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,O,q,y.data);else{X.sort((he,xe)=>he.start-xe.start);let ve=0;for(let he=1;he<X.length;he++){const xe=X[ve],Pe=X[he],Ee=xe.start+xe.count,_e=Ke(Pe.start,y.width,4),Ge=Ke(xe.start,y.width,4);Pe.start<=Ee+1&&_e===Ge&&Ke(Pe.start+Pe.count-1,y.width,4)===_e?xe.count=Math.max(xe.count,Pe.start+Pe.count-xe.start):(++ve,X[ve]=Pe)}X.length=ve+1;const ue=i.getParameter(i.UNPACK_ROW_LENGTH),be=i.getParameter(i.UNPACK_SKIP_PIXELS),me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let he=0,xe=X.length;he<xe;he++){const Pe=X[he],Ee=Math.floor(Pe.start/4),_e=Math.ceil(Pe.count/4),Ge=Ee%y.width,N=Math.floor(Ee/y.width),de=_e,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ge,N,de,pe,O,q,y.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ue),i.pixelStorei(i.UNPACK_SKIP_PIXELS,be),i.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function ne(A,y,O){let q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=i.TEXTURE_3D);const ee=et(A,y),X=y.source;t.bindTexture(q,A.__webglTexture,i.TEXTURE0+O);const ve=n.get(X);if(X.version!==ve.__version||ee===!0){t.activeTexture(i.TEXTURE0+O);const ue=mt.getPrimaries(mt.workingColorSpace),be=y.colorSpace===ts?null:mt.getPrimaries(y.colorSpace),me=y.colorSpace===ts||ue===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let he=_(y.image,!1,r.maxTextureSize);he=ie(y,he);const xe=s.convert(y.format,y.colorSpace),Pe=s.convert(y.type);let Ee=S(y.internalFormat,xe,Pe,y.colorSpace,y.isVideoTexture);Oe(q,y);let _e;const Ge=y.mipmaps,N=y.isVideoTexture!==!0,de=ve.__version===void 0||ee===!0,pe=X.dataReady,we=E(y,he);if(y.isDepthTexture)Ee=v(y.format===Ul,y.type),de&&(N?t.texStorage2D(i.TEXTURE_2D,1,Ee,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,xe,Pe,null));else if(y.isDataTexture)if(Ge.length>0){N&&de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,xe,Pe,_e.data);y.generateMipmaps=!1}else N?(de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height),pe&&qe(y,he,xe,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,xe,Pe,he.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){N&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,Ge[0].width,Ge[0].height,he.depth);for(let fe=0,oe=Ge.length;fe<oe;fe++)if(_e=Ge[fe],y.format!==Li)if(xe!==null)if(N){if(pe)if(y.layerUpdates.size>0){const Le=Vg(_e.width,_e.height,y.format,y.type);for(const Ve of y.layerUpdates){const gt=_e.data.subarray(Ve*Le/_e.data.BYTES_PER_ELEMENT,(Ve+1)*Le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Ve,_e.width,_e.height,1,xe,gt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,_e.width,_e.height,he.depth,xe,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,Ee,_e.width,_e.height,he.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,_e.width,_e.height,he.depth,xe,Pe,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,Ee,_e.width,_e.height,he.depth,0,xe,Pe,_e.data)}else{N&&de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],y.format!==Li?xe!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,xe,Pe,_e.data)}else if(y.isDataArrayTexture)if(N){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,he.width,he.height,he.depth),pe)if(y.layerUpdates.size>0){const fe=Vg(he.width,he.height,y.format,y.type);for(const oe of y.layerUpdates){const Le=he.data.subarray(oe*fe/he.data.BYTES_PER_ELEMENT,(oe+1)*fe/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,he.width,he.height,1,xe,Pe,Le)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,xe,Pe,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,he.width,he.height,he.depth,0,xe,Pe,he.data);else if(y.isData3DTexture)N?(de&&t.texStorage3D(i.TEXTURE_3D,we,Ee,he.width,he.height,he.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,xe,Pe,he.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,he.width,he.height,he.depth,0,xe,Pe,he.data);else if(y.isFramebufferTexture){if(de)if(N)t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height);else{let fe=he.width,oe=he.height;for(let Le=0;Le<we;Le++)t.texImage2D(i.TEXTURE_2D,Le,Ee,fe,oe,0,xe,Pe,null),fe>>=1,oe>>=1}}else if(Ge.length>0){if(N&&de){const fe=Se(Ge[0]);t.texStorage2D(i.TEXTURE_2D,we,Ee,fe.width,fe.height)}for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,xe,Pe,_e):t.texImage2D(i.TEXTURE_2D,fe,Ee,xe,Pe,_e);y.generateMipmaps=!1}else if(N){if(de){const fe=Se(he);t.texStorage2D(i.TEXTURE_2D,we,Ee,fe.width,fe.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Pe,he)}else t.texImage2D(i.TEXTURE_2D,0,Ee,xe,Pe,he);m(y)&&p(q),ve.__version=X.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function se(A,y,O){if(y.image.length!==6)return;const q=et(A,y),ee=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const X=n.get(ee);if(ee.version!==X.__version||q===!0){t.activeTexture(i.TEXTURE0+O);const ve=mt.getPrimaries(mt.workingColorSpace),ue=y.colorSpace===ts?null:mt.getPrimaries(y.colorSpace),be=y.colorSpace===ts||ve===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,he=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!me&&!he?xe[oe]=_(y.image[oe],!0,r.maxCubemapSize):xe[oe]=he?y.image[oe].image:y.image[oe],xe[oe]=ie(y,xe[oe]);const Pe=xe[0],Ee=s.convert(y.format,y.colorSpace),_e=s.convert(y.type),Ge=S(y.internalFormat,Ee,_e,y.colorSpace),N=y.isVideoTexture!==!0,de=X.__version===void 0||q===!0,pe=ee.dataReady;let we=E(y,Pe);Oe(i.TEXTURE_CUBE_MAP,y);let fe;if(me){N&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ge,Pe.width,Pe.height);for(let oe=0;oe<6;oe++){fe=xe[oe].mipmaps;for(let Le=0;Le<fe.length;Le++){const Ve=fe[Le];y.format!==Li?Ee!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ve.width,Ve.height,Ee,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,Ge,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ve.width,Ve.height,Ee,_e,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,Ge,Ve.width,Ve.height,0,Ee,_e,Ve.data)}}}else{if(fe=y.mipmaps,N&&de){fe.length>0&&we++;const oe=Se(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ge,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(he){N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ee,_e,xe[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,xe[oe].width,xe[oe].height,0,Ee,_e,xe[oe].data);for(let Le=0;Le<fe.length;Le++){const gt=fe[Le].image[oe].image;N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,gt.width,gt.height,Ee,_e,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,Ge,gt.width,gt.height,0,Ee,_e,gt.data)}}else{N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ee,_e,xe[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,Ee,_e,xe[oe]);for(let Le=0;Le<fe.length;Le++){const Ve=fe[Le];N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,Ee,_e,Ve.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,Ge,Ee,_e,Ve.image[oe])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),X.__version=ee.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Me(A,y,O,q,ee,X){const ve=s.convert(O.format,O.colorSpace),ue=s.convert(O.type),be=S(O.internalFormat,ve,ue,O.colorSpace),me=n.get(y),he=n.get(O);if(he.__renderTarget=y,!me.__hasExternalTextures){const xe=Math.max(1,y.width>>X),Pe=Math.max(1,y.height>>X);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,X,be,xe,Pe,y.depth,0,ve,ue,null):t.texImage2D(ee,X,be,xe,Pe,0,ve,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,ee,he.__webglTexture,0,le(y)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,ee,he.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(A,y,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),y.depthBuffer){const q=y.depthTexture,ee=q&&q.isDepthTexture?q.type:null,X=v(y.stencilBuffer,ee),ve=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=le(y);J(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,X,y.width,y.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,X,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,X,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,A)}else{const q=y.textures;for(let ee=0;ee<q.length;ee++){const X=q[ee],ve=s.convert(X.format,X.colorSpace),ue=s.convert(X.type),be=S(X.internalFormat,ve,ue,X.colorSpace),me=le(y);O&&J(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,be,y.width,y.height):J(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,be,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,be,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(y.depthTexture);q.__renderTarget=y,(!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),j(y.depthTexture,0);const ee=q.__webglTexture,X=le(y);if(y.depthTexture.format===Il)J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(y.depthTexture.format===Ul)J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function We(A){const y=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){const ee=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",ee)};q.addEventListener("dispose",ee),y.__depthDisposeCallback=ee}y.__boundDepthTexture=q}if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const q=A.texture.mipmaps;q&&q.length>0?Ce(y.__webglFramebuffer[0],A):Ce(y.__webglFramebuffer,A)}else if(O){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=i.createRenderbuffer(),Ie(y.__webglDepthbuffer[q],A,!1);else{const ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ie(y.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function L(A,y,O){const q=n.get(A);y!==void 0&&Me(q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&We(A)}function x(A){const y=A.texture,O=n.get(A),q=n.get(y);A.addEventListener("dispose",R);const ee=A.textures,X=A.isWebGLCubeRenderTarget===!0,ve=ee.length>1;if(ve||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=y.version,o.memory.textures++),X){O.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[ue]=[];for(let be=0;be<y.mipmaps.length;be++)O.__webglFramebuffer[ue][be]=i.createFramebuffer()}else O.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let ue=0;ue<y.mipmaps.length;ue++)O.__webglFramebuffer[ue]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ve)for(let ue=0,be=ee.length;ue<be;ue++){const me=n.get(ee[ue]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&J(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const be=ee[ue];O.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ue]);const me=s.convert(be.format,be.colorSpace),he=s.convert(be.type),xe=S(be.internalFormat,me,he,be.colorSpace,A.isXRRenderTarget===!0),Pe=le(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,xe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,O.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Oe(i.TEXTURE_CUBE_MAP,y);for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0)for(let be=0;be<y.mipmaps.length;be++)Me(O.__webglFramebuffer[ue][be],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,be);else Me(O.__webglFramebuffer[ue],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(y)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ue=0,be=ee.length;ue<be;ue++){const me=ee[ue],he=n.get(me);let xe=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,he.__webglTexture),Oe(xe,me),Me(O.__webglFramebuffer,A,me,i.COLOR_ATTACHMENT0+ue,xe,0),m(me)&&p(xe)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ue=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,q.__webglTexture),Oe(ue,y),y.mipmaps&&y.mipmaps.length>0)for(let be=0;be<y.mipmaps.length;be++)Me(O.__webglFramebuffer[be],A,y,i.COLOR_ATTACHMENT0,ue,be);else Me(O.__webglFramebuffer,A,y,i.COLOR_ATTACHMENT0,ue,0);m(y)&&p(ue),t.unbindTexture()}A.depthBuffer&&We(A)}function G(A){const y=A.textures;for(let O=0,q=y.length;O<q;O++){const ee=y[O];if(m(ee)){const X=b(A),ve=n.get(ee).__webglTexture;t.bindTexture(X,ve),p(X),t.unbindTexture()}}}const Z=[],K=[];function P(A){if(A.samples>0){if(J(A)===!1){const y=A.textures,O=A.width,q=A.height;let ee=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(A),ue=y.length>1;if(ue)for(let me=0;me<y.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const be=A.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let me=0;me<y.length;me++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);const he=n.get(y[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,he,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,ee,i.NEAREST),l===!0&&(Z.length=0,K.length=0,Z.push(i.COLOR_ATTACHMENT0+me),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Z.push(X),K.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,K)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let me=0;me<y.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);const he=n.get(y[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,he,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function le(A){return Math.min(r.maxSamples,A.samples)}function J(A){const y=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function re(A){const y=o.render.frame;u.get(A)!==y&&(u.set(A,y),A.update())}function ie(A,y){const O=A.colorSpace,q=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Wn&&O!==ts&&(mt.getTransfer(O)===bt?(q!==Li||ee!==dr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}function Se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=F,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=V,this.setTextureCube=B,this.rebindTextures=L,this.setupRenderTarget=x,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=J}function FC(i,e){function t(n,r=ts){let s;const o=mt.getTransfer(r);if(n===dr)return i.UNSIGNED_BYTE;if(n===Ep)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wp)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qv)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kv)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xv)return i.BYTE;if(n===Yv)return i.SHORT;if(n===Dl)return i.UNSIGNED_SHORT;if(n===bp)return i.INT;if(n===io)return i.UNSIGNED_INT;if(n===zi)return i.FLOAT;if(n===Nr)return i.HALF_FLOAT;if(n===jv)return i.ALPHA;if(n===$v)return i.RGB;if(n===Li)return i.RGBA;if(n===Il)return i.DEPTH_COMPONENT;if(n===Ul)return i.DEPTH_STENCIL;if(n===Ap)return i.RED;if(n===Rp)return i.RED_INTEGER;if(n===Zv)return i.RG;if(n===Cp)return i.RG_INTEGER;if(n===Pp)return i.RGBA_INTEGER;if(n===Kc||n===jc||n===$c||n===Zc)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Kc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Kc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$c)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zh||n===Jh||n===Qh||n===ed)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Zh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ed)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===td||n===nd||n===id)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===td||n===nd)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===id)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rd||n===sd||n===od||n===ad||n===ld||n===cd||n===ud||n===fd||n===hd||n===dd||n===pd||n===md||n===gd||n===_d)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===rd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===od)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ad)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ld)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ud)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===md)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gd)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_d)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vd||n===xd||n===yd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===vd)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sd||n===Md||n===Td||n===bd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Sd)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Md)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Td)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ll?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const BC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class zC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new mx(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new jn({vertexShader:BC,fragmentShader:kC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kn(new Hu(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class HC extends ga{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new zC,p={},b=t.getContextAttributes();let S=null,v=null;const E=[],C=[],R=new Ze;let D=null;const T=new Nn;T.viewport=new vt;const M=new Nn;M.viewport=new vt;const I=[T,M],F=new JE;let Y=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let se=E[ne];return se===void 0&&(se=new kf,E[ne]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ne){let se=E[ne];return se===void 0&&(se=new kf,E[ne]=se),se.getGripSpace()},this.getHand=function(ne){let se=E[ne];return se===void 0&&(se=new kf,E[ne]=se),se.getHandSpace()};function j(ne){const se=C.indexOf(ne.inputSource);if(se===-1)return;const Me=E[se];Me!==void 0&&(Me.update(ne.inputSource,ne.frame,c||o),Me.dispatchEvent({type:ne.type,data:ne.inputSource}))}function W(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",V);for(let ne=0;ne<E.length;ne++){const se=C[ne];se!==null&&(C[ne]=null,E[ne].disconnect(se))}Y=null,$=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(S),d=null,h=null,f=null,r=null,v=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){s=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ne){if(r=ne,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",W),r.addEventListener("inputsourceschange",V),b.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ie=null,Ce=null;b.depth&&(Ce=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=b.stencil?Ul:Il,Ie=b.stencil?Ll:io);const We={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(We),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Gi(h.textureWidth,h.textureHeight,{format:Li,type:dr,depthTexture:new px(h.textureWidth,h.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Me={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Me),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Gi(d.framebufferWidth,d.framebufferHeight,{format:Li,type:dr,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qe.setContext(r),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(ne){for(let se=0;se<ne.removed.length;se++){const Me=ne.removed[se],Ie=C.indexOf(Me);Ie>=0&&(C[Ie]=null,E[Ie].disconnect(Me))}for(let se=0;se<ne.added.length;se++){const Me=ne.added[se];let Ie=C.indexOf(Me);if(Ie===-1){for(let We=0;We<E.length;We++)if(We>=C.length){C.push(Me),Ie=We;break}else if(C[We]===null){C[We]=Me,Ie=We;break}if(Ie===-1)break}const Ce=E[Ie];Ce&&Ce.connect(Me)}}const B=new H,ae=new H;function U(ne,se,Me){B.setFromMatrixPosition(se.matrixWorld),ae.setFromMatrixPosition(Me.matrixWorld);const Ie=B.distanceTo(ae),Ce=se.projectionMatrix.elements,We=Me.projectionMatrix.elements,L=Ce[14]/(Ce[10]-1),x=Ce[14]/(Ce[10]+1),G=(Ce[9]+1)/Ce[5],Z=(Ce[9]-1)/Ce[5],K=(Ce[8]-1)/Ce[0],P=(We[8]+1)/We[0],le=L*K,J=L*P,re=Ie/(-K+P),ie=re*-K;if(se.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(ie),ne.translateZ(re),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ce[10]===-1)ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Se=L+re,A=x+re,y=le-ie,O=J+(Ie-ie),q=G*x/A*Se,ee=Z*x/A*Se;ne.projectionMatrix.makePerspective(y,O,q,ee,Se,A),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function ge(ne,se){se===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(se.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(r===null)return;let se=ne.near,Me=ne.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),F.near=M.near=T.near=se,F.far=M.far=T.far=Me,(Y!==F.near||$!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),Y=F.near,$=F.far),F.layers.mask=ne.layers.mask|6,T.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;const Ie=ne.parent,Ce=F.cameras;ge(F,Ie);for(let We=0;We<Ce.length;We++)ge(Ce[We],Ie);Ce.length===2?U(F,T,M):F.projectionMatrix.copy(T.projectionMatrix),Oe(ne,F,Ie)};function Oe(ne,se,Me){Me===null?ne.matrix.copy(se.matrixWorld):(ne.matrix.copy(Me.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(se.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=ca*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(ne){l=ne,h!==null&&(h.fixedFoveation=ne),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(ne){return p[ne]};let et=null;function Ke(ne,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const Me=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Ie=!1;Me.length!==F.cameras.length&&(F.cameras.length=0,Ie=!0);for(let x=0;x<Me.length;x++){const G=Me[x];let Z=null;if(d!==null)Z=d.getViewport(G);else{const P=f.getViewSubImage(h,G);Z=P.viewport,x===0&&(e.setRenderTargetTextures(v,P.colorTexture,P.depthStencilTexture),e.setRenderTarget(v))}let K=I[x];K===void 0&&(K=new Nn,K.layers.enable(x),K.viewport=new vt,I[x]=K),K.matrix.fromArray(G.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(G.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Z.x,Z.y,Z.width,Z.height),x===0&&(F.matrix.copy(K.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ie===!0&&F.cameras.push(K)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const x=f.getDepthInformation(Me[0]);x&&x.isValid&&x.texture&&m.init(x,r.renderState)}if(Ce&&Ce.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let x=0;x<Me.length;x++){const G=Me[x].camera;if(G){let Z=p[G];Z||(Z=new mx,p[G]=Z);const K=f.getCameraImage(G);Z.sourceTexture=K}}}}for(let Me=0;Me<E.length;Me++){const Ie=C[Me],Ce=E[Me];Ie!==null&&Ce!==void 0&&Ce.update(Ie,se,c||o)}et&&et(ne,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const qe=new xx;qe.setAnimationLoop(Ke),this.setAnimationLoop=function(ne){et=ne},this.dispose=function(){}}}const Ds=new pr,VC=new ot;function GC(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ax(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ei&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ei&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,Ds.copy(v),Ds.x*=-1,Ds.y*=-1,Ds.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ds.y*=-1,Ds.z*=-1),m.envMapRotation.value.setFromMatrix4(VC.makeRotationFromEuler(Ds)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ei&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function WC(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const E=S.program;n.updateUBOMapping(b,E);const C=e.render.frame;s[b.id]!==C&&(h(b),s[b.id]=C)}function u(b){const S=f();b.__bindingPointIndex=S;const v=i.createBuffer(),E=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,E,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const S=r[b.id],v=b.uniforms,E=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let C=0,R=v.length;C<R;C++){const D=Array.isArray(v[C])?v[C]:[v[C]];for(let T=0,M=D.length;T<M;T++){const I=D[T];if(d(I,C,T,E)===!0){const F=I.__offset,Y=Array.isArray(I.value)?I.value:[I.value];let $=0;for(let j=0;j<Y.length;j++){const W=Y[j],V=_(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,F+$,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,$),$+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,S,v,E){const C=b.value,R=S+"_"+v;if(E[R]===void 0)return typeof C=="number"||typeof C=="boolean"?E[R]=C:E[R]=C.clone(),!0;{const D=E[R];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return E[R]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(b){const S=b.uniforms;let v=0;const E=16;for(let R=0,D=S.length;R<D;R++){const T=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,I=T.length;M<I;M++){const F=T[M],Y=Array.isArray(F.value)?F.value:[F.value];for(let $=0,j=Y.length;$<j;$++){const W=Y[$],V=_(W),B=v%E,ae=B%V.boundary,U=B+ae;v+=ae,U!==0&&E-U<V.storage&&(v+=E-U),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=V.storage}}}const C=v%E;return C>0&&(v+=E-C),b.__size=v,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class XC{constructor(e={}){const{canvas:t=Xb(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=hn;let C=0,R=0,D=null,T=-1,M=null;const I=new vt,F=new vt;let Y=null;const $=new je(0);let j=0,W=t.width,V=t.height,B=1,ae=null,U=null;const ge=new vt(0,0,W,V),Oe=new vt(0,0,W,V);let et=!1;const Ke=new Np;let qe=!1,ne=!1;const se=new ot,Me=new H,Ie=new vt,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function L(){return D===null?B:1}let x=n;function G(w,k){return t.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mp}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",fe,!1),x===null){const k="webgl2";if(x=G(k,w),x===null)throw G(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Z,K,P,le,J,re,ie,Se,A,y,O,q,ee,X,ve,ue,be,me,he,xe,Pe,Ee,_e,Ge;function N(){Z=new tR(x),Z.init(),Ee=new FC(x,Z),K=new KA(x,Z,e,Ee),P=new NC(x,Z),K.reversedDepthBuffer&&h&&P.buffers.depth.setReversed(!0),le=new rR(x),J=new MC,re=new OC(x,Z,P,J,K,Ee,le),ie=new $A(v),Se=new eR(v),A=new uw(x),_e=new YA(x,A),y=new nR(x,A,le,_e),O=new oR(x,y,A,le),he=new sR(x,K,re),ue=new jA(J),q=new SC(v,ie,Se,Z,K,_e,ue),ee=new GC(v,J),X=new bC,ve=new PC(Z),me=new XA(v,ie,Se,P,O,d,l),be=new IC(v,O,K),Ge=new WC(x,le,K,P),xe=new qA(x,Z,le),Pe=new iR(x,Z,le),le.programs=q.programs,v.capabilities=K,v.extensions=Z,v.properties=J,v.renderLists=X,v.shadowMap=be,v.state=P,v.info=le}N();const de=new HC(v,x);this.xr=de,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const w=Z.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Z.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(w){w!==void 0&&(B=w,this.setSize(W,V,!1))},this.getSize=function(w){return w.set(W,V)},this.setSize=function(w,k,Q=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=w,V=k,t.width=Math.floor(w*B),t.height=Math.floor(k*B),Q===!0&&(t.style.width=w+"px",t.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(W*B,V*B).floor()},this.setDrawingBufferSize=function(w,k,Q){W=w,V=k,B=Q,t.width=Math.floor(w*Q),t.height=Math.floor(k*Q),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(ge)},this.setViewport=function(w,k,Q,te){w.isVector4?ge.set(w.x,w.y,w.z,w.w):ge.set(w,k,Q,te),P.viewport(I.copy(ge).multiplyScalar(B).round())},this.getScissor=function(w){return w.copy(Oe)},this.setScissor=function(w,k,Q,te){w.isVector4?Oe.set(w.x,w.y,w.z,w.w):Oe.set(w,k,Q,te),P.scissor(F.copy(Oe).multiplyScalar(B).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(w){P.setScissorTest(et=w)},this.setOpaqueSort=function(w){ae=w},this.setTransparentSort=function(w){U=w},this.getClearColor=function(w){return w.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,Q=!0){let te=0;if(w){let z=!1;if(D!==null){const ce=D.texture.format;z=ce===Pp||ce===Cp||ce===Rp}if(z){const ce=D.texture.type,ye=ce===dr||ce===io||ce===Dl||ce===Ll||ce===Ep||ce===wp,Ue=me.getClearColor(),De=me.getClearAlpha(),He=Ue.r,ke=Ue.g,Be=Ue.b;ye?(g[0]=He,g[1]=ke,g[2]=Be,g[3]=De,x.clearBufferuiv(x.COLOR,0,g)):(_[0]=He,_[1]=ke,_[2]=Be,_[3]=De,x.clearBufferiv(x.COLOR,0,_))}else te|=x.COLOR_BUFFER_BIT}k&&(te|=x.DEPTH_BUFFER_BIT),Q&&(te|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),me.dispose(),X.dispose(),ve.dispose(),J.dispose(),ie.dispose(),Se.dispose(),O.dispose(),_e.dispose(),Ge.dispose(),q.dispose(),de.dispose(),de.removeEventListener("sessionstart",Qe),de.removeEventListener("sessionend",Te),Xe.stop()};function pe(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=le.autoReset,k=be.enabled,Q=be.autoUpdate,te=be.needsUpdate,z=be.type;N(),le.autoReset=w,be.enabled=k,be.autoUpdate=Q,be.needsUpdate=te,be.type=z}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function oe(w){const k=w.target;k.removeEventListener("dispose",oe),Le(k)}function Le(w){Ve(w),J.remove(w)}function Ve(w){const k=J.get(w).programs;k!==void 0&&(k.forEach(function(Q){q.releaseProgram(Q)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,Q,te,z,ce){k===null&&(k=Ce);const ye=z.isMesh&&z.matrixWorld.determinant()<0,Ue=St(w,k,Q,te,z);P.setMaterial(te,ye);let De=Q.index,He=1;if(te.wireframe===!0){if(De=y.getWireframeAttribute(Q),De===void 0)return;He=2}const ke=Q.drawRange,Be=Q.attributes.position;let tt=ke.start*He,ft=(ke.start+ke.count)*He;ce!==null&&(tt=Math.max(tt,ce.start*He),ft=Math.min(ft,(ce.start+ce.count)*He)),De!==null?(tt=Math.max(tt,0),ft=Math.min(ft,De.count)):Be!=null&&(tt=Math.max(tt,0),ft=Math.min(ft,Be.count));const Gt=ft-tt;if(Gt<0||Gt===1/0)return;_e.setup(z,te,Ue,Q,De);let Nt,At=xe;if(De!==null&&(Nt=A.get(De),At=Pe,At.setIndex(Nt)),z.isMesh)te.wireframe===!0?(P.setLineWidth(te.wireframeLinewidth*L()),At.setMode(x.LINES)):At.setMode(x.TRIANGLES);else if(z.isLine){let Ye=te.linewidth;Ye===void 0&&(Ye=1),P.setLineWidth(Ye*L()),z.isLineSegments?At.setMode(x.LINES):z.isLineLoop?At.setMode(x.LINE_LOOP):At.setMode(x.LINE_STRIP)}else z.isPoints?At.setMode(x.POINTS):z.isSprite&&At.setMode(x.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Bl("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),At.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))At.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ye=z._multiDrawStarts,Bt=z._multiDrawCounts,_t=z._multiDrawCount,ii=De?A.get(De).bytesPerElement:1,ao=J.get(te).currentProgram.getUniforms();for(let ri=0;ri<_t;ri++)ao.setValue(x,"_gl_DrawID",ri),At.render(Ye[ri]/ii,Bt[ri])}else if(z.isInstancedMesh)At.renderInstances(tt,Gt,z.count);else if(Q.isInstancedBufferGeometry){const Ye=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Bt=Math.min(Q.instanceCount,Ye);At.renderInstances(tt,Gt,Bt)}else At.render(tt,Gt)};function gt(w,k,Q){w.transparent===!0&&w.side===nr&&w.forceSinglePass===!1?(w.side=ei,w.needsUpdate=!0,Yt(w,k,Q),w.side=Hr,w.needsUpdate=!0,Yt(w,k,Q),w.side=nr):Yt(w,k,Q)}this.compile=function(w,k,Q=null){Q===null&&(Q=w),p=ve.get(Q),p.init(k),S.push(p),Q.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),w!==Q&&w.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const te=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ce=z.material;if(ce)if(Array.isArray(ce))for(let ye=0;ye<ce.length;ye++){const Ue=ce[ye];gt(Ue,Q,z),te.add(Ue)}else gt(ce,Q,z),te.add(ce)}),p=S.pop(),te},this.compileAsync=function(w,k,Q=null){const te=this.compile(w,k,Q);return new Promise(z=>{function ce(){if(te.forEach(function(ye){J.get(ye).currentProgram.isReady()&&te.delete(ye)}),te.size===0){z(w);return}setTimeout(ce,10)}Z.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Re=null;function Fe(w){Re&&Re(w)}function Qe(){Xe.stop()}function Te(){Xe.start()}const Xe=new xx;Xe.setAnimationLoop(Fe),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(w){Re=w,de.setAnimationLoop(w),w===null?Xe.stop():Xe.start()},de.addEventListener("sessionstart",Qe),de.addEventListener("sessionend",Te),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(k),k=de.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,k,D),p=ve.get(w,S.length),p.init(k),S.push(p),se.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ke.setFromProjectionMatrix(se,or,k.reversedDepth),ne=this.localClippingEnabled,qe=ue.init(this.clippingPlanes,ne),m=X.get(w,b.length),m.init(),b.push(m),de.enabled===!0&&de.isPresenting===!0){const ce=v.xr.getDepthSensingMesh();ce!==null&&ze(ce,k,-1/0,v.sortObjects)}ze(w,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ae,U),We=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,We&&me.addToRenderList(m,w),this.info.render.frame++,qe===!0&&ue.beginShadows();const Q=p.state.shadowsArray;be.render(Q,w,k),qe===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=m.opaque,z=m.transmissive;if(p.setupLights(),k.isArrayCamera){const ce=k.cameras;if(z.length>0)for(let ye=0,Ue=ce.length;ye<Ue;ye++){const De=ce[ye];Xt(te,z,w,De)}We&&me.render(w);for(let ye=0,Ue=ce.length;ye<Ue;ye++){const De=ce[ye];$e(m,w,De,De.viewport)}}else z.length>0&&Xt(te,z,w,k),We&&me.render(w),$e(m,w,k);D!==null&&R===0&&(re.updateMultisampleRenderTarget(D),re.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(v,w,k),_e.resetDefaultState(),T=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],qe===!0&&ue.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function ze(w,k,Q,te){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)Q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ke.intersectsSprite(w)){te&&Ie.setFromMatrixPosition(w.matrixWorld).applyMatrix4(se);const ye=O.update(w),Ue=w.material;Ue.visible&&m.push(w,ye,Ue,Q,Ie.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ke.intersectsObject(w))){const ye=O.update(w),Ue=w.material;if(te&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ie.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ie.copy(ye.boundingSphere.center)),Ie.applyMatrix4(w.matrixWorld).applyMatrix4(se)),Array.isArray(Ue)){const De=ye.groups;for(let He=0,ke=De.length;He<ke;He++){const Be=De[He],tt=Ue[Be.materialIndex];tt&&tt.visible&&m.push(w,ye,tt,Q,Ie.z,Be)}}else Ue.visible&&m.push(w,ye,Ue,Q,Ie.z,null)}}const ce=w.children;for(let ye=0,Ue=ce.length;ye<Ue;ye++)ze(ce[ye],k,Q,te)}function $e(w,k,Q,te){const z=w.opaque,ce=w.transmissive,ye=w.transparent;p.setupLightsView(Q),qe===!0&&ue.setGlobalState(v.clippingPlanes,Q),te&&P.viewport(I.copy(te)),z.length>0&&it(z,k,Q),ce.length>0&&it(ce,k,Q),ye.length>0&&it(ye,k,Q),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function Xt(w,k,Q,te){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[te.id]===void 0&&(p.state.transmissionRenderTarget[te.id]=new Gi(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?Nr:dr,minFilter:Dr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const ce=p.state.transmissionRenderTarget[te.id],ye=te.viewport||I;ce.setSize(ye.z*v.transmissionResolutionScale,ye.w*v.transmissionResolutionScale);const Ue=v.getRenderTarget(),De=v.getActiveCubeFace(),He=v.getActiveMipmapLevel();v.setRenderTarget(ce),v.getClearColor($),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),We&&me.render(Q);const ke=v.toneMapping;v.toneMapping=hs;const Be=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),p.setupLightsView(te),qe===!0&&ue.setGlobalState(v.clippingPlanes,te),it(w,Q,te),re.updateMultisampleRenderTarget(ce),re.updateRenderTargetMipmap(ce),Z.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ft=0,Gt=k.length;ft<Gt;ft++){const Nt=k[ft],At=Nt.object,Ye=Nt.geometry,Bt=Nt.material,_t=Nt.group;if(Bt.side===nr&&At.layers.test(te.layers)){const ii=Bt.side;Bt.side=ei,Bt.needsUpdate=!0,Ot(At,Q,te,Ye,Bt,_t),Bt.side=ii,Bt.needsUpdate=!0,tt=!0}}tt===!0&&(re.updateMultisampleRenderTarget(ce),re.updateRenderTargetMipmap(ce))}v.setRenderTarget(Ue,De,He),v.setClearColor($,j),Be!==void 0&&(te.viewport=Be),v.toneMapping=ke}function it(w,k,Q){const te=k.isScene===!0?k.overrideMaterial:null;for(let z=0,ce=w.length;z<ce;z++){const ye=w[z],Ue=ye.object,De=ye.geometry,He=ye.group;let ke=ye.material;ke.allowOverride===!0&&te!==null&&(ke=te),Ue.layers.test(Q.layers)&&Ot(Ue,k,Q,De,ke,He)}}function Ot(w,k,Q,te,z,ce){w.onBeforeRender(v,k,Q,te,z,ce),w.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(v,k,Q,te,w,ce),z.transparent===!0&&z.side===nr&&z.forceSinglePass===!1?(z.side=ei,z.needsUpdate=!0,v.renderBufferDirect(Q,k,te,z,w,ce),z.side=Hr,z.needsUpdate=!0,v.renderBufferDirect(Q,k,te,z,w,ce),z.side=nr):v.renderBufferDirect(Q,k,te,z,w,ce),w.onAfterRender(v,k,Q,te,z,ce)}function Yt(w,k,Q){k.isScene!==!0&&(k=Ce);const te=J.get(w),z=p.state.lights,ce=p.state.shadowsArray,ye=z.state.version,Ue=q.getParameters(w,z.state,ce,k,Q),De=q.getProgramCacheKey(Ue);let He=te.programs;te.environment=w.isMeshStandardMaterial?k.environment:null,te.fog=k.fog,te.envMap=(w.isMeshStandardMaterial?Se:ie).get(w.envMap||te.environment),te.envMapRotation=te.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,He===void 0&&(w.addEventListener("dispose",oe),He=new Map,te.programs=He);let ke=He.get(De);if(ke!==void 0){if(te.currentProgram===ke&&te.lightsStateVersion===ye)return wt(w,Ue),ke}else Ue.uniforms=q.getUniforms(w),w.onBeforeCompile(Ue,v),ke=q.acquireProgram(Ue,De),He.set(De,ke),te.uniforms=Ue.uniforms;const Be=te.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Be.clippingPlanes=ue.uniform),wt(w,Ue),te.needsLights=Ut(w),te.lightsStateVersion=ye,te.needsLights&&(Be.ambientLightColor.value=z.state.ambient,Be.lightProbe.value=z.state.probe,Be.directionalLights.value=z.state.directional,Be.directionalLightShadows.value=z.state.directionalShadow,Be.spotLights.value=z.state.spot,Be.spotLightShadows.value=z.state.spotShadow,Be.rectAreaLights.value=z.state.rectArea,Be.ltc_1.value=z.state.rectAreaLTC1,Be.ltc_2.value=z.state.rectAreaLTC2,Be.pointLights.value=z.state.point,Be.pointLightShadows.value=z.state.pointShadow,Be.hemisphereLights.value=z.state.hemi,Be.directionalShadowMap.value=z.state.directionalShadowMap,Be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Be.spotShadowMap.value=z.state.spotShadowMap,Be.spotLightMatrix.value=z.state.spotLightMatrix,Be.spotLightMap.value=z.state.spotLightMap,Be.pointShadowMap.value=z.state.pointShadowMap,Be.pointShadowMatrix.value=z.state.pointShadowMatrix),te.currentProgram=ke,te.uniformsList=null,ke}function It(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Jc.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function wt(w,k){const Q=J.get(w);Q.outputColorSpace=k.outputColorSpace,Q.batching=k.batching,Q.batchingColor=k.batchingColor,Q.instancing=k.instancing,Q.instancingColor=k.instancingColor,Q.instancingMorph=k.instancingMorph,Q.skinning=k.skinning,Q.morphTargets=k.morphTargets,Q.morphNormals=k.morphNormals,Q.morphColors=k.morphColors,Q.morphTargetsCount=k.morphTargetsCount,Q.numClippingPlanes=k.numClippingPlanes,Q.numIntersection=k.numClipIntersection,Q.vertexAlphas=k.vertexAlphas,Q.vertexTangents=k.vertexTangents,Q.toneMapping=k.toneMapping}function St(w,k,Q,te,z){k.isScene!==!0&&(k=Ce),re.resetTextureUnits();const ce=k.fog,ye=te.isMeshStandardMaterial?k.environment:null,Ue=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Wn,De=(te.isMeshStandardMaterial?Se:ie).get(te.envMap||ye),He=te.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ke=!!Q.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Be=!!Q.morphAttributes.position,tt=!!Q.morphAttributes.normal,ft=!!Q.morphAttributes.color;let Gt=hs;te.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Gt=v.toneMapping);const Nt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,At=Nt!==void 0?Nt.length:0,Ye=J.get(te),Bt=p.state.lights;if(qe===!0&&(ne===!0||w!==M)){const bn=w===M&&te.id===T;ue.setState(te,w,bn)}let _t=!1;te.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==Bt.state.version||Ye.outputColorSpace!==Ue||z.isBatchedMesh&&Ye.batching===!1||!z.isBatchedMesh&&Ye.batching===!0||z.isBatchedMesh&&Ye.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ye.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ye.instancing===!1||!z.isInstancedMesh&&Ye.instancing===!0||z.isSkinnedMesh&&Ye.skinning===!1||!z.isSkinnedMesh&&Ye.skinning===!0||z.isInstancedMesh&&Ye.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ye.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ye.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ye.instancingMorph===!1&&z.morphTexture!==null||Ye.envMap!==De||te.fog===!0&&Ye.fog!==ce||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==ue.numPlanes||Ye.numIntersection!==ue.numIntersection)||Ye.vertexAlphas!==He||Ye.vertexTangents!==ke||Ye.morphTargets!==Be||Ye.morphNormals!==tt||Ye.morphColors!==ft||Ye.toneMapping!==Gt||Ye.morphTargetsCount!==At)&&(_t=!0):(_t=!0,Ye.__version=te.version);let ii=Ye.currentProgram;_t===!0&&(ii=Yt(te,k,z));let ao=!1,ri=!1,Sa=!1;const kt=ii.getUniforms(),Mi=Ye.uniforms;if(P.useProgram(ii.program)&&(ao=!0,ri=!0,Sa=!0),te.id!==T&&(T=te.id,ri=!0),ao||M!==w){P.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),kt.setValue(x,"projectionMatrix",w.projectionMatrix),kt.setValue(x,"viewMatrix",w.matrixWorldInverse);const Xn=kt.map.cameraPosition;Xn!==void 0&&Xn.setValue(x,Me.setFromMatrixPosition(w.matrixWorld)),K.logarithmicDepthBuffer&&kt.setValue(x,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&kt.setValue(x,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,ri=!0,Sa=!0)}if(z.isSkinnedMesh){kt.setOptional(x,z,"bindMatrix"),kt.setOptional(x,z,"bindMatrixInverse");const bn=z.skeleton;bn&&(bn.boneTexture===null&&bn.computeBoneTexture(),kt.setValue(x,"boneTexture",bn.boneTexture,re))}z.isBatchedMesh&&(kt.setOptional(x,z,"batchingTexture"),kt.setValue(x,"batchingTexture",z._matricesTexture,re),kt.setOptional(x,z,"batchingIdTexture"),kt.setValue(x,"batchingIdTexture",z._indirectTexture,re),kt.setOptional(x,z,"batchingColorTexture"),z._colorsTexture!==null&&kt.setValue(x,"batchingColorTexture",z._colorsTexture,re));const Ti=Q.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&he.update(z,Q,ii),(ri||Ye.receiveShadow!==z.receiveShadow)&&(Ye.receiveShadow=z.receiveShadow,kt.setValue(x,"receiveShadow",z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Mi.envMap.value=De,Mi.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&k.environment!==null&&(Mi.envMapIntensity.value=k.environmentIntensity),ri&&(kt.setValue(x,"toneMappingExposure",v.toneMappingExposure),Ye.needsLights&&ni(Mi,Sa),ce&&te.fog===!0&&ee.refreshFogUniforms(Mi,ce),ee.refreshMaterialUniforms(Mi,te,B,V,p.state.transmissionRenderTarget[w.id]),Jc.upload(x,It(Ye),Mi,re)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Jc.upload(x,It(Ye),Mi,re),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&kt.setValue(x,"center",z.center),kt.setValue(x,"modelViewMatrix",z.modelViewMatrix),kt.setValue(x,"normalMatrix",z.normalMatrix),kt.setValue(x,"modelMatrix",z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const bn=te.uniformsGroups;for(let Xn=0,Xu=bn.length;Xn<Xu;Xn++){const Ss=bn[Xn];Ge.update(Ss,ii),Ge.bind(Ss,ii)}}return ii}function ni(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Ut(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,k,Q){const te=J.get(w);te.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),J.get(w.texture).__webglTexture=k,J.get(w.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:Q,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){const Q=J.get(w);Q.__webglFramebuffer=k,Q.__useDefaultFramebuffer=k===void 0};const Tn=x.createFramebuffer();this.setRenderTarget=function(w,k=0,Q=0){D=w,C=k,R=Q;let te=!0,z=null,ce=!1,ye=!1;if(w){const De=J.get(w);if(De.__useDefaultFramebuffer!==void 0)P.bindFramebuffer(x.FRAMEBUFFER,null),te=!1;else if(De.__webglFramebuffer===void 0)re.setupRenderTarget(w);else if(De.__hasExternalTextures)re.rebindTextures(w,J.get(w.texture).__webglTexture,J.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Be=w.depthTexture;if(De.__boundDepthTexture!==Be){if(Be!==null&&J.has(Be)&&(w.width!==Be.image.width||w.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(w)}}const He=w.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ye=!0);const ke=J.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ke[k])?z=ke[k][Q]:z=ke[k],ce=!0):w.samples>0&&re.useMultisampledRTT(w)===!1?z=J.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?z=ke[Q]:z=ke,I.copy(w.viewport),F.copy(w.scissor),Y=w.scissorTest}else I.copy(ge).multiplyScalar(B).floor(),F.copy(Oe).multiplyScalar(B).floor(),Y=et;if(Q!==0&&(z=Tn),P.bindFramebuffer(x.FRAMEBUFFER,z)&&te&&P.drawBuffers(w,z),P.viewport(I),P.scissor(F),P.setScissorTest(Y),ce){const De=J.get(w.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+k,De.__webglTexture,Q)}else if(ye){const De=k;for(let He=0;He<w.textures.length;He++){const ke=J.get(w.textures[He]);x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0+He,ke.__webglTexture,Q,De)}}else if(w!==null&&Q!==0){const De=J.get(w.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,De.__webglTexture,Q)}T=-1},this.readRenderTargetPixels=function(w,k,Q,te,z,ce,ye,Ue=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(De=De[ye]),De){P.bindFramebuffer(x.FRAMEBUFFER,De);try{const He=w.textures[Ue],ke=He.format,Be=He.type;if(!K.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-te&&Q>=0&&Q<=w.height-z&&(w.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+Ue),x.readPixels(k,Q,te,z,Ee.convert(ke),Ee.convert(Be),ce))}finally{const He=D!==null?J.get(D).__webglFramebuffer:null;P.bindFramebuffer(x.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(w,k,Q,te,z,ce,ye,Ue=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(De=De[ye]),De)if(k>=0&&k<=w.width-te&&Q>=0&&Q<=w.height-z){P.bindFramebuffer(x.FRAMEBUFFER,De);const He=w.textures[Ue],ke=He.format,Be=He.type;if(!K.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=x.createBuffer();x.bindBuffer(x.PIXEL_PACK_BUFFER,tt),x.bufferData(x.PIXEL_PACK_BUFFER,ce.byteLength,x.STREAM_READ),w.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+Ue),x.readPixels(k,Q,te,z,Ee.convert(ke),Ee.convert(Be),0);const ft=D!==null?J.get(D).__webglFramebuffer:null;P.bindFramebuffer(x.FRAMEBUFFER,ft);const Gt=x.fenceSync(x.SYNC_GPU_COMMANDS_COMPLETE,0);return x.flush(),await Yb(x,Gt,4),x.bindBuffer(x.PIXEL_PACK_BUFFER,tt),x.getBufferSubData(x.PIXEL_PACK_BUFFER,0,ce),x.deleteBuffer(tt),x.deleteSync(Gt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,Q=0){const te=Math.pow(2,-Q),z=Math.floor(w.image.width*te),ce=Math.floor(w.image.height*te),ye=k!==null?k.x:0,Ue=k!==null?k.y:0;re.setTexture2D(w,0),x.copyTexSubImage2D(x.TEXTURE_2D,Q,0,0,ye,Ue,z,ce),P.unbindTexture()};const Si=x.createFramebuffer(),en=x.createFramebuffer();this.copyTextureToTexture=function(w,k,Q=null,te=null,z=0,ce=null){ce===null&&(z!==0?(Bl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=z,z=0):ce=0);let ye,Ue,De,He,ke,Be,tt,ft,Gt;const Nt=w.isCompressedTexture?w.mipmaps[ce]:w.image;if(Q!==null)ye=Q.max.x-Q.min.x,Ue=Q.max.y-Q.min.y,De=Q.isBox3?Q.max.z-Q.min.z:1,He=Q.min.x,ke=Q.min.y,Be=Q.isBox3?Q.min.z:0;else{const Ti=Math.pow(2,-z);ye=Math.floor(Nt.width*Ti),Ue=Math.floor(Nt.height*Ti),w.isDataArrayTexture?De=Nt.depth:w.isData3DTexture?De=Math.floor(Nt.depth*Ti):De=1,He=0,ke=0,Be=0}te!==null?(tt=te.x,ft=te.y,Gt=te.z):(tt=0,ft=0,Gt=0);const At=Ee.convert(k.format),Ye=Ee.convert(k.type);let Bt;k.isData3DTexture?(re.setTexture3D(k,0),Bt=x.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(re.setTexture2DArray(k,0),Bt=x.TEXTURE_2D_ARRAY):(re.setTexture2D(k,0),Bt=x.TEXTURE_2D),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,k.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,k.unpackAlignment);const _t=x.getParameter(x.UNPACK_ROW_LENGTH),ii=x.getParameter(x.UNPACK_IMAGE_HEIGHT),ao=x.getParameter(x.UNPACK_SKIP_PIXELS),ri=x.getParameter(x.UNPACK_SKIP_ROWS),Sa=x.getParameter(x.UNPACK_SKIP_IMAGES);x.pixelStorei(x.UNPACK_ROW_LENGTH,Nt.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,Nt.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,He),x.pixelStorei(x.UNPACK_SKIP_ROWS,ke),x.pixelStorei(x.UNPACK_SKIP_IMAGES,Be);const kt=w.isDataArrayTexture||w.isData3DTexture,Mi=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){const Ti=J.get(w),bn=J.get(k),Xn=J.get(Ti.__renderTarget),Xu=J.get(bn.__renderTarget);P.bindFramebuffer(x.READ_FRAMEBUFFER,Xn.__webglFramebuffer),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,Xu.__webglFramebuffer);for(let Ss=0;Ss<De;Ss++)kt&&(x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,J.get(w).__webglTexture,z,Be+Ss),x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,J.get(k).__webglTexture,ce,Gt+Ss)),x.blitFramebuffer(He,ke,ye,Ue,tt,ft,ye,Ue,x.DEPTH_BUFFER_BIT,x.NEAREST);P.bindFramebuffer(x.READ_FRAMEBUFFER,null),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||J.has(w)){const Ti=J.get(w),bn=J.get(k);P.bindFramebuffer(x.READ_FRAMEBUFFER,Si),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,en);for(let Xn=0;Xn<De;Xn++)kt?x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,Ti.__webglTexture,z,Be+Xn):x.framebufferTexture2D(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,Ti.__webglTexture,z),Mi?x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,bn.__webglTexture,ce,Gt+Xn):x.framebufferTexture2D(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,bn.__webglTexture,ce),z!==0?x.blitFramebuffer(He,ke,ye,Ue,tt,ft,ye,Ue,x.COLOR_BUFFER_BIT,x.NEAREST):Mi?x.copyTexSubImage3D(Bt,ce,tt,ft,Gt+Xn,He,ke,ye,Ue):x.copyTexSubImage2D(Bt,ce,tt,ft,He,ke,ye,Ue);P.bindFramebuffer(x.READ_FRAMEBUFFER,null),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else Mi?w.isDataTexture||w.isData3DTexture?x.texSubImage3D(Bt,ce,tt,ft,Gt,ye,Ue,De,At,Ye,Nt.data):k.isCompressedArrayTexture?x.compressedTexSubImage3D(Bt,ce,tt,ft,Gt,ye,Ue,De,At,Nt.data):x.texSubImage3D(Bt,ce,tt,ft,Gt,ye,Ue,De,At,Ye,Nt):w.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,ce,tt,ft,ye,Ue,At,Ye,Nt.data):w.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,ce,tt,ft,Nt.width,Nt.height,At,Nt.data):x.texSubImage2D(x.TEXTURE_2D,ce,tt,ft,ye,Ue,At,Ye,Nt);x.pixelStorei(x.UNPACK_ROW_LENGTH,_t),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,ii),x.pixelStorei(x.UNPACK_SKIP_PIXELS,ao),x.pixelStorei(x.UNPACK_SKIP_ROWS,ri),x.pixelStorei(x.UNPACK_SKIP_IMAGES,Sa),ce===0&&k.generateMipmaps&&x.generateMipmap(Bt),P.unbindTexture()},this.initRenderTarget=function(w){J.get(w).__webglFramebuffer===void 0&&re.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?re.setTextureCube(w,0):w.isData3DTexture?re.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?re.setTexture2DArray(w,0):re.setTexture2D(w,0),P.unbindTexture()},this.resetState=function(){C=0,R=0,D=null,P.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return or}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}function d_(i,e){if(e===_b)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ed||e===Jv){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Ed)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class YC extends xa{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ZC(t)}),this.register(function(t){return new JC(t)}),this.register(function(t){return new aP(t)}),this.register(function(t){return new lP(t)}),this.register(function(t){return new cP(t)}),this.register(function(t){return new eP(t)}),this.register(function(t){return new tP(t)}),this.register(function(t){return new nP(t)}),this.register(function(t){return new iP(t)}),this.register(function(t){return new $C(t)}),this.register(function(t){return new rP(t)}),this.register(function(t){return new QC(t)}),this.register(function(t){return new oP(t)}),this.register(function(t){return new sP(t)}),this.register(function(t){return new KC(t)}),this.register(function(t){return new uP(t)}),this.register(function(t){return new fP(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ml.extractUrlBase(e);o=ml.resolveURL(c,this.path)}else o=ml.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new vx(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===bx){try{o[dt.KHR_BINARY_GLTF]=new hP(e)}catch(f){r&&r(f);return}s=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new EP(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case dt.KHR_MATERIALS_UNLIT:o[f]=new jC;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[f]=new dP(s,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[f]=new pP;break;case dt.KHR_MESH_QUANTIZATION:o[f]=new mP;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function qC(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class KC{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new je(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wn);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Lo(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new KE(u),c.distance=f;break;case"spot":c=new YE(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ji(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class jC{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return ls}extendParams(e,t,n){const r=[];e.color=new je(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Wn),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,hn))}return Promise.all(r)}}class $C{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class ZC{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ze(a,a)}return Promise.all(s)}}class JC{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class QC{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class eP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new je(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Wn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,hn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class tP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class nP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new je().setRGB(a[0],a[1],a[2],Wn),Promise.all(s)}}class iP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class rP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new je().setRGB(a[0],a[1],a[2],Wn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,hn)),Promise.all(s)}}class sP{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class oP{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class aP{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class lP{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class cP{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class uP{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=r.byteOffset||0,c=r.byteLength||0,u=r.count,f=r.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,r.mode,r.filter),d})})}else return null}}class fP{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const c of r.primitives)if(c.mode!==wi.TRIANGLES&&c.mode!==wi.TRIANGLE_STRIP&&c.mode!==wi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),f=u.isGroup?u.children:[u],h=c[0].count,d=[];for(const g of f){const _=new ot,m=new H,p=new ys,b=new H(1,1,1),S=new ME(g.geometry,g.material,h);for(let v=0;v<h;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),S.setMatrixAt(v,_.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const E=l[v];S.instanceColor=new Ad(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);Vt.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),d.push(S)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const bx="glTF",Na=12,p_={JSON:1313821514,BIN:5130562};class hP{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Na),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==bx)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-Na,s=new DataView(e,Na);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===p_.JSON){const c=new Uint8Array(e,Na+o,a);this.content=n.decode(c)}else if(l===p_.BIN){const c=Na+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class dP{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const f=Pd[u]||u.toLowerCase();a[f]=o[u]}for(const u in e.attributes){const f=Pd[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],d=Ko[h.componentType];c[f]=d.name,l[f]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){r.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}f(d)},a,c,Wn,h)})})}}class pP{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class mP{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Ex extends Gl{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=r-t,f=(n-t)/u,h=f*f,d=h*f,g=e*c,_=g-c,m=-2*d+3*h,p=d-h,b=1-m,S=p-h+f;for(let v=0;v!==a;v++){const E=o[_+v+a],C=o[_+v+l]*u,R=o[g+v+a],D=o[g+v]*u;s[v]=b*E+S*C+m*R+p*D}return s}}const gP=new ys;class _P extends Ex{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return gP.fromArray(s).normalize().toArray(s),s}}const wi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ko={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},m_={9728:Hn,9729:_i,9984:Wv,9985:qc,9986:Wa,9987:Dr},g_={33071:as,33648:vu,10497:la},Qf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$r={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},vP={CUBICSPLINE:void 0,LINEAR:Ol,STEP:Nl},eh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xP(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Fp({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hr})),i.DefaultMaterial}function Ls(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ji(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yP(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const f=e[c];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(r=!0),f.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];if(n){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(h)}if(r){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],f=c[1],h=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=f),s&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function SP(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function MP(i){let e;const t=i.extensions&&i.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+th(t.attributes):e=i.indices+":"+th(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+th(i.targets[n]);return e}function th(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Dd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function TP(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const bP=new ot;class EP{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new qC,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new WE(this.options.manager):this.textureLoader=new ZE(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new vx(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Ls(s,a,r),ji(a,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(ml.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=Qf[r.type],a=Ko[r.componentType],l=r.normalized===!0,c=new a(r.count*o);return Promise.resolve(new Vn(c,o,l))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Qf[r.type],c=Ko[r.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,h=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let _,m;if(d&&d!==f){const p=Math.floor(h/d),b="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let S=t.cache.get(b);S||(_=new c(a,p*d,r.count*d/u),S=new _E(_,d/u),t.cache.add(b,S)),m=new Ip(S,l,h%d/u,g)}else a===null?_=new c(r.count*l):_=new c(a,h,r.count*l),m=new Vn(_,l,g);if(r.sparse!==void 0){const p=Qf.SCALAR,b=Ko[r.sparse.indices.componentType],S=r.sparse.indices.byteOffset||0,v=r.sparse.values.byteOffset||0,E=new b(o[1],S,r.sparse.count*p),C=new c(o[2],v,r.sparse.count*l);a!==null&&(m=new Vn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,D=E.length;R<D;R++){const T=E[R];if(m.setX(T,C[R*l]),l>=2&&m.setY(T,C[R*l+1]),l>=3&&m.setZ(T,C[R*l+2]),l>=4&&m.setW(T,C[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=m_[h.magFilter]||_i,u.minFilter=m_[h.minFilter]||Dr,u.wrapS=g_[h.wrapS]||la,u.wrapT=g_[h.wrapT]||la,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Hn&&u.minFilter!==_i,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=r.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){c=!0;const h=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(f){return new Promise(function(h,d){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new cn(_);m.needsUpdate=!0,h(m)}),t.load(ml.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return c===!0&&a.revokeObjectURL(l),ji(f,o),f.userData.mimeType=o.mimeType||TP(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[dt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new dx,ur.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new hx,ur.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Fp}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const f=r[dt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),c.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new je(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Wn),a.opacity=h[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",f.baseColorTexture,hn)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=nr);const u=s.alphaMode||eh.OPAQUE;if(u===eh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===eh.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ls&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ze(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==ls&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ls){const f=s.emissiveFactor;a.emissive=new je().setRGB(f[0],f[1],f[2],Wn)}return s.emissiveTexture!==void 0&&o!==ls&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,hn)),Promise.all(c).then(function(){const f=new o(a);return s.name&&(f.name=s.name),ji(f,s),t.associations.set(f,{materials:e}),s.extensions&&Ls(r,f,s),f})}createUniqueName(e){const t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return __(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=MP(c),f=r[u];if(f)o.push(f.promise);else{let h;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=__(new Xi,c,t),r[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?xP(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=o[d];let p;const b=c[d];if(m.mode===wi.TRIANGLES||m.mode===wi.TRIANGLE_STRIP||m.mode===wi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new xE(_,b):new Kn(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===wi.TRIANGLE_STRIP?p.geometry=d_(p.geometry,Jv):m.mode===wi.TRIANGLE_FAN&&(p.geometry=d_(p.geometry,Ed));else if(m.mode===wi.LINES)p=new wE(_,b);else if(m.mode===wi.LINE_STRIP)p=new Op(_,b);else if(m.mode===wi.LINE_LOOP)p=new AE(_,b);else if(m.mode===wi.POINTS)p=new RE(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&SP(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),ji(p,s),m.extensions&&Ls(r,p,m),t.assignFinalMaterial(p),f.push(p)}for(let d=0,g=f.length;d<g;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return s.extensions&&Ls(r,f[0],s),f[0];const h=new Gs;s.extensions&&Ls(r,h,s),t.associations.set(h,{meshes:e});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nn(Wb.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Gu(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ji(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const f=o[c];if(f){a.push(f);const h=new ot;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Up(a,l)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let f=0,h=r.channels.length;f<h;f++){const d=r.channels[f],g=r.samplers[d.sampler],_=d.target,m=_.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,b=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],m=f[4],p=[];for(let S=0,v=h.length;S<v;S++){const E=h[S],C=d[S],R=g[S],D=_[S],T=m[S];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const M=n._createAnimationTracks(E,C,R,D,T);if(M)for(let I=0;I<M.length;I++)p.push(M[I])}const b=new FE(s,void 0,p);return ji(b,r),b})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=r.weights.length;l<c;l++)a.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],f=c[1],h=c[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,bP)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new ux:c.length>1?u=new Gs:c.length===1?u=c[0]:u=new Vt,u!==c[0])for(let f=0,h=c.length;f<h;f++)u.add(c[f]);if(s.name&&(u.userData.name=s.name,u.name=o),ji(u,s),s.extensions&&Ls(n,u,s),s.matrix!==void 0){const f=new ot;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){const f=r.associations.get(u);r.associations.set(u,{...f})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new Gs;n.name&&(s.name=r.createUniqueName(n.name)),ji(s,n),n.extensions&&Ls(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(r.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,f=l.length;u<f;u++)s.add(l[u]);const c=u=>{const f=new Map;for(const[h,d]of r.associations)(h instanceof ur||h instanceof cn)&&f.set(h,d);return u.traverse(h=>{const d=r.associations.get(h);d!=null&&f.set(h,d)}),f};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,l=[];$r[s.path]===$r.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch($r[s.path]){case $r.weights:c=fa;break;case $r.rotation:c=ha;break;case $r.translation:case $r.scale:c=da;break;default:switch(n.itemSize){case 1:c=fa;break;case 2:case 3:default:c=da;break}break}const u=r.interpolation!==void 0?vP[r.interpolation]:Ol,f=this._getArrayFromAccessor(n);for(let h=0,d=l.length;h<d;h++){const g=new c(l[h]+"."+$r[s.path],t.array,f,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Dd(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof ha?_P:Ex;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function wP(i,e,t){const n=e.attributes,r=new Gr;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(r.set(new H(l[0],l[1],l[2]),new H(c[0],c[1],c[2])),a.normalized){const u=Dd(Ko[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new H,l=new H;for(let c=0,u=s.length;c<u;c++){const f=s[c];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=Dd(Ko[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new mr;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function __(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=Pd[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return mt.workingColorSpace!==Wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),ji(i,e),wP(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?yP(i,e.targets,t):i})}const Qc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Wl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const AP=new Gu(-1,1,1,-1,0,1);class RP extends Xi{constructor(){super(),this.setAttribute("position",new Wi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wi([0,2,0,0,2,0],2))}}const CP=new RP;class wx{constructor(e){this._mesh=new Kn(CP,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,AP)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class PP extends Wl{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof jn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Su.clone(e.uniforms),this.material=new jn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new wx(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class v_ extends Wl{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class DP extends Wl{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class LP{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ze);this._width=n.width,this._height=n.height,t=new Gi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Nr}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new PP(Qc),this.copyPass.material.blending=Ur,this.clock=new QE}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}v_!==void 0&&(o instanceof v_?n=!0:o instanceof DP&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ze);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class IP extends Wl{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,t,n){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const UP={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class pa extends Wl{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new Ze(e.x,e.y):new Ze(256,256),this.clearColor=new je(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Gi(s,o,{type:Nr}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Gi(s,o,{type:Nr});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new Gi(s,o,{type:Nr});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),o=Math.round(o/2)}const a=UP;this.highPassUniforms=Su.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new jn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Ze(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Su.clone(Qc.uniforms),this.blendMaterial=new jn({uniforms:this.copyUniforms,vertexShader:Qc.vertexShader,fragmentShader:Qc.fragmentShader,blending:kh,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new je,this._oldClearAlpha=1,this._basic=new ls,this._fsQuad=new wx(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Ze(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=pa.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=pa.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new jn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ze(.5,.5)},direction:{value:new Ze(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new jn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}pa.BlurDirectionX=new Ze(1,0);pa.BlurDirectionY=new Ze(0,1);const NP={id:"container3D",class:"fixed h-screen w-screen inset-0 z-50 pointer-events-none"},OP={__name:"Model_3d",setup(i){return so(()=>{const e=new Nn(20,window.innerWidth/window.innerHeight,.1,1e3);e.position.set(0,0,24);const t=new gE;t.position.set(0,0,0),t.scale.set(.8,.8,.8);let n;const r=new $E(16777215,1.5);t.add(r);const s=new Lo(16777215,1.6);s.position.set(50,50,50),t.add(s);const o=new Lo(16777215,10);o.position.set(10,0,-10),t.add(o);const a=new Lo(16777215,10);a.position.set(-10,0,-10),t.add(a);const l=new Lo(16777215,.5);l.position.set(0,50,-50),t.add(l);const c=new Lo(16777215,1);c.position.set(0,0,10),t.add(c),new YC().load("src/assets/iPhone_model.glb",function(m){n=m.scene,n.position.set(0,-2,0);var p=0,b=180,S=0;n.rotation.set(p/180*Math.PI,b/180*Math.PI,S/180*Math.PI),t.add(n)},function(m){console.log(m.loaded/m.total*100+"% loaded")},function(m){console.log("Error :"+m)});const f=new XC({antialias:!0,alpha:!0});f.setSize(window.innerWidth,window.innerHeight),f.setPixelRatio(window.devicePixelRatio),f.toneMapping=Vv,f.toneMappingExposure=.7,f.outputEncoding=void 0,f.shadowMap.enabled=!0,f.shadowMap.type=Tp;const h=new LP(f),d=new IP(t,e);h.addPass(d);const g=new pa(new Ze(window.innerWidth,window.innerHeight),.08,.4,1.5);h.addPass(g),document.getElementById("container3D").appendChild(f.domElement);const _=function(){requestAnimationFrame(_),f.render(t,e)};_(),window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight),h.setSize(window.innerWidth,window.innerHeight)}),window.addEventListener("model-section-change",m=>{if(!n)return;const{position:p,rotation:b,camera:S}=m.detail;console.log("Model/Camera Change Event:",m.detail),kn.to(n.position,{...p,duration:1}),kn.to(n.rotation,{x:b.x/180*Math.PI,y:b.y/180*Math.PI,z:b.z/180*Math.PI,duration:1}),kn.to(e.position,{...S,duration:1}),kn.to(e,{fov:S.mm,duration:1,onUpdate:()=>e.updateProjectionMatrix()})})}),(e,t)=>(_s(),vs("section",NP))}},FP="/Apple-Site-Design/assets/Deep_Blue-dyJzaW91.png",BP="/Apple-Site-Design/assets/Silver-CcHejjh0.png",kP="/Apple-Site-Design/assets/_CITYPNG.COM_Orange%20iPhone%2017%20Pro%20in%20Back%20View%20-%204000x4000-PgnfmmVQ.png",zP={data(){return{circleLeft:0,isVisible:!1,ticking:!1}},mounted(){window.addEventListener("scroll",this.onScroll,{passive:!0}),this.onScroll()},beforeDestroy(){window.removeEventListener("scroll",this.onScroll)},methods:{onScroll(){this.ticking||(window.requestAnimationFrame(()=>{const i=window.scrollY||window.pageYOffset,e=document.documentElement.scrollHeight-window.innerHeight;let t=e>0?i/e:0;t=Math.max(0,Math.min(1,t)),this.circleLeft=t*90,this.isVisible=t>.01,this.ticking=!1}),this.ticking=!0)}}};function HP(i,e,t,n,r,s){return _s(),vs("div",{id:"scroll-progress-bar",class:Cu(["fixed left-1/2 bottom-2 -translate-x-1/2 w-[90vw] max-w-[900px] h-6 pointer-events-none opacity-0 transition-opacity duration-400 ease-[cubic-bezier(.4,0,.2,1)] z-[1000] flex items-center justify-center",r.isVisible?"opacity-100":""])},[e[0]||(e[0]=yl("div",{class:"bar absolute left-0 right-0 top-1/2 h-0.5 bg-white rounded w-full -translate-y-1/2 shadow-[0_0_8px_0_rgba(255,255,255,0.08)]"},null,-1)),yl("div",{class:"circle absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_16px_4px_rgba(255,255,255,0.4),0_2px_8px_0_rgba(0,0,0,0.12)] -translate-y-1/2 transition-[left] duration-250 ease-[cubic-bezier(.4,0,.2,1)]",style:Ru({left:r.circleLeft+"%"})},null,4)],2)}const VP=kT(zP,[["render",HP],["__scopeId","data-v-e347f0fe"]]),GP={class:"design-body-section mt-[1000px] p-10 my-20 h-screen overflow-hidden"},WP={__name:"Design-Body-Section",setup(i){return kn.registerPlugin(Je),so(()=>{const e=kn.timeline();e.to("#main_area_design_body",{width:"100%",scrollTrigger:{id:"main_area",trigger:".design-body-section",start:"top 0%",end:"bottom -100%",scrub:1.6,pin:!0,onEnter:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-8,y:0,z:0},rotation:{x:-30,y:540,z:10},camera:{x:0,y:0,z:30,mm:20}}}))},onEnterBack:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-8,y:0,z:0},rotation:{x:-30,y:540,z:10},camera:{x:0,y:0,z:30,mm:20}}}))}},duration:1.2,ease:"Power1.easeInOut"}),e.from("#right-body",{x:100,opacity:0,duration:.8,ease:"Power1.easeInOut",scrollTrigger:{id:"right-camera",trigger:".design-body-section",start:"top 100%",end:"bottom 60%",scrub:1}})}),(e,t)=>(_s(),vs("section",GP,[...t[0]||(t[0]=[Uu('<div class="section bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden" id="main_area_design_body"><div class="flex w-full h-auto items-center justify-center" id="body-content"><div class="left w-1/3 h-auto p-10"><div class="box bg-black rounded-2xl h-full w-full"></div></div><div class="right w-2/3 h-fit border-stone-200 border-s-2 font-mono py-7 overflow-hidden" id="right-body"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"> Titanium Body </h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Built with <span class="text-stone-800 font-semibold">Aerospace-grade</span> titanium </h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="p-6 px-9"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Material :</span> Titanium </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Durability :</span> Precision-milled unibody with enhanced structural rigidity </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Finish :</span> Ultra-fine matte micro-texture for superior grip and reduced fingerprints </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Thermal :</span> Internal vapor chamber for efficient heat dissipation </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Colors :</span> Cosmic Orange, Deep Blue ,Silver </li></ul><div class="flex items-center w-full h-[120px] gap-6 ps-9 mb-9"><div class="box object-cover w-[160px] h-full p-2 border-2 border-slate-300 rounded-xl flex flex-col items-center justify-start bg-slate-200 hover:border-slate-500 transition duration-300"><img src="'+FP+'" alt="" class="h-full w-full object-contain"><p class="text-stone-700 font-mono mt-3">Deep Blue</p></div><div class="box object-cover w-[160px] h-full p-2 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-start bg-gray-100 hover:border-gray-500 transition duration-300"><img src="'+BP+'" alt="" class="h-full w-full object-contain"><p class="text-gray-500 font-mono mt-3">Silver</p></div><div class="box object-cover w-[160px] h-full p-2 border-2 border-orange-200 rounded-xl flex flex-col items-center justify-start bg-orange-100 hover:border-orange-500 transition duration-300"><img src="'+kP+'" alt="" class="h-full w-full object-contain"><p class="text-orange-700 font-mono mt-3">Cosmic Orange</p></div></div></div></div></div>',1)])]))}},XP={class:"design-camera-section p-10 h-screen overflow-hidden"},YP={__name:"Design-Camera-Section",setup(i){return kn.registerPlugin(Je),so(()=>{const e=kn.timeline();e.to("#main_area_design_camera",{ease:"power2.inOut",duration:1.5,scrollTrigger:{id:"main_area-camera",trigger:".design-camera-section",start:"top 0%",end:"bottom -100%",scrub:1.6,pin:!0,onEnter:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-8.4,y:0,z:0},rotation:{x:0,y:180,z:90},camera:{x:0,y:0,z:9,mm:48}}}))},onEnterBack:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-8.4,y:0,z:0},rotation:{x:0,y:180,z:90},camera:{x:0,y:0,z:9,mm:48}}}))}}}),e.from("#right-camera",{x:100,opacity:0,duration:.8,ease:"Power1.easeInOut",scrollTrigger:{id:"right-camera",trigger:".design-camera-section",start:"top 100%",end:"bottom 60%",scrub:1}})}),(e,t)=>(_s(),vs("section",XP,[...t[0]||(t[0]=[Uu('<div class="bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden" id="main_area_design_camera"><div class="flex w-full h-auto items-center justify-center"><div class="left w-1/3 h-auto p-10"><div class="box bg-black rounded-2xl h-full w-full"></div></div><div class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7" id="right-camera"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"> Camera </h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Crafted from <span class="text-stone-800 font-semibold">Precision.</span> Perfected in every detail </h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="p-6 px-9 gap-8"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Triple-Lens System :</span> 48MP Main, 48MP Wide and 48MP Telephoto lens. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Lens Coating :</span> Nano-matte sapphire lens cover reduces glare and reflection. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Lens Alignment :</span> Perfectly leveled lens placement ensures consistent depth and shadow response under all lighting angles. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Material Contrast :</span> The brushed titanium ring around the camera creates a fine contrast against the matte body surface. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Thermal Optimization :</span> Hidden micro-vents around the housing maintain temperature stability during extended 4K recording. </li></ul><div class="flex justify-end"><button class="bg-stone-100 ps-6 font-semibold rounded-full flex items-center gap-4 hover:scale-[102%] transition-all duration-300 me-9"> Know More about Camera Specs <span class="p-2 rounded-full bg-stone-200"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg></span></button></div></div></div></div>',1)])]))}},qP={class:"design-edge-section p-10 h-screen mb-[1000px] overflow-hidden"},KP={__name:"Design-Ports-Section",setup(i){return kn.registerPlugin(Je),so(()=>{const e=kn.timeline();e.to("#main_area_design_edge",{ease:"power2.inOut",duration:1.5,scrollTrigger:{id:"main_area-edge",trigger:".design-edge-section",start:"top 0%",end:"bottom -100%",scrub:1.6,pin:!0,onEnter:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-7,y:1,z:0},rotation:{x:-56,y:-135,z:0},camera:{x:0,y:0,z:15,mm:36}}}))},onEnterBack:()=>{window.dispatchEvent(new CustomEvent("model-section-change",{detail:{position:{x:-7,y:1,z:0},rotation:{x:-56,y:-135,z:0},camera:{x:0,y:0,z:15,mm:36}}}))}}}),e.from("#right-edge",{x:100,opacity:0,duration:.8,ease:"Power1.easeInOut",scrollTrigger:{id:"right-edge",trigger:".design-edge-section",start:"top 100%",end:"bottom 60%",scrub:1}}),e.to("#main_area_design_edge",{scale:1.2,duration:.8,scrollTrigger:{id:"fade-edge",trigger:".design-edge-section",start:"top -100%",end:"bottom 50%",scrub:1.2,pin:!0}})}),(e,t)=>(_s(),vs("section",qP,[...t[0]||(t[0]=[Uu('<div class="bg-white w-full mx-auto rounded-[2em] h-full overflow-hidden" id="main_area_design_edge"><div class="flex w-full h-auto items-center justify-center"><div class="left w-1/3 h-auto p-10"><div class="box bg-black rounded-2xl h-full w-full"></div></div><div class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7" id="right-edge"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase"> Edge &amp; Connectivity </h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Sculpted edges. Seamless connections. </h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="pt-6 px-9 gap-8"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Edges :</span> Precision-beveled chamfer with matte micro-finish for tactile grip and refined reflections. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Ports :</span> Universal USB-C with fast PD charging and high-speed data transfer; sealed port gasket for improved ingress protection. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Wireless :</span> MagSafe-compatible magnetic charging, Qi wireless, and rapid reverse wireless charging. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Connectivity :</span> Wi‑Fi 6E, Bluetooth 5.4, Ultra Wideband (UWB) and dual eSIM + physical SIM support. </li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Sealing :</span> Precision gasket and micro-louver drainage delivering IP68 water and dust resistance. </li></ul></div></div></div>',1)])]))}},jP={class:"section h-screen w-screen"},$P={__name:"CameraSection",setup(i){return kn.registerPlugin(Je),so(()=>{kn.timeline()}),(e,t)=>(_s(),vs("section",jP,[...t[0]||(t[0]=[yl("div",{class:"bg-white h-full w-full",id:"camera-section"},"Hello",-1)])]))}},ZP={__name:"App",setup(i){return(e,t)=>(_s(),vs(Ji,null,[In(BT),In(WP),In(YP),In(KP),In($P),In(OP),In(VP)],64))}};function Ax(i,e,t){return Math.max(i,Math.min(e,t))}class JP{advance(e){if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(n=this.value,r=this.to,s=60*this.lerp,o=e,(function(a,l,c){return(1-c)*a+c*l})(n,r,1-Math.exp(-s*o))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const a=Ax(0,this.currentTime/this.duration,1);t=a>=1;const l=t?1:this.easing(a);this.value=this.from+(this.to-this.from)*l}var n,r,s,o;this.onUpdate?.(this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n=.1,duration:r=1,easing:s=(l=>l),onStart:o,onUpdate:a}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=s,this.currentTime=0,this.isRunning=!0,o?.(),this.onUpdate=a}}class QP{constructor({wrapper:e,content:t,autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=(function(s,o){let a;return function(){let l=arguments,c=this;clearTimeout(a),a=setTimeout((function(){s.apply(c,l)}),o)}})(this.resize,r),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Rx{constructor(){this.events={}}emit(e,...t){let n=this.events[e]||[];for(let r=0,s=n.length;r<s;r++)n[r](...t)}on(e,t){return this.events[e]?.push(t)||(this.events[e]=[t]),()=>{this.events[e]=this.events[e]?.filter((n=>t!==n))}}off(e,t){this.events[e]=this.events[e]?.filter((n=>t!==n))}destroy(){this.events={}}}const x_=100/6;class eD{constructor(e,{wheelMultiplier:t=1,touchMultiplier:n=1}){this.element=e,this.wheelMultiplier=t,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new Rx,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.touchMultiplier,s=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:s},this.emitter.emit("scroll",{deltaX:r,deltaY:s,event:e})};onTouchEnd=e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e;t*=r===1?x_:r===2?this.windowWidth:1,n*=r===1?x_:r===2?this.windowHeight:1,t*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}class tD{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:n=e,eventsTarget:r=n,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:a=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=(S=>Math.min(1,1.001-Math.pow(2,-10*S))),lerp:f=!c&&.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:m=1,autoResize:p=!0,__experimental__naiveDimensions:b=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:S,deltaY:v,event:E})=>{if(E.ctrlKey)return;const C=E.type.includes("touch"),R=E.type.includes("wheel");if(this.options.syncTouch&&C&&E.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const D=S===0&&v===0,T=this.options.gestureOrientation==="vertical"&&v===0||this.options.gestureOrientation==="horizontal"&&S===0;if(D||T)return;let M=E.composedPath();if(M=M.slice(0,M.indexOf(this.rootElement)),M.find(($=>{var j,W,V,B,ae;return((j=$.hasAttribute)===null||j===void 0?void 0:j.call($,"data-lenis-prevent"))||C&&((W=$.hasAttribute)===null||W===void 0?void 0:W.call($,"data-lenis-prevent-touch"))||R&&((V=$.hasAttribute)===null||V===void 0?void 0:V.call($,"data-lenis-prevent-wheel"))||((B=$.classList)===null||B===void 0?void 0:B.contains("lenis"))&&!(!((ae=$.classList)===null||ae===void 0)&&ae.contains("lenis-stopped"))})))return;if(this.isStopped||this.isLocked)return void E.preventDefault();if(this.isSmooth=this.options.syncTouch&&C||this.options.smoothWheel&&R,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();E.preventDefault();let I=v;this.options.gestureOrientation==="both"?I=Math.abs(v)>Math.abs(S)?v:S:this.options.gestureOrientation==="horizontal"&&(I=S);const F=C&&this.options.syncTouch,Y=C&&E.type==="touchend"&&Math.abs(I)>5;Y&&(I=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+I,Object.assign({programmatic:!1},F?{lerp:Y?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const S=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-S),this.emit()}},window.lenisVersion="1.0.42",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:n,eventsTarget:r,smoothWheel:s,syncTouch:o,syncTouchLerp:a,touchInertiaMultiplier:l,duration:c,easing:u,lerp:f,infinite:h,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:m,autoResize:p,__experimental__naiveDimensions:b},this.animate=new JP,this.emitter=new Rx,this.dimensions=new QP({wrapper:e,content:t,autoResize:p}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=o||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new eD(r,{touchMultiplier:_,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:n=!1,lock:r=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:l,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let f;if(typeof e=="string"?f=document.querySelector(e):e?.nodeType&&(f=e),f){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?d.left:d.top}const h=f.getBoundingClientRect();e=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):e=Ax(0,e,this.limit),n)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null||l(this));if(!u){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:o,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,h)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l?.(this),this.__preventNextScrollEvent=!0,requestAnimationFrame((()=>{delete this.__preventNextScrollEvent})))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClassName("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClassName("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClassName("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClassName("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClassName(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}kn.registerPlugin(Je);const Cx=new tD({duration:2,easing:i=>i,smooth:!0,smoothTouch:!0,lerp:.06});function Px(i){Cx.raf(i),requestAnimationFrame(Px)}requestAnimationFrame(Px);Cx.on("scroll",Je.update);eM(ZP).mount("#app");
