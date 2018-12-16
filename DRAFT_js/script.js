

var graphlegend = '<svg id="graphlegend"> <path id="x_axis" d = "M0 50 l 15 0" style="stroke:black;stroke-width:0.2; stroke-opacity:1;" />'
var graphchecklist = [1,1,1,1,1,1,1]

function generateSVG(name,leftAngles,rightAngles,graph,cls,myScale,myScale2,pos){

	var mySvg = '<svg id = "aga_svg" height="400" width="650" transform = "scale(1)">'
	mySvg = ''
	mySvg+='<g id= "'+name+'" transform="translate('+pos[0]+','+pos[1]+')">'

	function calc(x0,y0,x1,y1,a,r){
	  var dx= x1-x0
	  var dy= y1-y0
	  var rumb,angle,x2,y2

	  if(dx>=0 && dy>=0) rumb=1
	  if(dx<0 && dy>0) rumb=2
	  if(dx<=0 && dy<=0) rumb=3
	  if(dx>0 && dy<0) rumb=4
	  //console.log(a)
	  angle = Math.atan(dy/dx) - a ;
	  if(dx==0) angle= Math.PI/2-a
	  //if(dx==0) angle= a
	  //console.log(angle*180/Math.PI)

	  if(rumb==2 || rumb==3) angle += Math.PI
	  //console.log(angle)

	  x2 = x0 + r*Math.cos(angle)
	  y2 = y0 + r*Math.sin(angle)
	  //console.log(x2,y2)

	   return [x2,y2];
	}



	x0 = 100*myScale
	y0 = 100*myScale
	r  = 100*myScale

	var x3=x0 ,y3=y0-r

	var leftColors = ['#0f5a27','#ffffb3','#bebada','#fb8072','#80b1d3']
	var rightColors = ['#e5c9aa','#9f9167','#cc760e','#fccd35','#715677']
	var graphColor = ['#1b9e77','#d95f02','#ff4c4c','#e7298a','#e0edd2','#e6ab02','#a6761d']
	
	for(var i=leftAngles.length-1;i>=0;i=i-1){
		var a=leftAngles[i]
		if(a==0) continue
		var x2=x3
		var y2=y3
		var m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
		var  x3=m[0],y3=m[1]
		c1=(x3-x2),c2=y3-y2
		mySvg +='<path id="seg1_2" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 0 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="'+leftColors[i]+'" />'
		//console.log(x2,y2,x3,y3)
	}
	//mySvg += '<path id="_x33_dleft" fill="#FFFFFF" d="M'+(x0/4)+','+(y0/4)+'c0,0-0.1,0.1-0.2,0c0,0-0.1-0.1-0.1-0.1c-0.1-0.2-0.3-0.4-0.4-0.6	c-0.1-0.1-0.1-0.1-0.2-0.2c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.3-0.3-0.5-0.4c-0.2-0.1-0.4-0.2-0.5-0.4	c0,0,0-0.1,0-0.1c0-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.4,0.3-0.5c0.1-0.1,0.2-0.1,0.3-0.2c0.1,0,0.2-0.1,0.2,0	c0.1,0,0.2,0.1,0.2,0.2c0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.1,0.2,0.2,0.3,0.4c0.3,0.4,0.7,0.8,1,1.2c0.2,0.2,0.3,0.4,0,0.5z"/>'
	//mySvg +='<path id="_x33_dright" fill="#FFFFFF" transform="scale(1)"d="M'+(x0/2)+','+(y0/3)+'c0,0,0,0.1,0,0.2c0,0-0.1,0.1-0.1,0.1c-0.2,0.1-0.5,0.2-0.7,0.4	c-0.1,0.1-0.1,0.1-0.2,0.2c-0.1,0-0.1,0-0.2,0.1c0,0-0.1,0.1-0.1,0.1c-0.2,0.1-0.3,0.3-0.4,0.4c-0.1,0.2-0.2,0.4-0.4,0.4	c0,0-0.1,0-0.1,0c-0.1,0-0.1-0.1-0.1-0.1c-0.1-0.2-0.4-0.2-0.5-0.3c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.2,0-0.2	c0-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.3-0.2,0.4-0.3c0.4-0.3,0.9-0.6,1.3-0.8c0.2-0.1,0.4-0.3,0.5,0z"/>'
	var scale1= myScale*10
	mySvg +='<path id="_x33_dright" fill="#FFFFFF" d="M'+(x0*0.70)+','+(y0/4)+'c0,0,0,'+0.1*scale1+',0,'+0.2*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.5*scale1)+','+0.2*scale1+''+(-0.7*scale1)+','+0.4*scale1+'	c'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+''+(-0.2*scale1)+','+0.2*scale1+'c'+(-0.1*scale1)+',0'+(-0.1*scale1)+',0'+(-0.2*scale1)+','+0.1*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.3*scale1)+','+0.3*scale1+'-'+0.4*scale1+','+0.4*scale1+'c-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.4*scale1+','+0.4*scale1+'	c0,0-'+0.1*scale1+',0-'+0.1*scale1+',0c-'+0.1*scale1+',0-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'c-'+0.1*scale1+'-'+0.2*scale1+'-'+0.4*scale1+'-'+0.2*scale1+'-'+0.5*scale1+'-'+0.3*scale1+'c-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.2*scale1+'-'+0.1*scale1+'-'+0.3*scale1+'c0-'+0.1*scale1+',0-'+0.2*scale1+',0-'+0.2*scale1+'	c0-'+0.1*scale1+','+0.1*scale1+'-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.4*scale1+'-'+0.3*scale1+','+0.9*scale1+'-'+0.6*scale1+','+1.3*scale1+'-'+0.8*scale1+'c'+0.2*scale1+'-'+0.1*scale1+','+0.4*scale1+'-'+0.3*scale1+','+0.5*scale1+',0z"/>'

	//-------------------------------------------------------------------------------
	/*The graph  repsents crime density rate ofbetween the year and 2017, the last value of the data.
	  The left side shows rate of change violent crime density between 2013 and 2017 and 
	  the right side shows rate of change violent crime density between 2017 and 2017. Therefore last value of the graph is always coming back to zero value*/
	var graph_width = 15
	mySvg += '<path id="x_axis" d = "M'+(x0) +' '+(y0)+' l '+ graph_width + ' 0" style="stroke:black;stroke-width:0.2; stroke-opacity:1;" />'

	var step=graph_width/4
	myScale = 0.15
	mySvg += '<path id="graph" d = "M'+(x0) +' '+ (y0-graph[0]*myScale)
	
	for(var i=1;i<graph.length;i++)
	{
	  mySvg += ' l '+step+' '+ ((graph[i-1]-graph[i])*myScale)
	}
	if(graphchecklist[cls-1]==1){
		graphchecklist[cls-1]=0;
		graphlegend +='<path id="graph" d = "M0 '+ (50-graph[0]*myScale)
			for(var i=1;i<graph.length;i++)
			{
			  graphlegend += ' l '+step+' '+ ((graph[i-1]-graph[i])*myScale)
			}
		graphlegend +='" style="stroke:'+graphColor[cls-1]+' ;stroke-width:0.7;fill-opacity:0;" />'
	}
	mySvg +='" style="stroke:'+graphColor[cls-1]+' ;stroke-width:0.7;fill-opacity:0;" />'


	//----------------------------------------------------------------------------------
	r=myScale2*100
	x0 += graph_width
	x3=x0
	y3=y0-r
	
	


	for(var i=0;i<rightAngles.length;i++){
		a=rightAngles[i]
		if(a==0) continue
		x2=x3
		y2=y3
		m = calc(x0,y0,x2,y2,-a*Math.PI/180,r)
		var  x3=m[0],y3=m[1]
		c1=(x3-x2),c2=y3-y2
		mySvg +='<path id="seg2_2" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 0 0 1 ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="'+rightColors[i]+'" />'
		//console.log(x2,y2,x3,y3)
	}
	var scale2=myScale2*10
	//mySvg += '<path id="_x33_dleft" fill="#FFFFFF" d="M'+(x0+r/4)+','+y0/4+'c0,0-'+0.1*scale2+','+0.1*scale2+'-'+0.2*scale2+',0c0,0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'c-'+0.1*scale2+'-'+0.2*scale2+'-'+0.3*scale2+'-'+0.4*scale2+'-'+0.4*scale2+'-'+0.6*scale2+' c-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.2*scale2+'-'+0.2*scale2+'c0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.2*scale2+'c0,0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'c-'+0.1*scale2+'-'+0.1*scale2+'-'+0.3*scale2+'-0.3-0.5-0.4c-0.2-0.1-0.4-0.2-0.5-0.4	c0,0,0-0.1,0-0.1c0-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.4,0.3-0.5c0.1-0.1,0.2-0.1,0.3-0.2c0.1,0,0.2-0.1,0.2,0	c0.1,0,0.2,0.1,0.2,0.2c0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.1,0.2,0.2,0.3,0.4c0.3,0.4,0.7,0.8,1,1.2c0.2,0.2,0.3,0.4,0,0.5z"/>'
	
	mySvg += '<path id="_x33_dleft" fill="#FFFFFF" d="M'+(x0+r/2)+','+(y0-r/2)+'c0,0-'+0.1*scale2+','+0.1*scale2+'-'+0.2*scale2+',0c0,0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'c-'+0.1*scale2+'-'+0.2*scale2+'-'+0.3*scale2+'-'+0.4*scale2+'-'+0.4*scale2+'-'+0.6*scale2+' c-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.2*scale2+'-'+0.2*scale2+'c0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.2*scale2+'c0,0-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'-'+0.1*scale2+'c-'+0.1*scale2+'-'+0.1*scale2+'-'+0.3*scale2+'-'+0.3*scale2+'-'+0.5*scale2+'-'+0.4*scale2+'c-'+0.2*scale2+'-'+0.1*scale2+'-'+0.4*scale2+'-'+0.2*scale2+'-'+0.5*scale2+'-'+0.4*scale2+'	c0,0,0-'+0.1*scale2+',0-'+0.1*scale2+'c0-'+0.1*scale2+','+0.1*scale2+'-'+0.1*scale2+','+0.1*scale2+'-'+0.1*scale2+'c'+0.1*scale2+'-'+0.1*scale2+','+0.2*scale2+'-'+0.4*scale2+','+0.3*scale2+'-'+0.5*scale2+'c'+0.1*scale2+'-'+0.1*scale2+','+0.2*scale2+'-'+0.1*scale2+','+0.3*scale2+'-'+0.2*scale2+'c'+0.1*scale2+',0,'+0.2*scale2+'-'+0.1*scale2+','+0.2*scale2+',0	c'+0.1*scale2+',0,'+0.2*scale2+','+0.1*scale2+','+0.2*scale2+','+0.2*scale2+'c'+0.1*scale2+','+0.1*scale2+','+0.2*scale2+','+0.2*scale2+','+0.3*scale2+','+0.4*scale2+'c'+0.1*scale2+','+0.1*scale2+','+0.2*scale2+','+0.2*scale2+','+0.3*scale2+','+0.4*scale2+'c'+0.3*scale2+','+0.4*scale2+','+0.7*scale2+','+0.8*scale2+','+scale2+','+1.2*scale2+'c'+0.2*scale2+','+0.2*scale2+','+0.3*scale2+','+0.4*scale2+',0,'+0.5*scale2+'z"/>'

	mySvg += '</g>'
	//mySvg += '</svg>'
	//console.log(mySvg);
	return mySvg
}

