import{q as g,f as w,C as v,N as y,o as V,w as a,d as r,e as s,m as b,a as t,i as S,Y as d}from"./app-B9HnJzkO.js";import{_ as u}from"./InputError.vue_vue_type_script_setup_true_lang-De8xVMLH.js";import{_ as k}from"./AppLayout.vue_vue_type_script_setup_true_lang-C-qSY2ZK.js";import{_ as x,a as C}from"./Layout.vue_vue_type_script_setup_true_lang-B-moxe9o.js";import{_ as I}from"./index-ChBVr4Wy.js";import{_ as m}from"./Input.vue_vue_type_script_setup_true_lang-DU1Rt9Hf.js";import{_ as f}from"./Label.vue_vue_type_script_setup_true_lang-CKBp9wZj.js";import{S as $}from"./transition-DzD5fq6g.js";import"./index-BXn6s_Od.js";import"./createLucideIcon-C8AltNi9.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const N={class:"space-y-6"},P={class:"grid gap-2"},E={class:"grid gap-2"},U={class:"grid gap-2"},B={class:"flex items-center gap-4"},J=g({__name:"Password copy",setup(M){const c=[{title:"Password settings",href:"/settings/password"}],p=w(null),l=w(null),e=v({current_password:"",password:"",password_confirmation:""}),_=()=>{e.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>e.reset(),onError:i=>{i.password&&(e.reset("password","password_confirmation"),p.value instanceof HTMLInputElement&&p.value.focus()),i.current_password&&(e.reset("current_password"),l.value instanceof HTMLInputElement&&l.value.focus())}})};return(i,o)=>(V(),y(k,{breadcrumbs:c},{default:a(()=>[r(s(b),{title:"Password settings"}),r(x,null,{default:a(()=>[t("div",N,[r(C,{title:"Update password",description:"Ensure your account is using a long, random password to stay secure"}),t("form",{onSubmit:S(_,["prevent"]),class:"space-y-6"},[t("div",P,[r(s(f),{for:"current_password"},{default:a(()=>o[3]||(o[3]=[d("Current password")])),_:1}),r(s(m),{id:"current_password",ref_key:"currentPasswordInput",ref:l,modelValue:s(e).current_password,"onUpdate:modelValue":o[0]||(o[0]=n=>s(e).current_password=n),type:"password",class:"mt-1 block w-full",autocomplete:"current-password",placeholder:"Current password"},null,8,["modelValue"]),r(u,{message:s(e).errors.current_password},null,8,["message"])]),t("div",E,[r(s(f),{for:"password"},{default:a(()=>o[4]||(o[4]=[d("New password")])),_:1}),r(s(m),{id:"password",ref_key:"passwordInput",ref:p,modelValue:s(e).password,"onUpdate:modelValue":o[1]||(o[1]=n=>s(e).password=n),type:"password",class:"mt-1 block w-full",autocomplete:"new-password",placeholder:"New password"},null,8,["modelValue"]),r(u,{message:s(e).errors.password},null,8,["message"])]),t("div",U,[r(s(f),{for:"password_confirmation"},{default:a(()=>o[5]||(o[5]=[d("Confirm password")])),_:1}),r(s(m),{id:"password_confirmation",modelValue:s(e).password_confirmation,"onUpdate:modelValue":o[2]||(o[2]=n=>s(e).password_confirmation=n),type:"password",class:"mt-1 block w-full",autocomplete:"new-password",placeholder:"Confirm password"},null,8,["modelValue"]),r(u,{message:s(e).errors.password_confirmation},null,8,["message"])]),t("div",B,[r(s(I),{disabled:s(e).processing},{default:a(()=>o[6]||(o[6]=[d("Save password")])),_:1},8,["disabled"]),r(s($),{show:s(e).recentlySuccessful,enter:"transition ease-in-out","enter-from":"opacity-0",leave:"transition ease-in-out","leave-to":"opacity-0"},{default:a(()=>o[7]||(o[7]=[t("p",{class:"text-sm text-neutral-600"},"Saved",-1)])),_:1},8,["show"])])],32)])]),_:1})]),_:1}))}});export{J as default};
