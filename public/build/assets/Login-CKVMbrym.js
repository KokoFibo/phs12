import{d as w,c as x,z as c,o as l,u as e,B as y,w as o,e as a,r as h,C as v,a as B,k as p,b as d,m as C,t as V,i as $,y as m}from"./app-CSBwASZa.js";import{_ as f,a as _,b as k}from"./Label.vue_vue_type_script_setup_true_lang-ZCxSyJ4B.js";import{_ as L}from"./TextLink.vue_vue_type_script_setup_true_lang-xKOFw0sI.js";import{c as S,S as P,W as j,a as q,j as N,_ as z}from"./Button.vue_vue_type_script_setup_true_lang-BZ9SiZAl.js";import{L as M,_ as R}from"./AuthLayout.vue_vue_type_script_setup_true_lang-BH87N-r8.js";import"./index-uBl_5BBT.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=S("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),E=w({__name:"Checkbox",props:{defaultChecked:{type:Boolean},checked:{type:[Boolean,String]},disabled:{type:Boolean},required:{type:Boolean},name:{},value:{},id:{},asChild:{type:Boolean},as:{},class:{}},emits:["update:checked"],setup(i,{emit:t}){const n=i,u=t,s=x(()=>{const{class:g,...b}=n;return b}),r=P(s,u);return(g,b)=>(l(),c(e(j),y(e(r),{class:e(q)("peer size-5 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-accent-foreground",n.class)}),{default:o(()=>[a(e(N),{class:"flex h-full w-full items-center justify-center text-current"},{default:o(()=>[h(g.$slots,"default",{},()=>[a(e(U),{class:"size-3.5 stroke-[3]"})])]),_:3})]),_:3},16,["class"]))}}),F={key:0,class:"mb-4 text-center text-sm font-medium text-green-600"},I={class:"grid gap-6"},W={class:"grid gap-2"},D={class:"grid gap-2"},T={class:"flex items-center justify-between"},A={class:"flex items-center justify-between",tabindex:3},X={__name:"Login",props:{status:String,canResetPassword:Boolean},setup(i){const t=v({email:"",password:"",remember:!1}),n=()=>{t.post(route("login"),{onFinish:()=>t.reset("password")})};return(u,s)=>(l(),c(R,{title:"Log in to your account",description:"Masukkan email anda untuk login"},{default:o(()=>[a(e(C),{title:"Log in"}),i.status?(l(),B("div",F,V(i.status),1)):p("",!0),d("form",{onSubmit:$(n,["prevent"]),class:"flex flex-col gap-6"},[d("div",I,[d("div",W,[a(e(f),{for:"email"},{default:o(()=>s[3]||(s[3]=[m("Email address")])),_:1}),a(e(_),{id:"email",type:"email",required:"",autofocus:"",tabindex:1,autocomplete:"email",modelValue:e(t).email,"onUpdate:modelValue":s[0]||(s[0]=r=>e(t).email=r),placeholder:"email@example.com"},null,8,["modelValue"]),a(k,{message:e(t).errors.email},null,8,["message"])]),d("div",D,[d("div",T,[a(e(f),{for:"password"},{default:o(()=>s[4]||(s[4]=[m("Password")])),_:1}),i.canResetPassword?(l(),c(L,{key:0,href:u.route("password.request"),class:"text-sm",tabindex:5},{default:o(()=>s[5]||(s[5]=[m(" Forgot password? ")])),_:1},8,["href"])):p("",!0)]),a(e(_),{id:"password",type:"password",required:"",tabindex:2,autocomplete:"current-password",modelValue:e(t).password,"onUpdate:modelValue":s[1]||(s[1]=r=>e(t).password=r),placeholder:"Password"},null,8,["modelValue"]),a(k,{message:e(t).errors.password},null,8,["message"])]),d("div",A,[a(e(f),{for:"remember",class:"flex items-center space-x-3"},{default:o(()=>[a(e(E),{id:"remember",checked:e(t).remember,"onUpdate:checked":s[2]||(s[2]=r=>e(t).remember=r),tabindex:4},null,8,["checked"]),s[6]||(s[6]=d("span",null,"Remember me",-1))]),_:1})]),a(e(z),{type:"submit",class:"mt-4 w-full",tabindex:4,disabled:e(t).processing},{default:o(()=>[e(t).processing?(l(),c(e(M),{key:0,class:"h-4 w-4 animate-spin"})):p("",!0),s[7]||(s[7]=m(" Log in "))]),_:1},8,["disabled"])])],32)]),_:1}))}};export{X as default};
