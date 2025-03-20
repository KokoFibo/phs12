import{C as x,c as d,o as s,d as i,a as r,e as o,m as y,i as u,j as g,k as b,p as f,t as l,l as _,F as m,n as v,W as w}from"./app-BW5-9ojW.js";import{N as h}from"./Navbar-BUBwMVef.js";/* empty css                                                               */import"./_plugin-vue_export-helper-DlAUqK2U.js";const N={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},S={class:"mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800"},V={key:0,class:"text-sm text-red-500 dark:text-red-400"},B=["value"],C={key:0,class:"text-sm text-red-500 dark:text-red-400"},A={class:"flex justify-between"},D=["disabled"],K=["disabled"],U={__name:"Create",props:{kotas:Array},setup(n){const p=n;function k(){w.get(route("groups.index"))}console.log("Kotas Data:",p.kotas);const e=x({nama_group:"",kota_id:""});function c(){e.post(route("groups.store"),{onSuccess:()=>{e.reset()}})}return(M,t)=>(s(),d(m,null,[i(o(y),{title:"Add Group"}),i(h),r("div",N,[t[5]||(t[5]=r("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[r("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Add group")],-1)),r("div",S,[r("form",{onSubmit:u(c,["prevent"]),class:"space-y-4"},[r("div",null,[t[2]||(t[2]=r("label",{for:"nama_group",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Nama Group",-1)),g(r("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>o(e).nama_group=a),type:"text",id:"nama_group",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},null,512),[[f,o(e).nama_group]]),o(e).errors.nama_group?(s(),d("p",V,l(o(e).errors.nama_group),1)):b("",!0)]),r("div",null,[t[4]||(t[4]=r("label",{for:"kota_id",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Kota",-1)),g(r("select",{"onUpdate:modelValue":t[1]||(t[1]=a=>o(e).kota_id=a),id:"kota_id",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},[t[3]||(t[3]=r("option",{value:"",disabled:""},"Pilih Kota",-1)),(s(!0),d(m,null,v(n.kotas,a=>(s(),d("option",{key:a.id,value:a.id},l(a.nama_kota),9,B))),128))],512),[[_,o(e).kota_id]]),o(e).errors.kota_id?(s(),d("p",C,l(o(e).errors.kota_id),1)):b("",!0)]),r("div",A,[r("button",{onClick:u(k,["prevent"]),class:"rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",disabled:o(e).processing}," Back ",8,D),r("button",{type:"submit",class:"rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white",disabled:o(e).processing}," Save ",8,K)])],32)])])],64))}};export{U as default};
