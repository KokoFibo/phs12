import{C as b,a as d,o as i,e as o,u as e,m as x,w as l,b as a,i as _,j as g,k as y,n as h,t as v,P as w,y as k,F as N}from"./app-B3we3u2G.js";import{_ as P}from"./AppLayout.vue_vue_type_script_setup_true_lang-C00aRdNY.js";import"./Button.vue_vue_type_script_setup_true_lang-CtyIW41l.js";import"./index-BZ18ODA4.js";const V={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},B={class:"mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"},j={key:0,class:"text-sm text-red-500"},C={class:"flex justify-end space-x-4"},D=["disabled"],T={__name:"Edit",props:{pandita:Object},setup(p){var r;const m=[{title:"Pandita",href:"/panditas"}],n=p;console.log(n.pandita);const t=b({nama_pandita:((r=n.pandita)==null?void 0:r.nama_pandita)||""});function u(){t.put(route("panditas.update",n.pandita.id),{onSuccess:()=>t.reset()})}return(c,s)=>(i(),d(N,null,[o(e(x),{title:"Data Umat"}),o(P,{breadcrumbs:m},{default:l(()=>[a("div",V,[a("div",B,[a("form",{onSubmit:_(u,["prevent"]),class:"space-y-4"},[a("div",null,[s[1]||(s[1]=a("label",{for:"nama_pandita",class:"block text-sm font-medium text-gray-700"},"Nama Pandita",-1)),g(a("input",{"onUpdate:modelValue":s[0]||(s[0]=f=>e(t).nama_pandita=f),type:"text",id:"nama_pandita",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",required:""},null,512),[[h,e(t).nama_pandita]]),e(t).errors.nama_pandita?(i(),d("p",j,v(e(t).errors.nama_pandita),1)):y("",!0)]),a("div",C,[a("button",{type:"submit",class:"rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600",disabled:e(t).processing}," Perbarui ",8,D),o(e(w),{href:c.route("panditas.index"),class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"},{default:l(()=>s[2]||(s[2]=[k(" Batal ")])),_:1},8,["href"])])],32)])])]),_:1})],64))}};export{T as default};
