import{C as m,c as o,o as n,d as r,e as a,m as p,w as u,a as e,i as b,j as _,k as f,q as x,t as g,F as h,W as y}from"./app-A6rt1Zcw.js";import{_ as v}from"./AppLayout.vue_vue_type_script_setup_true_lang-CnEMg3Qw.js";import"./Button.vue_vue_type_script_setup_true_lang-CnFLI-IY.js";import"./index-BewGUgRO.js";const w={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},k={class:"max-w-2xl py-6 sm:px-6 lg:px-8"},C={key:0,class:"text-sm text-red-500"},B={class:"flex justify-between"},N=["disabled"],S=["disabled"],F={__name:"Create",setup(V){const d=[{title:"Add Pandita ",href:"/panditas"}];function i(){y.get("/panditas")}const t=m({nama_pandita:""});function l(){t.post(route("panditas.store"),{onSuccess:()=>t.reset()})}return(P,s)=>(n(),o(h,null,[r(a(p),{title:"Add Pandita"}),r(v,{breadcrumbs:d},{default:u(()=>[e("div",w,[e("div",k,[e("form",{onSubmit:b(l,["prevent"]),class:"space-y-4"},[e("div",null,[s[1]||(s[1]=e("label",{for:"nama_pandita",class:"block text-sm font-medium text-gray-700"},"Nama Pandita",-1)),_(e("input",{"onUpdate:modelValue":s[0]||(s[0]=c=>a(t).nama_pandita=c),type:"text",id:"nama_pandita",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",required:""},null,512),[[x,a(t).nama_pandita]]),a(t).errors.nama_pandita?(n(),o("p",C,g(a(t).errors.nama_pandita),1)):f("",!0)]),e("div",B,[e("button",{onClick:i,class:"rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400",disabled:a(t).processing}," Back ",8,N),e("button",{type:"submit",class:"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",disabled:a(t).processing}," Save ",8,S)])],32)])])]),_:1})],64))}};export{F as default};
