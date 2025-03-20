import{u as w,a1 as _,h as C,f as p,c as i,o as l,d as s,a as e,e as o,m as D,j as x,p as N,l as G,w as T,a0 as V,a6 as I,F as m,n as P,t as b,W as u}from"./app-MGHRrWdM.js";import{N as S}from"./Navbar-DIFlZRtY.js";import{_ as $}from"./SimplePagination-DQcVFBA9.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as B,a as E}from"./TrashIcon-La5JPvUl.js";/* empty css                                                               */const A={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},F={class:"flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5"},M={class:"flex flex-col gap-2 md:flex-row md:gap-5"},U={class:"flex w-full items-center justify-between gap-3"},W={class:"w-full overflow-x-auto py-4"},K={class:"min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700"},L={class:"divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"},O={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},q={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},z={class:"space-x-1 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"},H=["onClick"],J=["onClick"],Q={class:"mt-4"},R={__name:"Index",props:{groups:Object},setup(c){const y=w(),k=_(),f=t=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&u.delete(route("groups.destroy",t))};C(()=>k.props.flash.toast,t=>{t!=null&&t.message&&y[t.type??"info"](t.message)},{immediate:!0});const d=p(""),n=p(10);async function g(){try{const t=await new Promise((r,a)=>{u.get("/groups",{search:d.value,perPage:n.value},{preserveState:!0,onSuccess:r,onError:a})});console.log("Data berhasil dimuat",t.props)}catch(t){console.error("Gagal memuat data:",t)}}function v(t){u.get(route("groups.edit",t))}return(t,r)=>(l(),i(m,null,[s(o(D),{title:"Group"}),s(S),e("div",A,[r[5]||(r[5]=e("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[e("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Group")],-1)),e("div",F,[e("div",M,[e("div",U,[x(e("input",{"onUpdate:modelValue":r[0]||(r[0]=a=>d.value=a),type:"text",placeholder:"Cari...",class:"w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-200",onInput:g},null,544),[[N,d.value]]),x(e("select",{"onUpdate:modelValue":r[1]||(r[1]=a=>n.value=a),onChange:g,class:"w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},r[2]||(r[2]=[e("option",{value:"10"},"10",-1),e("option",{value:"20"},"20",-1),e("option",{value:"50"},"50",-1)]),544),[[G,n.value]])])]),e("div",null,[s(o(I),{href:t.route("groups.create"),class:"block rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"},{default:T(()=>r[3]||(r[3]=[V(" Tambah Data Group ")])),_:1},8,["href"])])]),e("div",W,[e("table",K,[r[4]||(r[4]=e("thead",{class:"bg-gray-50 dark:bg-gray-800"},[e("tr",null,[e("th",{class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Nama Group "),e("th",{class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Kota "),e("th",{class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Aksi ")])],-1)),e("tbody",L,[(l(!0),i(m,null,P(c.groups.data,a=>(l(),i("tr",{key:a.id,class:"border-b text-sm"},[e("td",O,b(a.nama_group),1),e("td",q,b(a.kota?a.kota.nama_kota:"-"),1),e("td",z,[e("button",{onClick:h=>v(a.id),class:"rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"},[s(o(B),{class:"h-4 w-4"})],8,H),e("button",{onClick:h=>f(a.id),class:"rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"},[s(o(E),{class:"h-4 w-4"})],8,J)])]))),128))])])]),e("div",Q,[s($,{links:c.groups.links,class:"dark:text-gray-300"},null,8,["links"])])])],64))}},ae=j(R,[["__scopeId","data-v-2b960cfb"]]);export{ae as default};
