import{u as E,Z as F,b as O,h as j,f as o,g as W,c as x,o as m,d as g,a as t,e as i,m as Q,j as N,p as Y,l as Z,F as P,n as q,k as T,t as a,_ as J,w as R,Y as s,$ as X,W as v}from"./app-CXNzVZ4b.js";import{N as tt}from"./Navbar-QVnS0FUK.js";import{d as et,r as at}from"./debounce-BmwjyGJl.js";import{_ as rt}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as st,a as lt,b as nt,c as ot}from"./TrashIcon-CTi-lt7C.js";/* empty css                                                               */const dt={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},it={class:"flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-5"},ut={class:"flex flex-col gap-2 md:flex-row md:gap-5"},gt={class:"flex w-full items-center justify-between gap-3"},pt={class:"w-full overflow-x-auto py-4"},xt={class:"min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700"},mt={class:"bg-gray-50 dark:bg-gray-800"},vt={class:"divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"},yt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},kt={class:"flex space-x-2"},bt=["onClick"],ct=["onClick"],ft=["onClick"],wt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},ht={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},_t={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Ct={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},$t={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Tt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Dt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},St={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Vt={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},Ut={class:"whitespace-normal px-4 py-2 text-sm text-gray-500 dark:text-gray-300"},At={key:0,class:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"},Mt={class:"rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-gray-200"},jt={key:0,class:"py-4 text-center text-gray-500 dark:text-gray-400"},Nt={key:1,class:"mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2"},Pt={class:"text-sm leading-8 dark:text-gray-300"},Gt={class:"text-sm leading-8 dark:text-gray-300"},It={class:"mt-4 flex mx-auto items-center gap-5"},Bt=["disabled"],Kt={class:"text-sm text-gray-700 dark:text-gray-300"},Ht=["disabled"],Lt={__name:"Index copy",setup(zt){const D=E(),G=F(),S=O();console.log(S.user_role);const I=n=>{window.confirm("Apakah yakin ingin menghapus data ini?")&&v.delete(`/dataumats/${n}`,{onSuccess:()=>{D.success("Data Umat berhasil dihapus."),p()}})};j(()=>G.props.flash.toast,n=>{n!=null&&n.message&&D[n.type??"info"](n.message)},{immediate:!0});const V=o([]),u=o({}),b=o(""),c=o("id"),y=o("asc"),k=o(10),f=o(!1),l=o(null),w=o(null),h=o(null),_=o(null),C=o(null),$=o(!1);function B(n){$.value=!0,v.get(route("dataumats.detail",n),{},{preserveState:!0,onSuccess:e=>{l.value=e.props.umat,w.value=e.props.umur,h.value=e.props.chienkhun,_.value=e.props.vihara_asal,C.value=e.props.tanggal_mohon_Tao_lunar,f.value=!0,$.value=!1}})}function K(){f.value=!1,l.value=null,w.value=null,h.value=null,_.value=null,C.value=null}const H=n=>["乾","童"].includes(n)?"text-blue-500":"text-pink-500";function p(n=1){v.get("/dataumats",{search:b.value,sort_by:c.value,sort_order:y.value,per_page:k.value,page:n},{preserveState:!0,onSuccess:e=>{V.value=e.props.dataumats,u.value=e.props.pagination}})}function d(n){c.value===n?y.value=y.value==="asc"?"desc":"asc":(c.value=n,y.value="asc"),p()}const U=et(()=>{p()},500);function A(n){p(n)}W(()=>{p()}),j(k,()=>{p()});function L(){v.visit("/dataumats/create")}function z(n){v.get(route("dataumats.edit",n))}return(n,e)=>(m(),x(P,null,[g(i(Q),{title:"Data Umat"}),g(tt),t("div",dt,[e[45]||(e[45]=t("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[t("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Data Umat")],-1)),t("div",it,[t("div",ut,[t("div",gt,[N(t("input",{"onUpdate:modelValue":e[0]||(e[0]=r=>b.value=r),type:"text",placeholder:"Cari data...",class:"w-3/4 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-200",onInput:e[1]||(e[1]=(...r)=>i(U)&&i(U)(...r))},null,544),[[Y,b.value]]),N(t("select",{"onUpdate:modelValue":e[2]||(e[2]=r=>k.value=r),onChange:p,class:"w-1/4 rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},e[16]||(e[16]=[t("option",{value:"10"},"10",-1),t("option",{value:"20"},"20",-1),t("option",{value:"50"},"50",-1)]),544),[[Z,k.value]])])]),t("button",{onClick:L,class:"block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"},"Tambah Data")]),t("div",pt,[t("table",xt,[t("thead",mt,[t("tr",null,[e[17]||(e[17]=t("th",{class:"px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"},"Aksi",-1)),t("th",{onClick:e[3]||(e[3]=r=>d("id")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," ID "),t("th",{onClick:e[4]||(e[4]=r=>d("nama_umat")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Nama Umat "),t("th",{onClick:e[5]||(e[5]=r=>d("nama_alias")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Alias "),t("th",{onClick:e[6]||(e[6]=r=>d("mandarin")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," 中文名 "),t("th",{onClick:e[7]||(e[7]=r=>d("tgl_lahir")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Umur "),t("th",{onClick:e[8]||(e[8]=r=>d("jenis_kelamin")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Gender "),t("th",{onClick:e[9]||(e[9]=r=>d("status")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Status "),t("th",{onClick:e[10]||(e[10]=r=>d("kota.nama_kota")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Kota "),t("th",{onClick:e[11]||(e[11]=r=>d("group.nama_group")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Group "),t("th",{onClick:e[12]||(e[12]=r=>d("vihara.nama_vihara")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Vihara "),t("th",{onClick:e[13]||(e[13]=r=>d("pandita.nama_pandita")),class:"cursor-pointer px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"}," Pandita ")])]),t("tbody",vt,[(m(!0),x(P,null,q(V.value,r=>(m(),x("tr",{key:r.id},[t("td",yt,[t("div",kt,[t("button",{onClick:M=>z(r.id),class:"rounded bg-green-500 px-2 py-1 text-white hover:bg-yellow-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"},[g(i(st),{class:"h-4 w-4"})],8,bt),i(S).user_role>1?(m(),x("button",{key:0,onClick:M=>I(r.id),class:"rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"},[g(i(lt),{class:"h-4 w-4"})],8,ct)):T("",!0),t("button",{onClick:M=>B(r.id),class:"rounded bg-blue-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"},[g(i(at),{class:"h-4 w-4"})],8,ft)])]),t("td",wt,a(r.id),1),t("td",ht,a(r.nama_umat),1),t("td",_t,a(r.nama_alias),1),t("td",Ct,a(r.mandarin),1),t("td",$t,a(r.umur),1),t("td",{class:J(["whitespace-normal px-4 py-2 text-sm",H(r.chienkhun)])},a(r.chienkhun),3),t("td",Tt,a(r.status),1),t("td",Dt,a(r.kota_nama),1),t("td",St,a(r.group_nama),1),t("td",Vt,a(r.vihara_nama),1),t("td",Ut,a(r.pandita_nama),1)]))),128))])]),g(X,{name:"fade"},{default:R(()=>[f.value?(m(),x("div",At,[t("div",Mt,[e[44]||(e[44]=t("h2",{class:"text-center text-lg font-semibold dark:text-gray-200"},"Detail Data Umat",-1)),$.value?(m(),x("div",jt,"Loading...")):l.value?(m(),x("div",Nt,[t("div",Pt,[t("p",null,[e[18]||(e[18]=t("strong",null,"ID:",-1)),s(" "+a(l.value.id),1)]),t("p",null,[e[19]||(e[19]=t("strong",null,"Nama:",-1)),s(" "+a(l.value.nama_umat),1)]),t("p",null,[e[20]||(e[20]=t("strong",null,"Alias:",-1)),s(" "+a(l.value.nama_alias),1)]),t("p",null,[e[21]||(e[21]=t("strong",null,"Mandarin:",-1)),s(" "+a(l.value.mandarin),1)]),t("p",null,[e[22]||(e[22]=t("strong",null,"Umur:",-1)),s(" "+a(w.value),1)]),t("p",null,[e[23]||(e[23]=t("strong",null,"Gender:",-1)),s(" "+a(h.value),1)]),t("p",null,[e[24]||(e[24]=t("strong",null,"Pengajak:",-1)),s(" "+a(l.value.pengajak),1)]),t("p",null,[e[25]||(e[25]=t("strong",null,"Pandita:",-1)),s(" "+a(l.value.pandita.nama_pandita),1)]),t("p",null,[e[26]||(e[26]=t("strong",null,"Tanggal Mohon Tao:",-1)),s(" "+a(l.value.tgl_mohonTao),1)]),t("p",null,[e[27]||(e[27]=t("strong",null,"Tanggal Mohon Tao (Lunar):",-1)),s(" "+a(C.value),1)]),t("p",null,[e[28]||(e[28]=t("strong",null,"Group:",-1)),s(" "+a(l.value.group.nama_group),1)]),t("p",null,[e[29]||(e[29]=t("strong",null,"Alamat:",-1)),s(" "+a(l.value.alamat),1)]),t("p",null,[e[30]||(e[30]=t("strong",null,"Keterangan:",-1)),s(" "+a(l.value.keterangan),1)])]),t("div",Gt,[t("p",null,[e[31]||(e[31]=t("strong",null,"Kota:",-1)),s(" "+a(l.value.kota.nama_kota),1)]),t("p",null,[e[32]||(e[32]=t("strong",null,"Group:",-1)),s(" "+a(l.value.group.nama_group),1)]),t("p",null,[e[33]||(e[33]=t("strong",null,"Vihara Aktif:",-1)),s(" "+a(l.value.vihara.nama_vihara),1)]),t("p",null,[e[34]||(e[34]=t("strong",null,"Vihara Asal:",-1)),s(" "+a(_.value),1)]),t("p",null,[e[35]||(e[35]=t("strong",null,"Pandita:",-1)),s(" "+a(l.value.pandita.nama_pandita),1)]),t("p",null,[e[36]||(e[36]=t("strong",null,"HP:",-1)),s(" "+a(l.value.hp),1)]),t("p",null,[e[37]||(e[37]=t("strong",null,"Telp:",-1)),s(" "+a(l.value.telp),1)]),t("p",null,[e[38]||(e[38]=t("strong",null,"Penjamin:",-1)),s(" "+a(l.value.penjamin),1)]),t("p",null,[e[39]||(e[39]=t("strong",null,"Tanggal Sidang Dharma 3 Hari :",-1)),s(" "+a(l.value.tgl_sd3h),1)]),t("p",null,[e[40]||(e[40]=t("strong",null,"Tanggal Vegetarian Total :",-1)),s(" "+a(l.value.tgl_vtotal),1)]),t("p",null,[e[41]||(e[41]=t("strong",null,"Kota:",-1)),s(" "+a(l.value.kota.nama_kota),1)]),t("p",null,[e[42]||(e[42]=t("strong",null,"Vihara:",-1)),s(" "+a(l.value.vihara.nama_vihara),1)]),t("p",null,[e[43]||(e[43]=t("strong",null,"Status:",-1)),s(" "+a(l.value.status),1)])])])):T("",!0),t("button",{onClick:K,class:"mt-6 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"},"Tutup")])])):T("",!0)]),_:1})]),t("div",It,[t("button",{disabled:u.value.current_page===1,onClick:e[14]||(e[14]=r=>A(u.value.current_page-1)),class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"},[g(i(nt),{class:"h-5 w-5"})],8,Bt),t("span",Kt," Halaman "+a(u.value.current_page)+" dari "+a(u.value.last_page),1),t("button",{disabled:u.value.current_page===u.value.last_page,onClick:e[15]||(e[15]=r=>A(u.value.current_page+1)),class:"rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"},[g(i(ot),{class:"h-5 w-5"})],8,Ht)])])],64))}},Zt=rt(Lt,[["__scopeId","data-v-f7d129d0"]]);export{Zt as default};
