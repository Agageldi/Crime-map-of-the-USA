var GU_bool = 1
var ev
var cons,cons2



function GUchange(e){
var mySvg = mySvg_map
if(e != null){
	var tag = e.target.tagName
	if(tag==="P" || tag ==="DIV")
		GU_bool = (GU_bool+1)%3
}



// reference state for GU size
var i=45
var str = 'data.'+state[i]+'.'
var leftAngles = [parseFloat(eval(str+'Murder')),parseFloat(eval(str+'Rape')),parseFloat(eval(str+'Robbery')),parseFloat(eval(str+'assault'))]
	leftAngles.reverse()
	leftAngles = checkboxFilter(leftAngles,document.getElementsByClassName("crime_layer"))
var rightAngles = [parseFloat(eval(str+'White')),parseFloat(eval(str+'Black')),parseFloat(eval(str+'Native')),parseFloat(eval(str+'Asian')),parseFloat(eval(str+'More'))]
	rightAngles = checkboxFilter(rightAngles,document.getElementsByClassName("race_layer"))
var sum = parseFloat(eval(str+'Total'))
	Tvoilent = (leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])*sum/100000
	
	sum = rightAngles[0]+ rightAngles[1]+ rightAngles[2]+ rightAngles[3]+ rightAngles[4]
	
cons = 	Math.pow(parseFloat(eval(str+'R2017'))/Tvoilent,1/3)
cons2 = Math.pow(parseFloat(eval(str+'Total'))/sum,1/3)




// Looping throw states
for(var i=0;i<state.length;i++){
	switch(GU_bool){
		case 0:
			document.getElementById("crime_layers").style.height = "80px"
			document.getElementById("race_layers").style.height = "100px"
			break;
		case 1:
			document.getElementById("crime_layers").style.height = "80px"
			document.getElementById("race_layers").style.height = "0px"
			break;
		case 2:
			document.getElementById("crime_layers").style.height = "0px"
			document.getElementById("race_layers").style.height = "0px"
	}
	var str = 'data.'+state[i]+'.'
	var factor = 275
	var graph = [0,parseFloat(eval(str+'R2016'))*factor,parseFloat(eval(str+'R2015'))*factor,parseFloat(eval(str+'R2014'))*factor,parseFloat(eval(str+'R2013'))*factor]
	graph.reverse()
	
	var cls=parseFloat(eval(str+'class'))
	var leftAngles = [parseFloat(eval(str+'Murder')),parseFloat(eval(str+'Rape')),parseFloat(eval(str+'Robbery')),parseFloat(eval(str+'assault'))]
	leftAngles.reverse()
	leftAngles = checkboxFilter(leftAngles,document.getElementsByClassName("crime_layer"))
	
	var sum = parseFloat(eval(str+'Total'))
	var rightAngles = [parseFloat(eval(str+'White')),parseFloat(eval(str+'Black')),parseFloat(eval(str+'Native')),parseFloat(eval(str+'Asian')),parseFloat(eval(str+'More'))]
	rightAngles = checkboxFilter(rightAngles,document.getElementsByClassName("race_layer"))
	
	var offsetX = 0
	var offsetY = 0
	var pos = [parseFloat(eval(str+'svgX'))-offsetX,parseFloat(eval(str+'svgY'))-offsetY]
	//console.log(leftAngles)
	
	var Tvoilent = parseFloat(eval(str+'R2017'))
	
	Tvoilent = (leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])*sum/100000
	
	sum = rightAngles[0]+ rightAngles[1]+ rightAngles[2]+ rightAngles[3]+ rightAngles[4]
	

	
	// 1mm3 = 100 Voilent Crime
	var f = Math.pow(1039/50*3/4/Math.PI,1/3)*594/21000*cons
	r=Math.pow(Tvoilent/1039,1/3)*f*100*210/594
	
	// 1mm3 = 20 000 people
	var f2 = Math.pow(579315/10000*3/4/Math.PI,1/3)*594/21000*cons2
	r= Math.pow(sum/579315,1/3)*f2*100*210/594
	
	
	if(GU_bool==0){
		mySvg +=  generateSVG(state[i]+'_GU',leftAngles,rightAngles,cls,Math.pow(Tvoilent/1039,1/3)*f,Math.pow(sum/579315,1/3)*f2,pos);
	}
	else
	if(GU_bool==1)
		mySvg += generateSVG_simple(state[i]+'_GU',leftAngles,Math.pow(Tvoilent/1039,1/3)*f,pos)
	mySvg += '\n'
}
//generateSVG(leftAngles,rightAngles,graph,1./3/7.86,pos);
mySvg += '</svg>'
graphlegend+= '</svg>'

var basemap = document.getElementById("mapid")
basemap.innerHTML = mySvg
var basemap_svg = document.getElementById("basemap_svg")
basemap_svg.style.width = "99%"
basemap_svg.style.height = "99%"
basemap_svg.style.margin = "0px" 
basemap_svg.style.padding = "0px" 
}

GUchange(null)