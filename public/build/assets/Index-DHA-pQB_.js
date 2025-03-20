import{u as O,a1 as W,b as Q,h as S,f as o,g as R,R as q,o as g,w as N,d as v,a as t,e as p,m as J,j as V,p as G,l as X,c as x,F as Y,n as Z,k as U,t as r,a2 as tt,a3 as et,a0 as s,W as k}from"./app-MGHRrWdM.js";import{_ as at}from"./AppLayout-CMniIheE.js";import{d as rt,r as st}from"./debounce-XPQ_dLMp.js";import{_ as lt}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as nt,a as ot}from"./TrashIcon-La5JPvUl.js";import"./Navbar-DIFlZRtY.js";/* empty css                                                               */const dt={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},ut={class:"flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5"},it={class:"flex flex-col gap-2 md:flex-row md:gap-5"},gt={class:"flex w-full items-center justify-between gap-3"},pt={class:"w-full overflow-x-auto py-4"},xt={class:"min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700"},mt={class:"bg-gray-50 dark:bg-gray-800"},yt={class:"divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"},vt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},kt={class:"flex space-x-2"},bt=["onClick"],ft=["onClick"],ct=["onClick"],wt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},ht={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},_t={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Ct={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},$t={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Tt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Dt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},St={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Vt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Ut={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},jt={key:0,class:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"},At={class:"max-h-screen w-full overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-gray-200 sm:max-w-lg"},Mt={key:0,class:"py-4 text-center text-gray-500 dark:text-gray-400"},Pt={key:1,class:"mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2"},It={class:"text-sm leading-8 dark:text-gray-300"},Nt={class:"text-sm leading-8 dark:text-gray-300"},Gt={class:"lg:mt-3 flex items-center justify-center gap-2 dark:bg-gray-900 dark:text-gray-200"},Bt=["disabled"],Kt={class:"flex items-center gap-1 text-xs md:text-sm"},Lt=["max"],Ft={class:"text-gray-600 dark:text-gray-300"},zt=["disabled"],Et={__name:"Index",setup(Ht){const j=O(),B=W(),A=Q();console.log(A.user_role);const K=n=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&k.delete(`/dataumats/${n}`,{onSuccess:()=>{j.success("Data Umat berhasil dihapus."),i()}})};S(()=>B.props.flash.toast,n=>{n!=null&&n.message&&j[n.type??"info"](n.message)},{immediate:!0});const M=o([]),u=o({}),c=o(""),w=o("id"),b=o("asc"),f=o(10),h=o(!1),l=o(null),_=o(null),C=o(null),$=o(null),T=o(null),D=o(!1),m=o(1);S(m,n=>{y(n)});function L(n){D.value=!0,k.get(route("dataumats.detail",n),{},{preserveState:!0,onSuccess:e=>{l.value=e.props.umat,_.value=e.props.umur,C.value=e.props.chienkhun,$.value=e.props.vihara_asal,T.value=e.props.tanggal_mohon_Tao_lunar,h.value=!0,D.value=!1}})}function F(){h.value=!1,l.value=null,_.value=null,C.value=null,$.value=null,T.value=null}const z=n=>["乾","童"].includes(n)?"text-blue-500":"text-pink-500";function i(n=1){k.get("/dataumats",{search:c.value,sort_by:w.value,sort_order:b.value,per_page:f.value,page:n},{preserveState:!0,onSuccess:e=>{M.value=e.props.dataumats,u.value=e.props.pagination}})}function d(n){w.value===n?b.value=b.value==="asc"?"desc":"asc":(w.value=n,b.value="asc"),i()}const P=rt(()=>{i()},500);function y(n){n==null?m.value=1:m.value=n,i(n)}R(()=>{i()}),S(f,()=>{i()});function E(){k.visit("/dataumats/create")}function H(n){k.get(route("dataumats.edit",n))}return(n,e)=>(g(),q(at,null,{default:N(()=>[v(p(J),{title:"Data Umat"}),t("div",dt,[e[48]||(e[48]=t("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[t("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Data Umat")],-1)),t("div",ut,[t("div",it,[t("div",gt,[V(t("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>c.value=a),type:"text",placeholder:"Cari data...",class:"w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-200",onInput:e[1]||(e[1]=(...a)=>p(P)&&p(P)(...a))},null,544),[[G,c.value]]),V(t("select",{"onUpdate:modelValue":e[2]||(e[2]=a=>f.value=a),onChange:i,class:"w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},e[19]||(e[19]=[t("option",{value:"10"},"10",-1),t("option",{value:"20"},"20",-1),t("option",{value:"50"},"50",-1)]),544),[[X,f.value]])])]),t("button",{onClick:E,class:"block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"},"Tambah Data")]),t("div",pt,[t("table",xt,[t("thead",mt,[t("tr",null,[e[20]||(e[20]=t("th",{class:"px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"},"Aksi",-1)),t("th",{onClick:e[3]||(e[3]=a=>d("id")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," ID "),t("th",{onClick:e[4]||(e[4]=a=>d("nama_umat")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Nama Umat "),t("th",{onClick:e[5]||(e[5]=a=>d("nama_alias")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Alias "),t("th",{onClick:e[6]||(e[6]=a=>d("mandarin")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," 中文名 "),t("th",{onClick:e[7]||(e[7]=a=>d("tgl_lahir")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Umur "),t("th",{onClick:e[8]||(e[8]=a=>d("jenis_kelamin")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Gender "),t("th",{onClick:e[9]||(e[9]=a=>d("status")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Status "),t("th",{onClick:e[10]||(e[10]=a=>d("kota.nama_kota")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Kota "),t("th",{onClick:e[11]||(e[11]=a=>d("group.nama_group")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Group "),t("th",{onClick:e[12]||(e[12]=a=>d("vihara.nama_vihara")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Vihara "),t("th",{onClick:e[13]||(e[13]=a=>d("pandita.nama_pandita")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Pandita ")])]),t("tbody",yt,[(g(!0),x(Y,null,Z(M.value,a=>(g(),x("tr",{key:a.id},[t("td",vt,[t("div",kt,[t("button",{onClick:I=>H(a.id),class:"rounded bg-green-500 px-2 py-1 text-white hover:bg-yellow-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"},[v(p(nt),{class:"h-4 w-4"})],8,bt),p(A).user_role>1?(g(),x("button",{key:0,onClick:I=>K(a.id),class:"rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"},[v(p(ot),{class:"h-4 w-4"})],8,ft)):U("",!0),t("button",{onClick:I=>L(a.id),class:"rounded bg-blue-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"},[v(p(st),{class:"h-4 w-4"})],8,ct)])]),t("td",wt,r(a.id),1),t("td",ht,r(a.nama_umat),1),t("td",_t,r(a.nama_alias),1),t("td",Ct,r(a.mandarin),1),t("td",$t,r(a.umur),1),t("td",{class:tt(["whitespace-normal px-4 py-2 text-sm",z(a.chienkhun)])},r(a.chienkhun),3),t("td",Tt,r(a.status),1),t("td",Dt,r(a.kota_nama),1),t("td",St,r(a.group_nama),1),t("td",Vt,r(a.vihara_nama),1),t("td",Ut,r(a.pandita_nama),1)]))),128))])]),v(et,{name:"fade"},{default:N(()=>[h.value?(g(),x("div",jt,[t("div",At,[e[47]||(e[47]=t("h2",{class:"text-center text-lg font-semibold dark:text-gray-200"},"Detail Data Umat",-1)),D.value?(g(),x("div",Mt,"Loading...")):l.value?(g(),x("div",Pt,[t("div",It,[t("p",null,[e[21]||(e[21]=t("strong",null,"ID:",-1)),s(" "+r(l.value.id),1)]),t("p",null,[e[22]||(e[22]=t("strong",null,"Nama:",-1)),s(" "+r(l.value.nama_umat),1)]),t("p",null,[e[23]||(e[23]=t("strong",null,"Alias:",-1)),s(" "+r(l.value.nama_alias),1)]),t("p",null,[e[24]||(e[24]=t("strong",null,"Mandarin:",-1)),s(" "+r(l.value.mandarin),1)]),t("p",null,[e[25]||(e[25]=t("strong",null,"Umur:",-1)),s(" "+r(_.value),1)]),t("p",null,[e[26]||(e[26]=t("strong",null,"Gender:",-1)),s(" "+r(C.value),1)]),t("p",null,[e[27]||(e[27]=t("strong",null,"Pengajak:",-1)),s(" "+r(l.value.pengajak),1)]),t("p",null,[e[28]||(e[28]=t("strong",null,"Pandita:",-1)),s(" "+r(l.value.pandita.nama_pandita),1)]),t("p",null,[e[29]||(e[29]=t("strong",null,"Tanggal Mohon Tao:",-1)),s(" "+r(l.value.tgl_mohonTao),1)]),t("p",null,[e[30]||(e[30]=t("strong",null,"Tanggal Mohon Tao (Lunar):",-1)),s(" "+r(T.value),1)]),t("p",null,[e[31]||(e[31]=t("strong",null,"Group:",-1)),s(" "+r(l.value.group.nama_group),1)]),t("p",null,[e[32]||(e[32]=t("strong",null,"Alamat:",-1)),s(" "+r(l.value.alamat),1)]),t("p",null,[e[33]||(e[33]=t("strong",null,"Keterangan:",-1)),s(" "+r(l.value.keterangan),1)])]),t("div",Nt,[t("p",null,[e[34]||(e[34]=t("strong",null,"Kota:",-1)),s(" "+r(l.value.kota.nama_kota),1)]),t("p",null,[e[35]||(e[35]=t("strong",null,"Group:",-1)),s(" "+r(l.value.group.nama_group),1)]),t("p",null,[e[36]||(e[36]=t("strong",null,"Vihara Aktif:",-1)),s(" "+r(l.value.vihara.nama_vihara),1)]),t("p",null,[e[37]||(e[37]=t("strong",null,"Vihara Asal:",-1)),s(" "+r($.value),1)]),t("p",null,[e[38]||(e[38]=t("strong",null,"Pandita:",-1)),s(" "+r(l.value.pandita.nama_pandita),1)]),t("p",null,[e[39]||(e[39]=t("strong",null,"HP:",-1)),s(" "+r(l.value.hp),1)]),t("p",null,[e[40]||(e[40]=t("strong",null,"Telp:",-1)),s(" "+r(l.value.telp),1)]),t("p",null,[e[41]||(e[41]=t("strong",null,"Penjamin:",-1)),s(" "+r(l.value.penjamin),1)]),t("p",null,[e[42]||(e[42]=t("strong",null,"Tanggal Sidang Dharma 3 Hari :",-1)),s(" "+r(l.value.tgl_sd3h),1)]),t("p",null,[e[43]||(e[43]=t("strong",null,"Tanggal Vegetarian Total :",-1)),s(" "+r(l.value.tgl_vtotal),1)]),t("p",null,[e[44]||(e[44]=t("strong",null,"Kota:",-1)),s(" "+r(l.value.kota.nama_kota),1)]),t("p",null,[e[45]||(e[45]=t("strong",null,"Vihara:",-1)),s(" "+r(l.value.vihara.nama_vihara),1)]),t("p",null,[e[46]||(e[46]=t("strong",null,"Status:",-1)),s(" "+r(l.value.status),1)])])])):U("",!0),t("button",{onClick:F,class:"mt-6 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"}," Tutup ")])])):U("",!0)]),_:1})]),t("div",Gt,[t("button",{class:"rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",onClick:e[14]||(e[14]=a=>y(u.value.first_page))}," « First"),t("button",{disabled:u.value.current_page==1,onClick:e[15]||(e[15]=a=>y(u.value.current_page-1)),class:"rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}," ‹ Prev ",8,Bt),t("div",Kt,[V(t("input",{"onUpdate:modelValue":e[16]||(e[16]=a=>m.value=a),type:"number",min:"1",max:u.value.last_page,class:"w-12 md:w-16 rounded border px-1 py-0.5 md:px-2 md:py-1 text-center shadow focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,8,Lt),[[G,m.value,void 0,{number:!0}]]),t("span",Ft,"/ "+r(u.value.last_page),1)]),t("button",{disabled:u.value.current_page===u.value.last_page,onClick:e[17]||(e[17]=a=>y(u.value.current_page+1)),class:"rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}," Next › ",8,zt),t("button",{class:"rounded border px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm text-gray-600 shadow-sm transition hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",onClick:e[18]||(e[18]=a=>y(u.value.last_page))}," Last »")])])]),_:1}))}},Yt=lt(Et,[["__scopeId","data-v-02f88df7"]]);export{Yt as default};
