import{C as u,c as d,o as s,d as o,a,e as t,m,i as n,j as p,k as g,p as c,t as x,F as k,W as y}from"./app-BW5-9ojW.js";import{N as f}from"./Navbar-BUBwMVef.js";/* empty css                                                               */import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},h={class:"mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800"},v={key:0,class:"text-sm text-red-500 dark:text-red-400"},w={class:"flex justify-between"},N=["disabled"],B=["disabled"],D={__name:"Create",setup(C){function i(){y.get("/panditas")}const e=u({nama_pandita:""});function l(){e.post(route("panditas.store"),{onSuccess:()=>e.reset()})}return(S,r)=>(s(),d(k,null,[o(t(m),{title:"Add Pandita"}),o(f),a("div",_,[r[2]||(r[2]=a("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[a("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Add Pandita Kota")],-1)),a("div",h,[a("form",{onSubmit:n(l,["prevent"]),class:"space-y-4"},[a("div",null,[r[1]||(r[1]=a("label",{for:"nama_pandita",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Nama Pandita",-1)),p(a("input",{"onUpdate:modelValue":r[0]||(r[0]=b=>t(e).nama_pandita=b),type:"text",id:"nama_pandita",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},null,512),[[c,t(e).nama_pandita]]),t(e).errors.nama_pandita?(s(),d("p",v,x(t(e).errors.nama_pandita),1)):g("",!0)]),a("div",w,[a("button",{onClick:n(i,["prevent"]),class:"rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",disabled:t(e).processing}," Back ",8,N),a("button",{type:"submit",class:"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white",disabled:t(e).processing}," Save ",8,B)])],32)])])],64))}};export{D as default};
