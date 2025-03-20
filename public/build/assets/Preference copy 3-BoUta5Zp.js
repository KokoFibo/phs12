import{Z as w,C as k,h as v,c as d,o as n,d as i,a as t,e as s,m as S,w as u,i as V,j as _,k as h,Y as p,F as f,n as g,t as c,l as b}from"./app-B9HnJzkO.js";import{a as P,_ as N}from"./Layout.vue_vue_type_script_setup_true_lang-B-moxe9o.js";import{_ as j}from"./index-ChBVr4Wy.js";import{N as $}from"./Navbar-Dz9mfKCi.js";import{_ as x}from"./Label.vue_vue_type_script_setup_true_lang-CKBp9wZj.js";import{S as B}from"./transition-DzD5fq6g.js";/* empty css                                                               */import"./_plugin-vue_export-helper-DlAUqK2U.js";const C={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm"},E={class:"flex flex-col space-y-6"},U={class:"grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-2"},q=["value"],A={key:0,class:"text-sm text-red-500"},D=["value"],F={key:0,class:"text-sm text-red-500"},M={class:"flex items-center gap-4"},Q={__name:"Preference copy 3",props:{user:Object,viharas:Array,panditas:Array,errors:Object},setup(o){w();const m=o,r=k({vihara_id:m.user.vihara_id,pandita_id:m.user.pandita_id});v(()=>r.kota_id,async l=>{if(l)try{const a=await(await fetch(route("groups.by.kota",l))).json();groups.value=a,r.group_id=m.dataumat.group_id,viharas.value=[]}catch(e){console.error("Error fetching groups:",e)}else groups.value=[],viharas.value=[],r.group_id="",r.vihara_id=""},{immediate:!0}),v(()=>r.group_id,async l=>{if(l)try{const a=await(await fetch(route("viharas.by.group",l))).json();viharas.value=a}catch(e){console.error("Error fetching viharas:",e)}else viharas.value=[],r.vihara_id=""},{immediate:!0});const y=()=>{r.patch(route("preference.update"),{preserveScroll:!0})};return(l,e)=>(n(),d(f,null,[i($),i(s(S),{title:"Preference settings"}),t("div",C,[i(N,null,{default:u(()=>[t("div",E,[i(P,{title:"Preference information",description:"Update setting preferensi anda"}),t("form",{onSubmit:V(y,["prevent"]),class:"space-y-6"},[t("div",U,[t("div",null,[i(s(x),{for:"vihara_id"},{default:u(()=>e[2]||(e[2]=[p("Vihara")])),_:1}),_(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>s(r).vihara_id=a),id:"vihara_id",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",required:""},[e[3]||(e[3]=t("option",{value:"",disabled:""},"Pilih Vihara",-1)),(n(!0),d(f,null,g(o.viharas,a=>(n(),d("option",{key:a.id,value:a.id},c(a.nama_vihara),9,q))),128))],512),[[b,s(r).vihara_id]]),o.errors.vihara_id?(n(),d("p",A,c(o.errors.vihara_id),1)):h("",!0)]),t("div",null,[i(s(x),{for:"pandita_id"},{default:u(()=>e[4]||(e[4]=[p("Pandita")])),_:1}),_(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>s(r).pandita_id=a),id:"pandita_id",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",required:""},[e[5]||(e[5]=t("option",{value:"",disabled:""},"Pilih Pandita",-1)),(n(!0),d(f,null,g(o.panditas,a=>(n(),d("option",{key:a.id,value:a.id},c(a.nama_pandita),9,D))),128))],512),[[b,s(r).pandita_id]]),o.errors.pandita_id?(n(),d("p",F,c(o.errors.pandita_id),1)):h("",!0)])]),t("div",M,[i(s(j),{disabled:s(r).processing},{default:u(()=>e[6]||(e[6]=[p("Save")])),_:1},8,["disabled"]),i(s(B),{show:s(r).recentlySuccessful,enter:"transition ease-in-out","enter-from":"opacity-0",leave:"transition ease-in-out","leave-to":"opacity-0"},{default:u(()=>e[7]||(e[7]=[t("p",{class:"text-sm text-neutral-600"},"Saved.",-1)])),_:1},8,["show"])])],32)])]),_:1})])],64))}};export{Q as default};
