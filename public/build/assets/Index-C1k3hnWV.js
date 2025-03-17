import{u as D,a1 as F,g as P,f as p,c as a,o as r,d as l,e as n,m as N,w as h,a as t,j as m,q as O,p as v,F as c,l as w,t as u,a3 as y,_ as S,W as k}from"./app-DmYITvf2.js";import{_ as T}from"./Pagination-CpPz6ecx.js";import{_ as U}from"./AppLayout.vue_vue_type_script_setup_true_lang-4uETH2T3.js";import{r as $,a as B}from"./TrashIcon-BkmcxcjS.js";import"./Button.vue_vue_type_script_setup_true_lang-BuPlnn7A.js";import"./index-BeJceuiu.js";const G={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},A={class:"mb-4 flex flex-col gap-2 md:w-2/3 md:flex-row md:items-center md:gap-5"},E={class:"flex flex-col gap-2 md:flex-row md:gap-5"},I={class:"flex w-full items-center justify-between gap-3"},K=["value"],M=["value"],W={class:"min-w-full border bg-white"},q={class:"p-2"},L={class:"p-2"},z={class:"p-2"},H={class:"flex space-x-2 p-2"},J=["onClick"],oe={__name:"Index",props:{viharas:Object,groups:Object,kotas:Object,filters:Object},setup(d){const _=D(),V=F(),C=s=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&k.delete(route("viharas.destroy",s))};P(()=>V.props.flash.toast,s=>{s!=null&&s.message&&_[s.type??"info"](s.message)},{immediate:!0});const j=[{title:"Vihara",href:"/viharas"}],f=p(""),g=p(10),b=p(""),x=p("");async function i(){try{const s=await new Promise((o,e)=>{k.get("/viharas",{search:f.value,perPage:g.value,groupFilter:b.value,kotaFilter:x.value},{preserveState:!0,onSuccess:o,onError:e})});console.log("Data berhasil dimuat",s.props)}catch(s){console.error("Gagal memuat data:",s)}}return(s,o)=>(r(),a(c,null,[l(n(N),{title:"Vihara"}),l(U,{breadcrumbs:j},{default:h(()=>[t("div",G,[t("div",A,[t("div",E,[t("div",I,[m(t("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>f.value=e),type:"text",placeholder:"Cari ...",class:"w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",onInput:i},null,544),[[O,f.value]]),m(t("select",{"onUpdate:modelValue":o[1]||(o[1]=e=>g.value=e),onChange:i,class:"w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"},o[4]||(o[4]=[t("option",{value:"10"},"10",-1),t("option",{value:"20"},"20",-1),t("option",{value:"50"},"50",-1)]),544),[[v,g.value]])]),m(t("select",{"onUpdate:modelValue":o[2]||(o[2]=e=>b.value=e),onChange:i,class:"rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"},[o[5]||(o[5]=t("option",{value:""},"Pilih Group",-1)),(r(!0),a(c,null,w(d.groups,e=>(r(),a("option",{key:e.id,value:e.id},u(e.nama_group),9,K))),128))],544),[[v,b.value]]),m(t("select",{"onUpdate:modelValue":o[3]||(o[3]=e=>x.value=e),onChange:i,class:"rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"},[o[6]||(o[6]=t("option",{value:""},"Pilih Kota",-1)),(r(!0),a(c,null,w(d.kotas,e=>(r(),a("option",{key:e.id,value:e.id},u(e.nama_kota),9,M))),128))],544),[[v,x.value]])]),l(n(y),{href:s.route("viharas.create"),class:"rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"},{default:h(()=>o[7]||(o[7]=[S(" Tambah Data Vihara ")])),_:1},8,["href"])]),t("table",W,[o[8]||(o[8]=t("thead",null,[t("tr",null,[t("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Nama Vihara"),t("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Group"),t("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Kota"),t("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Aksi")])],-1)),t("tbody",null,[(r(!0),a(c,null,w(d.viharas.data,e=>(r(),a("tr",{key:e.id,class:"border-b text-sm"},[t("td",q,u(e.nama_vihara),1),t("td",L,u(e.group?e.group.nama_group:"-"),1),t("td",z,u(e.group&&e.group.kota?e.group.kota.nama_kota:"-"),1),t("td",H,[l(n(y),{href:s.route("viharas.edit",e.id),class:"rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"},{default:h(()=>[l(n($),{class:"h-4 w-4"})]),_:2},1032,["href"]),t("button",{onClick:Q=>C(e.id),class:"rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"},[l(n(B),{class:"h-4 w-4"})],8,J)])]))),128))])]),l(T,{links:d.viharas.links},null,8,["links"])])]),_:1})],64))}};export{oe as default};
