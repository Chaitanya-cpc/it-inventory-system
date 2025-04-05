exports.id=474,exports.ids=[474],exports.modules={8862:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},4388:(e,t,r)=>{Promise.resolve().then(r.bind(r,3932))},5970:(e,t,r)=>{Promise.resolve().then(r.bind(r,1365)),Promise.resolve().then(r.bind(r,9023))},8428:(e,t,r)=>{"use strict";var o=r(4767);r.o(o,"usePathname")&&r.d(t,{usePathname:function(){return o.usePathname}}),r.o(o,"useRouter")&&r.d(t,{useRouter:function(){return o.useRouter}})},3932:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var o=r(5344),a=r(6506);function s(){return(0,o.jsxs)("div",{className:"min-h-screen flex flex-col items-center justify-center bg-black p-4",children:[(0,o.jsxs)("div",{className:"text-center max-w-md",children:[(0,o.jsxs)("div",{className:"mb-8",children:[o.jsx("h1",{className:"text-6xl md:text-8xl font-bold text-tron-cyan mb-2",children:"404"}),o.jsx("div",{className:"w-full h-1 bg-tron-cyan mb-6"}),o.jsx("h2",{className:"text-2xl md:text-3xl font-semibold text-tron-cyan mb-2",children:"PAGE NOT FOUND"}),o.jsx("p",{className:"text-tron-cyan/70",children:"The page you are looking for doesn't exist or has been moved."})]}),(0,o.jsxs)("div",{className:"grid grid-flow-col auto-cols-max gap-4 justify-center mb-8",children:[o.jsx("div",{className:"w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-75"}),o.jsx("div",{className:"w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-150"}),o.jsx("div",{className:"w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-300"})]}),(0,o.jsxs)("div",{className:"space-y-4",children:[o.jsx(a.default,{href:"/dashboard",className:"inline-block w-full px-6 py-3 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition",children:"RETURN TO DASHBOARD"}),o.jsx("button",{onClick:()=>window.history.back(),className:"inline-block w-full px-6 py-3 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition",children:"GO BACK"})]})]}),o.jsx("div",{className:"fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tron-cyan to-transparent"}),o.jsx("div",{className:"fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tron-cyan to-transparent"}),o.jsx("div",{className:"fixed top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-tron-cyan to-transparent"}),o.jsx("div",{className:"fixed top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-tron-cyan to-transparent"})]})}},1365:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var o=r(5344),a=r(3729),s=r(6506);class n extends a.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error("Error caught by ErrorBoundary:",e,t)}render(){return this.state.hasError?this.props.fallback?this.props.fallback:o.jsx("div",{className:"min-h-screen flex items-center justify-center bg-black",children:(0,o.jsxs)("div",{className:"text-center p-8 border border-tron-cyan/30 rounded-lg bg-tron-darkblue/20 max-w-lg",children:[o.jsx("svg",{className:"mx-auto h-16 w-16 text-tron-red",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),o.jsx("h1",{className:"mt-4 text-2xl font-semibold text-tron-cyan",children:"System Error"}),o.jsx("p",{className:"mt-2 text-tron-cyan/70",children:"The system has encountered an unexpected error."}),this.state.error&&o.jsx("div",{className:"mt-4 p-3 bg-black/50 rounded border border-tron-red/30 text-tron-red/80 text-sm text-left overflow-auto",children:o.jsx("p",{className:"font-mono",children:this.state.error.toString()})}),(0,o.jsxs)("div",{className:"mt-6 flex justify-center space-x-4",children:[o.jsx("button",{onClick:()=>window.location.reload(),className:"px-4 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition",children:"RELOAD PAGE"}),o.jsx(s.default,{href:"/dashboard",className:"px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition",children:"RETURN TO DASHBOARD"})]})]})}):this.props.children}}let i=n},9023:(e,t,r)=>{"use strict";r.r(t),r.d(t,{ToastManager:()=>n,ToastProvider:()=>l,default:()=>s,useToast:()=>d});var o=r(5344),a=r(3729);function s({id:e,message:t,type:r="info",duration:s=5e3,onClose:n}){let[i,l]=(0,a.useState)(!0),[d,c]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=setTimeout(()=>{m()},s);return()=>clearTimeout(e)},[s]);let m=()=>{c(!0),setTimeout(()=>{l(!1),n&&n()},300)};if(!i)return null;let u={success:o.jsx("svg",{className:"w-5 h-5 mr-3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})}),error:o.jsx("svg",{className:"w-5 h-5 mr-3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})}),info:o.jsx("svg",{className:"w-5 h-5 mr-3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z",clipRule:"evenodd"})})};return o.jsx("div",{className:`fixed bottom-4 right-4 z-50 transform transition-transform duration-300 ease-in-out ${d?"translate-x-full opacity-0":"translate-x-0 opacity-100"}`,children:(0,o.jsxs)("div",{className:`flex items-center border px-4 py-3 rounded shadow-md ${{success:"border-tron-green bg-tron-darkblue/50 text-tron-green",error:"border-tron-red bg-tron-darkblue/50 text-tron-red",info:"border-tron-cyan bg-tron-darkblue/50 text-tron-cyan"}[r]}`,role:"alert",children:[u[r],o.jsx("div",{children:t}),o.jsx("button",{onClick:m,className:"ml-4 text-xl leading-none focus:outline-none","aria-label":"Close",children:o.jsx("span",{children:"\xd7"})})]})})}function n({toasts:e,removeToast:t}){return o.jsx(o.Fragment,{children:e.map(e=>o.jsx(s,{id:e.id,message:e.message,type:e.type,duration:e.duration,onClose:()=>t(e.id)},e.id))})}let i=(0,a.createContext)(void 0);function l({children:e}){let[t,r]=(0,a.useState)([]),s=e=>{r(t=>t.filter(t=>t.id!==e))};return(0,o.jsxs)(i.Provider,{value:{showToast:e=>{let t=e.id||Math.random().toString(36).substring(2,9);return r(r=>[...r,{...e,id:t}]),t},removeToast:s},children:[e,o.jsx(n,{toasts:t,removeToast:s})]})}function d(){let e=(0,a.useContext)(i);if(void 0===e)throw Error("useToast must be used within a ToastProvider");return e}},5903:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x,metadata:()=>p});var o=r(5036);r(4315);var a=r(6843);let s=(0,a.createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/components/Toast.tsx`),{__esModule:n,$$typeof:i}=s;s.default,(0,a.createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/components/Toast.tsx#ToastManager`);let l=(0,a.createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/components/Toast.tsx#ToastProvider`);(0,a.createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/components/Toast.tsx#useToast`);let d=(0,a.createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/components/ErrorBoundary.tsx`),{__esModule:c,$$typeof:m}=d,u=d.default,p={title:"TRON Inventory System",description:"Track and manage your digital assets in the Grid"};function x({children:e}){return o.jsx("html",{lang:"en",className:"dark",children:o.jsx("body",{className:"font-orbitron bg-black",children:o.jsx(u,{children:o.jsx(l,{children:o.jsx("div",{className:"min-h-screen tron-gradient",children:e})})})})})}},8206:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>s,__esModule:()=>a,default:()=>n});let o=(0,r(6843).createProxy)(String.raw`/Applications/Codebase/inventory_management_IT/frontend/src/app/not-found.tsx`),{__esModule:a,$$typeof:s}=o,n=o.default},4315:()=>{},4669:(e,t,r)=>{"use strict";r.d(t,{Am:()=>E});var o,a=r(3729);let s={data:""},n=e=>e||s,i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",o="",a="";for(let s in e){let n=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+n+";":o+="f"==s[1]?c(n,s):s+"{"+c(n,"k"==s[1]?"":t)+"}":"object"==typeof n?o+=c(n,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=n&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(s,n):s+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+o},m={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},p=(e,t,r,o,a)=>{let s=u(e),n=m[s]||(m[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!m[n]){let t=s!==e?e:(e=>{let t,r,o=[{}];for(;t=i.exec(e.replace(l,""));)t[4]?o.shift():t[3]?(r=t[3].replace(d," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(d," ").trim();return o[0]})(e);m[n]=c(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let p=r&&m.g?m.g:null;return r&&(m.g=m[n]),((e,t,r,o)=>{o?t.data=t.data.replace(o,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(m[n],t,o,p),n},x=(e,t,r)=>e.reduce((e,o,a)=>{let s=t[a];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+o+(null==s?"":s)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return p(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let h,b,g,v=f.bind({k:1});function y(e,t){let r=this||{};return function(){let o=arguments;function a(s,n){let i=Object.assign({},s),l=i.className||a.className;r.p=Object.assign({theme:b&&b()},i),r.o=/ *go\d+/.test(l),i.className=f.apply(r,o)+(l?" "+l:""),t&&(i.ref=n);let d=e;return e[0]&&(d=i.as||e,delete i.as),g&&d[0]&&g(i),h(d,i)}return t?t(a):a}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}}),T=[],P={toasts:[],pausedAt:void 0},A=e=>{P=k(P,e),T.forEach(e=>{e(P)})},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),S=e=>(t,r)=>{let o=$(t,e,r);return A({type:2,toast:o}),o.id},E=(e,t)=>S("blank")(e,t);E.error=S("error"),E.success=S("success"),E.loading=S("loading"),E.custom=S("custom"),E.dismiss=e=>{A({type:3,toastId:e})},E.remove=e=>A({type:4,toastId:e}),E.promise=(e,t,r)=>{let o=E.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?j(t.success,e):void 0;return a?E.success(a,{id:o,...r,...null==r?void 0:r.success}):E.dismiss(o),e}).catch(e=>{let a=t.error?j(t.error,e):void 0;a?E.error(a,{id:o,...r,...null==r?void 0:r.error}):E.dismiss(o)}),e};var R=new Map,_=1e3,z=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=(y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${O} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),M=(y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),L=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,B=(y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,y("div")`
  position: absolute;
`,y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,o=a.createElement,c.p=void 0,h=o,b=void 0,g=void 0,f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`}};