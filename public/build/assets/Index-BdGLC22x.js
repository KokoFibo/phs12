import{f as v,h as c,a as n,o as l,e as a,w as d,b as e,j as k,n as w,u as i,P as f,y as b,F as m,l as V,t as u,W as h}from"./app-B3we3u2G.js";import{_ as C}from"./AppLayout.vue_vue_type_script_setup_true_lang-C00aRdNY.js";import"./Button.vue_vue_type_script_setup_true_lang-CtyIW41l.js";import"./index-BZ18ODA4.js";const j={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},N={class:"mb-4 flex items-center justify-between"},B={class:"min-w-full border bg-white"},D={class:"p-2"},F={class:"p-2"},H={class:"p-2"},T={class:"space-x-2 p-2"},E=["onClick"],$={__name:"Index",props:{viharas:Object,filters:Object},setup(p){const g=[{title:"Vihara",href:"/viharas"}],r=v("");function x(){h.get("/viharas",{search:r.value},{preserveState:!0})}return(o,s)=>{const _=c("Head"),y=c("pagination");return l(),n(m,null,[a(_,{title:"Vihara"}),a(C,{breadcrumbs:g},{default:d(()=>[e("div",j,[e("div",N,[k(e("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>r.value=t),type:"text",placeholder:"Cari ...",class:"rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",onInput:x},null,544),[[w,r.value]]),a(i(f),{href:o.route("viharas.create"),class:"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"},{default:d(()=>s[1]||(s[1]=[b(" Tambah Data Vihara ")])),_:1},8,["href"])]),e("table",B,[s[3]||(s[3]=e("thead",null,[e("tr",null,[e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Nama Vihara"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Group"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Kota"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Aksi")])],-1)),e("tbody",null,[(l(!0),n(m,null,V(p.viharas.data,t=>(l(),n("tr",{key:t.id,class:"border-b"},[e("td",D,u(t.nama_vihara),1),e("td",F,u(t.group?t.group.nama_group:"-"),1),e("td",H,u(t.group&&t.group.kota?t.group.kota.nama_kota:"-"),1),e("td",T,[a(i(f),{href:o.route("viharas.edit",t.id),class:"rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"},{default:d(()=>s[2]||(s[2]=[b(" Edit ")])),_:2},1032,["href"]),e("button",{onClick:I=>i(h).delete(o.route("viharas.destroy",t.id)),class:"rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"}," Hapus ",8,E)])]))),128))])])]),a(y,{links:p.viharas.links},null,8,["links"])]),_:1})],64)}}};export{$ as default};
