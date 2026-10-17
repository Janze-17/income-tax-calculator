const assert=require('node:assert/strict');const T=require('./tax.js');
let p={salary:700000,service:100000,book:100000,deduct:210000,cap:700000};
assert.equal(T.calc(144000,p).total,105870);assert.ok(Math.abs(T.calc(144001,p).total-119069.9)<1e-7);
for(const sample of [p,{...p,cap:10000},{...p,salary:0,cap:0},{salary:200000,service:0,book:0,deduct:60000,cap:200000}]){let brute=T.calc(0,sample);for(let b=0;b<=sample.cap;b+=1){const r=T.calc(b,sample);if(r.total<brute.total-1e-7)brute=r;}assert.ok(T.optimize(sample).total<=brute.total+1e-7);}
assert.throws(()=>T.optimize({...p,cap:800000}));assert.equal(T.optimize({...p,deduct:2000000}).b,0);
console.log('PASS: source examples, exhaustive integer comparison, cap validation, zero income, excess deductions');console.log(T.optimize(p));
