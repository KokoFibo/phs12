import{x as l,C as f,P as n,o as a,w as i,d as o,c as u,k as m,a as p,e,m as _,i as k,_ as d}from"./app-Di_Cpubz.js";import{_ as y}from"./TextLink.vue_vue_type_script_setup_true_lang-CBRvz5V6.js";import{_ as v}from"./Button.vue_vue_type_script_setup_true_lang-hZ2IvI-8.js";import{L as b,_ as x}from"./AuthLayout.vue_vue_type_script_setup_true_lang-DgaFhWe4.js";const g={key:0,class:"mb-4 text-center text-sm font-medium text-green-600"},N=l({__name:"VerifyEmail",props:{status:{}},setup(h){const s=f({}),c=()=>{s.post(route("verification.send"))};return(r,t)=>(a(),n(x,{title:"Verify email",description:"Please verify your email address by clicking on the link we just emailed to you."},{default:i(()=>[o(e(_),{title:"Email verification"}),r.status==="verification-link-sent"?(a(),u("div",g," A new verification link has been sent to the email address you provided during registration. ")):m("",!0),p("form",{onSubmit:k(c,["prevent"]),class:"space-y-6 text-center"},[o(e(v),{disabled:e(s).processing,variant:"secondary"},{default:i(()=>[e(s).processing?(a(),n(e(b),{key:0,class:"h-4 w-4 animate-spin"})):m("",!0),t[0]||(t[0]=d(" Resend verification email "))]),_:1},8,["disabled"]),o(y,{href:r.route("logout"),method:"post",as:"button",class:"mx-auto block text-sm"},{default:i(()=>t[1]||(t[1]=[d(" Log out ")])),_:1},8,["href"])],32)]),_:1}))}});export{N as default};
