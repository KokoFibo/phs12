import{c as p}from"./Button.vue_vue_type_script_setup_true_lang-CtyIW41l.js";import{d as o,a as n,o as a,b as t,r as l,e as i,w as d,t as s,u as _,P as m,A as u}from"./app-B3we3u2G.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=p("LoaderCircleIcon",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),f={src:"{{ asset('images/logo.png')}}",alt:"logo"},h=o({inheritAttrs:!1,__name:"AppLogoIcon",props:{className:{}},setup(r){return(e,c)=>(a(),n("img",f))}}),g={class:"flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10"},x={class:"w-full max-w-sm"},v={class:"flex flex-col gap-8"},y={class:"flex flex-col items-center gap-4"},L={class:"mb-1 flex h-9 w-9 items-center justify-center rounded-md"},k={class:"sr-only"},w={class:"space-y-2 text-center"},A={class:"text-xl font-medium"},$={class:"text-center text-sm text-muted-foreground"},b=o({__name:"AuthSimpleLayout",props:{title:{},description:{}},setup(r){return(e,c)=>(a(),n("div",g,[t("div",x,[t("div",v,[t("div",y,[i(_(m),{href:e.route("home"),class:"flex flex-col items-center gap-2 font-medium"},{default:d(()=>[t("div",L,[i(h,{class:"size-9 fill-current text-[var(--foreground)] dark:text-white"})]),t("span",k,s(e.title),1)]),_:1},8,["href"]),t("div",w,[t("h1",A,s(e.title),1),t("p",$,s(e.description),1)])]),l(e.$slots,"default")])])]))}}),N=o({__name:"AuthLayout",props:{title:{},description:{}},setup(r){return(e,c)=>(a(),u(b,{title:e.title,description:e.description},{default:d(()=>[l(e.$slots,"default")]),_:3},8,["title","description"]))}});export{I as L,N as _};
