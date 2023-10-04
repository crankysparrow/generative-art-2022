window.setup=function(){createCanvas(800,700)},window.draw=function(){background(0,0,0),translate(400,350),stroke(255),noFill();for(let t=1;t<18;t++){let n=40*sqrt(t),e=40;stroke(12*t,250-t*(200/18),0),line(0,0,n,0),line(0,0,n,e),line(n,0,n,e);let a=atan2(e,n);rotate(a)}};
//# sourceMappingURL=17-theodorus.js.map
