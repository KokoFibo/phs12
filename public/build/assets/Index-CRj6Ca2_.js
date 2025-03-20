import{u as v,a1 as w,h as _,f as m,c as n,o as i,d as s,a as e,e as o,m as D,j as p,p as C,l as N,F as x,n as S,w as B,a6 as I,t as c,W as f}from"./app-MGHRrWdM.js";import{_ as P}from"./SimplePagination-DQcVFBA9.js";import{N as R}from"./Navbar-DIFlZRtY.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as V,a as j}from"./TrashIcon-La5JPvUl.js";/* empty css                                                               */const A={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},E={class:"flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5"},$={class:"flex flex-col gap-2 md:flex-row md:gap-5"},F={class:"flex w-full items-center justify-between gap-3"},M={class:"w-full overflow-x-auto py-4"},T={class:"min-w-full border bg-white dark:bg-gray-800 dark:border-gray-700"},W={class:"flex space-x-2 p-2"},G=["onClick"],L={class:"p-2 text-gray-700 dark:text-gray-300"},O={class:"p-2 text-gray-700 dark:text-gray-300"},q={class:"p-2 text-gray-700 dark:text-gray-300"},z={__name:"Index",props:{users:Object},setup(u){const b=v(),y=w();async function g(){try{const t=await new Promise((r,a)=>{f.get("/editroles",{search:d.value,perPage:l.value},{preserveState:!0,onSuccess:r,onError:a})});console.log("Data berhasil dimuat",t.props)}catch(t){console.error("Gagal memuat data:",t)}}_(()=>y.props.flash.toast,t=>{t!=null&&t.message&&b[t.type??"info"](t.message)},{immediate:!0});const d=m(""),l=m(10);function k(t){switch(t){case 0:return"Belum ada Role";case 1:return"Admin";case 2:return"Super Admin";case 3:return"Developer"}}const h=t=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&f.delete(route("editroles.destroy",t))};return(t,r)=>(i(),n(x,null,[s(R),s(o(D),{title:"User Role"}),e("div",A,[r[4]||(r[4]=e("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[e("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"User Role")],-1)),e("div",E,[e("div",$,[e("div",F,[p(e("input",{"onUpdate:modelValue":r[0]||(r[0]=a=>d.value=a),type:"text",placeholder:"Cari ...",class:"w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:ring-blue-400",onInput:g},null,544),[[C,d.value]]),p(e("select",{"onUpdate:modelValue":r[1]||(r[1]=a=>l.value=a),onChange:g,class:"w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},r[2]||(r[2]=[e("option",{value:"10"},"10",-1),e("option",{value:"20"},"20",-1),e("option",{value:"50"},"50",-1)]),544),[[N,l.value]])])])]),e("div",M,[e("table",T,[r[3]||(r[3]=e("thead",null,[e("tr",null,[e("th",{class:"border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300"}),e("th",{class:"border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300"},"Nama"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300"},"Email"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700 dark:text-gray-300"},"Role")])],-1)),e("tbody",null,[(i(!0),n(x,null,S(u.users.data,a=>(i(),n("tr",{key:a.id,class:"border-b dark:border-gray-700"},[e("td",W,[s(o(I),{href:t.route("editroles.edit",a.id),class:"rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"},{default:B(()=>[s(o(V),{class:"h-4 w-4"})]),_:2},1032,["href"]),e("button",{onClick:H=>h(a.id),class:"rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"},[s(o(j),{class:"h-4 w-4"})],8,G)]),e("td",L,c(a.name),1),e("td",O,c(a.email),1),e("td",q,c(k(a.role)),1)]))),128))])])]),s(P,{links:u.users.links,class:"dark:text-gray-300"},null,8,["links"])])],64))}},ee=U(z,[["__scopeId","data-v-3cf0ad2c"]]);export{ee as default};
