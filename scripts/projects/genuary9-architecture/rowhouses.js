(()=>{let o=function(){return{house:random(["#66170e","#783225"]),accent:random(["#4c244f","#f5c447","#3c4399"]),win:color(163,170,157),win2:color(170,180,170),lines:color(59,33,30),out:color(176,156,129)}},e=function(){return{house:color(220,215,194),accent:random([color(137,167,167),color(44,58,73),color(136,47,37)]),win:color(163,170,157),win2:color(170,180,170),lines:color(59,33,30),out:color(176,156,129)}},t=function(){return{house:random([color(85,34,19),color(129,69,51)]),accent:random([color(137,167,167),color(44,58,73),color(136,47,37)]),win:color(181,171,161),win2:color(166,159,151),lines:color(59,33,30),out:color(235,215,190)}},r=function(){return{house:random(["#ab806a","#cd8865"]),accent:random([color(137,167,167),color(44,58,73),color(136,47,37)]),win:color(163,170,157),win2:color(170,180,170),lines:color(59,33,30),out:color(176,156,129)}},l=function(){return{accent:random(["#fabc2a","#4c1e4f","#293399"]),house:random(["#66170e","#783225"]),win:color(163,170,157),win2:color(170,180,170),lines:color(59,33,30),out:color(206,210,219)}},n=function(){return{accent:random(["#86BBBD","#5F506B"]),house:random(["#533747","#483D51"]),win:color(163,170,157),win2:color(170,180,170),lines:color(59,33,30),out:color(206,210,219)}},c=function(){return{accent:random(["#CBDF90","#1B4079"]),house:random(["#4D7C8A","#7F9C96"]),win2:color("#C7D1CF"),win:color("#DDE3E2"),lines:color(59,33,30),out:color(206,210,219)}},i=function(){return{accent:random(["#acfcd9","#f06449","#571F4E"]),house:random(["#27A58C","#97230C"]),win2:color(240,167,102),win:color(240,187,132),lines:color("#581620"),out:color("#E4B363")}},s=function(){return{house:random(["#571f4e","#8c86aa"]),accent:random(["#27a58c","#f9dc5c","#81559b"]),win2:color(240,167,102),win:color(240,187,132),lines:color("#571f4e"),out:random([color("#f0544f"),color("#952327")])}},a=function(){return{house:random(["#c8553d","#f28f3b","#694d75","#331832"]),accent:random(["#ffd95c","#588b8b"]),win2:color(255,241,194),win:color(255,251,184),lines:color("#332e3c"),out:color("#fdd692")}},h=function(){return{house:random(["#c8553d","#f28f3b","#331832"]),accent:random(["#ffd95c","#588b8b"]),win2:color(255,241,194),win:color(255,251,184),lines:color("#332e3c"),out:random([color("#694d75"),color("#754f44")])}};let u;function f(o){let e=createGraphics(o,height),t=random([.06,.2,.3]),r=random([1.2,1.1]),l=-1*random(.2*height);for(;l<1.25*height;){let n=random([3,3,2]),c=random(height*t,height*(t+.08));l+=c*r;let i=2==n?c/random(1.6,1.8):c/random(1.9,2.1),s=[],a=-1.2*random(i);for(;a<o+i;)s.push({x:a,y:l,hw:i,hh:random(.97*c,1.03*c),g:e}),a+=i;s=shuffle(s),e.push(),e.rotate(random(.01*-PI,.01*PI)),s.forEach((o=>{w(o,n)})),e.pop()}return e}let d=[o=>({floor1:.34*o,floor2:.3*o,floor3:.26*o,basement:.04*o,roof:.06*o}),o=>({floor1:.32*o,floor2:.29*o,floor3:.29*o,basement:.04*o,roof:.06*o}),o=>({floor1:.33*o,floor2:.29*o,floor3:.26*o,basement:.06*o,roof:.06*o})],g=[o=>({floor1:.47*o,floor2:.43*o,basement:.04*o,roof:.06*o})];function w({x:o,y:e,hw:t,hh:r,g:l},n){let c=2==n?g[0](r):random(d)(r),{floor1:i,floor2:s,floor3:a,basement:h,roof:f}=c,w=random([1,2,3]),y=random([1,2]),W=random([1,2]),x=random(u.palettes)();if(x.house2=color(.7*red(x.house),.7*green(x.house),.7*blue(x.house)),x.house3=color(.5*red(x.house),.5*green(x.house),.5*blue(x.house)),x.accent2=color(.8*red(x.accent),.8*green(x.accent),.8*blue(x.accent)),x.out2=lerpColor(x.out,x.house3,.5),x.lineFade=color(.7*red(x.house),.7*green(x.house),.7*blue(x.house)),x.lineFade.setAlpha(50),x.lineFade2=color(.7*red(x.house),.7*green(x.house),.7*blue(x.house)),x.lineFade2.setAlpha(120),l.push(),l.translate(o,e-r),l.stroke(x.lines),l.strokeWeight(1),l.fill(x.house),l.rect(0,0,t,r),1==y){let o=r/floor(random(18,30));l.stroke(x.lineFade),l.strokeWeight(2);for(let e=o/2;e<r;e+=o)l.line(0,e,t,e)}!function({houseWidth:o,floorHeight:e,basement:t,x:r,y:l,windowStyle:n,windowP:c,vLines:i,cs:s,g:a}){let h=.22*o,u=.9*e,f=int(.05*o),d=int(.1*e),g=e*c,w=int(.21*o),m=random(["left","right"]),y=(o-h-f-2*w)/4;a.push(),"left"==m?(a.translate(r+f,l),k({x:0,y:d,doorW:h,doorH:u,cs:s,g:a}),p({x:0,y:e,doorW:h,stepH:t,floorHeight:e,cs:s,g:a}),a.translate(h+y,0),1==i&&(a.stroke(s.lineFade2),a.strokeWeight(2),a.line(w/2,e/2,w/2,e+t),a.line(w+2*y+w/2,e/2,w+2*y+w/2,e+t-2)),b({x:0,y:c<.7?2*d:d,w:w,h:g,cs:s,style:n,g:a}),a.translate(w+2*y,0),b({x:0,y:c<.7?2*d:d,w:w,h:g,cs:s,style:n,g:a})):(a.translate(r+y,l),1==i&&(a.stroke(s.lineFade2),a.strokeWeight(2),a.line(w/2,e/2,w/2,e+t),a.line(w+2*y+w/2,e/2,w+2*y+w/2,e+t-2)),b({x:0,y:c<.7?2*d:d,w:w,h:g,cs:s,style:n,g:a}),a.translate(w+2*y,0),b({x:0,y:c<.7?2*d:d,w:w,h:g,cs:s,style:n,g:a}),a.translate(w+y,0),k({x:0,y:d,doorW:h,doorH:u,cs:s,g:a}),p({x:0,y:e,doorW:h,stepH:t,floorHeight:e,cs:s,g:a}));a.pop()}({vLines:W,houseWidth:t,floorHeight:i,basement:h,x:0,y:3==n?a+s+f:s+f,cs:x,windowStyle:w,windowP:2==n?.6:.7,g:l}),m({vLines:W,x:0,y:3==n?a+f:f,houseWidth:t,floorHeight:s,cs:x,windowStyle:w,g:l}),3==n&&m({vLines:W,x:0,y:f,houseWidth:t,floorHeight:a,cs:x,windowStyle:w,g:l}),function({x:o,y:e,w:t,h:r,cs:l,g:n}){let c=random([1,2]),i=random([l.accent2,l.house2]);if(n.stroke(l.lines),n.strokeWeight(1),n.push(),1==c){let c=.03*t;n.translate(o,e),n.fill(i),n.quad(-c,0,t+c,0,t,r,0,r);color(.7*red(i),.7*green(i),.7*blue(i));n.noStroke();let s=l.house3;s.setAlpha(80),n.rectMode(CENTER),n.fill(s);let a=t/14;for(let o=0;o<14;o++)n.rect(o*a+.5*a,.4*r,.5*a,.8*r),n.rect(o*a+.5*a,.2*r,.7*a,.4*r)}else if(2==c){n.translate(o,e),n.fill(i),n.rect(0,0,t,r);let l=color(.4*red(i),.4*green(i),.4*blue(i));n.noStroke(),l.setAlpha(150),n.fill(l),n.rect(0,.6*r,t,.4*r),n.rect(0,.8*r,t,.2*r)}n.pop()}({x:0,y:0,w:t,h:f,cs:x,g:l}),l.pop()}function p({x:o,y:e,doorW:t,stepH:r,floorHeight:l,cs:n,g:c}){c.push(),c.translate(o,e),c.fill(n.out),c.stroke(n.out2),c.strokeWeight(1);let i=0,s=.05*l;for(;i<r;)c.push(),c.translate(0,i),c.rect(0,0,t,s),i+=s,c.pop();c.pop()}function m({x:o,y:e,houseWidth:t,floorHeight:r,windowStyle:l,cs:n,vLines:c,g:i}){let s=.1*t,a=.1*r;i.push(),i.translate(o,e),i.fill(0,0,255,150);let h=int(2*s),u=int((t-2*h)/3);1==c&&(i.push(),i.rectMode(CENTER),i.fill(n.lineFade2),i.noStroke(),i.rect(u+h/2,8*a,s,2*a),i.rect(2*u+h+h/2,8*a,s,2*a),i.pop()),b({x:u,y:a,w:h,h:7.5*a,cs:n,style:l,g:i}),b({x:2*u+h,y:a,w:h,h:7.5*a,cs:n,style:l,g:i}),i.pop()}function k({x:o,y:e,doorW:t,doorH:r,cs:l,g:n}){let c=int(.18*r),i=r-c,s=.1*t,a=.1*i;n.push(),n.translate(o,e);let h=random([1,2,3]);if(1==h)n.stroke(l.out),n.strokeWeight(s),n.fill(l.win2),n.arc(t/2,c,8*s,2*c,PI,0),n.stroke(l.out2),n.strokeWeight(1.5*s),n.strokeCap(SQUARE),n.noFill(),n.arc(t/2,c,8*s,2*c,PI,1.2*PI),n.arc(t/2,c,8*s,2*c,1.4*PI,1.6*PI),n.arc(t/2,c,8*s,2*c,1.8*PI,2*PI);else if(2==h){n.fill(l.out),n.noStroke(),n.rect(0,0,t,c);let o=(t-2*s)/2-s/2;n.fill(l.win),n.stroke(l.out2),n.strokeWeight(1),n.rect(s,s,o,c-2*s),n.rect(o+2*s,s,o,c-2*s)}else if(3==h){let o=int(c+a);n.push(),n.translate(0,c-o);let e=o/2;n.fill(l.out),n.stroke(l.out2),n.strokeWeight(1),n.triangle(t/2,0,t,e,0,e),n.rect(0,e,t,o-e),n.pop()}n.fill(l.accent),n.stroke(l.lines),n.strokeWeight(1),n.rect(0,c,t,i);let u=random([1,2]);1==u?(n.stroke(l.accent2),n.noFill(),n.strokeWeight(3),n.rect(2*s,c+a,t-4*s,i/2),n.strokeWeight(2),n.rect(4*s,c+2*a,t-8*s,i/2-2*a)):2==u&&(n.push(),n.fill(l.accent2),n.noStroke(),n.rectMode(CENTER),n.rect(t/2,c+7*s,6*s,12*s,3*s),n.stroke(l.accent),n.strokeWeight(3),n.rect(t/2,c+7*s,4*s,10*s,2*s),n.pop()),n.fill(l.out),n.stroke(l.out2),n.strokeWeight(1),n.rect(0,c,s,i),n.rect(t-s,c,s,i),n.pop()}function b({x:o,y:e,w:t,h:r,cs:l,style:n,g:c}){let i=.1*t;if(c.push(),c.translate(o,e),c.noStroke(),c.fill(l.win),c.rect(0,0,t,r-1),c.fill(l.win2),c.rect(0,r/2,t,r/2),c.fill(l.house3),c.rect(0,.48*r,t,.04*r),1==n){c.fill(l.house2),c.noStroke();let o=t/4;for(let e=0;e<4;e++)c.rect(e*o,-1,o,.15*r);c.fill(l.house3);for(let e=-1;e<4;e++)c.rect(e*o+.75*o,-1,.5*o,.15*r);c.rect(0,.9*r,t,.1*r+1)}else 2==n?(c.fill(l.out),c.rect(-i,0,t+2*i,.1*r),c.rect(-i,.9*r,t+2*i,.1*r)):3==n?(c.stroke(l.out),c.strokeWeight(2.5*i),c.strokeCap(SQUARE),c.noFill(),c.arc(t/2,.05*r,2*t,.2*r,1.09*PI,1.91*PI),c.fill(l.out),c.noStroke(),c.quad(0,.87*r,t,.87*r,1.1*t,r,-.1*t,r),c.fill(l.out2),c.quad(-.05*t,.94*r,1.05*t,.94*r,1.1*t,1.01*r,-.1*t,1.01*r)):"shutters"==n&&(c.fill(l.accent),c.rect(0,0,2*i,r),c.rect(t-2*i,0,2*i,r));c.pop()}window.setup=function(){createCanvas(window.innerWidth,window.innerHeight),noLoop()},window.draw=function(){u=random([{palettes:[c],bg:"#E8F2CF"},{palettes:[i,s],bg:"#190933"},{palettes:[i],bg:"#190933"},{palettes:[s],bg:"#f4fffd"},{palettes:[a,h],bg:color(255,251,214)},{palettes:[l],bg:"#e6e1d5"},{palettes:[o,e],bg:"#e6e1d5"},{palettes:[r,t],bg:"#e6e1d5"},{palettes:[n],bg:"#CAE1E2"}]),background(u.bg);let d=random([1,2,3]);d=2;{let o=random(.333*width,.666*width),e=f(o);fill(u.bg),stroke(u.palettes[0]().lines),strokeWeight(2),rect(0,0,o,height),image(e,0,0),translate(o,0),fill(u.bg),stroke(u.palettes[0]().lines),strokeWeight(2),rect(0,0,width-o,height);let t=f(width-o);image(t,0,0)}},window.mouseClicked=()=>redraw()})();
//# sourceMappingURL=rowhouses.js.map
