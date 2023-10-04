window.setup=function(){createCanvas(window.innerWidth,window.innerHeight)},window.draw=function(){noLoop();let n=.9*min(width,height);background(0),stroke(255),noFill(),translate((width-n)/2,(height-n)/2),translate(n/2,n/2);let t=0;for(let n=0;n<6;n++){let n=100*cos(t),i=100*sin(t);circle(n,i,200),t+=TWO_PI/6}};
//# sourceMappingURL=18.js.map
