import{f as k,b as j,C as T,g as P,h as f,c as o,o as s,d as x,a as e,e as d,m as A,i as p,j as u,v as S,k as g,l as y,F as c,n as v,t as i,p as m,W as q}from"./app-BHwTTeuP.js";import{N as I}from"./Navbar-xl6pOa3q.js";import{_ as M,a as N}from"./DropdownVihara-DHHUqQRv.js";/* empty css                                                               */import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-D0Bfipeo.js";import"./Input.vue_vue_type_script_setup_true_lang-Dx7T_5ko.js";import"./index-JD8vBXC0.js";const C={class:"mx-auto flex max-w-7xl flex-col rounded-xl p-4 text-sm bg-white dark:bg-gray-900 dark:text-gray-200"},B={class:"mt-3 max-w-7xl rounded-lg border p-3 py-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800"},D={class:"flex items-center"},L={class:"inline-flex cursor-pointer items-center"},K={key:0,class:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"},E=["disabled"],F=["value"],H={key:0,class:"text-sm text-red-500 dark:text-red-400"},J=["disabled"],W=["value"],_={key:0,class:"text-sm text-red-500 dark:text-red-400"},$={key:1,class:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"},O={class:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"},z={key:0,class:"text-sm text-red-500 dark:text-red-400"},G={key:0,class:"text-sm text-red-500 dark:text-red-400"},Q={key:0,class:"text-sm text-red-500 dark:text-red-400"},R={key:0,class:"text-sm text-red-500 dark:text-red-400"},X={class:"grid grid-cols-1 gap-4"},Y={key:0,class:"text-sm text-red-500 dark:text-red-400"},Z={class:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"},rr={key:0,class:"text-sm text-red-500 dark:text-red-400"},er={key:0,class:"text-sm text-red-500 dark:text-red-400"},ar={key:0,class:"text-sm text-red-500 dark:text-red-400"},tr={key:0,class:"text-sm text-red-500 dark:text-red-400"},dr={key:0,class:"text-sm text-red-500 dark:text-red-400"},lr={key:0,class:"text-sm text-red-500 dark:text-red-400"},or={key:0,class:"text-sm text-red-500 dark:text-red-400"},sr={key:0,class:"text-sm text-red-500 dark:text-red-400"},ir={key:0,class:"text-sm text-red-500 dark:text-red-400"},ur={key:0,class:"text-sm text-red-500 dark:text-red-400"},nr={class:"grid grid-cols-1 gap-4"},gr={key:0,class:"text-sm text-red-500 dark:text-red-400"},mr={class:"flex justify-between"},br=["disabled"],kr=["disabled"],Vr={__name:"Create",props:{kotas:Array,panditas:Array,viharas:Array,errors:Object},setup(l){k(""),k(!1);const n=j(),a=T({kota_id:"",group_id:"",vihara_id:"",pandita_id:"",nama_umat:"",nama_alias:"",mandarin:"",gender:"",tgl_lahir:"",umur_sekarang:null,alamat:"",telp:"",hp:"",email:"",pengajak:"",penjamin:"",tgl_mohonTao:"",tgl_mohonTao_lunar:"",tgl_sd3h:"",tgl_vtotal:"",status:"Active",keterangan:""}),h=k(n.lock_pandita),w=k(n.lock_vihara);P(()=>{a.vihara_id=n.vihara_id,a.pandita_id=n.pandita_id}),f(()=>a.vihara_id,b=>{b&&n.setViharaId(b||null)}),f(()=>a.pandita_id,b=>{b&&n.setPanditaId(b||null)}),f(()=>n.vihara_default,b=>{b?(n.setViharaId(n.vihara_id_default),a.vihara_id=n.vihara_id_default,n.setPanditaId(n.pandita_id_default),a.pandita_id=n.pandita_id_default):(n.setViharaId(a.vihara_id),n.setPanditaId(a.pandita_id))});function V(){a.post(route("dataumats.store"),{onSuccess:()=>a.reset()})}function U(){q.get("/dataumats")}return(b,r)=>(s(),o(c,null,[x(d(A),{title:"Add Data Umat"}),x(I),e("div",C,[r[43]||(r[43]=e("div",{class:"mb-3 hidden rounded-lg border p-2 md:block dark:border-gray-700"},[e("h2",{class:"text-xl text-gray-500 dark:text-gray-300"},"Add data umat")],-1)),e("div",B,[e("form",{onSubmit:p(V,["prevent"]),class:"space-y-6"},[e("div",D,[e("div",null,[e("label",L,[u(e("input",{type:"checkbox","onUpdate:modelValue":r[0]||(r[0]=t=>d(n).vihara_default=t),class:"dark:bg-gray-700 dark:border-gray-600"},null,512),[[S,d(n).vihara_default]]),r[21]||(r[21]=e("span",{class:"ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"},"Input vihara sendiri",-1))])])]),d(n).vihara_default?(s(),o("div",K,[e("div",null,[r[23]||(r[23]=e("label",{for:"pandita_id",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Vihara",-1)),u(e("select",{"onUpdate:modelValue":r[1]||(r[1]=t=>d(a).vihara_id=t),id:"pandita_id",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",disabled:w.value},[r[22]||(r[22]=e("option",{value:"",disabled:""},"Pilih Vihara",-1)),(s(!0),o(c,null,v(l.viharas,t=>(s(),o("option",{key:t.id,value:t.id},i(t.nama_vihara),9,F))),128))],8,E),[[y,d(a).vihara_id]]),l.errors.vihara_id?(s(),o("p",H,i(l.errors.vihara_id),1)):g("",!0)]),e("div",null,[r[25]||(r[25]=e("label",{for:"pandita_id",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Pandita",-1)),u(e("select",{"onUpdate:modelValue":r[2]||(r[2]=t=>d(a).pandita_id=t),id:"pandita_id",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",disabled:h.value},[r[24]||(r[24]=e("option",{value:"",disabled:""},"Pilih Pandita",-1)),(s(!0),o(c,null,v(l.panditas,t=>(s(),o("option",{key:t.id,value:t.id},i(t.nama_pandita),9,W))),128))],8,J),[[y,d(a).pandita_id]]),l.errors.pandita_id?(s(),o("p",_,i(l.errors.pandita_id),1)):g("",!0)])])):(s(),o("div",$,[e("div",null,[x(M,{modelValue:d(a).vihara_id,"onUpdate:modelValue":r[3]||(r[3]=t=>d(a).vihara_id=t),viharas:l.viharas,errors:l.errors,class:"mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"},null,8,["modelValue","viharas","errors"])]),e("div",null,[x(N,{modelValue:d(a).pandita_id,"onUpdate:modelValue":r[4]||(r[4]=t=>d(a).pandita_id=t),panditas:l.panditas,errors:l.errors,class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,8,["modelValue","panditas","errors"])])])),e("div",O,[e("div",null,[r[26]||(r[26]=e("label",{for:"nama_umat",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Nama Umat",-1)),u(e("input",{"onUpdate:modelValue":r[5]||(r[5]=t=>d(a).nama_umat=t),type:"text",id:"nama_umat",required:"",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).nama_umat]]),l.errors.nama_umat?(s(),o("p",z,i(l.errors.nama_umat),1)):g("",!0)]),e("div",null,[r[27]||(r[27]=e("label",{for:"nama_alias",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Nama Alias",-1)),u(e("input",{"onUpdate:modelValue":r[6]||(r[6]=t=>d(a).nama_alias=t),type:"text",id:"nama_alias",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).nama_alias]]),l.errors.nama_alias?(s(),o("p",G,i(l.errors.nama_alias),1)):g("",!0)]),e("div",null,[r[28]||(r[28]=e("label",{for:"mandarin",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Mandarin",-1)),u(e("input",{"onUpdate:modelValue":r[7]||(r[7]=t=>d(a).mandarin=t),type:"text",id:"mandarin",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).mandarin]]),l.errors.mandarin?(s(),o("p",Q,i(l.errors.mandarin),1)):g("",!0)]),e("div",null,[r[29]||(r[29]=e("label",{for:"email",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Email",-1)),u(e("input",{"onUpdate:modelValue":r[8]||(r[8]=t=>d(a).email=t),type:"email",id:"email",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).email]]),l.errors.email?(s(),o("p",R,i(l.errors.email),1)):g("",!0)])]),e("div",X,[e("div",null,[r[30]||(r[30]=e("label",{for:"alamat",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Alamat",-1)),u(e("textarea",{required:"","onUpdate:modelValue":r[9]||(r[9]=t=>d(a).alamat=t),id:"alamat",rows:"3",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).alamat]]),l.errors.alamat?(s(),o("p",Y,i(l.errors.alamat),1)):g("",!0)])]),e("div",Z,[e("div",null,[r[31]||(r[31]=e("label",{for:"tgl_lahir",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Tanggal Lahir",-1)),u(e("input",{"onUpdate:modelValue":r[10]||(r[10]=t=>d(a).tgl_lahir=t),type:"date",id:"tgl_lahir",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},null,512),[[m,d(a).tgl_lahir]]),l.errors.tgl_lahir?(s(),o("p",rr,i(l.errors.tgl_lahir),1)):g("",!0)]),e("div",null,[r[32]||(r[32]=e("label",{for:"telp",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Telepon",-1)),u(e("input",{"onUpdate:modelValue":r[11]||(r[11]=t=>d(a).telp=t),type:"text",id:"telp",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).telp]]),l.errors.telp?(s(),o("p",er,i(l.errors.telp),1)):g("",!0)]),e("div",null,[r[33]||(r[33]=e("label",{for:"hp",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Handphone",-1)),u(e("input",{"onUpdate:modelValue":r[12]||(r[12]=t=>d(a).hp=t),type:"text",id:"hp",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).hp]]),l.errors.hp?(s(),o("p",ar,i(l.errors.hp),1)):g("",!0)]),e("div",null,[r[35]||(r[35]=e("label",{for:"gender",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Jenis Kelamin",-1)),u(e("select",{"onUpdate:modelValue":r[13]||(r[13]=t=>d(a).gender=t),id:"gender",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400",required:""},r[34]||(r[34]=[e("option",{value:"",disabled:""},"Pilih Jenis Kelamin",-1),e("option",{value:"Laki-laki"},"Laki-laki",-1),e("option",{value:"Perempuan"},"Perempuan",-1)]),512),[[y,d(a).gender]]),l.errors.gender?(s(),o("p",tr,i(l.errors.gender),1)):g("",!0)]),e("div",null,[r[36]||(r[36]=e("label",{for:"pengajak",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Pengajak",-1)),u(e("input",{required:"","onUpdate:modelValue":r[14]||(r[14]=t=>d(a).pengajak=t),type:"text",id:"pengajak",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).pengajak]]),l.errors.pengajak?(s(),o("p",dr,i(l.errors.pengajak),1)):g("",!0)]),e("div",null,[r[37]||(r[37]=e("label",{for:"penjamin",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Penjamin",-1)),u(e("input",{required:"","onUpdate:modelValue":r[15]||(r[15]=t=>d(a).penjamin=t),type:"text",id:"penjamin",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).penjamin]]),l.errors.penjamin?(s(),o("p",lr,i(l.errors.penjamin),1)):g("",!0)]),e("div",null,[r[38]||(r[38]=e("label",{for:"tgl_mohonTao",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Tanggal Mohon Tao",-1)),u(e("input",{required:"","onUpdate:modelValue":r[16]||(r[16]=t=>d(a).tgl_mohonTao=t),type:"date",id:"tgl_mohonTao",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).tgl_mohonTao]]),l.errors.tgl_mohonTao?(s(),o("p",or,i(l.errors.tgl_mohonTao),1)):g("",!0)]),e("div",null,[r[39]||(r[39]=e("label",{for:"tgl_sd3h",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Sidang Dharma 3 Hari",-1)),u(e("input",{"onUpdate:modelValue":r[17]||(r[17]=t=>d(a).tgl_sd3h=t),type:"date",id:"tgl_sd3h",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).tgl_sd3h]]),l.errors.tgl_sd3h?(s(),o("p",sr,i(l.errors.tgl_sd3h),1)):g("",!0)]),e("div",null,[r[40]||(r[40]=e("label",{for:"tgl_vtotal",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Vegetarian Total",-1)),u(e("input",{"onUpdate:modelValue":r[18]||(r[18]=t=>d(a).tgl_vtotal=t),type:"date",id:"tgl_vtotal",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).tgl_vtotal]]),l.errors.tgl_vtotal?(s(),o("p",ir,i(l.errors.tgl_vtotal),1)):g("",!0)]),e("div",null,[r[41]||(r[41]=e("label",{for:"status",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Status",-1)),u(e("input",{"onUpdate:modelValue":r[19]||(r[19]=t=>d(a).status=t),type:"text",id:"status",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).status]]),l.errors.status?(s(),o("p",ur,i(l.errors.status),1)):g("",!0)])]),e("div",nr,[e("div",null,[r[42]||(r[42]=e("label",{for:"keterangan",class:"block text-sm font-medium text-gray-700 dark:text-gray-300"},"Keterangan",-1)),u(e("textarea",{"onUpdate:modelValue":r[20]||(r[20]=t=>d(a).keterangan=t),id:"keterangan",rows:"3",class:"mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"},null,512),[[m,d(a).keterangan]]),l.errors.keterangan?(s(),o("p",gr,i(l.errors.keterangan),1)):g("",!0)])]),e("div",mr,[e("div",null,[e("button",{onClick:p(U,["prevent"]),class:"rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",disabled:d(a).processing}," Back ",8,br)]),e("div",null,[e("button",{type:"submit",class:"rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white",disabled:d(a).processing}," Save ",8,kr)])])],32)])])],64))}};export{Vr as default};
