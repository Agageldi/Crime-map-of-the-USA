var mySvg = "<p>I was added from js</p>";
var values = [12,50,38]
var myScale = 1

mySvg = '<svg id = "aga_svg" height="400" width="650" transform = "scale(1)">'

function calc(x0,y0,x1,y1,a,r){
  var dx= x1-x0
  var dy= y1-y0
  var rumb,angle,x2,y2

  if(dx>=0 && dy>=0) rumb=1
  if(dx<0 && dy>0) rumb=2
  if(dx<=0 && dy<=0) rumb=3
  if(dx>0 && dy<0) rumb=4
  console.log(a)
  angle = Math.atan(dy/dx) - a ;
  if(dx==0) angle= Math.PI/2-a
  //if(dx==0) angle= a
  console.log(angle*180/Math.PI)
 
  if(rumb==2 || rumb==3) angle += Math.PI
  console.log(angle)

  x2 = x0 + r*Math.cos(angle)
  y2 = y0 + r*Math.sin(angle)
  console.log(x2,y2)

   return [x2,y2];
}



x0 = 100*myScale
y0 = 100*myScale
r  = 100*myScale

var x2 ,y2, a
a=90
x2 = x0
y2 = y0-r

m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
var  x3=m[0],y3=m[1]

var c1=(x3-x2),c2=y3-y2



mySvg +='<path id="seg1_1" d="M'+(x0)+' '+(y0)+' l  '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 0 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#8dd3c7" />'

a=45
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg1_2" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 0 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#ffffb3" />'
console.log(x2,y2,x3,y3)

a=25
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg1_3" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 0 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#bebada" />'
console.log(x2,y2,x3,y3)

a=20
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg1_4" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 0 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#fb8072" />'
console.log(x2,y2,x3,y3)

//-------------------------------------------------------------------------------
var graph_width = 300*myScale
mySvg += '<path id="x_axis" d = "M'+(x0) +' '+(y0)+' l '+ graph_width + ' 0" style="stroke:black;stroke-width:1; stroke-opacity:0.5;" />'

var graph =[0,40,-20,60,-50,100,50],step=50*myScale



mySvg += '<path id="graph" d = "M'+(x0) +' '+ y0

for(var i=1;i<graph.length;i++)
{
  mySvg += ' l '+step+' '+ ((graph[i-1]-graph[i])*myScale)
}

mySvg +='" style="stroke:red;stroke-width:1;fill-opacity:0;" />'


//----------------------------------------------------------------------------------

x0 += graph_width


var x2 ,y2, a
a=30
x2 = x0
y2 = y0-r

m = calc(x0,y0,x2,y2,-a*Math.PI/180,r)
var  x3=m[0],y3=m[1]

var c1=(x3-x2),c2=y3-y2



mySvg +='<path id="seg2_1" d="M'+(x0)+' '+(y0)+' l  '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 1 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#e41a1c" />'

a=20
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,-a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg2_2" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 1 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#377eb8" />'
console.log(x2,y2,x3,y3)

a=20
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,-a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg2_3" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 1 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#4daf4a" />'
console.log(x2,y2,x3,y3)

a=110
x2=x3
y2=y3
m = calc(x0,y0,x2,y2,-a*Math.PI/180,r)
var  x3=m[0],y3=m[1]
c1=(x3-x2),c2=y3-y2
mySvg +='<path id="seg2_4" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 1 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="#984ea3" />'
console.log(x2,y2,x3,y3)



mySvg += '</svg>'
document.getElementById('myDIV').innerHTML = mySvg;



