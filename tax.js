/* Based on code_20260930.py. Amounts in RMB; allocation precision 0.01. */
(function(root){
const limits=[36000,144000,300000,420000,660000,960000,Infinity];
const rates=[.03,.10,.20,.25,.30,.35,.45];
const deductions=[0,2520,16920,31920,52920,85920,181920];
const bonusDeductions=[0,210,1410,2660,4410,7160,15160];
function tax(x,bonus=false){const i=limits.findIndex(v=>x<=v);return x*rates[i]-(bonus?bonusDeductions:deductions)[i];}
function validate(p){for(const k of ['salary','service','book','deduct','cap'])if(!Number.isFinite(p[k])||p[k]<0||p[k]>1e10)throw Error('请填写 0 至 100 亿元之间的有效金额');if(p.cap>p.salary)throw Error('可拆分奖金上限不能超过全年工资薪金总额');}
function calc(b,p){const taxable=Math.max(0,p.salary-b+p.service*.8+p.book*.56-p.deduct);const comprehensive=tax(taxable);const bonus=tax(b,true);return {b,taxable,comprehensive,bonus,total:comprehensive+bonus};}
function optimize(p){validate(p);const base=p.salary+p.service*.8+p.book*.56-p.deduct;const points=new Set([0,Math.floor(p.cap*100)/100]);for(const t of [0,...limits.filter(Number.isFinite)])for(const v of [t,base-t])for(const d of [-.01,0,.01]){const b=Math.round((v+d)*100)/100;if(b>=0&&b<=p.cap)points.add(b);}let best=calc(0,p);for(const b of [...points].sort((a,b)=>a-b)){const r=calc(b,p);if(r.total<best.total-1e-7)best=r;}return best;}
const api={calc,optimize,validate,limits};if(typeof module!=='undefined')module.exports=api;else root.Tax=api;
})(globalThis);