var leftAngles = [30,30,30,50,40]
var rightAngles = [30,40,20,60,30]
var graph =[0,40,-20,60,-50]
var myScale = 1
var pos = [0,100]

//var mySvg = '<svg id = "aga_svg" height="1000" width="1000" >'

for(var i=0;i<state.length;i++){
	//if(state[i] == 'DISTRICT_OF_COLUMBIA3') continue;	
	
	var str = 'data.'+state[i]+'.'
	var factor = 275
	var graph = [0,parseFloat(eval(str+'R2016'))*factor,parseFloat(eval(str+'R2015'))*factor,parseFloat(eval(str+'R2014'))*factor,parseFloat(eval(str+'R2013'))*factor]
	graph.reverse()
	
	var cls=parseFloat(eval(str+'class'))
	var leftAngles = [parseFloat(eval(str+'Murder')),parseFloat(eval(str+'Rape')),parseFloat(eval(str+'Robbery')),parseFloat(eval(str+'assault'))]
	var sum= leftAngles[0]+ leftAngles[1]+ leftAngles[2]+ leftAngles[3]
	 leftAngles=[ leftAngles[0]/sum*180,leftAngles[1]/sum*180,leftAngles[2]/sum*180,leftAngles[3]/sum*180]
	var sum = parseFloat(eval(str+'Total'))
	var rightAngles = [parseFloat(eval(str+'White'))/sum*180,parseFloat(eval(str+'Black'))/sum*180,parseFloat(eval(str+'Native'))/sum*180,parseFloat(eval(str+'Asian'))/sum*180,parseFloat(eval(str+'More'))/sum*180]
	
	var offsetX = 25
	var offsetY = 15
	var pos = [parseFloat(eval(str+'svgX'))-offsetX,parseFloat(eval(str+'svgY'))-offsetY]
	//console.log(leftAngles)
	
	var Tvoilent = parseFloat(eval(str+'R2017'))
	
	// 1mm3 = 100 Voilent Crime
	var f = Math.pow(1039/50*3/4/Math.PI,1/3)*594/21000
	r=Math.pow(Tvoilent/1039,1/3)*f*100*210/594
	
	// 1mm3 = 20 000 people
	var f2 = Math.pow(579315/10000*3/4/Math.PI,1/3)*594/21000
	r= Math.pow(sum/579315,1/3)*f2*100*210/594
	console.log(state[i] + '   ' +r+' - '+Math.PI*4/3*Math.pow(r,3)+' - '+sum/(Math.PI*2/3*Math.pow(r,3)))
	//console.log(generateSVG(state[i]+'_GU',leftAngles,rightAngles,graph,Math.pow(Tvoilent/1039,1/3)*1./20,Math.pow(sum/579315,1/3)*1./15,pos))
	mySvg +=  generateSVG(state[i]+'_GU',leftAngles,rightAngles,graph,cls,Math.pow(Tvoilent/1039,1/3)*f,Math.pow(sum/579315,1/3)*f2,pos);
	mySvg += '\n'
}


//generateSVG(leftAngles,rightAngles,graph,1./3/7.86,pos);
mySvg += '</svg>'
graphlegend+= '</svg>'
//console.log(mySvg)

document.getElementById('myDIV').innerHTML = mySvg
document.getElementById('legendDIV').innerHTML = graphlegend