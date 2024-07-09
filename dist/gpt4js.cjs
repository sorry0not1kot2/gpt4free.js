(()=>{"use strict";var e={d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>p});const r=class{async imageGeneration(e,t){throw new Error("Method 'imageGeneration()' must be implemented.")}},a=class extends r{async chatCompletion(e,t){try{const r=await fetch("https://nexra.aryahcr.cc/api/chat/gpt",{method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({messages:e,model:t.model||"gpt-4",temperature:t.temperature||.5,stream:t.stream||!1})});if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const a=await r.json();if(a.status&&a.gpt)return a.gpt;throw new Error("Unexpected response format")}catch(e){throw console.error("Error:",e),e}}},o=class extends r{async chatCompletion(e,t={}){const r={messages:e,id:()=>[...Array(7)].map((()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(36*Math.random())])).join(""),previewToken:null,userId:Math.random().toString(16).substring(2,8)+"-"+Math.random().toString(16).substring(2,4)+"-"+Math.random().toString(16).substring(2,4)+"-"+Math.random().toString(16).substring(2,4)+"-"+Math.random().toString(16).substring(2,12),codeModelMode:t.codeModelMode||!0,agentMode:{},trendingAgentMode:{},isMicMode:!1,isChromeExt:t.isChromeExt||!1,githubToken:null,clickedAnswer2:!1,clickedAnswer3:!1,clickedForceWebSearch:t.webSearch||!1,visitFromDelta:t.visitFromDelta||null};let a;a="undefined"!=typeof window?"https://proxy.zachey.space/?url=http://www.blackbox.ai/api/chat":"https://www.blackbox.ai/api/chat";const o=await fetch(a,{headers:{accept:"*/*","content-type":"application/json","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},body:JSON.stringify(r),method:"POST",mode:"cors",credentials:"omit"});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const s=await o.text();let n=s.lastIndexOf("$");return s.slice(n+1)}},s=class extends r{async chatCompletion(e,t){const r=await fetch("https://chat.eqing.tech/api/openai/v1/chat/completions",{headers:{accept:"text/event-stream","content-type":"application/json",usesearch:"false"},body:JSON.stringify({messages:e,stream:t.stream,model:t.model||"gpt-4o-free",temperature:t.temperature,captchaToken:"p1"}),method:"POST"});if(r.ok)try{const e=await r.json();if(e.choices&&e.choices.length>0&&e.choices[0].message&&e.choices[0].message.content)return e.choices[0].message.content.trim()}catch(e){console.error("Failed to parse JSON:",e)}else console.error("Network response was not ok")}},n=class extends r{async chatCompletion(e){let t=e[0].content;const r=ai.createTextSession(),a=await r;return await a.prompt(t)}},c=class{async imageGeneration(e,t){throw new Error("Method 'imageGeneration()' must be implemented.")}},i=class extends c{async imageGeneration(e){try{const t=await fetch("https://nexra.aryahcr.cc/api/image/complements",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e,model:"dalle"})});if(!t.ok)throw new Error("Failed to fetch data.");const r=(await t.text()).trim().replace(/^_+/,""),a=JSON.parse(r);if(200===a.code&&a.status)return a.images;throw new Error("Server returned unsuccessful response.")}catch(e){throw console.error("Error fetching data:",e),new Error("Failed to fetch data. Please try again later.")}}},d=class extends c{async imageGeneration(e,t){try{const r=await fetch("https://nexra.aryahcr.cc/api/image/complements",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e,model:"stablediffusion-2.1",data:{prompt_negative:t.prompt_negative||"",width:t.width||512,height:t.height||512,sampling_method:t.sampling_method||"default",sampling_steps:t.sampling_steps||1,cfg_scale:t.cfg_scale||1}})});if(!r.ok)throw new Error("Failed to fetch data.");const a=(await r.text()).trim().replace(/^_+/,""),o=JSON.parse(a);if(200===o.code&&o.status)return o.images;throw new Error("Server returned unsuccessful response.")}catch(e){throw console.error("Error fetching data:",e),new Error("Failed to fetch data. Please try again later.")}}},l=class{static createProvider(e){switch(e){case"Aryahcr":return new a;case"BlackBox":return new o;case"Nextway":return new s;case"Chrome":return new n;case"DALLE2":return new i;case"StableDiffusion":return new d;default:throw new Error(`Provider ${e} is not supported.`)}}};"undefined"!=typeof window&&(window.GPT4js=l);const p=l;module.exports=t})();