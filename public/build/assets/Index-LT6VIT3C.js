import{f as k,h as p,a as n,o as l,e as a,w as d,b as e,j as v,n as y,u as i,P as c,y as f,F as b,l as w,t as C,W as m}from"./app-B3we3u2G.js";import{_ as j}from"./AppLayout.vue_vue_type_script_setup_true_lang-C00aRdNY.js";import"./Button.vue_vue_type_script_setup_true_lang-CtyIW41l.js";import"./index-BZ18ODA4.js";const D={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},N={class:"mb-4 flex items-center justify-between"},V={class:"min-w-full border bg-white"},B={class:"p-2"},F={class:"space-x-2 p-2"},H=["onClick"],P={__name:"Index",props:{kotas:Object,filters:Object},setup(u){const h=[{title:"Kota",href:"/kotas"}],o=k("");function x(){m.get("/kotas",{search:o.value},{preserveState:!0})}return(r,t)=>{const g=p("Head"),_=p("pagination");return l(),n(b,null,[a(g,{title:"Data Umat"}),a(j,{breadcrumbs:h},{default:d(()=>[e("div",D,[e("div",N,[v(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>o.value=s),type:"text",placeholder:"Cari...",class:"rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",onInput:x},null,544),[[y,o.value]]),a(i(c),{href:r.route("kotas.create"),class:"rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"},{default:d(()=>t[1]||(t[1]=[f(" Tambah Data Kota ")])),_:1},8,["href"])]),e("table",V,[t[3]||(t[3]=e("thead",null,[e("tr",null,[e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Nama Kota"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Aksi")])],-1)),e("tbody",null,[(l(!0),n(b,null,w(u.kotas.data,s=>(l(),n("tr",{key:s.id,class:"border-b"},[e("td",B,C(s.nama_kota),1),e("td",F,[a(i(c),{href:r.route("kotas.edit",s.id),class:"rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"},{default:d(()=>t[2]||(t[2]=[f(" Edit ")])),_:2},1032,["href"]),e("button",{onClick:K=>i(m).delete(r.route("kotas.destroy",s.id)),class:"rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"}," Hapus ",8,H)])]))),128))])])]),a(_,{links:u.kotas.links},null,8,["links"])]),_:1})],64)}}};export{P as default};
