import{_ as b}from"./Pagination-BsQTIK-f.js";import{u as h,a1 as g,g as w,c as o,o as n,d as a,e as r,m as y,w as c,a as e,F as m,l as k,a3 as v,t as l,W as B}from"./app-A6rt1Zcw.js";import{_ as E}from"./AppLayout.vue_vue_type_script_setup_true_lang-CnEMg3Qw.js";import{r as R,a as $}from"./TrashIcon-DGkskqPT.js";import"./Button.vue_vue_type_script_setup_true_lang-CnFLI-IY.js";import"./index-BewGUgRO.js";const A={class:"flex h-full flex-1 flex-col gap-4 rounded-xl p-4"},C={class:"max-w-7xl py-6 sm:px-6 lg:px-8"},D={class:"min-w-full border bg-white"},N={class:"flex space-x-2 p-2"},F=["onClick"],S={class:"p-2"},V={class:"p-2"},W={class:"p-2"},j={class:"mt-4"},G={__name:"Index",props:{users:Object},setup(i){const u=h(),p=g(),f=[{title:"Edit Role",href:"/editrole"}];w(()=>p.props.flash.toast,t=>{t!=null&&t.message&&u[t.type??"info"](t.message)},{immediate:!0});function _(t){switch(t){case 0:return"Belum ada Role";case 1:return"Admin";case 2:return"Super Admin";case 3:return"Developer"}}const x=t=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&B.delete(route("editroles.destroy",t))};return(t,d)=>(n(),o(m,null,[a(r(y),{title:"Edit Role"}),a(E,{breadcrumbs:f},{default:c(()=>[e("div",A,[e("div",C,[e("table",D,[d[0]||(d[0]=e("thead",null,[e("tr",null,[e("th",{class:"border-b p-2 text-left font-medium text-gray-700"}),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Nama"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Email"),e("th",{class:"border-b p-2 text-left font-medium text-gray-700"},"Role")])],-1)),e("tbody",null,[(n(!0),o(m,null,k(i.users.data,s=>(n(),o("tr",{key:s.id,class:"border-b"},[e("td",N,[a(r(v),{href:t.route("editroles.edit",s.id),class:"rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600"},{default:c(()=>[a(r(R),{class:"h-4 w-4"})]),_:2},1032,["href"]),e("button",{onClick:I=>x(s.id),class:"rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"},[a(r($),{class:"h-4 w-4"})],8,F)]),e("td",S,l(s.name),1),e("td",V,l(s.email),1),e("td",W,l(_(s.role)),1)]))),128))])]),e("div",j,[a(b,{links:i.users.links},null,8,["links"])])])])]),_:1})],64))}};export{G as default};
