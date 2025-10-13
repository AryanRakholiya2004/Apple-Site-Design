(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Pd(i){const e=Object.create(null);for(const t of i.split(","))e[t]=1;return t=>t in e}const Lt={},Uo=[],ar=()=>{},v_=()=>!1,Tu=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Dd=i=>i.startsWith("onUpdate:"),Vn=Object.assign,Ld=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},Lx=Object.prototype.hasOwnProperty,yt=(i,e)=>Lx.call(i,e),st=Array.isArray,Ga=i=>bu(i)==="[object Map]",Ix=i=>bu(i)==="[object Set]",lt=i=>typeof i=="function",fn=i=>typeof i=="string",ha=i=>typeof i=="symbol",jt=i=>i!==null&&typeof i=="object",x_=i=>(jt(i)||lt(i))&&lt(i.then)&&lt(i.catch),Ux=Object.prototype.toString,bu=i=>Ux.call(i),Nx=i=>bu(i).slice(8,-1),Ox=i=>bu(i)==="[object Object]",Id=i=>fn(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Wa=Pd(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Eu=i=>{const e=Object.create(null);return(t=>e[t]||(e[t]=i(t)))},Fx=/-\w/g,ds=Eu(i=>i.replace(Fx,e=>e.slice(1).toUpperCase())),Bx=/\B([A-Z])/g,no=Eu(i=>i.replace(Bx,"-$1").toLowerCase()),y_=Eu(i=>i.charAt(0).toUpperCase()+i.slice(1)),Wu=Eu(i=>i?`on${y_(i)}`:""),Vs=(i,e)=>!Object.is(i,e),Xu=(i,...e)=>{for(let t=0;t<i.length;t++)i[t](...e)},S_=(i,e,t,n=!1)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,writable:n,value:t})},kx=i=>{const e=parseFloat(i);return isNaN(e)?i:e};let zp;const wu=()=>zp||(zp=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Au(i){if(st(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],r=fn(n)?Gx(n):Au(n);if(r)for(const s in r)e[s]=r[s]}return e}else if(fn(i)||jt(i))return i}const zx=/;(?![^(]*\))/g,Hx=/:([^]+)/,Vx=/\/\*[^]*?\*\//g;function Gx(i){const e={};return i.replace(Vx,"").split(zx).forEach(t=>{if(t){const n=t.split(Hx);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Ru(i){let e="";if(fn(i))e=i;else if(st(i))for(let t=0;t<i.length;t++){const n=Ru(i[t]);n&&(e+=n+" ")}else if(jt(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}const Wx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Xx=Pd(Wx);function M_(i){return!!i||i===""}/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Xn;class Yx{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Xn,!e&&Xn&&(this.index=(Xn.scopes||(Xn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Xn;try{return Xn=this,e()}finally{Xn=t}}}on(){++this._on===1&&(this.prevScope=Xn,Xn=this)}off(){this._on>0&&--this._on===0&&(Xn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function qx(){return Xn}let Dt;const Yu=new WeakSet;class T_{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Xn&&Xn.active&&Xn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Yu.has(this)&&(Yu.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||E_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Hp(this),w_(this);const e=Dt,t=Hi;Dt=this,Hi=!0;try{return this.fn()}finally{A_(this),Dt=e,Hi=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Od(e);this.deps=this.depsTail=void 0,Hp(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Yu.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){eh(this)&&this.run()}get dirty(){return eh(this)}}let b_=0,Xa,Ya;function E_(i,e=!1){if(i.flags|=8,e){i.next=Ya,Ya=i;return}i.next=Xa,Xa=i}function Ud(){b_++}function Nd(){if(--b_>0)return;if(Ya){let e=Ya;for(Ya=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let i;for(;Xa;){let e=Xa;for(Xa=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(n){i||(i=n)}e=t}}if(i)throw i}function w_(i){for(let e=i.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function A_(i){let e,t=i.depsTail,n=t;for(;n;){const r=n.prevDep;n.version===-1?(n===t&&(t=r),Od(n),Kx(n)):e=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=r}i.deps=e,i.depsTail=t}function eh(i){for(let e=i.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(R_(e.dep.computed)||e.dep.version!==e.version))return!0;return!!i._dirty}function R_(i){if(i.flags&4&&!(i.flags&16)||(i.flags&=-17,i.globalVersion===dl)||(i.globalVersion=dl,!i.isSSR&&i.flags&128&&(!i.deps&&!i._dirty||!eh(i))))return;i.flags|=2;const e=i.dep,t=Dt,n=Hi;Dt=i,Hi=!0;try{w_(i);const r=i.fn(i._value);(e.version===0||Vs(r,i._value))&&(i.flags|=128,i._value=r,e.version++)}catch(r){throw e.version++,r}finally{Dt=t,Hi=n,A_(i),i.flags&=-3}}function Od(i,e=!1){const{dep:t,prevSub:n,nextSub:r}=i;if(n&&(n.nextSub=r,i.prevSub=void 0),r&&(r.prevSub=n,i.nextSub=void 0),t.subs===i&&(t.subs=n,!n&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Od(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Kx(i){const{prevDep:e,nextDep:t}=i;e&&(e.nextDep=t,i.prevDep=void 0),t&&(t.prevDep=e,i.nextDep=void 0)}let Hi=!0;const C_=[];function Fr(){C_.push(Hi),Hi=!1}function Br(){const i=C_.pop();Hi=i===void 0?!0:i}function Hp(i){const{cleanup:e}=i;if(i.cleanup=void 0,e){const t=Dt;Dt=void 0;try{e()}finally{Dt=t}}}let dl=0;class jx{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class P_{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Dt||!Hi||Dt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Dt)t=this.activeLink=new jx(Dt,this),Dt.deps?(t.prevDep=Dt.depsTail,Dt.depsTail.nextDep=t,Dt.depsTail=t):Dt.deps=Dt.depsTail=t,D_(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const n=t.nextDep;n.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=n),t.prevDep=Dt.depsTail,t.nextDep=void 0,Dt.depsTail.nextDep=t,Dt.depsTail=t,Dt.deps===t&&(Dt.deps=n)}return t}trigger(e){this.version++,dl++,this.notify(e)}notify(e){Ud();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Nd()}}}function D_(i){if(i.dep.sc++,i.sub.flags&4){const e=i.dep.computed;if(e&&!i.dep.subs){e.flags|=20;for(let n=e.deps;n;n=n.nextDep)D_(n)}const t=i.dep.subs;t!==i&&(i.prevSub=t,t&&(t.nextSub=i)),i.dep.subs=i}}const th=new WeakMap,Gs=Symbol(""),nh=Symbol(""),pl=Symbol("");function yn(i,e,t){if(Hi&&Dt){let n=th.get(i);n||th.set(i,n=new Map);let r=n.get(t);r||(n.set(t,r=new P_),r.map=n,r.key=t),r.track()}}function Rr(i,e,t,n,r,s){const o=th.get(i);if(!o){dl++;return}const a=l=>{l&&l.trigger()};if(Ud(),e==="clear")o.forEach(a);else{const l=st(i),c=l&&Id(t);if(l&&t==="length"){const u=Number(n);o.forEach((f,h)=>{(h==="length"||h===pl||!ha(h)&&h>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(pl)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Gs)),Ga(i)&&a(o.get(nh)));break;case"delete":l||(a(o.get(Gs)),Ga(i)&&a(o.get(nh)));break;case"set":Ga(i)&&a(o.get(Gs));break}}Nd()}function so(i){const e=Et(i);return e===i?e:(yn(e,"iterate",pl),lr(i)?e:e.map(ui))}function Fd(i){return yn(i=Et(i),"iterate",pl),i}const $x={__proto__:null,[Symbol.iterator](){return qu(this,Symbol.iterator,ui)},concat(...i){return so(this).concat(...i.map(e=>st(e)?so(e):e))},entries(){return qu(this,"entries",i=>(i[1]=ui(i[1]),i))},every(i,e){return _r(this,"every",i,e,void 0,arguments)},filter(i,e){return _r(this,"filter",i,e,t=>t.map(ui),arguments)},find(i,e){return _r(this,"find",i,e,ui,arguments)},findIndex(i,e){return _r(this,"findIndex",i,e,void 0,arguments)},findLast(i,e){return _r(this,"findLast",i,e,ui,arguments)},findLastIndex(i,e){return _r(this,"findLastIndex",i,e,void 0,arguments)},forEach(i,e){return _r(this,"forEach",i,e,void 0,arguments)},includes(...i){return Ku(this,"includes",i)},indexOf(...i){return Ku(this,"indexOf",i)},join(i){return so(this).join(i)},lastIndexOf(...i){return Ku(this,"lastIndexOf",i)},map(i,e){return _r(this,"map",i,e,void 0,arguments)},pop(){return xa(this,"pop")},push(...i){return xa(this,"push",i)},reduce(i,...e){return Vp(this,"reduce",i,e)},reduceRight(i,...e){return Vp(this,"reduceRight",i,e)},shift(){return xa(this,"shift")},some(i,e){return _r(this,"some",i,e,void 0,arguments)},splice(...i){return xa(this,"splice",i)},toReversed(){return so(this).toReversed()},toSorted(i){return so(this).toSorted(i)},toSpliced(...i){return so(this).toSpliced(...i)},unshift(...i){return xa(this,"unshift",i)},values(){return qu(this,"values",ui)}};function qu(i,e,t){const n=Fd(i),r=n[e]();return n!==i&&!lr(i)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Zx=Array.prototype;function _r(i,e,t,n,r,s){const o=Fd(i),a=o!==i&&!lr(i),l=o[e];if(l!==Zx[e]){const f=l.apply(i,s);return a?ui(f):f}let c=t;o!==i&&(a?c=function(f,h){return t.call(this,ui(f),h,i)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,i)}));const u=l.call(o,c,n);return a&&r?r(u):u}function Vp(i,e,t,n){const r=Fd(i);let s=t;return r!==i&&(lr(i)?t.length>3&&(s=function(o,a,l){return t.call(this,o,a,l,i)}):s=function(o,a,l){return t.call(this,o,ui(a),l,i)}),r[e](s,...n)}function Ku(i,e,t){const n=Et(i);yn(n,"iterate",pl);const r=n[e](...t);return(r===-1||r===!1)&&Hd(t[0])?(t[0]=Et(t[0]),n[e](...t)):r}function xa(i,e,t=[]){Fr(),Ud();const n=Et(i)[e].apply(i,t);return Nd(),Br(),n}const Jx=Pd("__proto__,__v_isRef,__isVue"),L_=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(ha));function Qx(i){ha(i)||(i=String(i));const e=Et(this);return yn(e,"has",i),e.hasOwnProperty(i)}class I_{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return n===(r?s?cy:F_:s?O_:N_).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=st(e);if(!r){let l;if(o&&(l=$x[t]))return l;if(t==="hasOwnProperty")return Qx}const a=Reflect.get(e,t,kn(e)?e:n);if((ha(t)?L_.has(t):Jx(t))||(r||yn(e,"get",t),s))return a;if(kn(a)){const l=o&&Id(t)?a:a.value;return r&&jt(l)?rh(l):l}return jt(a)?r?rh(a):kd(a):a}}class U_ extends I_{constructor(e=!1){super(!1,e)}set(e,t,n,r){let s=e[t];if(!this._isShallow){const l=Yo(s);if(!lr(n)&&!Yo(n)&&(s=Et(s),n=Et(n)),!st(e)&&kn(s)&&!kn(n))return l||(s.value=n),!0}const o=st(e)&&Id(t)?Number(t)<e.length:yt(e,t),a=Reflect.set(e,t,n,kn(e)?e:r);return e===Et(r)&&(o?Vs(n,s)&&Rr(e,"set",t,n):Rr(e,"add",t,n)),a}deleteProperty(e,t){const n=yt(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Rr(e,"delete",t,void 0),r}has(e,t){const n=Reflect.has(e,t);return(!ha(t)||!L_.has(t))&&yn(e,"has",t),n}ownKeys(e){return yn(e,"iterate",st(e)?"length":Gs),Reflect.ownKeys(e)}}class ey extends I_{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const ty=new U_,ny=new ey,iy=new U_(!0);const ih=i=>i,Gl=i=>Reflect.getPrototypeOf(i);function ry(i,e,t){return function(...n){const r=this.__v_raw,s=Et(r),o=Ga(s),a=i==="entries"||i===Symbol.iterator&&o,l=i==="keys"&&o,c=r[i](...n),u=t?ih:e?sh:ui;return!e&&yn(s,"iterate",l?nh:Gs),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Wl(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function sy(i,e){const t={get(r){const s=this.__v_raw,o=Et(s),a=Et(r);i||(Vs(r,a)&&yn(o,"get",r),yn(o,"get",a));const{has:l}=Gl(o),c=e?ih:i?sh:ui;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!i&&yn(Et(r),"iterate",Gs),r.size},has(r){const s=this.__v_raw,o=Et(s),a=Et(r);return i||(Vs(r,a)&&yn(o,"has",r),yn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=Et(a),c=e?ih:i?sh:ui;return!i&&yn(l,"iterate",Gs),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Vn(t,i?{add:Wl("add"),set:Wl("set"),delete:Wl("delete"),clear:Wl("clear")}:{add(r){!e&&!lr(r)&&!Yo(r)&&(r=Et(r));const s=Et(this);return Gl(s).has.call(s,r)||(s.add(r),Rr(s,"add",r,r)),this},set(r,s){!e&&!lr(s)&&!Yo(s)&&(s=Et(s));const o=Et(this),{has:a,get:l}=Gl(o);let c=a.call(o,r);c||(r=Et(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?Vs(s,u)&&Rr(o,"set",r,s):Rr(o,"add",r,s),this},delete(r){const s=Et(this),{has:o,get:a}=Gl(s);let l=o.call(s,r);l||(r=Et(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&Rr(s,"delete",r,void 0),c},clear(){const r=Et(this),s=r.size!==0,o=r.clear();return s&&Rr(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=ry(r,i,e)}),t}function Bd(i,e){const t=sy(i,e);return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(yt(t,r)&&r in n?t:n,r,s)}const oy={get:Bd(!1,!1)},ay={get:Bd(!1,!0)},ly={get:Bd(!0,!1)};const N_=new WeakMap,O_=new WeakMap,F_=new WeakMap,cy=new WeakMap;function uy(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function fy(i){return i.__v_skip||!Object.isExtensible(i)?0:uy(Nx(i))}function kd(i){return Yo(i)?i:zd(i,!1,ty,oy,N_)}function hy(i){return zd(i,!1,iy,ay,O_)}function rh(i){return zd(i,!0,ny,ly,F_)}function zd(i,e,t,n,r){if(!jt(i)||i.__v_raw&&!(e&&i.__v_isReactive))return i;const s=fy(i);if(s===0)return i;const o=r.get(i);if(o)return o;const a=new Proxy(i,s===2?n:t);return r.set(i,a),a}function qa(i){return Yo(i)?qa(i.__v_raw):!!(i&&i.__v_isReactive)}function Yo(i){return!!(i&&i.__v_isReadonly)}function lr(i){return!!(i&&i.__v_isShallow)}function Hd(i){return i?!!i.__v_raw:!1}function Et(i){const e=i&&i.__v_raw;return e?Et(e):i}function dy(i){return!yt(i,"__v_skip")&&Object.isExtensible(i)&&S_(i,"__v_skip",!0),i}const ui=i=>jt(i)?kd(i):i,sh=i=>jt(i)?rh(i):i;function kn(i){return i?i.__v_isRef===!0:!1}function py(i){return kn(i)?i.value:i}const my={get:(i,e,t)=>e==="__v_raw"?i:py(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const r=i[e];return kn(r)&&!kn(t)?(r.value=t,!0):Reflect.set(i,e,t,n)}};function B_(i){return qa(i)?i:new Proxy(i,my)}class gy{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new P_(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=dl-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&Dt!==this)return E_(this,!0),!0}get value(){const e=this.dep.track();return R_(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function _y(i,e,t=!1){let n,r;return lt(i)?n=i:(n=i.get,r=i.set),new gy(n,r,t)}const Xl={},Jc=new WeakMap;let Ds;function vy(i,e=!1,t=Ds){if(t){let n=Jc.get(t);n||Jc.set(t,n=[]),n.push(i)}}function xy(i,e,t=Lt){const{immediate:n,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,c=v=>r?v:lr(v)||r===!1||r===0?es(v,1):es(v);let u,f,h,d,g=!1,_=!1;if(kn(i)?(f=()=>i.value,g=lr(i)):qa(i)?(f=()=>c(i),g=!0):st(i)?(_=!0,g=i.some(v=>qa(v)||lr(v)),f=()=>i.map(v=>{if(kn(v))return v.value;if(qa(v))return c(v);if(lt(v))return l?l(v,2):v()})):lt(i)?e?f=l?()=>l(i,2):i:f=()=>{if(h){Fr();try{h()}finally{Br()}}const v=Ds;Ds=u;try{return l?l(i,3,[d]):i(d)}finally{Ds=v}}:f=ar,e&&r){const v=f,E=r===!0?1/0:r;f=()=>es(v(),E)}const m=qx(),p=()=>{u.stop(),m&&m.active&&Ld(m.effects,u)};if(s&&e){const v=e;e=(...E)=>{v(...E),p()}}let b=_?new Array(i.length).fill(Xl):Xl;const M=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(e){const E=u.run();if(r||g||(_?E.some((C,A)=>Vs(C,b[A])):Vs(E,b))){h&&h();const C=Ds;Ds=u;try{const A=[E,b===Xl?void 0:_&&b[0]===Xl?[]:b,d];b=E,l?l(e,3,A):e(...A)}finally{Ds=C}}}else u.run()};return a&&a(M),u=new T_(f),u.scheduler=o?()=>o(M,!1):M,d=v=>vy(v,!1,u),h=u.onStop=()=>{const v=Jc.get(u);if(v){if(l)l(v,4);else for(const E of v)E();Jc.delete(u)}},e?n?M(!0):b=u.run():o?o(M.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function es(i,e=1/0,t){if(e<=0||!jt(i)||i.__v_skip||(t=t||new Map,(t.get(i)||0)>=e))return i;if(t.set(i,e),e--,kn(i))es(i.value,e,t);else if(st(i))for(let n=0;n<i.length;n++)es(i[n],e,t);else if(Ix(i)||Ga(i))i.forEach(n=>{es(n,e,t)});else if(Ox(i)){for(const n in i)es(i[n],e,t);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&es(i[n],e,t)}return i}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Nl(i,e,t,n){try{return n?i(...n):i()}catch(r){Cu(r,e,t)}}function fr(i,e,t,n){if(lt(i)){const r=Nl(i,e,t,n);return r&&x_(r)&&r.catch(s=>{Cu(s,e,t)}),r}if(st(i)){const r=[];for(let s=0;s<i.length;s++)r.push(fr(i[s],e,t,n));return r}}function Cu(i,e,t,n=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Lt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](i,l,c)===!1)return}a=a.parent}if(s){Fr(),Nl(s,null,10,[i,l,c]),Br();return}}yy(i,t,r,n,o)}function yy(i,e,t,n=!0,r=!1){if(r)throw i;console.error(i)}const Un=[];let Ki=-1;const No=[];let Jr=null,wo=0;const k_=Promise.resolve();let Qc=null;function Sy(i){const e=Qc||k_;return i?e.then(this?i.bind(this):i):e}function My(i){let e=Ki+1,t=Un.length;for(;e<t;){const n=e+t>>>1,r=Un[n],s=ml(r);s<i||s===i&&r.flags&2?e=n+1:t=n}return e}function Vd(i){if(!(i.flags&1)){const e=ml(i),t=Un[Un.length-1];!t||!(i.flags&2)&&e>=ml(t)?Un.push(i):Un.splice(My(e),0,i),i.flags|=1,z_()}}function z_(){Qc||(Qc=k_.then(V_))}function Ty(i){st(i)?No.push(...i):Jr&&i.id===-1?Jr.splice(wo+1,0,i):i.flags&1||(No.push(i),i.flags|=1),z_()}function Gp(i,e,t=Ki+1){for(;t<Un.length;t++){const n=Un[t];if(n&&n.flags&2){if(i&&n.id!==i.uid)continue;Un.splice(t,1),t--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function H_(i){if(No.length){const e=[...new Set(No)].sort((t,n)=>ml(t)-ml(n));if(No.length=0,Jr){Jr.push(...e);return}for(Jr=e,wo=0;wo<Jr.length;wo++){const t=Jr[wo];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Jr=null,wo=0}}const ml=i=>i.id==null?i.flags&2?-1:1/0:i.id;function V_(i){try{for(Ki=0;Ki<Un.length;Ki++){const e=Un[Ki];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Nl(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ki<Un.length;Ki++){const e=Un[Ki];e&&(e.flags&=-2)}Ki=-1,Un.length=0,H_(),Qc=null,(Un.length||No.length)&&V_()}}let ir=null,G_=null;function eu(i){const e=ir;return ir=i,G_=i&&i.type.__scopeId||null,e}function by(i,e=ir,t){if(!e||i._n)return i;const n=(...r)=>{n._d&&Qp(-1);const s=eu(e);let o;try{o=i(...r)}finally{eu(s),n._d&&Qp(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function ys(i,e,t,n){const r=i.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[n];l&&(Fr(),fr(l,t,8,[i.el,a,i,e]),Br())}}const Ey=Symbol("_vte"),wy=i=>i.__isTeleport,Ay=Symbol("_leaveCb");function Gd(i,e){i.shapeFlag&6&&i.component?(i.transition=e,Gd(i.component.subTree,e)):i.shapeFlag&128?(i.ssContent.transition=e.clone(i.ssContent),i.ssFallback.transition=e.clone(i.ssFallback)):i.transition=e}function W_(i){i.ids=[i.ids[0]+i.ids[2]+++"-",0,0]}const tu=new WeakMap;function Ka(i,e,t,n,r=!1){if(st(i)){i.forEach((g,_)=>Ka(g,e&&(st(e)?e[_]:e),t,n,r));return}if(ja(n)&&!r){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Ka(i,e,t,n.component.subTree);return}const s=n.shapeFlag&4?Kd(n.component):n.el,o=r?null:s,{i:a,r:l}=i,c=e&&e.r,u=a.refs===Lt?a.refs={}:a.refs,f=a.setupState,h=Et(f),d=f===Lt?v_:g=>yt(h,g);if(c!=null&&c!==l){if(Wp(e),fn(c))u[c]=null,d(c)&&(f[c]=null);else if(kn(c)){c.value=null;const g=e;g.k&&(u[g.k]=null)}}if(lt(l))Nl(l,a,12,[o,u]);else{const g=fn(l),_=kn(l);if(g||_){const m=()=>{if(i.f){const p=g?d(l)?f[l]:u[l]:l.value;if(r)st(p)&&Ld(p,s);else if(st(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],d(l)&&(f[l]=u[l]);else{const b=[s];l.value=b,i.k&&(u[i.k]=b)}}else g?(u[l]=o,d(l)&&(f[l]=o)):_&&(l.value=o,i.k&&(u[i.k]=o))};if(o){const p=()=>{m(),tu.delete(i)};p.id=-1,tu.set(i,p),oi(p,t)}else Wp(i),m()}}}function Wp(i){const e=tu.get(i);e&&(e.flags|=8,tu.delete(i))}wu().requestIdleCallback;wu().cancelIdleCallback;const ja=i=>!!i.type.__asyncLoader,X_=i=>i.type.__isKeepAlive;function Ry(i,e){Y_(i,"a",e)}function Cy(i,e){Y_(i,"da",e)}function Y_(i,e,t=On){const n=i.__wdc||(i.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Pu(e,n,t),t){let r=t.parent;for(;r&&r.parent;)X_(r.parent.vnode)&&Py(n,e,t,r),r=r.parent}}function Py(i,e,t,n){const r=Pu(e,i,n,!0);q_(()=>{Ld(n[e],r)},t)}function Pu(i,e,t=On,n=!1){if(t){const r=t[i]||(t[i]=[]),s=e.__weh||(e.__weh=(...o)=>{Fr();const a=Bl(t),l=fr(e,t,i,o);return a(),Br(),l});return n?r.unshift(s):r.push(s),s}}const Vr=i=>(e,t=On)=>{(!_l||i==="sp")&&Pu(i,(...n)=>e(...n),t)},Dy=Vr("bm"),Wd=Vr("m"),Ly=Vr("bu"),Iy=Vr("u"),Uy=Vr("bum"),q_=Vr("um"),Ny=Vr("sp"),Oy=Vr("rtg"),Fy=Vr("rtc");function By(i,e=On){Pu("ec",i,e)}const ky=Symbol.for("v-ndc"),oh=i=>i?p0(i)?Kd(i):oh(i.parent):null,$a=Vn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>oh(i.parent),$root:i=>oh(i.root),$host:i=>i.ce,$emit:i=>i.emit,$options:i=>j_(i),$forceUpdate:i=>i.f||(i.f=()=>{Vd(i.update)}),$nextTick:i=>i.n||(i.n=Sy.bind(i.proxy)),$watch:i=>aS.bind(i)}),ju=(i,e)=>i!==Lt&&!i.__isScriptSetup&&yt(i,e),zy={get({_:i},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:n,data:r,props:s,accessCache:o,type:a,appContext:l}=i;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return n[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(ju(n,e))return o[e]=1,n[e];if(r!==Lt&&yt(r,e))return o[e]=2,r[e];if((c=i.propsOptions[0])&&yt(c,e))return o[e]=3,s[e];if(t!==Lt&&yt(t,e))return o[e]=4,t[e];ah&&(o[e]=0)}}const u=$a[e];let f,h;if(u)return e==="$attrs"&&yn(i.attrs,"get",""),u(i);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==Lt&&yt(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,yt(h,e))return h[e]},set({_:i},e,t){const{data:n,setupState:r,ctx:s}=i;return ju(r,e)?(r[e]=t,!0):n!==Lt&&yt(n,e)?(n[e]=t,!0):yt(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(s[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(t[a]||i!==Lt&&a[0]!=="$"&&yt(i,a)||ju(e,a)||(l=s[0])&&yt(l,a)||yt(n,a)||yt($a,a)||yt(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:yt(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function Xp(i){return st(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let ah=!0;function Hy(i){const e=j_(i),t=i.proxy,n=i.ctx;ah=!1,e.beforeCreate&&Yp(e.beforeCreate,i,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:b,destroyed:M,unmounted:v,render:E,renderTracked:C,renderTriggered:A,errorCaptured:D,serverPrefetch:T,expose:S,inheritAttrs:I,components:F,directives:Y,filters:$}=e;if(c&&Vy(c,n,null),o)for(const V in o){const B=o[V];lt(B)&&(n[V]=B.bind(t))}if(r){const V=r.call(t,t);jt(V)&&(i.data=kd(V))}if(ah=!0,s)for(const V in s){const B=s[V],ae=lt(B)?B.bind(t,t):lt(B.get)?B.get.bind(t,t):ar,U=!lt(B)&&lt(B.set)?B.set.bind(t):ar,ge=DS({get:ae,set:U});Object.defineProperty(n,V,{enumerable:!0,configurable:!0,get:()=>ge.value,set:Oe=>ge.value=Oe})}if(a)for(const V in a)K_(a[V],n,t,V);if(l){const V=lt(l)?l.call(t):l;Reflect.ownKeys(V).forEach(B=>{Ky(B,V[B])})}u&&Yp(u,i,"c");function W(V,B){st(B)?B.forEach(ae=>V(ae.bind(t))):B&&V(B.bind(t))}if(W(Dy,f),W(Wd,h),W(Ly,d),W(Iy,g),W(Ry,_),W(Cy,m),W(By,D),W(Fy,C),W(Oy,A),W(Uy,b),W(q_,v),W(Ny,T),st(S))if(S.length){const V=i.exposed||(i.exposed={});S.forEach(B=>{Object.defineProperty(V,B,{get:()=>t[B],set:ae=>t[B]=ae,enumerable:!0})})}else i.exposed||(i.exposed={});E&&i.render===ar&&(i.render=E),I!=null&&(i.inheritAttrs=I),F&&(i.components=F),Y&&(i.directives=Y),T&&W_(i)}function Vy(i,e,t=ar){st(i)&&(i=lh(i));for(const n in i){const r=i[n];let s;jt(r)?"default"in r?s=Lc(r.from||n,r.default,!0):s=Lc(r.from||n):s=Lc(r),kn(s)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[n]=s}}function Yp(i,e,t){fr(st(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function K_(i,e,t,n){let r=n.includes(".")?l0(t,n):()=>t[n];if(fn(i)){const s=e[i];lt(s)&&Zu(r,s)}else if(lt(i))Zu(r,i.bind(t));else if(jt(i))if(st(i))i.forEach(s=>K_(s,e,t,n));else{const s=lt(i.handler)?i.handler.bind(t):e[i.handler];lt(s)&&Zu(r,s,i)}}function j_(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=i.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!n?l=e:(l={},r.length&&r.forEach(c=>nu(l,c,o,!0)),nu(l,e,o)),jt(e)&&s.set(e,l),l}function nu(i,e,t,n=!1){const{mixins:r,extends:s}=e;s&&nu(i,s,t,!0),r&&r.forEach(o=>nu(i,o,t,!0));for(const o in e)if(!(n&&o==="expose")){const a=Gy[o]||t&&t[o];i[o]=a?a(i[o],e[o]):e[o]}return i}const Gy={data:qp,props:Kp,emits:Kp,methods:Ia,computed:Ia,beforeCreate:Rn,created:Rn,beforeMount:Rn,mounted:Rn,beforeUpdate:Rn,updated:Rn,beforeDestroy:Rn,beforeUnmount:Rn,destroyed:Rn,unmounted:Rn,activated:Rn,deactivated:Rn,errorCaptured:Rn,serverPrefetch:Rn,components:Ia,directives:Ia,watch:Xy,provide:qp,inject:Wy};function qp(i,e){return e?i?function(){return Vn(lt(i)?i.call(this,this):i,lt(e)?e.call(this,this):e)}:e:i}function Wy(i,e){return Ia(lh(i),lh(e))}function lh(i){if(st(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function Rn(i,e){return i?[...new Set([].concat(i,e))]:e}function Ia(i,e){return i?Vn(Object.create(null),i,e):e}function Kp(i,e){return i?st(i)&&st(e)?[...new Set([...i,...e])]:Vn(Object.create(null),Xp(i),Xp(e??{})):e}function Xy(i,e){if(!i)return e;if(!e)return i;const t=Vn(Object.create(null),i);for(const n in e)t[n]=Rn(i[n],e[n]);return t}function $_(){return{app:null,config:{isNativeTag:v_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Yy=0;function qy(i,e){return function(n,r=null){lt(n)||(n=Vn({},n)),r!=null&&!jt(r)&&(r=null);const s=$_(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:Yy++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:LS,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&lt(u.install)?(o.add(u),u.install(c,...f)):lt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Ri(n,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),i(d,u,h),l=!0,c._container=u,u.__vue_app__=c,Kd(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(fr(a,c._instance,16),i(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Oo;Oo=c;try{return u()}finally{Oo=f}}};return c}}let Oo=null;function Ky(i,e){if(On){let t=On.provides;const n=On.parent&&On.parent.provides;n===t&&(t=On.provides=Object.create(n)),t[i]=e}}function Lc(i,e,t=!1){const n=ES();if(n||Oo){let r=Oo?Oo._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return t&&lt(e)?e.call(n&&n.proxy):e}}const Z_={},J_=()=>Object.create(Z_),Q_=i=>Object.getPrototypeOf(i)===Z_;function jy(i,e,t,n=!1){const r={},s=J_();i.propsDefaults=Object.create(null),e0(i,e,r,s);for(const o in i.propsOptions[0])o in r||(r[o]=void 0);t?i.props=n?r:hy(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function $y(i,e,t,n){const{props:r,attrs:s,vnode:{patchFlag:o}}=i,a=Et(r),[l]=i.propsOptions;let c=!1;if((n||o>0)&&!(o&16)){if(o&8){const u=i.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Du(i.emitsOptions,h))continue;const d=e[h];if(l)if(yt(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=ds(h);r[g]=ch(l,a,g,d,i,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{e0(i,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!yt(e,f)&&((u=no(f))===f||!yt(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=ch(l,a,f,void 0,i,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!yt(e,f))&&(delete s[f],c=!0)}c&&Rr(i.attrs,"set","")}function e0(i,e,t,n){const[r,s]=i.propsOptions;let o=!1,a;if(e)for(let l in e){if(Wa(l))continue;const c=e[l];let u;r&&yt(r,u=ds(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Du(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,o=!0)}if(s){const l=Et(t),c=a||Lt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=ch(r,l,f,c[f],i,!yt(c,f))}}return o}function ch(i,e,t,n,r,s){const o=i[t];if(o!=null){const a=yt(o,"default");if(a&&n===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&lt(l)){const{propsDefaults:c}=r;if(t in c)n=c[t];else{const u=Bl(r);n=c[t]=l.call(null,e),u()}}else n=l;r.ce&&r.ce._setProp(t,n)}o[0]&&(s&&!a?n=!1:o[1]&&(n===""||n===no(t))&&(n=!0))}return n}const Zy=new WeakMap;function t0(i,e,t=!1){const n=t?Zy:e.propsCache,r=n.get(i);if(r)return r;const s=i.props,o={},a=[];let l=!1;if(!lt(i)){const u=f=>{l=!0;const[h,d]=t0(f,e,!0);Vn(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return jt(i)&&n.set(i,Uo),Uo;if(st(s))for(let u=0;u<s.length;u++){const f=ds(s[u]);jp(f)&&(o[f]=Lt)}else if(s)for(const u in s){const f=ds(u);if(jp(f)){const h=s[u],d=o[f]=st(h)||lt(h)?{type:h}:Vn({},h),g=d.type;let _=!1,m=!0;if(st(g))for(let p=0;p<g.length;++p){const b=g[p],M=lt(b)&&b.name;if(M==="Boolean"){_=!0;break}else M==="String"&&(m=!1)}else _=lt(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||yt(d,"default"))&&a.push(f)}}const c=[o,a];return jt(i)&&n.set(i,c),c}function jp(i){return i[0]!=="$"&&!Wa(i)}const Xd=i=>i==="_"||i==="_ctx"||i==="$stable",Yd=i=>st(i)?i.map(Qi):[Qi(i)],Jy=(i,e,t)=>{if(e._n)return e;const n=by((...r)=>Yd(e(...r)),t);return n._c=!1,n},n0=(i,e,t)=>{const n=i._ctx;for(const r in i){if(Xd(r))continue;const s=i[r];if(lt(s))e[r]=Jy(r,s,n);else if(s!=null){const o=Yd(s);e[r]=()=>o}}},i0=(i,e)=>{const t=Yd(e);i.slots.default=()=>t},r0=(i,e,t)=>{for(const n in e)(t||!Xd(n))&&(i[n]=e[n])},Qy=(i,e,t)=>{const n=i.slots=J_();if(i.vnode.shapeFlag&32){const r=e._;r?(r0(n,e,t),t&&S_(n,"_",r,!0)):n0(e,n)}else e&&i0(i,e)},eS=(i,e,t)=>{const{vnode:n,slots:r}=i;let s=!0,o=Lt;if(n.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:r0(r,e,t):(s=!e.$stable,n0(e,r)),o=e}else e&&(i0(i,e),o={default:1});if(s)for(const a in r)!Xd(a)&&o[a]==null&&delete r[a]},oi=mS;function tS(i){return nS(i)}function nS(i,e){const t=wu();t.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=ar,insertStaticContent:g}=i,_=(L,x,G,Z=null,K=null,P=null,le=void 0,J=null,re=!!x.dynamicChildren)=>{if(L===x)return;L&&!ya(L,x)&&(Z=se(L),Oe(L,K,P,!0),L=null),x.patchFlag===-2&&(re=!1,x.dynamicChildren=null);const{type:ie,ref:Se,shapeFlag:R}=x;switch(ie){case Lu:m(L,x,G,Z);break;case qo:p(L,x,G,Z);break;case Ic:L==null&&b(x,G,Z,le);break;case Ji:F(L,x,G,Z,K,P,le,J,re);break;default:R&1?E(L,x,G,Z,K,P,le,J,re):R&6?Y(L,x,G,Z,K,P,le,J,re):(R&64||R&128)&&ie.process(L,x,G,Z,K,P,le,J,re,Ce)}Se!=null&&K?Ka(Se,L&&L.ref,P,x||L,!x):Se==null&&L&&L.ref!=null&&Ka(L.ref,null,P,L,!0)},m=(L,x,G,Z)=>{if(L==null)n(x.el=a(x.children),G,Z);else{const K=x.el=L.el;x.children!==L.children&&c(K,x.children)}},p=(L,x,G,Z)=>{L==null?n(x.el=l(x.children||""),G,Z):x.el=L.el},b=(L,x,G,Z)=>{[L.el,L.anchor]=g(L.children,x,G,Z,L.el,L.anchor)},M=({el:L,anchor:x},G,Z)=>{let K;for(;L&&L!==x;)K=h(L),n(L,G,Z),L=K;n(x,G,Z)},v=({el:L,anchor:x})=>{let G;for(;L&&L!==x;)G=h(L),r(L),L=G;r(x)},E=(L,x,G,Z,K,P,le,J,re)=>{x.type==="svg"?le="svg":x.type==="math"&&(le="mathml"),L==null?C(x,G,Z,K,P,le,J,re):T(L,x,K,P,le,J,re)},C=(L,x,G,Z,K,P,le,J)=>{let re,ie;const{props:Se,shapeFlag:R,transition:y,dirs:O}=L;if(re=L.el=o(L.type,P,Se&&Se.is,Se),R&8?u(re,L.children):R&16&&D(L.children,re,null,Z,K,$u(L,P),le,J),O&&ys(L,null,Z,"created"),A(re,L,L.scopeId,le,Z),Se){for(const ee in Se)ee!=="value"&&!Wa(ee)&&s(re,ee,null,Se[ee],P,Z);"value"in Se&&s(re,"value",null,Se.value,P),(ie=Se.onVnodeBeforeMount)&&qi(ie,Z,L)}O&&ys(L,null,Z,"beforeMount");const q=iS(K,y);q&&y.beforeEnter(re),n(re,x,G),((ie=Se&&Se.onVnodeMounted)||q||O)&&oi(()=>{ie&&qi(ie,Z,L),q&&y.enter(re),O&&ys(L,null,Z,"mounted")},K)},A=(L,x,G,Z,K)=>{if(G&&d(L,G),Z)for(let P=0;P<Z.length;P++)d(L,Z[P]);if(K){let P=K.subTree;if(x===P||u0(P.type)&&(P.ssContent===x||P.ssFallback===x)){const le=K.vnode;A(L,le,le.scopeId,le.slotScopeIds,K.parent)}}},D=(L,x,G,Z,K,P,le,J,re=0)=>{for(let ie=re;ie<L.length;ie++){const Se=L[ie]=J?Qr(L[ie]):Qi(L[ie]);_(null,Se,x,G,Z,K,P,le,J)}},T=(L,x,G,Z,K,P,le)=>{const J=x.el=L.el;let{patchFlag:re,dynamicChildren:ie,dirs:Se}=x;re|=L.patchFlag&16;const R=L.props||Lt,y=x.props||Lt;let O;if(G&&Ss(G,!1),(O=y.onVnodeBeforeUpdate)&&qi(O,G,x,L),Se&&ys(x,L,G,"beforeUpdate"),G&&Ss(G,!0),(R.innerHTML&&y.innerHTML==null||R.textContent&&y.textContent==null)&&u(J,""),ie?S(L.dynamicChildren,ie,J,G,Z,$u(x,K),P):le||B(L,x,J,null,G,Z,$u(x,K),P,!1),re>0){if(re&16)I(J,R,y,G,K);else if(re&2&&R.class!==y.class&&s(J,"class",null,y.class,K),re&4&&s(J,"style",R.style,y.style,K),re&8){const q=x.dynamicProps;for(let ee=0;ee<q.length;ee++){const X=q[ee],ve=R[X],ue=y[X];(ue!==ve||X==="value")&&s(J,X,ve,ue,K,G)}}re&1&&L.children!==x.children&&u(J,x.children)}else!le&&ie==null&&I(J,R,y,G,K);((O=y.onVnodeUpdated)||Se)&&oi(()=>{O&&qi(O,G,x,L),Se&&ys(x,L,G,"updated")},Z)},S=(L,x,G,Z,K,P,le)=>{for(let J=0;J<x.length;J++){const re=L[J],ie=x[J],Se=re.el&&(re.type===Ji||!ya(re,ie)||re.shapeFlag&198)?f(re.el):G;_(re,ie,Se,null,Z,K,P,le,!0)}},I=(L,x,G,Z,K)=>{if(x!==G){if(x!==Lt)for(const P in x)!Wa(P)&&!(P in G)&&s(L,P,x[P],null,K,Z);for(const P in G){if(Wa(P))continue;const le=G[P],J=x[P];le!==J&&P!=="value"&&s(L,P,J,le,K,Z)}"value"in G&&s(L,"value",x.value,G.value,K)}},F=(L,x,G,Z,K,P,le,J,re)=>{const ie=x.el=L?L.el:a(""),Se=x.anchor=L?L.anchor:a("");let{patchFlag:R,dynamicChildren:y,slotScopeIds:O}=x;O&&(J=J?J.concat(O):O),L==null?(n(ie,G,Z),n(Se,G,Z),D(x.children||[],G,Se,K,P,le,J,re)):R>0&&R&64&&y&&L.dynamicChildren?(S(L.dynamicChildren,y,G,K,P,le,J),(x.key!=null||K&&x===K.subTree)&&s0(L,x,!0)):B(L,x,G,Se,K,P,le,J,re)},Y=(L,x,G,Z,K,P,le,J,re)=>{x.slotScopeIds=J,L==null?x.shapeFlag&512?K.ctx.activate(x,G,Z,le,re):$(x,G,Z,K,P,le,re):j(L,x,re)},$=(L,x,G,Z,K,P,le)=>{const J=L.component=bS(L,Z,K);if(X_(L)&&(J.ctx.renderer=Ce),wS(J,!1,le),J.asyncDep){if(K&&K.registerDep(J,W,le),!L.el){const re=J.subTree=Ri(qo);p(null,re,x,G),L.placeholder=re.el}}else W(J,L,x,G,K,P,le)},j=(L,x,G)=>{const Z=x.component=L.component;if(dS(L,x,G))if(Z.asyncDep&&!Z.asyncResolved){V(Z,x,G);return}else Z.next=x,Z.update();else x.el=L.el,Z.vnode=x},W=(L,x,G,Z,K,P,le)=>{const J=()=>{if(L.isMounted){let{next:R,bu:y,u:O,parent:q,vnode:ee}=L;{const me=o0(L);if(me){R&&(R.el=ee.el,V(L,R,le)),me.asyncDep.then(()=>{L.isUnmounted||J()});return}}let X=R,ve;Ss(L,!1),R?(R.el=ee.el,V(L,R,le)):R=ee,y&&Xu(y),(ve=R.props&&R.props.onVnodeBeforeUpdate)&&qi(ve,q,R,ee),Ss(L,!0);const ue=Zp(L),be=L.subTree;L.subTree=ue,_(be,ue,f(be.el),se(be),L,K,P),R.el=ue.el,X===null&&pS(L,ue.el),O&&oi(O,K),(ve=R.props&&R.props.onVnodeUpdated)&&oi(()=>qi(ve,q,R,ee),K)}else{let R;const{el:y,props:O}=x,{bm:q,m:ee,parent:X,root:ve,type:ue}=L,be=ja(x);Ss(L,!1),q&&Xu(q),!be&&(R=O&&O.onVnodeBeforeMount)&&qi(R,X,x),Ss(L,!0);{ve.ce&&ve.ce._def.shadowRoot!==!1&&ve.ce._injectChildStyle(ue);const me=L.subTree=Zp(L);_(null,me,G,Z,L,K,P),x.el=me.el}if(ee&&oi(ee,K),!be&&(R=O&&O.onVnodeMounted)){const me=x;oi(()=>qi(R,X,me),K)}(x.shapeFlag&256||X&&ja(X.vnode)&&X.vnode.shapeFlag&256)&&L.a&&oi(L.a,K),L.isMounted=!0,x=G=Z=null}};L.scope.on();const re=L.effect=new T_(J);L.scope.off();const ie=L.update=re.run.bind(re),Se=L.job=re.runIfDirty.bind(re);Se.i=L,Se.id=L.uid,re.scheduler=()=>Vd(Se),Ss(L,!0),ie()},V=(L,x,G)=>{x.component=L;const Z=L.vnode.props;L.vnode=x,L.next=null,$y(L,x.props,Z,G),eS(L,x.children,G),Fr(),Gp(L),Br()},B=(L,x,G,Z,K,P,le,J,re=!1)=>{const ie=L&&L.children,Se=L?L.shapeFlag:0,R=x.children,{patchFlag:y,shapeFlag:O}=x;if(y>0){if(y&128){U(ie,R,G,Z,K,P,le,J,re);return}else if(y&256){ae(ie,R,G,Z,K,P,le,J,re);return}}O&8?(Se&16&&ne(ie,K,P),R!==ie&&u(G,R)):Se&16?O&16?U(ie,R,G,Z,K,P,le,J,re):ne(ie,K,P,!0):(Se&8&&u(G,""),O&16&&D(R,G,Z,K,P,le,J,re))},ae=(L,x,G,Z,K,P,le,J,re)=>{L=L||Uo,x=x||Uo;const ie=L.length,Se=x.length,R=Math.min(ie,Se);let y;for(y=0;y<R;y++){const O=x[y]=re?Qr(x[y]):Qi(x[y]);_(L[y],O,G,null,K,P,le,J,re)}ie>Se?ne(L,K,P,!0,!1,R):D(x,G,Z,K,P,le,J,re,R)},U=(L,x,G,Z,K,P,le,J,re)=>{let ie=0;const Se=x.length;let R=L.length-1,y=Se-1;for(;ie<=R&&ie<=y;){const O=L[ie],q=x[ie]=re?Qr(x[ie]):Qi(x[ie]);if(ya(O,q))_(O,q,G,null,K,P,le,J,re);else break;ie++}for(;ie<=R&&ie<=y;){const O=L[R],q=x[y]=re?Qr(x[y]):Qi(x[y]);if(ya(O,q))_(O,q,G,null,K,P,le,J,re);else break;R--,y--}if(ie>R){if(ie<=y){const O=y+1,q=O<Se?x[O].el:Z;for(;ie<=y;)_(null,x[ie]=re?Qr(x[ie]):Qi(x[ie]),G,q,K,P,le,J,re),ie++}}else if(ie>y)for(;ie<=R;)Oe(L[ie],K,P,!0),ie++;else{const O=ie,q=ie,ee=new Map;for(ie=q;ie<=y;ie++){const Pe=x[ie]=re?Qr(x[ie]):Qi(x[ie]);Pe.key!=null&&ee.set(Pe.key,ie)}let X,ve=0;const ue=y-q+1;let be=!1,me=0;const he=new Array(ue);for(ie=0;ie<ue;ie++)he[ie]=0;for(ie=O;ie<=R;ie++){const Pe=L[ie];if(ve>=ue){Oe(Pe,K,P,!0);continue}let Ee;if(Pe.key!=null)Ee=ee.get(Pe.key);else for(X=q;X<=y;X++)if(he[X-q]===0&&ya(Pe,x[X])){Ee=X;break}Ee===void 0?Oe(Pe,K,P,!0):(he[Ee-q]=ie+1,Ee>=me?me=Ee:be=!0,_(Pe,x[Ee],G,null,K,P,le,J,re),ve++)}const xe=be?rS(he):Uo;for(X=xe.length-1,ie=ue-1;ie>=0;ie--){const Pe=q+ie,Ee=x[Pe],_e=x[Pe+1],Ge=Pe+1<Se?_e.el||_e.placeholder:Z;he[ie]===0?_(null,Ee,G,Ge,K,P,le,J,re):be&&(X<0||ie!==xe[X]?ge(Ee,G,Ge,2):X--)}}},ge=(L,x,G,Z,K=null)=>{const{el:P,type:le,transition:J,children:re,shapeFlag:ie}=L;if(ie&6){ge(L.component.subTree,x,G,Z);return}if(ie&128){L.suspense.move(x,G,Z);return}if(ie&64){le.move(L,x,G,Ce);return}if(le===Ji){n(P,x,G);for(let R=0;R<re.length;R++)ge(re[R],x,G,Z);n(L.anchor,x,G);return}if(le===Ic){M(L,x,G);return}if(Z!==2&&ie&1&&J)if(Z===0)J.beforeEnter(P),n(P,x,G),oi(()=>J.enter(P),K);else{const{leave:R,delayLeave:y,afterLeave:O}=J,q=()=>{L.ctx.isUnmounted?r(P):n(P,x,G)},ee=()=>{P._isLeaving&&P[Ay](!0),R(P,()=>{q(),O&&O()})};y?y(P,q,ee):ee()}else n(P,x,G)},Oe=(L,x,G,Z=!1,K=!1)=>{const{type:P,props:le,ref:J,children:re,dynamicChildren:ie,shapeFlag:Se,patchFlag:R,dirs:y,cacheIndex:O}=L;if(R===-2&&(K=!1),J!=null&&(Fr(),Ka(J,null,G,L,!0),Br()),O!=null&&(x.renderCache[O]=void 0),Se&256){x.ctx.deactivate(L);return}const q=Se&1&&y,ee=!ja(L);let X;if(ee&&(X=le&&le.onVnodeBeforeUnmount)&&qi(X,x,L),Se&6)qe(L.component,G,Z);else{if(Se&128){L.suspense.unmount(G,Z);return}q&&ys(L,null,x,"beforeUnmount"),Se&64?L.type.remove(L,x,G,Ce,Z):ie&&!ie.hasOnce&&(P!==Ji||R>0&&R&64)?ne(ie,x,G,!1,!0):(P===Ji&&R&384||!K&&Se&16)&&ne(re,x,G),Z&&Qe(L)}(ee&&(X=le&&le.onVnodeUnmounted)||q)&&oi(()=>{X&&qi(X,x,L),q&&ys(L,null,x,"unmounted")},G)},Qe=L=>{const{type:x,el:G,anchor:Z,transition:K}=L;if(x===Ji){Ke(G,Z);return}if(x===Ic){v(L);return}const P=()=>{r(G),K&&!K.persisted&&K.afterLeave&&K.afterLeave()};if(L.shapeFlag&1&&K&&!K.persisted){const{leave:le,delayLeave:J}=K,re=()=>le(G,P);J?J(L.el,P,re):re()}else P()},Ke=(L,x)=>{let G;for(;L!==x;)G=h(L),r(L),L=G;r(x)},qe=(L,x,G)=>{const{bum:Z,scope:K,job:P,subTree:le,um:J,m:re,a:ie}=L;$p(re),$p(ie),Z&&Xu(Z),K.stop(),P&&(P.flags|=8,Oe(le,L,x,G)),J&&oi(J,x),oi(()=>{L.isUnmounted=!0},x)},ne=(L,x,G,Z=!1,K=!1,P=0)=>{for(let le=P;le<L.length;le++)Oe(L[le],x,G,Z,K)},se=L=>{if(L.shapeFlag&6)return se(L.component.subTree);if(L.shapeFlag&128)return L.suspense.next();const x=h(L.anchor||L.el),G=x&&x[Ey];return G?h(G):x};let Me=!1;const Ie=(L,x,G)=>{L==null?x._vnode&&Oe(x._vnode,null,null,!0):_(x._vnode||null,L,x,null,null,null,G),x._vnode=L,Me||(Me=!0,Gp(),H_(),Me=!1)},Ce={p:_,um:Oe,m:ge,r:Qe,mt:$,mc:D,pc:B,pbc:S,n:se,o:i};return{render:Ie,hydrate:void 0,createApp:qy(Ie)}}function $u({type:i,props:e},t){return t==="svg"&&i==="foreignObject"||t==="mathml"&&i==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ss({effect:i,job:e},t){t?(i.flags|=32,e.flags|=4):(i.flags&=-33,e.flags&=-5)}function iS(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function s0(i,e,t=!1){const n=i.children,r=e.children;if(st(n)&&st(r))for(let s=0;s<n.length;s++){const o=n[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Qr(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&s0(o,a)),a.type===Lu&&a.patchFlag!==-1&&(a.el=o.el),a.type===qo&&!a.el&&(a.el=o.el)}}function rS(i){const e=i.slice(),t=[0];let n,r,s,o,a;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=t[t.length-1],i[r]<c){e[n]=r,t.push(n);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,i[t[a]]<c?s=a+1:o=a;c<i[t[s]]&&(s>0&&(e[n]=t[s-1]),t[s]=n)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function o0(i){const e=i.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:o0(e)}function $p(i){if(i)for(let e=0;e<i.length;e++)i[e].flags|=8}const sS=Symbol.for("v-scx"),oS=()=>Lc(sS);function Zu(i,e,t){return a0(i,e,t)}function a0(i,e,t=Lt){const{immediate:n,deep:r,flush:s,once:o}=t,a=Vn({},t),l=e&&n||!e&&s!=="post";let c;if(_l){if(s==="sync"){const d=oS();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ar,d.resume=ar,d.pause=ar,d}}const u=On;a.call=(d,g,_)=>fr(d,u,g,_);let f=!1;s==="post"?a.scheduler=d=>{oi(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():Vd(d)}),a.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=xy(i,e,a);return _l&&(c?c.push(h):l&&h()),h}function aS(i,e,t){const n=this.proxy,r=fn(i)?i.includes(".")?l0(n,i):()=>n[i]:i.bind(n,n);let s;lt(e)?s=e:(s=e.handler,t=e);const o=Bl(this),a=a0(r,s.bind(n),t);return o(),a}function l0(i,e){const t=e.split(".");return()=>{let n=i;for(let r=0;r<t.length&&n;r++)n=n[t[r]];return n}}const lS=(i,e)=>e==="modelValue"||e==="model-value"?i.modelModifiers:i[`${e}Modifiers`]||i[`${ds(e)}Modifiers`]||i[`${no(e)}Modifiers`];function cS(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||Lt;let r=t;const s=e.startsWith("update:"),o=s&&lS(n,e.slice(7));o&&(o.trim&&(r=t.map(u=>fn(u)?u.trim():u)),o.number&&(r=t.map(kx)));let a,l=n[a=Wu(e)]||n[a=Wu(ds(e))];!l&&s&&(l=n[a=Wu(no(e))]),l&&fr(l,i,6,r);const c=n[a+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[a])return;i.emitted[a]=!0,fr(c,i,6,r)}}const uS=new WeakMap;function c0(i,e,t=!1){const n=t?uS:e.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let o={},a=!1;if(!lt(i)){const l=c=>{const u=c0(c,e,!0);u&&(a=!0,Vn(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!a?(jt(i)&&n.set(i,null),null):(st(s)?s.forEach(l=>o[l]=null):Vn(o,s),jt(i)&&n.set(i,o),o)}function Du(i,e){return!i||!Tu(e)?!1:(e=e.slice(2).replace(/Once$/,""),yt(i,e[0].toLowerCase()+e.slice(1))||yt(i,no(e))||yt(i,e))}function Zp(i){const{type:e,vnode:t,proxy:n,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=i,m=eu(i);let p,b;try{if(t.shapeFlag&4){const v=r||n,E=v;p=Qi(c.call(E,v,u,f,d,h,g)),b=a}else{const v=e;p=Qi(v.length>1?v(f,{attrs:a,slots:o,emit:l}):v(f,null)),b=e.props?a:fS(a)}}catch(v){Za.length=0,Cu(v,i,1),p=Ri(qo)}let M=p;if(b&&_!==!1){const v=Object.keys(b),{shapeFlag:E}=M;v.length&&E&7&&(s&&v.some(Dd)&&(b=hS(b,s)),M=Ko(M,b,!1,!0))}return t.dirs&&(M=Ko(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(t.dirs):t.dirs),t.transition&&Gd(M,t.transition),p=M,eu(m),p}const fS=i=>{let e;for(const t in i)(t==="class"||t==="style"||Tu(t))&&((e||(e={}))[t]=i[t]);return e},hS=(i,e)=>{const t={};for(const n in i)(!Dd(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function dS(i,e,t){const{props:n,children:r,component:s}=i,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return n?Jp(n,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==n[h]&&!Du(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?Jp(n,o,c):!0:!!o;return!1}function Jp(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(e[s]!==i[s]&&!Du(t,s))return!0}return!1}function pS({vnode:i,parent:e},t){for(;e;){const n=e.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=e.vnode).el=t,e=e.parent;else break}}const u0=i=>i.__isSuspense;function mS(i,e){e&&e.pendingBranch?st(i)?e.effects.push(...i):e.effects.push(i):Ty(i)}const Ji=Symbol.for("v-fgt"),Lu=Symbol.for("v-txt"),qo=Symbol.for("v-cmt"),Ic=Symbol.for("v-stc"),Za=[];let pi=null;function Ol(i=!1){Za.push(pi=i?null:[])}function gS(){Za.pop(),pi=Za[Za.length-1]||null}let gl=1;function Qp(i,e=!1){gl+=i,i<0&&pi&&e&&(pi.hasOnce=!0)}function _S(i){return i.dynamicChildren=gl>0?pi||Uo:null,gS(),gl>0&&pi&&pi.push(i),i}function Fl(i,e,t,n,r,s){return _S(iu(i,e,t,n,r,s,!0))}function f0(i){return i?i.__v_isVNode===!0:!1}function ya(i,e){return i.type===e.type&&i.key===e.key}const h0=({key:i})=>i??null,Uc=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?fn(i)||kn(i)||lt(i)?{i:ir,r:i,k:e,f:!!t}:i:null);function iu(i,e=null,t=null,n=0,r=null,s=i===Ji?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&h0(e),ref:e&&Uc(e),scopeId:G_,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:ir};return a?(qd(l,t),s&128&&i.normalize(l)):t&&(l.shapeFlag|=fn(t)?8:16),gl>0&&!o&&pi&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&pi.push(l),l}const Ri=vS;function vS(i,e=null,t=null,n=0,r=null,s=!1){if((!i||i===ky)&&(i=qo),f0(i)){const a=Ko(i,e,!0);return t&&qd(a,t),gl>0&&!s&&pi&&(a.shapeFlag&6?pi[pi.indexOf(i)]=a:pi.push(a)),a.patchFlag=-2,a}if(PS(i)&&(i=i.__vccOpts),e){e=xS(e);let{class:a,style:l}=e;a&&!fn(a)&&(e.class=Ru(a)),jt(l)&&(Hd(l)&&!st(l)&&(l=Vn({},l)),e.style=Au(l))}const o=fn(i)?1:u0(i)?128:wy(i)?64:jt(i)?4:lt(i)?2:0;return iu(i,e,t,n,r,o,s,!0)}function xS(i){return i?Hd(i)||Q_(i)?Vn({},i):i:null}function Ko(i,e,t=!1,n=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=i,c=e?SS(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&h0(c),ref:e&&e.ref?t&&s?st(s)?s.concat(Uc(e)):[s,Uc(e)]:Uc(e):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==Ji?o===-1?16:o|16:o,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&Ko(i.ssContent),ssFallback:i.ssFallback&&Ko(i.ssFallback),placeholder:i.placeholder,el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce};return l&&n&&Gd(u,l.clone(u)),u}function yS(i=" ",e=0){return Ri(Lu,null,i,e)}function d0(i,e){const t=Ri(Ic,null,i);return t.staticCount=e,t}function Qi(i){return i==null||typeof i=="boolean"?Ri(qo):st(i)?Ri(Ji,null,i.slice()):f0(i)?Qr(i):Ri(Lu,null,String(i))}function Qr(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:Ko(i)}function qd(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(st(e))t=16;else if(typeof e=="object")if(n&65){const r=e.default;r&&(r._c&&(r._d=!1),qd(i,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Q_(e)?e._ctx=ir:r===3&&ir&&(ir.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else lt(e)?(e={default:e,_ctx:ir},t=32):(e=String(e),n&64?(t=16,e=[yS(e)]):t=8);i.children=e,i.shapeFlag|=t}function SS(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const r in n)if(r==="class")e.class!==n.class&&(e.class=Ru([e.class,n.class]));else if(r==="style")e.style=Au([e.style,n.style]);else if(Tu(r)){const s=e[r],o=n[r];o&&s!==o&&!(st(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=n[r])}return e}function qi(i,e,t,n=null){fr(i,e,7,[t,n])}const MS=$_();let TS=0;function bS(i,e,t){const n=i.type,r=(e?e.appContext:i.appContext)||MS,s={uid:TS++,vnode:i,type:n,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Yx(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:t0(n,r),emitsOptions:c0(n,r),emit:null,emitted:null,propsDefaults:Lt,inheritAttrs:n.inheritAttrs,ctx:Lt,data:Lt,props:Lt,attrs:Lt,slots:Lt,refs:Lt,setupState:Lt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=cS.bind(null,s),i.ce&&i.ce(s),s}let On=null;const ES=()=>On||ir;let ru,uh;{const i=wu(),e=(t,n)=>{let r;return(r=i[t])||(r=i[t]=[]),r.push(n),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};ru=e("__VUE_INSTANCE_SETTERS__",t=>On=t),uh=e("__VUE_SSR_SETTERS__",t=>_l=t)}const Bl=i=>{const e=On;return ru(i),i.scope.on(),()=>{i.scope.off(),ru(e)}},em=()=>{On&&On.scope.off(),ru(null)};function p0(i){return i.vnode.shapeFlag&4}let _l=!1;function wS(i,e=!1,t=!1){e&&uh(e);const{props:n,children:r}=i.vnode,s=p0(i);jy(i,n,s,e),Qy(i,r,t||e);const o=s?AS(i,e):void 0;return e&&uh(!1),o}function AS(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,zy);const{setup:n}=t;if(n){Fr();const r=i.setupContext=n.length>1?CS(i):null,s=Bl(i),o=Nl(n,i,0,[i.props,r]),a=x_(o);if(Br(),s(),(a||i.sp)&&!ja(i)&&W_(i),a){if(o.then(em,em),e)return o.then(l=>{tm(i,l)}).catch(l=>{Cu(l,i,0)});i.asyncDep=o}else tm(i,o)}else m0(i)}function tm(i,e,t){lt(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:jt(e)&&(i.setupState=B_(e)),m0(i)}function m0(i,e,t){const n=i.type;i.render||(i.render=n.render||ar);{const r=Bl(i);Fr();try{Hy(i)}finally{Br(),r()}}}const RS={get(i,e){return yn(i,"get",""),i[e]}};function CS(i){const e=t=>{i.exposed=t||{}};return{attrs:new Proxy(i.attrs,RS),slots:i.slots,emit:i.emit,expose:e}}function Kd(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(B_(dy(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in $a)return $a[t](i)},has(e,t){return t in e||t in $a}})):i.proxy}function PS(i){return lt(i)&&"__vccOpts"in i}const DS=(i,e)=>_y(i,e,_l),LS="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let fh;const nm=typeof window<"u"&&window.trustedTypes;if(nm)try{fh=nm.createPolicy("vue",{createHTML:i=>i})}catch{}const g0=fh?i=>fh.createHTML(i):i=>i,IS="http://www.w3.org/2000/svg",US="http://www.w3.org/1998/Math/MathML",Er=typeof document<"u"?document:null,im=Er&&Er.createElement("template"),NS={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const r=e==="svg"?Er.createElementNS(IS,i):e==="mathml"?Er.createElementNS(US,i):t?Er.createElement(i,{is:t}):Er.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>Er.createTextNode(i),createComment:i=>Er.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>Er.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{im.innerHTML=g0(n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i);const a=im.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},OS=Symbol("_vtc");function FS(i,e,t){const n=i[OS];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const rm=Symbol("_vod"),BS=Symbol("_vsh"),kS=Symbol(""),zS=/(?:^|;)\s*display\s*:/;function HS(i,e,t){const n=i.style,r=fn(t);let s=!1;if(t&&!r){if(e)if(fn(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Nc(n,a,"")}else for(const o in e)t[o]==null&&Nc(n,o,"");for(const o in t)o==="display"&&(s=!0),Nc(n,o,t[o])}else if(r){if(e!==t){const o=n[kS];o&&(t+=";"+o),n.cssText=t,s=zS.test(t)}}else e&&i.removeAttribute("style");rm in i&&(i[rm]=s?n.display:"",i[BS]&&(n.display="none"))}const sm=/\s*!important$/;function Nc(i,e,t){if(st(t))t.forEach(n=>Nc(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))i.setProperty(e,t);else{const n=VS(i,e);sm.test(t)?i.setProperty(no(n),t.replace(sm,""),"important"):i[n]=t}}const om=["Webkit","Moz","ms"],Ju={};function VS(i,e){const t=Ju[e];if(t)return t;let n=ds(e);if(n!=="filter"&&n in i)return Ju[e]=n;n=y_(n);for(let r=0;r<om.length;r++){const s=om[r]+n;if(s in i)return Ju[e]=s}return e}const am="http://www.w3.org/1999/xlink";function lm(i,e,t,n,r,s=Xx(e)){n&&e.startsWith("xlink:")?t==null?i.removeAttributeNS(am,e.slice(6,e.length)):i.setAttributeNS(am,e,t):t==null||s&&!M_(t)?i.removeAttribute(e):i.setAttribute(e,s?"":ha(t)?String(t):t)}function cm(i,e,t,n,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(i[e]=e==="innerHTML"?g0(t):t);return}const s=i.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?i.getAttribute("value")||"":i.value,l=t==null?i.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in i))&&(i.value=l),t==null&&i.removeAttribute(e),i._value=t;return}let o=!1;if(t===""||t==null){const a=typeof i[e];a==="boolean"?t=M_(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{i[e]=t}catch{}o&&i.removeAttribute(r||e)}function GS(i,e,t,n){i.addEventListener(e,t,n)}function WS(i,e,t,n){i.removeEventListener(e,t,n)}const um=Symbol("_vei");function XS(i,e,t,n,r=null){const s=i[um]||(i[um]={}),o=s[e];if(n&&o)o.value=n;else{const[a,l]=YS(e);if(n){const c=s[e]=jS(n,r);GS(i,a,c,l)}else o&&(WS(i,a,o,l),s[e]=void 0)}}const fm=/(?:Once|Passive|Capture)$/;function YS(i){let e;if(fm.test(i)){e={};let n;for(;n=i.match(fm);)i=i.slice(0,i.length-n[0].length),e[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):no(i.slice(2)),e]}let Qu=0;const qS=Promise.resolve(),KS=()=>Qu||(qS.then(()=>Qu=0),Qu=Date.now());function jS(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;fr($S(n,t.value),e,5,[n])};return t.value=i,t.attached=KS(),t}function $S(i,e){if(st(e)){const t=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{t.call(i),i._stopped=!0},e.map(n=>r=>!r._stopped&&n&&n(r))}else return e}const hm=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,ZS=(i,e,t,n,r,s)=>{const o=r==="svg";e==="class"?FS(i,n,o):e==="style"?HS(i,t,n):Tu(e)?Dd(e)||XS(i,e,t,n,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):JS(i,e,n,o))?(cm(i,e,n),!i.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&lm(i,e,n,o,s,e!=="value")):i._isVueCE&&(/[A-Z]/.test(e)||!fn(n))?cm(i,ds(e),n,s,e):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),lm(i,e,n,o))};function JS(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&hm(e)&&lt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return hm(e)&&fn(t)?!1:e in i}const QS=Vn({patchProp:ZS},NS);let dm;function eM(){return dm||(dm=tS(QS))}const tM=((...i)=>{const e=eM().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=iM(n);if(!r)return;const s=e._component;!lt(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,nM(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function nM(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function iM(i){return fn(i)?document.querySelector(i):i}const rM="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2019.2.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20fill='%23FFFFFF'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2050%2050'%20width='500px'%20height='500px'%3e%3cpath%20d='M44.529,34.75c-1.081,2.393-1.598,3.464-2.986,5.579c-1.94,2.954-4.678,6.64-8.064,6.665c-3.012,0.025-3.789-1.965-7.876-1.932c-4.087,0.02-4.939,1.969-7.954,1.938c-3.386-0.031-5.978-3.352-7.92-6.3C4.3,32.429,3.727,22.736,7.082,17.579c2.374-3.657,6.13-5.805,9.657-5.805c3.592,0,5.85,1.974,8.82,1.974c2.882,0,4.637-1.979,8.791-1.979c3.142,0,6.464,1.712,8.838,4.666C35.422,20.69,36.684,31.782,44.529,34.75z%20M31.197,8.468c1.511-1.94,2.657-4.677,2.242-7.468c-2.466,0.168-5.349,1.743-7.034,3.782c-1.526,1.857-2.791,4.615-2.298,7.283C26.797,12.152,29.581,10.548,31.197,8.468z'/%3e%3c/svg%3e",_0=(i,e)=>{const t=i.__vccOpts||i;for(const[n,r]of e)t[n]=r;return t},sM={},oM={id:"hero-section",class:"section"};function aM(i,e){return Ol(),Fl("section",oM,[...e[0]||(e[0]=[d0('<div class="w-screen bg-black h-screen relative mb-[200px]"><div class="flex items-center justify-between p-4 relative z-50 font-pop"><div class="img_box"><img src="'+rM+'" alt="" class="h-[36px]"></div><div><h1 class="text-white text-center ms-20 text-2xl mt-2 font-rob font-bold">iPhone 17 Pro</h1></div><div class="top_right_btn flex gap-2 items-center justify-center text-stone-300"><button class="liquid-glass p-2 px-4 rounded-full hover:bg-stone-100 transition duration-300 hover:text-stone-800 hover:shadow-inner">Sign-in</button><button class="liquid-glass p-2 px-4 rounded-full bg-white text-stone-800 hover:bg-opacity-5 hover:text-stone-100 transition duration-300">Explore</button></div></div><div class="img_box w-full pt-28 relative"><div class="fixed bg-orange-500 bg-opacity-10 h-[500px] w-[500px] rounded-full top-1/3 left-1/3 blur-[200px]"></div></div></div>',1)])])}const lM=_0(sM,[["render",aM]]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jd="180",cM=0,pm=1,uM=2,v0=1,fM=2,br=3,kr=0,jn=1,tr=2,Ir=0,Fo=1,hh=2,mm=3,gm=4,hM=5,Fs=100,dM=101,pM=102,mM=103,gM=104,_M=200,vM=201,xM=202,yM=203,dh=204,ph=205,SM=206,MM=207,TM=208,bM=209,EM=210,wM=211,AM=212,RM=213,CM=214,mh=0,gh=1,_h=2,jo=3,vh=4,xh=5,yh=6,Sh=7,x0=0,PM=1,DM=2,cs=0,LM=1,IM=2,UM=3,NM=4,OM=5,FM=6,y0=7,_m="attached",BM="detached",S0=300,$o=301,Zo=302,Mh=303,Th=304,Iu=306,Jo=1e3,ns=1001,su=1002,zn=1003,M0=1004,Ua=1005,mi=1006,Oc=1007,Pr=1008,hr=1009,T0=1010,b0=1011,vl=1012,$d=1013,Zs=1014,zi=1015,Ur=1016,Zd=1017,Jd=1018,xl=1020,E0=35902,w0=35899,A0=1021,R0=1022,Ci=1023,yl=1026,Sl=1027,Qd=1028,ep=1029,C0=1030,tp=1031,np=1033,Fc=33776,Bc=33777,kc=33778,zc=33779,bh=35840,Eh=35841,wh=35842,Ah=35843,Rh=36196,Ch=37492,Ph=37496,Dh=37808,Lh=37809,Ih=37810,Uh=37811,Nh=37812,Oh=37813,Fh=37814,Bh=37815,kh=37816,zh=37817,Hh=37818,Vh=37819,Gh=37820,Wh=37821,Xh=36492,Yh=36494,qh=36495,Kh=36283,jh=36284,$h=36285,Zh=36286,Ml=2300,Tl=2301,ef=2302,vm=2400,xm=2401,ym=2402,kM=2500,zM=0,P0=1,Jh=2,HM=3200,VM=3201,D0=0,GM=1,ts="",dn="srgb",Gn="srgb-linear",ou="linear",bt="srgb",oo=7680,Sm=519,WM=512,XM=513,YM=514,L0=515,qM=516,KM=517,jM=518,$M=519,Qh=35044,Mm="300 es",rr=2e3,au=2001;class da{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tm=1234567;const Ja=Math.PI/180,Qo=180/Math.PI;function Vi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function ip(i,e){return(i%e+e)%e}function ZM(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function JM(i,e,t){return i!==e?(t-i)/(e-i):0}function Qa(i,e,t){return(1-t)*i+t*e}function QM(i,e,t,n){return Qa(i,e,1-Math.exp(-t*n))}function eT(i,e=1){return e-Math.abs(ip(i,e*2)-e)}function tT(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function nT(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function iT(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rT(i,e){return i+Math.random()*(e-i)}function sT(i){return i*(.5-Math.random())}function oT(i){i!==void 0&&(Tm=i);let e=Tm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function aT(i){return i*Ja}function lT(i){return i*Qo}function cT(i){return(i&i-1)===0&&i!==0}function uT(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function fT(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hT(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),f=s((e-n)/2),h=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*f,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*f,a*c);break;case"ZXZ":i.set(l*f,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Bi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const dT={DEG2RAD:Ja,RAD2DEG:Qo,generateUUID:Vi,clamp:ht,euclideanModulo:ip,mapLinear:ZM,inverseLerp:JM,lerp:Qa,damp:QM,pingpong:eT,smoothstep:tT,smootherstep:nT,randInt:iT,randFloat:rT,randFloatSpread:sT,seededRandom:oT,degToRad:aT,radToDeg:lT,isPowerOfTwo:cT,ceilPowerOfTwo:uT,floorPowerOfTwo:fT,setQuaternionFromProperEuler:hT,normalize:Mt,denormalize:Bi};class Ze{constructor(e=0,t=0){Ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _s{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),C=Math.atan2(E,p*b);m=Math.sin(m*C)/E,a=Math.sin(a*C)/E}const v=a*b;if(l=l*m+h*v,c=c*m+d*v,u=u*m+g*v,f=f*m+_*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=E,c*=E,u*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),f=a(s/2),h=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,n=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),f=2*(s*n-o*t);return this.x=t+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tf.copy(this).projectOnVector(e),this.sub(tf)}reflect(e){return this.sub(tf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tf=new H,bm=new _s;class tt{constructor(e,t,n,r,s,o,a,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],b=r[1],M=r[4],v=r[7],E=r[2],C=r[5],A=r[8];return s[0]=o*_+a*b+l*E,s[3]=o*m+a*M+l*C,s[6]=o*p+a*v+l*A,s[1]=c*_+u*b+f*E,s[4]=c*m+u*M+f*C,s[7]=c*p+u*v+f*A,s[2]=h*_+d*b+g*E,s[5]=h*m+d*M+g*C,s[8]=h*p+d*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(nf.makeScale(e,t)),this}rotate(e){return this.premultiply(nf.makeRotation(-e)),this}translate(e,t){return this.premultiply(nf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const nf=new tt;function I0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function bl(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pT(){const i=bl("canvas");return i.style.display="block",i}const Em={};function El(i){i in Em||(Em[i]=!0,console.warn(i))}function mT(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const wm=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Am=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gT(){const i={enabled:!0,workingColorSpace:Gn,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=Nr(r.r),r.g=Nr(r.g),r.b=Nr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=Bo(r.r),r.g=Bo(r.g),r.b=Bo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ts?ou:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return El("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return El("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Gn]:{primaries:e,whitePoint:n,transfer:ou,toXYZ:wm,fromXYZ:Am,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:wm,fromXYZ:Am,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}}),i}const mt=gT();function Nr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ao;class _T{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ao===void 0&&(ao=bl("canvas")),ao.width=e.width,ao.height=e.height;const r=ao.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ao}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=bl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Nr(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nr(t[n]/255)*255):t[n]=Nr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vT=0;class rp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vT++}),this.uuid=Vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(rf(r[o].image)):s.push(rf(r[o]))}else s=rf(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function rf(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_T.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xT=0;const sf=new H;class un extends da{constructor(e=un.DEFAULT_IMAGE,t=un.DEFAULT_MAPPING,n=ns,r=ns,s=mi,o=Pr,a=Ci,l=hr,c=un.DEFAULT_ANISOTROPY,u=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=Vi(),this.name="",this.source=new rp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sf).x}get height(){return this.source.getSize(sf).y}get depth(){return this.source.getSize(sf).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==S0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jo:e.x=e.x-Math.floor(e.x);break;case ns:e.x=e.x<0?0:1;break;case su:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jo:e.y=e.y-Math.floor(e.y);break;case ns:e.y=e.y<0?0:1;break;case su:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=S0;un.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,n=0,r=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,v=(d+1)/2,E=(p+1)/2,C=(u+h)/4,A=(f+_)/4,D=(g+m)/4;return M>v&&M>E?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=C/n,s=A/n):v>E?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=C/r,s=D/r):E<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),n=A/s,r=D/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yT extends da{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new un(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new rp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends yT{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class U0 extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ST extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zn,this.minFilter=zn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ui):Ui.fromBufferAttribute(s,o),Ui.applyMatrix4(e.matrixWorld),this.expandByPoint(Ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yl.copy(n.boundingBox)),Yl.applyMatrix4(e.matrixWorld),this.union(Yl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ui),Ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sa),ql.subVectors(this.max,Sa),lo.subVectors(e.a,Sa),co.subVectors(e.b,Sa),uo.subVectors(e.c,Sa),Wr.subVectors(co,lo),Xr.subVectors(uo,co),Ms.subVectors(lo,uo);let t=[0,-Wr.z,Wr.y,0,-Xr.z,Xr.y,0,-Ms.z,Ms.y,Wr.z,0,-Wr.x,Xr.z,0,-Xr.x,Ms.z,0,-Ms.x,-Wr.y,Wr.x,0,-Xr.y,Xr.x,0,-Ms.y,Ms.x,0];return!of(t,lo,co,uo,ql)||(t=[1,0,0,0,1,0,0,0,1],!of(t,lo,co,uo,ql))?!1:(Kl.crossVectors(Wr,Xr),t=[Kl.x,Kl.y,Kl.z],of(t,lo,co,uo,ql))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vr=[new H,new H,new H,new H,new H,new H,new H,new H],Ui=new H,Yl=new Gr,lo=new H,co=new H,uo=new H,Wr=new H,Xr=new H,Ms=new H,Sa=new H,ql=new H,Kl=new H,Ts=new H;function of(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ts.fromArray(i,s);const a=r.x*Math.abs(Ts.x)+r.y*Math.abs(Ts.y)+r.z*Math.abs(Ts.z),l=e.dot(Ts),c=t.dot(Ts),u=n.dot(Ts);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const MT=new Gr,Ma=new H,af=new H;class mr{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):MT.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ma.subVectors(e,this.center);const t=Ma.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ma,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(af.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ma.copy(e.center).add(af)),this.expandByPoint(Ma.copy(e.center).sub(af))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xr=new H,lf=new H,jl=new H,Yr=new H,cf=new H,$l=new H,uf=new H;class Uu{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xr.copy(this.origin).addScaledVector(this.direction,t),xr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){lf.copy(e).add(t).multiplyScalar(.5),jl.copy(t).sub(e).normalize(),Yr.copy(this.origin).sub(lf);const s=e.distanceTo(t)*.5,o=-this.direction.dot(jl),a=Yr.dot(this.direction),l=-Yr.dot(jl),c=Yr.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(lf).addScaledVector(jl,h),d}intersectSphere(e,t){xr.subVectors(e.center,this.origin);const n=xr.dot(this.direction),r=xr.dot(xr)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,xr)!==null}intersectTriangle(e,t,n,r,s){cf.subVectors(t,e),$l.subVectors(n,e),uf.crossVectors(cf,$l);let o=this.direction.dot(uf),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yr.subVectors(this.origin,e);const l=a*this.direction.dot($l.crossVectors(Yr,$l));if(l<0)return null;const c=a*this.direction.dot(cf.cross(Yr));if(c<0||l+c>o)return null;const u=-a*Yr.dot(uf);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,n,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/fo.setFromMatrixColumn(e,0).length(),s=1/fo.setFromMatrixColumn(e,1).length(),o=1/fo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(TT,e,bT)}lookAt(e,t,n){const r=this.elements;return ri.subVectors(e,t),ri.lengthSq()===0&&(ri.z=1),ri.normalize(),qr.crossVectors(n,ri),qr.lengthSq()===0&&(Math.abs(n.z)===1?ri.x+=1e-4:ri.z+=1e-4,ri.normalize(),qr.crossVectors(n,ri)),qr.normalize(),Zl.crossVectors(ri,qr),r[0]=qr.x,r[4]=Zl.x,r[8]=ri.x,r[1]=qr.y,r[5]=Zl.y,r[9]=ri.y,r[2]=qr.z,r[6]=Zl.z,r[10]=ri.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],M=n[7],v=n[11],E=n[15],C=r[0],A=r[4],D=r[8],T=r[12],S=r[1],I=r[5],F=r[9],Y=r[13],$=r[2],j=r[6],W=r[10],V=r[14],B=r[3],ae=r[7],U=r[11],ge=r[15];return s[0]=o*C+a*S+l*$+c*B,s[4]=o*A+a*I+l*j+c*ae,s[8]=o*D+a*F+l*W+c*U,s[12]=o*T+a*Y+l*V+c*ge,s[1]=u*C+f*S+h*$+d*B,s[5]=u*A+f*I+h*j+d*ae,s[9]=u*D+f*F+h*W+d*U,s[13]=u*T+f*Y+h*V+d*ge,s[2]=g*C+_*S+m*$+p*B,s[6]=g*A+_*I+m*j+p*ae,s[10]=g*D+_*F+m*W+p*U,s[14]=g*T+_*Y+m*V+p*ge,s[3]=b*C+M*S+v*$+E*B,s[7]=b*A+M*I+v*j+E*ae,s[11]=b*D+M*F+v*W+E*U,s[15]=b*T+M*Y+v*V+E*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+n*c*h+r*a*d-n*l*d)+_*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+n*o*d+s*a*u-n*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,M=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,v=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,E=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,C=t*b+n*M+r*v+s*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=b*A,e[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*A,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*A,e[3]=(f*l*s-a*h*s-f*r*c+n*h*c+a*r*d-n*l*d)*A,e[4]=M*A,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*A,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*A,e[8]=v*A,e[9]=(g*f*s-u*_*s-g*n*d+t*_*d+u*n*p-t*f*p)*A,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*f*s-u*n*c+t*f*c+o*n*d-t*a*d)*A,e[12]=E*A,e[13]=(u*_*r-g*f*r+g*n*h-t*_*h-u*n*m+t*f*m)*A,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*A,e[15]=(o*f*r-u*a*r+u*n*l-t*f*l-o*n*h+t*a*h)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,b=l*c,M=l*u,v=l*f,E=n.x,C=n.y,A=n.z;return r[0]=(1-(_+p))*E,r[1]=(d+v)*E,r[2]=(g-M)*E,r[3]=0,r[4]=(d-v)*C,r[5]=(1-(h+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(g+M)*A,r[9]=(m-b)*A,r[10]=(1-(h+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=fo.set(r[0],r[1],r[2]).length();const o=fo.set(r[4],r[5],r[6]).length(),a=fo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ni.copy(this);const c=1/s,u=1/o,f=1/a;return Ni.elements[0]*=c,Ni.elements[1]*=c,Ni.elements[2]*=c,Ni.elements[4]*=u,Ni.elements[5]*=u,Ni.elements[6]*=u,Ni.elements[8]*=f,Ni.elements[9]*=f,Ni.elements[10]*=f,t.setFromRotationMatrix(Ni),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=rr,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===rr)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===au)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=rr,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===rr)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===au)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fo=new H,Ni=new ot,TT=new H(0,0,0),bT=new H(1,1,1),qr=new H,Zl=new H,ri=new H,Rm=new ot,Cm=new _s;class dr{constructor(e=0,t=0,n=0,r=dr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cm.setFromEuler(this),this.setFromQuaternion(Cm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dr.DEFAULT_ORDER="XYZ";class N0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ET=0;const Pm=new H,ho=new _s,yr=new ot,Jl=new H,Ta=new H,wT=new H,AT=new _s,Dm=new H(1,0,0),Lm=new H(0,1,0),Im=new H(0,0,1),Um={type:"added"},RT={type:"removed"},po={type:"childadded",child:null},ff={type:"childremoved",child:null};class Vt extends da{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ET++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new H,t=new dr,n=new _s,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new tt}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new N0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.multiply(ho),this}rotateOnWorldAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.premultiply(ho),this}rotateX(e){return this.rotateOnAxis(Dm,e)}rotateY(e){return this.rotateOnAxis(Lm,e)}rotateZ(e){return this.rotateOnAxis(Im,e)}translateOnAxis(e,t){return Pm.copy(e).applyQuaternion(this.quaternion),this.position.add(Pm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dm,e)}translateY(e){return this.translateOnAxis(Lm,e)}translateZ(e){return this.translateOnAxis(Im,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Jl.copy(e):Jl.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yr.lookAt(Ta,Jl,this.up):yr.lookAt(Jl,Ta,this.up),this.quaternion.setFromRotationMatrix(yr),r&&(yr.extractRotation(r.matrixWorld),ho.setFromRotationMatrix(yr),this.quaternion.premultiply(ho.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Um),po.child=e,this.dispatchEvent(po),po.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(RT),ff.child=e,this.dispatchEvent(ff),ff.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yr.multiply(e.parent.matrixWorld)),e.applyMatrix4(yr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Um),po.child=e,this.dispatchEvent(po),po.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,e,wT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,AT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new H(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Oi=new H,Sr=new H,hf=new H,Mr=new H,mo=new H,go=new H,Nm=new H,df=new H,pf=new H,mf=new H,gf=new vt,_f=new vt,vf=new vt;class ki{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Oi.subVectors(e,t),r.cross(Oi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Oi.subVectors(r,t),Sr.subVectors(n,t),hf.subVectors(e,t);const o=Oi.dot(Oi),a=Oi.dot(Sr),l=Oi.dot(hf),c=Sr.dot(Sr),u=Sr.dot(hf),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Mr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mr.x),l.addScaledVector(o,Mr.y),l.addScaledVector(a,Mr.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return gf.setScalar(0),_f.setScalar(0),vf.setScalar(0),gf.fromBufferAttribute(e,t),_f.fromBufferAttribute(e,n),vf.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(gf,s.x),o.addScaledVector(_f,s.y),o.addScaledVector(vf,s.z),o}static isFrontFacing(e,t,n,r){return Oi.subVectors(n,t),Sr.subVectors(e,t),Oi.cross(Sr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),Sr.subVectors(this.a,this.b),Oi.cross(Sr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ki.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ki.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return ki.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return ki.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ki.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;mo.subVectors(r,n),go.subVectors(s,n),df.subVectors(e,n);const l=mo.dot(df),c=go.dot(df);if(l<=0&&c<=0)return t.copy(n);pf.subVectors(e,r);const u=mo.dot(pf),f=go.dot(pf);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(mo,o);mf.subVectors(e,s);const d=mo.dot(mf),g=go.dot(mf);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(go,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Nm.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(Nm,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(n).addScaledVector(mo,o).addScaledVector(go,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const O0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kr={h:0,s:0,l:0},Ql={h:0,s:0,l:0};function xf(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=mt.workingColorSpace){if(e=ip(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=xf(o,s,e+1/3),this.g=xf(o,s,e),this.b=xf(o,s,e-1/3)}return mt.colorSpaceToWorking(this,r),this}setStyle(e,t=dn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dn){const n=O0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}copyLinearToSRGB(e){return this.r=Bo(e.r),this.g=Bo(e.g),this.b=Bo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dn){return mt.workingToColorSpace(_n.copy(this),e),Math.round(ht(_n.r*255,0,255))*65536+Math.round(ht(_n.g*255,0,255))*256+Math.round(ht(_n.b*255,0,255))}getHexString(e=dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(_n.copy(this),t);const n=_n.r,r=_n.g,s=_n.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=dn){mt.workingToColorSpace(_n.copy(this),e);const t=_n.r,n=_n.g,r=_n.b;return e!==dn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Kr),this.setHSL(Kr.h+e,Kr.s+t,Kr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kr),e.getHSL(Ql);const n=Qa(Kr.h,Ql.h,t),r=Qa(Kr.s,Ql.s,t),s=Qa(Kr.l,Ql.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new je;je.NAMES=O0;let CT=0;class cr extends da{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:CT++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=Fo,this.side=kr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dh,this.blendDst=ph,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=jo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oo,this.stencilZFail=oo,this.stencilZPass=oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fo&&(n.blending=this.blending),this.side!==kr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dh&&(n.blendSrc=this.blendSrc),this.blendDst!==ph&&(n.blendDst=this.blendDst),this.blendEquation!==Fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==jo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class is extends cr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dr,this.combine=x0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new H,ec=new Ze;let PT=0;class Hn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:PT++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qh,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXY(t,ec.x,ec.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qh&&(e.usage=this.usage),e}}class F0 extends Hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class B0 extends Hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Wi extends Hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let DT=0;const Ti=new ot,yf=new Vt,_o=new H,si=new Gr,ba=new Gr,an=new H;class Xi extends da{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:DT++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(I0(e)?B0:F0)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,t,n){return Ti.makeTranslation(e,t,n),this.applyMatrix4(Ti),this}scale(e,t,n){return Ti.makeScale(e,t,n),this.applyMatrix4(Ti),this}lookAt(e){return yf.lookAt(e),yf.updateMatrix(),this.applyMatrix4(yf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_o).negate(),this.translate(_o.x,_o.y,_o.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wi(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];si.setFromBufferAttribute(s),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(si.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ba.setFromBufferAttribute(a),this.morphTargetsRelative?(an.addVectors(si.min,ba.min),si.expandByPoint(an),an.addVectors(si.max,ba.max),si.expandByPoint(an)):(si.expandByPoint(ba.min),si.expandByPoint(ba.max))}si.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)an.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(an));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)an.fromBufferAttribute(a,c),l&&(_o.fromBufferAttribute(e,c),an.add(_o)),r=Math.max(r,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new H,l[D]=new H;const c=new H,u=new H,f=new H,h=new Ze,d=new Ze,g=new Ze,_=new H,m=new H;function p(D,T,S){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),h.fromBufferAttribute(s,D),d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,S),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[D].add(_),a[T].add(_),a[S].add(_),l[D].add(m),l[T].add(m),l[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let D=0,T=b.length;D<T;++D){const S=b[D],I=S.start,F=S.count;for(let Y=I,$=I+F;Y<$;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const M=new H,v=new H,E=new H,C=new H;function A(D){E.fromBufferAttribute(r,D),C.copy(E);const T=a[D];M.copy(T),M.sub(E.multiplyScalar(E.dot(T))).normalize(),v.crossVectors(C,T);const I=v.dot(l[D])<0?-1:1;o.setXYZW(D,M.x,M.y,M.z,I)}for(let D=0,T=b.length;D<T;++D){const S=b[D],I=S.start,F=S.count;for(let Y=I,$=I+F;Y<$;Y+=3)A(e.getX(Y+0)),A(e.getX(Y+1)),A(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,f=new H;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Hn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xi,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Om=new ot,bs=new Uu,tc=new mr,Fm=new H,nc=new H,ic=new H,rc=new H,Sf=new H,sc=new H,Bm=new H,oc=new H;class qn extends Vt{constructor(e=new Xi,t=new is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){sc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Sf.fromBufferAttribute(f,e),o?sc.addScaledVector(Sf,u):sc.addScaledVector(Sf.sub(t),u))}t.add(sc)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tc.copy(n.boundingSphere),tc.applyMatrix4(s),bs.copy(e.ray).recast(e.near),!(tc.containsPoint(bs.origin)===!1&&(bs.intersectSphere(tc,Fm)===null||bs.origin.distanceToSquared(Fm)>(e.far-e.near)**2))&&(Om.copy(s).invert(),bs.copy(e.ray).applyMatrix4(Om),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,E=M;v<E;v+=3){const C=a.getX(v),A=a.getX(v+1),D=a.getX(v+2);r=ac(this,p,e,n,c,u,f,C,A,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);r=ac(this,o,e,n,c,u,f,b,M,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,E=M;v<E;v+=3){const C=v,A=v+1,D=v+2;r=ac(this,p,e,n,c,u,f,C,A,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=m,M=m+1,v=m+2;r=ac(this,o,e,n,c,u,f,b,M,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function LT(i,e,t,n,r,s,o,a){let l;if(e.side===jn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===kr,a),l===null)return null;oc.copy(a),oc.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(oc);return c<t.near||c>t.far?null:{distance:c,point:oc.clone(),object:i}}function ac(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,nc),i.getVertexPosition(l,ic),i.getVertexPosition(c,rc);const u=LT(i,e,t,n,nc,ic,rc,Bm);if(u){const f=new H;ki.getBarycoord(Bm,nc,ic,rc,f),r&&(u.uv=ki.getInterpolatedAttribute(r,a,l,c,f,new Ze)),s&&(u.uv1=ki.getInterpolatedAttribute(s,a,l,c,f,new Ze)),o&&(u.normal=ki.getInterpolatedAttribute(o,a,l,c,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new H,materialIndex:0};ki.getNormal(nc,ic,rc,h.normal),u.face=h,u.barycoord=f}return u}class kl extends Xi{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Wi(c,3)),this.setAttribute("normal",new Wi(u,3)),this.setAttribute("uv",new Wi(f,2));function g(_,m,p,b,M,v,E,C,A,D,T){const S=v/A,I=E/D,F=v/2,Y=E/2,$=C/2,j=A+1,W=D+1;let V=0,B=0;const ae=new H;for(let U=0;U<W;U++){const ge=U*I-Y;for(let Oe=0;Oe<j;Oe++){const Qe=Oe*S-F;ae[_]=Qe*b,ae[m]=ge*M,ae[p]=$,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[p]=C>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(Oe/A),f.push(1-U/D),V+=1}}for(let U=0;U<D;U++)for(let ge=0;ge<A;ge++){const Oe=h+ge+j*U,Qe=h+ge+j*(U+1),Ke=h+(ge+1)+j*(U+1),qe=h+(ge+1)+j*U;l.push(Oe,Qe,qe),l.push(Qe,Ke,qe),B+=6}a.addGroup(d,B,T),d+=B,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ea(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pn(i){const e={};for(let t=0;t<i.length;t++){const n=ea(i[t]);for(const r in n)e[r]=n[r]}return e}function IT(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function k0(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const lu={clone:ea,merge:Pn};var UT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,NT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends cr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=UT,this.fragmentShader=NT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ea(e.uniforms),this.uniformsGroups=IT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class z0 extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=rr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jr=new H,km=new Ze,zm=new Ze;class Nn extends z0{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qo*2*Math.atan(Math.tan(Ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){jr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jr.x,jr.y).multiplyScalar(-e/jr.z),jr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jr.x,jr.y).multiplyScalar(-e/jr.z)}getViewSize(e,t){return this.getViewBounds(e,km,zm),t.subVectors(zm,km)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ja*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vo=-90,xo=1;class OT extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(vo,xo,e,t);r.layers=this.layers,this.add(r);const s=new Nn(vo,xo,e,t);s.layers=this.layers,this.add(s);const o=new Nn(vo,xo,e,t);o.layers=this.layers,this.add(o);const a=new Nn(vo,xo,e,t);a.layers=this.layers,this.add(a);const l=new Nn(vo,xo,e,t);l.layers=this.layers,this.add(l);const c=new Nn(vo,xo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===rr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===au)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class H0 extends un{constructor(e=[],t=$o,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class FT extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new H0(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new kl(5,5,5),s=new Kn({name:"CubemapFromEquirect",uniforms:ea(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jn,blending:Ir});s.uniforms.tEquirect.value=t;const o=new qn(r,s),a=t.minFilter;return t.minFilter===Pr&&(t.minFilter=mi),new OT(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class ks extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const BT={type:"move"};class Mf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ks,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ks,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ks,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(BT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ks;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class kT extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dr,this.environmentIntensity=1,this.environmentRotation=new dr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zT{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qh,this.updateRanges=[],this.version=0,this.uuid=Vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new H;class sp{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),s=Mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sp(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Hm=new H,Vm=new vt,Gm=new vt,HT=new H,Wm=new ot,lc=new H,Tf=new mr,Xm=new ot,bf=new Uu;class VT extends qn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_m,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Gr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lc),this.boundingBox.expandByPoint(lc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lc),this.boundingSphere.expandByPoint(lc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tf.copy(this.boundingSphere),Tf.applyMatrix4(r),e.ray.intersectsSphere(Tf)!==!1&&(Xm.copy(r).invert(),bf.copy(e.ray).applyMatrix4(Xm),!(this.boundingBox!==null&&bf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bf)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new vt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_m?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===BM?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Vm.fromBufferAttribute(r.attributes.skinIndex,e),Gm.fromBufferAttribute(r.attributes.skinWeight,e),Hm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Gm.getComponent(s);if(o!==0){const a=Vm.getComponent(s);Wm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(HT.copy(Hm).applyMatrix4(Wm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class V0 extends Vt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class G0 extends un{constructor(e=null,t=1,n=1,r,s,o,a,l,c=zn,u=zn,f,h){super(null,o,a,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ym=new ot,GT=new ot;class op{constructor(e=[],t=[]){this.uuid=Vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:GT;Ym.multiplyMatrices(a,t[s]),Ym.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new op(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new G0(t,e,e,Ci,zi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new V0),this.bones.push(o),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class ed extends Hn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const yo=new ot,qm=new ot,cc=[],Km=new Gr,WT=new ot,Ea=new qn,wa=new mr;class XT extends qn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ed(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,WT)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yo),Km.copy(e.boundingBox).applyMatrix4(yo),this.boundingBox.union(Km)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yo),wa.copy(e.boundingSphere).applyMatrix4(yo),this.boundingSphere.union(wa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Ea.geometry=this.geometry,Ea.material=this.material,Ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wa.copy(this.boundingSphere),wa.applyMatrix4(n),e.ray.intersectsSphere(wa)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,yo),qm.multiplyMatrices(n,yo),Ea.matrixWorld=qm,Ea.raycast(e,cc);for(let o=0,a=cc.length;o<a;o++){const l=cc[o];l.instanceId=s,l.object=this,t.push(l)}cc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ed(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new G0(new Float32Array(r*this.count),r,this.count,Qd,zi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ef=new H,YT=new H,qT=new tt;class Ls{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ef.subVectors(n,t).cross(YT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ef),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||qT.getNormalMatrix(e),r=this.coplanarPoint(Ef).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Es=new mr,KT=new Ze(.5,.5),uc=new H;class ap{constructor(e=new Ls,t=new Ls,n=new Ls,r=new Ls,s=new Ls,o=new Ls){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=rr,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],b=s[12],M=s[13],v=s[14],E=s[15];if(r[0].setComponents(c-o,d-u,p-g,E-b).normalize(),r[1].setComponents(c+o,d+u,p+g,E+b).normalize(),r[2].setComponents(c+a,d+f,p+_,E+M).normalize(),r[3].setComponents(c-a,d-f,p-_,E-M).normalize(),n)r[4].setComponents(l,h,m,v).normalize(),r[5].setComponents(c-l,d-h,p-m,E-v).normalize();else if(r[4].setComponents(c-l,d-h,p-m,E-v).normalize(),t===rr)r[5].setComponents(c+l,d+h,p+m,E+v).normalize();else if(t===au)r[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Es)}intersectsSprite(e){Es.center.set(0,0,0);const t=KT.distanceTo(e.center);return Es.radius=.7071067811865476+t,Es.applyMatrix4(e.matrixWorld),this.intersectsSphere(Es)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(uc.x=r.normal.x>0?e.max.x:e.min.x,uc.y=r.normal.y>0?e.max.y:e.min.y,uc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(uc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class W0 extends cr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cu=new H,uu=new H,jm=new ot,Aa=new Uu,fc=new mr,wf=new H,$m=new H;class lp extends Vt{constructor(e=new Xi,t=new W0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)cu.fromBufferAttribute(t,r-1),uu.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=cu.distanceTo(uu);e.setAttribute("lineDistance",new Wi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(r),fc.radius+=s,e.ray.intersectsSphere(fc)===!1)return;jm.copy(r).invert(),Aa.copy(e.ray).applyMatrix4(jm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),b=u.getX(_+1),M=hc(this,e,Aa,l,p,b,_);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=hc(this,e,Aa,l,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=hc(this,e,Aa,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=hc(this,e,Aa,l,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hc(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(cu.fromBufferAttribute(a,r),uu.fromBufferAttribute(a,s),t.distanceSqToSegment(cu,uu,wf,$m)>n)return;wf.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(wf);if(!(c<e.near||c>e.far))return{distance:c,point:$m.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Zm=new H,Jm=new H;class jT extends lp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Zm.fromBufferAttribute(t,r),Jm.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Zm.distanceTo(Jm);e.setAttribute("lineDistance",new Wi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $T extends lp{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class X0 extends cr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qm=new ot,td=new Uu,dc=new mr,pc=new H;class ZT extends Vt{constructor(e=new Xi,t=new X0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dc.copy(n.boundingSphere),dc.applyMatrix4(r),dc.radius+=s,e.ray.intersectsSphere(dc)===!1)return;Qm.copy(r).invert(),td.copy(e.ray).applyMatrix4(Qm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);pc.fromBufferAttribute(f,m),eg(pc,m,l,r,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)pc.fromBufferAttribute(f,g),eg(pc,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function eg(i,e,t,n,r,s,o){const a=td.distanceSqToPoint(i);if(a<t){const l=new H;td.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Y0 extends un{constructor(e,t,n=Zs,r,s,o,a=zn,l=zn,c,u=yl,f=1){if(u!==yl&&u!==Sl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class q0 extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Nu extends Xi{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*h-o;for(let M=0;M<c;M++){const v=M*f-s;g.push(v,-b,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const M=b+c*p,v=b+c*(p+1),E=b+1+c*(p+1),C=b+1+c*p;d.push(M,v,C),d.push(v,E,C)}this.setIndex(d),this.setAttribute("position",new Wi(g,3)),this.setAttribute("normal",new Wi(_,3)),this.setAttribute("uv",new Wi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nu(e.width,e.height,e.widthSegments,e.heightSegments)}}class cp extends cr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=D0,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gr extends cp{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class JT extends cr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=HM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class QT extends cr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function mc(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function eb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function tb(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function tg(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=i[a+l]}return r}function K0(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class zl{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nb extends zl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vm,endingEnd:vm}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case xm:s=e,a=2*t-n;break;case ym:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case xm:o=e,l=2*n-t;break;case ym:o=1,l=n+r[1]-r[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,b=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,M=(-1-d)*m+(1.5+d)*_+.5*g,v=d*m-d*_;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+b*o[c+E]+M*o[l+E]+v*o[f+E];return s}}class ib extends zl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}}class rb extends zl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Yi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=mc(t,this.TimeBufferType),this.values=mc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:mc(e.times,Array),values:mc(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ib(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nb(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ml:t=this.InterpolantFactoryMethodDiscrete;break;case Tl:t=this.InterpolantFactoryMethodLinear;break;case ef:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ml;case this.InterpolantFactoryMethodLinear:return Tl;case this.InterpolantFactoryMethodSmooth:return ef}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&eb(r))for(let a=0,l=r.length;a!==l;++a){const c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ef,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{const f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){const _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const f=a*n,h=o*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Yi.prototype.ValueTypeName="";Yi.prototype.TimeBufferType=Float32Array;Yi.prototype.ValueBufferType=Float32Array;Yi.prototype.DefaultInterpolation=Tl;class pa extends Yi{constructor(e,t,n){super(e,t,n)}}pa.prototype.ValueTypeName="bool";pa.prototype.ValueBufferType=Array;pa.prototype.DefaultInterpolation=Ml;pa.prototype.InterpolantFactoryMethodLinear=void 0;pa.prototype.InterpolantFactoryMethodSmooth=void 0;class j0 extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}j0.prototype.ValueTypeName="color";class ta extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}ta.prototype.ValueTypeName="number";class sb extends zl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(r-t);let c=e*a;for(let u=c+a;c!==u;c+=4)_s.slerpFlat(s,0,o,c-a,o,c,l);return s}}class na extends Yi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new sb(this.times,this.values,this.getValueSize(),e)}}na.prototype.ValueTypeName="quaternion";na.prototype.InterpolantFactoryMethodSmooth=void 0;class ma extends Yi{constructor(e,t,n){super(e,t,n)}}ma.prototype.ValueTypeName="string";ma.prototype.ValueBufferType=Array;ma.prototype.DefaultInterpolation=Ml;ma.prototype.InterpolantFactoryMethodLinear=void 0;ma.prototype.InterpolantFactoryMethodSmooth=void 0;class ia extends Yi{constructor(e,t,n,r){super(e,t,n,r)}}ia.prototype.ValueTypeName="vector";class ob{constructor(e="",t=-1,n=[],r=kM){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Vi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(lb(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Yi.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=tb(l);l=tg(l,1,u),c=tg(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ta(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const f=u[1];let h=r[f];h||(r[f]=h=[]),h.push(c)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,h,d,g,_){if(d.length!==0){const m=[],p=[];K0(d,m,p,g),m.length!==0&&_.push(new f(h,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let f=0;f<c.length;f++){const h=c[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let b=0;b!==h[g].morphTargets.length;++b){const M=h[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}r.push(new ta(".morphTargetInfluence["+_+"]",m,p))}l=d.length*o}else{const d=".bones["+t[f].name+"]";n(ia,d+".position",h,"pos",r),n(na,d+".quaternion",h,"rot",r),n(ia,d+".scale",h,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function ab(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ta;case"vector":case"vector2":case"vector3":case"vector4":return ia;case"color":return j0;case"quaternion":return na;case"bool":case"boolean":return pa;case"string":return ma}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function lb(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ab(i.type);if(i.times===void 0){const t=[],n=[];K0(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Dr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class cb{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const ub=new cb;class ga{constructor(e){this.manager=e!==void 0?e:ub,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ga.DEFAULT_MATERIAL_NAME="__DEFAULT";const Tr={};class fb extends Error{constructor(e,t){super(e),this.response=t}}class $0 extends ga{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Dr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Tr[e]!==void 0){Tr[e].push({onLoad:t,onProgress:n,onError:r});return}Tr[e]=[],Tr[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Tr[e],f=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=h?parseInt(h):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){b();function b(){f.read().then(({done:M,value:v})=>{if(M)p.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let C=0,A=u.length;C<A;C++){const D=u[C];D.onProgress&&D.onProgress(E)}p.enqueue(v),b()}},M=>{p.error(M)})}}});return new Response(m)}else throw new fb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{Dr.add(`file:${e}`,c);const u=Tr[e];delete Tr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=Tr[e];if(u===void 0)throw this.manager.itemError(e),c;delete Tr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const So=new WeakMap;class hb extends ga{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Dr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let f=So.get(o);f===void 0&&(f=[],So.set(o,f)),f.push({onLoad:t,onError:r})}return o}const a=bl("img");function l(){u(),t&&t(this);const f=So.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}So.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),Dr.remove(`image:${e}`);const h=So.get(this)||[];for(let d=0;d<h.length;d++){const g=h[d];g.onError&&g.onError(f)}So.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Dr.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class db extends ga{constructor(e){super(e)}load(e,t,n,r){const s=new un,o=new hb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Ou extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Af=new ot,ng=new H,ig=new H;class up{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=hr,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ap,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ng.setFromMatrixPosition(e.matrixWorld),t.position.copy(ng),ig.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ig),t.updateMatrixWorld(),Af.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Af,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Af)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class pb extends up{constructor(){super(new Nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Qo*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class mb extends Ou{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new pb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const rg=new ot,Ra=new H,Rf=new H;class gb extends up{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ze(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ra.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ra),Rf.copy(n.position),Rf.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Rf),n.updateMatrixWorld(),r.makeTranslation(-Ra.x,-Ra.y,-Ra.z),rg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rg,n.coordinateSystem,n.reversedDepth)}}class _b extends Ou{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new gb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Fu extends z0{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vb extends up{constructor(){super(new Fu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ao extends Ou{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new vb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xb extends Ou{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class el{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Cf=new WeakMap;class yb extends ga{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Dr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Cf.has(o)===!0)r&&r(Cf.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Dr.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),Cf.set(l,c),Dr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Dr.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Sb extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Mb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const fp="\\[\\]\\.:\\/",Tb=new RegExp("["+fp+"]","g"),hp="[^"+fp+"]",bb="[^"+fp.replace("\\.","")+"]",Eb=/((?:WC+[\/:])*)/.source.replace("WC",hp),wb=/(WCOD+)?/.source.replace("WCOD",bb),Ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hp),Rb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hp),Cb=new RegExp("^"+Eb+wb+Ab+Rb+"$"),Pb=["material","materials","bones","map"];class Db{constructor(e,t,n){const r=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Tt{constructor(e,t,n){this.path=t,this.parsedPath=n||Tt.parseTrackName(t),this.node=Tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Tt.Composite(e,t,n):new Tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Tb,"")}static parseTrackName(e){const t=Cb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Pb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[r];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Tt.Composite=Db;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function sg(i,e,t,n){const r=Lb(n);switch(t){case A0:return i*e;case Qd:return i*e/r.components*r.byteLength;case ep:return i*e/r.components*r.byteLength;case C0:return i*e*2/r.components*r.byteLength;case tp:return i*e*2/r.components*r.byteLength;case R0:return i*e*3/r.components*r.byteLength;case Ci:return i*e*4/r.components*r.byteLength;case np:return i*e*4/r.components*r.byteLength;case Fc:case Bc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case kc:case zc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eh:case Ah:return Math.max(i,16)*Math.max(e,8)/4;case bh:case wh:return Math.max(i,8)*Math.max(e,8)/2;case Rh:case Ch:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ph:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dh:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lh:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ih:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uh:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oh:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Fh:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Bh:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case kh:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zh:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Gh:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xh:case Yh:case qh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kh:case jh:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $h:case Zh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lb(i){switch(i){case hr:case T0:return{byteLength:1,components:1};case vl:case b0:case Ur:return{byteLength:2,components:1};case Zd:case Jd:return{byteLength:2,components:4};case Zs:case $d:case zi:return{byteLength:4,components:1};case E0:case w0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Z0(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ib(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Ub=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nb=`#ifdef USE_ALPHAHASH
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
#endif`,Ob=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zb=`#ifdef USE_AOMAP
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
#endif`,Hb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vb=`#ifdef USE_BATCHING
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
#endif`,Gb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qb=`#ifdef USE_IRIDESCENCE
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
#endif`,Kb=`#ifdef USE_BUMPMAP
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
#endif`,jb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$b=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,iE=`#define PI 3.141592653589793
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
} // validated`,rE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sE=`vec3 transformedNormal = objectNormal;
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
#endif`,oE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uE="gl_FragColor = linearToOutputTexel( gl_FragColor );",fE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hE=`#ifdef USE_ENVMAP
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
#endif`,dE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pE=`#ifdef USE_ENVMAP
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
#endif`,mE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gE=`#ifdef USE_ENVMAP
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
#endif`,_E=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SE=`#ifdef USE_GRADIENTMAP
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
}`,ME=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,TE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,EE=`uniform bool receiveShadow;
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
#endif`,wE=`#ifdef USE_ENVMAP
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
#endif`,AE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,DE=`PhysicalMaterial material;
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
#endif`,LE=`struct PhysicalMaterial {
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
}`,IE=`
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
#endif`,UE=`#if defined( RE_IndirectDiffuse )
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
#endif`,NE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,GE=`#if defined( USE_POINTS_UV )
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
#endif`,WE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jE=`#ifdef USE_MORPHTARGETS
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
#endif`,$E=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,JE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,QE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nw=`#ifdef USE_NORMALMAP
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
#endif`,iw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ow=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_w=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vw=`float getShadowMask() {
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
}`,xw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yw=`#ifdef USE_SKINNING
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
#endif`,Sw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mw=`#ifdef USE_SKINNING
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
#endif`,Tw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ew=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ww=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Aw=`#ifdef USE_TRANSMISSION
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
#endif`,Rw=`#ifdef USE_TRANSMISSION
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
#endif`,Cw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Iw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Uw=`uniform sampler2D t2D;
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
}`,Nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ow=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kw=`#include <common>
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
}`,zw=`#if DEPTH_PACKING == 3200
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
}`,Hw=`#define DISTANCE
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
}`,Vw=`#define DISTANCE
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
}`,Gw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ww=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xw=`uniform float scale;
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
}`,Yw=`uniform vec3 diffuse;
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
}`,qw=`#include <common>
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
}`,Kw=`uniform vec3 diffuse;
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
}`,jw=`#define LAMBERT
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
}`,$w=`#define LAMBERT
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
}`,Zw=`#define MATCAP
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
}`,Jw=`#define MATCAP
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
}`,Qw=`#define NORMAL
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
}`,e1=`#define NORMAL
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
}`,t1=`#define PHONG
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
}`,n1=`#define PHONG
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
}`,i1=`#define STANDARD
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
}`,r1=`#define STANDARD
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
}`,s1=`#define TOON
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
}`,o1=`#define TOON
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
}`,a1=`uniform float size;
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
}`,l1=`uniform vec3 diffuse;
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
}`,c1=`#include <common>
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
}`,u1=`uniform vec3 color;
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
}`,f1=`uniform float rotation;
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
}`,h1=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:Ub,alphahash_pars_fragment:Nb,alphamap_fragment:Ob,alphamap_pars_fragment:Fb,alphatest_fragment:Bb,alphatest_pars_fragment:kb,aomap_fragment:zb,aomap_pars_fragment:Hb,batching_pars_vertex:Vb,batching_vertex:Gb,begin_vertex:Wb,beginnormal_vertex:Xb,bsdfs:Yb,iridescence_fragment:qb,bumpmap_pars_fragment:Kb,clipping_planes_fragment:jb,clipping_planes_pars_fragment:$b,clipping_planes_pars_vertex:Zb,clipping_planes_vertex:Jb,color_fragment:Qb,color_pars_fragment:eE,color_pars_vertex:tE,color_vertex:nE,common:iE,cube_uv_reflection_fragment:rE,defaultnormal_vertex:sE,displacementmap_pars_vertex:oE,displacementmap_vertex:aE,emissivemap_fragment:lE,emissivemap_pars_fragment:cE,colorspace_fragment:uE,colorspace_pars_fragment:fE,envmap_fragment:hE,envmap_common_pars_fragment:dE,envmap_pars_fragment:pE,envmap_pars_vertex:mE,envmap_physical_pars_fragment:wE,envmap_vertex:gE,fog_vertex:_E,fog_pars_vertex:vE,fog_fragment:xE,fog_pars_fragment:yE,gradientmap_pars_fragment:SE,lightmap_pars_fragment:ME,lights_lambert_fragment:TE,lights_lambert_pars_fragment:bE,lights_pars_begin:EE,lights_toon_fragment:AE,lights_toon_pars_fragment:RE,lights_phong_fragment:CE,lights_phong_pars_fragment:PE,lights_physical_fragment:DE,lights_physical_pars_fragment:LE,lights_fragment_begin:IE,lights_fragment_maps:UE,lights_fragment_end:NE,logdepthbuf_fragment:OE,logdepthbuf_pars_fragment:FE,logdepthbuf_pars_vertex:BE,logdepthbuf_vertex:kE,map_fragment:zE,map_pars_fragment:HE,map_particle_fragment:VE,map_particle_pars_fragment:GE,metalnessmap_fragment:WE,metalnessmap_pars_fragment:XE,morphinstance_vertex:YE,morphcolor_vertex:qE,morphnormal_vertex:KE,morphtarget_pars_vertex:jE,morphtarget_vertex:$E,normal_fragment_begin:ZE,normal_fragment_maps:JE,normal_pars_fragment:QE,normal_pars_vertex:ew,normal_vertex:tw,normalmap_pars_fragment:nw,clearcoat_normal_fragment_begin:iw,clearcoat_normal_fragment_maps:rw,clearcoat_pars_fragment:sw,iridescence_pars_fragment:ow,opaque_fragment:aw,packing:lw,premultiplied_alpha_fragment:cw,project_vertex:uw,dithering_fragment:fw,dithering_pars_fragment:hw,roughnessmap_fragment:dw,roughnessmap_pars_fragment:pw,shadowmap_pars_fragment:mw,shadowmap_pars_vertex:gw,shadowmap_vertex:_w,shadowmask_pars_fragment:vw,skinbase_vertex:xw,skinning_pars_vertex:yw,skinning_vertex:Sw,skinnormal_vertex:Mw,specularmap_fragment:Tw,specularmap_pars_fragment:bw,tonemapping_fragment:Ew,tonemapping_pars_fragment:ww,transmission_fragment:Aw,transmission_pars_fragment:Rw,uv_pars_fragment:Cw,uv_pars_vertex:Pw,uv_vertex:Dw,worldpos_vertex:Lw,background_vert:Iw,background_frag:Uw,backgroundCube_vert:Nw,backgroundCube_frag:Ow,cube_vert:Fw,cube_frag:Bw,depth_vert:kw,depth_frag:zw,distanceRGBA_vert:Hw,distanceRGBA_frag:Vw,equirect_vert:Gw,equirect_frag:Ww,linedashed_vert:Xw,linedashed_frag:Yw,meshbasic_vert:qw,meshbasic_frag:Kw,meshlambert_vert:jw,meshlambert_frag:$w,meshmatcap_vert:Zw,meshmatcap_frag:Jw,meshnormal_vert:Qw,meshnormal_frag:e1,meshphong_vert:t1,meshphong_frag:n1,meshphysical_vert:i1,meshphysical_frag:r1,meshtoon_vert:s1,meshtoon_frag:o1,points_vert:a1,points_frag:l1,shadow_vert:c1,shadow_frag:u1,sprite_vert:f1,sprite_frag:h1},Ae={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},er={basic:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:Pn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:Pn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:Pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:Pn([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:Pn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:Pn([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:Pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:Pn([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:Pn([Ae.common,Ae.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:Pn([Ae.lights,Ae.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};er.physical={uniforms:Pn([er.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const gc={r:0,b:0,g:0},ws=new dr,d1=new ot;function p1(i,e,t,n,r,s,o){const a=new je(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function _(M){let v=!1;const E=g(M);E===null?p(a,l):E&&E.isColor&&(p(E,1),v=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===Iu)?(u===void 0&&(u=new qn(new kl(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:ea(er.backgroundCube.uniforms),vertexShader:er.backgroundCube.vertexShader,fragmentShader:er.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ws.copy(v.backgroundRotation),ws.x*=-1,ws.y*=-1,ws.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ws.y*=-1,ws.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(d1.makeRotationFromEuler(ws)),u.material.toneMapped=mt.getTransfer(E.colorSpace)!==bt,(f!==E||h!==E.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=E,h=E.version,d=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new qn(new Nu(2,2),new Kn({name:"BackgroundMaterial",uniforms:ea(er.background.uniforms),vertexShader:er.background.vertexShader,fragmentShader:er.background.fragmentShader,side:kr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=mt.getTransfer(E.colorSpace)!==bt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||h!==E.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=E,h=E.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,v){M.getRGB(gc,k0(i)),n.buffers.color.setClear(gc.r,gc.g,gc.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:_,addToRenderList:m,dispose:b}}function m1(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,o=!1;function a(S,I,F,Y,$){let j=!1;const W=f(Y,F,I);s!==W&&(s=W,c(s.object)),j=d(S,Y,F,$),j&&g(S,Y,F,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(S,I,F,Y),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,I,F){const Y=F.wireframe===!0;let $=n[S.id];$===void 0&&($={},n[S.id]=$);let j=$[I.id];j===void 0&&(j={},$[I.id]=j);let W=j[Y];return W===void 0&&(W=h(l()),j[Y]=W),W}function h(S){const I=[],F=[],Y=[];for(let $=0;$<t;$++)I[$]=0,F[$]=0,Y[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:Y,object:S,attributes:{},index:null}}function d(S,I,F,Y){const $=s.attributes,j=I.attributes;let W=0;const V=F.getAttributes();for(const B in V)if(V[B].location>=0){const U=$[B];let ge=j[B];if(ge===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(ge=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(ge=S.instanceColor)),U===void 0||U.attribute!==ge||ge&&U.data!==ge.data)return!0;W++}return s.attributesNum!==W||s.index!==Y}function g(S,I,F,Y){const $={},j=I.attributes;let W=0;const V=F.getAttributes();for(const B in V)if(V[B].location>=0){let U=j[B];U===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(U=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(U=S.instanceColor));const ge={};ge.attribute=U,U&&U.data&&(ge.data=U.data),$[B]=ge,W++}s.attributes=$,s.attributesNum=W,s.index=Y}function _(){const S=s.newAttributes;for(let I=0,F=S.length;I<F;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){const F=s.newAttributes,Y=s.enabledAttributes,$=s.attributeDivisors;F[S]=1,Y[S]===0&&(i.enableVertexAttribArray(S),Y[S]=1),$[S]!==I&&(i.vertexAttribDivisor(S,I),$[S]=I)}function b(){const S=s.newAttributes,I=s.enabledAttributes;for(let F=0,Y=I.length;F<Y;F++)I[F]!==S[F]&&(i.disableVertexAttribArray(F),I[F]=0)}function M(S,I,F,Y,$,j,W){W===!0?i.vertexAttribIPointer(S,I,F,$,j):i.vertexAttribPointer(S,I,F,Y,$,j)}function v(S,I,F,Y){_();const $=Y.attributes,j=F.getAttributes(),W=I.defaultAttributeValues;for(const V in j){const B=j[V];if(B.location>=0){let ae=$[V];if(ae===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),ae!==void 0){const U=ae.normalized,ge=ae.itemSize,Oe=e.get(ae);if(Oe===void 0)continue;const Qe=Oe.buffer,Ke=Oe.type,qe=Oe.bytesPerElement,ne=Ke===i.INT||Ke===i.UNSIGNED_INT||ae.gpuType===$d;if(ae.isInterleavedBufferAttribute){const se=ae.data,Me=se.stride,Ie=ae.offset;if(se.isInstancedInterleavedBuffer){for(let Ce=0;Ce<B.locationSize;Ce++)p(B.location+Ce,se.meshPerAttribute);S.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ce=0;Ce<B.locationSize;Ce++)m(B.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Ce=0;Ce<B.locationSize;Ce++)M(B.location+Ce,ge/B.locationSize,Ke,U,Me*qe,(Ie+ge/B.locationSize*Ce)*qe,ne)}else{if(ae.isInstancedBufferAttribute){for(let se=0;se<B.locationSize;se++)p(B.location+se,ae.meshPerAttribute);S.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let se=0;se<B.locationSize;se++)m(B.location+se);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let se=0;se<B.locationSize;se++)M(B.location+se,ge/B.locationSize,Ke,U,ge*qe,ge/B.locationSize*se*qe,ne)}}else if(W!==void 0){const U=W[V];if(U!==void 0)switch(U.length){case 2:i.vertexAttrib2fv(B.location,U);break;case 3:i.vertexAttrib3fv(B.location,U);break;case 4:i.vertexAttrib4fv(B.location,U);break;default:i.vertexAttrib1fv(B.location,U)}}}}b()}function E(){D();for(const S in n){const I=n[S];for(const F in I){const Y=I[F];for(const $ in Y)u(Y[$].object),delete Y[$];delete I[F]}delete n[S]}}function C(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const F in I){const Y=I[F];for(const $ in Y)u(Y[$].object),delete Y[$];delete I[F]}delete n[S.id]}function A(S){for(const I in n){const F=n[I];if(F[S.id]===void 0)continue;const Y=F[S.id];for(const $ in Y)u(Y[$].object),delete Y[$];delete F[S.id]}}function D(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:T,dispose:E,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function g1(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _1(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Ci&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const D=A===Ur&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==hr&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==zi&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:E,maxSamples:C}}function v1(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Ls,a=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,M=b*4;let v=p.clippingState||null;l.value=v,v=u(g,h,M,d);for(let E=0;E!==M;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==_;++M,v+=4)o.copy(f[M]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function x1(i){let e=new WeakMap;function t(o,a){return a===Mh?o.mapping=$o:a===Th&&(o.mapping=Zo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mh||a===Th)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new FT(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Po=4,og=[.125,.215,.35,.446,.526,.582],Bs=20,Pf=new Fu,ag=new je;let Df=null,Lf=0,If=0,Uf=!1;const Is=(1+Math.sqrt(5))/2,Mo=1/Is,lg=[new H(-Is,Mo,0),new H(Is,Mo,0),new H(-Mo,0,Is),new H(Mo,0,Is),new H(0,Is,-Mo),new H(0,Is,Mo),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],y1=new H;class cg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=y1}=s;Df=this._renderer.getRenderTarget(),Lf=this._renderer.getActiveCubeFace(),If=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Df,Lf,If),this._renderer.xr.enabled=Uf,e.scissorTest=!1,_c(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$o||e.mapping===Zo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Df=this._renderer.getRenderTarget(),Lf=this._renderer.getActiveCubeFace(),If=this._renderer.getActiveMipmapLevel(),Uf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:Ur,format:Ci,colorSpace:Gn,depthBuffer:!1},r=ug(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ug(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=S1(s)),this._blurMaterial=M1(s,e,t)}return r}_compileMaterial(e){const t=new qn(this._lodPlanes[0],e);this._renderer.compile(t,Pf)}_sceneToCubeUV(e,t,n,r,s){const l=new Nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(ag),f.toneMapping=cs,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const _=new is({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1}),m=new qn(new kl,_);let p=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,p=!0):(_.color.copy(ag),p=!0);for(let M=0;M<6;M++){const v=M%3;v===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):v===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const E=this._cubeSize;_c(r,v*E,M>2?E:0,E,E),f.setRenderTarget(r),p&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===$o||e.mapping===Zo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new qn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;_c(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Pf)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=lg[(r-s-1)%lg.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new qn(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Bs-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Bs;m>Bs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bs}`);const p=[];let b=0;for(let A=0;A<Bs;++A){const D=A/_,T=Math.exp(-D*D/2);p.push(T),A===0?b+=T:A<m&&(b+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:M}=this;h.dTheta.value=g,h.mipInt.value=M-n;const v=this._sizeLods[r],E=3*v*(r>M-Po?r-M+Po:0),C=4*(this._cubeSize-v);_c(t,E,C,3*v,2*v),l.setRenderTarget(t),l.render(f,Pf)}}function S1(i){const e=[],t=[],n=[];let r=i;const s=i-Po+1+og.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Po?l=og[o-i+Po-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),M=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){const A=C%3*2/3-1,D=C>2?0:-1,T=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];b.set(T,_*g*C),M.set(h,m*g*C);const S=[C,C,C,C,C,C];v.set(S,p*g*C)}const E=new Xi;E.setAttribute("position",new Hn(b,_)),E.setAttribute("uv",new Hn(M,m)),E.setAttribute("faceIndex",new Hn(v,p)),e.push(E),r>Po&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ug(i,e,t){const n=new Gi(i,e,t);return n.texture.mapping=Iu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _c(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function M1(i,e,t){const n=new Float32Array(Bs),r=new H(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:Bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ir,depthTest:!1,depthWrite:!1})}function fg(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ir,depthTest:!1,depthWrite:!1})}function hg(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ir,depthTest:!1,depthWrite:!1})}function dp(){return`

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
	`}function T1(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mh||l===Th,u=l===$o||l===Zo;if(c||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new cg(i)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new cg(i)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function b1(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&El("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function E1(i,e,t,n){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let M=0,v=b.length;M<v;M+=3){const E=b[M+0],C=b[M+1],A=b[M+2];h.push(E,C,C,A,A,E)}}else if(g!==void 0){const b=g.array;_=g.version;for(let M=0,v=b.length/3-1;M<v;M+=3){const E=M+0,C=M+1,A=M+2;h.push(E,C,C,A,A,E)}}else return;const m=new(I0(h)?B0:F0)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function w1(i,e,t){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*o),t.update(d,n,1)}function c(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function A1(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function R1(i,e,t){const n=new WeakMap,r=new vt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let S=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,C=1;E>e.maxTextureSize&&(C=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const A=new Float32Array(E*C*4*f),D=new U0(A,E,C,f);D.type=zi,D.needsUpdate=!0;const T=v*4;for(let I=0;I<f;I++){const F=p[I],Y=b[I],$=M[I],j=E*C*4*I;for(let W=0;W<F.count;W++){const V=W*T;g===!0&&(r.fromBufferAttribute(F,W),A[j+V+0]=r.x,A[j+V+1]=r.y,A[j+V+2]=r.z,A[j+V+3]=0),_===!0&&(r.fromBufferAttribute(Y,W),A[j+V+4]=r.x,A[j+V+5]=r.y,A[j+V+6]=r.z,A[j+V+7]=0),m===!0&&(r.fromBufferAttribute($,W),A[j+V+8]=r.x,A[j+V+9]=r.y,A[j+V+10]=r.z,A[j+V+11]=$.itemSize===4?r.w:1)}}h={count:f,texture:D,size:new Ze(E,C)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function C1(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const J0=new un,dg=new Y0(1,1),Q0=new U0,ev=new ST,tv=new H0,pg=[],mg=[],gg=new Float32Array(16),_g=new Float32Array(9),vg=new Float32Array(4);function _a(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=pg[r];if(s===void 0&&(s=new Float32Array(r),pg[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function sn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bu(i,e){let t=mg[e];t===void 0&&(t=new Int32Array(e),mg[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function P1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function D1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function L1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function I1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function U1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;vg.set(n),i.uniformMatrix2fv(this.addr,!1,vg),on(t,n)}}function N1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;_g.set(n),i.uniformMatrix3fv(this.addr,!1,_g),on(t,n)}}function O1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;gg.set(n),i.uniformMatrix4fv(this.addr,!1,gg),on(t,n)}}function F1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function B1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function k1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function z1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function H1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function V1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function G1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function W1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function X1(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(dg.compareFunction=L0,s=dg):s=J0,t.setTexture2D(e||s,r)}function Y1(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ev,r)}function q1(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||tv,r)}function K1(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Q0,r)}function j1(i){switch(i){case 5126:return P1;case 35664:return D1;case 35665:return L1;case 35666:return I1;case 35674:return U1;case 35675:return N1;case 35676:return O1;case 5124:case 35670:return F1;case 35667:case 35671:return B1;case 35668:case 35672:return k1;case 35669:case 35673:return z1;case 5125:return H1;case 36294:return V1;case 36295:return G1;case 36296:return W1;case 35678:case 36198:case 36298:case 36306:case 35682:return X1;case 35679:case 36299:case 36307:return Y1;case 35680:case 36300:case 36308:case 36293:return q1;case 36289:case 36303:case 36311:case 36292:return K1}}function $1(i,e){i.uniform1fv(this.addr,e)}function Z1(i,e){const t=_a(e,this.size,2);i.uniform2fv(this.addr,t)}function J1(i,e){const t=_a(e,this.size,3);i.uniform3fv(this.addr,t)}function Q1(i,e){const t=_a(e,this.size,4);i.uniform4fv(this.addr,t)}function eA(i,e){const t=_a(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tA(i,e){const t=_a(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nA(i,e){const t=_a(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function iA(i,e){i.uniform1iv(this.addr,e)}function rA(i,e){i.uniform2iv(this.addr,e)}function sA(i,e){i.uniform3iv(this.addr,e)}function oA(i,e){i.uniform4iv(this.addr,e)}function aA(i,e){i.uniform1uiv(this.addr,e)}function lA(i,e){i.uniform2uiv(this.addr,e)}function cA(i,e){i.uniform3uiv(this.addr,e)}function uA(i,e){i.uniform4uiv(this.addr,e)}function fA(i,e,t){const n=this.cache,r=e.length,s=Bu(t,r);sn(n,s)||(i.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||J0,s[o])}function hA(i,e,t){const n=this.cache,r=e.length,s=Bu(t,r);sn(n,s)||(i.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ev,s[o])}function dA(i,e,t){const n=this.cache,r=e.length,s=Bu(t,r);sn(n,s)||(i.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||tv,s[o])}function pA(i,e,t){const n=this.cache,r=e.length,s=Bu(t,r);sn(n,s)||(i.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Q0,s[o])}function mA(i){switch(i){case 5126:return $1;case 35664:return Z1;case 35665:return J1;case 35666:return Q1;case 35674:return eA;case 35675:return tA;case 35676:return nA;case 5124:case 35670:return iA;case 35667:case 35671:return rA;case 35668:case 35672:return sA;case 35669:case 35673:return oA;case 5125:return aA;case 36294:return lA;case 36295:return cA;case 36296:return uA;case 35678:case 36198:case 36298:case 36306:case 35682:return fA;case 35679:case 36299:case 36307:return hA;case 35680:case 36300:case 36308:case 36293:return dA;case 36289:case 36303:case 36311:case 36292:return pA}}class gA{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=j1(t.type)}}class _A{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mA(t.type)}}class vA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Nf=/(\w+)(\])?(\[|\.)?/g;function xg(i,e){i.seq.push(e),i.map[e.id]=e}function xA(i,e,t){const n=i.name,r=n.length;for(Nf.lastIndex=0;;){const s=Nf.exec(n),o=Nf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){xg(t,c===void 0?new gA(a,i,e):new _A(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new vA(a),xg(t,f)),t=f}}}class Hc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);xA(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function yg(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const yA=37297;let SA=0;function MA(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Sg=new tt;function TA(i){mt._getMatrix(Sg,mt.workingColorSpace,i);const e=`mat3( ${Sg.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(i)){case ou:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Mg(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+MA(i.getShaderSource(e),a)}else return s}function bA(i,e){const t=TA(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function EA(i,e){let t;switch(e){case LM:t="Linear";break;case IM:t="Reinhard";break;case UM:t="Cineon";break;case NM:t="ACESFilmic";break;case FM:t="AgX";break;case y0:t="Neutral";break;case OM:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vc=new H;function wA(){mt.getLuminanceCoefficients(vc);const i=vc.x.toFixed(4),e=vc.y.toFixed(4),t=vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AA(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Na).join(`
`)}function RA(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function CA(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Na(i){return i!==""}function Tg(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bg(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PA=/^[ \t]*#include +<([\w\d./]+)>/gm;function nd(i){return i.replace(PA,LA)}const DA=new Map;function LA(i,e){let t=rt[e];if(t===void 0){const n=DA.get(e);if(n!==void 0)t=rt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return nd(t)}const IA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eg(i){return i.replace(IA,UA)}function UA(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function wg(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function NA(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===v0?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===fM?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===br&&(e="SHADOWMAP_TYPE_VSM"),e}function OA(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case $o:case Zo:e="ENVMAP_TYPE_CUBE";break;case Iu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FA(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Zo:e="ENVMAP_MODE_REFRACTION";break}return e}function BA(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case x0:e="ENVMAP_BLENDING_MULTIPLY";break;case PM:e="ENVMAP_BLENDING_MIX";break;case DM:e="ENVMAP_BLENDING_ADD";break}return e}function kA(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zA(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=NA(t),c=OA(t),u=FA(t),f=BA(t),h=kA(t),d=AA(t),g=RA(s),_=r.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Na).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Na).join(`
`),p.length>0&&(p+=`
`)):(m=[wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Na).join(`
`),p=[wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==cs?"#define TONE_MAPPING":"",t.toneMapping!==cs?rt.tonemapping_pars_fragment:"",t.toneMapping!==cs?EA("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,bA("linearToOutputTexel",t.outputColorSpace),wA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Na).join(`
`)),o=nd(o),o=Tg(o,t),o=bg(o,t),a=nd(a),a=Tg(a,t),a=bg(a,t),o=Eg(o),a=Eg(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+m+o,v=b+p+a,E=yg(r,r.VERTEX_SHADER,M),C=yg(r,r.FRAGMENT_SHADER,v);r.attachShader(_,E),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(I){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(_)||"",Y=r.getShaderInfoLog(E)||"",$=r.getShaderInfoLog(C)||"",j=F.trim(),W=Y.trim(),V=$.trim();let B=!0,ae=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,E,C);else{const U=Mg(r,E,"vertex"),ge=Mg(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+j+`
`+U+`
`+ge)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(W===""||V==="")&&(ae=!1);ae&&(I.diagnostics={runnable:B,programLog:j,vertexShader:{log:W,prefix:m},fragmentShader:{log:V,prefix:p}})}r.deleteShader(E),r.deleteShader(C),D=new Hc(r,_),T=CA(r,_)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,yA)),S},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SA++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=C,this}let HA=0;class VA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new GA(e),t.set(e,n)),n}}class GA{constructor(e){this.id=HA++,this.code=e,this.usedTimes=0}}function WA(i,e,t,n,r,s,o){const a=new N0,l=new VA,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,S,I,F,Y){const $=F.fog,j=Y.geometry,W=T.isMeshStandardMaterial?F.environment:null,V=(T.isMeshStandardMaterial?t:e).get(T.envMap||W),B=V&&V.mapping===Iu?V.image.height:null,ae=g[T.type];T.precision!==null&&(d=r.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const U=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ge=U!==void 0?U.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let Qe,Ke,qe,ne;if(ae){const Re=er[ae];Qe=Re.vertexShader,Ke=Re.fragmentShader}else Qe=T.vertexShader,Ke=T.fragmentShader,l.update(T),qe=l.getVertexShaderID(T),ne=l.getFragmentShaderID(T);const se=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ie=Y.isInstancedMesh===!0,Ce=Y.isBatchedMesh===!0,We=!!T.map,L=!!T.matcap,x=!!V,G=!!T.aoMap,Z=!!T.lightMap,K=!!T.bumpMap,P=!!T.normalMap,le=!!T.displacementMap,J=!!T.emissiveMap,re=!!T.metalnessMap,ie=!!T.roughnessMap,Se=T.anisotropy>0,R=T.clearcoat>0,y=T.dispersion>0,O=T.iridescence>0,q=T.sheen>0,ee=T.transmission>0,X=Se&&!!T.anisotropyMap,ve=R&&!!T.clearcoatMap,ue=R&&!!T.clearcoatNormalMap,be=R&&!!T.clearcoatRoughnessMap,me=O&&!!T.iridescenceMap,he=O&&!!T.iridescenceThicknessMap,xe=q&&!!T.sheenColorMap,Pe=q&&!!T.sheenRoughnessMap,Ee=!!T.specularMap,_e=!!T.specularColorMap,Ge=!!T.specularIntensityMap,N=ee&&!!T.transmissionMap,de=ee&&!!T.thicknessMap,pe=!!T.gradientMap,we=!!T.alphaMap,fe=T.alphaTest>0,oe=!!T.alphaHash,Le=!!T.extensions;let Ve=cs;T.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ve=i.toneMapping);const gt={shaderID:ae,shaderType:T.type,shaderName:T.name,vertexShader:Qe,fragmentShader:Ke,defines:T.defines,customVertexShaderID:qe,customFragmentShaderID:ne,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:Ce,batchingColor:Ce&&Y._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&Y.instanceColor!==null,instancingMorph:Ie&&Y.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Gn,alphaToCoverage:!!T.alphaToCoverage,map:We,matcap:L,envMap:x,envMapMode:x&&V.mapping,envMapCubeUVHeight:B,aoMap:G,lightMap:Z,bumpMap:K,normalMap:P,displacementMap:h&&le,emissiveMap:J,normalMapObjectSpace:P&&T.normalMapType===GM,normalMapTangentSpace:P&&T.normalMapType===D0,metalnessMap:re,roughnessMap:ie,anisotropy:Se,anisotropyMap:X,clearcoat:R,clearcoatMap:ve,clearcoatNormalMap:ue,clearcoatRoughnessMap:be,dispersion:y,iridescence:O,iridescenceMap:me,iridescenceThicknessMap:he,sheen:q,sheenColorMap:xe,sheenRoughnessMap:Pe,specularMap:Ee,specularColorMap:_e,specularIntensityMap:Ge,transmission:ee,transmissionMap:N,thicknessMap:de,gradientMap:pe,opaque:T.transparent===!1&&T.blending===Fo&&T.alphaToCoverage===!1,alphaMap:we,alphaTest:fe,alphaHash:oe,combine:T.combine,mapUv:We&&_(T.map.channel),aoMapUv:G&&_(T.aoMap.channel),lightMapUv:Z&&_(T.lightMap.channel),bumpMapUv:K&&_(T.bumpMap.channel),normalMapUv:P&&_(T.normalMap.channel),displacementMapUv:le&&_(T.displacementMap.channel),emissiveMapUv:J&&_(T.emissiveMap.channel),metalnessMapUv:re&&_(T.metalnessMap.channel),roughnessMapUv:ie&&_(T.roughnessMap.channel),anisotropyMapUv:X&&_(T.anisotropyMap.channel),clearcoatMapUv:ve&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:ue&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:he&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(T.sheenRoughnessMap.channel),specularMapUv:Ee&&_(T.specularMap.channel),specularColorMapUv:_e&&_(T.specularColorMap.channel),specularIntensityMapUv:Ge&&_(T.specularIntensityMap.channel),transmissionMapUv:N&&_(T.transmissionMap.channel),thicknessMapUv:de&&_(T.thicknessMap.channel),alphaMapUv:we&&_(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(P||Se),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!j.attributes.uv&&(We||we),fog:!!$,useFog:T.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:Y.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Oe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:We&&T.map.isVideoTexture===!0&&mt.getTransfer(T.map.colorSpace)===bt,decodeVideoTextureEmissive:J&&T.emissiveMap.isVideoTexture===!0&&mt.getTransfer(T.emissiveMap.colorSpace)===bt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===tr,flipSided:T.side===jn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Le&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&T.extensions.multiDraw===!0||Ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function p(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)S.push(I),S.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(b(S,T),M(S,T),S.push(i.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function b(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function M(T,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),T.push(a.mask)}function v(T){const S=g[T.type];let I;if(S){const F=er[S];I=lu.clone(F.uniforms)}else I=T.uniforms;return I}function E(T,S){let I;for(let F=0,Y=u.length;F<Y;F++){const $=u[F];if($.cacheKey===S){I=$,++I.usedTimes;break}}return I===void 0&&(I=new zA(i,S,T,s),u.push(I)),I}function C(T){if(--T.usedTimes===0){const S=u.indexOf(T);u[S]=u[u.length-1],u.pop(),T.destroy()}}function A(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:C,releaseShaderCache:A,programs:u,dispose:D}}function XA(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function YA(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ag(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rg(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||YA),n.length>1&&n.sort(h||Ag),r.length>1&&r.sort(h||Ag)}function u(){for(let f=e,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function qA(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Rg,i.set(n,[o])):r>=s.length?(o=new Rg,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function KA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new je};break;case"SpotLight":t={position:new H,direction:new H,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function jA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let $A=0;function ZA(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function JA(i){const e=new KA,t=jA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const r=new H,s=new ot,o=new ot;function a(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,M=0,v=0,E=0,C=0,A=0;c.sort(ZA);for(let T=0,S=c.length;T<S;T++){const I=c[T],F=I.color,Y=I.intensity,$=I.distance,j=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*Y,f+=F.g*Y,h+=F.b*Y;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],Y);A++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.directionalShadow[d]=B,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=I.shadow.matrix,b++}n.directional[d]=W,d++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(F).multiplyScalar(Y),W.distance=$,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[_]=W;const V=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,V.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[_]=V.matrix,I.castShadow){const B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.spotShadow[_]=B,n.spotShadowMap[_]=j,v++}_++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(F).multiplyScalar(Y),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const V=I.shadow,B=t.get(I);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,B.shadowCameraNear=V.camera.near,B.shadowCameraFar=V.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=I.shadow.matrix,M++}n.point[g]=W,g++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(Y),W.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==b||D.numPointShadows!==M||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+E-C,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,D.directionalLength=d,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=b,D.numPointShadows=M,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=A,n.version=$A++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const M=c[p];if(M.isDirectionalLight){const v=n.directional[f];v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(M.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[h];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),h++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Cg(i){const e=new JA(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function QA(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Cg(i),e.set(r,[a])):s>=o.length?(a=new Cg(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const eR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tR=`uniform sampler2D shadow_pass;
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
}`;function nR(i,e,t){let n=new ap;const r=new Ze,s=new Ze,o=new vt,a=new JT({depthPacking:VM}),l=new QT,c={},u=t.maxTextureSize,f={[kr]:jn,[jn]:kr,[tr]:tr},h=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:eR,fragmentShader:tR}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Xi;g.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=v0;let p=this.type;this.render=function(C,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ir),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=p!==br&&this.type===br,$=p===br&&this.type!==br;for(let j=0,W=C.length;j<W;j++){const V=C[j],B=V.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const ae=B.getFrameExtents();if(r.multiply(ae),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,B.mapSize.y=s.y)),B.map===null||Y===!0||$===!0){const ge=this.type!==br?{minFilter:zn,magFilter:zn}:{};B.map!==null&&B.map.dispose(),B.map=new Gi(r.x,r.y,ge),B.map.texture.name=V.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const U=B.getViewportCount();for(let ge=0;ge<U;ge++){const Oe=B.getViewport(ge);o.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),F.viewport(o),B.updateMatrices(V,ge),n=B.getFrustum(),v(A,D,B.camera,V,this.type)}B.isPointLightShadow!==!0&&this.type===br&&b(B,D),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,S,I)};function b(C,A){const D=e.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gi(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,D,h,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,D,d,_,null)}function M(C,A,D,T){let S=null;const I=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)S=I;else if(S=D.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=S.uuid,Y=A.uuid;let $=c[F];$===void 0&&($={},c[F]=$);let j=$[Y];j===void 0&&(j=S.clone(),$[Y]=j,A.addEventListener("dispose",E)),S=j}if(S.visible=A.visible,S.wireframe=A.wireframe,T===br?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:f[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=i.properties.get(S);F.light=D}return S}function v(C,A,D,T,S){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===br)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const Y=e.update(C),$=C.material;if(Array.isArray($)){const j=Y.groups;for(let W=0,V=j.length;W<V;W++){const B=j[W],ae=$[B.materialIndex];if(ae&&ae.visible){const U=M(C,ae,T,S);C.onBeforeShadow(i,C,A,D,Y,U,B),i.renderBufferDirect(D,null,Y,U,C,B),C.onAfterShadow(i,C,A,D,Y,U,B)}}}else if($.visible){const j=M(C,$,T,S);C.onBeforeShadow(i,C,A,D,Y,j,null),i.renderBufferDirect(D,null,Y,j,C,null),C.onAfterShadow(i,C,A,D,Y,j,null)}}const F=C.children;for(let Y=0,$=F.length;Y<$;Y++)v(F[Y],A,D,T,S)}function E(C){C.target.removeEventListener("dispose",E);for(const D in c){const T=c[D],S=C.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const iR={[mh]:gh,[_h]:yh,[vh]:Sh,[jo]:xh,[gh]:mh,[yh]:_h,[Sh]:vh,[xh]:jo};function rR(i,e){function t(){let N=!1;const de=new vt;let pe=null;const we=new vt(0,0,0,0);return{setMask:function(fe){pe!==fe&&!N&&(i.colorMask(fe,fe,fe,fe),pe=fe)},setLocked:function(fe){N=fe},setClear:function(fe,oe,Le,Ve,gt){gt===!0&&(fe*=Ve,oe*=Ve,Le*=Ve),de.set(fe,oe,Le,Ve),we.equals(de)===!1&&(i.clearColor(fe,oe,Le,Ve),we.copy(de))},reset:function(){N=!1,pe=null,we.set(-1,0,0,0)}}}function n(){let N=!1,de=!1,pe=null,we=null,fe=null;return{setReversed:function(oe){if(de!==oe){const Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),de=oe;const Ve=fe;fe=null,this.setClear(Ve)}},getReversed:function(){return de},setTest:function(oe){oe?se(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(oe){pe!==oe&&!N&&(i.depthMask(oe),pe=oe)},setFunc:function(oe){if(de&&(oe=iR[oe]),we!==oe){switch(oe){case mh:i.depthFunc(i.NEVER);break;case gh:i.depthFunc(i.ALWAYS);break;case _h:i.depthFunc(i.LESS);break;case jo:i.depthFunc(i.LEQUAL);break;case vh:i.depthFunc(i.EQUAL);break;case xh:i.depthFunc(i.GEQUAL);break;case yh:i.depthFunc(i.GREATER);break;case Sh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=oe}},setLocked:function(oe){N=oe},setClear:function(oe){fe!==oe&&(de&&(oe=1-oe),i.clearDepth(oe),fe=oe)},reset:function(){N=!1,pe=null,we=null,fe=null,de=!1}}}function r(){let N=!1,de=null,pe=null,we=null,fe=null,oe=null,Le=null,Ve=null,gt=null;return{setTest:function(Re){N||(Re?se(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(Re){de!==Re&&!N&&(i.stencilMask(Re),de=Re)},setFunc:function(Re,Fe,Je){(pe!==Re||we!==Fe||fe!==Je)&&(i.stencilFunc(Re,Fe,Je),pe=Re,we=Fe,fe=Je)},setOp:function(Re,Fe,Je){(oe!==Re||Le!==Fe||Ve!==Je)&&(i.stencilOp(Re,Fe,Je),oe=Re,Le=Fe,Ve=Je)},setLocked:function(Re){N=Re},setClear:function(Re){gt!==Re&&(i.clearStencil(Re),gt=Re)},reset:function(){N=!1,de=null,pe=null,we=null,fe=null,oe=null,Le=null,Ve=null,gt=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,M=null,v=null,E=null,C=null,A=new je(0,0,0),D=0,T=!1,S=null,I=null,F=null,Y=null,$=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,V=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),W=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),W=V>=2);let ae=null,U={};const ge=i.getParameter(i.SCISSOR_BOX),Oe=i.getParameter(i.VIEWPORT),Qe=new vt().fromArray(ge),Ke=new vt().fromArray(Oe);function qe(N,de,pe,we){const fe=new Uint8Array(4),oe=i.createTexture();i.bindTexture(N,oe),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<pe;Le++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(de+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return oe}const ne={};ne[i.TEXTURE_2D]=qe(i.TEXTURE_2D,i.TEXTURE_2D,1),ne[i.TEXTURE_CUBE_MAP]=qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[i.TEXTURE_2D_ARRAY]=qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ne[i.TEXTURE_3D]=qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(jo),K(!1),P(pm),se(i.CULL_FACE),G(Ir);function se(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function Me(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Ie(N,de){return f[N]!==de?(i.bindFramebuffer(N,de),f[N]=de,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=de),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=de),!0):!1}function Ce(N,de){let pe=d,we=!1;if(N){pe=h.get(de),pe===void 0&&(pe=[],h.set(de,pe));const fe=N.textures;if(pe.length!==fe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Le=fe.length;oe<Le;oe++)pe[oe]=i.COLOR_ATTACHMENT0+oe;pe.length=fe.length,we=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,we=!0);we&&i.drawBuffers(pe)}function We(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const L={[Fs]:i.FUNC_ADD,[dM]:i.FUNC_SUBTRACT,[pM]:i.FUNC_REVERSE_SUBTRACT};L[mM]=i.MIN,L[gM]=i.MAX;const x={[_M]:i.ZERO,[vM]:i.ONE,[xM]:i.SRC_COLOR,[dh]:i.SRC_ALPHA,[EM]:i.SRC_ALPHA_SATURATE,[TM]:i.DST_COLOR,[SM]:i.DST_ALPHA,[yM]:i.ONE_MINUS_SRC_COLOR,[ph]:i.ONE_MINUS_SRC_ALPHA,[bM]:i.ONE_MINUS_DST_COLOR,[MM]:i.ONE_MINUS_DST_ALPHA,[wM]:i.CONSTANT_COLOR,[AM]:i.ONE_MINUS_CONSTANT_COLOR,[RM]:i.CONSTANT_ALPHA,[CM]:i.ONE_MINUS_CONSTANT_ALPHA};function G(N,de,pe,we,fe,oe,Le,Ve,gt,Re){if(N===Ir){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(se(i.BLEND),_=!0),N!==hM){if(N!==m||Re!==T){if((p!==Fs||v!==Fs)&&(i.blendEquation(i.FUNC_ADD),p=Fs,v=Fs),Re)switch(N){case Fo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hh:i.blendFunc(i.ONE,i.ONE);break;case mm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gm:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Fo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case mm:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gm:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,M=null,E=null,C=null,A.set(0,0,0),D=0,m=N,T=Re}return}fe=fe||de,oe=oe||pe,Le=Le||we,(de!==p||fe!==v)&&(i.blendEquationSeparate(L[de],L[fe]),p=de,v=fe),(pe!==b||we!==M||oe!==E||Le!==C)&&(i.blendFuncSeparate(x[pe],x[we],x[oe],x[Le]),b=pe,M=we,E=oe,C=Le),(Ve.equals(A)===!1||gt!==D)&&(i.blendColor(Ve.r,Ve.g,Ve.b,gt),A.copy(Ve),D=gt),m=N,T=!1}function Z(N,de){N.side===tr?Me(i.CULL_FACE):se(i.CULL_FACE);let pe=N.side===jn;de&&(pe=!pe),K(pe),N.blending===Fo&&N.transparent===!1?G(Ir):G(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const we=N.stencilWrite;a.setTest(we),we&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),J(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(N){S!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),S=N)}function P(N){N!==cM?(se(i.CULL_FACE),N!==I&&(N===pm?i.cullFace(i.BACK):N===uM?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),I=N}function le(N){N!==F&&(W&&i.lineWidth(N),F=N)}function J(N,de,pe){N?(se(i.POLYGON_OFFSET_FILL),(Y!==de||$!==pe)&&(i.polygonOffset(de,pe),Y=de,$=pe)):Me(i.POLYGON_OFFSET_FILL)}function re(N){N?se(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function ie(N){N===void 0&&(N=i.TEXTURE0+j-1),ae!==N&&(i.activeTexture(N),ae=N)}function Se(N,de,pe){pe===void 0&&(ae===null?pe=i.TEXTURE0+j-1:pe=ae);let we=U[pe];we===void 0&&(we={type:void 0,texture:void 0},U[pe]=we),(we.type!==N||we.texture!==de)&&(ae!==pe&&(i.activeTexture(pe),ae=pe),i.bindTexture(N,de||ne[N]),we.type=N,we.texture=de)}function R(){const N=U[ae];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(N){Qe.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Qe.copy(N))}function Pe(N){Ke.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ke.copy(N))}function Ee(N,de){let pe=c.get(de);pe===void 0&&(pe=new WeakMap,c.set(de,pe));let we=pe.get(N);we===void 0&&(we=i.getUniformBlockIndex(de,N.name),pe.set(N,we))}function _e(N,de){const we=c.get(de).get(N);l.get(de)!==we&&(i.uniformBlockBinding(de,we,N.__bindingPointIndex),l.set(de,we))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ae=null,U={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,M=null,v=null,E=null,C=null,A=new je(0,0,0),D=0,T=!1,S=null,I=null,F=null,Y=null,$=null,Qe.set(0,0,i.canvas.width,i.canvas.height),Ke.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Me,bindFramebuffer:Ie,drawBuffers:Ce,useProgram:We,setBlending:G,setMaterial:Z,setFlipSided:K,setCullFace:P,setLineWidth:le,setPolygonOffset:J,setScissorTest:re,activeTexture:ie,bindTexture:Se,unbindTexture:R,compressedTexImage2D:y,compressedTexImage3D:O,texImage2D:me,texImage3D:he,updateUBOMapping:Ee,uniformBlockBinding:_e,texStorage2D:ue,texStorage3D:be,texSubImage2D:q,texSubImage3D:ee,compressedTexSubImage2D:X,compressedTexSubImage3D:ve,scissor:xe,viewport:Pe,reset:Ge}}function sR(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,y){return d?new OffscreenCanvas(R,y):bl("canvas")}function _(R,y,O){let q=1;const ee=Se(R);if((ee.width>O||ee.height>O)&&(q=O/Math.max(ee.width,ee.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const X=Math.floor(q*ee.width),ve=Math.floor(q*ee.height);f===void 0&&(f=g(X,ve));const ue=y?g(X,ve):f;return ue.width=X,ue.height=ve,ue.getContext("2d").drawImage(R,0,0,X,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+X+"x"+ve+")."),ue}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,y,O,q,ee=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let X=y;if(y===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8)),y===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),y===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8)),y===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),y===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),y===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),y===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),y===i.RGBA){const ve=ee?ou:mt.getTransfer(q);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=ve===bt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(R,y){let O;return R?y===null||y===Zs||y===xl?O=i.DEPTH24_STENCIL8:y===zi?O=i.DEPTH32F_STENCIL8:y===vl&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Zs||y===xl?O=i.DEPTH_COMPONENT24:y===zi?O=i.DEPTH_COMPONENT32F:y===vl&&(O=i.DEPTH_COMPONENT16),O}function E(R,y){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==zn&&R.minFilter!==mi?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function C(R){const y=R.target;y.removeEventListener("dispose",C),D(y),y.isVideoTexture&&u.delete(y)}function A(R){const y=R.target;y.removeEventListener("dispose",A),S(y)}function D(R){const y=n.get(R);if(y.__webglInit===void 0)return;const O=R.source,q=h.get(O);if(q){const ee=q[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(R),Object.keys(q).length===0&&h.delete(O)}n.remove(R)}function T(R){const y=n.get(R);i.deleteTexture(y.__webglTexture);const O=R.source,q=h.get(O);delete q[y.__cacheKey],o.memory.textures--}function S(R){const y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let ee=0;ee<y.__webglFramebuffer[q].length;ee++)i.deleteFramebuffer(y.__webglFramebuffer[q][ee]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const O=R.textures;for(let q=0,ee=O.length;q<ee;q++){const X=n.get(O[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(O[q])}n.remove(R)}let I=0;function F(){I=0}function Y(){const R=I;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),I+=1,R}function $(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function j(R,y){const O=n.get(R);if(R.isVideoTexture&&re(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const q=R.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(O,R,y);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+y)}function W(R,y){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){ne(O,R,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+y)}function V(R,y){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){ne(O,R,y);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+y)}function B(R,y){const O=n.get(R);if(R.version>0&&O.__version!==R.version){se(O,R,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+y)}const ae={[Jo]:i.REPEAT,[ns]:i.CLAMP_TO_EDGE,[su]:i.MIRRORED_REPEAT},U={[zn]:i.NEAREST,[M0]:i.NEAREST_MIPMAP_NEAREST,[Ua]:i.NEAREST_MIPMAP_LINEAR,[mi]:i.LINEAR,[Oc]:i.LINEAR_MIPMAP_NEAREST,[Pr]:i.LINEAR_MIPMAP_LINEAR},ge={[WM]:i.NEVER,[$M]:i.ALWAYS,[XM]:i.LESS,[L0]:i.LEQUAL,[YM]:i.EQUAL,[jM]:i.GEQUAL,[qM]:i.GREATER,[KM]:i.NOTEQUAL};function Oe(R,y){if(y.type===zi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===mi||y.magFilter===Oc||y.magFilter===Ua||y.magFilter===Pr||y.minFilter===mi||y.minFilter===Oc||y.minFilter===Ua||y.minFilter===Pr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ae[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ae[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ae[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,U[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,U[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ge[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===zn||y.minFilter!==Ua&&y.minFilter!==Pr||y.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Qe(R,y){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",C));const q=y.source;let ee=h.get(q);ee===void 0&&(ee={},h.set(q,ee));const X=$(y);if(X!==R.__cacheKey){ee[X]===void 0&&(ee[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ee[X].usedTimes++;const ve=ee[R.__cacheKey];ve!==void 0&&(ee[R.__cacheKey].usedTimes--,ve.usedTimes===0&&T(y)),R.__cacheKey=X,R.__webglTexture=ee[X].texture}return O}function Ke(R,y,O){return Math.floor(Math.floor(R/O)/y)}function qe(R,y,O,q){const X=R.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,O,q,y.data);else{X.sort((he,xe)=>he.start-xe.start);let ve=0;for(let he=1;he<X.length;he++){const xe=X[ve],Pe=X[he],Ee=xe.start+xe.count,_e=Ke(Pe.start,y.width,4),Ge=Ke(xe.start,y.width,4);Pe.start<=Ee+1&&_e===Ge&&Ke(Pe.start+Pe.count-1,y.width,4)===_e?xe.count=Math.max(xe.count,Pe.start+Pe.count-xe.start):(++ve,X[ve]=Pe)}X.length=ve+1;const ue=i.getParameter(i.UNPACK_ROW_LENGTH),be=i.getParameter(i.UNPACK_SKIP_PIXELS),me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let he=0,xe=X.length;he<xe;he++){const Pe=X[he],Ee=Math.floor(Pe.start/4),_e=Math.ceil(Pe.count/4),Ge=Ee%y.width,N=Math.floor(Ee/y.width),de=_e,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ge,N,de,pe,O,q,y.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ue),i.pixelStorei(i.UNPACK_SKIP_PIXELS,be),i.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function ne(R,y,O){let q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=i.TEXTURE_3D);const ee=Qe(R,y),X=y.source;t.bindTexture(q,R.__webglTexture,i.TEXTURE0+O);const ve=n.get(X);if(X.version!==ve.__version||ee===!0){t.activeTexture(i.TEXTURE0+O);const ue=mt.getPrimaries(mt.workingColorSpace),be=y.colorSpace===ts?null:mt.getPrimaries(y.colorSpace),me=y.colorSpace===ts||ue===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let he=_(y.image,!1,r.maxTextureSize);he=ie(y,he);const xe=s.convert(y.format,y.colorSpace),Pe=s.convert(y.type);let Ee=M(y.internalFormat,xe,Pe,y.colorSpace,y.isVideoTexture);Oe(q,y);let _e;const Ge=y.mipmaps,N=y.isVideoTexture!==!0,de=ve.__version===void 0||ee===!0,pe=X.dataReady,we=E(y,he);if(y.isDepthTexture)Ee=v(y.format===Sl,y.type),de&&(N?t.texStorage2D(i.TEXTURE_2D,1,Ee,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,xe,Pe,null));else if(y.isDataTexture)if(Ge.length>0){N&&de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,xe,Pe,_e.data);y.generateMipmaps=!1}else N?(de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height),pe&&qe(y,he,xe,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,xe,Pe,he.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){N&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,Ge[0].width,Ge[0].height,he.depth);for(let fe=0,oe=Ge.length;fe<oe;fe++)if(_e=Ge[fe],y.format!==Ci)if(xe!==null)if(N){if(pe)if(y.layerUpdates.size>0){const Le=sg(_e.width,_e.height,y.format,y.type);for(const Ve of y.layerUpdates){const gt=_e.data.subarray(Ve*Le/_e.data.BYTES_PER_ELEMENT,(Ve+1)*Le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Ve,_e.width,_e.height,1,xe,gt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,_e.width,_e.height,he.depth,xe,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,Ee,_e.width,_e.height,he.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,_e.width,_e.height,he.depth,xe,Pe,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,Ee,_e.width,_e.height,he.depth,0,xe,Pe,_e.data)}else{N&&de&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],y.format!==Ci?xe!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,_e.width,_e.height,xe,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,fe,Ee,_e.width,_e.height,0,xe,Pe,_e.data)}else if(y.isDataArrayTexture)if(N){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,he.width,he.height,he.depth),pe)if(y.layerUpdates.size>0){const fe=sg(he.width,he.height,y.format,y.type);for(const oe of y.layerUpdates){const Le=he.data.subarray(oe*fe/he.data.BYTES_PER_ELEMENT,(oe+1)*fe/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,he.width,he.height,1,xe,Pe,Le)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,xe,Pe,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,he.width,he.height,he.depth,0,xe,Pe,he.data);else if(y.isData3DTexture)N?(de&&t.texStorage3D(i.TEXTURE_3D,we,Ee,he.width,he.height,he.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,xe,Pe,he.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,he.width,he.height,he.depth,0,xe,Pe,he.data);else if(y.isFramebufferTexture){if(de)if(N)t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height);else{let fe=he.width,oe=he.height;for(let Le=0;Le<we;Le++)t.texImage2D(i.TEXTURE_2D,Le,Ee,fe,oe,0,xe,Pe,null),fe>>=1,oe>>=1}}else if(Ge.length>0){if(N&&de){const fe=Se(Ge[0]);t.texStorage2D(i.TEXTURE_2D,we,Ee,fe.width,fe.height)}for(let fe=0,oe=Ge.length;fe<oe;fe++)_e=Ge[fe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,xe,Pe,_e):t.texImage2D(i.TEXTURE_2D,fe,Ee,xe,Pe,_e);y.generateMipmaps=!1}else if(N){if(de){const fe=Se(he);t.texStorage2D(i.TEXTURE_2D,we,Ee,fe.width,fe.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Pe,he)}else t.texImage2D(i.TEXTURE_2D,0,Ee,xe,Pe,he);m(y)&&p(q),ve.__version=X.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function se(R,y,O){if(y.image.length!==6)return;const q=Qe(R,y),ee=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+O);const X=n.get(ee);if(ee.version!==X.__version||q===!0){t.activeTexture(i.TEXTURE0+O);const ve=mt.getPrimaries(mt.workingColorSpace),ue=y.colorSpace===ts?null:mt.getPrimaries(y.colorSpace),be=y.colorSpace===ts||ve===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,he=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!me&&!he?xe[oe]=_(y.image[oe],!0,r.maxCubemapSize):xe[oe]=he?y.image[oe].image:y.image[oe],xe[oe]=ie(y,xe[oe]);const Pe=xe[0],Ee=s.convert(y.format,y.colorSpace),_e=s.convert(y.type),Ge=M(y.internalFormat,Ee,_e,y.colorSpace),N=y.isVideoTexture!==!0,de=X.__version===void 0||q===!0,pe=ee.dataReady;let we=E(y,Pe);Oe(i.TEXTURE_CUBE_MAP,y);let fe;if(me){N&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ge,Pe.width,Pe.height);for(let oe=0;oe<6;oe++){fe=xe[oe].mipmaps;for(let Le=0;Le<fe.length;Le++){const Ve=fe[Le];y.format!==Ci?Ee!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ve.width,Ve.height,Ee,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,Ge,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ve.width,Ve.height,Ee,_e,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,Ge,Ve.width,Ve.height,0,Ee,_e,Ve.data)}}}else{if(fe=y.mipmaps,N&&de){fe.length>0&&we++;const oe=Se(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Ge,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(he){N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ee,_e,xe[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,xe[oe].width,xe[oe].height,0,Ee,_e,xe[oe].data);for(let Le=0;Le<fe.length;Le++){const gt=fe[Le].image[oe].image;N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,gt.width,gt.height,Ee,_e,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,Ge,gt.width,gt.height,0,Ee,_e,gt.data)}}else{N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ee,_e,xe[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,Ee,_e,xe[oe]);for(let Le=0;Le<fe.length;Le++){const Ve=fe[Le];N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,Ee,_e,Ve.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,Ge,Ee,_e,Ve.image[oe])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),X.__version=ee.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Me(R,y,O,q,ee,X){const ve=s.convert(O.format,O.colorSpace),ue=s.convert(O.type),be=M(O.internalFormat,ve,ue,O.colorSpace),me=n.get(y),he=n.get(O);if(he.__renderTarget=y,!me.__hasExternalTextures){const xe=Math.max(1,y.width>>X),Pe=Math.max(1,y.height>>X);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,X,be,xe,Pe,y.depth,0,ve,ue,null):t.texImage2D(ee,X,be,xe,Pe,0,ve,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,ee,he.__webglTexture,0,le(y)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,ee,he.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(R,y,O){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){const q=y.depthTexture,ee=q&&q.isDepthTexture?q.type:null,X=v(y.stencilBuffer,ee),ve=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=le(y);J(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,X,y.width,y.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,X,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,X,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,R)}else{const q=y.textures;for(let ee=0;ee<q.length;ee++){const X=q[ee],ve=s.convert(X.format,X.colorSpace),ue=s.convert(X.type),be=M(X.internalFormat,ve,ue,X.colorSpace),me=le(y);O&&J(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,be,y.width,y.height):J(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,be,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,be,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(R,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(y.depthTexture);q.__renderTarget=y,(!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),j(y.depthTexture,0);const ee=q.__webglTexture,X=le(y);if(y.depthTexture.format===yl)J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(y.depthTexture.format===Sl)J(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function We(R){const y=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){const ee=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",ee)};q.addEventListener("dispose",ee),y.__depthDisposeCallback=ee}y.__boundDepthTexture=q}if(R.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const q=R.texture.mipmaps;q&&q.length>0?Ce(y.__webglFramebuffer[0],R):Ce(y.__webglFramebuffer,R)}else if(O){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=i.createRenderbuffer(),Ie(y.__webglDepthbuffer[q],R,!1);else{const ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ie(y.__webglDepthbuffer,R,!1);else{const ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function L(R,y,O){const q=n.get(R);y!==void 0&&Me(q.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&We(R)}function x(R){const y=R.texture,O=n.get(R),q=n.get(y);R.addEventListener("dispose",A);const ee=R.textures,X=R.isWebGLCubeRenderTarget===!0,ve=ee.length>1;if(ve||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=y.version,o.memory.textures++),X){O.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[ue]=[];for(let be=0;be<y.mipmaps.length;be++)O.__webglFramebuffer[ue][be]=i.createFramebuffer()}else O.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let ue=0;ue<y.mipmaps.length;ue++)O.__webglFramebuffer[ue]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ve)for(let ue=0,be=ee.length;ue<be;ue++){const me=n.get(ee[ue]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&J(R)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const be=ee[ue];O.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ue]);const me=s.convert(be.format,be.colorSpace),he=s.convert(be.type),xe=M(be.internalFormat,me,he,be.colorSpace,R.isXRRenderTarget===!0),Pe=le(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,xe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,O.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Oe(i.TEXTURE_CUBE_MAP,y);for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0)for(let be=0;be<y.mipmaps.length;be++)Me(O.__webglFramebuffer[ue][be],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,be);else Me(O.__webglFramebuffer[ue],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(y)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ue=0,be=ee.length;ue<be;ue++){const me=ee[ue],he=n.get(me);let xe=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,he.__webglTexture),Oe(xe,me),Me(O.__webglFramebuffer,R,me,i.COLOR_ATTACHMENT0+ue,xe,0),m(me)&&p(xe)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,q.__webglTexture),Oe(ue,y),y.mipmaps&&y.mipmaps.length>0)for(let be=0;be<y.mipmaps.length;be++)Me(O.__webglFramebuffer[be],R,y,i.COLOR_ATTACHMENT0,ue,be);else Me(O.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,ue,0);m(y)&&p(ue),t.unbindTexture()}R.depthBuffer&&We(R)}function G(R){const y=R.textures;for(let O=0,q=y.length;O<q;O++){const ee=y[O];if(m(ee)){const X=b(R),ve=n.get(ee).__webglTexture;t.bindTexture(X,ve),p(X),t.unbindTexture()}}}const Z=[],K=[];function P(R){if(R.samples>0){if(J(R)===!1){const y=R.textures,O=R.width,q=R.height;let ee=i.COLOR_BUFFER_BIT;const X=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(R),ue=y.length>1;if(ue)for(let me=0;me<y.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const be=R.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let me=0;me<y.length;me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);const he=n.get(y[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,he,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,ee,i.NEAREST),l===!0&&(Z.length=0,K.length=0,Z.push(i.COLOR_ATTACHMENT0+me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Z.push(X),K.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,K)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let me=0;me<y.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);const he=n.get(y[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,he,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function le(R){return Math.min(r.maxSamples,R.samples)}function J(R){const y=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function re(R){const y=o.render.frame;u.get(R)!==y&&(u.set(R,y),R.update())}function ie(R,y){const O=R.colorSpace,q=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Gn&&O!==ts&&(mt.getTransfer(O)===bt?(q!==Ci||ee!==hr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}function Se(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=F,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=V,this.setTextureCube=B,this.rebindTextures=L,this.setupRenderTarget=x,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=J}function oR(i,e){function t(n,r=ts){let s;const o=mt.getTransfer(r);if(n===hr)return i.UNSIGNED_BYTE;if(n===Zd)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jd)return i.UNSIGNED_SHORT_5_5_5_1;if(n===E0)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===w0)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===T0)return i.BYTE;if(n===b0)return i.SHORT;if(n===vl)return i.UNSIGNED_SHORT;if(n===$d)return i.INT;if(n===Zs)return i.UNSIGNED_INT;if(n===zi)return i.FLOAT;if(n===Ur)return i.HALF_FLOAT;if(n===A0)return i.ALPHA;if(n===R0)return i.RGB;if(n===Ci)return i.RGBA;if(n===yl)return i.DEPTH_COMPONENT;if(n===Sl)return i.DEPTH_STENCIL;if(n===Qd)return i.RED;if(n===ep)return i.RED_INTEGER;if(n===C0)return i.RG;if(n===tp)return i.RG_INTEGER;if(n===np)return i.RGBA_INTEGER;if(n===Fc||n===Bc||n===kc||n===zc)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Fc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Fc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===kc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bh||n===Eh||n===wh||n===Ah)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===bh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ah)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rh||n===Ch||n===Ph)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Rh||n===Ch)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ph)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dh||n===Lh||n===Ih||n===Uh||n===Nh||n===Oh||n===Fh||n===Bh||n===kh||n===zh||n===Hh||n===Vh||n===Gh||n===Wh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Dh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ih)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===kh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wh)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xh||n===Yh||n===qh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Xh)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kh||n===jh||n===$h||n===Zh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Kh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$h)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xl?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const aR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lR=`
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

}`;class cR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new q0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Kn({vertexShader:aR,fragmentShader:lR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qn(new Nu(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uR extends da{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new cR,p={},b=t.getContextAttributes();let M=null,v=null;const E=[],C=[],A=new Ze;let D=null;const T=new Nn;T.viewport=new vt;const S=new Nn;S.viewport=new vt;const I=[T,S],F=new Sb;let Y=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let se=E[ne];return se===void 0&&(se=new Mf,E[ne]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ne){let se=E[ne];return se===void 0&&(se=new Mf,E[ne]=se),se.getGripSpace()},this.getHand=function(ne){let se=E[ne];return se===void 0&&(se=new Mf,E[ne]=se),se.getHandSpace()};function j(ne){const se=C.indexOf(ne.inputSource);if(se===-1)return;const Me=E[se];Me!==void 0&&(Me.update(ne.inputSource,ne.frame,c||o),Me.dispatchEvent({type:ne.type,data:ne.inputSource}))}function W(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",V);for(let ne=0;ne<E.length;ne++){const se=C[ne];se!==null&&(C[ne]=null,E[ne].disconnect(se))}Y=null,$=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(M),d=null,h=null,f=null,r=null,v=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){s=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ne){if(r=ne,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",W),r.addEventListener("inputsourceschange",V),b.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ie=null,Ce=null;b.depth&&(Ce=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=b.stencil?Sl:yl,Ie=b.stencil?xl:Zs);const We={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(We),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Gi(h.textureWidth,h.textureHeight,{format:Ci,type:hr,depthTexture:new Y0(h.textureWidth,h.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Me={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Me),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Gi(d.framebufferWidth,d.framebufferHeight,{format:Ci,type:hr,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qe.setContext(r),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(ne){for(let se=0;se<ne.removed.length;se++){const Me=ne.removed[se],Ie=C.indexOf(Me);Ie>=0&&(C[Ie]=null,E[Ie].disconnect(Me))}for(let se=0;se<ne.added.length;se++){const Me=ne.added[se];let Ie=C.indexOf(Me);if(Ie===-1){for(let We=0;We<E.length;We++)if(We>=C.length){C.push(Me),Ie=We;break}else if(C[We]===null){C[We]=Me,Ie=We;break}if(Ie===-1)break}const Ce=E[Ie];Ce&&Ce.connect(Me)}}const B=new H,ae=new H;function U(ne,se,Me){B.setFromMatrixPosition(se.matrixWorld),ae.setFromMatrixPosition(Me.matrixWorld);const Ie=B.distanceTo(ae),Ce=se.projectionMatrix.elements,We=Me.projectionMatrix.elements,L=Ce[14]/(Ce[10]-1),x=Ce[14]/(Ce[10]+1),G=(Ce[9]+1)/Ce[5],Z=(Ce[9]-1)/Ce[5],K=(Ce[8]-1)/Ce[0],P=(We[8]+1)/We[0],le=L*K,J=L*P,re=Ie/(-K+P),ie=re*-K;if(se.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(ie),ne.translateZ(re),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ce[10]===-1)ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Se=L+re,R=x+re,y=le-ie,O=J+(Ie-ie),q=G*x/R*Se,ee=Z*x/R*Se;ne.projectionMatrix.makePerspective(y,O,q,ee,Se,R),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function ge(ne,se){se===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(se.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(r===null)return;let se=ne.near,Me=ne.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),F.near=S.near=T.near=se,F.far=S.far=T.far=Me,(Y!==F.near||$!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),Y=F.near,$=F.far),F.layers.mask=ne.layers.mask|6,T.layers.mask=F.layers.mask&3,S.layers.mask=F.layers.mask&5;const Ie=ne.parent,Ce=F.cameras;ge(F,Ie);for(let We=0;We<Ce.length;We++)ge(Ce[We],Ie);Ce.length===2?U(F,T,S):F.projectionMatrix.copy(T.projectionMatrix),Oe(ne,F,Ie)};function Oe(ne,se,Me){Me===null?ne.matrix.copy(se.matrixWorld):(ne.matrix.copy(Me.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(se.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Qo*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(ne){l=ne,h!==null&&(h.fixedFoveation=ne),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(ne){return p[ne]};let Qe=null;function Ke(ne,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const Me=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Ie=!1;Me.length!==F.cameras.length&&(F.cameras.length=0,Ie=!0);for(let x=0;x<Me.length;x++){const G=Me[x];let Z=null;if(d!==null)Z=d.getViewport(G);else{const P=f.getViewSubImage(h,G);Z=P.viewport,x===0&&(e.setRenderTargetTextures(v,P.colorTexture,P.depthStencilTexture),e.setRenderTarget(v))}let K=I[x];K===void 0&&(K=new Nn,K.layers.enable(x),K.viewport=new vt,I[x]=K),K.matrix.fromArray(G.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(G.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Z.x,Z.y,Z.width,Z.height),x===0&&(F.matrix.copy(K.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ie===!0&&F.cameras.push(K)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const x=f.getDepthInformation(Me[0]);x&&x.isValid&&x.texture&&m.init(x,r.renderState)}if(Ce&&Ce.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let x=0;x<Me.length;x++){const G=Me[x].camera;if(G){let Z=p[G];Z||(Z=new q0,p[G]=Z);const K=f.getCameraImage(G);Z.sourceTexture=K}}}}for(let Me=0;Me<E.length;Me++){const Ie=C[Me],Ce=E[Me];Ie!==null&&Ce!==void 0&&Ce.update(Ie,se,c||o)}Qe&&Qe(ne,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const qe=new Z0;qe.setAnimationLoop(Ke),this.setAnimationLoop=function(ne){Qe=ne},this.dispose=function(){}}}const As=new dr,fR=new ot;function hR(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,k0(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),M=b.envMap,v=b.envMapRotation;M&&(m.envMap.value=M,As.copy(v),As.x*=-1,As.y*=-1,As.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(As.y*=-1,As.z*=-1),m.envMapRotation.value.setFromMatrix4(fR.makeRotationFromEuler(As)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function dR(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const v=M.program;n.uniformBlockBinding(b,v)}function c(b,M){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(b,E);const C=e.render.frame;s[b.id]!==C&&(h(b),s[b.id]=C)}function u(b){const M=f();b.__bindingPointIndex=M;const v=i.createBuffer(),E=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,E,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const M=r[b.id],v=b.uniforms,E=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,A=v.length;C<A;C++){const D=Array.isArray(v[C])?v[C]:[v[C]];for(let T=0,S=D.length;T<S;T++){const I=D[T];if(d(I,C,T,E)===!0){const F=I.__offset,Y=Array.isArray(I.value)?I.value:[I.value];let $=0;for(let j=0;j<Y.length;j++){const W=Y[j],V=_(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,F+$,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,$),$+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,M,v,E){const C=b.value,A=M+"_"+v;if(E[A]===void 0)return typeof C=="number"||typeof C=="boolean"?E[A]=C:E[A]=C.clone(),!0;{const D=E[A];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return E[A]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(b){const M=b.uniforms;let v=0;const E=16;for(let A=0,D=M.length;A<D;A++){const T=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,I=T.length;S<I;S++){const F=T[S],Y=Array.isArray(F.value)?F.value:[F.value];for(let $=0,j=Y.length;$<j;$++){const W=Y[$],V=_(W),B=v%E,ae=B%V.boundary,U=B+ae;v+=ae,U!==0&&E-U<V.storage&&(v+=E-U),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=V.storage}}}const C=v%E;return C>0&&(v+=E-C),b.__size=v,b.__cache={},this}function _(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function m(b){const M=b.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class pR{constructor(e={}){const{canvas:t=pT(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=dn;let C=0,A=0,D=null,T=-1,S=null;const I=new vt,F=new vt;let Y=null;const $=new je(0);let j=0,W=t.width,V=t.height,B=1,ae=null,U=null;const ge=new vt(0,0,W,V),Oe=new vt(0,0,W,V);let Qe=!1;const Ke=new ap;let qe=!1,ne=!1;const se=new ot,Me=new H,Ie=new vt,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function L(){return D===null?B:1}let x=n;function G(w,k){return t.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jd}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",fe,!1),x===null){const k="webgl2";if(x=G(k,w),x===null)throw G(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Z,K,P,le,J,re,ie,Se,R,y,O,q,ee,X,ve,ue,be,me,he,xe,Pe,Ee,_e,Ge;function N(){Z=new b1(x),Z.init(),Ee=new oR(x,Z),K=new _1(x,Z,e,Ee),P=new rR(x,Z),K.reversedDepthBuffer&&h&&P.buffers.depth.setReversed(!0),le=new A1(x),J=new XA,re=new sR(x,Z,P,J,K,Ee,le),ie=new x1(v),Se=new T1(v),R=new Ib(x),_e=new m1(x,R),y=new E1(x,R,le,_e),O=new C1(x,y,R,le),he=new R1(x,K,re),ue=new v1(J),q=new WA(v,ie,Se,Z,K,_e,ue),ee=new hR(v,J),X=new qA,ve=new QA(Z),me=new p1(v,ie,Se,P,O,d,l),be=new nR(v,O,K),Ge=new dR(x,le,K,P),xe=new g1(x,Z,le),Pe=new w1(x,Z,le),le.programs=q.programs,v.capabilities=K,v.extensions=Z,v.properties=J,v.renderLists=X,v.shadowMap=be,v.state=P,v.info=le}N();const de=new uR(v,x);this.xr=de,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const w=Z.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Z.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(w){w!==void 0&&(B=w,this.setSize(W,V,!1))},this.getSize=function(w){return w.set(W,V)},this.setSize=function(w,k,Q=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=w,V=k,t.width=Math.floor(w*B),t.height=Math.floor(k*B),Q===!0&&(t.style.width=w+"px",t.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(W*B,V*B).floor()},this.setDrawingBufferSize=function(w,k,Q){W=w,V=k,B=Q,t.width=Math.floor(w*Q),t.height=Math.floor(k*Q),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(ge)},this.setViewport=function(w,k,Q,te){w.isVector4?ge.set(w.x,w.y,w.z,w.w):ge.set(w,k,Q,te),P.viewport(I.copy(ge).multiplyScalar(B).round())},this.getScissor=function(w){return w.copy(Oe)},this.setScissor=function(w,k,Q,te){w.isVector4?Oe.set(w.x,w.y,w.z,w.w):Oe.set(w,k,Q,te),P.scissor(F.copy(Oe).multiplyScalar(B).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(w){P.setScissorTest(Qe=w)},this.setOpaqueSort=function(w){ae=w},this.setTransparentSort=function(w){U=w},this.getClearColor=function(w){return w.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,Q=!0){let te=0;if(w){let z=!1;if(D!==null){const ce=D.texture.format;z=ce===np||ce===tp||ce===ep}if(z){const ce=D.texture.type,ye=ce===hr||ce===Zs||ce===vl||ce===xl||ce===Zd||ce===Jd,Ue=me.getClearColor(),De=me.getClearAlpha(),He=Ue.r,ke=Ue.g,Be=Ue.b;ye?(g[0]=He,g[1]=ke,g[2]=Be,g[3]=De,x.clearBufferuiv(x.COLOR,0,g)):(_[0]=He,_[1]=ke,_[2]=Be,_[3]=De,x.clearBufferiv(x.COLOR,0,_))}else te|=x.COLOR_BUFFER_BIT}k&&(te|=x.DEPTH_BUFFER_BIT),Q&&(te|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),me.dispose(),X.dispose(),ve.dispose(),J.dispose(),ie.dispose(),Se.dispose(),O.dispose(),_e.dispose(),Ge.dispose(),q.dispose(),de.dispose(),de.removeEventListener("sessionstart",Je),de.removeEventListener("sessionend",Te),Xe.stop()};function pe(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=le.autoReset,k=be.enabled,Q=be.autoUpdate,te=be.needsUpdate,z=be.type;N(),le.autoReset=w,be.enabled=k,be.autoUpdate=Q,be.needsUpdate=te,be.type=z}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function oe(w){const k=w.target;k.removeEventListener("dispose",oe),Le(k)}function Le(w){Ve(w),J.remove(w)}function Ve(w){const k=J.get(w).programs;k!==void 0&&(k.forEach(function(Q){q.releaseProgram(Q)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,Q,te,z,ce){k===null&&(k=Ce);const ye=z.isMesh&&z.matrixWorld.determinant()<0,Ue=St(w,k,Q,te,z);P.setMaterial(te,ye);let De=Q.index,He=1;if(te.wireframe===!0){if(De=y.getWireframeAttribute(Q),De===void 0)return;He=2}const ke=Q.drawRange,Be=Q.attributes.position;let et=ke.start*He,ft=(ke.start+ke.count)*He;ce!==null&&(et=Math.max(et,ce.start*He),ft=Math.min(ft,(ce.start+ce.count)*He)),De!==null?(et=Math.max(et,0),ft=Math.min(ft,De.count)):Be!=null&&(et=Math.max(et,0),ft=Math.min(ft,Be.count));const Gt=ft-et;if(Gt<0||Gt===1/0)return;_e.setup(z,te,Ue,Q,De);let Nt,At=xe;if(De!==null&&(Nt=R.get(De),At=Pe,At.setIndex(Nt)),z.isMesh)te.wireframe===!0?(P.setLineWidth(te.wireframeLinewidth*L()),At.setMode(x.LINES)):At.setMode(x.TRIANGLES);else if(z.isLine){let Ye=te.linewidth;Ye===void 0&&(Ye=1),P.setLineWidth(Ye*L()),z.isLineSegments?At.setMode(x.LINES):z.isLineLoop?At.setMode(x.LINE_LOOP):At.setMode(x.LINE_STRIP)}else z.isPoints?At.setMode(x.POINTS):z.isSprite&&At.setMode(x.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)El("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),At.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))At.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ye=z._multiDrawStarts,Bt=z._multiDrawCounts,_t=z._multiDrawCount,ni=De?R.get(De).bytesPerElement:1,ro=J.get(te).currentProgram.getUniforms();for(let ii=0;ii<_t;ii++)ro.setValue(x,"_gl_DrawID",ii),At.render(Ye[ii]/ni,Bt[ii])}else if(z.isInstancedMesh)At.renderInstances(et,Gt,z.count);else if(Q.isInstancedBufferGeometry){const Ye=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Bt=Math.min(Q.instanceCount,Ye);At.renderInstances(et,Gt,Bt)}else At.render(et,Gt)};function gt(w,k,Q){w.transparent===!0&&w.side===tr&&w.forceSinglePass===!1?(w.side=jn,w.needsUpdate=!0,Yt(w,k,Q),w.side=kr,w.needsUpdate=!0,Yt(w,k,Q),w.side=tr):Yt(w,k,Q)}this.compile=function(w,k,Q=null){Q===null&&(Q=w),p=ve.get(Q),p.init(k),M.push(p),Q.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),w!==Q&&w.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const te=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ce=z.material;if(ce)if(Array.isArray(ce))for(let ye=0;ye<ce.length;ye++){const Ue=ce[ye];gt(Ue,Q,z),te.add(Ue)}else gt(ce,Q,z),te.add(ce)}),p=M.pop(),te},this.compileAsync=function(w,k,Q=null){const te=this.compile(w,k,Q);return new Promise(z=>{function ce(){if(te.forEach(function(ye){J.get(ye).currentProgram.isReady()&&te.delete(ye)}),te.size===0){z(w);return}setTimeout(ce,10)}Z.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Re=null;function Fe(w){Re&&Re(w)}function Je(){Xe.stop()}function Te(){Xe.start()}const Xe=new Z0;Xe.setAnimationLoop(Fe),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(w){Re=w,de.setAnimationLoop(w),w===null?Xe.stop():Xe.start()},de.addEventListener("sessionstart",Je),de.addEventListener("sessionend",Te),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(k),k=de.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,k,D),p=ve.get(w,M.length),p.init(k),M.push(p),se.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ke.setFromProjectionMatrix(se,rr,k.reversedDepth),ne=this.localClippingEnabled,qe=ue.init(this.clippingPlanes,ne),m=X.get(w,b.length),m.init(),b.push(m),de.enabled===!0&&de.isPresenting===!0){const ce=v.xr.getDepthSensingMesh();ce!==null&&ze(ce,k,-1/0,v.sortObjects)}ze(w,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ae,U),We=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,We&&me.addToRenderList(m,w),this.info.render.frame++,qe===!0&&ue.beginShadows();const Q=p.state.shadowsArray;be.render(Q,w,k),qe===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=m.opaque,z=m.transmissive;if(p.setupLights(),k.isArrayCamera){const ce=k.cameras;if(z.length>0)for(let ye=0,Ue=ce.length;ye<Ue;ye++){const De=ce[ye];Xt(te,z,w,De)}We&&me.render(w);for(let ye=0,Ue=ce.length;ye<Ue;ye++){const De=ce[ye];$e(m,w,De,De.viewport)}}else z.length>0&&Xt(te,z,w,k),We&&me.render(w),$e(m,w,k);D!==null&&A===0&&(re.updateMultisampleRenderTarget(D),re.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(v,w,k),_e.resetDefaultState(),T=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],qe===!0&&ue.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function ze(w,k,Q,te){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)Q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ke.intersectsSprite(w)){te&&Ie.setFromMatrixPosition(w.matrixWorld).applyMatrix4(se);const ye=O.update(w),Ue=w.material;Ue.visible&&m.push(w,ye,Ue,Q,Ie.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ke.intersectsObject(w))){const ye=O.update(w),Ue=w.material;if(te&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ie.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ie.copy(ye.boundingSphere.center)),Ie.applyMatrix4(w.matrixWorld).applyMatrix4(se)),Array.isArray(Ue)){const De=ye.groups;for(let He=0,ke=De.length;He<ke;He++){const Be=De[He],et=Ue[Be.materialIndex];et&&et.visible&&m.push(w,ye,et,Q,Ie.z,Be)}}else Ue.visible&&m.push(w,ye,Ue,Q,Ie.z,null)}}const ce=w.children;for(let ye=0,Ue=ce.length;ye<Ue;ye++)ze(ce[ye],k,Q,te)}function $e(w,k,Q,te){const z=w.opaque,ce=w.transmissive,ye=w.transparent;p.setupLightsView(Q),qe===!0&&ue.setGlobalState(v.clippingPlanes,Q),te&&P.viewport(I.copy(te)),z.length>0&&it(z,k,Q),ce.length>0&&it(ce,k,Q),ye.length>0&&it(ye,k,Q),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function Xt(w,k,Q,te){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[te.id]===void 0&&(p.state.transmissionRenderTarget[te.id]=new Gi(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?Ur:hr,minFilter:Pr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const ce=p.state.transmissionRenderTarget[te.id],ye=te.viewport||I;ce.setSize(ye.z*v.transmissionResolutionScale,ye.w*v.transmissionResolutionScale);const Ue=v.getRenderTarget(),De=v.getActiveCubeFace(),He=v.getActiveMipmapLevel();v.setRenderTarget(ce),v.getClearColor($),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),We&&me.render(Q);const ke=v.toneMapping;v.toneMapping=cs;const Be=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),p.setupLightsView(te),qe===!0&&ue.setGlobalState(v.clippingPlanes,te),it(w,Q,te),re.updateMultisampleRenderTarget(ce),re.updateRenderTargetMipmap(ce),Z.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let ft=0,Gt=k.length;ft<Gt;ft++){const Nt=k[ft],At=Nt.object,Ye=Nt.geometry,Bt=Nt.material,_t=Nt.group;if(Bt.side===tr&&At.layers.test(te.layers)){const ni=Bt.side;Bt.side=jn,Bt.needsUpdate=!0,Ot(At,Q,te,Ye,Bt,_t),Bt.side=ni,Bt.needsUpdate=!0,et=!0}}et===!0&&(re.updateMultisampleRenderTarget(ce),re.updateRenderTargetMipmap(ce))}v.setRenderTarget(Ue,De,He),v.setClearColor($,j),Be!==void 0&&(te.viewport=Be),v.toneMapping=ke}function it(w,k,Q){const te=k.isScene===!0?k.overrideMaterial:null;for(let z=0,ce=w.length;z<ce;z++){const ye=w[z],Ue=ye.object,De=ye.geometry,He=ye.group;let ke=ye.material;ke.allowOverride===!0&&te!==null&&(ke=te),Ue.layers.test(Q.layers)&&Ot(Ue,k,Q,De,ke,He)}}function Ot(w,k,Q,te,z,ce){w.onBeforeRender(v,k,Q,te,z,ce),w.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(v,k,Q,te,w,ce),z.transparent===!0&&z.side===tr&&z.forceSinglePass===!1?(z.side=jn,z.needsUpdate=!0,v.renderBufferDirect(Q,k,te,z,w,ce),z.side=kr,z.needsUpdate=!0,v.renderBufferDirect(Q,k,te,z,w,ce),z.side=tr):v.renderBufferDirect(Q,k,te,z,w,ce),w.onAfterRender(v,k,Q,te,z,ce)}function Yt(w,k,Q){k.isScene!==!0&&(k=Ce);const te=J.get(w),z=p.state.lights,ce=p.state.shadowsArray,ye=z.state.version,Ue=q.getParameters(w,z.state,ce,k,Q),De=q.getProgramCacheKey(Ue);let He=te.programs;te.environment=w.isMeshStandardMaterial?k.environment:null,te.fog=k.fog,te.envMap=(w.isMeshStandardMaterial?Se:ie).get(w.envMap||te.environment),te.envMapRotation=te.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,He===void 0&&(w.addEventListener("dispose",oe),He=new Map,te.programs=He);let ke=He.get(De);if(ke!==void 0){if(te.currentProgram===ke&&te.lightsStateVersion===ye)return wt(w,Ue),ke}else Ue.uniforms=q.getUniforms(w),w.onBeforeCompile(Ue,v),ke=q.acquireProgram(Ue,De),He.set(De,ke),te.uniforms=Ue.uniforms;const Be=te.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Be.clippingPlanes=ue.uniform),wt(w,Ue),te.needsLights=Ut(w),te.lightsStateVersion=ye,te.needsLights&&(Be.ambientLightColor.value=z.state.ambient,Be.lightProbe.value=z.state.probe,Be.directionalLights.value=z.state.directional,Be.directionalLightShadows.value=z.state.directionalShadow,Be.spotLights.value=z.state.spot,Be.spotLightShadows.value=z.state.spotShadow,Be.rectAreaLights.value=z.state.rectArea,Be.ltc_1.value=z.state.rectAreaLTC1,Be.ltc_2.value=z.state.rectAreaLTC2,Be.pointLights.value=z.state.point,Be.pointLightShadows.value=z.state.pointShadow,Be.hemisphereLights.value=z.state.hemi,Be.directionalShadowMap.value=z.state.directionalShadowMap,Be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Be.spotShadowMap.value=z.state.spotShadowMap,Be.spotLightMatrix.value=z.state.spotLightMatrix,Be.spotLightMap.value=z.state.spotLightMap,Be.pointShadowMap.value=z.state.pointShadowMap,Be.pointShadowMatrix.value=z.state.pointShadowMatrix),te.currentProgram=ke,te.uniformsList=null,ke}function It(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Hc.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function wt(w,k){const Q=J.get(w);Q.outputColorSpace=k.outputColorSpace,Q.batching=k.batching,Q.batchingColor=k.batchingColor,Q.instancing=k.instancing,Q.instancingColor=k.instancingColor,Q.instancingMorph=k.instancingMorph,Q.skinning=k.skinning,Q.morphTargets=k.morphTargets,Q.morphNormals=k.morphNormals,Q.morphColors=k.morphColors,Q.morphTargetsCount=k.morphTargetsCount,Q.numClippingPlanes=k.numClippingPlanes,Q.numIntersection=k.numClipIntersection,Q.vertexAlphas=k.vertexAlphas,Q.vertexTangents=k.vertexTangents,Q.toneMapping=k.toneMapping}function St(w,k,Q,te,z){k.isScene!==!0&&(k=Ce),re.resetTextureUnits();const ce=k.fog,ye=te.isMeshStandardMaterial?k.environment:null,Ue=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Gn,De=(te.isMeshStandardMaterial?Se:ie).get(te.envMap||ye),He=te.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ke=!!Q.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Be=!!Q.morphAttributes.position,et=!!Q.morphAttributes.normal,ft=!!Q.morphAttributes.color;let Gt=cs;te.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Gt=v.toneMapping);const Nt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,At=Nt!==void 0?Nt.length:0,Ye=J.get(te),Bt=p.state.lights;if(qe===!0&&(ne===!0||w!==S)){const En=w===S&&te.id===T;ue.setState(te,w,En)}let _t=!1;te.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==Bt.state.version||Ye.outputColorSpace!==Ue||z.isBatchedMesh&&Ye.batching===!1||!z.isBatchedMesh&&Ye.batching===!0||z.isBatchedMesh&&Ye.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ye.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ye.instancing===!1||!z.isInstancedMesh&&Ye.instancing===!0||z.isSkinnedMesh&&Ye.skinning===!1||!z.isSkinnedMesh&&Ye.skinning===!0||z.isInstancedMesh&&Ye.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ye.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ye.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ye.instancingMorph===!1&&z.morphTexture!==null||Ye.envMap!==De||te.fog===!0&&Ye.fog!==ce||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==ue.numPlanes||Ye.numIntersection!==ue.numIntersection)||Ye.vertexAlphas!==He||Ye.vertexTangents!==ke||Ye.morphTargets!==Be||Ye.morphNormals!==et||Ye.morphColors!==ft||Ye.toneMapping!==Gt||Ye.morphTargetsCount!==At)&&(_t=!0):(_t=!0,Ye.__version=te.version);let ni=Ye.currentProgram;_t===!0&&(ni=Yt(te,k,z));let ro=!1,ii=!1,va=!1;const kt=ni.getUniforms(),Si=Ye.uniforms;if(P.useProgram(ni.program)&&(ro=!0,ii=!0,va=!0),te.id!==T&&(T=te.id,ii=!0),ro||S!==w){P.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),kt.setValue(x,"projectionMatrix",w.projectionMatrix),kt.setValue(x,"viewMatrix",w.matrixWorldInverse);const Wn=kt.map.cameraPosition;Wn!==void 0&&Wn.setValue(x,Me.setFromMatrixPosition(w.matrixWorld)),K.logarithmicDepthBuffer&&kt.setValue(x,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&kt.setValue(x,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,ii=!0,va=!0)}if(z.isSkinnedMesh){kt.setOptional(x,z,"bindMatrix"),kt.setOptional(x,z,"bindMatrixInverse");const En=z.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),kt.setValue(x,"boneTexture",En.boneTexture,re))}z.isBatchedMesh&&(kt.setOptional(x,z,"batchingTexture"),kt.setValue(x,"batchingTexture",z._matricesTexture,re),kt.setOptional(x,z,"batchingIdTexture"),kt.setValue(x,"batchingIdTexture",z._indirectTexture,re),kt.setOptional(x,z,"batchingColorTexture"),z._colorsTexture!==null&&kt.setValue(x,"batchingColorTexture",z._colorsTexture,re));const Mi=Q.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&he.update(z,Q,ni),(ii||Ye.receiveShadow!==z.receiveShadow)&&(Ye.receiveShadow=z.receiveShadow,kt.setValue(x,"receiveShadow",z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Si.envMap.value=De,Si.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&k.environment!==null&&(Si.envMapIntensity.value=k.environmentIntensity),ii&&(kt.setValue(x,"toneMappingExposure",v.toneMappingExposure),Ye.needsLights&&ti(Si,va),ce&&te.fog===!0&&ee.refreshFogUniforms(Si,ce),ee.refreshMaterialUniforms(Si,te,B,V,p.state.transmissionRenderTarget[w.id]),Hc.upload(x,It(Ye),Si,re)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Hc.upload(x,It(Ye),Si,re),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&kt.setValue(x,"center",z.center),kt.setValue(x,"modelViewMatrix",z.modelViewMatrix),kt.setValue(x,"normalMatrix",z.normalMatrix),kt.setValue(x,"modelMatrix",z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const En=te.uniformsGroups;for(let Wn=0,Gu=En.length;Wn<Gu;Wn++){const xs=En[Wn];Ge.update(xs,ni),Ge.bind(xs,ni)}}return ni}function ti(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Ut(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,k,Q){const te=J.get(w);te.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),J.get(w.texture).__webglTexture=k,J.get(w.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:Q,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){const Q=J.get(w);Q.__webglFramebuffer=k,Q.__useDefaultFramebuffer=k===void 0};const bn=x.createFramebuffer();this.setRenderTarget=function(w,k=0,Q=0){D=w,C=k,A=Q;let te=!0,z=null,ce=!1,ye=!1;if(w){const De=J.get(w);if(De.__useDefaultFramebuffer!==void 0)P.bindFramebuffer(x.FRAMEBUFFER,null),te=!1;else if(De.__webglFramebuffer===void 0)re.setupRenderTarget(w);else if(De.__hasExternalTextures)re.rebindTextures(w,J.get(w.texture).__webglTexture,J.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Be=w.depthTexture;if(De.__boundDepthTexture!==Be){if(Be!==null&&J.has(Be)&&(w.width!==Be.image.width||w.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(w)}}const He=w.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ye=!0);const ke=J.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ke[k])?z=ke[k][Q]:z=ke[k],ce=!0):w.samples>0&&re.useMultisampledRTT(w)===!1?z=J.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?z=ke[Q]:z=ke,I.copy(w.viewport),F.copy(w.scissor),Y=w.scissorTest}else I.copy(ge).multiplyScalar(B).floor(),F.copy(Oe).multiplyScalar(B).floor(),Y=Qe;if(Q!==0&&(z=bn),P.bindFramebuffer(x.FRAMEBUFFER,z)&&te&&P.drawBuffers(w,z),P.viewport(I),P.scissor(F),P.setScissorTest(Y),ce){const De=J.get(w.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+k,De.__webglTexture,Q)}else if(ye){const De=k;for(let He=0;He<w.textures.length;He++){const ke=J.get(w.textures[He]);x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0+He,ke.__webglTexture,Q,De)}}else if(w!==null&&Q!==0){const De=J.get(w.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,De.__webglTexture,Q)}T=-1},this.readRenderTargetPixels=function(w,k,Q,te,z,ce,ye,Ue=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(De=De[ye]),De){P.bindFramebuffer(x.FRAMEBUFFER,De);try{const He=w.textures[Ue],ke=He.format,Be=He.type;if(!K.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-te&&Q>=0&&Q<=w.height-z&&(w.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+Ue),x.readPixels(k,Q,te,z,Ee.convert(ke),Ee.convert(Be),ce))}finally{const He=D!==null?J.get(D).__webglFramebuffer:null;P.bindFramebuffer(x.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(w,k,Q,te,z,ce,ye,Ue=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(De=De[ye]),De)if(k>=0&&k<=w.width-te&&Q>=0&&Q<=w.height-z){P.bindFramebuffer(x.FRAMEBUFFER,De);const He=w.textures[Ue],ke=He.format,Be=He.type;if(!K.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=x.createBuffer();x.bindBuffer(x.PIXEL_PACK_BUFFER,et),x.bufferData(x.PIXEL_PACK_BUFFER,ce.byteLength,x.STREAM_READ),w.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+Ue),x.readPixels(k,Q,te,z,Ee.convert(ke),Ee.convert(Be),0);const ft=D!==null?J.get(D).__webglFramebuffer:null;P.bindFramebuffer(x.FRAMEBUFFER,ft);const Gt=x.fenceSync(x.SYNC_GPU_COMMANDS_COMPLETE,0);return x.flush(),await mT(x,Gt,4),x.bindBuffer(x.PIXEL_PACK_BUFFER,et),x.getBufferSubData(x.PIXEL_PACK_BUFFER,0,ce),x.deleteBuffer(et),x.deleteSync(Gt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,Q=0){const te=Math.pow(2,-Q),z=Math.floor(w.image.width*te),ce=Math.floor(w.image.height*te),ye=k!==null?k.x:0,Ue=k!==null?k.y:0;re.setTexture2D(w,0),x.copyTexSubImage2D(x.TEXTURE_2D,Q,0,0,ye,Ue,z,ce),P.unbindTexture()};const yi=x.createFramebuffer(),tn=x.createFramebuffer();this.copyTextureToTexture=function(w,k,Q=null,te=null,z=0,ce=null){ce===null&&(z!==0?(El("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=z,z=0):ce=0);let ye,Ue,De,He,ke,Be,et,ft,Gt;const Nt=w.isCompressedTexture?w.mipmaps[ce]:w.image;if(Q!==null)ye=Q.max.x-Q.min.x,Ue=Q.max.y-Q.min.y,De=Q.isBox3?Q.max.z-Q.min.z:1,He=Q.min.x,ke=Q.min.y,Be=Q.isBox3?Q.min.z:0;else{const Mi=Math.pow(2,-z);ye=Math.floor(Nt.width*Mi),Ue=Math.floor(Nt.height*Mi),w.isDataArrayTexture?De=Nt.depth:w.isData3DTexture?De=Math.floor(Nt.depth*Mi):De=1,He=0,ke=0,Be=0}te!==null?(et=te.x,ft=te.y,Gt=te.z):(et=0,ft=0,Gt=0);const At=Ee.convert(k.format),Ye=Ee.convert(k.type);let Bt;k.isData3DTexture?(re.setTexture3D(k,0),Bt=x.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(re.setTexture2DArray(k,0),Bt=x.TEXTURE_2D_ARRAY):(re.setTexture2D(k,0),Bt=x.TEXTURE_2D),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,k.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,k.unpackAlignment);const _t=x.getParameter(x.UNPACK_ROW_LENGTH),ni=x.getParameter(x.UNPACK_IMAGE_HEIGHT),ro=x.getParameter(x.UNPACK_SKIP_PIXELS),ii=x.getParameter(x.UNPACK_SKIP_ROWS),va=x.getParameter(x.UNPACK_SKIP_IMAGES);x.pixelStorei(x.UNPACK_ROW_LENGTH,Nt.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,Nt.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,He),x.pixelStorei(x.UNPACK_SKIP_ROWS,ke),x.pixelStorei(x.UNPACK_SKIP_IMAGES,Be);const kt=w.isDataArrayTexture||w.isData3DTexture,Si=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){const Mi=J.get(w),En=J.get(k),Wn=J.get(Mi.__renderTarget),Gu=J.get(En.__renderTarget);P.bindFramebuffer(x.READ_FRAMEBUFFER,Wn.__webglFramebuffer),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,Gu.__webglFramebuffer);for(let xs=0;xs<De;xs++)kt&&(x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,J.get(w).__webglTexture,z,Be+xs),x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,J.get(k).__webglTexture,ce,Gt+xs)),x.blitFramebuffer(He,ke,ye,Ue,et,ft,ye,Ue,x.DEPTH_BUFFER_BIT,x.NEAREST);P.bindFramebuffer(x.READ_FRAMEBUFFER,null),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||J.has(w)){const Mi=J.get(w),En=J.get(k);P.bindFramebuffer(x.READ_FRAMEBUFFER,yi),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,tn);for(let Wn=0;Wn<De;Wn++)kt?x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,Mi.__webglTexture,z,Be+Wn):x.framebufferTexture2D(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,Mi.__webglTexture,z),Si?x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,En.__webglTexture,ce,Gt+Wn):x.framebufferTexture2D(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,En.__webglTexture,ce),z!==0?x.blitFramebuffer(He,ke,ye,Ue,et,ft,ye,Ue,x.COLOR_BUFFER_BIT,x.NEAREST):Si?x.copyTexSubImage3D(Bt,ce,et,ft,Gt+Wn,He,ke,ye,Ue):x.copyTexSubImage2D(Bt,ce,et,ft,He,ke,ye,Ue);P.bindFramebuffer(x.READ_FRAMEBUFFER,null),P.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else Si?w.isDataTexture||w.isData3DTexture?x.texSubImage3D(Bt,ce,et,ft,Gt,ye,Ue,De,At,Ye,Nt.data):k.isCompressedArrayTexture?x.compressedTexSubImage3D(Bt,ce,et,ft,Gt,ye,Ue,De,At,Nt.data):x.texSubImage3D(Bt,ce,et,ft,Gt,ye,Ue,De,At,Ye,Nt):w.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,ce,et,ft,ye,Ue,At,Ye,Nt.data):w.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,ce,et,ft,Nt.width,Nt.height,At,Nt.data):x.texSubImage2D(x.TEXTURE_2D,ce,et,ft,ye,Ue,At,Ye,Nt);x.pixelStorei(x.UNPACK_ROW_LENGTH,_t),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,ni),x.pixelStorei(x.UNPACK_SKIP_PIXELS,ro),x.pixelStorei(x.UNPACK_SKIP_ROWS,ii),x.pixelStorei(x.UNPACK_SKIP_IMAGES,va),ce===0&&k.generateMipmaps&&x.generateMipmap(Bt),P.unbindTexture()},this.initRenderTarget=function(w){J.get(w).__webglFramebuffer===void 0&&re.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?re.setTextureCube(w,0):w.isData3DTexture?re.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?re.setTexture2DArray(w,0):re.setTexture2D(w,0),P.unbindTexture()},this.resetState=function(){C=0,A=0,D=null,P.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}function Pg(i,e){if(e===zM)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Jh||e===P0){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Jh)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class mR extends ga{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new yR(t)}),this.register(function(t){return new SR(t)}),this.register(function(t){return new PR(t)}),this.register(function(t){return new DR(t)}),this.register(function(t){return new LR(t)}),this.register(function(t){return new TR(t)}),this.register(function(t){return new bR(t)}),this.register(function(t){return new ER(t)}),this.register(function(t){return new wR(t)}),this.register(function(t){return new xR(t)}),this.register(function(t){return new AR(t)}),this.register(function(t){return new MR(t)}),this.register(function(t){return new CR(t)}),this.register(function(t){return new RR(t)}),this.register(function(t){return new _R(t)}),this.register(function(t){return new IR(t)}),this.register(function(t){return new UR(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=el.extractUrlBase(e);o=el.resolveURL(c,this.path)}else o=el.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new $0(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===nv){try{o[dt.KHR_BINARY_GLTF]=new NR(e)}catch(f){r&&r(f);return}s=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new KR(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case dt.KHR_MATERIALS_UNLIT:o[f]=new vR;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[f]=new OR(s,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[f]=new FR;break;case dt.KHR_MESH_QUANTIZATION:o[f]=new BR;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function gR(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _R{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new je(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Gn);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ao(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _b(u),c.distance=f;break;case"spot":c=new mb(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ji(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class vR{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return is}extendParams(e,t,n){const r=[];e.color=new je(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Gn),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,dn))}return Promise.all(r)}}class xR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class yR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ze(a,a)}return Promise.all(s)}}class SR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class MR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class TR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new je(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Gn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,dn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class bR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class ER{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new je().setRGB(a[0],a[1],a[2],Gn),Promise.all(s)}}class wR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class AR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new je().setRGB(a[0],a[1],a[2],Gn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,dn)),Promise.all(s)}}class RR{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class CR{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gr}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class PR{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class DR{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class LR{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class IR{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=r.byteOffset||0,c=r.byteLength||0,u=r.count,f=r.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,r.mode,r.filter),d})})}else return null}}class UR{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const c of r.primitives)if(c.mode!==Ei.TRIANGLES&&c.mode!==Ei.TRIANGLE_STRIP&&c.mode!==Ei.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),f=u.isGroup?u.children:[u],h=c[0].count,d=[];for(const g of f){const _=new ot,m=new H,p=new _s,b=new H(1,1,1),M=new XT(g.geometry,g.material,h);for(let v=0;v<h;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),M.setMatrixAt(v,_.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const E=l[v];M.instanceColor=new ed(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);Vt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const nv="glTF",Ca=12,Dg={JSON:1313821514,BIN:5130562};class NR{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ca),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==nv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-Ca,s=new DataView(e,Ca);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Dg.JSON){const c=new Uint8Array(e,Ca+o,a);this.content=n.decode(c)}else if(l===Dg.BIN){const c=Ca+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class OR{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const f=id[u]||u.toLowerCase();a[f]=o[u]}for(const u in e.attributes){const f=id[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],d=ko[h.componentType];c[f]=d.name,l[f]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){r.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}f(d)},a,c,Gn,h)})})}}class FR{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class BR{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class iv extends zl{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=r-t,f=(n-t)/u,h=f*f,d=h*f,g=e*c,_=g-c,m=-2*d+3*h,p=d-h,b=1-m,M=p-h+f;for(let v=0;v!==a;v++){const E=o[_+v+a],C=o[_+v+l]*u,A=o[g+v+a],D=o[g+v]*u;s[v]=b*E+M*C+m*A+p*D}return s}}const kR=new _s;class zR extends iv{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return kR.fromArray(s).normalize().toArray(s),s}}const Ei={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ko={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lg={9728:zn,9729:mi,9984:M0,9985:Oc,9986:Ua,9987:Pr},Ig={33071:ns,33648:su,10497:Jo},Of={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},id={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$r={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},HR={CUBICSPLINE:void 0,LINEAR:Tl,STEP:Ml},Ff={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function VR(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new cp({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:kr})),i.DefaultMaterial}function Rs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ji(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function GR(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const f=e[c];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(r=!0),f.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];if(n){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(h)}if(r){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],f=c[1],h=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=f),s&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function WR(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function XR(i){let e;const t=i.extensions&&i.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Bf(t.attributes):e=i.indices+":"+Bf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Bf(i.targets[n]);return e}function Bf(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function rd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function YR(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const qR=new ot;class KR{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gR,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new db(this.options.manager):this.textureLoader=new yb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new $0(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Rs(s,a,r),ji(a,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(el.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=Of[r.type],a=ko[r.componentType],l=r.normalized===!0,c=new a(r.count*o);return Promise.resolve(new Hn(c,o,l))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Of[r.type],c=ko[r.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,h=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let _,m;if(d&&d!==f){const p=Math.floor(h/d),b="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let M=t.cache.get(b);M||(_=new c(a,p*d,r.count*d/u),M=new zT(_,d/u),t.cache.add(b,M)),m=new sp(M,l,h%d/u,g)}else a===null?_=new c(r.count*l):_=new c(a,h,r.count*l),m=new Hn(_,l,g);if(r.sparse!==void 0){const p=Of.SCALAR,b=ko[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,v=r.sparse.values.byteOffset||0,E=new b(o[1],M,r.sparse.count*p),C=new c(o[2],v,r.sparse.count*l);a!==null&&(m=new Hn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,D=E.length;A<D;A++){const T=E[A];if(m.setX(T,C[A*l]),l>=2&&m.setY(T,C[A*l+1]),l>=3&&m.setZ(T,C[A*l+2]),l>=4&&m.setW(T,C[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=Lg[h.magFilter]||mi,u.minFilter=Lg[h.minFilter]||Pr,u.wrapS=Ig[h.wrapS]||Jo,u.wrapT=Ig[h.wrapT]||Jo,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==zn&&u.minFilter!==mi,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=r.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){c=!0;const h=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(f){return new Promise(function(h,d){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new un(_);m.needsUpdate=!0,h(m)}),t.load(el.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return c===!0&&a.revokeObjectURL(l),ji(f,o),f.userData.mimeType=o.mimeType||YR(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[dt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new X0,cr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new W0,cr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return cp}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const f=r[dt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),c.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new je(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Gn),a.opacity=h[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",f.baseColorTexture,dn)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=tr);const u=s.alphaMode||Ff.OPAQUE;if(u===Ff.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ff.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==is&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ze(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==is&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==is){const f=s.emissiveFactor;a.emissive=new je().setRGB(f[0],f[1],f[2],Gn)}return s.emissiveTexture!==void 0&&o!==is&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,dn)),Promise.all(c).then(function(){const f=new o(a);return s.name&&(f.name=s.name),ji(f,s),t.associations.set(f,{materials:e}),s.extensions&&Rs(r,f,s),f})}createUniqueName(e){const t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Ug(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=XR(c),f=r[u];if(f)o.push(f.promise);else{let h;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=Ug(new Xi,c,t),r[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?VR(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=o[d];let p;const b=c[d];if(m.mode===Ei.TRIANGLES||m.mode===Ei.TRIANGLE_STRIP||m.mode===Ei.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new VT(_,b):new qn(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Ei.TRIANGLE_STRIP?p.geometry=Pg(p.geometry,P0):m.mode===Ei.TRIANGLE_FAN&&(p.geometry=Pg(p.geometry,Jh));else if(m.mode===Ei.LINES)p=new jT(_,b);else if(m.mode===Ei.LINE_STRIP)p=new lp(_,b);else if(m.mode===Ei.LINE_LOOP)p=new $T(_,b);else if(m.mode===Ei.POINTS)p=new ZT(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&WR(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),ji(p,s),m.extensions&&Rs(r,p,m),t.assignFinalMaterial(p),f.push(p)}for(let d=0,g=f.length;d<g;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return s.extensions&&Rs(r,f[0],s),f[0];const h=new ks;s.extensions&&Rs(r,h,s),t.associations.set(h,{meshes:e});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nn(dT.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Fu(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ji(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const f=o[c];if(f){a.push(f);const h=new ot;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new op(a,l)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let f=0,h=r.channels.length;f<h;f++){const d=r.channels[f],g=r.samplers[d.sampler],_=d.target,m=_.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,b=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],m=f[4],p=[];for(let M=0,v=h.length;M<v;M++){const E=h[M],C=d[M],A=g[M],D=_[M],T=m[M];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const S=n._createAnimationTracks(E,C,A,D,T);if(S)for(let I=0;I<S.length;I++)p.push(S[I])}const b=new ob(s,void 0,p);return ji(b,r),b})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=r.weights.length;l<c;l++)a.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],f=c[1],h=c[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,qR)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new V0:c.length>1?u=new ks:c.length===1?u=c[0]:u=new Vt,u!==c[0])for(let f=0,h=c.length;f<h;f++)u.add(c[f]);if(s.name&&(u.userData.name=s.name,u.name=o),ji(u,s),s.extensions&&Rs(n,u,s),s.matrix!==void 0){const f=new ot;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){const f=r.associations.get(u);r.associations.set(u,{...f})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new ks;n.name&&(s.name=r.createUniqueName(n.name)),ji(s,n),n.extensions&&Rs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(r.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,f=l.length;u<f;u++)s.add(l[u]);const c=u=>{const f=new Map;for(const[h,d]of r.associations)(h instanceof cr||h instanceof un)&&f.set(h,d);return u.traverse(h=>{const d=r.associations.get(h);d!=null&&f.set(h,d)}),f};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,l=[];$r[s.path]===$r.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch($r[s.path]){case $r.weights:c=ta;break;case $r.rotation:c=na;break;case $r.translation:case $r.scale:c=ia;break;default:switch(n.itemSize){case 1:c=ta;break;case 2:case 3:default:c=ia;break}break}const u=r.interpolation!==void 0?HR[r.interpolation]:Tl,f=this._getArrayFromAccessor(n);for(let h=0,d=l.length;h<d;h++){const g=new c(l[h]+"."+$r[s.path],t.array,f,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=rd(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof na?zR:iv;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function jR(i,e,t){const n=e.attributes,r=new Gr;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(r.set(new H(l[0],l[1],l[2]),new H(c[0],c[1],c[2])),a.normalized){const u=rd(ko[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new H,l=new H;for(let c=0,u=s.length;c<u;c++){const f=s[c];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=rd(ko[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new mr;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function Ug(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=id[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return mt.workingColorSpace!==Gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),ji(i,e),jR(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?GR(i,e.targets,t):i})}const Vc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Hl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const $R=new Fu(-1,1,1,-1,0,1);class ZR extends Xi{constructor(){super(),this.setAttribute("position",new Wi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wi([0,2,0,0,2,0],2))}}const JR=new ZR;class rv{constructor(e){this._mesh=new qn(JR,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,$R)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class QR extends Hl{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Kn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=lu.clone(e.uniforms),this.material=new Kn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new rv(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ng extends Hl{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class eC extends Hl{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class tC{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ze);this._width=n.width,this._height=n.height,t=new Gi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ur}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new QR(Vc),this.copyPass.material.blending=Ir,this.clock=new Mb}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ng!==void 0&&(o instanceof Ng?n=!0:o instanceof eC&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ze);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class nC extends Hl{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,t,n){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const iC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ra extends Hl{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new Ze(e.x,e.y):new Ze(256,256),this.clearColor=new je(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Gi(s,o,{type:Ur}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Gi(s,o,{type:Ur});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new Gi(s,o,{type:Ur});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),o=Math.round(o/2)}const a=iC;this.highPassUniforms=lu.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Kn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Ze(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=lu.clone(Vc.uniforms),this.blendMaterial=new Kn({uniforms:this.copyUniforms,vertexShader:Vc.vertexShader,fragmentShader:Vc.fragmentShader,blending:hh,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new je,this._oldClearAlpha=1,this._basic=new is,this._fsQuad=new rv(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Ze(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ra.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ra.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Kn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ze(.5,.5)},direction:{value:new Ze(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(e){return new Kn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ra.BlurDirectionX=new Ze(1,0);ra.BlurDirectionY=new Ze(0,1);function wr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function sv(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var _i={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},sa={duration:.5,overwrite:!1,delay:0},pp,mn,Ft,Pi=1e8,Ct=1/Pi,sd=Math.PI*2,rC=sd/4,sC=0,ov=Math.sqrt,oC=Math.cos,aC=Math.sin,hn=function(e){return typeof e=="string"},Wt=function(e){return typeof e=="function"},zr=function(e){return typeof e=="number"},mp=function(e){return typeof e>"u"},pr=function(e){return typeof e=="object"},$n=function(e){return e!==!1},gp=function(){return typeof window<"u"},xc=function(e){return Wt(e)||hn(e)},av=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Tn=Array.isArray,od=/(?:-?\.?\d|\.)+/gi,lv=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Do=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,kf=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,cv=/[+-]=-?[.\d]+/,uv=/[^,'"\[\]\s]+/gi,lC=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,zt,$i,ad,_p,vi={},fu={},fv,hv=function(e){return(fu=oa(e,vi))&&ei},vp=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},wl=function(e,t){return!t&&console.warn(e)},dv=function(e,t){return e&&(vi[e]=t)&&fu&&(fu[e]=t)||vi},Al=function(){return 0},cC={suppressEvents:!0,isStart:!0,kill:!1},Gc={suppressEvents:!0,kill:!1},uC={suppressEvents:!0},xp={},us=[],ld={},pv,ci={},zf={},Og=30,Wc=[],yp="",Sp=function(e){var t=e[0],n,r;if(pr(t)||Wt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Wc.length;r--&&!Wc[r].targetTest(t););n=Wc[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Bv(e[r],n)))||e.splice(r,1);return e},Ws=function(e){return e._gsap||Sp(Di(e))[0]._gsap},mv=function(e,t,n){return(n=e[t])&&Wt(n)?e[t]():mp(n)&&e.getAttribute&&e.getAttribute(t)||n},Zn=function(e,t){return(e=e.split(",")).forEach(t)||e},qt=function(e){return Math.round(e*1e5)/1e5||0},en=function(e){return Math.round(e*1e7)/1e7||0},zo=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},fC=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},hu=function(){var e=us.length,t=us.slice(0),n,r;for(ld={},us.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Mp=function(e){return!!(e._initted||e._startAt||e.add)},gv=function(e,t,n,r){us.length&&!mn&&hu(),e.render(t,n,!!(mn&&t<0&&Mp(e))),us.length&&!mn&&hu()},_v=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(uv).length<2?t:hn(e)?e.trim():e},vv=function(e){return e},xi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},hC=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},oa=function(e,t){for(var n in t)e[n]=t[n];return e},Fg=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=pr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},du=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},tl=function(e){var t=e.parent||zt,n=e.keyframes?hC(Tn(e.keyframes)):xi;if($n(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},dC=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},xv=function(e,t,n,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},ku=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},ps=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Xs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},pC=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},cd=function(e,t,n,r){return e._startAt&&(mn?e._startAt.revert(Gc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},mC=function i(e){return!e||e._ts&&i(e.parent)},Bg=function(e){return e._repeat?aa(e._tTime,e=e.duration()+e._rDelay)*e:0},aa=function(e,t){var n=Math.floor(e=en(e/t));return e&&n===e?n-1:n},pu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},zu=function(e){return e._end=en(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ct)||0))},Hu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=en(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),zu(e),n._dirty||Xs(n,e)),e},yv=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=pu(e.rawTime(),t),(!t._dur||Vl(0,t.totalDuration(),n)-t._tTime>Ct)&&t.render(n,!0)),Xs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Ct}},nr=function(e,t,n,r){return t.parent&&ps(t),t._start=en((zr(n)?n:n||e!==zt?bi(e,n,t):e._time)+t._delay),t._end=en(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),xv(e,t,"_first","_last",e._sort?"_start":0),ud(t)||(e._recent=t),r||yv(e,t),e._ts<0&&Hu(e,e._tTime),e},Sv=function(e,t){return(vi.ScrollTrigger||vp("scrollTrigger",t))&&vi.ScrollTrigger.create(t,e)},Mv=function(e,t,n,r,s){if(bp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!mn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&pv!==hi.frame)return us.push(e),e._lazy=[s,r],1},gC=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},ud=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},_C=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&gC(e)&&!(!e._initted&&ud(e))||(e._ts<0||e._dp._ts<0)&&!ud(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=Vl(0,e._tDur,t),u=aa(l,a),e._yoyo&&u&1&&(o=1-o),u!==aa(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||mn||r||e._zTime===Ct||!t&&e._zTime){if(!e._initted&&Mv(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Ct:0),n||(n=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&cd(e,t,n,!0),e._onUpdate&&!n&&gi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&gi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&ps(e,1),!n&&!mn&&(gi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},vC=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},la=function(e,t,n,r){var s=e._repeat,o=en(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:en(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Hu(e,e._tTime=e._tDur*a),e.parent&&zu(e),n||Xs(e.parent,e),e},kg=function(e){return e instanceof Fn?Xs(e):la(e,e._dur)},xC={_start:0,endTime:Al,totalDuration:Al},bi=function i(e,t,n){var r=e.labels,s=e._recent||xC,o=e.duration()>=Pi?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Tn(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},nl=function(e,t,n){var r=zr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;o.immediateRender=$n(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Qt(t[0],o,t[s+1])},vs=function(e,t){return e||e===0?t(e):t},Vl=function(e,t,n){return n<e?e:n>t?t:n},Sn=function(e,t){return!hn(e)||!(t=lC.exec(e))?"":t[1]},yC=function(e,t,n){return vs(n,function(r){return Vl(e,t,r)})},fd=[].slice,Tv=function(e,t){return e&&pr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&pr(e[0]))&&!e.nodeType&&e!==$i},SC=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return hn(r)&&!t||Tv(r,1)?(s=n).push.apply(s,Di(r)):n.push(r)})||n},Di=function(e,t,n){return Ft&&!t&&Ft.selector?Ft.selector(e):hn(e)&&!n&&(ad||!ca())?fd.call((t||_p).querySelectorAll(e),0):Tn(e)?SC(e,n):Tv(e)?fd.call(e,0):e?[e]:[]},hd=function(e){return e=Di(e)[0]||wl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Di(t,n.querySelectorAll?n:n===e?wl("Invalid scope")||_p.createElement("div"):e)}},bv=function(e){return e.sort(function(){return .5-Math.random()})},Ev=function(e){if(Wt(e))return e;var t=pr(e)?e:{each:e},n=Ys(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return hn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,b,M,v,E,C,A,D,T;if(!m){if(T=t.grid==="auto"?0:(t.grid||[1,Pi])[1],!T){for(A=-Pi;A<(A=g[T++].getBoundingClientRect().left)&&T<_;);T<_&&T--}for(m=o[_]=[],p=l?Math.min(T,_)*u-.5:r%T,b=T===Pi?0:l?_*f/T-.5:r/T|0,A=0,D=Pi,C=0;C<_;C++)M=C%T-p,v=b-(C/T|0),m[C]=E=c?Math.abs(c==="y"?v:M):ov(M*M+v*v),E>A&&(A=E),E<D&&(D=E);r==="random"&&bv(m),m.max=A-D,m.min=D,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(T>_?_-1:c?c==="y"?_/T:T:Math.max(T,_/T))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=Sn(t.amount||t.each)||0,n=n&&_<0?Nv(n):n}return _=(m[h]-m.min)/m.max||0,en(m.b+(n?n(_):_)*m.v)+m.u}},dd=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=en(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(zr(n)?0:Sn(n))}},wv=function(e,t){var n=Tn(e),r,s;return!n&&pr(e)&&(r=n=e.radius||Pi,e.values?(e=Di(e.values),(s=!zr(e[0]))&&(r*=r)):e=dd(e.increment)),vs(t,n?Wt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Pi,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||zr(o)?u:u+Sn(o)}:dd(e))},Av=function(e,t,n,r){return vs(Tn(e)?!t:n===!0?!!(n=0):!r,function(){return Tn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},MC=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},TC=function(e,t){return function(n){return e(parseFloat(n))+(t||Sn(n))}},bC=function(e,t,n){return Cv(e,t,0,1,n)},Rv=function(e,t,n){return vs(n,function(r){return e[~~t(r)]})},EC=function i(e,t,n){var r=t-e;return Tn(e)?Rv(e,i(0,e.length),t):vs(n,function(s){return(r+(s-e)%r)%r+e})},wC=function i(e,t,n){var r=t-e,s=r*2;return Tn(e)?Rv(e,i(0,e.length-1),t):vs(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Rl=function(e){for(var t=0,n="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?uv:od),n+=e.substr(t,r-t)+Av(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},Cv=function(e,t,n,r,s){var o=t-e,a=r-n;return vs(s,function(l){return n+((l-e)/o*a||0)})},AC=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=hn(e),a={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(Tn(e)&&!Tn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=t}else r||(e=oa(Tn(e)?[]:{},e));if(!u){for(l in t)Tp.call(a,e,l,"get",t[l]);s=function(g){return Ap(g,a)||(o?e.p:e)}}}return vs(n,s)},zg=function(e,t,n){var r=e.labels,s=Pi,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},gi=function(e,t,n){var r=e.vars,s=r[t],o=Ft,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&us.length&&hu(),a&&(Ft=a),u=l?s.apply(c,l):s.call(c),Ft=o,u},Oa=function(e){return ps(e),e.scrollTrigger&&e.scrollTrigger.kill(!!mn),e.progress()<1&&gi(e,"onInterrupt"),e},Lo,Pv=[],Dv=function(e){if(e)if(e=!e.name&&e.default||e,gp()||e.headless){var t=e.name,n=Wt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Al,render:Ap,add:Tp,kill:GC,modifier:VC,rawVars:0},o={targetTest:0,get:0,getSetter:wp,aliases:{},register:0};if(ca(),e!==r){if(ci[t])return;xi(r,xi(du(e,s),o)),oa(r.prototype,oa(s,du(e,o))),ci[r.prop=t]=r,e.targetTest&&(Wc.push(r),xp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}dv(t,r),e.register&&e.register(ei,r,Jn)}else Pv.push(e)},Rt=255,Fa={aqua:[0,Rt,Rt],lime:[0,Rt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Rt],navy:[0,0,128],white:[Rt,Rt,Rt],olive:[128,128,0],yellow:[Rt,Rt,0],orange:[Rt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Rt,0,0],pink:[Rt,192,203],cyan:[0,Rt,Rt],transparent:[Rt,Rt,Rt,0]},Hf=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Rt+.5|0},Lv=function(e,t,n){var r=e?zr(e)?[e>>16,e>>8&Rt,e&Rt]:0:Fa.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Fa[e])r=Fa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Rt,r&Rt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Rt,e&Rt]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(od),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Hf(l+1/3,s,o),r[1]=Hf(l,s,o),r[2]=Hf(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(lv),n&&r.length<4&&(r[3]=1),r}else r=e.match(od)||Fa.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/Rt,o=r[1]/Rt,a=r[2]/Rt,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Iv=function(e){var t=[],n=[],r=-1;return e.split(fs).forEach(function(s){var o=s.match(Do)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Hg=function(e,t,n){var r="",s=(e+r).match(fs),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Lv(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Iv(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(fs,"1").split(Do),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(fs),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},fs=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Fa)i+="|"+e+"\\b";return new RegExp(i+")","gi")})(),RC=/hsl[a]?\(/,Uv=function(e){var t=e.join(" "),n;if(fs.lastIndex=0,fs.test(t))return n=RC.test(t),e[1]=Hg(e[1],n),e[0]=Hg(e[0],n,Iv(e[1])),!0},Cl,hi=(function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=i()-r,b=m===!0,M,v,E,C;if((p>e||p<0)&&(n+=p-t),r+=p,E=r-n,M=E-o,(M>0||b)&&(C=++f.frame,h=E-f.time*1e3,f.time=E=E/1e3,o+=M+(M>=s?4:s-M),v=1),b||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](E,h,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){fv&&(!ad&&gp()&&($i=ad=window,_p=$i.document||{},vi.gsap=ei,($i.gsapVersions||($i.gsapVersions=[])).push(ei.version),hv(fu||$i.GreenSockGlobals||!$i.gsap&&$i||{}),Pv.forEach(Dv)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},Cl=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Cl=0,c=Al},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,b){var M=p?function(v,E,C,A){m(v,E,C,A),f.remove(M)}:m;return f.remove(m),a[b?"unshift":"push"](M),ca(),M},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f})(),ca=function(){return!Cl&&hi.wake()},pt={},CC=/^[\d.\-M][\d.\-,\s]/,PC=/["']/g,DC=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(PC,"").trim():+c,r=l.substr(a+1).trim();return t},LC=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},IC=function(e){var t=(e+"").split("("),n=pt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[DC(t[1])]:LC(e).split(",").map(_v)):pt._CE&&CC.test(e)?pt._CE("",e):n},Nv=function(e){return function(t){return 1-e(1-t)}},Ov=function i(e,t){for(var n=e._first,r;n;)n instanceof Fn?i(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?i(n.timeline,t):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=t)),n=n._next},Ys=function(e,t){return e&&(Wt(e)?e:pt[e]||IC(e))||t},io=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Zn(e,function(a){pt[a]=vi[a]=s,pt[o=a.toLowerCase()]=n;for(var l in s)pt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=pt[a+"."+l]=s[l]}),s},Fv=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Vf=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/sd*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*aC((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Fv(a);return s=sd/s,l.config=function(c,u){return i(e,c,u)},l},Gf=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Fv(n);return r.config=function(s){return i(e,s)},r};Zn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;io(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});pt.Linear.easeNone=pt.none=pt.Linear.easeIn;io("Elastic",Vf("in"),Vf("out"),Vf());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};io("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);io("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});io("Circ",function(i){return-(ov(1-i*i)-1)});io("Sine",function(i){return i===1?1:-oC(i*rC)+1});io("Back",Gf("in"),Gf("out"),Gf());pt.SteppedEase=pt.steps=vi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-Ct;return function(a){return((r*Vl(0,o,a)|0)+s)*n}}};sa.ease=pt["quad.out"];Zn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return yp+=i+","+i+"Params,"});var Bv=function(e,t){this.id=sC++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:mv,this.set=t?t.getSetter:wp},Pl=(function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,la(this,+t.duration,1,1),this.data=t.data,Ft&&(this._ctx=Ft,Ft.data.push(this)),Cl||hi.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,la(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(ca(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Hu(this,n),!s._dp||s.parent||yv(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&nr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ct||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),gv(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Bg(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Bg(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?aa(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Ct?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?pu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ct?0:this._rts,this.totalTime(Vl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),zu(this),pC(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ca(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ct&&(this._tTime-=Ct)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&nr(r,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?pu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=uC);var r=mn;return mn=n,Mp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),mn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,kg(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,kg(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(bi(this,n),$n(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,$n(r)),this._dur||(this._zTime=-Ct),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ct:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ct,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Ct)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this;return new Promise(function(s){var o=Wt(n)?n:vv,a=function(){var c=r.then;r.then=null,Wt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){Oa(this)},i})();xi(Pl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ct,_prom:0,_ps:!1,_rts:1});var Fn=(function(i){sv(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),zt&&nr(n.parent||zt,wr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Sv(wr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return nl(0,arguments,this),this},t.from=function(r,s,o){return nl(1,arguments,this),this},t.fromTo=function(r,s,o,a){return nl(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,tl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Qt(r,s,bi(this,o),1),this},t.call=function(r,s,o){return nr(this,Qt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Qt(r,o,bi(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,tl(o).immediateRender=$n(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,tl(a).immediateRender=$n(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:en(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,_,m,p,b,M,v,E,C,A;if(this!==zt&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,v=this._start,M=this._ts,p=!M,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=en(u%m),u===l?(_=this._repeat,h=c):(E=en(u/m),_=~~E,_&&_===E&&(h=c,_--),h>c&&(h=c)),E=aa(this._tTime,m),!a&&this._tTime&&E!==_&&this._tTime-E*m-this._dur<=0&&(E=_),C&&_&1&&(h=c-h,A=1),_!==E&&!this._lock){var D=C&&E&1,T=D===(C&&_&1);if(_<E&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(A?0:en(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&gi(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,T&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Ov(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=vC(this,en(a),en(h)),b&&(u-=h-(h=b._start))),this._tTime=u,this._time=h,this._act=!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!s&&!E&&(gi(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-Ct);break}}d=g}else{d=this._last;for(var S=r<0?r:h;d;){if(g=d._prev,(d._act||S<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(S-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(S-d._start)*d._ts,s,o||mn&&Mp(d)),h!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=S?-Ct:Ct);break}}d=g}}if(b&&!s&&(this.pause(),b.render(h>=a?0:-Ct)._zTime=h>=a?1:-1,this._ts))return this._start=v,zu(this),this.render(r,s,o);this._onUpdate&&!s&&gi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ps(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(gi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(zr(s)||(s=bi(this,s,r)),!(r instanceof Pl)){if(Tn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(hn(r))return this.addLabel(r,s);if(Wt(r))r=Qt.delayedCall(0,r);else return this}return this!==r?nr(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Pi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Qt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return hn(r)?this.removeLabel(r):Wt(r)?this.killTweensOf(r):(r.parent===this&&ku(this,r),r===this._recent&&(this._recent=this._last),Xs(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=en(hi.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=bi(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Qt.delayedCall(0,s||Al,o);return a.data="isPause",this._hasPause=1,nr(this,a,bi(this,r))},t.removePause=function(r){var s=this._first;for(r=bi(this,r);s;)s._start===r&&s.data==="isPause"&&ps(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)rs!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Di(r),l=this._first,c=zr(s),u;l;)l instanceof Qt?fC(l._targets,a)&&(c?(!rs||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=bi(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Qt.to(o,xi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ct,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&la(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,xi({startAt:{time:bi(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),zg(this,bi(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),zg(this,bi(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ct)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Xs(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Xs(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Pi,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,nr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;la(o,o===zt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(zt._ts&&(gv(zt,pu(r,zt)),pv=hi.frame),hi.frame>=Og){Og+=_i.autoSleep||120;var s=zt._first;if((!s||!s._ts)&&_i.autoSleep&&hi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||hi.sleep()}}},e})(Pl);xi(Fn.prototype,{_lock:0,_hasPause:0,_forcing:0});var UC=function(e,t,n,r,s,o,a){var l=new Jn(this._pt,e,t,0,1,Wv,null,s),c=0,u=0,f,h,d,g,_,m,p,b;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=Rl(r)),o&&(b=[n,r],o(b,e,t),n=b[0],r=b[1]),h=n.match(kf)||[];f=kf.exec(r);)g=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?zo(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=kf.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(cv.test(r)||p)&&(l.e=0),this._pt=l,l},Tp=function(e,t,n,r,s,o,a,l,c,u){Wt(r)&&(r=r(s||0,e,o));var f=e[t],h=n!=="get"?n:Wt(f)?c?e[t.indexOf("set")||!Wt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Wt(f)?c?kC:Vv:Ep,g;if(hn(r)&&(~r.indexOf("random(")&&(r=Rl(r)),r.charAt(1)==="="&&(g=zo(h,r)+(Sn(h)||0),(g||g===0)&&(r=g))),!u||h!==r||pd)return!isNaN(h*r)&&r!==""?(g=new Jn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?HC:Gv,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&vp(t,r),UC.call(this,e,t,h,r,d,l||_i.stringFilter,c))},NC=function(e,t,n,r,s){if(Wt(e)&&(e=il(e,s,t,n,r)),!pr(e)||e.style&&e.nodeType||Tn(e)||av(e))return hn(e)?il(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=il(e[a],s,t,n,r);return o},kv=function(e,t,n,r,s,o){var a,l,c,u;if(ci[e]&&(a=new ci[e]).init(s,a.rawVars?t[e]:NC(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Jn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Lo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},rs,pd,bp=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,M=e._overwrite==="auto"&&!pp,v=e.timeline,E,C,A,D,T,S,I,F,Y,$,j,W,V;if(v&&(!h||!s)&&(s="none"),e._ease=Ys(s,sa.ease),e._yEase=f?Nv(Ys(f===!0?s:f,sa.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(F=m[0]?Ws(m[0]).harness:0,W=F&&r[F.prop],E=du(r,xp),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Gc:cC),_._lazy=0),o){if(ps(e._startAt=Qt.set(m,xi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return gi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(mn||!a&&!d)&&e._startAt.revert(Gc),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),A=xi({overwrite:!1,data:"isFromStart",lazy:a&&!_&&$n(l),immediateRender:a,stagger:0,parent:p},E),W&&(A[F.prop]=W),ps(e._startAt=Qt.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(mn?e._startAt.revert(Gc):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,Ct,Ct);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&$n(l)||l&&!g,C=0;C<m.length;C++){if(T=m[C],I=T._gsap||Sp(m)[C]._gsap,e._ptLookup[C]=$={},ld[I.id]&&us.length&&hu(),j=b===m?C:b.indexOf(T),F&&(Y=new F).init(T,W||E,e,j,b)!==!1&&(e._pt=D=new Jn(e._pt,T,Y.name,0,1,Y.render,Y,0,Y.priority),Y._props.forEach(function(B){$[B]=D}),Y.priority&&(S=1)),!F||W)for(A in E)ci[A]&&(Y=kv(A,E,e,j,T,b))?Y.priority&&(S=1):$[A]=D=Tp.call(e,T,A,"get",E[A],j,b,0,r.stringFilter);e._op&&e._op[C]&&e.kill(T,e._op[C]),M&&e._pt&&(rs=e,zt.killTweensOf(T,$,e.globalTime(t)),V=!e.parent,rs=0),e._pt&&l&&(ld[I.id]=1)}S&&Xv(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!V,h&&t<=0&&v.render(Pi,!0,!0)},OC=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return pd=1,e.vars[t]="+=0",bp(e,a),pd=0,l?wl(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=qt(n)+Sn(f.e)),f.b&&(f.b=u.s+Sn(f.b))},FC=function(e,t){var n=e[0]?Ws(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=oa({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},BC=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(Tn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},il=function(e,t,n,r,s){return Wt(e)?e.call(t,n,r,s):hn(e)&&~e.indexOf("random(")?Rl(e):e},zv=yp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Hv={};Zn(zv+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Hv[i]=1});var Qt=(function(i){sv(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:tl(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=r.parent||zt,M=(Tn(n)||av(n)?zr(n[0]):"length"in r)?[n]:Di(n),v,E,C,A,D,T,S,I;if(a._targets=M.length?Sp(M):wl("GSAP target "+n+" not found. https://gsap.com",!_i.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||xc(c)||xc(u)){if(r=a.vars,v=a.timeline=new Fn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:M}),v.kill(),v.parent=v._dp=wr(a),v._start=0,h||xc(c)||xc(u)){if(A=M.length,S=h&&Ev(h),pr(h))for(D in h)~zv.indexOf(D)&&(I||(I={}),I[D]=h[D]);for(E=0;E<A;E++)C=du(r,Hv),C.stagger=0,p&&(C.yoyoEase=p),I&&oa(C,I),T=M[E],C.duration=+il(c,wr(a),E,T,M),C.delay=(+il(u,wr(a),E,T,M)||0)-a._delay,!h&&A===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(T,C,S?S(E,T,M):0),v._ease=pt.none;v.duration()?c=u=0:a.timeline=0}else if(g){tl(xi(v.vars.defaults,{ease:"none"})),v._ease=Ys(g.ease||r.ease||"none");var F=0,Y,$,j;if(Tn(g))g.forEach(function(W){return v.to(M,W,">")}),v.duration();else{C={};for(D in g)D==="ease"||D==="easeEach"||BC(D,g[D],C,g.easeEach);for(D in C)for(Y=C[D].sort(function(W,V){return W.t-V.t}),F=0,E=0;E<Y.length;E++)$=Y[E],j={ease:$.e,duration:($.t-(E?Y[E-1].t:0))/100*c},j[D]=$.v,v.to(M,j,F),F+=j.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!pp&&(rs=wr(a),zt.killTweensOf(M),rs=0),nr(b,wr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===en(b._time)&&$n(f)&&mC(wr(a))&&b.data!=="nested")&&(a._tTime=-Ct,a.render(Math.max(0,-u)||0)),m&&Sv(wr(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Ct&&!u?l:r<Ct?0:r,h,d,g,_,m,p,b,M,v;if(!c)_C(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,M=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=en(f%_),f===l?(g=this._repeat,h=c):(m=en(f/_),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,h=c-h),m=aa(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(M&&this._yEase&&Ov(M,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(en(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Mv(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(h/c),this._from&&(this.ratio=b=1-b),!a&&f&&!s&&!m&&(gi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;M&&M.render(r<0?r:M._dur*M._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&cd(this,r,s,o),gi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&gi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&cd(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ps(this,1),!s&&!(u&&!a)&&(f||a||p)&&(gi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){Cl||hi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||bp(this,c),u=this._ease(c/this._dur),OC(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Hu(this,0),this.parent||xv(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Oa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!mn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,rs&&rs.vars.overwrite!==!0)._first||Oa(this),this.parent&&o!==this.timeline.totalDuration()&&la(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Di(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&dC(a,l))return s==="all"&&(this._pt=0),Oa(this);for(f=this._op=this._op||[],s!=="all"&&(hn(s)&&(_={},Zn(s,function(b){return _[b]=1}),s=_),s=FC(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&ku(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Oa(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return nl(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return nl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return zt.killTweensOf(r,s,o)},e})(Pl);xi(Qt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Zn("staggerTo,staggerFrom,staggerFromTo",function(i){Qt[i]=function(){var e=new Fn,t=fd.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Ep=function(e,t,n){return e[t]=n},Vv=function(e,t,n){return e[t](n)},kC=function(e,t,n,r){return e[t](r.fp,n)},zC=function(e,t,n){return e.setAttribute(t,n)},wp=function(e,t){return Wt(e[t])?Vv:mp(e[t])&&e.setAttribute?zC:Ep},Gv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},HC=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Wv=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ap=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},VC=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},GC=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?ku(this,t,"_pt"):t.dep||(n=1),t=r;return!n},WC=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Xv=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Jn=(function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||Gv,this.d=l||this,this.set=c||Ep,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=WC,this.m=n,this.mt=s,this.tween=r},i})();Zn(yp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return xp[i]=1});vi.TweenMax=vi.TweenLite=Qt;vi.TimelineLite=vi.TimelineMax=Fn;zt=new Fn({sortChildren:!1,defaults:sa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});_i.stringFilter=Uv;var qs=[],Xc={},XC=[],Vg=0,YC=0,Wf=function(e){return(Xc[e]||XC).map(function(t){return t()})},md=function(){var e=Date.now(),t=[];e-Vg>2&&(Wf("matchMediaInit"),qs.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=$i.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Wf("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Vg=e,Wf("matchMedia"))},Yv=(function(){function i(t,n){this.selector=n&&hd(n),this.data=[],this._r=[],this.isReverted=!1,this.id=YC++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){Wt(n)&&(s=r,r=n,n=Wt);var o=this,a=function(){var c=Ft,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=hd(s)),Ft=o,f=r.apply(o,arguments),Wt(f)&&o._r.push(f),Ft=c,o.selector=u,o.isReverted=!1,f};return o.last=a,n===Wt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=Ft;Ft=null,n(this),Ft=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Qt&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Fn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Qt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=qs.length;o--;)qs[o].id===this.id&&qs.splice(o,1)},e.revert=function(n){this.kill(n||{})},i})(),qC=(function(){function i(t){this.contexts=[],this.scope=t,Ft&&Ft.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){pr(n)||(n={matches:n});var o=new Yv(0,s||this.scope),a=o.conditions={},l,c,u;Ft&&!o.selector&&(o.selector=Ft.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=$i.matchMedia(n[c]),l&&(qs.indexOf(o)<0&&qs.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(md):l.addEventListener("change",md)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i})(),mu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return Dv(r)})},timeline:function(e){return new Fn(e)},getTweensOf:function(e,t){return zt.getTweensOf(e,t)},getProperty:function(e,t,n,r){hn(e)&&(e=Di(e)[0]);var s=Ws(e||{}).get,o=n?vv:_v;return n==="native"&&(n=""),e&&(t?o((ci[t]&&ci[t].get||s)(e,t,n,r)):function(a,l,c){return o((ci[a]&&ci[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Di(e),e.length>1){var r=e.map(function(u){return ei.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=ci[t],a=Ws(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Lo._pt=0,f.init(e,n?u+n:u,Lo,0,[e]),f.render(1,f),Lo._pt&&Ap(1,Lo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=ei.to(e,xi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return zt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ys(e.ease,sa.ease)),Fg(sa,e||{})},config:function(e){return Fg(_i,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!ci[a]&&!vi[a]&&wl(t+" effect requires "+a+" plugin.")}),zf[t]=function(a,l,c){return n(Di(a),xi(l||{},s),c)},o&&(Fn.prototype[t]=function(a,l,c){return this.add(zf[t](a,pr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){pt[e]=Ys(t)},parseEase:function(e,t){return arguments.length?Ys(e,t):pt},getById:function(e){return zt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Fn(e),r,s;for(n.smoothChildTiming=$n(e.smoothChildTiming),zt.remove(n),n._dp=0,n._time=n._tTime=zt._time,r=zt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Qt&&r.vars.onComplete===r._targets[0]))&&nr(n,r,r._start-r._delay),r=s;return nr(zt,n,0),n},context:function(e,t){return e?new Yv(e,t):Ft},matchMedia:function(e){return new qC(e)},matchMediaRefresh:function(){return qs.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||md()},addEventListener:function(e,t){var n=Xc[e]||(Xc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Xc[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:EC,wrapYoyo:wC,distribute:Ev,random:Av,snap:wv,normalize:bC,getUnit:Sn,clamp:yC,splitColor:Lv,toArray:Di,selector:hd,mapRange:Cv,pipe:MC,unitize:TC,interpolate:AC,shuffle:bv},install:hv,effects:zf,ticker:hi,updateRoot:Fn.updateRoot,plugins:ci,globalTimeline:zt,core:{PropTween:Jn,globals:dv,Tween:Qt,Timeline:Fn,Animation:Pl,getCache:Ws,_removeLinkedListItem:ku,reverting:function(){return mn},context:function(e){return e&&Ft&&(Ft.data.push(e),e._ctx=Ft),Ft},suppressOverwrites:function(e){return pp=e}}};Zn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return mu[i]=Qt[i]});hi.add(Fn.updateRoot);Lo=mu.to({},{duration:0});var KC=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},jC=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=KC(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},Xf=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},Zn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}jC(a,s)}}}},ei=mu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)mn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Xf("roundProps",dd),Xf("modifiers"),Xf("snap",wv))||mu;Qt.version=Fn.version=ei.version="3.13.0";fv=1;gp()&&ca();pt.Power0;pt.Power1;pt.Power2;pt.Power3;pt.Power4;pt.Linear;pt.Quad;pt.Cubic;pt.Quart;pt.Quint;pt.Strong;pt.Elastic;pt.Back;pt.SteppedEase;pt.Bounce;pt.Sine;pt.Expo;pt.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Gg,ss,Ho,Rp,zs,Wg,Cp,$C=function(){return typeof window<"u"},Hr={},Us=180/Math.PI,Vo=Math.PI/180,To=Math.atan2,Xg=1e8,Pp=/([A-Z])/g,ZC=/(left|right|width|margin|padding|x)/i,JC=/[\s,\(]\S/,sr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},gd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},QC=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},eP=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},tP=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},qv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Kv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},nP=function(e,t,n){return e.style[t]=n},iP=function(e,t,n){return e.style.setProperty(t,n)},rP=function(e,t,n){return e._gsap[t]=n},sP=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},oP=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},aP=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Ht="transform",Qn=Ht+"Origin",lP=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in Hr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=sr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Ar(r,a)}):this.tfm[e]=o.x?o[e]:Ar(r,e),e===Qn&&(this.tfm.zOrigin=o.zOrigin);else return sr.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(Ht)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Qn,t,"")),e=Ht}(s||t)&&this.props.push(e,t,s[e])},jv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},cP=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Pp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Cp(),(!s||!s.isStart)&&!n[Ht]&&(jv(n),r.zOrigin&&n[Qn]&&(n[Qn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},$v=function(e,t){var n={target:e,props:[],revert:cP,save:lP};return e._gsap||ei.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Zv,_d=function(e,t){var n=ss.createElementNS?ss.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ss.createElement(e);return n&&n.style?n:ss.createElement(e)},Li=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Pp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,ua(t)||t,1)||""},Yg="O,Moz,ms,Ms,Webkit".split(","),ua=function(e,t,n){var r=t||zs,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Yg[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Yg[o]:"")+e},vd=function(){$C()&&window.document&&(Gg=window,ss=Gg.document,Ho=ss.documentElement,zs=_d("div")||{style:{}},_d("div"),Ht=ua(Ht),Qn=Ht+"Origin",zs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zv=!!ua("perspective"),Cp=ei.core.reverting,Rp=1)},qg=function(e){var t=e.ownerSVGElement,n=_d("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Ho.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Ho.removeChild(n),s},Kg=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Jv=function(e){var t,n;try{t=e.getBBox()}catch{t=qg(e),n=1}return t&&(t.width||t.height)||n||(t=qg(e)),t&&!t.width&&!t.x&&!t.y?{x:+Kg(e,["x","cx","x1"])||0,y:+Kg(e,["y","cy","y1"])||0,width:0,height:0}:t},Qv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Jv(e))},Js=function(e,t){if(t){var n=e.style,r;t in Hr&&t!==Qn&&(t=Ht),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(Pp,"-$1").toLowerCase())):n.removeAttribute(t)}},os=function(e,t,n,r,s,o){var a=new Jn(e._pt,t,n,0,1,o?Kv:qv);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},jg={deg:1,rad:1,turn:1},uP={grid:1,flex:1},ms=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=zs.style,l=ZC.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||jg[r]||jg[o])return s;if(o!=="px"&&!h&&(s=i(e,t,n,"px")),p=e.getCTM&&Qv(e),(d||o==="%")&&(Hr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],qt(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===ss||!_.appendChild)&&(_=ss.body),m=_._gsap,m&&d&&m.width&&l&&m.time===hi.time&&!m.uncache)return qt(s/m.width*f);if(d&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=f+r,g=e[u],b?e.style[t]=b:Js(e,t)}else(d||o==="%")&&!uP[Li(_,"display")]&&(a.position=Li(e,"position")),_===e&&(a.position="static"),_.appendChild(zs),g=zs[u],_.removeChild(zs),a.position="absolute";return l&&d&&(m=Ws(_),m.time=hi.time,m.width=_[u]),qt(h?g*s/f:g&&s?f/g*s:0)},Ar=function(e,t,n,r){var s;return Rp||vd(),t in sr&&t!=="transform"&&(t=sr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Hr[t]&&t!=="transform"?(s=Ll(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:_u(Li(e,Qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=gu[t]&&gu[t](e,t,n)||Li(e,t)||mv(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ms(e,t,s,n)+n:s},fP=function(e,t,n,r){if(!n||n==="none"){var s=ua(t,e,1),o=s&&Li(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Li(e,"borderTopColor"))}var a=new Jn(this._pt,e.style,t,0,1,Wv),l=0,c=0,u,f,h,d,g,_,m,p,b,M,v,E;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Li(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=Li(e,t)||r,_?e.style[t]=_:Js(e,t)),u=[n,r],Uv(u),n=u[0],r=u[1],h=n.match(Do)||[],E=r.match(Do)||[],E.length){for(;f=Do.exec(r);)m=f[0],b=r.substring(l,f.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=zo(d,m)+v),p=parseFloat(m),M=m.substr((p+"").length),l=Do.lastIndex-M.length,M||(M=M||_i.units[t]||v,l===r.length&&(r+=M,a.e+=M)),v!==M&&(d=ms(e,t,_,M)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Kv:qv;return cv.test(r)&&(a.e=0),this._pt=a,a},$g={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},hP=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=$g[n]||n,t[1]=$g[r]||r,t.join(" ")},dP=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Hr[a]&&(l=1,a=a==="transformOrigin"?Qn:Ht),Js(n,a);l&&(Js(n,Ht),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Ll(n,1),o.uncache=1,jv(r)))}},gu={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Jn(e._pt,t,n,0,0,dP);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},Dl=[1,0,0,1,0,0],ex={},tx=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Zg=function(e){var t=Li(e,Ht);return tx(t)?Dl:t.substr(7).match(lv).map(qt)},Dp=function(e,t){var n=e._gsap||Ws(e),r=e.style,s=Zg(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Dl:s):(s===Dl&&!e.offsetParent&&e!==Ho&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ho.appendChild(e)),s=Zg(e),l?r.display=l:Js(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ho.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},xd=function(e,t,n,r,s,o){var a=e._gsap,l=s||Dp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],M=t.split(" "),v=parseFloat(M[0])||0,E=parseFloat(M[1])||0,C,A,D,T;n?l!==Dl&&(A=d*m-g*_)&&(D=v*(m/A)+E*(-_/A)+(_*b-m*p)/A,T=v*(-g/A)+E*(d/A)-(d*b-g*p)/A,v=D,E=T):(C=Jv(e),v=C.x+(~M[0].indexOf("%")?v/100*C.width:v),E=C.y+(~(M[1]||M[0]).indexOf("%")?E/100*C.height:E)),r||r!==!1&&a.smooth?(p=v-c,b=E-u,a.xOffset=f+(p*d+b*_)-p,a.yOffset=h+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Qn]="0px 0px",o&&(os(o,a,"xOrigin",c,v),os(o,a,"yOrigin",u,E),os(o,a,"xOffset",f,a.xOffset),os(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},Ll=function(e,t){var n=e._gsap||new Bv(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Li(e,Qn)||"0",u,f,h,d,g,_,m,p,b,M,v,E,C,A,D,T,S,I,F,Y,$,j,W,V,B,ae,U,ge,Oe,Qe,Ke,qe;return u=f=h=_=m=p=b=M=v=0,d=g=1,n.svg=!!(e.getCTM&&Qv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ht]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ht]!=="none"?l[Ht]:"")),r.scale=r.rotate=r.translate="none"),A=Dp(e,n.svg),n.svg&&(n.uncache?(B=e.getBBox(),c=n.xOrigin-B.x+"px "+(n.yOrigin-B.y)+"px",V=""):V=!t&&e.getAttribute("data-svg-origin"),xd(e,V||c,!!V||n.originIsAbsolute,n.smooth!==!1,A)),E=n.xOrigin||0,C=n.yOrigin||0,A!==Dl&&(I=A[0],F=A[1],Y=A[2],$=A[3],u=j=A[4],f=W=A[5],A.length===6?(d=Math.sqrt(I*I+F*F),g=Math.sqrt($*$+Y*Y),_=I||F?To(F,I)*Us:0,b=Y||$?To(Y,$)*Us+_:0,b&&(g*=Math.abs(Math.cos(b*Vo))),n.svg&&(u-=E-(E*I+C*Y),f-=C-(E*F+C*$))):(qe=A[6],Qe=A[7],U=A[8],ge=A[9],Oe=A[10],Ke=A[11],u=A[12],f=A[13],h=A[14],D=To(qe,Oe),m=D*Us,D&&(T=Math.cos(-D),S=Math.sin(-D),V=j*T+U*S,B=W*T+ge*S,ae=qe*T+Oe*S,U=j*-S+U*T,ge=W*-S+ge*T,Oe=qe*-S+Oe*T,Ke=Qe*-S+Ke*T,j=V,W=B,qe=ae),D=To(-Y,Oe),p=D*Us,D&&(T=Math.cos(-D),S=Math.sin(-D),V=I*T-U*S,B=F*T-ge*S,ae=Y*T-Oe*S,Ke=$*S+Ke*T,I=V,F=B,Y=ae),D=To(F,I),_=D*Us,D&&(T=Math.cos(D),S=Math.sin(D),V=I*T+F*S,B=j*T+W*S,F=F*T-I*S,W=W*T-j*S,I=V,j=B),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=qt(Math.sqrt(I*I+F*F+Y*Y)),g=qt(Math.sqrt(W*W+qe*qe)),D=To(j,W),b=Math.abs(D)>2e-4?D*Us:0,v=Ke?1/(Ke<0?-Ke:Ke):0),n.svg&&(V=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!tx(Li(e,Ht)),V&&e.setAttribute("transform",V))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(d*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=qt(d),n.scaleY=qt(g),n.rotation=qt(_)+a,n.rotationX=qt(m)+a,n.rotationY=qt(p)+a,n.skewX=b+a,n.skewY=M+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Qn]=_u(c)),n.xOffset=n.yOffset=0,n.force3D=_i.force3D,n.renderTransform=n.svg?mP:Zv?nx:pP,n.uncache=0,n},_u=function(e){return(e=e.split(" "))[0]+" "+e[1]},Yf=function(e,t,n){var r=Sn(t);return qt(parseFloat(t)+parseFloat(ms(e,"x",n+"px",r)))+r},pP=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,nx(e,t)},Cs="0deg",Pa="0px",Ps=") ",nx=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,M=n.zOrigin,v="",E=p==="auto"&&e&&e!==1||p===!0;if(M&&(f!==Cs||u!==Cs)){var C=parseFloat(u)*Vo,A=Math.sin(C),D=Math.cos(C),T;C=parseFloat(f)*Vo,T=Math.cos(C),o=Yf(b,o,A*T*-M),a=Yf(b,a,-Math.sin(C)*-M),l=Yf(b,l,D*T*-M+M)}m!==Pa&&(v+="perspective("+m+Ps),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(E||o!==Pa||a!==Pa||l!==Pa)&&(v+=l!==Pa||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ps),c!==Cs&&(v+="rotate("+c+Ps),u!==Cs&&(v+="rotateY("+u+Ps),f!==Cs&&(v+="rotateX("+f+Ps),(h!==Cs||d!==Cs)&&(v+="skew("+h+", "+d+Ps),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Ps),b.style[Ht]=v||"translate(0, 0)"},mP=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,M=parseFloat(o),v=parseFloat(a),E,C,A,D,T;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Vo,c*=Vo,E=Math.cos(l)*f,C=Math.sin(l)*f,A=Math.sin(l-c)*-h,D=Math.cos(l-c)*h,c&&(u*=Vo,T=Math.tan(c-u),T=Math.sqrt(1+T*T),A*=T,D*=T,u&&(T=Math.tan(u),T=Math.sqrt(1+T*T),E*=T,C*=T)),E=qt(E),C=qt(C),A=qt(A),D=qt(D)):(E=f,D=h,C=A=0),(M&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(M=ms(d,"x",o,"px"),v=ms(d,"y",a,"px")),(g||_||m||p)&&(M=qt(M+g-(g*E+_*A)+m),v=qt(v+_-(g*C+_*D)+p)),(r||s)&&(T=d.getBBox(),M=qt(M+r/100*T.width),v=qt(v+s/100*T.height)),T="matrix("+E+","+C+","+A+","+D+","+M+","+v+")",d.setAttribute("transform",T),b&&(d.style[Ht]=T)},gP=function(e,t,n,r,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Us:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Xg)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Xg)%o-~~(c/o)*o)),e._pt=h=new Jn(e._pt,t,n,r,c,QC),h.e=u,h.u="deg",e._props.push(n),h},Jg=function(e,t){for(var n in t)e[n]=t[n];return e},_P=function(e,t,n){var r=Jg({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,f,h,d,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ht]=t,a=Ll(n,1),Js(n,Ht),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ht],o[Ht]=t,a=Ll(n,1),o[Ht]=c);for(l in Hr)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=Sn(c),g=Sn(u),f=d!==g?ms(n,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Jn(e._pt,a,l,f,h-f,gd),e._pt.u=g||0,e._props.push(l));Jg(a,r)};Zn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});gu[e>1?"border"+i:i]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Ar(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var ix={name:"css",register:vd,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,f,h,d,g,_,m,p,b,M,v,E,C,A,D;Rp||vd(),this.styles=this.styles||$v(e),D=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(ci[_]&&kv(_,t,n,r,e,s)))){if(d=typeof u,g=gu[_],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Rl(u)),g)g(this,e,_,u,n)&&(A=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",fs.lastIndex=0,fs.test(c)||(m=Sn(c),p=Sn(u)),p?m!==p&&(c=ms(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),D.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,e,s):l[_],hn(c)&&~c.indexOf("random(")&&(c=Rl(c)),Sn(c+"")||c==="auto"||(c+=_i.units[_]||Sn(Ar(e,_))||""),(c+"").charAt(1)==="="&&(c=Ar(e,_))):c=Ar(e,_),h=parseFloat(c),b=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),f=parseFloat(u),_ in sr&&(_==="autoAlpha"&&(h===1&&Ar(e,"visibility")==="hidden"&&f&&(h=0),D.push("visibility",0,a.visibility),os(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=sr[_],~_.indexOf(",")&&(_=_.split(",")[0]))),M=_ in Hr,M){if(this.styles.save(_),d==="string"&&u.substring(0,6)==="var(--"&&(u=Li(e,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),v||(E=e._gsap,E.renderTransform&&!t.parseTransform||Ll(e,t.parseTransform),C=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new Jn(this._pt,a,Ht,0,1,E.renderTransform,E,0,-1),v.dep=1),_==="scale")this._pt=new Jn(this._pt,E,"scaleY",E.scaleY,(b?zo(E.scaleY,b+f):f)-E.scaleY||0,gd),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){D.push(Qn,0,a[Qn]),u=hP(u),E.svg?xd(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&os(this,E,"zOrigin",E.zOrigin,p),os(this,a,_,_u(c),_u(u)));continue}else if(_==="svgOrigin"){xd(e,u,1,C,0,this);continue}else if(_ in ex){gP(this,E,_,h,b?zo(h,b+u):u);continue}else if(_==="smoothOrigin"){os(this,E,"smooth",E.smooth,u);continue}else if(_==="force3D"){E[_]=u;continue}else if(_==="transform"){_P(this,u,e);continue}}else _ in a||(_=ua(_)||_);if(M||(f||f===0)&&(h||h===0)&&!JC.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=Sn(u)||(_ in _i.units?_i.units[_]:m),m!==p&&(h=ms(e,_,c,p)),this._pt=new Jn(this._pt,M?E:a,_,h,(b?zo(h,b+f):f)-h,!M&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?tP:gd),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=eP);else if(_ in a)fP.call(this,e,_,c,b?b+u:u);else if(_ in e)this.add(e,_,c||e[_],b?b+u:u,r,s);else if(_!=="parseTransform"){vp(_,u);continue}M||(_ in a?D.push(_,0,a[_]):typeof e[_]=="function"?D.push(_,2,e[_]()):D.push(_,1,c||e[_])),o.push(_)}}A&&Xv(this)},render:function(e,t){if(t.tween._time||!Cp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ar,aliases:sr,getSetter:function(e,t,n){var r=sr[t];return r&&r.indexOf(",")<0&&(t=r),t in Hr&&t!==Qn&&(e._gsap.x||Ar(e,"x"))?n&&Wg===n?t==="scale"?sP:rP:(Wg=n||{})&&(t==="scale"?oP:aP):e.style&&!mp(e.style[t])?nP:~t.indexOf("-")?iP:wp(e,t)},core:{_removeProperty:Js,_getMatrix:Dp}};ei.utils.checkPrefix=ua;ei.core.getStyleSaver=$v;(function(i,e,t,n){var r=Zn(i+","+e+","+t,function(s){Hr[s]=1});Zn(e,function(s){_i.units[s]="deg",ex[s]=1}),sr[r[13]]=i+","+e,Zn(n,function(s){var o=s.split(":");sr[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Zn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){_i.units[i]="px"});ei.registerPlugin(ix);var Zt=ei.registerPlugin(ix)||ei;Zt.core.Tween;function vP(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function xP(i,e,t){return e&&vP(i.prototype,e),i}/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var pn,Yc,di,as,ls,Go,rx,Ns,rl,sx,Lr,Fi,ox,ax=function(){return pn||typeof window<"u"&&(pn=window.gsap)&&pn.registerPlugin&&pn},lx=1,Io=[],ut=[],ur=[],sl=Date.now,yd=function(e,t){return t},yP=function(){var e=rl.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,ut),r.push.apply(r,ur),ut=n,ur=r,yd=function(o,a){return t[o](a)}},hs=function(e,t){return~ur.indexOf(e)&&ur[ur.indexOf(e)+1][t]},ol=function(e){return!!~sx.indexOf(e)},Cn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},An=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},yc="scrollLeft",Sc="scrollTop",Sd=function(){return Lr&&Lr.isPressed||ut.cache++},vu=function(e,t){var n=function r(s){if(s||s===0){lx&&(di.history.scrollRestoration="manual");var o=Lr&&Lr.isPressed;s=r.v=Math.round(s)||(Lr&&Lr.iOS?1:0),e(s),r.cacheID=ut.cache,o&&yd("ss",s)}else(t||ut.cache!==r.cacheID||yd("ref"))&&(r.cacheID=ut.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},Bn={s:yc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:vu(function(i){return arguments.length?di.scrollTo(i,rn.sc()):di.pageXOffset||as[yc]||ls[yc]||Go[yc]||0})},rn={s:Sc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Bn,sc:vu(function(i){return arguments.length?di.scrollTo(Bn.sc(),i):di.pageYOffset||as[Sc]||ls[Sc]||Go[Sc]||0})},Yn=function(e,t){return(t&&t._ctx&&t._ctx.selector||pn.utils.toArray)(e)[0]||(typeof e=="string"&&pn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},SP=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},gs=function(e,t){var n=t.s,r=t.sc;ol(e)&&(e=as.scrollingElement||ls);var s=ut.indexOf(e),o=r===rn.sc?1:2;!~s&&(s=ut.push(e)-1),ut[s+o]||Cn(e,"scroll",Sd);var a=ut[s+o],l=a||(ut[s+o]=vu(hs(e,n),!0)||(ol(e)?r:vu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=pn.getProperty(e,"scrollBehavior")==="smooth"),l},Md=function(e,t,n){var r=e,s=e,o=sl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=sl();_||m-o>l?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=n?0:r,a=o=0},h=function(g){var _=a,m=s,p=sl();return(g||g===0)&&g!==r&&u(g),o===a||p-a>c?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:h}},Da=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Qg=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},cx=function(){rl=pn.core.globals().ScrollTrigger,rl&&rl.core&&yP()},ux=function(e){return pn=e||ax(),!Yc&&pn&&typeof document<"u"&&document.body&&(di=window,as=document,ls=as.documentElement,Go=as.body,sx=[di,as,ls,Go],pn.utils.clamp,ox=pn.core.context||function(){},Ns="onpointerenter"in Go?"pointer":"mouse",rx=Kt.isTouch=di.matchMedia&&di.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in di||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Fi=Kt.eventTypes=("ontouchstart"in ls?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ls?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return lx=0},500),cx(),Yc=1),Yc};Bn.op=rn;ut.cache=0;var Kt=(function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Yc||ux(pn)||console.warn("Please gsap.registerPlugin(Observer)"),rl||cx();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,M=n.onPress,v=n.onRelease,E=n.onRight,C=n.onLeft,A=n.onUp,D=n.onDown,T=n.onChangeX,S=n.onChangeY,I=n.onChange,F=n.onToggleX,Y=n.onToggleY,$=n.onHover,j=n.onHoverEnd,W=n.onMove,V=n.ignoreCheck,B=n.isNormalizer,ae=n.onGestureStart,U=n.onGestureEnd,ge=n.onWheel,Oe=n.onEnable,Qe=n.onDisable,Ke=n.onClick,qe=n.scrollSpeed,ne=n.capture,se=n.allowClicks,Me=n.lockAxis,Ie=n.onLockAxis;this.target=a=Yn(a)||ls,this.vars=n,d&&(d=pn.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,qe=qe||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(di.getComputedStyle(Go).lineHeight)||22);var Ce,We,L,x,G,Z,K,P=this,le=0,J=0,re=n.passive||!u&&n.passive!==!1,ie=gs(a,Bn),Se=gs(a,rn),R=ie(),y=Se(),O=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Fi[0]==="pointerdown",q=ol(a),ee=a.ownerDocument||as,X=[0,0,0],ve=[0,0,0],ue=0,be=function(){return ue=sl()},me=function(Fe,Je){return(P.event=Fe)&&d&&SP(Fe.target,d)||Je&&O&&Fe.pointerType!=="touch"||V&&V(Fe,Je)},he=function(){P._vx.reset(),P._vy.reset(),We.pause(),f&&f(P)},xe=function(){var Fe=P.deltaX=Qg(X),Je=P.deltaY=Qg(ve),Te=Math.abs(Fe)>=r,Xe=Math.abs(Je)>=r;I&&(Te||Xe)&&I(P,Fe,Je,X,ve),Te&&(E&&P.deltaX>0&&E(P),C&&P.deltaX<0&&C(P),T&&T(P),F&&P.deltaX<0!=le<0&&F(P),le=P.deltaX,X[0]=X[1]=X[2]=0),Xe&&(D&&P.deltaY>0&&D(P),A&&P.deltaY<0&&A(P),S&&S(P),Y&&P.deltaY<0!=J<0&&Y(P),J=P.deltaY,ve[0]=ve[1]=ve[2]=0),(x||L)&&(W&&W(P),L&&(m&&L===1&&m(P),b&&b(P),L=0),x=!1),Z&&!(Z=!1)&&Ie&&Ie(P),G&&(ge(P),G=!1),Ce=0},Pe=function(Fe,Je,Te){X[Te]+=Fe,ve[Te]+=Je,P._vx.update(Fe),P._vy.update(Je),c?Ce||(Ce=requestAnimationFrame(xe)):xe()},Ee=function(Fe,Je){Me&&!K&&(P.axis=K=Math.abs(Fe)>Math.abs(Je)?"x":"y",Z=!0),K!=="y"&&(X[2]+=Fe,P._vx.update(Fe,!0)),K!=="x"&&(ve[2]+=Je,P._vy.update(Je,!0)),c?Ce||(Ce=requestAnimationFrame(xe)):xe()},_e=function(Fe){if(!me(Fe,1)){Fe=Da(Fe,u);var Je=Fe.clientX,Te=Fe.clientY,Xe=Je-P.x,ze=Te-P.y,$e=P.isDragging;P.x=Je,P.y=Te,($e||(Xe||ze)&&(Math.abs(P.startX-Je)>=s||Math.abs(P.startY-Te)>=s))&&(L=$e?2:1,$e||(P.isDragging=!0),Ee(Xe,ze))}},Ge=P.onPress=function(Re){me(Re,1)||Re&&Re.button||(P.axis=K=null,We.pause(),P.isPressed=!0,Re=Da(Re),le=J=0,P.startX=P.x=Re.clientX,P.startY=P.y=Re.clientY,P._vx.reset(),P._vy.reset(),Cn(B?a:ee,Fi[1],_e,re,!0),P.deltaX=P.deltaY=0,M&&M(P))},N=P.onRelease=function(Re){if(!me(Re,1)){An(B?a:ee,Fi[1],_e,!0);var Fe=!isNaN(P.y-P.startY),Je=P.isDragging,Te=Je&&(Math.abs(P.x-P.startX)>3||Math.abs(P.y-P.startY)>3),Xe=Da(Re);!Te&&Fe&&(P._vx.reset(),P._vy.reset(),u&&se&&pn.delayedCall(.08,function(){if(sl()-ue>300&&!Re.defaultPrevented){if(Re.target.click)Re.target.click();else if(ee.createEvent){var ze=ee.createEvent("MouseEvents");ze.initMouseEvent("click",!0,!0,di,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),Re.target.dispatchEvent(ze)}}})),P.isDragging=P.isGesturing=P.isPressed=!1,f&&Je&&!B&&We.restart(!0),L&&xe(),p&&Je&&p(P),v&&v(P,Te)}},de=function(Fe){return Fe.touches&&Fe.touches.length>1&&(P.isGesturing=!0)&&ae(Fe,P.isDragging)},pe=function(){return(P.isGesturing=!1)||U(P)},we=function(Fe){if(!me(Fe)){var Je=ie(),Te=Se();Pe((Je-R)*qe,(Te-y)*qe,1),R=Je,y=Te,f&&We.restart(!0)}},fe=function(Fe){if(!me(Fe)){Fe=Da(Fe,u),ge&&(G=!0);var Je=(Fe.deltaMode===1?l:Fe.deltaMode===2?di.innerHeight:1)*g;Pe(Fe.deltaX*Je,Fe.deltaY*Je,0),f&&!B&&We.restart(!0)}},oe=function(Fe){if(!me(Fe)){var Je=Fe.clientX,Te=Fe.clientY,Xe=Je-P.x,ze=Te-P.y;P.x=Je,P.y=Te,x=!0,f&&We.restart(!0),(Xe||ze)&&Ee(Xe,ze)}},Le=function(Fe){P.event=Fe,$(P)},Ve=function(Fe){P.event=Fe,j(P)},gt=function(Fe){return me(Fe)||Da(Fe,u)&&Ke(P)};We=P._dc=pn.delayedCall(h||.25,he).pause(),P.deltaX=P.deltaY=0,P._vx=Md(0,50,!0),P._vy=Md(0,50,!0),P.scrollX=ie,P.scrollY=Se,P.isDragging=P.isGesturing=P.isPressed=!1,ox(this),P.enable=function(Re){return P.isEnabled||(Cn(q?ee:a,"scroll",Sd),o.indexOf("scroll")>=0&&Cn(q?ee:a,"scroll",we,re,ne),o.indexOf("wheel")>=0&&Cn(a,"wheel",fe,re,ne),(o.indexOf("touch")>=0&&rx||o.indexOf("pointer")>=0)&&(Cn(a,Fi[0],Ge,re,ne),Cn(ee,Fi[2],N),Cn(ee,Fi[3],N),se&&Cn(a,"click",be,!0,!0),Ke&&Cn(a,"click",gt),ae&&Cn(ee,"gesturestart",de),U&&Cn(ee,"gestureend",pe),$&&Cn(a,Ns+"enter",Le),j&&Cn(a,Ns+"leave",Ve),W&&Cn(a,Ns+"move",oe)),P.isEnabled=!0,P.isDragging=P.isGesturing=P.isPressed=x=L=!1,P._vx.reset(),P._vy.reset(),R=ie(),y=Se(),Re&&Re.type&&Ge(Re),Oe&&Oe(P)),P},P.disable=function(){P.isEnabled&&(Io.filter(function(Re){return Re!==P&&ol(Re.target)}).length||An(q?ee:a,"scroll",Sd),P.isPressed&&(P._vx.reset(),P._vy.reset(),An(B?a:ee,Fi[1],_e,!0)),An(q?ee:a,"scroll",we,ne),An(a,"wheel",fe,ne),An(a,Fi[0],Ge,ne),An(ee,Fi[2],N),An(ee,Fi[3],N),An(a,"click",be,!0),An(a,"click",gt),An(ee,"gesturestart",de),An(ee,"gestureend",pe),An(a,Ns+"enter",Le),An(a,Ns+"leave",Ve),An(a,Ns+"move",oe),P.isEnabled=P.isPressed=P.isDragging=!1,Qe&&Qe(P))},P.kill=P.revert=function(){P.disable();var Re=Io.indexOf(P);Re>=0&&Io.splice(Re,1),Lr===P&&(Lr=0)},Io.push(P),B&&ol(a)&&(Lr=P),P.enable(_)},xP(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i})();Kt.version="3.13.0";Kt.create=function(i){return new Kt(i)};Kt.register=ux;Kt.getAll=function(){return Io.slice()};Kt.getById=function(i){return Io.filter(function(e){return e.vars.id===i})[0]};ax()&&pn.registerPlugin(Kt);/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ne,Ro,ct,Pt,fi,xt,Lp,xu,Il,al,Ba,Mc,vn,Vu,Td,Ln,e_,t_,Co,fx,qf,hx,Dn,bd,dx,px,Zr,Ed,Ip,Wo,Up,yu,wd,Kf,Tc=1,xn=Date.now,jf=xn(),Ii=0,ka=0,n_=function(e,t,n){var r=li(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},i_=function(e,t){return t&&(!li(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},MP=function i(){return ka&&requestAnimationFrame(i)},r_=function(){return Vu=1},s_=function(){return Vu=0},Zi=function(e){return e},za=function(e){return Math.round(e*1e5)/1e5||0},mx=function(){return typeof window<"u"},gx=function(){return Ne||mx()&&(Ne=window.gsap)&&Ne.registerPlugin&&Ne},Qs=function(e){return!!~Lp.indexOf(e)},_x=function(e){return(e==="Height"?Up:ct["inner"+e])||fi["client"+e]||xt["client"+e]},vx=function(e){return hs(e,"getBoundingClientRect")||(Qs(e)?function(){return Zc.width=ct.innerWidth,Zc.height=Up,Zc}:function(){return Cr(e)})},TP=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=hs(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?_x(s):e["client"+s])||0}},bP=function(e,t){return!t||~ur.indexOf(e)?vx(e):function(){return Zc}},or=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=hs(e,n))?o()-vx(e)()[s]:Qs(e)?(fi[n]||xt[n])-_x(r):e[n]-e["offset"+r])},bc=function(e,t){for(var n=0;n<Co.length;n+=3)(!t||~t.indexOf(Co[n+1]))&&e(Co[n],Co[n+1],Co[n+2])},li=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},Ha=function(e){return typeof e=="number"},Os=function(e){return typeof e=="object"},La=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},$f=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},bo=Math.abs,xx="left",yx="top",Np="right",Op="bottom",Ks="width",js="height",ll="Right",cl="Left",ul="Top",fl="Bottom",Jt="padding",wi="margin",fa="Width",Fp="Height",nn="px",Ai=function(e){return ct.getComputedStyle(e)},EP=function(e){var t=Ai(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},o_=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Cr=function(e,t){var n=t&&Ai(e)[Td]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ne.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect();return n&&n.progress(0).kill(),r},Su=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Sx=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},wP=function(e){return function(t){return Ne.utils.snap(Sx(e),t)}},Bp=function(e){var t=Ne.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},AP=function(e){return function(t,n){return Bp(Sx(e))(t,n.direction)}},Ec=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},cn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},ln=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},wc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},a_={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ac={toggleActions:"play",anticipatePin:0},Mu={top:0,left:0,center:.5,bottom:1,right:1},qc=function(e,t){if(li(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Mu?Mu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Rc=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Pt.createElement("div"),_=Qs(n)||hs(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?xt:n,b=e.indexOf("start")!==-1,M=b?c:u,v="border-color:"+M+";font-size:"+f+";color:"+M+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(r===rn?Np:Op)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],Kc(g,0,r,b),g},Kc=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+fa]=1,s["border"+a+fa]=0,s[n.p]=t+"px",Ne.set(e,s)},at=[],Ad={},Ul,l_=function(){return xn()-Ii>34&&(Ul||(Ul=requestAnimationFrame(Or)))},Eo=function(){(!Dn||!Dn.isPressed||Dn.startX>xt.clientWidth)&&(ut.cache++,Dn?Ul||(Ul=requestAnimationFrame(Or)):Or(),Ii||to("scrollStart"),Ii=xn())},Zf=function(){px=ct.innerWidth,dx=ct.innerHeight},Va=function(e){ut.cache++,(e===!0||!vn&&!hx&&!Pt.fullscreenElement&&!Pt.webkitFullscreenElement&&(!bd||px!==ct.innerWidth||Math.abs(ct.innerHeight-dx)>ct.innerHeight*.25))&&xu.restart(!0)},eo={},RP=[],Mx=function i(){return ln(nt,"scrollEnd",i)||Hs(!0)},to=function(e){return eo[e]&&eo[e].map(function(t){return t()})||RP},ai=[],Tx=function(e){for(var t=0;t<ai.length;t+=5)(!e||ai[t+4]&&ai[t+4].query===e)&&(ai[t].style.cssText=ai[t+1],ai[t].getBBox&&ai[t].setAttribute("transform",ai[t+2]||""),ai[t+3].uncache=1)},kp=function(e,t){var n;for(Ln=0;Ln<at.length;Ln++)n=at[Ln],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));yu=!0,t&&Tx(t),t||to("revert")},bx=function(e,t){ut.cache++,(t||!In)&&ut.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),li(e)&&(ct.history.scrollRestoration=Ip=e)},In,$s=0,c_,CP=function(){if(c_!==$s){var e=c_=$s;requestAnimationFrame(function(){return e===$s&&Hs(!0)})}},Ex=function(){xt.appendChild(Wo),Up=!Dn&&Wo.offsetHeight||ct.innerHeight,xt.removeChild(Wo)},u_=function(e){return Il(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Hs=function(e,t){if(fi=Pt.documentElement,xt=Pt.body,Lp=[ct,Pt,fi,xt],Ii&&!e&&!yu){cn(nt,"scrollEnd",Mx);return}Ex(),In=nt.isRefreshing=!0,ut.forEach(function(r){return Mn(r)&&++r.cacheID&&(r.rec=r())});var n=to("refreshInit");fx&&nt.sort(),t||kp(),ut.forEach(function(r){Mn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),at.slice(0).forEach(function(r){return r.refresh()}),yu=!1,at.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),wd=1,u_(!0),at.forEach(function(r){var s=or(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),u_(!1),wd=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),ut.forEach(function(r){Mn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),bx(Ip,1),xu.pause(),$s++,In=2,Or(2),at.forEach(function(r){return Mn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),In=nt.isRefreshing=!1,to("refresh")},Rd=0,jc=1,hl,Or=function(e){if(e===2||!In&&!yu){nt.isUpdating=!0,hl&&hl.update(0);var t=at.length,n=xn(),r=n-jf>=50,s=t&&at[0].scroll();if(jc=Rd>s?-1:1,In||(Rd=s),r&&(Ii&&!Vu&&n-Ii>200&&(Ii=0,to("scrollEnd")),Ba=jf,jf=n),jc<0){for(Ln=t;Ln-- >0;)at[Ln]&&at[Ln].update(0,r);jc=1}else for(Ln=0;Ln<t;Ln++)at[Ln]&&at[Ln].update(0,r);nt.isUpdating=!1}Ul=0},Cd=[xx,yx,Op,Np,wi+fl,wi+ll,wi+ul,wi+cl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],$c=Cd.concat([Ks,js,"boxSizing","max"+fa,"max"+Fp,"position",wi,Jt,Jt+ul,Jt+ll,Jt+fl,Jt+cl]),PP=function(e,t,n){Xo(n);var r=e._gsap;if(r.spacerIsNative)Xo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Jf=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Cd.length,o=t.style,a=e.style,l;s--;)l=Cd[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Op]=a[Np]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ks]=Su(e,Bn)+nn,o[js]=Su(e,rn)+nn,o[Jt]=a[wi]=a[yx]=a[xx]="0",Xo(r),a[Ks]=a["max"+fa]=n[Ks],a[js]=a["max"+Fp]=n[js],a[Jt]=n[Jt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},DP=/([A-Z])/g,Xo=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||Ne.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(DP,"-$1").toLowerCase())}},Cc=function(e){for(var t=$c.length,n=e.style,r=[],s=0;s<t;s++)r.push($c[s],n[$c[s]]);return r.t=e,r},LP=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Zc={left:0,top:0},f_=function(e,t,n,r,s,o,a,l,c,u,f,h,d,g){Mn(e)&&(e=e(l)),li(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?qc("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,b;if(d&&d.seek(0),isNaN(e)||(e=+e),Ha(e))d&&(e=Ne.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&Kc(a,n,r,!0);else{Mn(t)&&(t=t(l));var M=(e||"0").split(" "),v,E,C,A;b=Yn(t,l)||xt,v=Cr(b)||{},(!v||!v.left&&!v.top)&&Ai(b).display==="none"&&(A=b.style.display,b.style.display="block",v=Cr(b),A?b.style.display=A:b.style.removeProperty("display")),E=qc(M[0],v[r.d]),C=qc(M[1]||"0",n),e=v[r.p]-c[r.p]-u+E+s-C,a&&Kc(a,C,r,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var D=e+n,T=o._isStart;m="scroll"+r.d2,Kc(o,D,r,T&&D>20||!T&&(f?Math.max(xt[m],fi[m]):o.parentNode[m])<=D+1),f&&(c=Cr(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+nn))}return d&&b&&(m=Cr(b),d.seek(h),p=Cr(b),d._caScrollDist=m[r.p]-p[r.p],e=e/d._caScrollDist*h),d&&d.seek(_),d?e:Math.round(e)},IP=/(webkit|moz|length|cssText|inset)/i,h_=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===xt){e._stOrig=s.cssText,a=Ai(e);for(o in a)!+o&&!IP.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;Ne.core.getCache(e).uncache=1,t.appendChild(e)}},wx=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},Pc=function(e,t,n){var r={};r[t.p]="+="+n,Ne.set(e,r)},d_=function(e,t){var n=gs(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||n();var _=wx(n,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){ut.cache++,o.tween&&Or()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Ne.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},cn(e,"wheel",n.wheelHandler),nt.isTouch&&cn(e,"touchmove",n.wheelHandler),s},nt=(function(){function i(t,n){Ro||i.register(Ne)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ed(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ka){this.update=this.refresh=this.kill=Zi;return}n=o_(li(n)||Ha(n)||n.nodeType?{trigger:n}:n,Ac);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,M=s.once,v=s.snap,E=s.pinReparent,C=s.pinSpacer,A=s.containerAnimation,D=s.fastScrollEnd,T=s.preventOverlaps,S=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Bn:rn,I=!f&&f!==0,F=Yn(n.scroller||ct),Y=Ne.core.getCache(F),$=Qs(F),j=("pinType"in n?n.pinType:hs(F,"pinType")||$&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],V=I&&n.toggleActions.split(" "),B="markers"in n?n.markers:Ac.markers,ae=$?0:parseFloat(Ai(F)["border"+S.p2+fa])||0,U=this,ge=n.onRefreshInit&&function(){return n.onRefreshInit(U)},Oe=TP(F,$,S),Qe=bP(F,$),Ke=0,qe=0,ne=0,se=gs(F,S),Me,Ie,Ce,We,L,x,G,Z,K,P,le,J,re,ie,Se,R,y,O,q,ee,X,ve,ue,be,me,he,xe,Pe,Ee,_e,Ge,N,de,pe,we,fe,oe,Le,Ve;if(U._startClamp=U._endClamp=!1,U._dir=S,m*=45,U.scroller=F,U.scroll=A?A.time.bind(A):se,We=se(),U.vars=n,r=r||n.animation,"refreshPriority"in n&&(fx=1,n.refreshPriority===-9999&&(hl=U)),Y.tweenScroll=Y.tweenScroll||{top:d_(F,rn),left:d_(F,Bn)},U.tweenTo=Me=Y.tweenScroll[S.p],U.scrubDuration=function(Te){de=Ha(Te)&&Te,de?N?N.duration(Te):N=Ne.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:de,paused:!0,onComplete:function(){return p&&p(U)}}):(N&&N.progress(1).kill(),N=0)},r&&(r.vars.lazy=!1,r._initted&&!U.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),U.animation=r.pause(),r.scrollTrigger=U,U.scrubDuration(f),_e=0,l||(l=r.vars.id)),v&&((!Os(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in xt.style&&Ne.set($?[xt,fi]:F,{scrollBehavior:"auto"}),ut.forEach(function(Te){return Mn(Te)&&Te.target===($?Pt.scrollingElement||fi:F)&&(Te.smooth=!1)}),Ce=Mn(v.snapTo)?v.snapTo:v.snapTo==="labels"?wP(r):v.snapTo==="labelsDirectional"?AP(r):v.directional!==!1?function(Te,Xe){return Bp(v.snapTo)(Te,xn()-qe<500?0:Xe.direction)}:Ne.utils.snap(v.snapTo),pe=v.duration||{min:.1,max:2},pe=Os(pe)?al(pe.min,pe.max):al(pe,pe),we=Ne.delayedCall(v.delay||de/2||.1,function(){var Te=se(),Xe=xn()-qe<500,ze=Me.tween;if((Xe||Math.abs(U.getVelocity())<10)&&!ze&&!Vu&&Ke!==Te){var $e=(Te-x)/ie,Xt=r&&!I?r.totalProgress():$e,it=Xe?0:(Xt-Ge)/(xn()-Ba)*1e3||0,Ot=Ne.utils.clamp(-$e,1-$e,bo(it/2)*it/.185),Yt=$e+(v.inertia===!1?0:Ot),It,wt,St=v,ti=St.onStart,Ut=St.onInterrupt,bn=St.onComplete;if(It=Ce(Yt,U),Ha(It)||(It=Yt),wt=Math.max(0,Math.round(x+It*ie)),Te<=G&&Te>=x&&wt!==Te){if(ze&&!ze._initted&&ze.data<=bo(wt-Te))return;v.inertia===!1&&(Ot=It-$e),Me(wt,{duration:pe(bo(Math.max(bo(Yt-Xt),bo(It-Xt))*.185/it/.05||0)),ease:v.ease||"power3",data:bo(wt-Te),onInterrupt:function(){return we.restart(!0)&&Ut&&Ut(U)},onComplete:function(){U.update(),Ke=se(),r&&!I&&(N?N.resetTo("totalProgress",It,r._tTime/r._tDur):r.progress(It)),_e=Ge=r&&!I?r.totalProgress():U.progress,b&&b(U),bn&&bn(U)}},Te,Ot*ie,wt-Te-Ot*ie),ti&&ti(U,Me.tween)}}else U.isActive&&Ke!==Te&&we.restart(!0)}).pause()),l&&(Ad[l]=U),h=U.trigger=Yn(h||d!==!0&&d),Ve=h&&h._gsap&&h._gsap.stRevert,Ve&&(Ve=Ve(U)),d=d===!0?h:Yn(d),li(a)&&(a={targets:h,className:a}),d&&(g===!1||g===wi||(g=!g&&d.parentNode&&d.parentNode.style&&Ai(d.parentNode).display==="flex"?!1:Jt),U.pin=d,Ie=Ne.core.getCache(d),Ie.spacer?Se=Ie.pinState:(C&&(C=Yn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Ie.spacerIsNative=!!C,C&&(Ie.spacerState=Cc(C))),Ie.spacer=O=C||Pt.createElement("div"),O.classList.add("pin-spacer"),l&&O.classList.add("pin-spacer-"+l),Ie.pinState=Se=Cc(d)),n.force3D!==!1&&Ne.set(d,{force3D:!0}),U.spacer=O=Ie.spacer,Ee=Ai(d),be=Ee[g+S.os2],ee=Ne.getProperty(d),X=Ne.quickSetter(d,S.a,nn),Jf(d,O,Ee),y=Cc(d)),B){J=Os(B)?o_(B,a_):a_,P=Rc("scroller-start",l,F,S,J,0),le=Rc("scroller-end",l,F,S,J,0,P),q=P["offset"+S.op.d2];var gt=Yn(hs(F,"content")||F);Z=this.markerStart=Rc("start",l,gt,S,J,q,0,A),K=this.markerEnd=Rc("end",l,gt,S,J,q,0,A),A&&(Le=Ne.quickSetter([Z,K],S.a,nn)),!j&&!(ur.length&&hs(F,"fixedMarkers")===!0)&&(EP($?xt:F),Ne.set([P,le],{force3D:!0}),he=Ne.quickSetter(P,S.a,nn),Pe=Ne.quickSetter(le,S.a,nn))}if(A){var Re=A.vars.onUpdate,Fe=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){U.update(0,0,1),Re&&Re.apply(A,Fe||[])})}if(U.previous=function(){return at[at.indexOf(U)-1]},U.next=function(){return at[at.indexOf(U)+1]},U.revert=function(Te,Xe){if(!Xe)return U.kill(!0);var ze=Te!==!1||!U.enabled,$e=vn;ze!==U.isReverted&&(ze&&(fe=Math.max(se(),U.scroll.rec||0),ne=U.progress,oe=r&&r.progress()),Z&&[Z,K,P,le].forEach(function(Xt){return Xt.style.display=ze?"none":"block"}),ze&&(vn=U,U.update(ze)),d&&(!E||!U.isActive)&&(ze?PP(d,O,Se):Jf(d,O,Ai(d),me)),ze||U.update(ze),vn=$e,U.isReverted=ze)},U.refresh=function(Te,Xe,ze,$e){if(!((vn||!U.enabled)&&!Xe)){if(d&&Te&&Ii){cn(i,"scrollEnd",Mx);return}!In&&ge&&ge(U),vn=U,Me.tween&&!ze&&(Me.tween.kill(),Me.tween=0),N&&N.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(ft){return ft.vars.immediateRender&&ft.render(0,!0,!0)})),U.isReverted||U.revert(!0,!0),U._subPinOffset=!1;var Xt=Oe(),it=Qe(),Ot=A?A.duration():or(F,S),Yt=ie<=.01||!ie,It=0,wt=$e||0,St=Os(ze)?ze.end:n.end,ti=n.endTrigger||h,Ut=Os(ze)?ze.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),bn=U.pinnedContainer=n.pinnedContainer&&Yn(n.pinnedContainer,U),yi=h&&Math.max(0,at.indexOf(U))||0,tn=yi,w,k,Q,te,z,ce,ye,Ue,De,He,ke,Be,et;for(B&&Os(ze)&&(Be=Ne.getProperty(P,S.p),et=Ne.getProperty(le,S.p));tn-- >0;)ce=at[tn],ce.end||ce.refresh(0,1)||(vn=U),ye=ce.pin,ye&&(ye===h||ye===d||ye===bn)&&!ce.isReverted&&(He||(He=[]),He.unshift(ce),ce.revert(!0,!0)),ce!==at[tn]&&(yi--,tn--);for(Mn(Ut)&&(Ut=Ut(U)),Ut=n_(Ut,"start",U),x=f_(Ut,h,Xt,S,se(),Z,P,U,it,ae,j,Ot,A,U._startClamp&&"_startClamp")||(d?-.001:0),Mn(St)&&(St=St(U)),li(St)&&!St.indexOf("+=")&&(~St.indexOf(" ")?St=(li(Ut)?Ut.split(" ")[0]:"")+St:(It=qc(St.substr(2),Xt),St=li(Ut)?Ut:(A?Ne.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,x):x)+It,ti=h)),St=n_(St,"end",U),G=Math.max(x,f_(St||(ti?"100% 0":Ot),ti,Xt,S,se()+It,K,le,U,it,ae,j,Ot,A,U._endClamp&&"_endClamp"))||-.001,It=0,tn=yi;tn--;)ce=at[tn],ye=ce.pin,ye&&ce.start-ce._pinPush<=x&&!A&&ce.end>0&&(w=ce.end-(U._startClamp?Math.max(0,ce.start):ce.start),(ye===h&&ce.start-ce._pinPush<x||ye===bn)&&isNaN(Ut)&&(It+=w*(1-ce.progress)),ye===d&&(wt+=w));if(x+=It,G+=It,U._startClamp&&(U._startClamp+=It),U._endClamp&&!In&&(U._endClamp=G||-.001,G=Math.min(G,or(F,S))),ie=G-x||(x-=.01)&&.001,Yt&&(ne=Ne.utils.clamp(0,1,Ne.utils.normalize(x,G,fe))),U._pinPush=wt,Z&&It&&(w={},w[S.a]="+="+It,bn&&(w[S.p]="-="+se()),Ne.set([Z,K],w)),d&&!(wd&&U.end>=or(F,S)))w=Ai(d),te=S===rn,Q=se(),ve=parseFloat(ee(S.a))+wt,!Ot&&G>1&&(ke=($?Pt.scrollingElement||fi:F).style,ke={style:ke,value:ke["overflow"+S.a.toUpperCase()]},$&&Ai(xt)["overflow"+S.a.toUpperCase()]!=="scroll"&&(ke.style["overflow"+S.a.toUpperCase()]="scroll")),Jf(d,O,w),y=Cc(d),k=Cr(d,!0),Ue=j&&gs(F,te?Bn:rn)(),g?(me=[g+S.os2,ie+wt+nn],me.t=O,tn=g===Jt?Su(d,S)+ie+wt:0,tn&&(me.push(S.d,tn+nn),O.style.flexBasis!=="auto"&&(O.style.flexBasis=tn+nn)),Xo(me),bn&&at.forEach(function(ft){ft.pin===bn&&ft.vars.pinSpacing!==!1&&(ft._subPinOffset=!0)}),j&&se(fe)):(tn=Su(d,S),tn&&O.style.flexBasis!=="auto"&&(O.style.flexBasis=tn+nn)),j&&(z={top:k.top+(te?Q-x:Ue)+nn,left:k.left+(te?Ue:Q-x)+nn,boxSizing:"border-box",position:"fixed"},z[Ks]=z["max"+fa]=Math.ceil(k.width)+nn,z[js]=z["max"+Fp]=Math.ceil(k.height)+nn,z[wi]=z[wi+ul]=z[wi+ll]=z[wi+fl]=z[wi+cl]="0",z[Jt]=w[Jt],z[Jt+ul]=w[Jt+ul],z[Jt+ll]=w[Jt+ll],z[Jt+fl]=w[Jt+fl],z[Jt+cl]=w[Jt+cl],R=LP(Se,z,E),In&&se(0)),r?(De=r._initted,qf(1),r.render(r.duration(),!0,!0),ue=ee(S.a)-ve+ie+wt,xe=Math.abs(ie-ue)>1,j&&xe&&R.splice(R.length-2,2),r.render(0,!0,!0),De||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),qf(0)):ue=ie,ke&&(ke.value?ke.style["overflow"+S.a.toUpperCase()]=ke.value:ke.style.removeProperty("overflow-"+S.a));else if(h&&se()&&!A)for(k=h.parentNode;k&&k!==xt;)k._pinOffset&&(x-=k._pinOffset,G-=k._pinOffset),k=k.parentNode;He&&He.forEach(function(ft){return ft.revert(!1,!0)}),U.start=x,U.end=G,We=L=In?fe:se(),!A&&!In&&(We<fe&&se(fe),U.scroll.rec=0),U.revert(!1,!0),qe=xn(),we&&(Ke=-1,we.restart(!0)),vn=0,r&&I&&(r._initted||oe)&&r.progress()!==oe&&r.progress(oe||0,!0).render(r.time(),!0,!0),(Yt||ne!==U.progress||A||_||r&&!r._initted)&&(r&&!I&&(r._initted||ne||r.vars.immediateRender!==!1)&&r.totalProgress(A&&x<-.001&&!ne?Ne.utils.normalize(x,G,0):ne,!0),U.progress=Yt||(We-x)/ie===ne?0:ne),d&&g&&(O._pinOffset=Math.round(U.progress*ue)),N&&N.invalidate(),isNaN(Be)||(Be-=Ne.getProperty(P,S.p),et-=Ne.getProperty(le,S.p),Pc(P,S,Be),Pc(Z,S,Be-($e||0)),Pc(le,S,et),Pc(K,S,et-($e||0))),Yt&&!In&&U.update(),u&&!In&&!re&&(re=!0,u(U),re=!1)}},U.getVelocity=function(){return(se()-L)/(xn()-Ba)*1e3||0},U.endAnimation=function(){La(U.callbackAnimation),r&&(N?N.progress(1):r.paused()?I||La(r,U.direction<0,1):La(r,r.reversed()))},U.labelToScroll=function(Te){return r&&r.labels&&(x||U.refresh()||x)+r.labels[Te]/r.duration()*ie||0},U.getTrailing=function(Te){var Xe=at.indexOf(U),ze=U.direction>0?at.slice(0,Xe).reverse():at.slice(Xe+1);return(li(Te)?ze.filter(function($e){return $e.vars.preventOverlaps===Te}):ze).filter(function($e){return U.direction>0?$e.end<=x:$e.start>=G})},U.update=function(Te,Xe,ze){if(!(A&&!ze&&!Te)){var $e=In===!0?fe:U.scroll(),Xt=Te?0:($e-x)/ie,it=Xt<0?0:Xt>1?1:Xt||0,Ot=U.progress,Yt,It,wt,St,ti,Ut,bn,yi;if(Xe&&(L=We,We=A?se():$e,v&&(Ge=_e,_e=r&&!I?r.totalProgress():it)),m&&d&&!vn&&!Tc&&Ii&&(!it&&x<$e+($e-L)/(xn()-Ba)*m?it=1e-4:it===1&&G>$e+($e-L)/(xn()-Ba)*m&&(it=.9999)),it!==Ot&&U.enabled){if(Yt=U.isActive=!!it&&it<1,It=!!Ot&&Ot<1,Ut=Yt!==It,ti=Ut||!!it!=!!Ot,U.direction=it>Ot?1:-1,U.progress=it,ti&&!vn&&(wt=it&&!Ot?0:it===1?1:Ot===1?2:3,I&&(St=!Ut&&V[wt+1]!=="none"&&V[wt+1]||V[wt],yi=r&&(St==="complete"||St==="reset"||St in r))),T&&(Ut||yi)&&(yi||f||!r)&&(Mn(T)?T(U):U.getTrailing(T).forEach(function(Q){return Q.endAnimation()})),I||(N&&!vn&&!Tc?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",it,r._tTime/r._tDur):(N.vars.totalProgress=it,N.invalidate().restart())):r&&r.totalProgress(it,!!(vn&&(qe||Te)))),d){if(Te&&g&&(O.style[g+S.os2]=be),!j)X(za(ve+ue*it));else if(ti){if(bn=!Te&&it>Ot&&G+1>$e&&$e+1>=or(F,S),E)if(!Te&&(Yt||bn)){var tn=Cr(d,!0),w=$e-x;h_(d,xt,tn.top+(S===rn?w:0)+nn,tn.left+(S===rn?0:w)+nn)}else h_(d,O);Xo(Yt||bn?R:y),xe&&it<1&&Yt||X(ve+(it===1&&!bn?ue:0))}}v&&!Me.tween&&!vn&&!Tc&&we.restart(!0),a&&(Ut||M&&it&&(it<1||!Kf))&&Il(a.targets).forEach(function(Q){return Q.classList[Yt||M?"add":"remove"](a.className)}),o&&!I&&!Te&&o(U),ti&&!vn?(I&&(yi&&(St==="complete"?r.pause().totalProgress(1):St==="reset"?r.restart(!0).pause():St==="restart"?r.restart(!0):r[St]()),o&&o(U)),(Ut||!Kf)&&(c&&Ut&&$f(U,c),W[wt]&&$f(U,W[wt]),M&&(it===1?U.kill(!1,1):W[wt]=0),Ut||(wt=it===1?1:3,W[wt]&&$f(U,W[wt]))),D&&!Yt&&Math.abs(U.getVelocity())>(Ha(D)?D:2500)&&(La(U.callbackAnimation),N?N.progress(1):La(r,St==="reverse"?1:!it,1))):I&&o&&!vn&&o(U)}if(Pe){var k=A?$e/A.duration()*(A._caScrollDist||0):$e;he(k+(P._isFlipped?1:0)),Pe(k)}Le&&Le(-$e/A.duration()*(A._caScrollDist||0))}},U.enable=function(Te,Xe){U.enabled||(U.enabled=!0,cn(F,"resize",Va),$||cn(F,"scroll",Eo),ge&&cn(i,"refreshInit",ge),Te!==!1&&(U.progress=ne=0,We=L=Ke=se()),Xe!==!1&&U.refresh())},U.getTween=function(Te){return Te&&Me?Me.tween:N},U.setPositions=function(Te,Xe,ze,$e){if(A){var Xt=A.scrollTrigger,it=A.duration(),Ot=Xt.end-Xt.start;Te=Xt.start+Ot*Te/it,Xe=Xt.start+Ot*Xe/it}U.refresh(!1,!1,{start:i_(Te,ze&&!!U._startClamp),end:i_(Xe,ze&&!!U._endClamp)},$e),U.update()},U.adjustPinSpacing=function(Te){if(me&&Te){var Xe=me.indexOf(S.d)+1;me[Xe]=parseFloat(me[Xe])+Te+nn,me[1]=parseFloat(me[1])+Te+nn,Xo(me)}},U.disable=function(Te,Xe){if(U.enabled&&(Te!==!1&&U.revert(!0,!0),U.enabled=U.isActive=!1,Xe||N&&N.pause(),fe=0,Ie&&(Ie.uncache=1),ge&&ln(i,"refreshInit",ge),we&&(we.pause(),Me.tween&&Me.tween.kill()&&(Me.tween=0)),!$)){for(var ze=at.length;ze--;)if(at[ze].scroller===F&&at[ze]!==U)return;ln(F,"resize",Va),$||ln(F,"scroll",Eo)}},U.kill=function(Te,Xe){U.disable(Te,Xe),N&&!Xe&&N.kill(),l&&delete Ad[l];var ze=at.indexOf(U);ze>=0&&at.splice(ze,1),ze===Ln&&jc>0&&Ln--,ze=0,at.forEach(function($e){return $e.scroller===U.scroller&&(ze=1)}),ze||In||(U.scroll.rec=0),r&&(r.scrollTrigger=null,Te&&r.revert({kill:!1}),Xe||r.kill()),Z&&[Z,K,P,le].forEach(function($e){return $e.parentNode&&$e.parentNode.removeChild($e)}),hl===U&&(hl=0),d&&(Ie&&(Ie.uncache=1),ze=0,at.forEach(function($e){return $e.pin===d&&ze++}),ze||(Ie.spacer=0)),n.onKill&&n.onKill(U)},at.push(U),U.enable(!1,!1),Ve&&Ve(U),r&&r.add&&!ie){var Je=U.update;U.update=function(){U.update=Je,ut.cache++,x||G||U.refresh()},Ne.delayedCall(.01,U.update),ie=.01,x=G=0}else U.refresh();d&&CP()},i.register=function(n){return Ro||(Ne=n||gx(),mx()&&window.document&&i.enable(),Ro=ka),Ro},i.defaults=function(n){if(n)for(var r in n)Ac[r]=n[r];return Ac},i.disable=function(n,r){ka=0,at.forEach(function(o){return o[r?"kill":"disable"](n)}),ln(ct,"wheel",Eo),ln(Pt,"scroll",Eo),clearInterval(Mc),ln(Pt,"touchcancel",Zi),ln(xt,"touchstart",Zi),Ec(ln,Pt,"pointerdown,touchstart,mousedown",r_),Ec(ln,Pt,"pointerup,touchend,mouseup",s_),xu.kill(),bc(ln);for(var s=0;s<ut.length;s+=3)wc(ln,ut[s],ut[s+1]),wc(ln,ut[s],ut[s+2])},i.enable=function(){if(ct=window,Pt=document,fi=Pt.documentElement,xt=Pt.body,Ne&&(Il=Ne.utils.toArray,al=Ne.utils.clamp,Ed=Ne.core.context||Zi,qf=Ne.core.suppressOverwrites||Zi,Ip=ct.history.scrollRestoration||"auto",Rd=ct.pageYOffset||0,Ne.core.globals("ScrollTrigger",i),xt)){ka=1,Wo=document.createElement("div"),Wo.style.height="100vh",Wo.style.position="absolute",Ex(),MP(),Kt.register(Ne),i.isTouch=Kt.isTouch,Zr=Kt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),bd=Kt.isTouch===1,cn(ct,"wheel",Eo),Lp=[ct,Pt,fi,xt],Ne.matchMedia?(i.matchMedia=function(c){var u=Ne.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Ne.addEventListener("matchMediaInit",function(){return kp()}),Ne.addEventListener("matchMediaRevert",function(){return Tx()}),Ne.addEventListener("matchMedia",function(){Hs(0,1),to("matchMedia")}),Ne.matchMedia().add("(orientation: portrait)",function(){return Zf(),Zf})):console.warn("Requires GSAP 3.11.0 or later"),Zf(),cn(Pt,"scroll",Eo);var n=xt.hasAttribute("style"),r=xt.style,s=r.borderTopStyle,o=Ne.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Cr(xt),rn.m=Math.round(a.top+rn.sc())||0,Bn.m=Math.round(a.left+Bn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(xt.setAttribute("style",""),xt.removeAttribute("style")),Mc=setInterval(l_,250),Ne.delayedCall(.5,function(){return Tc=0}),cn(Pt,"touchcancel",Zi),cn(xt,"touchstart",Zi),Ec(cn,Pt,"pointerdown,touchstart,mousedown",r_),Ec(cn,Pt,"pointerup,touchend,mouseup",s_),Td=Ne.utils.checkPrefix("transform"),$c.push(Td),Ro=xn(),xu=Ne.delayedCall(.2,Hs).pause(),Co=[Pt,"visibilitychange",function(){var c=ct.innerWidth,u=ct.innerHeight;Pt.hidden?(e_=c,t_=u):(e_!==c||t_!==u)&&Va()},Pt,"DOMContentLoaded",Hs,ct,"load",Hs,ct,"resize",Va],bc(cn),at.forEach(function(c){return c.enable(0,1)}),l=0;l<ut.length;l+=3)wc(ln,ut[l],ut[l+1]),wc(ln,ut[l],ut[l+2])}},i.config=function(n){"limitCallbacks"in n&&(Kf=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Mc)||(Mc=r)&&setInterval(l_,r),"ignoreMobileResize"in n&&(bd=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(bc(ln)||bc(cn,n.autoRefreshEvents||"none"),hx=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Yn(n),o=ut.indexOf(s),a=Qs(s);~o&&ut.splice(o,a?6:2),r&&(a?ur.unshift(ct,r,xt,r,fi,r):ur.unshift(s,r))},i.clearMatchMedia=function(n){at.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(li(n)?Yn(n):n).getBoundingClientRect(),a=o[s?Ks:js]*r||0;return s?o.right-a>0&&o.left+a<ct.innerWidth:o.bottom-a>0&&o.top+a<ct.innerHeight},i.positionInViewport=function(n,r,s){li(n)&&(n=Yn(n));var o=n.getBoundingClientRect(),a=o[s?Ks:js],l=r==null?a/2:r in Mu?Mu[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ct.innerWidth:(o.top+l)/ct.innerHeight},i.killAll=function(n){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=eo.killAll||[];eo={},r.forEach(function(s){return s()})}},i})();nt.version="3.13.0";nt.saveStyles=function(i){return i?Il(i).forEach(function(e){if(e&&e.style){var t=ai.indexOf(e);t>=0&&ai.splice(t,5),ai.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ne.core.getCache(e),Ed())}}):ai};nt.revert=function(i,e){return kp(!i,e)};nt.create=function(i,e){return new nt(i,e)};nt.refresh=function(i){return i?Va(!0):(Ro||nt.register())&&Hs(!0)};nt.update=function(i){return++ut.cache&&Or(i===!0?2:0)};nt.clearScrollMemory=bx;nt.maxScroll=function(i,e){return or(i,e?Bn:rn)};nt.getScrollFunc=function(i,e){return gs(Yn(i),e?Bn:rn)};nt.getById=function(i){return Ad[i]};nt.getAll=function(){return at.filter(function(i){return i.vars.id!=="ScrollSmoother"})};nt.isScrolling=function(){return!!Ii};nt.snapDirectional=Bp;nt.addEventListener=function(i,e){var t=eo[i]||(eo[i]=[]);~t.indexOf(e)||t.push(e)};nt.removeEventListener=function(i,e){var t=eo[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};nt.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=Ne.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),cn(nt,"refresh",function(){return s=e.batchMax()})),Il(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(nt.create(c))}),t};var p_=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Qf=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Kt.isTouch?" pinch-zoom":""):"none",e===fi&&i(xt,t)},Dc={auto:1,scroll:1},UP=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ne.core.getCache(s),a=xn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==xt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Dc[(l=Ai(s)).overflowY]||Dc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Qs(s)&&(Dc[(l=Ai(s)).overflowY]||Dc[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Ax=function(e,t,n,r){return Kt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&UP,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&cn(Pt,Kt.eventTypes[0],g_,!1,!0)},onDisable:function(){return ln(Pt,Kt.eventTypes[0],g_,!0)}})},NP=/(input|label|select|textarea)/i,m_,g_=function(e){var t=NP.test(e.target.tagName);(t||m_)&&(e._gsapAllow=!0,m_=t)},OP=function(e){Os(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Yn(e.target)||fi,u=Ne.core.globals().ScrollSmoother,f=u&&u.get(),h=Zr&&(e.content&&Yn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=gs(c,rn),g=gs(c,Bn),_=1,m=(Kt.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,p=0,b=Mn(r)?function(){return r(a)}:function(){return r||2.8},M,v,E=Ax(c,e.type,!0,s),C=function(){return v=!1},A=Zi,D=Zi,T=function(){l=or(c,rn),D=al(Zr?1:0,l),n&&(A=al(0,or(c,Bn))),M=$s},S=function(){h._gsap.y=za(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},I=function(){if(v){requestAnimationFrame(C);var B=za(a.deltaY/2),ae=D(d.v-B);if(h&&ae!==d.v+d.offset){d.offset=ae-d.v;var U=za((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+U+", 0, 1)",h._gsap.y=U+"px",d.cacheID=ut.cache,Or()}return!0}d.offset&&S(),v=!0},F,Y,$,j,W=function(){T(),F.isActive()&&F.vars.scrollY>l&&(d()>l?F.progress(1)&&d(l):F.resetTo("scrollY",l))};return h&&Ne.set(h,{y:"+=0"}),e.ignoreCheck=function(V){return Zr&&V.type==="touchmove"&&I()||_>1.05&&V.type!=="touchstart"||a.isGesturing||V.touches&&V.touches.length>1},e.onPress=function(){v=!1;var V=_;_=za((ct.visualViewport&&ct.visualViewport.scale||1)/m),F.pause(),V!==_&&Qf(c,_>1.01?!0:n?!1:"x"),Y=g(),$=d(),T(),M=$s},e.onRelease=e.onGestureStart=function(V,B){if(d.offset&&S(),!B)j.restart(!0);else{ut.cache++;var ae=b(),U,ge;n&&(U=g(),ge=U+ae*.05*-V.velocityX/.227,ae*=p_(g,U,ge,or(c,Bn)),F.vars.scrollX=A(ge)),U=d(),ge=U+ae*.05*-V.velocityY/.227,ae*=p_(d,U,ge,or(c,rn)),F.vars.scrollY=D(ge),F.invalidate().duration(ae).play(.01),(Zr&&F.vars.scrollY>=l||U>=l-1)&&Ne.to({},{onUpdate:W,duration:ae})}o&&o(V)},e.onWheel=function(){F._ts&&F.pause(),xn()-p>1e3&&(M=0,p=xn())},e.onChange=function(V,B,ae,U,ge){if($s!==M&&T(),B&&n&&g(A(U[2]===B?Y+(V.startX-V.x):g()+B-U[1])),ae){d.offset&&S();var Oe=ge[2]===ae,Qe=Oe?$+V.startY-V.y:d()+ae-ge[1],Ke=D(Qe);Oe&&Qe!==Ke&&($+=Ke-Qe),d(Ke)}(ae||B)&&Or()},e.onEnable=function(){Qf(c,n?!1:"x"),nt.addEventListener("refresh",W),cn(ct,"resize",W),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),E.enable()},e.onDisable=function(){Qf(c,!0),ln(ct,"resize",W),nt.removeEventListener("refresh",W),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new Kt(e),a.iOS=Zr,Zr&&!d()&&d(1),Zr&&Ne.ticker.add(Zi),j=a._dc,F=Ne.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:wx(d,d(),function(){return F.pause()})},onUpdate:Or,onComplete:j.vars.onComplete}),a};nt.sort=function(i){if(Mn(i))return at.sort(i);var e=ct.pageYOffset||0;return nt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),at.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};nt.observe=function(i){return new Kt(i)};nt.normalizeScroll=function(i){if(typeof i>"u")return Dn;if(i===!0&&Dn)return Dn.enable();if(i===!1){Dn&&Dn.kill(),Dn=i;return}var e=i instanceof Kt?i:OP(i);return Dn&&Dn.target===e.target&&Dn.kill(),Qs(e.target)&&(Dn=e),e};nt.core={_getVelocityProp:Md,_inputObserver:Ax,_scrollers:ut,_proxies:ur,bridge:{ss:function(){Ii||to("scrollStart"),Ii=xn()},ref:function(){return vn}}};gx()&&Ne.registerPlugin(nt);const FP={id:"container3D",class:"fixed h-screen w-screen inset-0 z-50 pointer-events-none"},BP={__name:"Model_3d",setup(i){return Zt.registerPlugin(nt),Wd(()=>{const e=new Nn(20,window.innerWidth/window.innerHeight,.1,1e3);e.position.set(0,0,24);const t=new kT;t.position.set(0,0,0),t.scale.set(.8,.8,.8);let n;const r=new xb(16777215,1.5);t.add(r);const s=new Ao(16777215,1.6);s.position.set(50,50,50),t.add(s);const o=new Ao(16777215,10);o.position.set(10,0,-10),t.add(o);const a=new Ao(16777215,10);a.position.set(-10,0,-10),t.add(a);const l=new Ao(16777215,.5);l.position.set(0,50,-50),t.add(l);const c=new Ao(16777215,1);c.position.set(0,0,10),t.add(c),new mR().load("src/assets/iPhone_model.glb",function(m){n=m.scene,n.position.set(0,-2,0);var p=0,b=230,M=0;n.rotation.set(p/180*Math.PI,b/180*Math.PI,M/180*Math.PI),t.add(n);const v=Zt.timeline({scrollTrigger:{trigger:"#body-section",start:"top top",end:"bottom 0%",scrub:6,pinSpacing:!0,fastScrollEnd:!0}});[{id:"hero-section",position:{x:0,y:-2,z:0},rotation:{x:0,y:180,z:0},camera:{x:0,y:0,z:24,mm:20}},{id:"right-body",position:{x:-8,y:0,z:0},rotation:{x:-30,y:540,z:10},camera:{x:0,y:0,z:30,mm:20}},{id:"right-camera",position:{x:-8,y:0,z:0},rotation:{x:0,y:180,z:90},camera:{x:0,y:0,z:8,mm:48}},{id:"right-edge",position:{x:-7,y:1,z:0},rotation:{x:-45,y:-135,z:0},camera:{x:0,y:0,z:16,mm:36}}].forEach((C,A)=>{v.to(n.position,{x:C.position.x,y:C.position.y,z:C.position.z,ease:"none",duration:.5},A),v.to(n.rotation,{x:C.rotation.x/180*Math.PI,y:C.rotation.y/180*Math.PI,z:C.rotation.z/180*Math.PI,ease:"none",duration:.5},A),v.to(e.position,{x:C.camera.x,y:C.camera.y,z:C.camera.z,ease:"none",duration:.5},A),v.to(e,{fov:C.camera.mm,ease:"none",duration:.5,onUpdate:()=>e.updateProjectionMatrix()},A)})},function(m){console.log(m.loaded/m.total*100+"% loaded")},function(m){console.log("Erorr :"+m)});const f=new pR({antialias:!0,alpha:!0});f.setSize(window.innerWidth,window.innerHeight),f.setPixelRatio(window.devicePixelRatio),f.toneMapping=y0,f.toneMappingExposure=.7,f.outputEncoding=void 0;const h=new tC(f),d=new nC(t,e);h.addPass(d);const g=new ra(new Ze(window.innerWidth,window.innerHeight),.08,.4,1.5);h.addPass(g),document.getElementById("container3D").appendChild(f.domElement);const _=function(){requestAnimationFrame(_),f.render(t,e)};_(),window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight),h.setSize(window.innerWidth,window.innerHeight)})}),(e,t)=>(Ol(),Fl("section",FP))}},kP="/Apple-Site-Design/assets/Deep_Blue-dyJzaW91.png",zP="/Apple-Site-Design/assets/Silver-CcHejjh0.png",HP="/Apple-Site-Design/assets/_CITYPNG.COM_Orange%20iPhone%2017%20Pro%20in%20Back%20View%20-%204000x4000-PgnfmmVQ.png",VP={class:"h-screen w-screen"},GP={__name:"DesignSection",setup(i){return Zt.registerPlugin(nt),Wd(()=>{Zt.set("#body-content",{opacity:0,y:40}),Zt.set("#right-camera",{opacity:0,x:100,display:"none"}),Zt.set("#right-edge",{opacity:0,x:100,display:"none"});const e=Zt.timeline({scrollTrigger:{trigger:".container",start:"top 0%",end:"bottom -100%",scrub:3,pin:!0}});e.to("#body-section",{width:"100%",borderRadius:"1em",duration:1.8,ease:"power1.inOut"}),e.to("#body-content",{opacity:1,y:0,duration:1.2,ease:"power2.out"},">"),e.addLabel("switch"),e.to("#right-body",{opacity:0,x:-100,duration:1.2,ease:"power2.in",onComplete:()=>{Zt.set("#right-body",{display:"none"}),Zt.set("#right-camera",{display:"block"})},onReverseComplete:()=>{Zt.set("#right-body",{display:"block",opacity:1,x:0}),Zt.set("#right-camera",{display:"none",opacity:0,x:100})}},"switch"),e.to("#right-camera",{opacity:1,x:0,duration:1.2,ease:"power2.out"},"switch+=0.2"),e.addLabel("switch2",">+=0.6"),e.to("#right-camera",{opacity:0,x:-100,duration:1.2,ease:"power2.in",onComplete:()=>{Zt.set("#right-camera",{display:"none"}),Zt.set("#right-edge",{display:"block"})},onReverseComplete:()=>{Zt.set("#right-camera",{display:"block",opacity:1,x:0}),Zt.set("#right-edge",{display:"none",opacity:0,x:100})}},"switch2"),e.to("#right-edge",{opacity:1,x:0,duration:1.2,ease:"power2.out"},"switch2+=0.2"),e.to("#right-edge",{opacity:0,x:-100,duration:1.2,ease:"power2.in",onReverseComplete:()=>{Zt.set("#right-edge",{display:"block",opacity:1,x:0})}},">+=0.6"),e.to("#container",{transform:"scale(0.5) translateY(-50%)",duration:1.2,ease:"power2.inOut",scrollTrigger:{trigger:"#right-edge",start:"top 0%",end:"bottom -120%",scrub:3}},">"),e.call(()=>{try{window.designAnimationsComplete=!0,window.dispatchEvent(new Event("designAnimationsComplete"))}catch{}},null,">")}),(e,t)=>(Ol(),Fl("section",VP,[...t[0]||(t[0]=[d0('<h1 class="text-white text-center text-7xl font-bold uppercase">Design</h1><div class="container mx-auto h-full p-10 overflow-hidden" id="container"><div id="body-section" class="bg-white w-[10%] h-full mx-auto mb-[200px] rounded-full overflow-hidden"><div class="flex w-full h-auto items-center justify-center" id="body-content"><div class="left w-1/3 h-auto p-10"><div class="box bg-black rounded-2xl h-full w-full"></div></div><div class="section right w-2/3 h-fit border-stone-200 border-s-2 font-mono py-7" id="right-body"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase">Titanium Body</h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Built with <span class="text-stone-800 font-semibold">Aerospace-grade</span> titanium</h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="p-6 px-9"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Material :</span> Titanium</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Durability :</span> Precision-milled unibody with enhanced structural rigidity</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Finish :</span> Ultra-fine matte micro-texture for superior grip and reduced fingerprints</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Thermal :</span> Internal vapor chamber for efficient heat dissipation</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Colors :</span> Cosmic Orange, Deep Blue ,Silver</li></ul><div class="flex items-center w-full h-[120px] gap-6 ps-9 mb-9"><div class="box object-cover w-[160px] h-full p-2 border-2 border-slate-300 rounded-xl flex flex-col items-center justify-start bg-slate-200 hover:border-slate-500 transition duration-300"><img src="'+kP+'" alt="" class="h-full w-full object-contain"><p class="text-stone-700 font-mono mt-3">Deep Blue</p></div><div class="box object-cover w-[160px] h-full p-2 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-start bg-gray-100 hover:border-gray-500 transition duration-300"><img src="'+zP+'" alt="" class="h-full w-full object-contain"><p class="text-gray-500 font-mono mt-3">Silver</p></div><div class="box object-cover w-[160px] h-full p-2 border-2 border-orange-200 rounded-xl flex flex-col items-center justify-start bg-orange-100 hover:border-orange-500 transition duration-300"><img src="'+HP+'" alt="" class="h-full w-full object-contain"><p class="text-orange-700 font-mono mt-3">Cosmic Orange</p></div></div></div><div class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7" id="right-camera"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase">Camera</h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Crafted from <span class="text-stone-800 font-semibold">Precision.</span> Perfected in every detail</h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="p-6 px-9 gap-8"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Triple-Lens System :</span> 48MP Main, 48MP Wide and 48MP Telephoto lens.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Lens Coating :</span> Nano-matte sapphire lens cover reduces glare and reflection.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Lens Alignment :</span> Perfectly leveled lens placement ensures consistent depth and shadow response under all lighting angles.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Material Contrast :</span> The brushed titanium ring around the camera creates a fine contrast against the matte body surface.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Thermal Optimization :</span> Hidden micro-vents around the housing maintain temperature stability during extended 4K recording.</li></ul><div class="flex justify-end"><button class="bg-stone-100 ps-6 font-semibold rounded-full flex items-center gap-4 hover:scale-[102%] transition-all duration-300 me-9"> Know More about Camera Specs <span class="p-2 rounded-full bg-stone-200"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg></span></button></div></div><div class="section right w-2/3 h-full border-stone-200 border-s-2 font-mono py-7" id="right-edge"><h1 class="ms-4 px-4 text-7xl text-stone-800 font-pop font-semibold uppercase">Edge &amp; Connectivity</h1><h1 class="ms-8 text-2xl text-stone-600 font-rob flex items-center gap-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg> Sculpted edges. Seamless connections. </h1><span class="mt-9 w-full h-[1px] bg-stone-200 block"></span><ul class="pt-6 px-9 gap-8"><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Edges :</span> Precision-beveled chamfer with matte micro-finish for tactile grip and refined reflections.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Ports :</span> Universal USB-C with fast PD charging and high-speed data transfer; sealed port gasket for improved ingress protection.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Wireless :</span> MagSafe-compatible magnetic charging, Qi wireless, and rapid reverse wireless charging.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Connectivity :</span> Wi‑Fi 6E, Bluetooth 5.4, Ultra Wideband (UWB) and dual eSIM + physical SIM support.</li><li class="font-mono text-lg text-stone-600 opacity-60 hover:opacity-100 hover:scale-[101%] transition-all duration-500"><span class="font-semibold text-stone-800 font-pop uppercase">Sealing :</span> Precision gasket and micro-louver drainage delivering IP68 water and dust resistance.</li></ul></div></div></div></div>',2)])]))}},WP={data(){return{circleLeft:0,isVisible:!1,ticking:!1}},mounted(){window.addEventListener("scroll",this.onScroll,{passive:!0}),this.onScroll()},beforeDestroy(){window.removeEventListener("scroll",this.onScroll)},methods:{onScroll(){this.ticking||(window.requestAnimationFrame(()=>{const i=window.scrollY||window.pageYOffset,e=document.documentElement.scrollHeight-window.innerHeight;let t=e>0?i/e:0;t=Math.max(0,Math.min(1,t)),this.circleLeft=t*90,this.isVisible=t>.01,this.ticking=!1}),this.ticking=!0)}}};function XP(i,e,t,n,r,s){return Ol(),Fl("div",{id:"scroll-progress-bar",class:Ru(["fixed left-1/2 bottom-2 -translate-x-1/2 w-[90vw] max-w-[900px] h-6 pointer-events-none opacity-0 transition-opacity duration-400 ease-[cubic-bezier(.4,0,.2,1)] z-[1000] flex items-center justify-center",r.isVisible?"opacity-100":""])},[e[0]||(e[0]=iu("div",{class:"bar absolute left-0 right-0 top-1/2 h-0.5 bg-white rounded w-full -translate-y-1/2 shadow-[0_0_8px_0_rgba(255,255,255,0.08)]"},null,-1)),iu("div",{class:"circle absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_16px_4px_rgba(255,255,255,0.4),0_2px_8px_0_rgba(0,0,0,0.12)] -translate-y-1/2 transition-[left] duration-250 ease-[cubic-bezier(.4,0,.2,1)]",style:Au({left:r.circleLeft+"%"})},null,4)],2)}const YP=_0(WP,[["render",XP],["__scopeId","data-v-e347f0fe"]]);Zt.registerPlugin(nt);window.addEventListener("DOMContentLoaded",()=>{const i=(e,t=1)=>{Zt.to(window,{scrollTo:{y:e,autoKill:!0},duration:t,ease:"power2.out"})};document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){const n=this.getAttribute("href");if(n&&n.startsWith("#")){const r=document.querySelector(n);r&&(t.preventDefault(),i(r.offsetTop))}})})});const qP={__name:"App",setup(i){return(e,t)=>(Ol(),Fl(Ji,null,[Ri(lM),Ri(BP),Ri(GP),Ri(YP)],64))}};function Rx(i,e,t){return Math.max(i,Math.min(e,t))}class KP{advance(e){if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(n=this.value,r=this.to,s=60*this.lerp,o=e,(function(a,l,c){return(1-c)*a+c*l})(n,r,1-Math.exp(-s*o))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const a=Rx(0,this.currentTime/this.duration,1);t=a>=1;const l=t?1:this.easing(a);this.value=this.from+(this.to-this.from)*l}var n,r,s,o;this.onUpdate?.(this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n=.1,duration:r=1,easing:s=(l=>l),onStart:o,onUpdate:a}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=s,this.currentTime=0,this.isRunning=!0,o?.(),this.onUpdate=a}}class jP{constructor({wrapper:e,content:t,autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=(function(s,o){let a;return function(){let l=arguments,c=this;clearTimeout(a),a=setTimeout((function(){s.apply(c,l)}),o)}})(this.resize,r),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Cx{constructor(){this.events={}}emit(e,...t){let n=this.events[e]||[];for(let r=0,s=n.length;r<s;r++)n[r](...t)}on(e,t){return this.events[e]?.push(t)||(this.events[e]=[t]),()=>{this.events[e]=this.events[e]?.filter((n=>t!==n))}}off(e,t){this.events[e]=this.events[e]?.filter((n=>t!==n))}destroy(){this.events={}}}const __=100/6;class $P{constructor(e,{wheelMultiplier:t=1,touchMultiplier:n=1}){this.element=e,this.wheelMultiplier=t,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new Cx,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.touchMultiplier,s=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:s},this.emitter.emit("scroll",{deltaX:r,deltaY:s,event:e})};onTouchEnd=e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e;t*=r===1?__:r===2?this.windowWidth:1,n*=r===1?__:r===2?this.windowHeight:1,t*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}class ZP{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:n=e,eventsTarget:r=n,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:a=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=(M=>Math.min(1,1.001-Math.pow(2,-10*M))),lerp:f=!c&&.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:m=1,autoResize:p=!0,__experimental__naiveDimensions:b=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:M,deltaY:v,event:E})=>{if(E.ctrlKey)return;const C=E.type.includes("touch"),A=E.type.includes("wheel");if(this.options.syncTouch&&C&&E.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const D=M===0&&v===0,T=this.options.gestureOrientation==="vertical"&&v===0||this.options.gestureOrientation==="horizontal"&&M===0;if(D||T)return;let S=E.composedPath();if(S=S.slice(0,S.indexOf(this.rootElement)),S.find(($=>{var j,W,V,B,ae;return((j=$.hasAttribute)===null||j===void 0?void 0:j.call($,"data-lenis-prevent"))||C&&((W=$.hasAttribute)===null||W===void 0?void 0:W.call($,"data-lenis-prevent-touch"))||A&&((V=$.hasAttribute)===null||V===void 0?void 0:V.call($,"data-lenis-prevent-wheel"))||((B=$.classList)===null||B===void 0?void 0:B.contains("lenis"))&&!(!((ae=$.classList)===null||ae===void 0)&&ae.contains("lenis-stopped"))})))return;if(this.isStopped||this.isLocked)return void E.preventDefault();if(this.isSmooth=this.options.syncTouch&&C||this.options.smoothWheel&&A,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();E.preventDefault();let I=v;this.options.gestureOrientation==="both"?I=Math.abs(v)>Math.abs(M)?v:M:this.options.gestureOrientation==="horizontal"&&(I=M);const F=C&&this.options.syncTouch,Y=C&&E.type==="touchend"&&Math.abs(I)>5;Y&&(I=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+I,Object.assign({programmatic:!1},F?{lerp:Y?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const M=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-M),this.emit()}},window.lenisVersion="1.0.42",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:n,eventsTarget:r,smoothWheel:s,syncTouch:o,syncTouchLerp:a,touchInertiaMultiplier:l,duration:c,easing:u,lerp:f,infinite:h,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:m,autoResize:p,__experimental__naiveDimensions:b},this.animate=new KP,this.emitter=new Cx,this.dimensions=new jP({wrapper:e,content:t,autoResize:p}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=o||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new $P(r,{touchMultiplier:_,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:n=!1,lock:r=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:l,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let f;if(typeof e=="string"?f=document.querySelector(e):e?.nodeType&&(f=e),f){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?d.left:d.top}const h=f.getBoundingClientRect();e=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):e=Rx(0,e,this.limit),n)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null||l(this));if(!u){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:o,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,h)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l?.(this),this.__preventNextScrollEvent=!0,requestAnimationFrame((()=>{delete this.__preventNextScrollEvent})))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClassName("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClassName("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClassName("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClassName("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClassName(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}Zt.registerPlugin(nt);const Px=new ZP({duration:2,easing:i=>i,smooth:!0,smoothTouch:!0,lerp:.06});function Dx(i){Px.raf(i),requestAnimationFrame(Dx)}requestAnimationFrame(Dx);Px.on("scroll",nt.update);tM(qP).mount("#app");
