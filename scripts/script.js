var leftColors = ['#fb8072','#bebada','#ffffb3','#0f5a27']
var rightColors = ['#e5c9aa','#9f9167','#cc760e','#fccd35','#715677']
var graphColor = ['#1b9e77','#d95f02','#ff4c4c','#e7298a','#e0edd2','#e6ab02','#a6761d']


//var graphlegend = '<svg id="graphlegend"> <path id="x_axis" d = "M0 50 l 15 0" style="stroke:black;stroke-width:0.2; stroke-opacity:1;" />'
var graphchecklist = [1,1,1,1,1,1,1]
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
function checkboxFilter(angles,checks){
	var check_input=[]
	for(var i=0;i<checks.length;i++)
		check_input.push(checks[i].checked)
	for(var i=0;i<angles.length;i++) if(!check_input[i]) angles[i]=0
	
	return angles
}
function generateSVG_simple(name,leftAngles,myScale,pos){
	var mySvg = ''
	mySvg+='<g id= "'+name+'" transform="translate('+(pos[0]-100*myScale)+','+(pos[1]-100*myScale)+')">'
	x0 = 100*myScale
	y0 = 100*myScale
	r  = 100*myScale
	//console.log(name+" -  "+r)
	
	var sum=0
	for(var i=0;i<leftAngles.length;i++) sum+= leftAngles[i]
	for(var i=0;i<leftAngles.length;i++) leftAngles[i] = leftAngles[i]/sum*360
	
	
	var x3=x0 ,y3=y0-r

	

	for(var i=0;i<leftAngles.length;i++){
		var a=leftAngles[i]
		if(a==0) continue;
		if(a==360){
			mySvg += '<circle cx="'+x0+'" cy="'+y0+'" r="'+r+'" stroke="black" stroke-width="0" fill="'+leftColors[i]+'" />'
			continue;
		}
		var x2=x3
		var y2=y3
		var m = calc(x0,y0,x2,y2,a*Math.PI/180,r)
		var  x3=m[0],y3=m[1]
		c1=(x3-x2),c2=y3-y2
		var direction= " 0 0 "
		if(a >= 180) direction = " 1 0 "
		mySvg +='<path id="seg1_2" d="M'+x0+' '+y0+' l '+(x2-x0) +' '+ (y2-y0) +'  a '+r+' '+r+' 1 ' + direction + ' ' +c1+' ' +c2+' Z" stroke="red" stroke-width="0" fill="'+leftColors[i]+'" />'
		//console.log(x2,y2,x3,y3)
	}
	
	var scale1= myScale*10
	mySvg +='<path id="_x33_dright" fill="#FFFFFF" d="M'+(x0*0.70)+','+(y0/4)+'c0,0,0,'+0.1*scale1+',0,'+0.2*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.5*scale1)+','+0.2*scale1+''+(-0.7*scale1)+','+0.4*scale1+'	c'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+''+(-0.2*scale1)+','+0.2*scale1+'c'+(-0.1*scale1)+',0'+(-0.1*scale1)+',0'+(-0.2*scale1)+','+0.1*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.3*scale1)+','+0.3*scale1+'-'+0.4*scale1+','+0.4*scale1+'c-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.4*scale1+','+0.4*scale1+'	c0,0-'+0.1*scale1+',0-'+0.1*scale1+',0c-'+0.1*scale1+',0-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'c-'+0.1*scale1+'-'+0.2*scale1+'-'+0.4*scale1+'-'+0.2*scale1+'-'+0.5*scale1+'-'+0.3*scale1+'c-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.2*scale1+'-'+0.1*scale1+'-'+0.3*scale1+'c0-'+0.1*scale1+',0-'+0.2*scale1+',0-'+0.2*scale1+'	c0-'+0.1*scale1+','+0.1*scale1+'-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.4*scale1+'-'+0.3*scale1+','+0.9*scale1+'-'+0.6*scale1+','+1.3*scale1+'-'+0.8*scale1+'c'+0.2*scale1+'-'+0.1*scale1+','+0.4*scale1+'-'+0.3*scale1+','+0.5*scale1+',0z"/>'

	mySvg += '</g>'
	return mySvg
}

function generateSVG(name,leftAngles,rightAngles,myScale,myScale2,pos){

	var mySvg = '<svg id = "aga_svg" height="400" width="650" transform = "scale(1)">'
	mySvg = ''
	mySvg+='<g id= "'+name+'" transform="translate('+(pos[0]-100*myScale)+','+(pos[1]-100*myScale)+')">'
	
	var sum=0
	for(var i=0;i<leftAngles.length;i++) sum+= leftAngles[i]
	for(var i=0;i<leftAngles.length;i++) leftAngles[i] = leftAngles[i]/sum*180
	
	sum=0
	for(var i=0;i<rightAngles.length;i++) sum+= rightAngles[i]
	for(var i=0;i<rightAngles.length;i++) rightAngles[i] = rightAngles[i]/sum*180




	x0 = 100*myScale
	y0 = 100*myScale
	r  = 100*myScale

	var x3=x0 ,y3=y0-r
	
	for(var i=0;i<leftAngles.length;i++){
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
	var scale1= myScale*10
	mySvg +='<path id="_x33_dright" fill="#FFFFFF" d="M'+(x0*0.70)+','+(y0/4)+'c0,0,0,'+0.1*scale1+',0,'+0.2*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.5*scale1)+','+0.2*scale1+''+(-0.7*scale1)+','+0.4*scale1+'	c'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+''+(-0.2*scale1)+','+0.2*scale1+'c'+(-0.1*scale1)+',0'+(-0.1*scale1)+',0'+(-0.2*scale1)+','+0.1*scale1+'c0,0'+(-0.1*scale1)+','+0.1*scale1+''+(-0.1*scale1)+','+0.1*scale1+'c'+(-0.2*scale1)+','+0.1*scale1+''+(-0.3*scale1)+','+0.3*scale1+'-'+0.4*scale1+','+0.4*scale1+'c-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.4*scale1+','+0.4*scale1+'	c0,0-'+0.1*scale1+',0-'+0.1*scale1+',0c-'+0.1*scale1+',0-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'c-'+0.1*scale1+'-'+0.2*scale1+'-'+0.4*scale1+'-'+0.2*scale1+'-'+0.5*scale1+'-'+0.3*scale1+'c-'+0.1*scale1+'-'+0.1*scale1+'-'+0.1*scale1+'-'+0.2*scale1+'-'+0.1*scale1+'-'+0.3*scale1+'c0-'+0.1*scale1+',0-'+0.2*scale1+',0-'+0.2*scale1+'	c0-'+0.1*scale1+','+0.1*scale1+'-'+0.1*scale1+','+0.2*scale1+'-'+0.2*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.1*scale1+'-'+0.1*scale1+','+0.3*scale1+'-'+0.2*scale1+','+0.4*scale1+'-'+0.3*scale1+'c'+0.4*scale1+'-'+0.3*scale1+','+0.9*scale1+'-'+0.6*scale1+','+1.3*scale1+'-'+0.8*scale1+'c'+0.2*scale1+'-'+0.1*scale1+','+0.4*scale1+'-'+0.3*scale1+','+0.5*scale1+',0z"/>'
	
	
	
	mySvg +="\n\n\n"
	//-------------------------------------------------------------------------------
	/*The graph  repsents crime density rate ofbetween the year and 2017, the last value of the data.
	  The left side shows rate of change violent crime density between 2013 and 2017 and 
	  the right side shows rate of change violent crime density between 2017 and 2017. Therefore last value of the graph is always coming back to zero value*/
	var graph_width = 2
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
