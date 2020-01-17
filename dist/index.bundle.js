/**
 * calc-units
 * v1.0.0 (2020-01-17T09:25:10.061Z) 
 * 2019-2020 Steve Genoud
 * 
 */

var calcUnits=function(e){"use strict";const r=/^calc\((.+)\)$/,c=(e,r)=>{const t=[];let n=0,s=[];for(let a of e){if(")"===a&&0===n)return console.warn(`parenthesis mismatch in ${r}`),0;")"===a&&1===n?(t.push(c(s,r)),s=[],n=0):")"===a&&n>1?(n-=1,s.push(a)):0===n&&"("!==a&&")"!==a?t.push(a):n>0&&"("!==a&&")"!==a?s.push(a):"("===a&&0===n?n+=1:"("===a&&n>0&&(n+=1,s.push(a))}return n>0?(console.warn(`parenthesis mismatch in "${r}"`),0):((e,r)=>(e.forEach((r,c)=>{"-"===r&&(e[c+1]=-e[c+1])}),(e=e.filter(e=>"-"!==e&&"+"!==e)).forEach((c,t)=>{if("/"===c){const c=e[t-1],n=e[t+1];"number"!=typeof c||"number"!=typeof n?(console.warn(`Bad calc expression (division) "${r}"`),e[t+1]=0,e[t-1]=0):(e[t+1]=c/n,e[t-1]=0)}if("*"===c){const c=e[t-1],n=e[t+1];"number"!=typeof c||"number"!=typeof n?(console.warn(`Bad calc expression (multiplication) "${r}"`),e[t+1]=0,e[t-1]=0):(e[t+1]=c*n,e[t-1]=0)}}),e.filter(e=>"*"!==e&&"/"!==e).map(e=>Number(e)).reduce((e,r)=>e+r,0)))(t,r)};return e.CALC_EXPR=r,e.default=(e,t)=>{if(!r.test(e))return console.warn(`Not a valid calc expression "${e}"`),0;const[,n]=e.match(r),s=n.replace(/calc/g,"").replace(/\(/g," ( ").replace(/\)/g," ) ").replace(/\+/g," + ").replace(/-/g," - ").replace(/\*/g," * ").replace(/\//g," / ").split(/\s/).filter(e=>e).map(e=>{if("+"===e||"-"===e||"/"===e||"*"===e||"("===e||")"===e)return e;const r=Number(e);return Number.isNaN(r)?t(e):r});return c(s,e)},e.isCalc=e=>!r.test(e),e}({});
