window.setup=function(){createCanvas(500,500),createLoop({duration:4})},window.draw=function(){background(0),fill(255);let r=function(r){let t=fract(r)*fract(r),o=fract(-r)*fract(-r);return 2*(t+o)-1}(animLoop.progress)*width;circle(animLoop.progress*width,r,10,10)};
//# sourceMappingURL=easings.js.map
