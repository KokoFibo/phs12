import{C as x,c as d,o as l,d as i,a as e,e as o,m as k,i as n,j as u,k as b,p as y,t as m,l as f,F as v,W as w}from"./app-BW5-9ojW.js";import{N as h}from"./Navbar-BUBwMVef.js";/* empty css                                                               */import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},N={class:"mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800"},B={key:0,class:"text-sm text-red-500 dark:text-red-400"},R={key:0,class:"text-sm text-red-500 dark:text-red-400"},S={class:"flex justify-between"},U=["disabled"],V=["disabled"],A={__name:"Edit",props:{user:Object},setup(g){function p(){w.get("/editroles")}const a=g,r=x({id:a.user.id||"",name:a.user.name||"",role:a.user.role||""});function c(){r.put(route("editroles.update",a.user.id),{onSuccess:()=>{r.reset()}})}return(E,t)=>(l(),d(v,null,[i(o(k),{title:"Edit User Role"}),i(h),e("div",_,[t[5]||(t[5]=e("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[e("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Edit User Role")],-1)),e("div",N,[e("form",{onSubmit:n(c,["prevent"]),class:"space-y-4"},[e("div",null,[t[2]||(t[2]=e("label",{for:"nama_user",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Nama",-1)),u(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>o(r).name=s),type:"text",id:"nama_user",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},null,512),[[y,o(r).name]]),o(r).errors.name?(l(),d("p",B,m(o(r).errors.name),1)):b("",!0)]),e("div",null,[t[4]||(t[4]=e("label",{for:"kota_id",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Role",-1)),u(e("select",{"onUpdate:modelValue":t[1]||(t[1]=s=>o(r).role=s),class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},t[3]||(t[3]=[e("option",{value:""},"Pilih Role",-1),e("option",{value:"0"},"Belum ada Role",-1),e("option",{value:"1"},"Admin",-1),e("option",{value:"2"},"Super Admin",-1)]),512),[[f,o(r).role]]),o(r).errors.role?(l(),d("p",R,m(o(r).errors.role),1)):b("",!0)]),e("div",S,[e("button",{onClick:n(p,["prevent"]),class:"rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",disabled:o(r).processing}," Back ",8,U),e("button",{type:"submit",class:"rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white",disabled:o(r).processing}," Update ",8,V)])],32)])])],64))}};export{A as default};
