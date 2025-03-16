import{u as _,a1 as w,g as y,f as v,c as i,o as l,d as s,e as n,m as k,w as d,a as e,j as P,q as j,a3 as c,_ as C,F as p,l as D,t as N,W as m}from"./app-CNJZH30k.js";import{_ as T}from"./Pagination-jmBGQwrW.js";import{_ as V}from"./AppLayout.vue_vue_type_script_setup_true_lang-BRElCuOm.js";import{r as $,a as B}from"./TrashIcon-DAmQ9swr.js";import"./Button.vue_vue_type_script_setup_true_lang-BaBI6ZjN.js";import"./index-oFpyWDaQ.js";const F={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},A={class:"mb-4 flex items-center justify-between"},I={class:"min-w-full border bg-white"},O={class:"p-2"},S={class:"flex space-x-2 p-2"},W=["onClick"],H={__name:"Index",props:{panditas:Object,filters:Object},setup(u){const f=_(),b=w(),x=t=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&m.delete(route("panditas.destroy",t))};y(()=>b.props.flash.toast,t=>{t!=null&&t.message&&f[t.type??"info"](t.message)},{immediate:!0});const g=[{title:"Pandita",href:"/panditas"}],o=v("");function h(){m.get("/panditas",{search:o.value},{preserveState:!0})}return(t,a)=>(l(),i(p,null,[s(n(k),{title:"Pandita"}),s(V,{breadcrumbs:g},{default:d(()=>[e("div",F,[e("div",A,[P(e("input",{"onUpdate:modelValue":a[0]||(a[0]=r=>o.value=r),type:"text",placeholder:"Cari...",class:"rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",onInput:h},null,544),[[j,o.value]]),s(n(c),{href:t.route("panditas.create"),class:"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"},{default:d(()=>a[1]||(a[1]=[C(" Tambah Data Pandita ")])),_:1},8,["href"])]),e("table",I,[a[2]||(a[2]=e("thead",null,[e("tr",null,[e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Nama Pandita"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Aksi")])],-1)),e("tbody",null,[(l(!0),i(p,null,D(u.panditas.data,r=>(l(),i("tr",{key:r.id,class:"border-b text-sm"},[e("td",O,N(r.nama_pandita),1),e("td",S,[s(n(c),{href:t.route("panditas.edit",r.id),class:"rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"},{default:d(()=>[s(n($),{class:"h-4 w-4"})]),_:2},1032,["href"]),e("button",{onClick:q=>x(r.id),class:"rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"},[s(n(B),{class:"h-4 w-4"})],8,W)])]))),128))])]),s(T,{links:u.panditas.links},null,8,["links"])])]),_:1})],64))}};export{H as default};
