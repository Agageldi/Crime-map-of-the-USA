var GU_bool = 1
var cons,cons2
var class_colors= ["#d8f2ed","#b6d6d1","#97bdb7","#79a39e","#5e8c86","#467872","#2e635e","#154f4a"] //from lightest to darkest or from smallest value to highest value



function GUchange(e){
var mySvg = mySvg_map
var classificationValues = []
var classificationValues_def = []


//increament
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
	classificationValues_def.push(leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])
	leftAngles = checkboxFilter(leftAngles,document.getElementsByClassName("crime_layer"))
	
	var sum = parseFloat(eval(str+'Total'))
	var rightAngles = [parseFloat(eval(str+'White')),parseFloat(eval(str+'Black')),parseFloat(eval(str+'Native')),parseFloat(eval(str+'Asian')),parseFloat(eval(str+'More'))]
	rightAngles = checkboxFilter(rightAngles,document.getElementsByClassName("race_layer"))
	
	
	var pos = [parseFloat(eval(str+'svgX')),parseFloat(eval(str+'svgY'))]
	//console.log(leftAngles)
	
	var Tvoilent = parseFloat(eval(str+'R2017'))
	
	Tvoilent = (leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])*sum/100000
	
	sum = rightAngles[0]+ rightAngles[1]+ rightAngles[2]+ rightAngles[3]+ rightAngles[4]
	
	classificationValues.push(leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])
	
	// 1mm3 = 100 Voilent Crime
	var f = Math.pow(1039/50*3/4/Math.PI,1/3)*594/21000*cons
	r=Math.pow(Tvoilent/1039,1/3)*f*100*210/594
	
	// 1mm3 = 20 000 people
	var f2 = Math.pow(579315/10000*3/4/Math.PI,1/3)*594/21000*cons2
	r= Math.pow(sum/579315,1/3)*f2*100*210/594
	
	if(Tvoilent==0) continue;
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

if(GU_bool<2)
	recolor(classificationValues);
else
	recolor(classificationValues_def);
}


function recolor(values){
	
	var data = new geostats(values)
	var naturalBreaks = data.getClassJenks(8)
	console.log(naturalBreaks)
	
	for(var i=0;i<state.length;i++){
		for(var j=1;j<naturalBreaks.length;j++)
			if(values[i]<=naturalBreaks[j])
				break;
		
		document.getElementById(state[i]).style.fill = class_colors[j-1]
	}
	
	
	var legend = document.getElementsByClassName("classes")
	if(naturalBreaks[1]==0) document.getElementById("choropleth_legend").style.display = "none"
	else{
		document.getElementById("choropleth_legend").style.display = "block"
		for(var j=0;j<legend.length;j++){
			var a = parseInt(naturalBreaks[7-j]*10)/10
			var b = parseInt(naturalBreaks[8-j]*10)/10
			if(a==parseInt(a)) a= a+".0"
			if(b==parseInt(b)) b= b+".0"
			
			legend[j].innerHTML = a+" - "+b
		}
	}
}

var popupElement = document.getElementById("countryName_popup")

function popupOpen(event){
	var name =event.target.id.split("_").join(" ");
	if(popupElement.style.display=="none")
		popupElement.style.display = "block"
	popupElement.style.top = event.pageY-20 + "px"
	popupElement.style.left = event.pageX+5 + "px"
	
	
	popupElement.innerHTML = name
	//console.log("I am popup " + name)
}
function popupClose(event){
	ev=event;
	popupElement.style.display = "none"
}

GUchange(null)

for(var i=0;i<state.length;i++){
	document.getElementById(state[i]).onmousemove = function(event){ popupOpen(event)}
	document.getElementById(state[i]).onmouseout = function(event){ popupClose(event)}
}