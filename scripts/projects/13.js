(()=>{let t,o="#2d7dd2",e="#36f1cd",n="#090c9b";function a(o,e,n,a,i=0){let l=t[o][e],r=t[n][a],p=1*sin(animLoop.theta+i),s=map(p,-1,1,l.x,r.x),c=l.x>r.x?constrain(s,r.x,l.x):constrain(s,l.x,r.x),x=map(p,-1,1,l.y,r.y),f=l.y>r.y?constrain(x,r.y,l.y):constrain(x,l.y,r.y);line(l.x,l.y,c,f)}function i(t,o=0){function e(e,n,a,i,l,r,p,s){let c=sin(animLoop.theta+o),x=t[e][n],f=t[l][r],h=p5.Vector.lerp(x,f,map(c,-1,1,0,1)),u=t[a][i],m=t[p][s],y=p5.Vector.lerp(u,m,map(c,-1,1,0,1)),d=cos(animLoop.theta),I=map(d,-1,1,h.x,y.x),P=map(d,-1,1,h.y,y.y);line(h.x,h.y,I,P),line(h.y,h.x,P,I)}stroke(n),e(3,0,1,2,0,3,2,1),e(2,2,0,4,4,0,0,4),e(0,5,4,1,5,0,1,4),e(3,3,6,0,0,6,6,0)}function l(t){function n(o,e,n,a,i=0){let l,r=t[o][e],p=t[n][a],s=sin(animLoop.theta+i),c=sin(animLoop.theta+i+.5);l=r.x<p.x?min(map(c,-1,.5,r.x,p.x),p.x):max(map(c,-1,.5,r.x,p.x),p.x);let x=map(s,-1,1,r.y,p.y);line(r.x,r.y,l,x)}strokeWeight(2),stroke(o),n(1,1,1,3,PI/4),n(1,1,3,1,PI/4),n(3,3,3,1,PI/4),n(3,3,1,3,PI/4),stroke(e),n(2,2,4,2),n(2,2,2,4),n(4,4,4,2),n(4,4,2,4)}function r(o,e,n,a=0){let i=cos(animLoop.theta+a),l=map(i,-1,1,0,n);circle(t[o][e].x,t[o][e].y,l)}window.setup=function(){createCanvas(500,500),createLoop({duration:3,gif:!0})},window.draw=function(){background(0),translate(50,50),t=function(t,{dotColor:o="#fff",radius:e=5,offset:n=!1,w:a=width,h:i=height}={}){fill(o),noStroke();let l=a/t,r=i/t,p=[];for(let o=0;o<=t;o++){let e=[];for(let a=0;a<=t;a++){let t=o*l,i=a*r;n&&(t+=a%2==0?l/2:0),e.push(createVector(t,i))}p.push(e)}return noFill(),p}(10,{w:400,h:400,dotColor:"rgba(255,255,255,0.2)"}),function(t){i(t,PI/2),l(t),push(),translate(400,0),scale(-1,1),i(t),l(t),pop(),push(),translate(0,400),scale(1,-1),i(t),l(t),pop(),push(),translate(400,400),scale(-1,-1),i(t,PI/2),l(t),pop(),stroke(n),a(3,5,6,5),a(7,5,4,5,PI),a(5,3,5,6),a(5,7,5,4,PI),a(5,3,3,3),a(5,3,7,3,PI),a(5,7,3,7,PI),a(5,7,7,7),a(3,5,3,3),a(3,5,3,7,PI),a(7,5,7,3,PI),a(7,5,7,7),stroke(o);for(let o=1;o<t.length;o+=2)for(let e=0;e<t.length;e+=2){let n=o/t.length;r(o,e,10*max(4-dist(5,5,o,e),0),n+PI/2)}}(t)}})();
//# sourceMappingURL=13.js.map