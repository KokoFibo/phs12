import{g as y,a7 as F,a8 as H,H as W,am as z,D as k,J as R,ag as B,aj as X,G as w,a6 as O,Q as G,ae as Y,ab as P,R as I,e as J,L,an as h,f as K,s as Z}from"./app-Di_Cpubz.js";function he(e,t){var o;const n=O();return G(()=>{n.value=e()},{...t,flush:(o=void 0)!=null?o:"sync"}),Y(n)}function _(e){return F()?(H(e),!0):!1}function we(e){let t=!1,o;const n=B(!0);return(...r)=>(t||(o=n.run(()=>e(...r)),t=!0),o)}const E=new WeakMap,q=(...e)=>{var t;const o=e[0],n=(t=W())==null?void 0:t.proxy;if(n==null&&!z())throw new Error("injectLocal must be called in setup");return n&&E.has(n)&&o in E.get(n)?E.get(n)[o]:k(...e)};function ye(e){let t=0,o,n;const r=()=>{t-=1,n&&t<=0&&(n.stop(),o=void 0,n=void 0)};return(...u)=>(t+=1,n||(n=B(!0),o=n.run(()=>e(...u))),_(r),o)}function ee(e){if(!P(e))return I(e);const t=new Proxy({},{get(o,n,r){return J(Reflect.get(e.value,n,r))},set(o,n,r){return P(e.value[n])&&!P(r)?e.value[n].value=r:e.value[n]=r,!0},deleteProperty(o,n){return Reflect.deleteProperty(e.value,n)},has(o,n){return Reflect.has(e.value,n)},ownKeys(){return Object.keys(e.value)},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}}});return I(t)}function te(e){return ee(w(e))}function be(e,...t){const o=t.flat(),n=o[0];return te(()=>Object.fromEntries(typeof n=="function"?Object.entries(L(e)).filter(([r,u])=>!n(h(u),r)):Object.entries(L(e)).filter(r=>!o.includes(r[0]))))}const $=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const ne=e=>typeof e<"u",oe=Object.prototype.toString,re=e=>oe.call(e)==="[object Object]",N=()=>{},ge=ie();function ie(){var e,t;return $&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(?:ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function se(e,t){function o(...n){return new Promise((r,u)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(r).catch(u)})}return o}function ue(e,t={}){let o,n,r=N;const u=s=>{clearTimeout(s),r(),r=N};let c;return s=>{const l=h(e),a=h(t.maxWait);return o&&u(o),l<=0||a!==void 0&&a<=0?(n&&(u(n),n=null),Promise.resolve(s())):new Promise((f,d)=>{r=t.rejectOnCancel?d:f,c=s,a&&!n&&(n=setTimeout(()=>{o&&u(o),n=null,f(c())},a)),o=setTimeout(()=>{n&&u(n),n=null,f(s())},l)})}}function V(e){return e.endsWith("rem")?Number.parseFloat(e)*16:Number.parseFloat(e)}function ae(e){return W()}function A(e){return Array.isArray(e)?e:[e]}function Se(e,t=200,o={}){return se(ue(t,o),e)}function Oe(e,t){ae()&&X(e,t)}function le(e,t,o){return y(e,t,{...o,immediate:!0})}function We(e,t,o){const n=y(e,(...r)=>(R(()=>n()),t(...r)),o);return n}const x=$?window:void 0;function T(e){var t;const o=h(e);return(t=o==null?void 0:o.$el)!=null?t:o}function Q(...e){const t=[],o=()=>{t.forEach(i=>i()),t.length=0},n=(i,s,l,a)=>(i.addEventListener(s,l,a),()=>i.removeEventListener(s,l,a)),r=w(()=>{const i=A(h(e[0])).filter(s=>s!=null);return i.every(s=>typeof s!="string")?i:void 0}),u=le(()=>{var i,s;return[(s=(i=r.value)==null?void 0:i.map(l=>T(l)))!=null?s:[x].filter(l=>l!=null),A(h(r.value?e[1]:e[0])),A(J(r.value?e[2]:e[1])),h(r.value?e[3]:e[2])]},([i,s,l,a])=>{if(o(),!(i!=null&&i.length)||!(s!=null&&s.length)||!(l!=null&&l.length))return;const f=re(a)?{...a}:a;t.push(...i.flatMap(d=>s.flatMap(p=>l.map(v=>n(d,p,v,f)))))},{flush:"post"}),c=()=>{u(),o()};return _(o),c}function ce(){const e=O(!1),t=W();return t&&Z(()=>{e.value=!0},t),e}function U(e){const t=ce();return w(()=>(t.value,!!e()))}function fe(e){return typeof e=="function"?e:typeof e=="string"?t=>t.key===e:Array.isArray(e)?t=>e.includes(t.key):()=>!0}function xe(...e){let t,o,n={};e.length===3?(t=e[0],o=e[1],n=e[2]):e.length===2?typeof e[1]=="object"?(t=!0,o=e[0],n=e[1]):(t=e[0],o=e[1]):(t=!0,o=e[0]);const{target:r=x,eventName:u="keydown",passive:c=!1,dedupe:i=!1}=n,s=fe(t);return Q(r,u,a=>{a.repeat&&h(i)||s(a)&&o(a)},c)}const de=Symbol("vueuse-ssr-width");function pe(){const e=z()?q(de,null):null;return typeof e=="number"?e:void 0}function Me(e,t={}){const{window:o=x,ssrWidth:n=pe()}=t,r=U(()=>o&&"matchMedia"in o&&typeof o.matchMedia=="function"),u=K(typeof n=="number"),c=O(),i=O(!1),s=l=>{i.value=l.matches};return G(()=>{if(u.value){u.value=!r.value;const l=h(e).split(",");i.value=l.some(a=>{const f=a.includes("not all"),d=a.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),p=a.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let v=!!(d||p);return d&&v&&(v=n>=V(d[1])),p&&v&&(v=n<=V(p[1])),f?!v:v});return}r.value&&(c.value=o.matchMedia(h(e)),i.value=c.value.matches)}),Q(c,"change",s,{passive:!0}),w(()=>i.value)}function ve(e){return JSON.parse(JSON.stringify(e))}function Pe(e,t,o={}){const{window:n=x,...r}=o;let u;const c=U(()=>n&&"ResizeObserver"in n),i=()=>{u&&(u.disconnect(),u=void 0)},s=w(()=>{const f=h(e);return Array.isArray(f)?f.map(d=>T(d)):[T(f)]}),l=y(s,f=>{if(i(),c.value&&n){u=new ResizeObserver(t);for(const d of f)d&&u.observe(d,r)}},{immediate:!0,flush:"post"}),a=()=>{i(),l()};return _(a),{isSupported:c,stop:a}}function Ee(e,t,o,n={}){var r,u,c;const{clone:i=!1,passive:s=!1,eventName:l,deep:a=!1,defaultValue:f,shouldEmit:d}=n,p=W(),v=o||(p==null?void 0:p.emit)||((r=p==null?void 0:p.$emit)==null?void 0:r.bind(p))||((c=(u=p==null?void 0:p.proxy)==null?void 0:u.$emit)==null?void 0:c.bind(p==null?void 0:p.proxy));let b=l;t||(t="modelValue"),b=b||`update:${t.toString()}`;const j=m=>i?typeof i=="function"?i(m):ve(m):m,C=()=>ne(e[t])?j(e[t]):f,D=m=>{d?d(m)&&v(b,m):v(b,m)};if(s){const m=C(),M=K(m);let g=!1;return y(()=>e[t],S=>{g||(g=!0,M.value=j(S),R(()=>g=!1))}),y(M,S=>{!g&&(S!==e[t]||a)&&D(S)},{deep:a}),M}else return w({get(){return C()},set(m){D(m)}})}export{ce as a,ye as b,we as c,x as d,ge as e,Q as f,he as g,Ee as h,$ as i,Pe as j,Se as k,Me as l,xe as o,be as r,Oe as t,T as u,We as w};
