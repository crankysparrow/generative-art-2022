(()=>{let t,n,e,o;function i(){e=random([3,4,5]),o=function(){let t=shuffle([0,1,2]);return{inner:function(n){let o=[];o[t[0]]=0,o[t[1]]=255,o[t[2]]=120*n+100,o[3]=100*(e-n),stroke(...o)},outer:function(){let n=[];n[t[0]]=0,n[t[1]]=100,n[t[2]]=50,stroke(...n)}}}()}document.body.style.backgroundColor="#000",window.setup=function(){createCanvas(min(window.innerWidth,500),min(window.innerHeight,500)),createLoop({duration:5}),t=.6*min(width,height),n=.2*t,i()},window.draw=function(){background(0),function(t,n){noFill(),strokeWeight(2),translate(width/2,height/2),rotate(.25*PI),translate(-t/2,-t/2);for(let i=0;i<t;i+=n)for(let r=0;r<t;r+=n){push(),translate(i,r);let a=0;for(;a<e;){let e=i-n*a/t,l=r-n*a/t,s=map(sin(animLoop.theta+2*e),-1,1,0,1)*n,u=map(sin(animLoop.theta+2*l),-1,1,0,1)*n;o.inner(a),line(s,0,0,u),a++}let l=40-map(sin(animLoop.theta+i*r/(t*t)*e),-1,1,0,40);fill(0,155,255,l),noStroke(),rect(0,0,n,n),pop()}strokeWeight(3),o.outer();for(let e=0;e<=t;e+=n)line(e,0,e,t),line(0,e,t,e)}(t,n)},window.mousePressed=i})();
//# sourceMappingURL=08-grid.js.map