import{q as w,D as x,N as c,o as l,e,x as y,w as o,d as a,r as h,C as v,c as B,k as p,a as i,m as C,t as V,i as $,Y as m}from"./app-BW5-9ojW.js";import{_}from"./InputError.vue_vue_type_script_setup_true_lang-Dk9g7NXJ.js";import{_ as L}from"./TextLink.vue_vue_type_script_setup_true_lang-f2-deGXd.js";import{S,W as P,d as j,j as q,_ as N}from"./index-Dwd5X6mp.js";import{c as M}from"./createLucideIcon-PdSdmOgo.js";import{_ as k}from"./Input.vue_vue_type_script_setup_true_lang-DLWZ_H1F.js";import{_ as f}from"./Label.vue_vue_type_script_setup_true_lang-BhkkNoyG.js";import{L as R,_ as U}from"./AuthLayout.vue_vue_type_script_setup_true_lang-BuCiCrQZ.js";import"./index-B4Hr_Kn1.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=M("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),D=w({__name:"Checkbox",props:{defaultChecked:{type:Boolean},checked:{type:[Boolean,String]},disabled:{type:Boolean},required:{type:Boolean},name:{},value:{},id:{},asChild:{type:Boolean},as:{},class:{}},emits:["update:checked"],setup(d,{emit:t}){const n=d,u=t,s=x(()=>{const{class:g,...b}=n;return b}),r=S(s,u);return(g,b)=>(l(),c(e(P),y(e(r),{class:e(j)("peer size-5 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-accent-foreground",n.class)}),{default:o(()=>[a(e(q),{class:"flex h-full w-full items-center justify-center text-current"},{default:o(()=>[h(g.$slots,"default",{},()=>[a(e(z),{class:"size-3.5 stroke-[3]"})])]),_:3})]),_:3},16,["class"]))}}),E={key:0,class:"mb-4 text-center text-sm font-medium text-green-600"},F={class:"grid gap-6"},I={class:"grid gap-2"},W={class:"grid gap-2"},T={class:"flex items-center justify-between"},Y={class:"flex items-center justify-between",tabindex:3},ee={__name:"Login",props:{status:String,canResetPassword:Boolean},setup(d){const t=v({email:"",password:"",remember:!1}),n=()=>{t.post(route("login"),{onFinish:()=>t.reset("password")})};return(u,s)=>(l(),c(U,{title:"Log in to your account",description:"Masukkan email anda untuk login"},{default:o(()=>[a(e(C),{title:"Log in"}),d.status?(l(),B("div",E,V(d.status),1)):p("",!0),i("form",{onSubmit:$(n,["prevent"]),class:"flex flex-col gap-6"},[i("div",F,[i("div",I,[a(e(f),{for:"email"},{default:o(()=>s[3]||(s[3]=[m("Email address")])),_:1}),a(e(k),{id:"email",type:"email",required:"",autofocus:"",tabindex:1,autocomplete:"email",modelValue:e(t).email,"onUpdate:modelValue":s[0]||(s[0]=r=>e(t).email=r),placeholder:"email@example.com"},null,8,["modelValue"]),a(_,{message:e(t).errors.email},null,8,["message"])]),i("div",W,[i("div",T,[a(e(f),{for:"password"},{default:o(()=>s[4]||(s[4]=[m("Password")])),_:1}),d.canResetPassword?(l(),c(L,{key:0,href:u.route("password.request"),class:"text-sm",tabindex:5},{default:o(()=>s[5]||(s[5]=[m(" Forgot password? ")])),_:1},8,["href"])):p("",!0)]),a(e(k),{id:"password",type:"password",required:"",tabindex:2,autocomplete:"current-password",modelValue:e(t).password,"onUpdate:modelValue":s[1]||(s[1]=r=>e(t).password=r),placeholder:"Password"},null,8,["modelValue"]),a(_,{message:e(t).errors.password},null,8,["message"])]),i("div",Y,[a(e(f),{for:"remember",class:"flex items-center space-x-3"},{default:o(()=>[a(e(D),{id:"remember",checked:e(t).remember,"onUpdate:checked":s[2]||(s[2]=r=>e(t).remember=r),tabindex:4},null,8,["checked"]),s[6]||(s[6]=i("span",null,"Remember me",-1))]),_:1})]),a(e(N),{type:"submit",class:"mt-4 w-full",tabindex:4,disabled:e(t).processing},{default:o(()=>[e(t).processing?(l(),c(e(R),{key:0,class:"h-4 w-4 animate-spin"})):p("",!0),s[7]||(s[7]=m(" Log in "))]),_:1},8,["disabled"])])],32)]),_:1}))}};export{ee as default};
